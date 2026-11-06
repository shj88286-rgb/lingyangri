(() => {
  'use strict';

  const audio = new Audio();
  const video = document.createElement('video');
  audio.hidden = true;
  video.defaultMuted = true;
  video.muted = true;
  video.playsInline = true;
  video.disablePictureInPicture = true;
  video.disableRemotePlayback = true;

  function resource(player, path) {
    return function load(preload = 'metadata') {
      return window.ADOPTION_ASSETS.attach(player, path, {preload});
    };
  }

  const loadAudio = resource(audio, 'assets/audio/ending-if-we-can.m4a');
  const loadVideo = resource(video, 'assets/video/ending-montage.mp4');
  let scheduled = false;
  const prepare = (preload = 'metadata') => Promise.all([loadAudio(preload), loadVideo(preload)]);
  function warm() {
    if (scheduled) return;
    scheduled = true;
    prepare();
  }

  function waitForData(player) {
    if (player.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const events = ['loadeddata', 'canplay', 'seeked', 'progress', 'durationchange'];
      const timeout = setTimeout(fail, 30000);
      function cleanup() {
        clearTimeout(timeout);
        events.forEach(event => player.removeEventListener(event, ready));
        player.removeEventListener('error', fail);
      }
      function ready() { if (player.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) { cleanup(); resolve(); } }
      function fail() { cleanup(); reject(new Error('片尾素材无法播放')); }
      events.forEach(event => player.addEventListener(event, ready));
      player.addEventListener('error', fail);
      if (player.error) fail();
      else ready();
    });
  }

  async function ready() {
    await prepare('auto');
    try {
      await Promise.all([waitForData(audio), waitForData(video)]);
      if (!Number.isFinite(video.duration) || video.duration <= 0 || !Number.isFinite(audio.duration)) throw new Error('片尾素材时长尚未就绪');
    } catch (error) {
      // Blob 解码失败时允许下一次点击使用原始地址。
      for (const [player, path] of [[audio, 'assets/audio/ending-if-we-can.m4a'], [video, 'assets/video/ending-montage.mp4']]) {
        if (player.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) player.src = path;
      }
      throw error;
    }
  }

  function reset() {
    audio.pause(); video.pause();
    try {
      if (audio.currentTime !== 0) audio.currentTime = 0;
      if (video.currentTime !== 0) video.currentTime = 0;
    } catch {}
    video.muted = true; video.defaultMuted = true; video.playsInline = true;
    video.style.opacity = '';
  }
  window.ADOPTION_ENDING_MEDIA = {audio, video, warm, ready, reset};
  warm();
})();
