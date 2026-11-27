const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const contactEmail=window.SITE_CONFIG?.email;
if(contactEmail){
  document.querySelectorAll('[data-site-email-link]').forEach(link=>{link.href='mailto:'+contactEmail;});
  document.querySelectorAll('[data-site-email-text]').forEach(node=>{node.textContent=contactEmail;});
}
const menuToggle=document.querySelector('.menu-toggle');
const primaryNavigation=document.getElementById('primary-navigation');
if(menuToggle&&primaryNavigation){
  menuToggle.addEventListener('click',()=>{
    const isOpen=menuToggle.getAttribute('aria-expanded')==='true';
    menuToggle.setAttribute('aria-expanded',String(!isOpen));
    menuToggle.setAttribute('aria-label',isOpen?'Open navigation':'Close navigation');
    primaryNavigation.classList.toggle('nav-open',!isOpen);
  });
  primaryNavigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    primaryNavigation.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.setAttribute('aria-label','Open navigation');
  }));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true'){
      primaryNavigation.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded','false');
      menuToggle.setAttribute('aria-label','Open navigation');
      menuToggle.focus();
    }
  });
}

const printResumeButton=document.getElementById('print-resume');
if(printResumeButton)printResumeButton.addEventListener('click',()=>window.print());
