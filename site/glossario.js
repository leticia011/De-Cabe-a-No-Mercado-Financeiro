(() => {
  const input = document.getElementById('glossario-busca-input');
  if (!input) return;

  const grupos = [...document.querySelectorAll('.termo-grupo')].map(grupo => ({
    grupo,
    itens: [...grupo.querySelectorAll('.termo-lista > div')]
  }));
  const total = grupos.reduce((n, g) => n + g.itens.length, 0);

  const contagem = document.getElementById('glossario-contagem-num');
  const contagemLabel = document.getElementById('glossario-contagem-label');
  const vazio = document.querySelector('.glossario-vazio');
  const alfabeto = document.querySelector('.glossario-alfabeto');

  const marcasCombinacao = new RegExp(String.fromCharCode(91, 92, 117, 48, 51, 48, 48, 45, 92, 117, 48, 51, 54, 102, 93), 'g');

  const normaliza = texto => texto
    .toLowerCase()
    .normalize('NFD')
    .replace(marcasCombinacao, '');

  input.addEventListener('input', () => {
    const busca = normaliza(input.value.trim());
    let visiveis = 0;

    grupos.forEach(({ grupo, itens }) => {
      let algumVisivel = false;
      itens.forEach(item => {
        const bate = !busca || normaliza(item.textContent).includes(busca);
        item.hidden = !bate;
        if (bate) { algumVisivel = true; visiveis++; }
      });
      grupo.hidden = !algumVisivel;
    });

    const numero = busca ? visiveis : total;
    if (alfabeto) alfabeto.hidden = busca.length > 0;
    if (vazio) vazio.hidden = visiveis > 0;
    if (contagem) contagem.textContent = numero;
    if (contagemLabel) contagemLabel.textContent = numero === 1 ? 'termo' : 'termos';
  });

  const caixa = document.querySelector('.glossario-busca');
  const toggle = document.getElementById('glossario-busca-toggle');
  if (!caixa || !toggle) return;

  const abrir = () => {
    caixa.classList.add('is-aberta');
    toggle.setAttribute('aria-expanded', 'true');
    input.focus();
  };
  const fechar = () => {
    caixa.classList.remove('is-aberta');
    toggle.setAttribute('aria-expanded', 'false');
    if (input.value) {
      input.value = '';
      input.dispatchEvent(new Event('input'));
    }
  };

  toggle.addEventListener('click', () => {
    caixa.classList.contains('is-aberta') ? fechar() : abrir();
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') fechar();
  });
  input.addEventListener('focusout', e => {
    if (!input.value && e.relatedTarget !== toggle) fechar();
  });
})();
