/**
 * ranges-apply
 * Take an array of string slice ranges, delete/replace the string according to them
 * Version: 3.0.45
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-apply
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).rangesApply=e()}(this,(function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}
/*!
   * is-natural-number-string | MIT (c) Shinnosuke Watanabe
   * https://github.com/shinnn/is-natural-number-string
  */var e=function(t,e){if("string"!=typeof t)return!1;if(e&&"includeZero"in e){if("boolean"!=typeof e.includeZero)throw new TypeError(String(e.includeZero)+" is neither true nor false. `includeZero` option must be a Boolean value.");if(e.includeZero)return/^(-?0|[1-9]\d*)(\.0+)?$/.test(t)}return/^[1-9]\d*(\.0+)?$/.test(t)},r=function(t,e){if(e){if("object"!=typeof e)throw new TypeError(String(e)+" is not an object. Expected an object that has boolean `includeZero` property.");if("includeZero"in e){if("boolean"!=typeof e.includeZero)throw new TypeError(String(e.includeZero)+" is neither true nor false. `includeZero` option must be a Boolean value.");if(e.includeZero&&0===t)return!0}}return Number.isSafeInteger(t)&&t>=1};
/*!
   * is-natural-number.js | MIT (c) Shinnosuke Watanabe
   * https://github.com/shinnn/is-natural-number.js
  */const n=Array.isArray;function o(t,e){if(!n(t))throw new TypeError(`ranges-sort: [THROW_ID_01] Input must be an array, consisting of range arrays! Currently its type is: ${typeof t}, equal to: ${JSON.stringify(t,null,4)}`);if(0===t.length)return t;const o=Object.assign({},{strictlyTwoElementsInRangeArrays:!1,progressFn:null},e);let a,i;if(o.strictlyTwoElementsInRangeArrays&&!t.every((t,e)=>2===t.length||(a=e,i=t.length,!1)))throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${a}th range (${JSON.stringify(t[a],null,4)}) has not two but ${i} elements!`);if(!t.every((t,e)=>!(!r(t[0],{includeZero:!0})||!r(t[1],{includeZero:!0}))||(a=e,!1)))throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${a}th range (${JSON.stringify(t[a],null,4)}) does not consist of only natural numbers!`);const u=t.length*t.length;let c=0;return Array.from(t).sort((t,e)=>(o.progressFn&&(c++,o.progressFn(Math.floor(100*c/u))),t[0]===e[0]?t[1]<e[1]?-1:t[1]>e[1]?1:0:t[0]<e[0]?-1:1))}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var i=function(t,e){return t(e={exports:{}},e.exports),e.exports}((function(t,e){var r=200,n="__lodash_hash_undefined__",o=9007199254740991,i="[object Arguments]",u="[object Boolean]",c="[object Date]",s="[object Function]",f="[object GeneratorFunction]",l="[object Map]",p="[object Number]",y="[object Object]",g="[object RegExp]",h="[object Set]",d="[object String]",_="[object Symbol]",b="[object ArrayBuffer]",v="[object DataView]",m="[object Float32Array]",w="[object Float64Array]",j="[object Int8Array]",T="[object Int16Array]",O="[object Int32Array]",S="[object Uint8Array]",E="[object Uint8ClampedArray]",I="[object Uint16Array]",A="[object Uint32Array]",F=/\w*$/,R=/^\[object .+?Constructor\]$/,$=/^(?:0|[1-9]\d*)$/,x={};x[i]=x["[object Array]"]=x[b]=x[v]=x[u]=x[c]=x[m]=x[w]=x[j]=x[T]=x[O]=x[l]=x[p]=x[y]=x[g]=x[h]=x[d]=x[_]=x[S]=x[E]=x[I]=x[A]=!0,x["[object Error]"]=x[s]=x["[object WeakMap]"]=!1;var N="object"==typeof a&&a&&a.Object===Object&&a,Z="object"==typeof self&&self&&self.Object===Object&&self,W=N||Z||Function("return this")(),D=e&&!e.nodeType&&e,H=D&&t&&!t.nodeType&&t,M=H&&H.exports===D;function J(t,e){return t.set(e[0],e[1]),t}function k(t,e){return t.add(e),t}function P(t,e,r,n){var o=-1,a=t?t.length:0;for(n&&a&&(r=t[++o]);++o<a;)r=e(r,t[o],o,t);return r}function q(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function C(t){var e=-1,r=Array(t.size);return t.forEach((function(t,n){r[++e]=[n,t]})),r}function B(t,e){return function(r){return t(e(r))}}function U(t){var e=-1,r=Array(t.size);return t.forEach((function(t){r[++e]=t})),r}var z,L=Array.prototype,V=Function.prototype,G=Object.prototype,K=W["__core-js_shared__"],Q=(z=/[^.]+$/.exec(K&&K.keys&&K.keys.IE_PROTO||""))?"Symbol(src)_1."+z:"",X=V.toString,Y=G.hasOwnProperty,tt=G.toString,et=RegExp("^"+X.call(Y).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rt=M?W.Buffer:void 0,nt=W.Symbol,ot=W.Uint8Array,at=B(Object.getPrototypeOf,Object),it=Object.create,ut=G.propertyIsEnumerable,ct=L.splice,st=Object.getOwnPropertySymbols,ft=rt?rt.isBuffer:void 0,lt=B(Object.keys,Object),pt=Ht(W,"DataView"),yt=Ht(W,"Map"),gt=Ht(W,"Promise"),ht=Ht(W,"Set"),dt=Ht(W,"WeakMap"),_t=Ht(Object,"create"),bt=qt(pt),vt=qt(yt),mt=qt(gt),wt=qt(ht),jt=qt(dt),Tt=nt?nt.prototype:void 0,Ot=Tt?Tt.valueOf:void 0;function St(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Et(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function It(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function At(t){this.__data__=new Et(t)}function Ft(t,e){var r=Bt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Ut(t)}(t)&&Y.call(t,"callee")&&(!ut.call(t,"callee")||tt.call(t)==i)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var a in t)!e&&!Y.call(t,a)||o&&("length"==a||kt(a,n))||r.push(a);return r}function Rt(t,e,r){var n=t[e];Y.call(t,e)&&Ct(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function $t(t,e){for(var r=t.length;r--;)if(Ct(t[r][0],e))return r;return-1}function xt(t,e,r,n,o,a,R){var $;if(n&&($=a?n(t,o,a,R):n(t)),void 0!==$)return $;if(!Vt(t))return t;var N=Bt(t);if(N){if($=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&Y.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,$)}else{var Z=Jt(t),W=Z==s||Z==f;if(zt(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(Z==y||Z==i||W&&!a){if(q(t))return a?t:{};if($=function(t){return"function"!=typeof t.constructor||Pt(t)?{}:(e=at(t),Vt(e)?it(e):{});var e}(W?{}:t),!e)return function(t,e){return Wt(t,Mt(t),e)}(t,function(t,e){return t&&Wt(e,Gt(e),t)}($,t))}else{if(!x[Z])return a?t:{};$=function(t,e,r,n){var o=t.constructor;switch(e){case b:return Zt(t);case u:case c:return new o(+t);case v:return function(t,e){var r=e?Zt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,n);case m:case w:case j:case T:case O:case S:case E:case I:case A:return function(t,e){var r=e?Zt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,n);case l:return function(t,e,r){return P(e?r(C(t),!0):C(t),J,new t.constructor)}(t,n,r);case p:case d:return new o(t);case g:return function(t){var e=new t.constructor(t.source,F.exec(t));return e.lastIndex=t.lastIndex,e}(t);case h:return function(t,e,r){return P(e?r(U(t),!0):U(t),k,new t.constructor)}(t,n,r);case _:return a=t,Ot?Object(Ot.call(a)):{}}var a}(t,Z,xt,e)}}R||(R=new At);var D=R.get(t);if(D)return D;if(R.set(t,$),!N)var H=r?function(t){return function(t,e,r){var n=e(t);return Bt(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,Gt,Mt)}(t):Gt(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}(H||t,(function(o,a){H&&(o=t[a=o]),Rt($,a,xt(o,e,r,n,a,t,R))})),$}function Nt(t){return!(!Vt(t)||(e=t,Q&&Q in e))&&(Lt(t)||q(t)?et:R).test(qt(t));var e}function Zt(t){var e=new t.constructor(t.byteLength);return new ot(e).set(new ot(t)),e}function Wt(t,e,r,n){r||(r={});for(var o=-1,a=e.length;++o<a;){var i=e[o],u=n?n(r[i],t[i],i,r,t):void 0;Rt(r,i,void 0===u?t[i]:u)}return r}function Dt(t,e){var r,n,o=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof e?"string":"hash"]:o.map}function Ht(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return Nt(r)?r:void 0}St.prototype.clear=function(){this.__data__=_t?_t(null):{}},St.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},St.prototype.get=function(t){var e=this.__data__;if(_t){var r=e[t];return r===n?void 0:r}return Y.call(e,t)?e[t]:void 0},St.prototype.has=function(t){var e=this.__data__;return _t?void 0!==e[t]:Y.call(e,t)},St.prototype.set=function(t,e){return this.__data__[t]=_t&&void 0===e?n:e,this},Et.prototype.clear=function(){this.__data__=[]},Et.prototype.delete=function(t){var e=this.__data__,r=$t(e,t);return!(r<0)&&(r==e.length-1?e.pop():ct.call(e,r,1),!0)},Et.prototype.get=function(t){var e=this.__data__,r=$t(e,t);return r<0?void 0:e[r][1]},Et.prototype.has=function(t){return $t(this.__data__,t)>-1},Et.prototype.set=function(t,e){var r=this.__data__,n=$t(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},It.prototype.clear=function(){this.__data__={hash:new St,map:new(yt||Et),string:new St}},It.prototype.delete=function(t){return Dt(this,t).delete(t)},It.prototype.get=function(t){return Dt(this,t).get(t)},It.prototype.has=function(t){return Dt(this,t).has(t)},It.prototype.set=function(t,e){return Dt(this,t).set(t,e),this},At.prototype.clear=function(){this.__data__=new Et},At.prototype.delete=function(t){return this.__data__.delete(t)},At.prototype.get=function(t){return this.__data__.get(t)},At.prototype.has=function(t){return this.__data__.has(t)},At.prototype.set=function(t,e){var n=this.__data__;if(n instanceof Et){var o=n.__data__;if(!yt||o.length<r-1)return o.push([t,e]),this;n=this.__data__=new It(o)}return n.set(t,e),this};var Mt=st?B(st,Object):function(){return[]},Jt=function(t){return tt.call(t)};function kt(t,e){return!!(e=null==e?o:e)&&("number"==typeof t||$.test(t))&&t>-1&&t%1==0&&t<e}function Pt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||G)}function qt(t){if(null!=t){try{return X.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Ct(t,e){return t===e||t!=t&&e!=e}(pt&&Jt(new pt(new ArrayBuffer(1)))!=v||yt&&Jt(new yt)!=l||gt&&"[object Promise]"!=Jt(gt.resolve())||ht&&Jt(new ht)!=h||dt&&"[object WeakMap]"!=Jt(new dt))&&(Jt=function(t){var e=tt.call(t),r=e==y?t.constructor:void 0,n=r?qt(r):void 0;if(n)switch(n){case bt:return v;case vt:return l;case mt:return"[object Promise]";case wt:return h;case jt:return"[object WeakMap]"}return e});var Bt=Array.isArray;function Ut(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=o}(t.length)&&!Lt(t)}var zt=ft||function(){return!1};function Lt(t){var e=Vt(t)?tt.call(t):"";return e==s||e==f}function Vt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function Gt(t){return Ut(t)?Ft(t):function(t){if(!Pt(t))return lt(t);var e=[];for(var r in Object(t))Y.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}t.exports=function(t){return xt(t,!0,!0)}})),u="[object Object]";var c,s,f=Function.prototype,l=Object.prototype,p=f.toString,y=l.hasOwnProperty,g=p.call(Object),h=l.toString,d=(c=Object.getPrototypeOf,s=Object,function(t){return c(s(t))});var _=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||h.call(t)!=u||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=d(t);if(null===e)return!0;var r=y.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&p.call(r)==g};var b=Array.isArray;return function(r,n,a){var u=0,c=0;if(0===arguments.length)throw new Error("ranges-apply: [THROW_ID_01] inputs missing!");if("string"!=typeof r)throw new TypeError("ranges-apply: [THROW_ID_02] first input argument must be a string! Currently it's: ".concat(t(r),", equal to: ").concat(JSON.stringify(r,null,4)));if(null===n)return r;if(!b(n))throw new TypeError("ranges-apply: [THROW_ID_03] second input argument must be an array (or null)! Currently it's: ".concat(t(n),", equal to: ").concat(JSON.stringify(n,null,4)));if(a&&"function"!=typeof a)throw new TypeError("ranges-apply: [THROW_ID_04] the third input argument must be a function (or falsey)! Currently it's: ".concat(t(a),", equal to: ").concat(JSON.stringify(a,null,4)));b(n)&&(Number.isInteger(n[0],{includeZero:!0})||e(n[0],{includeZero:!0}))&&(Number.isInteger(n[1],{includeZero:!0})||e(n[1],{includeZero:!0}))&&(n=[n]);var s=n.length,f=0;n.forEach((function(r,o){if(a&&(u=Math.floor(f/s*10))!==c&&(c=u,a(u)),!b(r))throw new TypeError("ranges-apply: [THROW_ID_05] ranges array, second input arg., has ".concat(o,"th element not an array: ").concat(JSON.stringify(r,null,4),", which is ").concat(t(r)));if(!Number.isInteger(r[0],{includeZero:!0})){if(!e(r[0],{includeZero:!0}))throw new TypeError("ranges-apply: [THROW_ID_06] ranges array, second input arg. has ".concat(o,"th element, array [").concat(r[0],",").concat(r[1],"]. That array has first element not an integer, but ").concat(t(r[0]),", equal to: ").concat(JSON.stringify(r[0],null,4),". Computer doesn't like this."));n[o][0]=Number.parseInt(n[o][0],10)}if(!Number.isInteger(r[1],{includeZero:!0})){if(!e(r[1],{includeZero:!0}))throw new TypeError("ranges-apply: [THROW_ID_07] ranges array, second input arg. has ".concat(o,"th element, array [").concat(r[0],",").concat(r[1],"]. That array has second element not an integer, but ").concat(t(r[1]),", equal to: ").concat(JSON.stringify(r[1],null,4),". Computer doesn't like this."));n[o][1]=Number.parseInt(n[o][1],10)}f++}));var l=function(t,e){function r(t){return"string"==typeof t}if(!Array.isArray(t))return t;const n={mergeType:1,progressFn:null,joinRangesThatTouchEdges:!0};let a;if(e){if(!_(e))throw new Error(`emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:\n${JSON.stringify(e,null,4)} (type ${typeof e})`);if(a=Object.assign({},n,e),a.progressFn&&_(a.progressFn)&&!Object.keys(a.progressFn).length)a.progressFn=null;else if(a.progressFn&&"function"!=typeof a.progressFn)throw new Error(`ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "${typeof a.progressFn}", equal to ${JSON.stringify(a.progressFn,null,4)}`);if(a.mergeType&&1!==a.mergeType&&2!==a.mergeType)if(r(a.mergeType)&&"1"===a.mergeType.trim())a.mergeType=1;else{if(!r(a.mergeType)||"2"!==a.mergeType.trim())throw new Error(`ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof a.mergeType}", equal to ${JSON.stringify(a.mergeType,null,4)}`);a.mergeType=2}if("boolean"!=typeof a.joinRangesThatTouchEdges)throw new Error(`ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof a.joinRangesThatTouchEdges}", equal to ${JSON.stringify(a.joinRangesThatTouchEdges,null,4)}`)}else a=i(n);const u=i(t).filter(t=>void 0!==t[2]||t[0]!==t[1]);let c,s,f;c=a.progressFn?o(u,{progressFn:t=>{f=Math.floor(t/5),f!==s&&(s=f,a.progressFn(f))}}):o(u);const l=c.length-1;for(let t=l;t>0;t--)a.progressFn&&(f=Math.floor(78*(1-t/l))+21,f!==s&&f>s&&(s=f,a.progressFn(f))),(c[t][0]<=c[t-1][0]||!a.joinRangesThatTouchEdges&&c[t][0]<c[t-1][1]||a.joinRangesThatTouchEdges&&c[t][0]<=c[t-1][1])&&(c[t-1][0]=Math.min(c[t][0],c[t-1][0]),c[t-1][1]=Math.max(c[t][1],c[t-1][1]),void 0!==c[t][2]&&(c[t-1][0]>=c[t][0]||c[t-1][1]<=c[t][1])&&null!==c[t-1][2]&&(null===c[t][2]&&null!==c[t-1][2]?c[t-1][2]=null:void 0!==c[t-1][2]?2===a.mergeType&&c[t-1][0]===c[t][0]?c[t-1][2]=c[t][2]:c[t-1][2]+=c[t][2]:c[t-1][2]=c[t][2]),c.splice(t,1),t=c.length);return c}(n,{progressFn:function(t){a&&(u=10+Math.floor(t/10))!==c&&(c=u,a(u))}}),p=l.length;if(p>0){var y=r.slice(l[p-1][1]);r=l.reduce((function(t,e,n,o){a&&(u=20+Math.floor(n/p*80))!==c&&(c=u,a(u));var i=0===n?0:o[n-1][1],s=o[n][0];return t+r.slice(i,s)+(null!=o[n][2]?o[n][2]:"")}),""),r+=y}return r}}));
