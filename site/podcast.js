/*
  Corte do podcast "Trabalhe & Aprenda" (canal youtube.com/@securato), injetado
  nas páginas de capítulo cujo assunto tem uma correspondência real e clara com
  algum corte já publicado no canal. Páginas sem correspondência boa ficam de
  fora: melhor não ter do que forçar um vídeo que não tem a ver.
*/
(() => {
  const PODCASTS = {
    'quadrante-carreiras.html': {
      titulo: 'Como mentores transformam uma carreira',
      convidado: 'Corte do podcast, com o advogado Pierre Moreau',
      vid: 'f1Tlx-KVl30',
    },
    'carreira-certa.html': {
      titulo: 'Uma mensagem direta sobre carreiras',
      convidado: 'Corte do podcast, com José Roberto Securato Junior',
      vid: 'DclDX41mI6I',
    },
    'cv-linkedin.html': {
      titulo: 'Faculdade não é só sobre diploma: é sobre networking',
      convidado: 'Corte do podcast, com Camila Securato',
      vid: '8PMbjkc9o_M',
    },
  };

  const pagina = ((location.pathname.split('/').pop() || '').replace(/\.html$/, '') || 'index') + '.html';
  const dados = PODCASTS[pagina];
  if (!dados) return;

  const bloco = document.createElement('section');
  bloco.className = 'podcast-corte';
  bloco.setAttribute('aria-label', 'Corte do podcast relacionado');
  bloco.innerHTML = `
    <div class="podcast-in" data-reveal>
      <div class="podcast-video">
        <iframe src="https://www.youtube.com/embed/${dados.vid}" title="${dados.titulo}"
          loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      <div class="podcast-texto">
        <p class="rot"><span class="lo" aria-hidden="true"></span> Ouça também</p>
        <h3>${dados.titulo}</h3>
        <p>${dados.convidado} · canal <a href="https://www.youtube.com/@securato" target="_blank" rel="noopener">@securato</a> no YouTube.</p>
      </div>
    </div>`;

  const ponte = document.querySelector('.ponte-cap');
  if (ponte) ponte.after(bloco);
  else (document.querySelector('.qa-section') || document.querySelector('footer'))?.before(bloco);
})();
