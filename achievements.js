(() => {
  'use strict';

  const awardPrefix = 'adoption-day-achievement-unlocked-v1:';
  const progressPrefix = 'adoption-day-achievement-progress-v1:';
  const paperTrail = ['snow-drawing', 'paper-report', 'hospital-from-paper-report'];
  const noticeDuration = 4000;
  const catalog = [
    {
      id: 'paper-plane', event: 'paper-trail-complete',
      name: '纸短情长', description: '纸飞机或许没有收信人，却载着一个孩子未曾说出口的千言万语。',
      evidence: () => paperTrail.every(hasProgress) && paperTrail
    },
    {
      id: 'lei-letters', event: 'lei-mail',
      name: '阴魂不散', description: '旧魇未死，仍以父亲署名。',
      evidence(mailId) {
        const letters = window.ADOPTION_MAIL.filter(mail => mail.senderId === 'lei-li' && mail.body);
        if (!letters.some(mail => mail.id === mailId)) return false;
        saveProgress('mail:' + mailId);
        return letters.every(mail => hasProgress('mail:' + mail.id)) && letters.map(mail => mail.id);
      }
    },
    {
      id: 'sealed-memo', event: 'sealed-memo-opened',
      name: '†漆黑の封印†', description: '暗夜の王者终究没能逃过命运的审判——以及十六岁时留下的黑历史。'
    },
    {
      id: 'before-meeting', event: 'wang-friendship-read',
      name: '相逢以前', description: '两段人生尚未交汇，故人的故事却早已写在彼此的序章里。',
      evidence: () => hasProgress('wang-search') && ['wang-search', 'wang-friendship-read']
    },
    {
      id: 'years-away', event: 'lei-personal-profile',
      name: '此去经年', description: '所幸岁月不只带走了他的童年，也终于还给他一个可以称作家的地方。',
      evidence: () => ['lei-name-search', 'lei-personal-profile']
    },
    {
      id: 'silent-snow', event: 'injury-pdf-opened',
      name: '雪落无声', description: '原来最漫长的一场雪，并不下在天上，而是下在他无人问津的童年。'
    },
    {
      id: 'mobius', event: 'original-session-disconnected',
      name: '莫比乌斯', description: '当你终于抵达时间的彼岸，才发觉自己从未离开故事的起点。',
      evidence: () => ['first-ending-finished', 'original-session-disconnected']
    },
    {
      id: 'see-you-tomorrow', event: 'promise-kept',
      name: '明天见', description: '跨越十七年的一句明天见，终于等来了它的下一句。',
      evidence: () => ['day1_promise', 'day2_kept_promise']
    },
    {
      id: 'peace-of-mind', event: 'reassurance-full',
      name: '此心安处', description: '人间风雪如故，从此不必再问归途。'
    },
    {
      id: 'same-destination', event: 'second-ending-finished',
      name: '殊途同归', description: '命运可以改写所有来路，却终究改不掉你们的相逢。',
      evidence: () => ['second-play-success', 'second-ending-finished']
    }
  ];

  const memory = new Map();
  const holds = new Set();
  let dialog, list, count, toast, toastName, toastDescription;
  let showing = false;
  let checking = false;
  let dismissTimer;
  let noticeAudio;
  let noticeControls;
  let noticeId;

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) ?? memory.get(key); } catch { return memory.get(key); }
  }

  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { memory.set(key, value); }
  }

  const hasProgress = event => Boolean(read(progressPrefix + event));
  const saveProgress = event => write(progressPrefix + event, true);
  const award = id => read(awardPrefix + id);

  function record(event, detail) {
    if (window.ADOPTION_GAME_RESET?.isCurrent() === false || document.documentElement.hidden) return;
    if (event === 'wang-search') {
      saveProgress(event);
      return;
    }
    if (paperTrail.includes(event)) {
      if (event === 'hospital-from-paper-report' && !hasProgress('paper-report')) return;
      saveProgress(event);
      event = 'paper-trail-complete';
    }
    const item = catalog.find(entry => entry.event === event);
    if (!item || award(item.id)) return;
    const evidence = item.evidence ? item.evidence(detail) : [event];
    if (!evidence) return;
    write(awardPrefix + item.id, {at: new Date().toISOString(), evidence, notified: false});
    refresh();
  }

  function render() {
    if (!list) return;
    let unlocked = 0;
    list.replaceChildren(...catalog.map(item => {
      const achieved = Boolean(award(item.id));
      if (achieved) unlocked++;
      const card = document.createElement('li');
      card.className = achieved ? 'achievement-card is-unlocked' : 'achievement-card';
      const icon = document.createElement('span');
      icon.className = 'achievement-card-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = achieved ? '★' : '◇';
      const copy = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = achieved ? item.name : '？？？';
      const status = document.createElement('span');
      status.className = 'achievement-state';
      status.textContent = achieved ? '已解锁' : '尚未解锁';
      copy.append(title, status);
      if (achieved) {
        const description = document.createElement('p');
        description.textContent = item.description;
        copy.append(description);
      }
      card.append(icon, copy);
      return card;
    }));
    count.textContent = '已解锁 ' + unlocked + ' / ' + catalog.length;
  }

  function blocked() {
    return document.hidden || holds.size > 0 ||
      document.documentElement.classList.contains('first-play-cover') ||
      Boolean(document.querySelector('dialog[open]'));
  }

  function positionToast() {
    toast.style.removeProperty('--achievement-bottom');
    noticeControls?.style.removeProperty('--achievement-clearance');
    noticeControls = document.querySelector('#second-play-screen:not([hidden]) .six-choices:not([hidden])');
    if (!noticeControls || toast.hidden || !matchMedia('(max-width: 900px), (max-height: 480px)').matches) return;
    const panel = noticeControls.getBoundingClientRect();
    const card = toast.getBoundingClientRect();
    if (card.left < panel.right && card.right > panel.left && card.top < panel.bottom) {
      noticeControls.style.setProperty('--achievement-clearance', Math.max(0, panel.bottom - card.top + 10) + 'px');
    }
  }

  function dismiss(completed = true) {
    if (!showing || toast.hidden) return;
    clearTimeout(dismissTimer);
    if (noticeAudio) closeNoticeAudio(noticeAudio);
    toast.hidden = true;
    noticeControls?.style.removeProperty('--achievement-clearance');
    noticeControls = undefined;
    showing = false;
    if (completed === false && noticeId) {
      const saved = award(noticeId);
      if (saved) write(awardPrefix + noticeId, {...saved, notified: false});
    }
    noticeId = undefined;
    pump();
  }

  function closeNoticeAudio(context) {
    if (noticeAudio === context) noticeAudio = undefined;
    if (context.state !== 'closed') context.close().catch(() => {});
  }

  function playNoticeSound() {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context || window.ADOPTION_SECOND_PLAY?.isMuted?.()) return;
    try {
      const context = new Context();
      noticeAudio = context;
      const play = () => {
        if (noticeAudio !== context || window.ADOPTION_SECOND_PLAY?.isMuted?.()) return;
        const tones = [783.99, 1046.5];
        const start = context.currentTime + 0.02;
        tones.forEach((frequency, index) => {
          const time = start + index * 0.085;
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          oscillator.frequency.value = frequency;
          gain.gain.setValueAtTime(0.0001, time);
          gain.gain.exponentialRampToValueAtTime(0.09, time + 0.014);
          gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
          oscillator.connect(gain).connect(context.destination);
          oscillator.start(time);
          oscillator.stop(time + 0.17);
          if (index === tones.length - 1) oscillator.onended = () => closeNoticeAudio(context);
        });
      };
      if (context.state === 'running') play();
      else context.resume().then(play).catch(() => closeNoticeAudio(context));
    } catch {}
  }

  function resumeNoticeSound() {
    if (noticeAudio?.state === 'suspended') noticeAudio.resume().catch(() => {});
  }

  function claimNext() {
    if (showing || blocked()) return;
    const next = catalog.map(item => ({item, saved: award(item.id)}))
      .filter(({saved}) => saved && !saved.notified)
      .sort((a, b) => a.saved.at.localeCompare(b.saved.at))[0];
    if (!next) return;
    const {item, saved} = next;
    write(awardPrefix + item.id, {...saved, notified: true});
    showing = true;
    noticeId = item.id;
    toastName.textContent = item.name;
    toastDescription.textContent = item.description;
    toast.hidden = false;
    positionToast();
    playNoticeSound();
    dismissTimer = setTimeout(dismiss, noticeDuration);
  }

  function pump() {
    if (!toast || checking || showing || blocked()) return;
    checking = true;
    const claim = () => {
      checking = false;
      claimNext();
    };
    if (navigator.locks) navigator.locks.request(awardPrefix + 'notification', claim).catch(claim);
    else claim();
  }

  function refresh() {
    if (dialog?.open) render();
    pump();
  }

  function cinematic(scene, active) {
    if (active) {
      holds.add(scene);
      dismiss(false);
    } else {
      holds.delete(scene);
      pump();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', `
      <dialog class="achievement-dialog" aria-labelledby="achievement-title">
        <header><div><h2 id="achievement-title">成就图鉴</h2><p class="achievement-count"></p></div>
          <form method="dialog"><button type="submit" aria-label="关闭成就图鉴">×</button></form>
        </header>
        <ol class="achievement-list"></ol>
      </dialog>
      <aside class="achievement-toast" hidden>
        <div role="status"><span>成就解锁</span><strong></strong><p></p></div>
        <button type="button" aria-label="关闭成就提示">×</button>
      </aside>`);
    dialog = document.querySelector('.achievement-dialog');
    list = dialog.querySelector('.achievement-list');
    count = dialog.querySelector('.achievement-count');
    toast = document.querySelector('.achievement-toast');
    toast.style.setProperty('--achievement-duration', noticeDuration + 'ms');
    toastName = toast.querySelector('strong');
    toastDescription = toast.querySelector('p');
    toast.querySelector('button').addEventListener('click', dismiss);
    document.addEventListener('click', event => {
      if (event.target.closest('[data-achievement-open]') && !dialog.open) {
        render();
        dialog.showModal();
      }
    });
    if (window.ResizeObserver) new ResizeObserver(() => { if (showing) positionToast(); }).observe(document.body);
    window.addEventListener('resize', () => { if (showing) positionToast(); });
    refresh();
  });

  window.addEventListener('storage', event => {
    if (event.key?.startsWith(awardPrefix)) refresh();
  });
  window.addEventListener('pageshow', refresh);
  document.addEventListener('visibilitychange', refresh);
  document.addEventListener('pointerdown', resumeNoticeSound, {capture: true, passive: true});
  document.addEventListener('keydown', resumeNoticeSound, {capture: true});
  document.addEventListener('close', pump, true);
  window.ADOPTION_ACHIEVEMENTS = {record, cinematic};
})();
