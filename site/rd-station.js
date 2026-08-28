(() => {
  'use strict';
  const RD_TRACKING_TOKEN = '260d9d4f-98b4-4762-b0b1-5d3764804865';
  const RD_API_KEY = '08e148b84f9e2721389531dcb9804090';
  const API_URL = 'https://api.rd.services/platform/conversions?api_key=';
  const PREFIXO = 'site-livro-';
  if (RD_TRACKING_TOKEN) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://d335luupugsy2.cloudfront.net/js/loader-scripts/${RD_TRACKING_TOKEN}-loader.js`;
    document.head.appendChild(s);
  }
  let avisou = false;
  const avisarUmaVez = ( motivo) => {
    if (avisou) return;
    avisou = true;
    console.warn(`[rd-station] ${motivo} — leads não estão sendo enviados ao CRM.`);
  };
  const enviarConversao = lead => {
    if (!RD_API_KEY) {
      avisarUmaVez('RD_API_KEY não preenchida (topo de rd-station.js)');
      return;
    }
    // e-mail é o identificador de praxe do RD, mas alguns formulários (ex.: "mande sua
    // pergunta") pedem celular como obrigatório e deixam o e-mail opcional — sem os dois
    // não tem lead pra registrar.
    if (!lead || (!lead.email && !lead.phone)) return;
    const payload = {
      conversion_identifier: PREFIXO + (lead.form || 'formulario'),
    };
    if (lead.email) payload.email = lead.email;
    if (lead.name) payload.name = lead.name;
    if (lead.phone) payload.mobile_phone = lead.phone;
    if (typeof lead.aviso_lancamento === 'boolean') payload.cf_aviso_lancamento = lead.aviso_lancamento;
    // cf_linkedin / cf_pergunta: nomes de campo personalizado supostos — conferir e
    // ajustar para os nomes reais configurados no painel do RD antes de confiar neles.
    if (lead.linkedin) payload.cf_linkedin = lead.linkedin;
    if (lead.pergunta) payload.cf_pergunta = lead.pergunta;
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
    const detalhe =  (
      evento
    ).detail;
    enviarConversao(detalhe);
  });
})();
