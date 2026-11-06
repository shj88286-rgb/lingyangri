/* 忧郁小猫猫的博客。正文、权限和留言按提供的设定录入。 */
(() => {
  'use strict';
  const panel = document.querySelector('#blog-panel');
  const escapeHTML = text => text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const visitorKey = 'adoption-day-blog-visits-v1';
  const paw = `<svg class="blog-paw" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
    <ellipse cx="7" cy="12" rx="3.4" ry="4.8" transform="rotate(-26 7 12)"/>
    <ellipse cx="13" cy="7" rx="3.4" ry="4.8" transform="rotate(-10 13 7)"/>
    <ellipse cx="21" cy="7" rx="3.4" ry="4.8" transform="rotate(12 21 7)"/>
    <ellipse cx="27" cy="13" rx="3.4" ry="4.8" transform="rotate(26 27 13)"/>
    <path d="M16 14c4 0 5 3 8 6 4 4 1 9-3 8-2 0-3-1-5-1s-3 1-5 1c-4 1-7-4-3-8 3-3 4-6 8-6z"/>
  </svg>`;
  const catSticker = `<svg class="blog-cat-sticker" width="96" height="96" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
    <path fill="#fafcff" d="M5 3h4v2h3v2h8V5h3V3h4v2h2v9h2v10h-2v3h-3v2h-5v2H11v-2H6v-2H3v-3H1V14h2V5h2z"/>
    <path fill="#26384c" d="M6 5h3v2h3v2h8V7h3V5h3v2h1v8h2v8h-2v3h-3v2h-5v1h-6v-1H8v-2H5v-3H3v-8h2V7h1z"/>
    <path fill="#fffef6" d="M7 7h2v2h3v2h8V9h3V7h2v9h2v7h-2v2h-3v2H10v-2H7v-2H5v-7h2z"/>
    <path fill="#384653" d="M7 7h2v2h3v2h2v4h-2v3H9v1H5v-3h2zm16 0h2v9h2v3h-3v-2h-3v-4h-2v-2h1V9h3z"/>
    <path fill="#f2a1b8" d="M7 9h2v3H7zm16 0h2v3h-2zM7 20h4v2H7zm14 0h4v2h-4zm-6 0h2v1h-2z"/>
    <path fill="#26384c" d="M10 16h2v3h-2zm10 0h2v3h-2zm-7 6h2v1h2v-1h2v2h-2v1h-2v-1h-2z"/>
    <path fill="#fff" d="M10 16h1v1h-1zm10 0h1v1h-1z"/>
    <path fill="#f5cd70" d="M3 26h1v2h2v1H4v2H3v-2H1v-1h2zM29 4h1v2h2v1h-2v2h-1V7h-2V6h2z"/>
  </svg>`;
  const mouseDoodle = `<svg class="blog-mouse-doodle" viewBox="0 0 70 53" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M38 16c-2-10 12-6 17-9 4-2 3-5 0-5" stroke="#407ca8" stroke-width="2"/>
    <path d="M32 13c11-2 18 6 19 17 2 13-3 20-15 21-13 1-20-5-20-16-1-11 5-20 16-22z" fill="#fff7d8" stroke="#407ca8" stroke-width="2"/>
    <path d="M17 30c8-3 20-5 33-4M32 14l3 13" stroke="#407ca8" stroke-width="2"/>
    <path d="M32 20l1 4" stroke="#d687a5" stroke-width="3"/>
    <path d="M6 17l4 3m-6 4 5 1m51 8 4-1m-5 6 5 1" stroke="#d29b45" stroke-width="2"/>
  </svg>`;
  const chengWing = `<svg viewBox="0 0 144 112" aria-hidden="true">
    <path d="M137 104C99 109 82 96 67 81 42 77 19 59 12 44c13 6 22 6 32 7C28 41 17 27 13 11c12 12 25 18 40 20C47 22 45 13 46 5c16 18 31 27 53 34 18 6 29 23 27 41-1 9 3 17 11 24Z"
      fill="#141414" stroke="#e1e1e1" stroke-width="2"/>
    <path d="M20 22c17 16 35 20 61 27-11-10-20-20-29-32 15 16 31 22 49 28 16 6 23 18 21 32-3-9-11-15-24-17-18-3-33 0-48-7-12-5-23-14-30-31Z" fill="#d7d7d7"/>
    <path d="M20 50c18 14 33 17 58 17-7 2-12 4-17 8-17-4-31-14-41-25Zm45 27c17-5 29-7 41 0-9 0-18 4-23 10-7-3-13-7-18-10Zm21 13c12-7 24-10 33-5 0 6 3 11 8 16-18 1-31-3-41-11Z" fill="#a1a1a1"/>
    <path d="M41 40c18 11 40 14 62 17m-59 4c15 6 25 5 37 3m17 19c9-3 16-3 23-2" fill="none" stroke="#666" stroke-width="1.3"/>
    <path d="M16 68v12m-6-6h12m12 7v8m-4-4h8" fill="none" stroke="#ededed"/>
  </svg>`;
  const friendWing = chengWing.replace('#e1e1e1', '#b5a5ff').replace('#d7d7d7', '#685089').replace('#a1a1a1', '#3e2956');
  const friendChain = `<svg viewBox="0 0 155 22" fill="none" stroke="#c8c6d8" stroke-width="1.6" aria-hidden="true">
    ${Array.from({length: 11}, (_, index) => `<rect x="${index * 13 + 2}" y="${index % 2 ? 7 : 5}" width="17" height="${index % 2 ? 7 : 11}" rx="4"/>`).join('')}
  </svg>`;
  const friendFire = `<svg viewBox="0 0 120 62" aria-hidden="true">
    <path d="M0 62c10-12 9-20 5-32 17 7 25 17 25 24 5-19 21-27 19-48 19 17 20 30 19 40 9-6 14-15 13-25 13 8 17 21 16 30 11-6 15-10 23-21-1 18-6 25-13 32z" fill="#6926b8"/>
    <path d="M20 62c9-9 12-16 9-25 13 10 17 14 19 23 2-13 9-21 14-32 6 16 7 23 4 34 11-5 15-14 18-22 5 9 3 17 0 22z" fill="#1c90ff"/>
  </svg>`;
  const friendButterfly = `<svg viewBox="0 0 32 26" aria-hidden="true">
    <path d="M16 14C11 2 2 0 3 8c0 4 3 6 7 8-5-1-8 1-6 4 2 5 8 2 12-2 4 4 10 7 12 2 2-3-1-5-6-4 4-2 7-4 7-8 1-8-8-6-13 6Z" fill="#9d63e8" stroke="#c8c3ff"/>
    <path d="M16 10v11m0-11-3-4m3 4 3-4" fill="none" stroke="#bce7ff"/>
  </svg>`;
  const openingComments = [
    ['17:41', '囡囡', '沙发！！！', 'nannan'],
    ['17:43', '忧郁小猫猫', '恭喜你获得本博客第一位访客称号！！！', 'avatar'],
    ['17:44', '囡囡', '有什么奖励吗', 'nannan'],
    ['17:45', '忧郁小猫猫', '奖励你给我留言十条', 'avatar'],
    ['17:46', '囡囡', '？？？？？', 'nannan'],
    ['18:02', '王院长', '谁让你把网站链接发出去的？', 'wang'],
    ['18:04', '忧郁小猫猫', '院长！！！这叫互联网宣传！！！', 'avatar']
  ];
  const friendComments = [
    ['19:42', '囡囡', '什么精神领域', 'nannan'],
    ['19:43', '忧郁小猫猫', '你点进去看看就知道了！！！', 'avatar'],
    ['19:45', '灯灯', '你是不是又交了什么奇怪的人', 'deng'],
    ['19:46', '忧郁小猫猫', '不要污蔑我的朋友！！！', 'avatar'],
    ['19:48', '城南旧章', '呵……原来吾已经被昭告天下了吗', 'cheng'],
    ['19:49', '忧郁小猫猫', '欢迎本人最新认证好友！！！', 'avatar'],
    ['19:50', '城南旧章', '为什么你的介绍里全是对我的诋毁= =', 'cheng'],
    ['19:51', '忧郁小猫猫', '哪有！！！我明明夸你有文化了！！！', 'avatar'],
    ['19:53', '城南旧章', '算了……真正的强者从不在意凡人的评价', 'cheng'],
    ['19:54', '囡囡', '哈哈哈哈哈哈哈哈哈哈', 'nannan'],
    ['19:55', '忧郁小猫猫', '你看吧！！！他又来了！！！', 'avatar'],
    ['19:56', '城南旧章', '= =||||||', 'cheng'],
    ['19:58', '城南旧章', '不过你今天这个空间弄得还挺好看的', 'cheng'],
    ['19:59', '忧郁小猫猫', '真的吗！！！！！', 'avatar'],
    ['20:00', '城南旧章', '嗯 比我想的厉害多了 尤其是那个会发光的标题', 'cheng'],
    ['20:01', '忧郁小猫猫', '哈哈哈哈哈哈本天才当然厉害！！！', 'avatar'],
    ['20:02', '城南旧章', '呵……看来吾的审美已经有了继承者', 'cheng'],
    ['20:03', '忧郁小猫猫', '那你以后也要来看我写的东西！！！', 'avatar'],
    ['20:04', '城南旧章', '行啊 你写了叫我就是了', 'cheng'],
    ['20:05', '忧郁小猫猫', '一言为定！！！', 'avatar']
  ];
  const chengFirstComments = [
    ['21:52', '城南旧章', 'PS：有没有人知道第37页最后一道题怎么写', 'cheng'],
    ['21:55', '城南旧章', '在线等 急', 'cheng']
  ];
  const chengSecondComments = [
    ['20:22', '忧郁小猫猫', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', 'avatar'],
    ['20:23', '忧郁小猫猫', '你写的什么东西啊！！！', 'avatar'],
    ['20:24', '城南旧章', '伱能不能不要破坏这篇日志の意境= =', 'cheng'],
    ['20:25', '忧郁小猫猫', '哈哈哈哈哈哈哈哈命运の债！！！', 'avatar'],
    ['20:26', '忧郁小猫猫', '所以礼物呢！！！', 'avatar'],
    ['20:27', '城南旧章', '…………', 'cheng'],
    ['20:28', '城南旧章', '莪の忍耐是有限度の', 'cheng'],
    ['20:29', '忧郁小猫猫', '哇哦 黑暗王者生气了！！！', 'avatar'],
    ['20:30', '城南旧章', '你给我出去！！！', 'cheng'],
    ['20:31', '忧郁小猫猫', '喵！！！', 'avatar'],
    ['20:32', '城南旧章', '= =||||||', 'cheng']
  ];

  const chengGuestbook = [
    ['2008-07-14', [
      ['19:08', '忧郁小猫猫', '踩踩！！！'],
      ['19:09', '忧郁小猫猫', '你的空间怎么黑漆漆的！！！'],
      ['19:11', '城南旧章', '这叫暗夜の美学'],
      ['19:12', '忧郁小猫猫', '哈哈哈什么玩意！！！'],
      ['19:14', '城南旧章', '……不懂欣赏就算了'],
      ['19:16', '忧郁小猫猫', '不过还挺帅的！！！'],
      ['19:18', '城南旧章', '呵……总算有点眼光'],
      ['19:19', '忧郁小猫猫', '就是像一只好大的乌鸦！！！'],
      ['19:20', '城南旧章', '？？？？？？']
    ]],
    ['2008-07-18', [
      ['20:11', '忧郁小猫猫', '我来啦！！！'],
      ['20:12', '忧郁小猫猫', '大家快去看我新写的博客！！！'],
      ['20:14', '城南旧章', '你居然还跑我这里打广告？？？'],
      ['20:18', '忧郁小猫猫', '哈哈哈哈哈哈哈哈']
    ]],
    ['2008-07-19', [
      ['19:32', '染指丶寂寞', '踩踩踩~~~空间不错哦 留个脚印 记得回访^_^'],
      ['19:36', '城南旧章', '多谢……有空必回'],
      ['19:41', '染指丶寂寞', '签名好伤感啊 你失恋了？'],
      ['19:43', '城南旧章', '没有……这是莪对世界の感悟'],
      ['19:45', '染指丶寂寞', '哦哦 那祝你早日找到幸福哈'],
      ['19:47', '城南旧章', '……']
    ]],
    ['2008-07-24', [
      ['21:02', '末日の晴天', '╭ァ 夜深了 还在网络里游荡の灵魂 晚安……'],
      ['21:06', '城南旧章', '晚安……愿黑夜赐予伱永恒の宁静'],
      ['21:09', '末日の晴天', '呵呵 有缘再见'],
      ['21:12', '忧郁小猫猫', '哈哈哈哈哈哈哈哈哈'],
      ['21:13', '忧郁小猫猫', '你们俩是在对暗号吗！！！'],
      ['21:15', '城南旧章', '？？？你怎么哪都有'],
      ['21:16', '忧郁小猫猫', '吾乃黑夜中最闪亮の猫！！！'],
      ['21:18', '城南旧章', '别学我说话= =']
    ]],
    ['2008-07-28', [
      ['20:05', '忧郁小猫猫', '本猫今日巡逻完毕！！！'],
      ['20:07', '城南旧章', '怎么又是你'],
      ['20:08', '忧郁小猫猫', '你应该说欢迎光临！！！'],
      ['20:10', '城南旧章', '欢迎光临 请问什么时候走'],
      ['20:11', '忧郁小猫猫', '哈哈哈哈哈哈哈哈'],
      ['20:12', '忧郁小猫猫', '不走了！！！'],
      ['20:14', '城南旧章', '我靠']
    ]],
    ['2008-08-09', [
      ['19:26', '忧郁小猫猫', '喂喂喂！！！'],
      ['19:27', '忧郁小猫猫', '你空间那个音乐能不能换一首啊！！！'],
      ['19:29', '城南旧章', '怎么了 这首多有意境'],
      ['19:30', '忧郁小猫猫', '每次进来都吓我一跳！！！'],
      ['19:31', '城南旧章', '这是灵魂の呐喊……'],
      ['19:32', '忧郁小猫猫', '灵魂能不能小声一点！！！'],
      ['19:34', '城南旧章', '你把音量关了不就行了= =']
    ]],
    ['2008-08-12', [
      ['20:14', '残月ゞ微凉', '路过踩踩 留下脚印 记得回踩哦~~'],
      ['20:19', '城南旧章', '呵……感谢伱留下の痕迹'],
      ['20:22', '残月ゞ微凉', '你这个空间背景好帅啊！！！哪里找的'],
      ['20:25', '城南旧章', '网上找の……独一无二'],
      ['20:27', '残月ゞ微凉', '发我一个呗'],
      ['20:29', '城南旧章', '……等下PP发你']
    ]],
    ['2008-08-17', [
      ['19:43', '忧郁小猫猫', '本猫闪亮登场！！！'],
      ['19:44', '忧郁小猫猫', '踩踩踩踩踩踩踩！！！'],
      ['19:46', '城南旧章', '你再踩我空间都要被你踩塌了= ='],
      ['19:47', '忧郁小猫猫', '哈哈哈哈哈哈那我明天再来踩！！！'],
      ['19:49', '城南旧章', '行 明天见']
    ]],
    ['2008-08-18', [
      ['19:36', '忧郁小猫猫', '本猫来巡逻啦！！！'],
      ['19:38', '忧郁小猫猫', '喂喂喂 今天怎么不说话'],
      ['19:40', '忧郁小猫猫', '说好的明天见呢！！！'],
      ['19:42', '忧郁小猫猫', '那我明天再来！！！']
    ]],
    ['2008-08-20', [
      ['19:23', '忧郁小猫猫', '踩踩踩！！！'],
      ['19:25', '忧郁小猫猫', '怎么又不在'],
      ['19:27', '忧郁小猫猫', '你不会还在写暑假作业吧哈哈哈哈'],
      ['19:29', '忧郁小猫猫', '写完记得来我空间！！！']
    ]],
    ['2008-08-23', [
      ['20:06', '忧郁小猫猫', '我又来啦！！！'],
      ['20:08', '忧郁小猫猫', '今天有好多事情想跟你说'],
      ['20:11', '忧郁小猫猫', '算了 等你回来再说吧']
    ]],
    ['2008-08-25', [
      ['18:12', '忧郁小猫猫', '踩踩'],
      ['18:13', '忧郁小猫猫', '你这个空间的歌怎么还没换啊'],
      ['18:15', '忧郁小猫猫', '算啦 今天不跟你吵了'],
      ['18:17', '忧郁小猫猫', '你回来记得告诉我一声哦']
    ]]
  ];
  const guestbookAvatars = {
    '忧郁小猫猫': 'avatar',
    '城南旧章': 'cheng',
    '染指丶寂寞': 'guest-ranzhi',
    '末日の晴天': 'guest-qingtian',
    '残月ゞ微凉': 'guest-canyue'
  };

  function renderCommentList(date, entries, avatars = {}) {
    return `<ol>${entries.map(([time, author, text, avatar = avatars[author], commentDate = date]) => `
      <li>
        ${avatar ? `<img src="assets/${avatar}.webp" width="29" height="29" alt="" loading="lazy" decoding="async">`
          : `<span class="blog-guest-avatar" aria-hidden="true">${escapeHTML(author[0])}</span>`}
        <div><header><strong>${escapeHTML(author)}</strong><time datetime="${commentDate}T${time}">${commentDate} ${time}</time></header><p>${escapeHTML(text)}</p></div>
      </li>
    `).join('')}</ol>`;
  }

  function renderComments(id, date, entries) {
    return `<section class="blog-comments" aria-labelledby="${id}">
      <h3 id="${id}">✎ 评论区 <span>${entries.length} 条留言</span></h3>
      ${renderCommentList(date, entries)}
    </section>`;
  }
  const formerHome = `今天收拾柜子的时候翻到了以前的照片。

我都快忘记还有这张照片了。
照片上是我以前住过的那个家。房子很大，有两层楼，院子里还有一棵树。那里的冬天特别冷，雪也很大，下起来能把路都盖住。
我以前的房间在二楼，窗户特别大，白天都不用开灯。
刚搬进去的时候我真的特别高兴，因为从来没有人给过我那么大的房间。
我还记得第一天去的时候，雷力带着我把房子转了一圈，问我喜不喜欢。
我说喜欢。怎么会不喜欢呢，这可是我梦寐以求的一个家。
他告诉我，说以后这里就是我的家了。

那时候他还给我买了一辆红色的小汽车。特别特别好看，我每天睡觉都要放在枕头边上，早上起来第一件事就是看看它还在不在。
我还跟院长说过，以后我也有爸爸啦。

刚开始的时候，我每天都去上学。
雷力有时候开车送我，同学们还说我爸爸的车很帅。我当时可得意了！！！
后来他不让我去学校了。
他说我不用天天跟那么多人挤在一起，在家里也能学东西。
我一开始还挺高兴的，因为不用早起，也不用写作业，多好啊。
可是每天都待在家里，真的很无聊。
我问他什么时候再去上学，他就说我怎么这么不知足，别人家的小孩想不用上学还没有机会呢。
我觉得他说得也对。
所以后来就不问了。

我以前不喜欢烟味。
雷力很喜欢抽烟，有时候屋子里烟特别大，我就偷偷把窗户开一条缝。
他看到以后会说我浪费暖气。
好吧，怕他不高兴，所以我就不开了。
其实烟味闻久了也就习惯了，就是嗓子还会不舒服。

有时候他回来以后心情很好，会让我过去坐在他旁边。
他总说一家人就应该亲近一点。
可是我不太想让他碰我。
他就问我是不是不喜欢他。
我说没有。
他问那为什么要躲。
我也不知道该怎么回答。
他平时工作那么辛苦，还给我买过那么多东西，我不应该总让他不高兴的。
后来我就尽量听话了。
房间里的东西，我都摆得整整齐齐，玩小汽车也不弄出声音。
我想，这样他应该就会高兴点了吧？

有一次我把房间打扫得特别干净，连床底下都擦了。
我本来想等他回来给他看看。
可是他那天回来以后没怎么说话，表情好凶，我就没敢提。
是我哪里做得还不够好，又让他生气了吗？我真的不知道还能怎么办了。
可是他还是会抱我，亲我，跟我说他很爱我。
爸爸，我真的不知道怎么办了。

回秋叶孤儿院的时候，我把那辆小汽车也带回来了。
其他东西都没带多少，好多也都丢了。就它一直放在我包里。
有一个轮子坏了，王院长帮我修过，现在还能跑，就是总往左边歪。
我都这么大了，其实也不怎么玩小汽车了。
但我还是不想送给别人。

今天找到的照片是在那个家门口拍的。
我记得拍照的时候天气很好，雷力还让我站直一点。
我那天以为我们会一起出去玩。
照片上的我穿着新衣服，看上去还挺高兴的。

王院长以前问过我，要不要把这些东西扔掉。
我说不用。
其实我也不知道为什么还留着。

我现在在秋叶过得挺好的，灯灯和囡囡每天都很吵，就是王院长还老催我写作业。
但是有时候还是会想起以前那个房间。
我那时候真的以为自己以后就住在那里了。

算了。
照片还是先放起来吧。
毕竟上面也有我呀。`;
  const ifDiary = `今天城南旧章给我的龙打了97分！！！
剩下3分他说等我以后真纹了再给
哼哼 本天才以后肯定能画出100分的龙！！！

最近有个阿姨说想领养我
她叫燕子姐 人还挺好的 说话也好玩
她住在沈阳
我以前也去过那边 不过已经好久了

其实我想过好多种如果
如果我真的去了 是不是就有自己的房间了？
如果我画画画到半夜 她会不会骂我？
如果我不小心做错事情 她会不会特别生气？
如果她后来不喜欢我了 是不是又要把我送回来？

还有啊
如果我去了新家 还能不能每天上PP呢
城南旧章要是找不到我怎么办
他还欠我生日礼物呢！！！不能让他赖账！！！

我其实挺想去的
但是上一次我也以为自己可以一直住在那里的
算啦 不想了
反正燕子姐说可以再考虑考虑
那就再考虑几天吧！！`;
  const ifUnlockKey = 'adoption-day-blog-if-v1';
  const wantedDiary = `重大通知！！！
本猫有一个朋友失踪了！！！
就是那个城南旧章
之前还专门写过一篇介绍他的日志呢
此人平时最喜欢说一些奇奇怪怪的话
什么命运的齿轮啊 王者之魂啊
一天到晚呵呵呵呵
结果现在突然不说话了！！！
是不是因为装高手装得太累了！！！

我已经好久没见他上线了
PP头像一直都是灰色的
我给他发消息也不回
一开始还以为他电脑坏了
后来想想也有可能是开学了
毕竟他比我大三岁嘛
说不定作业特别多
哈哈哈哈哈哈哈哈
活该！！！谁让你比本猫大！！！

不过他之前明明说过第二天见的
结果第二天也没来
第三天也没有
到今天还是没有

我最近还画了新的东西
本来想给他打分的
不是
是让他给我打分！！！
上次那条龙他才给了97分
还有3分没给呢
本天才可是记着的！！！

还有那个翅膀
我现在已经会弄更好看的了
你上次不是还夸我空间弄得好吗
现在这个肯定比之前更帅
不过你不来就看不到了！！！

算了算了
反正我也不是很想跟你聊天！！！
我最近忙着画画呢
还有好多别的事情要做
才没空一直等着你

如果你什么时候回来了
记得来给本猫留言
不许装作没看见！！！

还有
你是不是忘了什么事啊

算了
等你回来了再说吧`;
  const wantedComments = [
    ['21:45', '灯灯', '他还没上线啊', 'deng'],
    ['21:46', '忧郁小猫猫', '没有！！！这人真不靠谱！！！', 'avatar'],
    ['21:48', '灯灯', '可能家里有事吧 你别老想了', 'deng'],
    ['21:49', '忧郁小猫猫', '谁老想了！！！我就是发个通缉令！！！', 'avatar'],
    ['21:52', '囡囡', '通缉令有奖金吗', 'nannan'],
    ['21:53', '忧郁小猫猫', '没有！！！', 'avatar'],
    ['21:54', '囡囡', '那我不找了', 'nannan'],
    ['21:55', '忧郁小猫猫', '你这是什么态度！！！！！', 'avatar'],
    ['22:03', '灯灯', '你早点睡吧 明天还要起床呢', 'deng'],
    ['22:05', '忧郁小猫猫', '知道啦！！！', 'avatar'],
    ['00:12', '忧郁小猫猫', '顶一下！！！免得他回来找不到！！！', 'avatar', '2008-08-29'],
    ['22:17', '忧郁小猫猫', '再顶一下', 'avatar', '2008-08-30'],
    ['20:36', '忧郁小猫猫', '还没回来啊', 'avatar', '2008-09-02']
  ];
  const studioDiary = `重大重大重大消息！！！
本猫赚钱了！！！！！
整整五十块钱！！！！！
五十块啊！！！
哈哈哈哈哈哈哈哈哈哈哈哈
从今天起请大家尊称我为雷大画家！！！
谢谢大家！！！
掌声在哪里！！！

上个月我给一本画画的杂志投了稿
其实本来没想着能选上的
因为我看人家杂志上那些画都挺厉害的
结果前几天收到邮件
说我的画被选上了！！！
还要给我五十块稿费！！！
今天王院长把钱给我了
是真的五十块！！！

王院长说可以帮我存起来
等以后想买什么再拿
我说我又不是小孩子了
这么点钱还会弄丢吗！！！
他说那你自己收好
然后又让我帮忙把电脑里的东西整理一下
说以后找起来方便
我问他电脑密码是不是还没换
他说没换 还是老一套
院名的拼音首字母后面接建院年份
说自己岁数大了 记不住太复杂的
我说这也太容易猜了吧！！！
他说那你可别往外说

其实我已经想好要买什么了
想买一盒新的彩笔
还想买那种特别好看的信纸
上面有小猫的！！！

本来还想给一个人买生日礼物的
虽然离他过生日还有好几个月
但是本猫现在已经会赚钱了！！！
到时候肯定能给你买个特别厉害的礼物
让你见识一下什么叫真正的王者之魂！！！

可是我现在连送到哪里都不知道

其实我们认识这么久
我连你叫什么名字都不知道
只知道你叫城南旧章
你也没告诉过我你住在哪里
以前总觉得这些事情以后再问也行
反正每天都能聊天
有什么想知道的直接问你就是了
可是现在想问也问不到了

你这个人也真是的！！！
以前话那么多
现在怎么一句都不说了！！！

其实我已经不怎么给你发消息了
因为发了你也不回
而且以前那些消息还在那里
每次打开都能看见
有时候我还会想
是不是我哪句话说得不好
或者你觉得我太烦了

可是你以前明明说我挺有意思的
还说喜欢看我画画

我又没有逼你天天来找我

要是以后不想聊天了
你告诉我一声也行啊

算了算了
不说你了！！！

对了
最近我还是经常去二楼画画
就是以前那个辅导老师那里
她那儿有好多特别好的彩笔
而且每次都让我自己挑颜色
有时候我不想说话
她也不会一直问

上次我还跟她说了一点以前的事情
说到一半就不想讲了
她说没关系
以后想讲的时候再讲

我问她下次还能不能来画画
她说当然可以

然后我今天又去了！！！

老师还问我那张被杂志选中的画是怎么想出来的
我说没什么特别的
就是想画一栋房子
里面有桌子 有窗户
还有一只趴在窗台上的猫

她问我为什么叫《家》
我说房子不就是家嘛

她说也不一定

我就问她那什么才算家

她想了一下
说以后可以慢慢告诉我

真奇怪
大人怎么也有这么多不知道的事情！！！

其实我还想过把那张画送给你
毕竟你以前老说要给本天才打分
这次我都被杂志选上了
你总不能还只给我九十七分吧！！！

不过现在画已经寄出去了
等杂志出来以后
我可以把那一页剪下来送给你

就是不知道应该寄到哪里

要是你现在还在的话就好了

五十块钱我还没有花
我把它装在一个信封里
放进自己的小盒子了

反正明年一月份还早呢
我可以再想想送你什么

要是你回来了
我就问你叫什么名字
住在哪里
还有你到底喜欢什么东西

这样以后就不会找不到你了

不过你要是一直不回来
我就真的不知道该怎么办了

算啦
今天先写到这里吧

明天还要去画画呢
老师说可以给那栋房子再添几个人
我还没想好要画谁

等想好了再说

城南旧章
你到底什么时候回来啊`;
  const studioClue = '院名的拼音首字母后面接建院年份';
  const studioUnlockKey = 'adoption-day-blog-studio-v1';
  const studioHash = '#blog-studio-post';
  const studioSketch = `<svg viewBox="0 0 185 130" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M13 45q4-20 23-14 11-16 25-6 13 0 14 11l-4 9M127 18l13-6m-8 20 15 1m-24-6 4-11" stroke="#75abd4" stroke-width="2.5"/>
    <path d="M32 103l-1-49 62-26 45 27v48z" fill="#fff0b5" stroke="#9d693e" stroke-width="3"/>
    <path d="m22 55 72-31 54 30-10 4-45-24-61 26z" fill="#ee946e" stroke="#b36550" stroke-width="2.5"/>
    <path d="M83 102V70l23 1v30M41 63l31-1 1 22H42z" fill="#def2f7" stroke="#72a2c3" stroke-width="2.5"/>
    <path d="M52 78q3-7 8-4l3-5 3 6q5 1 3 6H53zm12-2h1" fill="#c1a38a" stroke="#865f46" stroke-width="1.5"/>
    <path d="M115 77h16m-14 0v14m12-14v14" stroke="#956646" stroke-width="2"/>
    <path d="M13 108q14-8 21 0m96 2q17-10 34-2M20 116l5-7 6 6m111 1 7-6 8 6" stroke="#85a957" stroke-width="3"/>
    <path d="M153 67l4-7 3 8 8 2-7 4-1 8-5-6-7 1 4-6-3-5z" fill="#f2c654" stroke="#c89135" stroke-width="1.5"/>
    <path d="M145 43a16 16 0 0 1 32 0m-28 0a12 12 0 0 1 24 0m-20 0a8 8 0 0 1 16 0" stroke="#e4a681" stroke-width="2"/>
    <path d="M5 95h20v-5l-5-1-4-6H9l-4 6z" fill="#de997d" stroke="#a46c51" stroke-width="1.5"/>
    <circle cx="9" cy="96" r="2.5" fill="#8c785f"/><circle cx="21" cy="96" r="2.5" fill="#8c785f"/>
  </svg>`;
  const renderDiary = text => text.split('\n\n').map(paragraph =>
    `<p>${escapeHTML(paragraph).replaceAll('\n', '<br>')}</p>`
  ).join('');
  let visits = 0;
  let musicEnabled = true;
  let active = false;
  let unlocked = false;
  let ifUnlocked = false;
  let studioUnlocked = false;
  let memoUnlocked = false;
  try {
    const savedVisits = Number(localStorage.getItem(visitorKey));
    if (Number.isSafeInteger(savedVisits) && savedVisits > 0) visits = savedVisits;
  } catch { /* 存储不可用时仍可记录本次浏览。 */ }
  try { ifUnlocked = localStorage.getItem(ifUnlockKey) === 'true'; } catch {}
  try { studioUnlocked = localStorage.getItem(studioUnlockKey) === 'true'; } catch {}

  panel.innerHTML = `
    <div class="blog-window">
      <div class="blog-window-bar">
        <span><i aria-hidden="true">✿</i> PP 空间 <b>2008</b></span>
        <button id="blog-music-toggle" class="blog-gloss-button" type="button" aria-pressed="false">♫ 音乐：关</button>
      </div>
      <section class="blog-directory" id="blog-directory" aria-labelledby="blog-directory-title">
        <header><h1 id="blog-directory-title" tabindex="-1">日志目录</h1><span>共 6 篇</span></header>
        <ul class="blog-entries">
          <li><button type="button" id="blog-first-entry" aria-controls="blog-first-post">
            <span class="blog-entry-stamp">${paw}</span>
            <span>本猫的秘密基地正式开张！！！<small class="blog-entry-meta"><time datetime="2008-03-09T17:26">2008年3月9日</time> · 公开</small></span>
            <span class="blog-entry-arrow" aria-hidden="true">›</span>
          </button></li>
          <li><button type="button" id="blog-locked-entry" aria-controls="blog-locked-post" aria-haspopup="dialog">
            <span class="blog-entry-stamp"><svg class="icon" role="img" aria-label="密码访问"><use href="#lock"/></svg></span>
            <span>以前的家<small class="blog-entry-meta"><time datetime="2008-03-16T20:17">2008年3月16日</time> · 密码访问</small></span>
            <span class="blog-entry-arrow" aria-hidden="true">›</span>
          </button></li>
          <li><button type="button" id="blog-friend-entry" aria-controls="blog-friend-post">
            <span class="blog-entry-stamp">${paw}</span>
            <span>介绍一下我的新朋友！！！<small class="blog-entry-meta"><time datetime="2008-07-18T19:36">2008年7月18日</time> · 公开</small></span>
            <span class="blog-entry-arrow" aria-hidden="true">›</span>
          </button></li>
          <li><button type="button" id="blog-if-entry" aria-controls="blog-if-post"${ifUnlocked ? '' : ' aria-haspopup="dialog"'}>
            <span class="blog-entry-stamp blog-if-stamp"><svg class="icon" role="img" aria-label="私密日记"><use href="#lock"/></svg></span>
            <span>如果<small class="blog-entry-meta"><time datetime="2008-08-16T22:06">2008年8月16日</time> · 私密日记</small></span>
            <span class="blog-entry-arrow" aria-hidden="true">›</span>
          </button></li>
          <li><button type="button" id="blog-wanted-entry" aria-controls="blog-wanted-post">
            <span class="blog-entry-stamp blog-wanted-stamp">${paw}</span>
            <span>失踪人口通缉令！！！<small class="blog-entry-meta"><time datetime="2008-08-28T21:37">2008年8月28日</time> · 公开</small></span>
            <span class="blog-entry-arrow" aria-hidden="true">›</span>
          </button></li>
          <li><button type="button" id="blog-studio-entry" aria-controls="blog-studio-post"${studioUnlocked ? '' : ' aria-haspopup="dialog"'}>
            <span class="blog-entry-stamp blog-studio-stamp"><svg class="icon" role="img" aria-label="私密日志"><use href="#lock"/></svg></span>
            <span>本猫赚钱了！！！<small class="blog-entry-meta"><time datetime="2008-09-23T21:16">2008年9月23日</time> · 私密日志</small></span>
            <span class="blog-entry-arrow" aria-hidden="true">›</span>
          </button></li>
        </ul>
      </section>
      <div class="blog-space" id="blog-space" hidden>
        <header class="blog-hero">
          <span class="blog-sparkle sparkle-left" aria-hidden="true">✧</span>
          <span class="blog-sparkle sparkle-right" aria-hidden="true">✦</span>
          <span class="blog-sparkle sparkle-small" aria-hidden="true">✧</span>
          <div class="blog-hero-copy">
            <p class="blog-hero-kicker">${paw} 忧郁小猫猫的个人空间</p>
            <h1>本猫的秘密基地</h1>
            <p class="blog-welcome">来过的朋友请留下爪印！</p>
          </div>
          <div class="blog-mascot">
            <span class="blog-cat-bubble" aria-hidden="true">喵！</span>
            <span class="blog-mascot-shine" aria-hidden="true">✦</span>
            ${catSticker}
          </div>
        </header>
        <header class="blog-friend-hero" id="blog-friend-hero" hidden>
          <span class="blog-friend-wing blog-friend-wing-left" aria-hidden="true">${friendWing}</span>
          <span class="blog-friend-wing blog-friend-wing-right" aria-hidden="true">${friendWing}</span>
          <span class="blog-friend-chain blog-friend-chain-left" aria-hidden="true">${friendChain}</span>
          <span class="blog-friend-chain blog-friend-chain-right" aria-hidden="true">${friendChain}</span>
          <span class="blog-friend-fire blog-friend-fire-left" aria-hidden="true">${friendFire}</span>
          <span class="blog-friend-fire blog-friend-fire-right" aria-hidden="true">${friendFire}</span>
          <span class="blog-friend-pixels" aria-hidden="true">✦　⋆　✧　⋆　✦</span>
          <span class="blog-friend-butterfly" aria-hidden="true">${friendButterfly}</span>
          <h1>忧郁小猫猫の暗黑领域</h1>
          <p>命运の齿轮正在转动！！！</p>
        </header>
        <header class="blog-dragon-hero" id="blog-dragon-hero" hidden>
          <h1>本天才の神龙领域</h1>
          <p>总有一天要变得超级厉害！！！</p>
        </header>
        <header class="blog-wanted-hero" id="blog-wanted-hero" hidden>
          <div class="blog-wanted-hero-note">
            <p class="blog-wanted-agency">忧郁小猫猫侦探事务所</p>
            <h1>全网通缉失踪人口！！！</h1>
            <p class="blog-wanted-suspect">嫌疑人：城南旧章｜特征：喜欢呵呵呵呵</p>
            <span class="blog-wanted-trail" aria-hidden="true">${paw} ${paw} ${paw}</span>
          </div>
          <div class="blog-wanted-detective" aria-hidden="true">
            ${catSticker}
            <svg class="blog-wanted-hat" viewBox="0 0 80 43" fill="none">
              <path d="M18 31 24 13c4-9 22-10 32 0l8 18" fill="#9a5d35" stroke="#5b301e" stroke-width="3"/>
              <path d="M20 25c15 5 28 5 42 0l3 7H17z" fill="#773b25"/>
              <path d="M6 33c12-6 57-6 69 0-5 8-63 8-69 0z" fill="#c88953" stroke="#5b301e" stroke-width="3"/>
            </svg>
            <svg class="blog-wanted-loupe" viewBox="0 0 60 60" fill="none">
              <path d="m38 39 14 14" stroke="#573426" stroke-width="8" stroke-linecap="round"/>
              <circle cx="26" cy="26" r="17" fill="#fcf4d4" fill-opacity=".85" stroke="#8a4e2f" stroke-width="5"/>
              <path d="M17 23a10 10 0 0 1 8-7" stroke="#fff9e4" stroke-width="3" stroke-linecap="round"/>
              <path d="m22 26 3 4 6-8" stroke="#b74b32" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </header>
        <header class="blog-studio-hero" id="blog-studio-hero" hidden>
          <div class="blog-studio-book">
            <div class="blog-studio-book-title">
              <span aria-hidden="true" class="blog-studio-stars">☆ ✿ ✧</span>
              <h1>雷大画家の秘密画室</h1>
              <p>本猫的画居然登上杂志啦！！！</p>
            </div>
            <div class="blog-studio-sketch" aria-hidden="true">${studioSketch}</div>
          </div>
          <span class="blog-studio-pencils" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="blog-studio-eraser" aria-hidden="true"></span>
        </header>
        <nav class="blog-nav" aria-label="博客导航">
          <button type="button" id="blog-back">← 返回日志目录</button>
          <button type="button" id="blog-wanted-home" hidden>空间首页</button>
          <span aria-hidden="true">✿</span>
          <button type="button" id="blog-album-link">▧ 相册</button>
          <span aria-hidden="true">✿</span>
          <button type="button" id="blog-about-link" aria-controls="blog-about">☺ 关于我</button>
        </nav>
        <div class="blog-layout">
          <aside class="blog-sidebar" aria-label="空间资料">
            <section class="blog-widget" id="blog-about" tabindex="-1">
              <h2>本猫的名片</h2>
              <div class="blog-profile">
                <img loading="lazy" decoding="async" src="assets/avatar.webp" width="60" height="60" alt="">
                <strong>忧郁小猫猫</strong>
                <p>秋叶孤儿院第一帅哥</p>
              </div>
            </section>
            <section class="blog-widget blog-visitors">
              <h2>${paw} 到此一游</h2>
              <div><output id="blog-visitor-count">000000</output><span>位来访的朋友</span></div>
            </section>
          </aside>
          <div class="blog-journal">
            <nav class="blog-breadcrumbs" aria-label="当前位置">
              <button type="button" id="blog-breadcrumb-home">首页</button><span aria-hidden="true">›</span>
              <button type="button" data-blog-directory>博客</button><span aria-hidden="true">›</span>
              <button type="button" data-blog-directory>本猫日常</button><span aria-hidden="true">›</span>
              <span id="blog-breadcrumb-title" aria-current="page"></span>
            </nav>
            <article class="blog-post" id="blog-first-post" aria-labelledby="blog-first-title" hidden>
              <header class="blog-post-heading">
                <h2 id="blog-first-title" tabindex="-1"><span>本猫的</span><span>秘密基地</span><span>正式开张！！！</span></h2>
                <div class="blog-post-meta"><time datetime="2008-03-09T17:26">2008/3/9 17:26</time><span>公开</span></div>
                <span class="blog-heading-star" aria-hidden="true">☆</span>
              </header>
              <div class="blog-post-copy">
                <div class="blog-paper-doodles" aria-hidden="true">
                  <span class="blog-doodle-paws">${paw}${paw}</span>
                  <span class="blog-doodle-stars">☆ <b>★</b></span>
                  ${mouseDoodle}
                </div>
                <p>哈哈哈哈哈哈哈哈！！！<br>经过本人长达两个小时的研究 终于把这个博客弄好了！！！</p>
                <section class="blog-cat-card" aria-labelledby="blog-cat-card-title">
                  <h3 id="blog-cat-card-title"><span aria-hidden="true">✧</span> 先介绍一下本人 <span aria-hidden="true">✧</span></h3>
                  <dl>
                    <div><dt>网名：</dt><dd>忧郁小猫猫</dd></div>
                    <div><dt>身份：</dt><dd>秋叶孤儿院<span class="blog-cat-crown">第一帅哥</span></dd></div>
                    <div><dt>特长：</dt><dd class="blog-cat-skills"><span>画画</span> <span>吃饭</span> <span>睡觉</span></dd></div>
                    <div><dt>兴趣爱好：</dt><dd class="blog-cat-web">上网！！！<span aria-hidden="true">✦</span></dd></div>
                  </dl>
                </section>
                <p>王院长说我应该多写点有意义的东西 不要一天到晚发些乱七八糟的<br>我说怎么没意义了！！！<br>记录本天才的日常生活难道还不够有意义吗！！！</p>
                <p>对了！！！我们孤儿院也有自己的网站了！！！<br>王院长非要我帮忙看看有没有什么问题<br>我点进去一看 首页放了他好大一张照片<br>为什么没有我？？？？？<br>本人强烈要求院长重新排版！！！<br>想参观的点这里↓↓↓<br><a class="blog-site-link" id="blog-site-link" href="orphanage.html">【秋叶孤儿院官方网站】</a></p>
              </div>
              <div class="blog-post-divider">${paw} ${paw} ${paw}</div>
              ${renderComments('blog-comments-title', '2008-03-09', openingComments)}
            </article>
            <article class="blog-post blog-locked-post" id="blog-locked-post" aria-labelledby="blog-locked-title" hidden><template data-private-post>
              <header class="blog-post-heading">
                <h2 id="blog-locked-title" tabindex="-1">以前的家</h2>
                <div class="blog-post-meta"><time datetime="2008-03-16T20:17">2008/3/16 20:17</time><span>密码访问</span></div>
              </header>
              <div class="blog-post-copy blog-locked-body">
                <div class="blog-diary-doodles" aria-hidden="true">
                  <span>☆</span>
                  <svg viewBox="0 0 37 33" class="blog-photo-doodle" fill="none" stroke="#79838c" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 7l28-5 4 25-28 4z" fill="#f7f2e7"/>
                    <path d="M7 10l21-4 3 16-21 4z"/>
                    <path d="M11 25l5-9 6 4 3-4 5 5"/>
                    <circle cx="23" cy="11" r="1.5"/>
                  </svg>
                  <svg viewBox="0 0 42 24" class="blog-car-doodle" stroke="#654c4d" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 13l6-1 6-7 12-1 6 7 5 2-1 5H4z" fill="#bd5653"/>
                    <path d="M13 12l5-5 9-1 4 5z" fill="#d2d8d8"/>
                    <circle cx="11" cy="18" r="3.2" fill="#635959"/>
                    <circle cx="31" cy="18" r="3.2" fill="#635959"/>
                  </svg>
                </div>
                ${formerHome.split('\n\n').map(paragraph => `<p>${escapeHTML(paragraph).replaceAll('雷力', '<strong>雷力</strong>').replaceAll('\n', '<br>')}</p>`).join('')}
              </div>
              <section class="blog-comments blog-comments-closed" aria-labelledby="blog-closed-comments-title">
                <h3 id="blog-closed-comments-title">评论区</h3>
                <p>主人已关闭评论</p>
              </section>
            </template></article>
            <article class="blog-post blog-friend-post" id="blog-friend-post" aria-labelledby="blog-friend-title" hidden>
              <header class="blog-post-heading">
                <h2 id="blog-friend-title" tabindex="-1">介绍一下我的新朋友！！！</h2>
                <div class="blog-post-meta"><time datetime="2008-07-18T19:36">2008/7/18 19:36</time><span>公开</span></div>
              </header>
              <div class="blog-post-copy">
                <p>重大消息！！！<br>本猫最近在网上认识了一个新朋友！！！<br>此人名叫城南旧章<br>听起来是不是很有文化！！！<br>其实他本人说话比名字还奇怪<br>非要说什么命运的齿轮已经开始转动<br>还说我身上有王者之魂<br>哈哈哈哈哈哈哈哈<br>我说你能不能正常一点<br>他说凡人不懂他的世界<br>谁要懂你的世界啊！！！</p>
                <p>不过他人还是挺好的<br>我说我喜欢画画 他居然还挺感兴趣<br>而且他说话特别好玩<br>每次我都能跟他聊半天<br>就是老喜欢呵呵呵呵的<br>感觉下一秒就要变成电视剧里的大反派了</p>
                <p>对了！！！<br>大家有没有发现本猫今天的空间变帅了！！！<br>我昨天去参观了他的空间<br>那个背景真的超级酷！！！<br>于是本天才决定自己也弄一个<br>黑色的背景 紫色的字 还有会闪的翅膀！！！<br>我还专门研究了半天怎么弄那个发光的字<br>怎么样！！！是不是很有高手的感觉！！！</p>
                <p>本人宣布从今天起正式将此人列入我的好友名单！！！<br>大家欢迎！！！</p>
                <p>有兴趣的可以去他的空间参观一下<br>不过他有时候说话真的很难懂<br>看不懂也不要怪我！！！</p>
                <p class="blog-friend-link">友情链接： <a id="blog-cheng-link" href="#blog-cheng-space">点击参观城南旧章の精神领域</a></p>
              </div>
              ${renderComments('blog-friend-comments-title', '2008-07-18', friendComments)}
            </article>
            <article class="blog-post blog-if-post" id="blog-if-post" aria-labelledby="blog-if-title" hidden><template data-private-post>
              <header class="blog-post-heading">
                <h2 id="blog-if-title" tabindex="-1">如果</h2>
                <div class="blog-post-meta"><time datetime="2008-08-16T22:06">2008/8/16 22:06</time><span>私密日记</span></div>
              </header>
              <div class="blog-post-copy">${renderDiary(ifDiary)}</div>
              <section class="blog-comments blog-comments-closed" aria-labelledby="blog-if-comments-title">
                <h3 id="blog-if-comments-title">评论区</h3>
                <p>主人已关闭评论</p>
              </section>
            </template></article>
            <article class="blog-post blog-wanted-post" id="blog-wanted-post" aria-labelledby="blog-wanted-title" hidden>
              <header class="blog-post-heading">
                <div>
                  <h2 id="blog-wanted-title" tabindex="-1">失踪人口通缉令！！！</h2>
                  <div class="blog-post-meta"><time datetime="2008-08-28T21:37">2008-08-28 21:37</time><b aria-hidden="true">｜</b><span>公开日志</span></div>
                </div>
                <span class="blog-wanted-seal" aria-hidden="true">通缉中！</span>
              </header>
              <div class="blog-post-copy">
                <aside class="blog-wanted-note">
                  <p>通缉对象：城南旧章</p>
                  <p>失踪时间：2008年8月18日</p>
                  <p>主要特征：喜欢说命运的齿轮、王者之魂、呵呵呵呵</p>
                  <p>悬赏金额：0元！！！</p>
                </aside>
                ${renderDiary(wantedDiary)}
              </div>
              ${renderComments('blog-wanted-comments-title', '2008-08-28', wantedComments)}
            </article>
            <article class="blog-post blog-studio-post" id="blog-studio-post" aria-labelledby="blog-studio-title" hidden>
              <header class="blog-post-heading">
                <h2 id="blog-studio-title" tabindex="-1">本猫赚钱了！！！</h2>
                <div class="blog-post-meta"><time datetime="2008-09-23T21:16">2008/9/23 21:16</time><span>私密日志</span></div>
              </header>
              <div class="blog-post-copy" id="blog-studio-copy"></div>
              <p class="blog-studio-comments">主人关闭了这篇日志的评论功能</p>
            </article>
            <nav class="blog-pagination" aria-label="篇章导航">
              <button type="button" id="blog-previous" class="blog-gloss-button">← 上一篇</button>
              <button type="button" class="blog-gloss-button" data-blog-directory>返回目录</button>
              <button type="button" id="blog-next" class="blog-gloss-button">下一篇 →</button>
            </nav>
          </div>
        </div>
      </div>
      <section class="blog-cheng-space" id="blog-cheng-space" aria-labelledby="blog-cheng-title" hidden>
        <div class="blog-cheng-return">
          <button type="button" id="blog-cheng-back">← 返回好友日志</button>
        </div>
        <header class="blog-cheng-hero">
          <span class="blog-cheng-moon" aria-hidden="true"></span>
          <span class="blog-cheng-stars" aria-hidden="true">✦　·　☆　⋆</span>
          <span class="blog-cheng-stars blog-cheng-stars-low" aria-hidden="true">☆　·　✧</span>
          <span class="blog-cheng-wing blog-cheng-wing-left" aria-hidden="true">${chengWing}</span>
          <span class="blog-cheng-wing blog-cheng-wing-right" aria-hidden="true">${chengWing}</span>
          <p>╭ァ 〆 黑色の羽翼 · 永恒の孤独 〆</p>
          <h1 id="blog-cheng-title" tabindex="-1">╰☆ 城南旧章の精神领域 ☆╮</h1>
          <p>莪站在命运の尽头、等待灵魂觉醒の那一天……</p>
          <span class="blog-cheng-jewels" aria-hidden="true">⋆｡°　◆　◇　◆　°｡⋆</span>
        </header>
        <nav class="blog-cheng-nav" aria-label="城南旧章的空间导航">
          <button type="button" data-cheng-view="journals" aria-current="page">◇ 主页</button>
          <button type="button" data-cheng-view="journals">† 日志</button>
          <button type="button" data-cheng-view="photos">☆ 相册</button>
          <button type="button" data-cheng-view="messages">♠ 留言</button>
          <button type="button" data-cheng-view="friends">♡ 好友</button>
        </nav>
        <div class="blog-cheng-layout">
          <aside class="blog-cheng-sidebar" aria-label="空间资料">
            <section class="blog-cheng-box">
              <h2>城南旧章</h2>
              <p>♂ 16岁 | 星座：保密 | 真名：封印中</p>
              <p>个性签名：呵、伱永远卟会懂莪の悲伤。</p>
              <p>空间背景音乐：许嵩《玫瑰花的葬礼》</p>
              <button type="button" class="blog-cheng-player" id="blog-cheng-music" aria-pressed="false">▶ 播放</button>
            </section>
            <section class="blog-cheng-box">
              <h2>日志分类</h2>
              <p>灵魂の独白 (2)</p>
              <p>秘密备忘 (1) <svg class="icon" aria-hidden="true"><use href="#lock"/></svg></p>
            </section>
            <section class="blog-cheng-box">
              <h2>友情链接</h2>
              <a href="#blog-directory" data-blog-directory>某只吵死人的猫 → 忧郁小猫猫</a>
            </section>
          </aside>
          <div class="blog-cheng-box blog-cheng-main">
            <section id="blog-cheng-journals">
              <h2>〆 最新の灵魂独白</h2>
              <ul class="blog-cheng-journals">
                <li><svg class="icon" role="img" aria-label="私密"><use href="#lock"/></svg><div><button type="button" id="blog-cheng-memo-entry" data-cheng-post aria-controls="blog-cheng-memo-post" aria-haspopup="dialog">† 封印の备忘录 †</button><span><time datetime="2008-08-15T20:38">2008-08-15</time> · 回答问题可见</span></div></li>
                <li><svg class="icon" aria-hidden="true"><use href="#blog"/></svg><div><button type="button" data-cheng-post aria-controls="blog-cheng-second-post">〆一只貓、闯入了莪の結界</button><span><time datetime="2008-07-20T20:16">2008-07-20</time> · 公开</span></div></li>
                <li><svg class="icon" aria-hidden="true"><use href="#blog"/></svg><div><button type="button" data-cheng-post aria-controls="blog-cheng-first-post">《世界、終究無法理解莪》</button><span><time datetime="2008-07-08T21:46">2008-07-08</time> · 公开</span></div></li>
              </ul>
            </section>
            <section id="blog-cheng-photos" hidden><h2>☆ 相册</h2><p>暂无公开相册。</p></section>
            <section id="blog-cheng-messages" aria-labelledby="blog-guestbook-title" hidden>
              <h2 id="blog-guestbook-title">╰☆ 留下伱の痕迹 ☆╮</h2>
              ${chengGuestbook.map(([date, entries]) => `
                <section class="blog-comments blog-guestbook-day">
                  <h3><time datetime="${date}">${date}</time></h3>
                  ${renderCommentList(date, entries, guestbookAvatars)}
                </section>
              `).join('')}
            </section>
            <section id="blog-cheng-friends" hidden>
              <h2>♡ 好友</h2>
              <p><a href="#blog-directory" data-blog-directory>某只吵死人的猫 → 忧郁小猫猫</a></p>
            </section>
            <section class="blog-cheng-article" id="blog-cheng-first-post" aria-labelledby="blog-cheng-first-title" hidden>
              <button class="blog-cheng-player" type="button" data-cheng-journal-back>← 返回日志</button>
              <header>
                <h2 id="blog-cheng-first-title" tabindex="-1">╰☆世界、終究無法理解莪☆╮</h2>
                <div class="blog-cheng-post-meta">
                  <time datetime="2008-07-08T21:46">2008年7月8日 21:46</time>
                  <span>灵魂の独白</span><span>公开</span><span>心情：殇</span>
                </div>
              </header>
              <div class="blog-cheng-post-copy">
                <p>﹎夜、依舊如此漃寞……<br>窗外の風吹過<br>卻吹吥散莪心中の憂喐<br>呵……<br>這個丗界到底還有誰能理觧莪？</p>
                <p>拾陸年了<br>莪一直在尋找眞正の自我<br>卻始終被現實の枷鎖束縛<br>他們只知道成績、考試、排名<br>卻吥知道莪の靈魂早已超趉了這些庸俗の東西</p>
                <p>今天媽又讓莪寫數學<br>莪說<br>眞正の強者、從吥向命邥屈棴<br>她說<br>那伱明天也別吃饭了<br>……</p>
                <p>呵、凡人<br>莪遲早會離開這個令人窒息的丗界<br>去尋找屬于自己の兲空<br>到時候<br>誰也別想阻圵莪<br>……<br>不过现在先去写数学了<br>不然真的没饭吃= =</p>
                <p>——城南旧章<br>2008.7.8</p>
              </div>
              ${renderComments('blog-cheng-first-comments', '2008-07-08', chengFirstComments)}
            </section>
            <section class="blog-cheng-article blog-cheng-cat-article" id="blog-cheng-second-post" aria-labelledby="blog-cheng-second-title" hidden>
              <button class="blog-cheng-player" type="button" data-cheng-journal-back>← 返回日志</button>
              <header>
                <div class="blog-cheng-cat-mark" aria-hidden="true"><span>結界</span>${paw}${paw}</div>
                <h2 id="blog-cheng-second-title" tabindex="-1">〆一只貓、闯入了莪の結界</h2>
                <div class="blog-cheng-post-meta">
                  <time datetime="2008-07-20T20:16">2008年7月20日 20:16</time>
                  <span>灵魂の独白</span><span>公开</span>
                </div>
              </header>
              <div class="blog-cheng-post-copy">
                <p>最近……<br>莪平静の精神领域<br>被一只来历不明の猫入侵了<br>此猫名为忧郁小猫猫<br>听名字本以为是和莪一样背负着黑暗の灵魂<br>结果……<br>根本卟是！！！</p>
                <p>一天到晚哈哈哈哈哈哈<br>说话后面还要带三个感叹号<br>自称本天才<br>画个猫都能画出世界名画の气势</p>
                <p>呵、天真の少年<br>伱根本不知道真正の艺术为何物<br>但是既然命运安排了我们相遇<br>莪就勉为其难给他当个艺术鉴赏家吧</p>
                <p>还有一件事<br>前两天翻他相册<br>才知道他刚过完生日<br>出于吾の仁慈<br>莪特意送上了迟来の祝福<br>没想到这猫居然得寸进尺<br>让我补生日礼物</p>
                <p>呵……<br>既然如此<br>这笔命运の债<br>莪暂且记下了<br>等本少爷有钱の那天<br>必将亲手终结这段因果</p>
              </div>
              ${renderComments('blog-cheng-second-comments', '2008-07-20', chengSecondComments)}
            </section>
            <section class="blog-cheng-article" id="blog-cheng-memo-post" aria-labelledby="blog-cheng-memo-title" hidden><template data-private-post>
              <button class="blog-cheng-player" type="button" data-cheng-journal-back>← 返回日志</button>
              <header>
                <h2 id="blog-cheng-memo-title" tabindex="-1">† 封印の备忘录 †</h2>
                <div class="blog-cheng-post-meta">
                  <time datetime="2008-08-15T20:38">2008年8月15日 20:38</time>
                  <span>秘密备忘</span><span>回答问题可见</span>
                </div>
              </header>
              <div class="blog-cheng-post-copy">
                <p>今天差点把PP号搞没了<br>靠……<br>昨天改了密码<br>今天居然忘了自己改成什么了<br>我真的服了<br>难道这就是命运对莪の考验……<br>还好最后想起来了<br>不然本王の精神领域就要永远消失在互联网の尽头了</p>
                <p>从今天开始<br>再也不乱改密码了！！！<br>以后就用<strong>名字拼音＋生日四位数</strong></p>
                <p>多么完美の组合<br>简单 好记 而且充满个人特色<br>呵……<br>真正の智慧往往隐藏在最平凡の事物之中</p>
                <p>另外<br>今天写了一下午暑假作业<br>成果非常显著<br>本人已经成功写完了五本作业的姓名和班级<br>甚至连日期都填好了<br>这效率简直恐怖<br>留下证据一张<br>等开学的时候给自己看看<br>什么叫做暑假作业の终极强者</p>
                <p>不过话说回来<br>数学还剩好多<br>明天再写吧<br>今天先去找那只猫<br>不知道他画完没有<br>昨天还说要给我看什么惊世之作<br>呵……<br>吾倒要看看有多惊世</p>
                <p class="blog-cheng-attachment">
                  <span>图片附件：</span>
                  <button type="button" id="blog-cheng-homework-link" aria-haspopup="dialog">本王今日の伟大成果.jpg</button>
                </p>
              </div>
              <section class="blog-comments blog-comments-closed" aria-labelledby="blog-memo-comments-title">
                <h3 id="blog-memo-comments-title">评论区</h3>
                <p>主人已关闭评论</p>
              </section></template>
            </section>
          </div>
        </div>
      </section>
    </div>
    <dialog class="blog-dialog" id="blog-access-dialog" aria-labelledby="blog-access-title">
      <header><h2 id="blog-access-title"></h2><form method="dialog"><button aria-label="关闭访问问题">×</button></form></header>
      <form id="blog-access-form" class="blog-dialog-body" novalidate>
        <span class="blog-envelope-postage" aria-hidden="true">${paw}</span>
        <p class="blog-envelope-warning" id="blog-envelope-warning" hidden>本猫的秘密日记，闲人免进！！！</p>
        <label id="blog-access-question" for="blog-answer"></label>
        <input id="blog-answer" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" aria-describedby="blog-answer-error" required>
        <p id="blog-answer-error" role="status"></p>
        <button class="blog-gloss-button" id="blog-access-submit" type="submit">确认</button>
      </form>
    </dialog>
    <dialog class="blog-dialog blog-attachment-dialog" id="blog-homework-dialog" aria-labelledby="blog-homework-title">
      <header><h2 id="blog-homework-title">本王今日の伟大成果.jpg</h2><form method="dialog"><button aria-label="关闭图片">×</button></form></header>
      <img id="blog-homework-image" width="1448" height="1086" alt="摊在书桌上的暑假作业本">
    </dialog>
  `;

  const music = new Audio();
  music.loop = true;
  music.volume = .19;
  const musicButton = panel.querySelector('#blog-music-toggle');
  function updateMusicButton() {
    musicButton.textContent = music.paused ? '♫ 音乐：关' : '♫ 音乐：开';
    musicButton.setAttribute('aria-pressed', String(!music.paused));
  }
  function playMusic() {
    window.ADOPTION_ASSETS.attach(music, 'assets/audio/blog-go-where-the-wind-is.m4a', {preload: 'auto'}).then(() => music.play()).then(() => {
      if (!active || !musicEnabled || !chengSpace.hidden) music.pause();
      updateMusicButton();
    }).catch(updateMusicButton);
  }
  music.addEventListener('play', updateMusicButton);
  music.addEventListener('pause', updateMusicButton);
  musicButton.addEventListener('click', () => {
    musicEnabled = music.paused;
    if (musicEnabled) playMusic();
    else music.pause();
    updateMusicButton();
  });

  const directory = panel.querySelector('#blog-directory');
  const space = panel.querySelector('#blog-space');
  const chengSpace = panel.querySelector('#blog-cheng-space');
  const chengLink = panel.querySelector('#blog-cheng-link');
  const chengTabs = [...chengSpace.querySelectorAll('[data-cheng-view]')];
  const chengMusic = new Audio();
  chengMusic.loop = true;
  chengMusic.volume = .42;
  const chengMusicButton = panel.querySelector('#blog-cheng-music');
  let chengMusicEnabled = true;
  const backButton = panel.querySelector('#blog-back');
  const entries = [...directory.querySelectorAll('[aria-controls]')];
  const posts = entries.map(entry => document.getElementById(entry.getAttribute('aria-controls')));
  const lockedEntry = panel.querySelector('#blog-locked-entry');
  const ifEntry = panel.querySelector('#blog-if-entry');
  const studioEntry = panel.querySelector('#blog-studio-entry');
  const studioIndex = entries.indexOf(studioEntry);
  const studioCopy = panel.querySelector('#blog-studio-copy');
  const studioHero = panel.querySelector('#blog-studio-hero');
  const dragonHero = panel.querySelector('#blog-dragon-hero');
  const friendHero = panel.querySelector('#blog-friend-hero');
  const wantedHero = panel.querySelector('#blog-wanted-hero');
  const wantedHome = panel.querySelector('#blog-wanted-home');
  const homeCrumb = panel.querySelector('#blog-breadcrumb-home');
  const breadcrumbTitle = panel.querySelector('#blog-breadcrumb-title');
  const previousButton = panel.querySelector('#blog-previous');
  const nextButton = panel.querySelector('#blog-next');
  let openedIndex = 0;
  let friendPostScroll = 0;
  let studioReturnIndex = null;

  function clearStudioRoute() {
    if (location.hash === studioHash) {
      history.replaceState(history.state, '', location.pathname + location.search);
    }
  }

  function renderStudioDiary() {
    if (studioCopy.hasChildNodes()) return;
    const paragraphs = studioDiary.split('\n\n').map(paragraph => {
      const copy = escapeHTML(paragraph).replace(studioClue, '<strong>' + studioClue + '</strong>').replaceAll('\n', '<br>');
      const art = paragraph.startsWith('她问我为什么叫《家》') ? `
        <figure class="blog-studio-art"><img src="assets/photos/blog-studio-home.webp" width="900" height="675"
          loading="lazy" decoding="async" alt="蜡笔画《家》，画着一栋红屋顶的房子，窗台上趴着一只猫"></figure>` : '';
      return `<p>${copy}</p>${art}`;
    });
    studioCopy.innerHTML = `
      <span class="blog-studio-money" aria-hidden="true">50元！</span>
      ${paragraphs.join('')}
      <div class="blog-studio-mementos" aria-hidden="true">
        <svg class="blog-studio-box" viewBox="0 0 112 68" fill="none">
          <path d="M9 29 29 18l63 4 10 15-21 14-64-5z" fill="#eec990" stroke="#a87547" stroke-width="2"/>
          <path d="m22 36 8-22 39 4 12 18-17 13z" fill="#fff9d9" stroke="#bba479" stroke-width="2"/>
          <path d="m41 28 5-24 37 8 3 28z" fill="#dbe8ac" stroke="#8b9c5c" stroke-width="2"/>
          <path d="m46 18 19 5m-21 2 14 4" stroke="#a0a570" stroke-width="2"/>
          <path d="m9 29 73 7 20-10-4 27-18 12-65-8z" fill="#d99d70" stroke="#a87547" stroke-width="2"/>
          <path d="m82 37-2 27m-58-17 48 5" stroke="#a87547" stroke-width="2"/>
        </svg>
        <div class="blog-studio-letter"><span>${paw}</span></div>
      </div>`;
  }

  function updateChengPlayer() {
    chengMusicButton.textContent = chengMusic.paused ? '▶ 播放' : 'Ⅱ 暂停';
    chengMusicButton.setAttribute('aria-pressed', String(!chengMusic.paused));
  }

  function playChengMusic() {
    window.ADOPTION_ASSETS.attach(chengMusic, 'assets/audio/cheng-rose-funeral.m4a', {preload: 'auto'}).then(() => chengMusic.play()).then(() => {
      if (!active || chengSpace.hidden || !chengMusicEnabled) chengMusic.pause();
      updateChengPlayer();
    }).catch(updateChengPlayer);
  }

  chengMusic.addEventListener('play', updateChengPlayer);
  chengMusic.addEventListener('pause', updateChengPlayer);
  chengMusicButton.addEventListener('click', () => {
    chengMusicEnabled = chengMusic.paused;
    if (chengMusicEnabled) playChengMusic();
    else chengMusic.pause();
  });

  function closeChengSpace() {
    chengSpace.hidden = true;
    chengMusic.pause();
    musicButton.hidden = false;
    panel.classList.remove('view-cheng-space');
  }

  function showDirectory() {
    clearStudioRoute();
    closeChengSpace();
    panel.classList.remove('view-dragon-space', 'view-friend-space', 'view-wanted-space', 'view-studio-space');
    space.hidden = true;
    directory.hidden = false;
    panel.scrollTop = 0;
  }

  function revealContent(post) {
    const template = post.querySelector('template[data-private-post]');
    if (template) template.replaceWith(template.content);
  }

  function openPost(index, syncHistory = true) {
    const post = posts[index];
    const studioSpace = post.id === 'blog-studio-post';
    if (studioSpace && !studioUnlocked) return;
    if (studioSpace) {
      if (syncHistory && location.hash !== studioHash) {
        studioReturnIndex = space.hidden ? null : openedIndex;
        history.pushState(history.state, '', studioHash);
      }
      renderStudioDiary();
    } else if (syncHistory) {
      clearStudioRoute();
    }
    revealContent(post);
    openedIndex = index;
    const dragonSpace = post.id === 'blog-if-post';
    const friendSpace = post.id === 'blog-friend-post';
    const wantedSpace = post.id === 'blog-wanted-post';
    panel.classList.toggle('view-dragon-space', dragonSpace);
    panel.classList.toggle('view-friend-space', friendSpace);
    panel.classList.toggle('view-wanted-space', wantedSpace);
    panel.classList.toggle('view-studio-space', studioSpace);
    dragonHero.hidden = !dragonSpace;
    friendHero.hidden = !friendSpace;
    wantedHero.hidden = !wantedSpace;
    studioHero.hidden = !studioSpace;
    wantedHome.hidden = !wantedSpace && !studioSpace;
    for (const article of posts) article.hidden = article !== post;
    directory.hidden = true;
    space.hidden = false;
    const title = post.querySelector('h2');
    homeCrumb.textContent = friendSpace ? '游戏首页' : '首页';
    breadcrumbTitle.textContent = title.textContent;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === posts.length - 1;
    title.focus({preventScroll: true});
    panel.scrollTop = 0;
  }

  window.addEventListener('popstate', () => {
    if (!active) return;
    if (location.hash === studioHash && studioUnlocked) {
      openPost(studioIndex, false);
    } else if (panel.classList.contains('view-studio-space')) {
      if (studioReturnIndex === null) showDirectory();
      else openPost(studioReturnIndex, false);
    }
  });

  function returnToDirectory(event) {
    event.preventDefault();
    const wasVisiting = !chengSpace.hidden;
    showDirectory();
    entries[openedIndex].focus({preventScroll: true});
    if (wasVisiting && musicEnabled) playMusic();
  }

  backButton.addEventListener('click', returnToDirectory);
  wantedHome.addEventListener('click', () => openPost(0));
  for (const button of panel.querySelectorAll('[data-blog-directory]')) {
    button.addEventListener('click', returnToDirectory);
  }
  homeCrumb.addEventListener('click', () => document.querySelector('#chat-module').click());
  panel.querySelector('#blog-about-link').addEventListener('click', () => panel.querySelector('#blog-about').focus());
  panel.querySelector('#blog-album-link').addEventListener('click', () => document.querySelector('#album-module').click());

  const accessDialog = panel.querySelector('#blog-access-dialog');
  const homeworkDialog = panel.querySelector('#blog-homework-dialog');
  const answer = panel.querySelector('#blog-answer');
  const error = panel.querySelector('#blog-answer-error');
  const envelopeWarning = panel.querySelector('#blog-envelope-warning');
  const accessSubmit = panel.querySelector('#blog-access-submit');
  let accessChallenge = null;
  panel.querySelector('#blog-site-link').addEventListener('click', () => music.pause());
  chengSpace.addEventListener('click', event => {
    if (!event.target.closest('#blog-cheng-homework-link')) return;
    panel.querySelector('#blog-homework-image').src = 'assets/photos/cheng-homework.webp';
    homeworkDialog.showModal();
  });

  function requestAccess(challenge) {
    accessChallenge = challenge;
    const numeric = /^\d{8}$/.test(challenge.answer);
    answer.inputMode = numeric ? 'numeric' : 'text';
    answer.maxLength = numeric ? 8 : 16;
    accessDialog.classList.toggle('blog-dialog-dragon', !numeric && !challenge.envelope);
    accessDialog.classList.toggle('blog-dialog-envelope', Boolean(challenge.envelope));
    accessDialog.classList.remove('is-unfolding');
    envelopeWarning.hidden = !challenge.envelope;
    accessSubmit.textContent = challenge.envelope ? '拆开信封' : '确认';
    accessSubmit.disabled = false;
    panel.querySelector('#blog-access-title').textContent = challenge.title;
    panel.querySelector('#blog-access-question').textContent = challenge.question;
    answer.value = '';
    error.textContent = '';
    answer.removeAttribute('aria-invalid');
    accessDialog.showModal();
    answer.focus();
  }

  function requestPost(index) {
    if (entries[index] === studioEntry && !studioUnlocked) {
      requestAccess({
        title: '本猫赚钱了！！！',
        question: '我被杂志选中的画叫什么名字？',
        answer: '家',
        envelope: true,
        unlock() {
          studioUnlocked = true;
          try { localStorage.setItem(studioUnlockKey, 'true'); } catch {}
          studioEntry.removeAttribute('aria-haspopup');
          openPost(index);
        }
      });
      return;
    }
    if (entries[index] === ifEntry && !ifUnlocked) {
      requestAccess({
        title: '如果',
        question: '我长大以后想纹什么？',
        answer: '龙',
        unlock() {
          ifUnlocked = true;
          try { localStorage.setItem(ifUnlockKey, 'true'); } catch {}
          ifEntry.removeAttribute('aria-haspopup');
          openPost(index);
        }
      });
      return;
    }
    if (entries[index] !== lockedEntry || unlocked) {
      openPost(index);
      return;
    }
    requestAccess({
      title: '以前的家',
      question: '我的生日是？（请输入8位数字）',
      answer: '19950628',
      unlock() {
        unlocked = true;
        lockedEntry.removeAttribute('aria-haspopup');
        openPost(index);
      }
    });
  }
  entries.forEach((entry, index) => entry.addEventListener('click', () => requestPost(index)));
  previousButton.addEventListener('click', () => requestPost(openedIndex - 1));
  nextButton.addEventListener('click', () => requestPost(openedIndex + 1));
  answer.addEventListener('input', () => {
    error.textContent = '';
    answer.removeAttribute('aria-invalid');
  });
  panel.querySelector('#blog-access-form').addEventListener('submit', event => {
    event.preventDefault();
    const challenge = accessChallenge;
    if (!accessDialog.open || !challenge || accessSubmit.disabled) return;
    const numeric = /^\d{8}$/.test(challenge.answer);
    const value = numeric ? answer.value : answer.value.trim();
    if (value !== challenge.answer) {
      if (challenge.envelope) error.textContent = '猜错啦！！！不许偷看！！！';
      else error.textContent = numeric && !/^\d{8}$/.test(value) ? '请输入8位数字。' : '答案不对，再试一次。';
      answer.setAttribute('aria-invalid', 'true');
      answer.focus();
      return;
    }
    function revealPost() {
      if (!accessDialog.open || accessChallenge !== challenge) return;
      accessChallenge = null;
      accessDialog.close();
      challenge.unlock();
    }
    if (challenge.envelope && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      accessSubmit.disabled = true;
      accessDialog.classList.add('is-unfolding');
      setTimeout(revealPost, 360);
    } else {
      revealPost();
    }
  });

  function showChengSection(tab, section = chengSpace.querySelector('#blog-cheng-' + tab.dataset.chengView)) {
    for (const view of chengSpace.querySelectorAll('.blog-cheng-main > section')) view.hidden = view !== section;
    for (const button of chengTabs) button.removeAttribute('aria-current');
    tab.setAttribute('aria-current', 'page');
    if (tab === chengTabs[0] || section.id === 'blog-cheng-messages' || section.classList.contains('blog-cheng-article')) panel.scrollTop = 0;
    else section.scrollIntoView({block: 'nearest'});
  }

  for (const tab of chengTabs) tab.addEventListener('click', () => showChengSection(tab));
  const memoEntry = chengSpace.querySelector('#blog-cheng-memo-entry');
  for (const entry of chengSpace.querySelectorAll('[data-cheng-post]')) {
    const article = document.getElementById(entry.getAttribute('aria-controls'));
    function openArticle() {
      revealContent(article);
      showChengSection(chengTabs[1], article);
      article.querySelector('h2').focus({preventScroll: true});
      if (entry === memoEntry && memoUnlocked) window.ADOPTION_ACHIEVEMENTS.record('sealed-memo-opened');
    }
    entry.addEventListener('click', () => {
      if (entry !== memoEntry || memoUnlocked) {
        openArticle();
        return;
      }
      requestAccess({
        title: '† 封印の备忘录 †',
        question: '吾の降临之日？（8位数字）',
        answer: '19920131',
        unlock() {
          memoUnlocked = true;
          entry.removeAttribute('aria-haspopup');
          openArticle();
        }
      });
    });
    article.addEventListener('click', event => {
      if (!event.target.closest('[data-cheng-journal-back]')) return;
      showChengSection(chengTabs[1]);
      entry.focus();
    });
  }
  chengLink.addEventListener('click', event => {
    event.preventDefault();
    friendPostScroll = panel.scrollTop;
    space.hidden = true;
    chengSpace.hidden = false;
    musicButton.hidden = true;
    music.pause();
    panel.classList.remove('view-friend-space');
    panel.classList.add('view-cheng-space');
    showChengSection(chengTabs[0]);
    panel.querySelector('#blog-cheng-title').focus({preventScroll: true});
    if (chengMusicEnabled) playChengMusic();
  });
  panel.querySelector('#blog-cheng-back').addEventListener('click', () => {
    closeChengSpace();
    space.hidden = false;
    panel.classList.add('view-friend-space');
    chengLink.focus({preventScroll: true});
    panel.scrollTop = friendPostScroll;
    if (musicEnabled) playMusic();
  });

  window.ADOPTION_BLOG = {
    active: () => active,
    openSitePost() { requestPost(0); },
    enter() {
      active = true;
      visits += 1;
      panel.querySelector('#blog-visitor-count').textContent = String(visits).padStart(6, '0');
      try { localStorage.setItem(visitorKey, String(visits)); } catch {}
      showDirectory();
      if (musicEnabled) playMusic();
    },
    leave() {
      active = false;
      clearStudioRoute();
      accessChallenge = null;
      window.ADOPTION_ASSETS.release(music, true);
      window.ADOPTION_ASSETS.release(chengMusic, true);
      if (accessDialog.open) accessDialog.close();
      if (homeworkDialog.open) homeworkDialog.close();
    }
  };
})();
