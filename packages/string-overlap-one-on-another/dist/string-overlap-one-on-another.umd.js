/**
 * string-overlap-one-on-another
 * Lay one string on top of another, with an optional offset
 * Version: 1.5.47
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-overlap-one-on-another
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).stringOverlapOneOnAnother=e()}(this,(function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="[object Object]";var n,o,r=Function.prototype,i=Object.prototype,f=r.toString,a=i.hasOwnProperty,s=f.call(Object),c=i.toString,l=(n=Object.getPrototypeOf,o=Object,function(t){return n(o(t))});var u=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||c.call(t)!=e||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var n=l(t);if(null===n)return!0;var o=a.call(n,"constructor")&&n.constructor;return"function"==typeof o&&o instanceof o&&f.call(o)==s},h=function(t,e){if(e){if("object"!=typeof e)throw new TypeError(String(e)+" is not an object. Expected an object that has boolean `includeZero` property.");if("includeZero"in e){if("boolean"!=typeof e.includeZero)throw new TypeError(String(e.includeZero)+" is neither true nor false. `includeZero` option must be a Boolean value.");if(e.includeZero&&0===t)return!0}}return Number.isSafeInteger(t)&&t>=1};return function(e,n,o){if("string"!=typeof e)throw new Error("string-overlap-one-on-another: [THROW_ID_01] The first input argument must be a string but it was given as ".concat(JSON.stringify(e,null,4),', which is type "').concat(t(e),'"'));if("string"!=typeof n)throw new Error("string-overlap-one-on-another: [THROW_ID_02] The second input argument must be a string but it was given as ".concat(JSON.stringify(n,null,4),', which is type "').concat(t(n),'"'));var r,i={offset:0,offsetFillerCharacter:" "};if(o){if(!u(o))throw new Error("string-overlap-one-on-another: [THROW_ID_03] The third input argument must be a plain object but it was given as ".concat(JSON.stringify(n,null,4),', which is type "').concat(t(o),'"'));if((r=Object.assign({},i,o)).offset){if(!h(Math.abs(r.offset)))throw new Error("string-overlap-one-on-another: [THROW_ID_04] The second input argument must be a string but it was given as ".concat(JSON.stringify(n,null,4),', which is type "').concat(t(n),'"'))}else r.offset=0;r.offsetFillerCharacter||""===r.offsetFillerCharacter||(r.offsetFillerCharacter=" ")}else r=i;return 0===n.length?e:0===e.length?n:r.offset<0?n+(Math.abs(r.offset)>n.length?r.offsetFillerCharacter.repeat(Math.abs(r.offset)-n.length):"")+e.slice(n.length-Math.abs(r.offset)>0?n.length-Math.abs(r.offset):0):r.offset>0?e.slice(0,r.offset)+(r.offset>e.length?r.offsetFillerCharacter.repeat(Math.abs(r.offset)-e.length):"")+n+(e.length-r.offset-n.length>0?e.slice(e.length-r.offset-n.length+1):""):n+(e.length>n.length?e.slice(n.length):"")}}));
