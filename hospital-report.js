(() => {
  'use strict';

  const main = document.querySelector('#hospital-content');
  const ending = window.ADOPTION_FIRST_ENDING;
  const portal = window.ADOPTION_HOSPITAL_PORTAL;
  const resetMail = window.ADOPTION_HOSPITAL_RESET;
  const sessionKey = 'adoption-day-hospital-patient-v1';
  const reportAccessKey = sessionKey + ':report-opened';
  const patientNames = ['雷哲铭', '雷淞然'];
  const resetPassword = '06283716';
  const reportTitle = '儿童伤情鉴定及心理评估报告';
  const reportFilename = '雷哲铭-' + reportTitle + '.pdf';
  const reportUrl = 'assets/medical/' + encodeURIComponent(reportFilename);
  const records = [
    ['2012-09-07', '儿童保健科', '青少年常规健康体检报告'],
    ['2011-04-18', '眼科', '视力检查及屈光筛查记录'],
    ['2010-08-12', '口腔科', '口腔健康检查记录'],
    ['2009-10-21', '儿童保健科', '儿童生长发育评估报告'],
    ['2008-09-26', '儿童心理卫生科', '心理健康随访记录'],
    ['2007-12-04', '儿童保健科', '年度健康检查报告'],
    ['2006-03-26', '儿童保健科／心理卫生科', reportTitle, '#report']
  ];
  const profile = [
    ['姓名', '雷淞然'], ['性别', '男'], ['出生日期', '1995年6月28日'],
    ['档案状态', '正常'], ['历史登记信息', '已关联']
  ];
  let authenticated = false;
  let accessedReport = false;
  try {
    authenticated = sessionStorage.getItem(sessionKey) === 'true';
    accessedReport = authenticated && sessionStorage.getItem(reportAccessKey) === 'true';
  } catch {}

  function setReportAccessed(value) {
    accessedReport = value;
    try {
      if (value) sessionStorage.setItem(reportAccessKey, 'true');
      else sessionStorage.removeItem(reportAccessKey);
    } catch {}
  }

  function renderAuthCard(title, content) {
    main.innerHTML = `<section class="admin-card admin-section hospital-auth-card">
      <h1>${title}</h1>
      ${content}
    </section>`;
  }

  function renderLogin() {
    renderAuthCard('个人健康档案', `<p>请登录京城市儿童医院患者健康档案服务平台。</p>
      <form id="hospital-login" class="admin-form" method="post">
        <label>姓名 <input name="patient" autocomplete="username" maxlength="40" required></label>
        <label>密码 <input name="passcode" type="text" inputmode="text" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="40" required></label>
        <div class="hospital-login-actions">
          <button class="admin-button admin-button-primary" type="submit">登录</button>
          <a id="hospital-forgot-password" href="#recover">忘记密码</a>
        </div>
        <p id="hospital-status" class="hospital-status" role="status"></p>
      </form>`);
    const form = main.querySelector('#hospital-login');
    const status = main.querySelector('#hospital-status');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const {patient, passcode} = form.elements;
      if (!resetMail.read() || !patientNames.includes(patient.value.trim()) || passcode.value !== resetPassword) {
        status.textContent = '姓名或密码不正确。';
        passcode.focus();
        return;
      }
      authenticated = true;
      try { sessionStorage.setItem(sessionKey, 'true'); } catch {}
      document.querySelector('#hospital-reset-toast').hidden = true;
      location.hash = '#health';
    });
  }

  function renderRecovery(phone) {
    const tabs = `<nav class="hospital-recovery-tabs" aria-label="密码找回方式">
      <a href="#recover-phone"${phone ? ' aria-current="page"' : ''}>手机找回</a>
      <a href="#recover"${phone ? '' : ' aria-current="page"'}>邮箱找回</a>
    </nav>`;
    const content = phone
      ? `<p>该患者档案暂未登记有效手机号码，请尝试通过预留邮箱找回，或联系医院服务窗口。</p>
        <div class="hospital-recovery-actions"><a href="#recover">返回邮箱找回</a><a href="#patient-login">返回登录</a></div>`
      : `<h2>通过预留电子邮箱找回密码</h2>
        <dl class="hospital-introductions">
          <div><dt>患者姓名</dt><dd>雷淞然</dd></div>
          <div><dt>预留邮箱</dt><dd>you***@pp.example</dd></div>
        </dl>
        <p>系统将根据患者建档时登记的信息进行身份核验。确认后，密码重置通知将发送至预留电子邮箱，请登录对应邮箱查收。</p>
        <div class="hospital-recovery-actions"><button type="button" id="hospital-recover">确认找回</button><a href="#patient-login">返回登录</a></div>
        <dialog id="hospital-reset-confirmation" aria-labelledby="hospital-reset-title">
          <h2 id="hospital-reset-title">确认重置登录密码？</h2>
          <form method="dialog">
            <p>系统将重置该患者账户的登录密码，并将相关通知发送至预留电子邮箱。是否继续？</p>
            <div class="hospital-recovery-actions">
              <button type="submit" value="confirm">确认重置</button>
              <button type="submit" value="cancel" autofocus>取消</button>
            </div>
          </form>
        </dialog>`;
    renderAuthCard('找回登录密码', `<div class="hospital-recovery">${tabs}${content}</div>`);
    if (phone) return;
    const dialog = main.querySelector('#hospital-reset-confirmation');
    main.querySelector('#hospital-recover').addEventListener('click', () => dialog.showModal());
    dialog.querySelector('form').addEventListener('submit', event => {
      if (event.submitter?.value !== 'confirm') return;
      event.preventDefault();
      const {date, isNew} = resetMail.reset();
      if (isNew) resetMail.playNotification();
      const toast = document.querySelector('#hospital-reset-toast');
      toast.href = resetMail.mailLink(date);
      toast.hidden = false;
      if (location.protocol === 'file:') window.opener?.postMessage({type: resetMail.key, date}, '*');
      dialog.close();
      location.hash = '#reset-complete';
    });
  }

  function renderResetComplete(date) {
    renderAuthCard('找回登录密码', `<div class="hospital-recovery">
      <h2>密码重置成功</h2>
      <p>密码重置通知已发送至预留的 PP 邮箱，请登录对应邮箱查收。</p>
      <div class="hospital-recovery-actions">
        <a href="${resetMail.mailLink(date, 'inbox')}">前往 PP 邮箱</a>
        <a href="#patient-login">返回登录</a>
      </div>
    </div>`);
  }

  function patientNav() {
    return `<nav class="hospital-patient-nav" aria-label="患者端导航">
      <a href="#health">个人健康档案</a><a href="#health">就诊记录</a>
      <button type="button" id="hospital-logout">退出登录</button>
    </nav>`;
  }

  function renderHealth() {
    const rows = records.map(([date, department, title, href]) => [
      date, department, title, '已归档', href ? `<a href="${href}">查看详情</a>` : '<span class="hospital-display-link">查看详情</span>'
    ]);
    main.innerHTML = patientNav() + portal.panel('个人健康档案查询', `<p><strong>欢迎您，雷淞然！</strong></p>
      <table class="hospital-table hospital-profile"><tbody>
        ${profile.map(([key, value]) => `<tr><th scope="row">${key}</th><td>${value}</td></tr>`).join('')}
      </tbody></table>`) + portal.panel('历史就诊记录', portal.table(['就诊日期', '就诊科室', '文书名称', '档案状态', '操作'], rows));
    main.querySelector('.hospital-table-wrap').classList.add('hospital-visit-records');
  }

  function renderReport() {
    main.innerHTML = patientNav() + `<section class="hospital-pdf">
      <p class="hospital-pdf-source">京城市儿童医院</p>
      <h1>《${reportTitle}》</h1>
      <p>检查日期：<time datetime="2006-03-26">2006年3月26日</time></p>
      <p class="hospital-pdf-note">本记录为历史医疗档案，原始姓名及检查信息按归档时内容展示。</p>
      <div class="hospital-pdf-actions">
        <button id="hospital-preview" type="button" aria-controls="hospital-pdf-viewer" aria-expanded="false">在线预览</button>
        <a href="${reportUrl}" id="hospital-download" download="${reportFilename}" target="_blank" rel="noopener">下载PDF</a>
        <a href="#health">返回档案</a>
      </div>
      <div id="hospital-pdf-viewer" hidden>
        <p>若浏览器无法预览，请使用「下载PDF」。</p>
        <object type="application/pdf" aria-label="${reportTitle}"></object>
      </div>
      <div class="hospital-pdf-actions"><a href="#health">返回个人健康档案</a></div>
    </section>`;
    const viewer = main.querySelector('#hospital-pdf-viewer');
    main.querySelector('#hospital-preview').addEventListener('click', event => {
      if (!viewer.hidden) {
        location.hash = '#health';
        return;
      }
      const pdf = viewer.querySelector('object');
      if (navigator.pdfViewerEnabled === false) pdf.hidden = true;
      else {
        pdf.data = reportUrl + '#view=FitH';
        setReportAccessed(true);
        window.ADOPTION_ACHIEVEMENTS.record('injury-pdf-opened');
      }
      viewer.hidden = false;
      event.currentTarget.setAttribute('aria-expanded', 'true');
      event.currentTarget.textContent = '退出预览';
    });
    main.querySelector('#hospital-download').addEventListener('click', () => {
      setReportAccessed(true);
      window.ADOPTION_ACHIEVEMENTS.record('injury-pdf-opened');
    });
  }

  const patientPages = ['patient-login', 'health', 'records', 'report', 'archive'];
  const recoveryPages = ['recover', 'recover-phone', 'reset-complete'];
  function render() {
    const [page, query] = (location.hash.slice(1) || 'home').split('?');
    if (page !== 'report' && accessedReport) {
      setReportAccessed(false);
      ending.recordRead('injury');
    }
    const isPatientPage = patientPages.includes(page);
    const isRecoveryPage = recoveryPages.includes(page);
    const sidebar = document.querySelector('#hospital-sidebar');
    const home = page === 'home';
    sidebar.hidden = home;
    if (!home) sidebar.innerHTML = portal.sidebar(page);
    document.querySelector('.hospital-layout').classList.toggle('hospital-full', home);
    document.querySelector('#patient-menu').open = false;
    document.title = (portal.labels[page] ? portal.labels[page] + ' · ' : '') + '京城市儿童医院';
    const active = ['project', 'notice', 'exchange'].includes(page) ? 'news' : isPatientPage || isRecoveryPage ? 'patient-login' : page;
    for (const link of document.querySelectorAll('.hospital-nav a')) {
      if (link.hash === '#' + active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }

    if (isRecoveryPage) {
      const date = resetMail.read();
      if (page === 'reset-complete' && date) renderResetComplete(date);
      else renderRecovery(page === 'recover-phone');
    } else if (isPatientPage) {
      if (!authenticated) renderLogin();
      else if (page === 'report') renderReport();
      else renderHealth();
      main.querySelector('#hospital-logout')?.addEventListener('click', () => {
        authenticated = false;
        try { sessionStorage.removeItem(sessionKey); } catch {}
        location.hash = '#service';
      });
    } else {
      const params = new URLSearchParams(query);
      main.innerHTML = portal.render(page, params);
      if (page === 'project' && params.get('from') === 'paper-plane') {
        window.ADOPTION_ACHIEVEMENTS.record('hospital-from-paper-report');
      }
      if (home) portal.bindHome(main);
    }
  }

  document.querySelector('#hospital-site-search').addEventListener('submit', event => {
    event.preventDefault();
    const {q, type} = event.currentTarget.elements;
    if (q.value.trim()) location.hash = '#search?' + new URLSearchParams({q: q.value.trim(), type: type.value});
  });
  function continueEndingFromHospital() {
    if (authenticated && location.hash.split('?')[0] === '#report') return;
    ending.redirectIfReady();
  }

  window.addEventListener('hashchange', () => {
    render();
    window.scrollTo(0, 0);
    main.focus({preventScroll: true});
    continueEndingFromHospital();
  });
  window.addEventListener('focus', continueEndingFromHospital);
  window.addEventListener('pageshow', continueEndingFromHospital);
  document.addEventListener('visibilitychange', continueEndingFromHospital);
  document.addEventListener('close', continueEndingFromHospital, true);
  render();
  continueEndingFromHospital();
})();

