/**
 * object-no-new-keys
 * Check, does a plain object (AST/JSON) has any unique keys, not present in a reference object (another AST/JSON)
 * Version: 3.0.4
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/object-no-new-keys/
 */

!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).objectNoNewKeys={})}(this,(function(e){"use strict";function r(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function t(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function n(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?t(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(o,r))}))}return e}function o(e){return e&&"object"==typeof e&&!Array.isArray(e)}e.noNewKeys=function(e,r,t){if(t&&!o(t))throw new TypeError("object-no-new-keys/noNewKeys(): [THROW_ID_02] opts should be a plain object. It was given as "+JSON.stringify(t,null,4)+" (type "+typeof t+")");var s=n(n({},{mode:2}),t);if("string"==typeof s.mode&&["1","2"].includes(s.mode))s.mode=+s.mode;else if(![1,2].includes(s.mode))throw new TypeError('object-no-new-keys/objectNoNewKeys(): [THROW_ID_01] opts.mode should be "1" or "2" (string or number).');return function e(r,t,n,s){var i;if(o(r))o(t)?Object.keys(r).forEach((function(c){Object.prototype.hasOwnProperty.call(t,c)?(o(r[c])||Array.isArray(r[c]))&&(s.res=e(r[c],t[c],n,i={path:s.path.length>0?s.path+"."+c:c,res:s.res}).res):s.res.push(i=s.path.length>0?s.path+"."+c:c)})):s.res=s.res.concat(Object.keys(r).map((function(e){return s.path.length>0?s.path+"."+e:e})));else if(Array.isArray(r))if(Array.isArray(t))for(var c=0,p=r.length;c<p;c++)i={path:(s.path.length>0?s.path:"")+"["+c+"]",res:s.res},s.res=2===n.mode?e(r[c],t[0],n,i).res:e(r[c],t[c],n,i).res;else s.res=s.res.concat(r.map((function(e,r){return(s.path.length>0?s.path:"")+"["+r+"]"})));return s}(e,r,s,{path:"",res:[]}).res},e.version="3.0.4",Object.defineProperty(e,"__esModule",{value:!0})}));
