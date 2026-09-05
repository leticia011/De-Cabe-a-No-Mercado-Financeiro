/*
  Quem já resgatou o capítulo 1 (localStorage, marcado pelo rd-station.js
  quando o login.html dispara o rd-lead) não precisa ver o link "Fazer login"
  de novo, nem no bloco do topo da página nem na barra lateral do
  marca-página. Troca por uma confirmação em vez do link.
*/
(() => {
  let jaResgatou = false;
  try { jaResgatou = localStorage.getItem('cp1Resgatado') === '1'; } catch { /* sem memória disponível, mantém o link */ }
  if (!jaResgatou) return;
  document.querySelectorAll('.captura-login-link').forEach(link => {
    const aviso = document.createElement('p');
    aviso.className = 'captura-resgatado';
    aviso.textContent = 'Capítulo 1 e aula já garantidos. Confira seu e-mail.';
    link.replaceWith(aviso);
  });
})();

/*
  Captura em duas etapas: primeiro o e-mail, depois nome e telefone.
  Usado tanto pelo formulário da home (#form-capitulo-1, dentro da .lead-strip)
  quanto pelo marca-página das páginas de capítulo (.captura-2etapas).

  As duas marcações usam nomes de classe diferentes por causa do estilo
  (fundo claro na home, escuro no marca-página), então os seletores aceitam
  os dois conjuntos.

  Integração com o RD Station:
  cada envio dispara o evento `rd-lead` no document com
  { email, name, phone, form } em event.detail — basta escutar esse evento
  (ou substituir enviarLead) pelo script de conversão do RD.
*/
(() => {
  const TELEFONE_MINIMO = 10;
  const somenteDigitos = valor => valor.replace(/\D/g, '');

  const enviarLead = (form, dados) => {
    document.dispatchEvent(new CustomEvent('rd-lead', { detail: { ...dados, form: form.dataset.rdForm || form.id || '' } }));
  };

  document.querySelectorAll('[data-rd-form]').forEach(form => {
    const email = form.querySelector('input[type="email"]');
    const nome = form.querySelector('input[name="name"]');
    const telefone = form.querySelector('input[name="phone"]');
    const nascimento = form.querySelector('input[name="birthdate"]');
    const etapa1 = form.querySelector('.captura-etapa-1, .captura-primeiro-passo');
    const etapa2 = form.querySelector('.captura-etapa-2, .captura-segundo-passo');
    const avancar = form.querySelector('[data-capture-continue]');
    const enviar = form.querySelector('[data-capture-submit], [data-static-submit]');
    const status = form.querySelector('.form-status');
    if (!email || !etapa1 || !etapa2 || !avancar || !enviar) return;

    const aviso = mensagem => { if (status) status.textContent = mensagem; };

    const revelar = () => {
      if (!email.value.trim() || !email.checkValidity()) {
        aviso('Digite um e-mail válido para continuar.');
        email.focus();
        return;
      }
      etapa1.hidden = true;
      etapa2.hidden = false;
      aviso('');
      nome?.focus();
    };

    const concluir = () => {
      if (!nome?.value.trim()) {
        aviso('Informe o seu nome.');
        nome?.focus();
        return;
      }
      if (somenteDigitos(telefone?.value || '').length < TELEFONE_MINIMO) {
        aviso('Informe um telefone com DDD.');
        telefone?.focus();
        return;
      }
      if (nascimento && !nascimento.value) {
        aviso('Informe sua data de nascimento.');
        nascimento.focus();
        return;
      }
      enviarLead(form, {
        email: email.value.trim(),
        name: nome.value.trim(),
        phone: telefone.value.trim(),
        ...(nascimento ? { birthdate: nascimento.value } : {}),
      });
      etapa2.hidden = true;
      aviso('Pronto! Em instantes o capítulo e a aula chegam no seu e-mail.');
    };

    avancar.addEventListener('click', revelar);
    enviar.addEventListener('click', concluir);
    form.addEventListener('keydown', evento => {
      if (evento.key !== 'Enter') return;
      evento.preventDefault();
      if (etapa2.hidden) revelar(); else concluir();
    });
  });
})();

/*
  Lista de espera do próximo livro: o formulário fica fechado atrás de um botão
  e só aparece quando a pessoa demonstra interesse. Dispara o mesmo evento
  rd-lead da captura de capítulo.
*/
(() => {
  const TELEFONE_MINIMO = 10;
  const somenteDigitos = valor => valor.replace(/\D/g, '');

  document.querySelectorAll('[data-waitlist]').forEach(bloco => {
    const abrir = bloco.querySelector('[data-waitlist-abrir]');
    const form = bloco.querySelector('form[data-rd-form]');
    const enviar = bloco.querySelector('[data-waitlist-enviar]');
    if (!abrir || !form || !enviar) return;

    const nome = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[type="email"]');
    const telefone = form.querySelector('input[name="phone"]');
    const avisoLancamento = form.querySelector('input[name="aviso_lancamento"]');
    const status = form.querySelector('.form-status');
    const aviso = mensagem => { if (status) status.textContent = mensagem; };

    const mostrar = () => {
      form.hidden = false;
      abrir.setAttribute('aria-expanded', 'true');
      abrir.hidden = true;
      nome?.focus();
    };

    const recolher = () => {
      form.hidden = true;
      abrir.hidden = false;
      abrir.setAttribute('aria-expanded', 'false');
      abrir.focus();
    };

    abrir.addEventListener('click', mostrar);
    bloco.querySelector('[data-waitlist-fechar]')?.addEventListener('click', recolher);
    form.addEventListener('keydown', evento => {
      if (evento.key === 'Escape') recolher();
    });

    const concluir = () => {
      if (!nome?.value.trim()) { aviso('Informe o seu nome.'); nome?.focus(); return; }
      if (!email?.value.trim() || !email.checkValidity()) { aviso('Digite um e-mail válido.'); email?.focus(); return; }
      if (somenteDigitos(telefone?.value || '').length < TELEFONE_MINIMO) { aviso('Informe um telefone com DDD.'); telefone?.focus(); return; }
      document.dispatchEvent(new CustomEvent('rd-lead', {
        detail: { email: email.value.trim(), name: nome.value.trim(), phone: telefone.value.trim(), aviso_lancamento: Boolean(avisoLancamento?.checked), form: form.dataset.rdForm || form.id || '' }
      }));
      form.hidden = true;
      aviso(avisoLancamento?.checked ? 'Pronto! Você entrou na fila e receberá o aviso do lançamento.' : 'Pronto! Você entrou na fila de espera.');
    };

    enviar.addEventListener('click', concluir);
    form.addEventListener('keydown', evento => {
      if (evento.key !== 'Enter') return;
      evento.preventDefault();
      concluir();
    });
  });
})();
