document.documentElement.classList.add('js-ready');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
