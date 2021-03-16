/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${s}--\x3e`,i=new RegExp(`${s}|${r}`),n="$lit$";class o{constructor(e,t){this.parts=[],this.element=t;const r=[],o=[],l=document.createTreeWalker(t.content,133,null,!1);let p=0,h=-1,u=0;const{strings:m,values:{length:y}}=e;for(;u<y;){const e=l.nextNode();if(null!==e){if(h++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let r=0;for(let e=0;e<s;e++)a(t[e].name,n)&&r++;for(;r-- >0;){const t=m[u],s=c.exec(t)[2],r=s.toLowerCase()+n,o=e.getAttribute(r);e.removeAttribute(r);const a=o.split(i);this.parts.push({type:"attribute",index:h,name:s,strings:a}),u+=a.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,o=t.split(i),l=o.length-1;for(let t=0;t<l;t++){let r,i=o[t];if(""===i)r=d();else{const e=c.exec(i);null!==e&&a(e[2],n)&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-n.length)+e[3]),r=document.createTextNode(i)}s.insertBefore(r,e),this.parts.push({type:"node",index:++h})}""===o[l]?(s.insertBefore(d(),e),r.push(e)):e.data=o[l],u+=l}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&h!==p||(h++,t.insertBefore(d(),e)),p=h,this.parts.push({type:"node",index:h}),null===e.nextSibling?e.data="":(r.push(e),h--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=o.pop()}for(const e of r)e.parentNode.removeChild(e)}}const a=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},l=e=>-1!==e.index,d=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(e,t){const{element:{content:s},parts:r}=e,i=document.createTreeWalker(s,133,null,!1);let n=u(r),o=r[n],a=-1,l=0;const d=[];let c=null;for(;i.nextNode();){a++;const e=i.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==o&&o.index===a;)o.index=null!==c?-1:o.index-l,n=u(r,n),o=r[n]}d.forEach((e=>e.parentNode.removeChild(e)))}const h=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},u=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(l(t))return s}return-1},m=new WeakMap,y=e=>"function"==typeof e&&m.has(e),g={},f={};class _{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],r=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let n,o=0,a=0,d=i.nextNode();for(;o<r.length;)if(n=r[o],l(n)){for(;a<n.index;)a++,"TEMPLATE"===d.nodeName&&(s.push(d),i.currentNode=d.content),null===(d=i.nextNode())&&(i.currentNode=s.pop(),d=i.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),b=` ${s} `;class S{constructor(e,t,s,r){this.strings=e,this.values=t,this.type=s,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let o=0;o<e;o++){const e=this.strings[o],a=e.lastIndexOf("\x3c!--");i=(a>-1||i)&&-1===e.indexOf("--\x3e",a+1);const l=c.exec(e);t+=null===l?e+(i?b:r):e.substr(0,l.index)+l[1]+l[2]+n+l[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}const w=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class P{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let r="";for(let i=0;i<t;i++){r+=e[i];const t=s[i];if(void 0!==t){const e=t.value;if(w(e)||!x(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||w(e)&&e===this.value||(this.value=e,y(e)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}const e=this.__pendingValue;e!==g&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof S?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof _&&this.value.template===t)this.value.update(e.values);else{const s=new _(t,e.processor,this.options),r=s._clone();s.update(e.values),this.__commitNode(r),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,r=0;for(const i of e)s=t[r],void 0===s&&(s=new N(this.options),t.push(s),0===r?s.appendIntoPart(this):s.insertAfterPart(t[r-1])),s.setValue(i),s.commit(),r++;r<t.length&&(t.length=r,this.clear(s&&s.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=g}}class A extends P{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends C{}let k=!1;(()=>{try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class V{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=U(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const U=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function M(e){let t=O.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},O.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const i=e.strings.join(s);return r=t.keyString.get(i),void 0===r&&(r=new o(e,e.getTemplateElement()),t.keyString.set(i,r)),t.stringsArray.set(e.strings,r),r}const O=new Map,R=new WeakMap,$=new class{handleAttributeExpressions(e,t,s,r){const i=t[0];return"."===i?new A(e,t.slice(1),s).parts:"@"===i?[new V(e,t.slice(1),r.eventContext)]:"?"===i?[new E(e,t.slice(1),s)]:new P(e,t,s).parts}handleTextExpression(e){return new N(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const j=(e,...t)=>new S(e,t,"html",$),z=(e,t)=>`${e}--${t}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const L=e=>t=>{const r=z(t.type,e);let i=O.get(r);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},O.set(r,i));let n=i.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(s);if(n=i.keyString.get(a),void 0===n){const s=t.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(s,e),n=new o(t,s),i.keyString.set(a,n)}return i.stringsArray.set(t.strings,n),n},I=["html","svg"],B=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const F={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},H=(e,t)=>t!==e&&(t==t||e==e),D={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:H};class W extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,s)=>{const r=this._attributeNameForProperty(s,t);void 0!==r&&(this._attributeToPropertyMap.set(r,s),e.push(r))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=D){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,s,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(r){const i=this[e];this[t]=r,this.requestUpdateInternal(e,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||D}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=H){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,r=t.converter||F,i="function"==typeof r?r:r.fromAttribute;return i?i(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,r=t.converter;return(r&&r.toAttribute||F.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=D){const r=this.constructor,i=r._attributeNameForProperty(e,s);if(void 0!==i){const e=r._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,r=s._attributeToPropertyMap.get(e);if(void 0!==r){const e=s.getPropertyOptions(r);this._updateState=16|this._updateState,this[r]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let r=!0;if(void 0!==e){const i=this.constructor;s=s||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}W.finalized=!0;const J=Element.prototype;J.msMatchesSelector||J.webkitMatchesSelector;const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol();class K{constructor(e,t){if(t!==Y)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Q=(e,...t)=>{const s=t.reduce(((t,s,r)=>t+(e=>{if(e instanceof K)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[r+1]),e[0]);return new K(s,Y)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const X={};class Z extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight(((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e)),s),s=t(e,new Set),r=[];s.forEach((e=>r.unshift(e))),this._styles=r}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!G){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new K(String(t),Y)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==X&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return X}}Z.finalized=!0,Z.render=(e,s,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const i=r.scopeName,n=R.has(s),o=q&&11===s.nodeType&&!!s.host,a=o&&!B.has(i),l=a?document.createDocumentFragment():s;if(((e,s,r)=>{let i=R.get(s);void 0===i&&(t(s,s.firstChild),R.set(s,i=new N(Object.assign({templateFactory:M},r))),i.appendInto(s)),i.setValue(e),i.commit()})(e,l,Object.assign({templateFactory:L(i)},r)),a){const e=R.get(l);R.delete(l);((e,t,s)=>{B.add(e);const r=s?s.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:n}=i;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(r,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=i[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{I.forEach((t=>{const s=O.get(z(t,e));void 0!==s&&s.keyString.forEach((e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{s.add(e)})),p(e,s)}))}))})(e);const a=r.content;s?function(e,t,s=null){const{element:{content:r},parts:i}=e;if(null==s)return void r.appendChild(t);const n=document.createTreeWalker(r,133,null,!1);let o=u(i),a=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===s&&(a=h(t),s.parentNode.insertBefore(t,s));-1!==o&&i[o].index===l;){if(a>0){for(;-1!==o;)i[o].index+=a,o=u(i,o);return}o=u(i,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(r,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),p(s,e)}})(i,l,e.value instanceof _?e.value.template:void 0),t(s,s.firstChild),s.appendChild(l),R.set(s,e)}!n&&o&&window.ShadyCSS.styleElement(s.host)};const ee={easy:5,medium:9,hard:15};window.customElements.define("card-game",class extends Z{static get styles(){return Q`
      #card {
        background-color: transparent;
        width: 100px;
        height: 100px;
        perspective: 1000px;
      }
      #card.played {
        display: none;
      }
      #card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }
      #card-front,
      #card-back {
        position: absolute;
        width: 90%;
        height: 90%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border: 5px white;
        border-style: solid;
        border-radius: 30px;
      }
      #card-front {
        background: -webkit-gradient(
          linear,
          left top,
          right top,
          from(var(--color-p1)),
          to(var(--color-scondary-p1))
        );
        background: linear-gradient(
          to right,
          var(--color-p1),
          var(--color-scondary-p1)
        );
      }
      #card-back {
        background-color: var(--color-scondary-p2);
        transform: rotateY(180deg);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 65px;
      }

      .open {
        transform: rotateY(180deg);
      }
    `}static get properties(){return{symbol:{type:String},open:{type:Boolean},played:{type:Boolean}}}constructor(){super(),this.symbol="🐲",this.open=!1,this.played=!1}firstUpdated(){this.addEventListener("open",(()=>{this.open=!0})),this.addEventListener("close",(()=>{this.open=!1})),this.addEventListener("played",(()=>{this.played=!0}))}render(){return j`
      <div id="card" class="${this.played?"played":""}">
        <div id="card-inner" class="${this.open?"open":""}">
          <div id="card-front"></div>
          <div id="card-back">${this.symbol}</div>
        </div>
      </div>
    `}}),window.customElements.define("score-game",class extends Z{static get styles(){return Q`
      :host {
        display: flex;
        height: 128px;
        width: 1024px;
        justify-content: space-between;
        align-items: center;
      }

      .container {
        display: grid;
        grid-template-columns: 1fr 2fr;
        height: 80px;
        color: #fafafa;
        border-radius: 30px;
      }

      .container.active {
        box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
        -webkit-box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
        -moz-box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
      }

      .score,
      .player-tag {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .player-tag {
        border: 5px white;
        border-style: solid;
        border-right: 0;
        font-weight: bolder;
        border-radius: 30px 0 0 30px;
        padding-left: 20px;
        padding-right: 10px;
      }
      .score {
        border: 5px white;
        border-style: solid;
        border-radius: 0 30px 30px 0;
      }
      .container {
        background: gray;
      }
      .player-1.active .player-tag {
        background: var(--color-p1);
      }
      .player-1.active .score {
        background: var(--color-scondary-p1);
      }
      .player-2.active .player-tag {
        background: var(--color-p2);
      }
      .player-2.active .score {
        background: var(--color-scondary-p2);
      }
      ::slotted(span) {
        color: #fafafa;
        font-size: 30px;
        font-weight: bolder;
      }
      h1 {
        margin: 0;
      }
    `}static get properties(){return{turn:{type:Number,reflect:!0}}}constructor(){super(),this.turn=1}attributeChangedCallback(e,t,s){"turn"===e&&null!==t&&new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3").play(),super.attributeChangedCallback(e,t,s)}render(){return j`
      <div class="container player-1 ${1===this.turn?"active":""}">
        <div class="player-tag">
          <h1><slot name="name-player1">P1</slot></h1>
        </div>
        <div class="score"><slot name="player1"></slot></div>
      </div>

      <div class="container player-2 ${2===this.turn?"active":""}">
        <div class="player-tag">
          <h1><slot name="name-player2">P1</slot></h1>
        </div>
        <div class="score"><slot name="player2"></slot></div>
      </div>
    `}}),window.customElements.define("memory-game",class extends Z{static get styles(){return Q`
      :host {
        display: block;
        font-family: Futura, sans-serif;
        --color-p1: #c848b9;
        --color-scondary-p1: #f962a7;
        --color-p2: #ffba69;
        --color-scondary-p2: #fd836d;
      }

      .board {
        height: 640px;
        width: 1024px;
        background: rgba(255, 186, 105, 0.7);
        padding: 40px 0 40px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
        align-content: center;
        justify-items: center;
        border: 5px white;
        border-style: solid;
        border-radius: 30px;
        box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
        -webkit-box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
        -moz-box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
      }
    `}static get properties(){return{deck:{type:Array,value:[]},turn:{type:Number},isOver:{type:Boolean},score:{type:Object},opened:{type:Array},canMove:{type:Boolean},gameDifficulty:{attribute:"game-difficulty",type:Number,converter:{fromAttribute:e=>["easy","medium","hard"][e],toAttribute:e=>["easy","medium","hard"].indexOf(e)}},namePlayer1:{attribute:"player-1",type:String,reflect:!0,converter:e=>void 0!==e&&"string"==typeof e?e.toUpperCase().substr(0,2):""},namePlayer2:{attribute:"player-2",type:String,reflect:!0,converter:e=>void 0!==e&&"string"==typeof e?e.toUpperCase().substr(0,2):""}}}__shuffleCards(){const e=["🌟","🍒","🍭","🍰","🍓","🎨","🚗","🎀","💖","☠️","👾","🐶","👻","👑","🙂"],t=e=>{const t=Math.ceil(0),s=Math.floor(e);return Math.floor(Math.random()*(s-t+1))+t},s=ee[this.gameDifficulty];let r=new Set;for(;r.size<s;)r.add(e[t(e.length-1)]);r=[...r];const i=[new Set,new Set];for(;i[0].size<r.length||i[1].size<r.length;)i[0].add(r[t(r.length-1)]),i[1].add(r[t(r.length-1)]);const n=[...i[0]],o=[...i[1]],a=[],l=2*r.length-1;for(;n.length>0||o.length>0;){const e=t(l),s=t(l);a[e]||(a[e]=n.pop()),a[s]||(a[s]=o.pop())}this.deck=a.map((e=>({value:e,isOpen:!1})))}_initGame(){this.__shuffleCards(),this.turn=1,this.isOver=!1,this.canMove=!0,this.score={1:0,2:0},this.opened=[]}__clearCards(e){return new Promise((t=>{setTimeout((()=>{this.opened[0].target.dispatchEvent(new Event(e)),this.opened[1].target.dispatchEvent(new Event(e)),this.opened=[],this.canMove=!0,t()}),1500)}))}__dispatchEvent(e,t){this.dispatchEvent(new Event(e,t))}_validPlay(){this.canMove=!1,this.opened[0].symbol===this.opened[1].symbol?this.__clearCards("played").then((()=>{new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3").play(),this.score[this.turn]+=1;const e=ee[this.gameDifficulty];this.score[1]+this.score[2]===e&&this.__dispatchEvent("gameOver",{detail:{winner:this.score[1]>this.score[2]?1:2}}),this.requestUpdate()})):this.__clearCards("close").then((()=>{this.turn=1===this.turn?2:1}))}_openCard(e){this.opened.length>=0&&this.opened.length<=2&&this.canMove&&(e.target.dispatchEvent(new Event("open")),this.opened.push({symbol:e.target.symbol,target:e.target}),2===this.opened.length&&this._validPlay())}constructor(){super(),this._initGame(),this.gameDifficulty=0}updated(e){e.has("gameDifficulty")&&this._initGame()}render(){return j`
      <score-game turn="${this.turn}">
        <span slot="name-player1">${this.namePlayer1}</span>
        <span slot="name-player2">${this.namePlayer2}</span>
        <span slot="player1">${this.score[1]}</span>
        <span slot="player2">${this.score[2]}</span>
      </score-game>
      <div class="board">
        ${this.deck.map((e=>j`
            <card-game
              symbol="${e.value}"
              @click="${this._openCard}"
            ></card-game>
          `))}
      </div>
    `}}),document.body.appendChild(function(){const e=document.createElement("memory-game");return e.setAttribute("player-1","Java"),e.setAttribute("player-2","Moushi"),e.setAttribute("game-difficulty","2"),e}())})();