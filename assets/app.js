var DEEP=window.JD_DEEP||'',BASE=window.JD_BASE||'./',FORM=false,APPLY={},SITE={entity:'Janus Digital Global FZE',year:'',privacy:''};
var TODAY=new Date(),BASE_URL='',CITIES={},ROLES=[];
var TEAMTXT={'Engineering':'Build, integrate and run the platform.','Commercial':'Grow Janus Digital with owners and operators.','Delivery':'Take deployments from kickoff to handover.'};
function teamTxt(d){return TEAMTXT[d]||'See the open roles in this team.'}
var st={role:null,applied:false,sending:false,q:'',loc:'',dept:'',mode:'',cv:null,tried:false,picked:{},focus:'',saved:{},areas:{},onlySaved:false,open:null,step:0,stepHold:false,notice:''};
function adaptRoles(raw,todayStr){
 var p=String(todayStr||'').split('-');TODAY=p.length===3?new Date(+p[0],+p[1]-1,+p[2]):new Date();
 CITIES={};ROLES=[];
 (raw||[]).forEach(function(r){
  var g=geoResolve(r.location),key;
  if(g){key=g.n;if(!CITIES[key])CITIES[key]={full:g.full,region:g.region,code:g.code,xy:NE(g.lon,g.lat),cc:g.cc}}
  else{key='Elsewhere';if(!CITIES[key])CITIES[key]={full:'Other locations',region:'',code:'GLB',nomap:true}}
  r.city=key;r.dept=r.dept||'Other roles';r.mode=r.mode||'Onsite';r.type=r.type||'Full-time';
  r.skills=r.skills||[];r.doit=r.doit||[];r.must=r.must||[];r.nice=r.nice||[];r.questions=r.questions||[];r.opp=r.opp||'';r.about=r.about||'';r.why=r.why||'';
  ROLES.push(r)});
}
var ARTN = 0;
/* photo library: Gemini images in the Janus Digital house style. FOCUS = crop centre [x%,y%] */
var FOCUS = {p1:[50,40],p1c:[50,38],p3:[72,45],p5:[72,42],p6:[70,48],p7:[72,38],p8:[72,34],p9:[58,55],p10:[78,55],p11:[66,50],p12:[60,50]};
var TEAM_IMG={'Engineering':'p5','Commercial':'p3','Delivery':'p10'},TEAM_FALL=['p5','p3','p10'];
function teamImg(d){return TEAM_IMG[d]||TEAM_FALL[Math.abs(hashStr(String(d)))%3]}
var PH={p1:'assets/photos/p1.jpg',p3:'assets/photos/p3.jpg',p5:'assets/photos/p5.jpg',p6:'assets/photos/p6.jpg',p7:'assets/photos/p7.jpg',p8:'assets/photos/p8.jpg',p10:'assets/photos/p10.jpg'};
function phUrl(k){return BASE+(PH[k]||PH.p1)}
function photo(k,soft){var f=FOCUS[k]||[50,50];return '<img src="'+phUrl(k)+'" alt="" style="object-position:'+f[0]+'% '+f[1]+'%"><i class="ov'+(soft?' soft':'')+'"></i>'}

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function $(id){return document.getElementById(id)}
function roleById(id){return ROLES.filter(function(r){return r.id===id})[0]}
function daysLeft(r){if(!r.close)return 9999;var p=r.close.split('-');return Math.round((new Date(+p[0],+p[1]-1,+p[2])-TODAY)/86400000)}
function closeTxt(r){if(!r.close)return 'Open now';var d=daysLeft(r);return d<=0?'Closes today':(d===1?'Closes tomorrow':'Closes in '+d+' days')}
function fmtDate(r){if(!r.close)return 'Open until filled';var p=r.close.split('-');return +p[2]+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+p[1]-1]+' '+p[0]}
function logo(){return '<a class="lock" href="'+BASE+'" aria-label="Janus Digital careers home"><img src="'+BASE+'assets/logo.png" alt="Janus Digital" height="30" style="height:30px;width:auto;display:block"></a>'}
function uniq(k){var o=[];ROLES.forEach(function(r){if(o.indexOf(r[k])<0)o.push(r[k])});return o}
function opts(list,all,val,lab){return '<option value="">'+all+'</option>'+list.map(function(x){return '<option value="'+esc(x)+'"'+(x===val?' selected':'')+'>'+esc(lab?lab(x):x)+'</option>'}).join('')}
function matches(r){var q=st.q.toLowerCase();var hay=(r.t+' '+r.dept+' '+locOf(r)+' '+r.skills.map(function(s){return s.l}).join(' ')).toLowerCase();return (!q||hay.indexOf(q)>=0)&&(!st.loc||r.city===st.loc)&&(!st.dept||r.dept===st.dept)&&(!st.mode||r.mode===st.mode)&&(!st.onlySaved||st.saved[r.id])}
function baseMatches(r,skip){var q=st.q.toLowerCase();var hay=(r.t+' '+r.dept+' '+locOf(r)+' '+r.skills.map(function(s){return s.l}).join(' ')).toLowerCase();return (!q||hay.indexOf(q)>=0)&&(skip==='loc'||!st.loc||r.city===st.loc)&&(!st.dept||r.dept===st.dept)&&(!st.mode||r.mode===st.mode)&&(!st.onlySaved||st.saved[r.id])}

