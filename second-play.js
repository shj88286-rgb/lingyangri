/* V4：八日记录 → 全屏消息堆叠 → 最后一句 → 逐日翻页回到 8.18。 */
(() => {
  'use strict';
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const {current, legacy} = window.ADOPTION_ACCOUNTS;
  const story = () => window.ADOPTION_SECOND_PLAY_STORY;
  const targetDate = '2008-08-18';
  const pad = value => String(value).padStart(2, '0');
  const realClock = date => `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  const dateText = value => { const [y,m,d] = value.split('-'); return `${y}年${Number(m)}月${Number(d)}日`; };
  const buttons = '<span class="retro-window-buttons" aria-hidden="true"><i>_</i><i>□</i><i>×</i></span>';
  const screen = document.createElement('section');
  screen.id = 'second-play-screen'; screen.className = 'second-play-screen'; screen.hidden = true;
  screen.setAttribute('aria-label', 'PP · 2008');
  screen.innerHTML = `
    <header class="second-utility"><span class="second-era"><svg aria-hidden="true"><use href="#pp-mark"/></svg><strong>PP</strong><time class="second-era-year">2026</time></span><div class="second-controls"><button class="achievement-entry" type="button" data-achievement-open>成就</button><button class="second-audio" type="button" aria-pressed="false">声音：开</button><button class="second-skip" type="button">跳过演出</button><button class="second-exit" type="button">退出登录</button></div></header>
    <div class="second-stage" data-stage="loading">
      <div class="second-message-field" aria-hidden="true"></div>
      <article class="second-modern" aria-label="2026年登录窗口"><header><span class="pp-logo"><svg class="pp-mark" aria-hidden="true"><use href="#pp-mark"/></svg><strong>PP</strong></span><time>2026</time></header><img src="${escapeHTML(legacy.avatar)}" width="72" height="72" alt="${escapeHTML(legacy.name)}"><h1>${escapeHTML(legacy.name)}</h1><p class="second-login-state">正在登录</p><div class="second-progress" role="progressbar" aria-label="登录中"><span></span></div></article>
      <div class="second-workspace" hidden><article class="second-chat-window" aria-label="与忧郁小猫猫的聊天窗口">
        <header class="retro-titlebar"><span><svg aria-hidden="true"><use href="#pp-mark"/></svg>与 ${escapeHTML(current.name)} 聊天中</span>${buttons}</header>
        <div class="retro-chat-tools" aria-hidden="true"><span><b>✉</b>短信</span><span><b>▣</b>视频</span><span><b>♫</b>语音</span><span><b>▰</b>传文件</span><span class="retro-tool-extra"><b>☆</b>邀请</span></div>
        <div class="second-account-strip"><img class="second-own-avatar" src="${escapeHTML(legacy.avatar)}" width="28" height="28" alt="${escapeHTML(legacy.name)}的头像"><strong>${escapeHTML(legacy.name)}</strong><span class="second-own-presence"><i class="retro-online-dot"></i><span>在线</span></span><time class="second-chat-date">2008年8月18日</time></div>
        <div class="retro-chat-body"><div class="retro-conversation"><div class="second-contact-strip"><span>${escapeHTML(current.name)}</span><span class="second-contact-presence"><i class="retro-online-dot"></i>在线</span></div><div class="second-history" role="log" aria-label="与忧郁小猫猫的聊天记录" aria-live="polite" tabindex="0"></div>
          <div class="retro-editor-tools" aria-hidden="true"><span>A</span><span>☺</span><span>✿</span><span>▧</span><span>♬</span><small>◷ 聊天记录</small></div>
          <form class="second-reply-form"><label class="visually-hidden" for="second-reply-input">输入消息</label><textarea id="second-reply-input" rows="3" maxlength="2000" aria-label="输入消息" autocomplete="off" spellcheck="false" disabled></textarea><footer><span class="second-editor-status">对方离线，消息将保存为离线消息。</span><button type="submit" disabled>发送(S)<span>▾</span></button></footer></form>
        </div><aside class="retro-profile-panel" aria-label="联系人资料"><h2>▴ 对方形象 <span>»</span></h2><div class="retro-portrait"><img src="${escapeHTML(current.avatar)}" width="180" height="180" alt="忧郁小猫猫的头像"></div><h2>▴ 个人空间 <span>»</span></h2><div class="retro-space-copy"><strong>${escapeHTML(current.name)}</strong><p>相册：本天才画展</p><p>本天才正式举办个人画展！！！</p></div><h2>▴ 我的形象 <span>»</span></h2><div class="retro-self-portrait"><img class="second-own-avatar" src="${escapeHTML(legacy.avatar)}" width="100" height="100" alt="${escapeHTML(legacy.name)}的头像"><span>${escapeHTML(legacy.name)}</span></div></aside></div>
        <footer class="retro-window-footer"><span>PP 2008</span><span class="second-window-state">${escapeHTML(legacy.name)} · 在线</span><time class="second-live-clock"></time></footer>
        <section class="second-system-alert" role="status" aria-live="polite" hidden><header class="retro-titlebar"><span>系统提示</span><span aria-hidden="true">×</span></header><div><span class="retro-alert-icon" aria-hidden="true">i</span><p>您的账号已在另一处登录。<br><strong>您已被迫下线。</strong></p></div><footer>2008年8月18日</footer></section>
      </article></div>
      <section class="second-calendar" aria-label="日期倒流" hidden>
        <header>日期</header>
        <div class="calendar-sheets">
          <time class="calendar-next" aria-hidden="true"></time>
          <time class="calendar-leaf" aria-hidden="true"></time>
        </div>
      </section>
      <p class="second-announcement visually-hidden" role="status" aria-live="polite"></p>
    </div>`;
  document.querySelector('main').append(screen);
  const $ = selector => screen.querySelector(selector), history = $('.second-history'), input = $('#second-reply-input');
  const timers = new Set();
  let generation = 0, running = false, muted = false, exitCallback, browseCallback, clockTimer;
  const browseButton = document.createElement('button');
  browseButton.textContent = 'PP空间 / 邮箱'; browseButton.hidden = true;
  $('.second-controls').prepend(browseButton);
  browseButton.addEventListener('click', () => {
    window.ADOPTION_SIX_DAY.close(); screen.hidden = true;
    document.body.classList.remove('second-play-open'); browseCallback?.();
  });
  let displayedDate = '', seen = [], echoIssued = 0, slots = [], peakCount = 120;
  let reducedMotion = false;
  const compactScreen = matchMedia('(max-width: 900px), (max-height: 480px)');
  function later(delay, action) {
    const currentGeneration = generation;
    const timer = setTimeout(() => { timers.delete(timer); if (running && generation === currentGeneration) action(); }, delay);
    timers.add(timer); return timer;
  }
  function clearSceneTimers() { timers.forEach(clearTimeout); timers.clear(); clearTimeout(clockTimer); clockTimer = undefined; }
  function setStage(value) { screen.dataset.sceneStage = value; $('.second-stage').dataset.stage = value; }
  function scrollToLatest() { history.scrollTop = history.scrollHeight; }
  if (typeof ResizeObserver === 'function') new ResizeObserver(() => {
    if (running && !['loading','ready','rewinding'].includes(screen.dataset.sceneStage)) scrollToLatest();
  }).observe(history);
  function messageHTML(record, self = false, extraClass = '') {
    const time = record.at.includes(' ') ? record.at.slice(11) : record.at;
    const shownTime = self ? record.at : time;
    const datetime = /^\d{4}-\d{2}-\d{2} /.test(record.at) ? record.at.replace(' ', 'T') : '';
    return `<article class="retro-message ${self ? 'retro-message-self' : ''} ${extraClass}" data-at="${escapeHTML(record.at)}"><header><strong>${escapeHTML(self ? legacy.name : current.name)}</strong><time${datetime ? ` datetime="${escapeHTML(datetime)}"` : ''}>${escapeHTML(shownTime)}</time></header><p>${escapeHTML(record.text)}</p></article>`;
  }
  function addDate(date) {
    if (date === displayedDate) return; displayedDate = date;
    history.insertAdjacentHTML('beforeend', dateDivider(date));
    $('.second-chat-date').textContent = dateText(date);
  }
  function dateDivider(date) {
    return `<div class="retro-date-divider"><time datetime="${date}">${dateText(date)}</time></div>`;
  }
  function setPresence(online) {
    screen.classList.toggle('second-account-offline', !online);
    $('.second-own-presence span').textContent = online ? '在线' : '离线';
    $('.second-window-state').textContent = `${legacy.name} · ${online ? '在线' : '离线'}`;
  }
  // 《秋风》使用本地音轨，复古提示音仍由浏览器合成。
  const musicSource = 'assets/audio/autumn-wind.m4a';
  let audioContext, masterGain, bgm, musicFadeTimer, musicExpected = false;
  const sources = new Set();
  function soundReady() {
    return audioContext?.state === 'running' && (!musicExpected || !bgm.paused);
  }
  function updateAudioButton() {
    $('.second-audio').textContent = muted ? '声音：关' : soundReady() ? '声音：开' : '开启声音';
    $('.second-audio').setAttribute('aria-pressed', String(muted));
  }
  function prepareSound(preview = false) {
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (Context && (!audioContext || audioContext.state === 'closed')) {
        audioContext = new Context(); masterGain = audioContext.createGain(); masterGain.gain.value = muted ? 0 : .8; masterGain.connect(audioContext.destination);
        const context = audioContext;
        context.addEventListener('statechange', () => {
          if (context !== audioContext) return;
          updateAudioButton();
        });
      }
      const context = audioContext;
      if (context) {
        const onReady = () => {
          if (context !== audioContext) return;
          updateAudioButton();
          if (preview) messageTone(false, true);
        };
        if (context.state === 'running') onReady();
        else context.resume().then(onReady).catch(updateAudioButton);
      }
    } catch (error) { console.warn('PP 声音未能启动', error); }
    updateAudioButton();
  }
  function note(frequency, at, duration, volume) {
    if (!audioContext || audioContext.state !== 'running') return;
    const source = audioContext.createOscillator(), gain = audioContext.createGain();
    source.type = 'sine'; source.frequency.value = frequency;
    gain.gain.setValueAtTime(.0001, at);
    gain.gain.exponentialRampToValueAtTime(volume, at + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
    source.connect(gain); gain.connect(masterGain); sources.add(source);
    source.onended = () => { sources.delete(source); source.disconnect(); gain.disconnect(); };
    source.start(at); source.stop(at + duration + .02);
  }
  function messageTone(offline = false, sent = false) {
    if (muted || !audioContext || audioContext.state !== 'running') return;
    const notes = offline ? [659.25, 523.25] : sent ? [987.77, 783.99] : [880, 1174.66, 987.77];
    notes.forEach((frequency, index) => note(frequency, audioContext.currentTime + .02 + index * .105, .098, offline ? .12 : .09));
  }
  function playMusic() {
    const player = bgm;
    if (!player?.paused) return;
    window.ADOPTION_ASSETS.attach(player, musicSource, {preload: 'auto'}).then(() => {
      if (player !== bgm || !player.paused) return;
      return player.play();
    }).catch(() => { if (player === bgm) updateAudioButton(); });
  }
  function prepareMusic(openingMusic) {
    bgm = openingMusic || new Audio();
    bgm.hidden = true;
    screen.append(bgm);
    bgm.loop = true;
    bgm.volume = 0;
    bgm.muted = true;
    bgm.addEventListener('playing', updateAudioButton);
    bgm.addEventListener('pause', updateAudioButton);
    // Start silently within the login flow; the existing cue controls the fade-in.
    playMusic();
  }
  function fadeMusic(volume, seconds) {
    clearInterval(musicFadeTimer);
    const player = bgm;
    if (!player) return;
    const initialVolume = player.volume;
    if (!seconds) {
      player.volume = volume;
      if (!volume) player.pause();
      return;
    }
    const startedAt = performance.now();
    musicFadeTimer = setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / (seconds * 1000));
      player.volume = initialVolume + (volume - initialVolume) * progress;
      if (progress < 1) return;
      clearInterval(musicFadeTimer);
      if (!volume) player.pause();
    }, 32);
  }
  function stopMusic(fade = 0) {
    musicExpected = false;
    fadeMusic(0, fade);
    updateAudioButton();
  }
  function startMusic(volume) {
    if (bgm) bgm.muted = false;
    musicExpected = true;
    playMusic();
    fadeMusic(volume, .55);
  }
  function stopSound() {
    stopMusic(); for (const source of sources) { try { source.stop(); } catch {} } sources.clear();
    if (audioContext && audioContext.state !== 'closed') audioContext.close().catch(() => {});
    bgm?.remove();
    window.ADOPTION_ASSETS.release(bgm);
    audioContext = undefined; masterGain = undefined; bgm = undefined;
  }
  // 用有重叠与错位的横向窗框铺满画面；外围只复用此刻已经发送的消息。
  const noise = value => { const raw = Math.sin(value * 12.9898 + 78.233) * 43758.5453; return raw - Math.floor(raw); };
  function buildSlots() {
    const field = $('.second-message-field'), width = field.clientWidth || innerWidth, height = field.clientHeight || innerHeight;
    const mobile = width <= 680, pitchX = mobile ? 145 : 188, pitchY = mobile ? 67 : 72;
    const early = [], spread = [];
    const slot = (x,y,cardWidth) => ({x:x / width * 100, y:y / height * 100, width:cardWidth, distance:Math.max(Math.abs(x / width - .5), Math.abs(y / height - .5))});
    const sideWidth = mobile ? Math.max(145, Math.min(205, width * .53)) : Math.max(155, Math.min(235, (width - 940) / 2 + 30));
    // 先从玩家确实能看见的边缘开始，再向屏幕各处叠加。
    [.18,.43,.7,.04,.82,.30,.58,.92].forEach((fraction,index) => {
      if (mobile) {
        const x = Math.min(width - sideWidth + 15, index % 2 ? width * .53 : 4 + (index % 3) * 21);
        const inset = index < 2 ? 3 : 8 + index * 5;
        early.push(slot(x,inset,sideWidth),slot(width - x - sideWidth,height - 85 - inset,sideWidth));
      } else {
        const y = Math.max(0,height - 92) * fraction;
        early.push(slot(4 + index % 3 * 7,y,sideWidth),slot(width - sideWidth - 4 - index % 3 * 7,y + 9,sideWidth));
      }
    });
    for (let row = 0; row < Math.ceil(height / pitchY); row++) for (let column = 0; column < Math.ceil(width / pitchX); column++) {
      const index = row * 31 + column;
      const x = Math.min(width - 74,column * pitchX - 25 + (noise(index + 1) - .5) * 78 + (row % 2 ? 25 : 0));
      const y = Math.min(height - 34,row * pitchY - 13 + (noise(index + 2) - .5) * 46);
      spread.push(slot(x,y,mobile ? 184 + noise(index + 3) * 40 : 226 + noise(index + 3) * 68));
    }
    spread.sort((a,b) => b.distance - a.distance);
    slots = [...early,...spread];
    peakCount = Math.min(180, Math.max(85, Math.ceil(slots.length * 1.6)));
  }
  function positionEcho(card, index) {
    if (!slots.length) buildSlots();
    const slot = slots[index % slots.length], layer = Math.floor(index / slots.length);
    const overlaps = index === 3 || index % 8 === 0 && index >= 8;
    const field = $('.second-message-field').getBoundingClientRect();
    const chat = $('.second-workspace').getBoundingClientRect();
    if (compactScreen.matches) {
      // A small number of real messages form a backdrop around the mobile window.
      const width = Math.min(210, Math.max(150, field.width * .52));
      const layer = Math.floor(index / 4);
      const edge = index % 4;
      const x = edge === 0 ? 5 + layer * 11 : edge === 1 ? field.width - width - 5 - layer * 9
        : edge === 2 ? -width * .54 + layer * 3 : field.width - width * .46 - layer * 3;
      const y = edge === 0 ? 2 + layer * 5 : edge === 1 ? field.height - 76 - layer * 6
        : field.height * (.25 + (layer % 3) * .16) + (edge === 3 ? 24 : 0);
      card.classList.remove('second-echo-overlap');
      card.style.left = `${x}px`;
      card.style.top = `${Math.max(0, y)}px`;
      card.style.width = `${width}px`;
      if (!card.hasAttribute('data-index')) card.style.opacity = String(.65 + noise(index + 4) * .25);
      card.dataset.index = String(index);
      return;
    }
    let left = field.width * (slot.x + (layer ? (noise(index + 8) - .5) * 9 : 0)) / 100;
    let top = field.height * (slot.y + (layer ? (noise(index + 9) - .5) * 6 : 0)) / 100;
    if (overlaps && field.width <= 680) {
      left = chat.left - field.left + noise(index + 14) * Math.max(0, chat.width - slot.width);
      top = Math.max(0, chat.top - field.top - 77 + noise(index + 15) * 14);
    } else if (overlaps) {
      const inset = 22 + noise(index + 14) * 29;
      left = noise(index + 15) < .5 ? chat.left - field.left - slot.width + inset : chat.right - field.left - inset;
      top = chat.top - field.top + chat.height * (.09 + noise(index + 16) * .5);
    }
    card.classList.toggle('second-echo-overlap', overlaps);
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    card.style.width = `${slot.width}px`;
    if (!card.hasAttribute('data-index')) card.style.opacity = String(.49 + noise(index + 4) * .44);
    card.dataset.index = String(index);
  }
  function addEcho(index, record) {
    if (!running || ['quiet','final','rewinding','ready'].includes(screen.dataset.sceneStage)) return;
    const card = document.createElement('article'); card.className = 'second-echo-card'; card.dataset.at = record.at;
    card.innerHTML = `<header><span>PP · ${escapeHTML(record.at.slice(0,10).replaceAll('-', '.'))}</span><span aria-hidden="true">_ ×</span></header><div><span>${escapeHTML(current.name)}　<time>${escapeHTML(record.at.slice(11))}</time></span><p>${escapeHTML(record.text)}</p></div>`;
    positionEcho(card, index); $('.second-message-field').append(card);
    // 更早的框淡一些，最新一层保留清晰的蓝色窗框。
    const old = $('.second-message-field').children[index - 34]; if (old) old.style.opacity = '.38';
  }
  function growEchoes(dayIndex, messageIndex, count) {
    const compact = compactScreen.matches;
    if (!compact && (!dayIndex || (dayIndex === 1 && messageIndex < Math.floor(count / 2)))) return;
    if (compact && dayIndex === 0 && messageIndex < Math.floor(count / 2)) return;
    const ranges = compact ? [[0,2],[2,4],[4,7],[7,10],[10,13],[13,16],[16,19],[19,22]]
      : [[0,0],[0,6],[6,15],[15,27],[27,44],[44,64],[64,Math.max(84,peakCount * .7)],[Math.max(84,peakCount * .7),peakCount]];
    const [from,to] = ranges[dayIndex];
    const progress = dayIndex === 7 ? Math.min(1, (messageIndex + 2) / count)
      : (compact ? dayIndex === 0 : dayIndex === 1) ? (messageIndex - Math.floor(count / 2) + 1) / Math.ceil(count / 2) : (messageIndex + 1) / count;
    const target = Math.round(from + (to - from) * progress), amount = Math.max(0, target - echoIssued);
    for (let i = 0; i < amount; i++) {
      const index = echoIssued++, opening = ['人呢','写完记得来找我啊！！！','今天总该写完了吧'];
      const record = (index < opening.length && seen.find(item => item.text === opening[index])) || seen[(index * 7 + Math.floor(index / 3)) % seen.length];
      later(i * Math.min(75, 520 / Math.max(1, amount)), () => addEcho(index, record));
    }
  }
  function orderEchoesForRewind() {
    const bounds = $('.second-message-field').getBoundingClientRect();
    return [...$('.second-message-field').children].map(card => {
      const r = card.getBoundingClientRect();
      const distance = Math.hypot((r.left + r.width / 2 - bounds.left) / bounds.width - .5, (r.top + r.height / 2 - bounds.top) / bounds.height - .5);
      return {card, distance};
    }).sort((a,b) => b.distance - a.distance).map(({card}) => card);
  }
  function fadeEchoBatch(cards, duration) {
    cards.forEach((card, index) => {
      const delay = reducedMotion ? 0 : Math.round(index / cards.length * 130);
      card.style.transition = `opacity ${duration}ms ease ${delay}ms`;
      card.style.opacity = '0';
      later(duration + delay, () => card.remove());
    });
  }
  window.addEventListener('resize', () => {
    if (!running || screen.dataset.sceneStage === 'rewinding') return;
    buildSlots();
    for (const card of $('.second-message-field').children) positionEcho(card, Number(card.dataset.index));
  });
  function beginDay(group, index) {
    setStage(group.id);
    if (index === 0) {
      bgm.currentTime = 0;
      startMusic(.38);
    }
  }
  function showMessage(record, dayIndex, messageIndex, count) {
    addDate(record.at.slice(0,10)); history.insertAdjacentHTML('beforeend', messageHTML(record));
    seen.push(record); scrollToLatest(); messageTone();
    growEchoes(dayIndex, messageIndex, count);
  }
  function quiet() { setStage('quiet'); stopMusic(.85); }
  function typeFinalLine() {
    setStage('final'); stopMusic();
    const record = story().finalMessage;
    history.insertAdjacentHTML('beforeend', messageHTML({...record, text:''}, false, 'second-final-message'));
    const paragraph = $('.second-final-message p'), letters = Array.from(record.text); paragraph.classList.add('retro-typing');
    letters.forEach((letter,index) => later(150 + index * 155, () => { paragraph.textContent += letter; scrollToLatest(); }));
    later(letters.length * 155 + 220, () => {
      paragraph.classList.remove('retro-typing'); screen.dataset.finalSent = 'true';
      later(1200, beginRewind);
    });
    scrollToLatest();
  }
  function renderDateSheet(sheet, date) {
    const [year,month,day] = date.split('-');
    sheet.dateTime = date;
    sheet.innerHTML = `<span>${year} 年 ${Number(month)} 月</span><strong>${day}</strong>`;
  }
  function settleDate(date) {
    const leaf = $('.calendar-leaf');
    leaf.style.transition = 'none';
    leaf.style.transform = '';
    leaf.style.opacity = '';
    renderDateSheet(leaf,date);
    renderDateSheet($('.calendar-next'),date);
    $('.second-calendar').dataset.date = date;
    $('.second-announcement').textContent = dateText(date);
    if (date === targetDate && !screen.classList.contains('second-ending')) stopMusic(1.1);
  }
  function animateDateTurn(date, duration) {
    const leaf = $('.calendar-leaf');
    renderDateSheet($('.calendar-next'),date);
    void leaf.offsetWidth;
    leaf.style.transition = `transform ${duration}ms cubic-bezier(.4,.04,.45,1), opacity ${duration}ms ease-in`;
    leaf.style.transform = 'rotateX(92deg)';
    leaf.style.opacity = '.18';
  }
  function turnDate(date, duration) {
    if (reducedMotion) { settleDate(date); return; }
    animateDateTurn(date, duration);
    later(duration, () => settleDate(date));
  }
  function rollChat(group, duration) {
    const log = $('.second-rewind-log');
    const renderPreviousDay = () => {
      const {date, messages} = group;
      log.innerHTML = dateDivider(date) + messages.map(record => messageHTML(record)).join('');
      $('.second-chat-date').textContent = dateText(date);
      scrollToLatest();
    };
    if (reducedMotion) {
      renderPreviousDay();
      return;
    }
    const rollOutTime = Math.round(duration * .46);
    const rollOut = log.animate([
      {transform:'translateY(0)', opacity:1},
      {transform:'translateY(-36px)', opacity:0}
    ], {duration:rollOutTime, easing:'ease-in', fill:'forwards'});
    later(rollOutTime, () => {
      rollOut.cancel();
      renderPreviousDay();
      log.animate([
        {transform:'translateY(36px)', opacity:0},
        {transform:'translateY(0)', opacity:1}
      ], {duration:duration - rollOutTime, easing:'ease-out'});
    });
  }
  function beginRewind() {
    if (!running || ['rewinding','ready'].includes(screen.dataset.sceneStage)) return;
    clearSceneTimers(); stopMusic(); input.disabled = true; $('.second-skip').hidden = true;
    $('.second-modern').hidden = true;
    $('.second-system-alert').hidden = true;
    $('.second-calendar').hidden = false;
    setStage('rewinding');
    $('.second-era-year').textContent = '2008';
    const days = [...story().groups].reverse();
    const rewindLog = document.createElement('div');
    rewindLog.className = 'second-rewind-log';
    rewindLog.append(...history.childNodes);
    history.append(rewindLog);
    scrollToLatest();
    settleDate(days[0].date);
    startMusic(.44);
    const cards = orderEchoesForRewind();
    const steps = days.length - 1;
    const durations = [680,570,480,430,480,570,760];
    let at = 540;
    days.slice(1).forEach((group,index) => {
      const duration = reducedMotion ? 0 : Math.round(durations[index] * 0.9);
      const first = Math.floor(index * cards.length / steps);
      const last = Math.floor((index + 1) * cards.length / steps);
      later(at, () => {
        fadeEchoBatch(cards.slice(first,last), Math.round(duration * .85));
        rollChat(group,duration);
        turnDate(group.date,duration);
      });
      at += duration + (reducedMotion ? 250 : 140);
    });
    later(at + 980, finishScene);
  }
  function updateReadyClock() {
    if (!running || screen.dataset.sceneStage !== 'ready') return;
    $('.second-live-clock').textContent = realClock(new Date());
    const currentGeneration = generation;
    clockTimer = setTimeout(() => { if (running && generation === currentGeneration) updateReadyClock(); }, 1000);
  }
  function finishScene() {
    if (!running) return; clearSceneTimers(); stopMusic(1.4);
    $('.second-calendar').hidden = true; $('.second-message-field').hidden = true; $('.second-message-field').replaceChildren();
    $('.second-modern').hidden = true; $('.second-system-alert').hidden = true; $('.second-workspace').hidden = false; $('.second-skip').hidden = true;
    setStage('ready'); setPresence(true);
    $('.second-era-year').textContent = '2008';
    history.replaceChildren(); displayedDate = ''; addDate(targetDate);
    story().groups.find(group => group.date === targetDate).messages.forEach(record => history.insertAdjacentHTML('beforeend', messageHTML(record)));
    input.disabled = true; input.value = ''; $('.second-reply-form button').disabled = true; scrollToLatest(); updateReadyClock();
    browseButton.hidden = false;
    window.ADOPTION_SIX_DAY.mount(screen, {messageHTML, tone: messageTone, ending: startEnding});
    window.ADOPTION_ACHIEVEMENTS.cinematic('takeover-intro', false);
  }
  function startEnding(state) {
    if (screen.classList.contains('second-ending')) return;
    stopSound();
    window.ADOPTION_ACHIEVEMENTS.cinematic('second-ending', true);
    const calendar = $('.second-calendar');
    const stage = $('.second-stage');
    const workspace = $('.second-workspace');
    const script = [
      ['张呈', '填好了。'],
      ['雷淞然', '张先生，根据欧洲的法律，咱们孤儿院领养孩子……'],
      ['张呈', '我知道，是不可以指定的，得根据双方的情况进行匹配。'],
      ['雷淞然', '没错，您的资料是可以的，但我得额外再问您几个问题。'],
      ['张呈', '您问吧。'],
      ['雷淞然', '您介意孩子有一些缺点吗？'],
      ['张呈', '当然不介意了，是人就会有缺点。'],
      ['雷淞然', '您会尊重孩子的选择吗？'],
      ['张呈', '当然了。']
    ];
    const documentPage = document.createElement('article');
    documentPage.className = 'second-ending-document';
    documentPage.setAttribute('aria-label', '领养日.doc');
    documentPage.hidden = true;
    documentPage.innerHTML = `
      <header class="ending-word-title"><span class="ending-word-icon" aria-hidden="true">W</span>
        <span>领养日.doc - Microsoft Word</span>${buttons}
      </header>
      <div class="ending-word-tools" aria-hidden="true">
        <div class="ending-word-tabs"><b>开始</b><span>插入</span><span>页面布局</span><span>引用</span><span>审阅</span><span>视图</span></div>
        <div class="ending-word-ribbon"><span>宋体　 ▾</span><span>小四　 ▾</span><b>B</b><i>I</i><u>U</u><span class="ending-word-paragraph">≡　≣　≡</span></div>
      </div>
      <div class="ending-word-workspace" tabindex="0">
        <div class="ending-word-paper"><h2>领养日</h2>
          ${script.map(([name, text], index) => `<p style="--word-line: ${index}"><strong>${escapeHTML(name)}：</strong>${escapeHTML(text)}</p>`).join('')}
        </div>
      </div>
      <footer class="ending-word-status" aria-hidden="true"><span>第 1 页，共 1 页</span><span>100%</span></footer>`;
    const slate = document.createElement('div');
    slate.className = 'second-ending-slate';
    slate.hidden = true;
    const continueScene = document.createElement('button');
    continueScene.type = 'button';
    continueScene.className = 'second-ending-continue';
    continueScene.textContent = '点击继续演出';
    continueScene.hidden = true;
    stage.append(documentPage);
    screen.append(slate, continueScene);
    let restoring = false, frozenAnimations = [];
    let endingTitle, roll;

    function notice(text) {
      const line = document.createElement('p');
      line.className = 'second-ending-notice';
      line.textContent = text;
      history.append(line);
      scrollToLatest();
    }

    window.ADOPTION_SECOND_ENDING.start({
      begin(audio) {
        clearSceneTimers();
        screen.classList.add('second-ending');
        setStage('ending');
        setPresence(true);
        $('.second-controls').hidden = true;
        $('.second-live-clock').textContent = '';
        $('.second-reply-form').hidden = true;
        $('.retro-editor-tools').hidden = true;
        workspace.inert = true;
        audio.muted = muted;
        slate.before(audio);
        history.setAttribute('aria-live', 'off');
        calendar.setAttribute('aria-label', '日期向前翻动');
        history.replaceChildren();
        displayedDate = '';
        addDate('2008-08-23');
        settleDate('2008-08-23');
        calendar.hidden = false;
        notice('收养成功');
      },
      restore(value) {
        restoring = value;
        screen.classList.toggle('second-ending-restoring', value);
      },
      freeze(frozen) {
        if (frozen) {
          const active = screen.getAnimations({subtree: true}).filter(animation => animation.playState === 'running');
          frozenAnimations.push(...active);
          active.forEach(animation => animation.pause());
        } else {
          frozenAnimations.forEach(animation => animation.play());
          frozenAnimations = [];
        }
      },
      waitForGesture(resume, label) {
        continueScene.hidden = !resume && !label;
        continueScene.disabled = !resume;
        continueScene.textContent = label || '点击继续演出';
        continueScene.onclick = resume;
        if (resume) continueScene.focus({preventScroll: true});
      },
      flip(date, speed) {
        if (restoring || reducedMotion) settleDate(date);
        else animateDateTurn(date, speed);
      },
      date(date) {
        settleDate(date);
        $('.second-era-year').textContent = date.slice(0, 4);
      },
      chat(date) {
        addDate(date);
        scrollToLatest();
      },
      message({date, self, text}) {
        history.insertAdjacentHTML('beforeend', messageHTML({at: date, text}, self));
        scrollToLatest();
      },
      notice,
      fadeCalendar() { calendar.classList.add('is-fading'); },
      document(open, elapsed = 0) {
        documentPage.style.setProperty('--word-elapsed', elapsed + 'ms');
        documentPage.hidden = !open;
      },
      slate(step) {
        slate.hidden = false;
        slate.dataset.step = step;
        if (step === 'filename') {
          slate.innerHTML = '<div class="ending-file-card"><span>领养日<span class="ending-file-extension">.doc</span></span><span class="ending-file-icon" aria-hidden="true">W</span></div>';
        } else if (step === 'title') {
          slate.innerHTML = '<div class="ending-show-title"><p>喜人奇妙夜下一个作品是——</p><h2>《领养日》</h2></div>';
        } else if (step === 'video') {
          slate.replaceChildren(window.ADOPTION_ENDING_MEDIA.video);
        } else if (step === 'ending') {
          endingTitle = document.createElement('p');
          endingTitle.className = 'ending-screen-title';
          endingTitle.textContent = 'ENDING';
          slate.replaceChildren(endingTitle);
        } else if (step === 'credits') {
          roll = window.ADOPTION_ENDING_CREDITS.createRoll(slate);
        } else if (step === 'blackout') {
          slate.textContent = '';
        } else if (step === 'complete') {
          window.ADOPTION_ENDING_CREDITS.showSummary(slate);
        }
      },
      filmCut(seconds) {
        slate.dataset.filmCutAt = seconds.toFixed(3);
        const {audio, video} = window.ADOPTION_ENDING_MEDIA;
        video.requestVideoFrameCallback?.(() => {
          slate.dataset.filmFirstFrameAt = audio.currentTime.toFixed(3);
        });
      },
      endingOpacity(opacity) { endingTitle.style.opacity = opacity; },
      roll(progress) { roll(progress); },
      finish() { window.ADOPTION_ACHIEVEMENTS.cinematic('second-ending', false); }
    }, state);
  }
  function stop() {
    window.ADOPTION_ACHIEVEMENTS.cinematic('takeover-intro', false);
    window.ADOPTION_ACHIEVEMENTS.cinematic('second-ending', false);
    window.ADOPTION_SIX_DAY?.hide(); window.ADOPTION_SECOND_ENDING.stop(); browseButton.hidden = true;
    screen.querySelectorAll('.second-ending-document, .second-ending-slate, .second-ending-continue, audio').forEach(node => node.remove());
    $('.second-controls').hidden = false;
    $('.second-workspace').inert = false;
    history.setAttribute('aria-live', 'polite');
    $('.retro-editor-tools').hidden = false;
    $('.second-reply-form').hidden = false;
    $('.second-calendar').setAttribute('aria-label', '日期倒流');
    $('.second-calendar').classList.remove('is-fading');
    running = false; generation++; clearSceneTimers(); stopSound(); input.disabled = true;
    screen.hidden = true; document.body.classList.remove('second-play-open');
  }
  function messageDelay(record, dayIndex, index) {
    const bases = [820,750,700,720,700,820,620,Math.max(460,650 - index * 20)];
    const readingDelay = Math.min(340, record.text.length * (dayIndex >= 6 ? 10 : 13));
    let delay = Math.round((bases[dayIndex] + readingDelay) * 0.9);
    if (record.text === '其实我也挺想有个家的' || record.text === '你要是在就好了') delay += 950;
    return delay;
  }
  function start({onExit, onBrowse, openingMusic, replayOpening = false, resumeReady = false} = {}) {
    stop(); running = true; exitCallback = onExit; browseCallback = onBrowse; muted = false; reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    prepareSound();
    const playOpening = replayOpening || (!resumeReady && !window.ADOPTION_SIX_DAY.hasSave());
    if (playOpening) prepareMusic(openingMusic);
    else window.ADOPTION_ASSETS.release(openingMusic);
    seen = []; echoIssued = 0; displayedDate = '';
    screen.className = 'second-play-screen'; screen.hidden = false; screen.dataset.finalSent = 'false'; setStage('loading');
    document.body.classList.remove('game-open','login-open'); document.body.classList.add('second-play-open');
    ['intro-screen','login-screen','game-screen'].forEach(id => { document.getElementById(id).hidden = true; });
    if (!playOpening) { finishScene(); return; }
    window.ADOPTION_ACHIEVEMENTS.cinematic('takeover-intro', true);
    $('.second-era-year').textContent = '2026'; $('.second-modern').hidden = false; $('.second-modern').classList.remove('modern-retreat'); $('.second-login-state').textContent = '正在登录';
    $('.second-workspace').hidden = true; $('.second-system-alert').hidden = true; $('.second-calendar').hidden = true; $('.second-skip').hidden = false;
    $('.second-message-field').hidden = false; $('.second-message-field').replaceChildren(); buildSlots();
    $('.second-live-clock').textContent = ''; $('.second-announcement').textContent = '';
    setPresence(true); input.disabled = true; input.value = ''; $('.second-reply-form button').disabled = true;
    $('.second-editor-status').textContent = '对方离线，消息将保存为离线消息。'; history.replaceChildren();
    const lastDay = window.ADOPTION_CHATS.find(contact => contact.id === 'cheng').sections.find(section => section.date === '2008-08-17');
    addDate(lastDay.date);
    lastDay.messages.slice(-4).forEach(([time,from,text]) => history.insertAdjacentHTML('beforeend', messageHTML({at:`${lastDay.date} ${time}`,text},from === 'other')));
    $('.second-chat-date').textContent = '2008年8月18日'; $('.second-skip').focus({preventScroll:true}); updateAudioButton();
    later(1050, () => { setStage('past'); $('.second-workspace').hidden = false; $('.second-modern').classList.add('modern-retreat'); scrollToLatest(); });
    later(2050, () => {
      setStage('disconnected');
      setPresence(false);
      $('.second-system-alert').hidden = false;
      $('.second-login-state').textContent = '已登录';
      messageTone(true);
      if (window.ADOPTION_FIRST_ENDING.read()?.phase === 'done') {
        window.ADOPTION_ACHIEVEMENTS.record('original-session-disconnected');
      }
    });
    later(4200, () => { $('.second-system-alert').hidden = true; $('.second-modern').hidden = true; $('.second-era-year').textContent = '2008'; });
    later(4500, () => { history.replaceChildren(); displayedDate = ''; $('.second-editor-status').textContent = `${legacy.name}已离线`; });
    let at = 4700;
    story().groups.forEach((group,dayIndex) => {
      later(at, () => beginDay(group,dayIndex));
      group.messages.forEach((record,index) => { later(at, () => showMessage(record,dayIndex,index,group.messages.length)); at += messageDelay(record,dayIndex,index); });
      at += dayIndex < 6 ? 250 : 170;
    });
    later(at, quiet);
    later(at + 1400, typeFinalLine);
  }
  $('.second-skip').addEventListener('click', beginRewind);
  $('.second-exit').addEventListener('click', () => { const callback = exitCallback; stop(); callback?.(); });
  $('.second-audio').addEventListener('click', () => {
    if (!muted && soundReady()) {
      muted = true;
      masterGain.gain.setTargetAtTime(0, audioContext.currentTime, .025);
    } else {
      muted = false;
      if (masterGain) masterGain.gain.setTargetAtTime(.8, audioContext.currentTime, .025);
      prepareSound(true);
      if (musicExpected) playMusic();
    }
    if (bgm) bgm.muted = muted;
    updateAudioButton();
  });
  function resume() {
    screen.hidden = false; document.getElementById('game-screen').hidden = true;
    document.body.classList.remove('game-open'); document.body.classList.add('second-play-open');
    window.ADOPTION_SIX_DAY.refresh();
  }
  window.ADOPTION_SECOND_PLAY = {start, stop, resume, prepare: () => {}, isMuted: () => !screen.hidden && muted};
})();
