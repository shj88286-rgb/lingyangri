(() => {
  'use strict';

  const pages = ['index.html', 'hospital.html', 'orphanage-admin.html', 'orphanage.html'];
  const resetParameter = 'reset-progress';
  const resetKey = 'adoption-day-reset-stamp';
  const page = location.pathname.split('/').at(-1);

  function clearProgress(storage) {
    for (const key of Object.keys(storage)) {
      if (key === 'medicalReportRead' || (key.startsWith('adoption-day-') && key !== resetKey &&
          !key.startsWith('adoption-day-achievement-unlocked-v1:'))) {
        storage.removeItem(key);
      }
    }
  }

  function reset(stamp) {
    clearProgress(localStorage);
    clearProgress(sessionStorage);
    localStorage.setItem(resetKey, stamp);
    sessionStorage.setItem(resetKey, stamp);

    // Browsers can keep a separate storage area for each local HTML file.
    const nextPage = location.protocol === 'file:' && pages[pages.indexOf(page) + 1];
    const next = new URL(nextPage || 'index.html', location.href);
    if (nextPage) next.searchParams.set(resetParameter, stamp);
    document.documentElement.hidden = true;
    location.replace(next.href);
  }

  const carriedReset = new URLSearchParams(location.search).get(resetParameter);
  if (location.protocol === 'file:' && page !== 'index.html' && pages.includes(page) &&
      /^\d+-[a-z0-9]+$/.test(carriedReset || '')) {
    reset(carriedReset);
    return;
  }

  function currentStamp() {
    try { return localStorage.getItem(resetKey) || ''; } catch { return ''; }
  }

  const resetStamp = currentStamp();
  const isCurrent = () => currentStamp() === resetStamp;
  window.ADOPTION_GAME_RESET = {isCurrent};

  function openCleanPage() {
    location.replace(new URL(page || 'index.html', location.href).href);
  }

  try {
    const previousStamp = sessionStorage.getItem(resetKey);
    if (previousStamp !== resetStamp) {
      if (previousStamp !== null) clearProgress(sessionStorage);
      sessionStorage.setItem(resetKey, resetStamp);
      if (previousStamp !== null && (location.search || location.hash)) {
        openCleanPage();
        return;
      }
    }
  } catch {}

  const refreshIfReset = () => { if (!isCurrent()) openCleanPage(); };
  window.addEventListener('focus', refreshIfReset);
  window.addEventListener('pageshow', refreshIfReset);
  window.addEventListener('storage', event => {
    if (event.key === resetKey) refreshIfReset();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('restart-dialog');
    if (!dialog) return;
    const error = document.getElementById('restart-error');
    document.getElementById('restart-game').addEventListener('click', () => {
      error.textContent = '';
      dialog.showModal();
    });
    document.getElementById('confirm-restart').addEventListener('click', () => {
      try {
        reset(Date.now() + '-' + Math.random().toString(36).slice(2));
      } catch {
        error.textContent = '无法清除游玩记录，请检查浏览器的存储权限。';
      }
    });
  });
})();
