(() => {
  'use strict';

  const directorMobile = '199-0000-2008';

  const sections = {
    about: { title: '机构概况', intro: '了解秋叶 · 见证成长', keywords: '机构简介 发展历程 公用电脑 王建华 院长寄语 院区环境' },
    news: { title: '新闻动态', intro: '院内近期活动与新闻' },
    life: { title: '院内生活', intro: '了解孩子们的日常学习与活动' },
    projects: { title: '公益项目', intro: '了解秋叶孤儿院的公益项目' },
    contact: { title: '联系我们', intro: '京城市安和区文苑路28号' }
  };

  const articles = {
    'paper-plane': {
      title: '秋叶孤儿院开展“纸飞机”儿童绘画与情绪表达活动',
      section: 'news',
      publishedDate: '2007-11-26',
      source: '秋叶孤儿院',
      searchKeywords: ['纸飞机画展', '纸飞机', '画展', '儿童绘画与情绪表达活动'],
      summary: '2007年11月24日，秋叶孤儿院开展“纸飞机——画出我心中的世界”儿童绘画与情绪表达活动。',
      paragraphs: [
        '为进一步关注院内儿童心理健康，及时识别和干预儿童成长过程中出现的心理问题，11月24日，秋叶孤儿院组织开展了“纸飞机——画出我心中的世界”儿童绘画与情绪表达活动，邀请儿童心理辅导专业人员参与，通过自由绘画、作品分享及个别访谈等形式，了解儿童的情绪状态与心理需求。',
        '本次活动不设置作品评比环节，而是鼓励儿童围绕家庭、生活环境、人际关系及个人记忆等主题进行创作。心理辅导人员结合儿童对作品的讲述，了解其既往生活经历，并对存在明显心理困扰的儿童开展进一步观察与评估。',
        '活动中，一幅题为《下雪了》的蜡笔画引起了辅导人员的重点关注。画面描绘了一栋亮着灯光的房屋，屋外积雪深厚，一个身着冬装的小男孩独自站在雪地中，远处停放着一辆黑色汽车。',
        '在作品交流环节，小作者表示，画中描绘的是自己曾经居住的地方。当工作人员询问画中的人物为何没有进入房屋时，孩子回答：“因为爸爸还没有让我进去。我得等他不生气了才行。”',
        '在后续个别访谈中，辅导人员了解到，孩子曾长期处于缺乏安全感的家庭环境中，对照护者的情绪变化表现出较高的警觉性，并倾向于将成人的不合理惩罚归咎于自身行为。在讲述相关经历时，孩子多次强调自己应当更加听话，对部分明显超出正常管教范围的行为缺乏正确认识。',
        '结合既往生活经历、访谈情况及日常行为观察，参与活动的心理辅导人员认为，该儿童仍表现出较为明显的创伤相关心理反应，需要在已有评估与干预的基础上，继续接受专业心理支持，并根据其成长阶段和情绪变化适时调整干预方案。',
        '秋叶孤儿院院长王建华介绍，该儿童此前曾被家庭收养，但由于在收养期间受到不当对待，身心健康受到伤害，已于2006年重新回到院内生活。',
        '“孩子刚回来的时候，对大人的情绪特别敏感，有时候明明没有做错什么，也会一个劲地道歉。”王建华表示，“他以前经历过一些不好的事情，有些影响不是回到院里就能马上消除的。我们希望通过这样的活动，让孩子有机会把平时不愿意说、不知道怎么说的事情表达出来。”',
        '针对该儿童的具体情况，院方将继续落实既有心理干预计划，结合专业人员的阶段性评估意见，开展个别心理辅导、必要的专科复评及持续跟踪，帮助其逐步建立稳定的安全感，改善创伤相关情绪与行为问题。',
        '活动结束后，工作人员对相关绘画作品、访谈记录及心理观察材料进行了整理归档。对于需要持续关注的儿童，院方将建立个别关怀记录，并在日常照护、教育支持及心理干预等方面提供针对性帮助。',
        '此次“纸飞机”活动为儿童提供了更加自由的情绪表达渠道，也为工作人员及时识别潜在的心理健康问题、完善个别化关怀工作提供了重要参考。',
        '据了解，本次活动也是秋叶孤儿院与京城市儿童医院开展儿童心理健康支持合作的系列活动之一。近年来，双方围绕福利机构儿童的健康评估、心理支持及长期随访等工作持续开展专业协作，逐步完善院内日常照护与院外医疗支持相衔接的工作机制。',
        '京城市儿童医院有关专业人员表示，儿童在绘画及其他非语言表达活动中呈现的情绪与行为特征，可为后续专业评估提供辅助参考，但不宜仅凭单幅作品作出临床判断。对于具有复杂成长经历的儿童，应结合既往医疗记录、持续观察及专业评估结果，制定适宜的支持方案。',
        '有关双方合作项目的开展情况，京城市儿童医院已另行整理相关工作资料，供社会公众了解儿童心理健康支持工作。',
        '秋叶孤儿院将继续加强与专业医疗机构的合作，完善儿童健康档案管理及长期关怀机制，为院内儿童提供更加稳定、持续的成长支持。'
      ],
      emphasizedParagraphs: [4, 5, 6],
      work: {
        title: '《下雪了》',
        medium: '蜡笔画',
        theme: '既往家庭生活体验、创伤相关心理反应及安全感',
        followUp: '专业心理支持、阶段性评估及持续跟踪',
        custody: '原始绘画交流记录、心理观察材料及后续关怀记录已纳入院内儿童成长档案。'
      },
      photos: [
        { label: '图1｜“纸飞机”儿童绘画与情绪表达活动现场', src: 'assets/photos/archive-paper-plane-activity.webp', afterParagraph: 2 },
        { label: '图2｜儿童绘画作品展示区', src: 'assets/photos/archive-paper-plane-gallery.webp', afterParagraph: 2 },
        { label: '图3｜典型观察作品《下雪了》', src: 'assets/photos/archive-paper-plane-snow.webp', afterParagraph: 4 }
      ],
      related: { title: '京城市儿童医院｜儿童心理健康支持项目工作纪实', href: 'hospital.html#project?from=paper-plane' }
    },
    'lei-li-visit': {
      title: '盛鸿实业集团董事长雷力一行赴秋叶孤儿院开展爱心慰问活动',
      section: 'news',
      publishedDate: '2005-05-28',
      source: '秋叶孤儿院',
      searchKeywords: ['雷力'],
      summary: '2005年5月27日，盛鸿实业集团董事长雷力一行赴秋叶孤儿院开展爱心慰问活动。',
      paragraphs: [
        '5月27日上午，盛鸿实业集团董事长雷力率集团有关负责人及员工代表来到秋叶孤儿院，开展以“情系儿童成长，传递社会温暖”为主题的爱心慰问活动，为院内儿童送来学习用品、图书及生活物资，并就儿童生活照护、教育支持和社会公益事业发展等问题与院方进行了深入交流。',
        '盛鸿实业集团是一家以房地产开发、建材贸易及商业投资为主要业务的综合性民营企业。近年来，集团在稳步推进企业经营发展的同时，积极参与社会公益事业，先后组织开展助学帮扶、困难家庭慰问等活动，在履行企业社会责任方面进行了积极探索。',
        '活动当天，雷力一行在秋叶孤儿院院长王建华的陪同下，参观了儿童宿舍、活动室及学习区域，详细了解院内儿童的生活环境、日常教育及成长情况。在参观过程中，雷力不时驻足与孩子们交流，询问他们的学习情况和兴趣爱好，并对部分儿童的绘画作品表现出浓厚兴趣。',
        '在随后举行的捐赠仪式上，盛鸿实业集团向秋叶孤儿院捐赠了一批儿童读物、文具、书包及生活用品，并表示将结合院方实际需求，继续在儿童学习条件改善、生活设施完善等方面提供力所能及的帮助。',
        '雷力在活动中表示，儿童的健康成长关系到家庭的幸福和社会的未来。企业的发展离不开社会各界的支持，在创造经济价值的同时，也应当主动承担相应的社会责任。“这些孩子和其他孩子一样，都应该有一个快乐的童年，有接受良好教育、健康成长的机会。我们希望通过自己的努力，让他们感受到更多来自社会的关心和爱护。”',
        '雷力表示，公益事业不应停留在一次性的物资捐赠上，更重要的是建立长期、稳定的帮扶关系，真正了解孩子们在生活和成长过程中遇到的困难。',
        '在谈及儿童家庭教育问题时，雷力认为，物质条件固然重要，但来自家庭的陪伴、理解和关爱同样不可或缺。“一个孩子最需要的，不是多么优越的生活条件，而是有人愿意关心他、照顾他，给他一个安稳的家。孩子的成长需要耐心，也需要大人付出更多的时间和责任。”朴实真挚的话语得到了在场工作人员的认同。',
        '活动期间，雷力还与院内儿童共同参与了绘画和互动游戏。一名儿童向他展示了自己画的小汽车，雷力饶有兴趣地询问画中的汽车是什么型号，并鼓励孩子继续发挥想象力，画出更多喜欢的东西。现场气氛轻松融洽，孩子们的欢声笑语不断。',
        '王建华院长代表秋叶孤儿院对盛鸿实业集团的爱心捐赠表示感谢。他介绍，院内儿童在生活照护、教育培养及心理关怀等方面需要社会各界的持续支持。此次活动不仅改善了部分儿童的学习生活条件，也让孩子们有机会接触更多关心他们成长的社会人士。',
        '“孩子们需要的并不只是物质上的帮助。有人愿意来看看他们，陪他们说说话，认真听他们讲自己的事情，对他们来说也是很重要的。”王建华表示，希望今后能够与盛鸿实业集团保持联系，进一步探索适合院内儿童实际需求的公益帮扶形式，为孩子们创造更加良好的成长环境。',
        '据了解，盛鸿实业集团近年来持续关注教育及儿童福利事业。雷力本人也多次参与公益捐助与社会慰问活动，并表示未来将继续支持儿童成长相关公益项目，鼓励更多企业员工参与志愿服务。',
        '活动最后，雷力一行与院内工作人员及部分儿童合影留念。此次慰问活动进一步增进了社会爱心企业与儿童福利机构之间的交流，为推动社会力量参与儿童关怀工作发挥了积极作用。'
      ],
      photos: [
        { label: '图1｜盛鸿实业集团董事长雷力向秋叶孤儿院捐赠爱心物资', src: 'assets/photos/archive-lei-li-donation.webp', afterParagraph: 4 },
        { label: '图2｜雷力与院内儿童及工作人员合影留念', src: 'assets/photos/archive-lei-li-group.webp', afterParagraph: 12 }
      ]
    },
    'wang-jianhua-profile': {
      title: '王建华：让每一个孩子都有一个可以回来的家',
      section: 'news',
      publishedDate: '2025-03-18',
      source: '秋叶孤儿院',
      searchKeywords: ['王建华'],
      friendshipParagraph: 3,
      summary: '在秋叶孤儿院，孩子们习惯叫王建华一声“王院长”。',
      paragraphs: [
        '在秋叶孤儿院，孩子们习惯叫王建华一声“王院长”。从日常生活安排到学习教育，从孩子们的生日到离院后的工作生活，这位陪伴秋叶走过数十年的院长，始终牵挂着院里每一个孩子的成长。',
        '对于王建华而言，秋叶孤儿院不仅是工作的地方，也是他自己长大的地方。',
        '大约五十年前，年幼的王建华因家庭变故来到秋叶孤儿院，在这里度过了童年。那时的院舍条件简陋，孩子们住在集体宿舍，生活用品常常需要几个人共用。尽管日子并不宽裕，工作人员仍然尽力照顾每个孩子的生活，也给王建华留下了许多温暖的回忆。',
        '正是在那段时间里，他认识了同样在院内生活的松天硕。两个孩子年龄相仿，常常一起上学、做功课，也曾因为争抢玩具闹过矛盾。多年以后，王建华提起这位老朋友，仍然带着几分熟悉的调侃。',
        '“他小时候可不像现在这样，脾气倔得很，什么事情都不肯认输。不过人倒是很好，我那时候有什么难处，他总愿意帮忙。”',
        '成年以后，两人逐渐走上不同的人生道路。松天硕离开孤儿院，成家立业，后来也成为了一名父亲；王建华则在外工作多年后，重新回到了自己成长的地方。',
        '谈及这个决定，王建华说，自己并非一开始就想好要从事儿童福利工作。年轻时，他也曾希望离开熟悉的环境，到外面的世界寻找更好的生活。但随着年纪增长，童年在孤儿院的经历始终让他难以忘怀。',
        '“小时候总想着快点长大，长大了就能离开这里。真到了外面才知道，不是每个人离开以后都有地方可以回去。”',
        '在了解到秋叶孤儿院面临院舍老旧、照护人员不足等困难后，王建华决定参与院内管理与改建工作。此后，他逐渐承担起更多管理职责，并最终接任院长。',
        '在王建华与工作人员的共同努力下，秋叶孤儿院陆续改善了儿童住宿、学习及生活条件，增设阅读、绘画等活动空间，并逐步完善教育支持、医疗保障和心理关怀工作。',
        '王建华始终认为，儿童福利工作不能仅仅满足于让孩子吃饱穿暖，更重要的是让他们在稳定的环境中建立安全感，拥有被尊重、被理解的成长经历。',
        '“有些孩子刚来的时候不爱说话，连想要什么都不敢提。你问他喜欢吃什么，他说都可以；问他想玩什么，他也说都可以。其实不是他们没有想法，是以前没有多少人认真问过。”',
        '或许正因为自己也曾经历过缺乏家庭陪伴的童年，王建华对院内儿童的情绪变化格外留心。他鼓励孩子们表达自己的想法，也希望工作人员能够给予他们更多耐心，而不是简单地用统一的标准要求每一个人。',
        '多年来，王建华见证了许多孩子从入院时的拘谨不安，到逐渐适应集体生活，再到走出院门、开始独立生活的过程。有人考上大学，有人参加工作，也有人在新的家庭中重新开始生活。对于这些孩子的变化，他总能记得许多细节。',
        '“有个孩子小时候不喜欢读书，天天想着画画，画得满墙都是。后来长大了，还是喜欢画画。也挺好的，人有自己喜欢的事情，总比什么都不敢想强。”',
        '如今，松天硕与王建华依然保持着密切联系。虽然两人平时各有工作和家庭，松天硕仍会抽空回到秋叶孤儿院看望老朋友，也会关注院内儿童的生活情况。',
        '王建华说，他们偶尔还会聊起小时候的事情。院舍经过多次改建，许多曾经熟悉的地方早已变了模样，但那些一起生活过的人和经历，始终是两人共同的记忆。',
        '“我们小时候都盼着有人来接自己回家。现在回过头想想，可能就是因为知道那种心情，才更希望这里的孩子能早点找到属于自己的家。”',
        '随着院内一批批孩子长大成人，王建华也开始更加关注他们离院后的生活。他认为，孩子的成长并不会因为离开孤儿院就宣告结束，特别是对于缺乏家庭支持的年轻人而言，初入社会时仍然需要必要的帮助和鼓励。',
        '近年来，秋叶孤儿院逐步完善离院人员联络与后续关怀机制，在就业咨询、生活适应及情绪支持等方面提供力所能及的协助。逢年过节，一些已经离院多年的孩子仍会回来探望，和工作人员一起吃饭、聊聊近况。',
        '“他们小时候总问我，长大了是不是就不能住在这里了。我说，长大了当然要去过自己的日子，不能一辈子待在院里。但是以后想回来看看，随时都可以。”',
        '回顾数十年的经历，王建华最欣慰的并非院舍添置了多少设备，而是那些曾经缺乏依靠的孩子，逐渐拥有了自己的生活，也能够坦然地规划未来。',
        '“我希望他们以后都能过得好，能遇到真心对他们好的人。至于还记不记得我，倒没有那么重要。”',
        '说到这里，王建华又补充了一句：“当然，偶尔回来看看，我还是很高兴的。”'
      ],
      photos: [
        { label: '图1｜王建华院长在秋叶孤儿院与孩子们交流', src: 'assets/photos/archive-wang-jianhua-children.webp', afterParagraph: 1 },
        { label: '图2｜王建华院长与老友松天硕合影', src: 'assets/photos/archive-wang-jianhua-friend.webp', afterParagraph: 17 }
      ]
    }
  };

  const recentNews = [
    ['autumn-outdoors', '2025-10-26', '秋叶孤儿院开展秋季户外活动', 386],
    ['volunteer-weekend', '2025-09-18', '志愿者走进秋叶，陪伴儿童度过温暖周末', 472],
    ['summer-reading', '2025-08-21', '秋叶孤儿院组织暑期阅读分享活动', 618],
    ['activity-room-renewal', '2025-07-10', '院内活动室设施维护与环境提升工作完成', 341],
    ['childrens-day', '2025-06-01', '秋叶孤儿院举办“童心同行”六一主题活动', 1468],
    ['spring-safety', '2025-04-16', '秋叶孤儿院开展春季安全教育活动', 529]
  ];

  const photos = {
    exterior: { src: 'assets/orphanage-exterior.webp', label: '院舍环境' },
    activity: { src: 'assets/orphanage-activity-room.webp', label: '公共活动室' },
    courtyard: { src: 'assets/orphanage-courtyard.webp', label: '院区庭院' },
    dormitory: { src: 'assets/orphanage-dormitory.webp', label: '生活宿舍' }
  };

  const aboutItems = [
    ['overview', '机构简介'],
    ['timeline', '发展历程'],
    ['director', '院长寄语'],
    ['campus', '院区环境']
  ];
  const milestones = [
    ['1975年', '秋叶孤儿院成立', '在当地有关部门及社会爱心人士的支持下，秋叶孤儿院正式成立，主要为失去家庭照护的儿童提供生活保障与成长支持。创办初期，院舍条件较为简陋，工作人员共同承担儿童的日常照护工作。'],
    ['1998年', '逐步完善院内管理', '曾在秋叶孤儿院成长的王建华回到院内参与管理工作，推动改善儿童住宿、饮食及教育条件，逐步建立更加规范的日常照护制度。'],
    ['2007年', '完善活动设施', '在社会爱心人士的支持下，院内添置了第一台公用电脑，并逐步丰富图书、绘画及文体活动设施，为儿童提供更多学习与课余活动机会。'],
    ['2008年', '丰富成长活动', '持续组织绘画、阅读和集体文体活动，鼓励孩子们记录生活、展示作品，培养兴趣爱好，同时加强对儿童情绪表达与心理健康的关注。'],
    ['2016年', '改善院舍环境', '陆续开展宿舍、活动室及公共区域的修缮改造，更新生活设施，完善消防安全与卫生管理，为儿童提供更加舒适、安全的生活环境。'],
    ['2025年', '提升综合关怀水平', '进一步完善儿童教育支持、心理健康服务及个别化成长关怀机制，加强与公益组织、专业人员及社会志愿者的合作，持续提升院内照护与服务水平。']
  ];

  const params = new URLSearchParams(location.search);
  const ending = window.ADOPTION_FIRST_ENDING;
  const main = document.querySelector('#main-content');
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const link = values => escapeHTML(ending.withProgress('?' + new URLSearchParams(values)));
  const sectionLink = section => link({section});
  document.querySelector('.admin-entry').href = ending.withProgress('orphanage-admin.html');

  function heading(title, crumbs = [], subtitle = '') {
    return `<header class="page-heading">
      <div class="site-wrap">
        <nav class="breadcrumbs" aria-label="当前位置">
          ${title === '首页' ? '' : '<a href="orphanage.html">首页</a><span aria-hidden="true">›</span>'}
          ${crumbs.map(([label, href]) => `<a href="${href}">${label}</a><span aria-hidden="true">›</span>`).join('')}
          <span aria-current="page">${title}</span>
        </nav>
        <h1>${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ''}
      </div>
    </header>`;
  }

  function renderHome() {
    const slides = [photos.exterior, photos.activity, photos.courtyard];
    const shortcuts = [
      ['about', 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6'],
      ['news', 'M5 3h14v18H5zM8 7h8M8 11h8M8 15h5'],
      ['life', 'M4 5h5c1.7 0 3 1.3 3 3v12c-1-1.3-2-2-4-2H4zm16 0h-5c-1.7 0-3 1.3-3 3v12c1-1.3 2-2 4-2h4z'],
      ['projects', 'M12 20 4.5 12.5a4.5 4.5 0 0 1 6.4-6.4L12 7.2l1.1-1.1a4.5 4.5 0 0 1 6.4 6.4Z']
    ];
    main.innerHTML = heading('首页', [], '用心守护童年，陪伴每段成长') + `<div class="site-wrap home-content">
      <div class="home-layout">
        <section class="site-carousel" aria-label="院区照片轮播">
          ${slides.map((photo, index) => `<img src="${photo.src}" alt="${photo.label}" ${index ? 'hidden' : 'fetchpriority="high"'}>`).join('')}
          <div class="hero-caption"><h2>让每一个孩子，<br>都有被爱的机会</h2></div>
          <div class="carousel-controls">
            <button type="button" id="slide-prev" aria-label="上一张">‹</button>
            ${slides.map((photo, index) => `<button class="slide-dot" type="button" data-slide="${index}" aria-label="显示${photo.label}">${index + 1}</button>`).join('')}
            <button type="button" id="slide-next" aria-label="下一张">›</button>
            <button type="button" id="slide-toggle">暂停轮播</button>
          </div>
        </section>
        <aside class="shortcuts" aria-labelledby="shortcuts-title">
          <h2 id="shortcuts-title">快捷入口</h2>
          ${shortcuts.map(([key, icon]) => `<a href="${sectionLink(key)}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon}"/></svg>
            <strong>${sections[key].title}</strong>
            <span class="shortcut-arrow" aria-hidden="true">›</span>
          </a>`).join('')}
        </aside>
      </div>
      <section class="home-news" aria-labelledby="home-news-title">
        <h2 id="home-news-title">新闻动态</h2>
        ${renderNewsList(recentNews.slice(0, 3), 'h3')}
      </section>
    </div>`;

    const images = [...main.querySelectorAll('.site-carousel img')];
    const dots = [...main.querySelectorAll('[data-slide]')];
    const toggle = main.querySelector('#slide-toggle');
    let current = 0;
    let interval;
    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      images.forEach((image, i) => {
        image.hidden = i !== current;
        if (i === current) dots[i].setAttribute('aria-current', 'true');
        else dots[i].removeAttribute('aria-current');
      });
    }
    function setRotation(playing) {
      clearInterval(interval);
      interval = playing ? setInterval(() => {
        if (!document.hidden) showSlide(current + 1);
      }, 6500) : undefined;
      toggle.textContent = playing ? '暂停轮播' : '播放轮播';
    }
    function selectSlide(index) {
      setRotation(false);
      showSlide(index);
    }
    main.querySelector('#slide-prev').addEventListener('click', () => selectSlide(current - 1));
    main.querySelector('#slide-next').addEventListener('click', () => selectSlide(current + 1));
    for (const dot of dots) dot.addEventListener('click', () => selectSlide(Number(dot.dataset.slide)));
    toggle.addEventListener('click', () => setRotation(interval === undefined));
    showSlide(0);
    setRotation(!matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function renderAbout() {
    const gallery = [photos.exterior, photos.activity, photos.dormitory];
    main.innerHTML = heading('机构概况', [], '了解秋叶故事，走近温暖家园') + `<div class="site-wrap about-body">
      <nav class="about-nav" aria-label="机构概况栏目导航">
        <h2>栏目导航</h2>
        ${aboutItems.map(([id, title]) => `<a href="#${id}">${title}</a>`).join('')}
      </nav>
      <div class="about-content">
        <section id="overview">
          <h2>机构简介</h2>
          <p>秋叶孤儿院是一所为需要照顾与支持的儿童提供生活保障、教育陪伴和成长关怀的儿童福利机构。</p>
          <p>多年来，秋叶孤儿院坚持以儿童的实际需要为出发点，为院内儿童提供日常生活照料、学习支持、心理关怀以及丰富的文体活动，努力营造安全、稳定、温暖的成长环境。</p>
          <p>我们相信，每个孩子都有属于自己的兴趣、愿望和人生方向。秋叶不仅是孩子们生活的地方，也希望成为他们成长过程中可以信赖的家。</p>
        </section>
        <section id="timeline">
          <h2>发展历程</h2>
          <ol class="site-timeline">${milestones.map(([date, title, description]) => `<li>
            <h3><span>${date}</span>${title}</h3><p>${description}</p>
          </li>`).join('')}</ol>
        </section>
        <section id="director">
          <h2>院长寄语</h2>
          <p class="director-name"><strong>王建华</strong><span>秋叶孤儿院院长</span></p>
          <blockquote>
            <p>“孩子们来到这里的时候，有的还很小，有的已经懂事了。每个人的经历不同，喜欢的东西也不一样。有人爱画画，有人爱唱歌，还有人总惦记着出去玩。</p>
            <p>我们希望他们在这里能够安心生活，能够上学、交朋友，也能够慢慢找到自己喜欢做的事情。</p>
            <p>等他们有一天离开秋叶，去过自己的生活，我们当然替他们高兴。如果将来想回来看看，这里的门也一直为他们开着。”</p>
            <footer>——王建华</footer>
          </blockquote>
        </section>
        <section id="campus">
          <h2>院区环境</h2>
          <p>秋叶孤儿院设有生活宿舍、公共活动室、阅读空间和户外活动区域，为儿童提供日常生活、学习及休闲活动场所。</p>
          <div class="campus-gallery">
            ${gallery.map((photo, index) => `<button type="button" data-photo="${index}" aria-label="放大查看${photo.label}">
              <img src="${photo.src}" alt="" loading="eager" width="320" height="180"><span>${photo.label}</span>
            </button>`).join('')}
          </div>
        </section>
      </div>
    </div>` + photoViewer(gallery.length);

    const anchors = [...main.querySelectorAll('.about-nav a')];
    const aboutSections = aboutItems.map(([id]) => document.getElementById(id));
    function updateAboutNav() {
      const offset = Math.min(130, innerHeight * .25);
      let current = 0;
      for (const [index, section] of aboutSections.entries()) {
        if (section.getBoundingClientRect().top <= offset) current = index;
      }
      const atBottom = scrollY > 0 && Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        const anchor = aboutSections.findIndex(section => '#' + section.id === location.hash);
        current = anchor >= 0 && aboutSections[anchor].getBoundingClientRect().top >= 0 ? anchor : aboutSections.length - 1;
      }
      anchors.forEach((item, index) => {
        if (index === current) item.setAttribute('aria-current', 'location');
        else item.removeAttribute('aria-current');
      });
    }
    addEventListener('scroll', updateAboutNav, {passive: true});
    addEventListener('resize', updateAboutNav);
    addEventListener('hashchange', updateAboutNav);
    updateAboutNav();
    bindPhotoViewer(gallery);
  }

  function photoViewer(count) {
    return `<dialog class="campus-viewer" id="campus-viewer" aria-labelledby="campus-photo-title">
      <header><h2 id="campus-photo-title"></h2><form method="dialog"><button type="submit" aria-label="关闭图片">×</button></form></header>
      <img id="campus-photo" alt="">
      ${count > 1 ? '<div class="viewer-controls"><button type="button" id="photo-prev">上一张</button><output id="photo-position"></output><button type="button" id="photo-next">下一张</button></div>' : ''}
    </dialog>`;
  }

  function bindPhotoViewer(gallery) {
    const viewer = main.querySelector('#campus-viewer');
    const viewerPhoto = main.querySelector('#campus-photo');
    const position = main.querySelector('#photo-position');
    let photoIndex = 0;
    function showPhoto(index) {
      photoIndex = (index + gallery.length) % gallery.length;
      const photo = gallery[photoIndex];
      viewerPhoto.src = photo.src;
      viewerPhoto.alt = photo.label;
      main.querySelector('#campus-photo-title').textContent = photo.label;
      if (position) position.textContent = `${photoIndex + 1} / ${gallery.length}`;
    }
    for (const button of main.querySelectorAll('[data-photo]')) {
      button.addEventListener('click', () => {
        showPhoto(Number(button.dataset.photo));
        viewer.showModal();
      });
    }
    if (gallery.length < 2) return;
    main.querySelector('#photo-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
    main.querySelector('#photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
    viewer.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showPhoto(photoIndex + (event.key === 'ArrowLeft' ? -1 : 1));
      }
    });
  }

  function renderSection(key) {
    switch (key) {
      case 'about': return renderAbout();
      case 'news': return renderNews();
      case 'life': return renderLife();
      case 'projects': return renderProjects();
      case 'contact': return renderContact();
    }
  }

  function renderLife() {
    const activities = [
      {
        title: '日常生活',
        photo: 'activity-room-renewal',
        alt: '采光充足的集体活动室，摆放着桌椅和图书架',
        description: '秋叶孤儿院注重为孩子们营造安全、舒适的生活环境。工作人员根据不同年龄儿童的成长需要，合理安排日常起居、饮食与生活照护，帮助孩子们建立规律的生活习惯。'
      },
      {
        title: '学习与阅读',
        photo: 'summer-reading',
        alt: '孩子们围坐在阅读区，一起听故事',
        description: '院内设有阅读和学习空间，配备适合不同年龄段儿童的图书及学习用品。工作人员在日常生活中鼓励孩子们养成阅读习惯，并为有需要的儿童提供学习辅导。'
      },
      {
        title: '兴趣与创作',
        photo: 'volunteer-weekend',
        alt: '孩子们围坐在桌旁制作手工',
        description: '绘画、手工和音乐是孩子们喜爱的日常活动。院内定期组织兴趣活动，鼓励儿童自由表达自己的想法，在探索和创作中培养兴趣、增强自信。'
      },
      {
        title: '户外时光',
        photo: 'autumn-outdoors',
        alt: '孩子们在院内追逐纸飞机',
        description: '在天气适宜的情况下，院内组织儿童参加体育锻炼、集体游戏及户外活动，让孩子们在运动和交流中收获快乐，培养合作意识。'
      }
    ];
    main.innerHTML = heading(sections.life.title, [], '珍藏日常时光，感受生活温度') + `<div class="site-wrap content-area life-grid">
      ${activities.map(({title, photo, alt, description}, index) => `<article class="life-card">
        <img src="assets/orphanage-news-${photo}.webp" alt="${alt}" width="640" height="360" loading="eager" decoding="async">
        <div class="life-card-copy">
          <h2><span aria-hidden="true">0${index + 1}｜</span>${title}</h2>
          <p>${description}</p>
        </div>
      </article>`).join('')}
    </div>`;
  }

  function renderProjects() {
    const projects = [
      {
        title: '爱心助学计划',
        photo: 'orphanage-project-education.webp',
        alt: '工作人员整理图书、练习本和文具',
        width: 768,
        height: 432,
        description: '关注儿童学习与教育需求，通过图书捐赠、学习用品支持及课业辅导等方式，帮助孩子们改善学习条件，培养良好的学习习惯。'
      },
      {
        title: '成长陪伴计划',
        photo: 'orphanage-news-volunteer-weekend.webp',
        alt: '志愿者陪孩子们一起做手工',
        width: 640,
        height: 360,
        description: '邀请志愿者参与阅读分享、绘画手工及兴趣交流等活动，为孩子们提供更多与外界交流的机会，鼓励他们探索兴趣、表达想法，增强自信。'
      },
      {
        title: '暖心生活关怀',
        photo: 'orphanage-project-care.webp',
        alt: '工作人员将换季衣物和生活用品整理装箱',
        width: 768,
        height: 432,
        description: '通过社会捐赠及公益合作，为院内儿童提供生活物资、季节性用品和必要的设施支持，持续改善日常生活环境，保障基本生活需求。'
      }
    ];
    main.innerHTML = heading(sections.projects.title, [], '汇聚社会爱心，支持儿童成长') + `<div class="site-wrap content-area projects-page">
      <p class="projects-intro">秋叶孤儿院积极联合社会爱心企业、公益组织及志愿者，为院内儿童提供教育、生活及成长方面的支持。我们重视每一份善意，也希望通过持续、务实的公益行动，为孩子们创造更加稳定、温暖的成长环境。</p>
      ${projects.map(({title, photo, alt, width, height, description}, index) => `<article class="project-row">
        <img src="assets/${photo}" alt="${alt}" width="${width}" height="${height}" loading="eager" decoding="async">
        <div class="project-copy">
          <h2><span aria-hidden="true">0${index + 1}｜</span>${title}</h2>
          <p>${description}</p>
        </div>
      </article>`).join('')}
      <p class="projects-thanks">感谢社会各界长期以来对秋叶孤儿院的关心与支持。</p>
    </div>`;
  }

  function renderContact() {
    main.innerHTML = heading(sections.contact.title, [], '倾听您的声音，期待携手同行') + `<div class="site-wrap content-area">
      <dl class="contact-details">
        <div><dt>机构名称</dt><dd>秋叶孤儿院</dd></div>
        <div><dt>机构地址</dt><dd>${sections.contact.intro}</dd></div>
        <div><dt>联系人</dt><dd>王建华（院长）</dd></div>
        <div><dt>办公电话</dt><dd>010-0000-2008</dd></div>
        <div><dt>手机号码</dt><dd><strong>${directorMobile}</strong></dd></div>
        <div><dt>办公时间</dt><dd>周一至周五 09:00—17:00</dd></div>
      </dl>
    </div>`;
  }

  function renderNews() {
    main.innerHTML = heading('新闻动态', [], '记录院内点滴，分享最新动态') + `<section class="site-wrap content-area recent-news" aria-label="近期新闻">
      <aside class="news-footnote">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l8 4V6l-8 4H4Zm4 4 2 5h2l-2-4M19 9l2-2m-2 8 2 2m-2-5h3"/></svg>
        <p>本栏目仅展示近期新闻。查找往年新闻及历史报道，请使用网站顶部搜索功能。</p>
      </aside>
      ${renderNewsList(recentNews)}
    </section>`;
  }

  function renderNewsList(items, titleTag = 'h2') {
    return `<ul class="news-list">
        ${items.map(([id, date, title, views]) => `<li id="news-${id}">
          <img src="assets/orphanage-news-${id}.webp" alt="" width="640" height="360" loading="eager">
          <div>
            <${titleTag}>${title}</${titleTag}>
            <div class="news-meta">
              <time datetime="${date}">${date}</time>
              <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></svg>${views}次阅读</span>
            </div>
          </div>
        </li>`).join('')}
      </ul>`;
  }

  function renderArticle(article) {
    const {title, section} = article;
    const parent = sectionLink(section);
    const sectionTitle = sections[section].title;
    const fromQuery = params.get('fromQuery');
    main.innerHTML = heading(title, [[sectionTitle, parent]]) + `<article class="site-wrap content-area reading-area">
      ${renderArchiveContent(article)}
      <nav class="article-return" aria-label="文章返回导航">
        <a href="${parent}">返回${sectionTitle}</a>
        ${fromQuery ? `<a href="${link({q: fromQuery})}">返回搜索结果</a>` : ''}
      </nav>
    </article>` + photoViewer(article.photos.length);
    bindPhotoViewer(article.photos);
  }

  function renderArchiveContent(article) {
    const {work, photos: articlePhotos, paragraphs} = article;
    const renderPhoto = photo => `<figure>
      <button type="button" class="archive-image-button" data-photo="${articlePhotos.indexOf(photo)}" aria-label="放大查看${photo.label}"><img src="${photo.src}" alt="" width="1448" height="1086" loading="eager"></button>
      <figcaption>${photo.label}</figcaption>
    </figure>`;
    const body = paragraphs.map((paragraph, index) => {
      const text = escapeHTML(paragraph);
      const marker = index === article.friendshipParagraph ? ' id="wang-friendship"' : '';
      const copy = article.emphasizedParagraphs?.includes(index) ? `<strong>${text}</strong>` : text;
      const markup = `<p${marker}>${copy}</p>`;
      const photos = articlePhotos.filter(photo => photo.afterParagraph === index + 1);
      if (!photos.length) return markup;
      const layout = photos.length === 1 ? 'archive-photos archive-photos-single' : 'archive-photos';
      return markup + `<div class="${layout}">${photos.map(renderPhoto).join('')}</div>`;
    }).join('');
    const displayDate = date => {
      const [year, month, day] = date.split('-').map(Number);
      return `${year}年${month}月${day}日`;
    };
    const metadata = `<div class="archive-meta">
      <span>发布日期：<time datetime="${article.publishedDate}">${displayDate(article.publishedDate)}</time></span>
      <span>来源：${article.source}</span>
    </div>`;
    if (!work) return metadata + body;

    return `${metadata}
    ${body}
    <section class="archive-observation" aria-labelledby="observation-title">
      <h2 id="observation-title">典型作品选登</h2>
      <div class="observation-details">
          <dl>
            <div><dt>作品名称</dt><dd>${work.title}</dd></div>
            <div><dt>创作形式</dt><dd>${work.medium}</dd></div>
            <div><dt>观察主题</dt><dd>${work.theme}</dd></div>
            <div><dt>后续安排</dt><dd>${work.followUp}</dd></div>
            <div><dt>档案情况</dt><dd>${work.custody}</dd></div>
          </dl>
      </div>
    </section>
    <section id="related-report" class="archive-observation" aria-labelledby="related-report-title">
      <h2 id="related-report-title">相关报道</h2>
      <p><strong><a href="${escapeHTML(ending.withProgress(article.related.href))}">${article.related.title}</a></strong></p>
    </section>`;
  }

  function renderSearch() {
    const query = (params.get('q') || '').trim().slice(0, 80);
    document.querySelector('#site-query').value = query;
    const records = [
      ...Object.entries(articles).map(([key, article]) => ({
        title: article.title, summary: article.summary, searchKeywords: article.searchKeywords,
        href: link({article: key, fromQuery: query}), category: sections[article.section].title
      })),
      ...recentNews.map(([id, date, title]) => ({
        title, href: sectionLink('news') + '#news-' + id, summary: date, category: '新闻动态'
      })),
      ...Object.entries(sections).map(([key, section]) => ({
        ...section, href: sectionLink(key), summary: section.intro, text: section.keywords || '', category: '网站栏目'
      }))
    ];
    const terms = query.toLowerCase().split(/\s+/);
    const results = query ? records.filter(item => {
      if (item.searchKeywords) return item.searchKeywords.includes(query);
      const text = [item.title, item.summary, item.text, item.category].join(' ').toLowerCase();
      return terms.every(term => text.includes(term));
    }) : [];
    if (query === '王建华') window.ADOPTION_ACHIEVEMENTS.record('wang-search');
    main.innerHTML = heading('站内搜索') + `<section class="site-wrap content-area">
      <h2>搜索结果</h2>
      <p>${query ? `“${escapeHTML(query)}”共找到 ${results.length} 项结果。` : '请在搜索框输入关键词。'}</p>
      ${results.length ? `<ul class="site-list">${results.map(item => `<li>
        <span class="result-category">${item.category}</span><a href="${item.href}">${item.title}</a><p>${item.summary}</p>
      </li>`).join('')}</ul>` : ''}
    </section>`;
  }

  const section = params.get('section');
  const articleKey = params.get('article');
  const page = params.get('page');
  let activeSection = '';
  let title = '首页';
  if (params.has('q')) {
    activeSection = '';
    title = '站内搜索';
    renderSearch();
  } else if (Object.hasOwn(articles, articleKey)) {
    const article = articles[articleKey];
    activeSection = article.section;
    title = article.title;
    renderArticle(article);
    if (articleKey === 'paper-plane') window.ADOPTION_ACHIEVEMENTS.record('paper-report');
    if (articleKey === 'wang-jianhua-profile' && params.get('fromQuery') === '王建华') {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.intersectionRatio >= 0.5)) return;
        observer.disconnect();
        window.ADOPTION_ACHIEVEMENTS.record('wang-friendship-read');
      }, {threshold: 0.5});
      observer.observe(document.getElementById('wang-friendship'));
    }
  } else if (Object.hasOwn(sections, section)) {
    activeSection = section;
    title = sections[section].title;
    renderSection(section);
  } else if (page === 'admin') {
    location.replace('orphanage-admin.html');
  } else if (page === 'privacy') {
    activeSection = '';
    title = '隐私说明';
    main.innerHTML = heading(title) + `<section class="site-wrap content-area reading-area">
      <p>本网站为《秋叶孤儿院调查录》游戏中的虚构机构网站。站内搜索仅用于查找游戏资料。院务登录页面为游戏内入口，请勿填写真实账号或密码。</p>
    </section>`;
  } else {
    activeSection = 'home';
    renderHome();
  }
  if (activeSection) document.querySelector(`[data-section="${activeSection}"]`).setAttribute('aria-current', 'page');
  if (title !== '首页') document.title = `${title} · 秋叶孤儿院`;
})();
