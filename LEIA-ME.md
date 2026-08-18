# Site do livro "De cabeça no mercado financeiro"

Protótipo para a reunião de alinhamento com José Roberto Securato Junior.
**Não é versão final e não deve ir para o ar como está** — veja "Pendências" no fim.

---

## Os arquivos

| Arquivo | O que é |
|---|---|
| `site/index.html` | A **home**. É a peça principal. |
| `site/quadrante-carreiras.html` | O mapa de 18 carreiras por perfil, do autor, reconstruído em HTML. Seria a página do Passo 2. |
| `site/equity-story.html` | Página do Passo 5. Rascunho. |
| `site/processo-seletivo-v2.html` | Página do Capítulo 7. **Longa demais de propósito** — serve para o autor comparar dois modelos (ver abaixo). |

Cada arquivo é **autossuficiente**: abre com dois cliques, não precisa de servidor,
não precisa de internet (só a fonte Poppins), não tem pasta de imagens.
Todas as imagens estão embutidas no próprio HTML em base64.

---

## Como abrir

Clique duas vezes em `site/index.html`. Abre no navegador.

## Como editar

Abre em qualquer editor de texto (VS Code, Bloco de Notas).
É HTML e CSS puro. **Não tem framework, não tem build, não tem npm.**

Cuidado: os blocos gigantes de letras e números (`data:image/jpeg;base64,...`)
são as imagens. Não mexa neles — mas pode apagar tudo entre `base64,` e a aspa
e colocar outra imagem no lugar.

---

## Decisões que já foram tomadas (e por quê)

**1. HTML e CSS puro, sem JavaScript.**
Cerca de 69% dos crawlers de IA não executam JavaScript. Se o conteúdo depende
de script, eles veem página vazia. Como o objetivo do site é ser citado por IA,
tudo é renderizado direto no HTML. Até o carrossel dos 6 passos é CSS puro
(`scroll-snap` + âncoras). **A única tag `<script>` da página é o JSON-LD.**

Se for para WordPress/Webflow/qualquer CMS, mantenha essa regra.

**2. O site responde, o livro explica.**
As 60 perguntas do livro (curtas, do autor) viram o conteúdo do site.
O raciocínio dos capítulos fica no livro. Isso resolve canibalização e direito autoral.

**3. Modelo Atomic Habits, não Naval.**
O site apresenta o livro, não o substitui. Não deve ser possível ler a obra inteira ali.

**4. Marca conforme o manual.**
Preto `#000000` dominante, verde-limão `#c4ef78` só como acento (nunca protagonista),
grafite `#3D3D3D`, cinza `#DBDBDB`, branco. Poppins. Losango sempre pequeno.

---

## Pendências — precisam do cliente

### Bloqueiam o site
- [ ] **Links de compra.** Já localizados, falta confirmar quais entram:
  Oficina do Livro · Amazon (Kindle) · Tabula (esta dá dedicatória do autor)
- [ ] **Formulário do capítulo 1 não envia nada.** É demonstração. Precisa de backend
      ou de um serviço de e-mail (Mailchimp, ConvertKit, Brevo).
- [ ] **Autorização da Oficina do Livro** para reproduzir trechos do livro no site.
- [ ] **Autorização de imagem** dos alunos que aparecem nas fotos.

### Erros a confirmar
- [ ] **ISBN divergente.** O livro traz `978-65-89449-75-1`.
      A página da editora traz `978-65-89449-73-7`. Provavelmente capa dura vs. brochura.
- [ ] **Autoria.** A Amazon credita **Silvia Bruno Securato** como coautora.
      O site credita só o Securato Jr.
- [ ] **Segundo livro.** "Nadando de braçada no mercado financeiro" **não existe em
      lugar nenhum da internet.** A capa no site é ilustrativa (está marcado na página).
      Confirmar se o livro existe e qual o nome real.
- [ ] **Foto do "time no estúdio"** (não usada): confirmar se é da Bankers Academy.
      Pode ser da Ibmec Finance ou Integral Academy, que também são marcas do autor na Tabula.
- [ ] **Capa do curso "Carreiras vs Perfil"** está amarela, fora do manual da marca.
- [ ] **Masterclass com data "14/04"** na capa — confirmar se já passou.

