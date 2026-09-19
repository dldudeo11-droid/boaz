/* Ensemble BOAZ — motion layer v2 (GSAP + Lenis + seamless page swap so the music never stops).
   The site renders fully without this file. */
(function(){
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var fine=matchMedia('(pointer:fine)').matches,wide=innerWidth>900;
var CDN='https://cdn.jsdelivr.net/npm/';
function load(s){return new Promise(function(ok,no){var e=document.createElement('script');e.src=s;e.onload=ok;e.onerror=no;document.head.appendChild(e)})}
load(CDN+'gsap@3.13.0/dist/gsap.min.js').then(function(){return Promise.all([load(CDN+'gsap@3.13.0/dist/ScrollTrigger.min.js'),load(CDN+'lenis@1.3.26/dist/lenis.min.js')])}).then(init).catch(function(){});

var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var lenis,pt,pac=null,APP=($('script[src*="app.js"]')||{}).getAttribute?$('script[src*="app.js"]').getAttribute('src'):'assets/app.js';

function init(){
  gsap.registerPlugin(ScrollTrigger);

  /* ---- smooth scroll (persistent) ---- */
  lenis=new Lenis({lerp:.09,anchors:true});
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);
  lenis.on('scroll',function(e){var nav=$('#nav');if(nav)nav.classList.toggle('hide',e.direction===1&&e.scroll>320)});
  addEventListener('load',function(){ScrollTrigger.refresh()});

  /* ---- curtain + seamless navigation (persistent) ---- */
  pt=document.createElement('div');pt.id='pt';document.body.appendChild(pt);
  if(!$('#intro')){pt.classList.add('on');gsap.fromTo(pt,{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 0 100% 0)',duration:.9,ease:'power4.inOut',onComplete:function(){pt.classList.remove('on')}})}
  addEventListener('pageshow',function(e){if(e.persisted)pt.classList.remove('on')});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
    var h=a.getAttribute('href');if(!h||/^(#|mailto:|tel:|http|javascript)/.test(h))return;
    e.preventDefault();go(h,true);
  });
  addEventListener('popstate',function(){go(location.pathname.split('/').pop()||'./',false)});
  history.replaceState({boaz:1},'',location.href);

  /* ---- cursor (desktop, persistent) ---- */
  if(fine&&wide){
    var cur=document.createElement('div');cur.id='cur';cur.innerHTML='<i></i>';document.body.appendChild(cur);document.documentElement.classList.add('has-cur');
    var cx=gsap.quickTo(cur,'x',{duration:.35,ease:'power3'}),cy=gsap.quickTo(cur,'y',{duration:.35,ease:'power3'});
    addEventListener('mousemove',function(e){cx(e.clientX);cy(e.clientY);cur.classList.add('v')},{passive:true});
    document.addEventListener('mouseleave',function(){cur.classList.remove('v')});
    var HOV='a,button,select,.frame,.pcard,.player,.vcard,.member .photo,.filters span,.more';
    document.addEventListener('mouseover',function(e){if(e.target.closest(HOV))cur.classList.add('h')});
    document.addEventListener('mouseout',function(e){if(e.target.closest(HOV))cur.classList.remove('h')});
  }
  page();
}

/* Swap only the page content: #bgm keeps playing, nav/menu/content come from the fetched page. */
var busy=false;
function go(h,push){
  if(busy)return;busy=true;
  var fetched=fetch(h,{credentials:'same-origin'}).then(function(r){if(!r.ok)throw 0;return r.text()});
  var m=$('#mnav');if(m)m.classList.remove('open');document.body.style.overflow='';
  pt.classList.add('on');
  var curtain=gsap.fromTo(pt,{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0 0 0 0)',duration:.7,ease:'power4.inOut'}).then();
  Promise.all([fetched,curtain]).then(function(r){
    var doc=new DOMParser().parseFromString(r[0],'text/html');
    var keep=[$('#bgm'),pt,$('#cur')];
    ScrollTrigger.getAll().forEach(function(t){t.kill()});
    if(pac){pac.abort();pac=null}
    document.title=doc.title;
    $$('body > *').forEach(function(c){if(keep.indexOf(c)<0)c.remove()});
    var frag=document.createDocumentFragment();
    $$('body > *',doc).forEach(function(c){if(c.id==='bgm'||c.tagName==='SCRIPT')return;frag.appendChild(document.adoptNode(c))});
    document.body.insertBefore(frag,pt);
    document.body.className='';
    if(push)history.pushState({boaz:1},'',h);
    lenis.scrollTo(0,{immediate:true});window.scrollTo(0,0);
    return load(APP);
  }).then(function(){
    page();lenis.resize();ScrollTrigger.refresh();
    gsap.to(pt,{clipPath:'inset(0 0 100% 0)',duration:.8,ease:'power4.inOut',onComplete:function(){pt.classList.remove('on')}});
    busy=false;
  }).catch(function(){location.href=h});
}

/* ---- per-page effects (re-run after every swap) ---- */
function page(){
  var ac=pac=new AbortController(),sig={signal:ac.signal,passive:true};
  var home=!!$('.hero3');
  function own(els){els.forEach(function(el){el.classList.add('gm')});return els}
  function batch(sel,from,stagger){var els=own($$(sel));if(!els.length)return;gsap.set(els,from);
    ScrollTrigger.batch(els,{start:'top 88%',once:true,onEnter:function(b){gsap.to(b,{opacity:1,y:0,x:0,clipPath:'inset(0 0 0% 0)',duration:1.3,ease:'power3.out',stagger:stagger||.12,overwrite:true})}})}

  /* page header letters (subpages) */
  var en=$('.ph .en');
  if(en&&!en.querySelector('.c')){var t=en.textContent;en.innerHTML=t.split('').map(function(c){return '<span class="c"><i>'+(c===' '?'&nbsp;':c)+'</i></span>'}).join('');
    gsap.from($$('.ph .en .c i'),{yPercent:110,duration:1.1,ease:'power4.out',stagger:.035,delay:.35})}

  if(home){
    /* headline rises line by line (re-split after language change) */
    var h1=$('#h1');
    function lines(){if(!h1||h1.querySelector('.l'))return;h1.innerHTML=h1.innerHTML.split('<br>').map(function(l){return '<span class="l"><span>'+l+'</span></span>'}).join('');
      gsap.to($$('.l > span',h1),{y:0,duration:1.6,ease:'power3.out',stagger:.22,delay:document.body.classList.contains('ready')?.3:1.0})}
    lines();var ls=$('#langSel');if(ls)ls.addEventListener('change',function(){setTimeout(lines,0)},sig);
    if(!document.body.classList.contains('ready')){var mo=new MutationObserver(function(){if(document.body.classList.contains('ready')){mo.disconnect();$$('.l > span',h1).forEach(function(s){gsap.set(s,{y:'110%'})});gsap.to($$('.l > span',h1),{y:0,duration:1.6,ease:'power3.out',stagger:.22,delay:.4})}});mo.observe(document.body,{attributes:true,attributeFilter:['class']})}
    /* eyebrow ticker: slow drift, nudged by scroll speed */
    var tk=$('#tk');
    if(tk){var tkt=gsap.to(tk,{xPercent:-50,ease:'none',duration:wide?46:30,repeat:-1});
      ScrollTrigger.create({onUpdate:function(st){tkt.timeScale(Math.min(4,1+Math.abs(st.getVelocity())/600));gsap.to(tkt,{timeScale:1,duration:1.6,overwrite:true,ease:'power2.out'})}})}
    /* photos: slow breathing crossfade every 8s */
    var imgs=$$('#ph img'),k=0;
    function cap(im){var en=document.documentElement.lang!=='ko',n=$('#capN'),t=$('#capT');if(!n)return;gsap.to([n,t],{opacity:0,duration:.6,onComplete:function(){n.textContent=im.dataset.y;t.textContent=en?im.dataset.en:im.dataset.ko;gsap.to([n,t],{opacity:1,duration:1.2})}})}
    function show(i,first){var im=imgs[i];imgs.forEach(function(x){x.classList.remove('on')});
      gsap.fromTo(im,{opacity:first?1:0,scale:1.06},{opacity:1,scale:1,duration:first?2.8:2.4,ease:'power2.out'});
      gsap.to(im,{scale:1.035,duration:9,ease:'none',delay:first?2.8:2.4});
      if(!first){var prev=imgs[(i+imgs.length-1)%imgs.length];gsap.to(prev,{opacity:0,duration:2.4,ease:'power2.inOut'});cap(im)}}
    if(imgs.length){show(0,true);var tm=setInterval(function(){k=(k+1)%imgs.length;show(k)},8000);ac.signal.addEventListener('abort',function(){clearInterval(tm)})}
    if(ls)ls.addEventListener('change',function(){setTimeout(function(){cap(imgs[k])},0)},sig);
    if(wide){gsap.to('#ph',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero3',start:'top top',end:'bottom top',scrub:true}});
      gsap.to('.hero3 .txt',{y:-40,opacity:0,ease:'none',scrollTrigger:{trigger:'.hero3',start:'40% top',end:'bottom top',scrub:true}})}
    batch('.intro .rv',{opacity:0,y:24},.16);
  }

  /* subpages */
  batch('.timeline .t-item .year',{opacity:0,x:-28},.08);
  batch('.timeline .t-item .desc',{opacity:0,y:22},.08);
  own($$('.timeline .t-item'));
  batch('.poster-grid:not(.extra) .pcard',{opacity:0,y:50,clipPath:'inset(0 0 30% 0)'},.09);
  batch('.member',{opacity:0,y:40,clipPath:'inset(0 0 25% 0)'},.09);
  batch('.c-lines div, .contact form > *',{opacity:0,y:18},.07);
  batch('.contact .lede, .contact .desc, .ens-band .q > *, .ens-lede, .more-note',{opacity:0,y:24},.12);
  batch('.vcard',{opacity:0,x:-24},.06);
  var pl=$('.player');if(pl)gsap.from(pl,{opacity:0,scale:.96,duration:1.2,ease:'power3.out',delay:.3});
  var band=$('.ens-band .wrap > img');
  if(band){own([band]);var bw=document.createElement('div');bw.className='band';band.parentNode.insertBefore(bw,band);bw.appendChild(band);
    gsap.fromTo(band,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:bw,start:'top bottom',end:'bottom top',scrub:true}})}
  if(fine&&wide)$$('.member .photo').forEach(function(p){
    p.addEventListener('mousemove',function(e){var r=p.getBoundingClientRect();gsap.to(p,{rotateY:((e.clientX-r.left)/r.width-.5)*10,rotateX:(.5-(e.clientY-r.top)/r.height)*10,transformPerspective:800,duration:.6,ease:'power2.out'})},sig);
    p.addEventListener('mouseleave',function(){gsap.to(p,{rotateX:0,rotateY:0,duration:.9,ease:'power3.out'})},sig)});
  var ft=$('footer .wrap');if(ft)gsap.from(ft,{opacity:0,y:24,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'footer',start:'top 92%',once:true}});
}
})();
