/**
 * object-flatten-referencing
 * Flatten complex nested objects according to a reference objects
 * Version: 4.11.15
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/object-flatten-referencing
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).objectFlattenReferencing=e()}(this,(function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function r(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function n(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?r(Object(o),!0).forEach((function(r){e(t,r,o[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var i=function(t,e){return t(e={exports:{}},e.exports),e.exports}((function(t,e){var r="[object Arguments]",n="[object Function]",i="[object GeneratorFunction]",a="[object Map]",c="[object Set]",u=/\w*$/,s=/^\[object .+?Constructor\]$/,f=/^(?:0|[1-9]\d*)$/,l={};l[r]=l["[object Array]"]=l["[object ArrayBuffer]"]=l["[object DataView]"]=l["[object Boolean]"]=l["[object Date]"]=l["[object Float32Array]"]=l["[object Float64Array]"]=l["[object Int8Array]"]=l["[object Int16Array]"]=l["[object Int32Array]"]=l[a]=l["[object Number]"]=l["[object Object]"]=l["[object RegExp]"]=l[c]=l["[object String]"]=l["[object Symbol]"]=l["[object Uint8Array]"]=l["[object Uint8ClampedArray]"]=l["[object Uint16Array]"]=l["[object Uint32Array]"]=!0,l["[object Error]"]=l[n]=l["[object WeakMap]"]=!1;var p="object"==typeof o&&o&&o.Object===Object&&o,h="object"==typeof self&&self&&self.Object===Object&&self,y=p||h||Function("return this")(),g=e&&!e.nodeType&&e,b=g&&t&&!t.nodeType&&t,d=b&&b.exports===g;function v(t,e){return t.set(e[0],e[1]),t}function _(t,e){return t.add(e),t}function j(t,e,r,n){var o=-1,i=t?t.length:0;for(n&&i&&(r=t[++o]);++o<i;)r=e(r,t[o],o,t);return r}function w(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function m(t){var e=-1,r=Array(t.size);return t.forEach((function(t,n){r[++e]=[n,t]})),r}function O(t,e){return function(r){return t(e(r))}}function A(t){var e=-1,r=Array(t.size);return t.forEach((function(t){r[++e]=t})),r}var W,I=Array.prototype,T=Function.prototype,S=Object.prototype,x=y["__core-js_shared__"],E=(W=/[^.]+$/.exec(x&&x.keys&&x.keys.IE_PROTO||""))?"Symbol(src)_1."+W:"",P=T.toString,D=S.hasOwnProperty,C=S.toString,$=RegExp("^"+P.call(D).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),M=d?y.Buffer:void 0,R=y.Symbol,k=y.Uint8Array,B=O(Object.getPrototypeOf,Object),F=Object.create,H=S.propertyIsEnumerable,L=I.splice,K=Object.getOwnPropertySymbols,N=M?M.isBuffer:void 0,U=O(Object.keys,Object),V=bt(y,"DataView"),G=bt(y,"Map"),J=bt(y,"Promise"),z=bt(y,"Set"),q=bt(y,"WeakMap"),Q=bt(Object,"create"),X=wt(V),Y=wt(G),Z=wt(J),tt=wt(z),et=wt(q),rt=R?R.prototype:void 0,nt=rt?rt.valueOf:void 0;function ot(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function it(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function at(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function ct(t){this.__data__=new it(t)}function ut(t,e){var n=Ot(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&At(t)}(t)&&D.call(t,"callee")&&(!H.call(t,"callee")||C.call(t)==r)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],o=n.length,i=!!o;for(var a in t)!e&&!D.call(t,a)||i&&("length"==a||_t(a,o))||n.push(a);return n}function st(t,e,r){var n=t[e];D.call(t,e)&&mt(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function ft(t,e){for(var r=t.length;r--;)if(mt(t[r][0],e))return r;return-1}function lt(t,e,o,s,f,p,h){var y;if(s&&(y=p?s(t,f,p,h):s(t)),void 0!==y)return y;if(!Tt(t))return t;var g=Ot(t);if(g){if(y=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&D.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,y)}else{var b=vt(t),d=b==n||b==i;if(Wt(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if("[object Object]"==b||b==r||d&&!p){if(w(t))return p?t:{};if(y=function(t){return"function"!=typeof t.constructor||jt(t)?{}:(e=B(t),Tt(e)?F(e):{});var e}(d?{}:t),!e)return function(t,e){return yt(t,dt(t),e)}(t,function(t,e){return t&&yt(e,St(e),t)}(y,t))}else{if(!l[b])return p?t:{};y=function(t,e,r,n){var o=t.constructor;switch(e){case"[object ArrayBuffer]":return ht(t);case"[object Boolean]":case"[object Date]":return new o(+t);case"[object DataView]":return function(t,e){var r=e?ht(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,n);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return function(t,e){var r=e?ht(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,n);case a:return function(t,e,r){return j(e?r(m(t),!0):m(t),v,new t.constructor)}(t,n,r);case"[object Number]":case"[object String]":return new o(t);case"[object RegExp]":return function(t){var e=new t.constructor(t.source,u.exec(t));return e.lastIndex=t.lastIndex,e}(t);case c:return function(t,e,r){return j(e?r(A(t),!0):A(t),_,new t.constructor)}(t,n,r);case"[object Symbol]":return i=t,nt?Object(nt.call(i)):{}}var i}(t,b,lt,e)}}h||(h=new ct);var O=h.get(t);if(O)return O;if(h.set(t,y),!g)var W=o?function(t){return function(t,e,r){var n=e(t);return Ot(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,St,dt)}(t):St(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}(W||t,(function(r,n){W&&(r=t[n=r]),st(y,n,lt(r,e,o,s,n,t,h))})),y}function pt(t){return!(!Tt(t)||(e=t,E&&E in e))&&(It(t)||w(t)?$:s).test(wt(t));var e}function ht(t){var e=new t.constructor(t.byteLength);return new k(e).set(new k(t)),e}function yt(t,e,r,n){r||(r={});for(var o=-1,i=e.length;++o<i;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;st(r,a,void 0===c?t[a]:c)}return r}function gt(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function bt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return pt(r)?r:void 0}ot.prototype.clear=function(){this.__data__=Q?Q(null):{}},ot.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},ot.prototype.get=function(t){var e=this.__data__;if(Q){var r=e[t];return"__lodash_hash_undefined__"===r?void 0:r}return D.call(e,t)?e[t]:void 0},ot.prototype.has=function(t){var e=this.__data__;return Q?void 0!==e[t]:D.call(e,t)},ot.prototype.set=function(t,e){return this.__data__[t]=Q&&void 0===e?"__lodash_hash_undefined__":e,this},it.prototype.clear=function(){this.__data__=[]},it.prototype.delete=function(t){var e=this.__data__,r=ft(e,t);return!(r<0)&&(r==e.length-1?e.pop():L.call(e,r,1),!0)},it.prototype.get=function(t){var e=this.__data__,r=ft(e,t);return r<0?void 0:e[r][1]},it.prototype.has=function(t){return ft(this.__data__,t)>-1},it.prototype.set=function(t,e){var r=this.__data__,n=ft(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},at.prototype.clear=function(){this.__data__={hash:new ot,map:new(G||it),string:new ot}},at.prototype.delete=function(t){return gt(this,t).delete(t)},at.prototype.get=function(t){return gt(this,t).get(t)},at.prototype.has=function(t){return gt(this,t).has(t)},at.prototype.set=function(t,e){return gt(this,t).set(t,e),this},ct.prototype.clear=function(){this.__data__=new it},ct.prototype.delete=function(t){return this.__data__.delete(t)},ct.prototype.get=function(t){return this.__data__.get(t)},ct.prototype.has=function(t){return this.__data__.has(t)},ct.prototype.set=function(t,e){var r=this.__data__;if(r instanceof it){var n=r.__data__;if(!G||n.length<199)return n.push([t,e]),this;r=this.__data__=new at(n)}return r.set(t,e),this};var dt=K?O(K,Object):function(){return[]},vt=function(t){return C.call(t)};function _t(t,e){return!!(e=null==e?9007199254740991:e)&&("number"==typeof t||f.test(t))&&t>-1&&t%1==0&&t<e}function jt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||S)}function wt(t){if(null!=t){try{return P.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function mt(t,e){return t===e||t!=t&&e!=e}(V&&"[object DataView]"!=vt(new V(new ArrayBuffer(1)))||G&&vt(new G)!=a||J&&"[object Promise]"!=vt(J.resolve())||z&&vt(new z)!=c||q&&"[object WeakMap]"!=vt(new q))&&(vt=function(t){var e=C.call(t),r="[object Object]"==e?t.constructor:void 0,n=r?wt(r):void 0;if(n)switch(n){case X:return"[object DataView]";case Y:return a;case Z:return"[object Promise]";case tt:return c;case et:return"[object WeakMap]"}return e});var Ot=Array.isArray;function At(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}(t.length)&&!It(t)}var Wt=N||function(){return!1};function It(t){var e=Tt(t)?C.call(t):"";return e==n||e==i}function Tt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function St(t){return At(t)?ut(t):function(t){if(!jt(t))return U(t);var e=[];for(var r in Object(t))D.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}t.exports=function(t){return lt(t,!0,!0)}}));function a(t){return null!=t}function c(t){return"string"==typeof t}function u(t,e,r){if(0===arguments.length)throw new Error("str-indexes-of-plus/strIndexesOfPlus(): inputs missing!");if(!c(t))throw new TypeError(`str-indexes-of-plus/strIndexesOfPlus(): first input argument must be a string! Currently it's: ${typeof t}`);if(!c(e))throw new TypeError(`str-indexes-of-plus/strIndexesOfPlus(): second input argument must be a string! Currently it's: ${typeof e}`);if(arguments.length>=3&&!Number.isInteger(r)&&(!c(r)||!/^\d*$/.test(r)))throw new TypeError(`str-indexes-of-plus/strIndexesOfPlus(): third input argument must be a natural number! Currently it's: ${r}`);/^\d*$/.test(r)&&(r=Number(r));const n=Array.from(t),o=Array.from(e);if(0===n.length||0===o.length||a(r)&&r>=n.length)return[];a(r)||(r=0);const i=[];let u,s=!1;for(let t=r,e=n.length;t<e;t++)s&&(n[t]===o[t-u]?t-u+1===o.length&&i.push(u):(u=null,s=!1)),s||n[t]===o[0]&&(1===o.length?i.push(t):(s=!0,u=t));return i}const s=/[|\\{}()[\]^$+*?.-]/g;const f=new Map;function l(t,e){e={caseSensitive:!1,...e};const r=t+JSON.stringify(e);if(f.has(r))return f.get(r);const n="!"===t[0];n&&(t=t.slice(1)),t=(t=>{if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(s,"\\$&")})(t).replace(/\\\*/g,".*");const o=new RegExp(`^${t}$`,e.caseSensitive?"":"i");return o.negated=n,f.set(r,o),o}var p=(t,e,r)=>{if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError(`Expected two arrays, got ${typeof t} ${typeof e}`);if(0===e.length)return t;const n="!"===e[0][0];e=e.map(t=>l(t,r));const o=[];for(const r of t){let t=n;for(const n of e)n.test(r)&&(t=!n.negated);t&&o.push(r)}return o};p.isMatch=(t,e,r)=>{const n=Array.isArray(t)?t:[t],o=Array.isArray(e)?e:[e];return n.some(t=>o.every(e=>{const n=l(e,r),o=n.test(t);return n.negated?!o:o}))};var h,y,g=Function.prototype,b=Object.prototype,d=g.toString,v=b.hasOwnProperty,_=d.call(Object),j=b.toString,w=(h=Object.getPrototypeOf,y=Object,function(t){return h(y(t))});var m=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||"[object Object]"!=j.call(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=w(t);if(null===e)return!0;var r=v.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&d.call(r)==_},O=Array.isArray;
/*!
   * is-string-int | MIT (c) Shinnosuke Watanabe
   * https://github.com/shinnn/is-string-int.js
  */function A(t){return"string"==typeof t}function W(t,e){if(0===arguments.length||0===Object.keys(t).length)return[];var r=i(t),n=[];return m(r)&&Object.keys(r).forEach((function(t){m(r[t])&&(r[t]=W(r[t],e)),O(r[t])&&(n=n.concat(r[t].map((function(r){return t+e.objectKeyAndValueJoinChar+r})))),A(r[t])&&n.push(t+e.objectKeyAndValueJoinChar+r[t])})),n}function I(t,e,r,n){if(0===arguments.length||0===t.length)return"";var o=i(t),a="";if(o.length>0)if(n)for(var c=0,u=o.length;c<u;c++)if(A(o[c])){var s=void 0;s="",e.mergeArraysWithLineBreaks&&c>0&&(!e.mergeWithoutTrailingBrIfLineContainsBr||"string"!=typeof o[c-1]||e.mergeWithoutTrailingBrIfLineContainsBr&&void 0!==o[c-1]&&!o[c-1].toLowerCase().includes("<br"))&&(s="<br".concat(e.xhtml?" /":"",">")),a+=s+(r?e.wrapHeadsWith:"")+o[c]+(r?e.wrapTailsWith:"")}else O(o[c])&&o[c].length>0&&o[c].every(A)&&function(){var t="";e.mergeArraysWithLineBreaks&&a.length>0&&(t="<br".concat(e.xhtml?" /":"",">")),a=o[c].reduce((function(n,o,i,a){var c="";return i!==a.length-1&&(c=" "),n+(0===i?t:"")+(r?e.wrapHeadsWith:"")+o+(r?e.wrapTailsWith:"")+c}),a)}();else a=o.reduce((function(t,n,o,i){var a="";e.mergeArraysWithLineBreaks&&o>0&&(a="<br".concat(e.xhtml?" /":"",">"));var c="";return o!==i.length-1&&(c=" "),t+(0===o?a:"")+(r?e.wrapHeadsWith:"")+n+(r?e.wrapTailsWith:"")+c}),a);return a}function T(t){return A(t)?t.length>0?[t]:[]:t}function S(t){return A(t)&&function(t,e){if(e=e||{},0===arguments.length)throw new TypeError("No arguments. (One argument required)");if("string"!=typeof t)throw new TypeError(t+" is not a string. Argument must be a string to be checked if it represents an integer.");var r,n=Number(t);if(e.parseLiteral){if(t.trim()!==t)return!1;r=n.toString()}else r=t;return"NaN"!==r&&Math.round(n).toString()===r}(t.trim())?parseInt(t.trim(),10):t}var x=Array.isArray;function E(t){return null!=t}function P(t){return"string"==typeof t}return function(e,r,o){if(0===arguments.length)throw new Error("object-flatten-referencing/ofr(): [THROW_ID_01] all inputs missing!");if(1===arguments.length)throw new Error("object-flatten-referencing/ofr(): [THROW_ID_02] reference object missing!");if(E(o)&&!m(o))throw new Error("object-flatten-referencing/ofr(): [THROW_ID_03] third input, options object must be a plain object. Currently it's: ".concat(t(o)));function a(e,r,o){var c=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],s=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],f=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"",l=i(e),h=i(r),y={wrapHeadsWith:"%%_",wrapTailsWith:"_%%",dontWrapKeys:[],dontWrapPaths:[],xhtml:!0,preventDoubleWrapping:!0,preventWrappingIfContains:[],objectKeyAndValueJoinChar:".",wrapGlobalFlipSwitch:!0,ignore:[],whatToDoWhenReferenceIsMissing:0,mergeArraysWithLineBreaks:!0,mergeWithoutTrailingBrIfLineContainsBr:!0,enforceStrictKeyset:!0},g=n({},y,{},o);return g.dontWrapKeys=T(g.dontWrapKeys),g.preventWrappingIfContains=T(g.preventWrappingIfContains),g.dontWrapPaths=T(g.dontWrapPaths),g.ignore=T(g.ignore),g.whatToDoWhenReferenceIsMissing=S(g.whatToDoWhenReferenceIsMissing),g.wrapGlobalFlipSwitch||(c=!1),m(l)?Object.keys(l).forEach((function(e){var r=f+(0===f.length?e:".".concat(e));if(0===g.ignore.length||!g.ignore.includes(e))if(g.wrapGlobalFlipSwitch&&(c=!0,g.dontWrapKeys.length>0&&(c=c&&!g.dontWrapKeys.some((function(t){return p.isMatch(e,t,{caseSensitive:!0})}))),g.dontWrapPaths.length>0&&(c=c&&!g.dontWrapPaths.some((function(t){return t===r}))),g.preventWrappingIfContains.length>0&&"string"==typeof l[e]&&(c=c&&!g.preventWrappingIfContains.some((function(t){return l[e].includes(t)})))),E(h[e])||!E(h[e])&&2===g.whatToDoWhenReferenceIsMissing)if(x(l[e]))if(2===g.whatToDoWhenReferenceIsMissing||P(h[e]))l[e]=I(l[e],g,c,s);else{if(l[e].every((function(t){return"string"==typeof t||Array.isArray(t)}))){var o=!0;l[e].forEach((function(t){Array.isArray(t)&&!t.every(P)&&(o=!1)})),o&&(s=!1)}l[e]=a(l[e],h[e],g,c,s,r)}else m(l[e])?2===g.whatToDoWhenReferenceIsMissing||P(h[e])?l[e]=I(W(l[e],g),g,c,s):l[e]=a(l[e],h[e],c?g:n({},g,{wrapGlobalFlipSwitch:!1}),c,s,r):P(l[e])&&(l[e]=a(l[e],h[e],g,c,s,r));else if(t(l[e])!==t(h[e])&&1===g.whatToDoWhenReferenceIsMissing)throw new Error("object-flatten-referencing/ofr(): [THROW_ID_06] reference object does not have the key ".concat(e," and we need it. TIP: Turn off throwing via opts.whatToDoWhenReferenceIsMissing."))})):x(l)?x(h)?l.forEach((function(t,e){E(l[e])&&E(h[e])?l[e]=a(l[e],h[e],g,c,s,"".concat(f,"[").concat(e,"]")):l[e]=a(l[e],h[0],g,c,s,"".concat(f,"[").concat(e,"]"))})):P(h)&&(l=I(l,g,c,s)):P(l)&&l.length>0&&(g.wrapHeadsWith||g.wrapTailsWith)&&(g.preventDoubleWrapping&&(""!==g.wrapHeadsWith&&u(l,g.wrapHeadsWith.trim()).length||""!==g.wrapTailsWith&&u(l,g.wrapTailsWith.trim()).length)||(l=(c?g.wrapHeadsWith:"")+l+(c?g.wrapTailsWith:""))),l}return a(e,r,o)}}));
