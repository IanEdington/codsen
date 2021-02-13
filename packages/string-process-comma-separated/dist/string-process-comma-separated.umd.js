/**
 * string-process-comma-separated
 * Extracts chunks from possibly comma or whatever-separated string
 * Version: 2.0.4
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/string-process-comma-separated/
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).stringProcessCommaSeparated={})}(this,(function(e){"use strict";function t(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function o(e){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{};o%2?r(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}e.processCommaSep=function(e,t){if("string"!=typeof e)throw new Error("string-process-comma-separated: [THROW_ID_01] input must be string! It was given as "+typeof e+", equal to:\n"+JSON.stringify(e,null,4));if(e.length&&t&&(t.cb||t.errCb)){var r=o(o({},{from:0,to:e.length,offset:0,leadingWhitespaceOK:!1,trailingWhitespaceOK:!1,oneSpaceAfterCommaOK:!1,innerWhitespaceAllowed:!1,separator:",",cb:null,errCb:null}),t);Number.isInteger(t.from)||(r.from=0),Number.isInteger(t.to)||(r.to=e.length),Number.isInteger(t.offset)||(r.offset=0);for(var n=null,f=null,s=!1,a=[],i=null,p=!0,c=r.from;c<r.to;c++){if(e[c].trim()&&e[c]!==r.separator&&(i=c),null!==n||!e[c].trim()||r.separator&&e[c]===r.separator||(s||(s=!0),a.length&&(a.length>1&&a.forEach((function(e,t){t&&r.errCb([[e+r.offset,e+1+r.offset]],"Remove separator.",p)})),a=[]),n=c),Number.isInteger(n)&&(c>n&&r.separator&&e[c]===r.separator||c+1===r.to)&&(e.slice(n,c+1===r.to&&e[c]!==r.separator&&e[c].trim()?c+1:c),"function"==typeof r.cb&&r.cb(n+r.offset,(c+1===r.to&&e[c]!==r.separator&&e[c].trim()?c+1:i+1)+r.offset),n=null),e[c].trim()||null!==f||(f=c),null!==f&&(e[c].trim()||c+1===r.to)){if(f===r.from)r.leadingWhitespaceOK||"function"!=typeof r.errCb||r.errCb([[f+r.offset,(c+1===r.to?c+1:c)+r.offset]],"Remove whitespace.",p);else if(e[c].trim()||c+1!==r.to){if(!(r.oneSpaceAfterCommaOK&&e[c].trim()&&c>r.from+1&&" "===e[c-1]&&","===e[c-2]||r.innerWhitespaceAllowed&&s&&e[f-1]&&e[c].trim()&&e[c]!==r.separator&&e[f-1]!==r.separator)){var l=f,u=c;c+1!==r.to||e[c]===r.separator||e[c].trim()||(u+=1);var m="";r.oneSpaceAfterCommaOK&&(" "===e[f]&&e[f-1]===r.separator?l+=1:" "!==e[f]&&(m=" "));var b="Remove whitespace.";!r.innerWhitespaceAllowed&&s&&e[f-1]&&e[c].trim()&&e[c]!==r.separator&&e[f-1]!==r.separator&&(p=!1,b="Bad whitespace."),r.errCb(m.length?[[l+r.offset,u+r.offset,m]]:[[l+r.offset,u+r.offset]],b,p),p=!0}}else r.trailingWhitespaceOK||"function"!=typeof r.errCb||r.errCb([[f+r.offset,c+1+r.offset]],"Remove whitespace.",p);f=null}e[c]===r.separator&&(s?a.push(c):r.errCb([[c+r.offset,c+1+r.offset]],"Remove separator.",p)),c+1===r.to&&a.forEach((function(e){r.errCb([[e+r.offset,e+1+r.offset]],"Remove separator.",p)}))}}},e.version="2.0.4",Object.defineProperty(e,"__esModule",{value:!0})}));