/* ---------- generated artwork (brand palette, no stock photos) ---------- */
function rng(seed){var a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hashStr(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function art(kind,seed,wide){
 var R=rng(hashStr(String(seed))),id='g'+(++ARTN),W=400,H=wide?260:200,o='';
 o+='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#002A5C"/><stop offset="1" stop-color="#0A4C9A"/></linearGradient></defs><rect width="'+W+'" height="'+H+'" fill="url(#'+id+')"/>';
 var i,x,y,w,h;
 if(kind==='skyline'){
  o+='<circle cx="'+(300+R()*50)+'" cy="'+(50+R()*20)+'" r="'+(wide?34:26)+'" fill="#F5C518" opacity=".92"/><circle cx="320" cy="62" r="'+(wide?58:46)+'" fill="#F5C518" opacity=".12"/>';
  for(x=-10;x<W;x+=22+R()*14){w=22+R()*16;h=50+R()*(wide?120:80);o+='<rect x="'+x+'" y="'+(H-h)+'" width="'+w+'" height="'+h+'" fill="#4F86C6" opacity=".35"/>'}
  for(x=-6;x<W;x+=26+R()*18){w=24+R()*18;h=34+R()*(wide?110:70);o+='<rect x="'+x+'" y="'+(H-h)+'" width="'+w+'" height="'+h+'" fill="#001E45"/>';
   for(y=H-h+8;y<H-6;y+=11)for(var k=x+5;k<x+w-5;k+=9){o+='<rect x="'+k+'" y="'+y+'" width="4" height="5" fill="'+(R()<.22?'#F5C518':'#CCD6E4')+'" opacity="'+(R()<.22?'.95':'.14')+'"'+(R()<.04?' class="tw"':'')+'/>'}}
  var nodes=[];for(i=0;i<7;i++)nodes.push([30+R()*340,20+R()*(H*.45)]);
  for(i=1;i<nodes.length;i++)o+='<line x1="'+nodes[i-1][0]+'" y1="'+nodes[i-1][1]+'" x2="'+nodes[i][0]+'" y2="'+nodes[i][1]+'" stroke="#FDF2D0" stroke-width=".8" opacity=".45"/>';
  nodes.forEach(function(n,j){o+='<circle cx="'+n[0]+'" cy="'+n[1]+'" r="'+(j%3===0?3.2:2)+'" fill="#F5C518" class="tw"/>'});
 }else if(kind==='network'){
  var P=[];for(i=0;i<22;i++)P.push([14+R()*372,12+R()*(H-24)]);
  P.forEach(function(a,ai){var d=P.map(function(b,bi){return [bi,(a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1])]}).filter(function(z){return z[0]!==ai}).sort(function(p,q){return p[1]-q[1]}).slice(0,2);d.forEach(function(z){var b=P[z[0]];o+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="#CCD6E4" stroke-width=".9" opacity=".4"/>'})});
  P.forEach(function(a,ai){var g=ai%5===0;o+='<circle cx="'+a[0]+'" cy="'+a[1]+'" r="'+(g?5:2.6)+'" fill="'+(g?'#F5C518':'#CCD6E4')+'" '+(g?'class="tw"':'opacity=".8"')+'/>'});
  o+='<rect x="'+(W/2-34)+'" y="'+(H/2-26)+'" width="68" height="52" rx="6" fill="none" stroke="#F5C518" stroke-width="2"/><rect x="'+(W/2-18)+'" y="'+(H/2-12)+'" width="36" height="24" rx="3" fill="#F5C518" opacity=".25"/>';
 }else if(kind==='bars'){
  for(i=1;i<5;i++)o+='<line x1="0" y1="'+(H*i/5)+'" x2="'+W+'" y2="'+(H*i/5)+'" stroke="#fff" opacity=".08"/>';
  var pts=[];for(i=0;i<9;i++){h=24+i*(H*.07)+R()*22;x=14+i*43;o+='<rect x="'+x+'" y="'+(H-h)+'" width="30" height="'+h+'" fill="#4F86C6" opacity="'+(.35+i*.05)+'"/><rect x="'+x+'" y="'+(H-h)+'" width="30" height="5" fill="#F5C518"/>';pts.push((x+15)+','+(H-h-16-R()*10))}
  o+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="#FDF2D0" stroke-width="2" stroke-linejoin="round"/><circle cx="'+pts[8].split(',')[0]+'" cy="'+pts[8].split(',')[1]+'" r="5" fill="#F5C518" class="tw"/>';
 }else{
  var cx=W/2,yy=H,widths=[120,104,92,80,66,52];
  widths.forEach(function(ww,j){h=(wide?34:26);yy-=h;var off=(R()-.5)*14;o+='<rect x="'+(cx-ww/2+off)+'" y="'+yy+'" width="'+ww+'" height="'+(h-3)+'" fill="'+(j===3?'#F5C518':(j%2?'#4F86C6':'#1E63B5'))+'" opacity="'+(j===3?.95:.8)+'"/>'});
  o+='<line x1="'+(cx+70)+'" y1="'+(H-8)+'" x2="'+(cx+70)+'" y2="14" stroke="#CCD6E4" stroke-width="3"/><line x1="'+(cx-20)+'" y1="18" x2="'+(cx+110)+'" y2="18" stroke="#CCD6E4" stroke-width="3"/><line x1="'+(cx+10)+'" y1="18" x2="'+(cx+10)+'" y2="'+(yy-6)+'" stroke="#F5C518" stroke-width="1.5"/><rect x="'+(cx+4)+'" y="'+(yy-12)+'" width="12" height="8" fill="#F5C518"/>';
  for(i=0;i<14;i++)o+='<circle cx="'+(10+R()*380)+'" cy="'+(10+R()*(H*.5))+'" r="1.4" fill="#fff" opacity=".35"/>';
 }
 return o+'</svg>';
}

/* ---------- places: turn a role's location text into a map pin ---------- */
var NE=function(lon,lat){var l=lon*Math.PI/180,p=lat*Math.PI/180,p2=p*p,p4=p2*p2;var x=l*(0.8707-0.131979*p2+p4*(-0.013791+p4*(0.003971*p2-0.001529*p4)));var y=p*(1.007226+p2*(0.015085+p4*(-0.044475+0.028874*p2-0.005916*p4)));return [500+178.5726*x,260-178.5726*y]};
/* name|also known as|lat|lon|country id|label|region|code */
var GAZ_SRC=[
'London||51.51|-0.13|826|London, UK|Europe|LON','Manchester||53.48|-2.24|826|Manchester, UK|Europe|MAN','Birmingham||52.49|-1.89|826|Birmingham, UK|Europe|BHX','Edinburgh||55.95|-3.19|826|Edinburgh, UK|Europe|EDI','Glasgow||55.86|-4.25|826|Glasgow, UK|Europe|GLA','Bristol||51.45|-2.59|826|Bristol, UK|Europe|BRS','Leeds||53.80|-1.55|826|Leeds, UK|Europe|LDS','Cambridge||52.21|0.12|826|Cambridge, UK|Europe|CBG','Oxford||51.75|-1.26|826|Oxford, UK|Europe|OXF',
'Dubai||25.20|55.27|784|Dubai, UAE|Middle East|DXB','Abu Dhabi||24.45|54.38|784|Abu Dhabi, UAE|Middle East|AUH',
'Singapore||1.35|103.82|702|Singapore|Asia Pacific|SIN',
'Dublin||53.35|-6.26|372|Dublin, Ireland|Europe|DUB',
'Riyadh||24.71|46.68|682|Riyadh, Saudi Arabia|Middle East|RUH','Jeddah||21.54|39.17|682|Jeddah, Saudi Arabia|Middle East|JED',
'Doha||25.29|51.53|634|Doha, Qatar|Middle East|DOH','Manama|bahrain|26.23|50.58|048|Manama, Bahrain|Middle East|BAH','Kuwait City|kuwait|29.38|47.99|414|Kuwait City, Kuwait|Middle East|KWI','Muscat|oman|23.59|58.41|512|Muscat, Oman|Middle East|MCT','Amman|jordan|31.95|35.93|400|Amman, Jordan|Middle East|AMM','Cairo|egypt|30.04|31.24|818|Cairo, Egypt|Middle East|CAI','Istanbul|turkey,turkiye|41.01|28.98|792|Istanbul, Turkey|Europe|IST',
'Paris|france|48.86|2.35|250|Paris, France|Europe|PAR','Berlin|germany|52.52|13.40|276|Berlin, Germany|Europe|BER','Munich||48.14|11.58|276|Munich, Germany|Europe|MUC','Frankfurt||50.11|8.68|276|Frankfurt, Germany|Europe|FRA','Amsterdam|netherlands,holland|52.37|4.90|528|Amsterdam, Netherlands|Europe|AMS','Madrid|spain|40.42|-3.70|724|Madrid, Spain|Europe|MAD','Barcelona||41.39|2.17|724|Barcelona, Spain|Europe|BCN','Milan||45.46|9.19|380|Milan, Italy|Europe|MIL','Rome|italy|41.90|12.50|380|Rome, Italy|Europe|ROM','Zurich|switzerland|47.38|8.54|756|Zurich, Switzerland|Europe|ZRH','Stockholm|sweden|59.33|18.07|752|Stockholm, Sweden|Europe|STO','Copenhagen|denmark|55.68|12.57|208|Copenhagen, Denmark|Europe|CPH','Oslo|norway|59.91|10.75|578|Oslo, Norway|Europe|OSL','Helsinki|finland|60.17|24.94|246|Helsinki, Finland|Europe|HEL','Warsaw|poland|52.23|21.01|616|Warsaw, Poland|Europe|WAW','Lisbon|portugal|38.72|-9.14|620|Lisbon, Portugal|Europe|LIS','Brussels|belgium|50.85|4.35|056|Brussels, Belgium|Europe|BRU','Vienna|austria|48.21|16.37|040|Vienna, Austria|Europe|VIE',
'Mumbai|india|19.08|72.88|356|Mumbai, India|Asia Pacific|BOM','New Delhi|delhi|28.61|77.21|356|New Delhi, India|Asia Pacific|DEL','Bangalore|bengaluru|12.97|77.59|356|Bangalore, India|Asia Pacific|BLR','Hyderabad||17.39|78.48|356|Hyderabad, India|Asia Pacific|HYD',
'Hong Kong||22.32|114.17|344|Hong Kong|Asia Pacific|HKG','Shanghai|china|31.23|121.47|156|Shanghai, China|Asia Pacific|SHA','Beijing||39.90|116.41|156|Beijing, China|Asia Pacific|PEK','Shenzhen||22.54|114.06|156|Shenzhen, China|Asia Pacific|SZX','Tokyo|japan|35.68|139.69|392|Tokyo, Japan|Asia Pacific|TYO','Seoul|south korea,korea|37.57|126.98|410|Seoul, South Korea|Asia Pacific|SEL','Kuala Lumpur|malaysia|3.14|101.69|458|Kuala Lumpur, Malaysia|Asia Pacific|KUL','Bangkok|thailand|13.76|100.50|764|Bangkok, Thailand|Asia Pacific|BKK','Jakarta|indonesia|-6.21|106.85|360|Jakarta, Indonesia|Asia Pacific|JKT','Manila|philippines|14.60|120.98|608|Manila, Philippines|Asia Pacific|MNL','Ho Chi Minh City|saigon,vietnam|10.82|106.63|704|Ho Chi Minh City, Vietnam|Asia Pacific|SGN','Hanoi||21.03|105.85|704|Hanoi, Vietnam|Asia Pacific|HAN',
'Sydney|australia|-33.87|151.21|036|Sydney, Australia|Asia Pacific|SYD','Melbourne||-37.81|144.96|036|Melbourne, Australia|Asia Pacific|MEL','Auckland|new zealand|-36.85|174.76|554|Auckland, New Zealand|Asia Pacific|AKL',
'New York|nyc,usa,united states,america|40.71|-74.01|840|New York, USA|Americas|NYC','San Francisco||37.77|-122.42|840|San Francisco, USA|Americas|SFO','Los Angeles||34.05|-118.24|840|Los Angeles, USA|Americas|LAX','Chicago||41.88|-87.63|840|Chicago, USA|Americas|CHI','Boston||42.36|-71.06|840|Boston, USA|Americas|BOS','Austin||30.27|-97.74|840|Austin, USA|Americas|AUS','Seattle||47.61|-122.33|840|Seattle, USA|Americas|SEA','Toronto|canada|43.65|-79.38|124|Toronto, Canada|Americas|YYZ','Vancouver||49.28|-123.12|124|Vancouver, Canada|Americas|YVR','Mexico City|mexico|19.43|-99.13|484|Mexico City, Mexico|Americas|MEX','Sao Paulo|brazil|-23.55|-46.63|076|Sao Paulo, Brazil|Americas|SAO',
'Johannesburg|south africa|-26.20|28.05|710|Johannesburg, South Africa|Africa|JNB','Cape Town||-33.92|18.42|710|Cape Town, South Africa|Africa|CPT','Nairobi|kenya|-1.29|36.82|404|Nairobi, Kenya|Africa|NBO','Lagos|nigeria|6.52|3.38|566|Lagos, Nigeria|Africa|LOS'
];
/* country-only text maps to a representative city, only when no city is named */
var GAZ_COUNTRY={'united kingdom':'London','uk':'London','england':'London','scotland':'Edinburgh','great britain':'London','britain':'London','united arab emirates':'Dubai','uae':'Dubai','saudi arabia':'Riyadh','ksa':'Riyadh','qatar':'Doha','ireland':'Dublin'};
var GAZ=GAZ_SRC.map(function(s){var a=s.split('|');var n=a[0];return {n:n,keys:[n.toLowerCase()],cityKey:n.toLowerCase(),alias:a[1]?a[1].split(','):[],lat:+a[2],lon:+a[3],cc:a[4],full:a[5],region:a[6],code:a[7]}});
function geoResolve(text){
 var t=' '+String(text||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ')+' ',best=null,bl=0,i,j,g;
 for(i=0;i<GAZ.length;i++){g=GAZ[i];if(t.indexOf(' '+g.cityKey+' ')>=0&&g.cityKey.length>bl){best=g;bl=g.cityKey.length}}
 if(best)return best;
 for(i=0;i<GAZ.length;i++){g=GAZ[i];for(j=0;j<g.alias.length;j++){if(t.indexOf(' '+g.alias[j]+' ')>=0&&g.alias[j].length>bl){best=g;bl=g.alias[j].length}}}
 if(best)return best;
 Object.keys(GAZ_COUNTRY).forEach(function(k){if(t.indexOf(' '+k+' ')>=0&&k.length>bl){bl=k.length;best=GAZ_COUNTRY[k]}});
 if(best)return GAZ.filter(function(x){return x.n===best})[0]||null;
 return null;
}
var GRAT=(function(){var d='',lo,la;for(lo=-150;lo<=180;lo+=30){for(la=-90;la<=90;la+=6){var p=NE(lo,la);d+=(la===-90?'M':'L')+p[0].toFixed(1)+' '+p[1].toFixed(1)}}for(la=-60;la<=60;la+=30){for(lo=-180;lo<=180;lo+=6){var q=NE(lo,la);d+=(lo===-180?'M':'L')+q[0].toFixed(1)+' '+q[1].toFixed(1)}}return d})();
var LAND_SVG='';
function landSvg(){if(!LAND_SVG)LAND_SVG=Object.keys(MAP_CTRY).map(function(k){return '<path class="land" d="'+MAP_CTRY[k]+'"/>'}).join('');return LAND_SVG}
function locOf(r){var c=CITIES[r.city];return c&&!c.nomap?c.full:(r.location||'Location to be confirmed')}
var VIEWS={Singapore:{w:70,fx:.64},'Hong Kong':{w:60,fx:.64},Dubai:{w:120,fx:.64}};
function viewOf(c){return VIEWS[c]||{w:110,fx:.64}}

/* ---------- branded world map: real country outlines, zoom, pan, fly-to ---------- */
var MAPS={};
var REDUCE=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function citiesWithRoles(){return Object.keys(CITIES).filter(function(c){return !CITIES[c].nomap&&ROLES.some(function(r){return r.city===c})})}
function WorldMap(el,o){
 o=o||{};
 var ASP=o.asp||0.43,Y0=20,Y1=Y0+470,keys=o.only?[o.only]:citiesWithRoles(),m={},vb={x:0,y:Y0,w:1000,h:1000*ASP},moved=false,anim=0,last='',drag=null;
 var s='<svg viewBox="0 0 1000 430" role="img" aria-label="World map showing where Janus Digital is hiring"><path class="grat" d="'+GRAT+'"/>'+landSvg();
 var seenCc={};keys.forEach(function(c){var cc=CITIES[c].cc;if(seenCc[cc]||!MAP_CTRY[cc])return;seenCc[cc]=1;s+='<path class="hic" data-c="'+c+'" d="'+MAP_CTRY[cc]+'"/>'});
 if(!o.only&&keys.length>1){var hub=keys.slice().sort(function(x,y){return ROLES.filter(function(r){return r.city===y}).length-ROLES.filter(function(r){return r.city===x}).length})[0];keys.filter(function(k){return k!==hub}).slice(0,5).map(function(k){return [hub,k]}).forEach(function(p,i){
  var a=CITIES[p[0]].xy,b=CITIES[p[1]].xy,dx=b[0]-a[0],dy=b[1]-a[1],mx=(a[0]+b[0])/2+dy*.2,my=(a[1]+b[1])/2-dx*.2,d='M'+a[0]+' '+a[1]+' Q'+mx+' '+my+' '+b[0]+' '+b[1];
  s+='<path class="arc" d="'+d+'"/><circle class="dot" r="3"><animateMotion dur="'+(5+i)+'s" begin="'+(i*1.3)+'s" repeatCount="indefinite" path="'+d+'"/></circle>'})}
 keys.forEach(function(c){var n=ROLES.filter(function(r){return r.city===c}).length;
  s+='<g class="pin" data-c="'+c+'" tabindex="0" role="button" aria-label="'+c+', '+n+' open role'+(n===1?'':'s')+'"><g class="pc"><circle class="ring" r="13"/><circle class="core" r="12"/><text class="n" y="1">'+n+'</text></g><text class="lb" y="-22">'+c+'</text></g>'});
 s+='</svg>';
 if(!o.static)s+='<div class="mlegend"><span><i></i>HIRING NOW</span></div><div class="mctl"><button type="button" data-z="in" aria-label="Zoom in">+</button><button type="button" data-z="out" aria-label="Zoom out">&minus;</button><button type="button" data-z="reset" aria-label="Whole world" style="font-size:14px">&#8962;</button></div><div class="mhint">Drag to move &middot; double-click, + or Ctrl and scroll to zoom</div>';
 el.innerHTML=s;
 var svg=el.querySelector('svg');
 function pxw(){return el.clientWidth||1000}
 function clampV(t){t.w=Math.max(60,Math.min(1000,t.w));var h=t.w*ASP;t.x=Math.max(0,Math.min(1000-t.w,t.x));t.y=Math.max(Y0,Math.min(Y1-h,t.y));return t}
 function scale(){var k=vb.w/pxw()*(pxw()<600&&!o.static?.72:1);el.querySelectorAll('.pin').forEach(function(g){var p=CITIES[g.getAttribute('data-c')].xy;g.setAttribute('transform','translate('+p[0]+' '+p[1]+') scale('+k+')')});el.querySelectorAll('.dot').forEach(function(c){c.setAttribute('r',3.6*k)})}
 function apply(){vb.h=vb.w*ASP;svg.setAttribute('viewBox',vb.x.toFixed(2)+' '+vb.y.toFixed(2)+' '+vb.w.toFixed(2)+' '+vb.h.toFixed(2));scale()}
 function go(t,ms){
  clampV(t);cancelAnimationFrame(anim);
  if(REDUCE||ms===0){vb.x=t.x;vb.y=t.y;vb.w=t.w;apply();return}
  var f={x:vb.x,y:vb.y,w:vb.w},t0=null;
  function stp(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/(ms||800)),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;vb.x=f.x+(t.x-f.x)*e;vb.y=f.y+(t.y-f.y)*e;vb.w=f.w+(t.w-f.w)*e;apply();if(p<1)anim=requestAnimationFrame(stp)}
  anim=requestAnimationFrame(stp)}
 function zoomAt(cx,cy,f){var r=el.getBoundingClientRect(),fx=(cx-r.left)/r.width,fy=(cy-r.top)/r.height,nw=Math.max(60,Math.min(1000,vb.w*f));go({x:vb.x+(vb.w-nw)*fx,y:vb.y+(vb.h-nw*ASP)*fy,w:nw},260)}
 m.focus=function(c,ms){var v=viewOf(c),p=CITIES[c].xy,w=v.w;go({x:p[0]-w*v.fx,y:p[1]-w*ASP*.5,w:w},ms)};
 m.reset=function(ms){go({x:0,y:Y0,w:1000},ms)};
 m.sync=function(loc,instant){if(loc===last&&!instant)return;last=loc;if(loc)m.focus(loc,instant?0:900);else m.reset(instant?0:800)};
 m.scale=scale;
 if(o.static){var p=CITIES[o.only].xy,w=o.w||80;vb.w=w;vb.x=p[0]-w*.5;vb.y=p[1]-w*ASP*.5;clampV(vb);apply();el.className+=' mini';el.style.aspectRatio='1000/'+Math.round(1000*ASP)}
 else{
  apply();
  el.addEventListener('pointerdown',function(e){if(e.button!==0||e.target.closest('.mctl'))return;drag={x:e.clientX,y:e.clientY,vx:vb.x,vy:vb.y};moved=false;cancelAnimationFrame(anim);
   function mv(ev){var dx=ev.clientX-drag.x,dy=ev.clientY-drag.y;if(!moved&&Math.abs(dx)+Math.abs(dy)<6)return;moved=true;el.classList.add('drag');var k=vb.w/pxw();vb.x=drag.vx-dx*k;vb.y=drag.vy-dy*k;clampV(vb);apply()}
   function up(){window.removeEventListener('pointermove',mv);window.removeEventListener('pointerup',up);el.classList.remove('drag');setTimeout(function(){moved=false},0)}
   window.addEventListener('pointermove',mv);window.addEventListener('pointerup',up)});
  el.addEventListener('click',function(e){if(moved){e.stopPropagation();e.preventDefault()}},true);
  el.addEventListener('wheel',function(e){if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();zoomAt(e.clientX,e.clientY,e.deltaY<0?.78:1.28)},{passive:false});
  el.addEventListener('dblclick',function(e){if(e.target.closest('.mctl')||e.target.closest('.pin'))return;zoomAt(e.clientX,e.clientY,.55)});
  el.querySelector('.mctl').addEventListener('click',function(e){var z=e.target.closest('[data-z]');if(!z)return;e.stopPropagation();var d=z.getAttribute('data-z');var r=el.getBoundingClientRect();if(d==='reset'){window.__mapReset&&window.__mapReset()}else zoomAt(r.left+r.width/2,r.top+r.height/2,d==='in'?.6:1.65)});
 }
 return m;
}
window.addEventListener('resize',function(){Object.keys(MAPS).forEach(function(k){MAPS[k]&&MAPS[k].scale()})});

/* ---------- public home ---------- */
var AREAS=[
 {k:'sw',l:'Software and data',re:/python|machine learning|data|cloud/i},
 {k:'bms',l:'Building systems and BMS',re:/bms|building automation|m&e|smart building|commissioning/i},
 {k:'iot',l:'IoT and protocols',re:/bacnet|modbus|mqtt|opc|protocol|integration/i},
 {k:'bim',l:'BIM and design',re:/revit|bim|architecture|technical writing|cibse/i},
 {k:'sales',l:'Sales and commercial',re:/sales|negotiation|pricing|owner network|pre-sales|p&l/i},
 {k:'mkt',l:'Marketing and brand',re:/marketing|demand|brand|messaging/i},
 {k:'pm',l:'Project delivery',re:/project|risk|reporting|construction/i},
 {k:'lead',l:'Leadership',re:/leadership|team management|stakeholder|p&l/i},
 {k:'lang',l:'Mandarin',re:/mandarin/i}
];
var STEPS=[
 {t:'Apply',s:'Short form and your CV',d:'A short form and your CV. Tick the key skills you have so we can see your match straight away. We read every application.',time:'A few minutes'},
 {t:'Intro call',s:'With our recruiting team',d:'A conversation with our recruiting team about you, the role and Janus Digital. A chance for you to ask us anything.',time:'To be confirmed'},
 {t:'Interviews',s:'Hiring manager and team',d:'Meet the hiring manager and the people you would work with. Some roles include a technical or case discussion.',time:'To be confirmed'},
 {t:'Offer',s:'We always tell you',d:'We tell every candidate the outcome, whatever it is, and give feedback where we can.',time:'To be confirmed'}
];
var HERO_WORDS=['real assets','buildings','infrastructure','cities'];
var TM={};
function scoreOf(r){
 var sel=AREAS.filter(function(a){return st.areas[a.k]});if(!sel.length)return null;
 var wt={P:3,S:2,T:1},tot=0,got=0,n=0;
 r.skills.forEach(function(s){tot+=wt[s.t];if(sel.some(function(a){return a.re.test(s.l)})){got+=wt[s.t];n++}});
 return {pct:tot?Math.round(got/tot*100):0,n:n}}
function heartSvg(){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 6.6 4.5 4.5 0 0 1 20 9.5c0 6.1-8 11-8 11z" stroke-linejoin="round"/></svg>'}
function nSaved(){return Object.keys(st.saved).filter(function(k){return st.saved[k]}).length}
function pubHome(){
 var cityKeys=Object.keys(CITIES);
 var h='<div class="gold"></div><div class="top"><div class="nav"><a data-go="where">Where we hire</a><a data-go="match">Find your fit</a><a data-go="teams">Teams</a><a data-go="roles">Open roles</a><a data-go="how">How we hire</a><a class="sv" id="savedlink">Saved <b id="savedn">0</b></a></div>'+logo()+'<div class="prog" id="progi"></div></div>';
 if(st.notice)h+='<div class="alert" style="margin:0;border-radius:0"><div><b style="font-family:Poppins,Arial,sans-serif;color:#003A7D">'+esc(st.notice)+'</b></div></div>';
 h+='<div class="hero" id="hero"><div class="in"><div><div class="live"><i></i><span id="ticker"></span></div><h1>Help run the world’s <em id="rot">'+HERO_WORDS[0]+'</em></h1><p>Janus Digital™ is the agentic AI platform that runs the world’s real assets. We are growing across Singapore, the UK and beyond, and we are hiring people who want to work on technology that matters.</p><a class="btn gold" data-go="roles">See open roles</a> <a class="btn ghost" style="border-color:#fff;color:#fff;margin-left:6px" data-go="match">Find your fit</a></div><div class="art slides" id="slides">'+['p7','p8','p6'].map(function(k,i){return '<div class="sl'+(i?'':' on')+'">'+photo(k)+'</div>'}).join('')+'<div class="sdots">'+[0,1,2].map(function(i){return '<button type="button" data-slide="'+i+'" aria-label="Photo '+(i+1)+'" class="'+(i?'':'on')+'"></button>'}).join('')+'</div></div></div></div>';
 h+='<div class="stats"><div class="stat"><b data-to="15" data-suf="+">0</b><span>years of foundational R&amp;D</span></div><div class="stat"><b data-to="76">0</b><span>granted patents</span></div><div class="stat"><b data-to="10000" data-suf="+">0</b><span>building datasets</span></div><div class="stat"><b data-to="253">0</b><span>cities</span></div></div>';
 h+='<div class="wrap rv" id="where"><h2 class="sec-t">Where we are hiring</h2><p class="sec-s">Click a city to zoom in and see its roles. Drag to explore the map.</p><div class="mapbox"><div class="mapcard" id="mapcard"><div class="mapv" id="mapv"></div><div class="mcity" id="mcity"></div><div class="tip" id="tip"></div></div><div class="locs" id="locs"></div></div></div>';
 h+='<div class="wrap rv" id="match"><h2 class="sec-t">Find roles that fit you</h2><p class="sec-s">Pick the areas you work in. We rank the open roles by how well they match. Nothing is saved or sent.</p><div class="fit"><div class="chs" id="areas"></div><div class="best" id="best"></div></div></div>';
 h+='<div class="wrap rv" id="teams"><h2 class="sec-t">Our teams</h2><p class="sec-s">Pick a team to see its open roles.</p><div class="teams">'+uniq('dept').map(function(d){var n=ROLES.filter(function(r){return r.dept===d}).length;return '<button class="team" type="button" data-team="'+d+'"><div class="art">'+photo(teamImg(d))+'</div><div class="t"><h3>'+d+'</h3><p>'+esc(teamTxt(d))+'</p><span class="tn">'+n+' open role'+(n===1?'':'s')+'</span></div></button>'}).join('')+'</div></div>';
 h+='<div class="wrap" id="roles"><h2 class="sec-t">Open roles</h2><p class="sec-s">Search by title, skill or place. Click a role for a quick look, or save it for later.</p>';
 h+='<div class="filters"><div><label class="l" for="q">Search</label><input type="text" id="q" placeholder="Job title, skill or keyword" value="'+esc(st.q)+'"></div><div><label class="l" for="fl">Location</label><select id="fl">'+opts(cityKeys,'All locations',st.loc,function(c){return CITIES[c].full})+'</select></div><div><label class="l" for="fd">Team</label><select id="fd">'+opts(uniq('dept'),'All teams',st.dept)+'</select></div><div><label class="l" for="fm">Work model</label><select id="fm">'+opts(uniq('mode'),'Any',st.mode)+'</select></div></div>';
 h+='<div class="active" id="active"></div><p class="count" id="count"></p><div id="rolelist"></div>';
 h+='</div>';
 h+='<div class="wrap rv" id="how"><h2 class="sec-t">Why people join</h2><p class="sec-s">What makes Janus Digital a place to build a career.</p><div class="joinband"><img src="'+phUrl('p1')+'" alt=""><i class="ov"></i><div class="jt"><b>WHY PEOPLE JOIN</b><h3>Work on the systems that run real buildings and cities</h3></div></div><div class="three"><div class="tile rv"><h3>Depth</h3><p>Built on more than 15 years of foundational R&amp;D and over $100M invested in the platform.</p></div><div class="tile rv" style="transition-delay:.1s"><h3>Evidence</h3><p>Grounded in verified operational data, audited end to end.</p></div><div class="tile rv" style="transition-delay:.2s"><h3>Pace</h3><p>Full deployment within 14 days of kickoff, with senior domain experts alongside you.</p></div></div>';
 h+='<h2 class="sec-t" style="margin-top:34px">How we hire</h2><p class="sec-s">Click a step to see what happens.</p><div class="stepper" id="stepper"><div class="stline"><i id="stfill"></i></div><div class="sts">'+STEPS.map(function(x,i){return '<button type="button" class="stb" data-step="'+i+'"><span>'+(i+1)+'</span>'+x.t+'</button>'}).join('')+'</div><div class="stpanel" id="stpanel"></div></div></div>';
 return h+foot();
}
function foot(){return '<div class="foot"><span>\u00a9 '+esc(SITE.entity)+', '+esc(SITE.year)+(SITE.privacy?' &middot; <a href="'+esc(SITE.privacy)+'" style="color:inherit">Privacy notice</a>':'')+'</span><span>Careers at Janus Digital\u2122</span></div>'}
function setStep(i){
 st.step=i;var x=STEPS[i];
 document.querySelectorAll('.stb').forEach(function(b,k){b.className='stb'+(k<i?' done':'')+(k===i?' on':'')});
 var f=$('stfill');if(f)f.style.width=(i/(STEPS.length-1)*100)+'%';
 var p=$('stpanel');if(p){p.innerHTML='<h3>'+(i+1)+'. '+x.t+'</h3><p>'+x.d+'</p>'+(x.time&&!/confirmed/i.test(x.time)?'<small style="color:#5D676F">Typical time: '+x.time+'</small>':'');p.style.animation='none';void p.offsetWidth;p.style.animation=''}
}
function roleCard(r,i,keep){
 var d=daysLeft(r),sc=scoreOf(r),open=st.open===r.id,saved=st.saved[r.id];
 var badge=sc?(sc.pct>=60?'<span class="mbadge hi">Strong match '+sc.pct+'%</span>':(sc.pct>=30?'<span class="mbadge mid">Good match '+sc.pct+'%</span>':(sc.pct>0?'<span class="mbadge">Partial match '+sc.pct+'%</span>':''))):'';
 return '<div class="role'+(open?' open':'')+(keep?' na':'')+(sc&&sc.pct===0?' faint':'')+'" data-peek="'+r.id+'" data-c="'+r.city+'" tabindex="0" style="animation-delay:'+(keep?0:i*45)+'ms">'+
  '<div class="ic">'+CITIES[r.city].code+'</div>'+
  '<div class="rb"><h3>'+esc(r.t)+'</h3><div class="chips"><span class="chip">'+esc(locOf(r))+'</span><span class="chip">'+esc(r.dept)+'</span><span class="chip">'+esc(r.mode)+'</span>'+(d<=21?'<span class="chip soon">'+closeTxt(r)+'</span>':'')+'</div>'+
  '<div class="chips">'+r.skills.filter(function(s){return s.t==='P'}).map(function(s){return '<span class="chip sk">'+esc(s.l)+'</span>'}).join('')+'</div>'+
  '<div class="peek"><div><div class="pin2"><p>'+esc(r.opp)+'</p><ul>'+r.must.slice(0,2).map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul><button class="btn gold" type="button" data-r="'+r.id+'">View role and apply</button> <span class="soft" style="margin-left:8px">Applications close '+esc(fmtDate(r))+'</span></div></div></div></div>'+
  '<div class="ra"><div class="row2">'+badge+'<button class="heart'+(saved?' on':'')+'" type="button" data-save="'+r.id+'" aria-label="'+(saved?'Remove from saved roles':'Save this role')+'" aria-pressed="'+(saved?'true':'false')+'">'+heartSvg()+'</button></div>'+(sc&&sc.pct>0?'<div class="mbar"><i style="width:'+sc.pct+'%"></i></div>':'')+'<span class="arrow">Quick view</span></div></div>';
}
function updateHome(keep){
 var list=ROLES.filter(matches);
 if(AREAS.some(function(a){return st.areas[a.k]}))list=list.map(function(r,i){return {r:r,i:i,s:scoreOf(r).pct}}).sort(function(a,b){return b.s-a.s||a.i-b.i}).map(function(x){return x.r});
 $('count').textContent=list.length+' open role'+(list.length===1?'':'s')+(list.length<ROLES.length?' of '+ROLES.length:'');
 var a='';
 if(st.q)a+='<button class="fchip" data-clear="q">Search: '+esc(st.q)+' <b>&times;</b></button>';
 if(st.loc)a+='<button class="fchip" data-clear="loc">'+esc(CITIES[st.loc].full)+' <b>&times;</b></button>';
 if(st.dept)a+='<button class="fchip" data-clear="dept">'+esc(st.dept)+' <b>&times;</b></button>';
 if(st.mode)a+='<button class="fchip" data-clear="mode">'+esc(st.mode)+' <b>&times;</b></button>';
 if(st.onlySaved)a+='<button class="fchip" data-clear="saved">Saved roles only <b>&times;</b></button>';
 if(a)a+='<button class="btn ghost" data-clear="all" style="padding:3px 12px;font-size:12px">Clear all</button>';
 $('active').innerHTML=a;
 var h='';
 list.forEach(function(r,i){h+=roleCard(r,i,keep)});
 if(!list.length)h='<div class="card">'+(st.onlySaved&&!nSaved()?'You have not saved any roles yet. Use the heart on a role to keep it here.':(ROLES.length?'No roles match those filters.':'We have no open roles right now. Please check back soon.'))+(ROLES.length?' <a style="color:#5170FF;cursor:pointer" data-clear="all">Clear the filters</a>':'')+'</div>';
 $('rolelist').innerHTML=h;
 document.querySelectorAll('#mapcard .pin').forEach(function(p){var c=p.getAttribute('data-c');p.setAttribute('class','pin'+(st.focus===c?' on':'')+(st.focus&&st.focus!==c?' dim':''))});
 var l='';Object.keys(CITIES).filter(function(c){return !CITIES[c].nomap}).forEach(function(c){var n=ROLES.filter(function(r){return r.city===c&&baseMatches(r,'loc')}).length;
  l+='<button class="loc'+(st.focus===c?' on':'')+'" type="button" data-loc="'+c+'"><div><h3>'+CITIES[c].full+'</h3><small>'+CITIES[c].region+' &middot; zoom to city</small></div><span class="n">'+n+'</span></button>'});
 $('locs').innerHTML=l;
 var cc=$('mcity');
 if(st.focus){var rs=ROLES.filter(function(r){return r.city===st.focus});cc.innerHTML='<h3>'+CITIES[st.focus].full+'</h3><small>'+rs.length+' open role'+(rs.length===1?'':'s')+'</small>'+rs.map(function(r){return '<button type="button" class="mr" data-r="'+r.id+'"><span>'+esc(r.t)+'</span><span>&rarr;</span></button>'}).join('')+'<button type="button" class="lnk" data-world="1">&larr; Whole world</button><button type="button" class="lnk" data-listcity="1">Filter the list &darr;</button>';cc.className='mcity show'}
 else{cc.className='mcity'}
 if(MAPS.home)MAPS.home.sync(st.focus);
 document.querySelectorAll('.team').forEach(function(t){t.className='team'+(st.dept===t.getAttribute('data-team')?' on':'')});
 var fl=$('fl'),fd=$('fd'),fm=$('fm');fl.value=st.loc;fd.value=st.dept;fm.value=st.mode;
 var soon=ROLES.slice().sort(function(a,b){return daysLeft(a)-daysLeft(b)})[0],nc=Object.keys(CITIES).filter(function(c){return !CITIES[c].nomap}).length;
 $('ticker').textContent=soon?ROLES.length+' open role'+(ROLES.length===1?'':'s')+(nc?' in '+nc+' '+(nc===1?'city':'cities'):'')+' · next closing: '+soon.t+' ('+daysLeft(soon)+' days)':'No open roles right now. Check back soon.';
 $('areas').innerHTML=AREAS.map(function(x){var on=st.areas[x.k];return '<button type="button" class="sk'+(on?' on':'')+'" data-area="'+x.k+'" aria-pressed="'+(on?'true':'false')+'"><span class="box">'+(on?'&#10003;':'')+'</span>'+x.l+'</button>'}).join('');
 var any=AREAS.some(function(x){return st.areas[x.k]});
 if(!any)$('best').innerHTML='<span class="soft">Pick one or more areas to rank the roles.</span>';
 else{var top=ROLES.map(function(r){return {r:r,s:scoreOf(r).pct}}).sort(function(a,b){return b.s-a.s})[0]||{s:0};$('best').innerHTML=top.s?'Best fit: <b style="color:#003A7D">'+esc(top.r.t)+'</b> in '+esc(locOf(top.r))+' ('+top.s+'% of its key skills). <a style="color:#5170FF;cursor:pointer" data-go="roles">See the ranked roles</a> &middot; <a style="color:#5170FF;cursor:pointer" data-area="none">Clear</a>':'No role lists those skills yet. Try another area, or register your interest.'}
 var sn=$('savedn');if(sn){sn.textContent=nSaved();$('savedlink').className='sv'+(st.onlySaved?' on':'')}

}
function hlCity(c,on){
 document.querySelectorAll('#mapcard .pin').forEach(function(p){if(p.getAttribute('data-c')===c)p.classList.toggle('hl',on)});
 document.querySelectorAll('.loc').forEach(function(p){if(p.getAttribute('data-loc')===c)p.classList.toggle('hl',on)});
}
function showTip(c,pinEl){
 var tip=$('tip'),card=$('mapcard');if(!tip)return;
 var rs=ROLES.filter(function(r){return r.city===c});
 tip.innerHTML='<b>'+CITIES[c].full+'</b>'+rs.length+' open role'+(rs.length===1?'':'s')+':<br>'+rs.map(function(r){return '&bull; '+esc(r.t)}).join('<br>');
 var a=pinEl.getBoundingClientRect(),b=card.getBoundingClientRect();
 var x=a.left-b.left+a.width/2+14,y=a.top-b.top-10;
 if(x+240>b.width)x=a.left-b.left-250;
 tip.style.left=Math.max(6,x)+'px';tip.style.top=Math.max(6,y)+'px';tip.className='tip show';
}
function goTo(id){var e=$(id);if(e)e.scrollIntoView({behavior:'smooth',block:'start'})}
function setFilter(k,v,scroll){st[k]=v;updateHome();if(scroll)goTo('roles')}

/* ---------- role page ---------- */
function pickedOf(r){return st.picked[r.id]||(st.picked[r.id]={})}
function meterOf(r){var wt={P:3,S:2,T:1},tot=0,got=0,pk=pickedOf(r),n=0;r.skills.forEach(function(s){tot+=wt[s.t];if(pk[s.l]){got+=wt[s.t];n++}});return {pct:tot?Math.round(got/tot*100):0,n:n,total:r.skills.length}}
function roleView(){
 var gen=st.role==='general';
 var r=gen?{id:'general',t:'Register your interest',city:'',dept:'',mode:'',type:'',opp:'',doit:[],must:[],nice:[],skills:[]}:roleById(st.role);
 var h='<div class="gold"></div><div class="top"><div class="nav"><a id="nav1" href="'+BASE+'">&larr; Careers</a></div>'+logo()+'<div class="prog" id="progi"></div></div><div class="wrap" style="padding-top:26px">';
 h+='<div class="crumb"><a id="back" href="'+BASE+'#roles">&larr; All open roles</a></div><div class="detail"><div>';
 h+='<div class="card flush rv"><div class="rhead"><div class="eb">'+(gen?'GENERAL APPLICATION':'NOW HIRING')+'</div><h1>'+esc(r.t)+'</h1><div class="chips" style="margin-top:10px"><span class="chip">&#9679;&nbsp;'+esc(gen?'Any location':locOf(r))+'</span>'+(r.dept?'<span class="chip">'+esc(r.dept)+'</span><span class="chip">'+esc(r.mode)+'</span><span class="chip">'+esc(r.type)+'</span><span class="chip soon">'+closeTxt(r)+'</span>':'')+'</div>'+(gen?'':'<div class="acts"><button class="heart'+(st.saved[r.id]?' on':'')+'" id="rsave" type="button" aria-label="Save this role">'+heartSvg()+'</button><button class="btn ghost" id="share" type="button" style="padding:7px 14px;font-size:12px;border-color:rgba(255,255,255,.5);color:#fff">Share</button></div>')+'</div><div class="titlebox" style="padding-top:6px">';
 if(!gen){
  h+='<div class="skidx" style="border-top:0;margin-top:0"><h2>Key skills</h2><div class="soft">The skills we are looking for, most important first.'+(FORM?' Tick the ones you have to see how you match. This is a self-check; we review every application.':'')+'</div>';
  [['P','Essential'],['S','Strong plus'],['T','Nice to have']].forEach(function(g){var items=r.skills.filter(function(s){return s.t===g[0]});if(!items.length)return;
   h+='<div class="skrow"><span class="lab">'+g[1]+'</span><div class="chs">'+items.map(function(s){var on=pickedOf(r)[s.l];if(!FORM)return '<span class="sk'+(s.t==='P'?' p':'')+'">'+esc(s.l)+(s.m?' <em>Must-have</em>':'')+'</span>';return '<button type="button" class="sk'+(s.t==='P'?' p':'')+(on?' on':'')+'" data-sk="'+esc(s.l)+'" aria-pressed="'+(on?'true':'false')+'"><span class="box">'+(on?'&#10003;':'')+'</span>'+esc(s.l)+(s.m?' <em>Must-have</em>':'')+'</button>'}).join('')+'</div></div>'});
  if(FORM)h+='<div class="meter" id="meter"></div>';h+='</div>';
 }
 h+='</div></div>';
 if(gen){h+='<div class="card rv"><h2>Tell us about you</h2><p style="margin:0">We cannot promise a role, but we read every submission and contact people when something fits.</p></div>'}
 else{
  h+='<div class="card rv"><h2>The opportunity</h2><p style="margin:0">'+esc(r.opp)+'</p></div>';
  h+='<div class="card rv"><h2>What you will do</h2><ul>'+r.doit.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>';
  h+='<div class="card rv"><h2>What you will bring</h2><span class="tag m">MUST-HAVES</span><ul>'+r.must.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul><span class="tag n">NICE-TO-HAVES</span><ul>'+r.nice.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>';
  if(r.about)h+='<div class="card rv"><h2>About Janus Digital</h2><p style="margin:0">'+esc(r.about)+'</p></div>';
  if(r.why)h+='<div class="card rv"><h2>Why join Janus Digital</h2><p style="margin:0">'+esc(r.why)+'</p></div>';
  h+='<div class="card rv" style="background:#FDF2D0;border-left:4px solid #F5C518"><h2>What happens next</h2><p style="margin:0">We review every application. If it is a fit we invite you to an intro call, then interviews. We tell every candidate the outcome.</p></div>';
  var sim=ROLES.filter(function(x){return x.id!==r.id&&(x.city===r.city||x.dept===r.dept)}).slice(0,3);
  if(sim.length)h+='<div class="card rv"><h2>Similar roles</h2><div class="sim">'+sim.map(function(x){return '<button type="button" data-r="'+x.id+'"><span>'+esc(x.t)+'<br><small>'+esc(locOf(x))+' &middot; '+esc(x.dept)+'</small></span><span>&rarr;</span></button>'}).join('')+'</div></div>';
 }
 h+='</div><div class="side"><div class="card">';
 if(st.applied){h+='<div class="ok"><h2>Application received</h2><p style="margin:8px 0 0">Thank you. We have sent a confirmation to your email and our recruiting team will be in touch.</p></div><p style="margin:14px 0 0"><button class="btn ghost" id="back2" type="button">See other roles</button></p>'}
 else if(!FORM){h+=linkCard(r)}
 else{
  if(!gen&&!CITIES[r.city].nomap)h+='<div class="minimap"><div class="mapv" id="minimap"></div></div>';
  h+='<h2 style="margin-bottom:4px">'+(gen?'Register your interest':'Apply for this role')+'</h2>';
  if(!gen)h+='<div class="facts"><div><span>Location</span><b>'+esc(locOf(r))+'</b></div><div><span>Work model</span><b>'+esc(r.mode)+'</b></div><div><span>Applications close</span><b>'+esc(fmtDate(r))+'</b></div></div>';
  h+='<div class="form"><div class="f"><label class="l" for="a1">Full name *</label><input type="text" id="a1"><div class="err" id="e1"></div></div>';
  h+='<div class="f"><label class="l" for="a2">Email *</label><input type="email" id="a2"><div class="err" id="e2"></div></div>';
  h+='<div class="two"><div class="f"><label class="l" for="a3">Phone / WhatsApp</label><input type="tel" id="a3"></div><div class="f"><label class="l" for="a4">Current location</label><input type="text" id="a4"></div></div>';
  h+='<div class="f"><label class="l" for="a5">LinkedIn profile</label><input type="text" id="a5" placeholder="Optional"></div>';
  h+='<div class="f"><label class="l">CV *</label><div class="drop'+(st.cv?' has':'')+'" id="drop" tabindex="0" role="button">'+(st.cv?esc(st.cv.name)+' attached. Click to change.':'Click to attach your CV (PDF or Word, up to 5 MB)')+'</div><input type="file" id="cvf" accept=".pdf,.doc,.docx,.rtf,.txt" hidden><div class="err" id="e3"></div></div>';
  if(!gen)r.questions.forEach(function(q,k){h+='<div class="f"><label class="l" for="q'+k+'">'+esc(q.q)+' *</label>'+(q.kind==='text'?'<input type="text" id="q'+k+'" maxlength="200">':'<select id="q'+k+'"><option value="">Select</option><option>Yes</option><option>No</option></select>')+'<div class="err" id="eq'+k+'"></div></div>'});
  if(!gen)h+='<div class="soft" id="skline" style="margin-bottom:12px"></div>';
  h+='<div class="f"><label style="font-size:12.5px;display:flex;gap:8px;align-items:flex-start"><input type="checkbox" id="a7" style="margin-top:3px"><span>I agree that Janus Digital may store my details to consider me for this and future roles. *</span></label><div class="err" id="e5"></div></div>';
  h+='<div style="position:absolute;left:-9999px;height:0;overflow:hidden" aria-hidden="true"><label>Leave this empty<input type="text" id="hp" tabindex="-1" autocomplete="off"></label></div>';
  h+='<div class="fprog" id="fprog"><span class="soft" id="fpt"></span><div class="bar"><i id="fpb"></i></div></div>';
  h+='<div class="err" id="esub" style="margin:0 0 8px"></div><button class="btn gold" id="submit" type="button" style="width:100%">Submit application</button></div>';
 }
 h+='</div></div></div></div>'+foot();
 return h;
}
function applyHref(r){
 if(APPLY.link){var u=APPLY.link+(APPLY.link.indexOf('?')>=0?'&':'?')+'role='+encodeURIComponent(r.aid||r.id)+'&src=site';return u}
 if(r.mail||APPLY.mail)return 'mailto:'+(r.mail||APPLY.mail)+'?subject='+encodeURIComponent('Application: '+r.t);
 return '#'}
function linkCard(r){
 var h='';if(!CITIES[r.city].nomap)h+='<div class="minimap"><div class="mapv" id="minimap"></div></div>';
 h+='<h2 style="margin-bottom:4px">Apply for this role</h2><div class="facts"><div><span>Location</span><b>'+esc(locOf(r))+'</b></div><div><span>Work model</span><b>'+esc(r.mode)+'</b></div><div><span>Applications close</span><b>'+esc(fmtDate(r))+'</b></div></div>';
 h+='<a class="btn gold" style="width:100%;margin-top:6px" href="'+esc(applyHref(r))+'" rel="noopener">Apply now</a><p class="soft" style="margin:12px 0 0">You will upload your CV and answer a few short questions. We review every application and tell every candidate the outcome.</p>';
 return h}
function updateMeter(){
 var r=roleById(st.role);if(!r||!$('meter'))return;var m=meterOf(r);
 var msg=m.n===0?'Tick the skills you have.':(m.pct>=70?'Strong match':(m.pct>=40?'Good match':'Partial match, you are still welcome to apply'));
 $('meter').className='meter'+(m.pct>=70?' hi':'');
 $('meter').innerHTML='<b style="font-family:Poppins,Arial,sans-serif;color:#003A7D">'+msg+'</b> <small>'+m.n+' of '+m.total+' key skills ticked</small><div class="bar"><i style="width:'+m.pct+'%"></i></div>';
 if($('skline'))$('skline').textContent=m.n?('Skills you ticked ('+m.n+' of '+m.total+') will be shared with your application.'):'Tick your skills above to share them with your application.';
}
function fprog(){
 if(!$('a1'))return;
 var items=[$('a1').value.trim(),/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('a2').value.trim()),st.cv,$('a7').checked];
 var rq=roleById(st.role);if(rq)rq.questions.forEach(function(q,k){if($('q'+k))items.push($('q'+k).value.trim())});
 var d=items.filter(Boolean).length;
 $('fpt').textContent=d+' of '+items.length+' required fields done';
 $('fpb').style.width=(d/items.length*100)+'%';
 $('fprog').className='fprog'+(d===items.length?' full':'');
}

/* ---------- wiring ---------- */
var io=null;
function observe(){
 if(io)io.disconnect();
 var els=document.querySelectorAll('.rv,.stat b[data-to]');
 if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');count(e)});return}
 io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');count(e.target);io.unobserve(e.target)}})},{threshold:.12});
 els.forEach(function(e){io.observe(e)});
}
function count(e){
 var to=e.getAttribute&&e.getAttribute('data-to');if(!to)return;to=+to;var suf=e.getAttribute('data-suf')||'',t0=null;
 if(REDUCE){e.textContent=to.toLocaleString('en-GB')+suf;return}
 function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/1100);e.textContent=Math.round(to*(1-Math.pow(1-p,3))).toLocaleString('en-GB')+suf;if(p<1)requestAnimationFrame(step)}
 requestAnimationFrame(step);
}
function onScroll(){
 var y=window.pageYOffset||0,hh=document.documentElement.scrollHeight-window.innerHeight,pi=$('progi');
 if(pi)pi.style.width=(hh>0?y/hh*100:0)+'%';
 var cur='';['where','match','teams','roles','how'].forEach(function(id){var e=$(id);if(e&&e.getBoundingClientRect().top<180)cur=id});
 document.querySelectorAll('.top .nav a[data-go]').forEach(function(a){a.classList.toggle('cur',a.getAttribute('data-go')===cur)});
 var sl=$('slides');if(sl&&y<900)sl.style.setProperty('--sy',(y*.07).toFixed(1)+'px');
}
window.addEventListener('scroll',onScroll,{passive:true});
function persistSaved(){try{localStorage.setItem('jd_saved',JSON.stringify(Object.keys(st.saved).filter(function(k){return st.saved[k]})))}catch(e){}}
function loadSaved(){try{(JSON.parse(localStorage.getItem('jd_saved')||'[]')||[]).forEach(function(k){if(roleById(k))st.saved[k]=true})}catch(e){}}
function toggleSave(id){st.saved[id]=!st.saved[id];persistSaved();if(!st.role)updateHome(true)}
function openRole(id){var r=roleById(id);if(r)location.href=BASE+'jobs/'+r.id+'/'}
function draw(){
 Object.keys(TM).forEach(function(k){clearInterval(TM[k])});TM={};MAPS={};
 var el=$('app');
 el.innerHTML=st.role?roleView():pubHome();
 bind();onScroll();
}
function startHero(){
 var sl=$('slides'),hero=$('hero'),i=0,paused=false;if(!sl)return;
 function show(n){i=n;sl.querySelectorAll('.sl').forEach(function(x,k){x.className='sl'+(k===n?' on':'')});sl.querySelectorAll('.sdots button').forEach(function(x,k){x.className=k===n?'on':'';if(k===n){x.style.animation='none';void x.offsetWidth;x.style.animation=''}})}
 sl.showSlide=show;
 sl.onmouseenter=function(){paused=true;sl.classList.add('pause')};sl.onmouseleave=function(){paused=false;sl.classList.remove('pause')};
 if(!REDUCE)TM.slide=setInterval(function(){if(!paused)show((i+1)%3)},5500);
 hero.onmousemove=function(e){var r=hero.getBoundingClientRect();sl.style.setProperty('--px',((e.clientX-r.left)/r.width-.5)*-16+'px');sl.style.setProperty('--py',((e.clientY-r.top)/r.height-.5)*-10+'px')};
 var w=0,rot=$('rot');
 if(!REDUCE)TM.rot=setInterval(function(){rot.className='out';setTimeout(function(){w=(w+1)%HERO_WORDS.length;rot.textContent=HERO_WORDS[w];rot.className=''},260)},3200);
}
function startSteps(){
 setStep(st.step||0);
 if(!REDUCE)TM.step=setInterval(function(){if(!st.stepHold)setStep(((st.step||0)+1)%STEPS.length)},4500);
}
window.__mapReset=function(){st.focus='';updateHome(true);if(MAPS.home)MAPS.home.reset()};
function bind(){
 if(!st.role){
  MAPS.home=WorldMap($('mapv'));
  updateHome(true);
  MAPS.home.sync(st.focus,true);
  observe();startHero();startSteps();
  ['q','fl','fd','fm'].forEach(function(id){var n=$(id);n.oninput=n.onchange=function(){st.q=$('q').value;st.loc=$('fl').value;st.dept=$('fd').value;st.mode=$('fm').value;st.focus=st.loc;updateHome(true)}});
  var app=$('app');
  app.onclick=function(e){
   var t=e.target;
   var sv=t.closest('[data-save]');if(sv){toggleSave(sv.getAttribute('data-save'));return}
   var sl=t.closest('#savedlink');if(sl){st.onlySaved=!st.onlySaved;updateHome(true);goTo('roles');return}
   var cl=t.closest('[data-clear]');if(cl){var k=cl.getAttribute('data-clear');if(k==='all'){st.q='';st.loc='';st.dept='';st.mode='';st.onlySaved=false;$('q').value=''}else if(k==='saved'){st.onlySaved=false}else{st[k]='';if(k==='q')$('q').value=''}updateHome(true);return}
   var ar=t.closest('[data-area]');if(ar){var ak=ar.getAttribute('data-area');if(ak==='none')st.areas={};else st.areas[ak]=!st.areas[ak];updateHome(false);return}
   var wd=t.closest('[data-world]');if(wd){st.focus='';updateHome(true);return}
   var lcf=t.closest('[data-listcity]');if(lcf){st.loc=st.focus;updateHome(true);goTo('roles');return}
   var rl=t.closest('[data-r]');if(rl){openRole(rl.getAttribute('data-r'));return}
   var gl=t.closest('[data-go]');if(gl){goTo(gl.getAttribute('data-go'));return}
   var lc=t.closest('[data-loc]');if(lc){var c=lc.getAttribute('data-loc');st.focus=st.focus===c?'':c;updateHome(true);return}
   var pn=t.closest('.pin,.hic');if(pn){var c2=pn.getAttribute('data-c');st.focus=st.focus===c2?'':c2;updateHome(true);return}
   var tm=t.closest('[data-team]');if(tm){var d=tm.getAttribute('data-team');st.dept=st.dept===d?'':d;updateHome(true);goTo('roles');return}
   var sp=t.closest('[data-step]');if(sp){st.stepHold=true;setStep(+sp.getAttribute('data-step'));return}
   var sd=t.closest('[data-slide]');if(sd){var s=$('slides');if(s&&s.showSlide)s.showSlide(+sd.getAttribute('data-slide'));return}
   var pk=t.closest('[data-peek]');if(pk){var id=pk.getAttribute('data-peek');st.open=st.open===id?null:id;updateHome(true);return}
  };
  app.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){var rl=e.target.closest&&e.target.closest('.pin,.role');if(rl&&e.target===rl){e.preventDefault();rl.click()}}};
  app.onmouseover=function(e){var pn=e.target.closest&&e.target.closest('.pin,.hic');if(pn){showTip(pn.getAttribute('data-c'),pn);hlCity(pn.getAttribute('data-c'),true)}var rl=e.target.closest&&e.target.closest('.role');if(rl)hlCity(rl.getAttribute('data-c'),true);var lc=e.target.closest&&e.target.closest('.loc');if(lc)hlCity(lc.getAttribute('data-loc'),true)};
  app.onmouseout=function(e){document.querySelectorAll('.pin.hl,.loc.hl').forEach(function(x){x.classList.remove('hl')});var t=$('tip');if(t)t.className='tip'};
  return;
 }
 var r0=st.role==='general'?null:roleById(st.role);
 if(r0&&$('minimap')&&!CITIES[r0.city].nomap)MAPS.mini=WorldMap($('minimap'),{only:r0.city,static:true,asp:.62,w:80});
 observe();
 var b=$('back');if(b)b.onclick=function(){location.href=BASE};
 var n1=$('nav1');if(n1)n1.onclick=function(){location.href=BASE};
 var b2=$('back2');if(b2)b2.onclick=function(){location.href=BASE};
 document.querySelectorAll('[data-r]').forEach(function(n){n.onclick=function(){openRole(n.getAttribute('data-r'))}});
 var rs=$('rsave');if(rs)rs.onclick=function(){st.saved[st.role]=!st.saved[st.role];persistSaved();rs.className='heart'+(st.saved[st.role]?' on':'')};
 var sh=$('share');if(sh)sh.onclick=function(){var link=location.href.split('#')[0],done=function(){sh.textContent='Link copied';setTimeout(function(){sh.textContent='Share'},1800)};
  try{navigator.clipboard.writeText(link).then(done,function(){window.prompt('Copy this link',link)})}catch(e){window.prompt('Copy this link',link)}};
 var dr=$('drop'),cvf=$('cvf');
 var keepForm=function(){var ids=['a1','a2','a3','a4','a5','hp'].concat(ROLES.length&&roleById(st.role)?roleById(st.role).questions.map(function(q,k){return 'q'+k}):[]),keep=ids.map(function(i){return $(i)?$(i).value:''}),ck=$('a7').checked;draw();ids.forEach(function(i,k){if($(i))$(i).value=keep[k]});$('a7').checked=ck;fprog()};
 if(dr&&cvf){dr.onclick=function(){cvf.click()};dr.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();cvf.click()}};
  cvf.onchange=function(){var f=cvf.files&&cvf.files[0];if(!f)return;var ext=(f.name.split('.').pop()||'').toLowerCase();
   if(['pdf','doc','docx','rtf','txt'].indexOf(ext)<0){$('e3').textContent='Please attach a PDF or Word file.';return}
   if(f.size>5*1024*1024){$('e3').textContent='That file is larger than 5 MB. Please attach a smaller one.';return}
   var rd=new FileReader();rd.onload=function(){st.cv={name:f.name,b64:String(rd.result).split(',')[1]||''};keepForm()};rd.onerror=function(){$('e3').textContent='Could not read that file. Please try again.'};rd.readAsDataURL(f)}}
 var fm=document.querySelector('.form');if(fm){fm.addEventListener('input',fprog);fm.addEventListener('change',fprog)}
 document.querySelectorAll('.sk[data-sk]').forEach(function(s){s.onclick=function(){var r=roleById(st.role),pk=pickedOf(r),l=s.getAttribute('data-sk');pk[l]=!pk[l];s.className=s.className.replace(/ on\b/,'')+(pk[l]?' on':'');s.setAttribute('aria-pressed',pk[l]?'true':'false');s.querySelector('.box').innerHTML=pk[l]?'&#10003;':'';updateMeter()}});
 updateMeter();fprog();
 var sb=$('submit');if(sb)sb.onclick=function(){
  var r=roleById(st.role),ok=true,set=function(id,msg){$(id).textContent=msg;if(msg)ok=false};
  set('e1',$('a1').value.trim()?'':'Enter your name');
  set('e2',/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('a2').value.trim())?'':'Enter a valid email address');
  set('e3',st.cv?'':'Attach your CV');
  r.questions.forEach(function(q,k){set('eq'+k,$('q'+k).value.trim()?'':'Please answer this question')});
  set('e5',$('a7').checked?'':'Please tick to continue');
  $('esub').textContent='';
  if(!ok||st.sending)return;
  st.sending=true;sb.disabled=true;sb.textContent='Sending...';
  var picked=pickedOf(r),payload={pid:r.pid,role:r.aid||r.id,name:$('a1').value,email:$('a2').value,phone:$('a3').value,location:$('a4').value,linkedin:$('a5').value,
   skills:r.skills.filter(function(s){return picked[s.l]}).map(function(s){return s.l}),
   answers:r.questions.map(function(q,k){return {id:q.id,a:$('q'+k).value}}),consent:$('a7').checked,hp:$('hp')?$('hp').value:'',cv:{name:st.cv.name,b64:st.cv.b64}};
  sendApplication(payload,function(){st.sending=false;st.applied=true;st.cv=null;window.scrollTo(0,0);draw()},function(m){st.sending=false;sb.disabled=false;sb.textContent='Submit application';$('esub').textContent=m||'Something went wrong. Please try again.'});
 };
}
function sendApplication(payload,ok,fail){
 var done=false,fin=function(f,a){if(done)return;done=true;f(a)};
 try{fetch(APPLY.endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)})
  .then(function(r){return r.json()}).then(function(j){if(j&&j.ok)fin(ok);else fin(fail,String(j&&j.error||''))})
  .catch(function(){fin(fail,'We could not send your application. Please try again, or use the Apply link: '+(APPLY.link||''))})}catch(e){fin(fail,'We could not send your application. Please try again.')}
}
function boot(res){
 BASE_URL=res.url||'';APPLY=res.apply||{};FORM=!!APPLY.endpoint;SITE=res.site||SITE;adaptRoles(res.roles,res.today);loadSaved();
 if(DEEP){if(roleById(DEEP)){st.role=DEEP}else{st.notice='That role is no longer open. Here is what is open now.'}}
 draw();
}
function bootFail(){$('app').innerHTML='<div class="wrap" style="padding:90px 16px;text-align:center"><h2 class="sec-t">We could not load the roles</h2><p class="sec-s">Please refresh the page in a moment.</p></div>'}
$('app').innerHTML='<div class="wrap" style="padding:90px 16px;text-align:center"><p class="sec-s">Loading open roles...</p></div>';
if(window.JD_DATA){try{boot(window.JD_DATA)}catch(e){bootFail();if(window.console)console.error(e)}}else{bootFail()}