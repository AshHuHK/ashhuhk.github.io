(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('.lang-toggle');
  const saved = localStorage.getItem('preferred-lang');
  const initial = saved || 'en';

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    localStorage.setItem('preferred-lang', lang);
    if (toggle) toggle.textContent = lang === 'zh' ? 'English' : '中文';
    document.querySelectorAll('[data-en][data-zh]').forEach((node) => {
      node.textContent = node.dataset[lang];
    });
  }

  setLang(initial);
  if (toggle) {
    toggle.addEventListener('click', () => {
      setLang(root.getAttribute('data-lang') === 'zh' ? 'en' : 'zh');
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
