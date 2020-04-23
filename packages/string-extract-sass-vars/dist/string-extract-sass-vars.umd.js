/**
 * string-extract-sass-vars
 * Parse SASS variables file into a plain object of CSS key-value pairs
 * Version: 1.1.0
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-extract-sass-vars
 */

!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).stringExtractSassVars=n()}(this,(function(){"use strict";function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(n)}return function(n,e){if("string"!=typeof n)return{};if(e&&"object"!==t(e))throw new Error("string-extract-sass-vars: [THROW_ID_01] the second input argument should be a plain object but it was given as ".concat(JSON.stringify(e,null,4)," (type ").concat(t(e),")"));var l=Object.assign({},{throwIfEmpty:!1,cb:null},e);if(l.cb&&"function"!=typeof l.cb)throw new Error("string-extract-sass-vars: [THROW_ID_02] opts.cb should be function! But it was given as ".concat(JSON.stringify(e,null,4)," (type ").concat(t(e),")"));for(var o=n.length,r=null,s=null,u=null,i=null,c=null,f=null,a=!1,y=!1,p=!1,b={},d=0;d<o;d++)!a&&c&&n[d]===c&&"\\"!==n[d-1]?c=null:c||a||"\\"===n[d-1]||!"'\"".includes(n[d])||(c=n[d]),y&&"\r\n".includes(n[d])&&(y=!1),a||"/"!==n[d]||"/"!==n[d+1]||(y=!0),p&&"*"===n[d-2]&&"/"===n[d-1]&&(p=!1),a||"/"!==n[d]||"*"!==n[d+1]||(p=!0),(a=y||p)||"$"!==n[d]||null!==r||(r=d+1),a||null===s||c||";"!==n[d]||(i=n.slice("\"'".includes(n[s])?s+1:s,f+1),/^-?\d*\.?\d*$/.test(i)&&(i=+i),b[u]=l.cb?l.cb(i):i,r=null,s=null,u=null,i=null),!a&&null!==u&&n[d]&&n[d].trim().length&&null===s&&(s=d),a||u||null===r||":"!==n[d]||c||(u=n.slice(r,d)),"'\"".includes(n[d])||(f=d);if(!Object.keys(b).length&&l.throwIfEmpty)throw new Error("string-extract-sass-vars: [THROW_ID_03] no keys extracted! (setting opts.originalOpts)");return b}}));