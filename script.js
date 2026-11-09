/* Happy Parcel — 3D story, login and dashboard hook-up (ES module; needs the importmap in index.html) */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

function fatal(msg){ const e=document.getElementById('err'); e.style.display='grid'; document.getElementById('errMsg').textContent=msg; const l=document.getElementById('loader'); if(l) l.style.display='none'; }
try { main(); } catch (e) { console.error(e); fatal('Could not start the 3D experience: ' + (e && e.message ? e.message : e)); }

function main(){
const gsap = window.gsap;
if(!gsap) throw new Error('GSAP failed to load (check your connection).');
gsap.ticker.lagSmoothing(0);

/* ───────────────────────── utils ───────────────────────── */
const $ = s => document.querySelector(s);/* Happy Parcel — React Driver Dashboard (needs React 18 + ReactDOM loaded first) */
(function(){
'use strict';
var R=window.React, RD=window.ReactDOM, mountEl=document.getElementById('dashRoot'), modalEl=document.getElementById('hpModals');
if(!R||!RD||!mountEl||!modalEl){ console.warn('[Happy Parcel] React could not be loaded — Driver Dashboard disabled.'); return; }
var e=R.createElement, useState=R.useState, useEffect=R.useEffect, useRef=R.useRef, useMemo=R.useMemo, Fragment=R.Fragment;

/* ---------- icons ---------- */
var IC={
 phone:['M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z'],
 pin:['M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z','M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
 nav:['M3 11 22 2l-9 19-2-8z'],
 scan:['M3 7V5a2 2 0 0 1 2-2h2','M17 3h2a2 2 0 0 1 2 2v2','M21 17v2a2 2 0 0 1-2 2h-2','M7 21H5a2 2 0 0 1-2-2v-2','M7 12h10'],
 kbd:['M3 6h18v12H3z','M7 10h.01','M11 10h.01','M15 10h.01','M7 14h10'],
 plus:['M12 5v14','M5 12h14'],
 x:['M18 6 6 18','M6 6l12 12'],
 bag:['M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z','M3 6h18','M16 10a4 4 0 0 1-8 0'],
 undo:['M3 7v6h6','M21 17a9 9 0 0 0-15-6.7L3 13'],
 house:['M3 21V9l9-6 9 6v12','M8 21v-7h8v7'],
 spk:['M11 5 6 9H2v6h4l5 4z','M15.5 8.5a5 5 0 0 1 0 7','M19 5a9 9 0 0 1 0 14'],
 mute:['M11 5 6 9H2v6h4l5 4z','M22 9l-6 6','M16 9l6 6'],
 check:['M20 6 9 17l-5-5'],
 out:['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4','M16 17l5-5-5-5','M21 12H9'],
 cam:['M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z','M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z']
};
function Ic(n,s){ return e('svg',{className:'hp-ic',width:s||18,height:s||18,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':'true'},IC[n].map(function(d,i){ return e('path',{key:i,d:d}); })); }

/* ---------- data ---------- */
var KEY='hp_driver_parcels_v1';
var SEED=[
 {awb:'HP48210937',to:'Aarav Sharma',phone:'+91 90000 10001',addr:'B-42, Sector 21, Noida, Uttar Pradesh 201301',item:'Mobile accessories',st:'pending'},
 {awb:'HP48210938',to:'Priya Verma',phone:'+91 90000 10002',addr:'12, Lajpat Nagar II, New Delhi 110024',item:'Kurta set',st:'pending'},
 {awb:'HP48210941',to:'Rohit Gupta',phone:'+91 90000 10003',addr:'Plot 7, Vaishali, Ghaziabad, Uttar Pradesh 201010',item:'Bluetooth speaker',st:'pending'},
 {awb:'HP48210944',to:'Sneha Iyer',phone:'+91 90000 10004',addr:'C-9, Janakpuri, New Delhi 110058',item:'Books (3)',st:'pending'},
 {awb:'HP48210946',to:'Imran Khan',phone:'+91 90000 10005',addr:'H-15, Sector 62, Noida, Uttar Pradesh 201309',item:'Kitchen mixer',st:'pending'},
 {awb:'HP48210929',to:'Neha Singh',phone:'+91 90000 10006',addr:'A-3, Rajouri Garden, New Delhi 110027',item:'Skincare box',st:'today'},
 {awb:'HP48210931',to:'Vikram Joshi',phone:'+91 90000 10007',addr:'22, Indirapuram, Ghaziabad, Uttar Pradesh 201014',item:'Running shoes',st:'tomorrow'},
 {awb:'HP48210925',to:'Anita Desai',phone:'+91 90000 10008',addr:'F-31, Preet Vihar, New Delhi 110092',item:'Table lamp',st:'cancelled'}
];
var DB={
 HP48210951:{to:'Karan Malhotra',phone:'+91 90000 20011',addr:'D-18, Sector 15, Faridabad, Haryana 121007',item:'Laptop sleeve'},
 HP48210962:{to:'Pooja Mehta',phone:'+91 90000 20012',addr:'45, Pitampura, New Delhi 110034',item:'Yoga mat'},
 HP48210970:{to:'Sandeep Yadav',phone:'+91 90000 20013',addr:'Block E, Mayur Vihar I, New Delhi 110091',item:'Wall clock'},
 HP48210984:{to:'Meera Nair',phone:'+91 90000 20014',addr:'9, Sector 50, Gurugram, Haryana 122018',item:'Headphones'}
};
var FN=['Ankit','Divya','Manish','Ritu','Sahil','Kavita','Deepak','Isha','Tarun','Nisha'], LN=['Kumar','Tiwari','Bansal','Kapoor','Saxena','Chauhan','Mishra','Arora','Pandey','Rawat'];
var ST_=['Sector 18, Noida','Karol Bagh, New Delhi','Rohini Sector 7, Delhi','Vasant Kunj, New Delhi','Sector 29, Gurugram','Kaushambi, Ghaziabad'], IT=['Phone cover','T-shirt','Water bottle','Earbuds','Backpack','Desk organiser','Gift box'];
function hash(s){ var h=2166136261; for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
function cleanAWB(r){ return String(r||'').toUpperCase().replace(/[^A-Z0-9]/g,''); }
function lookupAWB(raw){
  var awb=cleanAWB(raw); if(awb.length<6||awb.length>20) return null;
  if(DB[awb]) return Object.assign({awb:awb},DB[awb]);
  var h=hash(awb), pk=function(a,sh){ return a[(h>>>sh)%a.length]; }, n=String(h%1e9).padStart(9,'0');
  return {awb:awb,to:pk(FN,0)+' '+pk(LN,5),phone:'+91 9'+n.slice(0,4)+' '+n.slice(4,9),addr:(1+h%98)+', '+pk(ST_,3),item:pk(IT,9)};
}
function load(){ try{ var s=localStorage.getItem(KEY); if(s){ var a=JSON.parse(s); if(Array.isArray(a)&&a.length) return a; } }catch(x){} return SEED.map(function(p){ return Object.assign({},p); }); }
var LABEL={pending:'Pending',today:'Deliver Today',tomorrow:'Tomorrow',cancelled:'Cancelled'}, EMO={pending:'⬜',today:'🟩',tomorrow:'🟨',cancelled:'🟥'};
var KEYST={1:'today',2:'tomorrow',3:'cancelled'};
function mapsUrl(a){ return 'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(a)+'&travelmode=driving'; }
function useEsc(fn){ useEffect(function(){ function k(ev){ if(ev.key==='Escape') fn(); } window.addEventListener('keydown',k); return function(){ window.removeEventListener('keydown',k); }; }); }

/* ---------- small pieces ---------- */
function Num(p){
  var s=useState(0), val=s[0], setVal=s[1], last=useRef({r:-1,v:0});
  useEffect(function(){
    var from=last.current.r===p.replay?last.current.v:0, to=p.v; last.current={r:p.replay,v:to};
    if(from===to){ setVal(to); return; }
    var t0=performance.now(), raf; function f(now){ var k=Math.min(1,(now-t0)/700); setVal(Math.round(from+(to-from)*(1-Math.pow(1-k,3)))); if(k<1) raf=requestAnimationFrame(f); }
    raf=requestAnimationFrame(f); return function(){ cancelAnimationFrame(raf); };
  },[p.v,p.replay]);
  return val;
}
function Metric(p){ return e('div',{className:'hp-m '+p.cls},e('div',{className:'lab'},p.label),e('b',null,e(Num,{v:p.v,replay:p.replay})),e('small',null,p.sub)); }

function Card(p){
  var x=p.p, st=x.st;
  var body=[
    e('div',{className:'hp-ch',key:'h'},e('span',{className:'hp-awb'},x.awb),e('span',{className:'hp-chip'},EMO[st]+' '+LABEL[st])),
    e('h3',{key:'n'},x.to),
    e('p',{key:'i'},Ic('bag',15),x.item),
    e('p',{key:'a'},Ic('pin',15),x.addr),
    e('p',{key:'p'},Ic('phone',15),x.phone)
  ];
  if(st==='tomorrow') body.push(e('div',{className:'hp-note',key:'note'},Ic('bag',18),e('div',null,'Keep in Bag',e('small',null,'Rescheduled for tomorrow — do not load it on today’s route.'))));
  if(st==='cancelled') body.push(e('div',{className:'hp-note',key:'note'},Ic('house',18),e('div',null,'Return to Warehouse',e('small',null,'Order cancelled by customer. No OTP needed.'))));
  var act=[];
  if(st==='pending') act.push(e('button',{key:'c',type:'button',className:'hp-btn pri',onClick:function(){ p.onCall(x.awb); }},Ic('phone',17),'AI Call'));
  if(st==='today') act.push(e('a',{key:'m',className:'hp-btn map',href:mapsUrl(x.addr),target:'_blank',rel:'noopener noreferrer'},Ic('nav',17),'Open in Google Maps'));
  if(st!=='pending') act.push(e('button',{key:'u',type:'button',className:'hp-btn sm','aria-label':'Reset to pending',title:'Reset to pending',onClick:function(){ p.onReset(x.awb); }},Ic('undo',17)));
  body.push(e('div',{className:'hp-act',key:'act'},act));
  return e('article',{className:'hp-card '+st,'data-awb':x.awb},body);
}

/* ---------- add parcel ---------- */
function Found(p){
  var d=p.d, dup=p.exists(d.awb);
  return e('div',{className:'hp-res'},e('h4',null,'Details found'),
    e('dl',null,e('dt',null,'AWB'),e('dd',null,d.awb),e('dt',null,'Name'),e('dd',null,d.to),e('dt',null,'Phone'),e('dd',null,d.phone),e('dt',null,'Address'),e('dd',null,d.addr),e('dt',null,'Item'),e('dd',null,d.item)),
    e('div',{className:'hp-btnrow'},e('button',{type:'button',className:'hp-btn pri',disabled:dup,onClick:function(){ if(p.onAdd(d)) p.onClose(); }},Ic(dup?'check':'plus',17),dup?'Already in your list':'Add to my parcels')));
}
function Scanner(p){
  var a=useState('idle'), ph=a[0], setPh=a[1], b=useState(null), data=b[0], setData=b[1], c=useState(0), nLines=c[0], setN=c[1];
  var d=useState(null), stream=d[0], setStream=d[1], er=useState(''), err=er[0], setErr=er[1];
  var vref=useRef(null), tm=useRef([]), done=useRef(false);
  useEffect(function(){ return function(){ tm.current.forEach(clearTimeout); }; },[]);
  function reveal(dd){ done.current=true; setData(dd); setPh('scanning'); setN(0); [1,2,3,4].forEach(function(i){ tm.current.push(setTimeout(function(){ setN(i); if(i===4) setPh('found'); },i*480)); }); }
  function simulate(){
    tm.current.forEach(clearTimeout); tm.current=[];
    var keys=Object.keys(DB).filter(function(k){ return !p.exists(k); }), awb=keys.length?keys[0]:'HP'+(48300000+Math.floor(Math.random()*90000));
    reveal(lookupAWB(awb));
  }
  function startCam(){
    setErr('');
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ setErr('Camera is not available in this browser — use “Simulate scan” or type the AWB.'); return; }
    navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false}).then(setStream).catch(function(){ setErr('Camera permission was blocked — use “Simulate scan” or type the AWB.'); });
  }
  useEffect(function(){
    if(!stream) return; var v=vref.current, iv=0;
    if(v){ v.srcObject=stream; var pr=v.play(); if(pr&&pr.catch) pr.catch(function(){}); }
    if('BarcodeDetector' in window){
      try{ var det=new window.BarcodeDetector({formats:['code_128','code_39','ean_13','qr_code']});
        iv=setInterval(function(){ if(done.current||!v) return; det.detect(v).then(function(r){ if(r&&r[0]&&r[0].rawValue){ var dd=lookupAWB(r[0].rawValue); if(dd) reveal(dd); else p.say('Barcode read, but it is not a valid AWB'); } }).catch(function(){}); },700);
      }catch(x){ setErr('Live barcode decoding is not supported here — use “Simulate scan”.'); }
    } else setErr('Live barcode decoding is not supported in this browser — use “Simulate scan” or type the AWB.');
    return function(){ clearInterval(iv); stream.getTracks().forEach(function(t){ t.stop(); }); };
  },[stream]);
  var lines=data?[['AWB',data.awb],['Name',data.to],['Phone',data.phone],['Address',data.addr]]:[];
  return e('div',null,
    e('div',{className:'hp-cam'+(ph==='idle'&&!stream?' idle':'')},
      stream?e('video',{ref:vref,muted:true,playsInline:true}):e('div',{className:'hp-lbl'},e('b',null,'HAPPY PARCEL'),'TO: ••••••••••',e('br'),'AWB: HP4821•••••',e('div',{className:'bc'})),
      e('i',{className:'cn a'}),e('i',{className:'cn b'}),e('i',{className:'cn c'}),e('i',{className:'cn d'}),e('i',{className:'ln'})),
    ph!=='found'?e('div',{className:'hp-ocr'},lines.slice(0,nLines).map(function(l){ return e('div',{key:l[0]},e('span',null,l[0]),l[1]); })):null,
    ph==='scanning'?e('div',{className:'hp-wait'},e('i',{className:'hp-spin'}),'Reading label…'):null,
    err?e('p',{className:'hp-hint'},err):null,
    ph==='found'&&data?e(Found,{d:data,exists:p.exists,onAdd:p.onAdd,onClose:p.onClose}):
      e('div',{className:'hp-btnrow'},e('button',{type:'button',className:'hp-btn pri',onClick:simulate,disabled:ph==='scanning'},Ic('scan',17),'Simulate scan'),
        e('button',{type:'button',className:'hp-btn',onClick:stream?function(){ setStream(null); }:startCam},Ic('cam',17),stream?'Stop camera':'Use camera')),
    ph!=='found'?e('p',{className:'hp-hint'},'Point the camera at the shipping label barcode. Label damaged or camera broken? Switch to “Enter AWB”.'):null);
}
function Manual(p){
  var a=useState(''), v=a[0], setV=a[1], b=useState('idle'), st=b[0], setSt=b[1], c=useState(null), data=c[0], setData=c[1];
  useEffect(function(){
    var cl=cleanAWB(v); setData(null);
    if(!cl){ setSt('idle'); return; } if(cl.length<6){ setSt('short'); return; }
    setSt('loading'); var id=setTimeout(function(){ var d=lookupAWB(cl); setData(d); setSt(d?'ok':'bad'); },650);
    return function(){ clearTimeout(id); };
  },[v]);
  return e('div',null,
    e('input',{className:'hp-in',value:v,onChange:function(ev){ setV(ev.target.value); },placeholder:'Type AWB / tracking no.',maxLength:24,autoCapitalize:'characters',autoComplete:'off',autoCorrect:'off',spellCheck:false,'aria-label':'AWB or tracking number'}),
    e('div',{className:'hp-chips'},'Try:',Object.keys(DB).slice(0,2).map(function(k){ return e('button',{key:k,type:'button',onClick:function(){ setV(k); }},k); })),
    st==='short'?e('p',{className:'hp-hint'},'Keep typing — AWB numbers are at least 6 characters.'):null,
    st==='loading'?e('div',{className:'hp-wait'},e('i',{className:'hp-spin'}),'Fetching customer details…'):null,
    st==='bad'?e('p',{className:'hp-bad'},'No parcel found for that number.'):null,
    st==='ok'&&data?e(Found,{d:data,exists:p.exists,onAdd:p.onAdd,onClose:p.onClose}):null);
}
function AddSheet(p){
  var m=useState('scan'), mode=m[0], setMode=m[1]; useEsc(p.onClose);
  return e('div',{className:'hp-back',onClick:function(ev){ if(ev.target===ev.currentTarget) p.onClose(); }},
    e('div',{className:'hp-sheet',role:'dialog','aria-modal':'true','aria-label':'Add parcel'},
      e('div',{className:'hp-sh'},e('h2',null,'Add parcel'),e('button',{type:'button',className:'hp-x','aria-label':'Close',onClick:p.onClose},Ic('x',18))),
      e('div',{className:'hp-seg'},e('button',{type:'button',className:mode==='scan'?'on':'',onClick:function(){ setMode('scan'); }},Ic('scan',16),'Scan label'),e('button',{type:'button',className:mode==='manual'?'on':'',onClick:function(){ setMode('manual'); }},Ic('kbd',16),'Enter AWB')),
      mode==='scan'?e(Scanner,p):e(Manual,p)));
}

/* ---------- AI IVR call ---------- */
function script(x){ var f=x.to.split(' ')[0]; return [
 {hi:'नमस्ते '+f+' जी, मैं Happy Parcel की AI असिस्टेंट बोल रही हूँ।',en:'Hello '+f+', this is the Happy Parcel AI assistant.'},
 {hi:'आपका पार्सल ('+x.item+') डिलीवरी के लिए तैयार है।',en:'Your parcel ('+x.item+') is ready for delivery.'},
 {hi:'आज डिलीवरी के लिए 1 दबाएँ। कल के लिए 2 दबाएँ। ऑर्डर रद्द करने के लिए 3 दबाएँ।',en:'Press 1 for delivery today, 2 for tomorrow, 3 to cancel the order.'}]; }
var REPLY={1:{hi:'धन्यवाद! आपका पार्सल आज ही डिलीवर किया जाएगा। कृपया घर पर रहें।',en:'Thank you! Your parcel will be delivered today. Please be available.'},
 2:{hi:'ठीक है, आपका पार्सल कल डिलीवर किया जाएगा।',en:'Okay, your parcel will be delivered tomorrow.'},
 3:{hi:'आपका ऑर्डर रद्द कर दिया गया है। पार्सल वेयरहाउस वापस भेजा जाएगा।',en:'Your order has been cancelled. The parcel will go back to the warehouse.'}};
var PHASE={dialing:'Dialing…',ringing:'Ringing…',connected:'Connected',menu:'Waiting for keypress',done:'Call ended'};
function speak(t){ try{ if(!('speechSynthesis' in window)) return; speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance(t); u.lang='hi-IN'; u.rate=.95; var v=(speechSynthesis.getVoices()||[]).filter(function(o){ return /^hi/i.test(o.lang); })[0]; if(v) u.voice=v; speechSynthesis.speak(u); }catch(x){} }
function CallModal(p){
  var x=p.parcel, S=useMemo(function(){ return script(x); },[x.awb]);
  var a=useState('dialing'), ph=a[0], setPh=a[1], b=useState([]), typed=b[0], setTyped=b[1], c=useState(0), li=c[0], setLi=c[1], d=useState(0), sec=d[0], setSec=d[1], o=useState(true), snd=o[0], setSnd=o[1], k=useState(0), key=k[0], setKey=k[1];
  var sref=useRef(true), trRef=useRef(null); sref.current=snd; useEffect(function(){ var t=trRef.current; if(t) t.scrollTop=t.scrollHeight; }); useEsc(function(){ p.onClose(); });
  useEffect(function(){ var id; if(ph==='dialing') id=setTimeout(function(){ setPh('ringing'); },1300); else if(ph==='ringing') id=setTimeout(function(){ setPh('connected'); },1700); return function(){ clearTimeout(id); }; },[ph]);
  useEffect(function(){
    if(ph!=='connected') return; var dead=false, id;
    function step(i,ci){ if(dead) return; if(i>=S.length){ setPh('menu'); return; } var t=S[i].hi; setLi(i);
      if(ci===0&&sref.current) speak(t);
      setTyped(S.slice(0,i).map(function(s){ return s.hi; }).concat(t.slice(0,ci)));
      id=setTimeout(function(){ if(ci<t.length) step(i,ci+1); else step(i+1,0); }, ci<t.length?26:550); }
    step(0,0); return function(){ dead=true; clearTimeout(id); };
  },[ph==='connected']);
  useEffect(function(){ if(ph!=='connected'&&ph!=='menu') return; var id=setInterval(function(){ setSec(function(s){ return s+1; }); },1000); return function(){ clearInterval(id); }; },[ph==='connected'||ph==='menu']);
  useEffect(function(){ return function(){ try{ if('speechSynthesis' in window) speechSynthesis.cancel(); }catch(x){} }; },[]);
  var canPress=ph==='connected'||ph==='menu';
  function press(n){ if(!canPress) return; setKey(n); setTyped(S.map(function(s){ return s.hi; })); setLi(S.length-1); setPh('done'); if(sref.current) speak(REPLY[n].hi); p.onResult(n); }
  var mm=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');
  var bubbles=typed.map(function(t,i){ return e('div',{className:'b',key:i},t); });
  if(ph==='done') bubbles.push(e('div',{className:'b me',key:'me'},'दबाया: '+key),e('div',{className:'b',key:'r'},REPLY[key].hi));
  var sub=ph==='done'?REPLY[key].en:(ph==='connected'||ph==='menu')?S[li].en:'';
  var res=null;
  if(ph==='done'){
    var st=KEYST[key], col={1:'g',2:'y',3:'r'}[key];
    res=e('div',{className:'hp-out2'},
      key===1?e('div',{className:'hp-note',style:{'--c':'#22c55e'}},Ic('check',18),e('div',null,'Confirmed for Today',e('small',null,'Navigation unlocked for '+x.to+'.'))):
      key===2?e('div',{className:'hp-note',style:{'--c':'#facc15'}},Ic('bag',18),e('div',null,'Rescheduled for Tomorrow — Keep in Bag',e('small',null,'Do not load this parcel on today’s route.'))):
      e('div',{className:'hp-note',style:{'--c':'#ef4444'}},Ic('house',18),e('div',null,'Order Cancelled — Return to Warehouse',e('small',null,'Marked automatically. No OTP required.'))),
      e('div',{className:'hp-btnrow'},key===1?e('a',{className:'hp-btn map',href:mapsUrl(x.addr),target:'_blank',rel:'noopener noreferrer'},Ic('nav',17),'Open in Google Maps'):null,e('button',{type:'button',className:'hp-btn',onClick:p.onClose},'Done')));
  }
  return e('div',{className:'hp-back',onClick:function(ev){ if(ev.target===ev.currentTarget&&ph==='done') p.onClose(); }},
    e('div',{className:'hp-sheet hp-call',role:'dialog','aria-modal':'true','aria-label':'AI call'},
      e('div',{className:'hp-sh'},e('span',{className:'hp-awb'},'AI IVR · '+x.awb),e('button',{type:'button',className:'hp-x','aria-label':snd?'Mute voice':'Unmute voice',onClick:function(){ setSnd(!snd); if(snd&&'speechSynthesis' in window) speechSynthesis.cancel(); }},Ic(snd?'spk':'mute',18))),
      e('div',{className:'hp-av'+(ph==='dialing'||ph==='ringing'?' ring':'')},x.to.charAt(0)),
      e('h3',null,x.to), e('div',{className:'st'},PHASE[ph]+(ph==='connected'||ph==='menu'?' · ':''),(ph==='connected'||ph==='menu')?e('b',null,mm):null),
      e('div',{className:'hp-tr',ref:trRef,'aria-live':'polite'},bubbles,sub?e('div',{className:'en',key:'en'},sub):null),
      e('div',{className:'hp-keys'},[[1,'आज','Today'],[2,'कल','Tomorrow'],[3,'रद्द','Cancel']].map(function(r){ return e('button',{key:r[0],type:'button',className:'hp-key k'+r[0]+(key===r[0]?' pick':''),disabled:!canPress,onClick:function(){ press(r[0]); },'aria-label':'Press '+r[0]+' — '+r[2]},e('b',null,r[0]),e('span',null,r[1]),e('small',null,r[2])); })),
      res||e('div',{className:'hp-callbar'},e('button',{type:'button',className:'hp-btn end',onClick:function(){ p.say('Call ended — no response recorded'); p.onClose(); }},Ic('phone',17),'End call'))));
}

/* ---------- app ---------- */
function App(){
  var a=useState(load), parcels=a[0], setParcels=a[1], b=useState('all'), filter=b[0], setFilter=b[1], c=useState(false), open=c[0], setOpen=c[1], d=useState('Driver'), user=d[0], setUser=d[1], r=useState(0), replay=r[0], setReplay=r[1];
  var ins=useState(null), inst=ins[0], setInst=ins[1];
  useEffect(function(){ function bp(ev){ ev.preventDefault(); setInst(ev); } function ok(){ setInst(null); } window.addEventListener('beforeinstallprompt',bp); window.addEventListener('appinstalled',ok); return function(){ window.removeEventListener('beforeinstallprompt',bp); window.removeEventListener('appinstalled',ok); }; },[]);
  var m=useState(false), addOpen=m[0], setAdd=m[1], cl=useState(null), callAwb=cl[0], setCall=cl[1], t=useState(null), toast=t[0], setToast=t[1];
  useEffect(function(){
    function on(ev){ setUser((ev.detail&&ev.detail.name)||'Driver'); setFilter('all'); setOpen(true); setReplay(function(n){ return n+1; }); }
    function off(){ setOpen(false); setAdd(false); setCall(null); setToast(null); }
    window.addEventListener('hp-open',on); window.addEventListener('hp-close',off);
    return function(){ window.removeEventListener('hp-open',on); window.removeEventListener('hp-close',off); };
  },[]);
  useEffect(function(){ try{ localStorage.setItem(KEY,JSON.stringify(parcels)); }catch(x){} },[parcels]);
  useEffect(function(){ if(!toast) return; var id=setTimeout(function(){ setToast(null); },2800); return function(){ clearTimeout(id); }; },[toast]);
  function say(msg){ setToast({m:msg,k:Date.now()}); }
  function setStatus(awb,st){ setParcels(function(l){ return l.map(function(p){ return p.awb===awb?Object.assign({},p,{st:st}):p; }); }); }
  function exists(awb){ return parcels.some(function(p){ return p.awb===awb; }); }
  function addParcel(pp){ if(exists(pp.awb)){ say('That parcel is already in your list'); return false; } setParcels(function(l){ return [Object.assign({},pp,{st:'pending'})].concat(l); }); setFilter('all'); say('Parcel '+pp.awb+' added'); return true; }
  var cnt=useMemo(function(){ var n={pending:0,today:0,tomorrow:0,cancelled:0}; parcels.forEach(function(p){ n[p.st]++; }); return n; },[parcels]);
  var list=filter==='all'?parcels:parcels.filter(function(p){ return p.st===filter; });
  var tabs=[['all','All',parcels.length],['today','Today',cnt.today],['tomorrow','Tomorrow',cnt.tomorrow],['cancelled','Cancelled',cnt.cancelled]];
  var callP=callAwb&&parcels.filter(function(p){ return p.awb===callAwb; })[0];
  var resolved=parcels.length?Math.round((parcels.length-cnt.pending)/parcels.length*100):0;
  var anyModal=addOpen||!!callP;
  var main=e('div',{className:'dwrap'},
    e('header',{className:'dhead'},
      e('div',{className:'dlogo'},e('svg',{viewBox:'0 0 48 40',width:30,height:25,role:'img','aria-label':'Happy Parcel logo',fill:'none',stroke:'#fff',strokeWidth:4.6,strokeLinecap:'round',strokeLinejoin:'round'},e('path',{d:'M10 8V32'}),e('path',{d:'M10 20H25'}),e('path',{d:'M25 8V32'}),e('path',{d:'M25 8H31.5a6.5 6.5 0 0 1 0 13H25'}))),
      e('div',{className:'dtitle'},e('small',null,'Driver Dashboard'),e('h1',null,'Hello, ',user)),
      inst?e('button',{type:'button',className:'hp-out',onClick:function(){ inst.prompt(); setInst(null); }},Ic('plus',16),e('span',null,'Install app')):null,
      e('button',{type:'button',className:'hp-out',onClick:function(){ if(window.HPApp) window.HPApp.signOut(); }},Ic('out',16),e('span',null,'Sign out'))),
    e('div',{className:'hp-metrics'},
      e(Metric,{cls:'t',label:'📦 Total Parcels',v:parcels.length,replay:replay,sub:'On your route'}),
      e(Metric,{cls:'g',label:'🟩 Deliver Today',v:cnt.today,replay:replay,sub:'Confirmed by customer'}),
      e(Metric,{cls:'y',label:'🟨 Tomorrow',v:cnt.tomorrow,replay:replay,sub:'Rescheduled'}),
      e(Metric,{cls:'r',label:'🟥 Cancelled',v:cnt.cancelled,replay:replay,sub:'Return to warehouse'}),
      e(Metric,{cls:'n',label:'⬜ Pending',v:cnt.pending,replay:replay,sub:'Awaiting AI call'})),
    e('div',{className:'hp-prog'},e('span',null,resolved+'% resolved'),e('div',{className:'pbar'},e('i',{style:{width:resolved+'%'}})),e('span',null,(parcels.length-cnt.pending)+'/'+parcels.length)),
    e('div',{className:'hp-tabs',role:'tablist'},tabs.map(function(tb){ return e('button',{key:tb[0],type:'button',role:'tab','aria-selected':filter===tb[0],className:'hp-tab'+(filter===tb[0]?' on':''),onClick:function(){ setFilter(tb[0]); }},tb[1],e('em',null,tb[2])); })),
    list.length?e('div',{className:'hp-list'},list.map(function(p){ return e(Card,{key:p.awb,p:p,onCall:setCall,onReset:function(awb){ setStatus(awb,'pending'); say('Parcel reset to pending'); }}); }))
      :e('div',{className:'hp-empty'},filter==='all'?'No parcels yet — tap “Add parcel” to scan one.':'No '+LABEL[filter].toLowerCase()+' parcels right now.'),
    e('div',{className:'hp-foot'},'Demo data is saved on this device only. ',e('button',{type:'button',onClick:function(){ setParcels(SEED.map(function(p){ return Object.assign({},p); })); setFilter('all'); say('Demo data restored'); }},'Reset demo data')));
  var layer=open?e(Fragment,null,
    !anyModal?e('button',{key:'fab',type:'button',className:'hp-fab',onClick:function(){ setAdd(true); }},Ic('plus',20),'Add parcel'):null,
    addOpen?e(AddSheet,{key:'add',onClose:function(){ setAdd(false); },onAdd:addParcel,exists:exists,say:say}):null,
    callP?e(CallModal,{key:'call'+callP.awb,parcel:callP,say:say,onClose:function(){ setCall(null); },onResult:function(n){ setStatus(callP.awb,KEYST[n]); say(n===1?'Confirmed for Today — navigation unlocked':n===2?'Rescheduled for Tomorrow — keep in bag':'Cancelled — return to warehouse'); }}):null,
    toast?e('div',{key:'t'+toast.k,className:'hp-toast',role:'status'},toast.m):null):null;
  return e(Fragment,null,main,RD.createPortal(layer,modalEl));
}
RD.createRoot(mountEl).render(e(App));
window.HPDash={ready:true}; window.__hpReady=true;
})();

const rand = (a,b)=>a+Math.random()*(b-a);
const clamp = (v,a,b)=>Math.min(b,Math.max(a,v));
const lerp = (a,b,t)=>a+(b-a)*t;
const smooth = (x,a,b)=>{ const t=clamp((x-a)/(b-a),0,1); return t*t*(3-2*t); };
function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
const IS_TOUCH = matchMedia('(pointer:coarse)').matches;
const app = $('#app');

/* ───────────────────────── renderer / scene / camera ───────────────────────── */
{ const t=document.createElement('canvas'); if(!(t.getContext('webgl2')||t.getContext('webgl'))) throw new Error('WebGL is not available in this browser. Enable hardware acceleration or try Chrome/Edge.'); }
const renderer = new THREE.WebGLRenderer({ antialias:false, powerPreference:'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, IS_TOUCH?1.5:2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = IS_TOUCH ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
$('#stage').appendChild(renderer.domElement);
const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xb98a74, 0.0065);
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.1, 2500);

const HDR = renderer.extensions.has('EXT_color_buffer_float') || renderer.extensions.has('EXT_color_buffer_half_float');
const rt = new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: HDR?THREE.HalfFloatType:THREE.UnsignedByteType, samples: IS_TOUCH?2:4 });
const composer = new EffectComposer(renderer, rt);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.62, 0.7, 0.9);
composer.addPass(bloom);
composer.addPass(new OutputPass());

/* ───────────────────────── sky + environment ───────────────────────── */
const sunDir = new THREE.Vector3(-0.55, 0.34, 0.76).normalize();
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite:false,
  uniforms:{ uTime:{value:0}, uSun:{value:sunDir} },
  vertexShader:`varying vec3 vDir; void main(){ vDir=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader:`
    varying vec3 vDir; uniform float uTime; uniform vec3 uSun;
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=.5; } return v; }
    void main(){
      vec3 d=normalize(vDir); float h=clamp(d.y,0.,1.);
      vec3 horizon=vec3(1.0,0.52,0.30), mid=vec3(0.45,0.32,0.52), zenith=vec3(0.035,0.075,0.24);
      vec3 col=mix(horizon,mid,smoothstep(0.0,0.22,h));
      col=mix(col,zenith,smoothstep(0.12,0.75,h));
      float sun=max(dot(d,normalize(uSun)),0.);
      col+=vec3(1.0,0.55,0.25)*pow(sun,5.)*0.55+vec3(1.0,0.8,0.5)*pow(sun,220.)*3.5;
      // stars
      vec2 sp=d.xz/(d.y+0.3)*60.; float st=step(0.9965,hash(floor(sp))); col+=vec3(st)*smoothstep(0.35,0.8,h)*0.8;
      if(d.y>0.0){
        vec2 uv=d.xz/(d.y+0.16)*1.3+vec2(uTime*0.012,uTime*0.004);
        float c=fbm(uv*1.15); c=smoothstep(0.46,0.86,c);
        float lit=pow(sun,2.)*0.9+0.25;
        vec3 cc=mix(vec3(0.26,0.18,0.32),vec3(1.0,0.60,0.38),lit);
        cc=mix(cc,vec3(1.0,0.78,0.55),smoothstep(0.55,0.95,fbm(uv*1.15+3.1))*0.4);
        col=mix(col,cc,c*0.86*smoothstep(0.0,0.14,d.y));
      } else { col=mix(horizon*0.7,vec3(0.18,0.1,0.1),clamp(-d.y*3.,0.,1.)); }
      gl_FragColor=vec4(col,1.0);
    }`
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(900,48,24), skyMat);
sky.frustumCulled=false; sky.renderOrder=-10; scene.add(sky);
{
  const envScene = new THREE.Scene();
  envScene.add(new THREE.Mesh(new THREE.SphereGeometry(50,32,16), skyMat));
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(envScene, 0, 0.1, 100).texture;
  pm.dispose();
}

/* ───────────────────────── lights ───────────────────────── */
const sun = new THREE.DirectionalLight(0xffc28a, 3.3);
sun.position.copy(sunDir).multiplyScalar(70);
sun.castShadow = true;
sun.shadow.mapSize.set(IS_TOUCH?1024:2048, IS_TOUCH?1024:2048);
Object.assign(sun.shadow.camera,{ left:-30, right:30, top:30, bottom:-30, near:5, far:180 });
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);
const fill = new THREE.DirectionalLight(0x6f8cff, 0.7); fill.position.set(40,18,-25); scene.add(fill);
scene.add(new THREE.HemisphereLight(0x9bb0ff, 0x4a3030, 0.55));
const interiorLight = new THREE.PointLight(0xffb36b, 34, 15, 2); interiorLight.position.set(0,3.5,0.2); scene.add(interiorLight);
const spillLight = new THREE.PointLight(0xffa955, 14, 10, 2); spillLight.position.set(0,1.6,4.6); scene.add(spillLight);
const bayLight = new THREE.PointLight(0xff9a3c, 0, 34, 2); scene.add(bayLight);
const megaLight = new THREE.PointLight(0xffb060, 0, 60, 2); scene.add(megaLight);
const booms = [0,1].map(()=>{ const l=new THREE.PointLight(0xffa060,0,20,2); scene.add(l); return l; });
let boomI = 0;
function flashLight(x,y,z,intensity,color){ const l=booms[boomI++%2]; l.position.set(x,y,z); l.intensity=intensity; l.color.set(color||0xffa060); }

/* ───────────────────────── procedural textures ───────────────────────── */
function ctex(w,h,draw,opt={}){
  const c=document.createElement('canvas'); c.width=w; c.height=h; const g=c.getContext('2d'); draw(g,w,h);
  const t=new THREE.CanvasTexture(c);
  if(opt.srgb!==false) t.colorSpace=THREE.SRGBColorSpace;
  t.anisotropy=maxAniso;
  if(opt.repeat){ t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(opt.repeat[0],opt.repeat[1]); }
  return t;
}
function speckle(g,w,h,n,rng,maxA=0.12){ for(let i=0;i<n;i++){ g.fillStyle=`rgba(${rng()<.5?'0,0,0':'255,255,255'},${rng()*maxA})`; g.fillRect(rng()*w,rng()*h,1.5,1.5); } }

const brickBase = ctex(512,512,(g,w,h)=>{
  const rng=mulberry32(5); g.fillStyle='#b3a99b'; g.fillRect(0,0,w,h);
  const bh=32,bw=64;
  for(let r=0;r<h/bh;r++) for(let c=-1;c<w/bw+1;c++){
    const x=c*bw+(r%2?bw/2:0)+2,y=r*bh+2,k=rng();
    g.fillStyle=`rgb(${118+k*48|0},${54+k*26|0},${40+k*18|0})`; g.fillRect(x,y,bw-4,bh-4);
    g.fillStyle=`rgba(255,200,160,${rng()*.08})`; g.fillRect(x,y,bw-4,3);
  }
  speckle(g,w,h,9000,rng,.18);
});
const brickBump = ctex(512,512,(g,w,h)=>{
  const rng=mulberry32(6); g.fillStyle='#303030'; g.fillRect(0,0,w,h);
  for(let r=0;r<h/32;r++) for(let c=-1;c<w/64+1;c++){ const x=c*64+(r%2?32:0)+2,y=r*32+2,k=170+rng()*70|0; g.fillStyle=`rgb(${k},${k},${k})`; g.fillRect(x,y,60,28); }
  speckle(g,w,h,6000,rng,.25);
},{srgb:false});
function brickMat(w,h,tint){
  const m=brickBase.clone(), b=brickBump.clone();
  for(const t of [m,b]){ t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(w/2.4,h/2.4); t.needsUpdate=true; }
  return new THREE.MeshStandardMaterial({ map:m, bumpMap:b, bumpScale:2.2, roughness:.92, envMapIntensity:.35, color:tint||0xffffff });
}
const asphaltTex = ctex(512,512,(g,w,h)=>{ const rng=mulberry32(11); g.fillStyle='#303236'; g.fillRect(0,0,w,h);
  for(let i=0;i<5000;i++){ const k=30+rng()*60|0; g.fillStyle=`rgba(${k},${k},${k+4},${.25+rng()*.5})`; g.fillRect(rng()*w,rng()*h,1+rng()*2.5,1+rng()*2.5); }
  for(let i=0;i<14;i++){ g.strokeStyle=`rgba(10,10,12,${.15+rng()*.25})`; g.lineWidth=1+rng()*1.5; g.beginPath(); let x=rng()*w,y=rng()*h; g.moveTo(x,y); for(let k=0;k<6;k++){ x+=rng()*50-25;y+=rng()*50-25; g.lineTo(x,y);} g.stroke(); } },{repeat:[60,3]});
const pavementTex = ctex(256,256,(g,w,h)=>{ const rng=mulberry32(12); g.fillStyle='#6d6b68'; g.fillRect(0,0,w,h);
  for(let i=0;i<4;i++) for(let j=0;j<4;j++){ const k=118+rng()*26|0; g.fillStyle=`rgb(${k},${k-2},${k-6})`; g.fillRect(i*64+2,j*64+2,60,60); }
  speckle(g,w,h,4500,rng,.18); },{repeat:[340,34]});
function facadeTex(cols,rows,seed,emissive,ground){
  return ctex(64*cols,64*rows,(g,w,h)=>{
    const rng=mulberry32(seed); g.fillStyle=emissive?'#000':'#2f2a38'; g.fillRect(0,0,w,h);
    if(!emissive){ speckle(g,w,h,5000,rng,.12); }
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
      const x=c*64+12,y=r*64+10; const isG=ground&&r===rows-1; const lit=isG||rng()<.58;
      if(isG){ g.fillStyle=emissive?'#ffb870':'#e9b070'; g.fillRect(c*64+4,y+4,56,52); continue; }
      if(emissive){ if(lit){ const gr=g.createLinearGradient(0,y,0,y+42); gr.addColorStop(0,'#ffd9a0'); gr.addColorStop(1,'#ff9a50'); g.fillStyle=gr; g.fillRect(x,y,40,42);} }
      else { g.fillStyle=lit?'#c28a5a':'#1c2740'; g.fillRect(x,y,40,42); g.fillStyle='rgba(0,0,0,.35)'; g.fillRect(x+19,y,2,42); g.fillRect(x,y+20,40,2); }
    }
  });
}
function signTex(){ return ctex(2048,256,(g,w,h)=>{
  const gr=g.createLinearGradient(0,0,0,h); gr.addColorStop(0,'#16263f'); gr.addColorStop(1,'#0a1323'); g.fillStyle=gr; g.fillRect(0,0,w,h);
  g.strokeStyle='#ff7a2f'; g.lineWidth=7; g.strokeRect(14,14,w-28,h-28);
  g.save(); g.translate(150,128); // box icon
  g.fillStyle='#ff7a2f'; g.beginPath(); g.moveTo(0,-70); g.lineTo(70,-34); g.lineTo(0,2); g.lineTo(-70,-34); g.closePath(); g.fill();
  g.fillStyle='#d9531a'; g.beginPath(); g.moveTo(-70,-34); g.lineTo(0,2); g.lineTo(0,76); g.lineTo(-70,40); g.closePath(); g.fill();
  g.fillStyle='#ff9a55'; g.beginPath(); g.moveTo(70,-34); g.lineTo(0,2); g.lineTo(0,76); g.lineTo(70,40); g.closePath(); g.fill();
  g.fillStyle='#fff'; g.fillRect(-9,-34,18,36); g.restore();
  g.textBaseline='middle'; g.font='900 118px "Arial Black",Impact,sans-serif'; g.fillStyle='#fff'; g.fillText('HAPPY',290,130);
  const sw=g.measureText('HAPPY ').width; g.fillStyle='#ff7a2f'; g.fillText('PARCEL',290+sw,130);
  g.font='700 46px Arial,sans-serif'; g.fillStyle='#9fb3d1'; g.textAlign='right'; g.fillText('EXPRESS DELIVERY',w-70,98); g.fillStyle='#ffd0a8'; g.fillText('PARCELS  •  24 / 7',w-70,158);
}); }
function interiorTex(){ return ctex(1024,360,(g,w,h)=>{
  const rng=mulberry32(21); const gr=g.createLinearGradient(0,0,0,h); gr.addColorStop(0,'#ffd9a6'); gr.addColorStop(1,'#e9a35e'); g.fillStyle=gr; g.fillRect(0,0,w,h);
  const rg=g.createRadialGradient(w/2,h*.4,40,w/2,h*.5,w*.6); rg.addColorStop(0,'rgba(255,255,230,.35)'); rg.addColorStop(1,'rgba(90,40,0,.35)'); g.fillStyle=rg; g.fillRect(0,0,w,h);
  for(let s=0;s<3;s++){ const y=70+s*95; g.fillStyle='#7a4a24'; g.fillRect(40,y+30,w-80,8);
    for(let x=60;x<w-120;x+=60+rng()*40){ const bw=36+rng()*34,bh=22+rng()*26; g.fillStyle=`rgb(${170+rng()*30|0},${125+rng()*25|0},${80+rng()*20|0})`; g.fillRect(x,y+30-bh,bw,bh); g.fillStyle='rgba(235,200,140,.9)'; g.fillRect(x+bw*.45,y+30-bh,6,bh); } }
  g.fillStyle='#fff'; g.beginPath(); g.arc(w/2,52,32,0,7); g.fill(); g.strokeStyle='#222'; g.lineWidth=3; g.beginPath(); g.moveTo(w/2,52); g.lineTo(w/2,32); g.moveTo(w/2,52); g.lineTo(w/2+16,58); g.stroke();
  g.font='900 38px "Arial Black",Impact'; g.fillStyle='rgba(255,100,30,.9)'; g.textAlign='center'; g.fillText('HAPPY PARCEL',w*.2,48); g.fillText('HAPPY PARCEL',w*.8,48);
}); }
const woodTex = ctex(512,512,(g,w,h)=>{ const rng=mulberry32(33); for(let i=0;i<8;i++){ const k=rng(); g.fillStyle=`rgb(${150+k*40|0},${100+k*30|0},${58+k*20|0})`; g.fillRect(0,i*64,w,62); g.fillStyle='rgba(0,0,0,.35)'; g.fillRect(0,i*64+62,w,2); for(let j=0;j<40;j++){ g.fillStyle=`rgba(60,30,10,${rng()*.15})`; g.fillRect(rng()*w,i*64+rng()*60,60+rng()*140,1);} } },{repeat:[2,1]});
const awningTex = ctex(256,128,(g,w,h)=>{ for(let i=0;i<8;i++){ g.fillStyle=i%2?'#fff3e2':'#ff6a2b'; g.fillRect(i*32,0,32,h);} const gr=g.createLinearGradient(0,0,0,h); gr.addColorStop(0,'rgba(0,0,0,.25)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(0,0,w,h); });
const radial = ctex(128,128,(g,w,h)=>{ const gr=g.createRadialGradient(64,64,0,64,64,64); gr.addColorStop(0,'rgba(0,0,0,.85)'); gr.addColorStop(.55,'rgba(0,0,0,.4)'); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(0,0,w,h); });
const shadowBlobMat = new THREE.MeshBasicMaterial({ map:radial, transparent:true, opacity:.65, depthWrite:false, polygonOffset:true, polygonOffsetFactor:-2 });
const logoDecal = (txt,col)=>ctex(1024,128,(g,w,h)=>{ g.font='900 92px "Arial Black",Impact'; g.fillStyle=col; g.textBaseline='middle'; g.textAlign='center'; g.fillText(txt,w/2,h/2+4); });

/* ───────── cardboard atlas (6 faces in one texture → 1 draw call per parcel) ───────── */
const NAMES=['A. Rivera','M. Chen','J. Okafor','S. Patel','L. Novak','T. Haruki','D. Moreau','P. Singh'];
const STREETS=['221 Harbor Ave','48 Linden Court','9 Foundry Row','1702 Mercer St','35 Orchard Lane','610 Alder Way'];
const CITIES=['Portland, OR 97209','Austin, TX 78701','Leeds LS1 4AP','Pune MH 411001','Osaka 530-0001','Lyon 69002'];
function pick(a,rng){ return a[(rng()*a.length)|0]; }
function tapeV(g,bg,s,u,x0,w,len){
  const grd=g.createLinearGradient(x0,0,x0+w,0); grd.addColorStop(0,'rgba(190,142,80,.93)'); grd.addColorStop(.5,'rgba(226,182,116,.96)'); grd.addColorStop(1,'rgba(184,136,74,.93)');
  g.fillStyle=grd; g.fillRect(x0,0,w,len); g.fillStyle='rgba(255,255,255,.2)'; g.fillRect(x0+w*.14,0,w*.09,len);
  g.save(); g.translate(x0+w*.5+3*u,len); g.rotate(-Math.PI/2); g.fillStyle='rgba(95,58,22,.6)'; g.font=`700 ${10*u}px Arial`; g.textAlign='center'; g.fillText('HAPPY PARCEL  •  EXPRESS  •  HAPPY PARCEL  •  EXPRESS  •  HAPPY PARCEL',len/2,0); g.restore();
  bg.fillStyle='#9b9b9b'; bg.fillRect(x0,0,w,len);
}
function hazard(g,bg,x,y,w,h){
  g.save(); g.beginPath(); g.rect(x,y,w,h); g.clip(); g.fillStyle='#f2c300'; g.fillRect(x,y,w,h); g.fillStyle='#1a1a1a'; const sw=h*.8;
  for(let i=-h;i<w+h;i+=sw*2){ g.beginPath(); g.moveTo(x+i,y+h); g.lineTo(x+i+sw,y+h); g.lineTo(x+i+sw+h,y); g.lineTo(x+i+h,y); g.closePath(); g.fill(); } g.restore();
  bg.fillStyle='#a2a2a2'; bg.fillRect(x,y,w,h);
}
function label(g,bg,s,u,rng,big){
  const x=s*.13,y=s*.17,w=s*.74,h=s*.52; g.save(); g.translate(x+w/2,y+h/2); g.rotate((rng()-.5)*.07); g.translate(-w/2,-h/2);
  g.shadowColor='rgba(0,0,0,.35)'; g.shadowBlur=6*u; g.fillStyle='#f5f2ea'; g.fillRect(0,0,w,h); g.shadowBlur=0;
  g.fillStyle='#16233a'; g.fillRect(0,0,w,h*.17); g.fillStyle='#fff'; g.font=`800 ${h*.12}px Arial`; g.textBaseline='middle'; g.textAlign='left'; g.fillText('HAPPY PARCEL',w*.04,h*.085);
  g.fillStyle='#d62828'; g.fillRect(w*.7,h*.03,w*.26,h*.11); g.fillStyle='#fff'; g.font=`800 ${h*.07}px Arial`; g.textAlign='center'; g.fillText('PRIORITY',w*.83,h*.085);
  g.fillStyle='#222'; g.textAlign='left'; g.font=`600 ${h*.07}px Arial`; g.fillText('SHIP TO:',w*.04,h*.27);
  g.font=`800 ${h*.115}px Arial`; g.fillText(pick(NAMES,rng),w*.04,h*.4); g.font=`500 ${h*.085}px Arial`; g.fillText(pick(STREETS,rng),w*.04,h*.52); g.fillText(pick(CITIES,rng),w*.04,h*.62);
  let bx=w*.05; g.fillStyle='#000'; while(bx<w*.62){ const bw=(1+rng()*3.2)*u*.7; g.fillRect(bx,h*.7,bw,h*.17); bx+=bw+(0.8+rng()*2)*u*.7; }
  g.font=`600 ${h*.06}px monospace`; g.fillText('HP '+((rng()*9000+1000)|0)+' '+((rng()*9000+1000)|0)+' '+((rng()*90+10)|0),w*.05,h*.94);
  for(let i=0;i<7;i++) for(let j=0;j<7;j++){ if(rng()<.55){ g.fillRect(w*.72+i*w*.036,h*.68+j*h*.043,w*.032,h*.038); } }
  g.restore(); bg.fillStyle='#8f8f8f'; bg.fillRect(x,y,w,h);
}
function fragile(g,s,u,rng){
  g.save(); g.translate(s*.5,s*.84); g.rotate((rng()-.5)*.05); g.strokeStyle='rgba(185,28,28,.88)'; g.lineWidth=3*u; g.strokeRect(-s*.3,-s*.075,s*.6,s*.15);
  g.fillStyle='rgba(185,28,28,.9)'; g.font=`900 ${s*.1}px "Arial Black",Impact`; g.textAlign='center'; g.textBaseline='middle'; g.fillText('FRAGILE',0,s*.006); g.restore();
}
function arrows(g,s,u){ g.fillStyle='rgba(30,30,30,.78)'; for(const dx of [-1,1]){ g.save(); g.translate(s*.5+dx*s*.16,s*.5); g.beginPath(); g.moveTo(0,-s*.22); g.lineTo(s*.07,-s*.1); g.lineTo(s*.025,-s*.1); g.lineTo(s*.025,s*.2); g.lineTo(-s*.025,s*.2); g.lineTo(-s*.025,-s*.1); g.lineTo(-s*.07,-s*.1); g.closePath(); g.fill(); g.restore(); }
  g.font=`800 ${s*.06}px Arial`; g.textAlign='center'; g.fillText('THIS SIDE UP',s*.5,s*.8); }
function drawFace(g,bg,x,y,s,u,f,rng,base,mega){
  for(const c of [g,bg]){ c.save(); c.beginPath(); c.rect(x,y,s,s); c.clip(); c.translate(x,y); }
  g.fillStyle=base; g.fillRect(0,0,s,s);
  for(let i=0;i<46;i++){ g.fillStyle=rng()<.5?`rgba(70,40,12,${.02+rng()*.05})`:`rgba(255,228,170,${.02+rng()*.06})`; const w=(20+rng()*90)*u; g.fillRect(rng()*s,rng()*s,w,w*(.15+rng()*.6)); }
  g.fillStyle='rgba(60,35,10,.06)'; for(let yy=0;yy<s;yy+=3*u) g.fillRect(0,yy,s,.8*u+.3);
  for(let i=0;i<260*u;i++){ g.strokeStyle=`rgba(${rng()<.5?'90,60,25':'240,210,150'},${.05+rng()*.12})`; g.lineWidth=.6; const px=rng()*s,py=rng()*s,l=(3+rng()*10)*u,a=rng()*6.28; g.beginPath(); g.moveTo(px,py); g.lineTo(px+Math.cos(a)*l,py+Math.sin(a)*l); g.stroke(); }
  for(let i=0;i<2000*u*u;i++){ g.fillStyle=`rgba(${rng()<.5?'50,30,10':'255,235,190'},${.05+rng()*.16})`; g.fillRect(rng()*s,rng()*s,1.2,1.2); }
  for(let i=0;i<1500*u*u;i++){ bg.fillStyle=`rgba(${rng()<.5?'0,0,0':'255,255,255'},${.05+rng()*.1})`; bg.fillRect(rng()*s,rng()*s,1.4,1.4); }
  bg.fillStyle='rgba(0,0,0,.14)'; for(let yy=0;yy<s;yy+=3*u) bg.fillRect(0,yy,s,.9*u+.3);
  const eg=g.createRadialGradient(s/2,s/2,s*.38,s/2,s/2,s*.78); eg.addColorStop(0,'rgba(0,0,0,0)'); eg.addColorStop(1,'rgba(45,25,5,.4)'); g.fillStyle=eg; g.fillRect(0,0,s,s);
  const tw=s*(mega?.12:.15);
  if(f===2||f===3){ tapeV(g,bg,s,u,s/2-tw/2,tw,s); if(f===2&&rng()<.4) hazard(g,bg,0,s*.22,s,s*.1); }
  else {
    tapeV(g,bg,s,u,s/2-tw/2,tw,s*.2);
    if(mega){
      if(f===4){ g.fillStyle='rgba(20,30,50,.95)'; g.font=`900 ${s*.17}px "Arial Black",Impact`; g.textAlign='center'; g.textBaseline='middle'; g.fillText('HAPPY',s*.5,s*.36); g.fillStyle='#e2561a'; g.fillText('PARCEL',s*.5,s*.58); hazard(g,bg,0,s*.8,s,s*.1); g.fillStyle='#222'; g.font=`700 ${s*.045}px Arial`; g.fillText('EXPRESS • PRIORITY • HANDLE WITH CARE',s*.5,s*.72); }
      else { hazard(g,bg,0,s*.1,s,s*.09); arrows(g,s,u); fragile(g,s,u,rng); }
    } else {
      const hasLabel=(f===4)||(f===0&&rng()<.6)||(f===1&&rng()<.25)||(f===5&&rng()<.4);
      if(hasLabel) label(g,bg,s,u,rng); else { arrows(g,s,u); }
      if(rng()<.45) hazard(g,bg,0,s*(hasLabel?.76:.1),s,s*.1);
      if(rng()<.5 && !hasLabel) fragile(g,s,u,rng);
    }
  }
  for(const c of [g,bg]) c.restore();
}
function makeAtlas(seed,face,mega){
  const rng=mulberry32(seed),W=face*3,H=face*2,u=face/256;
  const c=document.createElement('canvas'); c.width=W; c.height=H; const g=c.getContext('2d');
  const bc=document.createElement('canvas'); bc.width=W; bc.height=H; const bg=bc.getContext('2d');
  bg.fillStyle='#7a7a7a'; bg.fillRect(0,0,W,H);
  const bases=['#b98a57','#c4975f','#ad7f4d','#bd8f5b','#c9a066','#b3844f'];
  for(let f=0;f<6;f++) drawFace(g,bg,(f%3)*face,((f/3)|0)*face,face,u,f,rng,bases[seed%bases.length],mega);
  const map=new THREE.CanvasTexture(c); map.colorSpace=THREE.SRGBColorSpace; map.anisotropy=maxAniso;
  const bump=new THREE.CanvasTexture(bc); bump.anisotropy=maxAniso;
  return new THREE.MeshStandardMaterial({ map, bumpMap:bump, bumpScale: mega?2.2:1.2, roughness:.86, metalness:0, envMapIntensity:.4 });
}
function atlasBoxGeo(){
  const g=new THREE.BoxGeometry(1,1,1), uv=g.attributes.uv;
  for(let f=0;f<6;f++){ const col=f%3,row=(f/3)|0; for(let k=0;k<4;k++){ const i=f*4+k,u=uv.getX(i),v=uv.getY(i); uv.setXY(i,(col+u*.98+.01)/3,1-(row+1)/2+(v*.98+.01)/2); } }
  uv.needsUpdate=true; return g;
}
const boxGeo = atlasBoxGeo();
const parcelMats = [101,102,103,104,105,106].map(s=>makeAtlas(s,256,false));
const megaMat = makeAtlas(777,512,true); megaMat.transparent=true;
function kraftTex(tape){ return ctex(512,512,(g,w,h)=>{ const rng=mulberry32(88); g.fillStyle='#bd8f5b'; g.fillRect(0,0,w,h);
  for(let i=0;i<60;i++){ g.fillStyle=`rgba(80,50,15,${rng()*.07})`; g.fillRect(rng()*w,rng()*h,60+rng()*200,10+rng()*30);} speckle(g,w,h,5000,rng,.2);
  g.fillStyle='rgba(60,35,10,.07)'; for(let y=0;y<h;y+=4) g.fillRect(0,y,w,1);
  if(tape){ g.fillStyle='rgba(222,176,108,.95)'; g.fillRect(0,h*.0,w,h*.14); } }); }

/* ───────────────────────── scene constants ───────────────────────── */
const SH_W=12, SH_D=7, B=0.16, WALL_H=4.4, ROOF_Y=B+WALL_H+0.3, GRAV=26;
const S = { planeS:0, bay:0, quake:0, crushed:false, quakeDone:false, scooterLaunch:false, rain:null, loginOn:false, ambientFW:false, megaOpen:0, hero:null };
const shake = { amp:0 };
/* scroll-driven playback state */
let pM=0, tsPrev=0, lastScrollT=0, tsCur=0, tsNow=0, auto=false, simT=0, storyT=0, storyDone=false, pRaw=0, pS=0, ff=null, maxScroll=1;
const TOTAL=29;
const shk=()=>shake.amp*Math.min(1,tsNow*3);
const cam = { px:0,py:1.5,pz:19, lx:-12,ly:16,lz:-30, trackW:0, sway:0 };
const shared = {};
const std = (color,o={}) => new THREE.MeshStandardMaterial(Object.assign({color,roughness:.6,metalness:.1,envMapIntensity:.6},o));
function box(w,h,d,mat,x,y,z,parent,o={}){ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat); m.position.set(x,y,z); m.castShadow=o.cast!==false; m.receiveShadow=o.recv!==false; (parent||scene).add(m); return m; }
function cyl(a,b,r,mat,parent,seg=10){ const d=new THREE.Vector3().subVectors(b,a), l=d.length(); const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,l,seg),mat); m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize()); m.castShadow=true; if(parent) parent.add(m); return m; }
function limb(a,b,r,mat,parent){ const d=new THREE.Vector3().subVectors(b,a), l=d.length(); const m=new THREE.Mesh(new THREE.CapsuleGeometry(r,Math.max(.001,l-2*r),4,10),mat); m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize()); m.castShadow=true; parent.add(m); return m; }

/* ───────────────────────── ground, street, city ───────────────────────── */
{
  const dark=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000),std(0x17171a,{roughness:1})); dark.rotation.x=-Math.PI/2; dark.position.y=-0.05; scene.add(dark);
  const road=new THREE.Mesh(new THREE.PlaneGeometry(700,8.6),new THREE.MeshStandardMaterial({map:asphaltTex,roughness:.78,metalness:.05,envMapIntensity:.5}));
  road.rotation.x=-Math.PI/2; road.position.set(0,0,10.5); road.receiveShadow=true; scene.add(road);
  const walkMat=new THREE.MeshStandardMaterial({map:pavementTex,roughness:.85,envMapIntensity:.3});
  const lot=new THREE.Mesh(new THREE.BoxGeometry(700,B,60),walkMat); lot.position.set(0,B/2,-23.8); lot.receiveShadow=true; scene.add(lot);
  const opp=new THREE.Mesh(new THREE.BoxGeometry(700,B,14),walkMat); opp.position.set(0,B/2,21.9); opp.receiveShadow=true; scene.add(opp);
  box(700,B,.28,std(0x8c8a84,{roughness:.9}),0,B/2,6.34,scene);
  box(700,B,.28,std(0x8c8a84,{roughness:.9}),0,B/2,14.6,scene);
  // lane markings
  const mk=std(0xe8e0c0,{roughness:.6,emissive:0x2a2610,emissiveIntensity:.3});
  const dashes=new THREE.InstancedMesh(new THREE.PlaneGeometry(2,.16),mk,90); const m4=new THREE.Matrix4();
  for(let i=0;i<90;i++){ m4.makeRotationX(-Math.PI/2); m4.setPosition(-170+i*4,0.012,10.5); dashes.setMatrixAt(i,m4); } dashes.receiveShadow=true; scene.add(dashes);
  // crosswalk
  for(let i=0;i<8;i++){ const z=new THREE.Mesh(new THREE.PlaneGeometry(.55,8.2),mk); z.rotation.x=-Math.PI/2; z.position.set(-24+i*1.1,0.013,10.5); scene.add(z); }
  // neighbours + skyline
  const nbH={ '-16':7.6, '16':6.4 };
  for(const [cx,h] of [[-16,7.6],[16,6.4]]){
    const cols=6,rows=3;
    const m=new THREE.MeshStandardMaterial({map:facadeTex(cols,rows,cx>0?9:3,false,true),emissiveMap:facadeTex(cols,rows,cx>0?9:3,true,true),emissive:0xffffff,emissiveIntensity:1.1,roughness:.85,envMapIntensity:.3});
    box(13,h,SH_D,m,cx,h/2+B,0,scene);
    box(13.4,.3,SH_D+.4,std(0x2a2a30),cx,h+B+.15,0,scene);
  }
  box(2.2,2.4,2.2,std(0x6a4a35,{roughness:.9}),-16,7.6+B+1.5,-.5,scene);
  const rng=mulberry32(42); const fac=[0,1,2].map(i=>({m:facadeTex(5,14,50+i,false),e:facadeTex(5,14,50+i,true)}));
  for(let i=0;i<26;i++){
    const f=fac[i%3], w=rand(9,16), h=rand(16,52);
    const m=new THREE.MeshStandardMaterial({map:f.m,emissiveMap:f.e,emissive:0xffffff,emissiveIntensity:1.0,roughness:.9,envMapIntensity:.2});
    box(w,h,rand(9,14),m,-190+i*15+rng()*6,h/2,-rng()*70-60,scene,{cast:false,recv:false});
  }
  // street lamps
  shared.lamps=[];
  for(const x of [-9.4,9.4]){
    const g=new THREE.Group(); g.position.set(x,B,6.8); scene.add(g);
    const metal=std(0x202328,{metalness:.8,roughness:.4});
    cyl(new THREE.Vector3(0,0,0),new THREE.Vector3(0,5.4,0),.07,metal,g,12);
    cyl(new THREE.Vector3(0,5.4,0),new THREE.Vector3(0,5.7,.9),.05,metal,g);
    const head=new THREE.Mesh(new THREE.BoxGeometry(.5,.12,.28),new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(3.2,2.5,1.5)})); head.position.set(0,5.66,1.0); g.add(head);
    const pl=new THREE.PointLight(0xffd29a,30,16,2); pl.position.set(0,5.3,1.1); g.add(pl);
    const base=new THREE.Mesh(new THREE.CylinderGeometry(.14,.2,.5,12),metal); base.position.y=.25; g.add(base);
    g.children.forEach(c=>{ if(c.isMesh) c.castShadow=true; });
    shared.lamps.push(g);
  }
  // street furniture
  const bin=new THREE.Mesh(new THREE.CylinderGeometry(.32,.28,.9,16),std(0x2d4a3b,{metalness:.5,roughness:.5})); bin.position.set(-7.6,B+.45,5.2); bin.castShadow=true; scene.add(bin);
  const hyd=new THREE.Group(); hyd.position.set(7.6,B,5.3); const red=std(0xc62828,{roughness:.4,metalness:.3});
  const hm=(geo,x,y,z,rz)=>{ const m=new THREE.Mesh(geo,red); m.position.set(x,y,z); if(rz) m.rotation.z=rz; m.castShadow=true; hyd.add(m); return m; };
  hm(new THREE.CylinderGeometry(.16,.18,.6,14),0,.3,0); hm(new THREE.SphereGeometry(.17,14,10),0,.64,0);
  hm(new THREE.CylinderGeometry(.07,.07,.5,10),0,.4,0,Math.PI/2); scene.add(hyd);
  for(const x of [-12.5,-11.7]){ const cone=new THREE.Mesh(new THREE.ConeGeometry(.22,.6,14),std(0xff6a00,{roughness:.5})); cone.position.set(x,.3,8.1); cone.castShadow=true; scene.add(cone); }
  for(const x of [-4.2,4.2]){ const bol=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.7,10),std(0x9aa0a6,{metalness:.8,roughness:.3})); bol.position.set(x,B+.35,6.1); bol.castShadow=true; scene.add(bol); }
}

/* ───────────────────────── the shop ───────────────────────── */
const shop = new THREE.Group(); scene.add(shop);
const roofG = new THREE.Group(); roofG.position.set(0,ROOF_Y-.15,0); shop.add(roofG);
shared.glass=[]; shared.glows=[];
{
  const brickA=()=>brickMat(12,4.4), graphite=std(0x23262b,{metalness:.85,roughness:.35});
  box(SH_W,WALL_H,.3,brickA(),0,B+WALL_H/2,-SH_D/2+.15,shop);
  box(.3,WALL_H,SH_D,brickMat(7,4.4),-SH_W/2+.15,B+WALL_H/2,0,shop);
  box(.3,WALL_H,SH_D,brickMat(7,4.4), SH_W/2-.15,B+WALL_H/2,0,shop);
  const fz=SH_D/2-.15;
  const piers=[[-5.6,.8],[-1.25,.7],[1.25,.7],[5.6,.8]];
  for(const [x,w] of piers) box(w,WALL_H,.3,brickMat(w,4.4),x,B+WALL_H/2,fz,shop);
  for(const sx of [-1,1]){ box(3.6,.8,.3,brickMat(3.6,.8),sx*3.4,B+.4,fz,shop); box(3.6,WALL_H-3.1,.3,brickMat(3.6,1.3),sx*3.4,B+3.1+(WALL_H-3.1)/2,fz,shop); }
  box(1.8,WALL_H-2.75,.3,brickMat(1.8,1.6),0,B+2.75+(WALL_H-2.75)/2,fz,shop);
  // fascia sign
  box(SH_W-.1,1.12,.28,std(0x0d1626,{roughness:.5,metalness:.3}),0,B+3.8,SH_D/2+.02,shop);
  const sign=new THREE.Mesh(new THREE.PlaneGeometry(SH_W-.5,.94),new THREE.MeshBasicMaterial({map:signTex(),color:new THREE.Color().setRGB(1.5,1.5,1.5)}));
  sign.position.set(0,B+3.8,SH_D/2+.165); shop.add(sign);
  // glass + frames
  const glassMat=new THREE.MeshStandardMaterial({color:0x9fc4d8,metalness:.6,roughness:.05,transparent:true,opacity:.2,envMapIntensity:1.8,depthWrite:false});
  shared.glass.push(glassMat);
  for(const sx of [-1,1]){
    const cx=sx*3.4, cy=B+1.95, gz=SH_D/2-.14;
    const gl=new THREE.Mesh(new THREE.PlaneGeometry(3.6,2.3),glassMat); gl.position.set(cx,cy,gz); shop.add(gl);
    for(const dy of [-1.15,1.15]) box(3.7,.09,.14,graphite,cx,cy+dy,gz,shop);
    for(const dx of [-1.8,0,1.8]) box(.08,2.35,.14,graphite,cx+dx,cy,gz,shop);
    box(3.6,.06,.12,graphite,cx,cy+.35,gz,shop);
    const dec=new THREE.Mesh(new THREE.PlaneGeometry(2.6,.32),new THREE.MeshBasicMaterial({map:logoDecal(sx<0?'PARCELS • PACKAGING':'TRACK YOUR DROP','rgba(255,255,255,.85)'),transparent:true,depthWrite:false})); dec.position.set(cx,cy-.62,gz+.02); shop.add(dec);
    // awning
    const aw=new THREE.Mesh(new THREE.PlaneGeometry(3.8,1.15),new THREE.MeshStandardMaterial({map:awningTex,roughness:.8,side:THREE.DoubleSide}));
    aw.rotation.x=-Math.PI/2+.4; aw.position.set(cx,B+2.9,SH_D/2+.52); aw.castShadow=true; shop.add(aw);
  }
  // door
  const dg=new THREE.Mesh(new THREE.PlaneGeometry(1.6,2.55),glassMat); dg.position.set(0,B+1.4,fz-.0+.01); shop.add(dg);
  for(const dx of [-.82,.82]) box(.1,2.7,.16,graphite,dx,B+1.4,fz+.02,shop);
  box(1.74,.1,.16,graphite,0,B+2.72,fz+.02,shop); box(1.6,.08,.14,graphite,0,B+.14,fz+.02,shop); box(.06,2.6,.12,graphite,0,B+1.4,fz+.02,shop);
  for(const dx of [-.28,.28]){ const h=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.7,10),std(0xdfe3e8,{metalness:1,roughness:.15})); h.position.set(dx,B+1.2,fz+.14); shop.add(h); }
  box(2.2,.06,.7,std(0x7d7a74,{roughness:.9}),0,B+.03,SH_D/2+.25,shop);
  const mat=new THREE.Mesh(new THREE.PlaneGeometry(1.5,.8),new THREE.MeshStandardMaterial({map:logoDecal('WELCOME','#f3eadb'),color:0x333a45,roughness:1,transparent:false})); mat.rotation.x=-Math.PI/2; mat.position.set(0,B+.07,SH_D/2+.3); shop.add(mat);
  // neon OPEN
  const neon=new THREE.Mesh(new THREE.PlaneGeometry(.95,.42),new THREE.MeshBasicMaterial({map:ctex(256,112,(g,w,h)=>{ g.shadowColor='#ff3d7f'; g.shadowBlur=18; g.font='900 70px "Arial Black",Impact'; g.fillStyle='#ffd0e0'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('OPEN',w/2,h/2); g.shadowBlur=0; g.strokeStyle='#ff3d7f'; g.lineWidth=5; g.strokeRect(6,6,w-12,h-12); }),transparent:true,color:new THREE.Color().setRGB(2.4,2.4,2.4),depthWrite:false}));
  neon.position.set(3.4+1.0,B+2.65,SH_D/2-.12); shop.add(neon); shared.neon=neon;
  // interior shell (unlit warm) viewed through glass
  const iw=new THREE.MeshBasicMaterial({color:0xd89c60,side:THREE.BackSide}), ic=new THREE.MeshBasicMaterial({color:0xf2d9b0,side:THREE.BackSide});
  const ifl=new THREE.MeshBasicMaterial({map:woodTex,color:0xe0b080,side:THREE.BackSide}), ib=new THREE.MeshBasicMaterial({map:interiorTex(),side:THREE.BackSide,color:new THREE.Color().setRGB(1.05,1.0,.95)});
  const ih=WALL_H-.1, shell=new THREE.Mesh(new THREE.BoxGeometry(SH_W-.7,ih,SH_D-.5),[iw,iw,ic,ifl,iw,ib]); shell.position.set(0,B+.02+ih/2,0); shop.add(shell);
  for(const x of [-3.6,0,3.6]){ const lp=new THREE.Mesh(new THREE.BoxGeometry(2.2,.06,.6),new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(3,2.5,1.8)})); lp.position.set(x,B+ih-.05,.6); shop.add(lp); shared.glows.push(lp); }
  // counter + shelves + mini parcels
  const wood=std(0x7a4a28,{roughness:.55}); box(4,1.05,.9,wood,-2.4,B+.55,-.7,shop,{cast:false}); box(4.1,.07,1.0,std(0xe8e2d6,{roughness:.3}),-2.4,B+1.1,-.7,shop,{cast:false});
  box(.5,.35,.4,std(0x20242b),-3.4,B+1.3,-.7,shop,{cast:false});
  for(const x of [1.8,4.3]) { box(2.0,2.5,.5,std(0x3a3f48,{roughness:.5}),x,B+1.3,-2.8,shop,{cast:false}); for(let r=0;r<3;r++) for(let k=0;k<3;k++){ const p=new THREE.Mesh(boxGeo,parcelMats[(r+k)%6]); p.scale.set(.5,.38,.4); p.position.set(x-.65+k*.65,B+.5+r*.8,-2.45); shop.add(p); } }
  for(let k=0;k<4;k++){ const p=new THREE.Mesh(boxGeo,parcelMats[k]); p.scale.set(.55,.4,.45); p.position.set(-3.6+k*.9,B+1.35,-.7); p.rotation.y=rand(-.4,.4); shop.add(p); }
  // roof
  const roofMat=std(0x45474d,{roughness:.9}); box(SH_W+.5,.3,SH_D+.5,roofMat,0,0,0,roofG);
  const par=std(0x8e8c88,{roughness:.9});
  box(SH_W+.5,.42,.2,par,0,.36,(SH_D+.5)/2-.1,roofG); box(SH_W+.5,.42,.2,par,0,.36,-(SH_D+.5)/2+.1,roofG);
  box(.2,.42,SH_D+.5,par,(SH_W+.5)/2-.1,.36,0,roofG); box(.2,.42,SH_D+.5,par,-(SH_W+.5)/2+.1,.36,0,roofG);
  const metal=std(0x9aa3ad,{metalness:.9,roughness:.35});
  const ac=box(1.9,.85,1.25,std(0xb8bec6,{metalness:.5,roughness:.5}),-3,.58,-1,roofG);
  const fan=new THREE.Group(); fan.position.set(-3,1.02,-1); roofG.add(fan);
  fan.add(new THREE.Mesh(new THREE.TorusGeometry(.42,.03,8,24),metal)); fan.children[0].rotation.x=Math.PI/2;
  const blades=new THREE.Group(); for(let i=0;i<5;i++){ const b=new THREE.Mesh(new THREE.BoxGeometry(.4,.015,.1),std(0x2b2f36)); b.position.x=.2; const gg=new THREE.Group(); gg.rotation.y=i*Math.PI*2/5; gg.add(b); blades.add(gg);} fan.add(blades); shared.fan=blades;
  for(const [x,z] of [[1.6,-1.8],[2.7,-.7],[4.2,-1.9]]){ const g=new THREE.Group(); g.position.set(x,.15,z); roofG.add(g);
    const a=new THREE.Mesh(new THREE.CylinderGeometry(.3,.34,.35,16),metal); a.position.y=.18; const b=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.7,14),metal); b.position.y=.7; const c=new THREE.Mesh(new THREE.ConeGeometry(.46,.26,18),std(0x6b7078,{metalness:.8,roughness:.4})); c.position.y=1.18; g.add(a,b,c); g.children.forEach(m=>m.castShadow=true); }
  box(1.1,.5,1.1,std(0x5a5f66,{roughness:.8}),-1,.4,1.3,roofG);
  const sky_l=new THREE.Mesh(new THREE.BoxGeometry(1.5,.22,1.05),new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(2.6,1.6,.7)})); sky_l.position.set(.4,.26,1.1); roofG.add(sky_l); shared.glows.push(sky_l);
  cyl(new THREE.Vector3(4.8,.15,2.2),new THREE.Vector3(4.8,3.2,2.2),.04,metal,roofG); box(.9,.04,.04,metal,4.8,2.7,2.2,roofG); box(.6,.04,.04,metal,4.8,2.2,2.2,roofG);
  const bl=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(4,.2,.2)})); bl.position.set(4.8,3.25,2.2); roofG.add(bl); shared.beacon=bl;
  const dish=new THREE.Mesh(new THREE.SphereGeometry(.5,18,12,0,Math.PI*2,0,.85),std(0xe8eaed,{metalness:.4,roughness:.4,side:THREE.DoubleSide})); dish.position.set(-4.6,.95,2); dish.rotation.set(-1.1,.5,0); dish.castShadow=true; roofG.add(dish);
  cyl(new THREE.Vector3(-4.6,.15,2),new THREE.Vector3(-4.6,.8,2),.05,metal,roofG);
  // drainpipes
  for(const x of [-5.95,5.95]) cyl(new THREE.Vector3(x,B,SH_D/2+.02),new THREE.Vector3(x,B+WALL_H,SH_D/2+.02),.05,std(0x30343a,{metalness:.7}),shop);
  shop.traverse(o=>{ if(o.isMesh && o.material && o.material.transparent) { o.castShadow=false; } });
}

/* ───────────────────────── cargo plane ───────────────────────── */
const plane = new THREE.Group(); plane.scale.setScalar(.62); scene.add(plane);
const bayPoint = new THREE.Object3D(); bayPoint.position.set(-12,-2.7,0); plane.add(bayPoint);
const bayMat = new THREE.MeshBasicMaterial({color:0x0d0906,side:THREE.BackSide});
let bayDoor;
{
  const hull=std(0xe6eaef,{roughness:.36,metalness:.55,envMapIntensity:1.1}), belly=std(0x7b838d,{roughness:.5,metalness:.6}), red=std(0xd8321f,{roughness:.4,metalness:.3}), dkm=std(0x1b1e24,{roughness:.4,metalness:.8});
  const prof=[[0,16.2],[.7,15.9],[1.35,14.9],[1.9,13.2],[2.2,11],[2.3,8],[2.3,-6],[2.2,-9],[1.9,-11.5],[1.45,-13.8],[.9,-15.6],[.001,-16.2]].map(p=>new THREE.Vector2(p[0],p[1]));
  const fus=new THREE.Mesh(new THREE.LatheGeometry(prof,44),hull); fus.rotation.z=-Math.PI/2; plane.add(fus);
  // curved livery decals
  const decalTex=ctex(2048,256,(g,w,h)=>{ g.fillStyle='#d8321f'; g.fillRect(0,h*.66,w,h*.1); g.fillStyle='#ff9a3c'; g.fillRect(0,h*.78,w,h*.05); g.textBaseline='middle'; g.font='900 118px "Arial Black",Impact'; g.fillStyle='#14233a'; g.fillText('HAPPY',300,h*.36); const sw=g.measureText('HAPPY ').width; g.fillStyle='#e2561a'; g.fillText('PARCEL',300+sw,h*.36); g.font='700 40px Arial'; g.fillStyle='#14233a'; g.fillText('C A R G O   ·   E X P R E S S',1330,h*.36+4); });
  for(const side of [1,-1]){
    const geo=new THREE.PlaneGeometry(14,1.7,32,1), pos=geo.attributes.position; const R=2.318;
    for(let i=0;i<pos.count;i++){ const y=pos.getY(i); pos.setZ(i,Math.sqrt(R*R-y*y)); }
    geo.computeVertexNormals();
    const d=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:decalTex,transparent:true,roughness:.4,metalness:.3,polygonOffset:true,polygonOffsetFactor:-2,depthWrite:false}));
    d.position.set(2,.25,0); if(side<0) d.rotation.y=Math.PI; plane.add(d);
  }
  const wingShape=(pts)=>{ const sh=new THREE.Shape(); pts.forEach((p,i)=>i?sh.lineTo(p[0],p[1]):sh.moveTo(p[0],p[1])); sh.closePath(); const g=new THREE.ExtrudeGeometry(sh,{depth:.34,bevelEnabled:false}); g.rotateX(-Math.PI/2); return g; };
  const wg=wingShape([[5,1.8],[-6,17.5],[-8.8,17.5],[-6.6,1.8]]); wg.translate(0,-1.05,0);
  const wmat=std(0xdfe4ea,{roughness:.4,metalness:.55,side:THREE.DoubleSide});
  const wl=new THREE.Mesh(wg,wmat), wr=new THREE.Mesh(wg,wmat); wr.scale.z=-1; plane.add(wl,wr);
  for(const s of [1,-1]){ const tip=new THREE.Mesh(new THREE.BoxGeometry(2.4,.12,.4),red); tip.position.set(-7.6,-1.05+.18,s*17.4); plane.add(tip); }
  // tail
  const th=wingShape([[-12,1.2],[-15.8,7],[-17.6,7],[-15.2,1.2]]); th.scale(1,1,1); th.translate(0,-.2,0);
  const hl=new THREE.Mesh(th,wmat), hr=new THREE.Mesh(th,wmat); hr.scale.z=-1; plane.add(hl,hr);
  const fin=new THREE.Shape(); fin.moveTo(-10.5,1.6); fin.lineTo(-15.6,9.6); fin.lineTo(-17.8,9.6); fin.lineTo(-15.6,1.6); fin.closePath();
  const fg=new THREE.ExtrudeGeometry(fin,{depth:.3,bevelEnabled:false}); fg.translate(0,0,-.15); const finM=new THREE.Mesh(fg,red); plane.add(finM);
  // engines
  shared.fans=[];
  const xLead=z=>5-11*(z-1.8)/15.2;
  for(const z of [5.8,11,-5.8,-11]){
    const g=new THREE.Group(); const ex=xLead(Math.abs(z))+.2; g.position.set(ex,-2.15,z); plane.add(g);
    const np=[[.82,1.8],[1.02,1.35],[1.08,.4],[1.02,-1.7],[.72,-2.3],[.001,-2.4]].map(p=>new THREE.Vector2(p[0],p[1]));
    const nac=new THREE.Mesh(new THREE.LatheGeometry(np,28),hull); nac.rotation.z=-Math.PI/2; g.add(nac);
    const lip=new THREE.Mesh(new THREE.TorusGeometry(.83,.07,10,28),dkm); lip.rotation.y=Math.PI/2; lip.position.x=1.78; g.add(lip);
    const core=new THREE.Mesh(new THREE.CircleGeometry(.8,24),new THREE.MeshBasicMaterial({color:0x0a0a0c})); core.rotation.y=Math.PI/2; core.position.x=1.74; g.add(core);
    const fanG=new THREE.Group(); fanG.position.x=1.72; for(let i=0;i<14;i++){ const b=new THREE.Mesh(new THREE.BoxGeometry(.02,.7,.1),std(0x8a8f96,{metalness:.9,roughness:.3})); b.position.y=.38; const gg=new THREE.Group(); gg.rotation.x=i*Math.PI*2/14; gg.add(b); fanG.add(gg);} g.add(fanG); shared.fans.push(fanG);
    box(1.7,.75,.16,belly,.2,.85,0,g,{cast:false});
  }
  // cockpit glass
  for(const s of [1,-1]){ const w=new THREE.Mesh(new THREE.BoxGeometry(.7,.34,.05),new THREE.MeshStandardMaterial({color:0x06090d,metalness:.9,roughness:.08,envMapIntensity:1.6})); w.position.set(13,.82,s*1.5); w.rotation.y=-s*.62; plane.add(w); }
  // cargo bay: dark cavity + hinged curved ramp
  const rF=2.25, rR=1.58, len=4.5, tl=1.2;
  const mkSeg=(rf,rr)=>{ const g=new THREE.CylinderGeometry(rf,rr,len,28,1,true,Math.PI/2-tl/2,tl); g.rotateZ(-Math.PI/2); g.translate(-len/2,0,0); return g; };
  const cav=new THREE.Mesh(mkSeg(rF-.02,rR-.02),bayMat); cav.position.set(-9,0,0); plane.add(cav);
  const dg=mkSeg(rF,rR); dg.translate(0,rF*.93,0);
  bayDoor=new THREE.Group(); bayDoor.position.set(-9,-rF*.93,0); const door=new THREE.Mesh(dg,std(0xd9dde3,{roughness:.4,metalness:.55,side:THREE.DoubleSide})); bayDoor.add(door); plane.add(bayDoor);
  // nav lights
  shared.nav=[];
  for(const [z,c] of [[17.6,[0.2,4,0.4]],[-17.6,[4,0.2,0.2]]]){ const n=new THREE.Mesh(new THREE.SphereGeometry(.24,10,8),new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(c[0],c[1],c[2])})); n.position.set(-8.4,-.9,z); plane.add(n); }
  const st1=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),new THREE.MeshBasicMaterial({color:0xffffff})); st1.position.set(-16.5,9.7,0); plane.add(st1);
  const st2=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),new THREE.MeshBasicMaterial({color:0xffffff})); st2.position.set(0,-2.35,0); plane.add(st2); shared.strobes=[st1,st2];
}
plane.traverse(o=>{ if(o.isMesh) o.castShadow=false; });

/* ───────────────────────── particles ───────────────────────── */
class Particles{
  constructor(max,additive,order){
    this.max=max; this.i=0; const n=max;
    this.pos=new Float32Array(n*3); this.col=new Float32Array(n*3); this.size=new Float32Array(n); this.alpha=new Float32Array(n);
    this.vel=new Float32Array(n*3); this.life=new Float32Array(n); this.maxLife=new Float32Array(n); this.grav=new Float32Array(n); this.drag=new Float32Array(n); this.s0=new Float32Array(n); this.grow=new Float32Array(n); this.a0=new Float32Array(n);
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(this.pos,3)); geo.setAttribute('aColor',new THREE.BufferAttribute(this.col,3));
    geo.setAttribute('aSize',new THREE.BufferAttribute(this.size,1)); geo.setAttribute('aAlpha',new THREE.BufferAttribute(this.alpha,1));
    this.geo=geo;
    this.mat=new THREE.ShaderMaterial({ uniforms:{uScale:{value:1000}}, transparent:true, depthWrite:false, blending:additive?THREE.AdditiveBlending:THREE.NormalBlending,
      vertexShader:`attribute vec3 aColor; attribute float aSize; attribute float aAlpha; uniform float uScale; varying vec3 vC; varying float vA;
        void main(){ vC=aColor; vA=aAlpha; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=aSize*uScale/max(0.1,-mv.z); }`,
      fragmentShader:`varying vec3 vC; varying float vA; void main(){ float d=length(gl_PointCoord-0.5)*2.0; float a=smoothstep(1.0,0.0,d); a*=a; if(vA*a<0.002) discard; gl_FragColor=vec4(vC,vA*a); }` });
    this.points=new THREE.Points(geo,this.mat); this.points.frustumCulled=false; this.points.renderOrder=order; scene.add(this.points);
  }
  emit(x,y,z,vx,vy,vz,r,g,b,size,life,grav=1,drag=.5,grow=0,alpha=1){
    const i=this.i; this.i=(i+1)%this.max; const k=i*3;
    this.pos[k]=x;this.pos[k+1]=y;this.pos[k+2]=z; this.vel[k]=vx;this.vel[k+1]=vy;this.vel[k+2]=vz; this.col[k]=r;this.col[k+1]=g;this.col[k+2]=b;
    this.s0[i]=this.size[i]=size; this.life[i]=this.maxLife[i]=life; this.grav[i]=grav; this.drag[i]=drag; this.grow[i]=grow; this.a0[i]=this.alpha[i]=alpha;
  }
  update(dt){
    for(let i=0;i<this.max;i++){
      let l=this.life[i]; if(l<=0) continue; l-=dt; this.life[i]=l;
      if(l<=0){ this.alpha[i]=0; this.size[i]=0; continue; }
      const k=i*3, d=Math.exp(-this.drag[i]*dt);
      const vx=this.vel[k]*d, vy=this.vel[k+1]*d-this.grav[i]*9.8*dt, vz=this.vel[k+2]*d;
      this.vel[k]=vx; this.vel[k+1]=vy; this.vel[k+2]=vz; this.pos[k]+=vx*dt; this.pos[k+1]+=vy*dt; this.pos[k+2]+=vz*dt;
      const t=l/this.maxLife[i]; this.size[i]=this.s0[i]*(1+this.grow[i]*(1-t)); this.alpha[i]=this.a0[i]*Math.min(1,t/.4);
    }
    const a=this.geo.attributes; a.position.needsUpdate=a.aSize.needsUpdate=a.aAlpha.needsUpdate=a.aColor.needsUpdate=true;
  }
  clear(){ this.life.fill(0); this.alpha.fill(0); this.size.fill(0); const a=this.geo.attributes; a.aSize.needsUpdate=a.aAlpha.needsUpdate=true; }
}
const sparks=new Particles(4200,true,3), dust=new Particles(1800,false,2);
const gSparks=new Particles(4200,true,3), gDust=new Particles(1800,false,2); gSparks.points.visible=gDust.points.visible=false;
function puff(x,y,z,p=1){
  for(let i=0;i<Math.floor(7*p);i++) dust.emit(x+rand(-.3,.3),y,z+rand(-.3,.3),rand(-1.6,1.6)*p,rand(.4,1.8),rand(-1.6,1.6)*p,.62,.56,.5,rand(.6,1.4)*Math.sqrt(p),rand(.9,1.7),-.02,1.2,1.6,.35);
  for(let i=0;i<Math.floor(6*p);i++) sparks.emit(x,y+.1,z,rand(-3,3)*p,rand(1,4.5),rand(-3,3)*p,2.2,1.3,.5,rand(.06,.12),rand(.3,.7),1,.5);
}
function explode(x,y,z,p=1){
  const n=Math.floor(34*p);
  for(let i=0;i<n;i++){ const a=rand(0,6.283), e=rand(-.2,1), sp=rand(2.5,9.5)*Math.sqrt(p), c=Math.sqrt(1-e*e); const hot=Math.random();
    sparks.emit(x,y,z,Math.cos(a)*c*sp,e*sp+2,Math.sin(a)*c*sp,3.2,1.2+hot*1.6,.35+hot*.4,rand(.09,.2),rand(.5,1.2),1,.7); }
  for(let i=0;i<Math.floor(18*p);i++){ const a=rand(0,6.283), sp=rand(1,4.2)*p; dust.emit(x,y,z,Math.cos(a)*sp,rand(.5,3),Math.sin(a)*sp,.55,.5,.46,rand(1.1,2.4)*Math.sqrt(p),rand(1.3,2.4),-.03,1.4,1.8,.5); }
  sparks.emit(x,y,z,0,0,0,3.5,2.4,1.2,2.4*Math.sqrt(p),.22,0,0,.5,1);
  flashLight(x,y+.5,z,70*p,0xff9a50);
}
const rockets=[];
const FW=[[3,.6,.5],[.6,2.4,3],[3,2.2,.5],[2.2,.7,3],[.8,3,1.2],[3,1.2,2]];
function launchRocket(x,y,z,vy){ rockets.push({p:new THREE.Vector3(x,y,z),v:new THREE.Vector3(rand(-2.2,2.2),vy,rand(-2,2)),fuse:vy/7.5*rand(.8,.95),c:FW[(Math.random()*FW.length)|0]}); }
function burstRocket(r){
  const c=r.c, ring=Math.random()<.3, n=ring?110:170, c2=FW[(Math.random()*FW.length)|0];
  for(let i=0;i<n;i++){
    let dx,dy,dz; if(ring){ const a=i/n*6.283; dx=Math.cos(a); dy=Math.sin(a)*.3; dz=Math.sin(a); const t=r.p; } else { dx=rand(-1,1);dy=rand(-1,1);dz=rand(-1,1); const l=Math.hypot(dx,dy,dz)||1; dx/=l;dy/=l;dz/=l; }
    const sp=rand(5.5,9.5), col=Math.random()<.25?c2:c;
    sparks.emit(r.p.x,r.p.y,r.p.z,dx*sp,dy*sp,dz*sp,col[0],col[1],col[2],rand(.13,.24),rand(1.3,2.2),.35,1.1,0,1);
  }
  for(let i=0;i<40;i++){ const dx=rand(-1,1),dy=rand(-1,1),dz=rand(-1,1),l=Math.hypot(dx,dy,dz)||1,sp=rand(2,5); sparks.emit(r.p.x,r.p.y,r.p.z,dx/l*sp,dy/l*sp,dz/l*sp,3,2.6,1.6,.07,rand(2,3),.6,.8,0,1); }
  sparks.emit(r.p.x,r.p.y,r.p.z,0,0,0,3.5,3,2.4,3.5,.25,0,0,.6,.9);
  flashLight(r.p.x,r.p.y,r.p.z+4,160,new THREE.Color().setRGB(c[0]/3,c[1]/3,c[2]/3).getHex());
}

/* ───────────────────────── parcels + physics ───────────────────────── */
const parcels=[]; const stack=new Map(); const blobs=[];
const cellKey=(x,z)=>(Math.floor(x/1.1)+300)*1000+(Math.floor(z/1.1)+300);
function baseGround(x,z){ if(!S.crushed && Math.abs(x)<SH_W/2-.2 && Math.abs(z)<SH_D/2-.1) return ROOF_Y; return z<6.2?B:0; }
function groundAt(x,z,ig){ let g=baseGround(x,z); if(!ig){ const s=stack.get(cellKey(x,z)); if(s!==undefined&&s>g) g=s; } return g; }
function addStack(p){ const m=p.mesh.position, top=m.y+p.hy; for(let x=m.x-p.hx*.8;x<=m.x+p.hx*.8+.01;x+=.55) for(let z=m.z-p.hz*.8;z<=m.z+p.hz*.8+.01;z+=.55){ const k=cellKey(x,z); if((stack.get(k)||-1)<top) stack.set(k,top); } }
const _bay=new THREE.Vector3();
function solveFall(y0,yT,vy0){ return (vy0+Math.sqrt(vy0*vy0+2*GRAV*(y0-yT)))/GRAV; }
function pickTarget(hero){
  if(hero) return {x:1.3,z:5.0};
  for(let k=0;k<20;k++){
    const r=Math.random(); let x,z;
    if(r<.42){ x=rand(-5,5); z=rand(-2.8,2.8); }
    else if(r<.65){ x=rand(-9,9); z=rand(3.9,5.8); }
    else { x=rand(-10,10); z=rand(8.7,11); }
    if(Math.abs(x-1.3)<1.9 && Math.abs(z-5.0)<1.7) continue;
    return {x,z};
  }
  return {x:-6,z:9.5};
}
function spawnParcel(hero){
  plane.updateMatrixWorld(true); bayPoint.getWorldPosition(_bay);
  const w=hero?1.0:rand(.75,1.35), h=hero?.75:rand(.55,1.0), d=hero?.9:rand(.75,1.3);
  const mesh=new THREE.Mesh(boxGeo,parcelMats[hero?0:(Math.random()*6)|0]); mesh.scale.set(w,h,d); mesh.castShadow=mesh.receiveShadow=true;
  mesh.position.copy(_bay).add(new THREE.Vector3(rand(-.3,.3),0,rand(-.3,.3))); mesh.rotation.set(rand(0,6),rand(0,6),rand(0,6)); scene.add(mesh);
  const tg=pickTarget(hero), gy=groundAt(tg.x,tg.z)+h/2, vy0=-3, t=solveFall(mesh.position.y,gy,vy0);
  const p={ mesh, hx:w/2,hy:h/2,hz:d/2, vel:new THREE.Vector3((tg.x-mesh.position.x)/t,vy0,(tg.z-mesh.position.z)/t), ang:new THREE.Vector3(rand(-4,4),rand(-4,4),rand(-4,4)), state:'fall', bounces:0, hero, kicked:false, first:true, ph:Math.random()*6.28, restY:0, rx:0, rz:0 };
  parcels.push(p); if(hero) S.hero=p; return p;
}
function addBlob(x,y,z,w,d){ const b=new THREE.Mesh(new THREE.PlaneGeometry(1,1),shadowBlobMat); b.rotation.x=-Math.PI/2; b.position.set(x,y+.02,z); b.scale.set(w*1.9,d*1.9,1); scene.add(b); b.userData.t0=storyT; blobs.push(b); return b; }
function land(p){
  const m=p.mesh, gy=groundAt(m.position.x,m.position.z,p.kicked), r=(p.hx+p.hy+p.hz)/3*.85;
  const sp=Math.abs(p.vel.y);
  if(p.first){ p.first=false; if(!p.kicked){ if(Math.random()<.2||p.hero) explode(m.position.x,gy+.2,m.position.z,p.hero?.9:1.1+Math.random()*.5); else puff(m.position.x,gy+.1,m.position.z,1); } else puff(m.position.x,gy+.1,m.position.z,.9); }
  if(p.hero){ p.vel.set(0,0,0); p.ang.set(0,0,0); rest(p,gy); return; }
  if(sp>3.2 && p.bounces<2){ p.bounces++; m.position.y=gy+r; p.vel.y=sp*.3; p.vel.x*=.5; p.vel.z*=.5; p.ang.multiplyScalar(.5); if(sp>6) puff(m.position.x,gy+.1,m.position.z,.5); }
  else { p.vel.set(0,0,0); rest(p,gy); }
}
function rest(p,gy){
  p.state='rest'; p.restY=gy+p.hy; p.rx=p.mesh.position.x; p.rz=p.mesh.position.z; p.ang.set(0,0,0); p.mesh.rotation.y=p.mesh.rotation.y;
  if(!p.kicked){ addStack({mesh:{position:{x:p.rx,y:p.restY,z:p.rz}},hx:p.hx,hy:p.hy,hz:p.hz}); addBlob(p.rx,gy,p.rz,p.hx*2,p.hz*2); }
}
const _q=new THREE.Quaternion(), _e=new THREE.Euler();
function updateParcels(dt,t){
  for(const p of parcels){
    const m=p.mesh;
    if(p.state==='fall'){
      p.vel.y-=GRAV*dt; m.position.addScaledVector(p.vel,dt);
      m.rotation.x+=p.ang.x*dt; m.rotation.y+=p.ang.y*dt; m.rotation.z+=p.ang.z*dt;
      const r=(p.hx+p.hy+p.hz)/3*.85, gy=groundAt(m.position.x,m.position.z,p.kicked);
      if(m.position.y-r<=gy && p.vel.y<0) land(p);
    } else if(p.state==='rest'){
      _e.set(0,m.rotation.y,0); _q.setFromEuler(_e); m.quaternion.slerp(_q,1-Math.exp(-14*dt));
      const q=S.quake; let hop=0,jx=0,jz=0; if(q>0.01){ hop=Math.abs(Math.sin(t*34+p.ph))*q*.28; jx=Math.sin(t*47+p.ph*2)*q*.06; jz=Math.cos(t*41+p.ph)*q*.06; }
      m.position.y+=(p.restY+hop-m.position.y)*(1-Math.exp(-18*dt)); m.position.x=p.rx+jx; m.position.z=p.rz+jz;
    }
  }
}
function kickParcels(){
  for(const p of parcels){
    if(p.state==='carried'||p.state==='gone') continue; const m=p.mesh;
    if(Math.abs(m.position.x)<SH_W/2+.8 && Math.abs(m.position.z)<SH_D/2+.6 && m.position.y>3){ p.state='gone'; gsap.to(m.scale,{y:.04,duration:.25,ease:'power2.in',onComplete:()=>{m.visible=false;}}); continue; }
    let dx=m.position.x, dz=m.position.z-1; const l=Math.hypot(dx,dz)||1; dx/=l; dz/=l; const s=rand(7,15);
    p.state='fall'; p.kicked=true; p.bounces=0; p.first=true; p.vel.set(dx*s,rand(6,13),dz*s*.7); p.ang.set(rand(-6,6),rand(-6,6),rand(-6,6));
  }
  for(const b of blobs){ b.visible=false; b.userData.t1=storyT; }
}
function clearParcels(){ for(const p of parcels){ if(p.mesh.parent) p.mesh.parent.remove(p.mesh); p.mesh.scale.set(1,1,1); } parcels.length=0; stack.clear(); for(const b of blobs) scene.remove(b); blobs.length=0; S.hero=null; }

/* ───────────────────────── delivery scooter + rider ───────────────────────── */
const scooter = new THREE.Group(); scooter.scale.setScalar(1.2); scene.add(scooter);
const sc = { body:new THREE.Group(), wheels:[], torso:null, slot:null, armL:null, armR:null, head:null };
{
  const body=sc.body; scooter.add(body);
  const paint=new THREE.MeshPhysicalMaterial({color:0xff5f1f,roughness:.28,metalness:.35,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:1.2});
  const dark=std(0x16181d,{roughness:.45,metalness:.6}), chrome=std(0xdfe3e8,{metalness:1,roughness:.15}), rubber=std(0x0e0e10,{roughness:.9,metalness:0}), seatM=std(0x0d0d0f,{roughness:.6});
  const makeWheel=()=>{ const w=new THREE.Group(); w.add(new THREE.Mesh(new THREE.TorusGeometry(.27,.1,16,40),rubber)); const rim=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.13,26),chrome); rim.rotation.x=Math.PI/2; w.add(rim);
    const hub=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.22,12),dark); hub.rotation.x=Math.PI/2; w.add(hub);
    for(let i=0;i<4;i++){ const sp=new THREE.Mesh(new THREE.BoxGeometry(.4,.04,.06),dark); sp.rotation.z=i*Math.PI/4; w.add(sp); }
    const disc=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.02,20),chrome); disc.rotation.x=Math.PI/2; disc.position.z=.075; w.add(disc);
    w.traverse(o=>{ if(o.isMesh) o.castShadow=true; }); return w; };
  const fw=makeWheel(); fw.position.set(.78,.37,0); const rw=makeWheel(); rw.position.set(-.62,.37,0); body.add(fw,rw); sc.wheels.push(fw,rw);
  for(const s of [-1,1]) cyl(new THREE.Vector3(.54,.98,s*.12),new THREE.Vector3(.78,.37,s*.12),.028,chrome,body);
  const bar=new THREE.Mesh(new THREE.CylinderGeometry(.024,.024,.64,10),dark); bar.rotation.x=Math.PI/2; bar.position.set(.5,1.06,0); body.add(bar);
  for(const s of [-1,1]){ const gr=new THREE.Mesh(new THREE.CylinderGeometry(.036,.036,.16,10),rubber); gr.rotation.x=Math.PI/2; gr.position.set(.5,1.06,s*.3); body.add(gr);
    cyl(new THREE.Vector3(.5,1.08,s*.26),new THREE.Vector3(.46,1.4,s*.3),.012,dark,body); const mir=new THREE.Mesh(new THREE.SphereGeometry(.06,10,8),dark); mir.scale.set(.4,1,1.3); mir.position.set(.46,1.43,s*.3); body.add(mir); }
  const hl=new THREE.Mesh(new THREE.SphereGeometry(.12,16,12),new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(4,3.6,2.8)})); hl.scale.set(.7,1,1); hl.position.set(.66,.99,0); body.add(hl);
  const shield=new THREE.Mesh(new THREE.BoxGeometry(.07,.72,.5),paint); shield.position.set(.4,.66,0); shield.rotation.z=-.2; shield.castShadow=true; body.add(shield);
  const fend=new THREE.Mesh(new THREE.TorusGeometry(.4,.04,8,24,Math.PI*.75),paint); fend.scale.z=3.4; fend.rotation.z=Math.PI*.125; fend.position.set(.78,.37,0); fend.castShadow=true; body.add(fend);
  const rb=new THREE.Mesh(new THREE.SphereGeometry(.38,20,14),paint); rb.scale.set(1.4,.8,.88); rb.position.set(-.5,.62,0); rb.castShadow=true; body.add(rb);
  const rf=new THREE.Mesh(new THREE.TorusGeometry(.4,.04,8,24,Math.PI*.7),paint); rf.scale.z=3.2; rf.rotation.z=Math.PI*.15; rf.position.set(-.62,.37,0); body.add(rf);
  const seat=new THREE.Mesh(new THREE.CapsuleGeometry(.14,.6,6,12),seatM); seat.rotation.z=Math.PI/2; seat.scale.set(1,1,1.8); seat.position.set(-.38,.88,0); seat.castShadow=true; body.add(seat);
  const fb=new THREE.Mesh(new THREE.BoxGeometry(.9,.07,.5),dark); fb.position.set(.1,.28,0); body.add(fb); box(.8,.18,.34,dark,-.1,.4,0,body);
  const tail=new THREE.Mesh(new THREE.BoxGeometry(.05,.09,.3),new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(4,.2,.2)})); tail.position.set(-.93,.62,0); body.add(tail);
  box(.6,.04,.5,dark,-.86,.98,0,body); for(const s of [-1,1]) cyl(new THREE.Vector3(-.6,.8,s*.22),new THREE.Vector3(-1.0,.98,s*.22),.015,chrome,body);
  const spot=new THREE.SpotLight(0xfff1d0,70,26,.38,.6,1.4); spot.position.set(.7,.99,0); spot.target.position.set(9,.2,0); body.add(spot,spot.target);
  sc.slot=new THREE.Object3D(); sc.slot.position.set(-.86,1.2,0); body.add(sc.slot);
  // rider
  const jacket=std(0x16294c,{roughness:.55}), pants=std(0x20242c,{roughness:.7}), glove=std(0x101114,{roughness:.6}), helm=new THREE.MeshPhysicalMaterial({color:0xf3f3f5,roughness:.25,clearcoat:1,metalness:.1}), visor=new THREE.MeshPhysicalMaterial({color:0x080d14,roughness:.05,metalness:.9,clearcoat:1}), stripe=std(0xff6a2b,{roughness:.4});
  const H=new THREE.Vector3(-.25,.98,0);
  for(const s of [-1,1]){ const k=new THREE.Vector3(.2,1.0,s*.17); limb(new THREE.Vector3(H.x,H.y,s*.14),k,.085,pants,body); limb(k,new THREE.Vector3(.33,.44,s*.17),.07,pants,body); const ft=new THREE.Mesh(new THREE.BoxGeometry(.24,.09,.11),std(0x15161a)); ft.position.set(.4,.39,s*.17); ft.castShadow=true; body.add(ft); }
  const torso=new THREE.Group(); torso.position.copy(H); torso.rotation.order='ZXY'; torso.rotation.z=-.28; body.add(torso); sc.torso=torso;
  const tb=new THREE.Mesh(new THREE.CapsuleGeometry(.21,.34,6,14),jacket); tb.position.set(0,.34,0); tb.scale.z=1.1; tb.castShadow=true; torso.add(tb);
  const st=new THREE.Mesh(new THREE.BoxGeometry(.43,.05,.5),stripe); st.position.set(0,.4,0); torso.add(st);
  const head=new THREE.Group(); head.position.set(.04,.84,0); torso.add(head); sc.head=head;
  const hm=new THREE.Mesh(new THREE.SphereGeometry(.2,24,18),helm); hm.scale.set(1.08,1,.95); hm.castShadow=true; head.add(hm);
  const vz=new THREE.Mesh(new THREE.SphereGeometry(.208,24,16,Math.PI-.95,1.9,1.05,.72),visor); vz.scale.set(1.08,1,.95); head.add(vz);
  const hs=new THREE.Mesh(new THREE.BoxGeometry(.5,.035,.05),stripe); hs.position.set(0,.15,0); head.add(hs);
  const armPiv=[];
  for(const s of [-1,1]){ const piv=new THREE.Group(); piv.position.set(0,.58,s*.22); torso.add(piv); armPiv.push(piv);
    const e=new THREE.Vector3(.3,-.24,s*.05), hnd=new THREE.Vector3(.62,-.28,s*.06);
    limb(new THREE.Vector3(0,0,0),e,.065,jacket,piv); limb(e,hnd,.055,jacket,piv); const gv=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),glove); gv.position.copy(hnd); piv.add(gv); }
  sc.armL=armPiv[0]; sc.armR=armPiv[1];
}
scooter.visible=false;
scooter.traverse(o=>{ if(o.isMesh) o.castShadow=true; });

/* ───────────────────────── mega parcel ───────────────────────── */
const MW=15, MH=8, MD=10.5;
const mega = new THREE.Group(); scene.add(mega);
const meg = { flaps:[], glow:null };
{
  const body=new THREE.Mesh(boxGeo,megaMat); body.scale.set(MW,MH,MD); body.castShadow=body.receiveShadow=true; mega.add(body);
  meg.noz=new THREE.Group(); { const nm=new THREE.MeshStandardMaterial({color:0x2a2d33,metalness:.85,roughness:.35});
    for(const sx of [-1,1]) for(const sz of [-1,1]){ const n=new THREE.Mesh(new THREE.CylinderGeometry(.7,1.05,.9,18),nm); n.position.set(sx*MW*.32,-MH/2-.35,sz*MD*.28); n.castShadow=true; meg.noz.add(n); } mega.add(meg.noz); }
  const kt=new THREE.MeshStandardMaterial({map:kraftTex(false),roughness:.85,transparent:true,envMapIntensity:.4}), tapeM=new THREE.MeshStandardMaterial({color:0xdcb070,roughness:.35,metalness:.05,transparent:true});
  meg.mats=[megaMat,kt,tapeM];
  const mkFlap=(w,d,px,pz,axis,sign,y)=>{ const piv=new THREE.Group(); piv.position.set(px,MH/2+y,pz); const m=new THREE.Mesh(new THREE.BoxGeometry(w,.12,d),kt); m.castShadow=true; m.receiveShadow=true;
    if(axis==='x'){ m.position.set(0,.06,-sign*d/2); const tp=new THREE.Mesh(new THREE.BoxGeometry(w,.04,.9),tapeM); tp.position.set(0,.14,-sign*(d/2-.45)); m.add(tp); } else m.position.set(-sign*w/2,.06,0);
    piv.add(m); mega.add(piv); meg.flaps.push({piv,axis,sign}); return piv; };
  mkFlap(MW,MD/2,0,MD/2,'x',1,.01); mkFlap(MW,MD/2,0,-MD/2,'x',-1,.01); mkFlap(MW/2,MD-.1,MW/2,0,'z',1,-.0); mkFlap(MW/2,MD-.1,-MW/2,0,'z',-1,-.0);
  meg.glow=new THREE.Mesh(new THREE.PlaneGeometry(MW*.94,MD*.92),new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(3.2,1.9,.8),transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));
  meg.glow.rotation.x=-Math.PI/2; meg.glow.position.y=MH/2+.04; mega.add(meg.glow);
  mega.visible=false;
}
const megaShadow=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:radial,transparent:true,opacity:0,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-3}));
megaShadow.rotation.x=-Math.PI/2; megaShadow.position.set(0,ROOF_Y+.04,0); megaShadow.visible=false; scene.add(megaShadow);
const ring=new THREE.Mesh(new THREE.RingGeometry(.88,1,72),new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(2.2,1.5,.8),transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
ring.rotation.x=-Math.PI/2; ring.position.y=.3; ring.visible=false; scene.add(ring);
const ringS={ s:1, o:0 };

/* ───────────────────────── fov / layout / resize ───────────────────────── */
let W=innerWidth,H=innerHeight;
function updateFov(){
  const a=camera.aspect; const fov=a>=1.6?42:Math.min(72,2*Math.atan(Math.tan(21*Math.PI/180)*1.6/a)*180/Math.PI);
  camera.fov=fov; camera.updateProjectionMatrix();
  const scl=renderer.domElement.height/(2*Math.tan(fov*Math.PI/360)); sparks.mat.uniforms.uScale.value=scl; dust.mat.uniforms.uScale.value=scl; gSparks.mat.uniforms.uScale.value=scl; gDust.mat.uniforms.uScale.value=scl;
}
function onResize(){ W=innerWidth; H=innerHeight; renderer.setSize(W,H); composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(W,H); camera.aspect=W/H; updateFov(); document.body.classList.toggle('compact',W<820||H>W*1.1); }
let rzT=0, rzPend=false; addEventListener('resize',()=>{ clearTimeout(rzT); rzT=setTimeout(()=>{ if(typing()){ rzPend=true; return; } onResize(); },IS_TOUCH?220:60); }); onResize();
let qPR=renderer.getPixelRatio(), qAcc=0, qN=0, qWarm=0;
function adaptQuality(rdt){ if(++qWarm<90) return; qAcc+=rdt; if(++qN>=90){ const avg=qAcc/qN; qAcc=0; qN=0; if(avg>1/42&&qPR>1){ qPR=Math.max(1,qPR-.25); renderer.setPixelRatio(qPR); composer.setPixelRatio(qPR); composer.setSize(W,H); updateFov(); } } }

/* ───────────────────────── cards (anchored hotspots) ───────────────────────── */
const svg=$('#links'); const NS='http://www.w3.org/2000/svg';
const cards=[...document.querySelectorAll('.fcard')].map((el,i)=>{
  const ln=document.createElementNS(NS,'line'); ln.setAttribute('stroke','rgba(255,255,255,.65)'); ln.setAttribute('stroke-width','1.5'); ln.setAttribute('stroke-dasharray','4 5'); svg.appendChild(ln);
  const dot=document.createElementNS(NS,'circle'); dot.setAttribute('r','5'); dot.setAttribute('fill','#fff'); dot.setAttribute('filter','drop-shadow(0 0 6px #ffb070)'); svg.appendChild(dot);
  const ring2=document.createElementNS(NS,'circle'); ring2.setAttribute('r','10'); ring2.setAttribute('fill','none'); ring2.setAttribute('stroke','rgba(255,170,100,.8)'); ring2.setAttribute('stroke-width','2'); svg.appendChild(ring2);
  const inner=el.querySelector('.fc-inner');
  el.addEventListener('pointermove',e=>{ const r=inner.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5; inner.style.transform=`perspective(600px) rotateX(${-py*14}deg) rotateY(${px*18}deg)`; },{passive:true});
  el.addEventListener('pointerleave',()=>{ inner.style.transform=''; },{passive:true});
  return { el, ln, dot, ring:ring2, pop:0, alpha:0, anchor:new THREE.Vector3([-3.2,3.2,-1.4,1.4][i],5.7,1.2) };
});
const _v=new THREE.Vector3();
function updateCards(t){
  const compact=document.body.classList.contains('compact');
  const rest=compact?[[.26,.2],[.74,.2],[.26,.32],[.74,.32]]:[[.37,.15],[.63,.15],[.37,.285],[.63,.285]];
  cards.forEach((c,i)=>{
    if(c.alpha<=0.002){ c.el.style.visibility='hidden'; c.el.style.opacity=0; c.ln.style.opacity=0; c.dot.style.opacity=0; c.ring.style.opacity=0; return; }
    _v.copy(c.anchor).project(camera); const ax=(_v.x*.5+.5)*W, ay=(-_v.y*.5+.5)*H;
    const rx=rest[i][0]*W, ry=rest[i][1]*H + Math.sin(t*1.6+i*1.7)*5*c.pop;
    const x=ax+(rx-ax)*c.pop, y=ay+(ry-ay)*c.pop;
    c.el.style.visibility='visible'; c.el.style.opacity=c.alpha; c.el.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${Math.max(.001,c.pop)}) rotate(${(1-c.pop)*(i-1)*-24}deg)`;
    const vis=Math.min(1,c.alpha)*(compact?0:1);
    c.ln.setAttribute('x1',ax); c.ln.setAttribute('y1',ay); c.ln.setAttribute('x2',x); c.ln.setAttribute('y2',y+(compact?0:30)); c.ln.style.opacity=vis*.8*Math.min(1,c.pop);
    c.dot.setAttribute('cx',ax); c.dot.setAttribute('cy',ay); c.dot.style.opacity=Math.min(1,c.alpha);
    c.ring.setAttribute('cx',ax); c.ring.setAttribute('cy',ay); c.ring.setAttribute('r',8+((t*14+i*5)%16)); c.ring.style.opacity=Math.min(1,c.alpha)*(1-((t*14+i*5)%16)/16);
  });
}

