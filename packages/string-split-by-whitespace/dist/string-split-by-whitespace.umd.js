!function(e,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):e.splitByWhitespace=i()}(this,function(){"use strict";return function(e){if(void 0===e)throw new Error("string-split-by-whitespace: The input is missing!");if("string"!=typeof e)return e;if(""===e.trim())return[];for(var i=null,t=[],n=0,r=e.length;n<r;n++)i||""===e[n].trim()||(i=n),null!==i&&(""===e[n].trim()?(t.push(e.slice(i,n)),i=null):void 0===e[n+1]&&t.push(e.slice(i,n+1)));return t}});
