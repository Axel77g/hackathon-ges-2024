class S{constructor(e){this.properties=e??[]}get(e){const r=this.properties.filter(n=>n.name===e).map(n=>n.value);if(r.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(r.length!==0)return r[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,r){const n=this.get(e);if(n!==void 0){if(r!=="json"&&typeof n!==r)throw new Error('Expected property "'+e+'" to have type "'+r+'"');return n}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,r){const n=this.get(e);if(n===void 0)throw new Error('Property "'+e+'" is missing');if(r!=="json"&&typeof n!==r)throw new Error('Expected property "'+e+'" to have type "'+r+'"');return n}getType(e){const r=this.properties.filter(n=>n.name===e).map(n=>n.type);if(r.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(r.length!==0)return r[0]}}const J="https://unpkg.com/@workadventure/scripting-api-extra@1.8.1/dist";class se{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new S(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function U(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(J+"/configuration.html"+e,!0)}async function ae(t,e){const r=await WA.room.getTiledMap(),n=new Map;return Q(r.layers,n,t,e),n}function Q(t,e,r,n){for(const o of t)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(r&&o.name!==r||n&&!n.includes(s.name))continue;e.set(s.name,new se(s))}}else o.type==="group"&&Q(o.layers,e,r,n)}let x;async function R(){return x===void 0&&(x=ie()),x}async function ie(){return le(await WA.room.getTiledMap())}function le(t){const e=new Map;return F(t.layers,"",e),e}function F(t,e,r){for(const n of t)n.type==="group"?F(n.layers,e+n.name+"/",r):(n.name=e+n.name,r.set(n.name,n))}async function Z(){const t=await R(),e=[];for(const r of t.values())if(r.type==="objectgroup")for(const n of r.objects)(n.type==="area"||n.class==="area")&&e.push(n);return e}function ue(t){let e=1/0,r=1/0,n=0,o=0;const s=t.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<t.height;a++)for(let i=0;i<t.width;i++)s[i+a*t.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),r=Math.min(r,a),n=Math.max(n,a));return{top:r,left:e,right:o+1,bottom:n+1}}function ee(t){let e=1/0,r=1/0,n=0,o=0;for(const s of t){const a=ue(s);a.left<e&&(e=a.left),a.top<r&&(r=a.top),a.right>o&&(o=a.right),a.bottom>n&&(n=a.bottom)}return{top:r,left:e,right:o,bottom:n}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ce=Object.prototype.toString,P=Array.isArray||function(e){return ce.call(e)==="[object Array]"};function I(t){return typeof t=="function"}function fe(t){return P(t)?"array":typeof t}function G(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function O(t,e){return t!=null&&typeof t=="object"&&e in t}function pe(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var ge=RegExp.prototype.test;function he(t,e){return ge.call(t,e)}var ye=/\S/;function de(t){return!he(ye,t)}var ve={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function be(t){return String(t).replace(/[&<>"'`=\/]/g,function(r){return ve[r]})}var me=/\s*/,Ae=/\s+/,q=/\s*=/,We=/\s*\}/,we=/#|\^|\/|>|\{|&|=|!/;function Se(t,e){if(!t)return[];var r=!1,n=[],o=[],s=[],a=!1,i=!1,l="",f=0;function g(){if(a&&!i)for(;s.length;)delete o[s.pop()];else s=[];a=!1,i=!1}var d,b,V;function C(A){if(typeof A=="string"&&(A=A.split(Ae,2)),!P(A)||A.length!==2)throw new Error("Invalid tags: "+A);d=new RegExp(G(A[0])+"\\s*"),b=new RegExp("\\s*"+G(A[1])),V=new RegExp("\\s*"+G("}"+A[1]))}C(e||y.tags);for(var p=new k(t),m,u,v,E,B,w;!p.eos();){if(m=p.pos,v=p.scanUntil(d),v)for(var j=0,oe=v.length;j<oe;++j)E=v.charAt(j),de(E)?(s.push(o.length),l+=E):(i=!0,r=!0,l+=" "),o.push(["text",E,m,m+1]),m+=1,E===`
`&&(g(),l="",f=0,r=!1);if(!p.scan(d))break;if(a=!0,u=p.scan(we)||"name",p.scan(me),u==="="?(v=p.scanUntil(q),p.scan(q),p.scanUntil(b)):u==="{"?(v=p.scanUntil(V),p.scan(We),p.scanUntil(b),u="&"):v=p.scanUntil(b),!p.scan(b))throw new Error("Unclosed tag at "+p.pos);if(u==">"?B=[u,v,m,p.pos,l,f,r]:B=[u,v,m,p.pos],f++,o.push(B),u==="#"||u==="^")n.push(B);else if(u==="/"){if(w=n.pop(),!w)throw new Error('Unopened section "'+v+'" at '+m);if(w[1]!==v)throw new Error('Unclosed section "'+w[1]+'" at '+m)}else u==="name"||u==="{"||u==="&"?i=!0:u==="="&&C(v)}if(g(),w=n.pop(),w)throw new Error('Unclosed section "'+w[1]+'" at '+p.pos);return Pe(Le(o))}function Le(t){for(var e=[],r,n,o=0,s=t.length;o<s;++o)r=t[o],r&&(r[0]==="text"&&n&&n[0]==="text"?(n[1]+=r[1],n[3]=r[3]):(e.push(r),n=r));return e}function Pe(t){for(var e=[],r=e,n=[],o,s,a=0,i=t.length;a<i;++a)switch(o=t[a],o[0]){case"#":case"^":r.push(o),n.push(o),r=o[4]=[];break;case"/":s=n.pop(),s[5]=o[2],r=n.length>0?n[n.length-1][4]:e;break;default:r.push(o)}return e}function k(t){this.string=t,this.tail=t,this.pos=0}k.prototype.eos=function(){return this.tail===""};k.prototype.scan=function(e){var r=this.tail.match(e);if(!r||r.index!==0)return"";var n=r[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n};k.prototype.scanUntil=function(e){var r=this.tail.search(e),n;switch(r){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,r),this.tail=this.tail.substring(r)}return this.pos+=n.length,n};function L(t,e){this.view=t,this.cache={".":this.view},this.parent=e}L.prototype.push=function(e){return new L(e,this)};L.prototype.lookup=function(e){var r=this.cache,n;if(r.hasOwnProperty(e))n=r[e];else{for(var o=this,s,a,i,l=!1;o;){if(e.indexOf(".")>0)for(s=o.view,a=e.split("."),i=0;s!=null&&i<a.length;)i===a.length-1&&(l=O(s,a[i])||pe(s,a[i])),s=s[a[i++]];else s=o.view[e],l=O(o.view,e);if(l){n=s;break}o=o.parent}r[e]=n}return I(n)&&(n=n.call(this.view)),n};function h(){this.templateCache={_cache:{},set:function(e,r){this._cache[e]=r},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}h.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};h.prototype.parse=function(e,r){var n=this.templateCache,o=e+":"+(r||y.tags).join(":"),s=typeof n<"u",a=s?n.get(o):void 0;return a==null&&(a=Se(e,r),s&&n.set(o,a)),a};h.prototype.render=function(e,r,n,o){var s=this.getConfigTags(o),a=this.parse(e,s),i=r instanceof L?r:new L(r,void 0);return this.renderTokens(a,i,n,e,o)};h.prototype.renderTokens=function(e,r,n,o,s){for(var a="",i,l,f,g=0,d=e.length;g<d;++g)f=void 0,i=e[g],l=i[0],l==="#"?f=this.renderSection(i,r,n,o,s):l==="^"?f=this.renderInverted(i,r,n,o,s):l===">"?f=this.renderPartial(i,r,n,s):l==="&"?f=this.unescapedValue(i,r):l==="name"?f=this.escapedValue(i,r,s):l==="text"&&(f=this.rawValue(i)),f!==void 0&&(a+=f);return a};h.prototype.renderSection=function(e,r,n,o,s){var a=this,i="",l=r.lookup(e[1]);function f(b){return a.render(b,r,n,s)}if(l){if(P(l))for(var g=0,d=l.length;g<d;++g)i+=this.renderTokens(e[4],r.push(l[g]),n,o,s);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],r.push(l),n,o,s);else if(I(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(r.view,o.slice(e[3],e[5]),f),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],r,n,o,s);return i}};h.prototype.renderInverted=function(e,r,n,o,s){var a=r.lookup(e[1]);if(!a||P(a)&&a.length===0)return this.renderTokens(e[4],r,n,o,s)};h.prototype.indentPartial=function(e,r,n){for(var o=r.replace(/[^ \t]/g,""),s=e.split(`
`),a=0;a<s.length;a++)s[a].length&&(a>0||!n)&&(s[a]=o+s[a]);return s.join(`
`)};h.prototype.renderPartial=function(e,r,n,o){if(n){var s=this.getConfigTags(o),a=I(n)?n(e[1]):n[e[1]];if(a!=null){var i=e[6],l=e[5],f=e[4],g=a;l==0&&f&&(g=this.indentPartial(a,f,i));var d=this.parse(g,s);return this.renderTokens(d,r,n,g,o)}}};h.prototype.unescapedValue=function(e,r){var n=r.lookup(e[1]);if(n!=null)return n};h.prototype.escapedValue=function(e,r,n){var o=this.getConfigEscape(n)||y.escape,s=r.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===y.escape?String(s):o(s)};h.prototype.rawValue=function(e){return e[1]};h.prototype.getConfigTags=function(e){return P(e)?e:e&&typeof e=="object"?e.tags:void 0};h.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!P(e))return e.escape};var y={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){M.templateCache=t},get templateCache(){return M.templateCache}},M=new h;y.clearCache=function(){return M.clearCache()};y.parse=function(e,r){return M.parse(e,r)};y.render=function(e,r,n,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+fe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return M.render(e,r,n,o)};y.escape=be;y.Scanner=k;y.Context=L;y.Writer=h;class te{constructor(e,r){this.template=e,this.state=r,this.ast=y.parse(e)}getValue(){return this.value===void 0&&(this.value=y.render(this.template,this.state)),this.value}onChange(e){const r=[];for(const n of this.getUsedVariables().values())r.push(this.state.onVariableChange(n).subscribe(()=>{const o=y.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const n of r)n.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,r){for(const n of e){const o=n[0],s=n[1],a=n[4];["name","&","#","^"].includes(o)&&r.add(s),a!==void 0&&typeof a!="string"&&this.recursiveGetUsedVariables(a,r)}}}async function Ce(){var t;const e=await Z();for(const r of e){const n=(t=r.properties)!==null&&t!==void 0?t:[];for(const o of n){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new te(o.value,WA.state);if(s.isPureString())continue;const a=s.getValue();await K(r.name,o.name,a),s.onChange(async i=>{await K(r.name,o.name,i)})}}}async function Ee(){var t;const e=await R();for(const[r,n]of e.entries())if(n.type!=="objectgroup"){const o=(t=n.properties)!==null&&t!==void 0?t:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const a=new te(s.value,WA.state);if(a.isPureString())continue;const i=a.getValue();$(r,s.name,i),a.onChange(l=>{$(r,s.name,l)})}}}async function K(t,e,r){console.log(t),(await WA.room.area.get(t)).setProperty(e,r)}function $(t,e,r){WA.room.setProperty(t,e,r),e==="visible"&&(r?WA.room.showLayer(t):WA.room.hideLayer(t))}const Te="https://admin.workadventu.re/html";let N,_=0,D=0;function z(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const r of e.split(`
`))WA.room.showLayer(r);e=t.properties.mustGetString("closeLayer");for(const r of e.split(`
`))WA.room.hideLayer(r)}else{let e=t.properties.mustGetString("openLayer");for(const r of e.split(`
`))WA.room.hideLayer(r);e=t.properties.mustGetString("closeLayer");for(const r of e.split(`
`))WA.room.showLayer(r)}}function Me(t){const e=t.properties.getString("openSound"),r=t.properties.getNumber("soundRadius");let n=1;if(r){const o=ne(t.properties.mustGetString("openLayer").split(`
`));if(o>r)return;n=1-o/r}e&&WA.sound.loadSound(e).play({volume:n})}function Re(t){const e=t.properties.getString("closeSound"),r=t.properties.getNumber("soundRadius");let n=1;if(r){const o=ne(t.properties.mustGetString("closeLayer").split(`
`));if(o>r)return;n=1-o/r}e&&WA.sound.loadSound(e).play({volume:n})}function re(t){return t.map(e=>N.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function ne(t){const e=re(t),r=ee(e),n=((r.right-r.left)/2+r.left)*32,o=((r.bottom-r.top)/2+r.top)*32;return Math.sqrt(Math.pow(_-n,2)+Math.pow(D-o,2))}function ke(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?Me(t):Re(t),z(t)}),z(t)}function H(t,e,r,n){const o=t.name;let s,a,i=!1;const l=r.getString("tag");let f=!0;l&&!WA.player.tags.includes(l)&&(f=!1);const g=!!l;function d(){var u;s&&s.remove(),s=WA.ui.displayActionMessage({message:(u=r.getString("closeTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,b()}})}function b(){var u;s&&s.remove(),s=WA.ui.displayActionMessage({message:(u=r.getString("openTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function V(){let u;if(t.type==="tilelayer")u=ee(re(e.properties.mustGetString("closeLayer").split(`
`)));else{if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0)throw new Error(`Doorstep zone "${t.name}" is missing x, y, width or height`);u={top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}a=WA.room.website.create({name:"doorKeypad"+o,url:n+"/keypad.html#"+encodeURIComponent(o),position:{x:u.right*32,y:u.top*32,width:32*3,height:32*4},allowApi:!0})}function C(){a&&(WA.room.website.delete(a.name),a=void 0)}function p(){if(i=!0,r.getBoolean("autoOpen")&&f){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(g&&!f||!g)&&(r.getString("code")||r.getString("codeVariable"))){V();return}f&&(WA.state[e.name]?d():b())}function m(){i=!1,r.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),C()}t.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(p),WA.room.onLeaveLayer(o).subscribe(m)):(WA.room.area.onEnter(o).subscribe(p),WA.room.area.onLeave(o).subscribe(m)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!r.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),a&&WA.state[e.name]===!0&&C(),!r.getBoolean("autoOpen")&&WA.state[e.name]===!1&&b())})}function Ve(t){const e=t.properties.mustGetString("bellSound"),r=t.properties.getNumber("soundRadius");let n=1;if(r){const o=Math.sqrt(Math.pow(t.x-_,2)+Math.pow(t.y-D,2));if(o>r)return;n=1-o/r}WA.sound.loadSound(e).play({volume:n})}function Be(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Ve(t)})}function X(t,e,r){let n;const o=e.getString("bellPopup");if(r.type==="tilelayer"){const s=r.name;WA.room.onEnterLayer(s).subscribe(()=>{var a;o?n=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(s).subscribe(()=>{n&&(n.close(),n=void 0)})}else{const s=r.name;WA.room.area.onEnter(s).subscribe(()=>{var a;o?n=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.area.onLeave(s).subscribe(()=>{n&&(n.close(),n=void 0)})}}async function je(t){t=t??Te;const e=await ae();N=await R();for(const r of e.values())r.properties.get("door")&&ke(r),r.properties.get("bell")&&Be(r);for(const r of N.values()){const n=new S(r.properties),o=n.getString("doorVariable");if(o&&r.type==="tilelayer"){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+r.name+'"');H(r,a,n,t)}const s=n.getString("bellVariable");s&&r.type==="tilelayer"&&X(s,n,r)}for(const r of await Z()){const n=new S(r.properties),o=n.getString("doorVariable");if(o){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+r.name+'"');H(r,a,n,t)}const s=n.getString("bellVariable");s&&X(s,n,r)}WA.player.onPlayerMove(r=>{_=r.x,D=r.y})}function xe(t,e){const r=t.getString("bindVariable");if(r){const n=t.get("enterValue"),o=t.get("leaveValue"),s=t.getString("triggerMessage"),a=t.getString("tag");Ge(r,e,n,o,s,a)}}function Ge(t,e,r,n,o,s){s&&!WA.player.tags.includes(s)||(r!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[t]=r)}),n!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=n}))}async function Ne(){const t=await R();for(const e of t.values()){const r=new S(e.properties);xe(r,e.name)}}let Y;async function Ie(t){const e=await WA.room.getTiledMap();t=t??J,Y=await R();const r=e.layers.find(n=>n.name==="configuration");if(r){const o=new S(r.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const s of Y.values()){const a=new S(s.properties),i=a.getString("openConfig");i&&s.type==="tilelayer"&&_e(i.split(","),s.name,a)}}}function _e(t,e,r){let n;const o=r.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function a(){var l;n&&n.remove(),n=WA.ui.displayActionMessage({message:(l=r.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>U(t)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=r.getString("openConfigTrigger");s&&(l&&l==="onaction"?a():U(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{n&&n.remove(),i()})}function De(){return WA.onInit().then(()=>{je().catch(t=>console.error(t)),Ne().catch(t=>console.error(t)),Ie().catch(t=>console.error(t)),Ee().catch(t=>console.error(t)),Ce().catch(t=>console.error(t))}).catch(t=>console.error(t))}console.log("Script started successfully");let c=0,W;WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),!WA.room.mapURL.includes("hub")&&!WA.player.tags.some(t=>t.startsWith("subscribed"))&&WA.nav.goToRoom("/_/jxy97572jpf/localhost:5173/hub.tmj"),WA.players.configureTracking(),WA.room.area.onEnter("liveArea1").subscribe(()=>{console.log("liveArea1");let t=WA.players.list();for(let e of t)c++,console.log("les joueurs",t,e);console.log("Number of viewers after entering:",c),WA.state.saveVariable("varNumber1",{default:c})}),WA.room.area.onEnter("liveArea2").subscribe(()=>{console.log("liveArea2");let t=WA.players.list();for(let e of t)c++,console.log("les joueurs",t,e);console.log("Number of viewers after entering:",c),WA.state.saveVariable("varNumber2",{default:c})}),WA.room.area.onEnter("liveArea3").subscribe(()=>{console.log("liveArea3");let t=WA.players.list();for(let e of t)c++,console.log("les joueurs",t,e);console.log("Number of viewers after entering:",c),WA.state.saveVariable("varNumber3",{default:c})}),WA.room.area.onLeave("liveArea1").subscribe(()=>{console.log("Leaving liveArea1"),c=0;let t=WA.players.list();for(let e of t)c++,console.log(e);c<0&&(c=0),console.log("Number of viewers after leaving:",c),WA.state.saveVariable("varNumber1",{default:c})}),WA.room.area.onLeave("liveArea2").subscribe(()=>{console.log("Leaving liveArea2"),c=0;let t=WA.players.list();for(let e of t)c++,console.log(e);c<0&&(c=0),console.log("Number of viewers after leaving:",c),WA.state.saveVariable("varNumber2",{default:c})}),WA.room.area.onLeave("liveArea3").subscribe(()=>{console.log("Leaving liveArea3"),c=0;let t=WA.players.list();for(let e of t)c++,console.log(e);c<0&&(c=0),console.log("Number of viewers after leaving:",c),WA.state.saveVariable("varNumber3",{default:c})}),WA.room.onEnterLayer("openDoorZone").subscribe(()=>{WA.player.tags.includes("subscribed_1000")?(WA.room.showLayer("above/openDoor"),WA.room.hideLayer("closeDoor")):(WA.room.hideLayer("above/openDoor"),WA.room.showLayer("closeDoor"))}),WA.room.area.onEnter("connexion_popup").subscribe(()=>{WA.player.tags.includes("subscribed_1000")||(W=WA.ui.openPopup("message","Vous devez vous être connecté pour entrer",[]))}),WA.room.area.onLeave("connexion_popup").subscribe(T),WA.room.area.onEnter("liveAreaPopup1").subscribe(()=>{W=WA.ui.openPopup("livePopup1","Zone de live",[])}),WA.room.area.onLeave("liveAreaPopup1").subscribe(T),WA.room.area.onEnter("liveAreaPopup2").subscribe(()=>{W=WA.ui.openPopup("livePopup2","Zone de live",[])}),WA.room.area.onLeave("liveAreaPopup2").subscribe(T),WA.room.area.onEnter("liveAreaPopup3").subscribe(()=>{W=WA.ui.openPopup("livePopup3","Zone de live",[])}),WA.room.area.onLeave("liveAreaPopup3").subscribe(T),WA.room.area.onEnter("RediffClipAreaPopup").subscribe(()=>{W=WA.ui.openPopup("RediffClipPopup","Rediffs et clips",[])}),WA.room.area.onLeave("RediffClipAreaPopup").subscribe(T),De().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(t=>console.error(t));function T(){W!==void 0&&(W.close(),W=void 0)}
