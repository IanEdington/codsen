/**
 * ranges-push
 * Gather string index ranges
 * Version: 4.0.1
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/ranges-push/
 */

!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(e="undefined"!=typeof globalThis?globalThis:e||self).rangesPush=r()}(this,(function(){"use strict";function e(r){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(r)}function r(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?n(Object(o),!0).forEach((function(r){t(e,r,o[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(o,r))}))}return e}function i(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,r){if(!e)return;if("string"==typeof e)return s(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return s(e,r)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var a=" ";function u(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;function t(e){return Array.from(e).reverse().join("")}function n(e,r,t){var n=t?"\n":"\r",o=t?"\r":"\n";if(!e)return e;for(var i=0,s="",u=0,l=e.length;u<l;u++)(e[u]===n||e[u]===o&&e[u-1]!==n)&&i++,"\r\n".includes(e[u])||e[u]===a?e[u]===a?s+=e[u]:e[u]===n?i<=r&&(s+=e[u],e[u+1]===o&&(s+=e[u+1],u++)):e[u]===o&&(!e[u-1]||e[u-1]!==n)&&i<=r&&(s+=e[u]):e[u+1]||i||(s+=" ");return s}if("string"==typeof e&&e.length){var o=1;"number"==typeof+r&&Number.isInteger(+r)&&+r>=0&&(o=+r);var i="",s="";if(e.trim()){if(!e[0].trim())for(var u=0,l=e.length;u<l;u++)if(e[u].trim()){i=e.slice(0,u);break}}else i=e;if(e.trim()&&(""===e.slice(-1).trim()||e.slice(-1)===a))for(var g=e.length;g--;)if(e[g].trim()){s=e.slice(g+1);break}return"".concat(n(i,o,!1)).concat(e.trim()).concat(t(n(t(s),o,!0)))}return e}function l(e,r){if(!Array.isArray(e)||!e.length)return e;var t,n,i=o(o({},{strictlyTwoElementsInRangeArrays:!1,progressFn:null}),r);if(i.strictlyTwoElementsInRangeArrays&&!e.filter((function(e){return e})).every((function(e,r){return 2===e.length||(t=r,n=e.length,!1)})))throw new TypeError("ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ".concat(t,"th range (").concat(JSON.stringify(e[t],null,4),") has not two but ").concat(n," elements!"));if(!e.filter((function(e){return e})).every((function(e,r){return!(!Number.isInteger(e[0])||e[0]<0||!Number.isInteger(e[1])||e[1]<0)||(t=r,!1)})))throw new TypeError("ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ".concat(t,"th range (").concat(JSON.stringify(e[t],null,4),") does not consist of only natural numbers!"));var s=Math.pow(e.filter((function(e){return e})).length,2),a=0;return Array.from(e).filter((function(e){return e})).sort((function(e,r){return i.progressFn&&(a+=1,i.progressFn(Math.floor(100*a/s))),e[0]===r[0]?e[1]<r[1]?-1:e[1]>r[1]?1:0:e[0]<r[0]?-1:1}))}function g(e){return null!=e}function c(e){return Number.isInteger(e)&&e>=0}function f(e){return"string"==typeof e}function h(e){return/^\d*$/.test(e)?parseInt(e,10):e}return function(){function t(r){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);var n=o(o({},{limitToBeAddedWhitespace:!1,limitLinebreaksCount:1,mergeType:1}),r);if(n.mergeType&&1!==n.mergeType&&2!==n.mergeType)if(f(n.mergeType)&&"1"===n.mergeType.trim())n.mergeType=1;else{if(!f(n.mergeType)||"2"!==n.mergeType.trim())throw new Error('ranges-push: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "'.concat(e(n.mergeType),'", equal to ').concat(JSON.stringify(n.mergeType,null,4)));n.mergeType=2}this.opts=n}var n,s,a;return n=t,(s=[{key:"add",value:function(r,t,n){for(var o=this,s=arguments.length,a=new Array(s>3?s-3:0),l=3;l<s;l++)a[l-3]=arguments[l];if(a.length>0)throw new TypeError("ranges-push/Ranges/add(): [THROW_ID_03] Please don't overload the add() method. From the 4th input argument onwards we see these redundant arguments: ".concat(JSON.stringify(a,null,4)));if(g(r)||g(t)){if(g(r)&&!g(t)){if(Array.isArray(r)){if(r.length){if(r.some((function(e){return Array.isArray(e)})))return void r.forEach((function(e){Array.isArray(e)&&o.add.apply(o,i(e))}));r.length>1&&c(h(r[0]))&&c(h(r[1]))&&this.add.apply(this,i(r))}return}throw new TypeError('ranges-push/Ranges/add(): [THROW_ID_12] the first input argument, "from" is set ('.concat(JSON.stringify(r,null,0),') but second-one, "to" is not (').concat(JSON.stringify(t,null,0),")"))}if(!g(r)&&g(t))throw new TypeError('ranges-push/Ranges/add(): [THROW_ID_13] the second input argument, "to" is set ('.concat(JSON.stringify(t,null,0),') but first-one, "from" is not (').concat(JSON.stringify(r,null,0),")"));var p=/^\d*$/.test(r)?parseInt(r,10):r,y=/^\d*$/.test(t)?parseInt(t,10):t;if(c(n)&&(n=String(n)),!c(p)||!c(y))throw c(p)&&p>=0?new TypeError('ranges-push/Ranges/add(): [THROW_ID_10] "to" value, the second input argument, must be a natural number or zero! Currently it\'s of a type "'.concat(e(y),'" equal to: ').concat(JSON.stringify(y,null,4))):new TypeError('ranges-push/Ranges/add(): [THROW_ID_09] "from" value, the first input argument, must be a natural number or zero! Currently it\'s of a type "'.concat(e(p),'" equal to: ').concat(JSON.stringify(p,null,4)));if(g(n)&&!f(n)&&!c(n))throw new TypeError("ranges-push/Ranges/add(): [THROW_ID_08] The third argument, the value to add, was given not as string but ".concat(e(n),", equal to:\n").concat(JSON.stringify(n,null,4)));if(g(this.ranges)&&Array.isArray(this.last())&&p===this.last()[1]){if(this.last()[1]=y,this.last()[2],null!==this.last()[2]&&g(n)){var m=!(g(this.last()[2])&&this.last()[2].length>0)||this.opts&&this.opts.mergeType&&1!==this.opts.mergeType?n:this.last()[2]+n;this.opts.limitToBeAddedWhitespace&&(m=u(m,this.opts.limitLinebreaksCount)),f(m)&&!m.length||(this.last()[2]=m)}}else{this.ranges||(this.ranges=[]);var d=void 0===n||f(n)&&!n.length?[p,y]:[p,y,this.opts.limitToBeAddedWhitespace?u(n,this.opts.limitLinebreaksCount):n];this.ranges.push(d)}}}},{key:"push",value:function(e,r,t){for(var n=arguments.length,o=new Array(n>3?n-3:0),i=3;i<n;i++)o[i-3]=arguments[i];this.add.apply(this,[e,r,t].concat(o))}},{key:"current",value:function(){var r=this;return null!=this.ranges?(this.ranges=function(r,t){function n(r){return r&&"object"===e(r)&&!Array.isArray(r)}if(!Array.isArray(r)||!r.length)return null;var s,a={mergeType:1,progressFn:null,joinRangesThatTouchEdges:!0};if(t){if(!n(t))throw new Error("emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:\n".concat(JSON.stringify(t,null,4)," (type ").concat(e(t),")"));if((s=o(o({},a),t)).progressFn&&n(s.progressFn)&&!Object.keys(s.progressFn).length)s.progressFn=null;else if(s.progressFn&&"function"!=typeof s.progressFn)throw new Error('ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "'.concat(e(s.progressFn),'", equal to ').concat(JSON.stringify(s.progressFn,null,4)));if(s.mergeType&&1!=+s.mergeType&&2!=+s.mergeType)throw new Error('ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "'.concat(e(s.mergeType),'", equal to ').concat(JSON.stringify(s.mergeType,null,4)));if("boolean"!=typeof s.joinRangesThatTouchEdges)throw new Error('ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "'.concat(e(s.joinRangesThatTouchEdges),'", equal to ').concat(JSON.stringify(s.joinRangesThatTouchEdges,null,4)))}else s=o({},a);for(var u,g,c,f=r.filter((function(e){return e})).map((function(e){return i(e)})).filter((function(e){return void 0!==e[2]||e[0]!==e[1]})),h=(u=s.progressFn?l(f,{progressFn:function(e){(c=Math.floor(e/5))!==g&&(g=c,s.progressFn(c))}}):l(f)).length-1,p=h;p>0;p--)s.progressFn&&(c=Math.floor(78*(1-p/h))+21)!==g&&c>g&&(g=c,s.progressFn(c)),(u[p][0]<=u[p-1][0]||!s.joinRangesThatTouchEdges&&u[p][0]<u[p-1][1]||s.joinRangesThatTouchEdges&&u[p][0]<=u[p-1][1])&&(u[p-1][0]=Math.min(u[p][0],u[p-1][0]),u[p-1][1]=Math.max(u[p][1],u[p-1][1]),void 0!==u[p][2]&&(u[p-1][0]>=u[p][0]||u[p-1][1]<=u[p][1])&&null!==u[p-1][2]&&(null===u[p][2]&&null!==u[p-1][2]?u[p-1][2]=null:void 0!==u[p-1][2]?2==+s.mergeType&&u[p-1][0]===u[p][0]?u[p-1][2]=u[p][2]:u[p-1][2]+=u[p][2]:u[p-1][2]=u[p][2]),u.splice(p,1),p=u.length);return u.length?u:null}(this.ranges,{mergeType:this.opts.mergeType}),this.ranges&&this.opts.limitToBeAddedWhitespace?this.ranges.map((function(e){return g(e[2])?[e[0],e[1],u(e[2],r.opts.limitLinebreaksCount)]:e})):this.ranges):null}},{key:"wipe",value:function(){this.ranges=void 0}},{key:"replace",value:function(e){if(Array.isArray(e)&&e.length){if(!Array.isArray(e[0])||!c(e[0][0]))throw new Error("ranges-push/Ranges/replace(): [THROW_ID_11] Single range was given but we expected array of arrays! The first element, ".concat(JSON.stringify(e[0],null,4)," should be an array and its first element should be an integer, a string index."));this.ranges=Array.from(e)}else this.ranges=void 0}},{key:"last",value:function(){return void 0!==this.ranges&&Array.isArray(this.ranges)?this.ranges[this.ranges.length-1]:null}}])&&r(n.prototype,s),a&&r(n,a),t}()}));
