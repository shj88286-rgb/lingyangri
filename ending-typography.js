(() => {
  'use strict';

  // Keep each clause together so cinematic copy wraps at punctuation.
  function paragraph(copy) {
    const node = document.createElement('p');
    node.className = 'cinematic-copy';
    const clauses = copy.match(/[\s\S]+?[，。！？；：、]+[”’」』）)]*|[\s\S]+$/gu) || [];
    for (const clause of clauses) {
      const span = document.createElement('span');
      span.className = 'cinematic-clause';
      span.textContent = clause;
      const units = [...clause].reduce((sum, letter) => sum + (/[^\u0000-\u00ff]/u.test(letter) ? 1 : .65), 0);
      span.style.setProperty('--clause-length', Math.max(1, units));
      node.append(span, document.createElement('wbr'));
    }
    return node;
  }

  window.ADOPTION_ENDING_TYPE = {paragraph};
})();
