/*
  Chamada para o glossário: injeta a mesma faixa em todas as páginas de
  conteúdo, no fim da leitura e antes da faixa de captura.

  Os termos sugeridos por página são os que realmente aparecem naquele
  capítulo, e cada um abre o glossário já filtrado por ele.
*/
(() => {
  const TERMOS = {
    'autoconhecimento.html': [],
    'quadrante-carreiras.html': ['Buy Side', 'Sell Side', 'Research'],
    'carreira-certa.html': ['Banker', 'Fit', 'M&A'],
    'formacao-certificacoes.html': ['Research', 'Banker', 'Back Office'],
    'equity-story.html': ['Equity Story', 'Equity', 'IPO'],
    'cv-linkedin.html': ['Sample', 'Bio', 'Case'],
    'processo-seletivo-v2.html': ['Equity Story', 'Sample', 'Research'],
    'cargos-carreiras.html': ['Banker', 'M&A', 'Pitchbook ou Pitch'],
  };

  const pagina = ((location.pathname.split('/').pop() || '').replace(/\.html$/, '') || 'index') + '.html';
  const termos = TERMOS[pagina];
  if (!termos) return;

  const escapa = texto => texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const secao = document.createElement('aside');
  secao.className = 'glossario-cta';
  secao.setAttribute('aria-label', 'Glossário do livro');
  secao.innerHTML = `
    <div class="glossario-cta-in" data-reveal>
      <div>
        <p class="rot"><span class="lo" aria-hidden="true"></span> Glossário do livro</p>
        <h2>Não entendeu alguma palavra?</h2>
        <p>Alguns termos em inglês aparecem sem tradução porque é assim que o mercado os usa. Todos eles estão explicados, um a um, no glossário.</p>
        ${termos.length ? `<ul class="glossario-cta-termos">${termos.map(t =>
          `<li><a href="glossario.html?termo=${encodeURIComponent(t)}">${escapa(t)}</a></li>`).join('')}</ul>` : ''}
      </div>
      <div>
        <a class="glossario-cta-bt" href="glossario.html">Ver o glossário <span class="seta" aria-hidden="true">→</span></a>
      </div>
    </div>`;

  const captura = document.querySelector('.lead-strip');
  if (captura) captura.before(secao);
  else (document.querySelector('.qa-section') || document.querySelector('footer'))?.before(secao);
})();
