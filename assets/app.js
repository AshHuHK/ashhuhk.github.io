const body = document.body;
const toggle = document.querySelector('[data-lang-toggle]');
const savedLang = localStorage.getItem('ash-site-lang');
if (savedLang === 'zh') body.classList.add('zh');
if (toggle) {
  toggle.addEventListener('click', () => {
    body.classList.toggle('zh');
    localStorage.setItem('ash-site-lang', body.classList.contains('zh') ? 'zh' : 'en');
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

const buttons = Array.from(document.querySelectorAll('.filter-button'));
const pubs = Array.from(document.querySelectorAll('.publication'));
const search = document.getElementById('pubSearch');
let activeFilter = 'all';
function applyPublicationFilters() {
  const query = (search?.value || '').trim().toLowerCase();
  pubs.forEach(pub => {
    const tags = pub.dataset.filterTags || '';
    const text = pub.textContent.toLowerCase();
    const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
    const matchesQuery = !query || text.includes(query);
    pub.classList.toggle('is-hidden', !(matchesFilter && matchesQuery));
  });
}
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('is-active'));
    button.classList.add('is-active');
    activeFilter = button.dataset.filter;
    applyPublicationFilters();
  });
});
search?.addEventListener('input', applyPublicationFilters);

const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav a'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });
sections.forEach(section => observer.observe(section));
