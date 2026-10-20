(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
const root=document.documentElement;root.classList.add('js');
const h1=$('.hero h1'),hero=$('.hero');requestAnimationFrame(()=>requestAnimationFrame(()=>h1.classList.add('in')));
const ST=[['USGS earthquake feed','Earthquake event records are ingested from the USGS feed. They are the input for validation, geographic filtering and later processing.',['USGS feed']],
['Dockerized extraction','A Python extraction task pulls records from the feed and runs in a Docker container as part of the pipeline.',['Python','Docker']],
['Validation and South Asia filtering','Records are validated and filtered to South Asia before they are loaded.',['Python']],
['Raw layer in PostgreSQL','Validated records are loaded into PostgreSQL as raw data before transformation (ELT). Insert/update handling avoids duplicate processing.',['PostgreSQL']],
['Hourly Airflow DAG','Apache Airflow runs the Dockerized extraction and transformation tasks on an hourly schedule.',['Apache Airflow','Docker']],
['Analytics and quality monitoring','Earthquake analytics and data quality checks are shown in a Streamlit dashboard, supported by Flask API endpoints.',['Streamlit','Flask']]];
const NAMES=['Source','Extract','Validate','Load','Orchestrate','Serve'],SECN=['Intro','Pipeline','Projects','Stack','Education','Contact'];
let sel=0,hov=-1,sec=-1;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('[data-r]').forEach(n=>io.observe(n));
const bs=$$('.rail button');
function pick(i){const first=i===sel&&$('#pk').dataset.s;sel=i;bs.forEach((b,k)=>b.setAttribute('aria-pressed',k==i));$('#pk').dataset.s=1;
 $('#pk').textContent='0'+(i+1)+' / '+NAMES[i].toUpperCase();$('#pt').textContent=ST[i][0];$('#pd').textContent=ST[i][1];
 $('#pc').replaceChildren(...ST[i][2].map(t=>{const s=document.createElement('span');s.textContent=t;return s}));
 $('.rail .fill').style.width='calc('+(i*100/6)+'% + 12px)';
 const d=$('#det');d.classList.remove('sw');void d.offsetWidth;d.classList.add('sw')}
$('.rail').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=Math.min(5,Math.max(0,sel+(e.key==='ArrowRight'?1:-1)));pick(n);bs[n].focus()}});
bs.forEach((b,i)=>{b.onclick=()=>pick(i);b.onmouseenter=b.onfocus=()=>hov=i;b.onmouseleave=b.onblur=()=>hov=-1});
$$('[data-tilt]').forEach(c=>{const a=c.querySelector('.arch svg');
 c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');
  if(a&&fine&&!RM){a.style.setProperty('--rx',(.5-y)*8+'deg');a.style.setProperty('--ry',(x-.5)*10+'deg')}});
 c.addEventListener('pointerleave',()=>{if(a){a.style.setProperty('--rx','0deg');a.style.setProperty('--ry','0deg')}})});
if(fine&&!RM)$$('[data-mag]').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
const secs=$$('main>section'),links=$$('header nav a'),root2=document.documentElement;let tops=[],zT=18,draw=()=>{},vis=true;
const gz=i=>-14-i*14,zs=[18,gz(0)+7,gz(1)+7,gz(2)+7,gz(3)+7,gz(4)+7,gz(5)+5];
const sm=u=>u*u*(3-2*u);
function measure(){tops=secs.map(s=>s.offsetTop);tops.push(Math.max(tops[5]+1,root2.scrollHeight-innerHeight))}
function onScroll(){const y=scrollY;let i=0;for(let k=0;k<6;k++)if(tops[k]<=y+innerHeight*.35)i=k;
 const u=Math.min(1,Math.max(0,(y-tops[i])/Math.max(1,tops[i+1]-tops[i])));
 zT=zs[i]+(zs[i+1]-zs[i])*sm(u);
 if(i!==sec){sec=i;$('#hn').textContent='0'+i;$('#hl').textContent=SECN[i];links.forEach(a=>a.removeAttribute('aria-current'));if(i>0)links[i-1].setAttribute('aria-current','true')}
 $('#hz').textContent='z '+zT.toFixed(1);
 if(!RM)hero.style.setProperty('--hp',Math.min(1,y/(innerHeight*.85)).toFixed(3));
 if(RM)draw(0)}
