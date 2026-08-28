(() => {
  const currentHeader = document.querySelector('header.bar');
  if (!currentHeader) return;

  // Na própria home, os links para seções da home não devem levar
  // "index.html" no href — isso forçaria um reload em vez de rolar a página.
  const naHome = /(^|\/)(index\.html)?$/.test(location.pathname);
  const home = ancora => (naHome ? '' : 'index.html') + ancora;

  // Capítulos pelo nome — o menu não usa "passo 1, passo 2".
  const CAPITULOS = [
    { nome: '1. Autoconhecimento', desc: 'O mercado financeiro é para você?', href: 'autoconhecimento.html' },
    { nome: '2. Opções de carreira', desc: '18 carreiras em um quadrante', href: 'quadrante-carreiras.html' },
    { nome: '3. A carreira ideal para você', desc: 'Como escolher e testar a escolha', href: 'carreira-certa.html' },
    { nome: '4. Lacunas de conhecimento', desc: 'O que estudar e o que não', href: 'formacao-certificacoes.html' },
    { nome: '5. Equity Story', desc: 'Por que contratar você', href: 'equity-story.html' },
    { nome: '6. Narrativa profissional', desc: 'Currículo, perfil e samples', href: 'cv-linkedin.html' },
    { nome: 'Processo seletivo', desc: 'Antes, durante e depois da entrevista', href: 'processo-seletivo-v2.html' }
  ];

  document.querySelector('.announcement')?.remove();

  currentHeader.className = 'bar global-bar';
  currentHeader.innerHTML = `
    <div class="bar-in">
      <div class="bar-left">
        <button class="global-menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">☰</button>
        <a class="mark" href="${home('#top')}" aria-label="Bankers Academy — início">
          <svg class="brand-mark" aria-hidden="true" viewBox="0 0 44 44"><path d="M13 2 22 11 13 20 4 11Z"/><path d="m31 2 9 9-9 9-9-9Z"/><path d="m13 22 9 9-9 9-9-9Z"/><path d="m31 22 9 9-9 9-9-9Z"/></svg>
          <span>Bankers Academy</span>
        </a>
      </div>
      <div class="bar-right">
        <nav class="main-nav" aria-label="Navegação principal">
          <div class="nav-drop">
            <a class="global-desktop-link nav-drop-link" href="${home('#metodo')}" aria-expanded="false" aria-haspopup="true">Conteúdos <span class="nav-drop-seta" aria-hidden="true">▾</span></a>
            <div class="nav-drop-menu">${CAPITULOS.map(capitulo => `
              <a href="${capitulo.href}"><span class="nav-drop-nome">${capitulo.nome}</span><span class="nav-drop-desc">${capitulo.desc}</span></a>`).join('')}
            </div>
          </div>
          <a class="global-desktop-link" href="perguntas-frequentes.html">Securato responde</a>
        </nav>
        <a class="bar-cta global-mobile-keep" href="${home('#comprar-livro')}">Comprar o livro</a>
      </div>
    </div>`;

  const nav = currentHeader.querySelector('.main-nav');
  const toggle = currentHeader.querySelector('.global-menu-toggle');
  const close = () => {
    nav.classList.remove('is-open', 'is-shown');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (open) {
      // duplo rAF: garante que o navegador já pintou o estado "recolhido"
      // antes de soltar o "is-shown" — senão não há transição para animar.
      requestAnimationFrame(() => requestAnimationFrame(() => nav.classList.add('is-shown')));
    } else {
      nav.classList.remove('is-shown');
    }
  });
  currentHeader.querySelectorAll('.bar-in a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) close();
  });
  addEventListener('resize', () => { if (innerWidth > 1250) close(); });
})();
