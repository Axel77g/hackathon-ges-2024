class S{constructor(e){this.properties=e??[]}get(e){const t=this.properties.filter(n=>n.name===e).map(n=>n.value);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const n=this.get(e);if(n!==void 0){if(t!=="json"&&typeof n!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return n}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const n=this.get(e);if(n===void 0)throw new Error('Property "'+e+'" is missing');if(t!=="json"&&typeof n!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return n}getType(e){const t=this.properties.filter(n=>n.name===e).map(n=>n.type);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}}const J="https://unpkg.com/@workadventure/scripting-api-extra@1.8.1/dist";class ae{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new S(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function U(r){const e=r?"#"+r.join():"";WA.nav.openCoWebSite(J+"/configuration.html"+e,!0)}async function se(r,e){const t=await WA.room.getTiledMap(),n=new Map;return Q(t.layers,n,r,e),n}function Q(r,e,t,n){for(const o of r)if(o.type==="objectgroup"){for(const a of o.objects)if(a.type==="variable"||a.class==="variable"){if(t&&o.name!==t||n&&!n.includes(a.name))continue;e.set(a.name,new ae(a))}}else o.type==="group"&&Q(o.layers,e,t,n)}let j;async function k(){return j===void 0&&(j=ie()),j}async function ie(){return le(await WA.room.getTiledMap())}function le(r){const e=new Map;return F(r.layers,"",e),e}function F(r,e,t){for(const n of r)n.type==="group"?F(n.layers,e+n.name+"/",t):(n.name=e+n.name,t.set(n.name,n))}async function Z(){const r=await k(),e=[];for(const t of r.values())if(t.type==="objectgroup")for(const n of t.objects)(n.type==="area"||n.class==="area")&&e.push(n);return e}function ue(r){let e=1/0,t=1/0,n=0,o=0;const a=r.data;if(typeof a=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<r.height;s++)for(let i=0;i<r.width;i++)a[i+s*r.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),t=Math.min(t,s),n=Math.max(n,s));return{top:t,left:e,right:o+1,bottom:n+1}}function ee(r){let e=1/0,t=1/0,n=0,o=0;for(const a of r){const s=ue(a);s.left<e&&(e=s.left),s.top<t&&(t=s.top),s.right>o&&(o=s.right),s.bottom>n&&(n=s.bottom)}return{top:t,left:e,right:o,bottom:n}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ce=Object.prototype.toString,L=Array.isArray||function(e){return ce.call(e)==="[object Array]"};function I(r){return typeof r=="function"}function fe(r){return L(r)?"array":typeof r}function N(r){return r.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function O(r,e){return r!=null&&typeof r=="object"&&e in r}function pe(r,e){return r!=null&&typeof r!="object"&&r.hasOwnProperty&&r.hasOwnProperty(e)}var ge=RegExp.prototype.test;function he(r,e){return ge.call(r,e)}var de=/\S/;function ye(r){return!he(de,r)}var ve={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function be(r){return String(r).replace(/[&<>"'`=\/]/g,function(t){return ve[t]})}var me=/\s*/,Ae=/\s+/,q=/\s*=/,We=/\s*\}/,we=/#|\^|\/|>|\{|&|=|!/;function Se(r,e){if(!r)return[];var t=!1,n=[],o=[],a=[],s=!1,i=!1,l="",f=0;function g(){if(s&&!i)for(;a.length;)delete o[a.pop()];else a=[];s=!1,i=!1}var y,b,V;function C(A){if(typeof A=="string"&&(A=A.split(Ae,2)),!L(A)||A.length!==2)throw new Error("Invalid tags: "+A);y=new RegExp(N(A[0])+"\\s*"),b=new RegExp("\\s*"+N(A[1])),V=new RegExp("\\s*"+N("}"+A[1]))}C(e||d.tags);for(var p=new R(r),m,u,v,E,B,w;!p.eos();){if(m=p.pos,v=p.scanUntil(y),v)for(var x=0,oe=v.length;x<oe;++x)E=v.charAt(x),ye(E)?(a.push(o.length),l+=E):(i=!0,t=!0,l+=" "),o.push(["text",E,m,m+1]),m+=1,E===`
`&&(g(),l="",f=0,t=!1);if(!p.scan(y))break;if(s=!0,u=p.scan(we)||"name",p.scan(me),u==="="?(v=p.scanUntil(q),p.scan(q),p.scanUntil(b)):u==="{"?(v=p.scanUntil(V),p.scan(We),p.scanUntil(b),u="&"):v=p.scanUntil(b),!p.scan(b))throw new Error("Unclosed tag at "+p.pos);if(u==">"?B=[u,v,m,p.pos,l,f,t]:B=[u,v,m,p.pos],f++,o.push(B),u==="#"||u==="^")n.push(B);else if(u==="/"){if(w=n.pop(),!w)throw new Error('Unopened section "'+v+'" at '+m);if(w[1]!==v)throw new Error('Unclosed section "'+w[1]+'" at '+m)}else u==="name"||u==="{"||u==="&"?i=!0:u==="="&&C(v)}if(g(),w=n.pop(),w)throw new Error('Unclosed section "'+w[1]+'" at '+p.pos);return Le(Pe(o))}function Pe(r){for(var e=[],t,n,o=0,a=r.length;o<a;++o)t=r[o],t&&(t[0]==="text"&&n&&n[0]==="text"?(n[1]+=t[1],n[3]=t[3]):(e.push(t),n=t));return e}function Le(r){for(var e=[],t=e,n=[],o,a,s=0,i=r.length;s<i;++s)switch(o=r[s],o[0]){case"#":case"^":t.push(o),n.push(o),t=o[4]=[];break;case"/":a=n.pop(),a[5]=o[2],t=n.length>0?n[n.length-1][4]:e;break;default:t.push(o)}return e}function R(r){this.string=r,this.tail=r,this.pos=0}R.prototype.eos=function(){return this.tail===""};R.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n};R.prototype.scanUntil=function(e){var t=this.tail.search(e),n;switch(t){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=n.length,n};function P(r,e){this.view=r,this.cache={".":this.view},this.parent=e}P.prototype.push=function(e){return new P(e,this)};P.prototype.lookup=function(e){var t=this.cache,n;if(t.hasOwnProperty(e))n=t[e];else{for(var o=this,a,s,i,l=!1;o;){if(e.indexOf(".")>0)for(a=o.view,s=e.split("."),i=0;a!=null&&i<s.length;)i===s.length-1&&(l=O(a,s[i])||pe(a,s[i])),a=a[s[i++]];else a=o.view[e],l=O(o.view,e);if(l){n=a;break}o=o.parent}t[e]=n}return I(n)&&(n=n.call(this.view)),n};function h(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}h.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};h.prototype.parse=function(e,t){var n=this.templateCache,o=e+":"+(t||d.tags).join(":"),a=typeof n<"u",s=a?n.get(o):void 0;return s==null&&(s=Se(e,t),a&&n.set(o,s)),s};h.prototype.render=function(e,t,n,o){var a=this.getConfigTags(o),s=this.parse(e,a),i=t instanceof P?t:new P(t,void 0);return this.renderTokens(s,i,n,e,o)};h.prototype.renderTokens=function(e,t,n,o,a){for(var s="",i,l,f,g=0,y=e.length;g<y;++g)f=void 0,i=e[g],l=i[0],l==="#"?f=this.renderSection(i,t,n,o,a):l==="^"?f=this.renderInverted(i,t,n,o,a):l===">"?f=this.renderPartial(i,t,n,a):l==="&"?f=this.unescapedValue(i,t):l==="name"?f=this.escapedValue(i,t,a):l==="text"&&(f=this.rawValue(i)),f!==void 0&&(s+=f);return s};h.prototype.renderSection=function(e,t,n,o,a){var s=this,i="",l=t.lookup(e[1]);function f(b){return s.render(b,t,n,a)}if(l){if(L(l))for(var g=0,y=l.length;g<y;++g)i+=this.renderTokens(e[4],t.push(l[g]),n,o,a);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],t.push(l),n,o,a);else if(I(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(t.view,o.slice(e[3],e[5]),f),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],t,n,o,a);return i}};h.prototype.renderInverted=function(e,t,n,o,a){var s=t.lookup(e[1]);if(!s||L(s)&&s.length===0)return this.renderTokens(e[4],t,n,o,a)};h.prototype.indentPartial=function(e,t,n){for(var o=t.replace(/[^ \t]/g,""),a=e.split(`
`),s=0;s<a.length;s++)a[s].length&&(s>0||!n)&&(a[s]=o+a[s]);return a.join(`
`)};h.prototype.renderPartial=function(e,t,n,o){if(n){var a=this.getConfigTags(o),s=I(n)?n(e[1]):n[e[1]];if(s!=null){var i=e[6],l=e[5],f=e[4],g=s;l==0&&f&&(g=this.indentPartial(s,f,i));var y=this.parse(g,a);return this.renderTokens(y,t,n,g,o)}}};h.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(n!=null)return n};h.prototype.escapedValue=function(e,t,n){var o=this.getConfigEscape(n)||d.escape,a=t.lookup(e[1]);if(a!=null)return typeof a=="number"&&o===d.escape?String(a):o(a)};h.prototype.rawValue=function(e){return e[1]};h.prototype.getConfigTags=function(e){return L(e)?e:e&&typeof e=="object"?e.tags:void 0};h.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!L(e))return e.escape};var d={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(r){M.templateCache=r},get templateCache(){return M.templateCache}},M=new h;d.clearCache=function(){return M.clearCache()};d.parse=function(e,t){return M.parse(e,t)};d.render=function(e,t,n,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+fe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return M.render(e,t,n,o)};d.escape=be;d.Scanner=R;d.Context=P;d.Writer=h;class te{constructor(e,t){this.template=e,this.state=t,this.ast=d.parse(e)}getValue(){return this.value===void 0&&(this.value=d.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const n of this.getUsedVariables().values())t.push(this.state.onVariableChange(n).subscribe(()=>{const o=d.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const n of t)n.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const n of e){const o=n[0],a=n[1],s=n[4];["name","&","#","^"].includes(o)&&t.add(a),s!==void 0&&typeof s!="string"&&this.recursiveGetUsedVariables(s,t)}}}async function Ce(){var r;const e=await Z();for(const t of e){const n=(r=t.properties)!==null&&r!==void 0?r:[];for(const o of n){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const a=new te(o.value,WA.state);if(a.isPureString())continue;const s=a.getValue();await K(t.name,o.name,s),a.onChange(async i=>{await K(t.name,o.name,i)})}}}async function Ee(){var r;const e=await k();for(const[t,n]of e.entries())if(n.type!=="objectgroup"){const o=(r=n.properties)!==null&&r!==void 0?r:[];for(const a of o){if(a.type==="int"||a.type==="bool"||a.type==="object"||typeof a.value!="string")continue;const s=new te(a.value,WA.state);if(s.isPureString())continue;const i=s.getValue();$(t,a.name,i),s.onChange(l=>{$(t,a.name,l)})}}}async function K(r,e,t){console.log(r),(await WA.room.area.get(r)).setProperty(e,t)}function $(r,e,t){WA.room.setProperty(r,e,t),e==="visible"&&(t?WA.room.showLayer(r):WA.room.hideLayer(r))}const Te="https://admin.workadventu.re/html";let G,D=0,_=0;function z(r){if(WA.state[r.name]){let e=r.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.showLayer(t);e=r.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.hideLayer(t)}else{let e=r.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.hideLayer(t);e=r.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.showLayer(t)}}function Me(r){const e=r.properties.getString("openSound"),t=r.properties.getNumber("soundRadius");let n=1;if(t){const o=ne(r.properties.mustGetString("openLayer").split(`
`));if(o>t)return;n=1-o/t}e&&WA.sound.loadSound(e).play({volume:n})}function ke(r){const e=r.properties.getString("closeSound"),t=r.properties.getNumber("soundRadius");let n=1;if(t){const o=ne(r.properties.mustGetString("closeLayer").split(`
`));if(o>t)return;n=1-o/t}e&&WA.sound.loadSound(e).play({volume:n})}function re(r){return r.map(e=>G.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function ne(r){const e=re(r),t=ee(e),n=((t.right-t.left)/2+t.left)*32,o=((t.bottom-t.top)/2+t.top)*32;return Math.sqrt(Math.pow(D-n,2)+Math.pow(_-o,2))}function Re(r){WA.state.onVariableChange(r.name).subscribe(()=>{WA.state[r.name]?Me(r):ke(r),z(r)}),z(r)}function H(r,e,t,n){const o=r.name;let a,s,i=!1;const l=t.getString("tag");let f=!0;l&&!WA.player.tags.includes(l)&&(f=!1);const g=!!l;function y(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=t.getString("closeTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,b()}})}function b(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=t.getString("openTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,y()}})}function V(){let u;if(r.type==="tilelayer")u=ee(re(e.properties.mustGetString("closeLayer").split(`
`)));else{if(r.x===void 0||r.y===void 0||r.width===void 0||r.height===void 0)throw new Error(`Doorstep zone "${r.name}" is missing x, y, width or height`);u={top:r.y,left:r.x,right:r.x+r.width,bottom:r.y+r.height}}s=WA.room.website.create({name:"doorKeypad"+o,url:n+"/keypad.html#"+encodeURIComponent(o),position:{x:u.right*32,y:u.top*32,width:32*3,height:32*4},allowApi:!0})}function C(){s&&(WA.room.website.delete(s.name),s=void 0)}function p(){if(i=!0,t.getBoolean("autoOpen")&&f){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(g&&!f||!g)&&(t.getString("code")||t.getString("codeVariable"))){V();return}f&&(WA.state[e.name]?y():b())}function m(){i=!1,t.getBoolean("autoClose")&&(WA.state[e.name]=!1),a&&a.remove(),C()}r.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(p),WA.room.onLeaveLayer(o).subscribe(m)):(WA.room.area.onEnter(o).subscribe(p),WA.room.area.onLeave(o).subscribe(m)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!t.getBoolean("autoClose")&&WA.state[e.name]===!0&&y(),s&&WA.state[e.name]===!0&&C(),!t.getBoolean("autoOpen")&&WA.state[e.name]===!1&&b())})}function Ve(r){const e=r.properties.mustGetString("bellSound"),t=r.properties.getNumber("soundRadius");let n=1;if(t){const o=Math.sqrt(Math.pow(r.x-D,2)+Math.pow(r.y-_,2));if(o>t)return;n=1-o/t}WA.sound.loadSound(e).play({volume:n})}function Be(r){WA.state[r.name]===void 0&&(WA.state[r.name]=0),WA.state.onVariableChange(r.name).subscribe(()=>{WA.state[r.name]&&Ve(r)})}function X(r,e,t){let n;const o=e.getString("bellPopup");if(t.type==="tilelayer"){const a=t.name;WA.room.onEnterLayer(a).subscribe(()=>{var s;o?n=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[r]=WA.state[r]+1}}]):WA.state[r]=WA.state[r]+1}),WA.room.onLeaveLayer(a).subscribe(()=>{n&&(n.close(),n=void 0)})}else{const a=t.name;WA.room.area.onEnter(a).subscribe(()=>{var s;o?n=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[r]=WA.state[r]+1}}]):WA.state[r]=WA.state[r]+1}),WA.room.area.onLeave(a).subscribe(()=>{n&&(n.close(),n=void 0)})}}async function xe(r){r=r??Te;const e=await se();G=await k();for(const t of e.values())t.properties.get("door")&&Re(t),t.properties.get("bell")&&Be(t);for(const t of G.values()){const n=new S(t.properties),o=n.getString("doorVariable");if(o&&t.type==="tilelayer"){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+t.name+'"');H(t,s,n,r)}const a=n.getString("bellVariable");a&&t.type==="tilelayer"&&X(a,n,t)}for(const t of await Z()){const n=new S(t.properties),o=n.getString("doorVariable");if(o){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+t.name+'"');H(t,s,n,r)}const a=n.getString("bellVariable");a&&X(a,n,t)}WA.player.onPlayerMove(t=>{D=t.x,_=t.y})}function je(r,e){const t=r.getString("bindVariable");if(t){const n=r.get("enterValue"),o=r.get("leaveValue"),a=r.getString("triggerMessage"),s=r.getString("tag");Ne(t,e,n,o,a,s)}}function Ne(r,e,t,n,o,a){a&&!WA.player.tags.includes(a)||(t!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[r]=t)}),n!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[r]=n}))}async function Ge(){const r=await k();for(const e of r.values()){const t=new S(e.properties);je(t,e.name)}}let Y;async function Ie(r){const e=await WA.room.getTiledMap();r=r??J,Y=await k();const t=e.layers.find(n=>n.name==="configuration");if(t){const o=new S(t.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(r+"/configuration.html",!0)});for(const a of Y.values()){const s=new S(a.properties),i=s.getString("openConfig");i&&a.type==="tilelayer"&&De(i.split(","),a.name,s)}}}function De(r,e,t){let n;const o=t.getString("openConfigAdminTag");let a=!0;o&&!WA.player.tags.includes(o)&&(a=!1);function s(){var l;n&&n.remove(),n=WA.ui.displayActionMessage({message:(l=t.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>U(r)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=t.getString("openConfigTrigger");a&&(l&&l==="onaction"?s():U(r))}),WA.room.onLeaveLayer(e).subscribe(()=>{n&&n.remove(),i()})}function _e(){return WA.onInit().then(()=>{xe().catch(r=>console.error(r)),Ge().catch(r=>console.error(r)),Ie().catch(r=>console.error(r)),Ee().catch(r=>console.error(r)),Ce().catch(r=>console.error(r))}).catch(r=>console.error(r))}console.log("Script started successfully");let c=0,W;WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags);function r(){if(!WA.room.mapURL.replace("github","").includes("hub")&&!WA.player.tags.some(t=>t.startsWith("subscribed"))){let t=WA.room.id.replace("https://play.workadventu.re","");WA.nav.goToRoom(t.replace(/(.+\/).+/,"hub"))}}function e(){WA.player.tags.push("subscribed_temp")}WA.event.on("connectionState").subscribe(t=>{t.data==WA.player.uuid&&e()}),WA.event.broadcast("connectionState","test"),r(),WA.players.configureTracking(),WA.room.area.onEnter("liveArea1").subscribe(()=>{console.log("liveArea1");let t=WA.players.list();for(let n of t)c++,console.log("les joueurs",t,n);console.log("Number of viewers after entering:",c),WA.state.saveVariable("varNumber1",{default:c})}),WA.room.area.onEnter("liveArea2").subscribe(()=>{console.log("liveArea2");let t=WA.players.list();for(let n of t)c++,console.log("les joueurs",t,n);console.log("Number of viewers after entering:",c),WA.state.saveVariable("varNumber2",{default:c})}),WA.room.area.onEnter("liveArea3").subscribe(()=>{console.log("liveArea3");let t=WA.players.list();for(let n of t)c++,console.log("les joueurs",t,n);console.log("Number of viewers after entering:",c),WA.state.saveVariable("varNumber3",{default:c})}),WA.room.area.onLeave("liveArea1").subscribe(()=>{console.log("Leaving liveArea1"),c=0;let t=WA.players.list();for(let n of t)c++,console.log(n);c<0&&(c=0),console.log("Number of viewers after leaving:",c),WA.state.saveVariable("varNumber1",{default:c})}),WA.room.area.onLeave("liveArea2").subscribe(()=>{console.log("Leaving liveArea2"),c=0;let t=WA.players.list();for(let n of t)c++,console.log(n);c<0&&(c=0),console.log("Number of viewers after leaving:",c),WA.state.saveVariable("varNumber2",{default:c})}),WA.room.area.onLeave("liveArea3").subscribe(()=>{console.log("Leaving liveArea3"),c=0;let t=WA.players.list();for(let n of t)c++,console.log(n);c<0&&(c=0),console.log("Number of viewers after leaving:",c),WA.state.saveVariable("varNumber3",{default:c})}),WA.room.onEnterLayer("openDoorZone").subscribe(()=>{WA.player.tags.some(t=>t.startsWith("subscribed"))?(WA.room.showLayer("above/openDoor"),WA.room.hideLayer("closeDoor")):(WA.room.hideLayer("above/openDoor"),WA.room.showLayer("closeDoor"))}),WA.room.area.onEnter("connexion_popup").subscribe(()=>{WA.player.tags.some(t=>t=="member")?WA.player.tags.some(t=>t.startsWith("subscribed"))||(W=WA.ui.openPopup("message","Vous devez vous être connecté a twitch et être abonné pour entrer",[])):W=WA.ui.openPopup("message","Vous devez avoir un compte WorkAdventure pour entrer",[])}),WA.room.area.onLeave("connexion_popup").subscribe(T),WA.room.area.onEnter("liveAreaPopup1").subscribe(()=>{W=WA.ui.openPopup("livePopup1","Zone de live",[])}),WA.room.area.onLeave("liveAreaPopup1").subscribe(T),WA.room.area.onEnter("liveAreaPopup2").subscribe(()=>{W=WA.ui.openPopup("livePopup2","Zone de live",[])}),WA.room.area.onLeave("liveAreaPopup2").subscribe(T),WA.room.area.onEnter("liveAreaPopup3").subscribe(()=>{W=WA.ui.openPopup("livePopup3","Zone de live",[])}),WA.room.area.onLeave("liveAreaPopup3").subscribe(T),WA.room.area.onEnter("RediffClipAreaPopup").subscribe(()=>{W=WA.ui.openPopup("RediffClipPopup","Rediffs et clips",[])}),WA.room.area.onLeave("RediffClipAreaPopup").subscribe(T),_e().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(r=>console.error(r));function T(){W!==void 0&&(W.close(),W=void 0)}