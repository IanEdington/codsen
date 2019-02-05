/**
 * ranges-process-outside
 * Iterate through string and optionally a given ranges as if they were one
 * Version: 1.2.4
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-process-outside
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).rangesProcessOutside=e()}(this,function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=t[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var r=function(t,e){if(e){if("object"!=typeof e)throw new TypeError(String(e)+" is not an object. Expected an object that has boolean `includeZero` property.");if("includeZero"in e){if("boolean"!=typeof e.includeZero)throw new TypeError(String(e.includeZero)+" is neither true nor false. `includeZero` option must be a Boolean value.");if(e.includeZero&&0===t)return!0}}return Number.isSafeInteger(t)&&t>=1},n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function o(t,e){return t(e={exports:{}},e.exports),e.exports}var i=o(function(t,e){(e=t.exports=function(t){return t+e.suffix(+t)}).suffix=function(t){return t%=100,1===Math.floor(t/10)?"th":t%10==1?"st":t%10==2?"nd":t%10==3?"rd":"th"}}),a=(i.suffix,o(function(t,e){var r,o,i,a,c,s,u,f,l,p,y,h,g,d,b,v,m,_,w,j;t.exports=(r="function"==typeof Promise,o="object"==typeof self?self:n,i="undefined"!=typeof Symbol,a="undefined"!=typeof Map,c="undefined"!=typeof Set,s="undefined"!=typeof WeakMap,u="undefined"!=typeof WeakSet,f="undefined"!=typeof DataView,l=i&&void 0!==Symbol.iterator,p=i&&void 0!==Symbol.toStringTag,y=c&&"function"==typeof Set.prototype.entries,h=a&&"function"==typeof Map.prototype.entries,g=y&&Object.getPrototypeOf((new Set).entries()),d=h&&Object.getPrototypeOf((new Map).entries()),b=l&&"function"==typeof Array.prototype[Symbol.iterator],v=b&&Object.getPrototypeOf([][Symbol.iterator]()),m=l&&"function"==typeof String.prototype[Symbol.iterator],_=m&&Object.getPrototypeOf(""[Symbol.iterator]()),w=8,j=-1,function(t){var e=typeof t;if("object"!==e)return e;if(null===t)return"null";if(t===o)return"global";if(Array.isArray(t)&&(!1===p||!(Symbol.toStringTag in t)))return"Array";if("object"==typeof window&&null!==window){if("object"==typeof window.location&&t===window.location)return"Location";if("object"==typeof window.document&&t===window.document)return"Document";if("object"==typeof window.navigator){if("object"==typeof window.navigator.mimeTypes&&t===window.navigator.mimeTypes)return"MimeTypeArray";if("object"==typeof window.navigator.plugins&&t===window.navigator.plugins)return"PluginArray"}if(("function"==typeof window.HTMLElement||"object"==typeof window.HTMLElement)&&t instanceof window.HTMLElement){if("BLOCKQUOTE"===t.tagName)return"HTMLQuoteElement";if("TD"===t.tagName)return"HTMLTableDataCellElement";if("TH"===t.tagName)return"HTMLTableHeaderCellElement"}}var n=p&&t[Symbol.toStringTag];if("string"==typeof n)return n;var i=Object.getPrototypeOf(t);return i===RegExp.prototype?"RegExp":i===Date.prototype?"Date":r&&i===Promise.prototype?"Promise":c&&i===Set.prototype?"Set":a&&i===Map.prototype?"Map":u&&i===WeakSet.prototype?"WeakSet":s&&i===WeakMap.prototype?"WeakMap":f&&i===DataView.prototype?"DataView":a&&i===d?"Map Iterator":c&&i===g?"Set Iterator":b&&i===v?"Array Iterator":m&&i===_?"String Iterator":null===i?"Object":Object.prototype.toString.call(t).slice(w,j)})}));function c(t,e,r){if(e!=e)return function(t,e,r,n){for(var o=t.length,i=r+(n?1:-1);n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,u,r);for(var n=r-1,o=t.length;++n<o;)if(t[n]===e)return n;return-1}function s(t,e,r,n){for(var o=r-1,i=t.length;++o<i;)if(n(t[o],e))return o;return-1}function u(t){return t!=t}var f=Array.prototype.splice;function l(t,e,r,n){var o,i=n?s:c,a=-1,u=e.length,l=t;for(t===e&&(e=function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(e)),r&&(l=function(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}(t,(o=r,function(t){return o(t)})));++a<u;)for(var p=0,y=e[a],h=r?r(y):y;(p=i(l,h,p,n))>-1;)l!==t&&f.call(l,p,1),f.call(t,p,1);return t}var p=function(t,e){return t&&t.length&&e&&e.length?l(t,e):t},y=o(function(t,e){var r=200,o="__lodash_hash_undefined__",i=9007199254740991,a="[object Arguments]",c="[object Boolean]",s="[object Date]",u="[object Function]",f="[object GeneratorFunction]",l="[object Map]",p="[object Number]",y="[object Object]",h="[object RegExp]",g="[object Set]",d="[object String]",b="[object Symbol]",v="[object ArrayBuffer]",m="[object DataView]",_="[object Float32Array]",w="[object Float64Array]",j="[object Int8Array]",O="[object Int16Array]",$="[object Int32Array]",S="[object Uint8Array]",A="[object Uint8ClampedArray]",T="[object Uint16Array]",E="[object Uint32Array]",I=/\w*$/,N=/^\[object .+?Constructor\]$/,k=/^(?:0|[1-9]\d*)$/,x={};x[a]=x["[object Array]"]=x[v]=x[m]=x[c]=x[s]=x[_]=x[w]=x[j]=x[O]=x[$]=x[l]=x[p]=x[y]=x[h]=x[g]=x[d]=x[b]=x[S]=x[A]=x[T]=x[E]=!0,x["[object Error]"]=x[u]=x["[object WeakMap]"]=!1;var M="object"==typeof n&&n&&n.Object===Object&&n,P="object"==typeof self&&self&&self.Object===Object&&self,W=M||P||Function("return this")(),D=e&&!e.nodeType&&e,L=D&&t&&!t.nodeType&&t,H=L&&L.exports===D;function R(t,e){return t.set(e[0],e[1]),t}function C(t,e){return t.add(e),t}function J(t,e,r,n){var o=-1,i=t?t.length:0;for(n&&i&&(r=t[++o]);++o<i;)r=e(r,t[o],o,t);return r}function K(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function F(t){var e=-1,r=Array(t.size);return t.forEach(function(t,n){r[++e]=[n,t]}),r}function V(t,e){return function(r){return t(e(r))}}function B(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r}var Z,q=Array.prototype,U=Function.prototype,z=Object.prototype,G=W["__core-js_shared__"],Q=(Z=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||""))?"Symbol(src)_1."+Z:"",X=U.toString,Y=z.hasOwnProperty,tt=z.toString,et=RegExp("^"+X.call(Y).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rt=H?W.Buffer:void 0,nt=W.Symbol,ot=W.Uint8Array,it=V(Object.getPrototypeOf,Object),at=Object.create,ct=z.propertyIsEnumerable,st=q.splice,ut=Object.getOwnPropertySymbols,ft=rt?rt.isBuffer:void 0,lt=V(Object.keys,Object),pt=Lt(W,"DataView"),yt=Lt(W,"Map"),ht=Lt(W,"Promise"),gt=Lt(W,"Set"),dt=Lt(W,"WeakMap"),bt=Lt(Object,"create"),vt=Kt(pt),mt=Kt(yt),_t=Kt(ht),wt=Kt(gt),jt=Kt(dt),Ot=nt?nt.prototype:void 0,$t=Ot?Ot.valueOf:void 0;function St(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function At(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Tt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Et(t){this.__data__=new At(t)}function It(t,e){var r=Vt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Bt(t)}(t)&&Y.call(t,"callee")&&(!ct.call(t,"callee")||tt.call(t)==a)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var i in t)!e&&!Y.call(t,i)||o&&("length"==i||Ct(i,n))||r.push(i);return r}function Nt(t,e,r){var n=t[e];Y.call(t,e)&&Ft(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function kt(t,e){for(var r=t.length;r--;)if(Ft(t[r][0],e))return r;return-1}function xt(t,e,r,n,o,i,N){var k;if(n&&(k=i?n(t,o,i,N):n(t)),void 0!==k)return k;if(!Ut(t))return t;var M=Vt(t);if(M){if(k=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&Y.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,k)}else{var P=Rt(t),W=P==u||P==f;if(Zt(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(P==y||P==a||W&&!i){if(K(t))return i?t:{};if(k=function(t){return"function"!=typeof t.constructor||Jt(t)?{}:(e=it(t),Ut(e)?at(e):{});var e}(W?{}:t),!e)return function(t,e){return Wt(t,Ht(t),e)}(t,function(t,e){return t&&Wt(e,zt(e),t)}(k,t))}else{if(!x[P])return i?t:{};k=function(t,e,r,n){var o=t.constructor;switch(e){case v:return Pt(t);case c:case s:return new o(+t);case m:return function(t,e){var r=e?Pt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,n);case _:case w:case j:case O:case $:case S:case A:case T:case E:return function(t,e){var r=e?Pt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,n);case l:return function(t,e,r){return J(e?r(F(t),!0):F(t),R,new t.constructor)}(t,n,r);case p:case d:return new o(t);case h:return(u=new(a=t).constructor(a.source,I.exec(a))).lastIndex=a.lastIndex,u;case g:return function(t,e,r){return J(e?r(B(t),!0):B(t),C,new t.constructor)}(t,n,r);case b:return i=t,$t?Object($t.call(i)):{}}var i;var a,u}(t,P,xt,e)}}N||(N=new Et);var D=N.get(t);if(D)return D;if(N.set(t,k),!M)var L=r?function(t){return function(t,e,r){var n=e(t);return Vt(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,zt,Ht)}(t):zt(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}(L||t,function(o,i){L&&(o=t[i=o]),Nt(k,i,xt(o,e,r,n,i,t,N))}),k}function Mt(t){return!(!Ut(t)||(e=t,Q&&Q in e))&&(qt(t)||K(t)?et:N).test(Kt(t));var e}function Pt(t){var e=new t.constructor(t.byteLength);return new ot(e).set(new ot(t)),e}function Wt(t,e,r,n){r||(r={});for(var o=-1,i=e.length;++o<i;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;Nt(r,a,void 0===c?t[a]:c)}return r}function Dt(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function Lt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return Mt(r)?r:void 0}St.prototype.clear=function(){this.__data__=bt?bt(null):{}},St.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},St.prototype.get=function(t){var e=this.__data__;if(bt){var r=e[t];return r===o?void 0:r}return Y.call(e,t)?e[t]:void 0},St.prototype.has=function(t){var e=this.__data__;return bt?void 0!==e[t]:Y.call(e,t)},St.prototype.set=function(t,e){return this.__data__[t]=bt&&void 0===e?o:e,this},At.prototype.clear=function(){this.__data__=[]},At.prototype.delete=function(t){var e=this.__data__,r=kt(e,t);return!(r<0||(r==e.length-1?e.pop():st.call(e,r,1),0))},At.prototype.get=function(t){var e=this.__data__,r=kt(e,t);return r<0?void 0:e[r][1]},At.prototype.has=function(t){return kt(this.__data__,t)>-1},At.prototype.set=function(t,e){var r=this.__data__,n=kt(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},Tt.prototype.clear=function(){this.__data__={hash:new St,map:new(yt||At),string:new St}},Tt.prototype.delete=function(t){return Dt(this,t).delete(t)},Tt.prototype.get=function(t){return Dt(this,t).get(t)},Tt.prototype.has=function(t){return Dt(this,t).has(t)},Tt.prototype.set=function(t,e){return Dt(this,t).set(t,e),this},Et.prototype.clear=function(){this.__data__=new At},Et.prototype.delete=function(t){return this.__data__.delete(t)},Et.prototype.get=function(t){return this.__data__.get(t)},Et.prototype.has=function(t){return this.__data__.has(t)},Et.prototype.set=function(t,e){var n=this.__data__;if(n instanceof At){var o=n.__data__;if(!yt||o.length<r-1)return o.push([t,e]),this;n=this.__data__=new Tt(o)}return n.set(t,e),this};var Ht=ut?V(ut,Object):function(){return[]},Rt=function(t){return tt.call(t)};function Ct(t,e){return!!(e=null==e?i:e)&&("number"==typeof t||k.test(t))&&t>-1&&t%1==0&&t<e}function Jt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||z)}function Kt(t){if(null!=t){try{return X.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Ft(t,e){return t===e||t!=t&&e!=e}(pt&&Rt(new pt(new ArrayBuffer(1)))!=m||yt&&Rt(new yt)!=l||ht&&"[object Promise]"!=Rt(ht.resolve())||gt&&Rt(new gt)!=g||dt&&"[object WeakMap]"!=Rt(new dt))&&(Rt=function(t){var e=tt.call(t),r=e==y?t.constructor:void 0,n=r?Kt(r):void 0;if(n)switch(n){case vt:return m;case mt:return l;case _t:return"[object Promise]";case wt:return g;case jt:return"[object WeakMap]"}return e});var Vt=Array.isArray;function Bt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=i}(t.length)&&!qt(t)}var Zt=ft||function(){return!1};function qt(t){var e=Ut(t)?tt.call(t):"";return e==u||e==f}function Ut(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function zt(t){return Bt(t)?It(t):function(t){if(!Jt(t))return lt(t);var e=[];for(var r in Object(t))Y.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}t.exports=function(t){return xt(t,!0,!0)}}),h="[object Object]";var g,d,b=Function.prototype,v=Object.prototype,m=b.toString,_=v.hasOwnProperty,w=m.call(Object),j=v.toString,O=(g=Object.getPrototypeOf,d=Object,function(t){return g(d(t))});var $=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||j.call(t)!=h||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=O(t);if(null===e)return!0;var r=_.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&m.call(r)==w};const S=Array.isArray;function A(t){return"string"==typeof t&&t.length>0&&"."===t[0]?t.slice(1):t}function T(t,e){return function t(e,r,n){const o=y(e);let i,a,c,s,u;if((n=Object.assign({depth:-1,path:""},n)).depth+=1,S(o))for(i=0,a=o.length;i<a;i++){const e=`${n.path}.${i}`;void 0!==o[i]?(n.parent=y(o),n.parentType="array",c=t(r(o[i],void 0,Object.assign({},n,{path:A(e)})),r,Object.assign({},n,{path:A(e)})),Number.isNaN(c)&&i<o.length?(o.splice(i,1),i-=1):o[i]=c):o.splice(i,1)}else if($(o))for(i=0,a=(s=Object.keys(o)).length;i<a;i++){u=s[i];const e=`${n.path}.${u}`;0===n.depth&&null!=u&&(n.topmostKey=u),n.parent=y(o),n.parentType="object",c=t(r(u,o[u],Object.assign({},n,{path:A(e)})),r,Object.assign({},n,{path:A(e)})),Number.isNaN(c)?delete o[u]:o[u]=c}return o}(t,e,{})}var E="__lodash_hash_undefined__",I=9007199254740991,N="[object Function]",k="[object GeneratorFunction]",x=/^\[object .+?Constructor\]$/,M="object"==typeof n&&n&&n.Object===Object&&n,P="object"==typeof self&&self&&self.Object===Object&&self,W=M||P||Function("return this")();function D(t,e){return!!(t?t.length:0)&&function(t,e,r){if(e!=e)return function(t,e,r,n){var o=t.length,i=r+(n?1:-1);for(;n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,R,r);var n=r-1,o=t.length;for(;++n<o;)if(t[n]===e)return n;return-1}(t,e,0)>-1}function L(t,e,r){for(var n=-1,o=t?t.length:0;++n<o;)if(r(e,t[n]))return!0;return!1}function H(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}function R(t){return t!=t}function C(t){return function(e){return t(e)}}function J(t,e){return t.has(e)}var K,F=Array.prototype,V=Function.prototype,B=Object.prototype,Z=W["__core-js_shared__"],q=(K=/[^.]+$/.exec(Z&&Z.keys&&Z.keys.IE_PROTO||""))?"Symbol(src)_1."+K:"",U=V.toString,z=B.hasOwnProperty,G=B.toString,Q=RegExp("^"+U.call(z).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),X=F.splice,Y=Math.max,tt=Math.min,et=lt(W,"Map"),rt=lt(Object,"create");function nt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function ot(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function it(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function at(t){var e=-1,r=t?t.length:0;for(this.__data__=new it;++e<r;)this.add(t[e])}function ct(t,e){for(var r,n,o=t.length;o--;)if((r=t[o][0])===(n=e)||r!=r&&n!=n)return o;return-1}function st(t){return!(!yt(t)||(e=t,q&&q in e))&&(pt(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?Q:x).test(function(t){if(null!=t){try{return U.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t));var e}function ut(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&function(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=I}(t.length)&&!pt(t)}(t)}(t)?t:[]}function ft(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function lt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return st(r)?r:void 0}function pt(t){var e=yt(t)?G.call(t):"";return e==N||e==k}function yt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}nt.prototype.clear=function(){this.__data__=rt?rt(null):{}},nt.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},nt.prototype.get=function(t){var e=this.__data__;if(rt){var r=e[t];return r===E?void 0:r}return z.call(e,t)?e[t]:void 0},nt.prototype.has=function(t){var e=this.__data__;return rt?void 0!==e[t]:z.call(e,t)},nt.prototype.set=function(t,e){return this.__data__[t]=rt&&void 0===e?E:e,this},ot.prototype.clear=function(){this.__data__=[]},ot.prototype.delete=function(t){var e=this.__data__,r=ct(e,t);return!(r<0||(r==e.length-1?e.pop():X.call(e,r,1),0))},ot.prototype.get=function(t){var e=this.__data__,r=ct(e,t);return r<0?void 0:e[r][1]},ot.prototype.has=function(t){return ct(this.__data__,t)>-1},ot.prototype.set=function(t,e){var r=this.__data__,n=ct(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},it.prototype.clear=function(){this.__data__={hash:new nt,map:new(et||ot),string:new nt}},it.prototype.delete=function(t){return ft(this,t).delete(t)},it.prototype.get=function(t){return ft(this,t).get(t)},it.prototype.has=function(t){return ft(this,t).has(t)},it.prototype.set=function(t,e){return ft(this,t).set(t,e),this},at.prototype.add=at.prototype.push=function(t){return this.__data__.set(t,E),this},at.prototype.has=function(t){return this.__data__.has(t)};var ht=function(t,e){return e=Y(void 0===e?t.length-1:e,0),function(){for(var r=arguments,n=-1,o=Y(r.length-e,0),i=Array(o);++n<o;)i[n]=r[e+n];n=-1;for(var a=Array(e+1);++n<e;)a[n]=r[n];return a[e]=i,function(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}(t,this,a)}}(function(t){var e=H(t,ut);return e.length&&e[0]===t[0]?function(t,e,r){for(var n=r?L:D,o=t[0].length,i=t.length,a=i,c=Array(i),s=1/0,u=[];a--;){var f=t[a];a&&e&&(f=H(f,C(e))),s=tt(f.length,s),c[a]=!r&&(e||o>=120&&f.length>=120)?new at(a&&f):void 0}f=t[0];var l=-1,p=c[0];t:for(;++l<o&&u.length<s;){var y=f[l],h=e?e(y):y;if(y=r||0!==y?y:0,!(p?J(p,h):n(u,h,r))){for(a=i;--a;){var g=c[a];if(!(g?J(g,h):n(t[a],h,r)))continue t}p&&p.push(h),u.push(y)}}return u}(e):[]});function gt(t){return"string"==typeof t?t.length>0?[t]:[]:t}var dt=o(function(t){t.exports=function(){var t=Object.prototype.toString;function e(t,e){return null!=t&&Object.prototype.hasOwnProperty.call(t,e)}function r(t){if(!t)return!0;if(o(t)&&0===t.length)return!0;if("string"!=typeof t){for(var r in t)if(e(t,r))return!1;return!0}return!1}function n(e){return t.call(e)}var o=Array.isArray||function(e){return"[object Array]"===t.call(e)};function i(t){var e=parseInt(t);return e.toString()===t?e:t}function a(t){t=t||{};var a=function(t){return Object.keys(a).reduce(function(e,r){return"create"===r?e:("function"==typeof a[r]&&(e[r]=a[r].bind(a,t)),e)},{})};function c(r,n){return t.includeInheritedProps||"number"==typeof n&&Array.isArray(r)||e(r,n)}function s(t,e){if(c(t,e))return t[e]}function u(t,e,r,n){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if("string"==typeof e)return u(t,e.split(".").map(i),r,n);var o=e[0],a=s(t,o);return 1===e.length?(void 0!==a&&n||(t[o]=r),a):(void 0===a&&("number"==typeof e[1]?t[o]=[]:t[o]={}),u(t[o],e.slice(1),r,n))}return a.has=function(r,n){if("number"==typeof n?n=[n]:"string"==typeof n&&(n=n.split(".")),!n||0===n.length)return!!r;for(var a=0;a<n.length;a++){var c=i(n[a]);if(!("number"==typeof c&&o(r)&&c<r.length||(t.includeInheritedProps?c in Object(r):e(r,c))))return!1;r=r[c]}return!0},a.ensureExists=function(t,e,r){return u(t,e,r,!0)},a.set=function(t,e,r,n){return u(t,e,r,n)},a.insert=function(t,e,r,n){var i=a.get(t,e);n=~~n,o(i)||(i=[],a.set(t,e,i)),i.splice(n,0,r)},a.empty=function(t,e){var i,s;if(!r(e)&&null!=t&&(i=a.get(t,e))){if("string"==typeof i)return a.set(t,e,"");if(function(t){return"boolean"==typeof t||"[object Boolean]"===n(t)}(i))return a.set(t,e,!1);if("number"==typeof i)return a.set(t,e,0);if(o(i))i.length=0;else{if(!function(t){return"object"==typeof t&&"[object Object]"===n(t)}(i))return a.set(t,e,null);for(s in i)c(i,s)&&delete i[s]}}},a.push=function(t,e){var r=a.get(t,e);o(r)||(r=[],a.set(t,e,r)),r.push.apply(r,Array.prototype.slice.call(arguments,2))},a.coalesce=function(t,e,r){for(var n,o=0,i=e.length;o<i;o++)if(void 0!==(n=a.get(t,e[o])))return n;return r},a.get=function(t,e,r){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if(null==t)return r;if("string"==typeof e)return a.get(t,e.split("."),r);var n=i(e[0]),o=s(t,n);return void 0===o?r:1===e.length?o:a.get(t[n],e.slice(1),r)},a.del=function(t,e){if("number"==typeof e&&(e=[e]),null==t)return t;if(r(e))return t;if("string"==typeof e)return a.del(t,e.split("."));var n=i(e[0]);return c(t,n)?1!==e.length?a.del(t[n],e.slice(1)):(o(t)?t.splice(n,1):delete t[n],t):t},a}var c=a();return c.create=a,c.withInheritedProps=a({includeInheritedProps:!0}),c}()}),bt=function(t){var e=t%100;if(e>=10&&e<=20)return"th";var r=t%10;return 1===r?"st":2===r?"nd":3===r?"rd":"th"};function vt(t){if("number"!=typeof t)throw new TypeError("Expected Number, got "+typeof t+" "+t);return t+bt(t)}vt.indicator=bt;var mt=vt,_t=/[|\\{}()[\]^$+*?.]/g,wt=function(t){if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(_t,"\\$&")};const jt=new Map;function Ot(t,e){const r=Object.assign({caseSensitive:!1},e),n=t+JSON.stringify(r);if(jt.has(n))return jt.get(n);const o="!"===t[0];o&&(t=t.slice(1)),t=wt(t).replace(/\\\*/g,".*");const i=new RegExp(`^${t}$`,r.caseSensitive?"":"i");return i.negated=o,jt.set(n,i),i}var $t=(t,e,r)=>{if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError(`Expected two arrays, got ${typeof t} ${typeof e}`);if(0===e.length)return t;const n="!"===e[0][0];e=e.map(t=>Ot(t,r));const o=[];for(const r of t){let t=n;for(const n of e)n.test(r)&&(t=!n.negated);t&&o.push(r)}return o};function St(t,e,r){return function t(e,r,n,o=!0){const i=Object.prototype.hasOwnProperty;function c(t){return null!=t}function s(t){return"Object"===a(t)}function u(t,e){return e=gt(e),Array.from(t).filter(t=>!e.some(e=>$t.isMatch(t,e,{caseSensitive:!0})))}const f=["any","anything","every","everything","all","whatever","whatevs"],l=Array.isArray;if(!c(e))throw new Error("check-types-mini: [THROW_ID_01] First argument is missing!");const y={ignoreKeys:[],ignorePaths:[],acceptArrays:!1,acceptArraysIgnore:[],enforceStrictKeyset:!0,schema:{},msg:"check-types-mini",optsVarName:"opts"};let h;if(h=c(n)&&s(n)?Object.assign({},y,n):Object.assign({},y),c(h.ignoreKeys)&&h.ignoreKeys?h.ignoreKeys=gt(h.ignoreKeys):h.ignoreKeys=[],c(h.ignorePaths)&&h.ignorePaths?h.ignorePaths=gt(h.ignorePaths):h.ignorePaths=[],c(h.acceptArraysIgnore)&&h.acceptArraysIgnore?h.acceptArraysIgnore=gt(h.acceptArraysIgnore):h.acceptArraysIgnore=[],h.msg="string"==typeof h.msg?h.msg.trim():h.msg,":"===h.msg[h.msg.length-1]&&(h.msg=h.msg.slice(0,h.msg.length-1).trim()),h.schema&&(Object.keys(h.schema).forEach(t=>{if(s(h.schema[t])){const e={};T(h.schema[t],(r,n,o)=>{const i=void 0!==n?n:r;return l(i)||s(i)||(e[`${t}.${o.path}`]=i),i}),delete h.schema[t],h.schema=Object.assign(h.schema,e)}}),Object.keys(h.schema).forEach(t=>{l(h.schema[t])||(h.schema[t]=[h.schema[t]]),h.schema[t]=h.schema[t].map(String).map(t=>t.toLowerCase()).map(t=>t.trim())})),c(r)||(r={}),o&&t(h,y,{enforceStrictKeyset:!1},!1),h.enforceStrictKeyset)if(c(h.schema)&&Object.keys(h.schema).length>0){if(0!==u(p(Object.keys(e),Object.keys(r).concat(Object.keys(h.schema))),h.ignoreKeys).length){const t=p(Object.keys(e),Object.keys(r).concat(Object.keys(h.schema)));throw new TypeError(`${h.msg}: ${h.optsVarName}.enforceStrictKeyset is on and the following key${t.length>1?"s":""} ${t.length>1?"are":"is"} not covered by schema and/or reference objects: ${t.join(", ")}`)}}else{if(!(c(r)&&Object.keys(r).length>0))throw new TypeError(`${h.msg}: Both ${h.optsVarName}.schema and reference objects are missing! We don't have anything to match the keys as you requested via opts.enforceStrictKeyset!`);if(0!==u(p(Object.keys(e),Object.keys(r)),h.ignoreKeys).length){const t=p(Object.keys(e),Object.keys(r));throw new TypeError(`${h.msg}: The input object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not covered by the reference object: ${t.join(", ")}`)}if(0!==u(p(Object.keys(r),Object.keys(e)),h.ignoreKeys).length){const t=p(Object.keys(r),Object.keys(e));throw new TypeError(`${h.msg}: The reference object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not present in the input object: ${t.join(", ")}`)}}const g=[];T(e,(t,n,o)=>{let c=n,u=t;if("array"===o.parentType&&(u=void 0,c=t),l(g)&&g.length&&g.some(t=>o.path.startsWith(t)))return c;if(u&&h.ignoreKeys.some(t=>$t.isMatch(u,t)))return c;if(h.ignorePaths.some(t=>$t.isMatch(o.path,t)))return c;const p=!(!s(c)&&!l(c)&&l(o.parent));let y=!1;s(h.schema)&&i.call(h.schema,dt.get(o.path))&&(y=!0);let d=!1;if(s(r)&&dt.has(r,dt.get(o.path))&&(d=!0),h.enforceStrictKeyset&&p&&!y&&!d)throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path} is neither covered by reference object (second input argument), nor ${h.optsVarName}.schema! To stop this error, turn off ${h.optsVarName}.enforceStrictKeyset or provide some type reference (2nd argument or ${h.optsVarName}.schema).\n\nDebug info:\n\nobj = ${JSON.stringify(e,null,4)}\n\nref = ${JSON.stringify(r,null,4)}\n\ninnerObj = ${JSON.stringify(o,null,4)}\n\nopts = ${JSON.stringify(h,null,4)}\n\ncurrent = ${JSON.stringify(c,null,4)}\n\n`);if(y){const t=gt(h.schema[o.path]).map(String).map(t=>t.toLowerCase());if(dt.set(h.schema,o.path,t),ht(t,f).length)g.push(o.path);else if(!0!==c&&!1!==c&&!t.includes(a(c).toLowerCase())||(!0===c||!1===c)&&!t.includes(String(c))&&!t.includes("boolean")){if(!l(c)||!h.acceptArrays)throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path} was customised to ${"string"!==a(c)?'"':""}${JSON.stringify(c,null,0)}${"string"!==a(c)?'"':""} (type: ${a(c).toLowerCase()}) which is not among the allowed types in schema (which is equal to ${JSON.stringify(t,null,0)})`);for(let e=0,r=c.length;e<r;e++)if(!t.includes(a(c[e]).toLowerCase()))throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path}.${e}, the ${mt(e+1)} element (equal to ${JSON.stringify(c[e],null,0)}) is of a type ${a(c[e]).toLowerCase()}, but only the following are allowed by the ${h.optsVarName}.schema: ${t.join(", ")}`)}}else if(d){const e=dt.get(r,o.path);if(h.acceptArrays&&l(c)&&!h.acceptArraysIgnore.includes(t)){if(!c.every(e=>a(e).toLowerCase()===a(r[t]).toLowerCase()))throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path} was customised to be array, but not all of its elements are ${a(r[t]).toLowerCase()}-type`)}else if(a(c)!==a(e))throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path} was customised to ${"string"===a(c).toLowerCase()?"":'"'}${JSON.stringify(c,null,0)}${"string"===a(c).toLowerCase()?"":'"'} which is not ${a(e).toLowerCase()} but ${a(c).toLowerCase()}`)}return c})}(t,e,r)}$t.isMatch=((t,e,r)=>{const n=Ot(e,r),o=n.test(t);return n.negated?!o:o});const At=Array.isArray;function Tt(t,e){if(!At(t))throw new TypeError(`ranges-sort: [THROW_ID_01] Input must be an array, consisting of range arrays! Currently its type is: ${typeof t}, equal to: ${JSON.stringify(t,null,4)}`);if(0===t.length)return t;const n={strictlyTwoElementsInRangeArrays:!1,progressFn:null},o=Object.assign({},n,e);let a,c;if(St(o,n,{msg:"ranges-sort: [THROW_ID_02*]",schema:{progressFn:["function","false","null"]}}),o.strictlyTwoElementsInRangeArrays&&!t.every((t,e)=>2===t.length||(a=e,c=t.length,!1)))throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${i(a)} range (${JSON.stringify(t[a],null,4)}) has not two but ${c} elements!`);if(!t.every((t,e)=>!(!r(t[0],{includeZero:!0})||!r(t[1],{includeZero:!0}))||(a=e,!1)))throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${i(a)} range (${JSON.stringify(t[a],null,4)}) does not consist of only natural numbers!`);const s=t.length*t.length;let u=0;return Array.from(t).sort((t,e)=>(o.progressFn&&(u++,o.progressFn(Math.floor(100*u/s))),t[0]===e[0]?t[1]<e[1]?-1:t[1]>e[1]?1:0:t[0]<e[0]?-1:1))}var Et=Array.isArray;return function(r,n,o,i){if("string"!=typeof r)throw void 0===r?new Error("ranges-process-outside: [THROW_ID_01] the first input argument must be string! It's missing currently (undefined)!"):new Error("ranges-process-outside: [THROW_ID_02] the first input argument must be string! It was given as:\n".concat(JSON.stringify(r,null,4)," (type ").concat(t(r),")"));if(null!==n&&!Et(n))throw new Error("ranges-process-outside: [THROW_ID_03] the second input argument must be array of ranges or null! It was given as:\n".concat(JSON.stringify(n,null,4)," (type ").concat(t(n),")"));if(Et(n)&&0!==n.length){if(!(a=o)||"[object Function]"!=={}.toString.call(a))throw new Error("ranges-process-outside: [THROW_ID_04] the third input argument must be a function! It was given as:\n".concat(JSON.stringify(o,null,4)," (type ").concat(t(o),")"));var a,c;c=i?n:function(t,e){if(!Array.isArray(t))return t;if(e&&"function"!=typeof e)throw new Error(`ranges-merge: [THROW_ID_01] the second input argument must be a function! It was given of a type: "${typeof e}", equal to ${JSON.stringify(e,null,4)}`);const r=y(t).filter(t=>void 0!==t[2]||t[0]!==t[1]);let n,o,i;const a=(n=e?Tt(r,{progressFn:t=>{(i=Math.floor(t/5))!==o&&(o=i,e(i))}}):Tt(r)).length-1;for(let t=a;t>0;t--)e&&(i=Math.floor(78*(1-t/a))+21)!==o&&i>o&&(o=i,e(i)),(n[t][0]<=n[t-1][0]||n[t][0]<=n[t-1][1])&&(n[t-1][0]=Math.min(n[t][0],n[t-1][0]),n[t-1][1]=Math.max(n[t][1],n[t-1][1]),void 0!==n[t][2]&&(n[t-1][0]>=n[t][0]||n[t-1][1]<=n[t][1])&&null!==n[t-1][2]&&(null===n[t][2]&&null!==n[t-1][2]?n[t-1][2]=null:void 0!==n[t-1][2]?n[t-1][2]+=n[t][2]:n[t-1][2]=n[t][2]),n.splice(t,1),t=n.length);return n}(n);var s=0;c.forEach(function(t,i,a){var u=e(t,2),f=u[0],l=u[1];if(f<s)throw new Error("ranges-process-outside: [THROW_ID_05] the ranges array is not sorted/merged. It's equal to:\n".concat(JSON.stringify(n,null,4),"\n\nNotice ranges at index ").concat(i," and ").concat(i-1,": [... ").concat(JSON.stringify(c[i-1],null,0),", ").concat(JSON.stringify(c[i],null,0),"...] - use ranges-merge, ranges-sort or ranges-push npm libraries to process your ranges array upfont."));null!==f&&0!==f&&o({from:s,to:f,value:r.slice(s,f)}),null!==(s=l<=r.length?l:null)&&i===a.length-1&&o({from:s,to:r.length,value:r.slice(s,r.length)})})}else o({from:0,to:r.length,value:r})}});
