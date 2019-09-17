/**
 * email-all-chars-within-ascii
 * Scans all characters within a string and checks are they within ASCII range
 * Version: 2.9.42
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/email-all-chars-within-ascii
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).emailAllCharsWithinAscii=e()}(this,(function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function r(t,e){return t(e={exports:{}},e.exports),e.exports}var n=r((function(t,r){var n,o,i,a,c,u,s,f,l,p,y,h,g,b,d,v,_,m,w,j;t.exports=(n="function"==typeof Promise,o="object"==typeof self?self:e,i="undefined"!=typeof Symbol,a="undefined"!=typeof Map,c="undefined"!=typeof Set,u="undefined"!=typeof WeakMap,s="undefined"!=typeof WeakSet,f="undefined"!=typeof DataView,l=i&&void 0!==Symbol.iterator,p=i&&void 0!==Symbol.toStringTag,y=c&&"function"==typeof Set.prototype.entries,h=a&&"function"==typeof Map.prototype.entries,g=y&&Object.getPrototypeOf((new Set).entries()),b=h&&Object.getPrototypeOf((new Map).entries()),d=l&&"function"==typeof Array.prototype[Symbol.iterator],v=d&&Object.getPrototypeOf([][Symbol.iterator]()),_=l&&"function"==typeof String.prototype[Symbol.iterator],m=_&&Object.getPrototypeOf(""[Symbol.iterator]()),w=8,j=-1,function(t){var e=typeof t;if("object"!==e)return e;if(null===t)return"null";if(t===o)return"global";if(Array.isArray(t)&&(!1===p||!(Symbol.toStringTag in t)))return"Array";if("object"==typeof window&&null!==window){if("object"==typeof window.location&&t===window.location)return"Location";if("object"==typeof window.document&&t===window.document)return"Document";if("object"==typeof window.navigator){if("object"==typeof window.navigator.mimeTypes&&t===window.navigator.mimeTypes)return"MimeTypeArray";if("object"==typeof window.navigator.plugins&&t===window.navigator.plugins)return"PluginArray"}if(("function"==typeof window.HTMLElement||"object"==typeof window.HTMLElement)&&t instanceof window.HTMLElement){if("BLOCKQUOTE"===t.tagName)return"HTMLQuoteElement";if("TD"===t.tagName)return"HTMLTableDataCellElement";if("TH"===t.tagName)return"HTMLTableHeaderCellElement"}}var r=p&&t[Symbol.toStringTag];if("string"==typeof r)return r;var i=Object.getPrototypeOf(t);return i===RegExp.prototype?"RegExp":i===Date.prototype?"Date":n&&i===Promise.prototype?"Promise":c&&i===Set.prototype?"Set":a&&i===Map.prototype?"Map":s&&i===WeakSet.prototype?"WeakSet":u&&i===WeakMap.prototype?"WeakMap":f&&i===DataView.prototype?"DataView":a&&i===b?"Map Iterator":c&&i===g?"Set Iterator":d&&i===v?"Array Iterator":_&&i===m?"String Iterator":null===i?"Object":Object.prototype.toString.call(t).slice(w,j)})}));function o(t,e,r){if(e!=e)return function(t,e,r,n){for(var o=t.length,i=r+(n?1:-1);n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,a,r);for(var n=r-1,o=t.length;++n<o;)if(t[n]===e)return n;return-1}function i(t,e,r,n){for(var o=r-1,i=t.length;++o<i;)if(n(t[o],e))return o;return-1}function a(t){return t!=t}var c=Array.prototype.splice;function u(t,e,r,n){var a,u=n?i:o,s=-1,f=e.length,l=t;for(t===e&&(e=function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(e)),r&&(l=function(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}(t,(a=r,function(t){return a(t)})));++s<f;)for(var p=0,y=e[s],h=r?r(y):y;(p=u(l,h,p,n))>-1;)l!==t&&c.call(l,p,1),c.call(t,p,1);return t}var s=function(t,e){return t&&t.length&&e&&e.length?u(t,e):t},f=r((function(t,r){var n=200,o="__lodash_hash_undefined__",i=9007199254740991,a="[object Arguments]",c="[object Boolean]",u="[object Date]",s="[object Function]",f="[object GeneratorFunction]",l="[object Map]",p="[object Number]",y="[object Object]",h="[object RegExp]",g="[object Set]",b="[object String]",d="[object Symbol]",v="[object ArrayBuffer]",_="[object DataView]",m="[object Float32Array]",w="[object Float64Array]",j="[object Int8Array]",O="[object Int16Array]",$="[object Int32Array]",S="[object Uint8Array]",A="[object Uint8ClampedArray]",T="[object Uint16Array]",k="[object Uint32Array]",E=/\w*$/,P=/^\[object .+?Constructor\]$/,N=/^(?:0|[1-9]\d*)$/,M={};M[a]=M["[object Array]"]=M[v]=M[_]=M[c]=M[u]=M[m]=M[w]=M[j]=M[O]=M[$]=M[l]=M[p]=M[y]=M[h]=M[g]=M[b]=M[d]=M[S]=M[A]=M[T]=M[k]=!0,M["[object Error]"]=M[s]=M["[object WeakMap]"]=!1;var x="object"==typeof e&&e&&e.Object===Object&&e,I="object"==typeof self&&self&&self.Object===Object&&self,L=x||I||Function("return this")(),C=r&&!r.nodeType&&r,K=C&&t&&!t.nodeType&&t,V=K&&K.exports===C;function W(t,e){return t.set(e[0],e[1]),t}function D(t,e){return t.add(e),t}function F(t,e,r,n){var o=-1,i=t?t.length:0;for(n&&i&&(r=t[++o]);++o<i;)r=e(r,t[o],o,t);return r}function J(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function H(t){var e=-1,r=Array(t.size);return t.forEach((function(t,n){r[++e]=[n,t]})),r}function R(t,e){return function(r){return t(e(r))}}function B(t){var e=-1,r=Array(t.size);return t.forEach((function(t){r[++e]=t})),r}var q,U=Array.prototype,z=Function.prototype,G=Object.prototype,Q=L["__core-js_shared__"],X=(q=/[^.]+$/.exec(Q&&Q.keys&&Q.keys.IE_PROTO||""))?"Symbol(src)_1."+q:"",Y=z.toString,Z=G.hasOwnProperty,tt=G.toString,et=RegExp("^"+Y.call(Z).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rt=V?L.Buffer:void 0,nt=L.Symbol,ot=L.Uint8Array,it=R(Object.getPrototypeOf,Object),at=Object.create,ct=G.propertyIsEnumerable,ut=U.splice,st=Object.getOwnPropertySymbols,ft=rt?rt.isBuffer:void 0,lt=R(Object.keys,Object),pt=Kt(L,"DataView"),yt=Kt(L,"Map"),ht=Kt(L,"Promise"),gt=Kt(L,"Set"),bt=Kt(L,"WeakMap"),dt=Kt(Object,"create"),vt=Jt(pt),_t=Jt(yt),mt=Jt(ht),wt=Jt(gt),jt=Jt(bt),Ot=nt?nt.prototype:void 0,$t=Ot?Ot.valueOf:void 0;function St(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function At(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Tt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function kt(t){this.__data__=new At(t)}function Et(t,e){var r=Rt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Bt(t)}(t)&&Z.call(t,"callee")&&(!ct.call(t,"callee")||tt.call(t)==a)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var i in t)!e&&!Z.call(t,i)||o&&("length"==i||Dt(i,n))||r.push(i);return r}function Pt(t,e,r){var n=t[e];Z.call(t,e)&&Ht(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function Nt(t,e){for(var r=t.length;r--;)if(Ht(t[r][0],e))return r;return-1}function Mt(t,e,r,n,o,i,P){var N;if(n&&(N=i?n(t,o,i,P):n(t)),void 0!==N)return N;if(!zt(t))return t;var x=Rt(t);if(x){if(N=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&Z.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,N)}else{var I=Wt(t),L=I==s||I==f;if(qt(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(I==y||I==a||L&&!i){if(J(t))return i?t:{};if(N=function(t){return"function"!=typeof t.constructor||Ft(t)?{}:(e=it(t),zt(e)?at(e):{});var e}(L?{}:t),!e)return function(t,e){return Lt(t,Vt(t),e)}(t,function(t,e){return t&&Lt(e,Gt(e),t)}(N,t))}else{if(!M[I])return i?t:{};N=function(t,e,r,n){var o=t.constructor;switch(e){case v:return It(t);case c:case u:return new o(+t);case _:return function(t,e){var r=e?It(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,n);case m:case w:case j:case O:case $:case S:case A:case T:case k:return function(t,e){var r=e?It(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,n);case l:return function(t,e,r){return F(e?r(H(t),!0):H(t),W,new t.constructor)}(t,n,r);case p:case b:return new o(t);case h:return(s=new(a=t).constructor(a.source,E.exec(a))).lastIndex=a.lastIndex,s;case g:return function(t,e,r){return F(e?r(B(t),!0):B(t),D,new t.constructor)}(t,n,r);case d:return i=t,$t?Object($t.call(i)):{}}var i;var a,s}(t,I,Mt,e)}}P||(P=new kt);var C=P.get(t);if(C)return C;if(P.set(t,N),!x)var K=r?function(t){return function(t,e,r){var n=e(t);return Rt(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,Gt,Vt)}(t):Gt(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}(K||t,(function(o,i){K&&(o=t[i=o]),Pt(N,i,Mt(o,e,r,n,i,t,P))})),N}function xt(t){return!(!zt(t)||(e=t,X&&X in e))&&(Ut(t)||J(t)?et:P).test(Jt(t));var e}function It(t){var e=new t.constructor(t.byteLength);return new ot(e).set(new ot(t)),e}function Lt(t,e,r,n){r||(r={});for(var o=-1,i=e.length;++o<i;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;Pt(r,a,void 0===c?t[a]:c)}return r}function Ct(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function Kt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return xt(r)?r:void 0}St.prototype.clear=function(){this.__data__=dt?dt(null):{}},St.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},St.prototype.get=function(t){var e=this.__data__;if(dt){var r=e[t];return r===o?void 0:r}return Z.call(e,t)?e[t]:void 0},St.prototype.has=function(t){var e=this.__data__;return dt?void 0!==e[t]:Z.call(e,t)},St.prototype.set=function(t,e){return this.__data__[t]=dt&&void 0===e?o:e,this},At.prototype.clear=function(){this.__data__=[]},At.prototype.delete=function(t){var e=this.__data__,r=Nt(e,t);return!(r<0)&&(r==e.length-1?e.pop():ut.call(e,r,1),!0)},At.prototype.get=function(t){var e=this.__data__,r=Nt(e,t);return r<0?void 0:e[r][1]},At.prototype.has=function(t){return Nt(this.__data__,t)>-1},At.prototype.set=function(t,e){var r=this.__data__,n=Nt(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},Tt.prototype.clear=function(){this.__data__={hash:new St,map:new(yt||At),string:new St}},Tt.prototype.delete=function(t){return Ct(this,t).delete(t)},Tt.prototype.get=function(t){return Ct(this,t).get(t)},Tt.prototype.has=function(t){return Ct(this,t).has(t)},Tt.prototype.set=function(t,e){return Ct(this,t).set(t,e),this},kt.prototype.clear=function(){this.__data__=new At},kt.prototype.delete=function(t){return this.__data__.delete(t)},kt.prototype.get=function(t){return this.__data__.get(t)},kt.prototype.has=function(t){return this.__data__.has(t)},kt.prototype.set=function(t,e){var r=this.__data__;if(r instanceof At){var o=r.__data__;if(!yt||o.length<n-1)return o.push([t,e]),this;r=this.__data__=new Tt(o)}return r.set(t,e),this};var Vt=st?R(st,Object):function(){return[]},Wt=function(t){return tt.call(t)};function Dt(t,e){return!!(e=null==e?i:e)&&("number"==typeof t||N.test(t))&&t>-1&&t%1==0&&t<e}function Ft(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||G)}function Jt(t){if(null!=t){try{return Y.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Ht(t,e){return t===e||t!=t&&e!=e}(pt&&Wt(new pt(new ArrayBuffer(1)))!=_||yt&&Wt(new yt)!=l||ht&&"[object Promise]"!=Wt(ht.resolve())||gt&&Wt(new gt)!=g||bt&&"[object WeakMap]"!=Wt(new bt))&&(Wt=function(t){var e=tt.call(t),r=e==y?t.constructor:void 0,n=r?Jt(r):void 0;if(n)switch(n){case vt:return _;case _t:return l;case mt:return"[object Promise]";case wt:return g;case jt:return"[object WeakMap]"}return e});var Rt=Array.isArray;function Bt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=i}(t.length)&&!Ut(t)}var qt=ft||function(){return!1};function Ut(t){var e=zt(t)?tt.call(t):"";return e==s||e==f}function zt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function Gt(t){return Bt(t)?Et(t):function(t){if(!Ft(t))return lt(t);var e=[];for(var r in Object(t))Z.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}t.exports=function(t){return Mt(t,!0,!0)}})),l="[object Object]";var p,y,h=Function.prototype,g=Object.prototype,b=h.toString,d=g.hasOwnProperty,v=b.call(Object),_=g.toString,m=(p=Object.getPrototypeOf,y=Object,function(t){return p(y(t))});var w=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||_.call(t)!=l||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=m(t);if(null===e)return!0;var r=d.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&b.call(r)==v};const j=Array.isArray;function O(t){return"string"==typeof t&&t.length>0&&"."===t[0]?t.slice(1):t}function $(t,e){return function t(e,r,n){const o=f(e);let i,a,c,u,s;if((n=Object.assign({depth:-1,path:""},n)).depth+=1,j(o))for(i=0,a=o.length;i<a;i++){const e=`${n.path}.${i}`;void 0!==o[i]?(n.parent=f(o),n.parentType="array",c=t(r(o[i],void 0,Object.assign({},n,{path:O(e)})),r,Object.assign({},n,{path:O(e)})),Number.isNaN(c)&&i<o.length?(o.splice(i,1),i-=1):o[i]=c):o.splice(i,1)}else if(w(o))for(i=0,a=(u=Object.keys(o)).length;i<a;i++){s=u[i];const e=`${n.path}.${s}`;0===n.depth&&null!=s&&(n.topmostKey=s),n.parent=f(o),n.parentType="object",c=t(r(s,o[s],Object.assign({},n,{path:O(e)})),r,Object.assign({},n,{path:O(e)})),Number.isNaN(c)?delete o[s]:o[s]=c}return o}(t,e,{})}var S="__lodash_hash_undefined__",A=9007199254740991,T="[object Function]",k="[object GeneratorFunction]",E=/^\[object .+?Constructor\]$/,P="object"==typeof e&&e&&e.Object===Object&&e,N="object"==typeof self&&self&&self.Object===Object&&self,M=P||N||Function("return this")();function x(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}function I(t,e){return!!(t?t.length:0)&&function(t,e,r){if(e!=e)return function(t,e,r,n){var o=t.length,i=r+(n?1:-1);for(;n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,K,r);var n=r-1,o=t.length;for(;++n<o;)if(t[n]===e)return n;return-1}(t,e,0)>-1}function L(t,e,r){for(var n=-1,o=t?t.length:0;++n<o;)if(r(e,t[n]))return!0;return!1}function C(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}function K(t){return t!=t}function V(t){return function(e){return t(e)}}function W(t,e){return t.has(e)}var D,F=Array.prototype,J=Function.prototype,H=Object.prototype,R=M["__core-js_shared__"],B=(D=/[^.]+$/.exec(R&&R.keys&&R.keys.IE_PROTO||""))?"Symbol(src)_1."+D:"",q=J.toString,U=H.hasOwnProperty,z=H.toString,G=RegExp("^"+q.call(U).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Q=F.splice,X=Math.max,Y=Math.min,Z=st(M,"Map"),tt=st(Object,"create");function et(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function rt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function nt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function ot(t){var e=-1,r=t?t.length:0;for(this.__data__=new nt;++e<r;)this.add(t[e])}function it(t,e){for(var r,n,o=t.length;o--;)if((r=t[o][0])===(n=e)||r!=r&&n!=n)return o;return-1}function at(t){return!(!lt(t)||function(t){return!!B&&B in t}(t))&&(ft(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?G:E).test(function(t){if(null!=t){try{return q.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t))}function ct(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&function(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=A}(t.length)&&!ft(t)}(t)}(t)?t:[]}function ut(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function st(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return at(r)?r:void 0}function ft(t){var e=lt(t)?z.call(t):"";return e==T||e==k}function lt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}et.prototype.clear=function(){this.__data__=tt?tt(null):{}},et.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},et.prototype.get=function(t){var e=this.__data__;if(tt){var r=e[t];return r===S?void 0:r}return U.call(e,t)?e[t]:void 0},et.prototype.has=function(t){var e=this.__data__;return tt?void 0!==e[t]:U.call(e,t)},et.prototype.set=function(t,e){return this.__data__[t]=tt&&void 0===e?S:e,this},rt.prototype.clear=function(){this.__data__=[]},rt.prototype.delete=function(t){var e=this.__data__,r=it(e,t);return!(r<0)&&(r==e.length-1?e.pop():Q.call(e,r,1),!0)},rt.prototype.get=function(t){var e=this.__data__,r=it(e,t);return r<0?void 0:e[r][1]},rt.prototype.has=function(t){return it(this.__data__,t)>-1},rt.prototype.set=function(t,e){var r=this.__data__,n=it(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},nt.prototype.clear=function(){this.__data__={hash:new et,map:new(Z||rt),string:new et}},nt.prototype.delete=function(t){return ut(this,t).delete(t)},nt.prototype.get=function(t){return ut(this,t).get(t)},nt.prototype.has=function(t){return ut(this,t).has(t)},nt.prototype.set=function(t,e){return ut(this,t).set(t,e),this},ot.prototype.add=ot.prototype.push=function(t){return this.__data__.set(t,S),this},ot.prototype.has=function(t){return this.__data__.has(t)};var pt=function(t,e){return e=X(void 0===e?t.length-1:e,0),function(){for(var r=arguments,n=-1,o=X(r.length-e,0),i=Array(o);++n<o;)i[n]=r[e+n];n=-1;for(var a=Array(e+1);++n<e;)a[n]=r[n];return a[e]=i,x(t,this,a)}}((function(t){var e=C(t,ct);return e.length&&e[0]===t[0]?function(t,e,r){for(var n=r?L:I,o=t[0].length,i=t.length,a=i,c=Array(i),u=1/0,s=[];a--;){var f=t[a];a&&e&&(f=C(f,V(e))),u=Y(f.length,u),c[a]=!r&&(e||o>=120&&f.length>=120)?new ot(a&&f):void 0}f=t[0];var l=-1,p=c[0];t:for(;++l<o&&s.length<u;){var y=f[l],h=e?e(y):y;if(y=r||0!==y?y:0,!(p?W(p,h):n(s,h,r))){for(a=i;--a;){var g=c[a];if(!(g?W(g,h):n(t[a],h,r)))continue t}p&&p.push(h),s.push(y)}}return s}(e):[]}));function yt(t){return"string"==typeof t?t.length>0?[t]:[]:t}var ht=r((function(t){t.exports=function(){var t=Object.prototype.toString;function e(t,e){return null!=t&&Object.prototype.hasOwnProperty.call(t,e)}function r(t){if(!t)return!0;if(o(t)&&0===t.length)return!0;if("string"!=typeof t){for(var r in t)if(e(t,r))return!1;return!0}return!1}function n(e){return t.call(e)}var o=Array.isArray||function(e){return"[object Array]"===t.call(e)};function i(t){var e=parseInt(t);return e.toString()===t?e:t}function a(t){t=t||{};var a=function(t){return Object.keys(a).reduce((function(e,r){return"create"===r?e:("function"==typeof a[r]&&(e[r]=a[r].bind(a,t)),e)}),{})};function c(r,n){return t.includeInheritedProps||"number"==typeof n&&Array.isArray(r)||e(r,n)}function u(t,e){if(c(t,e))return t[e]}function s(t,e,r,n){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if("string"==typeof e)return s(t,e.split(".").map(i),r,n);var o=e[0],a=u(t,o);return 1===e.length?(void 0!==a&&n||(t[o]=r),a):(void 0===a&&("number"==typeof e[1]?t[o]=[]:t[o]={}),s(t[o],e.slice(1),r,n))}return a.has=function(r,n){if("number"==typeof n?n=[n]:"string"==typeof n&&(n=n.split(".")),!n||0===n.length)return!!r;for(var a=0;a<n.length;a++){var c=i(n[a]);if(!("number"==typeof c&&o(r)&&c<r.length||(t.includeInheritedProps?c in Object(r):e(r,c))))return!1;r=r[c]}return!0},a.ensureExists=function(t,e,r){return s(t,e,r,!0)},a.set=function(t,e,r,n){return s(t,e,r,n)},a.insert=function(t,e,r,n){var i=a.get(t,e);n=~~n,o(i)||(i=[],a.set(t,e,i)),i.splice(n,0,r)},a.empty=function(t,e){var i,u;if(!r(e)&&null!=t&&(i=a.get(t,e))){if("string"==typeof i)return a.set(t,e,"");if(function(t){return"boolean"==typeof t||"[object Boolean]"===n(t)}(i))return a.set(t,e,!1);if("number"==typeof i)return a.set(t,e,0);if(o(i))i.length=0;else{if(!function(t){return"object"==typeof t&&"[object Object]"===n(t)}(i))return a.set(t,e,null);for(u in i)c(i,u)&&delete i[u]}}},a.push=function(t,e){var r=a.get(t,e);o(r)||(r=[],a.set(t,e,r)),r.push.apply(r,Array.prototype.slice.call(arguments,2))},a.coalesce=function(t,e,r){for(var n,o=0,i=e.length;o<i;o++)if(void 0!==(n=a.get(t,e[o])))return n;return r},a.get=function(t,e,r){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if(null==t)return r;if("string"==typeof e)return a.get(t,e.split("."),r);var n=i(e[0]),o=u(t,n);return void 0===o?r:1===e.length?o:a.get(t[n],e.slice(1),r)},a.del=function(t,e){if("number"==typeof e&&(e=[e]),null==t)return t;if(r(e))return t;if("string"==typeof e)return a.del(t,e.split("."));var n=i(e[0]);return c(t,n)?1!==e.length?a.del(t[n],e.slice(1)):(o(t)?t.splice(n,1):delete t[n],t):t},a}var c=a();return c.create=a,c.withInheritedProps=a({includeInheritedProps:!0}),c}()})),gt=function(t){var e=(t=Math.abs(t))%100;if(e>=10&&e<=20)return"th";var r=t%10;return 1===r?"st":2===r?"nd":3===r?"rd":"th"};function bt(t){if("number"!=typeof t)throw new TypeError("Expected Number, got "+typeof t+" "+t);return Number.isFinite(t)?t+gt(t):t}bt.indicator=gt;var dt=bt;const vt=/[|\\{}()[\]^$+*?.-]/g;var _t=t=>{if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(vt,"\\$&")};const mt=new Map;function wt(t,e){e={caseSensitive:!1,...e};const r=t+JSON.stringify(e);if(mt.has(r))return mt.get(r);const n="!"===t[0];n&&(t=t.slice(1)),t=_t(t).replace(/\\\*/g,".*");const o=new RegExp(`^${t}$`,e.caseSensitive?"":"i");return o.negated=n,mt.set(r,o),o}var jt=(t,e,r)=>{if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError(`Expected two arrays, got ${typeof t} ${typeof e}`);if(0===e.length)return t;const n="!"===e[0][0];e=e.map(t=>wt(t,r));const o=[];for(const r of t){let t=n;for(const n of e)n.test(r)&&(t=!n.negated);t&&o.push(r)}return o};function Ot(t,e,r){return function t(e,r,o,i=!0){const a=Object.prototype.hasOwnProperty;function c(t){return null!=t}function u(t){return"Object"===n(t)}function f(t,e){return e=yt(e),Array.from(t).filter(t=>!e.some(e=>jt.isMatch(t,e,{caseSensitive:!0})))}const l=["any","anything","every","everything","all","whatever","whatevs"],p=Array.isArray;if(!c(e))throw new Error("check-types-mini: [THROW_ID_01] First argument is missing!");const y={ignoreKeys:[],ignorePaths:[],acceptArrays:!1,acceptArraysIgnore:[],enforceStrictKeyset:!0,schema:{},msg:"check-types-mini",optsVarName:"opts"};let h;if(h=c(o)&&u(o)?Object.assign({},y,o):Object.assign({},y),c(h.ignoreKeys)&&h.ignoreKeys?h.ignoreKeys=yt(h.ignoreKeys):h.ignoreKeys=[],c(h.ignorePaths)&&h.ignorePaths?h.ignorePaths=yt(h.ignorePaths):h.ignorePaths=[],c(h.acceptArraysIgnore)&&h.acceptArraysIgnore?h.acceptArraysIgnore=yt(h.acceptArraysIgnore):h.acceptArraysIgnore=[],h.msg="string"==typeof h.msg?h.msg.trim():h.msg,":"===h.msg[h.msg.length-1]&&(h.msg=h.msg.slice(0,h.msg.length-1).trim()),h.schema&&(Object.keys(h.schema).forEach(t=>{if(u(h.schema[t])){const e={};$(h.schema[t],(r,n,o)=>{const i=void 0!==n?n:r;return p(i)||u(i)||(e[`${t}.${o.path}`]=i),i}),delete h.schema[t],h.schema=Object.assign(h.schema,e)}}),Object.keys(h.schema).forEach(t=>{p(h.schema[t])||(h.schema[t]=[h.schema[t]]),h.schema[t]=h.schema[t].map(String).map(t=>t.toLowerCase()).map(t=>t.trim())})),c(r)||(r={}),i&&t(h,y,{enforceStrictKeyset:!1},!1),h.enforceStrictKeyset)if(c(h.schema)&&Object.keys(h.schema).length>0){if(0!==f(s(Object.keys(e),Object.keys(r).concat(Object.keys(h.schema))),h.ignoreKeys).length){const t=s(Object.keys(e),Object.keys(r).concat(Object.keys(h.schema)));throw new TypeError(`${h.msg}: ${h.optsVarName}.enforceStrictKeyset is on and the following key${t.length>1?"s":""} ${t.length>1?"are":"is"} not covered by schema and/or reference objects: ${t.join(", ")}`)}}else{if(!(c(r)&&Object.keys(r).length>0))throw new TypeError(`${h.msg}: Both ${h.optsVarName}.schema and reference objects are missing! We don't have anything to match the keys as you requested via opts.enforceStrictKeyset!`);if(0!==f(s(Object.keys(e),Object.keys(r)),h.ignoreKeys).length){const t=s(Object.keys(e),Object.keys(r));throw new TypeError(`${h.msg}: The input object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not covered by the reference object: ${t.join(", ")}`)}if(0!==f(s(Object.keys(r),Object.keys(e)),h.ignoreKeys).length){const t=s(Object.keys(r),Object.keys(e));throw new TypeError(`${h.msg}: The reference object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not present in the input object: ${t.join(", ")}`)}}const g=[];$(e,(t,o,i)=>{let c=o,s=t;if("array"===i.parentType&&(s=void 0,c=t),p(g)&&g.length&&g.some(t=>i.path.startsWith(t)))return c;if(s&&h.ignoreKeys.some(t=>jt.isMatch(s,t)))return c;if(h.ignorePaths.some(t=>jt.isMatch(i.path,t)))return c;const f=!(!u(c)&&!p(c)&&p(i.parent));let y=!1;u(h.schema)&&a.call(h.schema,ht.get(i.path))&&(y=!0);let b=!1;if(u(r)&&ht.has(r,ht.get(i.path))&&(b=!0),h.enforceStrictKeyset&&f&&!y&&!b)throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path} is neither covered by reference object (second input argument), nor ${h.optsVarName}.schema! To stop this error, turn off ${h.optsVarName}.enforceStrictKeyset or provide some type reference (2nd argument or ${h.optsVarName}.schema).\n\nDebug info:\n\nobj = ${JSON.stringify(e,null,4)}\n\nref = ${JSON.stringify(r,null,4)}\n\ninnerObj = ${JSON.stringify(i,null,4)}\n\nopts = ${JSON.stringify(h,null,4)}\n\ncurrent = ${JSON.stringify(c,null,4)}\n\n`);if(y){const t=yt(h.schema[i.path]).map(String).map(t=>t.toLowerCase());if(ht.set(h.schema,i.path,t),pt(t,l).length)g.push(i.path);else if(!0!==c&&!1!==c&&!t.includes(n(c).toLowerCase())||(!0===c||!1===c)&&!t.includes(String(c))&&!t.includes("boolean")){if(!p(c)||!h.acceptArrays)throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path} was customised to ${"string"!==n(c)?'"':""}${JSON.stringify(c,null,0)}${"string"!==n(c)?'"':""} (type: ${n(c).toLowerCase()}) which is not among the allowed types in schema (which is equal to ${JSON.stringify(t,null,0)})`);for(let e=0,r=c.length;e<r;e++)if(!t.includes(n(c[e]).toLowerCase()))throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path}.${e}, the ${dt(e+1)} element (equal to ${JSON.stringify(c[e],null,0)}) is of a type ${n(c[e]).toLowerCase()}, but only the following are allowed by the ${h.optsVarName}.schema: ${t.join(", ")}`)}}else if(b){const e=ht.get(r,i.path);if(h.acceptArrays&&p(c)&&!h.acceptArraysIgnore.includes(t)){if(!c.every(e=>n(e).toLowerCase()===n(r[t]).toLowerCase()))throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path} was customised to be array, but not all of its elements are ${n(r[t]).toLowerCase()}-type`)}else if(n(c)!==n(e))throw new TypeError(`${h.msg}: ${h.optsVarName}.${i.path} was customised to ${"string"===n(c).toLowerCase()?"":'"'}${JSON.stringify(c,null,0)}${"string"===n(c).toLowerCase()?"":'"'} which is not ${n(e).toLowerCase()} but ${n(c).toLowerCase()}`)}return c})}(t,e,r)}return jt.isMatch=(t,e,r)=>{const n=wt(e,r),o=n.test(t);return n.negated?!o:o},function(e,r){if("string"!=typeof e)throw new Error("email-all-chars-within-ascii/within(): [THROW_ID_01] The input is not string but ".concat(t(e),", equal to: ").concat(JSON.stringify(e,null,4)));if(null!=r&&!w(r))throw new Error("email-all-chars-within-ascii/within(): [THROW_ID_02] The opts is not a plain object but ".concat(t(r),", equal to:\n").concat(JSON.stringify(r,null,4)));var n={messageOnly:!1,checkLineLength:!0},o=Object.assign({},n,r);Ot(o,n,{msg:"email-all-chars-within-ascii/within(): [THROW_ID_03*]"});for(var i=0,a=0,c=e.length;a<c;a++){if(i+=1,e[a].codePointAt(0)>126||e[a].codePointAt(0)<9||11===e[a].codePointAt(0)||12===e[a].codePointAt(0)||e[a].codePointAt(0)>13&&e[a].codePointAt(0)<32)throw new Error("".concat(o.messageOnly?"":"email-all-chars-within-ascii: ","Non ascii character found at index ").concat(a,", equal to: ").concat(JSON.stringify(e[a],null,4),", its decimal code point is ").concat(e[a].codePointAt(0),"."));if(i>997&&o.checkLineLength)throw new Error("".concat(o.messageOnly?"":"email-all-chars-within-ascii: ","Line length is beyond 999 characters!"));"\r"!==e[a]&&"\n"!==e[a]||(i=0)}}}));
