/*
  Rodapé único do site. O mesmo markup da home é injetado em todas as páginas,
  para não existirem dois rodapés diferentes para manter.

  A página que já tem um <footer> tem o conteúdo substituído; as demais recebem
  um no fim do body.
*/
(() => {
  const pagina = ((location.pathname.split('/').pop() || '').replace(/\.html$/, '') || 'index') + '.html';
  const INICIO = pagina === 'index.html' ? '' : 'index.html';

  const markup = `
<div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="footer-brand" href="${INICIO}#top" aria-label="Bankers Academy — início">
          <svg class="footer-mark" aria-hidden="true" viewBox="0 0 44 44"><path d="M13 2 22 11 13 20 4 11Z"/><path d="m31 2 9 9-9 9-9-9Z"/><path d="m13 22 9 9-9 9-9-9Z"/><path d="m31 22 9 9-9 9-9-9Z"/></svg>
          <span>Bankers Academy</span>
        </a>
        <p class="footer-about">Academia de finanças que forma e transforma pessoas através da educação com excelência.</p>
        <div class="footer-contacts">
          <a href="mailto:admin@bankersacademy.com.br">admin@bankersacademy.com.br</a>
          <a href="https://wa.me/5511990070784">+55 11 99007-0784</a>
        </div>
        <div class="social">
          <a href="https://instagram.com/bankersacademy.br" aria-label="Bankers Academy no Instagram" title="Instagram" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a href="https://www.linkedin.com/company/bankers-academy/" aria-label="Bankers Academy no LinkedIn" title="LinkedIn" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6.2 8.2V19M6.2 5.2v.1M10.7 19v-9M10.7 13c.8-3.1 6.5-3.3 6.5 1.4V19"/></svg></a>
          <a href="https://open.spotify.com/show/4uqQfSTTGmfJZBRE1aXgCv" aria-label="Bankers Academy no Spotify" title="Spotify" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M7.5 10.1c3.6-1.1 7.3-.7 9.8.7M8.2 13.1c2.9-.8 5.9-.5 8.2.7M8.8 16c2.3-.6 4.6-.3 6.4.6"/></svg></a>
          <a href="https://www.youtube.com/@securato" aria-label="Bankers Academy no YouTube" title="YouTube" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 12c0 2.2-.2 4.2-.6 5-.3.6-.8 1.1-1.5 1.3-1.4.4-5.1.5-6.9.5s-5.5-.1-6.9-.5c-.7-.2-1.2-.7-1.5-1.3C3.2 16.2 3 14.2 3 12s.2-4.2.6-5c.3-.6.8-1.1 1.5-1.3 1.4-.4 5.1-.5 6.9-.5s5.5.1 6.9.5c.7.2 1.2.7 1.5 1.3.4.8.6 2.8.6 5Z"/><path d="m10 9 5 3-5 3Z"/></svg></a>
        </div>
      </div>
      <div>
        <h2>O livro</h2>
        <ul><li><a href="${INICIO}#metodo">Os 6 passos</a></li><li><a href="perguntas-frequentes.html">Respostas do Securato</a></li><li><a href="${INICIO}#comprar">Onde comprar</a></li><li><a href="${INICIO}#autor">Securato Jr.</a></li></ul>
      </div>
      <div>
        <h2>Formação</h2>
        <ul><li><a href="https://bankers-academy-ztu1.vercel.app/#programas">Programas</a></li><li><a href="https://bankers-academy-ztu1.vercel.app/encontre-seu-programa">Encontre seu programa</a></li><li><a href="https://www.tabula.com.br/conteudista/bankers.academy">Cursos on-line</a></li><li><a href="${INICIO}#academy">Bankers Academy</a></li></ul>
      </div>
      <div>
        <h2>Institucional</h2>
        <ul><li><a href="https://bankers-academy-ztu1.vercel.app/quem-somos">Quem somos</a></li><li><a href="https://www.linkedin.com/in/josesecurato/">Securato Jr.</a></li><li><a href="mailto:admin@bankersacademy.com.br">Contato</a></li><li><a href="mailto:admin@bankersacademy.com.br">admin@bankersacademy.com.br</a></li></ul>
      </div>
    </div>
    <div class="footer-bottom"><span>© 2026 Bankers Academy — Todos os direitos reservados.</span><span>Livro publicado pela Oficina do Livro</span></div>
  </div>
`;

  let rodape = document.querySelector('footer');
  if (!rodape) {
    rodape = document.createElement('footer');
    document.body.append(rodape);
  }
  rodape.className = 'rodape-global';
  rodape.innerHTML = markup;
})();
