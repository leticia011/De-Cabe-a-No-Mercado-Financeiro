// @ts-check
/*
  Integração com o RD Station (CRM).

  O site já dispara o evento `rd-lead` a cada formulário enviado (ver
  captura.js e marca-pagina.js) com { email, name, phone, form }. Este arquivo
  é quem ESCUTA esse evento e entrega o lead ao RD Station de duas formas:

  1. Código de monitoramento — o script oficial do RD, carregado abaixo,
     que liga a navegação anônima ao lead depois que ele se identifica.
  2. API de conversões — um POST por envio de formulário, criando o evento
     de conversão com o nome do formulário (`site-livro-<form>`), que é o que
     permite segmentar no painel ("veio do marca-página do quadrante").

  ── PARA ATIVAR ─────────────────────────────────────────────────────────────
  Preencha as duas constantes abaixo com os valores do painel do RD Station:

  RD_TRACKING_TOKEN → Configurações → Código de monitoramento. É o código
                      (uuid) que aparece na URL do loader.
  RD_API_KEY        → Configurações → Integrações → Chave de API pública.

  As duas são PÚBLICAS por natureza (vivem no navegador de qualquer visitante)
  — não são segredo. Sem elas preenchidas o site se comporta como antes:
  o formulário agradece, e nada é enviado a lugar nenhum.
  ────────────────────────────────────────────────────────────────────────────
*/
(() => {
  'use strict';

  const RD_TRACKING_TOKEN = '260d9d4f-98b4-4762-b0b1-5d3764804865';
  const RD_API_KEY = '08e148b84f9e2721389531dcb9804090';

  const API_URL = 'https://api.rd.services/platform/conversions?api_key=';
  // Prefixo do identificador de conversão: distingue os leads do site do livro
  // de qualquer outra fonte da mesma conta RD.
  const PREFIXO = 'site-livro-';

  // ── 1. código de monitoramento ────────────────────────────────────────────
  if (RD_TRACKING_TOKEN) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://d335luupugsy2.cloudfront.net/js/loader-scripts/${RD_TRACKING_TOKEN}-loader.js`;
    document.head.appendChild(s);
  }

  // ── 2. conversões ─────────────────────────────────────────────────────────
  let avisou = false;
  const avisarUmaVez = (/** @type {string} */ motivo) => {
    if (avisou) return;
    avisou = true;
    console.warn(`[rd-station] ${motivo} — leads não estão sendo enviados ao CRM.`);
  };

  /**
   * @param {{ email: string, name?: string, phone?: string, form?: string }} lead
   */
  const enviarConversao = lead => {
    if (!RD_API_KEY) {
      avisarUmaVez('RD_API_KEY não preenchida (topo de rd-station.js)');
      return;
    }
    if (!lead || !lead.email) return;

    /** @type {Record<string, string>} */
    const payload = {
      conversion_identifier: PREFIXO + (lead.form || 'formulario'),
      email: lead.email,
    };
    if (lead.name) payload.name = lead.name;
    if (lead.phone) payload.mobile_phone = lead.phone;

    // keepalive: o envio sobrevive se a pessoa navegar logo após o submit.
    // Erro de rede não pode quebrar a experiência: o formulário já agradeceu;
    // aqui só registramos no console para diagnóstico.
    fetch(API_URL + encodeURIComponent(RD_API_KEY), {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'CONVERSION',
        event_family: 'CDP',
        payload,
      }),
    })
      .then(resposta => {
        if (!resposta.ok) {
          console.warn(`[rd-station] conversão recusada (HTTP ${resposta.status})`);
        }
      })
      .catch(erro => {
        console.warn('[rd-station] falha de rede ao enviar conversão', erro);
      });
  };

  document.addEventListener('rd-lead', evento => {
    // CustomEvent vindo de captura.js; o cast é só para o checker.
    const detalhe = /** @type {CustomEvent<{ email: string, name?: string, phone?: string, form?: string }>} */ (
      evento
    ).detail;
    enviarConversao(detalhe);
  });
})();
