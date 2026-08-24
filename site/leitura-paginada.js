/*
  Vira as páginas de um capítulo — mesmo efeito 3D do carrossel da home,
  mas sem autoplay: o leitor manda, no próprio ritmo.

  Marcação esperada:
  <div class="livro-paginas" data-livro>
    <section class="livro-pg">...</section>
    <section class="livro-pg">...</section>
  </div>
  <div class="livro-nav">
    <button data-livro-prev>...</button>
    <span data-livro-contador></span>
    <button data-livro-next>...</button>
  </div>
*/
(() => {
  document.querySelectorAll('[data-livro]').forEach(livro => {
    const paginas = [...livro.querySelectorAll('.livro-pg')];
    if (paginas.length < 2) { paginas[0]?.classList.add('is-active'); return; }

    const nav = livro.parentElement.querySelector('.livro-nav') || livro.nextElementSibling;
    const btnPrev = nav?.querySelector('[data-livro-prev]');
    const btnNext = nav?.querySelector('[data-livro-next]');
    const contador = nav?.querySelector('[data-livro-contador]');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let atual = 0;
    paginas[0].classList.add('is-active');

    const atualizarContador = () => {
      if (contador) contador.textContent = `Página ${atual + 1} de ${paginas.length}`;
      if (btnPrev) btnPrev.disabled = atual === 0;
      if (btnNext) btnNext.disabled = atual === paginas.length - 1;
    };
    atualizarContador();

    const irPara = alvo => {
      if (alvo < 0 || alvo >= paginas.length || alvo === atual) return;
      const direcao = alvo > atual ? 'dir-next' : 'dir-prev';
      const saindo = paginas[atual];
      const entrando = paginas[alvo];
      atual = alvo;
      entrando.classList.add('is-active');

      if (reducedMotion) {
        saindo.classList.remove('is-active');
      } else {
        saindo.classList.add('is-leaving', direcao);
        saindo.addEventListener('transitionend', function limpar(evento) {
          if (evento.target !== saindo) return;
          saindo.classList.remove('is-active', 'is-leaving', 'dir-next', 'dir-prev');
        }, { once: true });
      }

      atualizarContador();
      livro.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    btnPrev?.addEventListener('click', () => irPara(atual - 1));
    btnNext?.addEventListener('click', () => irPara(atual + 1));
  });
})();
