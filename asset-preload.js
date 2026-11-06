/* Native URLs keep responsive images, Range requests and HTTP caching in the browser. */
(() => {
  'use strict';
  const base = new URL('.', document.currentScript.src);
  const url = path => new URL(path, base).href;
  const images = new Map();
  const pending = [];
  let working = false;

  function mayWarm() {
    const network = navigator.connection;
    return !document.hidden && navigator.onLine !== false && !network?.saveData &&
      !['slow-2g', '2g', '3g'].includes(network?.effectiveType);
  }

  function schedule() {
    if (working || !pending.length) return;
    working = true;
    const next = () => {
      const path = pending.shift();
      if (images.get(path) === 'ready') {
        working = false;
        schedule();
        return;
      }
      if (!mayWarm()) {
        images.delete(path);
        working = false;
        schedule();
        return;
      }
      const image = new Image();
      image.fetchPriority = 'low';
      image.decoding = 'async';
      images.set(path, 'loading');
      const finish = state => {
        image.onload = image.onerror = null;
        images.set(path, state);
        working = false;
        schedule();
      };
      image.onload = () => finish('ready');
      image.onerror = () => finish('error');
      image.src = path;
    };
    if (window.requestIdleCallback) window.requestIdleCallback(next);
    else setTimeout(next, 350);
  }

  // Only callers at a specific scene boundary may nominate the next two ordinary images.
  function warm(paths) {
    if (!mayWarm()) return;
    for (const path of paths.slice(0, 2)) {
      const href = url(path);
      if (images.has(href) || pending.length >= 2) continue;
      images.set(href, 'queued');
      pending.push(href);
    }
    schedule();
  }

  const pausedPositions = new WeakMap();
  function attach(player, path, {preload = 'none'} = {}) {
    const href = url(path);
    player.preload = preload;
    if (player.src !== href) {
      player.src = href;
      const bookmark = pausedPositions.get(player);
      pausedPositions.delete(player);
      if (bookmark?.href === href && bookmark.time > 0) player.currentTime = bookmark.time;
    }
    else if (player.error) player.load(); // Explicit play/retry, never a background retry loop.
    return Promise.resolve(player);
  }

  function release(player, rememberPosition = false) {
    if (!player?.hasAttribute('src')) return;
    if (rememberPosition) pausedPositions.set(player, {href: player.src, time: player.currentTime});
    else pausedPositions.delete(player);
    player.pause();
    player.removeAttribute('src');
    player.load();
  }

  function trackImage(event) {
    const image = event.target;
    if (image instanceof HTMLImageElement && image.currentSrc) {
      images.set(image.currentSrc, event.type === 'load' ? 'ready' : 'error');
    }
  }
  document.addEventListener('load', trackImage, true);
  document.addEventListener('error', trackImage, true);
  for (const image of document.images) {
    if (image.complete && image.currentSrc) images.set(image.currentSrc, image.naturalWidth ? 'ready' : 'error');
  }

  function status(path) {
    if (path) return images.get(url(path)) || 'unrequested';
    const states = [...images.values()];
    return {total: states.length, loaded: states.filter(s => s === 'ready').length,
      failed: states.filter(s => s === 'error').length};
  }

  window.ADOPTION_ASSETS = {url, attach, release, warm, status, ready: () => Promise.resolve(status()),
    failures: () => [...images].filter(([, value]) => value === 'error').map(([path]) => ({path}))};

  const cover = document.getElementById('game-cover');
  if (!cover) return;
  const picture = cover.querySelector('img');
  const hint = document.createElement('button');
  hint.type = 'button';
  hint.className = 'asset-loading';
  hint.setAttribute('aria-label', '进入游戏');
  document.body.append(hint);
  let loading = false;
  let started = false;
  let enterRequested = false;
  let failure = '';
  function showHint() {
    hint.hidden = cover.hidden || (!failure && !loading && picture.complete && picture.naturalWidth > 0);
    hint.textContent = failure || (loading ? '正在打开游戏…' :
      picture.complete ? '封面未能显示，点击进入游戏' : '封面加载中，可点击进入游戏');
  }
  picture.addEventListener('load', showHint);
  picture.addEventListener('error', showHint);
  hint.onclick = () => cover.click();
  showHint();

  // Keep stylesheet cascade order. Parallel downloads within a group only run independent scripts.
  const loads = new Map();
  function loadSlot(slot) {
    if (loads.has(slot)) return loads.get(slot);
    const source = slot.content.firstElementChild;
    const el = document.createElement(source.localName);
    for (const attr of source.attributes) el.setAttribute(attr.name, attr.value);
    const promise = new Promise((resolve, reject) => {
      el.onload = resolve;
      el.onerror = () => { el.remove(); loads.delete(slot); reject(new Error(source.src || source.href)); };
      slot.before(el);
    });
    loads.set(slot, promise);
    return promise;
  }
  async function loadGroups(...groups) {
    for (const group of groups) {
      const slots = document.querySelectorAll('template[data-boot="' + group + '"]');
      await Promise.all(Array.from(slots, loadSlot));
    }
  }
  window.ADOPTION_ASSETS.loadGroups = loadGroups;
  async function openGame(clicked) {
    enterRequested ||= clicked;
    if (started || loading) return;
    loading = true;
    failure = '';
    showHint();
    try {
      await loadGroups('base', 'entry');
      started = true;
      cover.removeEventListener('click', enter);
      if (enterRequested && !cover.hidden) cover.click();
    } catch {
      failure = '游戏资源未能载入，点击重试';
    } finally {
      loading = false;
      showHint();
    }
  }
  const enter = () => openGame(true);
  cover.addEventListener('click', enter);
  function restore() {
    if (location.search || location.hash || window.ADOPTION_FIRST_ENDING?.read()?.phase === 'pending' ||
        sessionStorage.getItem('adoption-day-second-play-session-v1') === 'true') openGame(false);
  }
  window.addEventListener('storage', restore);
  window.addEventListener('pageshow', restore);
  restore();
})();
