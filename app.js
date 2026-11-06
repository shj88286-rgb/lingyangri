/* 《秋叶孤儿院调查录》· 开场、虚构 PP 登录、本地聊天与相册。 */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const story = window.ADOPTION_STORY;
  const accounts = window.ADOPTION_ACCOUNTS;
  for (const kind of ['current', 'legacy']) {
    const button = $(`#choose-${kind === 'legacy' ? 'old' : 'current'}-account`);
    button.querySelector('span').textContent = accounts[kind].name;
  }
  let loginTimer;
  let loggedIn = false;
  let noticeConfirmed = false;
  let rememberedOldAccount = false;
  let lastLoginAccount = 'current';
  let secondSceneStarted = false;
  const siteNav = window.ADOPTION_SITE_NAV;
  const secondSessionKey = 'adoption-day-second-play-session-v1';
  const returnToSecond = document.createElement('button');
  returnToSecond.textContent = '返回2008年聊天'; returnToSecond.hidden = true;
  $('.game-title-actions').prepend(returnToSecond);
  returnToSecond.addEventListener('click', () => {
    window.ADOPTION_BLOG?.leave();
    if (secondSceneStarted) window.ADOPTION_SECOND_PLAY.resume();
    else startSecondPlay(true);
  });
  let loginRevision = 0;
  async function startSecondPlay(resumeReady = false, explicitLogin = false) {
    const revision = ++loginRevision;
    // Preserve the initiating tap for media playback even while fetching the legacy UI.
    let openingMusic;
    let replayOpening = false;
    try {
      const existingRun = localStorage.getItem('adoption-day-six-day-v2');
      if (explicitLogin && (existingRun ? JSON.parse(existingRun).phase === 'complete' : !localStorage.getItem('adoption-day-six-day-v1'))) {
        openingMusic = new Audio();
        openingMusic.muted = true;
        window.ADOPTION_ASSETS.attach(openingMusic, 'assets/audio/autumn-wind.m4a', {preload: 'auto'});
        openingMusic.play().catch(() => {});
      }
      await window.ADOPTION_ASSETS.loadGroups('chat', 'legacy', 'legacy-state', 'legacy-ui');
      if (revision !== loginRevision) { window.ADOPTION_ASSETS.release(openingMusic); return; }
      const model = window.ADOPTION_SIX_DAY_STATE;
      const saved = model.read();
      if (explicitLogin && saved.phase === 'complete') {
        const reset = await model.dispatch({type: 'replay', revision: saved.revision});
        replayOpening = reset.phase === 'intro';
        if (revision !== loginRevision) { window.ADOPTION_ASSETS.release(openingMusic); return; }
      }
    } catch {
      window.ADOPTION_ASSETS.release(openingMusic);
      if (revision !== loginRevision) return;
      noticeConfirmed = true;
      showLogin('legacy');
      $('#login-error').textContent = '游戏资源未能载入，请再次登录';
      return;
    }
    loggedIn = true; lastLoginAccount = 'legacy';
    secondSceneStarted = true;
    sessionStorage.setItem(secondSessionKey, 'true');
    window.ADOPTION_SECOND_PLAY.start({resumeReady, replayOpening, openingMusic, onExit: () => showLogin('legacy'), onBrowse: () => {
      showGame(); returnToSecond.hidden = false;
    }});
  }
  const ending = window.ADOPTION_FIRST_ENDING;
  const hospitalReset = window.ADOPTION_HOSPITAL_RESET;
  const query = new URLSearchParams(location.search);
  if (location.protocol === 'file:') hospitalReset.save(query.get('resetDate'));
  try { rememberedOldAccount = localStorage.getItem('adoption-day-old-account-v1') === 'true'; } catch { /* 仍可在本次游玩中切换。 */ }
  let chats = [];
  let selectedContact;
  let chatNeedsRender = true;
  let contactQuery = '';
  let messageQuery = '';
  let selectedDate = '';
  let albums;
  const albumSaveKey = 'adoption-day-albums-v1';
  const unlockedAlbums = new Set();
  let activeAlbum = '';
  let pendingAlbum = '';
  try {
    const saved = JSON.parse(localStorage.getItem(albumSaveKey) || '[]');
    if (Array.isArray(saved)) saved.forEach(id => unlockedAlbums.add(id));
  } catch { /* 本地存储不可用时，仍可在本次游玩中解锁相册。 */ }
  const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function boldClues(text, pattern) {
    const escaped = escapeHTML(text);
    return pattern ? escaped.replace(pattern, '<b>$&</b>') : escaped;
  }
  const formatDate = value => { const [year,month,day] = value.split('-'); return `${year}年${Number(month)}月${Number(day)}日`; };

  story.intro.forEach(text => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    $('#story-copy').append(paragraph);
  });
  $('#investigation-goal').textContent = story.investigationGoal;
  story.notices.forEach(text => {
    const item = document.createElement('li');
    item.textContent = text;
    $('#notice-list').append(item);
  });

  function showIntro() {
    ++loginRevision;
    ++viewRevision;
    siteNav.clearSpace();
    secondSceneStarted = false;
    sessionStorage.removeItem(secondSessionKey); returnToSecond.hidden = true;
    clearTimeout(loginTimer);
    ending.stopMusic();
    $('#hospital-mail-toast').hidden = true;
    window.ADOPTION_SECOND_PLAY?.stop();
    window.ADOPTION_BLOG?.leave();
    closeAccountMenu();
    noticeConfirmed = false;
    $('#intro-screen').hidden = false;
    $('#login-screen').hidden = true;
    $('#game-screen').hidden = true;
    document.body.classList.remove('game-open', 'login-open');
    $('#start-game').focus({preventScroll:true});
    window.scrollTo(0, 0);
  }

  function resetLogin() {
    clearTimeout(loginTimer);
    loggedIn = false;
    $('#login-button').disabled = false;
    $('#login-button-text').textContent = '登录';
    $('.login-spinner').hidden = true;
    $('#login-status').hidden = true;
    $('#login-error').textContent = '';
  }

  function showLogin(kind = 'current') {
    ++loginRevision;
    ++viewRevision;
    siteNav.clearSpace();
    secondSceneStarted = false;
    sessionStorage.removeItem(secondSessionKey); returnToSecond.hidden = true;
    if (!noticeConfirmed) {
      showNotice();
      return;
    }
    window.ADOPTION_SECOND_PLAY?.stop();
    window.ADOPTION_BLOG?.leave();
    closeAccountMenu();
    resetLogin();
    $('#hospital-mail-toast').hidden = true;
    $('#login-account-picker').hidden = false;
    $('#choose-old-account').hidden = !rememberedOldAccount;
    $('#choose-current-account img').src = accounts.current.avatar;
    if (rememberedOldAccount) $('#choose-old-account img').src = accounts.legacy.avatar;
    selectLoginAccount(kind);
    $('#intro-screen').hidden = true;
    $('#login-screen').hidden = false;
    $('#game-screen').hidden = true;
    document.body.classList.remove('game-open');
    document.body.classList.add('login-open');
    window.scrollTo(0, 0);
    $(kind === 'manual' ? '#pp-account' : '#login-button').focus({preventScroll:true});
  }

  function selectLoginAccount(kind) {
    if (kind === 'legacy' && !rememberedOldAccount) kind = 'manual';
    const manual = kind === 'manual';
    const old = kind === 'legacy';
    $('#pp-password').type = manual ? 'text' : 'password';
    $('#login-screen').classList.toggle('switch-account', manual);
    $('#login-screen').classList.add('has-account-picker');
    for (const id of ['#pp-account', '#pp-password']) {
      $(id).readOnly = !manual;
      $(id).setAttribute('aria-readonly', String(!manual));
      $(id).removeAttribute('aria-invalid');
    }
    const account = old ? accounts.legacy : accounts.current;
    $('#pp-account').value = manual ? '' : account.name;
    $('#pp-password').value = manual ? '' : account.password;
    $('.nickname').textContent = account.name;
    $('.login-avatar img').src = account.avatar;
    $('.login-avatar img').alt = `${account.name}的头像`;
    $('#login-error').textContent = '';
    document.querySelectorAll('[data-login-account]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.loginAccount === kind));
    });
    if (kind === 'current') window.ADOPTION_ASSETS.warm(['assets/wang.webp']);
    if (manual) $('#pp-account').focus({preventScroll:true});
  }

  document.querySelectorAll('[data-login-account]').forEach(button => button.addEventListener('click', () => {
    selectLoginAccount(button.dataset.loginAccount);
  }));

  function showNotice() {
    noticeConfirmed = false;
    $('#notice-read').checked = false;
    $('#confirm-start').disabled = true;
    $('#notice-dialog').showModal();
    $('.notice-body').scrollTop = 0;
  }

  const cover = $('#game-cover');
  cover.addEventListener('click', () => {
    cover.hidden = true;
    window.scrollTo(0, 0);
    $('.intro-heading h1').focus({preventScroll:true});
  });
  $('#start-game').addEventListener('click', showNotice);
  $('#show-notice').addEventListener('click', showNotice);
  $('#notice-read').addEventListener('change', event => {
    $('#confirm-start').disabled = !event.target.checked;
  });
  $('#confirm-start').addEventListener('click', () => {
    if (!$('#notice-read').checked) return;
    noticeConfirmed = true;
    $('#notice-dialog').close();
    showLogin();
  });
  $('#close-notice').addEventListener('click', () => $('#notice-dialog').close());
  ['#back-to-intro','#close-login','#brand'].forEach(id => $(id).addEventListener('click', event => {
    event.preventDefault();
    showIntro();
  }));

  document.addEventListener('click', event => {
    const link = event.target.closest('#blog-site-link');
    if (!link || !loggedIn || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    siteNav.rememberSpace(lastLoginAccount);
  });
  if (location.protocol === 'file:') {
    const orphanageWindows = new Set();
    document.addEventListener('click', event => {
      const link = event.target.closest('#blog-site-link');
      if (!link || event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const opened = window.open(link.href);
      if (!opened) return;
      orphanageWindows.add(opened);
      event.preventDefault();
    });
    window.addEventListener('message', event => {
      if (!event.source || (event.origin !== 'null' && event.origin !== location.origin) ||
          !orphanageWindows.has(event.source)) return;
      if (event.data?.type === hospitalReset.key) {
        hospitalReset.save(event.data.date);
        receiveHospitalMail();
        return;
      }
      if (event.data?.type === ending.key + ':file-read') {
        ending.importProgress(event.data.id);
      }
    });
  }

  $('#login-form').addEventListener('submit', event => {
    event.preventDefault();
    if (loggedIn || $('#login-button').disabled) return;
    const account = $('#pp-account').value.trim();
    const password = $('#pp-password').value;
    const isOldAccount = [accounts.legacy.name, ...accounts.legacy.aliases].includes(account) && password === accounts.legacy.password;
    const isCurrentAccount = [accounts.current.name, ...accounts.current.aliases].includes(account) && password === accounts.current.password;
    if (!isOldAccount && !isCurrentAccount) {
      $('#login-error').textContent = '账号或密码不正确';
      $('#pp-password').setAttribute('aria-invalid', 'true');
      $('#pp-password').focus();
      return;
    }
    $('#login-error').textContent = '';
    if (isOldAccount) {
      const phase = ending.read()?.phase;
      if (phase === 'pending' && ending.allFilesRead()) {
        ending.play(showEndingLogin);
        return;
      }
      if (phase !== 'done') {
        $('#legacy-login-dialog').showModal();
        return;
      }
    }
    ending.stopMusic();
    $('#login-button').disabled = true;
    $('#login-button-text').textContent = '正在登录……';
    $('.login-spinner').hidden = false;
    $('#login-status').hidden = false;
    if (isOldAccount) {
      rememberedOldAccount = true;
      lastLoginAccount = 'legacy';
      try { localStorage.setItem('adoption-day-old-account-v1', 'true'); } catch { /* 只记住本次游玩的账号。 */ }
      document.body.classList.remove('login-open');
      // 在点击事件内启动演出与音频，兼容手机浏览器的播放限制。
      startSecondPlay(false, true);
      return;
    }
    // 账号仅用于本地剧情切换，不连接账号服务，也不发送密码。
    loginTimer = setTimeout(() => {
      loggedIn = true;
      lastLoginAccount = 'current';
      $('.login-spinner').hidden = true;
      $('#login-button-text').textContent = '已登录';
      showGame();
    }, 900);
  });
  ['#pp-account', '#pp-password'].forEach(id => $(id).addEventListener('input', () => {
    $('#login-error').textContent = '';
    $('#pp-password').removeAttribute('aria-invalid');
  }));

  function renderContacts() {
    const contacts = chats.filter(contact => contact.name.includes(contactQuery));
    $('#game-contact-list').innerHTML = contacts.map(contact => {
      const lastSection = contact.sections[contact.sections.length - 1];
      const lastMessage = lastSection.messages[lastSection.messages.length - 1];
      return `<button class="contact-row ${contact.id === selectedContact ? 'selected' : ''}" data-contact="${contact.id}" ${contact.id === selectedContact ? 'aria-current="true"' : ''}><img decoding="async" loading="eager" width="42" height="42" class="contact-avatar" src="${escapeHTML(contact.avatar)}" alt=""><span class="contact-row-copy"><span class="contact-row-title"><strong>${contact.name}</strong><time>${lastSection.date.slice(0,4)}</time></span><span class="contact-preview">${escapeHTML(lastMessage[2])}</span></span></button>`;
    }).join('') || '<p class="chat-empty">无匹配联系人</p>';
  }

  function renderMessages() {
    const contact = chats.find(item => item.id === selectedContact);
    if (!contact) return;
    const sections = contact.sections.filter(section => !selectedDate || section.date === selectedDate);
    let html = '';
    sections.forEach(section => {
      let cluePattern;
      if (contact.id === 'nannan') cluePattern = /火腿肠/g;
      if (contact.id === 'cheng' && section.date === '2008-07-12') cluePattern = /十三|十六/g;
      if (contact.id === 'wang' && section.date === '2008-07-23') cluePattern = /十六岁|1月31号/g;
      const messages = section.messages.filter(message => message[2].includes(messageQuery) || (message[1] === 'self' ? '忧郁小猫猫' : contact.name).includes(messageQuery));
      if (!messages.length) return;
      html += `<section class="conversation-day" aria-label="${formatDate(section.date)}"><h3 class="conversation-date"><time datetime="${section.date}">${formatDate(section.date)}</time></h3>`;
      html += messages.map(([time,from,text]) => {
        const self = from === 'self';
        const speaker = self ? '忧郁小猫猫' : contact.name;
        return `<article class="chat-message ${self ? 'from-self' : 'from-other'}"><img decoding="async" loading="lazy" width="32" height="32" class="message-avatar" src="${self ? 'assets/avatar.webp' : escapeHTML(contact.avatar)}" alt=""><div class="message-content"><header class="message-heading"><span>${speaker}</span><time datetime="${section.date}T${time}">${time}</time></header><p class="message-bubble">${boldClues(text, cluePattern)}</p></div></article>`;
      }).join('');
      html += '</section>';
    });
    $('#conversation-history').innerHTML = html || '<p class="chat-empty">无匹配记录</p>';
    $('#conversation-history').scrollTop = 0;
  }

  function selectContact(id) {
    const contact = chats.find(item => item.id === id);
    if (!contact) return;
    selectedContact = id;
    messageQuery = ''; selectedDate = '';
    $('#message-search').value = '';
    $('#chat-title').textContent = contact.name;
    $('#conversation-avatar').src = contact.avatar;
    $('#chat-date').innerHTML = '<option value="">全部日期</option>' + contact.sections.map(section => `<option value="${section.date}">${formatDate(section.date)}</option>`).join('');
    renderContacts(); renderMessages();
    $('#game-screen').classList.remove('contacts-open');
  }

  function showGame(module = 'chat') {
    if (!noticeConfirmed || !loggedIn) return;
    $('#intro-screen').hidden = true;
    $('#login-screen').hidden = true;
    $('#game-screen').hidden = false;
    document.body.classList.remove('login-open');
    document.body.classList.add('game-open');
    for (const image of document.querySelectorAll('[data-avatar="current"]')) image.src = accounts.current.avatar;
    chatNeedsRender = true;
    $('#game-screen').classList.add('contacts-open');
    window.scrollTo(0,0);
    return activateModule(module);
  }

  $('#game-contact-list').addEventListener('click', event => {
    const button = event.target.closest('[data-contact]');
    if (!button) return;
    selectContact(button.dataset.contact);
    $('#conversation-history').focus({preventScroll:true});
  });
  $('#contacts-search').addEventListener('input', event => { contactQuery = event.target.value.trim(); renderContacts(); });
  $('#message-search').addEventListener('input', event => { messageQuery = event.target.value.trim(); renderMessages(); });
  $('#chat-date').addEventListener('change', event => { selectedDate = event.target.value; renderMessages(); });
  $('#show-contacts').addEventListener('click', () => { $('#game-screen').classList.add('contacts-open'); $('#game-contact-list button')?.focus({preventScroll:true}); });
  $('#chat-module').addEventListener('click', () => { activateModule('chat'); $('#game-screen').classList.add('contacts-open'); });
  $('#blog-module').addEventListener('click', () => {
    activateModule('blog');
  });
  $('#mail-module').addEventListener('click', () => { activateModule('mail'); });
  $('#album-module').addEventListener('click', () => { activateModule('album'); });
  $('#game-home').addEventListener('click', showIntro);
  $('#game-logout').addEventListener('click', () => showLogin(lastLoginAccount));
  $('#account-menu-logout').addEventListener('click', () => showLogin(lastLoginAccount));
  function closeAccountMenu() {
    $('#account-menu').hidden = true;
    $('#account-menu-toggle').setAttribute('aria-expanded', 'false');
  }
  $('#account-menu-toggle').addEventListener('click', () => {
    const willOpen = $('#account-menu').hidden;
    $('#account-menu').hidden = !willOpen;
    $('#account-menu-toggle').setAttribute('aria-expanded', String(willOpen));
    if (willOpen) $('#account-menu-logout').focus();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('#account-menu, #account-menu-toggle')) closeAccountMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !$('#account-menu').hidden) {
      closeAccountMenu();
      $('#account-menu-toggle').focus();
    }
  });

  let viewRevision = 0;
  async function activateModule(module) {
    const revision = ++viewRevision;
    const isAlbum = module === 'album';
    const isBlog = module === 'blog';
    const isMail = module === 'mail';
    const isChat = module === 'chat';
    const blogWasOpen = !$('#blog-panel').hidden && $('#game-screen').classList.contains('view-blog');
    $('#game-screen').classList.toggle('view-albums', isAlbum);
    $('#game-screen').classList.toggle('view-blog', isBlog);
    $('#game-screen').classList.toggle('view-mail', isMail);
    $('.contacts-panel').hidden = !isChat;
    $('.chat-panel').hidden = !isChat;
    $('#album-panel').hidden = !isAlbum;
    $('#blog-panel').hidden = !isBlog;
    $('#mail-panel').hidden = !isMail;
    if (!isBlog && blogWasOpen) window.ADOPTION_BLOG?.leave();
    const panel = isChat ? $('.contacts-panel') : $('#' + module + '-panel');
    try {
      await window.ADOPTION_ASSETS.loadGroups(module);
    } catch {
      if (revision === viewRevision && !panel.querySelector('.module-load-error')) {
        const warning = document.createElement('p');
        warning.className = 'module-load-error';
        warning.textContent = '资源未能载入，请再次点击栏目重试';
        panel.prepend(warning);
      }
      return false;
    }
    if (revision !== viewRevision || $('#game-screen').hidden) return false;
    panel.querySelector('.module-load-error')?.remove();
    if (isChat && chatNeedsRender) {
      chats = window.ADOPTION_CHATS;
      selectContact(selectedContact || chats[0].id);
      chatNeedsRender = false;
      $('#game-contact-list button')?.focus({preventScroll:true});
    } else if (isAlbum) {
      albums = window.ADOPTION_ALBUMS;
      renderAlbumList();
    } else if (isMail) {
      renderMailList();
      showInbox();
    } else if (isBlog && (!blogWasOpen || !window.ADOPTION_BLOG.active())) {
      window.ADOPTION_BLOG.enter();
    }
    [$('#chat-module'), $('#blog-module'), $('#mail-module'), $('#album-module')].forEach(button => {
      const active = button.id === `${module}-module`;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }

  let mailItems;
  const mailList = $('#mail-list');
  const mailToast = $('#hospital-mail-toast');
  let lastOpenedMail;
  let lastResetDate = hospitalReset.read();
  function formatMailDate(mail) {
    const [date, time] = mail.date.split('T');
    if (mail.id === hospitalReset.id) return '2025年12月29日 ' + time;
    return date.split('-').map(Number).join('/') + ' ' + time.replace(/^0/, '');
  }
  function renderMailList() {
    const date = hospitalReset.read();
    mailItems = date ? [{...window.ADOPTION_HOSPITAL_RESET_MAIL, date}, ...window.ADOPTION_MAIL]
      .sort((left, right) => right.date.localeCompare(left.date)) : window.ADOPTION_MAIL;
    mailList.innerHTML = mailItems.map(mail => `
      <li><button class="mail-item" type="button" ${mail.body ? `data-open-mail="${mail.id}" aria-controls="mail-message"` : 'disabled'}>
        <span>${mail.id === hospitalReset.id && hospitalReset.isUnread(mail.date) ? '<strong class="mail-unread-tag">未读</strong> ' : ''}${escapeHTML(mail.subject)}</span>
        <time datetime="${mail.date}">${formatMailDate(mail)}</time>
      </button></li>`).join('');
  }
  function receiveHospitalMail() {
    const date = hospitalReset.read();
    if (!date || date === lastResetDate) return;
    lastResetDate = date;
    if (mailItems) renderMailList();
    if (!$('#game-screen').hidden) mailToast.hidden = false;
  }
  window.addEventListener('storage', event => {
    if (event.key === hospitalReset.key) receiveHospitalMail();
    else if (event.key === hospitalReset.openedKey && mailItems) renderMailList();
  });

  function showMailView(open) {
    $('#mail-inbox').hidden = open;
    $('#mail-message').hidden = !open;
    $('#mail-back').hidden = !open;
    $('#mail-panel').scrollTop = 0;
  }
  function showInbox() {
    showMailView(false);
    $('#mail-message .mail-body').replaceChildren();
  }
  function openMail(id) {
    const mail = mailItems.find(entry => entry.id === id);
    if (!mail?.body) return;
    if (id === hospitalReset.id) {
      hospitalReset.markOpened(mail.date);
      renderMailList();
      mailToast.hidden = true;
    }
    lastOpenedMail = mailList.querySelector(`[data-open-mail="${id}"]`);
    const title = $('#mail-message-title');
    const time = $('#mail-message-date');
    title.textContent = mail.subject;
    time.dateTime = mail.date;
    time.textContent = formatMailDate(mail);
    $('#mail-message .mail-body').innerHTML = mail.body.split('\n\n').map(paragraph =>
      `<p>${boldClues(paragraph, mail.clue).replaceAll('\n', '<br>')}</p>`
    ).join('');
    showMailView(true);
    title.focus({preventScroll: true});
    if (lastLoginAccount === 'current' && mail.senderId === 'lei-li') {
      window.ADOPTION_ACHIEVEMENTS.record('lei-mail', id);
    }
  }
  mailList.addEventListener('click', event => {
    const item = event.target.closest('[data-open-mail]');
    if (item) openMail(item.dataset.openMail);
  });
  async function openHospitalMail(message = hospitalReset.id) {
    if (!hospitalReset.read()) return;
    if ($('#game-screen').hidden) {
      $('#game-cover').hidden = true;
      noticeConfirmed = true;
      loggedIn = true;
      if (siteNav.readSpace() === 'legacy') {
        lastLoginAccount = 'legacy';
        returnToSecond.hidden = false;
      }
      if (await showGame('mail') === false) return;
    } else if (await activateModule('mail') === false) return;
    if (message === 'inbox') showInbox();
    else openMail(hospitalReset.id);
    if (query.get('from') === 'hospital' && !$('#mail-return-hospital')) {
      const back = document.createElement('a');
      back.id = 'mail-return-hospital';
      back.href = 'hospital.html#patient-login';
      back.textContent = '返回医院';
      $('.game-title-actions').prepend(back);
    }
  }
  mailToast.addEventListener('click', () => openHospitalMail());
  $('#mail-back').addEventListener('click', () => {
    showInbox();
    lastOpenedMail?.focus({preventScroll: true});
  });

  function albumHeader(title, count, backAction = '', visibility = '') {
    return `<header class="album-heading">${backAction ? `<button class="album-back" data-album-back="${backAction}" aria-label="${backAction === 'list' ? '返回相册' : '返回' + escapeHTML(title)}"><svg class="icon"><use href="#back"/></svg></button>` : ''}<h1>${escapeHTML(title)}</h1>${visibility ? `<small class="album-visibility">${escapeHTML(visibility)}</small>` : ''}<span>${count}</span></header>`;
  }

  function renderAlbumList() {
    activeAlbum = '';
    $('#album-panel').classList.remove('view-photo');
    $('#album-panel').innerHTML = albumHeader('相册', `${albums.length} 个相册`) + `<div class="album-grid">${albums.map((album, index) => {
      // 密码相册在列表里始终使用锁定封面，不因已保存的解锁状态露出照片。
      const locked = Boolean(album.locked);
      const photo = !locked && album.photos[0];
      return `<button class="album-tile ${locked ? 'is-locked' : ''}" data-open-album="${album.id}"><span class="album-cover ${photo ? 'has-photo' : ''}">${photo ? `<img src="${escapeHTML(photo.thumbnail)}" width="480" height="360" alt="" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async">` : `<svg class="icon"><use href="#${locked ? 'lock' : 'album'}"/></svg>`}</span><span class="album-tile-name">${escapeHTML(album.name)}${locked ? '<svg class="icon"><use href="#lock"/></svg>' : ''}</span><span class="album-photo-count">${album.photos.length} 张照片</span></button>`;
    }).join('')}</div>`;
    $('#album-panel').scrollTop = 0;
  }

  function openAlbum(id) {
    const album = albums.find(item => item.id === id);
    if (!album) return;
    if (album.locked && !unlockedAlbums.has(id)) { showAlbumAccess(album); return; }
    activeAlbum = id;
    $('#album-panel').classList.remove('view-photo');
    const photoCards = album.photos.map((photo, index) => {
      const caption = photo.caption ? `<span class="album-photo-caption">${escapeHTML(photo.caption)}</span>` : '';
      const uploaded = photo.uploadedAt && photo.uploadedLabel ? photoUploadTime(photo) : '';
      return `<button class="album-photo-card ${caption || uploaded ? '' : 'photo-only-card'}" data-open-photo="${photo.id}" aria-label="${escapeHTML(photo.caption || album.name + ' · 照片' + (index + 1))}"><span class="photo-thumbnail"><img src="${escapeHTML(photo.thumbnail)}" width="${photo.width}" height="${photo.height}" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async" alt=""></span>${caption}${uploaded}</button>`;
    }).join('');
    const introduction = album.introduction ? `<div class="album-introduction"><span>相册简介：</span><p>${escapeHTML(album.introduction)}</p></div>` : '';
    $('#album-panel').innerHTML = albumHeader(album.name, `${album.photos.length} 张照片`, 'list', album.visibility) + introduction + (album.photos.length ? `<div class="album-photo-grid">${photoCards}</div>` : '<div class="album-empty"><svg class="icon" aria-hidden="true"><use href="#album"/></svg><p>暂无照片</p></div>');
    $('#album-panel').scrollTop = 0;
  }

  function photoUploadTime(photo) {
    const label = boldClues(photo.uploadedLabel, photo.id === 'autumn-birthday' ? /6月28日/g : null);
    return `<time datetime="${photo.uploadedAt}">${label}</time>`;
  }

  function showAlbumAccess(album) {
    pendingAlbum = album.id;
    $('#album-access-title').textContent = album.name;
    $('#album-description').textContent = album.description;
    $('#album-question').textContent = album.question;
    $('#album-answer').value = '';
    $('#album-answer').removeAttribute('aria-invalid');
    $('#album-answer-error').textContent = '';
    $('#album-access-dialog').showModal();
    $('#album-answer').focus();
  }

  function openPhoto(id) {
    const album = albums.find(item => item.id === activeAlbum);
    if (!album || (album.locked && !unlockedAlbums.has(album.id))) return;
    const photo = album.photos.find(item => item.id === id);
    if (!photo) return;
    const uploaded = photo.uploadedAt && photo.uploadedLabel ? `<p class="photo-upload-time">上传时间：${photoUploadTime(photo)}</p>` : '';
    const caption = photo.caption ? `<p class="photo-caption">${escapeHTML(photo.caption).replaceAll('\n', '<br>')}</p>` : '';
    const commentClue = photo.id === 'hidden-snow-drawing' ? /纸飞机画展/g : null;
    const comments = photo.comments?.length ? `<section class="photo-comments" aria-label="评论互动"><h2>评论互动</h2><ol tabindex="0" aria-label="评论列表">${photo.comments.map(comment => `<li><img src="${escapeHTML(comment.avatar)}" width="28" height="28" loading="lazy" decoding="async" alt=""><div><strong>${escapeHTML(comment.author)}</strong><time datetime="${comment.at.replace(' ', 'T')}">${comment.at}</time><p>${boldClues(comment.text, commentClue)}</p></div></li>`).join('')}</ol></section>` : '';
    const hasInfo = Boolean(uploaded || caption || comments);
    $('#album-panel').classList.add('view-photo');
    $('#album-panel').innerHTML = albumHeader(album.name, '', album.id, album.visibility) + `<article class="photo-detail ${hasInfo ? '' : 'photo-only-detail'} ${comments ? 'has-comments' : ''}"><div class="photo-image-panel"><img class="photo-full-image" src="${escapeHTML(photo.small)}" srcset="${escapeHTML(photo.thumbnail)} ${Math.round(480 * photo.width / Math.max(photo.width, photo.height))}w, ${escapeHTML(photo.small)} ${photo.smallWidth}w, ${escapeHTML(photo.src)} ${photo.width}w" sizes="(max-width: 680px) calc(100vw - 32px), (max-width: 1000px) calc(100vw - 410px), 730px" width="${photo.width}" height="${photo.height}" decoding="async" fetchpriority="high" alt="${escapeHTML(photo.caption || album.name)}"></div>${hasInfo ? `<div class="photo-info">${uploaded}${caption}${comments}</div>` : ''}</article>`;
    $('#album-panel').scrollTop = 0;
    $('#album-panel .album-back').focus({preventScroll:true});
    if (photo.id === 'hidden-snow-drawing') window.ADOPTION_ACHIEVEMENTS.record('snow-drawing');
  }

  $('#album-panel').addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.openAlbum) openAlbum(button.dataset.openAlbum);
    else if (button.dataset.openPhoto) openPhoto(button.dataset.openPhoto);
    else if (button.dataset.albumBack === 'list') renderAlbumList();
    else if (button.dataset.albumBack) openAlbum(button.dataset.albumBack);
  });
  $('#album-access-form').addEventListener('submit', event => {
    event.preventDefault();
    const album = albums.find(item => item.id === pendingAlbum);
    if (!album) return;
    const answer = $('#album-answer').value.trim().replace(/[。.!！]+$/u, '');
    if (answer !== album.answer) {
      $('#album-answer-error').textContent = '答案不正确';
      $('#album-answer').setAttribute('aria-invalid', 'true');
      $('#album-answer').focus();
      return;
    }
    unlockedAlbums.add(album.id);
    try { localStorage.setItem(albumSaveKey, JSON.stringify([...unlockedAlbums])); } catch { /* 保留内存中的解锁状态。 */ }
    $('#album-access-dialog').close();
    openAlbum(album.id);
    $('#album-panel .album-back').focus({preventScroll:true});
  });
  $('#album-answer').addEventListener('input', () => { $('#album-answer-error').textContent = ''; $('#album-answer').removeAttribute('aria-invalid'); });
  ['#close-album-access', '#cancel-album-access'].forEach(selector => $(selector).addEventListener('click', () => $('#album-access-dialog').close()));
  $('#album-access-dialog').addEventListener('close', () => { pendingAlbum = ''; });

  const endingEntry = location.hash === ending.entryHash;
  let replay = location.hash === ending.replayHash && ending.read()?.phase === 'done';
  if (endingEntry || location.hash === ending.replayHash) {
    if (endingEntry && location.protocol === 'file:') ending.queue();
    try { history.replaceState(history.state, '', location.href.split('#')[0]); } catch {}
  }
  function showEndingLogin() {
    noticeConfirmed = true;
    showLogin('manual');
    return $('#pp-account');
  }
  function resumeEnding() {
    if (document.visibilityState !== 'visible' || !document.hasFocus() || $('dialog[open]')) return;
    if (replay) {
      replay = false;
      ending.play(showEndingLogin, true);
    } else if (ending.read()?.phase === 'pending') ending.play(showEndingLogin);
  }
  async function resumeSpace() {
    const account = siteNav.readSpace();
    if (!['current','legacy'].includes(account)) return;
    if (account === 'legacy' && ending.read()?.phase !== 'done') return;
    cover.hidden = true;
    noticeConfirmed = true;
    loggedIn = true;
    lastLoginAccount = account;
    returnToSecond.hidden = account !== 'legacy';
    if (await showGame('blog') !== false) window.ADOPTION_BLOG.openSitePost();
  }

  if (!replay && (!ending.allFilesRead() || ending.read()?.phase !== 'pending')) {
    document.documentElement.classList.remove('first-play-cover');
    if (endingEntry && ending.read()?.phase === 'done') {
      cover.hidden = true;
      showEndingLogin();
    } else if ([hospitalReset.id, 'inbox'].includes(query.get('mail'))) openHospitalMail(query.get('mail'));
    else if (query.get('view') === 'space' && siteNav.readSpace()) resumeSpace();
    else if (sessionStorage.getItem(secondSessionKey) === 'true' && ending.read()?.phase === 'done' &&
             (localStorage.getItem('adoption-day-six-day-v2') || localStorage.getItem('adoption-day-six-day-v1'))) {
      cover.hidden = true; noticeConfirmed = true; startSecondPlay();
    }
  }
  window.addEventListener('focus', resumeEnding);
  window.addEventListener('pageshow', resumeEnding);
  document.addEventListener('visibilitychange', resumeEnding);
  document.addEventListener('close', resumeEnding, true);
  resumeEnding();
})();
