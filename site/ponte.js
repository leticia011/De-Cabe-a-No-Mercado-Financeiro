/*
  Ponte entre capítulos: injeta a mesma faixa de transição em todas as páginas,
  logo antes da faixa verde de Perguntas & Respostas.
*/
(() => {
  const HUB = 'https://www.tabula.com.br/conteudista/bankers.academy';
  const PONTES = {
    'autoconhecimento.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Ainda em dúvida se é para você? Veja o mercado por dentro.',
      texto: 'Na <b>Entrada em Investment Banking</b>, você entende o trabalho real da área, antes da parte técnica. Explore também cursos em outras áreas.',
      cta: 'Conhecer o curso',
      href: 'https://www.tabula.com.br/curso/entradaemib',
      card: {
        selo: 'Formação híbrida · 44h28',
        nome: 'Entrada em Investment Banking',
        itens: ['Carreira em finanças e orientação para entrevistas', 'Fundamentos, valuation e M&A']
      },
      voltar: { href: HUB, texto: 'Ver todos os cursos da Academy →' }
    },
    'quadrante-carreiras.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Viu o mapa. Agora veja as carreiras funcionando.',
      texto: 'O mapa posiciona as carreiras; a <b>Entrada em Investment Banking</b> mostra como o trabalho funciona no dia a dia — de fundamentos a M&A.',
      cta: 'Conhecer o curso',
      href: 'https://www.tabula.com.br/curso/entradaemib',
      card: {
        selo: 'Formação híbrida · 44h28',
        nome: 'Entrada em Investment Banking',
        itens: ['Carreira em finanças e orientação para entrevistas', 'Fundamentos, valuation e M&A']
      },
      voltar: { href: HUB, texto: 'Ver todos os cursos da Academy →' }
    },
    'carreira-certa.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Escolher é fácil. Chegar lá, não.',
      texto: 'Escolher a carreira certa não conclui nada sozinho: a escolha só vira candidatura quando você tem o repertório técnico que a vaga cobra. É isso que a <b>Entrada em Investment Banking</b> fecha.',
      cta: 'Conhecer o curso',
      href: 'https://www.tabula.com.br/curso/entradaemib',
      card: {
        selo: 'Formação híbrida · 44h28',
        nome: 'Entrada em Investment Banking',
        itens: ['Fundamentos, valuation e M&A', 'Estrutura de capital e mercado financeiro']
      },
      voltar: { href: HUB, texto: 'Ver todos os cursos da Academy →' }
    },
    'formacao-certificacoes.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Onde estudar o que este capítulo mandou estudar.',
      texto: 'Estrutura de capital, crédito e modelagem financeira na prática — o que a <b>Introdução ao Crédito com Modelagem Financeira</b> ensina em 8 módulos.',
      cta: 'Conhecer o curso',
      href: 'https://www.tabula.com.br/curso/introducao-ao-credito-com-modelagem-financeira',
      card: {
        selo: 'Curso online · 16h50',
        nome: 'Introdução ao Crédito com Modelagem Financeira',
        itens: ['Estrutura de capital e crédito', 'Workshop prático de modelagem em Excel', 'Cases reais do mercado financeiro']
      },
      voltar: { href: HUB, texto: 'Ver todos os cursos da Academy →' }
    },
    'equity-story.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Narrativa sem repertório técnico não se sustenta.',
      texto: 'O Equity Story precisa ser verificável. A <b>Entrada em Investment Banking</b> é onde o repertório que sustenta a sua história é construído — fundamentos, valuation e M&A.',
      cta: 'Conhecer o curso',
      href: 'https://www.tabula.com.br/curso/entradaemib',
      card: {
        selo: 'Formação híbrida · 44h28',
        nome: 'Entrada em Investment Banking',
        itens: ['Fundamentos, valuation e M&A', 'Orientação para entrevistas']
      },
      voltar: { href: HUB, texto: 'Ver todos os cursos da Academy →' }
    },
    'cv-linkedin.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Currículo forte precisa de evidência para citar.',
      texto: 'Cases, projetos e formações concretas são o que dá o que escrever no currículo — e o que defender na entrevista.',
      cta: 'Conhecer o curso',
      href: 'https://www.tabula.com.br/curso/entradaemib',
      card: {
        selo: 'Formação híbrida · 44h28',
        nome: 'Entrada em Investment Banking',
        itens: ['Fundamentos, valuation e M&A', 'Orientação para entrevistas']
      },
      voltar: { href: HUB, texto: 'Ver todos os cursos da Academy →' }
    },
    'processo-seletivo-v2.html': {
      rot: 'Formação · Bankers Academy',
      titulo: 'Preparação para entrevista é treino, não sorte.',
      texto: 'Ler sobre processo seletivo não é o mesmo que ter passado por um. O <b>Investment Banking Boot Camp</b> simula o dia a dia de um analista, com pitchbook final.',
      cta: 'Conhecer o Boot Camp',
      href: 'https://www.tabula.com.br/curso/destaque/investmentbankingbootcamp',
      card: {
        selo: 'Híbrido · 5 semanas intensas',
        nome: 'Investment Banking Boot Camp',
        itens: ['Simulação do dia a dia de um analista', 'Pitchbook final em 9 etapas', 'Preparação para entrevistas técnicas']
      },
      voltar: { href: HUB, texto: 'Ver todos os cursos da Academy →' }
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
