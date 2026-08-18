/*
  Faixa de curso da Bankers Academy, injetada antes da ponte de capítulo.
  Cada capítulo destaca o programa que faz sentido com o assunto tratado ali.
  Troque as URLs em PROGRAMAS quando as páginas definitivas dos cursos existirem.
*/
(() => {
  const SITE = 'https://bankers-academy-ztu1.vercel.app';
  const PROGRAMAS = {
    masterclass: { tag: 'Masterclass gratuita', nome: 'Mercado Financeiro na Prática: Áreas, Funções e Carreiras', desc: 'Uma visão direta de como o mercado se organiza — quem faz o quê, em qual mesa e com qual rotina.', cta: 'Assistir à masterclass', href: SITE + '/#programas' },
    bootcamp: { tag: 'Turma presencial', nome: 'Investment Banking Boot Camp', desc: 'Modelagem, valuation e materiais de transação: o recorte técnico que Investment Banking cobra de quem entra.', cta: 'Ver o Boot Camp', href: SITE + '/#programas' },
    entrada: { tag: 'Formação híbrida · 43h28', nome: 'Entrada no Mercado Financeiro', desc: 'Doze módulos que vão da escolha de carreira à preparação técnica para processos seletivos.', cta: 'Conhecer a formação', href: SITE + '/programas/entrada-no-mercado-financeiro' },
    tesouraria: { tag: 'Curso gravado', nome: 'Entrada em Tesouraria, Sales & Trading', desc: 'Rotina, instrumentos e competências exigidas na mesa.', cta: 'Ver a trilha', href: SITE + '/programas/entrada-em-tesouraria-sales-trading' },
    workshop: { tag: 'Workshop ao vivo', nome: 'Workshop de Entrevistas', desc: 'Treino de entrevista com quem já esteve do outro lado da mesa: postura, perguntas técnicas, comportamentais e discurso de fechamento.', cta: 'Garantir minha vaga', href: SITE + '/#programas' },
    pe: { tag: 'Curso gravado', nome: 'Entrada em Startup & Private Equity', desc: 'Da análise da oportunidade à criação de valor em empresas privadas.', cta: 'Ver a trilha', href: SITE + '/programas/entrada-em-startup-private-equity' }
  };

  const PAGINAS = {
    'autoconhecimento.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Ainda em dúvida se é para você? Veja o mercado por dentro.',
      texto: 'A resposta a essa pergunta melhora quando você entende o trabalho real de cada área. A <b>masterclass gratuita</b> mostra as funções, as mesas e as rotinas antes de você investir em qualquer curso.',
      principal: 'masterclass', outros: ['entrada']
    },
    'quadrante-carreiras.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Viu o mapa. Agora veja as carreiras funcionando.',
      texto: 'O quadrante posiciona 18 carreiras; a <b>masterclass</b> mostra como cada uma trabalha no dia a dia — quem origina, quem executa, quem analisa e quem vende.',
      principal: 'masterclass', outros: ['tesouraria', 'pe']
    },
    'formacao-certificacoes.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Onde estudar o que este capítulo mandou estudar',
      texto: 'A trilha muda conforme o cargo-alvo. Comece pela <b>masterclass gratuita</b> para mapear as funções; depois escolha a formação que corresponde à sua direção — inclusive o <b>Investment Banking Boot Camp</b>, quando o alvo é IB.',
      principal: 'masterclass', outros: ['bootcamp', 'entrada', 'tesouraria', 'pe']
    },
    'equity-story.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Narrativa sem repertório técnico não se sustenta',
      texto: 'O Equity Story precisa ser verificável. A formação da Academy é onde o repertório que sustenta a sua história é construído — com prática, cases e linguagem de mercado.',
      principal: 'entrada', outros: ['masterclass', 'bootcamp']
    },
    'cv-linkedin.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Currículo forte precisa de evidência para citar',
      texto: 'Cases, projetos e formações concretas são o que dá o que escrever no currículo — e o que defender na entrevista.',
      principal: 'entrada', outros: ['masterclass', 'bootcamp']
    },
    'processo-seletivo-v2.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Preparação para entrevista é treino, não sorte',
      texto: 'Ler sobre entrevista não é o mesmo que ter feito uma. O <b>Workshop de Entrevistas</b> coloca você na cadeira do candidato, com feedback de quem entrevista de verdade — antes que isso aconteça valendo.',
      principal: 'workshop', outros: ['bootcamp', 'entrada']
    }
  };

  const pagina = ((location.pathname.split('/').pop() || '').replace(/\.html$/, '') || 'index') + '.html';
  const dados = PAGINAS[pagina];
  if (!dados) return;
  const principal = PROGRAMAS[dados.principal];

  const band = document.createElement('section');
  band.className = 'curso-band';
  band.setAttribute('aria-label', 'Cursos da Bankers Academy');
  band.innerHTML = `
    <div class="curso-in">
      <div>
        <p class="rot"><span class="lo" aria-hidden="true"></span> ${dados.rot}</p>
        <h2>${dados.titulo}</h2>
        <p class="curso-texto">${dados.texto}</p>
      </div>
      <div class="curso-card">
        <span class="curso-tag">${principal.tag}</span>
        <h3>${principal.nome}</h3>
        <p>${principal.desc}</p>
        <a class="curso-cta" href="${principal.href}">${principal.cta} →</a>
        <div class="curso-mais">
          ${dados.outros.map(chave => `<a href="${PROGRAMAS[chave].href}">${PROGRAMAS[chave].nome} →</a>`).join('')}
        </div>
      </div>
    </div>`;

  const ponte = document.querySelector('.ponte-cap');
  if (ponte) ponte.before(band);
  else (document.querySelector('.qa-section') || document.querySelector('footer'))?.before(band);
})();
