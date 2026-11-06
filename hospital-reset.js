(() => {
  'use strict';

  const key = 'adoption-day-hospital-reset-v1';
  const openedKey = key + ':opened';
  const id = 'hospital-reset';
  const localFile = location.protocol === 'file:';
  const validDate = value => typeof value === 'string' && /^2025-12-29T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value);
  let memory;
  let openedInMemory;

  function read() {
    try {
      const date = localStorage.getItem(key);
      if (validDate(date)) return date;
    } catch {}
    return memory;
  }

  function save(date) {
    if (!validDate(date)) return undefined;
    const previous = read();
    if (previous) return previous;
    memory = date;
    try { localStorage.setItem(key, date); } catch {}
    return date;
  }

  function reset() {
    const previous = read();
    if (previous) return {date: previous, isNew: false};
    const now = new Date();
    const clock = [now.getHours(), now.getMinutes(), now.getSeconds()].map(value => String(value).padStart(2, '0')).join(':');
    return {date: save('2025-12-29T' + clock), isNew: true};
  }

  function isUnread(date) {
    if (!date || openedInMemory === date) return false;
    try { return localStorage.getItem(openedKey) !== date; } catch { return true; }
  }

  function markOpened(date) {
    if (!validDate(date)) return;
    openedInMemory = date;
    try { localStorage.setItem(openedKey, date); } catch {}
  }

  function mailLink(date, message = id) {
    const params = new URLSearchParams({mail: message, from: 'hospital'});
    if (localFile) params.set('resetDate', date);
    return 'index.html?' + params.toString();
  }

  function playNotification() {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    try {
      const context = new Context();
      const start = context.currentTime + .015;
      const tones = [880, 1174.66];
      tones.forEach((frequency, index) => {
        const time = start + index * .095;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(.001, time);
        gain.gain.exponentialRampToValueAtTime(.13, time + .02);
        gain.gain.exponentialRampToValueAtTime(.001, time + .11);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(time);
        oscillator.stop(time + .12);
        if (index === tones.length - 1) oscillator.onended = () => context.close().catch(() => {});
      });
      context.resume().catch(() => context.close().catch(() => {}));
    } catch {}
  }

  window.ADOPTION_HOSPITAL_RESET = {key, openedKey, id, read, save, reset, isUnread, markOpened, mailLink, playNotification};
})();
