/**
 * string-range-expander
 * Expands string index ranges within whitespace boundaries until letters are met
 * Version: 1.9.3
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://bitbucket.org/codsen/codsen/src/master/packages/string-range-expander
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).stringRangeExpander=e()}(this,function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(t,e){return t(e={exports:{}},e.exports),e.exports}var r=n(function(t,n){var r,o,i,a,c,s,u,f,l,p,h,y,g,d,b,v,m,_,w,T;t.exports=(r="function"==typeof Promise,o="object"==typeof self?self:e,i="undefined"!=typeof Symbol,a="undefined"!=typeof Map,c="undefined"!=typeof Set,s="undefined"!=typeof WeakMap,u="undefined"!=typeof WeakSet,f="undefined"!=typeof DataView,l=i&&void 0!==Symbol.iterator,p=i&&void 0!==Symbol.toStringTag,h=c&&"function"==typeof Set.prototype.entries,y=a&&"function"==typeof Map.prototype.entries,g=h&&Object.getPrototypeOf((new Set).entries()),d=y&&Object.getPrototypeOf((new Map).entries()),b=l&&"function"==typeof Array.prototype[Symbol.iterator],v=b&&Object.getPrototypeOf([][Symbol.iterator]()),m=l&&"function"==typeof String.prototype[Symbol.iterator],_=m&&Object.getPrototypeOf(""[Symbol.iterator]()),w=8,T=-1,function(t){var e=typeof t;if("object"!==e)return e;if(null===t)return"null";if(t===o)return"global";if(Array.isArray(t)&&(!1===p||!(Symbol.toStringTag in t)))return"Array";if("object"==typeof window&&null!==window){if("object"==typeof window.location&&t===window.location)return"Location";if("object"==typeof window.document&&t===window.document)return"Document";if("object"==typeof window.navigator){if("object"==typeof window.navigator.mimeTypes&&t===window.navigator.mimeTypes)return"MimeTypeArray";if("object"==typeof window.navigator.plugins&&t===window.navigator.plugins)return"PluginArray"}if(("function"==typeof window.HTMLElement||"object"==typeof window.HTMLElement)&&t instanceof window.HTMLElement){if("BLOCKQUOTE"===t.tagName)return"HTMLQuoteElement";if("TD"===t.tagName)return"HTMLTableDataCellElement";if("TH"===t.tagName)return"HTMLTableHeaderCellElement"}}var n=p&&t[Symbol.toStringTag];if("string"==typeof n)return n;var i=Object.getPrototypeOf(t);return i===RegExp.prototype?"RegExp":i===Date.prototype?"Date":r&&i===Promise.prototype?"Promise":c&&i===Set.prototype?"Set":a&&i===Map.prototype?"Map":u&&i===WeakSet.prototype?"WeakSet":s&&i===WeakMap.prototype?"WeakMap":f&&i===DataView.prototype?"DataView":a&&i===d?"Map Iterator":c&&i===g?"Set Iterator":b&&i===v?"Array Iterator":m&&i===_?"String Iterator":null===i?"Object":Object.prototype.toString.call(t).slice(w,T)})});function o(t,e,n){if(e!=e)return function(t,e,n,r){for(var o=t.length,i=n+(r?1:-1);r?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,a,n);for(var r=n-1,o=t.length;++r<o;)if(t[r]===e)return r;return-1}function i(t,e,n,r){for(var o=n-1,i=t.length;++o<i;)if(r(t[o],e))return o;return-1}function a(t){return t!=t}var c=Array.prototype.splice;function s(t,e,n,r){var a,s=r?i:o,u=-1,f=e.length,l=t;for(t===e&&(e=function(t,e){var n=-1,r=t.length;e||(e=Array(r));for(;++n<r;)e[n]=t[n];return e}(e)),n&&(l=function(t,e){for(var n=-1,r=t?t.length:0,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}(t,(a=n,function(t){return a(t)})));++u<f;)for(var p=0,h=e[u],y=n?n(h):h;(p=s(l,y,p,r))>-1;)l!==t&&c.call(l,p,1),c.call(t,p,1);return t}var u=function(t,e){return t&&t.length&&e&&e.length?s(t,e):t},f=n(function(t,n){var r=200,o="__lodash_hash_undefined__",i=9007199254740991,a="[object Arguments]",c="[object Boolean]",s="[object Date]",u="[object Function]",f="[object GeneratorFunction]",l="[object Map]",p="[object Number]",h="[object Object]",y="[object RegExp]",g="[object Set]",d="[object String]",b="[object Symbol]",v="[object ArrayBuffer]",m="[object DataView]",_="[object Float32Array]",w="[object Float64Array]",T="[object Int8Array]",O="[object Int16Array]",j="[object Int32Array]",S="[object Uint8Array]",$="[object Uint8ClampedArray]",I="[object Uint16Array]",A="[object Uint32Array]",x=/\w*$/,C=/^\[object .+?Constructor\]$/,E=/^(?:0|[1-9]\d*)$/,k={};k[a]=k["[object Array]"]=k[v]=k[m]=k[c]=k[s]=k[_]=k[w]=k[T]=k[O]=k[j]=k[l]=k[p]=k[h]=k[y]=k[g]=k[d]=k[b]=k[S]=k[$]=k[I]=k[A]=!0,k["[object Error]"]=k[u]=k["[object WeakMap]"]=!1;var L="object"==typeof e&&e&&e.Object===Object&&e,N="object"==typeof self&&self&&self.Object===Object&&self,P=L||N||Function("return this")(),R=n&&!n.nodeType&&n,W=R&&t&&!t.nodeType&&t,M=W&&W.exports===R;function D(t,e){return t.set(e[0],e[1]),t}function H(t,e){return t.add(e),t}function K(t,e,n,r){var o=-1,i=t?t.length:0;for(r&&i&&(n=t[++o]);++o<i;)n=e(n,t[o],o,t);return n}function V(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function J(t){var e=-1,n=Array(t.size);return t.forEach(function(t,r){n[++e]=[r,t]}),n}function F(t,e){return function(n){return t(e(n))}}function B(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}var q,U=Array.prototype,z=Function.prototype,G=Object.prototype,Q=P["__core-js_shared__"],Z=(q=/[^.]+$/.exec(Q&&Q.keys&&Q.keys.IE_PROTO||""))?"Symbol(src)_1."+q:"",X=z.toString,Y=G.hasOwnProperty,tt=G.toString,et=RegExp("^"+X.call(Y).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),nt=M?P.Buffer:void 0,rt=P.Symbol,ot=P.Uint8Array,it=F(Object.getPrototypeOf,Object),at=Object.create,ct=G.propertyIsEnumerable,st=U.splice,ut=Object.getOwnPropertySymbols,ft=nt?nt.isBuffer:void 0,lt=F(Object.keys,Object),pt=Wt(P,"DataView"),ht=Wt(P,"Map"),yt=Wt(P,"Promise"),gt=Wt(P,"Set"),dt=Wt(P,"WeakMap"),bt=Wt(Object,"create"),vt=Vt(pt),mt=Vt(ht),_t=Vt(yt),wt=Vt(gt),Tt=Vt(dt),Ot=rt?rt.prototype:void 0,jt=Ot?Ot.valueOf:void 0;function St(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function $t(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function It(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function At(t){this.__data__=new $t(t)}function xt(t,e){var n=Ft(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Bt(t)}(t)&&Y.call(t,"callee")&&(!ct.call(t,"callee")||tt.call(t)==a)}(t)?function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}(t.length,String):[],r=n.length,o=!!r;for(var i in t)!e&&!Y.call(t,i)||o&&("length"==i||Ht(i,r))||n.push(i);return n}function Ct(t,e,n){var r=t[e];Y.call(t,e)&&Jt(r,n)&&(void 0!==n||e in t)||(t[e]=n)}function Et(t,e){for(var n=t.length;n--;)if(Jt(t[n][0],e))return n;return-1}function kt(t,e,n,r,o,i,C){var E;if(r&&(E=i?r(t,o,i,C):r(t)),void 0!==E)return E;if(!zt(t))return t;var L=Ft(t);if(L){if(E=function(t){var e=t.length,n=t.constructor(e);e&&"string"==typeof t[0]&&Y.call(t,"index")&&(n.index=t.index,n.input=t.input);return n}(t),!e)return function(t,e){var n=-1,r=t.length;e||(e=Array(r));for(;++n<r;)e[n]=t[n];return e}(t,E)}else{var N=Dt(t),P=N==u||N==f;if(qt(t))return function(t,e){if(e)return t.slice();var n=new t.constructor(t.length);return t.copy(n),n}(t,e);if(N==h||N==a||P&&!i){if(V(t))return i?t:{};if(E=function(t){return"function"!=typeof t.constructor||Kt(t)?{}:(e=it(t),zt(e)?at(e):{});var e}(P?{}:t),!e)return function(t,e){return Pt(t,Mt(t),e)}(t,function(t,e){return t&&Pt(e,Gt(e),t)}(E,t))}else{if(!k[N])return i?t:{};E=function(t,e,n,r){var o=t.constructor;switch(e){case v:return Nt(t);case c:case s:return new o(+t);case m:return function(t,e){var n=e?Nt(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}(t,r);case _:case w:case T:case O:case j:case S:case $:case I:case A:return function(t,e){var n=e?Nt(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}(t,r);case l:return function(t,e,n){return K(e?n(J(t),!0):J(t),D,new t.constructor)}(t,r,n);case p:case d:return new o(t);case y:return(u=new(a=t).constructor(a.source,x.exec(a))).lastIndex=a.lastIndex,u;case g:return function(t,e,n){return K(e?n(B(t),!0):B(t),H,new t.constructor)}(t,r,n);case b:return i=t,jt?Object(jt.call(i)):{}}var i;var a,u}(t,N,kt,e)}}C||(C=new At);var R=C.get(t);if(R)return R;if(C.set(t,E),!L)var W=n?function(t){return function(t,e,n){var r=e(t);return Ft(t)?r:function(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}(r,n(t))}(t,Gt,Mt)}(t):Gt(t);return function(t,e){for(var n=-1,r=t?t.length:0;++n<r&&!1!==e(t[n],n,t););}(W||t,function(o,i){W&&(o=t[i=o]),Ct(E,i,kt(o,e,n,r,i,t,C))}),E}function Lt(t){return!(!zt(t)||(e=t,Z&&Z in e))&&(Ut(t)||V(t)?et:C).test(Vt(t));var e}function Nt(t){var e=new t.constructor(t.byteLength);return new ot(e).set(new ot(t)),e}function Pt(t,e,n,r){n||(n={});for(var o=-1,i=e.length;++o<i;){var a=e[o],c=r?r(n[a],t[a],a,n,t):void 0;Ct(n,a,void 0===c?t[a]:c)}return n}function Rt(t,e){var n,r,o=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof e?"string":"hash"]:o.map}function Wt(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return Lt(n)?n:void 0}St.prototype.clear=function(){this.__data__=bt?bt(null):{}},St.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},St.prototype.get=function(t){var e=this.__data__;if(bt){var n=e[t];return n===o?void 0:n}return Y.call(e,t)?e[t]:void 0},St.prototype.has=function(t){var e=this.__data__;return bt?void 0!==e[t]:Y.call(e,t)},St.prototype.set=function(t,e){return this.__data__[t]=bt&&void 0===e?o:e,this},$t.prototype.clear=function(){this.__data__=[]},$t.prototype.delete=function(t){var e=this.__data__,n=Et(e,t);return!(n<0||(n==e.length-1?e.pop():st.call(e,n,1),0))},$t.prototype.get=function(t){var e=this.__data__,n=Et(e,t);return n<0?void 0:e[n][1]},$t.prototype.has=function(t){return Et(this.__data__,t)>-1},$t.prototype.set=function(t,e){var n=this.__data__,r=Et(n,t);return r<0?n.push([t,e]):n[r][1]=e,this},It.prototype.clear=function(){this.__data__={hash:new St,map:new(ht||$t),string:new St}},It.prototype.delete=function(t){return Rt(this,t).delete(t)},It.prototype.get=function(t){return Rt(this,t).get(t)},It.prototype.has=function(t){return Rt(this,t).has(t)},It.prototype.set=function(t,e){return Rt(this,t).set(t,e),this},At.prototype.clear=function(){this.__data__=new $t},At.prototype.delete=function(t){return this.__data__.delete(t)},At.prototype.get=function(t){return this.__data__.get(t)},At.prototype.has=function(t){return this.__data__.has(t)},At.prototype.set=function(t,e){var n=this.__data__;if(n instanceof $t){var o=n.__data__;if(!ht||o.length<r-1)return o.push([t,e]),this;n=this.__data__=new It(o)}return n.set(t,e),this};var Mt=ut?F(ut,Object):function(){return[]},Dt=function(t){return tt.call(t)};function Ht(t,e){return!!(e=null==e?i:e)&&("number"==typeof t||E.test(t))&&t>-1&&t%1==0&&t<e}function Kt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||G)}function Vt(t){if(null!=t){try{return X.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Jt(t,e){return t===e||t!=t&&e!=e}(pt&&Dt(new pt(new ArrayBuffer(1)))!=m||ht&&Dt(new ht)!=l||yt&&"[object Promise]"!=Dt(yt.resolve())||gt&&Dt(new gt)!=g||dt&&"[object WeakMap]"!=Dt(new dt))&&(Dt=function(t){var e=tt.call(t),n=e==h?t.constructor:void 0,r=n?Vt(n):void 0;if(r)switch(r){case vt:return m;case mt:return l;case _t:return"[object Promise]";case wt:return g;case Tt:return"[object WeakMap]"}return e});var Ft=Array.isArray;function Bt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=i}(t.length)&&!Ut(t)}var qt=ft||function(){return!1};function Ut(t){var e=zt(t)?tt.call(t):"";return e==u||e==f}function zt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function Gt(t){return Bt(t)?xt(t):function(t){if(!Kt(t))return lt(t);var e=[];for(var n in Object(t))Y.call(t,n)&&"constructor"!=n&&e.push(n);return e}(t)}t.exports=function(t){return kt(t,!0,!0)}}),l="[object Object]";var p,h,y=Function.prototype,g=Object.prototype,d=y.toString,b=g.hasOwnProperty,v=d.call(Object),m=g.toString,_=(p=Object.getPrototypeOf,h=Object,function(t){return p(h(t))});var w=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||m.call(t)!=l||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=_(t);if(null===e)return!0;var n=b.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&d.call(n)==v};const T=Array.isArray;function O(t){return"string"==typeof t&&t.length>0&&"."===t[0]?t.slice(1):t}function j(t,e){return function t(e,n,r){const o=f(e);let i,a,c,s,u;if((r=Object.assign({depth:-1,path:""},r)).depth+=1,T(o))for(i=0,a=o.length;i<a;i++){const e=`${r.path}.${i}`;void 0!==o[i]?(r.parent=f(o),c=t(n(o[i],void 0,Object.assign({},r,{path:O(e)})),n,Object.assign({},r,{path:O(e)})),Number.isNaN(c)&&i<o.length?(o.splice(i,1),i-=1):o[i]=c):o.splice(i,1)}else if(w(o))for(i=0,a=(s=Object.keys(o)).length;i<a;i++){u=s[i];const e=`${r.path}.${u}`;0===r.depth&&null!=u&&(r.topmostKey=u),r.parent=f(o),c=t(n(u,o[u],Object.assign({},r,{path:O(e)})),n,Object.assign({},r,{path:O(e)})),Number.isNaN(c)?delete o[u]:o[u]=c}return o}(t,e,{})}var S="__lodash_hash_undefined__",$=9007199254740991,I="[object Function]",A="[object GeneratorFunction]",x=/^\[object .+?Constructor\]$/,C="object"==typeof e&&e&&e.Object===Object&&e,E="object"==typeof self&&self&&self.Object===Object&&self,k=C||E||Function("return this")();function L(t,e){return!!(t?t.length:0)&&function(t,e,n){if(e!=e)return function(t,e,n,r){var o=t.length,i=n+(r?1:-1);for(;r?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,R,n);var r=n-1,o=t.length;for(;++r<o;)if(t[r]===e)return r;return-1}(t,e,0)>-1}function N(t,e,n){for(var r=-1,o=t?t.length:0;++r<o;)if(n(e,t[r]))return!0;return!1}function P(t,e){for(var n=-1,r=t?t.length:0,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}function R(t){return t!=t}function W(t){return function(e){return t(e)}}function M(t,e){return t.has(e)}var D,H=Array.prototype,K=Function.prototype,V=Object.prototype,J=k["__core-js_shared__"],F=(D=/[^.]+$/.exec(J&&J.keys&&J.keys.IE_PROTO||""))?"Symbol(src)_1."+D:"",B=K.toString,q=V.hasOwnProperty,U=V.toString,z=RegExp("^"+B.call(q).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),G=H.splice,Q=Math.max,Z=Math.min,X=st(k,"Map"),Y=st(Object,"create");function tt(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function et(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function nt(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function rt(t){var e=-1,n=t?t.length:0;for(this.__data__=new nt;++e<n;)this.add(t[e])}function ot(t,e){for(var n,r,o=t.length;o--;)if((n=t[o][0])===(r=e)||n!=n&&r!=r)return o;return-1}function it(t){return!(!ft(t)||(e=t,F&&F in e))&&(ut(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?z:x).test(function(t){if(null!=t){try{return B.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t));var e}function at(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&function(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=$}(t.length)&&!ut(t)}(t)}(t)?t:[]}function ct(t,e){var n,r,o=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof e?"string":"hash"]:o.map}function st(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return it(n)?n:void 0}function ut(t){var e=ft(t)?U.call(t):"";return e==I||e==A}function ft(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}tt.prototype.clear=function(){this.__data__=Y?Y(null):{}},tt.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},tt.prototype.get=function(t){var e=this.__data__;if(Y){var n=e[t];return n===S?void 0:n}return q.call(e,t)?e[t]:void 0},tt.prototype.has=function(t){var e=this.__data__;return Y?void 0!==e[t]:q.call(e,t)},tt.prototype.set=function(t,e){return this.__data__[t]=Y&&void 0===e?S:e,this},et.prototype.clear=function(){this.__data__=[]},et.prototype.delete=function(t){var e=this.__data__,n=ot(e,t);return!(n<0||(n==e.length-1?e.pop():G.call(e,n,1),0))},et.prototype.get=function(t){var e=this.__data__,n=ot(e,t);return n<0?void 0:e[n][1]},et.prototype.has=function(t){return ot(this.__data__,t)>-1},et.prototype.set=function(t,e){var n=this.__data__,r=ot(n,t);return r<0?n.push([t,e]):n[r][1]=e,this},nt.prototype.clear=function(){this.__data__={hash:new tt,map:new(X||et),string:new tt}},nt.prototype.delete=function(t){return ct(this,t).delete(t)},nt.prototype.get=function(t){return ct(this,t).get(t)},nt.prototype.has=function(t){return ct(this,t).has(t)},nt.prototype.set=function(t,e){return ct(this,t).set(t,e),this},rt.prototype.add=rt.prototype.push=function(t){return this.__data__.set(t,S),this},rt.prototype.has=function(t){return this.__data__.has(t)};var lt=function(t,e){return e=Q(void 0===e?t.length-1:e,0),function(){for(var n=arguments,r=-1,o=Q(n.length-e,0),i=Array(o);++r<o;)i[r]=n[e+r];r=-1;for(var a=Array(e+1);++r<e;)a[r]=n[r];return a[e]=i,function(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}(t,this,a)}}(function(t){var e=P(t,at);return e.length&&e[0]===t[0]?function(t,e,n){for(var r=n?N:L,o=t[0].length,i=t.length,a=i,c=Array(i),s=1/0,u=[];a--;){var f=t[a];a&&e&&(f=P(f,W(e))),s=Z(f.length,s),c[a]=!n&&(e||o>=120&&f.length>=120)?new rt(a&&f):void 0}f=t[0];var l=-1,p=c[0];t:for(;++l<o&&u.length<s;){var h=f[l],y=e?e(h):h;if(h=n||0!==h?h:0,!(p?M(p,y):r(u,y,n))){for(a=i;--a;){var g=c[a];if(!(g?M(g,y):r(t[a],y,n)))continue t}p&&p.push(y),u.push(h)}}return u}(e):[]});function pt(t){return"string"==typeof t?t.length>0?[t]:[]:t}var ht=n(function(t){t.exports=function(){var t=Object.prototype.toString;function e(t,e){return null!=t&&Object.prototype.hasOwnProperty.call(t,e)}function n(t){if(!t)return!0;if(o(t)&&0===t.length)return!0;if("string"!=typeof t){for(var n in t)if(e(t,n))return!1;return!0}return!1}function r(e){return t.call(e)}var o=Array.isArray||function(e){return"[object Array]"===t.call(e)};function i(t){var e=parseInt(t);return e.toString()===t?e:t}function a(t){t=t||{};var a=function(t){return Object.keys(a).reduce(function(e,n){return"create"===n?e:("function"==typeof a[n]&&(e[n]=a[n].bind(a,t)),e)},{})};function c(n,r){return t.includeInheritedProps||"number"==typeof r&&Array.isArray(n)||e(n,r)}function s(t,e){if(c(t,e))return t[e]}function u(t,e,n,r){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if("string"==typeof e)return u(t,e.split(".").map(i),n,r);var o=e[0],a=s(t,o);return 1===e.length?(void 0!==a&&r||(t[o]=n),a):(void 0===a&&("number"==typeof e[1]?t[o]=[]:t[o]={}),u(t[o],e.slice(1),n,r))}return a.has=function(n,r){if("number"==typeof r?r=[r]:"string"==typeof r&&(r=r.split(".")),!r||0===r.length)return!!n;for(var a=0;a<r.length;a++){var c=i(r[a]);if(!("number"==typeof c&&o(n)&&c<n.length||(t.includeInheritedProps?c in Object(n):e(n,c))))return!1;n=n[c]}return!0},a.ensureExists=function(t,e,n){return u(t,e,n,!0)},a.set=function(t,e,n,r){return u(t,e,n,r)},a.insert=function(t,e,n,r){var i=a.get(t,e);r=~~r,o(i)||(i=[],a.set(t,e,i)),i.splice(r,0,n)},a.empty=function(t,e){var i,s;if(!n(e)&&null!=t&&(i=a.get(t,e))){if("string"==typeof i)return a.set(t,e,"");if(function(t){return"boolean"==typeof t||"[object Boolean]"===r(t)}(i))return a.set(t,e,!1);if("number"==typeof i)return a.set(t,e,0);if(o(i))i.length=0;else{if(!function(t){return"object"==typeof t&&"[object Object]"===r(t)}(i))return a.set(t,e,null);for(s in i)c(i,s)&&delete i[s]}}},a.push=function(t,e){var n=a.get(t,e);o(n)||(n=[],a.set(t,e,n)),n.push.apply(n,Array.prototype.slice.call(arguments,2))},a.coalesce=function(t,e,n){for(var r,o=0,i=e.length;o<i;o++)if(void 0!==(r=a.get(t,e[o])))return r;return n},a.get=function(t,e,n){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if(null==t)return n;if("string"==typeof e)return a.get(t,e.split("."),n);var r=i(e[0]),o=s(t,r);return void 0===o?n:1===e.length?o:a.get(t[r],e.slice(1),n)},a.del=function(t,e){if("number"==typeof e&&(e=[e]),null==t)return t;if(n(e))return t;if("string"==typeof e)return a.del(t,e.split("."));var r=i(e[0]);return c(t,r)?1!==e.length?a.del(t[r],e.slice(1)):(o(t)?t.splice(r,1):delete t[r],t):t},a}var c=a();return c.create=a,c.withInheritedProps=a({includeInheritedProps:!0}),c}()}),yt=function(t){var e=t%100;if(e>=10&&e<=20)return"th";var n=t%10;return 1===n?"st":2===n?"nd":3===n?"rd":"th"};function gt(t){if("number"!=typeof t)throw new TypeError("Expected Number, got "+typeof t+" "+t);return t+yt(t)}gt.indicator=yt;var dt=gt,bt=/[|\\{}()[\]^$+*?.]/g,vt=function(t){if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(bt,"\\$&")};const mt=new Map;function _t(t,e){const n=Object.assign({caseSensitive:!1},e),r=t+JSON.stringify(n);if(mt.has(r))return mt.get(r);const o="!"===t[0];o&&(t=t.slice(1)),t=vt(t).replace(/\\\*/g,".*");const i=new RegExp(`^${t}$`,n.caseSensitive?"":"i");return i.negated=o,mt.set(r,i),i}var wt=(t,e,n)=>{if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError(`Expected two arrays, got ${typeof t} ${typeof e}`);if(0===e.length)return t;const r="!"===e[0][0];e=e.map(t=>_t(t,n));const o=[];for(const n of t){let t=r;for(const r of e)r.test(n)&&(t=!r.negated);t&&o.push(n)}return o};function Tt(t,e,n){return function t(e,n,o,i=!0){const a=Object.prototype.hasOwnProperty;function c(t){return null!=t}function s(t){return"Object"===r(t)}function f(t,e){return e=pt(e),Array.from(t).filter(t=>!e.some(e=>wt.isMatch(t,e,{caseSensitive:!0})))}const l=["any","anything","every","everything","all","whatever","whatevs"],p=Array.isArray;if(!c(e))throw new Error("check-types-mini: [THROW_ID_01] First argument is missing!");const h={ignoreKeys:[],ignorePaths:[],acceptArrays:!1,acceptArraysIgnore:[],enforceStrictKeyset:!0,schema:{},msg:"check-types-mini",optsVarName:"opts"};let y;if(y=c(o)&&s(o)?Object.assign({},h,o):Object.assign({},h),c(y.ignoreKeys)&&y.ignoreKeys?y.ignoreKeys=pt(y.ignoreKeys):y.ignoreKeys=[],c(y.ignorePaths)&&y.ignorePaths?y.ignorePaths=pt(y.ignorePaths):y.ignorePaths=[],c(y.acceptArraysIgnore)&&y.acceptArraysIgnore?y.acceptArraysIgnore=pt(y.acceptArraysIgnore):y.acceptArraysIgnore=[],y.msg="string"==typeof y.msg?y.msg.trim():y.msg,":"===y.msg[y.msg.length-1]&&(y.msg=y.msg.slice(0,y.msg.length-1).trim()),y.schema&&(Object.keys(y.schema).forEach(t=>{if(s(y.schema[t])){const e={};j(y.schema[t],(n,r,o)=>{const i=void 0!==r?r:n;return p(i)||s(i)||(e[`${t}.${o.path}`]=i),i}),delete y.schema[t],y.schema=Object.assign(y.schema,e)}}),Object.keys(y.schema).forEach(t=>{p(y.schema[t])||(y.schema[t]=[y.schema[t]]),y.schema[t]=y.schema[t].map(String).map(t=>t.toLowerCase()).map(t=>t.trim())})),c(n)||(n={}),i&&t(y,h,{enforceStrictKeyset:!1},!1),y.enforceStrictKeyset)if(c(y.schema)&&Object.keys(y.schema).length>0){if(0!==f(u(Object.keys(e),Object.keys(n).concat(Object.keys(y.schema))),y.ignoreKeys).length){const t=u(Object.keys(e),Object.keys(n).concat(Object.keys(y.schema)));throw new TypeError(`${y.msg}: ${y.optsVarName}.enforceStrictKeyset is on and the following key${t.length>1?"s":""} ${t.length>1?"are":"is"} not covered by schema and/or reference objects: ${t.join(", ")}`)}}else{if(!(c(n)&&Object.keys(n).length>0))throw new TypeError(`${y.msg}: Both ${y.optsVarName}.schema and reference objects are missing! We don't have anything to match the keys as you requested via opts.enforceStrictKeyset!`);if(0!==f(u(Object.keys(e),Object.keys(n)),y.ignoreKeys).length){const t=u(Object.keys(e),Object.keys(n));throw new TypeError(`${y.msg}: The input object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not covered by the reference object: ${t.join(", ")}`)}if(0!==f(u(Object.keys(n),Object.keys(e)),y.ignoreKeys).length){const t=u(Object.keys(n),Object.keys(e));throw new TypeError(`${y.msg}: The reference object has key${t.length>1?"s":""} which ${t.length>1?"are":"is"} not present in the input object: ${t.join(", ")}`)}}const g=[];j(e,(t,o,i)=>{const c=void 0!==o?o:t,u=void 0!==o?t:void 0;if(p(g)&&g.length&&g.some(t=>i.path.startsWith(t)))return c;if(u&&y.ignoreKeys.some(t=>wt.isMatch(u,t)))return c;if(y.ignorePaths.some(t=>wt.isMatch(i.path,t)))return c;const f=!(!s(c)&&!p(c)&&p(i.parent));let h=!1;s(y.schema)&&a.call(y.schema,ht.get(i.path))&&(h=!0);let d=!1;if(s(n)&&ht.has(n,ht.get(i.path))&&(d=!0),y.enforceStrictKeyset&&f&&!h&&!d)throw new TypeError(`${y.msg}: ${y.optsVarName}.${i.path} is neither covered by reference object (second input argument), nor ${y.optsVarName}.schema! To stop this error, turn off ${y.optsVarName}.enforceStrictKeyset or provide some type reference (2nd argument or ${y.optsVarName}.schema).\n\nDebug info:\n\nobj = ${JSON.stringify(e,null,4)}\n\nref = ${JSON.stringify(n,null,4)}\n\ninnerObj = ${JSON.stringify(i,null,4)}\n\nopts = ${JSON.stringify(y,null,4)}\n\ncurrent = ${JSON.stringify(c,null,4)}\n\n`);if(h){const t=pt(y.schema[i.path]).map(String).map(t=>t.toLowerCase());if(ht.set(y.schema,i.path,t),lt(t,l).length)g.push(i.path);else if(!0!==c&&!1!==c&&!t.includes(r(c).toLowerCase())||(!0===c||!1===c)&&!t.includes(String(c))&&!t.includes("boolean")){if(!p(c)||!y.acceptArrays)throw new TypeError(`${y.msg}: ${y.optsVarName}.${i.path} was customised to ${"string"!==r(c)?'"':""}${JSON.stringify(c,null,0)}${"string"!==r(c)?'"':""} (type: ${r(c).toLowerCase()}) which is not among the allowed types in schema (which is equal to ${JSON.stringify(t,null,0)})`);for(let e=0,n=c.length;e<n;e++)if(!t.includes(r(c[e]).toLowerCase()))throw new TypeError(`${y.msg}: ${y.optsVarName}.${i.path}.${e}, the ${dt(e+1)} element (equal to ${JSON.stringify(c[e],null,0)}) is of a type ${r(c[e]).toLowerCase()}, but only the following are allowed by the ${y.optsVarName}.schema: ${t.join(", ")}`)}}else if(d){const e=ht.get(n,i.path);if(y.acceptArrays&&p(c)&&!y.acceptArraysIgnore.includes(t)){if(!c.every(e=>r(e).toLowerCase()===r(n[t]).toLowerCase()))throw new TypeError(`${y.msg}: ${y.optsVarName}.${i.path} was customised to be array, but not all of its elements are ${r(n[t]).toLowerCase()}-type`)}else if(r(c)!==r(e))throw new TypeError(`${y.msg}: ${y.optsVarName}.${i.path} was customised to ${"string"===r(c).toLowerCase()?"":'"'}${JSON.stringify(c,null,0)}${"string"===r(c).toLowerCase()?"":'"'} which is not ${r(e).toLowerCase()} but ${r(c).toLowerCase()}`)}return c})}(t,e,n)}wt.isMatch=((t,e,n)=>{const r=_t(e,n),o=r.test(t);return r.negated?!o:o});var Ot="[object Object]";var jt=Function.prototype,St=Object.prototype,$t=jt.toString,It=St.hasOwnProperty,At=$t.call(Object),xt=St.toString,Ct=function(t,e){return function(n){return t(e(n))}}(Object.getPrototypeOf,Object);var Et=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||xt.call(t)!=Ot||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=Ct(t);if(null===e)return!0;var n=It.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&$t.call(n)==At},kt=Array.isArray;return function(e){var n,r=/^[0-9a-zA-Z]+$/;function o(t){return!(!t||"string"!=typeof t)&&0===t.trim().length}function i(t){return"string"==typeof t}if(!Et(e))throw n=void 0===e?"but it is missing completely.":null===e?"but it was given as null.":"but it was given as ".concat(t(e),", equal to:\n").concat(JSON.stringify(e,null,4),"."),new Error("string-range-expander: [THROW_ID_01] Input must be a plain object ".concat(n));if(Et(e)&&0===Object.keys(e).length)throw new Error("string-range-expander: [THROW_ID_02] Input must be a plain object but it was given as a plain object without any keys and computer doesn't know what to expand.");if("number"!=typeof e.from)throw new Error("string-range-expander: [THROW_ID_03] The input's \"from\" value opts.from, is not a number! Currently it's given as ".concat(t(e.from),", equal to ").concat(JSON.stringify(e.from,null,0)));if("number"!=typeof e.to)throw new Error("string-range-expander: [THROW_ID_04] The input's \"to\" value opts.to, is not a number! Currently it's given as ".concat(t(e.to),", equal to ").concat(JSON.stringify(e.to,null,0)));if(!e.str[e.from]&&e.from!==e.to)throw new Error('string-range-expander: [THROW_ID_05] The given input string opts.str ("'.concat(e.str,'") must contain the character at index "from" ("').concat(e.from,'")'));if(!e.str[e.to-1])throw new Error('string-range-expander: [THROW_ID_06] The given input string, opts.str ("'.concat(e.str,'") must contain the character at index before "to" ("').concat(e.to-1,'")'));if(e.from>e.to)throw new Error('string-range-expander: [THROW_ID_07] The given "from" index, "'.concat(e.from,'" is greater than "to" index, "').concat(e.to,"\". That's wrong!"));if(i(e.extendToOneSide)&&"left"!==e.extendToOneSide&&"right"!==e.extendToOneSide||!i(e.extendToOneSide)&&void 0!==e.extendToOneSide&&!1!==e.extendToOneSide)throw new Error("string-range-expander: [THROW_ID_08] The opts.extendToOneSide value is not recogniseable! It's set to: \"".concat(e.extendToOneSide,'" (').concat(t(e.extendToOneSide),'). It has to be either Boolean "false" or strings "left" or "right"'));var a={str:"",from:0,to:0,ifLeftSideIncludesThisThenCropTightly:"",ifLeftSideIncludesThisCropItToo:"",ifRightSideIncludesThisThenCropTightly:"",ifRightSideIncludesThisCropItToo:"",extendToOneSide:!1,wipeAllWhitespaceOnLeft:!1,wipeAllWhitespaceOnRight:!1,addSingleSpaceToPreventAccidentalConcatenation:!1},c=Object.assign({},a,e);if(Tt(c,a,{msg:"string-trim-spaces-only: [THROW_ID_19*]",acceptArrays:!0,acceptArraysIgnore:["str","from","to","extendToOneSide"],schema:{extendToOneSide:["false","string"]}}),kt(c.ifLeftSideIncludesThisThenCropTightly)){var s,u;if(!c.ifLeftSideIncludesThisThenCropTightly.every(function(t,e){return!!i(t)||(s=e,u=t,!1)}))throw new Error("string-range-expander: [THROW_ID_09] The opts.ifLeftSideIncludesThisThenCropTightly was set to an array:\n".concat(JSON.stringify(c.ifLeftSideIncludesThisThenCropTightly,null,4),". Now, that array contains not only string elements. For example, an element at index ").concat(s," is of a type ").concat(t(u)," (equal to ").concat(JSON.stringify(u,null,0),")."));c.ifLeftSideIncludesThisThenCropTightly=c.ifLeftSideIncludesThisThenCropTightly.join("")}var f=c.str,l=c.from,p=c.to;if("right"!==c.extendToOneSide&&(o(f[l-1])&&(o(f[l-2])||c.ifLeftSideIncludesThisCropItToo.includes(f[l-2]))||f[l-1]&&c.ifLeftSideIncludesThisCropItToo.includes(f[l-1])||c.wipeAllWhitespaceOnLeft&&o(f[l-1])))for(var h=l;h--;)if(!c.ifLeftSideIncludesThisCropItToo.includes(f[h])){if(f[h].trim().length){l=c.wipeAllWhitespaceOnLeft||c.ifLeftSideIncludesThisCropItToo.includes(f[h+1])?h+1:h+2;break}if(0===h){l=c.wipeAllWhitespaceOnLeft?0:1;break}}if("left"!==c.extendToOneSide&&(o(f[p])&&(c.wipeAllWhitespaceOnRight||o(f[p+1]))||c.ifRightSideIncludesThisCropItToo.includes(f[p])))for(var y=p,g=f.length;y<g;y++)if(!c.ifRightSideIncludesThisCropItToo.includes(f[y])&&(f[y]&&f[y].trim().length||void 0===f[y])){p=c.wipeAllWhitespaceOnRight||c.ifRightSideIncludesThisCropItToo.includes(f[y-1])?y:y-1;break}return("right"!==c.extendToOneSide&&i(c.ifLeftSideIncludesThisThenCropTightly)&&c.ifLeftSideIncludesThisThenCropTightly.length&&(f[l-2]&&c.ifLeftSideIncludesThisThenCropTightly.includes(f[l-2])||f[l-1]&&c.ifLeftSideIncludesThisThenCropTightly.includes(f[l-1]))||"left"!==c.extendToOneSide&&i(c.ifRightSideIncludesThisThenCropTightly)&&c.ifRightSideIncludesThisThenCropTightly.length&&(f[p+1]&&c.ifRightSideIncludesThisThenCropTightly.includes(f[p+1])||f[p]&&c.ifRightSideIncludesThisThenCropTightly.includes(f[p])))&&("right"!==c.extendToOneSide&&o(f[l-1])&&!c.wipeAllWhitespaceOnLeft&&l--,"left"!==c.extendToOneSide&&o(f[p])&&!c.wipeAllWhitespaceOnRight&&p++),c.addSingleSpaceToPreventAccidentalConcatenation&&f[l-1]&&f[l-1].trim().length&&f[p]&&f[p].trim().length&&(!c.ifLeftSideIncludesThisThenCropTightly&&!c.ifRightSideIncludesThisThenCropTightly||c.ifLeftSideIncludesThisThenCropTightly&&!c.ifLeftSideIncludesThisThenCropTightly.includes(f[l-1])||!(!c.ifRightSideIncludesThisThenCropTightly||f[p]&&c.ifRightSideIncludesThisThenCropTightly.includes(f[p])))&&(r.test(f[l-1])||r.test(f[p]))?[l,p," "]:[l,p]}});
