(() => {
  'use strict';

  const portrait = matchMedia('(any-pointer: coarse) and (orientation: portrait)');
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <dialog id="landscape-prompt" aria-labelledby="landscape-title" aria-describedby="landscape-description">
      <div class="landscape-message">
        <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="21" y="20" width="38" height="25" rx="4"/>
          <path d="M26 29v7M22 10a16 16 0 0 0-13 21m-4-4 5 6 5-6"/>
        </svg>
        <h2 id="landscape-title" tabindex="-1" autofocus>请将设备横过来</h2>
        <p id="landscape-description">横屏后即可继续游戏</p>
      </div>
    </dialog>`;
  document.body.append(wrapper);
  const prompt = wrapper.firstElementChild;
  prompt.addEventListener('cancel', event => event.preventDefault());

  function updateOrientation() {
    const needsLandscape = portrait.matches && !document.body.classList.contains('ending-credits-open');
    if (needsLandscape && !prompt.open) prompt.showModal();
    else if (!needsLandscape && prompt.open) prompt.close();
  }

  portrait.addEventListener('change', updateOrientation);
  window.addEventListener('ending-credits-change', updateOrientation);
  updateOrientation();
})();
