(function(){
  // Header turns translucent with a hairline once the page scrolls.
  var header=document.querySelector('.site-header');
  function onScroll(){
    if(!header)return;
    var on=window.scrollY>8;
    header.style.background=on?'rgba(255, 255, 255, 0.82)':'#ffffff';
    header.style.borderBottomColor=on?'rgba(0, 33, 71, 0.12)':'transparent';
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Email assembled at runtime so crawlers cannot harvest it.
  document.querySelectorAll('.js-email').forEach(function(a){
    var e=a.dataset.u+'@'+a.dataset.d;a.href='mailto:'+e;a.textContent=e;
  });

  // Abstract: space opens at once, text floats in.
  document.querySelectorAll('.js-abstract').forEach(function(b){
    b.addEventListener('click',function(){
      var t=document.getElementById(b.dataset.target);
      var inner=t.firstElementChild.firstElementChild;
      var open=t.style.gridTemplateRows==='1fr';
      t.style.gridTemplateRows=open?'0fr':'1fr';
      inner.style.opacity=open?'0':'1';
      inner.style.transform=open?'translateY(10px)':'translateY(0px)';
      var svg=b.querySelector('svg');if(svg)svg.style.transform=open?'rotate(0deg)':'rotate(90deg)';
      b.lastChild.textContent=open?'Abstract':'Hide abstract';
      b.setAttribute('aria-expanded',open?'false':'true');
    });
  });
})();
