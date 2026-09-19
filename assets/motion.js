/* Ensemble BOAZ — motion layer v1 (GSAP + Lenis). The site renders fully without this file. */
(function(){
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var fine=matchMedia('(pointer:fine)').matches,wide=innerWidth>900,home=!!document.querySelector('.hero');
var CDN='https://cdn.jsdelivr.net/npm/';
function load(s){return new Promise(function(ok,no){var e=document.createElement('script');e.src=s;e.onload=ok;e.onerror=no;document.head.appendChild(e)})}
load(CDN+'gsap@3.13.0/dist/gsap.min.js').then(function(){return Promise.all([load(CDN+'gsap@3.13.0/dist/ScrollTrigger.min.js'),load(CDN+'lenis@1.3.26/dist/lenis.min.js')])}).then(init).catch(function(){});

function init(){
  gsap.registerPlugin(ScrollTrigger);
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var nav=$('#nav');

  /* ---- smooth scroll ---- */
  var lenis=new Lenis({lerp:.09,anchors:true});
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);
  lenis.on('scroll',function(e){if(nav)nav.classList.toggle('hide',e.direction===1&&e.scroll>320)});
  addEventListener('load',function(){ScrollTrigger.refresh()});

  /* ---- page curtain ---- */
  var pt=document.createElement('div');pt.id='pt';document.body.appendChild(pt);
  if(!$('#intro')){pt.classList.add('on');gsap.fromTo(pt,{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 0 100% 0)',duration:.9,ease:'power4.inOut',onComplete:function(){pt.classList.remove('on')}})}
  addEventListener('pageshow',function(e){if(e.persisted)pt.classList.remove('on')});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
    var h=a.getAttribute('href');if(!h||/^(#|mailto:|tel:|http|javascript)/.test(h))return;
    e.preventDefault();pt.classList.add('on');
    gsap.fromTo(pt,{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0 0 0 0)',duration:.7,ease:'power4.inOut',onComplete:function(){location.href=h}});
  });

  /* ---- cursor (desktop) ---- */
  if(fine&&wide){
    var cur=document.createElement('div');cur.id='cur';cur.innerHTML='<i></i>';document.body.appendChild(cur);document.documentElement.classList.add('has-cur');
    var cx=gsap.quickTo(cur,'x',{duration:.35,ease:'power3'}),cy=gsap.quickTo(cur,'y',{duration:.35,ease:'power3'});
    addEventListener('mousemove',function(e){cx(e.clientX);cy(e.clientY);cur.classList.add('v')},{passive:true});
    document.addEventListener('mouseleave',function(){cur.classList.remove('v')});
    var HOV='a,button,select,.frame,.pcard,.player,.vcard,.member .photo,.filters span,.more';
    document.addEventListener('mouseover',function(e){if(e.target.closest(HOV))cur.classList.add('h')});
    document.addEventListener('mouseout',function(e){if(e.target.closest(HOV))cur.classList.remove('h')});
  }

  /* ---- shared reveal helper: take element over from CSS .rv ---- */
  function own(els){els.forEach(function(el){el.classList.add('gm')});return els}
  function batch(sel,from,stagger){var els=own($$(sel));if(!els.length)return;gsap.set(els,from);
    ScrollTrigger.batch(els,{start:'top 88%',once:true,onEnter:function(b){gsap.to(b,{opacity:1,y:0,x:0,clipPath:'inset(0 0 0% 0)',duration:1.3,ease:'power3.out',stagger:stagger||.12,overwrite:true})}})}

  /* ---- page header letters (subpages) ---- */
  var en=$('.ph .en');
  if(en){var t=en.textContent;en.innerHTML=t.split('').map(function(c){return '<span class="c"><i>'+(c===' '?'&nbsp;':c)+'</i></span>'}).join('');
    gsap.from($$('.ph .en .c i'),{yPercent:110,duration:1.1,ease:'power4.out',stagger:.035,delay:.35})}

  /* ================= HOME ================= */
  if(home){
    /* strings canvas — five strings that ripple under the pointer */
    if(fine&&wide){
      var hero=$('.hero'),cv=document.createElement('canvas');cv.className='strings';hero.insertBefore(cv,hero.firstChild);
      var ctx=cv.getContext('2d'),W,H,N=90,S=[],mx=-1,my=-1,t0=0;
      function size(){W=cv.width=hero.clientWidth;H=cv.height=hero.clientHeight;S=[];for(var k=0;k<5;k++){var a=[],v=[];for(var i=0;i<=N;i++){a.push(0);v.push(0)}S.push({y:H*(.44+k*.095),a:a,v:v,ph:k*1.3})}}
      size();addEventListener('resize',size);
      hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top},{passive:true});
      hero.addEventListener('mouseleave',function(){mx=my=-1});
      (function frame(ts){t0=ts/1000;ctx.clearRect(0,0,W,H);
        S.forEach(function(s){var a=s.a,v=s.v,i;
          if(my>0&&Math.abs(my-s.y)<34){var j=Math.round(mx/W*N);if(j>0&&j<N)v[j]+=(my-s.y)*.12}
          for(i=1;i<N;i++){v[i]+=(a[i-1]+a[i+1]-2*a[i])*.24;v[i]*=.965}
          for(i=1;i<N;i++)a[i]+=v[i];
          ctx.beginPath();for(i=0;i<=N;i++){var x=i/N*W,y=s.y+a[i]+Math.sin(t0*.6+i*.18+s.ph)*1.6;if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y)}
          ctx.strokeStyle='rgba(95,116,120,.17)';ctx.lineWidth=1;ctx.stroke()});
        requestAnimationFrame(frame)})(0);
    }
    /* scroll cue */
    var cue=document.createElement('div');cue.className='scue';cue.innerHTML='<span>SCROLL</span><i></i>';$('.hero').appendChild(cue);
    gsap.to(cue,{opacity:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'30% top',scrub:true}});
    /* watermark: wrap so CSS drift + scroll/mouse parallax coexist */
    var wm=$('.hero .wm');
    if(wm){var ww=document.createElement('div');ww.className='wmw';wm.parentNode.insertBefore(ww,wm);ww.appendChild(wm);
      gsap.to(ww,{y:-140,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
      if(fine&&wide){var wx=gsap.quickTo(ww,'x',{duration:1.2,ease:'power2'});
        addEventListener('mousemove',function(e){wx((e.clientX/innerWidth-.5)*40)},{passive:true})}}
    gsap.to('.hero .pic',{y:-70,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('.hero .txt',{y:50,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

    /* marquee — speeds up with scroll velocity */
    var tr=$('#marqTrack');
    if(tr){var mq=gsap.to(tr,{xPercent:-50,ease:'none',duration:38,repeat:-1});
      ScrollTrigger.create({onUpdate:function(st){var v=Math.min(6,1+Math.abs(st.getVelocity())/400);mq.timeScale(v);gsap.to(mq,{timeScale:1,duration:1.4,overwrite:true,ease:'power2.out'})}})}

    /* statement — words brighten as you scroll (rebuilt when language changes) */
    var q=$('.state .q'),wtw=null;
    function words(){if(!q)return;if(wtw){wtw.scrollTrigger&&wtw.scrollTrigger.kill();wtw.kill();wtw=null}
      var tw=document.createTreeWalker(q,NodeFilter.SHOW_TEXT),ns=[],n;while(n=tw.nextNode())if(n.nodeValue.trim())ns.push(n);
      ns.forEach(function(t){var f=document.createDocumentFragment();t.nodeValue.split(/(\s+)/).forEach(function(p){if(!p)return;if(/^\s+$/.test(p))f.appendChild(document.createTextNode(p));else{var s=document.createElement('span');s.className='w';s.textContent=p;f.appendChild(s)}});t.parentNode.replaceChild(f,t)});
      q.classList.add('gm');
      wtw=gsap.fromTo($$('.w',q),{opacity:.14},{opacity:1,ease:'none',stagger:.06,scrollTrigger:{trigger:'.state',start:'top 75%',end:'top 15%',scrub:.6}})}
    words();var ls=$('#langSel');if(ls)ls.addEventListener('change',function(){setTimeout(function(){words();ScrollTrigger.refresh()},0)});
    gsap.to('.state .orn',{rotate:10,y:-40,ease:'none',scrollTrigger:{trigger:'.state',start:'top bottom',end:'bottom top',scrub:true}});
    gsap.to('.state .p',{y:-30,ease:'none',scrollTrigger:{trigger:'.state',start:'top bottom',end:'bottom top',scrub:true}});

    /* ledger rows */
    batch('.ledger dl div',{opacity:0,y:26},.1);
    var dl=$('.ledger dl');if(dl)gsap.from(dl,{scaleX:0,transformOrigin:'left',duration:1.4,ease:'power3.inOut',scrollTrigger:{trigger:dl,start:'top 88%',once:true}});
  }

  /* ================= SUBPAGES ================= */
  batch('.timeline .t-item .year',{opacity:0,x:-28},.08);
  batch('.timeline .t-item .desc',{opacity:0,y:22},.08);
  own($$('.timeline .t-item'));
  batch('.poster-grid:not(.extra) .pcard',{opacity:0,y:50,clipPath:'inset(0 0 30% 0)'},.09);
  batch('.member',{opacity:0,y:40,clipPath:'inset(0 0 25% 0)'},.09);
  batch('.c-lines div, .contact form > *',{opacity:0,y:18},.07);
  batch('.contact .lede, .contact .desc, .ens-band .q > *, .ens-lede, .more-note',{opacity:0,y:24},.12);
  batch('.vcard',{opacity:0,x:-24},.06);
  var pl=$('.player');if(pl)gsap.from(pl,{opacity:0,scale:.96,duration:1.2,ease:'power3.out',delay:.3});
  /* members band parallax + photo tilt */
  var band=$('.ens-band > img');
  if(band){var bw=document.createElement('div');bw.className='band';band.parentNode.insertBefore(bw,band);bw.appendChild(band);
    gsap.fromTo(band,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:bw,start:'top bottom',end:'bottom top',scrub:true}})}
  if(fine&&wide)$$('.member .photo').forEach(function(p){
    p.addEventListener('mousemove',function(e){var r=p.getBoundingClientRect();gsap.to(p,{rotateY:((e.clientX-r.left)/r.width-.5)*10,rotateX:(.5-(e.clientY-r.top)/r.height)*10,transformPerspective:800,duration:.6,ease:'power2.out'})});
    p.addEventListener('mouseleave',function(){gsap.to(p,{rotateX:0,rotateY:0,duration:.9,ease:'power3.out'})})});
  /* footer */
  var ft=$('footer .wrap');if(ft)gsap.from(ft,{opacity:0,y:24,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'footer',start:'top 92%',once:true}});
}
})();