### Decisões de escopo
- [ ] **Quanto do livro pode ir ao site?** Mostrar ao autor a home (modelo fechado)
      e a `processo-seletivo-v2.html` (modelo aberto, reconta o capítulo) e perguntar.
      **Esta é a pergunta central da reunião.**
- [ ] **Quais cursos aparecem na home?** Hoje estão 4 dos 10 da Tabula, escolhidos
      pelo preço. Isso é decisão de conversão — combinar com a frente de vendas.
- [ ] **O Boot Camp de IB entra?** Não está na Tabula, é presencial e exige entrevista
      com o Securato. Hoje está fora.
- [ ] **As 6 páginas dos passos.** Os cards da home apontam para `/de-cabeca/[slug]`.
      Nenhuma existe ainda. O `quadrante-carreiras.html` é o molde proposto.

---

## Dados reais já verificados

Nada aqui é chute. Fontes conferidas:

- **Livro:** Oficina do Livro, 2024, 264 páginas. 6 passos (do subtítulo, não "4 módulos").
  60 perguntas nas seções "Perguntas & Respostas" — 15 delas só no capítulo 7.
- **Bankers Academy na Tabula:** 10 cursos, 182 alunos, 168 horas gravadas,
  6 anos de plataforma, avaliação 5,0. https://www.tabula.com.br/conteudista/bankers.academy
- **A Tabula é do próprio autor** — rodapé: SP Capital Partners Ltda, empresa que ele fundou em 2013.
- **Boot Camp está na Turma 13** (julho/2025) — visível na tela do projetor, na foto da home.
- **Instagram do autor:** @investmentbankingbr — 18 mil seguidores, criado em 2022.
- **LinkedIn:** linkedin.com/in/josesecurato · **YouTube:** youtube.com/@securato
- **Instagram da escola:** @bankersacademybrazil

---

## Recomendação técnica

**Use Git.** Hoje as versões são arquivos com nomes diferentes, o que vira caos
quando mais de uma pessoa mexe. Git resolve: um arquivo, histórico completo,
volta para qualquer ponto, duas pessoas trabalham sem se atropelar.

---

## Integração com o RD Station (CRM) — 18/08

O site sempre disparou o evento `rd-lead` a cada formulário enviado, mas ninguém
escutava. Agora escuta: **`site/rd-station.js`** (incluído nas 9 páginas) envia
cada lead à API de conversões do RD e carrega o código de monitoramento.

**Para ativar** — preencher duas constantes no topo de `site/rd-station.js`:

| Constante | Onde pegar no painel RD |
|---|---|
| `RD_TRACKING_TOKEN` | Configurações → Código de monitoramento (o uuid do loader) |
| `RD_API_KEY` | Configurações → Integrações → Chave de API pública |

As duas são públicas por natureza. **Sem elas, o site se comporta exatamente
como antes** (formulário agradece, nada é enviado) — testado.

Cada formulário vira um evento de conversão nomeado no RD:
`site-livro-capitulo-1`, `site-livro-lista-proximo-livro`,
`site-livro-pergunta-leitor`, e os do marca-página das páginas de capítulo.
A automação (entregar capítulo, sequência de e-mails) se configura no painel,
por identificador.

## GEO (otimização para mecanismos de resposta) — 18/08

- `site/perguntas-frequentes.html` ganhou schema **FAQPage com as 40 perguntas
  reais** (era a única página sem dado estruturado — e a mais valiosa).
- `site/llms.txt`: resumo do site para agentes de IA.
- `site/robots.txt`: liberação explícita de leitura.
- A home já tinha WebSite/Person/Book/FAQPage — intocada.

## Pendências novas (precisam do cliente)

1. **Chaves do RD** (tabela acima).
2. **Domínio canônico**: o código aponta para TRÊS lugares —
   `de-cabe-a-no-mercado-financeiro.vercel.app` (6 canonicals),
   `bankersacademy.com.br` (3 canonicals, com dois esquemas de caminho
   diferentes) e `bankers-academy-ztu1.vercel.app` (36 links de CTA para um
   preview que vai morrer). Decidir o endereço final; só então gerar
   `sitemap.xml` e unificar canonicals — canonical inconsistente anula boa
   parte do ganho de GEO.
