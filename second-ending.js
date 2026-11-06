/* 以《如果可以》的媒体时钟驱动 PP 回放和片尾。 */
(() => {
  'use strict';
  const model = window.ADOPTION_SIX_DAY_STATE;
  const groups = window.ADOPTION_ENDING_DIALOGUE.trim().split(/\n\n/).map(block => {
    const [date, ...lines] = block.split('\n');
    return {date: date.replaceAll('.', '-'), lines};
  });
  const dayMs = 86400000;
  const filmAt = 125000;

  function calendarCues(anchors) {
    const pages = [];
    for (let index = 1; index < anchors.length; index++) {
      const from = anchors[index - 1], to = anchors[index];
      const firstDay = Date.parse(from.date);
      const daySpan = (Date.parse(to.date) - firstDay) / dayMs;
      const span = to.at - from.at;
      const count = Math.min(daySpan, Math.max(1, Math.ceil(span / 520)));
      const interval = span / count;
      for (let page = 1; page <= count; page++) {
        const date = new Date(firstDay + Math.round(daySpan * page / count) * dayMs).toISOString().slice(0, 10);
        const at = Math.round(from.at + page * interval);
        const speed = Math.round(interval - 28);
        pages.push({kind: 'flip', at: at - speed, date, speed}, {kind: 'date', at, date});
      }
    }
    return pages;
  }

  function buildPlan() {
    const plan = [];
    const anchors = [{date: '2008-08-23', at: 0}];
    let time = 940;
    const cue = (kind, args = {}) => plan.push({kind, at: time, ...args});
    for (const group of groups) {
      const year = Number(group.date.slice(0, 4));
      const september = group.date.startsWith('2025-09');
      const invitation = group.date === '2025-01-12';
      const rehearsal = group.date.startsWith('2025-0') && !september && !invitation;
      const school = year >= 2013 && year <= 2015;
      const pace = september ? 590 : invitation ? 460 : rehearsal ? 245 : school ? 445 : year <= 2012 ? 305 : 275;
      anchors.push({date: group.date, at: time});
      cue('chat', {date: group.date});
      time += 65;
      for (const line of group.lines) {
        const self = line.startsWith('>');
        const notice = line.startsWith('*');
        const text = self || notice ? line.slice(1) : line;
        if (september && ['怎么样', '演。'].includes(text)) time += 620;
        cue(notice ? 'notice' : 'message', {date: group.date, self, text});
        const receivedScript = text === '文件接收成功：领养日.doc';
        if (receivedScript) cue('fade-calendar');
        const spacing = pace + Math.min(250, text.length * (september ? 18 : 9));
        const interval = Math.round(spacing * (september ? 1 : .95));
        time += receivedScript ? Math.max(1250, interval) : interval;
        if (receivedScript) {
          cue('document');
          time += 12000;
          cue('close-document');
          time += 580;
        }
      }
      time += september ? 490 : invitation ? 440 : 110;
    }
    const titleAt = filmAt - 3400;
    const filenameAt = titleAt - 2500;
    const documentAt = plan.find(item => item.kind === 'document').at;
    const documentLength = 12000;
    const scale = (filenameAt - documentLength) / (time - documentLength);
    function align(at) {
      const documentTime = Math.max(0, Math.min(documentLength, at - documentAt));
      return Math.round((at - documentTime) * scale + documentTime);
    }
    for (const item of [...plan, ...anchors]) item.at = align(item.at);
    plan.push(...calendarCues(anchors), {kind: 'filename', at: filenameAt}, {kind: 'title', at: titleAt});
    return plan.sort((a, b) => a.at - b.at);
  }

  const plan = buildPlan();
  let cancel;

  function start(ui, state) {
    if (cancel) return;
    const media = window.ADOPTION_ENDING_MEDIA;
    const {audio, video} = media;
    media.reset();
    let release;
    const running = new Promise(resolve => { release = resolve; });
    let index = 0, frame, step, elapsed = state.ending?.at || 0, lastSave = elapsed;
    let tailAt = 0, tailStarted = 0;
    let stopped = false, playing = false, preparing = false, positioned = false;
    let filmStarted = false, filmDone = false, filmEndAt = 0, rollEnd = 0;
    let runId, endingSeen = false;

    function checkpoint(complete = false, rewind = false) {
      return model.saveEnding(elapsed, complete, 4, {run: runId, rewind,
        videoCompleted: filmDone, videoEndedAt: filmEndAt});
    }

    function finish() {
      cancelAnimationFrame(frame);
      audio.pause();
      video.pause();
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pagehide', pause);
      window.removeEventListener('pageshow', resume);
      audio.removeEventListener('error', mediaFailed);
      audio.removeEventListener('timeupdate', tick);
      video.removeEventListener('error', mediaFailed);
      video.removeEventListener('ended', endFilm);
      cancel = null;
      release();
    }

    function stop() {
      stopped = true;
      finish();
      cancel = null;
    }
    cancel = stop;

    function setStep(next, restoring = false) {
      if (next === step) return;
      step = next;
      ui.slate(next, restoring);
    }

    function draw(item, restoring) {
      switch (item.kind) {
        case 'flip': ui.flip(item.date, item.speed); break;
        case 'date': ui.date(item.date); break;
        case 'chat': ui.chat(item.date); break;
        case 'message': ui.message(item); break;
        case 'notice': ui.notice(item.text); break;
        case 'fade-calendar': ui.fadeCalendar(); break;
        case 'document': ui.document(true, restoring ? elapsed - item.at : 0); break;
        case 'close-document': ui.document(false); break;
        case 'filename':
        case 'title':
          setStep(item.kind, restoring);
          break;
      }
    }

    function restoreProgress() {
      ui.restore(true);
      while (index < plan.length && plan[index].at <= elapsed) draw(plan[index++], true);
      ui.restore(false);
    }

    function endFilm() {
      if (stopped || !filmStarted || !Number.isFinite(video.duration) || video.currentTime < video.duration - .2) return;
      filmDone = true;
      filmEndAt = Math.max(filmEndAt, audio.currentTime * 1000);
      checkpoint();
    }

    function beginFilm() {
      filmStarted = true;
      setStep('video');
      ui.filmCut(audio.currentTime);
      if (elapsed - filmAt > 200) video.currentTime = (elapsed - filmAt) / 1000;
      video.play().catch(() => { if (playing && !stopped) mediaFailed(); });
    }

    function tick() {
      if (!playing || stopped || document.hidden) return;
      cancelAnimationFrame(frame);
      elapsed = tailStarted ? tailAt + performance.now() - tailStarted : audio.currentTime * 1000;
      while (index < plan.length && plan[index].at <= elapsed) draw(plan[index++], false);
      if (elapsed >= filmAt && !filmStarted && !filmDone) beginFilm();

      if (filmDone) {
        const filmFade = elapsed - filmEndAt;
        const rollStart = filmEndAt + 3450;
        if (filmFade >= 3200 && !endingSeen) {
          endingSeen = true;
          window.ADOPTION_ACHIEVEMENTS.record('second-ending-finished');
        }
        if (filmFade < 450 && step === 'video') video.style.opacity = 1 - Math.max(0, filmFade) / 450;
        else if (elapsed < rollStart) {
          setStep('ending');
          ui.endingOpacity(Math.min(1, Math.max(0, (filmFade - 450) / 350), Math.max(0, (3200 - filmFade) / 400)));
        } else if (elapsed < rollEnd) {
          setStep('credits');
          rollEnd = rollStart + window.ADOPTION_ENDING_CREDITS.rollDuration;
          ui.roll((elapsed - rollStart) / (rollEnd - rollStart));
        } else if (elapsed < rollEnd + 2000) setStep('blackout');
        else setStep('complete');
      }

      if (filmDone && step === 'complete' && audio.ended) {
        setStep('complete');
        checkpoint(true);
        ui.finish();
        finish();
        return;
      }
      if (audio.ended && !tailStarted) { tailAt = elapsed; tailStarted = performance.now(); }
      if (elapsed - lastSave >= 750) {
        checkpoint();
        lastSave = elapsed;
      }
      frame = requestAnimationFrame(tick);
    }

    function pause() {
      if (!playing) return;
      playing = false;
      cancelAnimationFrame(frame);
      elapsed = tailStarted ? tailAt + performance.now() - tailStarted : audio.currentTime * 1000;
      tailAt = elapsed; tailStarted = 0;
      audio.pause();
      video.pause();
      ui.freeze(true);
      checkpoint();
    }

    function mediaFailed() {
      if (stopped || !positioned) return;
      pause();
      positioned = false;
      if (!filmDone) filmStarted = false;
      ui.waitForGesture(resume, '片尾素材加载失败，点击重试');
    }

    async function resume() {
      if (playing || preparing || stopped || document.hidden) return;
      preparing = true;
      try {
        if (!positioned) {
          const loading = setTimeout(() => ui.waitForGesture(null, '正在准备片尾素材…'), 400);
          try { await media.ready(); }
          finally { clearTimeout(loading); }
          if (stopped || document.hidden) return;
          filmEndAt = filmAt + video.duration * 1000;
          const saved = model.read();
          filmDone = saved.ending?.videoCompleted === true;
          if (filmDone && Number.isFinite(saved.ending.videoEndedAt)) filmEndAt = saved.ending.videoEndedAt;
          // A music timestamp alone cannot prove the video was watched.
          if (!filmDone && elapsed >= filmEndAt) {
            elapsed = filmAt;
            lastSave = elapsed;
            checkpoint(false, true);
          }
          // Measure before selecting the current stage, including refresh during extended credits.
          const probe = document.createElement('div');
          probe.style.cssText = 'position:fixed;inset:0;visibility:hidden;pointer-events:none';
          probe.className = 'second-ending-slate';
          document.body.append(probe);
          window.ADOPTION_ENDING_CREDITS.createRoll(probe);
          rollEnd = filmEndAt + 3450 + window.ADOPTION_ENDING_CREDITS.rollDuration;
          probe.remove();
          audio.currentTime = Math.min(elapsed / 1000, audio.duration);
          video.currentTime = 0;
          video.style.opacity = '';
          positioned = true;
        }
        if (elapsed >= audio.duration * 1000) { tailAt = elapsed; tailStarted = performance.now(); }
        else await audio.play();
        if (stopped || document.hidden) {
          audio.pause();
          return;
        }
        ui.waitForGesture(null);
        ui.freeze(false);
        playing = true;
        if (filmStarted && !filmDone) video.play().catch(mediaFailed);
        frame = requestAnimationFrame(tick);
      } catch (error) {
        if (!stopped) ui.waitForGesture(resume, error.name === 'NotAllowedError'
          ? '点击继续演出'
          : '片尾素材加载失败，点击重试');
      } finally {
        preparing = false;
      }
    }

    function visibility() { if (document.hidden) pause(); else resume(); }

    function run() {
      if (stopped) return;
      const saved = model.read();
      if (saved.phase === 'complete') {
        setStep('complete', true);
        ui.finish();
        finish();
        return;
      }
      elapsed = saved.ending.at;
      runId = saved.ending.run || Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
      checkpoint();
      if (saved.ending.timeline !== 4) {
        elapsed = Math.min(elapsed, filmAt - 3500);
        checkpoint(false, true);
      }
      lastSave = elapsed;
      if (elapsed) restoreProgress();
      document.addEventListener('visibilitychange', visibility);
      window.addEventListener('pagehide', pause);
      window.addEventListener('pageshow', resume);
      audio.addEventListener('error', mediaFailed);
      audio.addEventListener('timeupdate', tick);
      video.addEventListener('error', mediaFailed);
      video.addEventListener('ended', endFilm);
      resume();
      return running;
    }

    ui.begin(audio, video);
    // 两个标签页共用存档时，只有一页持有播放权。
    if (navigator.locks) navigator.locks.request(model.key + '-ending', run);
    else run();
  }

  window.ADOPTION_SECOND_ENDING = {start, stop: () => cancel?.(), plan, filmAt};
})();
