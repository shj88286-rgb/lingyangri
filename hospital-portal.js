(() => {
  'use strict';

  const article = window.ADOPTION_HOSPITAL_NEWS;
  const project = [article.date, '儿童心理健康支持项目工作纪实', '#project'];
  const news = [
    ['2025-11-21', '京城市儿童医院开展冬季儿童呼吸道疾病防治专题培训'],
    ['2025-10-16', '我院组织开展儿童营养与健康管理专题交流活动'],
    ['2025-09-25', '儿童保健科举办儿童生长发育健康科普讲座'],
    ['2025-08-12', '京城市儿童医院持续推进便民就医服务优化'],
    ['2025-06-20', '我院开展儿童心理健康专业能力提升培训'],
    ['2025-05-28', '京城市儿童医院举办儿童节健康关爱活动'],
    ['2025-03-14', '医院组织开展春季传染病防控专题工作会议'],
    ['2024-12-19', '京城市儿童医院召开年度医疗质量与安全工作总结会'],
    project
  ];
  const notices = [
    ['2025-12-24', '关于元旦假期门诊安排的通知'],
    ['2025-11-26', '关于冬季门诊服务时间调整的通知'],
    ['2025-10-08', '关于进一步优化儿童门诊就医流程的公告'],
    ['2025-09-02', '2025年秋季儿童健康体检服务安排'],
    ['2025-07-17', '关于暑期门诊就诊高峰的温馨提示'],
    ['2025-06-11', '关于开展儿童健康管理专题咨询活动的通知'],
    ['2025-04-03', '清明节期间门诊工作安排'],
    ['2025-02-12', '关于更新门诊楼服务指引的公告'],
    ['2025-01-20', '春节期间门急诊服务安排公告']
  ];
  const media = [
    ['2025-12-15', '冬日儿科门诊见闻｜走访呼吸科候诊区'],
    ['2025-11-12', '一张导诊图，带家长走完儿童门诊流程'],
    ['2025-10-17', '镜头下的儿科｜跟访儿童康复训练室'],
    ['2025-09-25', '生长发育讲座现场｜家长最常问的几件事'],
    ['2025-08-27', '从挂号到取报告｜暑期门诊服务走访'],
    ['2025-07-08', '走进儿童心理卫生科｜一次关于倾听的采访'],
    ['2025-06-03', '儿童节活动现场｜义诊桌旁的亲子问答'],
    ['2025-05-15', '儿科诊室之外｜社区里的儿童保健课堂'],
    ['2025-03-21', '检验报告出炉前｜探访医院医学检验科']
  ];
  const exchange = [
    ['2025-10-24', '我院举办儿童心理卫生临床实践交流会议'],
    ['2025-08-07', '儿童保健科开展儿童早期发展专题业务学习'],
    ['2025-05-15', '京城市儿童医院组织儿科常见疾病诊疗规范培训'],
    ['2024-11-13', '儿童康复医学科举办多学科协作病例讨论会'],
    ['2024-07-09', '我院开展儿童健康评估与长期随访工作交流']
  ];
  const cooperation = [
    ['2025-09-18', '京城市儿童医院开展儿童福利机构健康支持交流活动'],
    ['2023-05-26', '我院组织儿童健康公益咨询服务'],
    ['2019-11-15', '儿童心理健康支持工作经验交流活动顺利举行'],
    ['2015-06-02', '京城市儿童医院开展儿童节健康关怀活动'],
    ['2011-09-21', '医院持续推进儿童福利机构专业支持工作'],
    project
  ];
  const departments = [
    ['普通儿科', '开展儿童常见病、多发病的门诊诊疗及健康咨询。'],
    ['儿童保健科', '开展儿童生长发育评估、营养指导、健康检查及相关保健服务。'],
    ['儿童心理卫生科', '开展儿童情绪、行为及心理发展相关评估、咨询和专业支持。'],
    ['康复医学科', '为具有康复需求的儿童提供功能评估、康复指导及相关服务。'],
    ['儿童神经内科', '开展儿童神经系统相关疾病的诊疗及健康管理。'],
    ['儿童呼吸科', '开展儿童呼吸系统疾病的专科诊疗及相关健康教育。'],
    ['儿童消化科', '开展儿童消化系统常见疾病的诊疗及营养相关咨询。'],
    ['医学检验科', '承担临床检验及相关医学检测工作。']
  ];
  const programs = [
    ['儿童健康关爱计划', '面向有需要的儿童群体开展基础健康检查、健康教育及专业咨询。'],
    ['儿童心理健康支持项目', '与相关儿童福利机构开展合作，提供心理健康专业支持、人员指导及必要的医疗转介服务。'],
    ['校园健康科普行动', '结合季节性儿童健康问题，面向学校开展健康教育及相关宣传活动。'],
    ['儿童生长发育关怀项目', '围绕儿童营养、生长发育及日常健康管理开展科普与专业支持。'],
    ['儿童康复支持行动', '加强康复相关专业服务与公益合作，为有需要的儿童提供适宜支持。']
  ];
  const patientLink = '#patient-login';
  const services = ['预约挂号', '门诊排班', '检验检查', '个人健康档案', '住院服务', '就诊指南', '医保服务', '常见问题'];
  const guides = ['门诊时间', '就诊流程', '预约挂号', '检查报告', '住院须知', '交通路线', '联系我们', '患者服务入口'];
  const aboutMenu = ['医院简介', '医院文化', '医院环境', '医疗服务', '医院荣誉', '联系我们'];
  const healthTopics = ['儿童秋冬季呼吸道疾病预防知识', '如何帮助儿童养成良好的睡眠习惯', '儿童日常营养与合理膳食建议', '关注儿童情绪变化与心理健康', '儿童户外活动安全注意事项'];
  const featured = ['儿童健康科普', '医疗质量与安全', '公益医疗服务', '儿童心理健康', '儿童康复与照护', '校园健康行动'];
  const contactFields = [
    ['医院名称', '京城市儿童医院'], ['医院地址', '京城市安和区惠民路18号'], ['邮政编码', '100000'],
    ['门诊咨询', '010-0000-0628'], ['患者服务', '010-0000-3716'], ['办公时间', '周一至周五 08:00—17:00']
  ];
  const aboutText = [
    '京城市儿童医院是一所以儿童医疗、保健及康复服务为主要业务方向的综合性儿童专科医疗机构，承担儿童常见疾病诊疗、儿童健康管理、专科医疗服务及相关公共卫生支持工作。',
    '医院设有普通儿科、儿童保健科、儿童心理卫生科、康复医学科等专业科室，围绕不同年龄阶段儿童的健康需求，开展门诊诊疗、健康检查、专业评估、康复指导及健康教育等工作。',
    '近年来，医院持续推进儿童医疗服务质量提升，加强专科之间的协作，并通过健康科普、公益活动及专业合作等形式，为儿童及其家庭提供必要的健康支持。',
    '医院坚持以儿童健康需求为中心，不断完善医疗服务流程及相关支持体系，努力为儿童提供安全、规范、连续的医疗保健服务。'
  ];
  const archiveHeadings = ['登记姓名', '证件号码', '资料类别', '领取情况'];
  const linkText = (title, href) => href ? `<a href="${href}">${title}</a>` : `<span class="hospital-display-link">${title}</span>`;
  const menu = (items, links = {}) => `<ul class="hospital-menu">${items.map(title => `<li>${linkText(title, links[title])}</li>`).join('')}</ul>`;
  const panel = (title, body) => `<section class="hospital-box"><h2>${title}</h2><div class="hospital-box-body">${body}</div></section>`;
  const rows = entries => `<ul class="hospital-news-list">${entries.map(([date, title, href]) =>
    `<li>${linkText(title, href)}<time datetime="${date}">[${date}]</time></li>`).join('')}</ul>`;
  const paragraphs = items => items.map(text => `<p>${text}</p>`).join('');
  const introductions = items => `<dl class="hospital-introductions">${items.map(([title, body]) => `<div><dt>${title}</dt><dd>${body}</dd></div>`).join('')}</dl>`;
  const table = (headers, records) => `<div class="hospital-table-wrap"><table class="hospital-table">
    <thead><tr>${headers.map(title => `<th scope="col">${title}</th>`).join('')}</tr></thead>
    <tbody>${records.map(record => `<tr>${record.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
  const tabData = [['医院新闻', news], ['媒体聚焦', media], ['通知公告', notices]];
  const categories = [['医院新闻', '#news'], ['通知公告', '#notice'], ['学术交流', '#exchange']];
  const newsTabs = tabs => `<div class="hospital-news-tabs">${tabs.map(([title], index) =>
    `<button type="button" data-news-tab="${index}" aria-pressed="${index === 0}">${title}</button>`).join('')}</div>`;

  function home() {
    return `<div class="hospital-home">
      <div>
        ${panel('就医指南', menu(guides, {'联系我们': '#contact', '患者服务入口': '#service'}))}
        ${panel('健康科普', menu(healthTopics))}
        ${panel('院务信息', menu(['医院概况', '特色科室', '公益与协作'], {'医院概况': '#about', '特色科室': '#departments', '公益与协作': '#cooperation'}))}
      </div>
      <div>
        <figure class="hospital-hero"><img src="assets/hospital-exterior.webp?v=sign" alt="京城市儿童医院门诊楼" width="900" height="506" fetchpriority="high">
          <figcaption>京城市儿童医院 · 门诊楼</figcaption></figure>
        <section class="hospital-box">${newsTabs(tabData)}<div class="hospital-box-body" id="hospital-home-news">${rows(news)}</div></section>
      </div>
      <div>
        ${panel('患者服务平台', menu(['报告查询', '个人健康档案', '忘记密码'], {'个人健康档案': patientLink}))}
        ${panel('通知公告', menu(notices.slice(0, 4).map(([, title]) => title)))}
        ${panel('门诊安排', menu(['门诊时间', '门诊排班']))}
        ${panel('专题专栏', menu(featured))}
      </div>
      <div class="hospital-home-services">
        ${panel('便民服务', menu(['预约挂号', '检查报告', '个人健康档案', '就诊指南'], {'个人健康档案': patientLink}))}
      </div>
    </div>`;
  }

  function projectDetail() {
    const back = window.ADOPTION_FIRST_ENDING.withProgress('orphanage.html?article=paper-plane#related-report');
    return `<nav class="hospital-breadcrumb" aria-label="当前位置"><a href="#home">首页</a> › <a href="#news">医院新闻</a> › 新闻详情</nav>
      <article class="hospital-article">
        <h1>${article.title}</h1>
        <div class="hospital-article-meta"><span>发布日期：<time datetime="${article.date}">2007年11月28日</time></span><span>来源：${article.source}</span><span>栏目：医院新闻</span></div>
        ${paragraphs(article.paragraphs)}
        ${panel('活动资料', introductions(article.activity))}
        ${panel('纪念资料领取登记（节选）', `<p>以下为本次活动部分纪念画册及作品资料的领取登记信息。为保护参与人员隐私，姓名及证件号码已作部分隐藏处理。</p>
          ${table(archiveHeadings, article.registration)}
          <p><strong>资料管理说明：</strong> 以上登记信息仅用于活动纪念资料的领取核对。涉及儿童个人健康状况、专业评估结果及其他医疗信息的记录，按照医院相关档案管理规定另行保存，不属于本次公开资料范围。</p>`)}
        ${panel('相关新闻', `<p><a href="${back}">秋叶孤儿院开展“纸飞机”儿童绘画与情绪表达活动</a> <time datetime="2007-11-26">2007年11月26日</time>｜秋叶孤儿院</p>`)}
      </article>`;
  }

  function renderSearch(params) {
    const query = (params.get('q') || '').trim().slice(0, 60);
    const category = params.get('type') || 'all';
    const form = document.querySelector('#hospital-site-search');
    form.elements.q.value = query;
    form.elements.type.value = ['news', 'departments', 'notice'].includes(category) ? category : 'all';
    const catalog = [
      ...[...news, ...media, ...exchange].map(([date, title, href]) => [date, title, href, 'news']),
      ...notices.map(entry => [...entry, undefined, 'notice']),
      ...departments.map(([title, description]) => ['', title, undefined, 'departments', description]),
      ['', '门诊时间', undefined, 'all'], ['', '个人健康档案', patientLink, 'all']
    ];
    const found = query ? catalog.filter(([, title,, type, description]) => {
      const text = title + (description || '') + (title === project[1] ? '纸飞机 儿童保健科 创伤干预 ' + article.title : '') +
        (title === '儿童心理卫生科' ? '儿童心理科' : '');
      return (category === 'all' || category === type) && text.toLowerCase().includes(query.toLowerCase());
    }) : [];
    const result = found.length ? `<ul class="hospital-news-list">${found.map(([date, title, href]) => `<li>${linkText(title, href)}${date ? `<time datetime="${date}">[${date}]</time>` : ''}</li>`).join('')}</ul>`
      : '<p>未找到匹配的信息。</p>';
    return panel('站内搜索结果', result);
  }

  const labels = {home: '首页', about: '医院概况', news: '新闻动态', notice: '通知公告', exchange: '学术交流',
    project: article.title, departments: '特色科室', cooperation: '公益与协作', service: '患者服务', contact: '联系我们'};
  function render(page, params) {
    switch (page) {
      case 'home': return home();
      case 'project': return projectDetail();
      case 'news': return panel('医院新闻', rows(news));
      case 'notice': return panel('通知公告', rows(notices));
      case 'exchange': return panel('学术交流', rows(exchange));
      case 'about': return `<div class="hospital-about">${panel('医院简介', paragraphs(aboutText))}${panel('医院概况', menu(aboutMenu))}</div>`;
      case 'departments': return panel('特色科室', introductions(departments));
      case 'cooperation': return panel('项目介绍', '<p>京城市儿童医院积极参与儿童健康公益服务，持续加强与儿童福利机构、学校及相关社会组织的交流合作，通过健康检查、专业指导、健康科普和医疗支持等方式，推动儿童健康服务向有需要的群体延伸。</p>' + introductions(programs)) + panel('合作动态', rows(cooperation));
      case 'service': return panel('患者服务', `<div class="hospital-service-grid">${menu(services, {'个人健康档案': patientLink})}</div>`);
      case 'contact': return panel('联系我们', introductions(contactFields) + menu(['交通指引', '门诊楼分布', '院内服务设施', '意见与建议']));
      case 'registration': return panel('患者账户', '<p>患者健康档案使用院内登记账户。已登记的患者可直接进入<a href="#patient-login">个人健康档案</a>。</p>');
      case 'bookmark': return panel('加入收藏', '<p>可通过浏览器菜单收藏本网站，或在电脑上按 Ctrl+D。</p>');
      case 'english': return panel('Jingcheng Children’s Hospital', '<p>Welcome to Jingcheng Children’s Hospital. The Patient Services section provides access to personal health records.</p>');
      case 'search': return renderSearch(params);
      default: return home();
    }
  }

  function sidebar(page) {
    if (['news', 'project', 'notice', 'exchange'].includes(page)) {
      return panel('新闻动态', menu(categories.map(([title]) => title), Object.fromEntries(categories)));
    }
    if (page === 'about') return panel('医院概况', menu(aboutMenu));
    if (page === 'departments') return panel('特色科室', menu(departments.map(([title]) => title)));
    if (page === 'cooperation') return panel('公益与协作', menu(['项目介绍', '合作动态']));
    return panel('服务导航', menu(services, {'个人健康档案': patientLink}));
  }

  function bindHome(main) {
    for (const tab of main.querySelectorAll('[data-news-tab]')) {
      tab.addEventListener('click', () => {
        for (const button of main.querySelectorAll('[data-news-tab]')) button.setAttribute('aria-pressed', String(button === tab));
        main.querySelector('#hospital-home-news').innerHTML = rows(tabData[Number(tab.dataset.newsTab)][1]);
      });
    }
  }

  window.ADOPTION_HOSPITAL_PORTAL = {render, sidebar, labels, panel, table, bindHome};
})();