/* ───────────────────────── main update loop ───────────────────────── */
const look=new THREE.Vector3(), tmpV=new THREE.Vector3(); let prevScX=0;
const tilt={tx:0,ty:0,cx:0,cy:0};
function pathX(s){ const x0=-78,v0=15,ve=5,D=6.2; if(s<=D) return x0+v0*s-(v0-ve)*s*s/(2*D); let x=x0+v0*D-(v0-ve)*D/2; const ds=s-D; x+=ve*ds; if(ds>5) x+=3.2*(ds-5)*(ds-5); return x; }
function updatePlane(dt,t){
  const s=S.planeS; plane.visible=s>0&&s<15.6;
  const k=smooth(s,1.5,6.2); const ds=Math.max(0,s-11.2);
  plane.position.set(pathX(s), 31-9.5*k+ds*ds*.5, -14+5.5*k);
  plane.rotation.set(Math.sin(s*.7)*.06+ -ds*.02, 0, -.05*Math.sin(k*Math.PI)+ds*.06);
  for(const f of shared.fans) f.rotation.x+=dt*22;
  bayDoor.rotation.z=S.bay*1.05; bayMat.color.setRGB(.05+S.bay*1.5,.03+S.bay*.8,.02+S.bay*.35);
  bayPoint.getWorldPosition(_bay); bayLight.position.copy(_bay).add(new THREE.Vector3(0,-1.2,0)); bayLight.intensity=S.bay*(60+Math.sin(t*20)*6);
  for(let i=0;i<2;i++) shared.strobes[i].visible=((t*1.1+i*.5)%1.2)<.1;
  shared.beacon.visible=(t%1.4)<.5;
}
function updateScooter(dt,t){
  if(!scooter.visible) return;
  const dx=scooter.position.x-prevScX; prevScX=scooter.position.x; const rot=dx/.444;
  for(const w of sc.wheels) w.rotation.z-=rot;
  const speed=Math.abs(dx)/Math.max(dt,.001);
  sc.body.rotation.z=S.sPitch||0; sc.torso.rotation.x=S.sLean||0; sc.armL.rotation.x=(S.sReach||0); sc.armR.rotation.x=(S.sReach||0)*.5; sc.head.rotation.z=(S.sLean?(-S.sLean*.35):0);
  if(speed>7 && Math.random()<.7){ const wx=scooter.position.x-.75, wy=.15; dust.emit(wx,wy,scooter.position.z+rand(-.2,.2),-speed*.06+rand(-.5,.5),rand(.2,.9),rand(-.6,.6),.6,.55,.5,rand(.4,.8),rand(.6,1.1),-.02,1.2,1.4,.35); }
  if(S.scooterLaunch && !S.quakeDone){ tmpV.set(scooter.position.x-1.6,1,scooter.position.z).project(camera); if(tmpV.x>1.03) triggerQuake(); }
}
function updateMega(dt,t){
  const burn=S.burn||0;
  if(S.megaOpen>0||mega.visible||burn>0){ meg.glow.material.opacity=S.megaOpen*(.8+Math.sin(t*14)*.12); megaLight.intensity=S.megaOpen*320+burn*(240+Math.random()*60); if(burn>.01) megaLight.position.set(0,mega.position.y-MH/2-4,0); else megaLight.position.set(0,mega.position.y+MH/2+3,0); }
  if(burn>.01&&mega.visible){
    const by=mega.position.y-MH/2-.3, near=clamp(1-(by-ROOF_Y)/18,0,1);
    const n=Math.floor(burn*dt*720+Math.random());
    for(let k=0;k<n;k++){ const cx=(Math.random()<.5?-1:1)*MW*.32, cz=(Math.random()<.5?-1:1)*MD*.28;
      sparks.emit(mega.position.x+cx+rand(-.3,.3),by,mega.position.z+cz+rand(-.3,.3),rand(-1.4,1.4),-rand(12,26),rand(-1.4,1.4),3.4,1.5+Math.random()*1.3,.4,rand(.35,.85),rand(.22,.5),0,.4,0,.95); }
    const m=Math.floor(burn*dt*280*near+Math.random());
    for(let k=0;k<m;k++){ const a=rand(0,6.283), sp=rand(5,14); dust.emit(rand(-5,5),ROOF_Y+.5,rand(-3,3),Math.cos(a)*sp,rand(.2,1.6),Math.sin(a)*sp,.7,.64,.58,rand(1.4,3),rand(1,2),-.03,1.4,1.5,.4); }
  }
  if(ring.visible){ ring.scale.set(ringS.s,ringS.s,1); ring.material.opacity=ringS.o; }
}
function updateRockets(dt){
  for(let i=rockets.length-1;i>=0;i--){ const r=rockets[i]; r.v.y-=7.5*dt; r.p.addScaledVector(r.v,dt);
    sparks.emit(r.p.x,r.p.y,r.p.z,rand(-.4,.4),rand(-1.4,-.4),rand(-.4,.4),3,1.8,.8,.13,.55,.2,1.5,0,.9);
    r.fuse-=dt; if(r.fuse<=0){ burstRocket(r); rockets.splice(i,1); } }
}
function updateRain(dt){
  const R=S.rain; if(!R||!R.on) return;
  R.acc+=dt*R.rate;
  while(R.acc>=1 && R.count<R.total){ R.acc-=1; spawnParcel(R.count===3); R.count++; }
  if(R.count>=R.total) R.on=false;
}
function updateCamera(t){
  look.set(cam.lx,cam.ly,cam.lz);
  if(cam.trackW>.001) look.lerp(plane.position,cam.trackW);
  camera.position.set(cam.px,cam.py,cam.pz);
  if(camera.aspect<1.1){ const k=clamp((1.1-camera.aspect)/.6,0,1)*.38; camera.position.z+=(camera.position.z-look.z)*k; }
  if(cam.sway>0){ camera.position.x+=Math.sin(t*.35)*1.6*cam.sway; camera.position.y+=Math.sin(t*.5)*.35*cam.sway; }
  if(shk()>.001){ const a=shk(); camera.position.x+=(Math.random()-.5)*.55*a; camera.position.y+=(Math.random()-.5)*.55*a; camera.position.z+=(Math.random()-.5)*.35*a; }
  camera.lookAt(look);
  if(shk()>.001) camera.rotateZ((Math.random()-.5)*.055*shk());
  sky.position.copy(camera.position);
}
let last=0;
document.addEventListener('visibilitychange',()=>{ last=0; });
gsap.ticker.add((time)=>{
  const rdt=Math.min(.05,time-last||.016); last=time;
  // ── page scroll -> story clock (scroll down plays, scroll up rewinds) ──
  if(!typing()&&!S.dash){ const y=clamp(window.scrollY/maxScroll,0,1); if(Math.abs(y-pRaw)>1e-6){ pRaw=y; lastScrollT=performance.now(); } }
  { const k=1-Math.exp(-9*rdt); pM+=(pRaw-pM)*k; pS+=(pM-pS)*k; if(Math.abs(pRaw-pS)<2e-6){ pS=pRaw; pM=pRaw; } }
  if(auto && ff===null && pRaw<.999) window.scrollTo(0,window.scrollY+maxScroll/TOTAL*rdt);
  const tgt=pS*TOTAL;
  if(viewMode==='live'){ if(tgt<storyT-.03&&hist.length>2&&!typing()&&!S.dash) beginPlayback(); }
  else if(tgt>=liveT-.004) endPlayback();
  if(viewMode==='play'){                       // scrolling UP: scrub the recorded story backwards (and forwards again)
    storyT=clamp(tgt,0,liveT); tsCur=0; tsPrev=0; tsNow=0; gsap.globalTimeline.timeScale(.00001);
    applyView(storyT); camera.updateMatrixWorld(true); sky.position.copy(camera.position);
    skyMat.uniforms.uTime.value=time; updateChapters(); updateCards(time);
    composer.render(); adaptQuality(rdt); return;
  }
  const tsUsed=tsPrev; let want=0;             // scrolling DOWN: live simulation, speed follows the scroll
  { const err=tgt-storyT;
    if(storyDone) want=1;
    else if(err>.004) want=Math.min(4,err/.14);
    if(pRaw>.995&&!storyDone) want=Math.max(want,1.5); }
  tsCur+=(want-tsCur)*(1-Math.exp(-(want>tsCur?14:18)*rdt)); if(want===0&&tsCur<.003) tsCur=0;
  tsNow=tsCur; gsap.globalTimeline.timeScale(Math.max(tsCur,.00001)); tsPrev=tsCur;
  const dt=rdt*tsUsed; simT+=dt; const t=simT;
  storyT=storyDone?Math.min(TOTAL,storyT+dt):storyT+dt; liveT=storyT;
  updateChapters();
  skyMat.uniforms.uTime.value=time;
  const steps=frozen()?0:Math.max(1,Math.ceil(dt/.034)), sdt=steps?dt/steps:0;
  for(let si=0;si<steps;si++){ const st=t-dt+sdt*(si+1);
  updatePlane(sdt,st); updateRain(sdt); updateParcels(sdt,st); updateScooter(sdt,st); updateMega(sdt,st);
  sparks.update(sdt); dust.update(sdt); updateRockets(sdt);
  for(const l of booms) l.intensity*=Math.exp(-6.5*sdt);
  if(shared.fan) shared.fan.rotation.y+=sdt*9;
  // quake effects on world
  const q=S.quake;
  shop.position.set((Math.random()-.5)*.09*q,0,(Math.random()-.5)*.09*q);
  for(const l of shared.lamps) l.rotation.z=Math.sin(st*20)*.03*q;
  interiorLight.intensity=34*(q>.02?(.4+Math.random()*.9):1);
  if(q>.15 && Math.random()<q*.5) dust.emit(rand(-6,6),ROOF_Y+.3,rand(-3.5,3.5),rand(-.4,.4),rand(.3,1.2),rand(-.4,.4),.6,.55,.5,rand(.6,1.2),rand(1,1.8),-.02,1,1.2,.3);
  // fireworks ambient
  if(S.ambientFW && Math.random()<sdt*1.6) launchRocket(rand(-8,8),MH+3,rand(-3,3),rand(14,19));
  }
  updateCamera(t); if(ff===null) updateCards(t);
  // app shake (whole browser window)
  if(shk()>.01){ const a=shk(), dx=(Math.random()-.5)*26*a, dy=(Math.random()-.5)*26*a, rt=(Math.random()-.5)*1.4*a, k2=1+.03*Math.min(a,1.5);
    appTf[0]=dx; appTf[1]=dy; appTf[2]=rt; appTf[3]=k2; app.style.transform=`translate(${dx}px,${dy}px) rotate(${rt}deg) scale(${k2})`; S.wasShake=true; }
  else { appTf[0]=appTf[1]=appTf[2]=0; appTf[3]=1; if(S.wasShake){ app.style.transform=''; S.wasShake=false; } }
  // login tilt
  if(S.loginOn&&(typing()||IS_TOUCH)){ if(lc.style.transform){ lc.style.transform=''; tilt.last=''; } } else if(S.loginOn){ if(!tilt.hover){ tilt.tx=0; tilt.ty=0; } tilt.cx+=(tilt.tx-tilt.cx)*.1; tilt.cy+=(tilt.ty-tilt.cy)*.1; { const tf=`rotateX(${tilt.cx.toFixed(2)}deg) rotateY(${tilt.cy.toFixed(2)}deg)`; if(tf!==tilt.last){ tilt.last=tf; lc.style.transform=tf; } } }
  if(!frozen()){ composer.render(); adaptQuality(rdt); if(viewMode==='live'&&(hist.length===0||storyT-lastRecT>=.033)) recordFrame(); }
});

