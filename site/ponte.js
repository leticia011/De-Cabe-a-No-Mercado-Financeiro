/*
  Ponte entre capítulos: injeta a mesma faixa de transição em todas as páginas,
  logo antes da faixa verde de Perguntas & Respostas.
*/
(() => {
  const PONTES = {
    // TESTE (só neste capítulo): o fim da página oferece o curso; o próximo
    // capítulo passou para a barra de leitura — ver marcador.js.
    'autoconhecimento.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Ainda em dúvida se é para você? Veja o mercado por dentro.',
      texto: 'A resposta a essa pergunta melhora quando você entende o trabalho real de cada área. A <b>masterclass gratuita</b> mostra as funções, as mesas e as rotinas antes de você investir em qualquer curso.',
      cta: 'Assistir à masterclass',
      href: 'https://bankers-academy-ztu1.vercel.app/#programas',
      card: {
        selo: 'Masterclass gratuita',
        nome: 'Mercado Financeiro na Prática: Áreas, Funções e Carreiras',
        itens: ['Quem faz o quê, em cada mesa', 'A rotina real de cada área', 'On-line e sem custo']
      },
      voltar: { href: 'https://bankers-academy-ztu1.vercel.app/programas/entrada-no-mercado-financeiro', texto: 'Entrada no Mercado Financeiro →' }
    },
    'quadrante-carreiras.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Viu o mapa. Agora veja as carreiras funcionando.',
      texto: 'O mapa posiciona as carreiras; a <b>masterclass gratuita</b> mostra como cada uma trabalha no dia a dia — quem origina, quem executa, quem analisa e quem vende.',
      cta: 'Assistir à masterclass',
      href: 'https://bankers-academy-ztu1.vercel.app/#programas',
      card: {
        selo: 'Masterclass gratuita',
        nome: 'Mercado Financeiro na Prática: Áreas, Funções e Carreiras',
        itens: ['Quem faz o quê, em cada mesa','A rotina real de cada área','On-line e sem custo']
      },
      voltar: { href: 'https://bankers-academy-ztu1.vercel.app/programas/entrada-no-mercado-financeiro', texto: 'Entrada no Mercado Financeiro →' }
    },
    'carreira-certa.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Você nomeou uma direção. Agora sobra a lacuna.',
      texto: 'Escolher a carreira certa não conclui nada sozinho: a escolha só vira candidatura quando você tem o repertório técnico que a vaga cobra. É isso que a <b>formação da Academy</b> fecha.',
      cta: 'Ver a formação',
      href: 'https://bankers-academy-ztu1.vercel.app/programas/entrada-no-mercado-financeiro',
      card: {
        selo: 'Formação híbrida · 43h28',
        nome: 'Entrada no Mercado Financeiro',
        itens: ['Fundamentos, valuation e modelagem','Doze módulos, do zero ao processo seletivo','Gravado, com encontros ao vivo']
      },
      voltar: { href: 'https://bankers-academy-ztu1.vercel.app/#programas', texto: 'Começar pela masterclass gratuita →' }
    },
    'formacao-certificacoes.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Onde estudar o que este capítulo mandou estudar.',
      texto: 'A trilha muda conforme o cargo-alvo. Comece pela <b>masterclass gratuita</b> para mapear as funções; depois escolha a formação que corresponde à sua direção.',
      cta: 'Assistir à masterclass',
      href: 'https://bankers-academy-ztu1.vercel.app/#programas',
      card: {
        selo: 'Masterclass gratuita',
        nome: 'Mercado Financeiro na Prática: Áreas, Funções e Carreiras',
        itens: ['Quem faz o quê, em cada mesa','A rotina real de cada área','On-line e sem custo']
      },
      voltar: { href: 'https://bankers-academy-ztu1.vercel.app/programas/entrada-no-mercado-financeiro', texto: 'Entrada no Mercado Financeiro →' }
    },
    'equity-story.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Narrativa sem repertório técnico não se sustenta.',
      texto: 'O Equity Story precisa ser verificável. A <b>formação da Academy</b> é onde o repertório que sustenta a sua história é construído — com prática, cases e linguagem de mercado.',
      cta: 'Ver a formação',
      href: 'https://bankers-academy-ztu1.vercel.app/programas/entrada-no-mercado-financeiro',
      card: {
        selo: 'Formação híbrida · 43h28',
        nome: 'Entrada no Mercado Financeiro',
        itens: ['Fundamentos, valuation e modelagem','Doze módulos, do zero ao processo seletivo','Gravado, com encontros ao vivo']
      },
      voltar: { href: 'https://bankers-academy-ztu1.vercel.app/#programas', texto: 'Começar pela masterclass gratuita →' }
    },
    'cv-linkedin.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Currículo forte precisa de evidência para citar.',
      texto: 'Cases, projetos e formações concretas são o que dá o que escrever no currículo — e o que defender na entrevista.',
      cta: 'Ver a formação',
      href: 'https://bankers-academy-ztu1.vercel.app/programas/entrada-no-mercado-financeiro',
      card: {
        selo: 'Formação híbrida · 43h28',
        nome: 'Entrada no Mercado Financeiro',
        itens: ['Fundamentos, valuation e modelagem','Doze módulos, do zero ao processo seletivo','Gravado, com encontros ao vivo']
      },
      voltar: { href: 'https://bankers-academy-ztu1.vercel.app/#programas', texto: 'Começar pela masterclass gratuita →' }
    },
    'processo-seletivo-v2.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Preparação para entrevista é treino, não sorte.',
      texto: 'Ler sobre entrevista não é o mesmo que ter feito uma. O <b>Workshop de Entrevistas</b> coloca você na cadeira do candidato, com feedback de quem entrevista de verdade.',
      cta: 'Garantir minha vaga',
      href: 'https://bankers-academy-ztu1.vercel.app/#programas',
      card: {
        selo: 'Workshop ao vivo',
        nome: 'Workshop de Entrevistas',
        itens: ['Treino de entrevista ao vivo','Perguntas técnicas e comportamentais','Feedback de quem já entrevistou']
      },
      voltar: { href: 'https://bankers-academy-ztu1.vercel.app/programas/entrada-no-mercado-financeiro', texto: 'Entrada no Mercado Financeiro →' }
    },
  };

  const pagina = ((location.pathname.split('/').pop() || '').replace(/\.html$/, '') || 'index') + '.html';
  const dados = PONTES[pagina];
  if (!dados) return;

  const ponte = document.createElement('section');
  ponte.className = 'ponte-cap';
  ponte.setAttribute('aria-label', 'Próximo capítulo');
  ponte.innerHTML = `
    <div class="ponte-in" data-reveal>
      <div>
        <p class="rot"><span class="lo" aria-hidden="true"></span> ${dados.rot}</p>
        <h2>${dados.titulo}</h2>
        <p>${dados.texto}</p>
      </div>
      <div class="ponte-acoes">
        ${dados.card ? `
        <div class="ponte-card">
          <p class="ponte-card-selo">${dados.card.selo}</p>
          <p class="ponte-card-nome">${dados.card.nome}</p>
          <ul class="ponte-card-itens">${dados.card.itens.map(i => `<li>${i}</li>`).join('')}</ul>
          <a class="bt-ponte" href="${dados.href}">${dados.cta} <span class="seta" aria-hidden="true">→</span></a>
          <a class="ponte-card-extra" href="${dados.voltar.href}">${dados.voltar.texto}</a>
        </div>` : `
        <a class="bt-ponte" href="${dados.href}"><span class="lo" aria-hidden="true"></span> ${dados.cta}</a>`}
        ${dados.card ? '' : `<a class="ponte-voltar" href="${dados.voltar.href}">${dados.voltar.texto}</a>`}
      </div>
    </div>`;

  const faixaVerde = document.querySelector('.qa-section');
  if (faixaVerde) faixaVerde.before(ponte);
  else document.querySelector('footer')?.before(ponte);
})();
