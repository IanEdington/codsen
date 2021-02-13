/**
 * object-merge-advanced
 * Recursively, deeply merge of anything (objects, arrays, strings or nested thereof), which weighs contents by type hierarchy to ensure the maximum content is retained
 * Version: 12.0.1
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/object-merge-advanced/
 */

import e from"lodash.clonedeep";import t from"lodash.includes";import n from"lodash.uniq";import y from"lodash.isplainobject";import r from"lodash.isdate";import{includesWithGlob as p}from"array-includes-with-glob";import{nonEmpty as o}from"util-nonempty";const c="12.0.1";function a(e){return"string"==typeof e}function i(e){return"boolean"==typeof e}const h=Array.isArray;function s(e){return!!e&&e.some((e=>"string"==typeof e))}function f(e,t){return 0===Object.keys(e).length||0===Object.keys(t).length||Object.keys(e).every((e=>Object.keys(t).includes(e)))||Object.keys(t).every((t=>Object.keys(e).includes(t)))}function u(e){return null===e?"null":r(e)?"date":y(e)?"object":h(e)?"array":typeof e}const b={cb:null,mergeObjectsOnlyWhenKeysetMatches:!0,ignoreKeys:[],hardMergeKeys:[],hardArrayConcatKeys:[],mergeArraysContainingStringsToBeEmpty:!1,oneToManyArrayObjectMerge:!1,hardMergeEverything:!1,hardArrayConcat:!1,ignoreEverything:!1,concatInsteadOfMerging:!0,dedupeStringsInArrayValues:!1,mergeBoolsUsingOrNotAnd:!0,useNullAsExplicitFalse:!1};function k(c,g,l,d){const m={...b,...d};let M;if("string"==typeof m.ignoreKeys&&(m.ignoreKeys=[m.ignoreKeys]),"string"==typeof m.hardMergeKeys&&(m.hardMergeKeys=[m.hardMergeKeys]),m.hardMergeKeys.includes("*")&&(m.hardMergeEverything=!0),m.ignoreKeys.includes("*")&&(m.ignoreEverything=!0),m.useNullAsExplicitFalse&&(null===g||null===l))return"function"==typeof m.cb?m.cb(g,l,null,{path:c.path,key:c.key,type:c.type}):null;let O=h(g)||y(g)?e(g):g;const A=h(l)||y(l)?e(l):l;let v;m.ignoreEverything?v=O:m.hardMergeEverything&&(v=A);const K=m.hardMergeEverything||m.ignoreEverything;if(!h(O)){if(y(O)){if(o(O)){if(h(A)){if(o(A)){const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:M,key:c.key,type:c.type}):t}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:M,key:c.key,type:c.type}):t}if(y(A)){Object.keys(A).forEach((e=>{M=c.path&&c.path.length?`${c.path}.${e}`:`${e}`,O[e]=O.hasOwnProperty(e)?p(e,m.ignoreKeys)?k({path:M,key:e,type:[u(O),u(A)]},O[e],A[e],{...m,ignoreEverything:!0}):p(e,m.hardMergeKeys)?k({path:M,key:e,type:[u(O),u(A)]},O[e],A[e],{...m,hardMergeEverything:!0}):p(e,m.hardArrayConcatKeys)?k({path:M,key:e,type:[u(O),u(A)]},O[e],A[e],{...m,hardArrayConcat:!0}):k({path:M,key:e,type:[u(O[e]),u(A[e])]},O[e],A[e],m):A[e]}));const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):O}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}if(h(A)||y(A)||o(A)){const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}if(r(O)){if(isFinite(O)){if(r(A)){if(isFinite(A)){const t=K?v:O>A?O:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:A||O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}if(r(A)){const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}if(a(O)){if(o(O)){if((h(A)||y(A)||a(A))&&o(A)){const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}if(null!=A&&!i(A)){const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}if("number"==typeof O){if(o(A)){const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}if(i(O)){if(i(A)){if(m.mergeBoolsUsingOrNotAnd){const t=K?v:O||A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:O&&A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}if(null!=A){const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}if(null===O){if(null!=A){const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}{const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:c.path,key:c.key,type:c.type}):t}}if(!o(O)){if(o(A)){const t=K?v:A;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:M,key:c.key,type:c.type}):t}const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:M,key:c.key,type:c.type}):t}if(!h(A)||!o(A)){const t=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:M,key:c.key,type:c.type}):t}{if(m.mergeArraysContainingStringsToBeEmpty&&(s(O)||s(A))){const t=K?v:[];return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:M,key:c.key,type:c.type}):t}if(m.hardArrayConcat){const t=K?v:O.concat(A);return"function"==typeof m.cb?m.cb(e(g),e(l),t,{path:M,key:c.key,type:c.type}):t}let r=[];for(let e=0,n=Math.max(O.length,A.length);e<n;e++)M=c.path&&c.path.length?`${c.path}.${e}`:`${e}`,y(O[e])&&y(A[e])&&(m.mergeObjectsOnlyWhenKeysetMatches&&f(O[e],A[e])||!m.mergeObjectsOnlyWhenKeysetMatches)?r.push(k({path:M,key:c.key,type:[u(O),u(A)]},O[e],A[e],m)):!m.oneToManyArrayObjectMerge||1!==O.length&&1!==A.length?m.concatInsteadOfMerging?(e<O.length&&r.push(O[e]),e<A.length&&r.push(A[e])):(e<O.length&&r.push(O[e]),e<A.length&&!t(O,A[e])&&r.push(A[e])):r.push(1===O.length?k({path:M,key:c.key,type:[u(O),u(A)]},O[0],A[e],m):k({path:M,key:c.key,type:[u(O),u(A)]},O[e],A[0],m));m.dedupeStringsInArrayValues&&r.every((e=>a(e)))&&(r=n(r).sort()),O=e(r)}const E=K?v:O;return"function"==typeof m.cb?m.cb(e(g),e(l),E,{path:c.path,key:c.key,type:c.type}):E}function g(e,t,n){if(!arguments.length)throw new TypeError("object-merge-advanced/mergeAdvanced(): [THROW_ID_01] Both inputs are missing");return k({key:null,path:"",type:[u(e),u(t)]},e,t,n)}export{b as defaults,g as mergeAdvanced,c as version};
