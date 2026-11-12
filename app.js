/* Rendering and interactions. Most edits belong in config.js. */
(() => {
  'use strict';
  const c = window.INVITATION;
  const $ = id => document.getElementById(id);
  const safeUrl = (value, hosts) => {
    try { const u = new URL(value); return u.protocol === 'https:' && (!hosts || hosts.includes(u.hostname)) ? u.href : ''; }
    catch { return ''; }
  };
  document.querySelectorAll('[data-text]').forEach(el => { el.textContent = c[el.dataset.text] ?? ''; });
  document.title = `${c.celebrant} • A Magical First Birthday`;
  const eventDate = new Date(`${c.date}T12:00:00Z`);
  const dateParts = options => new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' }).format(eventDate);
  $('cover-date').textContent = dateParts({month:'long',day:'numeric',year:'numeric'}).toUpperCase();
  $('hero-date').textContent = `${dateParts({weekday:'long'})} · ${$('cover-date').textContent}`.toUpperCase();
  $('event-month').textContent = dateParts({month:'long'}).toUpperCase();
  $('event-day').textContent = dateParts({day:'2-digit'});
  $('event-weekday').textContent = dateParts({weekday:'long'}).toUpperCase();
  $('event-year').textContent = $('footer-year').textContent = dateParts({year:'numeric'});
  document.querySelector('meta[name="description"]').content = `Join us for ${c.celebrant}'s magical birthday on ${$('cover-date').textContent}.`;
  $('hero-image').src = c.heroImage || 'assets/castle.svg';
  $('hero-image').addEventListener('error', function(){ if(!this.dataset.fallback){this.dataset.fallback='true';this.src='assets/castle.svg';} });
  const maps = safeUrl(c.mapsUrl);
  if (maps) { $('map-link').href = maps; $('map-link').hidden = false; $('map-pending').hidden = true; }

  function updateCountdown() {
    // Compare calendar dates in the event's zone. No invented start time.
    let parts;
    try { parts = new Intl.DateTimeFormat('en-US',{timeZone:c.timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()); }
    catch { parts = new Intl.DateTimeFormat('en-US',{timeZone:'UTC',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()); }
    const part = type => parts.find(p=>p.type===type).value;
    const today = Date.UTC(Number(part('year')), Number(part('month'))-1, Number(part('day')));
    const days = Math.round((Date.parse(`${c.date}T00:00:00Z`) - today)/86400000);
    $('countdown').textContent = days > 0 ? `${days} ${days===1?'sleep':'sleeps'} until the magic begins` : days === 0 ? 'Today is the magical day!' : 'One magical day. A lifetime of memories.';
  }
  updateCountdown(); setInterval(updateCountdown,60000);

  // Run these short decorative animations when their section enters the screen.
  if ('IntersectionObserver' in window) {
    const decorations = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          decorations.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.train-scene, .spell-shelf, .frog-decoration').forEach(el => decorations.observe(el));
  }

  const paths = {
    stars:'M16 5l3 8 8 3-8 3-3 8-3-8-8-3 8-3z M32 23l2 5 5 2-5 2-2 5-2-5-5-2 5-2z M32 5v7 M28.5 8.5h7',
    claw:'M7 5h30v33H7z M7 11h30 M22 11v10 M22 21l-7 6 3 5 M22 21l7 6-3 5 M7 34h30 M13 38v3 M31 38v3',
    wand:'M8 35L30 13l5 5-22 22z M25 18l5 5 M11 5v8 M7 9h8 M34 3v7 M30.5 6.5h7 M35 29v8 M31 33h8',
    palette:'M23 5C12 4 4 13 5 24s12 17 19 14c6-3-2-8 2-11s11 2 13-4C43 14 33 5 23 5z M13 17a2 2 0 1 0 0 .1 M22 12a2 2 0 1 0 0 .1 M31 16a2 2 0 1 0 0 .1 M12 26a2 2 0 1 0 0 .1',
    envelope:'M5 11h34v24H5z M5 11l17 14 17-14 M5 35l11-11 M39 35L28 24',
    book:'M22 11C17 7 10 6 4 8v28c7-2 12-1 18 3 6-4 11-5 18-3V8c-6-2-13-1-18 3v28 M10 15l6 2 M10 22l6 2 M28 17l6-2 M28 24l6-2',
    shirt:'M14 7l-10 7 6 9 4-3v19h16V20l4 3 6-9-10-7c-1 8-15 8-16 0z'
  };
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 44 44'); svg.setAttribute('class','line-icon'); svg.setAttribute('aria-hidden','true');
    const path = document.createElementNS(svg.namespaceURI,'path'); path.setAttribute('d', paths[name] || paths.stars); svg.append(path); return svg;
  }
  // function list(items, container, className) {
  //   items.forEach(item=>{const article=document.createElement('article'); article.className=className; const title=document.createElement('h3'); title.textContent=item.title;const p=document.createElement('p');p.textContent=item.description;article.append(icon(item.icon),title,p);container.append(article);});
  // }
  function list(items, container, className) {
  items.forEach(item => {
    const article = document.createElement('article');
    article.className = className;

    const title = document.createElement('h3');
    title.textContent = item.title;

    const p = document.createElement('p');
    p.textContent = item.description;

    article.append(icon(item.icon), title, p);

    if (item.url) {
      const a = document.createElement('a');
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'article-link';
      a.append(article);
      container.append(a);
    } else {
      container.append(article);
    }
  });
}
  list(c.program,$('program-list'),'program-item');list(c.gifts,$('gift-list'),'gift-item');
  function placeholder(container,label) {
    const wrap=document.createElement('div');wrap.className='placeholder';
    [['photo-stars','✧ · ✧'],['placeholder-mark','K'],['placeholder-name',c.shortName]].forEach(([className,text])=>{const span=document.createElement('span');span.className=className;span.textContent=text;wrap.append(span);});
    const note=document.createElement('small');note.textContent=label;wrap.append(note);container.replaceChildren(wrap);
  }
  function photo(container, src, alt, position, label='Photo to come') {
    if(!src){placeholder(container,label);return;}
    const img=document.createElement('img');img.src=src;img.alt=alt;img.loading='lazy';img.style.objectPosition=position||'50% 50%';
    img.addEventListener('error',()=>{placeholder(container,'Photo to come');if(container.tagName==='BUTTON'){container.disabled=true;container.removeAttribute('aria-label');}});
    container.append(img);
  }
  photo($('main-photo'),c.mainPhoto,`${c.celebrant}, our birthday boy`,c.mainPhotoPosition);
  const embed=safeUrl(c.rsvp.embedUrl,['docs.google.com']);
  let responder=safeUrl(c.rsvp.formUrl,['docs.google.com','forms.gle']);
  const isPublishedForm = value => {try{return /^\/forms\/(?:u\/\d+\/)?d\/(?:e\/)?[^/]+\/viewform$/.test(new URL(value).pathname);}catch{return false;}};
  if(embed && isPublishedForm(embed)){
    const url=new URL(embed);url.searchParams.set('embedded','true');$('rsvp-frame').src=url.href;
    $('rsvp-frame').height=String(Math.max(500,Math.min(3000,Number(c.rsvp.height)||1050)));
    $('form-container').hidden=false;$('rsvp-pending').hidden=true;
    if(!responder){url.searchParams.delete('embedded');responder=url.href;}
  }
  if(responder && (new URL(responder).hostname==='forms.gle'||isPublishedForm(responder))){$('form-link').href=responder;$('form-fallback').hidden=false;$('rsvp-pending').hidden=true;}

  const music=$('music');music.src=c.music.src;
  const volume=Number(c.music.volume);
  music.volume=Number.isFinite(volume)?Math.min(1,Math.max(0,volume)):0.3;
  function syncMusic(){const playing=!music.paused;$('music-toggle').setAttribute('aria-pressed',String(playing));$('music-toggle').setAttribute('aria-label',playing?'Pause background music':'Play background music');$('music-label').textContent=playing?'Music on':'Music off';}
  async function playMusic(){try{await music.play();$('audio-status').textContent='';}catch{$('audio-status').textContent='Music couldn’t start. Tap the music button to try again.';}syncMusic();}
  music.addEventListener('play',syncMusic);music.addEventListener('pause',syncMusic);
  music.addEventListener('error',()=>{$('audio-status').textContent='Music is unavailable right now. You can still enjoy the invitation.';syncMusic();});
  $('music-toggle').addEventListener('click',()=>{if(music.paused)playMusic();else music.pause();});
  // const credit=$('music-credit');credit.append('Music: ');
  const source=document.createElement('a');source.textContent=`${c.music.title} by ${c.music.artist}`;source.href=safeUrl(c.music.sourceUrl)||'#';source.target='_blank';source.rel='noopener noreferrer';
  // const license=document.createElement('a');license.textContent=c.music.license;license.href=safeUrl(c.music.licenseUrl)||'#';license.target='_blank';license.rel='noopener noreferrer';credit.append(source,' · ',license,' · Unmodified recording, repeated for background playback.');
  let opened=false;
  function openInvitation(withMusic){
    if(opened)return;opened=true;
    if(withMusic)playMusic();
    $('cover').hidden=true;$('invitation').hidden=false;window.scrollTo({top:0,behavior:'instant'});$('birthday-title').focus({preventScroll:true});
  }
  $('open-envelope').addEventListener('click',()=>openInvitation(true));$('open-button').addEventListener('click',()=>openInvitation(true));$('open-silent').addEventListener('click',()=>openInvitation(false));
  document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();openInvitation(false);});
})();
