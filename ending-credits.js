(() => {
  'use strict';

  const message = [
    "你又来啦？",
    "恭喜你，陪伴雷淞然，走向了另外的一程人生。",
    "",
    "在原来的故事里，他用了十七年，才终于等到一个坚定选择自己的人。可是你，已经错过了他最无措的时光，整整十七年。",
    "后来，时间给了你一次重来的机会。你却没有选择与他更早相遇，而是让他早些遇见幸福。",
    "",
    "从此，他将拥有一段与你无关的童年。",
    "那将会是一段截然相反的幸福人生。",
    "沈阳的冬天依旧漫长，漫天风雪，却不再只剩寒冷；会有人在暮色四合时等他归家，在一个个再寻常不过的晨昏间飘出平淡又幸福的烟火气；会有人教他相信，别离不等于遗弃，不等于再也不见。明日，也未必遥不可及。",
    "他将平安地长大、升学、远行，结识许多与你素不相识的人，经历细碎而丰盈的悲欢，拥有属于他的幸福家庭、独立的灿烂人生。而你亲手割舍的，是那个曾经在漫长的孤独中只能等待，只能把毕生的依恋交托在你身上的那个破碎灵魂。",
    "",
    "所幸岁月辽阔，人间的道路又何止千万条。多年以后，他仍穿过熙攘的人群，来到你的面前。",
    "命运大抵总是如此幽默，让你们的人生轨迹跨越无数个宇宙，在冥冥之中仍然注定彼此纠缠。",
    "所谓改写命运，并不是为了令他更早地属于你，却让他在遇见你之前，就已经拥有值得珍惜的一生。",
    "",
    "这一次，他不需要再被任何人拯救。",
    "",
    "你把他交还给他自己，但你从未失去过他。",
    "",
    "当秋风又起，在这场温柔的人生里，依旧早已留住了你的位置。"
];
  const crew = [
    ['出演', '张呈、雷淞然'],
    ['剧本编写', '沈观复、沈渝'],
    ['程序制作', '沈观复'],
    ['游戏体验测试', '沈渝、衔青、原价票、94']
  ];
  const thanks = ['感谢每一位走进这个故事的人。', '谢谢你们，陪他们走到了这里。'];

  function text(tag, copy) {
    const node = document.createElement(tag);
    node.textContent = copy;
    return node;
  }

  function showSummary(slate) {
    const summary = document.createElement('section');
    summary.className = 'ending-credit-summary';
    const feedback = document.createElement('div');
    feedback.className = 'ending-credit-feedback';
    feedback.append(
      window.ADOPTION_ENDING_TYPE.paragraph('如果对游戏有任何建议，或在游玩过程中发现 Bug，欢迎来信反馈：'),
      text('strong', 'shj88286@gmail.com')
    );
    const farewell = document.createElement('div');
    farewell.className = 'ending-credit-thanks';
    for (const line of thanks) {
      const paragraph = window.ADOPTION_ENDING_TYPE.paragraph(line);
      farewell.append(paragraph);
    }
    const home = text('button', '返回首页');
    home.type = 'button';
    home.className = 'ending-home-button';
    home.addEventListener('click', () => {
      sessionStorage.removeItem('adoption-day-second-play-session-v1');
      window.ADOPTION_SITE_NAV.clearSpace();
      location.replace(new URL('index.html', location.href).href);
    });
    const actions = document.createElement('div');
    actions.className = 'ending-summary-actions';
    actions.append(home);
    summary.append(feedback, farewell, actions);
    slate.dataset.step = 'summary';
    slate.replaceChildren(summary);
  }

  function createRoll(slate) {
    const roll = document.createElement('section');
    roll.className = 'ending-credit-roll';
    const story = document.createElement('div');
    story.className = 'ending-credit-story';
    story.append(...message.map(line => {
      if (line) return window.ADOPTION_ENDING_TYPE.paragraph(line);
      const gap = document.createElement('div');
      gap.className = 'ending-story-gap';
      return gap;
    }));
    const names = document.createElement('dl');
    names.className = 'ending-credit-crew';
    for (const [role, name] of crew) names.append(text('dt', role), text('dd', name));
    const people = document.createElement('section');
    people.className = 'ending-credit-people';
    people.append(text('h2', '《秋叶孤儿院调查录》'), names);
    roll.append(story, people);
    slate.replaceChildren(roll);
    window.ADOPTION_ENDING_CREDITS.rollDuration = Math.max(45000, (slate.clientHeight + roll.offsetHeight) / 27 * 1000);
    return progress => {
      const height = slate.clientHeight;
      const offset = height - (height + roll.offsetHeight) * progress;
      roll.style.transform = `translateY(${offset}px)`;
    };
  }

  window.ADOPTION_ENDING_CREDITS = {createRoll, showSummary};
})();
