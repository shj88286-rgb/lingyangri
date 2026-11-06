(() => {
  'use strict';

  const key = 'adoption-day-first-play-ending-v2';
  const entryHash = '#first-play-ending';
  const replayHash = '#first-play-replay';
  const coreFiles = ['injury', 'placement'];
  const progressName = id => id === 'injury' ? 'injury-confirmed' : id;
  const readKey = id => key + ':read:' + progressName(id);
  const localFile = location.protocol === 'file:';
  const readFiles = new Set();
  const lines = [
    "原来，“雷哲铭”就是雷淞然。",
    "这个名字是他的过往，也承载着他藏得最深最重的伤痛。",
    "原来那个明明比你小不了几岁，却总是故作天真、满嘴玩笑的男人，许多年前，也只是个无辜的孩子，也曾满怀期待地希望自己有一个家。",
    "他曾以为自己是一个幸运的人。",
    "后来被领养，他以为自己终于得到了“爱”，却没有想到，等来的是殴打、侵犯与无休止的恐惧。甚至直到被送回孤儿院，他都仍以为，是自己不够听话，才失去了被爱的资格。",
    "",
    "原来，他总爱学猫叫，是因为做一只温顺的小猫，曾比做一个孩子更容易得到父亲的宽恕。",
    "原来，他舍不得那辆早已损坏的小汽车，是因为那是苦难岁月里仅有的温情。",
    "原来，他想在身上纹一条威风凛凛的龙，是因为那个曾受尽欺辱的孩子，一直都渴望拥有保护自己的力量。",
    "原来，他总热衷叫别人爸爸，又急着让别人叫自己爸爸，是因为他比谁都渴望一个家，也比谁都害怕再次被抛弃。",
    "原来那些荒唐的言语、古怪的举动，只是一个孩子笨拙地向世界索取爱意的方式。",
    "原来，原来……",
    "在他回到秋叶孤儿院之后的两年，终于又有人愿意带他回家。",
    "可是这一次，他拒绝了。",
    "他害怕重蹈覆辙，害怕落雪的冬天，害怕温柔的承诺最终又一次变成一道道伤痕。",
    "所以他宁可在等待中蹉跎时光，直到他也成长为一个成年人。",
    "",
    "而在那个夏天，他还等着另一个人。",
    "你还记得吗？",
    "2008年8月17日，你曾对他许下一句承诺：",
    "“明天见。”",
    "可是从那以后，你再没有出现。",
    "他不知道一切的阴差阳错，能做的只有等待。",
    "他等了一天，又一天，等过不知多少个四季，直到终于明白，他再也不会收到你的消息。",
    "如果他只是你生命中的普通过客，或许你永远都不会知道。",
    "雷力让他对“家”感到恐惧，而你的不告而别，让他更加确信，所有曾经与他建立过关系的人，最终都会离他而去。",
    "于是，他将自己困在原地，错过了那个本可以改变一生的机会。",
    "",
    "然而命运就是这样戏谑，让你们在多年后以另一种身份重逢。",
    "十七年后，你终于在他的账号里看到了当年没能收到的消息。",
    "堆叠的请求与思念，跨越时间，迟来地，像潮水一样地淹没了你。",
    "原来，他不是不愿长大，并非“智障”也不是不懂爱。",
    "他只是一直在原地，等了很久很久。",
    "等一条回复的讯息，等一个会倾向他的心，等被某人坚定地选择。",
    "他拥有的东西并不多，于是等待的东西也不多。",
    "最后的最后，其实只是在等待那个或许早已被你遗忘，却始终被他留在心里的——",
    "",
    "明天。"
];
  let memory;
  let playing = false;
  let music;

  function stopMusic() {
    if (music) window.ADOPTION_ASSETS.release(music);
    music = undefined;
    const button = document.getElementById('play-ending-music');
    if (button) button.hidden = true;
  }

  function playMusic(sceneButton, scroll) {
    if (music && !music.paused) return;
    const player = new Audio();
    player.volume = 0.55;
    music = player;
    const loginButton = document.getElementById('play-ending-music');
    const showFallback = visible => {
      if (music !== player) return;
      sceneButton.hidden = !visible;
      if (loginButton) loginButton.hidden = !visible;
    };
    const tryPlay = () => window.ADOPTION_ASSETS.attach(player, 'assets/audio/first-play-ending.m4a', {preload: 'auto'}).then(() => player.play()).then(() => {
      if (sceneButton === document.activeElement) scroll.focus({preventScroll: true});
      showFallback(false);
    }).catch(() => {
      showFallback(true);
    });
    sceneButton.onclick = tryPlay;
    if (loginButton) loginButton.onclick = tryPlay;
    tryPlay();
  }

  function recordRead(id, notifyOpener = true) {
    if (!coreFiles.includes(id) || readFiles.has(id)) return;
    readFiles.add(id);
    try { localStorage.setItem(readKey(id), 'true'); } catch {}
    if (localFile && notifyOpener) window.opener?.postMessage({type: key + ':file-read', id: progressName(id)}, '*');
  }

  function importProgress(name) {
    const id = coreFiles.find(file => progressName(file) === name);
    if (id) recordRead(id, false);
  }

  // Direct HTML opens can isolate browser storage by file.
  if (localFile) {
    const carried = new URLSearchParams(location.search).get('read');
    carried?.split(',').forEach(importProgress);
  }

  function hasRead(id) {
    if (readFiles.has(id)) return true;
    try { return localStorage.getItem(readKey(id)) === 'true'; } catch { return false; }
  }

  const allFilesRead = () => coreFiles.every(hasRead);

  function withProgress(href) {
    if (!localFile) return href;
    const completed = coreFiles.filter(hasRead);
    if (!completed.length) return href;
    const url = new URL(href, location.href);
    url.searchParams.set('read', completed.map(progressName).join(','));
    return url.href;
  }

  function read() {
    if (memory?.phase === 'done') return memory;
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (saved?.phase === 'done' || (saved?.phase === 'pending' && saved.reportConfirmed)) return saved;
    } catch {}
    return memory;
  }

  function save(phase, position = 0) {
    if (window.ADOPTION_GAME_RESET?.isCurrent() === false) return;
    memory = {phase, position, reportConfirmed: true};
    try { localStorage.setItem(key, JSON.stringify(memory)); } catch {}
  }

  function queue() {
    if (!allFilesRead() || read()) return false;
    save('pending');
    return true;
  }

  function redirectIfReady() {
    if (document.hidden || !queue()) return false;
    location.replace(withProgress('index.html' + entryHash));
    return true;
  }

  function play(onComplete, replay = false) {
    if (playing || (!replay && (!allFilesRead() || read()?.phase === 'done'))) return;
    playing = true;
    const skip = () => {
      playing = false;
      document.documentElement.classList.remove('first-play-cover');
    };
    const begin = release => {
      if (!replay && read()?.phase === 'done') {
        skip();
        release();
        return;
      }
      if (!replay) queue();
      playScene(onComplete, replay, release);
    };
    if (navigator.locks) {
      navigator.locks.request(key, {ifAvailable: true}, lock => {
        if (!lock) return skip();
        return new Promise(begin);
      }).catch(() => begin(() => {}));
    } else begin(() => {});
  }

  function playScene(onComplete, replay, release) {
    window.ADOPTION_ACHIEVEMENTS?.cinematic('first-ending', true);
    const cover = document.getElementById('game-cover');
    if (cover) cover.hidden = true;
    window.ADOPTION_BLOG?.leave();
    const overlay = document.createElement('div');
    overlay.className = 'first-play-ending';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '结尾');
    const scroll = document.createElement('div');
    scroll.className = 'first-play-scroll';
    scroll.tabIndex = 0;
    const credits = document.createElement('div');
    credits.className = 'first-play-credits';
    lines.forEach((text, index) => {
      if (!text) {
        const gap = document.createElement('div');
        gap.className = 'first-play-gap';
        credits.append(gap);
        return;
      }
      const paragraph = window.ADOPTION_ENDING_TYPE.paragraph(text);
      if (index === lines.length - 1) paragraph.classList.add('first-play-last');
      credits.append(paragraph);
    });
    scroll.append(credits);
    const musicButton = document.createElement('button');
    musicButton.className = 'first-play-music';
    musicButton.type = 'button';
    musicButton.textContent = '播放片尾曲';
    musicButton.hidden = true;
    overlay.append(scroll, musicButton);
    const background = [...document.body.children].filter(element => !element.inert);
    background.forEach(element => { element.inert = true; });
    document.body.append(overlay);
    document.documentElement.classList.remove('first-play-cover');
    scroll.focus({preventScroll: true});
    playMusic(musicButton, scroll);

    const limit = () => Math.max(1, scroll.scrollHeight - scroll.clientHeight);
    const savedPosition = replay ? 0 : Number(read()?.position) || 0;
    scroll.scrollTop = Math.max(0, Math.min(1, savedPosition)) * limit();
    let position = scroll.scrollTop;
    let previousTop = position;
    let previousTime = 0;
    let pauseUntil = 0;
    let finalHold = 0;
    let lastSaved = 0;
    const pause = () => { pauseUntil = performance.now() + 1800; };
    scroll.addEventListener('wheel', pause, {passive: true});
    scroll.addEventListener('touchstart', pause, {passive: true});
    const checkpoint = () => {
      if (!replay && read()?.phase !== 'done') save('pending', Math.min(1, scroll.scrollTop / limit()));
    };
    window.addEventListener('pagehide', checkpoint);
    checkpoint();

    function advance(now) {
      const elapsed = previousTime ? Math.min(64, now - previousTime) : 0;
      previousTime = now;
      if (document.getElementById('landscape-prompt')?.open) {
        window.requestAnimationFrame(advance);
        return;
      }
      if (scroll.scrollTop !== previousTop) {
        position = scroll.scrollTop;
        pauseUntil = now + 1800;
      }
      const end = limit();
      if (now >= pauseUntil) {
        position = Math.min(end, position + elapsed * 0.046);
        scroll.scrollTop = position;
      }
      previousTop = scroll.scrollTop;
      finalHold = scroll.scrollTop >= end - 1 ? finalHold + elapsed : 0;
      if (now - lastSaved >= 800) {
        checkpoint();
        lastSaved = now;
      }
      if (finalHold >= 3000) {
        scroll.inert = true;
        credits.classList.add('is-fading');
        window.setTimeout(() => {
          window.removeEventListener('pagehide', checkpoint);
          if (!replay) save('done', 1);
          const focusTarget = onComplete();
          overlay.classList.add('is-revealing');
          window.setTimeout(() => {
            overlay.remove();
            background.forEach(element => { element.inert = false; });
            playing = false;
            window.ADOPTION_ACHIEVEMENTS?.cinematic('first-ending', false);
            release();
            focusTarget?.focus({preventScroll: true});
          }, 1250);
        }, 900);
        return;
      }
      window.requestAnimationFrame(advance);
    }
    window.requestAnimationFrame(advance);
  }

  window.ADOPTION_FIRST_ENDING = {key, entryHash, replayHash, read, queue, redirectIfReady, play, recordRead, importProgress, allFilesRead, withProgress, stopMusic};
  const html = document.documentElement;
  if (html.hasAttribute('data-first-play-game') &&
      (location.hash === entryHash || location.hash === replayHash || read()?.phase === 'pending')) {
    html.classList.add('first-play-cover');
  }
})();