/* ───────────────────────── scroll / swipe input ───────────────────────── */
const veil=$('#veil');
const chapEls=[...document.querySelectorAll('.chap')].map(e=>({e,a:+e.dataset.a,b:+e.dataset.b}));
const railBtns=[...document.querySelectorAll('#rail button')]; let railOn=-2;
function updateChapters(){
  for(const c of chapEls){ const o=(storyT>=revealT)?0:smooth(storyT,c.a,c.a+.7)*(1-smooth(storyT,c.b-.7,c.b)); c.e.style.opacity=o.toFixed(3); c.e.style.transform=`translateY(${((1-o)*16).toFixed(1)}px)`; }
  let k=-1; railBtns.forEach((b,i)=>{ if(storyT>=+b.dataset.t-.01) k=i; });
  if(k!==railOn){ railOn=k; railBtns.forEach((b,i)=>{ b.classList.toggle('on',i===k); b.classList.toggle('done',i<k); }); }
}
let cmW=0, cmH=0; let sH=innerHeight, sW=innerWidth, kbHold=0;
const kbUp=()=>{ if(innerWidth!==sW){ sW=innerWidth; sH=innerHeight; } else if(innerHeight>sH) sH=innerHeight; return sH-innerHeight>120; };
const frozen=()=>S.dashHide||(S.loginOn&&typing());
const typing=()=>{ const a=document.activeElement; return (!!a&&a.tagName==='INPUT')||performance.now()<kbHold||kbUp(); };
addEventListener('focusin',ev=>{ if(ev.target&&ev.target.tagName==='INPUT'){ $('#loginWrap').classList.add('kb'); setTimeout(()=>{ try{ const w=$('#loginWrap'),r=ev.target.getBoundingClientRect(),q=w.getBoundingClientRect(); w.scrollTop+=(r.top+r.height/2)-(q.top+q.height/2); }catch(x){} },350); } });
addEventListener('focusout',()=>{ kbHold=performance.now()+900; setTimeout(()=>{ const a=document.activeElement; if(a&&a.tagName==='INPUT') return; if(kbUp()) return;
  $('#loginWrap').classList.remove('kb'); try{ if(!S.dash) scrollTo(0,Math.round(pRaw*maxScroll)); }catch(x){} if(rzPend){ rzPend=false; onResize(); } fitLogin(); },1000); });
