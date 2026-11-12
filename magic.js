/* Decorative enhancement only: event data, RSVP, photo and audio remain in app.js. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const invitation = document.getElementById('invitation');
  const active = new Set();
  const shapes = {
    star:'<path d="m32 6 6 20 20 6-20 6-6 20-6-20L6 32l20-6Z"/>',
    feather:'<path d="M12 55 46 14M20 45C6 29 28 7 53 8c0 24-14 48-33 37ZM25 39l-1-13m9 3 13-1m-21 11 14-1"/>',
    glasses:'<circle cx="17" cy="38" r="12"/><circle cx="47" cy="38" r="12"/><path d="M29 37q3-4 6 0M5 35l-3-8m57 8 3-8M35 4l-9 13h9l-5 10"/>',
    lightning:'<path d="M35 5 17 33h15l-5 26 21-35H34Z"/>',
    candle:'<path class="wax" d="M23 28h18v29H23Z"/><path d="M23 28q5 7 9 0 5 6 9 0M32 28v-6M19 58h26"/><path class="flame" d="M32 4c-16 18-5 22 0 18 9 0 9-9 0-18Z"/>',
    snitch:'<g class="magic-wing magic-wing-left"><path d="M23 35C15 15 6 17 2 12c1 16 9 26 21 28Z"/><path d="M7 21l13 11m-9-5 10 9"/></g><g class="magic-wing magic-wing-right"><path d="M41 35c8-20 17-18 21-23-1 16-9 26-21 28Z"/><path d="m57 21-13 11m9-5-10 9"/></g><circle cx="32" cy="38" r="10"/><path d="M23 38h18m-9-10q-8 10 0 20 8-10 0-20Z"/>',
    book:'<path d="M32 16Q20 7 5 12v38q15-5 27 4 12-9 27-4V12q-15-5-27 4v38M11 21l13 3m-13 6 13 3m-13 6 9 2m24-19 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/>',
    wand:'<path d="m9 52 30-31 5 5-30 31ZM17 44l5 5M47 5l3 9 9 3-9 3-3 9-3-9-9-3 9-3ZM19 9v8m-4-4h8"/>',
    owl:'<path d="m15 24-3-14 14 8h12l14-8-3 14c14 30-1 35-17 35S1 54 15 24Z"/><circle cx="23" cy="30" r="8"/><circle cx="41" cy="30" r="8"/><path d="m28 40 4 5 4-5m-21 5 6 6m28-6-6 6M23 28v4m18-4v4M25 58v4m14-4v4"/>',
    castle:'<path d="M5 58h54M9 58V28h12v30m-14-30 8-15 8 15M26 58V18h12v40M24 18l8-15 8 15m4 43V34h12v24m-14-24 8-14 8 14M29 58V46q3-6 6 0v12M14 35v5m18-15v5m18 11v5"/>'
  };
  const svg = name => `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">${shapes[name] || shapes.star}</svg>`;
  // Inline the large snitches so each wing can pivot independently, including feather lines.
  const largeSnitch='<g stroke="var(--gold)" stroke-width="1.6" stroke-linejoin="round"><g class="large-snitch-wing snitch-left"><path d="M75 89Q37 39 9 61q8 36 64 52Z" fill="var(--paper-light)"/><path d="m19 64 52 34M29 79l42 25" fill="none"/></g><g class="large-snitch-wing snitch-right"><path d="M125 89q38-50 66-28-8 36-64 52Z" fill="var(--paper-light)"/><path d="m181 64-52 34m42-19-42 25" fill="none"/></g><circle cx="100" cy="107" r="29" fill="var(--gold)"/><path d="M76 103q24-15 48 0m-47 12q23 15 46 0M97 80q-12 24 0 54m10-53q12 25 0 51" fill="none" stroke="var(--paper-light)"/><circle cx="91" cy="96" r="5" fill="var(--paper-light)" stroke="none"/></g>';
  document.querySelectorAll('.hero-snitch, .cover-snitch').forEach(el=>{el.innerHTML=largeSnitch;});
  const candleArt='<svg viewBox="0 0 24 96" aria-hidden="true" focusable="false"><ellipse class="candle-aura" cx="12" cy="11" rx="10" ry="12"/><path class="hall-flame" d="M12 2C9 7 7 12 12 15c5-2 4-7 0-13Z"/><path class="hall-wick" d="M12 14v7"/><path class="hall-wax" d="M7 21q5 2 10 0v68q-5 3-10 0Z"/><path class="hall-shade" d="M14 23h3v66l-3 1Z"/><path class="hall-drip" d="M7 22q2 6 4 1v9q2 3 2-1v-8q2 2 4-1"/></svg>';
  document.querySelectorAll('.hero-art, .program, .closing').forEach((host,index)=>{
    const canopy=document.createElement('div');canopy.className='great-hall-candles';canopy.setAttribute('aria-hidden','true');
    // Uneven placement and different depths create a suspended canopy, with room for the snitch.
    const positions=[9,25,42,57,77,94];
    const heights=index===0?[64,78,54,70,36,56]:[33,40,30,37,29,36];
    const tops=index===0?[30,100,48,18,3,112]:[16,6,25,12,20,4];
    for(let n=0;n<positions.length;n++) {
      const candle=document.createElement('span');candle.className='hall-candle';candle.innerHTML=candleArt;
      candle.style.setProperty('--candle-x',`${positions[n]}%`);
      candle.style.setProperty('--candle-top',`${tops[n]}px`);
      candle.style.setProperty('--candle-height',`${heights[n]}px`);
      candle.style.setProperty('--candle-opacity',String([.88,.96,.72,.88,.6,.78][n]));
      candle.style.setProperty('--candle-delay',`${-n*1.37}s`);
      candle.style.setProperty('--candle-duration',`${6+(n%4)*1.1}s`);
      canopy.append(candle);
    }
    host.append(canopy);
  });
  const combinations = [['wand','feather'],['snitch','lightning'],['glasses','feather'],['snitch','book'],['candle','candle'],['lightning','book'],['feather','wand'],['owl','feather'],['castle','snitch']];
  const sections = [...document.querySelectorAll('.cover, #invitation main > section')];
  sections.forEach((section,index) => {
    section.classList.add('magic-section');
    const rail = document.createElement('div');
    rail.className='magic-rail'; rail.setAttribute('aria-hidden','true');
    const ornaments = [...combinations[index % combinations.length], 'star', 'star', 'mote', 'mote', 'star', 'mote'];
    ornaments.forEach((name,n) => {
      const item=document.createElement('span');
      item.className=`magic-ornament magic-${name}`;
      item.dataset.side=n%2?'right':'left';
      item.style.top=`${[25,64,12,87,48,38,73,92][n]}%`;
      if(name!=='mote') item.innerHTML=svg(name);
      rail.append(item);
    });
    section.append(rail);
    if(index>1) {
      const seam=document.createElement('span'); seam.className='magic-seam'; seam.setAttribute('aria-hidden','true'); seam.innerHTML=svg('star'); section.append(seam);
    }
  });
  function animate(element, frames, options) {
    if(reduced.matches || paused || document.hidden || !element.animate) return;
    const animation=element.animate(frames,options); active.add(animation);
    animation.finished.then(()=>active.delete(animation),()=>active.delete(animation));
  }
  // Never pre-hide content. Failure or delayed execution leaves the original page readable.
  function reveal(section) {
    section.classList.add('magic-seen');
    const content=[...section.children].filter(el=>!el.classList.contains('magic-rail') && !el.classList.contains('magic-seam') && !el.classList.contains('magic-entrance') && !el.classList.contains('great-hall-candles'));
    content.forEach((el,i)=>animate(el,[{opacity:.65,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,delay:Math.min(i*55,220),easing:'ease-out'}));
  }
  if('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      entry.target.classList.toggle('magic-inview',entry.isIntersecting);
      if(entry.isIntersecting && !entry.target.classList.contains('magic-seen')) reveal(entry.target);
    }),{threshold:.08});
    sections.forEach(section=>observer.observe(section));
  }
  let entrance;
  let paused=false;
  function syncMotion() {
    sections.forEach(section=>section.classList.toggle('magic-paused',paused || reduced.matches || document.hidden));
  }
  syncMotion();
  function calm() {
    active.forEach(animation=>animation.cancel()); active.clear();
    entrance?.remove();
    document.querySelectorAll('.magic-button').forEach(button=>button.classList.remove('is-sparkling'));
    // Respect reduced motion and pause animations in background tabs.
  }
  // The original opening buttons reveal the page immediately; this never blocks them.
  const opening=new MutationObserver(()=>{
    if(invitation.hidden) return;
    opening.disconnect();
    if(reduced.matches || paused || skipEntrance) return;
    entrance=document.createElement('div'); entrance.className='magic-entrance'; entrance.setAttribute('aria-hidden','true');
    for(let n=0;n<24;n++) {
      const spark=document.createElement('i');
      spark.style.setProperty('--spark-x',`${n%2 ? 94 + (n%3) : 2 + (n%3)}%`);
      spark.style.setProperty('--spark-y',`${8+(n%12)*7}%`);
      spark.style.setProperty('--spark-delay',`${n*10}ms`); entrance.append(spark);
    }
    document.getElementById('home').append(entrance);
    window.setTimeout(()=>entrance?.remove(),1300);
  });
  let skipEntrance=false;
  document.querySelector('.skip-link').addEventListener('click',()=>{skipEntrance=true;calm();});
  opening.observe(invitation,{attributes:true,attributeFilter:['hidden']});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){paused=true;calm();syncMotion();}});
  document.addEventListener('pointerdown',()=>{if(!invitation.hidden)entrance?.remove();},{passive:true});
  reduced.addEventListener('change',()=>{if(reduced.matches)calm();syncMotion();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)calm();syncMotion();});
  document.querySelectorAll('.button, .text-button, .music-toggle, .envelope').forEach(button=>{
    button.classList.add('magic-button');
    const burst=document.createElement('span');burst.className='magic-button-burst';burst.setAttribute('aria-hidden','true');
    [[-65,-20],[-35,15],[0,-30],[35,15],[65,-18],[15,25]].forEach(([x,y])=>{
      const star=document.createElement('i');star.style.setProperty('--burst-x',`${x}px`);star.style.setProperty('--burst-y',`${y}px`);burst.append(star);
    });
    button.append(burst);
    const sparkle=()=>{if(!reduced.matches && !paused)button.classList.add('is-sparkling');};
    button.addEventListener('pointerenter',sparkle);button.addEventListener('click',sparkle);button.addEventListener('focus',sparkle);
    const clearSpark=event=>{if(event.animationName==='magic-button-spark')button.classList.remove('is-sparkling');};
    button.addEventListener('animationend',clearSpark);button.addEventListener('animationcancel',clearSpark);
  });
  const countdown=document.getElementById('countdown');
  let previous=countdown.textContent;
  new MutationObserver(()=>{
    if(countdown.textContent===previous)return;
    previous=countdown.textContent;
    animate(countdown,[{opacity:.7,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'ease-out'});
  }).observe(countdown,{childList:true,characterData:true,subtree:true});
})();
