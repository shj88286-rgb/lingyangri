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

  audio.preload = 'none';
  video.preload = 'none';

  function bufferFilm() {
    video.preload = 'auto';
  }

  function waitForData(player, minimum) {
    if (player.readyState >= minimum) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const events = ['loadedmetadata', 'loadeddata', 'canplay', 'seeked', 'progress', 'durationchange'];
      const timeout = setTimeout(fail, 30000);
      function cleanup() {
        clearTimeout(timeout);
        events.forEach(event => player.removeEventListener(event, ready));
        player.removeEventListener('error', fail);
      }
      function ready() { if (player.readyState >= minimum) { cleanup(); resolve(); } }
      function fail() { cleanup(); reject(new Error('片尾素材无法播放')); }
      events.forEach(event => player.addEventListener(event, ready));
      player.addEventListener('error', fail);
      if (player.error) fail();
      else ready();
    });
  }

  async function ready() {
    const assets = window.ADOPTION_ASSETS;
    assets.attach(audio, 'assets/audio/ending-if-we-can.m4a', {preload: 'auto'});
    assets.attach(video, 'assets/video/ending-montage.mp4', {preload: 'metadata'});
    await Promise.all([waitForData(audio, HTMLMediaElement.HAVE_CURRENT_DATA),
      waitForData(video, HTMLMediaElement.HAVE_METADATA)]);
    if (!Number.isFinite(video.duration) || video.duration <= 0 || !Number.isFinite(audio.duration)) {
      throw new Error('片尾素材时长尚未就绪');
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
  window.ADOPTION_ENDING_MEDIA = {audio, video, bufferFilm, ready, reset};
})();
