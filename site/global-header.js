(() => {
  const currentHeader = document.querySelector('header.bar');
  if (!currentHeader) return;

  let announcement = document.querySelector('.announcement');
  if (!announcement) {
    announcement = document.createElement('div');
    currentHeader.before(announcement);
  }
  announcement.className = 'announcement global-announcement';
  announcement.innerHTML = '<div class="announcement-in"><span class="lo" aria-hidden="true"></span> Livro + formação prática para entrar no mercado financeiro <a href="index.html#academy">Conheça a jornada</a></div>';

  currentHeader.className = 'bar global-bar';
  currentHeader.innerHTML = `
    <div class="bar-in">
      <a class="mark" href="index.html#top" aria-label="Bankers Academy — início">
        <svg class="brand-mark" aria-hidden="true" viewBox="0 0 44 44"><path d="M13 2 22 11 13 20 4 11Z"/><path d="m31 2 9 9-9 9-9-9Z"/><path d="m13 22 9 9-9 9-9-9Z"/><path d="m31 22 9 9-9 9-9-9Z"/></svg>
        <span>Bankers Academy</span>
      </a>
      <nav class="main-nav" aria-label="Navegação principal">
        <button class="global-menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">☰</button>
        <a class="global-desktop-link" href="index.html#top">O livro</a>
        <a class="global-desktop-link" href="index.html#metodo">Os 6 passos</a>
        <a class="global-desktop-link" href="perguntas-frequentes.html">Perguntas &amp; respostas</a>
        <a class="global-desktop-link" href="index.html#autor">Sobre o autor</a>
        <a class="bar-buy global-mobile-keep" href="index.html#comprar"><span class="global-desktop-label">Comprar o livro</span><span class="global-mobile-label">Comprar</span></a>
        <a class="bar-cta global-mobile-keep" href="https://bankers-academy-ztu1.vercel.app/"><span class="global-desktop-label">Começar minha formação</span><span class="global-mobile-label">Cursos</span></a>
      </nav>
    </div>`;

  const nav = currentHeader.querySelector('.main-nav');
  const toggle = nav.querySelector('.global-menu-toggle');
  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  addEventListener('resize', () => { if (innerWidth > 760) close(); });
})();
