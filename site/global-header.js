(() => {
  const currentHeader = document.querySelector('header.bar');
  if (!currentHeader) return;

  // Na própria home, os links para seções da home não devem levar
  // "index.html" no href — isso forçaria um reload em vez de rolar a página.
  const naHome = /(^|\/)(index\.html)?$/.test(location.pathname);
  const home = ancora => (naHome ? '' : 'index.html') + ancora;

  // Capítulos pelo nome — o menu não usa "passo 1, passo 2".
  const CAPITULOS = [
    { nome: 'Autoconhecimento', desc: 'O mercado financeiro é para você?', href: 'autoconhecimento.html' },
    { nome: 'O mapa das carreiras', desc: '18 carreiras em um quadrante', href: 'quadrante-carreiras.html' },
    { nome: 'A carreira certa', desc: 'Como escolher e testar a escolha', href: 'carreira-certa.html' },
    { nome: 'Formação e certificações', desc: 'O que estudar e o que não', href: 'formacao-certificacoes.html' },
    { nome: 'Equity Story', desc: 'Por que contratar você', href: 'equity-story.html' },
    { nome: 'CV e LinkedIn', desc: 'Currículo, perfil e samples', href: 'cv-linkedin.html' },
    { nome: 'Processo seletivo', desc: 'Antes, durante e depois da entrevista', href: 'processo-seletivo-v2.html' }
  ];

  let announcement = document.querySelector('.announcement');
  if (!announcement) {
    announcement = document.createElement('div');
    currentHeader.before(announcement);
  }
  announcement.className = 'announcement global-announcement';
  announcement.innerHTML = `<div class="announcement-in"><span class="lo" aria-hidden="true"></span> Livro + formação prática para entrar no mercado financeiro <a href="${home('#academy')}">Conheça a jornada</a></div>`;

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
            <a class="global-desktop-link nav-drop-link" href="${home('#metodo')}" aria-expanded="false" aria-haspopup="true">Entrando no mercado financeiro <span class="nav-drop-seta" aria-hidden="true">▾</span></a>
            <div class="nav-drop-menu">${CAPITULOS.map(capitulo => `
              <a href="${capitulo.href}"><span class="nav-drop-nome">${capitulo.nome}</span><span class="nav-drop-desc">${capitulo.desc}</span></a>`).join('')}
            </div>
          </div>
          <a class="global-desktop-link" href="no-mercado-financeiro.html">No mercado financeiro</a>
          <a class="global-desktop-link" href="perguntas-frequentes.html">Respostas do Securato</a>
        </nav>
        <a class="bar-buy global-mobile-keep" href="https://www.tabula.com.br/conteudista/bankers.academy"><span class="global-desktop-label">Começar minha formação</span><span class="global-mobile-label">Cursos</span></a>
        <a class="bar-cta global-mobile-keep" href="${home('#comprar')}"><span class="global-desktop-label">Comprar o livro</span><span class="global-mobile-label">Comprar</span></a>
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
