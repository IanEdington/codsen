/**
 * object-flatten-referencing
 * Flatten complex nested objects according to a reference objects
 * Version: 4.10.4
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/object-flatten-referencing
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var typ = _interopDefault(require('type-detect'));
var clone = _interopDefault(require('lodash.clonedeep'));
var search = _interopDefault(require('str-indexes-of-plus'));
var includes = _interopDefault(require('lodash.includes'));
var matcher = _interopDefault(require('matcher'));
var checkTypes = _interopDefault(require('check-types-mini'));
var isStringInt = _interopDefault(require('is-string-int'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var isArr = Array.isArray;
function isStr(something) {
  return typ(something) === "string";
}
function isObj(something) {
  return typ(something) === "Object";
}
function flattenObject(objOrig, opts) {
  if (arguments.length === 0 || Object.keys(objOrig).length === 0) {
    return [];
  }
  var obj = clone(objOrig);
  var res = [];
  if (isObj(obj)) {
    Object.keys(obj).forEach(function (key) {
      if (isObj(obj[key])) {
        obj[key] = flattenObject(obj[key], opts);
      }
      if (isArr(obj[key])) {
        res = res.concat(obj[key].map(function (el) {
          return key + opts.objectKeyAndValueJoinChar + el;
        }));
      }
      if (isStr(obj[key])) {
        res.push(key + opts.objectKeyAndValueJoinChar + obj[key]);
      }
    });
  }
  return res;
}
function flattenArr(arrOrig, opts, wrap, joinArraysUsingBrs) {
  if (arguments.length === 0 || arrOrig.length === 0) {
    return "";
  }
  var arr = clone(arrOrig);
  var res = "";
  if (arr.length > 0) {
    if (joinArraysUsingBrs) {
      for (var i = 0, len = arr.length; i < len; i++) {
        if (isStr(arr[i])) {
          var lineBreak = void 0;
          lineBreak = "";
          if (opts.mergeArraysWithLineBreaks && i > 0 && (!opts.mergeWithoutTrailingBrIfLineContainsBr || typeof arr[i - 1] !== "string" || opts.mergeWithoutTrailingBrIfLineContainsBr && arr[i - 1] !== undefined && !arr[i - 1].toLowerCase().includes("<br"))) {
            lineBreak = "<br".concat(opts.xhtml ? " /" : "", ">");
          }
          res += lineBreak + (wrap ? opts.wrapHeadsWith : "") + arr[i] + (wrap ? opts.wrapTailsWith : "");
        } else if (isArr(arr[i])) {
          if (arr[i].length > 0 && arr[i].every(isStr)) {
            (function () {
              var lineBreak = "";
              if (opts.mergeArraysWithLineBreaks && res.length > 0) {
                lineBreak = "<br".concat(opts.xhtml ? " /" : "", ">");
              }
              res = arr[i].reduce(function (acc, val, i2, arr2) {
                var trailingSpace = "";
                if (i2 !== arr2.length - 1) {
                  trailingSpace = " ";
                }
                return acc + (i2 === 0 ? lineBreak : "") + (wrap ? opts.wrapHeadsWith : "") + val + (wrap ? opts.wrapTailsWith : "") + trailingSpace;
              }, res);
            })();
          }
        }
      }
    } else {
      res = arr.reduce(function (acc, val, i, arr2) {
        var lineBreak = "";
        if (opts.mergeArraysWithLineBreaks && i > 0) {
          lineBreak = "<br".concat(opts.xhtml ? " /" : "", ">");
        }
        var trailingSpace = "";
        if (i !== arr2.length - 1) {
          trailingSpace = " ";
        }
        return acc + (i === 0 ? lineBreak : "") + (wrap ? opts.wrapHeadsWith : "") + val + (wrap ? opts.wrapTailsWith : "") + trailingSpace;
      }, res);
    }
  }
  return res;
}
function arrayiffyString(something) {
  if (isStr(something)) {
    if (something.length > 0) {
      return [something];
    }
    return [];
  }
  return something;
}
function reclaimIntegerString(something) {
  if (isStr(something) && isStringInt(something.trim())) {
    return parseInt(something.trim(), 10);
  }
  return something;
}

var isArr$1 = Array.isArray;
function existy(x) {
  return x != null;
}
function isStr$1(something) {
  return typ(something) === "string";
}
function isObj$1(something) {
  return typ(something) === "Object";
}
function outer(originalInput1, originalReference1, opts1) {
  if (arguments.length === 0) {
    throw new Error("object-flatten-referencing/ofr(): [THROW_ID_01] all inputs missing!");
  }
  if (arguments.length === 1) {
    throw new Error("object-flatten-referencing/ofr(): [THROW_ID_02] reference object missing!");
  }
  if (existy(opts1) && !isObj$1(opts1)) {
    throw new Error("object-flatten-referencing/ofr(): [THROW_ID_03] third input, options object must be a plain object. Currently it's: ".concat(_typeof(opts1)));
  }
  function ofr(originalInput, originalReference, opts, wrap, joinArraysUsingBrs, currentRoot) {
    var input = clone(originalInput);
    var reference = clone(originalReference);
    if (wrap === undefined) {
      wrap = true;
    }
    if (joinArraysUsingBrs === undefined) {
      joinArraysUsingBrs = true;
    }
    if (currentRoot === undefined) {
      currentRoot = "";
    }
    var defaults = {
      wrapHeadsWith: "%%_",
      wrapTailsWith: "_%%",
      dontWrapKeys: [],
      dontWrapPaths: [],
      xhtml: true,
      preventDoubleWrapping: true,
      preventWrappingIfContains: [],
      objectKeyAndValueJoinChar: ".",
      wrapGlobalFlipSwitch: true,
      ignore: [],
      whatToDoWhenReferenceIsMissing: 0,
      mergeArraysWithLineBreaks: true,
      mergeWithoutTrailingBrIfLineContainsBr: true,
      enforceStrictKeyset: true
    };
    opts = Object.assign({}, defaults, opts);
    opts.dontWrapKeys = arrayiffyString(opts.dontWrapKeys);
    opts.preventWrappingIfContains = arrayiffyString(opts.preventWrappingIfContains);
    opts.dontWrapPaths = arrayiffyString(opts.dontWrapPaths);
    opts.ignore = arrayiffyString(opts.ignore);
    opts.whatToDoWhenReferenceIsMissing = reclaimIntegerString(opts.whatToDoWhenReferenceIsMissing);
    checkTypes(opts, defaults, {
      msg: "object-flatten-referencing/ofr(): [THROW_ID_05*]",
      optsVarName: "opts",
      enforceStrictKeyset: opts.enforceStrictKeyset
    });
    if (!opts.wrapGlobalFlipSwitch) {
      wrap = false;
    }
    if (isObj$1(input)) {
      Object.keys(input).forEach(function (key) {
        var currentPath = currentRoot + (currentRoot.length === 0 ? key : ".".concat(key));
        if (opts.ignore.length === 0 || !includes(opts.ignore, key)) {
          if (opts.wrapGlobalFlipSwitch) {
            wrap = true;
            if (opts.dontWrapKeys.length > 0) {
              wrap = wrap && !opts.dontWrapKeys.some(function (elem) {
                return matcher.isMatch(key, elem, {
                  caseSensitive: true
                });
              });
            }
            if (opts.dontWrapPaths.length > 0) {
              wrap = wrap && !opts.dontWrapPaths.some(function (elem) {
                return elem === currentPath;
              });
            }
            if (opts.preventWrappingIfContains.length > 0 && typeof input[key] === "string") {
              wrap = wrap && !opts.preventWrappingIfContains.some(function (elem) {
                return input[key].includes(elem);
              });
            }
          }
          if (existy(reference[key]) || !existy(reference[key]) && opts.whatToDoWhenReferenceIsMissing === 2) {
            if (isArr$1(input[key])) {
              if (opts.whatToDoWhenReferenceIsMissing === 2 || isStr$1(reference[key])) {
                input[key] = flattenArr(input[key], opts, wrap, joinArraysUsingBrs);
              } else {
                if (input[key].every(function (el) {
                  return typeof el === "string" || Array.isArray(el);
                })) {
                  var allOK = true;
                  input[key].forEach(function (oneOfElements) {
                    if (Array.isArray(oneOfElements) && !oneOfElements.every(isStr$1)) {
                      allOK = false;
                    }
                  });
                  if (allOK) {
                    joinArraysUsingBrs = false;
                  }
                }
                input[key] = ofr(input[key], reference[key], opts, wrap, joinArraysUsingBrs, currentPath);
              }
            } else if (isObj$1(input[key])) {
              if (opts.whatToDoWhenReferenceIsMissing === 2 || isStr$1(reference[key])) {
                input[key] = flattenArr(flattenObject(input[key], opts), opts, wrap, joinArraysUsingBrs);
              } else if (!wrap) {
                input[key] = ofr(input[key], reference[key], Object.assign({}, opts, {
                  wrapGlobalFlipSwitch: false
                }), wrap, joinArraysUsingBrs, currentPath);
              } else {
                input[key] = ofr(input[key], reference[key], opts, wrap, joinArraysUsingBrs, currentPath);
              }
            } else if (isStr$1(input[key])) {
              input[key] = ofr(input[key], reference[key], opts, wrap, joinArraysUsingBrs, currentPath);
            }
          } else if (typ(input[key]) !== typ(reference[key])) {
            if (opts.whatToDoWhenReferenceIsMissing === 1) {
              throw new Error("object-flatten-referencing/ofr(): [THROW_ID_06] reference object does not have the key ".concat(key, " and we need it. TIP: Turn off throwing via opts.whatToDoWhenReferenceIsMissing."));
            }
          }
        }
      });
    } else if (isArr$1(input)) {
      if (isArr$1(reference)) {
        input.forEach(function (el, i) {
          if (existy(input[i]) && existy(reference[i])) {
            input[i] = ofr(input[i], reference[i], opts, wrap, joinArraysUsingBrs, "".concat(currentRoot, "[").concat(i, "]"));
          } else {
            input[i] = ofr(input[i], reference[0], opts, wrap, joinArraysUsingBrs, "".concat(currentRoot, "[").concat(i, "]"));
          }
        });
      } else if (isStr$1(reference)) {
        input = flattenArr(input, opts, wrap, joinArraysUsingBrs);
      }
    } else if (isStr$1(input)) {
      if (input.length > 0 && (opts.wrapHeadsWith || opts.wrapTailsWith)) {
        if (!opts.preventDoubleWrapping || (opts.wrapHeadsWith === "" || !search(input, opts.wrapHeadsWith.trim()).length) && (opts.wrapTailsWith === "" || !search(input, opts.wrapTailsWith.trim()).length)) {
          input = (wrap ? opts.wrapHeadsWith : "") + input + (wrap ? opts.wrapTailsWith : "");
        }
      }
    }
    return input;
  }
  return ofr(originalInput1, originalReference1, opts1);
}

module.exports = outer;
