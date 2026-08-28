/*
  Esteira de depoimentos da home.

  A fita anda sozinha, da direita para a esquerda, e o leitor pode agarrar e
  arrastar para os dois lados. Por isso o laço é feito aqui em JS e não em
  CSS: uma animação de keyframes não pode ser deslocada com o ponteiro.

  Os cards são duplicados uma vez; quando o deslocamento passa de metade da
  fita, ele volta para o início — a cópia entra exatamente onde o original
  saiu, sem emenda visível.
*/
(() => {
  const esteira = document.querySelector('[data-esteira]');
  const fita = esteira?.querySelector('.opinioes-fita');
  if (!fita || fita.dataset.montada === 'sim') return;

  [...fita.children].forEach(card => {
    const copia = card.cloneNode(true);
    copia.setAttribute('aria-hidden', 'true');
    fita.append(copia);
  });
  fita.dataset.montada = 'sim';

  const semMovimento = matchMedia('(prefers-reduced-motion: reduce)');
  const velocidade = () =>
    parseFloat(getComputedStyle(esteira).getPropertyValue('--esteira-vel')) || 34; // px/s

  let deslocamento = 0;
  let metade = 0;
  let sobreOMouse = false;
  let arrastando = false;
  let ponteiro = 0;
  let ultimoQuadro = 0;

  const medir = () => { metade = fita.scrollWidth / 2; };
  medir();
  addEventListener('resize', medir);

  /* mantém o deslocamento sempre dentro de uma volta */
  const normalizar = () => {
    if (!metade) return;
    while (deslocamento <= -metade) deslocamento += metade;
    while (deslocamento > 0) deslocamento -= metade;
  };

  const desenhar = agora => {
    const dt = ultimoQuadro ? (agora - ultimoQuadro) / 1000 : 0;
    ultimoQuadro = agora;

    const parada = sobreOMouse || arrastando || semMovimento.matches;
    if (!parada) deslocamento -= velocidade() * Math.min(dt, 0.1);

    normalizar();
    fita.style.transform = `translate3d(${deslocamento}px,0,0)`;
    requestAnimationFrame(desenhar);
  };
  requestAnimationFrame(desenhar);

  /* pausa no hover, como no site da Academy */
  esteira.addEventListener('pointerenter', () => { sobreOMouse = true; });
  esteira.addEventListener('pointerleave', () => { sobreOMouse = false; });

  /* arraste */
  fita.addEventListener('pointerdown', e => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    arrastando = true;
    ponteiro = e.clientX;
    fita.classList.add('arrastando');
    fita.setPointerCapture(e.pointerId);
  });

  fita.addEventListener('pointermove', e => {
    if (!arrastando) return;
    deslocamento += e.clientX - ponteiro;
    ponteiro = e.clientX;
    normalizar();
    fita.style.transform = `translate3d(${deslocamento}px,0,0)`;
  });

  const soltar = e => {
    if (!arrastando) return;
    arrastando = false;
    fita.classList.remove('arrastando');
    if (e.pointerId != null && fita.hasPointerCapture?.(e.pointerId)) {
      fita.releasePointerCapture(e.pointerId);
    }
  };
  fita.addEventListener('pointerup', soltar);
  fita.addEventListener('pointercancel', soltar);

  /* um arraste não deve virar clique no link/foto que estiver embaixo */
  fita.addEventListener('click', e => {
    if (fita.dataset.arrastou === 'sim') { e.preventDefault(); e.stopPropagation(); }
  }, true);
  fita.addEventListener('pointerdown', () => { fita.dataset.arrastou = 'nao'; });
  fita.addEventListener('pointermove', e => {
    if (arrastando && Math.abs(e.movementX) > 2) fita.dataset.arrastou = 'sim';
  });

  /* "ver todas as avaliações" — troca a esteira por uma lista estática, sem duplicatas */
  const grade = document.querySelector('.opinioes-grade');
  const botaoTodas = document.querySelector('[data-opinioes-toggle]');
  const lista = document.querySelector('[data-opinioes-lista]');

  if (grade && botaoTodas && lista) {
    let listaMontada = false;

    botaoTodas.addEventListener('click', () => {
      if (!listaMontada) {
        fita.querySelectorAll(':scope > .opiniao:not([aria-hidden])').forEach(original => {
          lista.append(original.cloneNode(true));
        });
        listaMontada = true;
      }

      const aberta = !lista.classList.contains('is-aberta');
      lista.classList.toggle('is-aberta', aberta);
      grade.hidden = aberta;
      botaoTodas.setAttribute('aria-expanded', String(aberta));
      botaoTodas.textContent = aberta ? 'Ver menos avaliações' : 'Ver todas as avaliações';
    });
  }
})();