function boot(){
 if(!window.THREE)throw 0;
 const small=innerWidth<820,cv=$('#gl');
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:!small,powerPreference:'high-performance'});
 R.setPixelRatio(Math.min(devicePixelRatio,small?1.5:1.75));R.setClearColor(0x07080a,1);
 const S=new THREE.Scene();S.fog=new THREE.FogExp2(0x07080a,.021);
 const C=new THREE.PerspectiveCamera(52,1,.1,220);
 const SIG=0x8ff3d6,AMB=0xffb066,BONE=0xece8df;
 const W=13,H=7.5,gates=[];
 const fr=[-W,-H,0,W,-H,0,W,-H,0,W,H,0,W,H,0,-W,H,0,-W,H,0,-W,-H,0],gr=[];
 for(let k=1;k<8;k++){const x=-W+k*W/4;gr.push(x,-H,0,x,H,0)}
 for(let k=1;k<5;k++){const y=-H+k*H*2/5;gr.push(-W,y,0,W,y,0)}
 const mk=v=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));return g};
 const gF=mk(fr),gG=mk(gr);
 function label(t){const c=document.createElement('canvas');c.width=512;c.height=64;const x=c.getContext('2d');x.font='500 30px monospace';x.fillStyle='#8ff3d6';x.fillText(t,0,42);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false}));s.scale.set(8,1,1);s.center.set(0,.5);return s}
 for(let i=0;i<6;i++){
  const mf=new THREE.LineBasicMaterial({color:SIG,transparent:true,opacity:.2}),mg=new THREE.LineBasicMaterial({color:SIG,transparent:true,opacity:.05});
  const f=new THREE.LineSegments(gF,mf),g=new THREE.LineSegments(gG,mg),t=label('0'+(i+1)+' · '+NAMES[i].toUpperCase());
  f.position.z=g.position.z=gz(i);t.position.set(-W,H+.9,gz(i));S.add(f,g,t);gates.push([mf,mg,t.material])}
 const lx=(z,l)=>Math.sin(z*.07+l*2.1)*(4+l*1.5),ly=(z,l)=>Math.cos(z*.05+l*1.7)*(2.5+l);
 [SIG,BONE,AMB].forEach((c,l)=>{const p=[];for(let z=24;z>-104;z-=2)p.push(new THREE.Vector3(lx(z,l),ly(z,l),z));
  S.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(p),new THREE.LineBasicMaterial({color:c,transparent:true,opacity:.3})))});
 const N=small?420:900,a=new Float32Array(N*4);
 for(let i=0;i<N;i++)a.set([Math.random(),.6+Math.random()*.8,i%3,Math.random()],i*4);
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(new Float32Array(N*3),3));pg.setAttribute('a',new THREE.BufferAttribute(a,4));
 const U={t:{value:0},pr:{value:1}};
 const pm=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
 vertexShader:'attribute vec4 a;uniform float t,pr;varying vec3 vc;varying float va;void main(){float L=125.;float z=22.-mod(a.w*L+t*a.y*5.,L);float l=a.z;vec3 p=vec3(sin(z*.07+l*2.1)*(4.+l*1.5)+sin(a.x*6.283+t*.6)*.3,cos(z*.05+l*1.7)*(2.5+l)+cos(a.x*6.283+t*.5)*.3,z);vec4 mv=modelViewMatrix*vec4(p,1.);float d=-mv.z;gl_PointSize=pr*(70./max(d,1.))*(.5+a.x*.8);gl_Position=projectionMatrix*mv;vc=l<.5?vec3(.56,.95,.84):(l<1.5?vec3(.93,.91,.87):vec3(1.,.69,.4));va=smoothstep(.5,4.,d)*exp(-d*.022);}',
 fragmentShader:'varying vec3 vc;varying float va;void main(){float d=length(gl_PointCoord-.5);gl_FragColor=vec4(vc,smoothstep(.5,.05,d)*va*.9);}'});
 const pts=new THREE.Points(pg,pm);pts.frustumCulled=false;S.add(pts);
 const F=new THREE.Group();S.add(F);
 const ic=new THREE.IcosahedronGeometry(4,2);
 F.add(new THREE.Mesh(ic,new THREE.MeshBasicMaterial({color:SIG,wireframe:true,transparent:true,opacity:.2})),
  new THREE.Points(ic,new THREE.PointsMaterial({color:BONE,size:.09,transparent:true,opacity:.85})),
  new THREE.Mesh(new THREE.IcosahedronGeometry(2.1,1),new THREE.MeshStandardMaterial({color:0x10141b,metalness:.85,roughness:.32,flatShading:true})));
 const ring=new THREE.Mesh(new THREE.TorusGeometry(5.4,.014,8,160),new THREE.MeshBasicMaterial({color:AMB,transparent:true,opacity:.5}));ring.rotation.x=1.2;F.add(ring);
 const lit=new THREE.PointLight(SIG,1.6,34);S.add(lit,new THREE.AmbientLight(0x223040,.9));
 let cz=18,px=0,py=0,tpx=0,tpy=0,raf=0;
 if(fine&&!RM)addEventListener('pointermove',e=>{tpx=e.clientX/innerWidth-.5;tpy=e.clientY/innerHeight-.5},{passive:true});
 function rs(){const w=innerWidth,h=innerHeight,p=w/h<1;R.setSize(w,h,false);C.aspect=w/h;C.fov=p?72:52;C.updateProjectionMatrix();U.pr.value=R.getPixelRatio();
  F.position.set(p?0:5.6,p?4.4:.3,0);F.scale.setScalar(p?.55:1);measure();onScroll()}
 draw=function(t){
  if(RM)cz=zT;else cz+=(zT-cz)*.075;px+=(tpx-px)*.05;py+=(tpy-py)*.05;
  C.position.set(Math.sin(cz*.07)*1.4+px*1.4,Math.cos(cz*.05)*.8-py*.8,cz);
  C.lookAt(px+Math.sin((cz-8)*.07)*1.4,-py*.6,cz-12);
  F.rotation.y=t*.12+px*.5;F.rotation.x=py*.3;ring.rotation.z=t*.2;
  lit.position.set(F.position.x+px*10,F.position.y-py*8,7);
  const act=sec===1?(hov>=0?hov:sel):-1;
  gates.forEach(([f,g,s],i)=>{let o=.08+.62*Math.exp(-Math.abs(cz-gz(i))*.1);if(act===i)o=1;f.opacity=o;g.opacity=o*.28;s.opacity=Math.min(1,o*1.3)});
  U.t.value=t;R.render(S,C)};
 let last=0,act=performance.now();['scroll','pointermove','keydown','touchstart'].forEach(ev=>addEventListener(ev,()=>act=performance.now(),{passive:true}));
 const loop=ts=>{raf=vis?requestAnimationFrame(loop):0;if(performance.now()-act>2000&&ts-last<33)return;last=ts;draw(ts*.001)};
 addEventListener('resize',rs);rs();
 if(RM)draw(0);else loop(0);
 document.addEventListener('visibilitychange',()=>{vis=!document.hidden;if(vis&&!RM){cancelAnimationFrame(raf);loop(performance.now())}});
 cv.addEventListener('webglcontextlost',e=>{e.preventDefault();root.classList.add('nogl')});
}
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',()=>{measure();onScroll()});
measure();onScroll();
try{boot()}catch(e){root.classList.add('nogl')}
addEventListener('load',()=>{measure();onScroll()});
if(window.ResizeObserver)new ResizeObserver(()=>{measure();onScroll()}).observe(document.body);
})();