/**
 * string-trim-spaces-only
 * Like String.trim() but trims only spaces
 * Version: 2.7.22
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-trim-spaces-only
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).stringTrimSpacesOnly=e()}(this,function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function r(t,e){return t(e={exports:{}},e.exports),e.exports}var n=r(function(t,r){var n,o,i,a,c,s,u,f,l,p,y,h,g,b,d,v,m,_,j,w;t.exports=(n="function"==typeof Promise,o="object"==typeof self?self:e,i="undefined"!=typeof Symbol,a="undefined"!=typeof Map,c="undefined"!=typeof Set,s="undefined"!=typeof WeakMap,u="undefined"!=typeof WeakSet,f="undefined"!=typeof DataView,l=i&&void 0!==Symbol.iterator,p=i&&void 0!==Symbol.toStringTag,y=c&&"function"==typeof Set.prototype.entries,h=a&&"function"==typeof Map.prototype.entries,g=y&&Object.getPrototypeOf((new Set).entries()),b=h&&Object.getPrototypeOf((new Map).entries()),d=l&&"function"==typeof Array.prototype[Symbol.iterator],v=d&&Object.getPrototypeOf([][Symbol.iterator]()),m=l&&"function"==typeof String.prototype[Symbol.iterator],_=m&&Object.getPrototypeOf(""[Symbol.iterator]()),j=8,w=-1,function(t){var e=typeof t;if("object"!==e)return e;if(null===t)return"null";if(t===o)return"global";if(Array.isArray(t)&&(!1===p||!(Symbol.toStringTag in t)))return"Array";if("object"==typeof window&&null!==window){if("object"==typeof window.location&&t===window.location)return"Location";if("object"==typeof window.document&&t===window.document)return"Document";if("object"==typeof window.navigator){if("object"==typeof window.navigator.mimeTypes&&t===window.navigator.mimeTypes)return"MimeTypeArray";if("object"==typeof window.navigator.plugins&&t===window.navigator.plugins)return"PluginArray"}if(("function"==typeof window.HTMLElement||"object"==typeof window.HTMLElement)&&t instanceof window.HTMLElement){if("BLOCKQUOTE"===t.tagName)return"HTMLQuoteElement";if("TD"===t.tagName)return"HTMLTableDataCellElement";if("TH"===t.tagName)return"HTMLTableHeaderCellElement"}}var r=p&&t[Symbol.toStringTag];if("string"==typeof r)return r;var i=Object.getPrototypeOf(t);return i===RegExp.prototype?"RegExp":i===Date.prototype?"Date":n&&i===Promise.prototype?"Promise":c&&i===Set.prototype?"Set":a&&i===Map.prototype?"Map":u&&i===WeakSet.prototype?"WeakSet":s&&i===WeakMap.prototype?"WeakMap":f&&i===DataView.prototype?"DataView":a&&i===b?"Map Iterator":c&&i===g?"Set Iterator":d&&i===v?"Array Iterator":m&&i===_?"String Iterator":null===i?"Object":Object.prototype.toString.call(t).slice(j,w)})});function o(t,e,r){if(e!=e)return function(t,e,r,n){for(var o=t.length,i=r+(n?1:-1);n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,a,r);for(var n=r-1,o=t.length;++n<o;)if(t[n]===e)return n;return-1}function i(t,e,r,n){for(var o=r-1,i=t.length;++o<i;)if(n(t[o],e))return o;return-1}function a(t){return t!=t}var c=Array.prototype.splice;function s(t,e,r,n){var a,s=n?i:o,u=-1,f=e.length,l=t;for(t===e&&(e=function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(e)),r&&(l=function(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}(t,(a=r,function(t){return a(t)})));++u<f;)for(var p=0,y=e[u],h=r?r(y):y;(p=s(l,h,p,n))>-1;)l!==t&&c.call(l,p,1),c.call(t,p,1);return t}var u=function(t,e){return t&&t.length&&e&&e.length?s(t,e):t},f=r(function(t,r){var n=200,o="__lodash_hash_undefined__",i=9007199254740991,a="[object Arguments]",c="[object Boolean]",s="[object Date]",u="[object Function]",f="[object GeneratorFunction]",l="[object Map]",p="[object Number]",y="[object Object]",h="[object RegExp]",g="[object Set]",b="[object String]",d="[object Symbol]",v="[object ArrayBuffer]",m="[object DataView]",_="[object Float32Array]",j="[object Float64Array]",w="[object Int8Array]",O="[object Int16Array]",$="[object Int32Array]",S="[object Uint8Array]",A="[object Uint8ClampedArray]",T="[object Uint16Array]",k="[object Uint32Array]",E=/\w*$/,N=/^\[object .+?Constructor\]$/,P=/^(?:0|[1-9]\d*)$/,M={};M[a]=M["[object Array]"]=M[v]=M[m]=M[c]=M[s]=M[_]=M[j]=M[w]=M[O]=M[$]=M[l]=M[p]=M[y]=M[h]=M[g]=M[b]=M[d]=M[S]=M[A]=M[T]=M[k]=!0,M["[object Error]"]=M[u]=M["[object WeakMap]"]=!1;var x="object"==typeof e&&e&&e.Object===Object&&e,I="object"==typeof self&&self&&self.Object===Object&&self,L=x||I||Function("return this")(),C=r&&!r.nodeType&&r,K=C&&t&&!t.nodeType&&t,V=K&&K.exports===C;function D(t,e){return t.set(e[0],e[1]),t}function W(t,e){return t.add(e),t}function F(t,e,r,n){var o=-1,i=t?t.length:0;for(n&&i&&(r=t[++o]);++o<i;)r=e(r,t[o],o,t);return r}function H(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function J(t){var e=-1,r=Array(t.size);return t.forEach(function(t,n){r[++e]=[n,t]}),r}function R(t,e){return function(r){return t(e(r))}}function B(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r}var U,q=Array.prototype,z=Function.prototype,G=Object.prototype,Q=L["__core-js_shared__"],X=(U=/[^.]+$/.exec(Q&&Q.keys&&Q.keys.IE_PROTO||""))?"Symbol(src)_1."+U:"",Y=z.toString,Z=G.hasOwnProperty,tt=G.toString,et=RegExp("^"+Y.call(Z).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rt=V?L.Buffer:void 0,nt=L.Symbol,ot=L.Uint8Array,it=R(Object.getPrototypeOf,Object),at=Object.create,ct=G.propertyIsEnumerable,st=q.splice,ut=Object.getOwnPropertySymbols,ft=rt?rt.isBuffer:void 0,lt=R(Object.keys,Object),pt=Kt(L,"DataView"),yt=Kt(L,"Map"),ht=Kt(L,"Promise"),gt=Kt(L,"Set"),bt=Kt(L,"WeakMap"),dt=Kt(Object,"create"),vt=Ht(pt),mt=Ht(yt),_t=Ht(ht),jt=Ht(gt),wt=Ht(bt),Ot=nt?nt.prototype:void 0,$t=Ot?Ot.valueOf:void 0;function St(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function At(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Tt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function kt(t){this.__data__=new At(t)}function Et(t,e){var r=Rt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Bt(t)}(t)&&Z.call(t,"callee")&&(!ct.call(t,"callee")||tt.call(t)==a)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var i in t)!e&&!Z.call(t,i)||o&&("length"==i||Wt(i,n))||r.push(i);return r}function Nt(t,e,r){var n=t[e];Z.call(t,e)&&Jt(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function Pt(t,e){for(var r=t.length;r--;)if(Jt(t[r][0],e))return r;return-1}function Mt(t,e,r,n,o,i,N){var P;if(n&&(P=i?n(t,o,i,N):n(t)),void 0!==P)return P;if(!zt(t))return t;var x=Rt(t);if(x){if(P=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&Z.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,P)}else{var I=Dt(t),L=I==u||I==f;if(Ut(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(I==y||I==a||L&&!i){if(H(t))return i?t:{};if(P=function(t){return"function"!=typeof t.constructor||Ft(t)?{}:(e=it(t),zt(e)?at(e):{});var e}(L?{}:t),!e)return function(t,e){return Lt(t,Vt(t),e)}(t,function(t,e){return t&&Lt(e,Gt(e),t)}(P,t))}else{if(!M[I])return i?t:{};P=function(t,e,r,n){var o=t.constructor;switch(e){case v:return It(t);case c:case s:return new o(+t);case m:return function(t,e){var r=e?It(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,n);case _:case j:case w:case O:case $:case S:case A:case T:case k:return function(t,e){var r=e?It(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,n);case l:return function(t,e,r){return F(e?r(J(t),!0):J(t),D,new t.constructor)}(t,n,r);case p:case b:return new o(t);case h:return(u=new(a=t).constructor(a.source,E.exec(a))).lastIndex=a.lastIndex,u;case g:return function(t,e,r){return F(e?r(B(t),!0):B(t),W,new t.constructor)}(t,n,r);case d:return i=t,$t?Object($t.call(i)):{}}var i;var a,u}(t,I,Mt,e)}}N||(N=new kt);var C=N.get(t);if(C)return C;if(N.set(t,P),!x)var K=r?function(t){return function(t,e,r){var n=e(t);return Rt(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,Gt,Vt)}(t):Gt(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}(K||t,function(o,i){K&&(o=t[i=o]),Nt(P,i,Mt(o,e,r,n,i,t,N))}),P}function xt(t){return!(!zt(t)||(e=t,X&&X in e))&&(qt(t)||H(t)?et:N).test(Ht(t));var e}function It(t){var e=new t.constructor(t.byteLength);return new ot(e).set(new ot(t)),e}function Lt(t,e,r,n){r||(r={});for(var o=-1,i=e.length;++o<i;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;Nt(r,a,void 0===c?t[a]:c)}return r}function Ct(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function Kt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return xt(r)?r:void 0}St.prototype.clear=function(){this.__data__=dt?dt(null):{}},St.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},St.prototype.get=function(t){var e=this.__data__;if(dt){var r=e[t];return r===o?void 0:r}return Z.call(e,t)?e[t]:void 0},St.prototype.has=function(t){var e=this.__data__;return dt?void 0!==e[t]:Z.call(e,t)},St.prototype.set=function(t,e){return this.__data__[t]=dt&&void 0===e?o:e,this},At.prototype.clear=function(){this.__data__=[]},At.prototype.delete=function(t){var e=this.__data__,r=Pt(e,t);return!(r<0||(r==e.length-1?e.pop():st.call(e,r,1),0))},At.prototype.get=function(t){var e=this.__data__,r=Pt(e,t);return r<0?void 0:e[r][1]},At.prototype.has=function(t){return Pt(this.__data__,t)>-1},At.prototype.set=function(t,e){var r=this.__data__,n=Pt(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},Tt.prototype.clear=function(){this.__data__={hash:new St,map:new(yt||At),string:new St}},Tt.prototype.delete=function(t){return Ct(this,t).delete(t)},Tt.prototype.get=function(t){return Ct(this,t).get(t)},Tt.prototype.has=function(t){return Ct(this,t).has(t)},Tt.prototype.set=function(t,e){return Ct(this,t).set(t,e),this},kt.prototype.clear=function(){this.__data__=new At},kt.prototype.delete=function(t){return this.__data__.delete(t)},kt.prototype.get=function(t){return this.__data__.get(t)},kt.prototype.has=function(t){return this.__data__.has(t)},kt.prototype.set=function(t,e){var r=this.__data__;if(r instanceof At){var o=r.__data__;if(!yt||o.length<n-1)return o.push([t,e]),this;r=this.__data__=new Tt(o)}return r.set(t,e),this};var Vt=ut?R(ut,Object):function(){return[]},Dt=function(t){return tt.call(t)};function Wt(t,e){return!!(e=null==e?i:e)&&("number"==typeof t||P.test(t))&&t>-1&&t%1==0&&t<e}function Ft(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||G)}function Ht(t){if(null!=t){try{return Y.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Jt(t,e){return t===e||t!=t&&e!=e}(pt&&Dt(new pt(new ArrayBuffer(1)))!=m||yt&&Dt(new yt)!=l||ht&&"[object Promise]"!=Dt(ht.resolve())||gt&&Dt(new gt)!=g||bt&&"[object WeakMap]"!=Dt(new bt))&&(Dt=function(t){var e=tt.call(t),r=e==y?t.constructor:void 0,n=r?Ht(r):void 0;if(n)switch(n){case vt:return m;case mt:return l;case _t:return"[object Promise]";case jt:return g;case wt:return"[object WeakMap]"}return e});var Rt=Array.isArray;function Bt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=i}(t.length)&&!qt(t)}var Ut=ft||function(){return!1};function qt(t){var e=zt(t)?tt.call(t):"";return e==u||e==f}function zt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function Gt(t){return Bt(t)?Et(t):function(t){if(!Ft(t))return lt(t);var e=[];for(var r in Object(t))Z.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}t.exports=function(t){return Mt(t,!0,!0)}}),l="[object Object]";var p,y,h=Function.prototype,g=Object.prototype,b=h.toString,d=g.hasOwnProperty,v=b.call(Object),m=g.toString,_=(p=Object.getPrototypeOf,y=Object,function(t){return p(y(t))});var j=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||m.call(t)!=l||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=_(t);if(null===e)return!0;var r=d.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&b.call(r)==v};const w=Array.isArray;function O(t){return"string"==typeof t&&t.length>0&&"."===t[0]?t.slice(1):t}function $(t,e){return function t(e,r,n){const o=f(e);let i,a,c,s,u;if((n=Object.assign({depth:-1,path:""},n)).depth+=1,w(o))for(i=0,a=o.length;i<a;i++){const e=`${n.path}.${i}`;void 0!==o[i]?(n.parent=f(o),n.parentType="array",c=t(r(o[i],void 0,Object.assign({},n,{path:O(e)})),r,Object.assign({},n,{path:O(e)})),Number.isNaN(c)&&i<o.length?(o.splice(i,1),i-=1):o[i]=c):o.splice(i,1)}else if(j(o))for(i=0,a=(s=Object.keys(o)).length;i<a;i++){u=s[i];const e=`${n.path}.${u}`;0===n.depth&&null!=u&&(n.topmostKey=u),n.parent=f(o),n.parentType="object",c=t(r(u,o[u],Object.assign({},n,{path:O(e)})),r,Object.assign({},n,{path:O(e)})),Number.isNaN(c)?delete o[u]:o[u]=c}return o}(t,e,{})}var S="__lodash_hash_undefined__",A=9007199254740991,T="[object Function]",k="[object GeneratorFunction]",E=/^\[object .+?Constructor\]$/,N="object"==typeof e&&e&&e.Object===Object&&e,P="object"==typeof self&&self&&self.Object===Object&&self,M=N||P||Function("return this")();function x(t,e){return!!(t?t.length:0)&&function(t,e,r){if(e!=e)return function(t,e,r,n){var o=t.length,i=r+(n?1:-1);for(;n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,C,r);var n=r-1,o=t.length;for(;++n<o;)if(t[n]===e)return n;return-1}(t,e,0)>-1}function I(t,e,r){for(var n=-1,o=t?t.length:0;++n<o;)if(r(e,t[n]))return!0;return!1}function L(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}function C(t){return t!=t}function K(t){return function(e){return t(e)}}function V(t,e){return t.has(e)}var D,W=Array.prototype,F=Function.prototype,H=Object.prototype,J=M["__core-js_shared__"],R=(D=/[^.]+$/.exec(J&&J.keys&&J.keys.IE_PROTO||""))?"Symbol(src)_1."+D:"",B=F.toString,U=H.hasOwnProperty,q=H.toString,z=RegExp("^"+B.call(U).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),G=W.splice,Q=Math.max,X=Math.min,Y=st(M,"Map"),Z=st(Object,"create");function tt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function et(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function rt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function nt(t){var e=-1,r=t?t.length:0;for(this.__data__=new rt;++e<r;)this.add(t[e])}function ot(t,e){for(var r,n,o=t.length;o--;)if((r=t[o][0])===(n=e)||r!=r&&n!=n)return o;return-1}function it(t){return!(!ft(t)||function(t){return!!R&&R in t}(t))&&(ut(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?z:E).test(function(t){if(null!=t){try{return B.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t))}function at(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&function(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=A}(t.length)&&!ut(t)}(t)}(t)?t:[]}function ct(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function st(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return it(r)?r:void 0}function ut(t){var e=ft(t)?q.call(t):"";return e==T||e==k}function ft(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}tt.prototype.clear=function(){this.__data__=Z?Z(null):{}},tt.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},tt.prototype.get=function(t){var e=this.__data__;if(Z){var r=e[t];return r===S?void 0:r}return U.call(e,t)?e[t]:void 0},tt.prototype.has=function(t){var e=this.__data__;return Z?void 0!==e[t]:U.call(e,t)},tt.prototype.set=function(t,e){return this.__data__[t]=Z&&void 0===e?S:e,this},et.prototype.clear=function(){this.__data__=[]},et.prototype.delete=function(t){var e=this.__data__,r=ot(e,t);return!(r<0||(r==e.length-1?e.pop():G.call(e,r,1),0))},et.prototype.get=function(t){var e=this.__data__,r=ot(e,t);return r<0?void 0:e[r][1]},et.prototype.has=function(t){return ot(this.__data__,t)>-1},et.prototype.set=function(t,e){var r=this.__data__,n=ot(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},rt.prototype.clear=function(){this.__data__={hash:new tt,map:new(Y||et),string:new tt}},rt.prototype.delete=function(t){return ct(this,t).delete(t)},rt.prototype.get=function(t){return ct(this,t).get(t)},rt.prototype.has=function(t){return ct(this,t).has(t)},rt.prototype.set=function(t,e){return ct(this,t).set(t,e),this},nt.prototype.add=nt.prototype.push=function(t){return this.__data__.set(t,S),this},nt.prototype.has=function(t){return this.__data__.has(t)};var lt=function(t,e){return e=Q(void 0===e?t.length-1:e,0),function(){for(var r=arguments,n=-1,o=Q(r.length-e,0),i=Array(o);++n<o;)i[n]=r[e+n];n=-1;for(var a=Array(e+1);++n<e;)a[n]=r[n];return a[e]=i,function(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}(t,this,a)}}(function(t){var e=L(t,at);return e.length&&e[0]===t[0]?function(t,e,r){for(var n=r?I:x,o=t[0].length,i=t.length,a=i,c=Array(i),s=1/0,u=[];a--;){var f=t[a];a&&e&&(f=L(f,K(e))),s=X(f.length,s),c[a]=!r&&(e||o>=120&&f.length>=120)?new nt(a&&f):void 0}f=t[0];var l=-1,p=c[0];t:for(;++l<o&&u.length<s;){var y=f[l],h=e?e(y):y;if(y=r||0!==y?y:0,!(p?V(p,h):n(u,h,r))){for(a=i;--a;){var g=c[a];if(!(g?V(g,h):n(t[a],h,r)))continue t}p&&p.push(h),u.push(y)}}return u}(e):[]});function pt(t){return"string"==typeof t?t.length>0?[t]:[]:t}var yt=r(function(t){t.exports=function(){var t=Object.prototype.toString;function e(t,e){return null!=t&&Object.prototype.hasOwnProperty.call(t,e)}function r(t){if(!t)return!0;if(o(t)&&0===t.length)return!0;if("string"!=typeof t){for(var r in t)if(e(t,r))return!1;return!0}return!1}function n(e){return t.call(e)}var o=Array.isArray||function(e){return"[object Array]"===t.call(e)};function i(t){var e=parseInt(t);return e.toString()===t?e:t}function a(t){t=t||{};var a=function(t){return Object.keys(a).reduce(function(e,r){return"create"===r?e:("function"==typeof a[r]&&(e[r]=a[r].bind(a,t)),e)},{})};function c(r,n){return t.includeInheritedProps||"number"==typeof n&&Array.isArray(r)||e(r,n)}function s(t,e){if(c(t,e))return t[e]}function u(t,e,r,n){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if("string"==typeof e)return u(t,e.split(".").map(i),r,n);var o=e[0],a=s(t,o);return 1===e.length?(void 0!==a&&n||(t[o]=r),a):(void 0===a&&("number"==typeof e[1]?t[o]=[]:t[o]={}),u(t[o],e.slice(1),r,n))}return a.has=function(r,n){if("number"==typeof n?n=[n]:"string"==typeof n&&(n=n.split(".")),!n||0===n.length)return!!r;for(var a=0;a<n.length;a++){var c=i(n[a]);if(!("number"==typeof c&&o(r)&&c<r.length||(t.includeInheritedProps?c in Object(r):e(r,c))))return!1;r=r[c]}return!0},a.ensureExists=function(t,e,r){return u(t,e,r,!0)},a.set=function(t,e,r,n){return u(t,e,r,n)},a.insert=function(t,e,r,n){var i=a.get(t,e);n=~~n,o(i)||(i=[],a.set(t,e,i)),i.splice(n,0,r)},a.empty=function(t,e){var i,s;if(!r(e)&&null!=t&&(i=a.get(t,e))){if("string"==typeof i)return a.set(t,e,"");if(function(t){return"boolean"==typeof t||"[object Boolean]"===n(t)}(i))return a.set(t,e,!1);if("number"==typeof i)return a.set(t,e,0);if(o(i))i.length=0;else{if(!function(t){return"object"==typeof t&&"[object Object]"===n(t)}(i))return a.set(t,e,null);for(s in i)c(i,s)&&delete i[s]}}},a.push=function(t,e){var r=a.get(t,e);o(r)||(r=[],a.set(t,e,r)),r.push.apply(r,Array.prototype.slice.call(arguments,2))},a.coalesce=function(t,e,r){for(var n,o=0,i=e.length;o<i;o++)if(void 0!==(n=a.get(t,e[o])))return n;return r},a.get=function(t,e,r){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if(null==t)return r;if("string"==typeof e)return a.get(t,e.split("."),r);var n=i(e[0]),o=s(t,n);return void 0===o?r:1===e.length?o:a.get(t[n],e.slice(1),r)},a.del=function(t,e){if("number"==typeof e&&(e=[e]),null==t)return t;if(r(e))return t;if("string"==typeof e)return a.del(t,e.split("."));var n=i(e[0]);return c(t,n)?1!==e.length?a.del(t[n],e.slice(1)):(o(t)?t.splice(n,1):delete t[n],t):t},a}var c=a();return c.create=a,c.withInheritedProps=a({includeInheritedProps:!0}),c}()}),ht=function(t){var e=(t=Math.abs(t))%100;if(e>=10&&e<=20)return"th";var r=t%10;return 1===r?"st":2===r?"nd":3===r?"rd":"th"};function gt(t){if("number"!=typeof t)throw new TypeError("Expected Number, got "+typeof t+" "+t);return Number.isFinite(t)?t+ht(t):t}gt.indicator=ht;var bt=gt;const dt=/[|\\{}()[\]^$+*?.-]/g;var vt=t=>{if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(dt,"\\$&")};const mt=new Map;function _t(t,e){e={caseSensitive:!1,...e};const r=t+JSON.stringify(e);if(mt.has(r))return mt.get(r);const n="!"===t[0];n&&(t=t.slice(1)),t=vt(t).replace(/\\\*/g,".*");const o=new RegExp(`^${t}$`,e.caseSensitive?"":"i");return o.negated=n,mt.set(r,o),o}var jt=(t,e,r)=>{if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError(`Expected two arrays, got ${typeof t} ${typeof e}`);if(0===e.length)return t;const n="!"===e[0][0];e=e.map(t=>_t(t,r));const o=[];for(const r of t){let t=n;for(const n of e)n.test(r)&&(t=!n.negated);t&&o.push(r)}return o};function wt(t,e,r){return function t(e,r,o,i=!0){const a=Object.prototype.hasOwnProperty;function c(t){return null!=t}function s(t){return"Object"===n(t)}function f(t,e){return e=pt(e),Array.from(t).filter(t=>!e.some(e=>jt.isMatch(t,e,{caseSensitive:!0})))}const l=["any","anything","every","everything","all","whatever","whatevs"],p=Array.isArray;if(!c(e))throw new Error("check-types-mini: [THROW_ID_01] First argument is missing!");const y={ignoreKeys:[],ignorePaths:[],acceptArrays:!1,acceptArraysIgnore:[],enforceStrictKeyset:!0,schema:{},msg:"check-types-mini",optsVarName:"opts"};let h;if(h=c(o)&&s(o)?Object.assign({},y,o):Object.assign({},y),c(h.ignoreKeys)&&h.ignoreKeys?h.ignoreKeys=pt(h.ignoreKeys):h.ignoreKeys=[],c(h.ignorePaths)&&h.ignorePaths?h.ignorePaths=pt(h.ignorePaths):h.ignorePaths=[],c(h.acceptArraysIgnore)&&h.acceptArraysIgnore?h.acceptArraysIgnore=pt(h.acceptArraysIgnore):h.acceptArraysIgnore=[],h.msg="string"==typeof h.msg?h.msg.trim():h.msg,":"===h.msg[h.msg.length-1]&&(h.msg=h.msg.slice(0,h.msg.length-1).trim()),h.schema&&(Object.keys(h.schema).forEach(t=>{if(s(h.schema[t])){const e={};$(h.schema[t],(r,n,o)=>{const i=void 0!==n?n:r;return p(i)||s(i)||(e[`${t}.${o.path}`]=i),i}),delete h.schema[t],h.schema=Object.assign(h.schema,e)}}),Object.keys(h.schema).forEach(t=>{p(h.schema[t])||(h.schema[t]=[h.schema[t]]),h.schema[t]=h.schema[t].map(String).map(t=>t.toLowerCase()).map(t=>t.trim())})),c(r)||(r={}),i&&t(h,y,{enforceStrictKeyset:!1},!1),h.enforceStrictKeyset)if(c(h.schema)&&Object.keys(h.schema).length>0){if(0!==f(u(Object.keys(e),Object.keys(r).concat(Object.keys(h.schema))),h.ignoreKeys).length){const t=u(Object.keys(e),Object.keys(r).concat(Object.keys(h.schema)));throw new TypeError(`${h.msg}: ${h.optsVarName}.enforceStrictKeyset is on and the following key${t.length>1?"s":""} ${t.length>1?"are":"is"} not covered by schema and/or reference objects: ${t.join(", ")}`)}}else{if(!(c(r)&&Object.keys(r).length>0))throw new TypeError(`${h.msg}: Both ${h.optsVarName}.schema and reference objects are missing! We don't have anything to match the keys as you requested via opts.enforceStrictKeyset!`);if(0!==f(u(Object.keys(e),Object.keys(r)),h.ignoreKeys).length){const t=u(Object.keys(e),Object.keys(r));throw new TypeError(`${h.msg}: The input object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not covered by the reference object: ${t.join(", ")}`)}if(0!==f(u(Object.keys(r),Object.keys(e)),h.ignoreKeys).length){const t=u(Object.keys(r),Object.keys(e));throw new TypeError(`${h.msg}: The reference object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not present in the input object: ${t.join(", ")}`)}}const g=[];$(e,(t,o,i)=>{let c=o,u=t;if("array"===i.parentType&&(u=void 0,c=t),p(g)&&g.length&&g.some(t=>i.path.startsWith(t)))return c;if(u&&h.ignoreKeys.some(t=>jt.isMatch(u,t)))return c;if(h.ignorePaths.some(t=>jt.isMatch(i.path,t)))return c;const f=!(!s(c)&&!p(c)&&p(i.parent));let y=!1;s(h.schema)&&a.call(h.schema,yt.get(i.path))&&(y=!0);let b=!1;if(s(r)&&yt.has(r,yt.get(i.path))&&(b=!0),h.enforceStrictKeyset&&f&&!y&&!b)throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path} is neither covered by reference object (second input argument), nor ${h.optsVarName}.schema! To stop this error, turn off ${h.optsVarName}.enforceStrictKeyset or provide some type reference (2nd argument or ${h.optsVarName}.schema).\n\nDebug info:\n\nobj = ${JSON.stringify(e,null,4)}\n\nref = ${JSON.stringify(r,null,4)}\n\ninnerObj = ${JSON.stringify(i,null,4)}\n\nopts = ${JSON.stringify(h,null,4)}\n\ncurrent = ${JSON.stringify(c,null,4)}\n\n`);if(y){const t=pt(h.schema[i.path]).map(String).map(t=>t.toLowerCase());if(yt.set(h.schema,i.path,t),lt(t,l).length)g.push(i.path);else if(!0!==c&&!1!==c&&!t.includes(n(c).toLowerCase())||(!0===c||!1===c)&&!t.includes(String(c))&&!t.includes("boolean")){if(!p(c)||!h.acceptArrays)throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path} was customised to ${"string"!==n(c)?'"':""}${JSON.stringify(c,null,0)}${"string"!==n(c)?'"':""} (type: ${n(c).toLowerCase()}) which is not among the allowed types in schema (which is equal to ${JSON.stringify(t,null,0)})`);for(let e=0,r=c.length;e<r;e++)if(!t.includes(n(c[e]).toLowerCase()))throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path}.${e}, the ${bt(e+1)} element (equal to ${JSON.stringify(c[e],null,0)}) is of a type ${n(c[e]).toLowerCase()}, but only the following are allowed by the ${h.optsVarName}.schema: ${t.join(", ")}`)}}else if(b){const e=yt.get(r,i.path);if(h.acceptArrays&&p(c)&&!h.acceptArraysIgnore.includes(t)){if(!c.every(e=>n(e).toLowerCase()===n(r[t]).toLowerCase()))throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path} was customised to be array, but not all of its elements are ${n(r[t]).toLowerCase()}-type`)}else if(n(c)!==n(e))throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path} was customised to ${"string"===n(c).toLowerCase()?"":'"'}${JSON.stringify(c,null,0)}${"string"===n(c).toLowerCase()?"":'"'} which is not ${n(e).toLowerCase()} but ${n(c).toLowerCase()}`)}return c})}(t,e,r)}return jt.isMatch=(t,e,r)=>{const n=_t(e,r),o=n.test(t);return n.negated?!o:o},function(e,r){if("string"!=typeof e)throw new Error("string-trim-spaces-only: [THROW_ID_01] input must be string! It was given as ".concat(t(e),", equal to:\n").concat(JSON.stringify(e,null,4)));var n,o,i={classicTrim:!1},a=Object.assign({},i,r);if(wt(a,i,{msg:"string-trim-spaces-only: [THROW_ID_02*]"}),e.length>0){if(a.classicTrim&&0===e[0].trim().length||!a.classicTrim&&" "===e[0])for(var c=0,s=e.length;c<s;c++){if(a.classicTrim&&0!==e[c].trim().length||!a.classicTrim&&" "!==e[c]){n=c;break}if(c===e.length-1)return{res:"",ranges:[[0,e.length]]}}if(a.classicTrim&&0===e[e.length-1].trim().length||!a.classicTrim&&" "===e[e.length-1])for(var u=e.length;u--;)if(a.classicTrim&&0!==e[u].trim().length||!a.classicTrim&&" "!==e[u]){o=u+1;break}return n?o?{res:e.slice(n,o),ranges:[[0,n],[o,e.length]]}:{res:e.slice(n),ranges:[[0,n]]}:o?{res:e.slice(0,o),ranges:[[o,e.length]]}:{res:e,ranges:[]}}return{res:"",ranges:[]}}});