const calcMax=(force)=>{ if(typing()&&!force) return; const w=innerWidth,h=innerHeight; if(force||w!==cmW||Math.abs(h-cmH)>=160){ cmW=w; cmH=h; maxScroll=Math.max(1,document.documentElement.scrollHeight-h); } };
addEventListener('resize',()=>calcMax(),{passive:true}); calcMax(true);
const stopAuto=()=>{ auto=false; };
addEventListener('wheel',stopAuto,{passive:true}); addEventListener('touchstart',stopAuto,{passive:true});
railBtns.forEach(b=>b.addEventListener('click',()=>{ stopAuto(); window.scrollTo({top:+b.dataset.t/TOTAL*maxScroll+2,behavior:'smooth'}); }));

/* ───────────────────────── history recorder: true reverse playback ─────────────────────────
   While the story plays forward every ~33 ms of story time is recorded (poses of every moving object,
   lights, card states and the live particles). Scrolling up scrubs those frames backwards; scrolling down
   again replays them forwards until the "live edge", where the real simulation takes over again. */
const hist=[]; let lastRecT=-1, viewMode='live', liveT=0, heroSlot=false, revealT=Infinity;
const appTf=[0,0,0,1];
const TRK=[camera,plane,bayDoor,scooter,sc.body,sc.torso,sc.armL,sc.armR,sc.head,sc.wheels[0],sc.wheels[1],mega,...meg.flaps.map(f=>f.piv),meg.noz,megaShadow,ring,shop,roofG,bayLight,megaLight,booms[0],booms[1]];
const TN=TRK.length, SCN=25, FL=TN*11+SCN, MAXP=96, O_SC=TN*11;
const bF=new Float32Array(FL), bP=new Float32Array(MAXP*11); let gN0=0, gN1=0;
const _rp=new THREE.Vector3(), _rq=new THREE.Quaternion(), _rs=new THREE.Vector3();
function wrObj(a,o,ob){ const p=ob.position,q=ob.quaternion,s=ob.scale; a[o]=p.x;a[o+1]=p.y;a[o+2]=p.z;a[o+3]=q.x;a[o+4]=q.y;a[o+5]=q.z;a[o+6]=q.w;a[o+7]=s.x;a[o+8]=s.y;a[o+9]=s.z;a[o+10]=ob.visible?1:0; }
function rdObj(a,o,ob){ ob.position.set(a[o],a[o+1],a[o+2]); ob.quaternion.set(a[o+3],a[o+4],a[o+5],a[o+6]); ob.scale.set(a[o+7],a[o+8],a[o+9]); ob.visible=a[o+10]>.5; }
function blendX(fa,fb,u,out,o){ const v=1-u;
  out[o]=fa[o]*v+fb[o]*u; out[o+1]=fa[o+1]*v+fb[o+1]*u; out[o+2]=fa[o+2]*v+fb[o+2]*u;
  const d=fa[o+3]*fb[o+3]+fa[o+4]*fb[o+4]+fa[o+5]*fb[o+5]+fa[o+6]*fb[o+6], sg=d<0?-1:1;
  const x=fa[o+3]*v+sg*fb[o+3]*u, y=fa[o+4]*v+sg*fb[o+4]*u, z=fa[o+5]*v+sg*fb[o+5]*u, w=fa[o+6]*v+sg*fb[o+6]*u, l=Math.hypot(x,y,z,w)||1;
  out[o+3]=x/l; out[o+4]=y/l; out[o+5]=z/l; out[o+6]=w/l;
  out[o+7]=fa[o+7]*v+fb[o+7]*u; out[o+8]=fa[o+8]*v+fb[o+8]*u; out[o+9]=fa[o+9]*v+fb[o+9]*u; out[o+10]=u<.5?fa[o+10]:fb[o+10]; }
