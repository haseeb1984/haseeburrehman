document.documentElement.classList.add('js-ready');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

(() => {
  const panel = document.getElementById('search-panel');
  const openButton = document.getElementById('search-open');
  const closeButton = document.getElementById('search-close');
  const input = document.getElementById('portfolio-search');
  const results = document.getElementById('search-results');
  if (!panel || !input || !results) return;

  const records = [];
  document.querySelectorAll('#work .project, #experience .timeline article, #capabilities .capability-grid article').forEach((el, i) => {
    if (!el.id) el.id = 'portfolio-item-' + (i + 1);
    const title = el.querySelector('h3')?.textContent.trim() || 'Portfolio item';
    const kind = el.matches('.project') ? 'PROJECT' : el.matches('.timeline article') ? 'EXPERIENCE' : 'CAPABILITY';
    records.push({title, kind, text:(title + ' ' + el.innerText).toLowerCase(), href:'#' + el.id});
  });

  const defaults = [
    {title:'Selected engineering work',kind:'SECTION',text:'projects portfolio case studies',href:'#work'},
    {title:'Professional experience',kind:'SECTION',text:'career history royal cyber 7ctech it consultants',href:'#experience'},
    {title:'Technical capabilities',kind:'SECTION',text:'skills technologies architecture integrations automation',href:'#capabilities'},
    {title:'About my approach',kind:'SECTION',text:'approach ownership lifecycle',href:'#about'}
  ];
  let matches = defaults;
  let active = 0;

  function open() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    input.value='';
    render('');
    input.focus();
  }
  function close() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    openButton?.focus();
  }
  function render(query) {
    const q=query.trim().toLowerCase();
    matches=q ? records.filter(r => (r.text + ' ' + r.kind.toLowerCase()).includes(q)) : defaults;
    matches=matches.slice(0,12);
    active=0;
    if (!matches.length) {
      results.innerHTML='<p>No exact match. Try a project name, technology, role or capability.</p>';
      return;
    }
    results.innerHTML=matches.map((r,i) =>
      '<a class="' + (i===0?'active':'') + '" data-index="' + i + '" href="' + r.href + '"><small>' + r.kind + '</small><strong>' + r.title.replace(/[&<>]/g,'') + '</strong><span>↗</span></a>'
    ).join('');
  }
  function move(step) {
    if (!matches.length) return;
    active=(active+step+matches.length)%matches.length;
    results.querySelectorAll('a').forEach((a,i)=>{
      a.classList.toggle('active',i===active);
      if(i===active) a.scrollIntoView({block:'nearest'});
    });
  }

  openButton?.addEventListener('click',open);
  closeButton?.addEventListener('click',close);
  panel.addEventListener('click',e=>{if(e.target===panel) close();});
  input.addEventListener('input',()=>render(input.value));
  results.addEventListener('click',e=>{if(e.target.closest('a')) close();});
  document.addEventListener('keydown',e=>{
    const tag=document.activeElement?.tagName;
    const typing=['INPUT','TEXTAREA','SELECT'].includes(tag) || document.activeElement?.isContentEditable;
    if(e.key==='/' && !typing && !panel.classList.contains('open')) {e.preventDefault();open();}
    else if(e.key==='Escape' && panel.classList.contains('open')) close();
    else if(panel.classList.contains('open') && e.key==='ArrowDown') {e.preventDefault();move(1);}
    else if(panel.classList.contains('open') && e.key==='ArrowUp') {e.preventDefault();move(-1);}
    else if(panel.classList.contains('open') && e.key==='Enter' && matches[active]) {window.location.hash=matches[active].href;close();}
  });
})();
