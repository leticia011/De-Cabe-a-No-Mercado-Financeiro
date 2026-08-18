/*
  Números da seção do autor: contam de zero até o valor quando a seção
  entra na tela, uma única vez. Quem pediu menos movimento vê o número
  final direto.
*/
/*
  Sangria da foto: mede quanto falta do início da foto até a borda esquerda
  da janela e publica em --sangria, para o CSS puxar a imagem até lá.
*/
(() => {
  const secao = document.querySelector(".author-feature");
  const foto = secao?.querySelector(".foto-box");
  if (!foto) return;

  const medir = () => {
    secao.style.setProperty("--sangria", "0px");
    const inicio = foto.getBoundingClientRect().left;
    secao.style.setProperty("--sangria", Math.max(0, Math.round(inicio)) + "px");
  };

  medir();
  addEventListener("resize", medir);
  addEventListener("load", medir);
})();

(() => {
  const grade = document.querySelector('.author-stats');
  if (!grade) return;

  const alvos = [...grade.querySelectorAll('strong[data-conta]')].map(el => ({
    el,
    valor: parseInt(el.dataset.conta, 10),
    sufixo: el.dataset.sufixo || ''
  }));
  if (!alvos.length) return;

  const semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (semMovimento || !('IntersectionObserver' in window)) return;

  grade.dataset.contou = 'nao';
  alvos.forEach(({ el, sufixo }) => { el.textContent = '0' + sufixo; });

  const DURACAO = 1100;
  const suavizar = t => 1 - Math.pow(1 - t, 3);

  const contar = inicio => {
    const passo = agora => {
      const t = Math.min(1, (agora - inicio) / DURACAO);
      alvos.forEach(({ el, valor, sufixo }) => {
        el.textContent = Math.round(valor * suavizar(t)) + sufixo;
      });
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  const olho = new IntersectionObserver(([entrada]) => {
    if (!entrada.isIntersecting) return;
    olho.disconnect();
    grade.dataset.contou = 'sim';
    requestAnimationFrame(contar);
  }, { threshold: 0.4 });

  olho.observe(grade);
})();