function scRead(a,o){ let i=o; a[i++]=shared.glass[0].opacity; a[i++]=meg.mats[0].opacity; a[i++]=meg.mats[1].opacity; a[i++]=meg.mats[2].opacity; a[i++]=meg.glow.material.opacity;
  a[i++]=interiorLight.intensity; a[i++]=bayLight.intensity; a[i++]=megaLight.intensity; a[i++]=booms[0].intensity; a[i++]=booms[1].intensity;
  a[i++]=megaShadow.material.opacity; a[i++]=ring.material.opacity; a[i++]=S.bay; for(const c of cards){ a[i++]=c.pop; a[i++]=c.alpha; } for(let k=0;k<4;k++) a[i++]=appTf[k]; }
function scWrite(a,o){ let i=o; shared.glass[0].opacity=a[i++]; meg.mats[0].opacity=a[i++]; meg.mats[1].opacity=a[i++]; meg.mats[2].opacity=a[i++]; meg.glow.material.opacity=a[i++];
  interiorLight.intensity=a[i++]; bayLight.intensity=a[i++]; megaLight.intensity=a[i++]; booms[0].intensity=a[i++]; booms[1].intensity=a[i++];
  megaShadow.material.opacity=a[i++]; ring.material.opacity=a[i++]; const bay=a[i++]; bayMat.color.setRGB(.05+bay*1.5,.03+bay*.8,.02+bay*.35);
  for(const c of cards){ c.pop=a[i++]; c.alpha=a[i++]; } for(let k=0;k<4;k++) appTf[k]=a[i++]; }
