/* Media warm-up is optional. Native images and playback never wait for this queue. */
(() => {
  'use strict';
  const manifest = [{"path":"assets/audio/autumn-wind.m4a","type":"audio"},{"path":"assets/audio/blog-go-where-the-wind-is.m4a","type":"audio"},{"path":"assets/audio/blog-theme.wav","type":"audio"},{"path":"assets/audio/cheng-rose-funeral.m4a","type":"audio"},{"path":"assets/audio/ending-if-we-can.m4a","type":"audio"},{"path":"assets/audio/first-play-ending.m4a","type":"audio"},{"path":"assets/avatar-source.webp","type":"image"},{"path":"assets/avatar.webp","type":"image"},{"path":"assets/cheng-source.webp","type":"image"},{"path":"assets/cheng.webp","type":"image"},{"path":"assets/deng-source.webp","type":"image"},{"path":"assets/deng.webp","type":"image"},{"path":"assets/familiar-source.webp","type":"image"},{"path":"assets/familiar.webp","type":"image"},{"path":"assets/game-cover-landscape.webp","type":"image"},{"path":"assets/game-cover-pets.webp","type":"image"},{"path":"assets/game-cover-portrait.webp","type":"image"},{"path":"assets/game-cover.webp","type":"image"},{"path":"assets/guest-canyue.webp","type":"image"},{"path":"assets/guest-qingtian.webp","type":"image"},{"path":"assets/guest-ranzhi.webp","type":"image"},{"path":"assets/hospital-exterior.webp","type":"image"},{"path":"assets/nannan-source.webp","type":"image"},{"path":"assets/nannan.webp","type":"image"},{"path":"assets/orphanage-activity-room.webp","type":"image"},{"path":"assets/orphanage-courtyard.webp","type":"image"},{"path":"assets/orphanage-dormitory.webp","type":"image"},{"path":"assets/orphanage-exterior.webp","type":"image"},{"path":"assets/orphanage-news-activity-room-renewal.webp","type":"image"},{"path":"assets/orphanage-news-autumn-outdoors.webp","type":"image"},{"path":"assets/orphanage-news-childrens-day.webp","type":"image"},{"path":"assets/orphanage-news-spring-safety.webp","type":"image"},{"path":"assets/orphanage-news-summer-reading.webp","type":"image"},{"path":"assets/orphanage-news-volunteer-weekend.webp","type":"image"},{"path":"assets/orphanage-project-care.webp","type":"image"},{"path":"assets/orphanage-project-education.webp","type":"image"},{"path":"assets/photos/archive-lei-li-donation.webp","type":"image"},{"path":"assets/photos/archive-lei-li-group.webp","type":"image"},{"path":"assets/photos/archive-paper-plane-activity.webp","type":"image"},{"path":"assets/photos/archive-paper-plane-gallery.webp","type":"image"},{"path":"assets/photos/archive-paper-plane-snow.webp","type":"image"},{"path":"assets/photos/archive-wang-jianhua-children.webp","type":"image"},{"path":"assets/photos/archive-wang-jianhua-friend.webp","type":"image"},{"path":"assets/photos/art-cat-1280.webp","type":"image"},{"path":"assets/photos/art-cat-480.webp","type":"image"},{"path":"assets/photos/art-cat-768.webp","type":"image"},{"path":"assets/photos/art-director-1280.webp","type":"image"},{"path":"assets/photos/art-director-480.webp","type":"image"},{"path":"assets/photos/art-director-768.webp","type":"image"},{"path":"assets/photos/art-dragon-1280.webp","type":"image"},{"path":"assets/photos/art-dragon-480.webp","type":"image"},{"path":"assets/photos/art-dragon-768.webp","type":"image"},{"path":"assets/photos/art-home-1280.webp","type":"image"},{"path":"assets/photos/art-home-480.webp","type":"image"},{"path":"assets/photos/art-home-768.webp","type":"image"},{"path":"assets/photos/art-snowman-1280.webp","type":"image"},{"path":"assets/photos/art-snowman-480.webp","type":"image"},{"path":"assets/photos/art-snowman-768.webp","type":"image"},{"path":"assets/photos/art-sunflowers-1280.webp","type":"image"},{"path":"assets/photos/art-sunflowers-480.webp","type":"image"},{"path":"assets/photos/art-sunflowers-768.webp","type":"image"},{"path":"assets/photos/art-sunflowers-crayon-1280.webp","type":"image"},{"path":"assets/photos/art-sunflowers-crayon-480.webp","type":"image"},{"path":"assets/photos/art-sunflowers-crayon-768.webp","type":"image"},{"path":"assets/photos/autumn-birthday-1280.webp","type":"image"},{"path":"assets/photos/autumn-birthday-480.webp","type":"image"},{"path":"assets/photos/autumn-birthday-768.webp","type":"image"},{"path":"assets/photos/autumn-first-computer-1280.webp","type":"image"},{"path":"assets/photos/autumn-first-computer-480.webp","type":"image"},{"path":"assets/photos/autumn-first-computer-768.webp","type":"image"},{"path":"assets/photos/blog-golden-dragon.webp","type":"image"},{"path":"assets/photos/blog-studio-home.webp","type":"image"},{"path":"assets/photos/canteen-1280.webp","type":"image"},{"path":"assets/photos/canteen-480.webp","type":"image"},{"path":"assets/photos/canteen-768.webp","type":"image"},{"path":"assets/photos/cat-bowl-1280.webp","type":"image"},{"path":"assets/photos/cat-bowl-480.webp","type":"image"},{"path":"assets/photos/cat-bowl-768.webp","type":"image"},{"path":"assets/photos/cat-desk-1280.webp","type":"image"},{"path":"assets/photos/cat-desk-480.webp","type":"image"},{"path":"assets/photos/cat-desk-768.webp","type":"image"},{"path":"assets/photos/cat-peace-1280.webp","type":"image"},{"path":"assets/photos/cat-peace-480.webp","type":"image"},{"path":"assets/photos/cat-peace-768.webp","type":"image"},{"path":"assets/photos/cat-window-1280.webp","type":"image"},{"path":"assets/photos/cat-window-480.webp","type":"image"},{"path":"assets/photos/cat-window-768.webp","type":"image"},{"path":"assets/photos/cheng-homework.webp","type":"image"},{"path":"assets/photos/cheng-night-city.webp","type":"image"},{"path":"assets/photos/hidden-family-1280.webp","type":"image"},{"path":"assets/photos/hidden-family-480.webp","type":"image"},{"path":"assets/photos/hidden-family-768.webp","type":"image"},{"path":"assets/photos/hidden-family-revised-1280.webp","type":"image"},{"path":"assets/photos/hidden-family-revised-480.webp","type":"image"},{"path":"assets/photos/hidden-family-revised-768.webp","type":"image"},{"path":"assets/photos/hidden-snow-drawing-1280.webp","type":"image"},{"path":"assets/photos/hidden-snow-drawing-480.webp","type":"image"},{"path":"assets/photos/hidden-snow-drawing-768.webp","type":"image"},{"path":"assets/photos/toy-car-1280.webp","type":"image"},{"path":"assets/photos/toy-car-480.webp","type":"image"},{"path":"assets/photos/toy-car-768.webp","type":"image"},{"path":"assets/photos/toy-car-lei-zheming-1280.webp","type":"image"},{"path":"assets/photos/toy-car-lei-zheming-480.webp","type":"image"},{"path":"assets/photos/toy-car-lei-zheming-768.webp","type":"image"},{"path":"assets/photos/toy-car-revised-1280.webp","type":"image"},{"path":"assets/photos/toy-car-revised-480.webp","type":"image"},{"path":"assets/photos/toy-car-revised-768.webp","type":"image"},{"path":"assets/photos/with-dad-event-1280.webp","type":"image"},{"path":"assets/photos/with-dad-event-480.webp","type":"image"},{"path":"assets/photos/with-dad-event-768.webp","type":"image"},{"path":"assets/photos/with-dad-home-1280.webp","type":"image"},{"path":"assets/photos/with-dad-home-480.webp","type":"image"},{"path":"assets/photos/with-dad-home-768.webp","type":"image"},{"path":"assets/photos/with-dad-swing-1280.webp","type":"image"},{"path":"assets/photos/with-dad-swing-480.webp","type":"image"},{"path":"assets/photos/with-dad-swing-768.webp","type":"image"},{"path":"assets/video/ending-montage.mp4","type":"video"},{"path":"assets/wang-source.webp","type":"image"},{"path":"assets/wang.webp","type":"image"}];
  const base = new URL('.', document.currentScript.src);
  const local = location.protocol === 'file:';
  const game = document.documentElement.hasAttribute('data-first-play-game');
  const hospital = location.pathname.endsWith('/hospital.html');
  const relevant = item => game || (item.type === 'image' && (hospital
    ? item.path === 'assets/hospital-exterior.webp'
    : /assets\/(orphanage-|photos\/archive-)/.test(item.path)));
  const entries = new Map(manifest.map(item => [new URL(item.path, base).href,
    {...item, planned: relevant(item), state: 'pending'}]));
  let completion;

  function resolve(path) {
    const entry = entries.get(new URL(path, base).href);
    return entry?.url || path;
  }

  function snapshot() {
    const files = [...entries.values()].filter(item => item.planned);
    return {total: files.length, loaded: files.filter(item => item.state === 'ready').length,
      failed: files.filter(item => item.state === 'error').length};
  }

  function update() {
    window.dispatchEvent(new CustomEvent('adoption-assets-progress', {detail: snapshot()}));
  }

  function localResource(entry, href) {
    return new Promise((accept, reject) => {
      const player = entry.type === 'image' ? new Image() : document.createElement(entry.type === 'video' ? 'video' : 'audio');
      // canplaythrough is only a browser estimate and may never fire on mobile.
      const event = entry.type === 'image' ? 'load' : 'loadedmetadata';
      const timer = setTimeout(() => finish(new Error('Resource load timed out')), 15000);
      function finish(error) {
        clearTimeout(timer);
        player.removeEventListener(event, ready);
        player.removeEventListener('error', fail);
        if (entry.type !== 'image') {
          player.pause(); player.removeAttribute('src'); player.load();
        }
        error ? reject(error) : accept();
      }
      function ready() { finish(); }
      function fail() { finish(new Error('Resource unavailable')); }
      player.addEventListener(event, ready, {once: true});
      player.addEventListener('error', fail, {once: true});
      if (entry.type === 'image') { player.loading = 'eager'; player.decoding = 'async'; }
      else { player.preload = 'metadata'; player.muted = true; }
      player.src = href;
      if (entry.type !== 'image') player.load();
    });
  }

  async function download(href, attempt) {
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      if (controller) timer = setTimeout(() => controller.abort(), 30000);
    };
    try {
      refresh();
      const response = await fetch(href, {cache: attempt ? 'reload' : 'default',
        ...(controller ? {signal: controller.signal} : {})});
      if (!response.ok) {
        const error = new Error('HTTP ' + response.status);
        error.retryable = ![400, 401, 403, 404, 410].includes(response.status);
        throw error;
      }
      const type = response.headers.get('content-type') || '';
      if (type.includes('text/html')) {
        const error = new Error('Resource address returned an HTML page');
        error.retryable = false; throw error;
      }
      let blob;
      if (response.body?.getReader) {
        const reader = response.body.getReader(), chunks = [];
        while (true) {
          const {done, value} = await reader.read();
          if (done) break;
          refresh(); chunks.push(value);
        }
        blob = new Blob(chunks, {type});
      } else blob = await response.blob();
      if (!blob.size) throw new Error('Resource is empty');
      return blob;
    } finally { clearTimeout(timer); }
  }

  function load(entry) {
    if (entry.promise) return entry.promise;
    const href = new URL(entry.path, base).href;
    entry.promise = (async () => {
      entry.state = 'loading'; update();
      if (local) {
        await localResource(entry, href);
        entry.url = href;
      } else {
        let blob;
        for (let attempt = 0; attempt < 3; attempt++) {
          try { blob = await download(href, attempt); break; }
          catch (error) {
            if (error.retryable === false || attempt === 2) throw error;
            await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
          }
        }
        // Images keep their original native URLs. No DOM rewriting or duplicate decoded copies.
        entry.url = entry.type === 'image' ? href : URL.createObjectURL(blob);
      }
      entry.state = 'ready'; entry.error = undefined; update();
    })().catch(error => {
      entry.state = 'error'; entry.error = error.message || String(error);
      entry.promise = undefined; update();
    });
    return entry.promise;
  }

  function run() {
    if (completion) return completion;
    const pending = [...entries.values()].filter(item => item.planned && item.state !== 'ready');
    const portrait = matchMedia('(orientation: portrait)').matches;
    const preferredCover = `assets/game-cover-${portrait ? 'portrait' : 'landscape'}.webp`;
    const priority = item => item.path === preferredCover ? 0 : /assets\/(avatar|cheng|wang|nannan|deng|familiar)\.webp$/.test(item.path) ? 1 : 2;
    const images = pending.filter(item => item.type === 'image').sort((a,b) => priority(a) - priority(b));
    const media = pending.filter(item => item.type !== 'image');
    async function worker(queue) { while (queue.length) await load(queue.shift()); }
    completion = Promise.all([worker(images), worker(images),
      new Promise(resolve => setTimeout(resolve, 1200)).then(() => worker(media))
    ]).then(snapshot);
    return completion;
  }

  function attach(player, path, options = {}) {
    const entry = entries.get(new URL(path, base).href);
    const source = entry?.state === 'ready' ? entry.url : new URL(path, base).href;
    player.preload = options.preload || 'metadata';
    // Use streaming immediately when a full background copy is not ready yet.
    // Never replace an active player's source or wait for an unrelated song.
    if (player.error) { player.src = source; player.load(); }
    else if ((!player.src || player.paused) && player.src !== source) player.src = source;
    return Promise.resolve(player);
  }

  window.ADOPTION_ASSETS = {url: resolve, attach, ready: run, status: snapshot,
    failures: () => [...entries.values()].filter(item => item.state === 'error').map(({path, error}) => ({path, error}))};

  const imageAttempts = new WeakMap();
  function imageKey(source) {
    const url = new URL(source, document.baseURI);
    url.search = ''; url.hash = '';
    return url.href;
  }
  function retryURL(source, attempt) {
    const url = new URL(source, document.baseURI);
    if (!entries.has(imageKey(url.href))) return source;
    url.searchParams.set('_asset_retry', String(attempt));
    return url.href;
  }
  function retrySet(source, attempt) {
    return source.split(',').map(candidate => {
      const [url, ...size] = candidate.trim().split(/\s+/);
      return [retryURL(url, attempt), ...size].join(' ');
    }).join(', ');
  }
  document.addEventListener('error', event => {
    const picture = event.target;
    if (!(picture instanceof HTMLImageElement)) return;
    const key = imageKey(picture.currentSrc || picture.src);
    if (!entries.has(key)) return;
    const previous = imageAttempts.get(picture);
    const attempt = previous?.key === key ? previous.attempt + 1 : 1;
    if (attempt > 2) return;
    imageAttempts.set(picture, {key, attempt});
    setTimeout(() => {
      if (!picture.isConnected || !picture.complete || picture.naturalWidth || imageKey(picture.currentSrc || picture.src) !== key) return;
      if (picture.parentElement?.tagName === 'PICTURE') {
        picture.parentElement.querySelectorAll('source[srcset]').forEach(source => {
          source.srcset = retrySet(source.srcset, attempt);
        });
      }
      if (picture.srcset) picture.srcset = retrySet(picture.srcset, attempt);
      picture.src = retryURL(picture.src, attempt);
    }, 600 * attempt);
  }, true);

  const cover = document.getElementById('game-cover');
  if (cover) {
    const picture = cover.querySelector('img');
    const hint = document.createElement('button');
    hint.type = 'button'; hint.className = 'asset-loading';
    hint.setAttribute('aria-label', '进入游戏');
    function coverState() {
      hint.hidden = cover.hidden || (picture.complete && picture.naturalWidth > 0);
      hint.textContent = picture.complete ? '点击进入游戏' : '封面加载中，可点击进入游戏';
    }
    hint.addEventListener('click', () => cover.click());
    // This handler only hides the hint. No preload state is allowed to block entry.
    cover.addEventListener('click', () => { hint.hidden = true; }, true);
    picture.addEventListener('load', coverState);
    picture.addEventListener('error', coverState);
    document.body.append(hint); coverState();
  }
  run();
})();
