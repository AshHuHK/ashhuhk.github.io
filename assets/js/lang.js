(function () {
  function setLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('zhihang-lang', lang);
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.textContent = lang === 'zh' ? 'English' : '中文';
      btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
    });
  }
  var saved = localStorage.getItem('zhihang-lang') || 'en';
  setLang(saved);
  document.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-lang-toggle]');
    if (!btn) return;
    var current = document.documentElement.getAttribute('data-lang') || 'en';
    setLang(current === 'en' ? 'zh' : 'en');
  });
})();