function snap(P){ let c=0; const L=P.life; for(let i=0;i<P.max;i++) if(L[i]>0) c++;
  const a=new Float32Array(c*8); let o=0;
  for(let i=0;i<P.max;i++){ if(L[i]<=0) continue; const k=i*3; a[o]=P.pos[k];a[o+1]=P.pos[k+1];a[o+2]=P.pos[k+2];a[o+3]=P.col[k];a[o+4]=P.col[k+1];a[o+5]=P.col[k+2];a[o+6]=P.size[i];a[o+7]=P.alpha[i]; o+=8; }
  return a; }
function fillGhost(G,arr,prev){ const n=Math.min(G.max,arr.length/8|0);
  for(let i=0;i<n;i++){ const o=i*8,k=i*3; G.pos[k]=arr[o];G.pos[k+1]=arr[o+1];G.pos[k+2]=arr[o+2]; G.col[k]=arr[o+3];G.col[k+1]=arr[o+4];G.col[k+2]=arr[o+5]; G.size[i]=arr[o+6]; G.alpha[i]=arr[o+7]; }
  for(let i=n;i<prev;i++){ G.size[i]=0; G.alpha[i]=0; }
  const at=G.geo.attributes; at.position.needsUpdate=at.aColor.needsUpdate=at.aSize.needsUpdate=at.aAlpha.needsUpdate=true; return n; }
