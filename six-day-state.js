/* 每天五轮聊天。回复与待播消息一起保存，刷新不会重复计分。 */
(() => {
  'use strict';
  const key = 'adoption-day-six-day-v2';
  const oldKey = 'adoption-day-six-day-v1';
  const dialogues = window.ADOPTION_SIX_DAY_DIALOGUES;
  const byId = id => dialogues.find(chat => chat.id === id);
  const dayDate = day => '2008-08-' + (17 + day);
  const initial = (revision = 0) => ({
    phase: 'intro', day: 1, round: 0, score: 20, log: [], delivery: null,
    early: false, thresholdAcknowledged: false, revision, ending: null
  });
  const nextChat = state => byId('D' + state.day + '-' + (state.round + 1));
  const canEndEarly = state => state.phase === 'active' && !state.delivery && state.score >= 70 && !state.early;

  function read() {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    const old = localStorage.getItem(oldKey);
    if (!old) return initial();
    const saved = JSON.parse(old);
    if (saved.phase === 'intro') return initial();
    // 旧版保留已聊过的回合，分数只从聊天回复重新计算。
    const state = initial();
    state.phase = 'active';
    state.day = saved.day;
    for (const [index, day] of saved.days.entries()) {
      for (const entry of day.log.filter(record => record.type === 'chat')) {
        const selected = saved.events[entry.id]?.selectedOption;
        const points = byId(entry.id)?.options[selected]?.points ?? entry.points - (entry.bonus || 0);
        const gain = Math.min(100 - state.score, Math.max(0, points));
        state.log.push({id: entry.id, date: dayDate(index + 1), at: entry.at,
          opening: entry.opening, answer: entry.answer, reply: entry.reply, gain, option: selected});
        state.score += gain;
      }
    }
    state.round = saved.chatCount;
    if (state.round === 5) completeDay(state);
    return state;
  }

  function completeDay(state) {
    if (state.day < 6) {
      state.day++;
      state.round = 0;
      return;
    }
    if (state.score >= 70) {
      state.phase = 'ending';
      state.ending = {at: 0, timeline: 4, run: Date.now().toString(36) + '-' + Math.random().toString(36).slice(2), videoCompleted: false};
    } else {
      Object.assign(state, initial(state.revision), {phase: 'active', retried: true});
    }
  }

  function transition(source, command) {
    if (command.revision !== source.revision) return source;
    const state = JSON.parse(JSON.stringify(source));
    if (command.type === 'start' && state.phase === 'intro') {
      state.phase = 'active';
    } else if (command.type === 'replay' && state.phase === 'complete') {
      return initial(state.revision + 1);
    } else if (command.type === 'keep-chatting' && canEndEarly(state)) {
      state.thresholdAcknowledged = true;
    } else if (command.type === 'early' && canEndEarly(state)) {
      state.early = true;
      state.thresholdAcknowledged = true;
      state.day = 6;
      state.round = 4;
    } else if (command.type === 'reply' && state.phase === 'active' && !state.delivery) {
      const chat = nextChat(state);
      const option = chat?.options[command.option];
      if (chat?.id !== command.id || !option) return source;
      const gain = Math.min(100 - state.score, option.points);
      state.log.push({id: chat.id, date: dayDate(state.day), at: new Date().toISOString(),
        opening: chat.opening, answer: option.text, reply: [option.reply], gain, option: command.option});
      state.score += gain;
      state.round++;
      state.delivery = chat.id;
      state.retried = false;
    } else if (command.type === 'delivered' && state.phase === 'active' && state.delivery === command.id) {
      state.delivery = null;
      if (state.round === 5) completeDay(state);
    } else {
      return source;
    }
    state.revision++;
    return state;
  }

  function dispatch(command) {
    const commit = () => {
      const before = read();
      const state = transition(before, command);
      if (state !== before) {
        localStorage.setItem(key, JSON.stringify(state));
        checkAchievements(state);
        if (command.type === 'delivered' && command.id === 'D2-1') {
          const chose = (id, flag) => {
            const entry = state.log.find(line => line.id === id);
            if (!entry) return false;
            const options = byId(id).options;
            // Older saves stored the selected reply but no option index.
            const option = options[entry.option] || options.find(candidate => candidate.text === entry.answer);
            return option?.flags?.includes(flag);
          };
          if (chose('D1-3', 'day1_promise') && chose('D2-1', 'day2_kept_promise')) {
            window.ADOPTION_ACHIEVEMENTS.record('promise-kept');
          }
        }
      }
      return state;
    };
    return navigator.locks ? navigator.locks.request(key, commit) : Promise.resolve(commit());
  }

  function checkAchievements(state = read()) {
    if (['active', 'ending', 'complete'].includes(state.phase) && state.score === 100 && state.log?.some(entry => byId(entry.id))) {
      window.ADOPTION_ACHIEVEMENTS?.record('reassurance-full');
    }
  }

  function saveEnding(at, complete = false, timeline = 4, playback = {}) {
    if (window.ADOPTION_GAME_RESET?.isCurrent() === false) return false;
    const state = read();
    if (state.phase !== 'ending') return false;
    if (playback.run && state.ending.run && playback.run !== state.ending.run) return false;
    const migrated = state.ending.timeline !== timeline;
    state.ending = {...state.ending, at: migrated || playback.rewind ? at : Math.max(state.ending.at, at), timeline};
    if (playback.run) state.ending.run = playback.run;
    if (playback.videoCompleted === true) state.ending.videoCompleted = true;
    if (Number.isFinite(playback.videoEndedAt) && playback.videoCompleted) state.ending.videoEndedAt = playback.videoEndedAt;
    if (complete) state.phase = 'complete';
    localStorage.setItem(key, JSON.stringify(state));
    return complete;
  }

  window.ADOPTION_SIX_DAY_STATE = {key, read, initial, transition, dispatch, nextChat, dayDate, saveEnding, canEndEarly, checkAchievements};
  checkAchievements();
})();
