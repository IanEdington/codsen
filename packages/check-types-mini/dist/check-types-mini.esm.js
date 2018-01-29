import typ from 'type-detect';
import pullAll from 'lodash.pullall';
import intersection from 'lodash.intersection';
import arrayiffyIfString from 'arrayiffy-if-string';

function checkTypesMini(obj, originalRef, originalOptions) {
  function existy(something) {
    return something != null;
  }
  function isBool(something) {
    return typ(something) === 'boolean';
  }
  function isStr(something) {
    return typ(something) === 'string';
  }
  function isObj(something) {
    return typ(something) === 'Object';
  }
  var NAMESFORANYTYPE = ['any', 'anything', 'every', 'everything', 'all', 'whatever', 'whatevs'];
  var isArr = Array.isArray;

  if (arguments.length === 0) {
    throw new Error('check-types-mini: [THROW_ID_01] Missing all arguments!');
  }
  if (arguments.length === 1) {
    throw new Error('check-types-mini: [THROW_ID_02] Missing second argument!');
  }

  var ref = isObj(originalRef) ? originalRef : {};

  var defaults = {
    ignoreKeys: [],
    acceptArrays: false,
    acceptArraysIgnore: [],
    enforceStrictKeyset: true,
    schema: {},
    msg: 'check-types-mini',
    optsVarName: 'opts'
  };
  var opts = void 0;
  if (existy(originalOptions) && isObj(originalOptions)) {
    opts = Object.assign({}, defaults, originalOptions);
  } else {
    opts = Object.assign({}, defaults);
  }
  if (!isStr(opts.msg)) {
    throw new Error('check-types-mini: [THROW_ID_03] opts.msg must be string! Currently it\'s: ' + typ(opts.msg) + ', equal to ' + JSON.stringify(opts.msg, null, 4));
  }
  opts.msg = opts.msg.trim();
  if (opts.msg[opts.msg.length - 1] === ':') {
    opts.msg = opts.msg.slice(0, opts.msg.length - 1);
  }
  if (!isStr(opts.optsVarName)) {
    throw new Error('check-types-mini: [THROW_ID_04] opts.optsVarName must be string! Currently it\'s: ' + typ(opts.optsVarName) + ', equal to ' + JSON.stringify(opts.optsVarName, null, 4));
  }

  opts.ignoreKeys = arrayiffyIfString(opts.ignoreKeys);
  opts.acceptArraysIgnore = arrayiffyIfString(opts.acceptArraysIgnore);
  // make every schema object key's value to be an array:

  if (!isArr(opts.ignoreKeys)) {
    throw new TypeError('check-types-mini: [THROW_ID_05] opts.ignoreKeys should be an array, currently it\'s: ' + typ(opts.ignoreKeys));
  }
  if (!isBool(opts.acceptArrays)) {
    throw new TypeError('check-types-mini: [THROW_ID_06] opts.acceptArrays should be a Boolean, currently it\'s: ' + typ(opts.acceptArrays));
  }
  if (!isArr(opts.acceptArraysIgnore)) {
    throw new TypeError('check-types-mini: [THROW_ID_07] opts.acceptArraysIgnore should be an array, currently it\'s: ' + typ(opts.acceptArraysIgnore));
  }
  if (!isBool(opts.enforceStrictKeyset)) {
    throw new TypeError('check-types-mini: [THROW_ID_08] opts.enforceStrictKeyset should be a Boolean, currently it\'s: ' + typ(opts.enforceStrictKeyset));
  }
  Object.keys(opts.schema).forEach(function (oneKey) {
    if (!isArr(opts.schema[oneKey])) {
      opts.schema[oneKey] = [opts.schema[oneKey]];
    }
    // then turn all keys into strings and trim and lowercase them:
    opts.schema[oneKey] = opts.schema[oneKey].map(String).map(function (el) {
      return el.toLowerCase();
    }).map(function (el) {
      return el.trim();
    });
  });

  if (opts.enforceStrictKeyset) {
    if (existy(opts.schema) && Object.keys(opts.schema).length > 0) {
      if (pullAll(Object.keys(obj), Object.keys(ref).concat(Object.keys(opts.schema))).length !== 0) {
        throw new TypeError(opts.msg + ': ' + opts.optsVarName + '.enforceStrictKeyset is on and the following keys are not covered by schema and/or reference objects: ' + JSON.stringify(pullAll(Object.keys(obj), Object.keys(ref).concat(Object.keys(opts.schema))), null, 4));
      }
    } else if (existy(ref) && Object.keys(ref).length > 0) {
      if (pullAll(Object.keys(obj), Object.keys(ref)).length !== 0) {
        throw new TypeError(opts.msg + ': The input object has keys that are not covered by reference object: ' + JSON.stringify(pullAll(Object.keys(obj), Object.keys(ref)), null, 4));
      } else if (pullAll(Object.keys(ref), Object.keys(obj)).length !== 0) {
        throw new TypeError(opts.msg + ': The reference object has keys that are not present in the input object: ' + JSON.stringify(pullAll(Object.keys(ref), Object.keys(obj)), null, 4));
      }
    } else {
      // it's an error because both schema and reference don't exist
      throw new TypeError(opts.msg + ': Both ' + opts.optsVarName + '.schema and reference objects are missing! We don\'t have anything to match the keys as you requested via opts.enforceStrictKeyset!');
    }
  }

  Object.keys(obj).forEach(function (key) {
    if (existy(opts.schema) && Object.prototype.hasOwnProperty.call(opts.schema, key)) {
      // stage 1. check schema, if present
      opts.schema[key] = arrayiffyIfString(opts.schema[key]).map(String).map(function (el) {
        return el.toLowerCase();
      });
      // first check does our schema contain any blanket names, "any", "whatever" etc.
      if (!intersection(opts.schema[key], NAMESFORANYTYPE).length) {
        // because, if not, it means we need to do some work, check types:
        if (obj[key] !== true && obj[key] !== false && !opts.schema[key].includes(typ(obj[key]).toLowerCase()) || (obj[key] === true || obj[key] === false) && !opts.schema[key].includes(String(obj[key])) && !opts.schema[key].includes('boolean')) {
          // new in v.2.2
          // Check if key's value is array. Then, if it is, check if opts.acceptArrays is on.
          // If it is, then iterate through the array, checking does each value conform to the
          // types listed in that key's schema entry.
          if (isArr(obj[key]) && opts.acceptArrays) {
            // check each key:
            for (var i = 0, len = obj[key].length; i < len; i++) {
              if (!opts.schema[key].includes(typ(obj[key][i]).toLowerCase())) {
                throw new TypeError(opts.msg + ': ' + opts.optsVarName + '.' + key + ' is of type ' + typ(obj[key][i]).toLowerCase() + ', but only the following are allowed in ' + opts.optsVarName + '.schema: ' + opts.schema[key]);
              }
            }
          } else {
            // only then, throw
            throw new TypeError(opts.msg + ': ' + opts.optsVarName + '.' + key + ' was customised to ' + JSON.stringify(obj[key], null, 4) + ' which is not among the allowed types in schema (' + opts.schema[key] + ') but ' + typ(obj[key]));
          }
        }
      }
    } else if (existy(ref) && Object.prototype.hasOwnProperty.call(ref, key) && typ(obj[key]) !== typ(ref[key]) && !opts.ignoreKeys.includes(key)) {
      if (opts.acceptArrays && isArr(obj[key]) && !opts.acceptArraysIgnore.includes(key)) {
        var allMatch = obj[key].every(function (el) {
          return typ(el) === typ(ref[key]);
        });
        if (!allMatch) {
          throw new TypeError(opts.msg + ': ' + opts.optsVarName + '.' + key + ' was customised to be array, but not all of its elements are ' + typ(ref[key]) + '-type');
        }
      } else {
        throw new TypeError(opts.msg + ': ' + opts.optsVarName + '.' + key + ' was customised to ' + JSON.stringify(obj[key], null, 4) + ' which is not ' + typ(ref[key]) + ' but ' + typ(obj[key]));
      }
    }
  });
}

export default checkTypesMini;