function recordFrame(){
  const n=Math.min(parcels.length,MAXP), f=new Float32Array(FL);
  for(let i=0;i<TN;i++) wrObj(f,i*11,TRK[i]);
  scRead(f,O_SC);
  const pf=new Float32Array(n*11);
  for(let i=0;i<n;i++){ const m=parcels[i].mesh; m.matrixWorld.decompose(_rp,_rq,_rs); const o=i*11;
    pf[o]=_rp.x;pf[o+1]=_rp.y;pf[o+2]=_rp.z;pf[o+3]=_rq.x;pf[o+4]=_rq.y;pf[o+5]=_rq.z;pf[o+6]=_rq.w;pf[o+7]=_rs.x;pf[o+8]=_rs.y;pf[o+9]=_rs.z;pf[o+10]=m.visible?1:0; }
  hist.push({t:storyT,f,pf,n,ps:snap(sparks),pd:snap(dust)}); lastRecT=storyT; }
function applyView(t){
  const h=hist; let lo=0,hi=h.length-1;
  while(lo<hi){ const m=(lo+hi+1)>>1; if(h[m].t<=t) lo=m; else hi=m-1; }
  const A=h[lo], B=h[Math.min(lo+1,h.length-1)], u=B.t>A.t?clamp((t-A.t)/(B.t-A.t),0,1):0;
  for(let i=0;i<TN;i++) blendX(A.f,B.f,u,bF,i*11);
  for(let i=0;i<SCN;i++) bF[O_SC+i]=A.f[O_SC+i]*(1-u)+B.f[O_SC+i]*u;
  for(let i=0;i<TN;i++) rdObj(bF,i*11,TRK[i]);
  scWrite(bF,O_SC);
  const nm=Math.max(A.n,B.n);
  for(let i=0;i<parcels.length;i++){ const m=parcels[i].mesh; if(i>=nm){ m.visible=false; continue; }
    if(i<A.n&&i<B.n) blendX(A.pf,B.pf,u,bP,i*11);
    else { const src=i<A.n?A:B; for(let k=0;k<11;k++) bP[i*11+k]=src.pf[i*11+k]; if(src===B&&u<.5) bP[i*11+10]=0; }
    rdObj(bP,i*11,m); }
  const near=u<.5?A:B; gN0=fillGhost(gSparks,near.ps,gN0); gN1=fillGhost(gDust,near.pd,gN1);
  for(const b of blobs){ const t0=b.userData.t0, t1=b.userData.t1; b.visible=t>=t0&&(t1===undefined||t<t1); }
  const shown=t>=revealT-.001;
  document.body.classList.toggle('cinema',t<revealT);
  lw.classList.toggle('on',shown); S.loginOn=shown; lw.style.opacity=shown?String(clamp((t-revealT)/1.0,0,1)):'0';
  const sh=Math.abs(appTf[0])+Math.abs(appTf[1])+Math.abs(appTf[2])>.01;
  app.style.transform=sh?`translate(${appTf[0]}px,${appTf[1]}px) rotate(${appTf[2]}deg) scale(${appTf[3]})`:''; S.wasShake=sh; }
function beginPlayback(){
  if(!hist.length||hist[hist.length-1].t<storyT-.002) recordFrame();
  liveT=storyT; viewMode='play';
  sparks.points.visible=dust.points.visible=false; gSparks.points.visible=gDust.points.visible=true;
  heroSlot=!!(S.hero&&S.hero.mesh.parent===sc.slot); if(heroSlot) scene.attach(S.hero.mesh); }
function endPlayback(){
  applyView(liveT);
  sparks.points.visible=dust.points.visible=true; gSparks.points.visible=gDust.points.visible=false;
  if(heroSlot&&S.hero){ sc.slot.attach(S.hero.mesh); } heroSlot=false;
  storyT=liveT; viewMode='live';
  const shown=liveT>=revealT-.001; lw.classList.toggle('on',shown&&!S.dash); lw.style.opacity=''; S.loginOn=shown;
  document.body.classList.toggle('cinema',liveT<revealT); app.style.transform=''; S.wasShake=false; }

/* ───────────────────────── sequencing ───────────────────────── */
let live=[]; let capTl=null;
const mk=()=>{ const tl=gsap.timeline(); live.push(tl); return tl; };
const later=(s,fn)=>{ const c=gsap.delayedCall(s,fn); live.push(c); return c; };
function caption(txt){ const el=$('#caption span'); if(capTl) capTl.kill(); capTl=gsap.timeline().to(el,{opacity:0,y:6,duration:.2}).call(()=>{el.textContent=txt;}).fromTo(el,{y:8},{opacity:1,y:0,duration:.7,ease:'power2.out'}).to(el,{opacity:0,duration:.7,delay:2.3}); }
function flash(op,dur){ gsap.killTweensOf('#flash'); gsap.fromTo('#flash',{opacity:op},{opacity:0,duration:dur,ease:'power2.out'}); }
const toastEl=$('#toast'); let toastT; function toast(msg){ toastEl.textContent=msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>toastEl.classList.remove('on'),2200); }

