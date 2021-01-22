/**
 * check-types-mini
 * Validate options object
 * Version: 5.9.1
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/check-types-mini/
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).checkTypesMini={})}(this,(function(t){"use strict";function e(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function r(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function n(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?r(Object(o),!0).forEach((function(r){e(t,r,o[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function i(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=t[Symbol.iterator]()).next.bind(r)}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function c(t){var e={exports:{}};return t(e,e.exports),e.exports}var u=c((function(t,e){t.exports=function(){var t="function"==typeof Promise,e="object"==typeof self?self:a,r="undefined"!=typeof Symbol,n="undefined"!=typeof Map,o="undefined"!=typeof Set,i="undefined"!=typeof WeakMap,c="undefined"!=typeof WeakSet,u="undefined"!=typeof DataView,s=r&&void 0!==Symbol.iterator,f=r&&void 0!==Symbol.toStringTag,l=o&&"function"==typeof Set.prototype.entries,p=n&&"function"==typeof Map.prototype.entries,y=l&&Object.getPrototypeOf((new Set).entries()),h=p&&Object.getPrototypeOf((new Map).entries()),g=s&&"function"==typeof Array.prototype[Symbol.iterator],v=g&&Object.getPrototypeOf([][Symbol.iterator]()),b=s&&"function"==typeof String.prototype[Symbol.iterator],d=b&&Object.getPrototypeOf(""[Symbol.iterator]()),_=8,m=-1;function w(r){var a=typeof r;if("object"!==a)return a;if(null===r)return"null";if(r===e)return"global";if(Array.isArray(r)&&(!1===f||!(Symbol.toStringTag in r)))return"Array";if("object"==typeof window&&null!==window){if("object"==typeof window.location&&r===window.location)return"Location";if("object"==typeof window.document&&r===window.document)return"Document";if("object"==typeof window.navigator){if("object"==typeof window.navigator.mimeTypes&&r===window.navigator.mimeTypes)return"MimeTypeArray";if("object"==typeof window.navigator.plugins&&r===window.navigator.plugins)return"PluginArray"}if(("function"==typeof window.HTMLElement||"object"==typeof window.HTMLElement)&&r instanceof window.HTMLElement){if("BLOCKQUOTE"===r.tagName)return"HTMLQuoteElement";if("TD"===r.tagName)return"HTMLTableDataCellElement";if("TH"===r.tagName)return"HTMLTableHeaderCellElement"}}var s=f&&r[Symbol.toStringTag];if("string"==typeof s)return s;var l=Object.getPrototypeOf(r);return l===RegExp.prototype?"RegExp":l===Date.prototype?"Date":t&&l===Promise.prototype?"Promise":o&&l===Set.prototype?"Set":n&&l===Map.prototype?"Map":c&&l===WeakSet.prototype?"WeakSet":i&&l===WeakMap.prototype?"WeakMap":u&&l===DataView.prototype?"DataView":n&&l===h?"Map Iterator":o&&l===y?"Set Iterator":g&&l===v?"Array Iterator":b&&l===d?"String Iterator":null===l?"Object":Object.prototype.toString.call(r).slice(_,m)}return w}()}));function s(t,e,r){if(e!=e)return function(t,e,r,n){for(var o=t.length,i=r+(n?1:-1);n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,l,r);for(var n=r-1,o=t.length;++n<o;)if(t[n]===e)return n;return-1}function f(t,e,r,n){for(var o=r-1,i=t.length;++o<i;)if(n(t[o],e))return o;return-1}function l(t){return t!=t}var p=Array.prototype.splice;function y(t,e,r,n){var o,i=n?f:s,a=-1,c=e.length,u=t;for(t===e&&(e=function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(e)),r&&(u=function(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}(t,(o=r,function(t){return o(t)})));++a<c;)for(var l=0,y=e[a],h=r?r(y):y;(l=i(u,h,l,n))>-1;)u!==t&&p.call(u,l,1),p.call(t,l,1);return t}var h=function(t,e){return t&&t.length&&e&&e.length?y(t,e):t},g=c((function(t,e){var r="__lodash_hash_undefined__",n=9007199254740991,o="[object Arguments]",i="[object Boolean]",c="[object Date]",u="[object Function]",s="[object GeneratorFunction]",f="[object Map]",l="[object Number]",p="[object Object]",y="[object Promise]",h="[object RegExp]",g="[object Set]",v="[object String]",b="[object Symbol]",d="[object WeakMap]",_="[object ArrayBuffer]",m="[object DataView]",w="[object Float32Array]",j="[object Float64Array]",O="[object Int8Array]",A="[object Int16Array]",S="[object Int32Array]",T="[object Uint8Array]",k="[object Uint8ClampedArray]",P="[object Uint16Array]",E="[object Uint32Array]",N=/\w*$/,M=/^\[object .+?Constructor\]$/,x=/^(?:0|[1-9]\d*)$/,I={};I[o]=I["[object Array]"]=I[_]=I[m]=I[i]=I[c]=I[w]=I[j]=I[O]=I[A]=I[S]=I[f]=I[l]=I[p]=I[h]=I[g]=I[v]=I[b]=I[T]=I[k]=I[P]=I[E]=!0,I["[object Error]"]=I[u]=I[d]=!1;var L="object"==typeof self&&self&&self.Object===Object&&self,C="object"==typeof a&&a&&a.Object===Object&&a||L||Function("return this")(),K=e&&!e.nodeType&&e,$=K&&t&&!t.nodeType&&t,D=$&&$.exports===K;function V(t,e){return t.set(e[0],e[1]),t}function F(t,e){return t.add(e),t}function J(t,e,r,n){var o=-1,i=t?t.length:0;for(n&&i&&(r=t[++o]);++o<i;)r=e(r,t[o],o,t);return r}function W(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function H(t){var e=-1,r=Array(t.size);return t.forEach((function(t,n){r[++e]=[n,t]})),r}function R(t,e){return function(r){return t(e(r))}}function B(t){var e=-1,r=Array(t.size);return t.forEach((function(t){r[++e]=t})),r}var U,q=Array.prototype,z=Function.prototype,G=Object.prototype,Q=C["__core-js_shared__"],X=(U=/[^.]+$/.exec(Q&&Q.keys&&Q.keys.IE_PROTO||""))?"Symbol(src)_1."+U:"",Y=z.toString,Z=G.hasOwnProperty,tt=G.toString,et=RegExp("^"+Y.call(Z).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rt=D?C.Buffer:void 0,nt=C.Symbol,ot=C.Uint8Array,it=R(Object.getPrototypeOf,Object),at=Object.create,ct=G.propertyIsEnumerable,ut=q.splice,st=Object.getOwnPropertySymbols,ft=rt?rt.isBuffer:void 0,lt=R(Object.keys,Object),pt=$t(C,"DataView"),yt=$t(C,"Map"),ht=$t(C,"Promise"),gt=$t(C,"Set"),vt=$t(C,"WeakMap"),bt=$t(Object,"create"),dt=Wt(pt),_t=Wt(yt),mt=Wt(ht),wt=Wt(gt),jt=Wt(vt),Ot=nt?nt.prototype:void 0,At=Ot?Ot.valueOf:void 0;function St(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Tt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function kt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Pt(t){this.__data__=new Tt(t)}function Et(t,e){var r=Rt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Bt(t)}(t)&&Z.call(t,"callee")&&(!ct.call(t,"callee")||tt.call(t)==o)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,i=!!n;for(var a in t)!e&&!Z.call(t,a)||i&&("length"==a||Ft(a,n))||r.push(a);return r}function Nt(t,e,r){var n=t[e];Z.call(t,e)&&Ht(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function Mt(t,e){for(var r=t.length;r--;)if(Ht(t[r][0],e))return r;return-1}function xt(t,e,r,n,a,y,d){var M;if(n&&(M=y?n(t,a,y,d):n(t)),void 0!==M)return M;if(!zt(t))return t;var x=Rt(t);if(x){if(M=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&Z.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,M)}else{var L=Vt(t),C=L==u||L==s;if(Ut(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(L==p||L==o||C&&!y){if(W(t))return y?t:{};if(M=function(t){return"function"!=typeof t.constructor||Jt(t)?{}:(e=it(t),zt(e)?at(e):{});var e}(C?{}:t),!e)return function(t,e){return Ct(t,Dt(t),e)}(t,function(t,e){return t&&Ct(e,Gt(e),t)}(M,t))}else{if(!I[L])return y?t:{};M=function(t,e,r,n){var o=t.constructor;switch(e){case _:return Lt(t);case i:case c:return new o(+t);case m:return function(t,e){var r=e?Lt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,n);case w:case j:case O:case A:case S:case T:case k:case P:case E:return function(t,e){var r=e?Lt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,n);case f:return function(t,e,r){return J(e?r(H(t),!0):H(t),V,new t.constructor)}(t,n,r);case l:case v:return new o(t);case h:return function(t){var e=new t.constructor(t.source,N.exec(t));return e.lastIndex=t.lastIndex,e}(t);case g:return function(t,e,r){return J(e?r(B(t),!0):B(t),F,new t.constructor)}(t,n,r);case b:return a=t,At?Object(At.call(a)):{}}var a}(t,L,xt,e)}}d||(d=new Pt);var K=d.get(t);if(K)return K;if(d.set(t,M),!x)var $=r?function(t){return function(t,e,r){var n=e(t);return Rt(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,Gt,Dt)}(t):Gt(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}($||t,(function(o,i){$&&(o=t[i=o]),Nt(M,i,xt(o,e,r,n,i,t,d))})),M}function It(t){return!(!zt(t)||(e=t,X&&X in e))&&(qt(t)||W(t)?et:M).test(Wt(t));var e}function Lt(t){var e=new t.constructor(t.byteLength);return new ot(e).set(new ot(t)),e}function Ct(t,e,r,n){r||(r={});for(var o=-1,i=e.length;++o<i;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;Nt(r,a,void 0===c?t[a]:c)}return r}function Kt(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function $t(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return It(r)?r:void 0}St.prototype.clear=function(){this.__data__=bt?bt(null):{}},St.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},St.prototype.get=function(t){var e=this.__data__;if(bt){var n=e[t];return n===r?void 0:n}return Z.call(e,t)?e[t]:void 0},St.prototype.has=function(t){var e=this.__data__;return bt?void 0!==e[t]:Z.call(e,t)},St.prototype.set=function(t,e){return this.__data__[t]=bt&&void 0===e?r:e,this},Tt.prototype.clear=function(){this.__data__=[]},Tt.prototype.delete=function(t){var e=this.__data__,r=Mt(e,t);return!(r<0)&&(r==e.length-1?e.pop():ut.call(e,r,1),!0)},Tt.prototype.get=function(t){var e=this.__data__,r=Mt(e,t);return r<0?void 0:e[r][1]},Tt.prototype.has=function(t){return Mt(this.__data__,t)>-1},Tt.prototype.set=function(t,e){var r=this.__data__,n=Mt(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},kt.prototype.clear=function(){this.__data__={hash:new St,map:new(yt||Tt),string:new St}},kt.prototype.delete=function(t){return Kt(this,t).delete(t)},kt.prototype.get=function(t){return Kt(this,t).get(t)},kt.prototype.has=function(t){return Kt(this,t).has(t)},kt.prototype.set=function(t,e){return Kt(this,t).set(t,e),this},Pt.prototype.clear=function(){this.__data__=new Tt},Pt.prototype.delete=function(t){return this.__data__.delete(t)},Pt.prototype.get=function(t){return this.__data__.get(t)},Pt.prototype.has=function(t){return this.__data__.has(t)},Pt.prototype.set=function(t,e){var r=this.__data__;if(r instanceof Tt){var n=r.__data__;if(!yt||n.length<199)return n.push([t,e]),this;r=this.__data__=new kt(n)}return r.set(t,e),this};var Dt=st?R(st,Object):function(){return[]},Vt=function(t){return tt.call(t)};function Ft(t,e){return!!(e=null==e?n:e)&&("number"==typeof t||x.test(t))&&t>-1&&t%1==0&&t<e}function Jt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||G)}function Wt(t){if(null!=t){try{return Y.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Ht(t,e){return t===e||t!=t&&e!=e}(pt&&Vt(new pt(new ArrayBuffer(1)))!=m||yt&&Vt(new yt)!=f||ht&&Vt(ht.resolve())!=y||gt&&Vt(new gt)!=g||vt&&Vt(new vt)!=d)&&(Vt=function(t){var e=tt.call(t),r=e==p?t.constructor:void 0,n=r?Wt(r):void 0;if(n)switch(n){case dt:return m;case _t:return f;case mt:return y;case wt:return g;case jt:return d}return e});var Rt=Array.isArray;function Bt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=n}(t.length)&&!qt(t)}var Ut=ft||function(){return!1};function qt(t){var e=zt(t)?tt.call(t):"";return e==u||e==s}function zt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function Gt(t){return Bt(t)?Et(t):function(t){if(!Jt(t))return lt(t);var e=[];for(var r in Object(t))Z.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}t.exports=function(t){return xt(t,!0,!0)}}));var v,b,d=Object.prototype,_=Function.prototype.toString,m=d.hasOwnProperty,w=_.call(Object),j=d.toString,O=(v=Object.getPrototypeOf,b=Object,function(t){return v(b(t))});var A=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||"[object Object]"!=j.call(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=O(t);if(null===e)return!0;var r=m.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&_.call(r)==w};function S(t){if(t.includes(".")){var e=t.lastIndexOf(".");if(!t.slice(0,e).includes("."))return t.slice(0,e);for(var r=e-1;r--;)if("."===t[r])return t.slice(r+1,e)}return null}function T(t,e){return function t(e,r,o,i){var a,c=g(e),u=n({depth:-1,path:""},o);if(u.depth+=1,Array.isArray(c))for(var s=0,f=c.length;s<f&&!i.now;s++){var l=u.path?u.path+"."+s:""+s;void 0!==c[s]?(u.parent=g(c),u.parentType="array",u.parentKey=S(l),a=t(r(c[s],void 0,n(n({},u),{},{path:l}),i),r,n(n({},u),{},{path:l}),i),Number.isNaN(a)&&s<c.length?(c.splice(s,1),s-=1):c[s]=a):c.splice(s,1)}else if(A(c))for(var p in c){if(i.now&&null!=p)break;var y=u.path?u.path+"."+p:p;0===u.depth&&null!=p&&(u.topmostKey=p),u.parent=g(c),u.parentType="object",u.parentKey=S(y),a=t(r(p,c[p],n(n({},u),{},{path:y}),i),r,n(n({},u),{},{path:y}),i),Number.isNaN(a)?delete c[p]:c[p]=a}return c}(t,e,{},{now:!1})}var k="__lodash_hash_undefined__",P=9007199254740991,E=/^\[object .+?Constructor\]$/,N="object"==typeof self&&self&&self.Object===Object&&self,M="object"==typeof a&&a&&a.Object===Object&&a||N||Function("return this")();function x(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}function I(t,e){return!!(t?t.length:0)&&function(t,e,r){if(e!=e)return function(t,e,r,n){var o=t.length,i=r+(n?1:-1);for(;n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,K,r);var n=r-1,o=t.length;for(;++n<o;)if(t[n]===e)return n;return-1}(t,e,0)>-1}function L(t,e,r){for(var n=-1,o=t?t.length:0;++n<o;)if(r(e,t[n]))return!0;return!1}function C(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}function K(t){return t!=t}function $(t){return function(e){return t(e)}}function D(t,e){return t.has(e)}var V,F=Array.prototype,J=Function.prototype,W=Object.prototype,H=M["__core-js_shared__"],R=(V=/[^.]+$/.exec(H&&H.keys&&H.keys.IE_PROTO||""))?"Symbol(src)_1."+V:"",B=J.toString,U=W.hasOwnProperty,q=W.toString,z=RegExp("^"+B.call(U).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),G=F.splice,Q=Math.max,X=Math.min,Y=ut(M,"Map"),Z=ut(Object,"create");function tt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function et(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function rt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function nt(t){var e=-1,r=t?t.length:0;for(this.__data__=new rt;++e<r;)this.add(t[e])}function ot(t,e){for(var r,n,o=t.length;o--;)if((r=t[o][0])===(n=e)||r!=r&&n!=n)return o;return-1}function it(t){return!(!ft(t)||function(t){return!!R&&R in t}(t))&&(st(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?z:E).test(function(t){if(null!=t){try{return B.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t))}function at(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&function(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=P}(t.length)&&!st(t)}(t)}(t)?t:[]}function ct(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function ut(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return it(r)?r:void 0}function st(t){var e=ft(t)?q.call(t):"";return"[object Function]"==e||"[object GeneratorFunction]"==e}function ft(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}tt.prototype.clear=function(){this.__data__=Z?Z(null):{}},tt.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},tt.prototype.get=function(t){var e=this.__data__;if(Z){var r=e[t];return r===k?void 0:r}return U.call(e,t)?e[t]:void 0},tt.prototype.has=function(t){var e=this.__data__;return Z?void 0!==e[t]:U.call(e,t)},tt.prototype.set=function(t,e){return this.__data__[t]=Z&&void 0===e?k:e,this},et.prototype.clear=function(){this.__data__=[]},et.prototype.delete=function(t){var e=this.__data__,r=ot(e,t);return!(r<0)&&(r==e.length-1?e.pop():G.call(e,r,1),!0)},et.prototype.get=function(t){var e=this.__data__,r=ot(e,t);return r<0?void 0:e[r][1]},et.prototype.has=function(t){return ot(this.__data__,t)>-1},et.prototype.set=function(t,e){var r=this.__data__,n=ot(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},rt.prototype.clear=function(){this.__data__={hash:new tt,map:new(Y||et),string:new tt}},rt.prototype.delete=function(t){return ct(this,t).delete(t)},rt.prototype.get=function(t){return ct(this,t).get(t)},rt.prototype.has=function(t){return ct(this,t).has(t)},rt.prototype.set=function(t,e){return ct(this,t).set(t,e),this},nt.prototype.add=nt.prototype.push=function(t){return this.__data__.set(t,k),this},nt.prototype.has=function(t){return this.__data__.has(t)};var lt=function(t,e){return e=Q(void 0===e?t.length-1:e,0),function(){for(var r=arguments,n=-1,o=Q(r.length-e,0),i=Array(o);++n<o;)i[n]=r[e+n];n=-1;for(var a=Array(e+1);++n<e;)a[n]=r[n];return a[e]=i,x(t,this,a)}}((function(t){var e=C(t,at);return e.length&&e[0]===t[0]?function(t,e,r){for(var n=r?L:I,o=t[0].length,i=t.length,a=i,c=Array(i),u=1/0,s=[];a--;){var f=t[a];a&&e&&(f=C(f,$(e))),u=X(f.length,u),c[a]=!r&&(e||o>=120&&f.length>=120)?new nt(a&&f):void 0}f=t[0];var l=-1,p=c[0];t:for(;++l<o&&s.length<u;){var y=f[l],h=e?e(y):y;if(y=r||0!==y?y:0,!(p?D(p,h):n(s,h,r))){for(a=i;--a;){var g=c[a];if(!(g?D(g,h):n(t[a],h,r)))continue t}p&&p.push(h),s.push(y)}}return s}(e):[]}));function pt(t){return"string"==typeof t?t.length?[t]:[]:t}var yt=c((function(t){t.exports=function(){var t=Object.prototype.toString;function e(t,e){return null!=t&&Object.prototype.hasOwnProperty.call(t,e)}function r(t){if(!t)return!0;if(i(t)&&0===t.length)return!0;if("string"!=typeof t){for(var r in t)if(e(t,r))return!1;return!0}return!1}function n(e){return t.call(e)}function o(t){return"object"==typeof t&&"[object Object]"===n(t)}var i=Array.isArray||function(e){return"[object Array]"===t.call(e)};function a(t){return"boolean"==typeof t||"[object Boolean]"===n(t)}function c(t){var e=parseInt(t);return e.toString()===t?e:t}function u(t){var n,u=function t(e){return Object.keys(t).reduce((function(r,n){return"create"===n||"function"==typeof t[n]&&(r[n]=t[n].bind(t,e)),r}),{})};function s(t,e){if(n(t,e))return t[e]}function f(e,r,n,o){if("number"==typeof r&&(r=[r]),!r||0===r.length)return e;if("string"==typeof r)return f(e,r.split(".").map(c),n,o);var i=r[0],a=s(e,i);if(t.includeInheritedProps&&("__proto__"===i||"constructor"===i&&"function"==typeof a))throw new Error("For security reasons, object's magic properties cannot be set");return 1===r.length?(void 0!==a&&o||(e[i]=n),a):(void 0===a&&(e[i]="number"==typeof r[1]?[]:{}),f(e[i],r.slice(1),n,o))}return n=(t=t||{}).includeInheritedProps?function(){return!0}:function(t,r){return"number"==typeof r&&Array.isArray(t)||e(t,r)},u.has=function(r,n){if("number"==typeof n?n=[n]:"string"==typeof n&&(n=n.split(".")),!n||0===n.length)return!!r;for(var o=0;o<n.length;o++){var a=c(n[o]);if(!("number"==typeof a&&i(r)&&a<r.length||(t.includeInheritedProps?a in Object(r):e(r,a))))return!1;r=r[a]}return!0},u.ensureExists=function(t,e,r){return f(t,e,r,!0)},u.set=function(t,e,r,n){return f(t,e,r,n)},u.insert=function(t,e,r,n){var o=u.get(t,e);n=~~n,i(o)||u.set(t,e,o=[]),o.splice(n,0,r)},u.empty=function(t,e){var c,s;if(!r(e)&&null!=t&&(c=u.get(t,e))){if("string"==typeof c)return u.set(t,e,"");if(a(c))return u.set(t,e,!1);if("number"==typeof c)return u.set(t,e,0);if(i(c))c.length=0;else{if(!o(c))return u.set(t,e,null);for(s in c)n(c,s)&&delete c[s]}}},u.push=function(t,e){var r=u.get(t,e);i(r)||u.set(t,e,r=[]),r.push.apply(r,Array.prototype.slice.call(arguments,2))},u.coalesce=function(t,e,r){for(var n,o=0,i=e.length;o<i;o++)if(void 0!==(n=u.get(t,e[o])))return n;return r},u.get=function(t,e,r){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if(null==t)return r;if("string"==typeof e)return u.get(t,e.split("."),r);var n=c(e[0]),o=s(t,n);return void 0===o?r:1===e.length?o:u.get(t[n],e.slice(1),r)},u.del=function(t,e){if("number"==typeof e&&(e=[e]),null==t)return t;if(r(e))return t;if("string"==typeof e)return u.del(t,e.split("."));var o=c(e[0]);return n(t,o)?1!==e.length?u.del(t[o],e.slice(1)):(i(t)?t.splice(o,1):delete t[o],t):t},u}var s=u();return s.create=u,s.withInheritedProps=u({includeInheritedProps:!0}),s}()})),ht=new Map;function gt(t,e){e=n({caseSensitive:!1},e);var r=t+JSON.stringify(e);if(ht.has(r))return ht.get(r);var o="!"===t[0];o&&(t=t.slice(1)),t=function(t){if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}(t).replace(/\\\*/g,"[\\s\\S]*");var i=new RegExp("^"+t+"$",e.caseSensitive?"":"i");return i.negated=o,ht.set(r,i),i}var vt=function(t,e,r){if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError("Expected two arrays, got "+typeof t+" "+typeof e);if(0===e.length)return t;var n="!"===e[0][0];e=e.map((function(t){return gt(t,r)}));for(var o,a=[],c=i(t);!(o=c()).done;){for(var u,s=o.value,f=n,l=i(e);!(u=l()).done;){var p=u.value;p.test(s)&&(f=!p.negated)}f&&a.push(s)}return a};vt.isMatch=function(t,e,r){var n=Array.isArray(t)?t:[t],o=Array.isArray(e)?e:[e];return n.some((function(t){return o.every((function(e){var n=gt(e,r),o=n.test(t);return n.negated?!o:o}))}))};var bt={ignoreKeys:[],ignorePaths:[],acceptArrays:!1,acceptArraysIgnore:[],enforceStrictKeyset:!0,schema:{},msg:"check-types-mini",optsVarName:"opts"};t.checkTypesMini=function(t,e,r){return function(t,e,r){function o(t){return null!=t}function i(t){return"Object"===u(t)}function a(t,e){return"string"==typeof e&&(e=pt(e)),Array.from(t).filter((function(t){return!e.some((function(e){return vt.isMatch(t,e,{caseSensitive:!0})}))}))}var c=Object.prototype.hasOwnProperty,s=["any","anything","every","everything","all","whatever","whatevs"];if(!o(t))throw new Error("check-types-mini: [THROW_ID_01] First argument is missing!");var f=n(n({},bt),r);if("string"==typeof f.ignoreKeys&&(f.ignoreKeys=[f.ignoreKeys]),"string"==typeof f.ignorePaths&&(f.ignorePaths=[f.ignorePaths]),"string"==typeof f.acceptArraysIgnore&&(f.acceptArraysIgnore=[f.acceptArraysIgnore]),f.msg=(""+f.msg).trim(),":"===f.msg[f.msg.length-1]&&(f.msg=f.msg.slice(0,f.msg.length-1).trim()),i(f.schema))Object.keys(f.schema).forEach((function(t){if(i(f.schema[t])){var e={};T(f.schema[t],(function(r,n,o){var a=void 0!==n?n:r;return Array.isArray(a)||i(a)||(e[t+"."+o.path]=a),a})),delete f.schema[t],f.schema=n(n({},f.schema),e)}})),Object.keys(f.schema).forEach((function(t){Array.isArray(f.schema[t])||(f.schema[t]=[f.schema[t]]),f.schema[t]=f.schema[t].map((function(t){return(""+t).toLowerCase().trim()}))}));else if(null!=f.schema)throw new Error("check-types-mini: opts.schema was customised to "+JSON.stringify(f.schema,null,0)+" which is not object but "+typeof f.schema);if(o(e)||(e={}),f.enforceStrictKeyset)if(o(f.schema)&&Object.keys(f.schema).length>0){if(e&&a(h(Object.keys(t),Object.keys(e).concat(Object.keys(f.schema))),f.ignoreKeys).length){var l=h(Object.keys(t),Object.keys(e).concat(Object.keys(f.schema)));throw new TypeError(f.msg+": "+f.optsVarName+".enforceStrictKeyset is on and the following key"+(l.length>1?"s":"")+" "+(l.length>1?"are":"is")+" not covered by schema and/or reference objects: "+l.join(", "))}}else{if(!(i(e)&&Object.keys(e).length>0))throw new TypeError(f.msg+": Both "+f.optsVarName+".schema and reference objects are missing! We don't have anything to match the keys as you requested via opts.enforceStrictKeyset!");if(0!==a(h(Object.keys(t),Object.keys(e)),f.ignoreKeys).length){var p=h(Object.keys(t),Object.keys(e));throw new TypeError(f.msg+": The input object has key"+(p.length>1?"s":"")+" which "+(p.length>1?"are":"is")+" not covered by the reference object: "+p.join(", "))}if(0!==a(h(Object.keys(e),Object.keys(t)),f.ignoreKeys).length){var y=h(Object.keys(e),Object.keys(t));throw new TypeError(f.msg+": The reference object has key"+(y.length>1?"s":"")+" which "+(y.length>1?"are":"is")+" not present in the input object: "+y.join(", "))}}var g=[];T(t,(function(r,n,o){var a=n,l=r;if("array"===o.parentType&&(l=void 0,a=r),Array.isArray(g)&&g.length&&g.some((function(t){return o.path.startsWith(t)})))return a;if(l&&f.ignoreKeys.some((function(t){return vt.isMatch(l,t)})))return a;if(f.ignorePaths.some((function(t){return vt.isMatch(o.path,t)})))return a;var p=!(!i(a)&&!Array.isArray(a)&&Array.isArray(o.parent)),y=!1;i(f.schema)&&c.call(f.schema,o.path)&&(y=!0);var h=!1;if(i(e)&&yt.has(e,o.path)&&(h=!0),f.enforceStrictKeyset&&p&&!y&&!h)throw new TypeError(f.msg+": "+f.optsVarName+"."+o.path+" is neither covered by reference object (second input argument), nor "+f.optsVarName+".schema! To stop this error, turn off "+f.optsVarName+".enforceStrictKeyset or provide some type reference (2nd argument or "+f.optsVarName+".schema).\n\nDebug info:\n\nobj = "+JSON.stringify(t,null,4)+"\n\nref = "+JSON.stringify(e,null,4)+"\n\ninnerObj = "+JSON.stringify(o,null,4)+"\n\nopts = "+JSON.stringify(f,null,4)+"\n\ncurrent = "+JSON.stringify(a,null,4)+"\n\n");if(y){var v=pt(f.schema[o.path]).map((function(t){return(""+t).toLowerCase()}));if(yt.set(f.schema,o.path,v),lt(v,s).length)g.push(o.path);else if(!0!==a&&!1!==a&&!v.includes(u(a).toLowerCase())||(!0===a||!1===a)&&!v.includes(String(a))&&!v.includes("boolean")){if(!Array.isArray(a)||!f.acceptArrays)throw new TypeError(f.msg+": "+f.optsVarName+"."+o.path+" was customised to "+("string"!==u(a)?'"':"")+JSON.stringify(a,null,0)+("string"!==u(a)?'"':"")+" (type: "+u(a).toLowerCase()+") which is not among the allowed types in schema (which is equal to "+JSON.stringify(v,null,0)+")");for(var b=0,d=a.length;b<d;b++)if(!v.includes(u(a[b]).toLowerCase()))throw new TypeError(f.msg+": "+f.optsVarName+"."+o.path+"."+b+", the "+b+"th element (equal to "+JSON.stringify(a[b],null,0)+") is of a type "+u(a[b]).toLowerCase()+", but only the following are allowed by the "+f.optsVarName+".schema: "+v.join(", "))}}else if(e&&i(e)&&h){var _=yt.get(e,o.path);if(f.acceptArrays&&Array.isArray(a)&&!f.acceptArraysIgnore.includes(r)){if(!a.every((function(t){return u(t).toLowerCase()===u(e[r]).toLowerCase()})))throw new TypeError(f.msg+": "+f.optsVarName+"."+o.path+" was customised to be array, but not all of its elements are "+u(e[r]).toLowerCase()+"-type")}else if(u(a)!==u(_))throw new TypeError(f.msg+": "+f.optsVarName+"."+o.path+" was customised to "+("string"===u(a).toLowerCase()?"":'"')+JSON.stringify(a,null,0)+("string"===u(a).toLowerCase()?"":'"')+" which is not "+u(_).toLowerCase()+" but "+u(a).toLowerCase())}return a}))}(t,e,r)},Object.defineProperty(t,"__esModule",{value:!0})}));
