/**
 * ranges-apply
 * Take an array of string slice ranges, delete/replace the string according to them
 * Version: 3.0.13
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-apply
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).rangesApply=e()}(this,function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e=function(t,e){if(e){if("object"!=typeof e)throw new TypeError(String(e)+" is not an object. Expected an object that has boolean `includeZero` property.");if("includeZero"in e){if("boolean"!=typeof e.includeZero)throw new TypeError(String(e.includeZero)+" is neither true nor false. `includeZero` option must be a Boolean value.");if(e.includeZero&&0===t)return!0}}return Number.isSafeInteger(t)&&t>=1},r=function(t,e){if("string"!=typeof t)return!1;if(e&&"includeZero"in e){if("boolean"!=typeof e.includeZero)throw new TypeError(String(e.includeZero)+" is neither true nor false. `includeZero` option must be a Boolean value.");if(e.includeZero)return/^(-?0|[1-9]\d*)(\.0+)?$/.test(t)}return/^[1-9]\d*(\.0+)?$/.test(t)},n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function o(t,e){return t(e={exports:{}},e.exports),e.exports}var i=o(function(t,e){(e=t.exports=function(t){return t+e.suffix(+t)}).suffix=function(t){return t%=100,1===Math.floor(t/10)?"th":t%10==1?"st":t%10==2?"nd":t%10==3?"rd":"th"}}),a=(i.suffix,o(function(t,e){var r,o,i,a,s,c,u,f,l,p,y,h,g,d,b,m,v,_,w,j;t.exports=(r="function"==typeof Promise,o="object"==typeof self?self:n,i="undefined"!=typeof Symbol,a="undefined"!=typeof Map,s="undefined"!=typeof Set,c="undefined"!=typeof WeakMap,u="undefined"!=typeof WeakSet,f="undefined"!=typeof DataView,l=i&&void 0!==Symbol.iterator,p=i&&void 0!==Symbol.toStringTag,y=s&&"function"==typeof Set.prototype.entries,h=a&&"function"==typeof Map.prototype.entries,g=y&&Object.getPrototypeOf((new Set).entries()),d=h&&Object.getPrototypeOf((new Map).entries()),b=l&&"function"==typeof Array.prototype[Symbol.iterator],m=b&&Object.getPrototypeOf([][Symbol.iterator]()),v=l&&"function"==typeof String.prototype[Symbol.iterator],_=v&&Object.getPrototypeOf(""[Symbol.iterator]()),w=8,j=-1,function(t){var e=typeof t;if("object"!==e)return e;if(null===t)return"null";if(t===o)return"global";if(Array.isArray(t)&&(!1===p||!(Symbol.toStringTag in t)))return"Array";if("object"==typeof window&&null!==window){if("object"==typeof window.location&&t===window.location)return"Location";if("object"==typeof window.document&&t===window.document)return"Document";if("object"==typeof window.navigator){if("object"==typeof window.navigator.mimeTypes&&t===window.navigator.mimeTypes)return"MimeTypeArray";if("object"==typeof window.navigator.plugins&&t===window.navigator.plugins)return"PluginArray"}if(("function"==typeof window.HTMLElement||"object"==typeof window.HTMLElement)&&t instanceof window.HTMLElement){if("BLOCKQUOTE"===t.tagName)return"HTMLQuoteElement";if("TD"===t.tagName)return"HTMLTableDataCellElement";if("TH"===t.tagName)return"HTMLTableHeaderCellElement"}}var n=p&&t[Symbol.toStringTag];if("string"==typeof n)return n;var i=Object.getPrototypeOf(t);return i===RegExp.prototype?"RegExp":i===Date.prototype?"Date":r&&i===Promise.prototype?"Promise":s&&i===Set.prototype?"Set":a&&i===Map.prototype?"Map":u&&i===WeakSet.prototype?"WeakSet":c&&i===WeakMap.prototype?"WeakMap":f&&i===DataView.prototype?"DataView":a&&i===d?"Map Iterator":s&&i===g?"Set Iterator":b&&i===m?"Array Iterator":v&&i===_?"String Iterator":null===i?"Object":Object.prototype.toString.call(t).slice(w,j)})}));function s(t,e,r){if(e!=e)return function(t,e,r,n){for(var o=t.length,i=r+(n?1:-1);n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,u,r);for(var n=r-1,o=t.length;++n<o;)if(t[n]===e)return n;return-1}function c(t,e,r,n){for(var o=r-1,i=t.length;++o<i;)if(n(t[o],e))return o;return-1}function u(t){return t!=t}var f=Array.prototype.splice;function l(t,e,r,n){var o,i=n?c:s,a=-1,u=e.length,l=t;for(t===e&&(e=function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(e)),r&&(l=function(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}(t,(o=r,function(t){return o(t)})));++a<u;)for(var p=0,y=e[a],h=r?r(y):y;(p=i(l,h,p,n))>-1;)l!==t&&f.call(l,p,1),f.call(t,p,1);return t}var p=function(t,e){return t&&t.length&&e&&e.length?l(t,e):t},y=o(function(t,e){var r=200,o="__lodash_hash_undefined__",i=9007199254740991,a="[object Arguments]",s="[object Boolean]",c="[object Date]",u="[object Function]",f="[object GeneratorFunction]",l="[object Map]",p="[object Number]",y="[object Object]",h="[object RegExp]",g="[object Set]",d="[object String]",b="[object Symbol]",m="[object ArrayBuffer]",v="[object DataView]",_="[object Float32Array]",w="[object Float64Array]",j="[object Int8Array]",O="[object Int16Array]",T="[object Int32Array]",$="[object Uint8Array]",S="[object Uint8ClampedArray]",A="[object Uint16Array]",E="[object Uint32Array]",I=/\w*$/,N=/^\[object .+?Constructor\]$/,k=/^(?:0|[1-9]\d*)$/,M={};M[a]=M["[object Array]"]=M[m]=M[v]=M[s]=M[c]=M[_]=M[w]=M[j]=M[O]=M[T]=M[l]=M[p]=M[y]=M[h]=M[g]=M[d]=M[b]=M[$]=M[S]=M[A]=M[E]=!0,M["[object Error]"]=M[u]=M["[object WeakMap]"]=!1;var x="object"==typeof n&&n&&n.Object===Object&&n,P="object"==typeof self&&self&&self.Object===Object&&self,F=x||P||Function("return this")(),R=e&&!e.nodeType&&e,W=R&&t&&!t.nodeType&&t,D=W&&W.exports===R;function H(t,e){return t.set(e[0],e[1]),t}function C(t,e){return t.add(e),t}function J(t,e,r,n){var o=-1,i=t?t.length:0;for(n&&i&&(r=t[++o]);++o<i;)r=e(r,t[o],o,t);return r}function L(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function Z(t){var e=-1,r=Array(t.size);return t.forEach(function(t,n){r[++e]=[n,t]}),r}function K(t,e){return function(r){return t(e(r))}}function V(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r}var q,B=Array.prototype,U=Function.prototype,z=Object.prototype,G=F["__core-js_shared__"],Q=(q=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||""))?"Symbol(src)_1."+q:"",X=U.toString,Y=z.hasOwnProperty,tt=z.toString,et=RegExp("^"+X.call(Y).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rt=D?F.Buffer:void 0,nt=F.Symbol,ot=F.Uint8Array,it=K(Object.getPrototypeOf,Object),at=Object.create,st=z.propertyIsEnumerable,ct=B.splice,ut=Object.getOwnPropertySymbols,ft=rt?rt.isBuffer:void 0,lt=K(Object.keys,Object),pt=Wt(F,"DataView"),yt=Wt(F,"Map"),ht=Wt(F,"Promise"),gt=Wt(F,"Set"),dt=Wt(F,"WeakMap"),bt=Wt(Object,"create"),mt=Lt(pt),vt=Lt(yt),_t=Lt(ht),wt=Lt(gt),jt=Lt(dt),Ot=nt?nt.prototype:void 0,Tt=Ot?Ot.valueOf:void 0;function $t(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function St(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function At(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Et(t){this.__data__=new St(t)}function It(t,e){var r=Kt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Vt(t)}(t)&&Y.call(t,"callee")&&(!st.call(t,"callee")||tt.call(t)==a)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var i in t)!e&&!Y.call(t,i)||o&&("length"==i||Ct(i,n))||r.push(i);return r}function Nt(t,e,r){var n=t[e];Y.call(t,e)&&Zt(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function kt(t,e){for(var r=t.length;r--;)if(Zt(t[r][0],e))return r;return-1}function Mt(t,e,r,n,o,i,N){var k;if(n&&(k=i?n(t,o,i,N):n(t)),void 0!==k)return k;if(!Ut(t))return t;var x=Kt(t);if(x){if(k=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&Y.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,k)}else{var P=Ht(t),F=P==u||P==f;if(qt(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(P==y||P==a||F&&!i){if(L(t))return i?t:{};if(k=function(t){return"function"!=typeof t.constructor||Jt(t)?{}:(e=it(t),Ut(e)?at(e):{});var e}(F?{}:t),!e)return function(t,e){return Ft(t,Dt(t),e)}(t,function(t,e){return t&&Ft(e,zt(e),t)}(k,t))}else{if(!M[P])return i?t:{};k=function(t,e,r,n){var o=t.constructor;switch(e){case m:return Pt(t);case s:case c:return new o(+t);case v:return function(t,e){var r=e?Pt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,n);case _:case w:case j:case O:case T:case $:case S:case A:case E:return function(t,e){var r=e?Pt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,n);case l:return function(t,e,r){return J(e?r(Z(t),!0):Z(t),H,new t.constructor)}(t,n,r);case p:case d:return new o(t);case h:return(u=new(a=t).constructor(a.source,I.exec(a))).lastIndex=a.lastIndex,u;case g:return function(t,e,r){return J(e?r(V(t),!0):V(t),C,new t.constructor)}(t,n,r);case b:return i=t,Tt?Object(Tt.call(i)):{}}var i;var a,u}(t,P,Mt,e)}}N||(N=new Et);var R=N.get(t);if(R)return R;if(N.set(t,k),!x)var W=r?function(t){return function(t,e,r){var n=e(t);return Kt(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,zt,Dt)}(t):zt(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}(W||t,function(o,i){W&&(o=t[i=o]),Nt(k,i,Mt(o,e,r,n,i,t,N))}),k}function xt(t){return!(!Ut(t)||(e=t,Q&&Q in e))&&(Bt(t)||L(t)?et:N).test(Lt(t));var e}function Pt(t){var e=new t.constructor(t.byteLength);return new ot(e).set(new ot(t)),e}function Ft(t,e,r,n){r||(r={});for(var o=-1,i=e.length;++o<i;){var a=e[o],s=n?n(r[a],t[a],a,r,t):void 0;Nt(r,a,void 0===s?t[a]:s)}return r}function Rt(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function Wt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return xt(r)?r:void 0}$t.prototype.clear=function(){this.__data__=bt?bt(null):{}},$t.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},$t.prototype.get=function(t){var e=this.__data__;if(bt){var r=e[t];return r===o?void 0:r}return Y.call(e,t)?e[t]:void 0},$t.prototype.has=function(t){var e=this.__data__;return bt?void 0!==e[t]:Y.call(e,t)},$t.prototype.set=function(t,e){return this.__data__[t]=bt&&void 0===e?o:e,this},St.prototype.clear=function(){this.__data__=[]},St.prototype.delete=function(t){var e=this.__data__,r=kt(e,t);return!(r<0||(r==e.length-1?e.pop():ct.call(e,r,1),0))},St.prototype.get=function(t){var e=this.__data__,r=kt(e,t);return r<0?void 0:e[r][1]},St.prototype.has=function(t){return kt(this.__data__,t)>-1},St.prototype.set=function(t,e){var r=this.__data__,n=kt(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},At.prototype.clear=function(){this.__data__={hash:new $t,map:new(yt||St),string:new $t}},At.prototype.delete=function(t){return Rt(this,t).delete(t)},At.prototype.get=function(t){return Rt(this,t).get(t)},At.prototype.has=function(t){return Rt(this,t).has(t)},At.prototype.set=function(t,e){return Rt(this,t).set(t,e),this},Et.prototype.clear=function(){this.__data__=new St},Et.prototype.delete=function(t){return this.__data__.delete(t)},Et.prototype.get=function(t){return this.__data__.get(t)},Et.prototype.has=function(t){return this.__data__.has(t)},Et.prototype.set=function(t,e){var n=this.__data__;if(n instanceof St){var o=n.__data__;if(!yt||o.length<r-1)return o.push([t,e]),this;n=this.__data__=new At(o)}return n.set(t,e),this};var Dt=ut?K(ut,Object):function(){return[]},Ht=function(t){return tt.call(t)};function Ct(t,e){return!!(e=null==e?i:e)&&("number"==typeof t||k.test(t))&&t>-1&&t%1==0&&t<e}function Jt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||z)}function Lt(t){if(null!=t){try{return X.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Zt(t,e){return t===e||t!=t&&e!=e}(pt&&Ht(new pt(new ArrayBuffer(1)))!=v||yt&&Ht(new yt)!=l||ht&&"[object Promise]"!=Ht(ht.resolve())||gt&&Ht(new gt)!=g||dt&&"[object WeakMap]"!=Ht(new dt))&&(Ht=function(t){var e=tt.call(t),r=e==y?t.constructor:void 0,n=r?Lt(r):void 0;if(n)switch(n){case mt:return v;case vt:return l;case _t:return"[object Promise]";case wt:return g;case jt:return"[object WeakMap]"}return e});var Kt=Array.isArray;function Vt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=i}(t.length)&&!Bt(t)}var qt=ft||function(){return!1};function Bt(t){var e=Ut(t)?tt.call(t):"";return e==u||e==f}function Ut(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function zt(t){return Vt(t)?It(t):function(t){if(!Jt(t))return lt(t);var e=[];for(var r in Object(t))Y.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}t.exports=function(t){return Mt(t,!0,!0)}}),h="[object Object]";var g,d,b=Function.prototype,m=Object.prototype,v=b.toString,_=m.hasOwnProperty,w=v.call(Object),j=m.toString,O=(g=Object.getPrototypeOf,d=Object,function(t){return g(d(t))});var T=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||j.call(t)!=h||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=O(t);if(null===e)return!0;var r=_.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&v.call(r)==w};const $=Array.isArray;function S(t){return"string"==typeof t&&t.length>0&&"."===t[0]?t.slice(1):t}function A(t,e){return function t(e,r,n){const o=y(e);let i,a,s,c,u;if((n=Object.assign({depth:-1,path:""},n)).depth+=1,$(o))for(i=0,a=o.length;i<a;i++){const e=`${n.path}.${i}`;void 0!==o[i]?(n.parent=y(o),n.parentType="array",s=t(r(o[i],void 0,Object.assign({},n,{path:S(e)})),r,Object.assign({},n,{path:S(e)})),Number.isNaN(s)&&i<o.length?(o.splice(i,1),i-=1):o[i]=s):o.splice(i,1)}else if(T(o))for(i=0,a=(c=Object.keys(o)).length;i<a;i++){u=c[i];const e=`${n.path}.${u}`;0===n.depth&&null!=u&&(n.topmostKey=u),n.parent=y(o),n.parentType="object",s=t(r(u,o[u],Object.assign({},n,{path:S(e)})),r,Object.assign({},n,{path:S(e)})),Number.isNaN(s)?delete o[u]:o[u]=s}return o}(t,e,{})}var E="__lodash_hash_undefined__",I=9007199254740991,N="[object Function]",k="[object GeneratorFunction]",M=/^\[object .+?Constructor\]$/,x="object"==typeof n&&n&&n.Object===Object&&n,P="object"==typeof self&&self&&self.Object===Object&&self,F=x||P||Function("return this")();function R(t,e){return!!(t?t.length:0)&&function(t,e,r){if(e!=e)return function(t,e,r,n){var o=t.length,i=r+(n?1:-1);for(;n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,H,r);var n=r-1,o=t.length;for(;++n<o;)if(t[n]===e)return n;return-1}(t,e,0)>-1}function W(t,e,r){for(var n=-1,o=t?t.length:0;++n<o;)if(r(e,t[n]))return!0;return!1}function D(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}function H(t){return t!=t}function C(t){return function(e){return t(e)}}function J(t,e){return t.has(e)}var L,Z=Array.prototype,K=Function.prototype,V=Object.prototype,q=F["__core-js_shared__"],B=(L=/[^.]+$/.exec(q&&q.keys&&q.keys.IE_PROTO||""))?"Symbol(src)_1."+L:"",U=K.toString,z=V.hasOwnProperty,G=V.toString,Q=RegExp("^"+U.call(z).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),X=Z.splice,Y=Math.max,tt=Math.min,et=lt(F,"Map"),rt=lt(Object,"create");function nt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function ot(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function it(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function at(t){var e=-1,r=t?t.length:0;for(this.__data__=new it;++e<r;)this.add(t[e])}function st(t,e){for(var r,n,o=t.length;o--;)if((r=t[o][0])===(n=e)||r!=r&&n!=n)return o;return-1}function ct(t){return!(!yt(t)||function(t){return!!B&&B in t}(t))&&(pt(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?Q:M).test(function(t){if(null!=t){try{return U.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t))}function ut(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&function(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=I}(t.length)&&!pt(t)}(t)}(t)?t:[]}function ft(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function lt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return ct(r)?r:void 0}function pt(t){var e=yt(t)?G.call(t):"";return e==N||e==k}function yt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}nt.prototype.clear=function(){this.__data__=rt?rt(null):{}},nt.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},nt.prototype.get=function(t){var e=this.__data__;if(rt){var r=e[t];return r===E?void 0:r}return z.call(e,t)?e[t]:void 0},nt.prototype.has=function(t){var e=this.__data__;return rt?void 0!==e[t]:z.call(e,t)},nt.prototype.set=function(t,e){return this.__data__[t]=rt&&void 0===e?E:e,this},ot.prototype.clear=function(){this.__data__=[]},ot.prototype.delete=function(t){var e=this.__data__,r=st(e,t);return!(r<0||(r==e.length-1?e.pop():X.call(e,r,1),0))},ot.prototype.get=function(t){var e=this.__data__,r=st(e,t);return r<0?void 0:e[r][1]},ot.prototype.has=function(t){return st(this.__data__,t)>-1},ot.prototype.set=function(t,e){var r=this.__data__,n=st(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},it.prototype.clear=function(){this.__data__={hash:new nt,map:new(et||ot),string:new nt}},it.prototype.delete=function(t){return ft(this,t).delete(t)},it.prototype.get=function(t){return ft(this,t).get(t)},it.prototype.has=function(t){return ft(this,t).has(t)},it.prototype.set=function(t,e){return ft(this,t).set(t,e),this},at.prototype.add=at.prototype.push=function(t){return this.__data__.set(t,E),this},at.prototype.has=function(t){return this.__data__.has(t)};var ht=function(t,e){return e=Y(void 0===e?t.length-1:e,0),function(){for(var r=arguments,n=-1,o=Y(r.length-e,0),i=Array(o);++n<o;)i[n]=r[e+n];n=-1;for(var a=Array(e+1);++n<e;)a[n]=r[n];return a[e]=i,function(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}(t,this,a)}}(function(t){var e=D(t,ut);return e.length&&e[0]===t[0]?function(t,e,r){for(var n=r?W:R,o=t[0].length,i=t.length,a=i,s=Array(i),c=1/0,u=[];a--;){var f=t[a];a&&e&&(f=D(f,C(e))),c=tt(f.length,c),s[a]=!r&&(e||o>=120&&f.length>=120)?new at(a&&f):void 0}f=t[0];var l=-1,p=s[0];t:for(;++l<o&&u.length<c;){var y=f[l],h=e?e(y):y;if(y=r||0!==y?y:0,!(p?J(p,h):n(u,h,r))){for(a=i;--a;){var g=s[a];if(!(g?J(g,h):n(t[a],h,r)))continue t}p&&p.push(h),u.push(y)}}return u}(e):[]});function gt(t){return"string"==typeof t?t.length>0?[t]:[]:t}var dt=o(function(t){t.exports=function(){var t=Object.prototype.toString;function e(t,e){return null!=t&&Object.prototype.hasOwnProperty.call(t,e)}function r(t){if(!t)return!0;if(o(t)&&0===t.length)return!0;if("string"!=typeof t){for(var r in t)if(e(t,r))return!1;return!0}return!1}function n(e){return t.call(e)}var o=Array.isArray||function(e){return"[object Array]"===t.call(e)};function i(t){var e=parseInt(t);return e.toString()===t?e:t}function a(t){t=t||{};var a=function(t){return Object.keys(a).reduce(function(e,r){return"create"===r?e:("function"==typeof a[r]&&(e[r]=a[r].bind(a,t)),e)},{})};function s(r,n){return t.includeInheritedProps||"number"==typeof n&&Array.isArray(r)||e(r,n)}function c(t,e){if(s(t,e))return t[e]}function u(t,e,r,n){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if("string"==typeof e)return u(t,e.split(".").map(i),r,n);var o=e[0],a=c(t,o);return 1===e.length?(void 0!==a&&n||(t[o]=r),a):(void 0===a&&("number"==typeof e[1]?t[o]=[]:t[o]={}),u(t[o],e.slice(1),r,n))}return a.has=function(r,n){if("number"==typeof n?n=[n]:"string"==typeof n&&(n=n.split(".")),!n||0===n.length)return!!r;for(var a=0;a<n.length;a++){var s=i(n[a]);if(!("number"==typeof s&&o(r)&&s<r.length||(t.includeInheritedProps?s in Object(r):e(r,s))))return!1;r=r[s]}return!0},a.ensureExists=function(t,e,r){return u(t,e,r,!0)},a.set=function(t,e,r,n){return u(t,e,r,n)},a.insert=function(t,e,r,n){var i=a.get(t,e);n=~~n,o(i)||(i=[],a.set(t,e,i)),i.splice(n,0,r)},a.empty=function(t,e){var i,c;if(!r(e)&&null!=t&&(i=a.get(t,e))){if("string"==typeof i)return a.set(t,e,"");if(function(t){return"boolean"==typeof t||"[object Boolean]"===n(t)}(i))return a.set(t,e,!1);if("number"==typeof i)return a.set(t,e,0);if(o(i))i.length=0;else{if(!function(t){return"object"==typeof t&&"[object Object]"===n(t)}(i))return a.set(t,e,null);for(c in i)s(i,c)&&delete i[c]}}},a.push=function(t,e){var r=a.get(t,e);o(r)||(r=[],a.set(t,e,r)),r.push.apply(r,Array.prototype.slice.call(arguments,2))},a.coalesce=function(t,e,r){for(var n,o=0,i=e.length;o<i;o++)if(void 0!==(n=a.get(t,e[o])))return n;return r},a.get=function(t,e,r){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if(null==t)return r;if("string"==typeof e)return a.get(t,e.split("."),r);var n=i(e[0]),o=c(t,n);return void 0===o?r:1===e.length?o:a.get(t[n],e.slice(1),r)},a.del=function(t,e){if("number"==typeof e&&(e=[e]),null==t)return t;if(r(e))return t;if("string"==typeof e)return a.del(t,e.split("."));var n=i(e[0]);return s(t,n)?1!==e.length?a.del(t[n],e.slice(1)):(o(t)?t.splice(n,1):delete t[n],t):t},a}var s=a();return s.create=a,s.withInheritedProps=a({includeInheritedProps:!0}),s}()}),bt=function(t){var e=(t=Math.abs(t))%100;if(e>=10&&e<=20)return"th";var r=t%10;return 1===r?"st":2===r?"nd":3===r?"rd":"th"};function mt(t){if("number"!=typeof t)throw new TypeError("Expected Number, got "+typeof t+" "+t);return Number.isFinite(t)?t+bt(t):t}mt.indicator=bt;var vt=mt;const _t=/[|\\{}()[\]^$+*?.-]/g;var wt=t=>{if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(_t,"\\$&")};const jt=new Map;function Ot(t,e){e={caseSensitive:!1,...e};const r=t+JSON.stringify(e);if(jt.has(r))return jt.get(r);const n="!"===t[0];n&&(t=t.slice(1)),t=wt(t).replace(/\\\*/g,".*");const o=new RegExp(`^${t}$`,e.caseSensitive?"":"i");return o.negated=n,jt.set(r,o),o}var Tt=(t,e,r)=>{if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError(`Expected two arrays, got ${typeof t} ${typeof e}`);if(0===e.length)return t;const n="!"===e[0][0];e=e.map(t=>Ot(t,r));const o=[];for(const r of t){let t=n;for(const n of e)n.test(r)&&(t=!n.negated);t&&o.push(r)}return o};function $t(t,e,r){return function t(e,r,n,o=!0){const i=Object.prototype.hasOwnProperty;function s(t){return null!=t}function c(t){return"Object"===a(t)}function u(t,e){return e=gt(e),Array.from(t).filter(t=>!e.some(e=>Tt.isMatch(t,e,{caseSensitive:!0})))}const f=["any","anything","every","everything","all","whatever","whatevs"],l=Array.isArray;if(!s(e))throw new Error("check-types-mini: [THROW_ID_01] First argument is missing!");const y={ignoreKeys:[],ignorePaths:[],acceptArrays:!1,acceptArraysIgnore:[],enforceStrictKeyset:!0,schema:{},msg:"check-types-mini",optsVarName:"opts"};let h;if(h=s(n)&&c(n)?Object.assign({},y,n):Object.assign({},y),s(h.ignoreKeys)&&h.ignoreKeys?h.ignoreKeys=gt(h.ignoreKeys):h.ignoreKeys=[],s(h.ignorePaths)&&h.ignorePaths?h.ignorePaths=gt(h.ignorePaths):h.ignorePaths=[],s(h.acceptArraysIgnore)&&h.acceptArraysIgnore?h.acceptArraysIgnore=gt(h.acceptArraysIgnore):h.acceptArraysIgnore=[],h.msg="string"==typeof h.msg?h.msg.trim():h.msg,":"===h.msg[h.msg.length-1]&&(h.msg=h.msg.slice(0,h.msg.length-1).trim()),h.schema&&(Object.keys(h.schema).forEach(t=>{if(c(h.schema[t])){const e={};A(h.schema[t],(r,n,o)=>{const i=void 0!==n?n:r;return l(i)||c(i)||(e[`${t}.${o.path}`]=i),i}),delete h.schema[t],h.schema=Object.assign(h.schema,e)}}),Object.keys(h.schema).forEach(t=>{l(h.schema[t])||(h.schema[t]=[h.schema[t]]),h.schema[t]=h.schema[t].map(String).map(t=>t.toLowerCase()).map(t=>t.trim())})),s(r)||(r={}),o&&t(h,y,{enforceStrictKeyset:!1},!1),h.enforceStrictKeyset)if(s(h.schema)&&Object.keys(h.schema).length>0){if(0!==u(p(Object.keys(e),Object.keys(r).concat(Object.keys(h.schema))),h.ignoreKeys).length){const t=p(Object.keys(e),Object.keys(r).concat(Object.keys(h.schema)));throw new TypeError(`${h.msg}: ${h.optsVarName}.enforceStrictKeyset is on and the following key${t.length>1?"s":""} ${t.length>1?"are":"is"} not covered by schema and/or reference objects: ${t.join(", ")}`)}}else{if(!(s(r)&&Object.keys(r).length>0))throw new TypeError(`${h.msg}: Both ${h.optsVarName}.schema and reference objects are missing! We don't have anything to match the keys as you requested via opts.enforceStrictKeyset!`);if(0!==u(p(Object.keys(e),Object.keys(r)),h.ignoreKeys).length){const t=p(Object.keys(e),Object.keys(r));throw new TypeError(`${h.msg}: The input object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not covered by the reference object: ${t.join(", ")}`)}if(0!==u(p(Object.keys(r),Object.keys(e)),h.ignoreKeys).length){const t=p(Object.keys(r),Object.keys(e));throw new TypeError(`${h.msg}: The reference object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not present in the input object: ${t.join(", ")}`)}}const g=[];A(e,(t,n,o)=>{let s=n,u=t;if("array"===o.parentType&&(u=void 0,s=t),l(g)&&g.length&&g.some(t=>o.path.startsWith(t)))return s;if(u&&h.ignoreKeys.some(t=>Tt.isMatch(u,t)))return s;if(h.ignorePaths.some(t=>Tt.isMatch(o.path,t)))return s;const p=!(!c(s)&&!l(s)&&l(o.parent));let y=!1;c(h.schema)&&i.call(h.schema,dt.get(o.path))&&(y=!0);let d=!1;if(c(r)&&dt.has(r,dt.get(o.path))&&(d=!0),h.enforceStrictKeyset&&p&&!y&&!d)throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path} is neither covered by reference object (second input argument), nor ${h.optsVarName}.schema! To stop this error, turn off ${h.optsVarName}.enforceStrictKeyset or provide some type reference (2nd argument or ${h.optsVarName}.schema).\n\nDebug info:\n\nobj = ${JSON.stringify(e,null,4)}\n\nref = ${JSON.stringify(r,null,4)}\n\ninnerObj = ${JSON.stringify(o,null,4)}\n\nopts = ${JSON.stringify(h,null,4)}\n\ncurrent = ${JSON.stringify(s,null,4)}\n\n`);if(y){const t=gt(h.schema[o.path]).map(String).map(t=>t.toLowerCase());if(dt.set(h.schema,o.path,t),ht(t,f).length)g.push(o.path);else if(!0!==s&&!1!==s&&!t.includes(a(s).toLowerCase())||(!0===s||!1===s)&&!t.includes(String(s))&&!t.includes("boolean")){if(!l(s)||!h.acceptArrays)throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path} was customised to ${"string"!==a(s)?'"':""}${JSON.stringify(s,null,0)}${"string"!==a(s)?'"':""} (type: ${a(s).toLowerCase()}) which is not among the allowed types in schema (which is equal to ${JSON.stringify(t,null,0)})`);for(let e=0,r=s.length;e<r;e++)if(!t.includes(a(s[e]).toLowerCase()))throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path}.${e}, the ${vt(e+1)} element (equal to ${JSON.stringify(s[e],null,0)}) is of a type ${a(s[e]).toLowerCase()}, but only the following are allowed by the ${h.optsVarName}.schema: ${t.join(", ")}`)}}else if(d){const e=dt.get(r,o.path);if(h.acceptArrays&&l(s)&&!h.acceptArraysIgnore.includes(t)){if(!s.every(e=>a(e).toLowerCase()===a(r[t]).toLowerCase()))throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path} was customised to be array, but not all of its elements are ${a(r[t]).toLowerCase()}-type`)}else if(a(s)!==a(e))throw new TypeError(`${h.msg}: ${h.optsVarName}.${o.path} was customised to ${"string"===a(s).toLowerCase()?"":'"'}${JSON.stringify(s,null,0)}${"string"===a(s).toLowerCase()?"":'"'} which is not ${a(e).toLowerCase()} but ${a(s).toLowerCase()}`)}return s})}(t,e,r)}Tt.isMatch=(t,e,r)=>{const n=Ot(e,r),o=n.test(t);return n.negated?!o:o};const St=Array.isArray;function At(t,r){if(!St(t))throw new TypeError(`ranges-sort: [THROW_ID_01] Input must be an array, consisting of range arrays! Currently its type is: ${typeof t}, equal to: ${JSON.stringify(t,null,4)}`);if(0===t.length)return t;const n={strictlyTwoElementsInRangeArrays:!1,progressFn:null},o=Object.assign({},n,r);let a,s;if($t(o,n,{msg:"ranges-sort: [THROW_ID_02*]",schema:{progressFn:["function","false","null"]}}),o.strictlyTwoElementsInRangeArrays&&!t.every((t,e)=>2===t.length||(a=e,s=t.length,!1)))throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${i(a)} range (${JSON.stringify(t[a],null,4)}) has not two but ${s} elements!`);if(!t.every((t,r)=>!(!e(t[0],{includeZero:!0})||!e(t[1],{includeZero:!0}))||(a=r,!1)))throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${i(a)} range (${JSON.stringify(t[a],null,4)}) does not consist of only natural numbers!`);const c=t.length*t.length;let u=0;return Array.from(t).sort((t,e)=>(o.progressFn&&(u++,o.progressFn(Math.floor(100*u/c))),t[0]===e[0]?t[1]<e[1]?-1:t[1]>e[1]?1:0:t[0]<e[0]?-1:1))}var Et=Array.isArray;return function(n,o,a){var s=0,c=0;if(0===arguments.length)throw new Error("ranges-apply: [THROW_ID_01] inputs missing!");if("string"!=typeof n)throw new TypeError("ranges-apply: [THROW_ID_02] first input argument must be a string! Currently it's: ".concat(t(n),", equal to: ").concat(JSON.stringify(n,null,4)));if(null===o)return n;if(!Et(o))throw new TypeError("ranges-apply: [THROW_ID_03] second input argument must be an array (or null)! Currently it's: ".concat(t(o),", equal to: ").concat(JSON.stringify(o,null,4)));if(a&&"function"!=typeof a)throw new TypeError("ranges-apply: [THROW_ID_04] the third input argument must be a function (or falsey)! Currently it's: ".concat(t(a),", equal to: ").concat(JSON.stringify(a,null,4)));Et(o)&&(e(o[0],{includeZero:!0})||r(o[0],{includeZero:!0}))&&(e(o[1],{includeZero:!0})||r(o[1],{includeZero:!0}))&&(o=[o]);var u=o.length,f=0;o.forEach(function(n,l){if(a&&(s=Math.floor(f/u*10))!==c&&(c=s,a(s)),!Et(n))throw new TypeError("ranges-apply: [THROW_ID_05] ranges array, second input arg., has ".concat(i(l)," element not an array: ").concat(JSON.stringify(n,null,4),", which is ").concat(t(n)));if(!e(n[0],{includeZero:!0})){if(!r(n[0],{includeZero:!0}))throw new TypeError("ranges-apply: [THROW_ID_06] ranges array, second input arg. has ".concat(i(l)," element, array [").concat(n[0],",").concat(n[1],"]. That array has first element not an integer, but ").concat(t(n[0]),", equal to: ").concat(JSON.stringify(n[0],null,4),". Computer doesn't like this."));o[l][0]=Number.parseInt(o[l][0],10)}if(!e(n[1],{includeZero:!0})){if(!r(n[1],{includeZero:!0}))throw new TypeError("ranges-apply: [THROW_ID_07] ranges array, second input arg. has ".concat(i(l)," element, array [").concat(n[0],",").concat(n[1],"]. That array has second element not an integer, but ").concat(t(n[1]),", equal to: ").concat(JSON.stringify(n[1],null,4),". Computer doesn't like this."));o[l][1]=Number.parseInt(o[l][1],10)}f++});var l=function(t,e){function r(t){return"string"==typeof t}if(!Array.isArray(t))return t;const n={mergeType:1,progressFn:null,joinRangesThatTouchEdges:!0};let o;if(e){if(!T(e))throw new Error(`emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:\n${JSON.stringify(e,null,4)} (type ${typeof e})`);if((o=Object.assign({},n,e)).progressFn&&T(o.progressFn)&&!Object.keys(o.progressFn).length)o.progressFn=null;else if(o.progressFn&&"function"!=typeof o.progressFn)throw new Error(`ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "${typeof o.progressFn}", equal to ${JSON.stringify(o.progressFn,null,4)}`);if(o.mergeType&&1!==o.mergeType&&2!==o.mergeType)if(r(o.mergeType)&&"1"===o.mergeType.trim())o.mergeType=1;else{if(!r(o.mergeType)||"2"!==o.mergeType.trim())throw new Error(`ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof o.mergeType}", equal to ${JSON.stringify(o.progressFn,null,4)}`);o.mergeType=2}if("boolean"!=typeof o.joinRangesThatTouchEdges)throw new Error(`ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof o.joinRangesThatTouchEdges}", equal to ${JSON.stringify(o.joinRangesThatTouchEdges,null,4)}`)}else o=y(n);const i=y(t).filter(t=>void 0!==t[2]||t[0]!==t[1]);let a,s,c;const u=(a=o.progressFn?At(i,{progressFn:t=>{(c=Math.floor(t/5))!==s&&(s=c,o.progressFn(c))}}):At(i)).length-1;for(let t=u;t>0;t--)o.progressFn&&(c=Math.floor(78*(1-t/u))+21)!==s&&c>s&&(s=c,o.progressFn(c)),(a[t][0]<=a[t-1][0]||!o.joinRangesThatTouchEdges&&a[t][0]<a[t-1][1]||o.joinRangesThatTouchEdges&&a[t][0]<=a[t-1][1])&&(a[t-1][0]=Math.min(a[t][0],a[t-1][0]),a[t-1][1]=Math.max(a[t][1],a[t-1][1]),void 0!==a[t][2]&&(a[t-1][0]>=a[t][0]||a[t-1][1]<=a[t][1])&&null!==a[t-1][2]&&(null===a[t][2]&&null!==a[t-1][2]?a[t-1][2]=null:void 0!==a[t-1][2]?2===o.mergeType&&a[t-1][0]===a[t][0]?a[t-1][2]=a[t][2]:a[t-1][2]+=a[t][2]:a[t-1][2]=a[t][2]),a.splice(t,1),t=a.length);return a}(o,{progressFn:function(t){a&&(s=10+Math.floor(t/10))!==c&&(c=s,a(s))}}),p=l.length;if(p>0){var h=n.slice(l[p-1][1]);n=l.reduce(function(t,e,r,o){a&&(s=20+Math.floor(r/p*80))!==c&&(c=s,a(s));var i=0===r?0:o[r-1][1],u=o[r][0];return t+n.slice(i,u)+(null!=o[r][2]?o[r][2]:"")},""),n+=h}return n}});
