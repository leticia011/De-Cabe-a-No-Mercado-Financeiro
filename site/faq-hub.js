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
    // Sem backend: quem já mandou uma pergunta (localStorage, marcado pelo
    // rd-station.js) não vê o formulário de novo nas próximas visitas.
    let perguntaEnviada = false;
    try { perguntaEnviada = localStorage.getItem('perguntaEnviada') === '1'; } catch { /* sem memória disponível, mantém o formulário */ }
    const enviarOk = document.querySelector('#enviar-ok');
    if (perguntaEnviada) {
      form.hidden = true;
      if (enviarOk) enviarOk.hidden = false;
    }

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

  /* ---------- Talk to Securato ---------- */
  const STORIES = [
    { imagem: 'talk-to-securato-09.jpg', titulo: 'Dica pra quem tá começando em uma boutique', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=2796860049226527374&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-06.jpg', titulo: 'Estou em dúvida entre Corporate Banking e IB, poderia falar um pouco sobre prós e contras das 2?', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=2796864023967243264&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-01.jpg', titulo: 'Dica de ouro sobre o que falar em uma reunião e causar impacto', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=3130119612325331740&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-11.jpg', titulo: 'Ações em tesouraria entram na conta de Equity Value?', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=2767771576281227519&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-08.jpg', titulo: '3 dicas para lidar com uma sequência de semanais com poucas horas de sono', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=2796858967231023162&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-03.jpg', titulo: 'Principais atividades de um estagiário e como ser destaque. Definição de estagiário bom..', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=2796864722973653605&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-12.jpg', titulo: 'Como faço o dinheiro trabalhar para mim? Economizar é o primeiro passo….', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=2820156578561812809&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-07.jpg', titulo: 'Quem trabalha com IB não pode investir em ações? Em geral não, entenda porque…', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=2820159906834523729&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-10.jpg', titulo: 'Onde começar a investir? Nunca investi, mas pretendo.', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=2820161228165436370&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-05.jpg', titulo: 'Estagiando há 6 meses mas não tenho certeza se é o que quero. O que posso fazer? 6 meses e está em dúvida…', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=2820162893539052415&stkn=MXE5MnFnb3lkdjI3OQ==' },
    { imagem: 'talk-to-securato-04.jpg', titulo: 'A primeira impressão é mesmo a que fica?!', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0MzU4MTg2MTEyNzI5?story_media_id=3022795963689011499&stkn=MXE5MnFnb3lkdjI3OQ==' }
  ];
  const storiesLista = document.querySelector('#stories-lista');
  if (storiesLista) {
    storiesLista.innerHTML = STORIES.map(story => {
      const card = `<span class="story-visual"><img src="assets/${story.imagem}" alt="${story.titulo}" loading="lazy"><i class="story-mascara story-mascara-top" aria-hidden="true"></i><i class="story-mascara story-mascara-bottom" aria-hidden="true"></i></span><span class="story-titulo">${story.titulo}</span>`;
      return story.url
        ? `<a class="story-card" href="${story.url}" target="_blank" rel="noreferrer">${card}</a>`
        : `<div class="story-card">${card}</div>`;
    }).join('');
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
