/**
 * string-match-left-right
 * Match substrings on the left or right of a given index, ignoring whitespace
 * Version: 6.0.4
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/string-match-left-right/
 */

import{arrayiffy as t}from"arrayiffy-if-string";function r(t){return t&&"object"==typeof t&&!Array.isArray(t)}function e(t){return"string"==typeof t}const i={cb:void 0,i:!1,trimBeforeMatching:!1,trimCharsBeforeMatching:[],maxMismatches:0,firstMustMatch:!1,lastMustMatch:!1},n=t=>t+1;function a(t,r,e,a,o=!1,s=n){const h="function"==typeof e?e():e;if(+r<0&&o&&"EOL"===h)return h;const c={...i,...a};if(r>=t.length&&!o)return!1;let f=o?1:e.length,g=!1,l=!1,u=c.maxMismatches,m=r,M=!1,y=!1,p=!1;for(;t[m];){const r=s(m);if(c.trimBeforeMatching&&""===t[m].trim()){if(!t[r]&&o&&"EOL"===e)return!0;m=s(m);continue}if(c&&!c.i&&c.trimCharsBeforeMatching&&c.trimCharsBeforeMatching.includes(t[m])||c&&c.i&&c.trimCharsBeforeMatching&&c.trimCharsBeforeMatching.map((t=>t.toLowerCase())).includes(t[m].toLowerCase())){if(o&&"EOL"===e&&!t[r])return!0;m=s(m);continue}const i=r>m?e[e.length-f]:e[f-1];if(!c.i&&t[m]===i||c.i&&t[m].toLowerCase()===i.toLowerCase()){if(M||(M=!0),l||(l=!0),f===e.length?y=!0:1===f&&(p=!0),f-=1,f<1)return m}else{if(!(c.maxMismatches&&u&&m))return!(0!==m||1!==f||c.lastMustMatch||!l)&&0;u-=1;for(let i=0;i<=u;i++){const n=r>m?e[e.length-f+1+i]:e[f-2-i],a=t[s(m)];if(n&&(!c.i&&t[m]===n||c.i&&t[m].toLowerCase()===n.toLowerCase())&&(!c.firstMustMatch||f!==e.length)){f-=2,M=!0;break}if(a&&n&&(!c.i&&a===n||c.i&&a.toLowerCase()===n.toLowerCase())&&(!c.firstMustMatch||f!==e.length)){f-=1,M=!0;break}if(void 0===n&&u>=0&&M&&(!c.firstMustMatch||y)&&(!c.lastMustMatch||p))return m}M||(g=m)}if(!1!==g&&g!==m&&(g=!1),f<1)return m;m=s(m)}return f>0?!(!o||"EOL"!==h)||!!(c&&c.maxMismatches>=f&&l)&&(g||0):void 0}function o(n,o,s,h,c){if(r(c)&&Object.prototype.hasOwnProperty.call(c,"trimBeforeMatching")&&"boolean"!=typeof c.trimBeforeMatching)throw new Error(`string-match-left-right/${n}(): [THROW_ID_09] opts.trimBeforeMatching should be boolean!${Array.isArray(c.trimBeforeMatching)?" Did you mean to use opts.trimCharsBeforeMatching?":""}`);const f={...i,...c};if("string"==typeof f.trimCharsBeforeMatching&&(f.trimCharsBeforeMatching=t(f.trimCharsBeforeMatching)),f.trimCharsBeforeMatching=f.trimCharsBeforeMatching.map((t=>e(t)?t:String(t))),!e(o))return!1;if(!o.length)return!1;if(!Number.isInteger(s)||s<0)throw new Error(`string-match-left-right/${n}(): [THROW_ID_03] the second argument should be a natural number. Currently it's of a type: ${typeof s}, equal to:\n${JSON.stringify(s,null,4)}`);let g,l;if(e(h))g=[h];else if(Array.isArray(h))g=h;else if(h){if("function"!=typeof h)throw new Error(`string-match-left-right/${n}(): [THROW_ID_05] the third argument, whatToMatch, is neither string nor array of strings! It's ${typeof h}, equal to:\n${JSON.stringify(h,null,4)}`);g=[],g.push(h)}else g=h;if(c&&!r(c))throw new Error(`string-match-left-right/${n}(): [THROW_ID_06] the fourth argument, options object, should be a plain object. Currently it's of a type "${typeof c}", and equal to:\n${JSON.stringify(c,null,4)}`);let u=0,m="";if(f&&f.trimCharsBeforeMatching&&f.trimCharsBeforeMatching.some(((t,r)=>t.length>1&&(u=r,m=t,!0))))throw new Error(`string-match-left-right/${n}(): [THROW_ID_07] the fourth argument, options object contains trimCharsBeforeMatching. It was meant to list the single characters but one of the entries at index ${u} is longer than 1 character, ${m.length} (equals to ${m}). Please split it into separate characters and put into array as separate elements.`);if(!g||!Array.isArray(g)||Array.isArray(g)&&!g.length||Array.isArray(g)&&1===g.length&&e(g[0])&&!g[0].trim()){if("function"==typeof f.cb){let t,r=s;if("matchLeftIncl"!==n&&"matchRight"!==n||(r+=1),"L"===n[5])for(let e=r;e--;){const r=o[e];if((!f.trimBeforeMatching||f.trimBeforeMatching&&void 0!==r&&r.trim())&&(!f.trimCharsBeforeMatching||!f.trimCharsBeforeMatching.length||void 0!==r&&!f.trimCharsBeforeMatching.includes(r))){t=e;break}}else if(n.startsWith("matchRight"))for(let e=r;e<o.length;e++){const r=o[e];if((!f.trimBeforeMatching||f.trimBeforeMatching&&r.trim())&&(!f.trimCharsBeforeMatching||!f.trimCharsBeforeMatching.length||!f.trimCharsBeforeMatching.includes(r))){t=e;break}}if(void 0===t)return!1;const e=o[t],i=t+1;let a="";return i&&i>0&&(a=o.slice(0,i)),"L"===n[5]?f.cb(e,a,t):(t&&t>0&&(a=o.slice(t)),f.cb(e,a,t))}let t="";throw c||(t=" More so, the whole options object, the fourth input argument, is missing!"),new Error(`string-match-left-right/${n}(): [THROW_ID_08] the third argument, "whatToMatch", was given as an empty string. This means, you intend to match purely by a callback. The callback was not set though, the opts key "cb" is not set!${t}`)}for(let t=0,r=g.length;t<r;t++){l="function"==typeof g[t];const r=g[t];let e,i,h="",c=s;"matchRight"===n?c+=1:"matchLeft"===n&&(c-=1);const u=a(o,c,r,f,l,(t=>"L"===n[5]?t-1:t+1));if(u&&l&&"function"==typeof r&&"EOL"===r())return!(!r()||f.cb&&!f.cb(e,h,i))&&r();if(Number.isInteger(u)&&(i=n.startsWith("matchLeft")?u-1:u+1,h="L"===n[5]?o.slice(0,u):o.slice(i)),i<0&&(i=void 0),o[i]&&(e=o[i]),Number.isInteger(u)&&(!f.cb||f.cb(e,h,i)))return r}return!1}function s(t,r,e,i){return o("matchLeftIncl",t,r,e,i)}function h(t,r,e,i){return o("matchLeft",t,r,e,i)}function c(t,r,e,i){return o("matchRightIncl",t,r,e,i)}function f(t,r,e,i){return o("matchRight",t,r,e,i)}export{h as matchLeft,s as matchLeftIncl,f as matchRight,c as matchRightIncl};
