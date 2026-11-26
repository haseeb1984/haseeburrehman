const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const contactEmail=window.SITE_CONFIG?.email;
if(contactEmail){
  document.querySelectorAll('[data-site-email-link]').forEach(link=>{link.href='mailto:'+contactEmail;});
  document.querySelectorAll('[data-site-email-text]').forEach(node=>{node.textContent=contactEmail;});
}