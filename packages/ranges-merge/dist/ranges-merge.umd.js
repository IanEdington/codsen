/**
 * ranges-merge
 * Merge and sort string index ranges
 * Version: 6.1.0
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/ranges-merge/
 */

!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(e="undefined"!=typeof globalThis?globalThis:e||self).rangesMerge=r()}(this,(function(){"use strict";function e(r){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(r)}function r(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function n(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function t(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(n){r(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(o,r))}))}return e}function o(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,r){if(!e)return;if("string"==typeof e)return s(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,r)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function i(e,r){if(!Array.isArray(e)||!e.length)return e;var n,o,s=t(t({},{strictlyTwoElementsInRangeArrays:!1,progressFn:null}),r);if(s.strictlyTwoElementsInRangeArrays&&!e.filter((function(e){return e})).every((function(e,r){return 2===e.length||(n=r,o=e.length,!1)})))throw new TypeError("ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ".concat(n,"th range (").concat(JSON.stringify(e[n],null,4),") has not two but ").concat(o," elements!"));if(!e.filter((function(e){return e})).every((function(e,r){return!(!Number.isInteger(e[0])||e[0]<0||!Number.isInteger(e[1])||e[1]<0)||(n=r,!1)})))throw new TypeError("ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ".concat(n,"th range (").concat(JSON.stringify(e[n],null,4),") does not consist of only natural numbers!"));var i=Math.pow(e.filter((function(e){return e})).length,2),a=0;return Array.from(e).filter((function(e){return e})).sort((function(e,r){return s.progressFn&&(a+=1,s.progressFn(Math.floor(100*a/i))),e[0]===r[0]?e[1]<r[1]?-1:e[1]>r[1]?1:0:e[0]<r[0]?-1:1}))}return function(r,n){function s(r){return r&&"object"===e(r)&&!Array.isArray(r)}if(!Array.isArray(r)||!r.length)return null;var a,u={mergeType:1,progressFn:null,joinRangesThatTouchEdges:!0};if(n){if(!s(n))throw new Error("emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:\n".concat(JSON.stringify(n,null,4)," (type ").concat(e(n),")"));if((a=t(t({},u),n)).progressFn&&s(a.progressFn)&&!Object.keys(a.progressFn).length)a.progressFn=null;else if(a.progressFn&&"function"!=typeof a.progressFn)throw new Error('ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "'.concat(e(a.progressFn),'", equal to ').concat(JSON.stringify(a.progressFn,null,4)));if(a.mergeType&&1!=+a.mergeType&&2!=+a.mergeType)throw new Error('ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "'.concat(e(a.mergeType),'", equal to ').concat(JSON.stringify(a.mergeType,null,4)));if("boolean"!=typeof a.joinRangesThatTouchEdges)throw new Error('ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "'.concat(e(a.joinRangesThatTouchEdges),'", equal to ').concat(JSON.stringify(a.joinRangesThatTouchEdges,null,4)))}else a=t({},u);for(var c,f,l,g=r.filter((function(e){return e})).map((function(e){return o(e)})).filter((function(e){return void 0!==e[2]||e[0]!==e[1]})),y=(c=a.progressFn?i(g,{progressFn:function(e){(l=Math.floor(e/5))!==f&&(f=l,a.progressFn(l))}}):i(g)).length-1,p=y;p>0;p--)a.progressFn&&(l=Math.floor(78*(1-p/y))+21)!==f&&l>f&&(f=l,a.progressFn(l)),(c[p][0]<=c[p-1][0]||!a.joinRangesThatTouchEdges&&c[p][0]<c[p-1][1]||a.joinRangesThatTouchEdges&&c[p][0]<=c[p-1][1])&&(c[p-1][0]=Math.min(c[p][0],c[p-1][0]),c[p-1][1]=Math.max(c[p][1],c[p-1][1]),void 0!==c[p][2]&&(c[p-1][0]>=c[p][0]||c[p-1][1]<=c[p][1])&&null!==c[p-1][2]&&(null===c[p][2]&&null!==c[p-1][2]?c[p-1][2]=null:void 0!==c[p-1][2]?2==+a.mergeType&&c[p-1][0]===c[p][0]?c[p-1][2]=c[p][2]:c[p-1][2]+=c[p][2]:c[p-1][2]=c[p][2]),c.splice(p,1),p=c.length);return c.length?c:null}}));
