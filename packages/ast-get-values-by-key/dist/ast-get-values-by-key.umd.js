/**
 * ast-get-values-by-key
 * Read or edit parsed HTML (or AST in general)
 * Version: 2.6.41
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ast-get-values-by-key
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).astGetValuesByKey=e()}(this,function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var r=function(t,e){return t(e={exports:{}},e.exports),e.exports}(function(t,r){var n=200,o="__lodash_hash_undefined__",c=9007199254740991,a="[object Arguments]",i="[object Boolean]",u="[object Date]",s="[object Function]",f="[object GeneratorFunction]",l="[object Map]",p="[object Number]",y="[object Object]",h="[object RegExp]",v="[object Set]",_="[object String]",b="[object Symbol]",d="[object ArrayBuffer]",g="[object DataView]",j="[object Float32Array]",w="[object Float64Array]",O="[object Int8Array]",m="[object Int16Array]",A="[object Int32Array]",S="[object Uint8Array]",x="[object Uint8ClampedArray]",$="[object Uint16Array]",E="[object Uint32Array]",T=/\w*$/,k=/^\[object .+?Constructor\]$/,I=/^(?:0|[1-9]\d*)$/,N={};N[a]=N["[object Array]"]=N[d]=N[g]=N[i]=N[u]=N[j]=N[w]=N[O]=N[m]=N[A]=N[l]=N[p]=N[y]=N[h]=N[v]=N[_]=N[b]=N[S]=N[x]=N[$]=N[E]=!0,N["[object Error]"]=N[s]=N["[object WeakMap]"]=!1;var P="object"==typeof e&&e&&e.Object===Object&&e,M="object"==typeof self&&self&&self.Object===Object&&self,F=P||M||Function("return this")(),R=r&&!r.nodeType&&r,W=R&&t&&!t.nodeType&&t,D=W&&W.exports===R;function B(t,e){return t.set(e[0],e[1]),t}function U(t,e){return t.add(e),t}function H(t,e,r,n){var o=-1,c=t?t.length:0;for(n&&c&&(r=t[++o]);++o<c;)r=e(r,t[o],o,t);return r}function C(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function J(t){var e=-1,r=Array(t.size);return t.forEach(function(t,n){r[++e]=[n,t]}),r}function V(t,e){return function(r){return t(e(r))}}function z(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r}var G,K=Array.prototype,L=Function.prototype,q=Object.prototype,Q=F["__core-js_shared__"],X=(G=/[^.]+$/.exec(Q&&Q.keys&&Q.keys.IE_PROTO||""))?"Symbol(src)_1."+G:"",Y=L.toString,Z=q.hasOwnProperty,tt=q.toString,et=RegExp("^"+Y.call(Z).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rt=D?F.Buffer:void 0,nt=F.Symbol,ot=F.Uint8Array,ct=V(Object.getPrototypeOf,Object),at=Object.create,it=q.propertyIsEnumerable,ut=K.splice,st=Object.getOwnPropertySymbols,ft=rt?rt.isBuffer:void 0,lt=V(Object.keys,Object),pt=Wt(F,"DataView"),yt=Wt(F,"Map"),ht=Wt(F,"Promise"),vt=Wt(F,"Set"),_t=Wt(F,"WeakMap"),bt=Wt(Object,"create"),dt=Ct(pt),gt=Ct(yt),jt=Ct(ht),wt=Ct(vt),Ot=Ct(_t),mt=nt?nt.prototype:void 0,At=mt?mt.valueOf:void 0;function St(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function xt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function $t(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Et(t){this.__data__=new xt(t)}function Tt(t,e){var r=Vt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&zt(t)}(t)&&Z.call(t,"callee")&&(!it.call(t,"callee")||tt.call(t)==a)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var c in t)!e&&!Z.call(t,c)||o&&("length"==c||Ut(c,n))||r.push(c);return r}function kt(t,e,r){var n=t[e];Z.call(t,e)&&Jt(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function It(t,e){for(var r=t.length;r--;)if(Jt(t[r][0],e))return r;return-1}function Nt(t,e,r,n,o,c,k){var I;if(n&&(I=c?n(t,o,c,k):n(t)),void 0!==I)return I;if(!Lt(t))return t;var P=Vt(t);if(P){if(I=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&Z.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,I)}else{var M=Bt(t),F=M==s||M==f;if(Gt(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(M==y||M==a||F&&!c){if(C(t))return c?t:{};if(I=function(t){return"function"!=typeof t.constructor||Ht(t)?{}:(e=ct(t),Lt(e)?at(e):{});var e}(F?{}:t),!e)return function(t,e){return Ft(t,Dt(t),e)}(t,function(t,e){return t&&Ft(e,qt(e),t)}(I,t))}else{if(!N[M])return c?t:{};I=function(t,e,r,n){var o=t.constructor;switch(e){case d:return Mt(t);case i:case u:return new o(+t);case g:return function(t,e){var r=e?Mt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,n);case j:case w:case O:case m:case A:case S:case x:case $:case E:return function(t,e){var r=e?Mt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,n);case l:return function(t,e,r){return H(e?r(J(t),!0):J(t),B,new t.constructor)}(t,n,r);case p:case _:return new o(t);case h:return(s=new(a=t).constructor(a.source,T.exec(a))).lastIndex=a.lastIndex,s;case v:return function(t,e,r){return H(e?r(z(t),!0):z(t),U,new t.constructor)}(t,n,r);case b:return c=t,At?Object(At.call(c)):{}}var c;var a,s}(t,M,Nt,e)}}k||(k=new Et);var R=k.get(t);if(R)return R;if(k.set(t,I),!P)var W=r?function(t){return function(t,e,r){var n=e(t);return Vt(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,qt,Dt)}(t):qt(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}(W||t,function(o,c){W&&(o=t[c=o]),kt(I,c,Nt(o,e,r,n,c,t,k))}),I}function Pt(t){return!(!Lt(t)||(e=t,X&&X in e))&&(Kt(t)||C(t)?et:k).test(Ct(t));var e}function Mt(t){var e=new t.constructor(t.byteLength);return new ot(e).set(new ot(t)),e}function Ft(t,e,r,n){r||(r={});for(var o=-1,c=e.length;++o<c;){var a=e[o],i=n?n(r[a],t[a],a,r,t):void 0;kt(r,a,void 0===i?t[a]:i)}return r}function Rt(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function Wt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return Pt(r)?r:void 0}St.prototype.clear=function(){this.__data__=bt?bt(null):{}},St.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},St.prototype.get=function(t){var e=this.__data__;if(bt){var r=e[t];return r===o?void 0:r}return Z.call(e,t)?e[t]:void 0},St.prototype.has=function(t){var e=this.__data__;return bt?void 0!==e[t]:Z.call(e,t)},St.prototype.set=function(t,e){return this.__data__[t]=bt&&void 0===e?o:e,this},xt.prototype.clear=function(){this.__data__=[]},xt.prototype.delete=function(t){var e=this.__data__,r=It(e,t);return!(r<0||(r==e.length-1?e.pop():ut.call(e,r,1),0))},xt.prototype.get=function(t){var e=this.__data__,r=It(e,t);return r<0?void 0:e[r][1]},xt.prototype.has=function(t){return It(this.__data__,t)>-1},xt.prototype.set=function(t,e){var r=this.__data__,n=It(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},$t.prototype.clear=function(){this.__data__={hash:new St,map:new(yt||xt),string:new St}},$t.prototype.delete=function(t){return Rt(this,t).delete(t)},$t.prototype.get=function(t){return Rt(this,t).get(t)},$t.prototype.has=function(t){return Rt(this,t).has(t)},$t.prototype.set=function(t,e){return Rt(this,t).set(t,e),this},Et.prototype.clear=function(){this.__data__=new xt},Et.prototype.delete=function(t){return this.__data__.delete(t)},Et.prototype.get=function(t){return this.__data__.get(t)},Et.prototype.has=function(t){return this.__data__.has(t)},Et.prototype.set=function(t,e){var r=this.__data__;if(r instanceof xt){var o=r.__data__;if(!yt||o.length<n-1)return o.push([t,e]),this;r=this.__data__=new $t(o)}return r.set(t,e),this};var Dt=st?V(st,Object):function(){return[]},Bt=function(t){return tt.call(t)};function Ut(t,e){return!!(e=null==e?c:e)&&("number"==typeof t||I.test(t))&&t>-1&&t%1==0&&t<e}function Ht(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||q)}function Ct(t){if(null!=t){try{return Y.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Jt(t,e){return t===e||t!=t&&e!=e}(pt&&Bt(new pt(new ArrayBuffer(1)))!=g||yt&&Bt(new yt)!=l||ht&&"[object Promise]"!=Bt(ht.resolve())||vt&&Bt(new vt)!=v||_t&&"[object WeakMap]"!=Bt(new _t))&&(Bt=function(t){var e=tt.call(t),r=e==y?t.constructor:void 0,n=r?Ct(r):void 0;if(n)switch(n){case dt:return g;case gt:return l;case jt:return"[object Promise]";case wt:return v;case Ot:return"[object WeakMap]"}return e});var Vt=Array.isArray;function zt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=c}(t.length)&&!Kt(t)}var Gt=ft||function(){return!1};function Kt(t){var e=Lt(t)?tt.call(t):"";return e==s||e==f}function Lt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function qt(t){return zt(t)?Tt(t):function(t){if(!Ht(t))return lt(t);var e=[];for(var r in Object(t))Z.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}t.exports=function(t){return Nt(t,!0,!0)}}),n="[object Object]";var o,c,a=Function.prototype,i=Object.prototype,u=a.toString,s=i.hasOwnProperty,f=u.call(Object),l=i.toString,p=(o=Object.getPrototypeOf,c=Object,function(t){return o(c(t))});var y=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||l.call(t)!=n||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=p(t);if(null===e)return!0;var r=s.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&u.call(r)==f};const h=Array.isArray;function v(t){return"string"==typeof t&&t.length>0&&"."===t[0]?t.slice(1):t}const _=/[|\\{}()[\]^$+*?.-]/g;var b=t=>{if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(_,"\\$&")};const d=new Map;function g(t,e){e={caseSensitive:!1,...e};const r=t+JSON.stringify(e);if(d.has(r))return d.get(r);const n="!"===t[0];n&&(t=t.slice(1)),t=b(t).replace(/\\\*/g,".*");const o=new RegExp(`^${t}$`,e.caseSensitive?"":"i");return o.negated=n,d.set(r,o),o}var j=(t,e,r)=>{if(!Array.isArray(t)||!Array.isArray(e))throw new TypeError(`Expected two arrays, got ${typeof t} ${typeof e}`);if(0===e.length)return t;const n="!"===e[0][0];e=e.map(t=>g(t,r));const o=[];for(const r of t){let t=n;for(const n of e)n.test(r)&&(t=!n.negated);t&&o.push(r)}return o};j.isMatch=(t,e,r)=>{const n=g(e,r),o=n.test(t);return n.negated?!o:o};var w=Array.isArray;function O(t){return null!=t}return function(e,n,o){if(!O(e))throw new Error("ast-get-values-by-key: [THROW_ID_01] the first argument is missing!");if(!O(n))throw new Error("ast-get-values-by-key: [THROW_ID_02] the second argument is missing!");var c,a,i;if(w(n)){if(n.length&&n.some(function(t,e){return"string"!=typeof t&&(c=e,a=t,!0)}))throw new Error("ast-get-values-by-key: [THROW_ID_03] the second argument is array of values and not all of them are strings! For example, at index ".concat(c,", we have a value ").concat(JSON.stringify(a,null,0)," which is not string but ").concat(t(a),"!"))}else if("string"!=typeof n)throw new Error("ast-get-values-by-key: [THROW_ID_04] the second argument must be string! Currently it's of a type \"".concat(t(n),'", equal to:\n').concat(JSON.stringify(n,null,4)));O(o)&&(i="string"==typeof o?[o]:r(o));var u=[],s=function t(e,n,o){const c=r(e);let a,i,u,s,f;if((o=Object.assign({depth:-1,path:""},o)).depth+=1,h(c))for(a=0,i=c.length;a<i;a++){const e=`${o.path}.${a}`;void 0!==c[a]?(o.parent=r(c),o.parentType="array",u=t(n(c[a],void 0,Object.assign({},o,{path:v(e)})),n,Object.assign({},o,{path:v(e)})),Number.isNaN(u)&&a<c.length?(c.splice(a,1),a-=1):c[a]=u):c.splice(a,1)}else if(y(c))for(a=0,i=(s=Object.keys(c)).length;a<i;a++){f=s[a];const e=`${o.path}.${f}`;0===o.depth&&null!=f&&(o.topmostKey=f),o.parent=r(c),o.parentType="object",u=t(n(f,c[f],Object.assign({},o,{path:v(e)})),n,Object.assign({},o,{path:v(e)})),Number.isNaN(u)?delete c[f]:c[f]=u}return c}(e,function(t,e,r){var o=void 0!==e?e:t;if(void 0!==e&&j.isMatch(t,n,{caseSensitive:!0}))if(void 0===i)u.push({val:e,path:r.path});else if(i.length>0)return i.shift();return o},{});return void 0===i?u:s}});
