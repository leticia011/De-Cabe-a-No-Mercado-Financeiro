/*
  Hub de perguntas & respostas:
  - 4 blocos por momento do leitor; abre um por vez (o primeiro já vem aberto);
  - busca livre e filtro por tema escondem as perguntas que não casam e abrem
    automaticamente os blocos que ainda têm resultado;
  - recebe a pergunta do leitor (evento `rd-pergunta` no document, mesmo
    mecanismo da captura de e-mail — é só escutar para ligar ao RD Station);
  - monta a grade de vídeos a partir da lista VIDEOS abaixo.

  PARA ADICIONAR UM VÍDEO: cole um objeto na lista VIDEOS com o link do post
  e uma pergunta que ele responde. Nada mais precisa ser mexido.
*/
(() => {
  const VIDEOS = [
    // { url: 'https://www.instagram.com/p/XXXXXXXXX/', titulo: 'Como saber se o mercado financeiro é para mim?', duracao: '1 min' },
  ];

  const blocos = [...document.querySelectorAll('.bloco')];
  const perguntas = [...document.querySelectorAll('.bloco-lista details')];
  const busca = document.querySelector('#hub-busca');
  const visiveis = document.querySelector('#hub-visiveis');
  const vazio = document.querySelector('.hub-vazio');
  const limpar = document.querySelector('[data-limpar]');
  let temaAtivo = '';

  const semAcento = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* ---------- abrir e fechar blocos ---------- */
  const abrirBloco = (bloco, abrir) => {
    const botao = bloco.querySelector('.bloco-cabeca');
    const lista = bloco.querySelector('.bloco-lista');
    if (!botao || !lista) return;
    bloco.classList.toggle('aberto', abrir);
    botao.setAttribute('aria-expanded', String(abrir));
    lista.hidden = !abrir;
  };

  blocos.forEach(bloco => {
    bloco.querySelector('.bloco-cabeca')?.addEventListener('click', () => {
      const abrindo = !bloco.classList.contains('aberto');
      // um bloco por vez: fecha os outros para a página não virar parede
      blocos.forEach(b => abrirBloco(b, b === bloco && abrindo));
      if (abrindo) {
        const topo = bloco.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: topo, behavior: 'smooth' });
      }
    });
  });

  /* ---------- busca e filtro por tema ---------- */
  const filtrando = () => Boolean(temaAtivo || (busca?.value || '').trim());

  const aplicar = () => {
    const termo = semAcento((busca?.value || '').trim().toLowerCase());
    const ativo = filtrando();
    let total = 0;

    perguntas.forEach(item => {
      const temas = (item.dataset.temas || '').split(' ').filter(Boolean);
      const casaTema = !temaAtivo || temas.includes(temaAtivo);
      const casaBusca = !termo || semAcento(item.dataset.busca || '').includes(termo);
      const mostra = casaTema && casaBusca;
      item.hidden = !mostra;
      if (mostra) total++;
      else item.open = false;
    });

    blocos.forEach(bloco => {
      const achou = [...bloco.querySelectorAll('.bloco-lista details')].filter(d => !d.hidden).length;
      const conta = bloco.querySelector('.bloco-conta b');
      if (conta) conta.textContent = String(ativo ? achou : bloco.querySelectorAll('.bloco-lista details').length);
      bloco.hidden = ativo && achou === 0;
      // filtrando, todo bloco com resultado abre; sem filtro, volta ao estado inicial
      if (ativo) abrirBloco(bloco, achou > 0);
      else abrirBloco(bloco, bloco === blocos[0]);
    });

    if (visiveis) visiveis.textContent = String(total);
    if (vazio) vazio.hidden = total !== 0;
    if (limpar) limpar.hidden = !ativo;
  };

  const selecionarTema = tema => {
    temaAtivo = temaAtivo === tema ? '' : tema;
    document.querySelectorAll('.tema').forEach(b => b.classList.toggle('ativo', (b.dataset.tema || '') === temaAtivo));
    aplicar();
  };

  // um clique em qualquer #tema — na barra ou dentro de uma resposta — filtra
  document.addEventListener('click', evento => {
    const botao = evento.target.closest('.tema');
    if (!botao) return;
    selecionarTema(botao.dataset.tema || '');
    if (botao.closest('.qa-meta')) {
      document.querySelector('.hub-controles')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  });

  const abrirTemas = document.querySelector('[data-temas-abrir]');
  abrirTemas?.addEventListener('click', () => {
    const aberto = abrirTemas.getAttribute('aria-expanded') === 'true';
    abrirTemas.setAttribute('aria-expanded', String(!aberto));
    const lista = document.querySelector('.temas-lista');
    if (lista) lista.hidden = aberto;
  });

  busca?.addEventListener('input', aplicar);
  limpar?.addEventListener('click', () => {
    if (busca) busca.value = '';
    temaAtivo = '';
    document.querySelectorAll('.tema').forEach(b => b.classList.remove('ativo'));
    aplicar();
  });

  /* ---------- pergunta do leitor ---------- */
  const form = document.querySelector('#form-pergunta');
  if (form) {
    const pergunta = form.querySelector('textarea[name="pergunta"]');
    const nome = form.querySelector('input[name="name"]');
    const telefone = form.querySelector('input[name="phone"]');
    const email = form.querySelector('input[type="email"]');
    const linkedin = form.querySelector('input[name="linkedin"]');
    const status = form.querySelector('.form-status');
    const aviso = m => { if (status) status.textContent = m; };

    // nome e celular são obrigatórios; e-mail e LinkedIn ficam a critério de quem pergunta
    form.querySelector('[data-pergunta-enviar]')?.addEventListener('click', () => {
      if ((pergunta?.value || '').trim().length < 10) { aviso('Escreva a sua pergunta com um pouco mais de detalhe.'); pergunta?.focus(); return; }
      if (!nome?.value.trim()) { aviso('Informe o seu nome.'); nome?.focus(); return; }
      if ((telefone?.value || '').replace(/\D/g, '').length < 10) { aviso('Informe um celular válido, com DDD.'); telefone?.focus(); return; }
      if (email?.value.trim() && !email.checkValidity()) { aviso('Esse e-mail não parece válido — corrija ou deixe em branco.'); email?.focus(); return; }
      document.dispatchEvent(new CustomEvent('rd-lead', {
        detail: {
          pergunta: pergunta.value.trim(),
          name: nome.value.trim(),
          phone: telefone.value.trim(),
          email: email?.value.trim() || '',
          linkedin: linkedin?.value.trim() || '',
          form: form.dataset.rdForm || form.id
        }
      }));
      form.querySelectorAll('input, textarea, button').forEach(c => { c.disabled = true; });
      aviso('Pergunta enviada. Se ela se repetir, vira resposta aqui — e talvez vídeo.');
    });
  }

  /* ---------- vídeos ---------- */
  const grade = document.querySelector('#videos-grade');
  if (grade) {
    if (!VIDEOS.length) {
      grade.innerHTML = `<div class="videos-vazio">
        <p>Ainda não há vídeo publicado aqui. Enquanto isso, as caixinhas de pergunta acontecem no Instagram.</p>
        <a class="videos-cta" href="https://www.instagram.com/investmentbankingbr/">Ver no @investmentbankingbr →</a>
      </div>`;
    } else {
      grade.innerHTML = VIDEOS.map(v => `<a class="video-card" href="${v.url}">
        <span class="video-play" aria-hidden="true"></span>
        <span class="video-titulo">${v.titulo}</span>
        <span class="video-meta">${v.duracao || 'Instagram'} · @investmentbankingbr</span>
      </a>`).join('');
    }
  }
})();
