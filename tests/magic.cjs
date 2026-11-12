const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=readFileSync(require('node:path').join(__dirname,'../magic.js'),'utf8');
function setup(reduce=false){
  const mutations=[],intersections=[],animations=[],timers=[];
  class Element {
    constructor(){this.children=[];this.events={};this.dataset={};this.hidden=false;this.textContent='';this.style={setProperty(){}};this.classes=new Set();this.classList={add:c=>this.classes.add(c),remove:c=>this.classes.delete(c),contains:c=>this.classes.has(c),toggle:(c,on)=>on?this.classes.add(c):this.classes.delete(c)};}
    append(el){this.children.push(el);el.parent=this;}
    remove(){if(this.parent)this.parent.children=this.parent.children.filter(el=>el!==this);this.removed=true;}
    setAttribute(k,v){this[k]=v;}
    addEventListener(k,fn){this.events[k]=fn;}
    animate(frames,options){const a={frames,options,finished:new Promise(()=>{}),cancel(){this.cancelled=true;}};animations.push(a);return a;}
    getAnimations(){return [];}
  }
  const sections=Array.from({length:9},()=>{const s=new Element();s.append(new Element());return s;});
  const ids={invitation:new Element(),home:sections[1],countdown:new Element()};
  ids.invitation.hidden=true;ids.countdown.textContent='33 sleeps until the magic begins';
  const button=new Element(),skip=new Element();
  const media={matches:reduce,addEventListener(k,fn){this[k]=fn;}};
  const document={hidden:false,events:{},getElementById:id=>ids[id],querySelectorAll:selector=>selector.startsWith('.cover')?sections:selector==='.hero-snitch, .cover-snitch'?[new Element(),new Element()]:selector==='.hero-art, .program, .closing'?[]:[button],querySelector:()=>skip,createElement:()=>new Element(),addEventListener(k,fn){this.events[k]=fn;}};
  class MutationObserver{constructor(fn){this.fn=fn;mutations.push(this);}observe(target){this.target=target;}disconnect(){this.disconnected=true;}}
  class IntersectionObserver{constructor(fn){this.fn=fn;intersections.push(this);}observe(){}unobserve(){}}
  vm.runInNewContext(source,{window:{matchMedia:()=>media,IntersectionObserver,setTimeout:fn=>timers.push(fn)},document,MutationObserver,IntersectionObserver,Set});
  return{sections,ids,button,skip,media,document,mutations,intersections,animations,timers};
}
let t=setup();
assert.equal(t.sections[0].children.length,2);
assert.equal(t.sections[0].children[1]['aria-hidden'],'true');
t.intersections[0].fn([{isIntersecting:true,target:t.sections[1]}]);
assert.ok(t.animations.length>0,'Section reveal runs');
t.ids.invitation.hidden=false;t.mutations[0].fn();
assert.equal(t.ids.home.children.at(-1).className,'magic-entrance');
assert.equal(t.ids.invitation.hidden,false,'Entrance never blocks the invitation');
t.document.events.keydown({key:'Escape'});
assert.ok(t.animations.every(a=>a.cancelled),'Escape cancels movement');
assert.ok(t.ids.home.children.every(el=>el.className!=='magic-entrance'));
assert.equal(t.ids.invitation.children.length,0,'No motion button is added');
t=setup();
const count=t.animations.length;
t.mutations[1].fn();assert.equal(t.animations.length,count,'Same countdown does not reanimate');
t.ids.countdown.textContent='32 sleeps until the magic begins';t.mutations[1].fn();
assert.equal(t.animations.length,count+1);
assert.equal(t.ids.countdown.textContent,'32 sleeps until the magic begins','Countdown value unchanged');
t.media.matches=true;t.media.change();assert.ok(t.animations.every(a=>a.cancelled),'Live reduced-motion change cancels animations');
t=setup(true);assert.equal(t.ids.invitation.children.length,0);t.intersections[0].fn([{isIntersecting:true,target:t.sections[1]}]);
t.ids.invitation.hidden=false;t.mutations[0].fn();t.button.events.click();
t.ids.countdown.textContent='Today is the magical day!';t.mutations[1].fn();
assert.equal(t.animations.length,0,'Reduced motion runs no scripted animations');
assert.ok(!t.button.classes.has('is-sparkling'));
assert.ok(t.ids.home.children.every(el=>el.className!=='magic-entrance'));
t=setup();t.skip.events.click();t.ids.invitation.hidden=false;t.mutations[0].fn();
assert.ok(t.ids.home.children.every(el=>el.className!=='magic-entrance'),'Skip link bypasses entrance');
console.log('PASS: decorative accessibility, immediate opening, Escape/skip, live reduced motion, reduced-motion opening, countdown changes without value changes.');
