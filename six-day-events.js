/* 固定事件与随机事件配置。分值结算统一由六日存档系统处理。 */
(() => {
  'use strict';

  const fixed = [
    {
      id: 'eight-o-clock', day: 1, title: '明天八点见', dimension: 'contact',
      opening: ['老章，你明天到底什么时候来？', '给个数吧，本猫好跟灯灯抢电脑。'],
      options: [
        {text: '明天晚上八点。要是来不了，我会先给你留句话。', reply: '行！本猫的八点号给你留着！', points: 0, flags: ['day1_promise', 'fixed_promise']},
        {text: '八点怎么样？你要是还没抢到电脑，就留个消息，我看到了回你。', reply: '那就八点！抢不到我也会想办法留字条的。', points: 0, flags: ['day1_promise', 'fixed_promise']}
      ],
      followUp: 'D2-1'
    },
    {
      id: 'dragon-100', day: 2, title: '消失的三分', dimension: 'contact', tags: ['interest', 'art'],
      opening: ['我那条龙还差三分才满分呢。', '你是评委！今天必须把那三分给我找回来！'],
      options: [
        {text: '喷火加一分，尾巴加一分，敢把画拿给我看再加一分。满分！', reply: '哈哈哈哈好！我要把这个100分贴在龙脑门上！', points: 2, items: ['满分神龙']},
        {text: '咱们做张贴纸吧。写「不服来战」，底下再盖个100分的章。', reply: '成交！从今天起它就是满分神龙！', points: 2, items: ['满分神龙']}
      ],
      followUp: 'D6-1'
    },
    {
      id: 'shenyang', day: 3, title: '沈阳生活调查', dimension: 'home', tags: ['search'],
      opening: ['老章，网页上有人说沈阳冬天屋里也跟外面一样冷。', '还有人说穿一件衣服就够了。到底信谁啊？'],
      references: [
        {id: 'heating', title: '生活信息站｜冬季取暖', text: '屋里暖不暖和要看具体住房和取暖情况。可以请对方说说房间怎么取暖，冷的时候有什么办法。'},
        {id: 'daily', title: '居民留言板｜住过去以后', text: '房间、上学路线和联系安排都可以先问清楚。有人住得习惯，也有人需要慢慢适应。'},
        {id: 'rumor', title: '论坛帖子｜北方到底冷不冷', text: '楼主只写了「我家一点儿也不冷」，没有交代住在哪里，也没有提取暖条件。'}
      ],
      options: [
        {text: '那个帖子只说了他自己家。咱们问燕子姐，你的屋子怎么取暖。', reply: '对哦，又不是大家住同一个屋。我把这个问题抄下来。', points: 0, flags: ['shenyang_researched'], items: ['沈阳生活小册']},
        {text: '把取暖、上学路线和有事找谁都写下来，一个一个问。', reply: '行！本猫的沈阳小册第一页有东西写了！', points: 0, flags: ['shenyang_researched'], items: ['沈阳生活小册']}
      ],
      followUp: 'D6-1'
    },
    {
      id: 'director-note', day: 4, makeUp: true, title: '给王院长的小纸条', dimension: 'home',
      opening: ['我纸都拿出来了，一个字也没写。', '要不你先帮我挑个敢问的？'],
      options: [
        {text: '先写「我能不能多见阿姨几次，再决定？」这句。', reply: '这句我敢写。下面我再问，有事能不能给院长打电话。', points: 3, flags: ['questions_prepared']},
        {text: '先问「要是我还不想走，可以等一等吗？」剩下的咱们慢慢写。', reply: '……好。我就把这句写在第一行，折起来交给他。', points: 3, flags: ['questions_prepared']}
      ],
      followUp: 'director-answer'
    },
    {
      id: 'contact-card', day: 5, makeUp: true, title: '我们的联络计划', dimension: 'contact',
      opening: ['要是我真去沈阳，那里电脑要是坏了怎么办？', '我总不能对着窗户喊老章吧。'],
      options: [
        {text: '把 PP 和邮箱都抄下来。一个上不了就用另一个，有事给我留信。', reply: '好！我做两张联络卡，一张塞书包，一张夹画册。', points: 3, flags: ['contact_plan_prepared'], items: ['联络卡']},
        {text: '咱们先用 PP。要是有几天不方便上网，就等能用电脑时给对方写邮件。', reply: '懂了，晚几天回也算数。老章的邮箱我可得写大一点！', points: 3, flags: ['contact_plan_prepared'], items: ['联络卡']}
      ],
      followUp: 'D6-1'
    },
    {
      id: 'talk-to-yanzi', day: 6, title: '我想再和阿姨谈谈', dimension: 'home',
      opening: ['我想再跟阿姨说两句，可我一紧张就只会说「都行」。', '老章，你帮我想个开头呗？'],
      options: [
        {text: '就说「阿姨，我还有点担心，能不能先问你几件事？」院长也可以陪你。', reply: '嗯，我先说这句。卡住了我就看看手上的纸。', points: 3, flags: ['yanzi_conversation_ready']},
        {text: '你可以告诉她你想多见几次，也可以请院长帮你把没说完的话说完。', reply: '我先自己试试。实在说不出来，再请院长帮我。', points: 3, flags: ['yanzi_conversation_ready']}
      ]
    }
  ];

  const random = [
    {
      id: 'nudge', title: '窗口抖动攻击', days: [1,2,3], tags: ['chat', 'read'], dimension: 'contact',
      opening: ['叮！本猫向你发送了窗口抖动。', '怎么半天不吭声！你窗口里是不是住了个蜗牛？'],
      options: [
        {text: '收到！本王反手抖一下，蜗牛都被震醒了。', reply: '哈哈哈哈！那咱俩的电脑算不算在蹦迪？', points: 2},
        {text: '我刚在看资料，没注意到。现在看见你啦。', reply: '好吧。下次本猫只抖一下，省点力气。', points: 1},
        {text: '你能不能别老抖，烦死了。', reply: '……哦。那我关掉。', points: -1}
      ]
    },
    {
      id: 'nannan-pc', title: '囡囡抢电脑', days: [1,2,3,4], tags: ['chat'], dimension: 'contact',
      opening: ['（囡囡用小雷的号）我是王院长。现在宣布，老章负责给我们买冰棍。', '老章快回！她快把我挤下椅子了！'],
      options: [
        {text: '报告院长，先请当事人归还椅子，冰棍预算才能批。', reply: '哈哈哈她真的松手了！谢谢本院特派员！', points: 2},
        {text: '院长怎么知道我叫老章？这位囡囡同志，请出示证件。', reply: '她跑了！还喊说下次要换个网名骗你！', points: 2},
        {text: '你们先玩，我把窗口关了。', reply: '行，我抢回来再喊你。', points: 0}
      ]
    },
    {
      id: 'dengdeng-tip', title: '灯灯的绝密情报', days: [2,3,4,5], tags: ['interest', 'art'], dimension: 'contact',
      opening: ['灯灯说我画的龙像会喷火的蚯蚓。', '你说！他是不是不懂神龙的曲线美！'],
      options: [
        {text: '蚯蚓哪有那么威风？让他先画一个比你喷火喷得远的。', reply: '对！他的火苗还没我画的龙须长呢！', points: 2},
        {text: '办场画画比赛吧，题目就叫「谁先画出会喷火的东西」。', reply: '哈哈哈哈我要邀请灯灯！你继续当评委。', points: 2, flags: ['drawing_game_unlocked']},
        {text: '我也觉得像蚯蚓。', reply: '……下次不给你看了。', points: -1}
      ]
    },
    {
      id: 'avatar-contest', title: 'PP头像大赛', days: [1,2,3,4], tags: ['space'], dimension: 'contact',
      opening: ['本猫决定换头像！候选人有流泪的猫、戴墨镜的猫、还有头上冒火的猫。', '请评委慎重投票！'],
      options: [
        {text: '投戴墨镜的。比较像你刚画完一张好画，假装自己一点也不得意。', reply: '你才假装！……行，这张也送你一份。', points: 2, items: ['墨镜猫头像']},
        {text: '选第三个吧，我按顺序蒙的。', reply: '好吧，我再去问灯灯。他肯定也蒙。', points: 0}
      ]
    },
    {
      id: 'cat-code', title: '神秘猫语翻译器', days: [2,3,4,5], tags: ['chat'], dimension: 'contact',
      opening: ['喵、喵喵、喵！！！', '提示：第一声是「老」，第二串是「章」，最后是三个感叹号。猜！'],
      options: [
        {text: '翻译完毕：老章！！！', reply: '答对了！送你一套本猫亲制猫语表情！', points: 3, items: ['猫猫表情']},
        {text: '我猜是「全世界的火腿肠都是本猫的」。', reply: '胡说！不过你说的也不是没道理。', points: 1}
      ]
    },
    {
      id: 'unfinished-drawing', title: '一张没画完的画', days: [3,4,5,6], tags: ['art'], dimension: 'home',
      opening: ['画到一半卡住了。右边好大一块白的。', '我在想要不要画一只小小的猫，还是干脆空着？'],
      options: [
        {text: '画只趴着的猫吧，留点白给它晒太阳。', reply: '好！那我画条尾巴露在外面。画完这张归你。', points: 2, items: ['晒太阳的猫']},
        {text: '先画完吧，空着也行。', reply: '那就先空着，等我想到再补。你先收一张现在的。', points: 0, items: ['晒太阳的猫']}
      ]
    },
    {
      id: 'offline-again', title: '网络突然卡住', days: [1,2,3,4,5], tags: ['chat', 'search'], dimension: 'contact',
      opening: ['……刚才怎么一下什么都没有了？', '我以为你又下了。你现在能看到我打字吗？'],
      options: [
        {text: '看得见，刚才是网络卡了。下次断了，我回来会给你留一句。', reply: '好。我刚才把这句话打了三次，现在终于发出去了。', points: 2},
        {text: '网线去散步了。说真的，我还在，刚才我这边也断了。', reply: '网线还能散步啊……嗯，你在就好。', points: 1},
        {text: '卡一下有什么好担心的？', reply: '……没什么，我就确认一下。', points: -1}
      ]
    },
    {
      id: 'sausage-debt', title: '超级火腿肠危机', days: [2,3,4,5], tags: ['chat', 'interest'], dimension: 'contact',
      opening: ['囡囡说我欠她一根火腿肠。', '我昨天明明只咬了一口！老章你来评评理！'],
      options: [
        {text: '给她写个欠条，先签「本猫」，以后攒够两口再还一根。', reply: '哈哈哈哈她说只认整根！不过我的欠条已经写好了。', points: 2},
        {text: '制定分期还款计划：今天还半根，明天还半根，全程不许偷咬。', reply: '太难了！我得把计划贴电脑旁边时刻警醒！', points: 2, items: ['火腿肠还款计划']}
      ]
    },
    {
      id: 'cat-rest', title: '本猫今日不营业', days: [3,4,5], tags: ['chat', 'read'], minChats: 1, dimension: 'contact',
      opening: ['老章，我今天有点不想说话。', '本猫挂牌歇业一天……可以吧？'],
      options: [
        {text: '可以。你歇着，我给你留句晚安，明天再说。', reply: '嗯。那这句晚安我先收着。', points: 0, followUp: 'rest-next-day'},
        {text: '你怎么了？我想听你讲讲。', reply: '现在还是不太想讲，等我想好了告诉你。', points: 0},
        {text: '你怎么又这样？', reply: '……我先下了。', points: -1}
      ]
    },
    {
      id: 'new-home-photo', title: '阿姨寄来的照片', days: [3,4,5,6], tags: ['search', 'chat'], flags: ['shenyang_researched'], dimension: 'home',
      opening: ['燕子姐寄了张照片给我。画桌旁边有一扇窗！', '我想问冬天那儿冷不冷，又怕她觉得我挑三拣四。'],
      options: [
        {text: '你可以直接问「我冬天坐窗边画画会不会冷？」她比咱俩更知道。', reply: '好。我就问窗边，不把整栋楼都问一遍！', points: 3, items: ['新家照片']},
        {text: '光线真不错，白天画画不用老开灯了。', reply: '我也这么觉得！照片给你存一张。', points: 1, items: ['新家照片']}
      ]
    },
    {
      id: 'birthday-quiz', title: '小雷的生日考试', days: [2,3,4,5], tags: ['chat'], dimension: 'contact',
      opening: ['老章！突击考试！', '本猫的生日是哪天？不许翻相册！'],
      options: [
        {text: '六月二十八。答题完毕，请寿星亲自阅卷。', reply: '嘿嘿嘿！满分！这是本猫刚做的得意表情，归你了。', points: 2, items: ['小雷的得意表情']},
        {text: '六月二十九？我再争取一下补考资格。', reply: '差一天也不行！六月二十八！补考明天再说！', points: 0, items: ['小雷的得意表情']}
      ]
    },
    {
      id: 'dragon-guard', title: '神龙守护计划', days: [4,5,6], tags: ['art', 'chat', 'gift'], requires: ['dragon-100'], dimension: 'home',
      opening: ['我想给100分龙加个铠甲。', '带去沈阳的时候它就能保护我的画了。你帮我看看？'],
      options: [
        {text: '给翅膀留两个洞，护胸就画你最喜欢的那种鳞片。', reply: '好诶！这样它还飞得动。神龙守护者正式上岗！', points: 3, items: ['神龙守护者']},
        {text: '叫「画册守护甲」吧，盔甲上再写个100。', reply: '哈哈哈哈得写大一点，敌人远远就看见了！', points: 2, items: ['神龙守护者']}
      ]
    }
  ];

  window.ADOPTION_SIX_DAY_EVENTS = {fixed, random};
})();
