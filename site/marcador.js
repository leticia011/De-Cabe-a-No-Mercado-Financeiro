/*
  Marcador de leitura — presente em todos os capítulos.

  Faz duas coisas presas ao scroll:

  1) A barra fixa no rodapé: aparece depois de metade do capítulo, mostra o
     progresso e oferece uma saída única para a formação. Some quando o
     leitor chega à ponte para o próximo capítulo — dali em diante quem
     conduz é a própria ponte.

  2) O terceiro módulo do marca-página: enquanto o leitor está no começo,
     ele mostra a captura de e-mail; passados 60% do capítulo, quem continua
     ali não é mais um lead frio, e o módulo troca pela formação.

  A barra é montada aqui (não no HTML) para que os sete capítulos fiquem
  iguais sem repetir markup.
*/
(() => {
  const SITE = 'https://bankers-academy-ztu1.vercel.app';

  /* o que cada capítulo oferece — o mesmo recorte que a faixa de curso tinha */
  const PAGINAS = {
    // TESTE (só neste capítulo): a barra leva ao próximo capítulo, porque a
    // oferta do curso passou para a faixa do fim da página — ver ponte.js.
    'autoconhecimento.html': {
      rotulo: 'Passo 1',
      cta: 'Ir para o Passo 2 · Opções de carreira', href: 'quadrante-carreiras.html',
      semTrocaModulo: true
    },
    'quadrante-carreiras.html': {
      rotulo: 'Passo 2',
      cta: 'Ir para o Passo 3 · Escolha de carreira', href: 'carreira-certa.html',
      semTrocaModulo: true
    },
    'carreira-certa.html': {
      rotulo: 'Passo 3',
      cta: 'Ir para o Passo 4 · Formação e certificações', href: 'formacao-certificacoes.html',
      semTrocaModulo: true
    },
    'formacao-certificacoes.html': {
      rotulo: 'Passo 4',
      cta: 'Ir para o Passo 5 · Equity Story', href: 'equity-story.html',
      semTrocaModulo: true
    },
    'equity-story.html': {
      rotulo: 'Passo 5',
      cta: 'Ir para o Passo 6 · CV e LinkedIn', href: 'cv-linkedin.html',
      semTrocaModulo: true
    },
    'cv-linkedin.html': {
      rotulo: 'Passo 6',
      cta: 'Ir para o Capítulo 7 · Processo seletivo', href: 'processo-seletivo-v2.html',
      semTrocaModulo: true
    },
    'processo-seletivo-v2.html': {
      rotulo: 'Capítulo 7',
      cta: 'Rever os seis passos do método', href: 'index.html#metodo',
      semTrocaModulo: true
    },
  };

  const TROCA_MODULO = 0.6;
  const MOSTRA_BARRA = 0.5;

  const pagina = ((location.pathname.split('/').pop() || '').replace(/\.html$/, '') || 'index') + '.html';
  const dados = PAGINAS[pagina];
  const capitulo = document.querySelector('main, article.texto, .reading-flow');
  if (!dados || !capitulo) return;

  /* ---------- barra ---------- */
  const barra = document.createElement('div');
  barra.className = 'marcador';
  barra.innerHTML = `
    <div class="marcador-barra"><div class="marcador-progresso" data-progresso></div></div>
    <div class="marcador-in">
      <p class="marcador-txt"><b>${dados.rotulo}</b> · <span data-lido>0</span>% lido</p>
      <a class="marcador-cta" href="${dados.href}">${dados.cta} →</a>
      <button type="button" class="marcador-fechar" data-fechar aria-label="Fechar a barra de leitura">×</button>
    </div>`;
  document.body.append(barra);

  const preenchimento = barra.querySelector('[data-progresso]');
  const numero = barra.querySelector('[data-lido]');
  let dispensada = false;
  let fimNaTela = false;

  barra.querySelector('[data-fechar]').addEventListener('click', () => {
    dispensada = true;
    barra.classList.remove('aparece');
  });

  /* ---------- módulo lateral ---------- */
  const trocarModulo = bloco => {
    if (bloco.dataset.trocado === 'sim') return;
    bloco.dataset.trocado = 'sim';
    bloco.classList.add('marca-cap-formacao');
    bloco.innerHTML = `
      <p class="r">Bankers Academy</p>
      <h3>${dados.moduloTitulo}</h3>
      <p>${dados.moduloTexto}</p>
      <a class="marca-cap-cta" href="${dados.href}">${dados.cta} →</a>`;
  };

  /* ---------- laço preso ao scroll ---------- */
  const progresso = () => {
    const caixa = capitulo.getBoundingClientRect();
    const lido = -caixa.top + innerHeight * 0.5;
    return Math.min(1, Math.max(0, lido / caixa.height));
  };

  let agendado = false;
  const atualizar = () => {
    agendado = false;
    const p = progresso();

    if (p >= TROCA_MODULO && !dados.semTrocaModulo) {
      const bloco = document.querySelector('.marca-pagina .marca-cap');
      if (bloco) trocarModulo(bloco);
    }

    if (!dispensada) {
      barra.classList.toggle('aparece', p >= MOSTRA_BARRA && !fimNaTela);
      preenchimento.style.width = `${(p * 100).toFixed(1)}%`;
      numero.textContent = Math.round(p * 100);
    }
  };

  const aoRolar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(atualizar);
  };

  /* chegou ao destino (a ponte ou a oferta): a barra sai de cena */
  const fim = document.querySelector(dados.href.startsWith('#') ? dados.href : '.ponte-cap');
  const observarFim = alvo => {
    if (!alvo || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(([e]) => { fimNaTela = e.isIntersecting; aoRolar(); },
      { threshold: 0.12 }).observe(alvo);
  };
  observarFim(fim);
  // a ponte é injetada por outro script; se ainda não existia, tenta de novo
  if (!fim) requestAnimationFrame(() => observarFim(document.querySelector('.ponte-cap')));

  addEventListener('scroll', aoRolar, { passive: true });
  addEventListener('resize', aoRolar);
  requestAnimationFrame(atualizar);
})();
