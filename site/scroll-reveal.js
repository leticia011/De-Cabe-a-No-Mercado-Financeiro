/*
  Entrada suave de seções ao rolar a página.

  Progressivo por natureza: só esconde qualquer coisa depois de confirmar que
  IntersectionObserver existe e o visitante não pediu menos movimento. Sem
  isso, os elementos [data-reveal] ficam exatamente como o HTML os define —
  sempre visíveis, inclusive para crawlers sem JS.
*/
(() => {
  if (!('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const alvos = document.querySelectorAll('[data-reveal]');
  if (!alvos.length) return;

  document.documentElement.classList.add('reveal-active');

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-visible');
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  alvos.forEach(alvo => observador.observe(alvo));
})();
