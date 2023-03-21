class T{constructor(e){this.properties=e??[]}get(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.value);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,n){const r=this.get(e);if(r!==void 0){if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,n){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}getType(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.type);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}}const U="https://unpkg.com/@workadventure/scripting-api-extra@1.4.6/dist";class oe{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new T(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function q(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(U+"/configuration.html"+e)}async function se(t,e){const n=await WA.room.getTiledMap(),r=new Map;return Y(n.layers,r,t,e),r}function Y(t,e,n,r){for(const o of t)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(n&&o.name!==n||r&&!r.includes(s.name))continue;e.set(s.name,new oe(s))}}else o.type==="group"&&Y(o.layers,e,n,r)}let V;async function k(){return V===void 0&&(V=ae()),V}async function ae(){return ie(await WA.room.getTiledMap())}function ie(t){const e=new Map;return Z(t.layers,"",e),e}function Z(t,e,n){for(const r of t)r.type==="group"?Z(r.layers,e+r.name+"/",n):(r.name=e+r.name,n.set(r.name,r))}async function ue(){const t=await k(),e=[];for(const n of t.values())if(n.type==="objectgroup")for(const r of n.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function ce(t){let e=1/0,n=1/0,r=0,o=0;const s=t.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<t.height;a++)for(let i=0;i<t.width;i++)s[i+a*t.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),n=Math.min(n,a),r=Math.max(r,a));return{top:n,left:e,right:o+1,bottom:r+1}}function Q(t){let e=1/0,n=1/0,r=0,o=0;for(const s of t){const a=ce(s);a.left<e&&(e=a.left),a.top<n&&(n=a.top),a.right>o&&(o=a.right),a.bottom>r&&(r=a.bottom)}return{top:n,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var le=Object.prototype.toString,C=Array.isArray||function(e){return le.call(e)==="[object Array]"};function _(t){return typeof t=="function"}function fe(t){return C(t)?"array":typeof t}function I(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function z(t,e){return t!=null&&typeof t=="object"&&e in t}function pe(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var ge=RegExp.prototype.test;function he(t,e){return ge.call(t,e)}var de=/\S/;function ye(t){return!he(de,t)}var ve={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function me(t){return String(t).replace(/[&<>"'`=\/]/g,function(n){return ve[n]})}var be=/\s*/,Ae=/\s+/,F=/\s*=/,we=/\s*\}/,We=/#|\^|\/|>|\{|&|=|!/;function Se(t,e){if(!t)return[];var n=!1,r=[],o=[],s=[],a=!1,i=!1,u="",l=0;function f(){if(a&&!i)for(;s.length;)delete o[s.pop()];else s=[];a=!1,i=!1}var d,v,j;function M(b){if(typeof b=="string"&&(b=b.split(Ae,2)),!C(b)||b.length!==2)throw new Error("Invalid tags: "+b);d=new RegExp(I(b[0])+"\\s*"),v=new RegExp("\\s*"+I(b[1])),j=new RegExp("\\s*"+I("}"+b[1]))}M(e||h.tags);for(var c=new B(t),m,g,y,P,G,A;!c.eos();){if(m=c.pos,y=c.scanUntil(d),y)for(var x=0,re=y.length;x<re;++x)P=y.charAt(x),ye(P)?(s.push(o.length),u+=P):(i=!0,n=!0,u+=" "),o.push(["text",P,m,m+1]),m+=1,P===`
`&&(f(),u="",l=0,n=!1);if(!c.scan(d))break;if(a=!0,g=c.scan(We)||"name",c.scan(be),g==="="?(y=c.scanUntil(F),c.scan(F),c.scanUntil(v)):g==="{"?(y=c.scanUntil(j),c.scan(we),c.scanUntil(v),g="&"):y=c.scanUntil(v),!c.scan(v))throw new Error("Unclosed tag at "+c.pos);if(g==">"?G=[g,y,m,c.pos,u,l,n]:G=[g,y,m,c.pos],l++,o.push(G),g==="#"||g==="^")r.push(G);else if(g==="/"){if(A=r.pop(),!A)throw new Error('Unopened section "'+y+'" at '+m);if(A[1]!==y)throw new Error('Unclosed section "'+A[1]+'" at '+m)}else g==="name"||g==="{"||g==="&"?i=!0:g==="="&&M(y)}if(f(),A=r.pop(),A)throw new Error('Unclosed section "'+A[1]+'" at '+c.pos);return Me(Ce(o))}function Ce(t){for(var e=[],n,r,o=0,s=t.length;o<s;++o)n=t[o],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(e.push(n),r=n));return e}function Me(t){for(var e=[],n=e,r=[],o,s,a=0,i=t.length;a<i;++a)switch(o=t[a],o[0]){case"#":case"^":n.push(o),r.push(o),n=o[4]=[];break;case"/":s=r.pop(),s[5]=o[2],n=r.length>0?r[r.length-1][4]:e;break;default:n.push(o)}return e}function B(t){this.string=t,this.tail=t,this.pos=0}B.prototype.eos=function(){return this.tail===""};B.prototype.scan=function(e){var n=this.tail.match(e);if(!n||n.index!==0)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};B.prototype.scanUntil=function(e){var n=this.tail.search(e),r;switch(n){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=r.length,r};function S(t,e){this.view=t,this.cache={".":this.view},this.parent=e}S.prototype.push=function(e){return new S(e,this)};S.prototype.lookup=function(e){var n=this.cache,r;if(n.hasOwnProperty(e))r=n[e];else{for(var o=this,s,a,i,u=!1;o;){if(e.indexOf(".")>0)for(s=o.view,a=e.split("."),i=0;s!=null&&i<a.length;)i===a.length-1&&(u=z(s,a[i])||pe(s,a[i])),s=s[a[i++]];else s=o.view[e],u=z(o.view,e);if(u){r=s;break}o=o.parent}n[e]=r}return _(r)&&(r=r.call(this.view)),r};function p(){this.templateCache={_cache:{},set:function(e,n){this._cache[e]=n},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}p.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};p.prototype.parse=function(e,n){var r=this.templateCache,o=e+":"+(n||h.tags).join(":"),s=typeof r<"u",a=s?r.get(o):void 0;return a==null&&(a=Se(e,n),s&&r.set(o,a)),a};p.prototype.render=function(e,n,r,o){var s=this.getConfigTags(o),a=this.parse(e,s),i=n instanceof S?n:new S(n,void 0);return this.renderTokens(a,i,r,e,o)};p.prototype.renderTokens=function(e,n,r,o,s){for(var a="",i,u,l,f=0,d=e.length;f<d;++f)l=void 0,i=e[f],u=i[0],u==="#"?l=this.renderSection(i,n,r,o,s):u==="^"?l=this.renderInverted(i,n,r,o,s):u===">"?l=this.renderPartial(i,n,r,s):u==="&"?l=this.unescapedValue(i,n):u==="name"?l=this.escapedValue(i,n,s):u==="text"&&(l=this.rawValue(i)),l!==void 0&&(a+=l);return a};p.prototype.renderSection=function(e,n,r,o,s){var a=this,i="",u=n.lookup(e[1]);function l(v){return a.render(v,n,r,s)}if(u){if(C(u))for(var f=0,d=u.length;f<d;++f)i+=this.renderTokens(e[4],n.push(u[f]),r,o,s);else if(typeof u=="object"||typeof u=="string"||typeof u=="number")i+=this.renderTokens(e[4],n.push(u),r,o,s);else if(_(u)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");u=u.call(n.view,o.slice(e[3],e[5]),l),u!=null&&(i+=u)}else i+=this.renderTokens(e[4],n,r,o,s);return i}};p.prototype.renderInverted=function(e,n,r,o,s){var a=n.lookup(e[1]);if(!a||C(a)&&a.length===0)return this.renderTokens(e[4],n,r,o,s)};p.prototype.indentPartial=function(e,n,r){for(var o=n.replace(/[^ \t]/g,""),s=e.split(`
`),a=0;a<s.length;a++)s[a].length&&(a>0||!r)&&(s[a]=o+s[a]);return s.join(`
`)};p.prototype.renderPartial=function(e,n,r,o){if(r){var s=this.getConfigTags(o),a=_(r)?r(e[1]):r[e[1]];if(a!=null){var i=e[6],u=e[5],l=e[4],f=a;u==0&&l&&(f=this.indentPartial(a,l,i));var d=this.parse(f,s);return this.renderTokens(d,n,r,f,o)}}};p.prototype.unescapedValue=function(e,n){var r=n.lookup(e[1]);if(r!=null)return r};p.prototype.escapedValue=function(e,n,r){var o=this.getConfigEscape(r)||h.escape,s=n.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===h.escape?String(s):o(s)};p.prototype.rawValue=function(e){return e[1]};p.prototype.getConfigTags=function(e){return C(e)?e:e&&typeof e=="object"?e.tags:void 0};p.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!C(e))return e.escape};var h={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){R.templateCache=t},get templateCache(){return R.templateCache}},R=new p;h.clearCache=function(){return R.clearCache()};h.parse=function(e,n){return R.parse(e,n)};h.render=function(e,n,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+fe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return R.render(e,n,r,o)};h.escape=me;h.Scanner=B;h.Context=S;h.Writer=p;class ee{constructor(e,n){this.template=e,this.state=n,this.ast=h.parse(e)}getValue(){return this.value===void 0&&(this.value=h.render(this.template,this.state)),this.value}onChange(e){const n=[];for(const r of this.getUsedVariables().values())n.push(this.state.onVariableChange(r).subscribe(()=>{const o=h.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of n)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,n){for(const r of e){const o=r[0],s=r[1],a=r[4];["name","&","#","^"].includes(o)&&n.add(s),a!==void 0&&typeof a!="string"&&this.recursiveGetUsedVariables(a,n)}}}async function Pe(){var t;const e=await ue();for(const n of e){const r=(t=n.properties)!==null&&t!==void 0?t:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new ee(o.value,WA.state);if(s.isPureString())continue;const a=s.getValue();await $(n.name,o.name,a),s.onChange(async i=>{await $(n.name,o.name,i)})}}}async function Le(){var t;const e=await k();for(const[n,r]of e.entries())if(r.type!=="objectgroup"){const o=(t=r.properties)!==null&&t!==void 0?t:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const a=new ee(s.value,WA.state);if(a.isPureString())continue;const i=a.getValue();H(n,s.name,i),a.onChange(u=>{H(n,s.name,u)})}}}async function $(t,e,n){console.log(t),(await WA.room.area.get(t)).setProperty(e,n)}function H(t,e,n){WA.room.setProperty(t,e,n),e==="visible"&&(n?WA.room.showLayer(t):WA.room.hideLayer(t))}let O,D=0,N=0;function J(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.showLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.hideLayer(n)}else{let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.hideLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.showLayer(n)}}function Ee(t){const e=t.properties.getString("openSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=ne(t.properties.mustGetString("openLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function Te(t){const e=t.properties.getString("closeSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=ne(t.properties.mustGetString("closeLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function te(t){return t.map(e=>O.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function ne(t){const e=te(t),n=Q(e),r=((n.right-n.left)/2+n.left)*32,o=((n.bottom-n.top)/2+n.top)*32;return Math.sqrt(Math.pow(D-r,2)+Math.pow(N-o,2))}function Re(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?Ee(t):Te(t),J(t)}),J(t)}function ke(t,e,n,r){const o=t.name;let s,a,i=!1;const u=n.getString("tag");let l=!0;u&&!WA.player.tags.includes(u)&&(l=!1);const f=!!u;function d(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,v()}})}function v(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function j(c){const m=Q(te(e.properties.mustGetString("closeLayer").split(`
`)));a=WA.room.website.create({name:"doorKeypad"+c,url:r+"/keypad.html#"+encodeURIComponent(c),position:{x:m.right*32,y:m.top*32,width:32*3,height:32*4},allowApi:!0})}function M(){a&&(WA.room.website.delete(a.name),a=void 0)}WA.room.onEnterLayer(o).subscribe(()=>{if(i=!0,n.getBoolean("autoOpen")&&l){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(f&&!l||!f)&&(n.getString("code")||n.getString("codeVariable"))){j(o);return}l&&(WA.state[e.name]?d():v())}),WA.room.onLeaveLayer(o).subscribe(()=>{i=!1,n.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),M()}),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!n.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),a&&WA.state[e.name]===!0&&M(),!n.getBoolean("autoOpen")&&WA.state[e.name]===!1&&v())})}function Be(t){const e=t.properties.mustGetString("bellSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=Math.sqrt(Math.pow(t.x-D,2)+Math.pow(t.y-N,2));if(o>n)return;r=1-o/n}WA.sound.loadSound(e).play({volume:r})}function je(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Be(t)})}function Ge(t,e,n){let r;const o=e.getString("bellPopup");WA.room.onEnterLayer(n).subscribe(()=>{var s;o?r=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(n).subscribe(()=>{r&&(r.close(),r=void 0)})}async function xe(t){t=t??U;const e=await se();O=await k();for(const n of e.values())n.properties.get("door")&&Re(n),n.properties.get("bell")&&je(n);for(const n of O.values()){const r=new T(n.properties),o=r.getString("doorVariable");if(o&&n.type==="tilelayer"){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+n.name+'"');ke(n,a,r,t)}const s=r.getString("bellVariable");s&&Ge(s,r,n.name)}WA.player.onPlayerMove(n=>{D=n.x,N=n.y})}function Ve(t,e){const n=t.getString("bindVariable");if(n){const r=t.get("enterValue"),o=t.get("leaveValue"),s=t.getString("triggerMessage"),a=t.getString("tag");Ie(n,e,r,o,s,a)}}function Ie(t,e,n,r,o,s){s&&!WA.player.tags.includes(s)||(n!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[t]=n)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=r}))}async function Oe(){const t=await k();for(const e of t.values()){const n=new T(e.properties);Ve(n,e.name)}}let X;async function Ue(t){const e=await WA.room.getTiledMap();t=t??U,X=await k();const n=e.layers.find(r=>r.name==="configuration");if(n){const o=new T(n.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const s of X.values()){const a=new T(s.properties),i=a.getString("openConfig");i&&s.type==="tilelayer"&&_e(i.split(","),s.name,a)}}}function _e(t,e,n){let r;const o=n.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function a(){var u;r&&r.remove(),r=WA.ui.displayActionMessage({message:(u=n.getString("openConfigTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE or touch here to configure",callback:()=>q(t)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const u=n.getString("openConfigTrigger");s&&(u&&u==="onaction"?a():q(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),i()})}function De(){return WA.onInit().then(()=>{xe().catch(t=>console.error(t)),Oe().catch(t=>console.error(t)),Ue().catch(t=>console.error(t)),Le().catch(t=>console.error(t)),Pe().catch(t=>console.error(t))}).catch(t=>console.error(t))}console.log("Script started successfully");let W;const w={SA:["Aconcágua","Monte Pissis","Cerro Bonete","Walther Penck","Huascarán","Nevado Ojos del Salado"],NA:["Pic d'Orizaba","Popocatépetl","Mont Saint-Élie","Mont Shasta","Mont Logan","Denali"],AF:["Kilimanjaro","Mont Méru","Mont Kenya","Mont Stanley","Ras Dashan","Mont Elgon"],FR:["Col de la Forclaz","Mont Blanc","Dôme du Goûter","Mont Maudit","Mont Blanc du Tacul","Grandes Jorasses"],AS:["Lhotse","Everest","Makalu","Cho Oyu","Kanchenjunga","K2"]};WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),L("SA"),L("NA"),L("AF"),L("FR"),L("AS");for(let t of w.SA)E(t);for(let t of w.NA)E(t);for(let t of w.AF)E(t);for(let t of w.FR)E(t);for(let t of w.AS)E(t);De().then(()=>{console.log("Scripting API Extra ready"),WA.room.area.onEnter("flag").subscribe(()=>{const t=[{label:"En savoir plus",className:"primary",callback:()=>WA.nav.openCoWebSite(WA.state.flagWebsite)}];W=WA.ui.openPopup("flagPopup",`Vous êtes arrivé à ${WA.state.flagHeight} mètres d'altitude !`,t)}),WA.room.area.onLeave("flag").subscribe(K)}).catch(t=>console.error(t))}).catch(t=>console.error(t));const K=()=>{W!==void 0&&(W.close(),W=void 0)},L=t=>{WA.room.area.onEnter(t).subscribe(()=>{W=WA.ui.openPopup(t+"_Popup",w[t].join(`
`),[])}),WA.room.area.onLeave(t).subscribe(K)},E=t=>{WA.room.area.onEnter(t).subscribe(()=>{const e=[{label:"Monter",className:"primary",callback:()=>WA.nav.goToRoom("/@/sherpa/metavers/"+Ne(t)+"#from-agora")}];W=WA.ui.openPopup(t+"_Popup","Monter au sommet du "+t,e)}),WA.room.area.onLeave(t).subscribe(K)},Ne=t=>{const e="àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;",n="aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------",r=new RegExp(e.split("").join("|"),"g");return t.toString().toLowerCase().replace(/\s+/g,"-").replace(r,o=>n.charAt(e.indexOf(o))).replace(/&/g,"-and-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")};