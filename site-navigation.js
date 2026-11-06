/* 从游戏内网站回到原标签页中的 PP 会话。 */
(() => {
  'use strict';
  const spaceKey = 'adoption-day-space-return-v1';
  const readSpace = () => {
    try { return sessionStorage.getItem(spaceKey); }
    catch { return null; }
  };
  window.ADOPTION_SITE_NAV = {
    readSpace,
    rememberSpace(account) {
      try {
        sessionStorage.setItem(spaceKey, account);
        const url = new URL(location.href);
        url.searchParams.set('view', 'space');
        history.replaceState(history.state, '', url);
      } catch {}
    },
    clearSpace() {
      try {
        sessionStorage.removeItem(spaceKey);
        const url = new URL(location.href);
        if (!url.searchParams.has('view')) return;
        url.searchParams.delete('view');
        history.replaceState(history.state, '', url);
      } catch {}
    }
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || link.closest('.game-site-return')) return;
    const destination = new URL(link.href, location.href);
    if (!/\/(orphanage|hospital)\.html$/.test(destination.pathname) || destination.pathname === location.pathname) return;
    link.target = '_blank';
    link.rel = 'opener';
  }, true);
  if (!/\/(orphanage(?:-admin)?|hospital)\.html$/.test(location.pathname)) return;
  const nav = document.createElement('nav');
  nav.className = 'game-site-return';
  nav.setAttribute('aria-label', '返回游戏');
  const link = document.createElement('a');
  link.href = 'index.html?view=space';
  link.textContent = '‹ 返回小雷空间';
  if (window.opener) {
    link.addEventListener('click', event => {
      event.preventDefault();
      let destination = window.opener;
      // The hospital may have been opened from the orphanage tab.
      // Prefer the original PP tab when its opener chain is available.
      try {
        let candidate = destination;
        for (let depth = 0; candidate && !candidate.closed && depth < 6; depth++) {
          const url = new URL(candidate.location.href);
          if (url.pathname === new URL('index.html', location.href).pathname) {
            destination = candidate;
            break;
          }
          candidate = candidate.opener;
        }
      } catch {}
      if (destination.closed) { location.href = link.href; return; }
      destination.focus();
      window.close();
      if (!window.closed) location.href = link.href;
    });
  }
  nav.append(link);
  document.body.prepend(nav);
})();
