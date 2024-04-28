class S{constructor(e){this.properties=e??[]}get(e){const r=this.properties.filter(n=>n.name===e).map(n=>n.value);if(r.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(r.length!==0)return r[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,r){const n=this.get(e);if(n!==void 0){if(r!=="json"&&typeof n!==r)throw new Error('Expected property "'+e+'" to have type "'+r+'"');return n}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,r){const n=this.get(e);if(n===void 0)throw new Error('Property "'+e+'" is missing');if(r!=="json"&&typeof n!==r)throw new Error('Expected property "'+e+'" to have type "'+r+'"');return n}getType(e){const r=this.properties.filter(n=>n.name===e).map(n=>n.type);if(r.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(r.length!==0)return r[0]}}const Q="https://unpkg.com/@workadventure/scripting-api-extra@1.8.1/dist";class se{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new S(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function O(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(Q+"/configuration.html"+e,!0)}async function ie(t,e){const r=await WA.room.getTiledMap(),n=new Map;return F(r.layers,n,t,e),n}function F(t,e,r,n){for(const o of t)if(o.type==="objectgroup"){for(const a of o.objects)if(a.type==="variable"||a.class==="variable"){if(r&&o.name!==r||n&&!n.includes(a.name))continue;e.set(a.name,new se(a))}}else o.type==="group"&&F(o.layers,e,r,n)}let j;async function k(){return j===void 0&&(j=le()),j}async function le(){return ue(await WA.room.getTiledMap())}function ue(t){const e=new Map;return Z(t.layers,"",e),e}function Z(t,e,r){for(const n of t)n.type==="group"?Z(n.layers,e+n.name+"/",r):(n.name=e+n.name,r.set(n.name,n))}async function ee(){const t=await k(),e=[];for(const r of t.values())if(r.type==="objectgroup")for(const n of r.objects)(n.type==="area"||n.class==="area")&&e.push(n);return e}function ce(t){let e=1/0,r=1/0,n=0,o=0;const a=t.data;if(typeof a=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<t.height;s++)for(let i=0;i<t.width;i++)a[i+s*t.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),r=Math.min(r,s),n=Math.max(n,s));return{top:r,left:e,right:o+1,bottom:n+1}}function te(t){let e=1/0,r=1/0,n=0,o=0;for(const a of t){const s=ce(a);s.left<e&&(e=s.left),s.top<r&&(r=s.top),s.right>o&&(o=s.right),s.bottom>n&&(n=s.bottom)}return{top:r,left:e,right:o,bottom:n}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var pe=Object.prototype.toString,L=Array.isArray||function(e){return pe.call(e)==="[object Array]"};function D(t){return typeof t=="function"}function fe(t){return L(t)?"array":typeof t}function N(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function z(t,e){return t!=null&&typeof t=="object"&&e in t}function ge(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var he=RegExp.prototype.test;function de(t,e){return he.call(t,e)}var ye=/\S/;function ve(t){return!de(ye,t)}var me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function be(t){return String(t).replace(/[&<>"'`=\/]/g,function(r){return me[r]})}var Ae=/\s*/,We=/\s+/,q=/\s*=/,we=/\s*\}/,Se=/#|\^|\/|>|\{|&|=|!/;function Pe(t,e){if(!t)return[];var r=!1,n=[],o=[],a=[],s=!1,i=!1,l="",p=0;function g(){if(s&&!i)for(;a.length;)delete o[a.pop()];else a=[];s=!1,i=!1}var y,m,V;function C(A){if(typeof A=="string"&&(A=A.split(We,2)),!L(A)||A.length!==2)throw new Error("Invalid tags: "+A);y=new RegExp(N(A[0])+"\\s*"),m=new RegExp("\\s*"+N(A[1])),V=new RegExp("\\s*"+N("}"+A[1]))}C(e||d.tags);for(var f=new R(t),b,u,v,E,x,w;!f.eos();){if(b=f.pos,v=f.scanUntil(y),v)for(var B=0,ae=v.length;B<ae;++B)E=v.charAt(B),ve(E)?(a.push(o.length),l+=E):(i=!0,r=!0,l+=" "),o.push(["text",E,b,b+1]),b+=1,E===`
`&&(g(),l="",p=0,r=!1);if(!f.scan(y))break;if(s=!0,u=f.scan(Se)||"name",f.scan(Ae),u==="="?(v=f.scanUntil(q),f.scan(q),f.scanUntil(m)):u==="{"?(v=f.scanUntil(V),f.scan(we),f.scanUntil(m),u="&"):v=f.scanUntil(m),!f.scan(m))throw new Error("Unclosed tag at "+f.pos);if(u==">"?x=[u,v,b,f.pos,l,p,r]:x=[u,v,b,f.pos],p++,o.push(x),u==="#"||u==="^")n.push(x);else if(u==="/"){if(w=n.pop(),!w)throw new Error('Unopened section "'+v+'" at '+b);if(w[1]!==v)throw new Error('Unclosed section "'+w[1]+'" at '+b)}else u==="name"||u==="{"||u==="&"?i=!0:u==="="&&C(v)}if(g(),w=n.pop(),w)throw new Error('Unclosed section "'+w[1]+'" at '+f.pos);return Ce(Le(o))}function Le(t){for(var e=[],r,n,o=0,a=t.length;o<a;++o)r=t[o],r&&(r[0]==="text"&&n&&n[0]==="text"?(n[1]+=r[1],n[3]=r[3]):(e.push(r),n=r));return e}function Ce(t){for(var e=[],r=e,n=[],o,a,s=0,i=t.length;s<i;++s)switch(o=t[s],o[0]){case"#":case"^":r.push(o),n.push(o),r=o[4]=[];break;case"/":a=n.pop(),a[5]=o[2],r=n.length>0?n[n.length-1][4]:e;break;default:r.push(o)}return e}function R(t){this.string=t,this.tail=t,this.pos=0}R.prototype.eos=function(){return this.tail===""};R.prototype.scan=function(e){var r=this.tail.match(e);if(!r||r.index!==0)return"";var n=r[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n};R.prototype.scanUntil=function(e){var r=this.tail.search(e),n;switch(r){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,r),this.tail=this.tail.substring(r)}return this.pos+=n.length,n};function P(t,e){this.view=t,this.cache={".":this.view},this.parent=e}P.prototype.push=function(e){return new P(e,this)};P.prototype.lookup=function(e){var r=this.cache,n;if(r.hasOwnProperty(e))n=r[e];else{for(var o=this,a,s,i,l=!1;o;){if(e.indexOf(".")>0)for(a=o.view,s=e.split("."),i=0;a!=null&&i<s.length;)i===s.length-1&&(l=z(a,s[i])||ge(a,s[i])),a=a[s[i++]];else a=o.view[e],l=z(o.view,e);if(l){n=a;break}o=o.parent}r[e]=n}return D(n)&&(n=n.call(this.view)),n};function h(){this.templateCache={_cache:{},set:function(e,r){this._cache[e]=r},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}h.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};h.prototype.parse=function(e,r){var n=this.templateCache,o=e+":"+(r||d.tags).join(":"),a=typeof n<"u",s=a?n.get(o):void 0;return s==null&&(s=Pe(e,r),a&&n.set(o,s)),s};h.prototype.render=function(e,r,n,o){var a=this.getConfigTags(o),s=this.parse(e,a),i=r instanceof P?r:new P(r,void 0);return this.renderTokens(s,i,n,e,o)};h.prototype.renderTokens=function(e,r,n,o,a){for(var s="",i,l,p,g=0,y=e.length;g<y;++g)p=void 0,i=e[g],l=i[0],l==="#"?p=this.renderSection(i,r,n,o,a):l==="^"?p=this.renderInverted(i,r,n,o,a):l===">"?p=this.renderPartial(i,r,n,a):l==="&"?p=this.unescapedValue(i,r):l==="name"?p=this.escapedValue(i,r,a):l==="text"&&(p=this.rawValue(i)),p!==void 0&&(s+=p);return s};h.prototype.renderSection=function(e,r,n,o,a){var s=this,i="",l=r.lookup(e[1]);function p(m){return s.render(m,r,n,a)}if(l){if(L(l))for(var g=0,y=l.length;g<y;++g)i+=this.renderTokens(e[4],r.push(l[g]),n,o,a);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],r.push(l),n,o,a);else if(D(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(r.view,o.slice(e[3],e[5]),p),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],r,n,o,a);return i}};h.prototype.renderInverted=function(e,r,n,o,a){var s=r.lookup(e[1]);if(!s||L(s)&&s.length===0)return this.renderTokens(e[4],r,n,o,a)};h.prototype.indentPartial=function(e,r,n){for(var o=r.replace(/[^ \t]/g,""),a=e.split(`
`),s=0;s<a.length;s++)a[s].length&&(s>0||!n)&&(a[s]=o+a[s]);return a.join(`
`)};h.prototype.renderPartial=function(e,r,n,o){if(n){var a=this.getConfigTags(o),s=D(n)?n(e[1]):n[e[1]];if(s!=null){var i=e[6],l=e[5],p=e[4],g=s;l==0&&p&&(g=this.indentPartial(s,p,i));var y=this.parse(g,a);return this.renderTokens(y,r,n,g,o)}}};h.prototype.unescapedValue=function(e,r){var n=r.lookup(e[1]);if(n!=null)return n};h.prototype.escapedValue=function(e,r,n){var o=this.getConfigEscape(n)||d.escape,a=r.lookup(e[1]);if(a!=null)return typeof a=="number"&&o===d.escape?String(a):o(a)};h.prototype.rawValue=function(e){return e[1]};h.prototype.getConfigTags=function(e){return L(e)?e:e&&typeof e=="object"?e.tags:void 0};h.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!L(e))return e.escape};var d={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){T.templateCache=t},get templateCache(){return T.templateCache}},T=new h;d.clearCache=function(){return T.clearCache()};d.parse=function(e,r){return T.parse(e,r)};d.render=function(e,r,n,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+fe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return T.render(e,r,n,o)};d.escape=be;d.Scanner=R;d.Context=P;d.Writer=h;class re{constructor(e,r){this.template=e,this.state=r,this.ast=d.parse(e)}getValue(){return this.value===void 0&&(this.value=d.render(this.template,this.state)),this.value}onChange(e){const r=[];for(const n of this.getUsedVariables().values())r.push(this.state.onVariableChange(n).subscribe(()=>{const o=d.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const n of r)n.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,r){for(const n of e){const o=n[0],a=n[1],s=n[4];["name","&","#","^"].includes(o)&&r.add(a),s!==void 0&&typeof s!="string"&&this.recursiveGetUsedVariables(s,r)}}}async function Ee(){var t;const e=await ee();for(const r of e){const n=(t=r.properties)!==null&&t!==void 0?t:[];for(const o of n){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const a=new re(o.value,WA.state);if(a.isPureString())continue;const s=a.getValue();await K(r.name,o.name,s),a.onChange(async i=>{await K(r.name,o.name,i)})}}}async function Me(){var t;const e=await k();for(const[r,n]of e.entries())if(n.type!=="objectgroup"){const o=(t=n.properties)!==null&&t!==void 0?t:[];for(const a of o){if(a.type==="int"||a.type==="bool"||a.type==="object"||typeof a.value!="string")continue;const s=new re(a.value,WA.state);if(s.isPureString())continue;const i=s.getValue();$(r,a.name,i),s.onChange(l=>{$(r,a.name,l)})}}}async function K(t,e,r){console.log(t),(await WA.room.area.get(t)).setProperty(e,r)}function $(t,e,r){WA.room.setProperty(t,e,r),e==="visible"&&(r?WA.room.showLayer(t):WA.room.hideLayer(t))}const Te="https://admin.workadventu.re/html";let I,_=0,U=0;function H(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const r of e.split(`
`))WA.room.showLayer(r);e=t.properties.mustGetString("closeLayer");for(const r of e.split(`
`))WA.room.hideLayer(r)}else{let e=t.properties.mustGetString("openLayer");for(const r of e.split(`
`))WA.room.hideLayer(r);e=t.properties.mustGetString("closeLayer");for(const r of e.split(`
`))WA.room.showLayer(r)}}function ke(t){const e=t.properties.getString("openSound"),r=t.properties.getNumber("soundRadius");let n=1;if(r){const o=oe(t.properties.mustGetString("openLayer").split(`
`));if(o>r)return;n=1-o/r}e&&WA.sound.loadSound(e).play({volume:n})}function Re(t){const e=t.properties.getString("closeSound"),r=t.properties.getNumber("soundRadius");let n=1;if(r){const o=oe(t.properties.mustGetString("closeLayer").split(`
`));if(o>r)return;n=1-o/r}e&&WA.sound.loadSound(e).play({volume:n})}function ne(t){return t.map(e=>I.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function oe(t){const e=ne(t),r=te(e),n=((r.right-r.left)/2+r.left)*32,o=((r.bottom-r.top)/2+r.top)*32;return Math.sqrt(Math.pow(_-n,2)+Math.pow(U-o,2))}function Ve(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?ke(t):Re(t),H(t)}),H(t)}function X(t,e,r,n){const o=t.name;let a,s,i=!1;const l=r.getString("tag");let p=!0;l&&!WA.player.tags.includes(l)&&(p=!1);const g=!!l;function y(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=r.getString("closeTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=r.getString("openTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,y()}})}function V(){let u;if(t.type==="tilelayer")u=te(ne(e.properties.mustGetString("closeLayer").split(`
`)));else{if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0)throw new Error(`Doorstep zone "${t.name}" is missing x, y, width or height`);u={top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}s=WA.room.website.create({name:"doorKeypad"+o,url:n+"/keypad.html#"+encodeURIComponent(o),position:{x:u.right*32,y:u.top*32,width:32*3,height:32*4},allowApi:!0})}function C(){s&&(WA.room.website.delete(s.name),s=void 0)}function f(){if(i=!0,r.getBoolean("autoOpen")&&p){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(g&&!p||!g)&&(r.getString("code")||r.getString("codeVariable"))){V();return}p&&(WA.state[e.name]?y():m())}function b(){i=!1,r.getBoolean("autoClose")&&(WA.state[e.name]=!1),a&&a.remove(),C()}t.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(f),WA.room.onLeaveLayer(o).subscribe(b)):(WA.room.area.onEnter(o).subscribe(f),WA.room.area.onLeave(o).subscribe(b)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!r.getBoolean("autoClose")&&WA.state[e.name]===!0&&y(),s&&WA.state[e.name]===!0&&C(),!r.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function xe(t){const e=t.properties.mustGetString("bellSound"),r=t.properties.getNumber("soundRadius");let n=1;if(r){const o=Math.sqrt(Math.pow(t.x-_,2)+Math.pow(t.y-U,2));if(o>r)return;n=1-o/r}WA.sound.loadSound(e).play({volume:n})}function Be(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&xe(t)})}function Y(t,e,r){let n;const o=e.getString("bellPopup");if(r.type==="tilelayer"){const a=r.name;WA.room.onEnterLayer(a).subscribe(()=>{var s;o?n=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(a).subscribe(()=>{n&&(n.close(),n=void 0)})}else{const a=r.name;WA.room.area.onEnter(a).subscribe(()=>{var s;o?n=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.area.onLeave(a).subscribe(()=>{n&&(n.close(),n=void 0)})}}async function je(t){t=t??Te;const e=await ie();I=await k();for(const r of e.values())r.properties.get("door")&&Ve(r),r.properties.get("bell")&&Be(r);for(const r of I.values()){const n=new S(r.properties),o=n.getString("doorVariable");if(o&&r.type==="tilelayer"){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+r.name+'"');X(r,s,n,t)}const a=n.getString("bellVariable");a&&r.type==="tilelayer"&&Y(a,n,r)}for(const r of await ee()){const n=new S(r.properties),o=n.getString("doorVariable");if(o){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+r.name+'"');X(r,s,n,t)}const a=n.getString("bellVariable");a&&Y(a,n,r)}WA.player.onPlayerMove(r=>{_=r.x,U=r.y})}function Ne(t,e){const r=t.getString("bindVariable");if(r){const n=t.get("enterValue"),o=t.get("leaveValue"),a=t.getString("triggerMessage"),s=t.getString("tag");Ge(r,e,n,o,a,s)}}function Ge(t,e,r,n,o,a){a&&!WA.player.tags.includes(a)||(r!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[t]=r)}),n!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=n}))}async function Ie(){const t=await k();for(const e of t.values()){const r=new S(e.properties);Ne(r,e.name)}}let J;async function De(t){const e=await WA.room.getTiledMap();t=t??Q,J=await k();const r=e.layers.find(n=>n.name==="configuration");if(r){const o=new S(r.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const a of J.values()){const s=new S(a.properties),i=s.getString("openConfig");i&&a.type==="tilelayer"&&_e(i.split(","),a.name,s)}}}function _e(t,e,r){let n;const o=r.getString("openConfigAdminTag");let a=!0;o&&!WA.player.tags.includes(o)&&(a=!1);function s(){var l;n&&n.remove(),n=WA.ui.displayActionMessage({message:(l=r.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>O(t)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=r.getString("openConfigTrigger");a&&(l&&l==="onaction"?s():O(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{n&&n.remove(),i()})}function Ue(){return WA.onInit().then(()=>{je().catch(t=>console.error(t)),Ie().catch(t=>console.error(t)),De().catch(t=>console.error(t)),Me().catch(t=>console.error(t)),Ee().catch(t=>console.error(t))}).catch(t=>console.error(t))}console.log("Script started successfully");let c=0,W,G=0;function Oe(t){WA.event.broadcast("point-update",t)}WA.onInit().then(async()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),setInterval(()=>{G+=1,WA.player.state.points=G,Oe(G)},2e3),WA.ui.website.open({url:"./points/playerPoint.html",position:{vertical:"top",horizontal:"right"},size:{height:"100vw",width:"10vw"},margin:{top:"5px",right:"5px"},allowApi:!0});const t=await WA.ui.website.open({url:"./points/pointsMenu.html",visible:!1,position:{vertical:"middle",horizontal:"middle"},size:{height:"40vw",width:"70vw"},margin:{top:"5px",right:"5px"},allowApi:!0});WA.ui.actionBar.addButton({id:"medal_btn",label:"Medals",callback:()=>{t.visible?t.visible=!1:t.visible=!0}});function e(){if(!WA.room.mapURL.replace("github","").includes("hub")&&!WA.player.tags.some(n=>n.startsWith("subscribed"))){let n=WA.room.id.replace("https://play.workadventu.re","");WA.nav.goToRoom(n.replace(/(.+\/).+/,"hub"))}}function r(){console.log("Connected set temporary role"),WA.player.tags.push("subscribed_temp"),WA.player.tags.some(n=>n=="member")||WA.player.tags.push("member")}WA.event.on("connectionState").subscribe(n=>{n.data==WA.player.uuid&&r()}),e(),WA.players.configureTracking(),WA.room.area.onEnter("liveArea1").subscribe(()=>{console.log("liveArea1");let n=WA.players.list();for(let o of n)c++,console.log("les joueurs",n,o);console.log("Number of viewers after entering:",c),WA.state.saveVariable("varNumber1",{default:c})}),WA.room.area.onEnter("liveArea2").subscribe(()=>{console.log("liveArea2");let n=WA.players.list();for(let o of n)c++,console.log("les joueurs",n,o);console.log("Number of viewers after entering:",c),WA.state.saveVariable("varNumber2",{default:c})}),WA.room.area.onEnter("liveArea3").subscribe(()=>{console.log("liveArea3");let n=WA.players.list();for(let o of n)c++,console.log("les joueurs",n,o);console.log("Number of viewers after entering:",c),WA.state.saveVariable("varNumber3",{default:c})}),WA.room.area.onLeave("liveArea1").subscribe(()=>{console.log("Leaving liveArea1"),c=0;let n=WA.players.list();for(let o of n)c++,console.log(o);c<0&&(c=0),console.log("Number of viewers after leaving:",c),WA.state.saveVariable("varNumber1",{default:c})}),WA.room.area.onLeave("liveArea2").subscribe(()=>{console.log("Leaving liveArea2"),c=0;let n=WA.players.list();for(let o of n)c++,console.log(o);c<0&&(c=0),console.log("Number of viewers after leaving:",c),WA.state.saveVariable("varNumber2",{default:c})}),WA.room.area.onLeave("liveArea3").subscribe(()=>{console.log("Leaving liveArea3"),c=0;let n=WA.players.list();for(let o of n)c++,console.log(o);c<0&&(c=0),console.log("Number of viewers after leaving:",c),WA.state.saveVariable("varNumber3",{default:c})}),WA.room.onEnterLayer("openDoorZone").subscribe(()=>{WA.player.tags.some(n=>n.startsWith("subscribed"))?(WA.room.showLayer("above/openDoor"),WA.room.hideLayer("closeDoor")):(WA.room.hideLayer("above/openDoor"),WA.room.showLayer("closeDoor"))}),WA.room.area.onEnter("connexion_popup").subscribe(()=>{WA.player.tags.some(n=>n=="member")?WA.player.tags.some(n=>n.startsWith("subscribed"))||(W=WA.ui.openPopup("message","Vous devez être connecté à twitch et être abonné pour entrer",[])):W=WA.ui.openPopup("message","Vous devez être connecté à un compte WorkAdventure pour entrer",[])}),WA.room.area.onLeave("connexion_popup").subscribe(M),WA.room.area.onEnter("liveAreaPopup1").subscribe(()=>{W=WA.ui.openPopup("livePopup1","Zone de live",[])}),WA.room.area.onLeave("liveAreaPopup1").subscribe(M),WA.room.area.onEnter("liveAreaPopup2").subscribe(()=>{W=WA.ui.openPopup("livePopup2","Zone de live",[])}),WA.room.area.onLeave("liveAreaPopup2").subscribe(M),WA.room.area.onEnter("liveAreaPopup3").subscribe(()=>{W=WA.ui.openPopup("livePopup3","Zone de live",[])}),WA.room.area.onLeave("liveAreaPopup3").subscribe(M),WA.room.area.onEnter("RediffClipAreaPopup").subscribe(()=>{W=WA.ui.openPopup("RediffClipPopup","Rediffs et clips",[])}),WA.room.area.onLeave("RediffClipAreaPopup").subscribe(M),Ue().then(()=>{console.log("Scripting API Extra ready !")}).catch(n=>console.error(n))}).catch(t=>console.error(t));function M(){W!==void 0&&(W.close(),W=void 0)}