function resetAll(){
  live.forEach(t=>t.kill()); live=[]; if(capTl){ capTl.kill(); capTl=null; }
  gsap.killTweensOf([S,cam,shake,ringS,'#flash','#loginScene','#caption span']); gsap.killTweensOf(scooter.position); gsap.killTweensOf(mega.position); gsap.killTweensOf(mega.scale); gsap.killTweensOf(shop.scale); gsap.killTweensOf(roofG.rotation); gsap.killTweensOf(meg.mats);
  cards.forEach(c=>gsap.killTweensOf(c)); meg.flaps.forEach(f=>gsap.killTweensOf(f.piv.rotation));
  clearParcels(); sparks.clear(); dust.clear(); rockets.length=0;
  Object.assign(S,{planeS:0,bay:0,quake:0,crushed:false,quakeDone:false,scooterLaunch:false,rain:null,loginOn:false,ambientFW:false,megaOpen:0,burn:0,dash:false,dashHide:false,sPitch:0,sLean:0,sReach:0});
  shake.amp=0; app.style.transform=''; Object.assign(cam,{px:0,py:1.5,pz:19,lx:-12,ly:16,lz:-30,trackW:0,sway:0});
  shop.scale.set(1,1,1); shop.rotation.set(0,0,0); roofG.rotation.set(0,0,0);
  shared.glass.forEach(m=>{ m.opacity=.2; m.color.set(0x9fc4d8); });
  scooter.visible=false; scooter.position.set(-40,0,7.1); scooter.rotation.set(0,0,0);
  if(S.hero){ S.hero=null; }
  mega.visible=false; mega.position.set(0,42,0); mega.scale.set(1,1,1); mega.rotation.set(0,0,0);
  meg.flaps.forEach(f=>{ f.piv.rotation.set(0,0,0); }); meg.mats.forEach(m=>m.opacity=1); meg.glow.material.opacity=0;
  megaShadow.visible=false; megaShadow.material.opacity=0; ring.visible=false; ringS.o=0; ringS.s=1; megaLight.intensity=0; bayLight.intensity=0;
  cards.forEach(c=>{ c.pop=0; c.alpha=0; });
  document.documentElement.classList.remove('dash-on'); { const d=document.getElementById('dash'); if(d) d.classList.remove('on'); } meg.noz.visible=true;
  const lw=$('#loginWrap'); lw.style.opacity=''; lw.style.transition=''; lw.classList.remove('on'); gsap.set('#loginScene',{opacity:0,clearProps:'transform'}); $('#loginCard').style.transform='';
  $('#loginForm').reset(); document.querySelectorAll('.field').forEach(f=>f.classList.remove('bad')); if(typeof setMode==='function'&&mode!=='login') setMode('login');
  $('#loginBtn').classList.remove('loading');
  gsap.set('#flash',{opacity:0}); gsap.set('#caption span',{opacity:0});
  document.body.classList.remove('cinema');
  storyDone=false; storyT=0; tsCur=0; tsPrev=0;
  hist.length=0; lastRecT=-1; viewMode='live'; liveT=0; revealT=Infinity; heroSlot=false; sparks.points.visible=dust.points.visible=true; gSparks.points.visible=gDust.points.visible=false;
  if(typeof chapEls!=='undefined') chapEls.forEach((c,i)=>{ if(i>=4){ c.a=1e9; c.b=1e9+1; } });
  scooter.userData.carried=false; sc.body.rotation.z=0;
  scene.attach(sc.slot); sc.body.add(sc.slot); sc.slot.position.set(-.86,1.2,0); sc.slot.rotation.set(0,0,0);
  prevScX=scooter.position.x;
}

function play(){
  resetAll();
  document.body.classList.add('cinema');
  const T=mk();
  caption('Dusk · incoming cargo');
  // plane flight timeline
  T.to(S,{planeS:16,duration:16,ease:'none'},.3);
  // camera: look up → track plane → tilt down to shop
  T.to(cam,{ly:19,lx:-6,duration:3.2,ease:'sine.inOut'},.2);
  T.to(cam,{trackW:1,duration:1.6,ease:'power2.inOut'},2.6);
  T.to(cam,{trackW:0,lx:0,ly:3.6,lz:0,px:0,py:3.0,pz:20.5,duration:2.6,ease:'power2.inOut'},6.0);
  T.to(S,{bay:1,duration:.9,ease:'power2.inOut'},5.9);
  T.call(()=>caption('Cargo bay open · drop initiated'),null,6.1);
  T.call(()=>{ S.rain={on:true,acc:0,count:0,total:68,rate:20}; },null,6.9);
  T.to(S,{bay:0,duration:1.2,ease:'power2.inOut'},11.2);
  // cards
  T.call(showCards,null,9.7);
  T.call(hideCards,null,14.0);
  T.call(()=>caption('Scan · call · route · navigate'),null,9.9);
  // scooter
  T.call(startScooter,null,13.2);
  T.to(cam,{pz:17.8,py:2.8,duration:5.5,ease:'sine.inOut'},13.3);
}
function showCards(){
  cards.forEach((c,i)=>{ gsap.to(c,{alpha:1,duration:.25,delay:i*.38}); gsap.fromTo(c,{pop:0},{pop:1,duration:1.1,delay:i*.38,ease:'elastic.out(1,.55)'});
    later(i*.38,()=>{ explode(c.anchor.x,c.anchor.y+.3,c.anchor.z,1.7); flashLight(c.anchor.x,c.anchor.y+1,c.anchor.z+2,90,0xffa050); }); });
}
function hideCards(){ cards.forEach((c,i)=>{ gsap.to(c,{pop:0,duration:.6,delay:i*.1,ease:'back.in(1.7)'}); gsap.to(c,{alpha:0,duration:.25,delay:.4+i*.1}); }); }

const handPos=new THREE.Vector3();
function startScooter(){
  caption('Dispatch rider · en route');
  const hero=S.hero; scooter.visible=true; scooter.position.set(-38,0,7.1); prevScX=-38;
  const stopX=(hero?hero.rx:1.3)+.35;
  const SC=mk();
  SC.to(scooter.position,{x:stopX,duration:3.0,ease:'power3.out'},0);
  SC.to(S,{sPitch:-.07,duration:.5,ease:'power2.out'},2.4); SC.to(S,{sPitch:0,duration:.6},2.9);
  // pick up
  SC.to(S,{sLean:-.95,sReach:-.7,duration:.55,ease:'power2.inOut'},3.2);
  SC.call(()=>{ if(!hero||hero.state==='gone') return; hero.state='carried'; sc.torso.updateWorldMatrix(true,true); sc.armL.getWorldPosition(handPos);
    gsap.to(hero.mesh.position,{x:handPos.x,y:handPos.y-.6,z:handPos.z-.2,duration:.35,ease:'power2.out'});
    gsap.to(hero.mesh.rotation,{y:0,x:0,z:0,duration:.35}); },null,3.75);
  SC.call(()=>{ if(!hero||hero.state!=='carried') return; sc.slot.updateWorldMatrix(true,false); const wp=new THREE.Vector3(); sc.slot.getWorldPosition(wp);
    gsap.to(hero.mesh.position,{x:wp.x,y:wp.y+.5,z:wp.z,duration:.45,ease:'back.out(1.4)',onComplete:()=>{ sc.slot.attach(hero.mesh); gsap.to(hero.mesh.position,{x:0,y:.4,z:0,duration:.2}); gsap.to(hero.mesh.scale,{x:.55,y:.42,z:.5,duration:.2}); gsap.to(hero.mesh.quaternion,{x:0,y:0,z:0,w:1,duration:.2}); } }); },null,4.1);
  SC.to(S,{sLean:0,sReach:0,duration:.5,ease:'power2.inOut'},4.5);
  // launch
  SC.call(()=>{ S.scooterLaunch=true; caption('Rider dispatched'); },null,5.0);
  SC.to(scooter.position,{x:60,duration:2.4,ease:'power2.in',onComplete:()=>{ if(!S.quakeDone) triggerQuake(); }},5.0);
  SC.to(S,{sPitch:.3,duration:.45,ease:'power2.out'},5.0); SC.to(S,{sPitch:.02,duration:.9,ease:'power2.inOut'},5.5);
  SC.to(S,{sLean:.35,duration:.4},5.0); SC.to(S,{sLean:0,duration:.8},5.6);
}

function triggerQuake(){
  if(S.quakeDone) return; S.quakeDone=true;
  chapEls[4].a=storyT+.25; chapEls[4].b=storyT+3.6;
  const Q=mk();
  caption('⚠  Tremor detected');
  flash(.35,.6); if(navigator.vibrate) try{ navigator.vibrate([90,40,90,40,160,60,220]); }catch(e){}
  S.quake=1; Q.to(S,{quake:0,duration:3.0,ease:'power2.out'},0);
  shake.amp=1.5; Q.to(shake,{amp:.6,duration:2.4,ease:'power2.out'},.05);
  // camera pull-back + look up
  Q.to(cam,{px:0,py:8,pz:31,lx:0,ly:15,lz:0,duration:1.9,ease:'power2.inOut'},.2);
  Q.call(()=>caption('Something is coming…'),null,1.0);
  // mega drop
  Q.call(()=>{ mega.visible=true; mega.position.set(0,44,0); mega.rotation.set(-.05,0,.1); megaShadow.visible=true; },null,1.2);
  Q.to(megaShadow.material,{opacity:.85,duration:2.8,ease:'power1.in'},1.2);
  Q.fromTo(megaShadow.scale,{x:3,y:3},{x:MW*1.5,y:MD*1.7,duration:2.8,ease:'power1.in'},1.2);
  const impactY=ROOF_Y+MH/2;
  Q.to(mega.position,{y:impactY+22,duration:.85,ease:'power2.in'},1.2);                         // free fall
  Q.call(()=>caption('Landing burn · ignition'),null,2.0);
  Q.to(S,{burn:1,duration:.2,ease:'power1.out'},2.0);                                          // engines light
  Q.to(mega.position,{y:impactY,duration:2.0,ease:'power3.out',onComplete:impact},2.05);       // hard braking, soft touchdown
  Q.to(mega.rotation,{x:0,z:0,duration:2.0,ease:'power2.out'},2.05);
  Q.to(S,{burn:0,duration:.35,ease:'power1.in'},3.7);
}
function impact(){
  const I=mk(); S.crushed=true; megaShadow.visible=false; meg.noz.visible=false; S.burn=0;
  chapEls[4].b=Math.min(chapEls[4].b,storyT-.05); chapEls[5].a=storyT+.9; chapEls[5].b=storyT+3.5;
  const crushY=ROOF_Y*.62+MH/2;
  caption('TOUCHDOWN');
  flash(.8,.9); flashLight(0,ROOF_Y+3,9,900,0xffb070);
  shake.amp=1.8; I.to(shake,{amp:0,duration:1.8,ease:'power3.out'},0);
  S.quake=1; I.to(S,{quake:0,duration:1.6},.1);
  I.to(shop.scale,{y:.62,duration:.35,ease:'power3.out'},0);
  I.to(roofG.rotation,{z:.05,x:-.04,duration:.4,ease:'power2.out'},0);
  I.to(mega.position,{y:crushY,duration:.35,ease:'power3.out'},0);
  I.to(shared.glass[0],{opacity:.6,duration:.1},0); I.to(shared.glass[0],{opacity:.08,duration:.8},.3);
  if(navigator.vibrate) try{ navigator.vibrate([260,40,140]); }catch(e){}
  // particle blast
  for(let i=0;i<420;i++){ const a=rand(0,6.283), e=rand(-.1,1), sp=rand(5,22), c=Math.sqrt(1-e*e), hot=Math.random(); sparks.emit(rand(-6,6),ROOF_Y,rand(-3.5,3.5),Math.cos(a)*c*sp,e*sp+3,Math.sin(a)*c*sp,3.2,1.2+hot*1.4,.35+hot*.4,rand(.1,.26),rand(.7,1.7),1,.6); }
  for(let i=0;i<260;i++){ const a=rand(0,6.283), sp=rand(2,12); dust.emit(rand(-7,7),rand(.3,ROOF_Y),rand(-4,6),Math.cos(a)*sp,rand(.5,5),Math.sin(a)*sp,.58,.52,.47,rand(1.6,4),rand(1.8,3.4),-.02,1.1,2,.5); }
  for(let i=0;i<60;i++){ const a=rand(0,6.283), sp=rand(4,12); sparks.emit(rand(-4,4),ROOF_Y-.5,5.8,Math.cos(a)*sp*.4,rand(2,9),Math.sin(a)*sp*.5+3,2,2.4,3,rand(.06,.13),rand(.8,1.6),1,.5); } // glass shards
  ring.visible=true; ringS.s=1; ringS.o=1; I.to(ringS,{s:30,duration:1.0,ease:'power2.out'},0); I.to(ringS,{o:0,duration:1.0,ease:'power1.in'},.05);
  kickParcels();
  // burst open
  I.call(()=>{ caption('Delivery complete'); },null,.9);
  meg.flaps.forEach(f=>{ const tgt=f.axis==='x'?{x:f.sign*2.15}:{z:-f.sign*2.15}; I.to(f.piv.rotation,Object.assign({duration:.9,ease:'elastic.out(1,.45)'},tgt),.95); });
  I.to(S,{megaOpen:1,duration:.5},.95);
  I.fromTo(mega.scale,{x:1,y:1,z:1},{x:1.05,y:1.08,z:1.05,duration:.18,yoyo:true,repeat:1,ease:'power2.out'},.95);
  I.call(()=>{ flash(.55,.8); flashLight(0,MH+6,6,500,0xffd090); explode(0,crushY+MH/2+.3,0,3.5);
    for(let i=0;i<14;i++) later(i*.14,()=>launchRocket(rand(-6,6),crushY+MH/2+.2,rand(-3,3),rand(14,20)));
    for(let i=0;i<150;i++){ const a=rand(0,6.283); sparks.emit(rand(-6,6),crushY+MH/2,rand(-4,4),Math.cos(a)*rand(2,7),rand(8,20),Math.sin(a)*rand(2,7),3,2+Math.random(),.8,rand(.08,.2),rand(1.6,2.8),.6,.5); } },null,1.0);
  I.to(cam,{px:0,py:9.5,pz:35,lx:0,ly:12.5,lz:0,duration:2.4,ease:'power2.inOut'},.5);
  // transition into login
  I.to(meg.mats,{opacity:0,duration:1.3,ease:'power1.inOut'},2.6);
  I.to(megaLight,{intensity:0,duration:1.3},2.8);
  I.to(meg.glow.material,{opacity:0,duration:1.3},2.6);
  I.call(()=>{ mega.visible=false; },null,4.0);
  I.call(revealLogin,null,3.7);
}
function revealLogin(){
  document.body.classList.remove('cinema'); storyDone=true; revealT=storyT;
  $('#loginWrap').classList.add('on'); fitLogin(); S.loginOn=true; S.ambientFW=true; cam.sway=1;
  gsap.fromTo('#loginScene',{opacity:0,scale:.55,y:80,rotateX:-20},{opacity:1,scale:1,y:0,rotateX:0,duration:1.5,ease:'expo.out'});
}

/* ───────────────────────── login interactions ───────────────────────── */
const lw=$('#loginWrap'), lc=$('#loginCard');
lw.addEventListener('pointermove',e=>{ if(!S.loginOn) return; const r=lc.getBoundingClientRect(); const px=(e.clientX-(r.left+r.width/2))/(r.width/2), py=(e.clientY-(r.top+r.height/2))/(r.height/2);
  tilt.hover=true; tilt.tx=clamp(-py*5,-6,6); tilt.ty=clamp(px*6,-8,8); lc.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%'); lc.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%'); },{passive:true});
lw.addEventListener('pointerleave',()=>{ tilt.hover=false; },{passive:true});
const ICO={"phone": "<svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5.2 3.5h3.6l1.9 4.7-2.3 1.5a11.2 11.2 0 0 0 5.4 5.4l1.5-2.3 4.7 1.9v3.6a1.9 1.9 0 0 1-2 1.9C10.5 19.6 4.4 13.5 3.3 5.5a1.9 1.9 0 0 1 1.9-2z\"/></svg>", "mail": "<svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2.6\"/><path d=\"M3.8 7.4 12 13.2l8.2-5.8\"/></svg>", "eye": "<svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>", "off": "<svg class=\"ic\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M3.5 3.5l17 17\"/></svg>"};
$('#eye').addEventListener('click',()=>{ const i=$('#password'), show=!i.classList.contains('show'); i.classList.toggle('show',show); $('#eye').innerHTML=show?ICO.off:ICO.eye; });
const idIn=$('#ident'), idF=$('#fId'), idIco=$('#idIco'), seg=$('#seg'), form=$('#loginForm'); let mode='login';
const isEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), isPhone=v=>/^\+?\d{7,15}$/.test(v.replace(/[\s\-()]/g,''));
function setMode(m){ mode=m; seg.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.m===m));
  const reg=m==='register'; form.classList.toggle('regmode',reg);
  $('#loginBtn .lbl').textContent=reg?'Create account':'Log in';
  $('#lcTitle').textContent=reg?'Create your account':'Welcome to Happy Parcel';
  $('#lcSub').textContent=reg?'Register with your phone number or email.':'Sign in to track every drop in real time.';
  $('#password').autocomplete='off';
  document.querySelectorAll('.field').forEach(f=>f.classList.remove('bad')); fitLogin(); }
seg.addEventListener('click',e=>{ const b=e.target.closest('button'); if(b&&b.dataset.m!==mode) setMode(b.dataset.m); });
idIn.addEventListener('input',()=>{ idIco.innerHTML=/[a-z@]/i.test(idIn.value)?ICO.mail:ICO.phone; idF.classList.remove('bad'); });
form.addEventListener('submit',e=>{
  e.preventDefault(); const reg=mode==='register', id=idIn.value.trim(), pw=$('#password').value, nm0=$('#fullName').value.trim();
  const okI=isEmail(id)||isPhone(id), okP=pw.length>=6, okN=!reg||nm0.length>=2, okC=!reg||$('#password2').value===pw;
  $('#fName').classList.toggle('bad',!okN); idF.classList.toggle('bad',!okI); $('#fPass').classList.toggle('bad',!okP); $('#fPass2').classList.toggle('bad',!okC);
  if(!(okN&&okI&&okP&&okC)){ lc.classList.remove('shake'); void lc.offsetWidth; lc.classList.add('shake'); return; }
  const b=$('#loginBtn'); b.classList.add('loading'); b.disabled=true;
  setTimeout(()=>{ b.classList.remove('loading'); b.disabled=false;
    const pretty=isEmail(id)?id.split('@')[0].replace(/[._-]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase()):'••'+id.replace(/\D/g,'').slice(-4);
    showDash(reg?nm0:(pretty||'Driver')); },850);
});
/* ───────────────────────── login fit + driver dashboard ───────────────────────── */
const loginFit=$('#loginFit'), dash=$('#dash');
function fitLogin(){ const h=lc.offsetHeight||560, w=lc.offsetWidth||410; const vh=typing()?Math.max(innerHeight,sH):innerHeight; const k=Math.min(1,(vh-24)/h,(innerWidth-16)/w); loginFit.style.transform=k<1?`scale(${k.toFixed(3)})`:''; }
{ let ft=0; addEventListener('resize',()=>{ clearTimeout(ft); ft=setTimeout(()=>{ if(!typing()) fitLogin(); },250); },{passive:true}); }
function showDash(name){
  if(!window.__hpReady){ toast('Dashboard could not load (React CDN blocked). Check your connection and reload.'); return; }
  S.dash=true; document.documentElement.classList.add('dash-on');
  lw.style.transition='opacity .45s ease'; lw.style.opacity=0;                       // login fades out
  setTimeout(()=>{ dash.classList.add('on'); dash.scrollTop=0; window.dispatchEvent(new CustomEvent('hp-open',{detail:{name}})); },300);   // dashboard fades in right behind it
  setTimeout(()=>{ lw.classList.remove('on'); S.dashHide=true; },900);               // stop drawing the 3D scene
}
function hideDash(){
  dash.classList.remove('on'); window.dispatchEvent(new Event('hp-close'));
  setTimeout(()=>{ S.dash=false; S.dashHide=false; document.documentElement.classList.remove('dash-on');
    lw.classList.add('on'); lw.style.transition='none'; lw.style.opacity=0; void lw.offsetWidth; lw.style.transition='opacity .5s ease'; lw.style.opacity=1;
    $('#loginForm').reset(); fitLogin(); },420);
}
window.HPApp={signOut:hideDash};
$('#forgot').addEventListener('click',e=>{ e.preventDefault(); toast('Demo only — password reset is not connected.'); });
$('#password').addEventListener('input',()=>$('#fPass').classList.remove('bad')); $('#password2').addEventListener('input',()=>$('#fPass2').classList.remove('bad')); $('#fullName').addEventListener('input',()=>$('#fName').classList.remove('bad'));

/* ───────────────────────── boot ───────────────────────── */
// warm up shaders so nothing hitches mid-cinematic
{
  const vis=[plane.visible,scooter.visible,mega.visible,megaShadow.visible,ring.visible]; plane.visible=scooter.visible=mega.visible=megaShadow.visible=ring.visible=true;
  const tp=spawnParcel(false); renderer.compile(scene,camera); composer.render();
  if(tp.mesh.parent) tp.mesh.parent.remove(tp.mesh); parcels.length=0; plane.visible=vis[0]; scooter.visible=vis[1]; mega.visible=vis[2]; megaShadow.visible=vis[3]; ring.visible=vis[4];
}
window.__swiftBooted=true;
try{ history.scrollRestoration='manual'; }catch(e){}
window.scrollTo(0,0); calcMax(true); pRaw=pM=pS=0;
requestAnimationFrame(()=>{ play(); const l=$('#loader'); l.style.opacity=0; setTimeout(()=>l.remove(),900); });
}
