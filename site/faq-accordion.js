(() => {
  const makeDetails = (question, answerNodes) => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const answer = document.createElement('div');
    answer.className = 'answer';
    summary.innerHTML = `<span class="num"></span><span class="question">${question}</span><span class="plus" aria-hidden="true">+</span>`;
    answerNodes.forEach(node => answer.append(node));
    details.append(summary, answer);
    return details;
  };

  document.querySelectorAll('.qa > .par').forEach(block => {
    const question = block.querySelector('.q');
    if (!question) return;
    const answers = [...block.querySelectorAll('.a')].map(node => {
      const p = document.createElement('p');
      p.innerHTML = node.innerHTML;
      return p;
    });
    block.replaceWith(makeDetails(question.innerHTML, answers));
  });

  document.querySelectorAll('.leitura#perguntas .quads').forEach(list => {
    list.classList.add('qa');
    list.querySelectorAll(':scope > .quad').forEach(block => {
      const question = block.querySelector('h3');
      const answers = [...block.querySelectorAll('p')].map(node => node.cloneNode(true));
      if (question) block.replaceWith(makeDetails(question.innerHTML, answers));
    });
  });

  document.querySelectorAll('.faq').forEach(list => list.classList.add('qa'));
  const questions = [...document.querySelectorAll('.qa details')];
  questions.forEach(question => {
    question.removeAttribute('open');
    const summary = question.querySelector('summary');
    if (!summary) return;
    if (!summary.querySelector('.question')) {
      const content = [...summary.children].find(node => !node.classList.contains('num') && !node.classList.contains('plus') && !node.classList.contains('lo'));
      const cleanSummary = summary.cloneNode(true);
      cleanSummary.querySelectorAll('.num,.plus,.lo').forEach(node => node.remove());
      const text = content ? content.innerHTML : cleanSummary.innerHTML.trim();
      summary.innerHTML = `<span class="num"></span><span class="question">${text}</span><span class="plus" aria-hidden="true">+</span>`;
    }
    const siblings = [...question.parentElement.querySelectorAll(':scope > details')];
    const number = summary.querySelector('.num');
    if (number) number.textContent = String(siblings.indexOf(question) + 1).padStart(2, '0');
    const response = question.querySelector('.resp');
    if (response) response.className = 'answer';
  });

  const pageQuestions = {
    'autoconhecimento.html': '.qa-section .qa details',
    'quadrante-carreiras.html': '.qa-section .qa details',
    'carreira-certa.html': '.qa details',
    'formacao-certificacoes.html': '.qa details',
    'equity-story.html': '.faq details',
    'cv-linkedin.html': '.qa details',
    'processo-seletivo-v2.html': '.faq details'
  };
  const currentPage = location.pathname.split('/').pop();
  const currentSelector = pageQuestions[currentPage];
  if (currentSelector) {
    [...document.querySelectorAll(currentSelector)].forEach((question, index) => {
      question.id = `pergunta-${index + 1}`;
    });
  }

  const sourceMap = {
    'capitulo-2': ['autoconhecimento.html#pergunta-1', 'autoconhecimento.html#pergunta-2'],
    'capitulo-3': ['quadrante-carreiras.html#pergunta-1', 'quadrante-carreiras.html#pergunta-4'],
    'capitulo-4': ['carreira-certa.html#pergunta-1', 'carreira-certa.html#perguntas'],
    'capitulo-5': ['equity-story.html#pergunta-1', 'equity-story.html#pergunta-3'],
    'capitulo-6': ['cv-linkedin.html#pergunta-2', 'cv-linkedin.html#pergunta-4'],
    'capitulo-7': ['processo-seletivo-v2.html#pergunta-1', 'processo-seletivo-v2.html#pergunta-2'],
    'formacao': ['formacao-certificacoes.html#pergunta-1', 'formacao-certificacoes.html#pergunta-3']
  };
  document.querySelectorAll('.group').forEach(group => {
    const sources = sourceMap[group.id];
    if (!sources) return;
    group.querySelectorAll('.qa details').forEach((question, index) => {
      const answer = question.querySelector('.answer');
      if (!answer || !sources[index]) return;
      const link = document.createElement('a');
      link.className = 'answer-source';
      link.href = sources[index];
      link.textContent = 'Aprofundar esta resposta no capítulo →';
      answer.append(link);
    });
  });

  questions.forEach(question => question.addEventListener('toggle', () => {
    const plus = question.querySelector('.plus');
    if (plus) plus.textContent = question.open ? '−' : '+';
    if (!question.open) return;
    [...question.parentElement.querySelectorAll(':scope > details')].forEach(other => {
      if (other !== question) other.removeAttribute('open');
    });
  }));

  if (location.hash.startsWith('#pergunta-')) {
    const target = document.querySelector(location.hash);
    if (target?.matches('details')) {
      target.open = true;
      requestAnimationFrame(() => target.scrollIntoView({block:'center'}));
    }
  }
})();

/*
  Grupos de perguntas (capítulo 7): o clique no título mostra ou esconde
  as perguntas daquele grupo. Ao fechar, as respostas abertas se fecham junto.
*/
(() => {
  document.querySelectorAll('.faq-grupo-cab').forEach(cabecalho => {
    const lista = document.getElementById(cabecalho.getAttribute('aria-controls'));
    if (!lista) return;
    cabecalho.addEventListener('click', () => {
      const aberto = cabecalho.getAttribute('aria-expanded') === 'true';
      cabecalho.setAttribute('aria-expanded', String(!aberto));
      lista.hidden = aberto;
      if (aberto) lista.querySelectorAll('details[open]').forEach(d => { d.open = false; });
    });
  });
})();
