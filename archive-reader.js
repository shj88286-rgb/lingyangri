(() => {
  'use strict';

  function formatEmphasis(text, phrases = []) {
    return phrases.reduce((markup, phrase) => markup.replace(phrase, `<strong>${phrase}</strong>`), text);
  }

  function detailList(entries, emphasis) {
    return `<dl class="admin-details">${entries.map(([label, value]) =>
      `<div${label.endsWith('事由') ? ' class="admin-detail-wide"' : ''}><dt>${label}</dt><dd>${formatEmphasis(value, emphasis)}</dd></div>`).join('')}</dl>`;
  }

  const renderParagraphs = (paragraphs, emphasis) => paragraphs.map(text => {
    const markup = formatEmphasis(text, emphasis);
    return text.startsWith('记录：') ? `<p><em>${markup}</em></p>` : `<p>${markup}</p>`;
  }).join('');
  const renderSections = (sections, emphasis, className) => sections.map(([title, paragraphs]) =>
    `<section${className ? ` class="${className}"` : ''}><h2>${title}</h2>${renderParagraphs(paragraphs, emphasis)}</section>`
  ).join('');
  function fileMarkup(file, back, label) {
    return `<div class="admin-reader">
      <div class="admin-reader-toolbar"><a class="admin-button admin-button-outline" href="${back}">${label}</a></div>
      <article class="admin-card admin-file">
        <h1>${file.title}</h1>
        ${detailList(file.details, file.emphasis)}
        ${renderSections(file.sections, file.emphasis)}
        <div class="admin-file-closing">${renderParagraphs(file.closing)}</div>
      </article>
      <div class="admin-file-end"><a class="admin-button admin-button-outline" href="${back}">${label}</a></div>
    </div>`;
  }

  window.ADOPTION_ARCHIVE_READER = {detailList, renderSections, fileMarkup};
})();
