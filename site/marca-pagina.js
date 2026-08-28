/*
  Marca-página: injeta a coluna lateral do autor (igual à do capítulo 1)
  em todas as páginas de capítulo.

  A página pode indicar o lugar exato com <div data-marca-pagina></div>.
  Sem esse marcador, o script usa o container listado em CONTAINERS e
  transforma o conteúdo em duas colunas (texto + marca-página).
*/
(() => {
  const CONTAINERS = {
    'carreira-certa.html': 'main > .reading-flow',
    'cv-linkedin.html': 'main > .reading-flow',
    'formacao-certificacoes.html': 'main > .reading-flow',
    'equity-story.html': 'main.wrap',
    'processo-seletivo-v2.html': 'main.wrap',
    'quadrante-carreiras.html': 'main > .reading-flow'
  };

  // A aula de carreira é o brinde da captura no topo do funil. No capítulo 7 o
  // destaque é o Workshop de Entrevistas, então lá o brinde não aparece para
  // não competir com ele.
  const PAGINAS_COM_BRINDE = ['autoconhecimento.html', 'quadrante-carreiras.html', 'carreira-certa.html'];

  const montar = pagina => {
    const brinde = PAGINAS_COM_BRINDE.includes(pagina)
      ? '<p class="brinde">+ <b>aula de carreira</b> no mercado financeiro, junto.</p>'
      : '';
    const aside = document.createElement('aside');
    aside.className = 'marca-pagina';
    aside.setAttribute('aria-label', 'Sobre o autor');
    aside.innerHTML = `
      <div class="retrato" style="background-image:url('assets/autor-securato.jpg')" role="img" aria-label="Retrato de José Roberto Securato Junior"></div>
      <p class="nome">José Roberto Securato Junior</p>
      <p>Doutor em Finanças pela FEA/USP. Fundador da <b>Bankers Academy</b>. Passou 14 anos em investment banking, no Deutsche Bank em São Paulo e em Nova Iorque e no BNP Paribas.</p>
      <p>Em 2013 fundou a SP Advisors, boutique de M&amp;A, e a SP Capital Partners. Em 2022 criou o perfil <b>@investmentbankingbr</b>, onde responde a universitários que querem entrar no mercado financeiro.</p>
      <p class="liga">
        <a href="https://www.instagram.com/investmentbankingbr/">Instagram</a>
        <a href="https://www.linkedin.com/in/josesecurato/">LinkedIn</a>
        <a href="https://www.youtube.com/@securato">YouTube</a>
      </p>
      <div class="marca-sec">
        <p class="r">Sobre o livro</p>
        <p><i>De cabeça no mercado financeiro</i> reúne 25 anos de mercado e de sala de aula em seis passos, do autoconhecimento à entrevista.</p>
        <p class="ficha-l">Oficina do Livro · 2024<br>264 páginas</p>
      </div>
      <div class="marca-cap">
        <h3>Leia o capítulo 1</h3>
        ${brinde}
        <a class="captura-login-link" href="login.html">Fazer login</a>
      </div>`;
    return aside;
  };

  const pagina = ((location.pathname.split('/').pop() || '').replace(/\.html$/, '') || 'index') + '.html';

  const slot = document.querySelector('[data-marca-pagina]');
  if (slot) {
    slot.replaceWith(montar(pagina));
    return;
  }

  const seletor = CONTAINERS[pagina];
  if (!seletor) return;

  const container = document.querySelector(seletor);
  if (!container) return;

  const layout = document.createElement('div');
  layout.className = 'marca-layout';
  const coluna = document.createElement('div');
  coluna.className = 'marca-col';
  while (container.firstChild) coluna.append(container.firstChild);
  layout.append(coluna, montar(pagina));
  container.append(layout);
  container.classList.add('marca-host');
})();
