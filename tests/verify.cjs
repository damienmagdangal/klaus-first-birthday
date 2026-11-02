const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=require('node:path').join(__dirname,'../');
const html=fs.readFileSync(root+'index.html','utf8');
class Element {
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.style={};this.attributes={};this.events={};this.hidden=false;this.paused=true;this.textContent='';}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(...nodes){this.children=nodes;}
  setAttribute(k,v){this.attributes[k]=v;}
  removeAttribute(k){delete this.attributes[k];}
  addEventListener(k,fn){this.events[k]=fn;}
  focus(){this.focused=true;}
  showModal(){this.open=true;}
  close(){this.open=false;}
  play(){this.paused=false;this.events.play?.();return Promise.resolve();}
  pause(){this.paused=true;this.events.pause?.();}
}
function run(change=()=>{}, now='2026-11-02T08:00:00Z'){
 const ids={};for(const match of html.matchAll(/<([a-z0-9]+)\b[^>]*\bid="([^"]+)"[^>]*>/g)){const el=new Element(match[1]);el.hidden=/\shidden(?:\s|>)/.test(match[0]);ids[match[2]]=el;}
 const data=[...html.matchAll(/data-text="([^"]+)"/g)].map(m=>{const e=new Element();e.dataset.text=m[1];return e;});
 const meta=new Element(),skip=new Element();
 const document={getElementById:id=>{assert.ok(ids[id],`Missing HTML id ${id}`);return ids[id];},querySelectorAll:()=>data,querySelector:s=>s.startsWith('meta')?meta:skip,createElement:t=>new Element(t),createElementNS:(ns,t)=>{const e=new Element(t);e.namespaceURI=ns;return e;}};
 const FixedDate=class extends Date{constructor(...args){super(...(args.length?args:[now]));}};
 const context={window:{scrollTo(){}},document,URL,Intl,Date:FixedDate,setInterval(){}};
 vm.createContext(context);vm.runInContext(fs.readFileSync(root+'config.js','utf8'),context);change(context.window.INVITATION);vm.runInContext(fs.readFileSync(root+'app.js','utf8'),context);
 return {ids,context,data};
}
let t=run();assert.equal(t.ids['countdown'].textContent,'33 sleeps until the magic begins');assert.equal(t.ids['event-weekday'].textContent,'SATURDAY');assert.equal(t.ids['form-container'].hidden,false);assert.equal(t.ids['form-fallback'].hidden,false);assert.equal(t.ids['program-list'].children.length,4);assert.equal(t.ids.gallery,undefined);assert.equal(t.context.window.INVITATION.celebrant,'Klaus');assert.equal(t.ids['main-photo'].children.length,1);assert.equal(t.ids['form-link'].href,'https://forms.gle/Zznj42HYQdYT46hS8');
t.ids['open-silent'].events.click();assert.equal(t.ids.cover.hidden,true);assert.equal(t.ids.invitation.hidden,false);assert.equal(t.ids.music.paused,true);assert.equal(t.ids['birthday-title'].focused,true);
t=run();t.ids['open-button'].events.click();assert.equal(t.ids.music.paused,false);t.ids['music-toggle'].events.click();assert.equal(t.ids.music.paused,true);
const form='https://docs.google.com/forms/d/e/TEST/viewform';
t=run(c=>{c.rsvp.formUrl='';c.rsvp.embedUrl=form;c.rsvp.height=1200;});assert.equal(t.ids['rsvp-frame'].src,form+'?embedded=true');assert.equal(t.ids['form-link'].href,form);assert.equal(t.ids['form-container'].hidden,false);assert.equal(t.ids['rsvp-pending'].hidden,true);assert.equal(t.ids['rsvp-frame'].height,'1200');
t=run(c=>{c.rsvp.embedUrl='';c.rsvp.formUrl='https://forms.gle/example';});assert.equal(t.ids['form-container'].hidden,true);assert.equal(t.ids['form-fallback'].hidden,false);
t=run(c=>{c.rsvp.embedUrl='https://docs.google.com.evil.example/forms/d/e/TEST/viewform';c.mapsUrl='javascript:alert(1)';});assert.equal(t.ids['form-container'].hidden,true);assert.equal(t.ids['map-link'].hidden,true);
t=run(c=>{c.rsvp.embedUrl='';c.rsvp.formUrl='https://docs.google.com/forms/d/TEST/edit';});assert.equal(t.ids['form-fallback'].hidden,true);assert.equal(t.ids['rsvp-pending'].hidden,false);
t=run(c=>{c.mainPhoto='assets/owl.svg';});assert.equal(t.ids['main-photo'].children[0].src,'assets/owl.svg');
t=run(c=>{c.mainPhoto='missing.jpg';});const missing=t.ids['main-photo'];missing.children[0].events.error();assert.equal(missing.children[0].className,'placeholder');
t=run(c=>{c.rsvp.embedUrl='';c.rsvp.formUrl='';});assert.equal(t.ids['rsvp-pending'].hidden,false);assert.equal(t.ids['form-container'].hidden,true);
t=run(()=>{},'2026-12-04T16:00:00Z');assert.equal(t.ids.countdown.textContent,'Today is the magical day!');t=run(()=>{},'2026-12-05T16:00:00Z');assert.match(t.ids.countdown.textContent,/lifetime of memories/);
for(const name of ['castle.svg','owl.svg','star.svg','fairytale-waltz.mp3','magical-objects.svg','klaus-forms-banner.svg'])assert.ok(fs.statSync(root+'assets/'+name).size>0);
console.log('PASS: default rendering, silent/music openings, pause, dates/time zone, RSVP embed/fallback/invalid URLs, single photo, missing image fallback, Klaus naming, assets.');


