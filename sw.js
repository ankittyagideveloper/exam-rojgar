(function(){"use strict";try{self["workbox:core:7.2.0"]&&_()}catch{}const pn=(t,...e)=>{let n=t;return e.length>0&&(n+=` :: ${JSON.stringify(e)}`),n};class h extends Error{constructor(e,n){const r=pn(e,n);super(r),this.name=e,this.details=n}}const g={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},X=t=>[g.prefix,t,g.suffix].filter(e=>e&&e.length>0).join("-"),gn=t=>{for(const e of Object.keys(g))t(e)},L={updateDetails:t=>{gn(e=>{typeof t[e]=="string"&&(g[e]=t[e])})},getGoogleAnalyticsName:t=>t||X(g.googleAnalytics),getPrecacheName:t=>t||X(g.precache),getPrefix:()=>g.prefix,getRuntimeName:t=>t||X(g.runtime),getSuffix:()=>g.suffix},Fo=null;function Ge(t,e){const n=e();return t.waitUntil(n),n}try{self["workbox:precaching:7.2.0"]&&_()}catch{}const mn="__WB_REVISION__";function wn(t){if(!t)throw new h("add-to-cache-list-unexpected-type",{entry:t});if(typeof t=="string"){const i=new URL(t,location.href);return{cacheKey:i.href,url:i.href}}const{revision:e,url:n}=t;if(!n)throw new h("add-to-cache-list-unexpected-type",{entry:t});if(!e){const i=new URL(n,location.href);return{cacheKey:i.href,url:i.href}}const r=new URL(n,location.href),s=new URL(n,location.href);return r.searchParams.set(mn,e),{cacheKey:r.href,url:s.href}}class bn{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:n})=>{n&&(n.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:n,cachedResponse:r})=>{if(e.type==="install"&&n&&n.originalRequest&&n.originalRequest instanceof Request){const s=n.originalRequest.url;r?this.notUpdatedURLs.push(s):this.updatedURLs.push(s)}return r}}}class yn{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:n,params:r})=>{const s=r?.cacheKey||this._precacheController.getCacheKeyForURL(n.url);return s?new Request(s,{headers:n.headers}):n},this._precacheController=e}}let P;function _n(){if(P===void 0){const t=new Response("");if("body"in t)try{new Response(t.body),P=!0}catch{P=!1}P=!1}return P}async function En(t,e){let n=null;if(t.url&&(n=new URL(t.url).origin),n!==self.location.origin)throw new h("cross-origin-copy-response",{origin:n});const r=t.clone(),i={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},o=_n()?r.body:await r.blob();return new Response(o,i)}const In=t=>new URL(String(t),location.href).href.replace(new RegExp(`^${location.origin}`),"");function Je(t,e){const n=new URL(t);for(const r of e)n.searchParams.delete(r);return n.href}async function Dn(t,e,n,r){const s=Je(e.url,n);if(e.url===s)return t.match(e,r);const i=Object.assign(Object.assign({},r),{ignoreSearch:!0}),o=await t.keys(e,i);for(const a of o){const c=Je(a.url,n);if(s===c)return t.match(a,r)}}let Cn=class{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}};const Ye=new Set;async function Sn(){for(const t of Ye)await t()}function Tn(t){return new Promise(e=>setTimeout(e,t))}try{self["workbox:strategies:7.2.0"]&&_()}catch{}function j(t){return typeof t=="string"?new Request(t):t}class An{constructor(e,n){this._cacheKeys={},Object.assign(this,n),this.event=n.event,this._strategy=e,this._handlerDeferred=new Cn,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const r of this._plugins)this._pluginStateMap.set(r,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:n}=this;let r=j(e);if(r.mode==="navigate"&&n instanceof FetchEvent&&n.preloadResponse){const o=await n.preloadResponse;if(o)return o}const s=this.hasCallback("fetchDidFail")?r.clone():null;try{for(const o of this.iterateCallbacks("requestWillFetch"))r=await o({request:r.clone(),event:n})}catch(o){if(o instanceof Error)throw new h("plugin-error-request-will-fetch",{thrownErrorMessage:o.message})}const i=r.clone();try{let o;o=await fetch(r,r.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const a of this.iterateCallbacks("fetchDidSucceed"))o=await a({event:n,request:i,response:o});return o}catch(o){throw s&&await this.runCallbacks("fetchDidFail",{error:o,event:n,originalRequest:s.clone(),request:i.clone()}),o}}async fetchAndCachePut(e){const n=await this.fetch(e),r=n.clone();return this.waitUntil(this.cachePut(e,r)),n}async cacheMatch(e){const n=j(e);let r;const{cacheName:s,matchOptions:i}=this._strategy,o=await this.getCacheKey(n,"read"),a=Object.assign(Object.assign({},i),{cacheName:s});r=await caches.match(o,a);for(const c of this.iterateCallbacks("cachedResponseWillBeUsed"))r=await c({cacheName:s,matchOptions:i,cachedResponse:r,request:o,event:this.event})||void 0;return r}async cachePut(e,n){const r=j(e);await Tn(0);const s=await this.getCacheKey(r,"write");if(!n)throw new h("cache-put-with-no-response",{url:In(s.url)});const i=await this._ensureResponseSafeToCache(n);if(!i)return!1;const{cacheName:o,matchOptions:a}=this._strategy,c=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),p=u?await Dn(c,s.clone(),["__WB_REVISION__"],a):null;try{await c.put(s,u?i.clone():i)}catch(d){if(d instanceof Error)throw d.name==="QuotaExceededError"&&await Sn(),d}for(const d of this.iterateCallbacks("cacheDidUpdate"))await d({cacheName:o,oldResponse:p,newResponse:i.clone(),request:s,event:this.event});return!0}async getCacheKey(e,n){const r=`${e.url} | ${n}`;if(!this._cacheKeys[r]){let s=e;for(const i of this.iterateCallbacks("cacheKeyWillBeUsed"))s=j(await i({mode:n,request:s,event:this.event,params:this.params}));this._cacheKeys[r]=s}return this._cacheKeys[r]}hasCallback(e){for(const n of this._strategy.plugins)if(e in n)return!0;return!1}async runCallbacks(e,n){for(const r of this.iterateCallbacks(e))await r(n)}*iterateCallbacks(e){for(const n of this._strategy.plugins)if(typeof n[e]=="function"){const r=this._pluginStateMap.get(n);yield i=>{const o=Object.assign(Object.assign({},i),{state:r});return n[e](o)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let n=e,r=!1;for(const s of this.iterateCallbacks("cacheWillUpdate"))if(n=await s({request:this.request,response:n,event:this.event})||void 0,r=!0,!n)break;return r||n&&n.status!==200&&(n=void 0),n}}class Xe{constructor(e={}){this.cacheName=L.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[n]=this.handleAll(e);return n}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const n=e.event,r=typeof e.request=="string"?new Request(e.request):e.request,s="params"in e?e.params:void 0,i=new An(this,{event:n,request:r,params:s}),o=this._getResponse(i,r,n),a=this._awaitComplete(o,i,r,n);return[o,a]}async _getResponse(e,n,r){await e.runCallbacks("handlerWillStart",{event:r,request:n});let s;try{if(s=await this._handle(n,e),!s||s.type==="error")throw new h("no-response",{url:n.url})}catch(i){if(i instanceof Error){for(const o of e.iterateCallbacks("handlerDidError"))if(s=await o({error:i,event:r,request:n}),s)break}if(!s)throw i}for(const i of e.iterateCallbacks("handlerWillRespond"))s=await i({event:r,request:n,response:s});return s}async _awaitComplete(e,n,r,s){let i,o;try{i=await e}catch{}try{await n.runCallbacks("handlerDidRespond",{event:s,request:r,response:i}),await n.doneWaiting()}catch(a){a instanceof Error&&(o=a)}if(await n.runCallbacks("handlerDidComplete",{event:s,request:r,response:i,error:o}),n.destroy(),o)throw o}}class E extends Xe{constructor(e={}){e.cacheName=L.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(E.copyRedirectedCacheableResponsesPlugin)}async _handle(e,n){const r=await n.cacheMatch(e);return r||(n.event&&n.event.type==="install"?await this._handleInstall(e,n):await this._handleFetch(e,n))}async _handleFetch(e,n){let r;const s=n.params||{};if(this._fallbackToNetwork){const i=s.integrity,o=e.integrity,a=!o||o===i;r=await n.fetch(new Request(e,{integrity:e.mode!=="no-cors"?o||i:void 0})),i&&a&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await n.cachePut(e,r.clone()))}else throw new h("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return r}async _handleInstall(e,n){this._useDefaultCacheabilityPluginIfNeeded();const r=await n.fetch(e);if(!await n.cachePut(e,r.clone()))throw new h("bad-precaching-response",{url:e.url,status:r.status});return r}_useDefaultCacheabilityPluginIfNeeded(){let e=null,n=0;for(const[r,s]of this.plugins.entries())s!==E.copyRedirectedCacheableResponsesPlugin&&(s===E.defaultPrecacheCacheabilityPlugin&&(e=r),s.cacheWillUpdate&&n++);n===0?this.plugins.push(E.defaultPrecacheCacheabilityPlugin):n>1&&e!==null&&this.plugins.splice(e,1)}}E.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:t}){return!t||t.status>=400?null:t}},E.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:t}){return t.redirected?await En(t):t}};class Rn{constructor({cacheName:e,plugins:n=[],fallbackToNetwork:r=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new E({cacheName:L.getPrecacheName(e),plugins:[...n,new yn({precacheController:this})],fallbackToNetwork:r}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const n=[];for(const r of e){typeof r=="string"?n.push(r):r&&r.revision===void 0&&n.push(r.url);const{cacheKey:s,url:i}=wn(r),o=typeof r!="string"&&r.revision?"reload":"default";if(this._urlsToCacheKeys.has(i)&&this._urlsToCacheKeys.get(i)!==s)throw new h("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(i),secondEntry:s});if(typeof r!="string"&&r.integrity){if(this._cacheKeysToIntegrities.has(s)&&this._cacheKeysToIntegrities.get(s)!==r.integrity)throw new h("add-to-cache-list-conflicting-integrities",{url:i});this._cacheKeysToIntegrities.set(s,r.integrity)}if(this._urlsToCacheKeys.set(i,s),this._urlsToCacheModes.set(i,o),n.length>0){const a=`Workbox is precaching URLs without revision info: ${n.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(a)}}}install(e){return Ge(e,async()=>{const n=new bn;this.strategy.plugins.push(n);for(const[i,o]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(o),c=this._urlsToCacheModes.get(i),u=new Request(i,{integrity:a,cache:c,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:o},request:u,event:e}))}const{updatedURLs:r,notUpdatedURLs:s}=n;return{updatedURLs:r,notUpdatedURLs:s}})}activate(e){return Ge(e,async()=>{const n=await self.caches.open(this.strategy.cacheName),r=await n.keys(),s=new Set(this._urlsToCacheKeys.values()),i=[];for(const o of r)s.has(o.url)||(await n.delete(o),i.push(o.url));return{deletedURLs:i}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const n=new URL(e,location.href);return this._urlsToCacheKeys.get(n.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const n=e instanceof Request?e.url:e,r=this.getCacheKeyForURL(n);if(r)return(await self.caches.open(this.strategy.cacheName)).match(r)}createHandlerBoundToURL(e){const n=this.getCacheKeyForURL(e);if(!n)throw new h("non-precached-url",{url:e});return r=>(r.request=new Request(e),r.params=Object.assign({cacheKey:n},r.params),this.strategy.handle(r))}}let Q;const Z=()=>(Q||(Q=new Rn),Q);try{self["workbox:routing:7.2.0"]&&_()}catch{}const Qe="GET",H=t=>t&&typeof t=="object"?t:{handle:t};class B{constructor(e,n,r=Qe){this.handler=H(n),this.match=e,this.method=r}setCatchHandler(e){this.catchHandler=H(e)}}class kn extends B{constructor(e,n,r){const s=({url:i})=>{const o=e.exec(i.href);if(o&&!(i.origin!==location.origin&&o.index!==0))return o.slice(1)};super(s,n,r)}}class vn{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:n}=e,r=this.handleRequest({request:n,event:e});r&&e.respondWith(r)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:n}=e.data,r=Promise.all(n.urlsToCache.map(s=>{typeof s=="string"&&(s=[s]);const i=new Request(...s);return this.handleRequest({request:i,event:e})}));e.waitUntil(r),e.ports&&e.ports[0]&&r.then(()=>e.ports[0].postMessage(!0))}}))}handleRequest({request:e,event:n}){const r=new URL(e.url,location.href);if(!r.protocol.startsWith("http"))return;const s=r.origin===location.origin,{params:i,route:o}=this.findMatchingRoute({event:n,request:e,sameOrigin:s,url:r});let a=o&&o.handler;const c=e.method;if(!a&&this._defaultHandlerMap.has(c)&&(a=this._defaultHandlerMap.get(c)),!a)return;let u;try{u=a.handle({url:r,request:e,event:n,params:i})}catch(d){u=Promise.reject(d)}const p=o&&o.catchHandler;return u instanceof Promise&&(this._catchHandler||p)&&(u=u.catch(async d=>{if(p)try{return await p.handle({url:r,request:e,event:n,params:i})}catch(M){M instanceof Error&&(d=M)}if(this._catchHandler)return this._catchHandler.handle({url:r,request:e,event:n});throw d})),u}findMatchingRoute({url:e,sameOrigin:n,request:r,event:s}){const i=this._routes.get(r.method)||[];for(const o of i){let a;const c=o.match({url:e,sameOrigin:n,request:r,event:s});if(c)return a=c,(Array.isArray(a)&&a.length===0||c.constructor===Object&&Object.keys(c).length===0||typeof c=="boolean")&&(a=void 0),{route:o,params:a}}return{}}setDefaultHandler(e,n=Qe){this._defaultHandlerMap.set(n,H(e))}setCatchHandler(e){this._catchHandler=H(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new h("unregister-route-but-not-found-with-method",{method:e.method});const n=this._routes.get(e.method).indexOf(e);if(n>-1)this._routes.get(e.method).splice(n,1);else throw new h("unregister-route-route-not-registered")}}let $;const Mn=()=>($||($=new vn,$.addFetchListener(),$.addCacheListener()),$);function ee(t,e,n){let r;if(typeof t=="string"){const i=new URL(t,location.href),o=({url:a})=>a.href===i.href;r=new B(o,e,n)}else if(t instanceof RegExp)r=new kn(t,e,n);else if(typeof t=="function")r=new B(t,e,n);else if(t instanceof B)r=t;else throw new h("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return Mn().registerRoute(r),r}function Bn(t,e=[]){for(const n of[...t.searchParams.keys()])e.some(r=>r.test(n))&&t.searchParams.delete(n);return t}function*Nn(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:n="index.html",cleanURLs:r=!0,urlManipulation:s}={}){const i=new URL(t,location.href);i.hash="",yield i.href;const o=Bn(i,e);if(yield o.href,n&&o.pathname.endsWith("/")){const a=new URL(o.href);a.pathname+=n,yield a.href}if(r){const a=new URL(o.href);a.pathname+=".html",yield a.href}if(s){const a=s({url:i});for(const c of a)yield c.href}}class On extends B{constructor(e,n){const r=({request:s})=>{const i=e.getURLsToCacheKeys();for(const o of Nn(s.url,n)){const a=i.get(o);if(a){const c=e.getIntegrityForCacheKey(a);return{cacheKey:a,integrity:c}}}};super(r,e.strategy)}}function xn(t){const e=Z(),n=new On(e,t);ee(n)}const Ln="-precache-",Pn=async(t,e=Ln)=>{const r=(await self.caches.keys()).filter(s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t);return await Promise.all(r.map(s=>self.caches.delete(s))),r};function $n(){self.addEventListener("activate",(t=>{const e=L.getPrecacheName();t.waitUntil(Pn(e).then(n=>{}))}))}function Un(t){return Z().createHandlerBoundToURL(t)}function Fn(t){Z().precache(t)}function jn(t,e){Fn(t),xn(e)}function Hn(t){Ye.add(t)}function Ze(t){t.then(()=>{})}function Kn(){self.addEventListener("activate",()=>self.clients.claim())}class Vn extends B{constructor(e,{allowlist:n=[/./],denylist:r=[]}={}){super(s=>this._match(s),e),this._allowlist=n,this._denylist=r}_match({url:e,request:n}){if(n&&n.mode!=="navigate")return!1;const r=e.pathname+e.search;for(const s of this._denylist)if(s.test(r))return!1;return!!this._allowlist.some(s=>s.test(r))}}const Wn={cacheWillUpdate:async({response:t})=>t.status===200||t.status===0?t:null};class qn extends Xe{constructor(e={}){super(e),this.plugins.some(n=>"cacheWillUpdate"in n)||this.plugins.unshift(Wn),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,n){const r=[],s=[];let i;if(this._networkTimeoutSeconds){const{id:c,promise:u}=this._getTimeoutPromise({request:e,logs:r,handler:n});i=c,s.push(u)}const o=this._getNetworkPromise({timeoutId:i,request:e,logs:r,handler:n});s.push(o);const a=await n.waitUntil((async()=>await n.waitUntil(Promise.race(s))||await o)());if(!a)throw new h("no-response",{url:e.url});return a}_getTimeoutPromise({request:e,logs:n,handler:r}){let s;return{promise:new Promise(o=>{s=setTimeout(async()=>{o(await r.cacheMatch(e))},this._networkTimeoutSeconds*1e3)}),id:s}}async _getNetworkPromise({timeoutId:e,request:n,logs:r,handler:s}){let i,o;try{o=await s.fetchAndCachePut(n)}catch(a){a instanceof Error&&(i=a)}return e&&clearTimeout(e),(i||!o)&&(o=await s.cacheMatch(n)),o}}const zn=(t,e)=>e.some(n=>t instanceof n);let et,tt;function Gn(){return et||(et=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Jn(){return tt||(tt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const nt=new WeakMap,te=new WeakMap,rt=new WeakMap,ne=new WeakMap,re=new WeakMap;function Yn(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(m(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&nt.set(n,t)}).catch(()=>{}),re.set(e,t),e}function Xn(t){if(te.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});te.set(t,e)}let se={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return te.get(t);if(e==="objectStoreNames")return t.objectStoreNames||rt.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Qn(t){se=t(se)}function Zn(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ie(this),e,...n);return rt.set(r,e.sort?e.sort():[e]),m(r)}:Jn().includes(t)?function(...e){return t.apply(ie(this),e),m(nt.get(this))}:function(...e){return m(t.apply(ie(this),e))}}function er(t){return typeof t=="function"?Zn(t):(t instanceof IDBTransaction&&Xn(t),zn(t,Gn())?new Proxy(t,se):t)}function m(t){if(t instanceof IDBRequest)return Yn(t);if(ne.has(t))return ne.get(t);const e=er(t);return e!==t&&(ne.set(t,e),re.set(e,t)),e}const ie=t=>re.get(t);function tr(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=m(o);return r&&o.addEventListener("upgradeneeded",c=>{r(m(o.result),c.oldVersion,c.newVersion,m(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}function nr(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",r=>e(r.oldVersion,r)),m(n).then(()=>{})}const rr=["get","getKey","getAll","getAllKeys","count"],sr=["put","add","delete","clear"],oe=new Map;function st(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(oe.get(e))return oe.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=sr.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||rr.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),s&&c.done]))[0]};return oe.set(e,i),i}Qn(t=>({...t,get:(e,n,r)=>st(e,n)||t.get(e,n,r),has:(e,n)=>!!st(e,n)||t.has(e,n)}));try{self["workbox:expiration:7.2.0"]&&_()}catch{}const ir="workbox-expiration",U="cache-entries",it=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class or{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const n=e.createObjectStore(U,{keyPath:"id"});n.createIndex("cacheName","cacheName",{unique:!1}),n.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&nr(this._cacheName)}async setTimestamp(e,n){e=it(e);const r={url:e,timestamp:n,cacheName:this._cacheName,id:this._getId(e)},i=(await this.getDb()).transaction(U,"readwrite",{durability:"relaxed"});await i.store.put(r),await i.done}async getTimestamp(e){const r=await(await this.getDb()).get(U,this._getId(e));return r?.timestamp}async expireEntries(e,n){const r=await this.getDb();let s=await r.transaction(U).store.index("timestamp").openCursor(null,"prev");const i=[];let o=0;for(;s;){const c=s.value;c.cacheName===this._cacheName&&(e&&c.timestamp<e||n&&o>=n?i.push(s.value):o++),s=await s.continue()}const a=[];for(const c of i)await r.delete(U,c.id),a.push(c.url);return a}_getId(e){return this._cacheName+"|"+it(e)}async getDb(){return this._db||(this._db=await tr(ir,1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class ar{constructor(e,n={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=n.maxEntries,this._maxAgeSeconds=n.maxAgeSeconds,this._matchOptions=n.matchOptions,this._cacheName=e,this._timestampModel=new or(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-this._maxAgeSeconds*1e3:0,n=await this._timestampModel.expireEntries(e,this._maxEntries),r=await self.caches.open(this._cacheName);for(const s of n)await r.delete(s,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,Ze(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const n=await this._timestampModel.getTimestamp(e),r=Date.now()-this._maxAgeSeconds*1e3;return n!==void 0?n<r:!0}else return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class cr{constructor(e={}){this.cachedResponseWillBeUsed=async({event:n,request:r,cacheName:s,cachedResponse:i})=>{if(!i)return null;const o=this._isResponseDateFresh(i),a=this._getCacheExpiration(s);Ze(a.expireEntries());const c=a.updateTimestamp(r.url);if(n)try{n.waitUntil(c)}catch{}return o?i:null},this.cacheDidUpdate=async({cacheName:n,request:r})=>{const s=this._getCacheExpiration(n);await s.updateTimestamp(r.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&Hn(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===L.getRuntimeName())throw new h("expire-custom-caches-only");let n=this._cacheExpirations.get(e);return n||(n=new ar(e,this._config),this._cacheExpirations.set(e,n)),n}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const n=this._getDateHeaderTimestamp(e);if(n===null)return!0;const r=Date.now();return n>=r-this._maxAgeSeconds*1e3}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const n=e.headers.get("date"),s=new Date(n).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,n]of this._cacheExpirations)await self.caches.delete(e),await n.delete();this._cacheExpirations=new Map}}try{self["workbox:cacheable-response:7.2.0"]&&_()}catch{}class ur{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let n=!0;return this._statuses&&(n=this._statuses.includes(e.status)),this._headers&&n&&(n=Object.keys(this._headers).some(r=>e.headers.get(r)===this._headers[r])),n}}class lr{constructor(e){this.cacheWillUpdate=async({response:n})=>this._cacheableResponse.isResponseCacheable(n)?n:null,this._cacheableResponse=new ur(e)}}const hr=()=>{};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},dr=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},at={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,u=c?t[s+2]:0,p=i>>2,d=(i&3)<<4|a>>4;let M=(a&15)<<2|u>>6,Y=u&63;c||(Y=64,o||(M=64)),r.push(n[p],n[d],n[M],n[Y])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ot(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):dr(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||u==null||d==null)throw new fr;const M=i<<2|a>>4;if(r.push(M),u!==64){const Y=a<<4&240|u>>2;if(r.push(Y),d!==64){const $o=u<<6&192|d;r.push($o)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class fr extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pr=function(t){const e=ot(t);return at.encodeByteArray(e,!0)},ct=function(t){return pr(t).replace(/\./g,"")},gr=function(t){try{return at.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wr=()=>mr().__FIREBASE_DEFAULTS__,br=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},yr=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&gr(t[1]);return e&&JSON.parse(e)},_r=()=>{try{return hr()||wr()||br()||yr()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ut=()=>_r()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}function lt(){try{return typeof indexedDB=="object"}catch{return!1}}function ht(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir="FirebaseError";class N extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Ir,Object.setPrototypeOf(this,N.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,K.prototype.create)}}class K{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Dr(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new N(s,a,r)}}function Dr(t,e){return t.replace(Cr,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Cr=/\{\$([^}]+)}/g;function ae(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(dt(i)&&dt(o)){if(!ae(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function dt(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(t){return t&&t._delegate?t._delegate:t}class S{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Er;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ar(e))try{this.getOrInitializeService({instanceIdentifier:T})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=T){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=T){return this.instances.has(e)}getOptions(e=T){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Tr(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=T){return this.component?this.component.multipleInstances?e:T:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tr(t){return t===T?void 0:t}function Ar(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Sr(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var l;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(l||(l={}));const kr={debug:l.DEBUG,verbose:l.VERBOSE,info:l.INFO,warn:l.WARN,error:l.ERROR,silent:l.SILENT},vr=l.INFO,Mr={[l.DEBUG]:"log",[l.VERBOSE]:"log",[l.INFO]:"info",[l.WARN]:"warn",[l.ERROR]:"error"},Br=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Mr[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Nr{constructor(e){this.name=e,this._logLevel=vr,this._logHandler=Br,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in l))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?kr[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,l.DEBUG,...e),this._logHandler(this,l.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,l.VERBOSE,...e),this._logHandler(this,l.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,l.INFO,...e),this._logHandler(this,l.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,l.WARN,...e),this._logHandler(this,l.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,l.ERROR,...e),this._logHandler(this,l.ERROR,...e)}}const Or=(t,e)=>e.some(n=>t instanceof n);let pt,gt;function xr(){return pt||(pt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Lr(){return gt||(gt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const mt=new WeakMap,ce=new WeakMap,wt=new WeakMap,ue=new WeakMap,le=new WeakMap;function Pr(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(I(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&mt.set(n,t)}).catch(()=>{}),le.set(e,t),e}function $r(t){if(ce.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});ce.set(t,e)}let he={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ce.get(t);if(e==="objectStoreNames")return t.objectStoreNames||wt.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return I(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ur(t){he=t(he)}function Fr(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(de(this),e,...n);return wt.set(r,e.sort?e.sort():[e]),I(r)}:Lr().includes(t)?function(...e){return t.apply(de(this),e),I(mt.get(this))}:function(...e){return I(t.apply(de(this),e))}}function jr(t){return typeof t=="function"?Fr(t):(t instanceof IDBTransaction&&$r(t),Or(t,xr())?new Proxy(t,he):t)}function I(t){if(t instanceof IDBRequest)return Pr(t);if(ue.has(t))return ue.get(t);const e=jr(t);return e!==t&&(ue.set(t,e),le.set(e,t)),e}const de=t=>le.get(t);function Hr(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=I(o);return r&&o.addEventListener("upgradeneeded",c=>{r(I(o.result),c.oldVersion,c.newVersion,I(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const Kr=["get","getKey","getAll","getAllKeys","count"],Vr=["put","add","delete","clear"],fe=new Map;function bt(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(fe.get(e))return fe.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Vr.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Kr.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),s&&c.done]))[0]};return fe.set(e,i),i}Ur(t=>({...t,get:(e,n,r)=>bt(e,n)||t.get(e,n,r),has:(e,n)=>!!bt(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(qr(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function qr(t){return t.getComponent()?.type==="VERSION"}const pe="@firebase/app",yt="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w=new Nr("@firebase/app"),zr="@firebase/app-compat",Gr="@firebase/analytics-compat",Jr="@firebase/analytics",Yr="@firebase/app-check-compat",Xr="@firebase/app-check",Qr="@firebase/auth",Zr="@firebase/auth-compat",es="@firebase/database",ts="@firebase/data-connect",ns="@firebase/database-compat",rs="@firebase/functions",ss="@firebase/functions-compat",is="@firebase/installations",os="@firebase/installations-compat",as="@firebase/messaging",cs="@firebase/messaging-compat",us="@firebase/performance",ls="@firebase/performance-compat",hs="@firebase/remote-config",ds="@firebase/remote-config-compat",fs="@firebase/storage",ps="@firebase/storage-compat",gs="@firebase/firestore",ms="@firebase/ai",ws="@firebase/firestore-compat",bs="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge="[DEFAULT]",ys={[pe]:"fire-core",[zr]:"fire-core-compat",[Jr]:"fire-analytics",[Gr]:"fire-analytics-compat",[Xr]:"fire-app-check",[Yr]:"fire-app-check-compat",[Qr]:"fire-auth",[Zr]:"fire-auth-compat",[es]:"fire-rtdb",[ts]:"fire-data-connect",[ns]:"fire-rtdb-compat",[rs]:"fire-fn",[ss]:"fire-fn-compat",[is]:"fire-iid",[os]:"fire-iid-compat",[as]:"fire-fcm",[cs]:"fire-fcm-compat",[us]:"fire-perf",[ls]:"fire-perf-compat",[hs]:"fire-rc",[ds]:"fire-rc-compat",[fs]:"fire-gcs",[ps]:"fire-gcs-compat",[gs]:"fire-fst",[ws]:"fire-fst-compat",[ms]:"fire-vertex","fire-js":"fire-js",[bs]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V=new Map,_s=new Map,me=new Map;function _t(t,e){try{t.container.addComponent(e)}catch(n){w.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function O(t){const e=t.name;if(me.has(e))return w.debug(`There were multiple attempts to register component ${e}.`),!1;me.set(e,t);for(const n of V.values())_t(n,t);for(const n of _s.values())_t(n,t);return!0}function we(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Es={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},D=new K("app","Firebase",Es);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new S("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}}function Et(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:ge,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw D.create("bad-app-name",{appName:String(s)});if(n||(n=ut()),!n)throw D.create("no-options");const i=V.get(s);if(i){if(ae(n,i.options)&&ae(r,i.config))return i;throw D.create("duplicate-app",{appName:s})}const o=new Rr(s);for(const c of me.values())o.addComponent(c);const a=new Is(n,r,o);return V.set(s,a),a}function Ds(t=ge){const e=V.get(t);if(!e&&t===ge&&ut())return Et();if(!e)throw D.create("no-app",{appName:t});return e}function x(t,e,n){let r=ys[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),w.warn(o.join(" "));return}O(new S(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs="firebase-heartbeat-database",Ss=1,F="firebase-heartbeat-store";let be=null;function It(){return be||(be=Hr(Cs,Ss,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(F)}catch(n){console.warn(n)}}}}).catch(t=>{throw D.create("idb-open",{originalErrorMessage:t.message})})),be}async function Ts(t){try{const n=(await It()).transaction(F),r=await n.objectStore(F).get(Ct(t));return await n.done,r}catch(e){if(e instanceof N)w.warn(e.message);else{const n=D.create("idb-get",{originalErrorMessage:e?.message});w.warn(n.message)}}}async function Dt(t,e){try{const r=(await It()).transaction(F,"readwrite");await r.objectStore(F).put(e,Ct(t)),await r.done}catch(n){if(n instanceof N)w.warn(n.message);else{const r=D.create("idb-set",{originalErrorMessage:n?.message});w.warn(r.message)}}}function Ct(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As=1024,Rs=30;class ks{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ms(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=St();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>Rs){const s=Bs(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){w.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=St(),{heartbeatsToSend:n,unsentEntries:r}=vs(this._heartbeatsCache.heartbeats),s=ct(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return w.warn(e),""}}}function St(){return new Date().toISOString().substring(0,10)}function vs(t,e=As){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Tt(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Tt(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Ms{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return lt()?ht().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ts(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Dt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Dt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Tt(t){return ct(JSON.stringify({version:2,heartbeats:t})).length}function Bs(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ns(t){O(new S("platform-logger",e=>new Wr(e),"PRIVATE")),O(new S("heartbeat",e=>new ks(e),"PRIVATE")),x(pe,yt,t),x(pe,yt,"esm2020"),x("fire-js","")}Ns("");var Os="firebase",xs="12.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */x(Os,xs,"app");const Ls=(t,e)=>e.some(n=>t instanceof n);let At,Rt;function Ps(){return At||(At=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $s(){return Rt||(Rt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const kt=new WeakMap,ye=new WeakMap,vt=new WeakMap,_e=new WeakMap,Ee=new WeakMap;function Us(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(C(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&kt.set(n,t)}).catch(()=>{}),Ee.set(e,t),e}function Fs(t){if(ye.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});ye.set(t,e)}let Ie={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ye.get(t);if(e==="objectStoreNames")return t.objectStoreNames||vt.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return C(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function js(t){Ie=t(Ie)}function Hs(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(De(this),e,...n);return vt.set(r,e.sort?e.sort():[e]),C(r)}:$s().includes(t)?function(...e){return t.apply(De(this),e),C(kt.get(this))}:function(...e){return C(t.apply(De(this),e))}}function Ks(t){return typeof t=="function"?Hs(t):(t instanceof IDBTransaction&&Fs(t),Ls(t,Ps())?new Proxy(t,Ie):t)}function C(t){if(t instanceof IDBRequest)return Us(t);if(_e.has(t))return _e.get(t);const e=Ks(t);return e!==t&&(_e.set(t,e),Ee.set(e,t)),e}const De=t=>Ee.get(t);function Vs(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=C(o);return r&&o.addEventListener("upgradeneeded",c=>{r(C(o.result),c.oldVersion,c.newVersion,C(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const Ws=["get","getKey","getAll","getAllKeys","count"],qs=["put","add","delete","clear"],Ce=new Map;function Mt(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ce.get(e))return Ce.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=qs.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Ws.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),s&&c.done]))[0]};return Ce.set(e,i),i}js(t=>({...t,get:(e,n,r)=>Mt(e,n)||t.get(e,n,r),has:(e,n)=>!!Mt(e,n)||t.has(e,n)}));const Bt="@firebase/installations",Se="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt=1e4,Ot=`w:${Se}`,xt="FIS_v2",zs="https://firebaseinstallations.googleapis.com/v1",Gs=3600*1e3,Js="installations",Ys="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xs={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},A=new K(Js,Ys,Xs);function Lt(t){return t instanceof N&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt({projectId:t}){return`${zs}/projects/${t}/installations`}function $t(t){return{token:t.token,requestStatus:2,expiresIn:Zs(t.expiresIn),creationTime:Date.now()}}async function Ut(t,e){const r=(await e.json()).error;return A.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Ft({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Qs(t,{refreshToken:e}){const n=Ft(t);return n.append("Authorization",ei(e)),n}async function jt(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Zs(t){return Number(t.replace("s","000"))}function ei(t){return`${xt} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ti({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Pt(t),s=Ft(t),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&s.append("x-firebase-client",u)}const o={fid:n,authVersion:xt,appId:t.appId,sdkVersion:Ot},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await jt(()=>fetch(r,a));if(c.ok){const u=await c.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:$t(u.authToken)}}else throw await Ut("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri=/^[cdef][\w-]{21}$/,Te="";function si(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=ii(t);return ri.test(n)?n:Te}catch{return Te}}function ii(t){return ni(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt=new Map;function Vt(t,e){const n=W(t);Wt(n,e),oi(n,e)}function Wt(t,e){const n=Kt.get(t);if(n)for(const r of n)r(e)}function oi(t,e){const n=ai();n&&n.postMessage({key:t,fid:e}),ci()}let R=null;function ai(){return!R&&"BroadcastChannel"in self&&(R=new BroadcastChannel("[Firebase] FID Change"),R.onmessage=t=>{Wt(t.data.key,t.data.fid)}),R}function ci(){Kt.size===0&&R&&(R.close(),R=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui="firebase-installations-database",li=1,k="firebase-installations-store";let Ae=null;function Re(){return Ae||(Ae=Vs(ui,li,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(k)}}})),Ae}async function q(t,e){const n=W(t),s=(await Re()).transaction(k,"readwrite"),i=s.objectStore(k),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Vt(t,e.fid),e}async function qt(t){const e=W(t),r=(await Re()).transaction(k,"readwrite");await r.objectStore(k).delete(e),await r.done}async function z(t,e){const n=W(t),s=(await Re()).transaction(k,"readwrite"),i=s.objectStore(k),o=await i.get(n),a=e(o);return a===void 0?await i.delete(n):await i.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&Vt(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ke(t){let e;const n=await z(t.appConfig,r=>{const s=hi(r),i=di(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===Te?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function hi(t){const e=t||{fid:si(),registrationStatus:0};return Gt(e)}function di(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(A.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=fi(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:pi(t)}:{installationEntry:e}}async function fi(t,e){try{const n=await ti(t,e);return q(t.appConfig,n)}catch(n){throw Lt(n)&&n.customData.serverCode===409?await qt(t.appConfig):await q(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function pi(t){let e=await zt(t.appConfig);for(;e.registrationStatus===1;)await Ht(100),e=await zt(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await ke(t);return r||n}return e}function zt(t){return z(t,e=>{if(!e)throw A.create("installation-not-found");return Gt(e)})}function Gt(t){return gi(t)?{fid:t.fid,registrationStatus:0}:t}function gi(t){return t.registrationStatus===1&&t.registrationTime+Nt<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mi({appConfig:t,heartbeatServiceProvider:e},n){const r=wi(t,n),s=Qs(t,n),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&s.append("x-firebase-client",u)}const o={installation:{sdkVersion:Ot,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await jt(()=>fetch(r,a));if(c.ok){const u=await c.json();return $t(u)}else throw await Ut("Generate Auth Token",c)}function wi(t,{fid:e}){return`${Pt(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ve(t,e=!1){let n;const r=await z(t.appConfig,i=>{if(!Yt(i))throw A.create("not-registered");const o=i.authToken;if(!e&&_i(o))return i;if(o.requestStatus===1)return n=bi(t,e),i;{if(!navigator.onLine)throw A.create("app-offline");const a=Ii(i);return n=yi(t,a),a}});return n?await n:r.authToken}async function bi(t,e){let n=await Jt(t.appConfig);for(;n.authToken.requestStatus===1;)await Ht(100),n=await Jt(t.appConfig);const r=n.authToken;return r.requestStatus===0?ve(t,e):r}function Jt(t){return z(t,e=>{if(!Yt(e))throw A.create("not-registered");const n=e.authToken;return Di(n)?{...e,authToken:{requestStatus:0}}:e})}async function yi(t,e){try{const n=await mi(t,e),r={...e,authToken:n};return await q(t.appConfig,r),n}catch(n){if(Lt(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await qt(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await q(t.appConfig,r)}throw n}}function Yt(t){return t!==void 0&&t.registrationStatus===2}function _i(t){return t.requestStatus===2&&!Ei(t)}function Ei(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Gs}function Ii(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function Di(t){return t.requestStatus===1&&t.requestTime+Nt<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ci(t){const e=t,{installationEntry:n,registrationPromise:r}=await ke(e);return r?r.catch(console.error):ve(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Si(t,e=!1){const n=t;return await Ti(n),(await ve(n,e)).token}async function Ti(t){const{registrationPromise:e}=await ke(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ai(t){if(!t||!t.options)throw Me("App Configuration");if(!t.name)throw Me("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Me(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Me(t){return A.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt="installations",Ri="installations-internal",ki=t=>{const e=t.getProvider("app").getImmediate(),n=Ai(e),r=we(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},vi=t=>{const e=t.getProvider("app").getImmediate(),n=we(e,Xt).getImmediate();return{getId:()=>Ci(n),getToken:s=>Si(n,s)}};function Mi(){O(new S(Xt,ki,"PUBLIC")),O(new S(Ri,vi,"PRIVATE"))}Mi(),x(Bt,Se),x(Bt,Se,"esm2020");const Bi=(t,e)=>e.some(n=>t instanceof n);let Qt,Zt;function Ni(){return Qt||(Qt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Oi(){return Zt||(Zt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const en=new WeakMap,Be=new WeakMap,tn=new WeakMap,Ne=new WeakMap,Oe=new WeakMap;function xi(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(b(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&en.set(n,t)}).catch(()=>{}),Oe.set(e,t),e}function Li(t){if(Be.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Be.set(t,e)}let xe={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Be.get(t);if(e==="objectStoreNames")return t.objectStoreNames||tn.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return b(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Pi(t){xe=t(xe)}function $i(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Le(this),e,...n);return tn.set(r,e.sort?e.sort():[e]),b(r)}:Oi().includes(t)?function(...e){return t.apply(Le(this),e),b(en.get(this))}:function(...e){return b(t.apply(Le(this),e))}}function Ui(t){return typeof t=="function"?$i(t):(t instanceof IDBTransaction&&Li(t),Bi(t,Ni())?new Proxy(t,xe):t)}function b(t){if(t instanceof IDBRequest)return xi(t);if(Ne.has(t))return Ne.get(t);const e=Ui(t);return e!==t&&(Ne.set(t,e),Oe.set(e,t)),e}const Le=t=>Oe.get(t);function nn(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=b(o);return r&&o.addEventListener("upgradeneeded",c=>{r(b(o.result),c.oldVersion,c.newVersion,b(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}function Pe(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",r=>e(r.oldVersion,r)),b(n).then(()=>{})}const Fi=["get","getKey","getAll","getAllKeys","count"],ji=["put","add","delete","clear"],$e=new Map;function rn(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if($e.get(e))return $e.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=ji.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Fi.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),s&&c.done]))[0]};return $e.set(e,i),i}Pi(t=>({...t,get:(e,n,r)=>rn(e,n)||t.get(e,n,r),has:(e,n)=>!!rn(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Hi="https://fcmregistrations.googleapis.com/v1",on="FCM_MSG",Ki="google.c.a.c_id",Vi=3,Wi=1;var G;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(G||(G={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var J;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(J||(J={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function qi(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),s=new Uint8Array(r.length);for(let i=0;i<r.length;++i)s[i]=r.charCodeAt(i);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ue="fcm_token_details_db",zi=5,an="fcm_token_object_Store";async function Gi(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(i=>i.name).includes(Ue))return null;let e=null;return(await nn(Ue,zi,{upgrade:async(r,s,i,o)=>{if(s<2||!r.objectStoreNames.contains(an))return;const a=o.objectStore(an),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(s===2){const u=c;if(!u.auth||!u.p256dh||!u.endpoint)return;e={token:u.fcmToken,createTime:u.createTime??Date.now(),subscriptionOptions:{auth:u.auth,p256dh:u.p256dh,endpoint:u.endpoint,swScope:u.swScope,vapidKey:typeof u.vapidKey=="string"?u.vapidKey:y(u.vapidKey)}}}else if(s===3){const u=c;e={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:y(u.auth),p256dh:y(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:y(u.vapidKey)}}}else if(s===4){const u=c;e={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:y(u.auth),p256dh:y(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:y(u.vapidKey)}}}}}})).close(),await Pe(Ue),await Pe("fcm_vapid_details_db"),await Pe("undefined"),Ji(e)?e:null}function Ji(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi="firebase-messaging-database",Xi=1,v="firebase-messaging-store";let Fe=null;function je(){return Fe||(Fe=nn(Yi,Xi,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(v)}}})),Fe}async function He(t){const e=Ve(t),r=await(await je()).transaction(v).objectStore(v).get(e);if(r)return r;{const s=await Gi(t.appConfig.senderId);if(s)return await Ke(t,s),s}}async function Ke(t,e){const n=Ve(t),s=(await je()).transaction(v,"readwrite");return await s.objectStore(v).put(e,n),await s.done,e}async function Qi(t){const e=Ve(t),r=(await je()).transaction(v,"readwrite");await r.objectStore(v).delete(e),await r.done}function Ve({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zi={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},f=new K("messaging","Messaging",Zi);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eo(t,e){const n=await qe(t),r=un(e),s={method:"POST",headers:n,body:JSON.stringify(r)};let i;try{i=await(await fetch(We(t.appConfig),s)).json()}catch(o){throw f.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(i.error){const o=i.error.message;throw f.create("token-subscribe-failed",{errorInfo:o})}if(!i.token)throw f.create("token-subscribe-no-token");return i.token}async function to(t,e){const n=await qe(t),r=un(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(r)};let i;try{i=await(await fetch(`${We(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw f.create("token-update-failed",{errorInfo:o?.toString()})}if(i.error){const o=i.error.message;throw f.create("token-update-failed",{errorInfo:o})}if(!i.token)throw f.create("token-update-no-token");return i.token}async function cn(t,e){const r={method:"DELETE",headers:await qe(t)};try{const i=await(await fetch(`${We(t.appConfig)}/${e}`,r)).json();if(i.error){const o=i.error.message;throw f.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw f.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function We({projectId:t}){return`${Hi}/projects/${t}/registrations`}async function qe({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function un({p256dh:t,auth:e,endpoint:n,vapidKey:r}){const s={web:{endpoint:n,auth:e,p256dh:t}};return r!==sn&&(s.web.applicationPubKey=r),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const no=10080*60*1e3;async function ro(t){const e=await io(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:y(e.getKey("auth")),p256dh:y(e.getKey("p256dh"))},r=await He(t.firebaseDependencies);if(r){if(oo(r.subscriptionOptions,n))return Date.now()>=r.createTime+no?so(t,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await cn(t.firebaseDependencies,r.token)}catch(s){console.warn(s)}return hn(t.firebaseDependencies,n)}else return hn(t.firebaseDependencies,n)}async function ln(t){const e=await He(t.firebaseDependencies);e&&(await cn(t.firebaseDependencies,e.token),await Qi(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function so(t,e){try{const n=await to(t.firebaseDependencies,e),r={...e,token:n,createTime:Date.now()};return await Ke(t.firebaseDependencies,r),n}catch(n){throw n}}async function hn(t,e){const r={token:await eo(t,e),createTime:Date.now(),subscriptionOptions:e};return await Ke(t,r),r.token}async function io(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:qi(e)})}function oo(t,e){const n=e.vapidKey===t.vapidKey,r=e.endpoint===t.endpoint,s=e.auth===t.auth,i=e.p256dh===t.p256dh;return n&&r&&s&&i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ao(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return co(e,t),uo(e,t),lo(e,t),e}function co(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const r=e.notification.body;r&&(t.notification.body=r);const s=e.notification.image;s&&(t.notification.image=s);const i=e.notification.icon;i&&(t.notification.icon=i)}function uo(t,e){e.data&&(t.data=e.data)}function lo(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const r=e.fcmOptions?.analytics_label;r&&(t.fcmOptions.analyticsLabel=r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ho(t){return typeof t=="object"&&!!t&&Ki in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fo(t){return new Promise(e=>{setTimeout(e,t)})}async function po(t,e){const n=go(e,await t.firebaseDependencies.installations.getId());mo(t,n,e.productId)}function go(t,e){const n={};return t.from&&(n.project_number=t.from),t.fcmMessageId&&(n.message_id=t.fcmMessageId),n.instance_id=e,t.notification?n.message_type=G.DISPLAY_NOTIFICATION.toString():n.message_type=G.DATA_MESSAGE.toString(),n.sdk_platform=Vi.toString(),n.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),t.collapse_key&&(n.collapse_key=t.collapse_key),n.event=Wi.toString(),t.fcmOptions?.analytics_label&&(n.analytics_label=t.fcmOptions?.analytics_label),n}function mo(t,e,n){const r={};r.event_time_ms=Math.floor(Date.now()).toString(),r.source_extension_json_proto3=JSON.stringify({messaging_client_event:e}),n&&(r.compliance_data=wo(n)),t.logEvents.push(r)}function wo(t){return{privacy_context:{prequest:{origin_associated_product_id:t}}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bo(t,e){const{newSubscription:n}=t;if(!n){await ln(e);return}const r=await He(e.firebaseDependencies);await ln(e),e.vapidKey=r?.subscriptionOptions?.vapidKey??sn,await ro(e)}async function yo(t,e){const n=Io(t);if(!n)return;e.deliveryMetricsExportedToBigQueryEnabled&&await po(e,n);const r=await dn();if(Co(r))return So(r,n);if(n.notification&&await To(Eo(n)),!!e&&e.onBackgroundMessageHandler){const s=ao(n);typeof e.onBackgroundMessageHandler=="function"?await e.onBackgroundMessageHandler(s):e.onBackgroundMessageHandler.next(s)}}async function _o(t){const e=t.notification?.data?.[on];if(e){if(t.action)return}else return;t.stopImmediatePropagation(),t.notification.close();const n=Ao(e);if(!n)return;const r=new URL(n,self.location.href),s=new URL(self.location.origin);if(r.host!==s.host)return;let i=await Do(r);if(i?i=await i.focus():(i=await self.clients.openWindow(n),await fo(3e3)),!!i)return e.messageType=J.NOTIFICATION_CLICKED,e.isFirebaseMessaging=!0,i.postMessage(e)}function Eo(t){const e={...t.notification};return e.data={[on]:t},e}function Io({data:t}){if(!t)return null;try{return t.json()}catch{return null}}async function Do(t){const e=await dn();for(const n of e){const r=new URL(n.url,self.location.href);if(t.host===r.host)return n}return null}function Co(t){return t.some(e=>e.visibilityState==="visible"&&!e.url.startsWith("chrome-extension://"))}function So(t,e){e.isFirebaseMessaging=!0,e.messageType=J.PUSH_RECEIVED;for(const n of t)n.postMessage(e)}function dn(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function To(t){const{actions:e}=t,{maxActions:n}=Notification;return e&&n&&e.length>n&&console.warn(`This browser only supports ${n} actions. The remaining actions will not be displayed.`),self.registration.showNotification(t.title??"",t)}function Ao(t){const e=t.fcmOptions?.link??t.notification?.click_action;return e||(ho(t.data)?self.location.origin:null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ro(t){if(!t||!t.options)throw ze("App Configuration Object");if(!t.name)throw ze("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const r of e)if(!n[r])throw ze(r);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function ze(t){return f.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=Ro(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo=t=>{const e=new ko(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return self.addEventListener("push",n=>{n.waitUntil(yo(n,e))}),self.addEventListener("pushsubscriptionchange",n=>{n.waitUntil(bo(n,e))}),self.addEventListener("notificationclick",n=>{n.waitUntil(_o(n))}),e};function Mo(){O(new S("messaging-sw",vo,"PUBLIC"))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bo(){return lt()&&await ht()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function No(t,e){if(self.document!==void 0)throw f.create("only-available-in-sw");return t.onBackgroundMessageHandler=e,()=>{t.onBackgroundMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oo(t=Ds()){return Bo().then(e=>{if(!e)throw f.create("unsupported-browser")},e=>{throw f.create("indexed-db-unsupported")}),we(ft(t),"messaging-sw").getImmediate()}function xo(t,e){return t=ft(t),No(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mo();const Lo=Et({apiKey:"AIzaSyAyXH4R0qAcXScwcslRBLneGX3ibv5REEA",authDomain:"exam-rojgaar-e1b10.firebaseapp.com",projectId:"exam-rojgaar-e1b10",storageBucket:"exam-rojgaar-e1b10.appspot.com",messagingSenderId:"461311574928",appId:"1:461311574928:web:3d6251d3a94f52df26a915",measurementId:"G-9CKSKVDDSC"}),Po=Oo(Lo);xo(Po,t=>{const{title:e,body:n,icon:r,image:s,link:i}=t.notification??{},o=t.data??{},a=o.link,c=e??o.title??"Exam Rojgaar",u={body:n??o.body??"",icon:r??o.icon??"/android-chrome-192x192.png",image:s??o.image,badge:"/android-chrome-192x192.png",data:{url:i??a??"/"}};self.registration.showNotification(c,u)}),self.addEventListener("notificationclick",t=>{t.notification.close();const e=t.notification.data?.url??"/";t.waitUntil(clients.openWindow(e))});const fn=[{"revision":"f5c1a9f799b902c9991c9f2a81bd8d85","url":"404.html"},{"revision":null,"url":"assets/index-CV3tSGe9.css"},{"revision":null,"url":"assets/index-FpqPSYjy.js"},{"revision":null,"url":"assets/workbox-window.prod.es5-BBnX5xw4.js"},{"revision":"98cbf1476d29b3d2675ddb0cc608548e","url":"index.html"},{"revision":"8c5aa91fda17b2f2138a64bf3a92e49a","url":"telegram/index.html"},{"revision":"e74f453b7cf0f5330a569680afd4e207","url":"whatsapp/index.html"},{"revision":"206d4831810fc35748268e5e9d569592","url":"youtube/index.html"},{"revision":"17b38de79d1379c557465040af6de455","url":"android-chrome-192x192.png"},{"revision":"40e8cebe1d7b80bed75204aa76ec3b7b","url":"android-chrome-512x512.png"},{"revision":"dac993ac42315f2c210925e0f0f8eb66","url":"apple-touch-icon.png"},{"revision":"77475e7f0e9961203c18987d3b220c04","url":"favicon.ico"},{"revision":"83823eb711844d5793dbf3f7248a85d9","url":"maskable_icon.png"},{"revision":"2afd1be30d199018904fb85a1efa43e2","url":"manifest.webmanifest"}];if(jn(fn),$n(),(fn??[]).some(t=>(typeof t=="string"?t:t.url)==="index.html")){let t;self.location.hostname==="localhost"&&(t=[/^\/$/]),ee(new Vn(Un("index.html"),{allowlist:t,denylist:[/^\/sitemap\.xml$/,/^\/robots\.txt$/]}))}ee(({url:t})=>t.pathname.startsWith("/api/v1/data"),new qn({cacheName:"api-cache",plugins:[new cr({maxEntries:50,maxAgeSeconds:3600*24*7}),new lr({statuses:[0,200]})]})),self.addEventListener("message",t=>{t.data&&t.data.type==="SKIP_WAITING"&&self.skipWaiting()}),Kn()})();
