/* 所有回复都留在 PP 窗口，来信逐条显示。 */
(() => {
  'use strict';
  const model = window.ADOPTION_SIX_DAY_STATE;
  const intro = `<h2>2008年8月18日。</h2>
    <p>你回到了城南旧章失联的那一天。</p>
    <p>在原本的时间线中，五天后，小雷将因为害怕新的家庭，也担心失去与你的联系，拒绝燕子姐的收养。</p>
    <p><strong>这一次，你有六天时间改变他的决定。</strong></p>
    <p class="six-mission-goal"><strong>任务目标：在8月18日至23日期间，通过聊天帮助小雷消除顾虑，将安心值从20分提升至70分，让他愿意尝试接受新的家庭。</strong></p>`;
  let state, ui, host, history, controls, progress, feedback, log, milestone, mission;
  let timer, generation = 0, busy = false;

  function button(text, click) {
    const node = document.createElement('button');
    node.type = 'button';
    node.textContent = text;
    node.onclick = click;
    return node;
  }

  function addMessage(text, at, self = false, arrived = false) {
    log.insertAdjacentHTML('beforeend', ui.messageHTML({text, at}, self, arrived ? 'six-arriving' : ''));
    if (arrived) {
      history.scrollTop = history.scrollHeight;
      ui.tone(false, self);
    }
  }

  function clock(date, at) {
    return date + ' ' + new Date(at).toLocaleTimeString('zh-CN', {hour12: false});
  }

  function addDate(date) {
    const divider = document.createElement('div');
    divider.className = 'retro-date-divider';
    divider.textContent = date.replaceAll('-', '.');
    log.append(divider);
  }

  function drawLog() {
    log.replaceChildren();
    let date;
    for (const entry of state.log) {
      if (date !== entry.date) {
        date = entry.date;
        addDate(date);
      }
      const at = clock(date, entry.at);
      entry.opening.forEach(text => addMessage(text, at));
      addMessage(entry.answer, at, true);
      if (state.delivery !== entry.id) entry.reply.forEach(text => addMessage(text, at));
    }
    if (date !== model.dayDate(state.day)) addDate(model.dayDate(state.day));
    history.scrollTop = history.scrollHeight;
  }

  function wait(delay, action) {
    const current = generation;
    timer = setTimeout(() => {
      if (generation === current && !host.hidden) action();
    }, delay);
  }

  function paintStatus() {
    const date = model.dayDate(state.day);
    host.querySelector('.second-chat-date').textContent = '2008年8月' + date.slice(-2) + '日';
    progress.querySelector('strong').textContent = state.score + '/100';
    progress.querySelector('progress').value = state.score;
    const currentRound = state.delivery ? state.round : state.round + 1;
    progress.querySelector('.six-round').textContent = '第' + state.day + '天 · 第' + currentRound + '轮';
    feedback.textContent = state.retried ? '六天结束时安心值未达 70 分。回到 8 月 18 日。' : '';
  }

  async function act(type, extra = {}) {
    if (busy) return;
    busy = true;
    try {
      state = await model.dispatch({type, revision: state.revision, ...extra});
      if (!host.hidden) render();
    } catch {
      feedback.textContent = '这次回复没能保存，请重试。';
    } finally {
      busy = false;
    }
  }

  function showReplies(chat) {
    controls.replaceChildren();
    const replies = document.createElement('div');
    replies.className = 'six-replies';
    const offset = (state.day + state.round) % chat.options.length;
    for (let index = 0; index < chat.options.length; index++) {
      const option = (index + offset) % chat.options.length;
      replies.append(button(chat.options[option].text, () => act('reply', {id: chat.id, option})));
    }
    controls.append(replies);
    if (model.canEndEarly(state)) {
      const early = button('提前结束…', showMilestone);
      early.className = 'six-early';
      controls.append(early);
    }
    history.scrollTop = history.scrollHeight;
  }

  function animateLines(lines, at, done, index = 0) {
    if (index >= lines.length) {
      done();
      return;
    }
    wait(index === 0 ? 170 : 270, () => {
      addMessage(lines[index], at, false, true);
      animateLines(lines, at, done, index + 1);
    });
  }

  function render() {
    close();
    host.classList.toggle('six-round-active', state.phase === 'active');
    if (state.phase === 'ending' || state.phase === 'complete') {
      hide();
      ui.ending(state);
      return;
    }
    paintStatus();
    drawLog();
    controls.replaceChildren();
    controls.hidden = state.phase === 'intro';
    if (state.phase === 'intro') {
      mission.showModal();
      mission.querySelector('button').focus({preventScroll: true});
      return;
    }
    if (state.delivery) {
      const entry = state.log.at(-1);
      feedback.textContent = '安心值 +' + entry.gain + ' · ' + state.score + '/100';
      animateLines(entry.reply, clock(entry.date, entry.at), () => {
        wait(390, () => act('delivered', {id: entry.id}));
      });
      return;
    }
    if (model.canEndEarly(state) && !state.thresholdAcknowledged) {
      showMilestone();
      return;
    }
    const chat = model.nextChat(state);
    controls.textContent = '等待忧郁小猫猫的消息…';
    animateLines(chat.opening, clock(model.dayDate(state.day), Date.now()), () => showReplies(chat));
  }

  function close() {
    generation++;
    clearTimeout(timer);
    if (milestone?.open) milestone.close();
    if (mission?.open) mission.close();
  }

  function hide() {
    close();
    if (controls) for (const node of [controls, progress, feedback]) node.hidden = true;
  }

  function showMilestone() {
    if (!model.canEndEarly(state) || milestone.open) return;
    milestone.querySelector('.six-milestone-score').textContent = state.score + '/100';
    milestone.showModal();
    milestone.querySelector('.six-keep-chatting').focus();
  }

  function mount(screen, callbacks) {
    host = screen;
    ui = callbacks;
    history = host.querySelector('.second-history');
    if (!controls) {
      controls = document.createElement('section');
      controls.className = 'six-choices';
      host.querySelector('.second-reply-form').before(controls);
      progress = document.createElement('div');
      progress.className = 'six-chat-status';
      progress.innerHTML = '<span>安心值 <strong></strong></span><progress max="100" aria-label="安心值"></progress><span class="six-round"></span>';
      host.querySelector('.second-contact-strip').after(progress);
      feedback = document.createElement('div');
      feedback.className = 'six-feedback';
      feedback.setAttribute('role', 'status');
      host.querySelector('.retro-window-footer').before(feedback);
      milestone = document.createElement('dialog');
      milestone.className = 'six-milestone';
      milestone.setAttribute('aria-labelledby', 'six-milestone-title');
      milestone.innerHTML = `<header class="retro-titlebar"><span>PP · 安心值提示</span></header>
        <div class="six-milestone-body"><h2 id="six-milestone-title">安心值已达到 70 分</h2>
        <p>当前安心值 <strong class="six-milestone-score"></strong></p>
        <p>可以提前结束，直接前往 8 月 23 日完成最后一轮，也可以继续体验剩下的对话。</p></div>`;
      const actions = document.createElement('footer');
      const keep = button('继续聊天', () => act('keep-chatting'));
      keep.className = 'six-keep-chatting';
      actions.append(button('提前结束', () => act('early')), keep);
      milestone.append(actions);
      milestone.addEventListener('cancel', event => {
        event.preventDefault();
        act('keep-chatting');
      });
      host.append(milestone);
      mission = document.createElement('dialog');
      mission.className = 'six-milestone six-mission';
      mission.setAttribute('aria-labelledby', 'six-mission-title');
      mission.innerHTML = `<header class="retro-titlebar"><span id="six-mission-title">特别任务 · 六天后的选择</span></header>
        <div class="six-mission-body">${intro}</div>`;
      const missionActions = document.createElement('footer');
      missionActions.append(button('开始聊天', () => act('start')));
      mission.append(missionActions);
      mission.addEventListener('cancel', event => event.preventDefault());
      host.append(mission);
    }
    log = document.createElement('div');
    log.className = 'six-conversation';
    history.append(log);
    for (const node of [controls, progress, feedback]) node.hidden = false;
    host.querySelector('.second-reply-form').hidden = true;
    refresh();
  }

  function refresh() {
    if (!host || host.hidden || host.dataset.sceneStage !== 'ready') return;
    state = model.read();
    render();
  }

  window.addEventListener('storage', event => {
    if (event.key === model.key && !busy) refresh();
  });

  window.ADOPTION_SIX_DAY = {
    mount, close, hide, refresh,
    hasSave: () => Boolean(localStorage.getItem(model.key) || localStorage.getItem('adoption-day-six-day-v1'))
  };
})();
