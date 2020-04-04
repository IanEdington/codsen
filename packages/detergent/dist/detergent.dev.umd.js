/**
 * detergent
 * a tool to prepare text for pasting into HTML
 * Version: 5.8.11
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://detergent.io
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.detergent = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';
  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */

  function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;

    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }

    return result;
  }
  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */


  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }
  /** Used for built-in method references. */


  var funcProto = Function.prototype,
      objectProto = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString = funcProto.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /** Used to infer the `Object` constructor. */

  var objectCtorString = funcToString.call(Object);
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var objectToString = objectProto.toString;
  /** Built-in value references. */

  var getPrototype = overArg(Object.getPrototypeOf, Object);
  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */

  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */


  function isPlainObject(value) {
    if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
      return false;
    }

    var proto = getPrototype(value);

    if (proto === null) {
      return true;
    }

    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }

  var lodash_isplainobject = isPlainObject;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var lodash_clonedeep = createCommonjsModule(function (module, exports) {
    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;
    /** Used to stand-in for `undefined` hash values. */

    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    /** Used as references for various `Number` constants. */

    var MAX_SAFE_INTEGER = 9007199254740991;
    /** `Object#toString` result references. */

    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        promiseTag = '[object Promise]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';
    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */

    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    /** Used to match `RegExp` flags from their coerced string values. */

    var reFlags = /\w*$/;
    /** Used to detect host constructors (Safari). */

    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    /** Used to detect unsigned integer values. */

    var reIsUint = /^(?:0|[1-9]\d*)$/;
    /** Used to identify `toStringTag` values supported by `_.clone`. */

    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    /** Detect free variable `global` from Node.js. */

    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    /** Detect free variable `self`. */

    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */

    var root = freeGlobal || freeSelf || Function('return this')();
    /** Detect free variable `exports`. */

    var freeExports =  exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /**
     * Adds the key-value `pair` to `map`.
     *
     * @private
     * @param {Object} map The map to modify.
     * @param {Array} pair The key-value pair to add.
     * @returns {Object} Returns `map`.
     */

    function addMapEntry(map, pair) {
      // Don't return `map.set` because it's not chainable in IE 11.
      map.set(pair[0], pair[1]);
      return map;
    }
    /**
     * Adds `value` to `set`.
     *
     * @private
     * @param {Object} set The set to modify.
     * @param {*} value The value to add.
     * @returns {Object} Returns `set`.
     */


    function addSetEntry(set, value) {
      // Don't return `set.add` because it's not chainable in IE 11.
      set.add(value);
      return set;
    }
    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */


    function arrayEach(array, iteratee) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }

      return array;
    }
    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */


    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }

      return array;
    }
    /**
     * A specialized version of `_.reduce` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the first element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */


    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
          length = array ? array.length : 0;

      if (initAccum && length) {
        accumulator = array[++index];
      }

      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }

      return accumulator;
    }
    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */


    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }

      return result;
    }
    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */


    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }
    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */


    function isHostObject(value) {
      // Many host objects are `Object` objects that can coerce to strings
      // despite having improperly defined `toString` methods.
      var result = false;

      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }

      return result;
    }
    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */


    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);
      map.forEach(function (value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */


    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }
    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */


    function setToArray(set) {
      var index = -1,
          result = Array(set.size);
      set.forEach(function (value) {
        result[++index] = value;
      });
      return result;
    }
    /** Used for built-in method references. */


    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;
    /** Used to detect overreaching core-js shims. */

    var coreJsData = root['__core-js_shared__'];
    /** Used to detect methods masquerading as native. */

    var maskSrcKey = function () {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? 'Symbol(src)_1.' + uid : '';
    }();
    /** Used to resolve the decompiled source of functions. */


    var funcToString = funcProto.toString;
    /** Used to check objects for own properties. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */

    var objectToString = objectProto.toString;
    /** Used to detect if a method is native. */

    var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    /** Built-in value references. */

    var Buffer = moduleExports ? root.Buffer : undefined,
        Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice;
    /* Built-in method references for those with the same name as other `lodash` methods. */

    var nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeKeys = overArg(Object.keys, Object);
    /* Built-in method references that are verified to be native. */

    var DataView = getNative(root, 'DataView'),
        Map = getNative(root, 'Map'),
        Promise = getNative(root, 'Promise'),
        Set = getNative(root, 'Set'),
        WeakMap = getNative(root, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');
    /** Used to detect maps, sets, and weakmaps. */

    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);
    /** Used to convert symbols to primitives and strings. */

    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function Hash(entries) {
      var index = -1,
          length = entries ? entries.length : 0;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */


    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function hashGet(key) {
      var data = this.__data__;

      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }

      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }
    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }
    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */


    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
      return this;
    } // Add methods to `Hash`.


    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function ListCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */


    function listCacheClear() {
      this.__data__ = [];
    }
    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }

      var lastIndex = data.length - 1;

      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }

      return true;
    }
    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);
      return index < 0 ? undefined : data[index][1];
    }
    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */


    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }

      return this;
    } // Add methods to `ListCache`.


    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function MapCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;
      this.clear();

      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */


    function mapCacheClear() {
      this.__data__ = {
        'hash': new Hash(),
        'map': new (Map || ListCache)(),
        'string': new Hash()
      };
    }
    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }
    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */


    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    } // Add methods to `MapCache`.


    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */

    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */


    function stackClear() {
      this.__data__ = new ListCache();
    }
    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */


    function stackDelete(key) {
      return this.__data__['delete'](key);
    }
    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */


    function stackGet(key) {
      return this.__data__.get(key);
    }
    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */


    function stackHas(key) {
      return this.__data__.has(key);
    }
    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */


    function stackSet(key, value) {
      var cache = this.__data__;

      if (cache instanceof ListCache) {
        var pairs = cache.__data__;

        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }

        cache = this.__data__ = new MapCache(pairs);
      }

      cache.set(key, value);
      return this;
    } // Add methods to `Stack`.


    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */

    function arrayLikeKeys(value, inherited) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      // Safari 9 makes `arguments.length` enumerable in strict mode.
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length,
          skipIndexes = !!length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
          result.push(key);
        }
      }

      return result;
    }
    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */


    function assignValue(object, key, value) {
      var objValue = object[key];

      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
        object[key] = value;
      }
    }
    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */


    function assocIndexOf(array, key) {
      var length = array.length;

      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }

      return -1;
    }
    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */


    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }
    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {boolean} [isFull] Specify a clone including symbols.
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */


    function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
      var result;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }

      if (result !== undefined) {
        return result;
      }

      if (!isObject(value)) {
        return value;
      }

      var isArr = isArray(value);

      if (isArr) {
        result = initCloneArray(value);

        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }

        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          if (isHostObject(value)) {
            return object ? value : {};
          }

          result = initCloneObject(isFunc ? {} : value);

          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }

          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      } // Check for circular references and return its corresponding clone.


      stack || (stack = new Stack());
      var stacked = stack.get(value);

      if (stacked) {
        return stacked;
      }

      stack.set(value, result);

      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys(value);
      }

      arrayEach(props || value, function (subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        } // Recursively populate clone (susceptible to call stack limits).


        assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
      });
      return result;
    }
    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */


    function baseCreate(proto) {
      return isObject(proto) ? objectCreate(proto) : {};
    }
    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */


    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    /**
     * The base implementation of `getTag`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */


    function baseGetTag(value) {
      return objectToString.call(value);
    }
    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */


    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }

      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */


    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }

      var result = [];

      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }

      return result;
    }
    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */


    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }

      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */


    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }
    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */


    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    /**
     * Creates a clone of `map`.
     *
     * @private
     * @param {Object} map The map to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned map.
     */


    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor());
    }
    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */


    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    /**
     * Creates a clone of `set`.
     *
     * @private
     * @param {Object} set The set to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned set.
     */


    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor());
    }
    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */


    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */


    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */


    function copyArray(source, array) {
      var index = -1,
          length = source.length;
      array || (array = Array(length));

      while (++index < length) {
        array[index] = source[index];
      }

      return array;
    }
    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */


    function copyObject(source, props, object, customizer) {
      object || (object = {});
      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
        assignValue(object, key, newValue === undefined ? source[key] : newValue);
      }

      return object;
    }
    /**
     * Copies own symbol properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */


    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */


    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */


    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
    }
    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */


    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }
    /**
     * Creates an array of the own enumerable symbol properties of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */


    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */

    var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11,
    // for data views in Edge < 14, and promises in Node.js.

    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function (value) {
        var result = objectToString.call(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : undefined;

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;

            case mapCtorString:
              return mapTag;

            case promiseCtorString:
              return promiseTag;

            case setCtorString:
              return setTag;

            case weakMapCtorString:
              return weakMapTag;
          }
        }

        return result;
      };
    }
    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */


    function initCloneArray(array) {
      var length = array.length,
          result = array.constructor(length); // Add properties assigned by `RegExp#exec`.

      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }

      return result;
    }
    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */


    function initCloneObject(object) {
      return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */


    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;

      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return cloneSet(object, isDeep, cloneFunc);

        case symbolTag:
          return cloneSymbol(object);
      }
    }
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */


    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    }
    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */


    function isKeyable(value) {
      var type = typeof value;
      return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
    }
    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */


    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */


    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
      return value === proto;
    }
    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */


    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}

        try {
          return func + '';
        } catch (e) {}
      }

      return '';
    }
    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */


    function cloneDeep(value) {
      return baseClone(value, true, true);
    }
    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */


    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */


    function isArguments(value) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
    }
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */


    var isArray = Array.isArray;
    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */

    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */


    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */


    var isBuffer = nativeIsBuffer || stubFalse;
    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */

    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8-9 which returns 'object' for typed array and other constructors.
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */


    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */


    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */


    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */


    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */


    function stubArray() {
      return [];
    }
    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */


    function stubFalse() {
      return false;
    }

    module.exports = cloneDeep;
  });

  /**
   * string-left-right
   * Look what's to the left or the right of a given index within a string
   * Version: 2.3.17
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-left-right
   */

  function x(something) {
    const res = {
      value: something,
      hungry: false,
      optional: false
    };

    if ((res.value.endsWith("?*") || res.value.endsWith("*?")) && res.value.length > 2) {
      res.value = res.value.slice(0, res.value.length - 2);
      res.optional = true;
      res.hungry = true;
    } else if (res.value.endsWith("?") && res.value.length > 1) {
      res.value = res.value.slice(0, res.value.length - 1);
      res.optional = true;
    } else if (res.value.endsWith("*") && res.value.length > 1) {
      res.value = res.value.slice(0, res.value.length - 1);
      res.hungry = true;
    }

    return res;
  }

  function isNum(something) {
    return typeof something === "number";
  }

  function isStr(something) {
    return typeof something === "string";
  }

  function rightMain(str, idx, stopAtNewlines) {
    if (typeof str !== "string" || !str.length) {
      return null;
    }

    if (!idx || typeof idx !== "number") {
      idx = 0;
    }

    if (!str[idx + 1]) {
      return null;
    } else if (str[idx + 1] && (!stopAtNewlines && str[idx + 1].trim().length || stopAtNewlines && (str[idx + 1].trim().length || "\n\r".includes(str[idx + 1])))) {
      return idx + 1;
    } else if (str[idx + 2] && (!stopAtNewlines && str[idx + 2].trim().length || stopAtNewlines && (str[idx + 2].trim().length || "\n\r".includes(str[idx + 2])))) {
      return idx + 2;
    }

    for (let i = idx + 1, len = str.length; i < len; i++) {
      if (str[i] && (!stopAtNewlines && str[i].trim().length || stopAtNewlines && (str[i].trim().length || "\n\r".includes(str[i])))) {
        return i;
      }
    }

    return null;
  }

  function right(str, idx) {
    return rightMain(str, idx, false);
  }

  function rightStopAtNewLines(str, idx) {
    return rightMain(str, idx, true);
  }

  function leftMain(str, idx, stopAtNewlines) {
    if (typeof str !== "string" || !str.length) {
      return null;
    }

    if (!idx || typeof idx !== "number") {
      idx = 0;
    }

    if (idx < 1) {
      return null;
    } else if (str[idx - 1] && (!stopAtNewlines && str[idx - 1].trim().length || stopAtNewlines && (str[idx - 1].trim().length || "\n\r".includes(str[idx - 1])))) {
      return idx - 1;
    } else if (str[idx - 2] && (!stopAtNewlines && str[idx - 2].trim().length || stopAtNewlines && (str[idx - 2].trim().length || "\n\r".includes(str[idx - 2])))) {
      return idx - 2;
    }

    for (let i = idx; i--;) {
      if (str[i] && (!stopAtNewlines && str[i].trim().length || stopAtNewlines && (str[i].trim().length || "\n\r".includes(str[i])))) {
        return i;
      }
    }

    return null;
  }

  function left(str, idx) {
    return leftMain(str, idx, false);
  }

  function leftStopAtNewLines(str, idx) {
    return leftMain(str, idx, true);
  }

  function seq(direction, str, idx, opts, args) {
    if (typeof str !== "string" || !str.length) {
      return null;
    }

    if (!idx || typeof idx !== "number") {
      idx = 0;
    }

    if (direction === "right" && !str[idx + 1] || direction === "left" && !str[idx - 1]) {
      return null;
    }

    let lastFinding = idx;
    const gaps = [];
    let leftmostChar;
    let rightmostChar;
    let satiated;
    let i = 0;

    while (i < args.length) {
      if (!isStr(args[i]) || !args[i].length) {
        i++;
        continue;
      }

      const {
        value,
        optional,
        hungry
      } = x(args[i]);
      const whattsOnTheSide = direction === "right" ? right(str, lastFinding) : left(str, lastFinding);

      if (opts.i && str[whattsOnTheSide].toLowerCase() === value.toLowerCase() || !opts.i && str[whattsOnTheSide] === value) {
        const temp = direction === "right" ? right(str, whattsOnTheSide) : left(str, whattsOnTheSide);

        if (hungry && (opts.i && str[temp].toLowerCase() === value.toLowerCase() || !opts.i && str[temp] === value)) {
          satiated = true;
        } else {
          i++;
        }

        if (direction === "right" && whattsOnTheSide > lastFinding + 1) {
          gaps.push([lastFinding + 1, whattsOnTheSide]);
        } else if (direction === "left" && whattsOnTheSide < lastFinding - 1) {
          gaps.unshift([whattsOnTheSide + 1, lastFinding]);
        }

        lastFinding = whattsOnTheSide;

        if (direction === "right") {
          if (leftmostChar === undefined) {
            leftmostChar = whattsOnTheSide;
          }

          rightmostChar = whattsOnTheSide;
        } else {
          if (rightmostChar === undefined) {
            rightmostChar = whattsOnTheSide;
          }

          leftmostChar = whattsOnTheSide;
        }
      } else if (optional) {
        i++;
        continue;
      } else if (satiated) {
        i++;
        satiated = undefined;
        continue;
      } else {
        return null;
      }
    }

    if (leftmostChar === undefined) {
      return null;
    }

    return {
      gaps,
      leftmostChar,
      rightmostChar
    };
  }

  function leftSeq(str, idx, ...args) {
    if (!args.length) {
      return left(str, idx);
    }

    const defaults = {
      i: false
    };
    let opts;

    if (lodash_isplainobject(args[0])) {
      opts = Object.assign({}, defaults, args.shift());
    } else {
      opts = defaults;
    }

    return seq("left", str, idx, opts, Array.from(args).reverse());
  }

  function rightSeq(str, idx, ...args) {
    if (!args.length) {
      return right(str, idx);
    }

    const defaults = {
      i: false
    };
    let opts;

    if (lodash_isplainobject(args[0])) {
      opts = Object.assign({}, defaults, args.shift());
    } else {
      opts = defaults;
    }

    return seq("right", str, idx, opts, args);
  }

  function chomp(direction, str, idx, opts, args) {
    if (typeof str !== "string" || !str.length) {
      return null;
    }

    if (!idx || typeof idx !== "number") {
      idx = 0;
    }

    if (direction === "right" && !str[idx + 1] || direction === "left" && (isNum(idx) && idx < 1 || idx === "0")) {
      return null;
    }

    let lastRes = null;
    let lastIdx = null;

    do {
      lastRes = direction === "right" ? rightSeq(str, isNum(lastIdx) ? lastIdx : idx, ...args) : leftSeq(str, isNum(lastIdx) ? lastIdx : idx, ...args);

      if (lastRes !== null) {
        lastIdx = direction === "right" ? lastRes.rightmostChar : lastRes.leftmostChar;
      }
    } while (lastRes);

    if (lastIdx != null && direction === "right") {
      lastIdx++;
    }

    if (lastIdx === null) {
      return null;
    }

    if (direction === "right") {
      if (str[lastIdx] && str[lastIdx].trim().length) {
        return lastIdx;
      }

      const whatsOnTheRight = right(str, lastIdx);

      if (opts.mode === 0) {
        if (whatsOnTheRight === lastIdx + 1) {
          return lastIdx;
        } else if (str.slice(lastIdx, whatsOnTheRight || str.length).trim().length || str.slice(lastIdx, whatsOnTheRight || str.length).includes("\n") || str.slice(lastIdx, whatsOnTheRight || str.length).includes("\r")) {
          for (let y = lastIdx, len = str.length; y < len; y++) {
            if (`\n\r`.includes(str[y])) {
              return y;
            }
          }
        } else {
          return whatsOnTheRight ? whatsOnTheRight - 1 : str.length;
        }
      } else if (opts.mode === 1) {
        return lastIdx;
      } else if (opts.mode === 2) {
        const remainderString = str.slice(lastIdx);

        if (remainderString.trim().length || remainderString.includes("\n") || remainderString.includes("\r")) {
          for (let y = lastIdx, len = str.length; y < len; y++) {
            if (str[y].trim().length || `\n\r`.includes(str[y])) {
              return y;
            }
          }
        }

        return str.length;
      }

      return whatsOnTheRight ? whatsOnTheRight : str.length;
    }

    if (str[lastIdx] && str[lastIdx - 1] && str[lastIdx - 1].trim().length) {
      return lastIdx;
    }

    const whatsOnTheLeft = left(str, lastIdx);

    if (opts.mode === 0) {
      if (whatsOnTheLeft === lastIdx - 2) {
        return lastIdx;
      } else if (str.slice(0, lastIdx).trim().length || str.slice(0, lastIdx).includes("\n") || str.slice(0, lastIdx).includes("\r")) {
        for (let y = lastIdx; y--;) {
          if (`\n\r`.includes(str[y]) || str[y].trim().length) {
            return y + 1 + (str[y].trim().length ? 1 : 0);
          }
        }
      }

      return 0;
    } else if (opts.mode === 1) {
      return lastIdx;
    } else if (opts.mode === 2) {
      const remainderString = str.slice(0, lastIdx);

      if (remainderString.trim().length || remainderString.includes("\n") || remainderString.includes("\r")) {
        for (let y = lastIdx; y--;) {
          if (str[y].trim().length || `\n\r`.includes(str[y])) {
            return y + 1;
          }
        }
      }

      return 0;
    }

    return whatsOnTheLeft !== null ? whatsOnTheLeft + 1 : 0;
  }

  function chompLeft(str, idx, ...args) {
    if (!args.length || args.length === 1 && lodash_isplainobject(args[0])) {
      return null;
    }

    const defaults = {
      mode: 0
    };

    if (lodash_isplainobject(args[0])) {
      const opts = Object.assign({}, defaults, lodash_clonedeep(args[0]));

      if (!opts.mode) {
        opts.mode = 0;
      } else if (isStr(opts.mode) && `0123`.includes(opts.mode)) {
        opts.mode = Number.parseInt(opts.mode, 10);
      } else if (!isNum(opts.mode)) {
        throw new Error(`string-left-right/chompLeft(): [THROW_ID_01] the opts.mode is wrong! It should be 0, 1, 2 or 3. It was given as ${opts.mode} (type ${typeof opts.mode})`);
      }

      return chomp("left", str, idx, opts, lodash_clonedeep(args).slice(1));
    } else if (!isStr(args[0])) {
      return chomp("left", str, idx, defaults, lodash_clonedeep(args).slice(1));
    }

    return chomp("left", str, idx, defaults, lodash_clonedeep(args));
  }

  /**
   * all-named-html-entities
   * List of all named HTML entities
   * Version: 1.2.16
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/all-named-html-entities
   */
  var Aacute = "Á";
  var aacute = "á";
  var Abreve = "Ă";
  var abreve = "ă";
  var ac = "∾";
  var acd = "∿";
  var acE = "∾̳";
  var Acirc = "Â";
  var acirc = "â";
  var acute = "´";
  var Acy = "А";
  var acy = "а";
  var AElig = "Æ";
  var aelig = "æ";
  var af = "⁡";
  var Afr = "𝔄";
  var afr = "𝔞";
  var Agrave = "À";
  var agrave = "à";
  var alefsym = "ℵ";
  var aleph = "ℵ";
  var Alpha = "Α";
  var alpha = "α";
  var Amacr = "Ā";
  var amacr = "ā";
  var amalg = "⨿";
  var AMP = "&";
  var amp = "&";
  var And = "⩓";
  var and = "∧";
  var andand = "⩕";
  var andd = "⩜";
  var andslope = "⩘";
  var andv = "⩚";
  var ang = "∠";
  var ange = "⦤";
  var angle = "∠";
  var angmsd = "∡";
  var angmsdaa = "⦨";
  var angmsdab = "⦩";
  var angmsdac = "⦪";
  var angmsdad = "⦫";
  var angmsdae = "⦬";
  var angmsdaf = "⦭";
  var angmsdag = "⦮";
  var angmsdah = "⦯";
  var angrt = "∟";
  var angrtvb = "⊾";
  var angrtvbd = "⦝";
  var angsph = "∢";
  var angst = "Å";
  var angzarr = "⍼";
  var Aogon = "Ą";
  var aogon = "ą";
  var Aopf = "𝔸";
  var aopf = "𝕒";
  var ap = "≈";
  var apacir = "⩯";
  var apE = "⩰";
  var ape = "≊";
  var apid = "≋";
  var apos = "'";
  var ApplyFunction = "⁡";
  var approx = "≈";
  var approxeq = "≊";
  var Aring = "Å";
  var aring = "å";
  var Ascr = "𝒜";
  var ascr = "𝒶";
  var Assign = "≔";
  var ast = "*";
  var asymp = "≈";
  var asympeq = "≍";
  var Atilde = "Ã";
  var atilde = "ã";
  var Auml = "Ä";
  var auml = "ä";
  var awconint = "∳";
  var awint = "⨑";
  var backcong = "≌";
  var backepsilon = "϶";
  var backprime = "‵";
  var backsim = "∽";
  var backsimeq = "⋍";
  var Backslash = "∖";
  var Barv = "⫧";
  var barvee = "⊽";
  var Barwed = "⌆";
  var barwed = "⌅";
  var barwedge = "⌅";
  var bbrk = "⎵";
  var bbrktbrk = "⎶";
  var bcong = "≌";
  var Bcy = "Б";
  var bcy = "б";
  var bdquo = "„";
  var becaus = "∵";
  var Because = "∵";
  var because = "∵";
  var bemptyv = "⦰";
  var bepsi = "϶";
  var bernou = "ℬ";
  var Bernoullis = "ℬ";
  var Beta = "Β";
  var beta = "β";
  var beth = "ℶ";
  var between = "≬";
  var Bfr = "𝔅";
  var bfr = "𝔟";
  var bigcap = "⋂";
  var bigcirc = "◯";
  var bigcup = "⋃";
  var bigodot = "⨀";
  var bigoplus = "⨁";
  var bigotimes = "⨂";
  var bigsqcup = "⨆";
  var bigstar = "★";
  var bigtriangledown = "▽";
  var bigtriangleup = "△";
  var biguplus = "⨄";
  var bigvee = "⋁";
  var bigwedge = "⋀";
  var bkarow = "⤍";
  var blacklozenge = "⧫";
  var blacksquare = "▪";
  var blacktriangle = "▴";
  var blacktriangledown = "▾";
  var blacktriangleleft = "◂";
  var blacktriangleright = "▸";
  var blank = "␣";
  var blk12 = "▒";
  var blk14 = "░";
  var blk34 = "▓";
  var block = "█";
  var bne = "=⃥";
  var bnequiv = "≡⃥";
  var bNot = "⫭";
  var bnot = "⌐";
  var Bopf = "𝔹";
  var bopf = "𝕓";
  var bot = "⊥";
  var bottom = "⊥";
  var bowtie = "⋈";
  var boxbox = "⧉";
  var boxDL = "╗";
  var boxDl = "╖";
  var boxdL = "╕";
  var boxdl = "┐";
  var boxDR = "╔";
  var boxDr = "╓";
  var boxdR = "╒";
  var boxdr = "┌";
  var boxH = "═";
  var boxh = "─";
  var boxHD = "╦";
  var boxHd = "╤";
  var boxhD = "╥";
  var boxhd = "┬";
  var boxHU = "╩";
  var boxHu = "╧";
  var boxhU = "╨";
  var boxhu = "┴";
  var boxminus = "⊟";
  var boxplus = "⊞";
  var boxtimes = "⊠";
  var boxUL = "╝";
  var boxUl = "╜";
  var boxuL = "╛";
  var boxul = "┘";
  var boxUR = "╚";
  var boxUr = "╙";
  var boxuR = "╘";
  var boxur = "└";
  var boxV = "║";
  var boxv = "│";
  var boxVH = "╬";
  var boxVh = "╫";
  var boxvH = "╪";
  var boxvh = "┼";
  var boxVL = "╣";
  var boxVl = "╢";
  var boxvL = "╡";
  var boxvl = "┤";
  var boxVR = "╠";
  var boxVr = "╟";
  var boxvR = "╞";
  var boxvr = "├";
  var bprime = "‵";
  var Breve = "˘";
  var breve = "˘";
  var brvbar = "¦";
  var Bscr = "ℬ";
  var bscr = "𝒷";
  var bsemi = "⁏";
  var bsim = "∽";
  var bsime = "⋍";
  var bsol = "\\";
  var bsolb = "⧅";
  var bsolhsub = "⟈";
  var bull = "•";
  var bullet = "•";
  var bump = "≎";
  var bumpE = "⪮";
  var bumpe = "≏";
  var Bumpeq = "≎";
  var bumpeq = "≏";
  var Cacute = "Ć";
  var cacute = "ć";
  var Cap = "⋒";
  var cap = "∩";
  var capand = "⩄";
  var capbrcup = "⩉";
  var capcap = "⩋";
  var capcup = "⩇";
  var capdot = "⩀";
  var CapitalDifferentialD = "ⅅ";
  var caps = "∩︀";
  var caret = "⁁";
  var caron = "ˇ";
  var Cayleys = "ℭ";
  var ccaps = "⩍";
  var Ccaron = "Č";
  var ccaron = "č";
  var Ccedil = "Ç";
  var ccedil = "ç";
  var Ccirc = "Ĉ";
  var ccirc = "ĉ";
  var Cconint = "∰";
  var ccups = "⩌";
  var ccupssm = "⩐";
  var Cdot = "Ċ";
  var cdot = "ċ";
  var cedil = "¸";
  var Cedilla = "¸";
  var cemptyv = "⦲";
  var cent = "¢";
  var CenterDot = "·";
  var centerdot = "·";
  var Cfr = "ℭ";
  var cfr = "𝔠";
  var CHcy = "Ч";
  var chcy = "ч";
  var check = "✓";
  var checkmark = "✓";
  var Chi = "Χ";
  var chi = "χ";
  var cir = "○";
  var circ = "ˆ";
  var circeq = "≗";
  var circlearrowleft = "↺";
  var circlearrowright = "↻";
  var circledast = "⊛";
  var circledcirc = "⊚";
  var circleddash = "⊝";
  var CircleDot = "⊙";
  var circledR = "®";
  var circledS = "Ⓢ";
  var CircleMinus = "⊖";
  var CirclePlus = "⊕";
  var CircleTimes = "⊗";
  var cirE = "⧃";
  var cire = "≗";
  var cirfnint = "⨐";
  var cirmid = "⫯";
  var cirscir = "⧂";
  var ClockwiseContourIntegral = "∲";
  var CloseCurlyDoubleQuote = "”";
  var CloseCurlyQuote = "’";
  var clubs = "♣";
  var clubsuit = "♣";
  var Colon = "∷";
  var colon = ":";
  var Colone = "⩴";
  var colone = "≔";
  var coloneq = "≔";
  var comma = ",";
  var commat = "@";
  var comp = "∁";
  var compfn = "∘";
  var complement = "∁";
  var complexes = "ℂ";
  var cong = "≅";
  var congdot = "⩭";
  var Congruent = "≡";
  var Conint = "∯";
  var conint = "∮";
  var ContourIntegral = "∮";
  var Copf = "ℂ";
  var copf = "𝕔";
  var coprod = "∐";
  var Coproduct = "∐";
  var COPY = "©";
  var copy = "©";
  var copysr = "℗";
  var CounterClockwiseContourIntegral = "∳";
  var crarr = "↵";
  var Cross = "⨯";
  var cross = "✗";
  var Cscr = "𝒞";
  var cscr = "𝒸";
  var csub = "⫏";
  var csube = "⫑";
  var csup = "⫐";
  var csupe = "⫒";
  var ctdot = "⋯";
  var cudarrl = "⤸";
  var cudarrr = "⤵";
  var cuepr = "⋞";
  var cuesc = "⋟";
  var cularr = "↶";
  var cularrp = "⤽";
  var Cup = "⋓";
  var cup = "∪";
  var cupbrcap = "⩈";
  var CupCap = "≍";
  var cupcap = "⩆";
  var cupcup = "⩊";
  var cupdot = "⊍";
  var cupor = "⩅";
  var cups = "∪︀";
  var curarr = "↷";
  var curarrm = "⤼";
  var curlyeqprec = "⋞";
  var curlyeqsucc = "⋟";
  var curlyvee = "⋎";
  var curlywedge = "⋏";
  var curren = "¤";
  var curvearrowleft = "↶";
  var curvearrowright = "↷";
  var cuvee = "⋎";
  var cuwed = "⋏";
  var cwconint = "∲";
  var cwint = "∱";
  var cylcty = "⌭";
  var Dagger = "‡";
  var dagger = "†";
  var daleth = "ℸ";
  var Darr = "↡";
  var dArr = "⇓";
  var darr = "↓";
  var dash = "‐";
  var Dashv = "⫤";
  var dashv = "⊣";
  var dbkarow = "⤏";
  var dblac = "˝";
  var Dcaron = "Ď";
  var dcaron = "ď";
  var Dcy = "Д";
  var dcy = "д";
  var DD = "ⅅ";
  var dd = "ⅆ";
  var ddagger = "‡";
  var ddarr = "⇊";
  var DDotrahd = "⤑";
  var ddotseq = "⩷";
  var deg = "°";
  var Del = "∇";
  var Delta = "Δ";
  var delta = "δ";
  var demptyv = "⦱";
  var dfisht = "⥿";
  var Dfr = "𝔇";
  var dfr = "𝔡";
  var dHar = "⥥";
  var dharl = "⇃";
  var dharr = "⇂";
  var DiacriticalAcute = "´";
  var DiacriticalDot = "˙";
  var DiacriticalDoubleAcute = "˝";
  var DiacriticalGrave = "`";
  var DiacriticalTilde = "˜";
  var diam = "⋄";
  var Diamond = "⋄";
  var diamond = "⋄";
  var diamondsuit = "♦";
  var diams = "♦";
  var die = "¨";
  var DifferentialD = "ⅆ";
  var digamma = "ϝ";
  var disin = "⋲";
  var div = "÷";
  var divide = "÷";
  var divideontimes = "⋇";
  var divonx = "⋇";
  var DJcy = "Ђ";
  var djcy = "ђ";
  var dlcorn = "⌞";
  var dlcrop = "⌍";
  var dollar = "$";
  var Dopf = "𝔻";
  var dopf = "𝕕";
  var Dot = "¨";
  var dot = "˙";
  var DotDot = "⃜";
  var doteq = "≐";
  var doteqdot = "≑";
  var DotEqual = "≐";
  var dotminus = "∸";
  var dotplus = "∔";
  var dotsquare = "⊡";
  var doublebarwedge = "⌆";
  var DoubleContourIntegral = "∯";
  var DoubleDot = "¨";
  var DoubleDownArrow = "⇓";
  var DoubleLeftArrow = "⇐";
  var DoubleLeftRightArrow = "⇔";
  var DoubleLeftTee = "⫤";
  var DoubleLongLeftArrow = "⟸";
  var DoubleLongLeftRightArrow = "⟺";
  var DoubleLongRightArrow = "⟹";
  var DoubleRightArrow = "⇒";
  var DoubleRightTee = "⊨";
  var DoubleUpArrow = "⇑";
  var DoubleUpDownArrow = "⇕";
  var DoubleVerticalBar = "∥";
  var DownArrow = "↓";
  var Downarrow = "⇓";
  var downarrow = "↓";
  var DownArrowBar = "⤓";
  var DownArrowUpArrow = "⇵";
  var DownBreve = "̑";
  var downdownarrows = "⇊";
  var downharpoonleft = "⇃";
  var downharpoonright = "⇂";
  var DownLeftRightVector = "⥐";
  var DownLeftTeeVector = "⥞";
  var DownLeftVector = "↽";
  var DownLeftVectorBar = "⥖";
  var DownRightTeeVector = "⥟";
  var DownRightVector = "⇁";
  var DownRightVectorBar = "⥗";
  var DownTee = "⊤";
  var DownTeeArrow = "↧";
  var drbkarow = "⤐";
  var drcorn = "⌟";
  var drcrop = "⌌";
  var Dscr = "𝒟";
  var dscr = "𝒹";
  var DScy = "Ѕ";
  var dscy = "ѕ";
  var dsol = "⧶";
  var Dstrok = "Đ";
  var dstrok = "đ";
  var dtdot = "⋱";
  var dtri = "▿";
  var dtrif = "▾";
  var duarr = "⇵";
  var duhar = "⥯";
  var dwangle = "⦦";
  var DZcy = "Џ";
  var dzcy = "џ";
  var dzigrarr = "⟿";
  var Eacute = "É";
  var eacute = "é";
  var easter = "⩮";
  var Ecaron = "Ě";
  var ecaron = "ě";
  var ecir = "≖";
  var Ecirc = "Ê";
  var ecirc = "ê";
  var ecolon = "≕";
  var Ecy = "Э";
  var ecy = "э";
  var eDDot = "⩷";
  var Edot = "Ė";
  var eDot = "≑";
  var edot = "ė";
  var ee = "ⅇ";
  var efDot = "≒";
  var Efr = "𝔈";
  var efr = "𝔢";
  var eg = "⪚";
  var Egrave = "È";
  var egrave = "è";
  var egs = "⪖";
  var egsdot = "⪘";
  var el = "⪙";
  var Element = "∈";
  var elinters = "⏧";
  var ell = "ℓ";
  var els = "⪕";
  var elsdot = "⪗";
  var Emacr = "Ē";
  var emacr = "ē";
  var empty = "∅";
  var emptyset = "∅";
  var EmptySmallSquare = "◻";
  var emptyv = "∅";
  var EmptyVerySmallSquare = "▫";
  var emsp = " ";
  var emsp13 = " ";
  var emsp14 = " ";
  var ENG = "Ŋ";
  var eng = "ŋ";
  var ensp = " ";
  var Eogon = "Ę";
  var eogon = "ę";
  var Eopf = "𝔼";
  var eopf = "𝕖";
  var epar = "⋕";
  var eparsl = "⧣";
  var eplus = "⩱";
  var epsi = "ε";
  var Epsilon = "Ε";
  var epsilon = "ε";
  var epsiv = "ϵ";
  var eqcirc = "≖";
  var eqcolon = "≕";
  var eqsim = "≂";
  var eqslantgtr = "⪖";
  var eqslantless = "⪕";
  var Equal = "⩵";
  var equals = "=";
  var EqualTilde = "≂";
  var equest = "≟";
  var Equilibrium = "⇌";
  var equiv = "≡";
  var equivDD = "⩸";
  var eqvparsl = "⧥";
  var erarr = "⥱";
  var erDot = "≓";
  var Escr = "ℰ";
  var escr = "ℯ";
  var esdot = "≐";
  var Esim = "⩳";
  var esim = "≂";
  var Eta = "Η";
  var eta = "η";
  var ETH = "Ð";
  var eth = "ð";
  var Euml = "Ë";
  var euml = "ë";
  var euro = "€";
  var excl = "!";
  var exist = "∃";
  var Exists = "∃";
  var expectation = "ℰ";
  var ExponentialE = "ⅇ";
  var exponentiale = "ⅇ";
  var fallingdotseq = "≒";
  var Fcy = "Ф";
  var fcy = "ф";
  var female = "♀";
  var ffilig = "ﬃ";
  var fflig = "ﬀ";
  var ffllig = "ﬄ";
  var Ffr = "𝔉";
  var ffr = "𝔣";
  var filig = "ﬁ";
  var FilledSmallSquare = "◼";
  var FilledVerySmallSquare = "▪";
  var fjlig = "fj";
  var flat = "♭";
  var fllig = "ﬂ";
  var fltns = "▱";
  var fnof = "ƒ";
  var Fopf = "𝔽";
  var fopf = "𝕗";
  var ForAll = "∀";
  var forall = "∀";
  var fork = "⋔";
  var forkv = "⫙";
  var Fouriertrf = "ℱ";
  var fpartint = "⨍";
  var frac12 = "½";
  var frac13 = "⅓";
  var frac14 = "¼";
  var frac15 = "⅕";
  var frac16 = "⅙";
  var frac18 = "⅛";
  var frac23 = "⅔";
  var frac25 = "⅖";
  var frac34 = "¾";
  var frac35 = "⅗";
  var frac38 = "⅜";
  var frac45 = "⅘";
  var frac56 = "⅚";
  var frac58 = "⅝";
  var frac78 = "⅞";
  var frasl = "⁄";
  var frown = "⌢";
  var Fscr = "ℱ";
  var fscr = "𝒻";
  var gacute = "ǵ";
  var Gamma = "Γ";
  var gamma = "γ";
  var Gammad = "Ϝ";
  var gammad = "ϝ";
  var gap = "⪆";
  var Gbreve = "Ğ";
  var gbreve = "ğ";
  var Gcedil = "Ģ";
  var Gcirc = "Ĝ";
  var gcirc = "ĝ";
  var Gcy = "Г";
  var gcy = "г";
  var Gdot = "Ġ";
  var gdot = "ġ";
  var gE = "≧";
  var ge = "≥";
  var gEl = "⪌";
  var gel = "⋛";
  var geq = "≥";
  var geqq = "≧";
  var geqslant = "⩾";
  var ges = "⩾";
  var gescc = "⪩";
  var gesdot = "⪀";
  var gesdoto = "⪂";
  var gesdotol = "⪄";
  var gesl = "⋛︀";
  var gesles = "⪔";
  var Gfr = "𝔊";
  var gfr = "𝔤";
  var Gg = "⋙";
  var gg = "≫";
  var ggg = "⋙";
  var gimel = "ℷ";
  var GJcy = "Ѓ";
  var gjcy = "ѓ";
  var gl = "≷";
  var gla = "⪥";
  var glE = "⪒";
  var glj = "⪤";
  var gnap = "⪊";
  var gnapprox = "⪊";
  var gnE = "≩";
  var gne = "⪈";
  var gneq = "⪈";
  var gneqq = "≩";
  var gnsim = "⋧";
  var Gopf = "𝔾";
  var gopf = "𝕘";
  var grave = "`";
  var GreaterEqual = "≥";
  var GreaterEqualLess = "⋛";
  var GreaterFullEqual = "≧";
  var GreaterGreater = "⪢";
  var GreaterLess = "≷";
  var GreaterSlantEqual = "⩾";
  var GreaterTilde = "≳";
  var Gscr = "𝒢";
  var gscr = "ℊ";
  var gsim = "≳";
  var gsime = "⪎";
  var gsiml = "⪐";
  var GT = ">";
  var Gt = "≫";
  var gt = ">";
  var gtcc = "⪧";
  var gtcir = "⩺";
  var gtdot = "⋗";
  var gtlPar = "⦕";
  var gtquest = "⩼";
  var gtrapprox = "⪆";
  var gtrarr = "⥸";
  var gtrdot = "⋗";
  var gtreqless = "⋛";
  var gtreqqless = "⪌";
  var gtrless = "≷";
  var gtrsim = "≳";
  var gvertneqq = "≩︀";
  var gvnE = "≩︀";
  var Hacek = "ˇ";
  var hairsp = " ";
  var half = "½";
  var hamilt = "ℋ";
  var HARDcy = "Ъ";
  var hardcy = "ъ";
  var hArr = "⇔";
  var harr = "↔";
  var harrcir = "⥈";
  var harrw = "↭";
  var Hat = "^";
  var hbar = "ℏ";
  var Hcirc = "Ĥ";
  var hcirc = "ĥ";
  var hearts = "♥";
  var heartsuit = "♥";
  var hellip = "…";
  var hercon = "⊹";
  var Hfr = "ℌ";
  var hfr = "𝔥";
  var HilbertSpace = "ℋ";
  var hksearow = "⤥";
  var hkswarow = "⤦";
  var hoarr = "⇿";
  var homtht = "∻";
  var hookleftarrow = "↩";
  var hookrightarrow = "↪";
  var Hopf = "ℍ";
  var hopf = "𝕙";
  var horbar = "―";
  var HorizontalLine = "─";
  var Hscr = "ℋ";
  var hscr = "𝒽";
  var hslash = "ℏ";
  var Hstrok = "Ħ";
  var hstrok = "ħ";
  var HumpDownHump = "≎";
  var HumpEqual = "≏";
  var hybull = "⁃";
  var hyphen = "‐";
  var Iacute = "Í";
  var iacute = "í";
  var ic = "⁣";
  var Icirc = "Î";
  var icirc = "î";
  var Icy = "И";
  var icy = "и";
  var Idot = "İ";
  var IEcy = "Е";
  var iecy = "е";
  var iexcl = "¡";
  var iff = "⇔";
  var Ifr = "ℑ";
  var ifr = "𝔦";
  var Igrave = "Ì";
  var igrave = "ì";
  var ii = "ⅈ";
  var iiiint = "⨌";
  var iiint = "∭";
  var iinfin = "⧜";
  var iiota = "℩";
  var IJlig = "Ĳ";
  var ijlig = "ĳ";
  var Im = "ℑ";
  var Imacr = "Ī";
  var imacr = "ī";
  var image = "ℑ";
  var ImaginaryI = "ⅈ";
  var imagline = "ℐ";
  var imagpart = "ℑ";
  var imath = "ı";
  var imof = "⊷";
  var imped = "Ƶ";
  var Implies = "⇒";
  var incare = "℅";
  var infin = "∞";
  var infintie = "⧝";
  var inodot = "ı";
  var Int = "∬";
  var int = "∫";
  var intcal = "⊺";
  var integers = "ℤ";
  var Integral = "∫";
  var intercal = "⊺";
  var Intersection = "⋂";
  var intlarhk = "⨗";
  var intprod = "⨼";
  var InvisibleComma = "⁣";
  var InvisibleTimes = "⁢";
  var IOcy = "Ё";
  var iocy = "ё";
  var Iogon = "Į";
  var iogon = "į";
  var Iopf = "𝕀";
  var iopf = "𝕚";
  var Iota = "Ι";
  var iota = "ι";
  var iprod = "⨼";
  var iquest = "¿";
  var Iscr = "ℐ";
  var iscr = "𝒾";
  var isin = "∈";
  var isindot = "⋵";
  var isinE = "⋹";
  var isins = "⋴";
  var isinsv = "⋳";
  var isinv = "∈";
  var it = "⁢";
  var Itilde = "Ĩ";
  var itilde = "ĩ";
  var Iukcy = "І";
  var iukcy = "і";
  var Iuml = "Ï";
  var iuml = "ï";
  var Jcirc = "Ĵ";
  var jcirc = "ĵ";
  var Jcy = "Й";
  var jcy = "й";
  var Jfr = "𝔍";
  var jfr = "𝔧";
  var jmath = "ȷ";
  var Jopf = "𝕁";
  var jopf = "𝕛";
  var Jscr = "𝒥";
  var jscr = "𝒿";
  var Jsercy = "Ј";
  var jsercy = "ј";
  var Jukcy = "Є";
  var jukcy = "є";
  var Kappa = "Κ";
  var kappa = "κ";
  var kappav = "ϰ";
  var Kcedil = "Ķ";
  var kcedil = "ķ";
  var Kcy = "К";
  var kcy = "к";
  var Kfr = "𝔎";
  var kfr = "𝔨";
  var kgreen = "ĸ";
  var KHcy = "Х";
  var khcy = "х";
  var KJcy = "Ќ";
  var kjcy = "ќ";
  var Kopf = "𝕂";
  var kopf = "𝕜";
  var Kscr = "𝒦";
  var kscr = "𝓀";
  var lAarr = "⇚";
  var Lacute = "Ĺ";
  var lacute = "ĺ";
  var laemptyv = "⦴";
  var lagran = "ℒ";
  var Lambda = "Λ";
  var lambda = "λ";
  var Lang = "⟪";
  var lang = "⟨";
  var langd = "⦑";
  var langle = "⟨";
  var lap = "⪅";
  var Laplacetrf = "ℒ";
  var laquo = "«";
  var Larr = "↞";
  var lArr = "⇐";
  var larr = "←";
  var larrb = "⇤";
  var larrbfs = "⤟";
  var larrfs = "⤝";
  var larrhk = "↩";
  var larrlp = "↫";
  var larrpl = "⤹";
  var larrsim = "⥳";
  var larrtl = "↢";
  var lat = "⪫";
  var lAtail = "⤛";
  var latail = "⤙";
  var late = "⪭";
  var lates = "⪭︀";
  var lBarr = "⤎";
  var lbarr = "⤌";
  var lbbrk = "❲";
  var lbrace = "{";
  var lbrack = "[";
  var lbrke = "⦋";
  var lbrksld = "⦏";
  var lbrkslu = "⦍";
  var Lcaron = "Ľ";
  var lcaron = "ľ";
  var Lcedil = "Ļ";
  var lcedil = "ļ";
  var lceil = "⌈";
  var lcub = "{";
  var Lcy = "Л";
  var lcy = "л";
  var ldca = "⤶";
  var ldquo = "“";
  var ldquor = "„";
  var ldrdhar = "⥧";
  var ldrushar = "⥋";
  var ldsh = "↲";
  var lE = "≦";
  var le = "≤";
  var LeftAngleBracket = "⟨";
  var LeftArrow = "←";
  var Leftarrow = "⇐";
  var leftarrow = "←";
  var LeftArrowBar = "⇤";
  var LeftArrowRightArrow = "⇆";
  var leftarrowtail = "↢";
  var LeftCeiling = "⌈";
  var LeftDoubleBracket = "⟦";
  var LeftDownTeeVector = "⥡";
  var LeftDownVector = "⇃";
  var LeftDownVectorBar = "⥙";
  var LeftFloor = "⌊";
  var leftharpoondown = "↽";
  var leftharpoonup = "↼";
  var leftleftarrows = "⇇";
  var LeftRightArrow = "↔";
  var Leftrightarrow = "⇔";
  var leftrightarrow = "↔";
  var leftrightarrows = "⇆";
  var leftrightharpoons = "⇋";
  var leftrightsquigarrow = "↭";
  var LeftRightVector = "⥎";
  var LeftTee = "⊣";
  var LeftTeeArrow = "↤";
  var LeftTeeVector = "⥚";
  var leftthreetimes = "⋋";
  var LeftTriangle = "⊲";
  var LeftTriangleBar = "⧏";
  var LeftTriangleEqual = "⊴";
  var LeftUpDownVector = "⥑";
  var LeftUpTeeVector = "⥠";
  var LeftUpVector = "↿";
  var LeftUpVectorBar = "⥘";
  var LeftVector = "↼";
  var LeftVectorBar = "⥒";
  var lEg = "⪋";
  var leg = "⋚";
  var leq = "≤";
  var leqq = "≦";
  var leqslant = "⩽";
  var les = "⩽";
  var lescc = "⪨";
  var lesdot = "⩿";
  var lesdoto = "⪁";
  var lesdotor = "⪃";
  var lesg = "⋚︀";
  var lesges = "⪓";
  var lessapprox = "⪅";
  var lessdot = "⋖";
  var lesseqgtr = "⋚";
  var lesseqqgtr = "⪋";
  var LessEqualGreater = "⋚";
  var LessFullEqual = "≦";
  var LessGreater = "≶";
  var lessgtr = "≶";
  var LessLess = "⪡";
  var lesssim = "≲";
  var LessSlantEqual = "⩽";
  var LessTilde = "≲";
  var lfisht = "⥼";
  var lfloor = "⌊";
  var Lfr = "𝔏";
  var lfr = "𝔩";
  var lg = "≶";
  var lgE = "⪑";
  var lHar = "⥢";
  var lhard = "↽";
  var lharu = "↼";
  var lharul = "⥪";
  var lhblk = "▄";
  var LJcy = "Љ";
  var ljcy = "љ";
  var Ll = "⋘";
  var ll = "≪";
  var llarr = "⇇";
  var llcorner = "⌞";
  var Lleftarrow = "⇚";
  var llhard = "⥫";
  var lltri = "◺";
  var Lmidot = "Ŀ";
  var lmidot = "ŀ";
  var lmoust = "⎰";
  var lmoustache = "⎰";
  var lnap = "⪉";
  var lnapprox = "⪉";
  var lnE = "≨";
  var lne = "⪇";
  var lneq = "⪇";
  var lneqq = "≨";
  var lnsim = "⋦";
  var loang = "⟬";
  var loarr = "⇽";
  var lobrk = "⟦";
  var LongLeftArrow = "⟵";
  var Longleftarrow = "⟸";
  var longleftarrow = "⟵";
  var LongLeftRightArrow = "⟷";
  var Longleftrightarrow = "⟺";
  var longleftrightarrow = "⟷";
  var longmapsto = "⟼";
  var LongRightArrow = "⟶";
  var Longrightarrow = "⟹";
  var longrightarrow = "⟶";
  var looparrowleft = "↫";
  var looparrowright = "↬";
  var lopar = "⦅";
  var Lopf = "𝕃";
  var lopf = "𝕝";
  var loplus = "⨭";
  var lotimes = "⨴";
  var lowast = "∗";
  var lowbar = "_";
  var LowerLeftArrow = "↙";
  var LowerRightArrow = "↘";
  var loz = "◊";
  var lozenge = "◊";
  var lozf = "⧫";
  var lpar = "(";
  var lparlt = "⦓";
  var lrarr = "⇆";
  var lrcorner = "⌟";
  var lrhar = "⇋";
  var lrhard = "⥭";
  var lrm = "‎";
  var lrtri = "⊿";
  var lsaquo = "‹";
  var Lscr = "ℒ";
  var lscr = "𝓁";
  var Lsh = "↰";
  var lsh = "↰";
  var lsim = "≲";
  var lsime = "⪍";
  var lsimg = "⪏";
  var lsqb = "[";
  var lsquo = "‘";
  var lsquor = "‚";
  var Lstrok = "Ł";
  var lstrok = "ł";
  var LT = "<";
  var Lt = "≪";
  var lt = "<";
  var ltcc = "⪦";
  var ltcir = "⩹";
  var ltdot = "⋖";
  var lthree = "⋋";
  var ltimes = "⋉";
  var ltlarr = "⥶";
  var ltquest = "⩻";
  var ltri = "◃";
  var ltrie = "⊴";
  var ltrif = "◂";
  var ltrPar = "⦖";
  var lurdshar = "⥊";
  var luruhar = "⥦";
  var lvertneqq = "≨︀";
  var lvnE = "≨︀";
  var macr = "¯";
  var male = "♂";
  var malt = "✠";
  var maltese = "✠";
  var map = "↦";
  var mapsto = "↦";
  var mapstodown = "↧";
  var mapstoleft = "↤";
  var mapstoup = "↥";
  var marker = "▮";
  var mcomma = "⨩";
  var Mcy = "М";
  var mcy = "м";
  var mdash = "—";
  var mDDot = "∺";
  var measuredangle = "∡";
  var MediumSpace = " ";
  var Mellintrf = "ℳ";
  var Mfr = "𝔐";
  var mfr = "𝔪";
  var mho = "℧";
  var micro = "µ";
  var mid = "∣";
  var midast = "*";
  var midcir = "⫰";
  var middot = "·";
  var minus = "−";
  var minusb = "⊟";
  var minusd = "∸";
  var minusdu = "⨪";
  var MinusPlus = "∓";
  var mlcp = "⫛";
  var mldr = "…";
  var mnplus = "∓";
  var models = "⊧";
  var Mopf = "𝕄";
  var mopf = "𝕞";
  var mp = "∓";
  var Mscr = "ℳ";
  var mscr = "𝓂";
  var mstpos = "∾";
  var Mu = "Μ";
  var mu = "μ";
  var multimap = "⊸";
  var mumap = "⊸";
  var nabla = "∇";
  var Nacute = "Ń";
  var nacute = "ń";
  var nang = "∠⃒";
  var nap = "≉";
  var napE = "⩰̸";
  var napid = "≋̸";
  var napos = "ŉ";
  var napprox = "≉";
  var natur = "♮";
  var natural = "♮";
  var naturals = "ℕ";
  var nbsp = " ";
  var nbump = "≎̸";
  var nbumpe = "≏̸";
  var ncap = "⩃";
  var Ncaron = "Ň";
  var ncaron = "ň";
  var Ncedil = "Ņ";
  var ncedil = "ņ";
  var ncong = "≇";
  var ncongdot = "⩭̸";
  var ncup = "⩂";
  var Ncy = "Н";
  var ncy = "н";
  var ndash = "–";
  var ne = "≠";
  var nearhk = "⤤";
  var neArr = "⇗";
  var nearr = "↗";
  var nearrow = "↗";
  var nedot = "≐̸";
  var NegativeMediumSpace = "​";
  var NegativeThickSpace = "​";
  var NegativeThinSpace = "​";
  var NegativeVeryThinSpace = "​";
  var nequiv = "≢";
  var nesear = "⤨";
  var nesim = "≂̸";
  var NestedGreaterGreater = "≫";
  var NestedLessLess = "≪";
  var NewLine = "\n";
  var nexist = "∄";
  var nexists = "∄";
  var Nfr = "𝔑";
  var nfr = "𝔫";
  var ngE = "≧̸";
  var nge = "≱";
  var ngeq = "≱";
  var ngeqq = "≧̸";
  var ngeqslant = "⩾̸";
  var nges = "⩾̸";
  var nGg = "⋙̸";
  var ngsim = "≵";
  var nGt = "≫⃒";
  var ngt = "≯";
  var ngtr = "≯";
  var nGtv = "≫̸";
  var nhArr = "⇎";
  var nharr = "↮";
  var nhpar = "⫲";
  var ni = "∋";
  var nis = "⋼";
  var nisd = "⋺";
  var niv = "∋";
  var NJcy = "Њ";
  var njcy = "њ";
  var nlArr = "⇍";
  var nlarr = "↚";
  var nldr = "‥";
  var nlE = "≦̸";
  var nle = "≰";
  var nLeftarrow = "⇍";
  var nleftarrow = "↚";
  var nLeftrightarrow = "⇎";
  var nleftrightarrow = "↮";
  var nleq = "≰";
  var nleqq = "≦̸";
  var nleqslant = "⩽̸";
  var nles = "⩽̸";
  var nless = "≮";
  var nLl = "⋘̸";
  var nlsim = "≴";
  var nLt = "≪⃒";
  var nlt = "≮";
  var nltri = "⋪";
  var nltrie = "⋬";
  var nLtv = "≪̸";
  var nmid = "∤";
  var NoBreak = "⁠";
  var NonBreakingSpace = " ";
  var Nopf = "ℕ";
  var nopf = "𝕟";
  var Not = "⫬";
  var not = "¬";
  var NotCongruent = "≢";
  var NotCupCap = "≭";
  var NotDoubleVerticalBar = "∦";
  var NotElement = "∉";
  var NotEqual = "≠";
  var NotEqualTilde = "≂̸";
  var NotExists = "∄";
  var NotGreater = "≯";
  var NotGreaterEqual = "≱";
  var NotGreaterFullEqual = "≧̸";
  var NotGreaterGreater = "≫̸";
  var NotGreaterLess = "≹";
  var NotGreaterSlantEqual = "⩾̸";
  var NotGreaterTilde = "≵";
  var NotHumpDownHump = "≎̸";
  var NotHumpEqual = "≏̸";
  var notin = "∉";
  var notindot = "⋵̸";
  var notinE = "⋹̸";
  var notinva = "∉";
  var notinvb = "⋷";
  var notinvc = "⋶";
  var NotLeftTriangle = "⋪";
  var NotLeftTriangleBar = "⧏̸";
  var NotLeftTriangleEqual = "⋬";
  var NotLess = "≮";
  var NotLessEqual = "≰";
  var NotLessGreater = "≸";
  var NotLessLess = "≪̸";
  var NotLessSlantEqual = "⩽̸";
  var NotLessTilde = "≴";
  var NotNestedGreaterGreater = "⪢̸";
  var NotNestedLessLess = "⪡̸";
  var notni = "∌";
  var notniva = "∌";
  var notnivb = "⋾";
  var notnivc = "⋽";
  var NotPrecedes = "⊀";
  var NotPrecedesEqual = "⪯̸";
  var NotPrecedesSlantEqual = "⋠";
  var NotReverseElement = "∌";
  var NotRightTriangle = "⋫";
  var NotRightTriangleBar = "⧐̸";
  var NotRightTriangleEqual = "⋭";
  var NotSquareSubset = "⊏̸";
  var NotSquareSubsetEqual = "⋢";
  var NotSquareSuperset = "⊐̸";
  var NotSquareSupersetEqual = "⋣";
  var NotSubset = "⊂⃒";
  var NotSubsetEqual = "⊈";
  var NotSucceeds = "⊁";
  var NotSucceedsEqual = "⪰̸";
  var NotSucceedsSlantEqual = "⋡";
  var NotSucceedsTilde = "≿̸";
  var NotSuperset = "⊃⃒";
  var NotSupersetEqual = "⊉";
  var NotTilde = "≁";
  var NotTildeEqual = "≄";
  var NotTildeFullEqual = "≇";
  var NotTildeTilde = "≉";
  var NotVerticalBar = "∤";
  var npar = "∦";
  var nparallel = "∦";
  var nparsl = "⫽⃥";
  var npart = "∂̸";
  var npolint = "⨔";
  var npr = "⊀";
  var nprcue = "⋠";
  var npre = "⪯̸";
  var nprec = "⊀";
  var npreceq = "⪯̸";
  var nrArr = "⇏";
  var nrarr = "↛";
  var nrarrc = "⤳̸";
  var nrarrw = "↝̸";
  var nRightarrow = "⇏";
  var nrightarrow = "↛";
  var nrtri = "⋫";
  var nrtrie = "⋭";
  var nsc = "⊁";
  var nsccue = "⋡";
  var nsce = "⪰̸";
  var Nscr = "𝒩";
  var nscr = "𝓃";
  var nshortmid = "∤";
  var nshortparallel = "∦";
  var nsim = "≁";
  var nsime = "≄";
  var nsimeq = "≄";
  var nsmid = "∤";
  var nspar = "∦";
  var nsqsube = "⋢";
  var nsqsupe = "⋣";
  var nsub = "⊄";
  var nsubE = "⫅̸";
  var nsube = "⊈";
  var nsubset = "⊂⃒";
  var nsubseteq = "⊈";
  var nsubseteqq = "⫅̸";
  var nsucc = "⊁";
  var nsucceq = "⪰̸";
  var nsup = "⊅";
  var nsupE = "⫆̸";
  var nsupe = "⊉";
  var nsupset = "⊃⃒";
  var nsupseteq = "⊉";
  var nsupseteqq = "⫆̸";
  var ntgl = "≹";
  var Ntilde = "Ñ";
  var ntilde = "ñ";
  var ntlg = "≸";
  var ntriangleleft = "⋪";
  var ntrianglelefteq = "⋬";
  var ntriangleright = "⋫";
  var ntrianglerighteq = "⋭";
  var Nu = "Ν";
  var nu = "ν";
  var num = "#";
  var numero = "№";
  var numsp = " ";
  var nvap = "≍⃒";
  var nVDash = "⊯";
  var nVdash = "⊮";
  var nvDash = "⊭";
  var nvdash = "⊬";
  var nvge = "≥⃒";
  var nvgt = ">⃒";
  var nvHarr = "⤄";
  var nvinfin = "⧞";
  var nvlArr = "⤂";
  var nvle = "≤⃒";
  var nvlt = "<⃒";
  var nvltrie = "⊴⃒";
  var nvrArr = "⤃";
  var nvrtrie = "⊵⃒";
  var nvsim = "∼⃒";
  var nwarhk = "⤣";
  var nwArr = "⇖";
  var nwarr = "↖";
  var nwarrow = "↖";
  var nwnear = "⤧";
  var Oacute = "Ó";
  var oacute = "ó";
  var oast = "⊛";
  var ocir = "⊚";
  var Ocirc = "Ô";
  var ocirc = "ô";
  var Ocy = "О";
  var ocy = "о";
  var odash = "⊝";
  var Odblac = "Ő";
  var odblac = "ő";
  var odiv = "⨸";
  var odot = "⊙";
  var odsold = "⦼";
  var OElig = "Œ";
  var oelig = "œ";
  var ofcir = "⦿";
  var Ofr = "𝔒";
  var ofr = "𝔬";
  var ogon = "˛";
  var Ograve = "Ò";
  var ograve = "ò";
  var ogt = "⧁";
  var ohbar = "⦵";
  var ohm = "Ω";
  var oint = "∮";
  var olarr = "↺";
  var olcir = "⦾";
  var olcross = "⦻";
  var oline = "‾";
  var olt = "⧀";
  var Omacr = "Ō";
  var omacr = "ō";
  var Omega = "Ω";
  var omega = "ω";
  var Omicron = "Ο";
  var omicron = "ο";
  var omid = "⦶";
  var ominus = "⊖";
  var Oopf = "𝕆";
  var oopf = "𝕠";
  var opar = "⦷";
  var OpenCurlyDoubleQuote = "“";
  var OpenCurlyQuote = "‘";
  var operp = "⦹";
  var oplus = "⊕";
  var Or = "⩔";
  var or = "∨";
  var orarr = "↻";
  var ord = "⩝";
  var order = "ℴ";
  var orderof = "ℴ";
  var ordf = "ª";
  var ordm = "º";
  var origof = "⊶";
  var oror = "⩖";
  var orslope = "⩗";
  var orv = "⩛";
  var oS = "Ⓢ";
  var Oscr = "𝒪";
  var oscr = "ℴ";
  var Oslash = "Ø";
  var oslash = "ø";
  var osol = "⊘";
  var Otilde = "Õ";
  var otilde = "õ";
  var Otimes = "⨷";
  var otimes = "⊗";
  var otimesas = "⨶";
  var Ouml = "Ö";
  var ouml = "ö";
  var ovbar = "⌽";
  var OverBar = "‾";
  var OverBrace = "⏞";
  var OverBracket = "⎴";
  var OverParenthesis = "⏜";
  var par = "∥";
  var para = "¶";
  var parallel = "∥";
  var parsim = "⫳";
  var parsl = "⫽";
  var part = "∂";
  var PartialD = "∂";
  var Pcy = "П";
  var pcy = "п";
  var percnt = "%";
  var period = ".";
  var permil = "‰";
  var perp = "⊥";
  var pertenk = "‱";
  var Pfr = "𝔓";
  var pfr = "𝔭";
  var Phi = "Φ";
  var phi = "φ";
  var phiv = "ϕ";
  var phmmat = "ℳ";
  var phone = "☎";
  var Pi = "Π";
  var pi = "π";
  var pitchfork = "⋔";
  var piv = "ϖ";
  var planck = "ℏ";
  var planckh = "ℎ";
  var plankv = "ℏ";
  var plus = "+";
  var plusacir = "⨣";
  var plusb = "⊞";
  var pluscir = "⨢";
  var plusdo = "∔";
  var plusdu = "⨥";
  var pluse = "⩲";
  var PlusMinus = "±";
  var plusmn = "±";
  var plussim = "⨦";
  var plustwo = "⨧";
  var pm = "±";
  var Poincareplane = "ℌ";
  var pointint = "⨕";
  var Popf = "ℙ";
  var popf = "𝕡";
  var pound = "£";
  var Pr = "⪻";
  var pr = "≺";
  var prap = "⪷";
  var prcue = "≼";
  var prE = "⪳";
  var pre = "⪯";
  var prec = "≺";
  var precapprox = "⪷";
  var preccurlyeq = "≼";
  var Precedes = "≺";
  var PrecedesEqual = "⪯";
  var PrecedesSlantEqual = "≼";
  var PrecedesTilde = "≾";
  var preceq = "⪯";
  var precnapprox = "⪹";
  var precneqq = "⪵";
  var precnsim = "⋨";
  var precsim = "≾";
  var Prime = "″";
  var prime = "′";
  var primes = "ℙ";
  var prnap = "⪹";
  var prnE = "⪵";
  var prnsim = "⋨";
  var prod = "∏";
  var Product = "∏";
  var profalar = "⌮";
  var profline = "⌒";
  var profsurf = "⌓";
  var prop = "∝";
  var Proportion = "∷";
  var Proportional = "∝";
  var propto = "∝";
  var prsim = "≾";
  var prurel = "⊰";
  var Pscr = "𝒫";
  var pscr = "𝓅";
  var Psi = "Ψ";
  var psi = "ψ";
  var puncsp = " ";
  var Qfr = "𝔔";
  var qfr = "𝔮";
  var qint = "⨌";
  var Qopf = "ℚ";
  var qopf = "𝕢";
  var qprime = "⁗";
  var Qscr = "𝒬";
  var qscr = "𝓆";
  var quaternions = "ℍ";
  var quatint = "⨖";
  var quest = "?";
  var questeq = "≟";
  var QUOT = "\"";
  var quot = "\"";
  var rAarr = "⇛";
  var race = "∽̱";
  var Racute = "Ŕ";
  var racute = "ŕ";
  var radic = "√";
  var raemptyv = "⦳";
  var Rang = "⟫";
  var rang = "⟩";
  var rangd = "⦒";
  var range = "⦥";
  var rangle = "⟩";
  var raquo = "»";
  var Rarr = "↠";
  var rArr = "⇒";
  var rarr = "→";
  var rarrap = "⥵";
  var rarrb = "⇥";
  var rarrbfs = "⤠";
  var rarrc = "⤳";
  var rarrfs = "⤞";
  var rarrhk = "↪";
  var rarrlp = "↬";
  var rarrpl = "⥅";
  var rarrsim = "⥴";
  var Rarrtl = "⤖";
  var rarrtl = "↣";
  var rarrw = "↝";
  var rAtail = "⤜";
  var ratail = "⤚";
  var ratio = "∶";
  var rationals = "ℚ";
  var RBarr = "⤐";
  var rBarr = "⤏";
  var rbarr = "⤍";
  var rbbrk = "❳";
  var rbrace = "}";
  var rbrack = "]";
  var rbrke = "⦌";
  var rbrksld = "⦎";
  var rbrkslu = "⦐";
  var Rcaron = "Ř";
  var rcaron = "ř";
  var Rcedil = "Ŗ";
  var rcedil = "ŗ";
  var rceil = "⌉";
  var rcub = "}";
  var Rcy = "Р";
  var rcy = "р";
  var rdca = "⤷";
  var rdldhar = "⥩";
  var rdquo = "”";
  var rdquor = "”";
  var rdsh = "↳";
  var Re = "ℜ";
  var real = "ℜ";
  var realine = "ℛ";
  var realpart = "ℜ";
  var reals = "ℝ";
  var rect = "▭";
  var REG = "®";
  var reg = "®";
  var ReverseElement = "∋";
  var ReverseEquilibrium = "⇋";
  var ReverseUpEquilibrium = "⥯";
  var rfisht = "⥽";
  var rfloor = "⌋";
  var Rfr = "ℜ";
  var rfr = "𝔯";
  var rHar = "⥤";
  var rhard = "⇁";
  var rharu = "⇀";
  var rharul = "⥬";
  var Rho = "Ρ";
  var rho = "ρ";
  var rhov = "ϱ";
  var RightAngleBracket = "⟩";
  var RightArrow = "→";
  var Rightarrow = "⇒";
  var rightarrow = "→";
  var RightArrowBar = "⇥";
  var RightArrowLeftArrow = "⇄";
  var rightarrowtail = "↣";
  var RightCeiling = "⌉";
  var RightDoubleBracket = "⟧";
  var RightDownTeeVector = "⥝";
  var RightDownVector = "⇂";
  var RightDownVectorBar = "⥕";
  var RightFloor = "⌋";
  var rightharpoondown = "⇁";
  var rightharpoonup = "⇀";
  var rightleftarrows = "⇄";
  var rightleftharpoons = "⇌";
  var rightrightarrows = "⇉";
  var rightsquigarrow = "↝";
  var RightTee = "⊢";
  var RightTeeArrow = "↦";
  var RightTeeVector = "⥛";
  var rightthreetimes = "⋌";
  var RightTriangle = "⊳";
  var RightTriangleBar = "⧐";
  var RightTriangleEqual = "⊵";
  var RightUpDownVector = "⥏";
  var RightUpTeeVector = "⥜";
  var RightUpVector = "↾";
  var RightUpVectorBar = "⥔";
  var RightVector = "⇀";
  var RightVectorBar = "⥓";
  var ring = "˚";
  var risingdotseq = "≓";
  var rlarr = "⇄";
  var rlhar = "⇌";
  var rlm = "‏";
  var rmoust = "⎱";
  var rmoustache = "⎱";
  var rnmid = "⫮";
  var roang = "⟭";
  var roarr = "⇾";
  var robrk = "⟧";
  var ropar = "⦆";
  var Ropf = "ℝ";
  var ropf = "𝕣";
  var roplus = "⨮";
  var rotimes = "⨵";
  var RoundImplies = "⥰";
  var rpar = ")";
  var rpargt = "⦔";
  var rppolint = "⨒";
  var rrarr = "⇉";
  var Rrightarrow = "⇛";
  var rsaquo = "›";
  var Rscr = "ℛ";
  var rscr = "𝓇";
  var Rsh = "↱";
  var rsh = "↱";
  var rsqb = "]";
  var rsquo = "’";
  var rsquor = "’";
  var rthree = "⋌";
  var rtimes = "⋊";
  var rtri = "▹";
  var rtrie = "⊵";
  var rtrif = "▸";
  var rtriltri = "⧎";
  var RuleDelayed = "⧴";
  var ruluhar = "⥨";
  var rx = "℞";
  var Sacute = "Ś";
  var sacute = "ś";
  var sbquo = "‚";
  var Sc = "⪼";
  var sc = "≻";
  var scap = "⪸";
  var Scaron = "Š";
  var scaron = "š";
  var sccue = "≽";
  var scE = "⪴";
  var sce = "⪰";
  var Scedil = "Ş";
  var scedil = "ş";
  var Scirc = "Ŝ";
  var scirc = "ŝ";
  var scnap = "⪺";
  var scnE = "⪶";
  var scnsim = "⋩";
  var scpolint = "⨓";
  var scsim = "≿";
  var Scy = "С";
  var scy = "с";
  var sdot = "⋅";
  var sdotb = "⊡";
  var sdote = "⩦";
  var searhk = "⤥";
  var seArr = "⇘";
  var searr = "↘";
  var searrow = "↘";
  var sect = "§";
  var semi = ";";
  var seswar = "⤩";
  var setminus = "∖";
  var setmn = "∖";
  var sext = "✶";
  var Sfr = "𝔖";
  var sfr = "𝔰";
  var sfrown = "⌢";
  var sharp = "♯";
  var SHCHcy = "Щ";
  var shchcy = "щ";
  var SHcy = "Ш";
  var shcy = "ш";
  var ShortDownArrow = "↓";
  var ShortLeftArrow = "←";
  var shortmid = "∣";
  var shortparallel = "∥";
  var ShortRightArrow = "→";
  var ShortUpArrow = "↑";
  var shy = "­";
  var Sigma = "Σ";
  var sigma = "σ";
  var sigmaf = "ς";
  var sigmav = "ς";
  var sim = "∼";
  var simdot = "⩪";
  var sime = "≃";
  var simeq = "≃";
  var simg = "⪞";
  var simgE = "⪠";
  var siml = "⪝";
  var simlE = "⪟";
  var simne = "≆";
  var simplus = "⨤";
  var simrarr = "⥲";
  var slarr = "←";
  var SmallCircle = "∘";
  var smallsetminus = "∖";
  var smashp = "⨳";
  var smeparsl = "⧤";
  var smid = "∣";
  var smile = "⌣";
  var smt = "⪪";
  var smte = "⪬";
  var smtes = "⪬︀";
  var SOFTcy = "Ь";
  var softcy = "ь";
  var sol = "/";
  var solb = "⧄";
  var solbar = "⌿";
  var Sopf = "𝕊";
  var sopf = "𝕤";
  var spades = "♠";
  var spadesuit = "♠";
  var spar = "∥";
  var sqcap = "⊓";
  var sqcaps = "⊓︀";
  var sqcup = "⊔";
  var sqcups = "⊔︀";
  var Sqrt = "√";
  var sqsub = "⊏";
  var sqsube = "⊑";
  var sqsubset = "⊏";
  var sqsubseteq = "⊑";
  var sqsup = "⊐";
  var sqsupe = "⊒";
  var sqsupset = "⊐";
  var sqsupseteq = "⊒";
  var squ = "□";
  var Square = "□";
  var square = "□";
  var SquareIntersection = "⊓";
  var SquareSubset = "⊏";
  var SquareSubsetEqual = "⊑";
  var SquareSuperset = "⊐";
  var SquareSupersetEqual = "⊒";
  var SquareUnion = "⊔";
  var squarf = "▪";
  var squf = "▪";
  var srarr = "→";
  var Sscr = "𝒮";
  var sscr = "𝓈";
  var ssetmn = "∖";
  var ssmile = "⌣";
  var sstarf = "⋆";
  var Star = "⋆";
  var star = "☆";
  var starf = "★";
  var straightepsilon = "ϵ";
  var straightphi = "ϕ";
  var strns = "¯";
  var Sub = "⋐";
  var sub = "⊂";
  var subdot = "⪽";
  var subE = "⫅";
  var sube = "⊆";
  var subedot = "⫃";
  var submult = "⫁";
  var subnE = "⫋";
  var subne = "⊊";
  var subplus = "⪿";
  var subrarr = "⥹";
  var Subset = "⋐";
  var subset = "⊂";
  var subseteq = "⊆";
  var subseteqq = "⫅";
  var SubsetEqual = "⊆";
  var subsetneq = "⊊";
  var subsetneqq = "⫋";
  var subsim = "⫇";
  var subsub = "⫕";
  var subsup = "⫓";
  var succ = "≻";
  var succapprox = "⪸";
  var succcurlyeq = "≽";
  var Succeeds = "≻";
  var SucceedsEqual = "⪰";
  var SucceedsSlantEqual = "≽";
  var SucceedsTilde = "≿";
  var succeq = "⪰";
  var succnapprox = "⪺";
  var succneqq = "⪶";
  var succnsim = "⋩";
  var succsim = "≿";
  var SuchThat = "∋";
  var Sum = "∑";
  var sum = "∑";
  var sung = "♪";
  var Sup = "⋑";
  var sup = "⊃";
  var sup1 = "¹";
  var sup2 = "²";
  var sup3 = "³";
  var supdot = "⪾";
  var supdsub = "⫘";
  var supE = "⫆";
  var supe = "⊇";
  var supedot = "⫄";
  var Superset = "⊃";
  var SupersetEqual = "⊇";
  var suphsol = "⟉";
  var suphsub = "⫗";
  var suplarr = "⥻";
  var supmult = "⫂";
  var supnE = "⫌";
  var supne = "⊋";
  var supplus = "⫀";
  var Supset = "⋑";
  var supset = "⊃";
  var supseteq = "⊇";
  var supseteqq = "⫆";
  var supsetneq = "⊋";
  var supsetneqq = "⫌";
  var supsim = "⫈";
  var supsub = "⫔";
  var supsup = "⫖";
  var swarhk = "⤦";
  var swArr = "⇙";
  var swarr = "↙";
  var swarrow = "↙";
  var swnwar = "⤪";
  var szlig = "ß";
  var Tab = "\t";
  var target = "⌖";
  var Tau = "Τ";
  var tau = "τ";
  var tbrk = "⎴";
  var Tcaron = "Ť";
  var tcaron = "ť";
  var Tcedil = "Ţ";
  var tcedil = "ţ";
  var Tcy = "Т";
  var tcy = "т";
  var tdot = "⃛";
  var telrec = "⌕";
  var Tfr = "𝔗";
  var tfr = "𝔱";
  var there4 = "∴";
  var Therefore = "∴";
  var therefore = "∴";
  var Theta = "Θ";
  var theta = "θ";
  var thetasym = "ϑ";
  var thetav = "ϑ";
  var thickapprox = "≈";
  var thicksim = "∼";
  var ThickSpace = "  ";
  var thinsp = " ";
  var ThinSpace = " ";
  var thkap = "≈";
  var thksim = "∼";
  var THORN = "Þ";
  var thorn = "þ";
  var Tilde = "∼";
  var tilde = "˜";
  var TildeEqual = "≃";
  var TildeFullEqual = "≅";
  var TildeTilde = "≈";
  var times = "×";
  var timesb = "⊠";
  var timesbar = "⨱";
  var timesd = "⨰";
  var tint = "∭";
  var toea = "⤨";
  var top = "⊤";
  var topbot = "⌶";
  var topcir = "⫱";
  var Topf = "𝕋";
  var topf = "𝕥";
  var topfork = "⫚";
  var tosa = "⤩";
  var tprime = "‴";
  var TRADE = "™";
  var trade = "™";
  var triangle = "▵";
  var triangledown = "▿";
  var triangleleft = "◃";
  var trianglelefteq = "⊴";
  var triangleq = "≜";
  var triangleright = "▹";
  var trianglerighteq = "⊵";
  var tridot = "◬";
  var trie = "≜";
  var triminus = "⨺";
  var TripleDot = "⃛";
  var triplus = "⨹";
  var trisb = "⧍";
  var tritime = "⨻";
  var trpezium = "⏢";
  var Tscr = "𝒯";
  var tscr = "𝓉";
  var TScy = "Ц";
  var tscy = "ц";
  var TSHcy = "Ћ";
  var tshcy = "ћ";
  var Tstrok = "Ŧ";
  var tstrok = "ŧ";
  var twixt = "≬";
  var twoheadleftarrow = "↞";
  var twoheadrightarrow = "↠";
  var Uacute = "Ú";
  var uacute = "ú";
  var Uarr = "↟";
  var uArr = "⇑";
  var uarr = "↑";
  var Uarrocir = "⥉";
  var Ubrcy = "Ў";
  var ubrcy = "ў";
  var Ubreve = "Ŭ";
  var ubreve = "ŭ";
  var Ucirc = "Û";
  var ucirc = "û";
  var Ucy = "У";
  var ucy = "у";
  var udarr = "⇅";
  var Udblac = "Ű";
  var udblac = "ű";
  var udhar = "⥮";
  var ufisht = "⥾";
  var Ufr = "𝔘";
  var ufr = "𝔲";
  var Ugrave = "Ù";
  var ugrave = "ù";
  var uHar = "⥣";
  var uharl = "↿";
  var uharr = "↾";
  var uhblk = "▀";
  var ulcorn = "⌜";
  var ulcorner = "⌜";
  var ulcrop = "⌏";
  var ultri = "◸";
  var Umacr = "Ū";
  var umacr = "ū";
  var uml = "¨";
  var UnderBar = "_";
  var UnderBrace = "⏟";
  var UnderBracket = "⎵";
  var UnderParenthesis = "⏝";
  var Union = "⋃";
  var UnionPlus = "⊎";
  var Uogon = "Ų";
  var uogon = "ų";
  var Uopf = "𝕌";
  var uopf = "𝕦";
  var UpArrow = "↑";
  var Uparrow = "⇑";
  var uparrow = "↑";
  var UpArrowBar = "⤒";
  var UpArrowDownArrow = "⇅";
  var UpDownArrow = "↕";
  var Updownarrow = "⇕";
  var updownarrow = "↕";
  var UpEquilibrium = "⥮";
  var upharpoonleft = "↿";
  var upharpoonright = "↾";
  var uplus = "⊎";
  var UpperLeftArrow = "↖";
  var UpperRightArrow = "↗";
  var Upsi = "ϒ";
  var upsi = "υ";
  var upsih = "ϒ";
  var Upsilon = "Υ";
  var upsilon = "υ";
  var UpTee = "⊥";
  var UpTeeArrow = "↥";
  var upuparrows = "⇈";
  var urcorn = "⌝";
  var urcorner = "⌝";
  var urcrop = "⌎";
  var Uring = "Ů";
  var uring = "ů";
  var urtri = "◹";
  var Uscr = "𝒰";
  var uscr = "𝓊";
  var utdot = "⋰";
  var Utilde = "Ũ";
  var utilde = "ũ";
  var utri = "▵";
  var utrif = "▴";
  var uuarr = "⇈";
  var Uuml = "Ü";
  var uuml = "ü";
  var uwangle = "⦧";
  var vangrt = "⦜";
  var varepsilon = "ϵ";
  var varkappa = "ϰ";
  var varnothing = "∅";
  var varphi = "ϕ";
  var varpi = "ϖ";
  var varpropto = "∝";
  var vArr = "⇕";
  var varr = "↕";
  var varrho = "ϱ";
  var varsigma = "ς";
  var varsubsetneq = "⊊︀";
  var varsubsetneqq = "⫋︀";
  var varsupsetneq = "⊋︀";
  var varsupsetneqq = "⫌︀";
  var vartheta = "ϑ";
  var vartriangleleft = "⊲";
  var vartriangleright = "⊳";
  var Vbar = "⫫";
  var vBar = "⫨";
  var vBarv = "⫩";
  var Vcy = "В";
  var vcy = "в";
  var VDash = "⊫";
  var Vdash = "⊩";
  var vDash = "⊨";
  var vdash = "⊢";
  var Vdashl = "⫦";
  var Vee = "⋁";
  var vee = "∨";
  var veebar = "⊻";
  var veeeq = "≚";
  var vellip = "⋮";
  var Verbar = "‖";
  var verbar = "|";
  var Vert = "‖";
  var vert = "|";
  var VerticalBar = "∣";
  var VerticalLine = "|";
  var VerticalSeparator = "❘";
  var VerticalTilde = "≀";
  var VeryThinSpace = " ";
  var Vfr = "𝔙";
  var vfr = "𝔳";
  var vltri = "⊲";
  var vnsub = "⊂⃒";
  var vnsup = "⊃⃒";
  var Vopf = "𝕍";
  var vopf = "𝕧";
  var vprop = "∝";
  var vrtri = "⊳";
  var Vscr = "𝒱";
  var vscr = "𝓋";
  var vsubnE = "⫋︀";
  var vsubne = "⊊︀";
  var vsupnE = "⫌︀";
  var vsupne = "⊋︀";
  var Vvdash = "⊪";
  var vzigzag = "⦚";
  var Wcirc = "Ŵ";
  var wcirc = "ŵ";
  var wedbar = "⩟";
  var Wedge = "⋀";
  var wedge = "∧";
  var wedgeq = "≙";
  var weierp = "℘";
  var Wfr = "𝔚";
  var wfr = "𝔴";
  var Wopf = "𝕎";
  var wopf = "𝕨";
  var wp = "℘";
  var wr = "≀";
  var wreath = "≀";
  var Wscr = "𝒲";
  var wscr = "𝓌";
  var xcap = "⋂";
  var xcirc = "◯";
  var xcup = "⋃";
  var xdtri = "▽";
  var Xfr = "𝔛";
  var xfr = "𝔵";
  var xhArr = "⟺";
  var xharr = "⟷";
  var Xi = "Ξ";
  var xi = "ξ";
  var xlArr = "⟸";
  var xlarr = "⟵";
  var xmap = "⟼";
  var xnis = "⋻";
  var xodot = "⨀";
  var Xopf = "𝕏";
  var xopf = "𝕩";
  var xoplus = "⨁";
  var xotime = "⨂";
  var xrArr = "⟹";
  var xrarr = "⟶";
  var Xscr = "𝒳";
  var xscr = "𝓍";
  var xsqcup = "⨆";
  var xuplus = "⨄";
  var xutri = "△";
  var xvee = "⋁";
  var xwedge = "⋀";
  var Yacute = "Ý";
  var yacute = "ý";
  var YAcy = "Я";
  var yacy = "я";
  var Ycirc = "Ŷ";
  var ycirc = "ŷ";
  var Ycy = "Ы";
  var ycy = "ы";
  var yen = "¥";
  var Yfr = "𝔜";
  var yfr = "𝔶";
  var YIcy = "Ї";
  var yicy = "ї";
  var Yopf = "𝕐";
  var yopf = "𝕪";
  var Yscr = "𝒴";
  var yscr = "𝓎";
  var YUcy = "Ю";
  var yucy = "ю";
  var Yuml = "Ÿ";
  var yuml = "ÿ";
  var Zacute = "Ź";
  var zacute = "ź";
  var Zcaron = "Ž";
  var zcaron = "ž";
  var Zcy = "З";
  var zcy = "з";
  var Zdot = "Ż";
  var zdot = "ż";
  var zeetrf = "ℨ";
  var ZeroWidthSpace = "​";
  var Zeta = "Ζ";
  var zeta = "ζ";
  var Zfr = "ℨ";
  var zfr = "𝔷";
  var ZHcy = "Ж";
  var zhcy = "ж";
  var zigrarr = "⇝";
  var Zopf = "ℤ";
  var zopf = "𝕫";
  var Zscr = "𝒵";
  var zscr = "𝓏";
  var zwj = "‍";
  var zwnj = "‌";
  var allNamedEntities = {
    Aacute: Aacute,
    aacute: aacute,
    Abreve: Abreve,
    abreve: abreve,
    ac: ac,
    acd: acd,
    acE: acE,
    Acirc: Acirc,
    acirc: acirc,
    acute: acute,
    Acy: Acy,
    acy: acy,
    AElig: AElig,
    aelig: aelig,
    af: af,
    Afr: Afr,
    afr: afr,
    Agrave: Agrave,
    agrave: agrave,
    alefsym: alefsym,
    aleph: aleph,
    Alpha: Alpha,
    alpha: alpha,
    Amacr: Amacr,
    amacr: amacr,
    amalg: amalg,
    AMP: AMP,
    amp: amp,
    And: And,
    and: and,
    andand: andand,
    andd: andd,
    andslope: andslope,
    andv: andv,
    ang: ang,
    ange: ange,
    angle: angle,
    angmsd: angmsd,
    angmsdaa: angmsdaa,
    angmsdab: angmsdab,
    angmsdac: angmsdac,
    angmsdad: angmsdad,
    angmsdae: angmsdae,
    angmsdaf: angmsdaf,
    angmsdag: angmsdag,
    angmsdah: angmsdah,
    angrt: angrt,
    angrtvb: angrtvb,
    angrtvbd: angrtvbd,
    angsph: angsph,
    angst: angst,
    angzarr: angzarr,
    Aogon: Aogon,
    aogon: aogon,
    Aopf: Aopf,
    aopf: aopf,
    ap: ap,
    apacir: apacir,
    apE: apE,
    ape: ape,
    apid: apid,
    apos: apos,
    ApplyFunction: ApplyFunction,
    approx: approx,
    approxeq: approxeq,
    Aring: Aring,
    aring: aring,
    Ascr: Ascr,
    ascr: ascr,
    Assign: Assign,
    ast: ast,
    asymp: asymp,
    asympeq: asympeq,
    Atilde: Atilde,
    atilde: atilde,
    Auml: Auml,
    auml: auml,
    awconint: awconint,
    awint: awint,
    backcong: backcong,
    backepsilon: backepsilon,
    backprime: backprime,
    backsim: backsim,
    backsimeq: backsimeq,
    Backslash: Backslash,
    Barv: Barv,
    barvee: barvee,
    Barwed: Barwed,
    barwed: barwed,
    barwedge: barwedge,
    bbrk: bbrk,
    bbrktbrk: bbrktbrk,
    bcong: bcong,
    Bcy: Bcy,
    bcy: bcy,
    bdquo: bdquo,
    becaus: becaus,
    Because: Because,
    because: because,
    bemptyv: bemptyv,
    bepsi: bepsi,
    bernou: bernou,
    Bernoullis: Bernoullis,
    Beta: Beta,
    beta: beta,
    beth: beth,
    between: between,
    Bfr: Bfr,
    bfr: bfr,
    bigcap: bigcap,
    bigcirc: bigcirc,
    bigcup: bigcup,
    bigodot: bigodot,
    bigoplus: bigoplus,
    bigotimes: bigotimes,
    bigsqcup: bigsqcup,
    bigstar: bigstar,
    bigtriangledown: bigtriangledown,
    bigtriangleup: bigtriangleup,
    biguplus: biguplus,
    bigvee: bigvee,
    bigwedge: bigwedge,
    bkarow: bkarow,
    blacklozenge: blacklozenge,
    blacksquare: blacksquare,
    blacktriangle: blacktriangle,
    blacktriangledown: blacktriangledown,
    blacktriangleleft: blacktriangleleft,
    blacktriangleright: blacktriangleright,
    blank: blank,
    blk12: blk12,
    blk14: blk14,
    blk34: blk34,
    block: block,
    bne: bne,
    bnequiv: bnequiv,
    bNot: bNot,
    bnot: bnot,
    Bopf: Bopf,
    bopf: bopf,
    bot: bot,
    bottom: bottom,
    bowtie: bowtie,
    boxbox: boxbox,
    boxDL: boxDL,
    boxDl: boxDl,
    boxdL: boxdL,
    boxdl: boxdl,
    boxDR: boxDR,
    boxDr: boxDr,
    boxdR: boxdR,
    boxdr: boxdr,
    boxH: boxH,
    boxh: boxh,
    boxHD: boxHD,
    boxHd: boxHd,
    boxhD: boxhD,
    boxhd: boxhd,
    boxHU: boxHU,
    boxHu: boxHu,
    boxhU: boxhU,
    boxhu: boxhu,
    boxminus: boxminus,
    boxplus: boxplus,
    boxtimes: boxtimes,
    boxUL: boxUL,
    boxUl: boxUl,
    boxuL: boxuL,
    boxul: boxul,
    boxUR: boxUR,
    boxUr: boxUr,
    boxuR: boxuR,
    boxur: boxur,
    boxV: boxV,
    boxv: boxv,
    boxVH: boxVH,
    boxVh: boxVh,
    boxvH: boxvH,
    boxvh: boxvh,
    boxVL: boxVL,
    boxVl: boxVl,
    boxvL: boxvL,
    boxvl: boxvl,
    boxVR: boxVR,
    boxVr: boxVr,
    boxvR: boxvR,
    boxvr: boxvr,
    bprime: bprime,
    Breve: Breve,
    breve: breve,
    brvbar: brvbar,
    Bscr: Bscr,
    bscr: bscr,
    bsemi: bsemi,
    bsim: bsim,
    bsime: bsime,
    bsol: bsol,
    bsolb: bsolb,
    bsolhsub: bsolhsub,
    bull: bull,
    bullet: bullet,
    bump: bump,
    bumpE: bumpE,
    bumpe: bumpe,
    Bumpeq: Bumpeq,
    bumpeq: bumpeq,
    Cacute: Cacute,
    cacute: cacute,
    Cap: Cap,
    cap: cap,
    capand: capand,
    capbrcup: capbrcup,
    capcap: capcap,
    capcup: capcup,
    capdot: capdot,
    CapitalDifferentialD: CapitalDifferentialD,
    caps: caps,
    caret: caret,
    caron: caron,
    Cayleys: Cayleys,
    ccaps: ccaps,
    Ccaron: Ccaron,
    ccaron: ccaron,
    Ccedil: Ccedil,
    ccedil: ccedil,
    Ccirc: Ccirc,
    ccirc: ccirc,
    Cconint: Cconint,
    ccups: ccups,
    ccupssm: ccupssm,
    Cdot: Cdot,
    cdot: cdot,
    cedil: cedil,
    Cedilla: Cedilla,
    cemptyv: cemptyv,
    cent: cent,
    CenterDot: CenterDot,
    centerdot: centerdot,
    Cfr: Cfr,
    cfr: cfr,
    CHcy: CHcy,
    chcy: chcy,
    check: check,
    checkmark: checkmark,
    Chi: Chi,
    chi: chi,
    cir: cir,
    circ: circ,
    circeq: circeq,
    circlearrowleft: circlearrowleft,
    circlearrowright: circlearrowright,
    circledast: circledast,
    circledcirc: circledcirc,
    circleddash: circleddash,
    CircleDot: CircleDot,
    circledR: circledR,
    circledS: circledS,
    CircleMinus: CircleMinus,
    CirclePlus: CirclePlus,
    CircleTimes: CircleTimes,
    cirE: cirE,
    cire: cire,
    cirfnint: cirfnint,
    cirmid: cirmid,
    cirscir: cirscir,
    ClockwiseContourIntegral: ClockwiseContourIntegral,
    CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
    CloseCurlyQuote: CloseCurlyQuote,
    clubs: clubs,
    clubsuit: clubsuit,
    Colon: Colon,
    colon: colon,
    Colone: Colone,
    colone: colone,
    coloneq: coloneq,
    comma: comma,
    commat: commat,
    comp: comp,
    compfn: compfn,
    complement: complement,
    complexes: complexes,
    cong: cong,
    congdot: congdot,
    Congruent: Congruent,
    Conint: Conint,
    conint: conint,
    ContourIntegral: ContourIntegral,
    Copf: Copf,
    copf: copf,
    coprod: coprod,
    Coproduct: Coproduct,
    COPY: COPY,
    copy: copy,
    copysr: copysr,
    CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
    crarr: crarr,
    Cross: Cross,
    cross: cross,
    Cscr: Cscr,
    cscr: cscr,
    csub: csub,
    csube: csube,
    csup: csup,
    csupe: csupe,
    ctdot: ctdot,
    cudarrl: cudarrl,
    cudarrr: cudarrr,
    cuepr: cuepr,
    cuesc: cuesc,
    cularr: cularr,
    cularrp: cularrp,
    Cup: Cup,
    cup: cup,
    cupbrcap: cupbrcap,
    CupCap: CupCap,
    cupcap: cupcap,
    cupcup: cupcup,
    cupdot: cupdot,
    cupor: cupor,
    cups: cups,
    curarr: curarr,
    curarrm: curarrm,
    curlyeqprec: curlyeqprec,
    curlyeqsucc: curlyeqsucc,
    curlyvee: curlyvee,
    curlywedge: curlywedge,
    curren: curren,
    curvearrowleft: curvearrowleft,
    curvearrowright: curvearrowright,
    cuvee: cuvee,
    cuwed: cuwed,
    cwconint: cwconint,
    cwint: cwint,
    cylcty: cylcty,
    Dagger: Dagger,
    dagger: dagger,
    daleth: daleth,
    Darr: Darr,
    dArr: dArr,
    darr: darr,
    dash: dash,
    Dashv: Dashv,
    dashv: dashv,
    dbkarow: dbkarow,
    dblac: dblac,
    Dcaron: Dcaron,
    dcaron: dcaron,
    Dcy: Dcy,
    dcy: dcy,
    DD: DD,
    dd: dd,
    ddagger: ddagger,
    ddarr: ddarr,
    DDotrahd: DDotrahd,
    ddotseq: ddotseq,
    deg: deg,
    Del: Del,
    Delta: Delta,
    delta: delta,
    demptyv: demptyv,
    dfisht: dfisht,
    Dfr: Dfr,
    dfr: dfr,
    dHar: dHar,
    dharl: dharl,
    dharr: dharr,
    DiacriticalAcute: DiacriticalAcute,
    DiacriticalDot: DiacriticalDot,
    DiacriticalDoubleAcute: DiacriticalDoubleAcute,
    DiacriticalGrave: DiacriticalGrave,
    DiacriticalTilde: DiacriticalTilde,
    diam: diam,
    Diamond: Diamond,
    diamond: diamond,
    diamondsuit: diamondsuit,
    diams: diams,
    die: die,
    DifferentialD: DifferentialD,
    digamma: digamma,
    disin: disin,
    div: div,
    divide: divide,
    divideontimes: divideontimes,
    divonx: divonx,
    DJcy: DJcy,
    djcy: djcy,
    dlcorn: dlcorn,
    dlcrop: dlcrop,
    dollar: dollar,
    Dopf: Dopf,
    dopf: dopf,
    Dot: Dot,
    dot: dot,
    DotDot: DotDot,
    doteq: doteq,
    doteqdot: doteqdot,
    DotEqual: DotEqual,
    dotminus: dotminus,
    dotplus: dotplus,
    dotsquare: dotsquare,
    doublebarwedge: doublebarwedge,
    DoubleContourIntegral: DoubleContourIntegral,
    DoubleDot: DoubleDot,
    DoubleDownArrow: DoubleDownArrow,
    DoubleLeftArrow: DoubleLeftArrow,
    DoubleLeftRightArrow: DoubleLeftRightArrow,
    DoubleLeftTee: DoubleLeftTee,
    DoubleLongLeftArrow: DoubleLongLeftArrow,
    DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
    DoubleLongRightArrow: DoubleLongRightArrow,
    DoubleRightArrow: DoubleRightArrow,
    DoubleRightTee: DoubleRightTee,
    DoubleUpArrow: DoubleUpArrow,
    DoubleUpDownArrow: DoubleUpDownArrow,
    DoubleVerticalBar: DoubleVerticalBar,
    DownArrow: DownArrow,
    Downarrow: Downarrow,
    downarrow: downarrow,
    DownArrowBar: DownArrowBar,
    DownArrowUpArrow: DownArrowUpArrow,
    DownBreve: DownBreve,
    downdownarrows: downdownarrows,
    downharpoonleft: downharpoonleft,
    downharpoonright: downharpoonright,
    DownLeftRightVector: DownLeftRightVector,
    DownLeftTeeVector: DownLeftTeeVector,
    DownLeftVector: DownLeftVector,
    DownLeftVectorBar: DownLeftVectorBar,
    DownRightTeeVector: DownRightTeeVector,
    DownRightVector: DownRightVector,
    DownRightVectorBar: DownRightVectorBar,
    DownTee: DownTee,
    DownTeeArrow: DownTeeArrow,
    drbkarow: drbkarow,
    drcorn: drcorn,
    drcrop: drcrop,
    Dscr: Dscr,
    dscr: dscr,
    DScy: DScy,
    dscy: dscy,
    dsol: dsol,
    Dstrok: Dstrok,
    dstrok: dstrok,
    dtdot: dtdot,
    dtri: dtri,
    dtrif: dtrif,
    duarr: duarr,
    duhar: duhar,
    dwangle: dwangle,
    DZcy: DZcy,
    dzcy: dzcy,
    dzigrarr: dzigrarr,
    Eacute: Eacute,
    eacute: eacute,
    easter: easter,
    Ecaron: Ecaron,
    ecaron: ecaron,
    ecir: ecir,
    Ecirc: Ecirc,
    ecirc: ecirc,
    ecolon: ecolon,
    Ecy: Ecy,
    ecy: ecy,
    eDDot: eDDot,
    Edot: Edot,
    eDot: eDot,
    edot: edot,
    ee: ee,
    efDot: efDot,
    Efr: Efr,
    efr: efr,
    eg: eg,
    Egrave: Egrave,
    egrave: egrave,
    egs: egs,
    egsdot: egsdot,
    el: el,
    Element: Element,
    elinters: elinters,
    ell: ell,
    els: els,
    elsdot: elsdot,
    Emacr: Emacr,
    emacr: emacr,
    empty: empty,
    emptyset: emptyset,
    EmptySmallSquare: EmptySmallSquare,
    emptyv: emptyv,
    EmptyVerySmallSquare: EmptyVerySmallSquare,
    emsp: emsp,
    emsp13: emsp13,
    emsp14: emsp14,
    ENG: ENG,
    eng: eng,
    ensp: ensp,
    Eogon: Eogon,
    eogon: eogon,
    Eopf: Eopf,
    eopf: eopf,
    epar: epar,
    eparsl: eparsl,
    eplus: eplus,
    epsi: epsi,
    Epsilon: Epsilon,
    epsilon: epsilon,
    epsiv: epsiv,
    eqcirc: eqcirc,
    eqcolon: eqcolon,
    eqsim: eqsim,
    eqslantgtr: eqslantgtr,
    eqslantless: eqslantless,
    Equal: Equal,
    equals: equals,
    EqualTilde: EqualTilde,
    equest: equest,
    Equilibrium: Equilibrium,
    equiv: equiv,
    equivDD: equivDD,
    eqvparsl: eqvparsl,
    erarr: erarr,
    erDot: erDot,
    Escr: Escr,
    escr: escr,
    esdot: esdot,
    Esim: Esim,
    esim: esim,
    Eta: Eta,
    eta: eta,
    ETH: ETH,
    eth: eth,
    Euml: Euml,
    euml: euml,
    euro: euro,
    excl: excl,
    exist: exist,
    Exists: Exists,
    expectation: expectation,
    ExponentialE: ExponentialE,
    exponentiale: exponentiale,
    fallingdotseq: fallingdotseq,
    Fcy: Fcy,
    fcy: fcy,
    female: female,
    ffilig: ffilig,
    fflig: fflig,
    ffllig: ffllig,
    Ffr: Ffr,
    ffr: ffr,
    filig: filig,
    FilledSmallSquare: FilledSmallSquare,
    FilledVerySmallSquare: FilledVerySmallSquare,
    fjlig: fjlig,
    flat: flat,
    fllig: fllig,
    fltns: fltns,
    fnof: fnof,
    Fopf: Fopf,
    fopf: fopf,
    ForAll: ForAll,
    forall: forall,
    fork: fork,
    forkv: forkv,
    Fouriertrf: Fouriertrf,
    fpartint: fpartint,
    frac12: frac12,
    frac13: frac13,
    frac14: frac14,
    frac15: frac15,
    frac16: frac16,
    frac18: frac18,
    frac23: frac23,
    frac25: frac25,
    frac34: frac34,
    frac35: frac35,
    frac38: frac38,
    frac45: frac45,
    frac56: frac56,
    frac58: frac58,
    frac78: frac78,
    frasl: frasl,
    frown: frown,
    Fscr: Fscr,
    fscr: fscr,
    gacute: gacute,
    Gamma: Gamma,
    gamma: gamma,
    Gammad: Gammad,
    gammad: gammad,
    gap: gap,
    Gbreve: Gbreve,
    gbreve: gbreve,
    Gcedil: Gcedil,
    Gcirc: Gcirc,
    gcirc: gcirc,
    Gcy: Gcy,
    gcy: gcy,
    Gdot: Gdot,
    gdot: gdot,
    gE: gE,
    ge: ge,
    gEl: gEl,
    gel: gel,
    geq: geq,
    geqq: geqq,
    geqslant: geqslant,
    ges: ges,
    gescc: gescc,
    gesdot: gesdot,
    gesdoto: gesdoto,
    gesdotol: gesdotol,
    gesl: gesl,
    gesles: gesles,
    Gfr: Gfr,
    gfr: gfr,
    Gg: Gg,
    gg: gg,
    ggg: ggg,
    gimel: gimel,
    GJcy: GJcy,
    gjcy: gjcy,
    gl: gl,
    gla: gla,
    glE: glE,
    glj: glj,
    gnap: gnap,
    gnapprox: gnapprox,
    gnE: gnE,
    gne: gne,
    gneq: gneq,
    gneqq: gneqq,
    gnsim: gnsim,
    Gopf: Gopf,
    gopf: gopf,
    grave: grave,
    GreaterEqual: GreaterEqual,
    GreaterEqualLess: GreaterEqualLess,
    GreaterFullEqual: GreaterFullEqual,
    GreaterGreater: GreaterGreater,
    GreaterLess: GreaterLess,
    GreaterSlantEqual: GreaterSlantEqual,
    GreaterTilde: GreaterTilde,
    Gscr: Gscr,
    gscr: gscr,
    gsim: gsim,
    gsime: gsime,
    gsiml: gsiml,
    GT: GT,
    Gt: Gt,
    gt: gt,
    gtcc: gtcc,
    gtcir: gtcir,
    gtdot: gtdot,
    gtlPar: gtlPar,
    gtquest: gtquest,
    gtrapprox: gtrapprox,
    gtrarr: gtrarr,
    gtrdot: gtrdot,
    gtreqless: gtreqless,
    gtreqqless: gtreqqless,
    gtrless: gtrless,
    gtrsim: gtrsim,
    gvertneqq: gvertneqq,
    gvnE: gvnE,
    Hacek: Hacek,
    hairsp: hairsp,
    half: half,
    hamilt: hamilt,
    HARDcy: HARDcy,
    hardcy: hardcy,
    hArr: hArr,
    harr: harr,
    harrcir: harrcir,
    harrw: harrw,
    Hat: Hat,
    hbar: hbar,
    Hcirc: Hcirc,
    hcirc: hcirc,
    hearts: hearts,
    heartsuit: heartsuit,
    hellip: hellip,
    hercon: hercon,
    Hfr: Hfr,
    hfr: hfr,
    HilbertSpace: HilbertSpace,
    hksearow: hksearow,
    hkswarow: hkswarow,
    hoarr: hoarr,
    homtht: homtht,
    hookleftarrow: hookleftarrow,
    hookrightarrow: hookrightarrow,
    Hopf: Hopf,
    hopf: hopf,
    horbar: horbar,
    HorizontalLine: HorizontalLine,
    Hscr: Hscr,
    hscr: hscr,
    hslash: hslash,
    Hstrok: Hstrok,
    hstrok: hstrok,
    HumpDownHump: HumpDownHump,
    HumpEqual: HumpEqual,
    hybull: hybull,
    hyphen: hyphen,
    Iacute: Iacute,
    iacute: iacute,
    ic: ic,
    Icirc: Icirc,
    icirc: icirc,
    Icy: Icy,
    icy: icy,
    Idot: Idot,
    IEcy: IEcy,
    iecy: iecy,
    iexcl: iexcl,
    iff: iff,
    Ifr: Ifr,
    ifr: ifr,
    Igrave: Igrave,
    igrave: igrave,
    ii: ii,
    iiiint: iiiint,
    iiint: iiint,
    iinfin: iinfin,
    iiota: iiota,
    IJlig: IJlig,
    ijlig: ijlig,
    Im: Im,
    Imacr: Imacr,
    imacr: imacr,
    image: image,
    ImaginaryI: ImaginaryI,
    imagline: imagline,
    imagpart: imagpart,
    imath: imath,
    imof: imof,
    imped: imped,
    Implies: Implies,
    "in": "∈",
    incare: incare,
    infin: infin,
    infintie: infintie,
    inodot: inodot,
    Int: Int,
    int: int,
    intcal: intcal,
    integers: integers,
    Integral: Integral,
    intercal: intercal,
    Intersection: Intersection,
    intlarhk: intlarhk,
    intprod: intprod,
    InvisibleComma: InvisibleComma,
    InvisibleTimes: InvisibleTimes,
    IOcy: IOcy,
    iocy: iocy,
    Iogon: Iogon,
    iogon: iogon,
    Iopf: Iopf,
    iopf: iopf,
    Iota: Iota,
    iota: iota,
    iprod: iprod,
    iquest: iquest,
    Iscr: Iscr,
    iscr: iscr,
    isin: isin,
    isindot: isindot,
    isinE: isinE,
    isins: isins,
    isinsv: isinsv,
    isinv: isinv,
    it: it,
    Itilde: Itilde,
    itilde: itilde,
    Iukcy: Iukcy,
    iukcy: iukcy,
    Iuml: Iuml,
    iuml: iuml,
    Jcirc: Jcirc,
    jcirc: jcirc,
    Jcy: Jcy,
    jcy: jcy,
    Jfr: Jfr,
    jfr: jfr,
    jmath: jmath,
    Jopf: Jopf,
    jopf: jopf,
    Jscr: Jscr,
    jscr: jscr,
    Jsercy: Jsercy,
    jsercy: jsercy,
    Jukcy: Jukcy,
    jukcy: jukcy,
    Kappa: Kappa,
    kappa: kappa,
    kappav: kappav,
    Kcedil: Kcedil,
    kcedil: kcedil,
    Kcy: Kcy,
    kcy: kcy,
    Kfr: Kfr,
    kfr: kfr,
    kgreen: kgreen,
    KHcy: KHcy,
    khcy: khcy,
    KJcy: KJcy,
    kjcy: kjcy,
    Kopf: Kopf,
    kopf: kopf,
    Kscr: Kscr,
    kscr: kscr,
    lAarr: lAarr,
    Lacute: Lacute,
    lacute: lacute,
    laemptyv: laemptyv,
    lagran: lagran,
    Lambda: Lambda,
    lambda: lambda,
    Lang: Lang,
    lang: lang,
    langd: langd,
    langle: langle,
    lap: lap,
    Laplacetrf: Laplacetrf,
    laquo: laquo,
    Larr: Larr,
    lArr: lArr,
    larr: larr,
    larrb: larrb,
    larrbfs: larrbfs,
    larrfs: larrfs,
    larrhk: larrhk,
    larrlp: larrlp,
    larrpl: larrpl,
    larrsim: larrsim,
    larrtl: larrtl,
    lat: lat,
    lAtail: lAtail,
    latail: latail,
    late: late,
    lates: lates,
    lBarr: lBarr,
    lbarr: lbarr,
    lbbrk: lbbrk,
    lbrace: lbrace,
    lbrack: lbrack,
    lbrke: lbrke,
    lbrksld: lbrksld,
    lbrkslu: lbrkslu,
    Lcaron: Lcaron,
    lcaron: lcaron,
    Lcedil: Lcedil,
    lcedil: lcedil,
    lceil: lceil,
    lcub: lcub,
    Lcy: Lcy,
    lcy: lcy,
    ldca: ldca,
    ldquo: ldquo,
    ldquor: ldquor,
    ldrdhar: ldrdhar,
    ldrushar: ldrushar,
    ldsh: ldsh,
    lE: lE,
    le: le,
    LeftAngleBracket: LeftAngleBracket,
    LeftArrow: LeftArrow,
    Leftarrow: Leftarrow,
    leftarrow: leftarrow,
    LeftArrowBar: LeftArrowBar,
    LeftArrowRightArrow: LeftArrowRightArrow,
    leftarrowtail: leftarrowtail,
    LeftCeiling: LeftCeiling,
    LeftDoubleBracket: LeftDoubleBracket,
    LeftDownTeeVector: LeftDownTeeVector,
    LeftDownVector: LeftDownVector,
    LeftDownVectorBar: LeftDownVectorBar,
    LeftFloor: LeftFloor,
    leftharpoondown: leftharpoondown,
    leftharpoonup: leftharpoonup,
    leftleftarrows: leftleftarrows,
    LeftRightArrow: LeftRightArrow,
    Leftrightarrow: Leftrightarrow,
    leftrightarrow: leftrightarrow,
    leftrightarrows: leftrightarrows,
    leftrightharpoons: leftrightharpoons,
    leftrightsquigarrow: leftrightsquigarrow,
    LeftRightVector: LeftRightVector,
    LeftTee: LeftTee,
    LeftTeeArrow: LeftTeeArrow,
    LeftTeeVector: LeftTeeVector,
    leftthreetimes: leftthreetimes,
    LeftTriangle: LeftTriangle,
    LeftTriangleBar: LeftTriangleBar,
    LeftTriangleEqual: LeftTriangleEqual,
    LeftUpDownVector: LeftUpDownVector,
    LeftUpTeeVector: LeftUpTeeVector,
    LeftUpVector: LeftUpVector,
    LeftUpVectorBar: LeftUpVectorBar,
    LeftVector: LeftVector,
    LeftVectorBar: LeftVectorBar,
    lEg: lEg,
    leg: leg,
    leq: leq,
    leqq: leqq,
    leqslant: leqslant,
    les: les,
    lescc: lescc,
    lesdot: lesdot,
    lesdoto: lesdoto,
    lesdotor: lesdotor,
    lesg: lesg,
    lesges: lesges,
    lessapprox: lessapprox,
    lessdot: lessdot,
    lesseqgtr: lesseqgtr,
    lesseqqgtr: lesseqqgtr,
    LessEqualGreater: LessEqualGreater,
    LessFullEqual: LessFullEqual,
    LessGreater: LessGreater,
    lessgtr: lessgtr,
    LessLess: LessLess,
    lesssim: lesssim,
    LessSlantEqual: LessSlantEqual,
    LessTilde: LessTilde,
    lfisht: lfisht,
    lfloor: lfloor,
    Lfr: Lfr,
    lfr: lfr,
    lg: lg,
    lgE: lgE,
    lHar: lHar,
    lhard: lhard,
    lharu: lharu,
    lharul: lharul,
    lhblk: lhblk,
    LJcy: LJcy,
    ljcy: ljcy,
    Ll: Ll,
    ll: ll,
    llarr: llarr,
    llcorner: llcorner,
    Lleftarrow: Lleftarrow,
    llhard: llhard,
    lltri: lltri,
    Lmidot: Lmidot,
    lmidot: lmidot,
    lmoust: lmoust,
    lmoustache: lmoustache,
    lnap: lnap,
    lnapprox: lnapprox,
    lnE: lnE,
    lne: lne,
    lneq: lneq,
    lneqq: lneqq,
    lnsim: lnsim,
    loang: loang,
    loarr: loarr,
    lobrk: lobrk,
    LongLeftArrow: LongLeftArrow,
    Longleftarrow: Longleftarrow,
    longleftarrow: longleftarrow,
    LongLeftRightArrow: LongLeftRightArrow,
    Longleftrightarrow: Longleftrightarrow,
    longleftrightarrow: longleftrightarrow,
    longmapsto: longmapsto,
    LongRightArrow: LongRightArrow,
    Longrightarrow: Longrightarrow,
    longrightarrow: longrightarrow,
    looparrowleft: looparrowleft,
    looparrowright: looparrowright,
    lopar: lopar,
    Lopf: Lopf,
    lopf: lopf,
    loplus: loplus,
    lotimes: lotimes,
    lowast: lowast,
    lowbar: lowbar,
    LowerLeftArrow: LowerLeftArrow,
    LowerRightArrow: LowerRightArrow,
    loz: loz,
    lozenge: lozenge,
    lozf: lozf,
    lpar: lpar,
    lparlt: lparlt,
    lrarr: lrarr,
    lrcorner: lrcorner,
    lrhar: lrhar,
    lrhard: lrhard,
    lrm: lrm,
    lrtri: lrtri,
    lsaquo: lsaquo,
    Lscr: Lscr,
    lscr: lscr,
    Lsh: Lsh,
    lsh: lsh,
    lsim: lsim,
    lsime: lsime,
    lsimg: lsimg,
    lsqb: lsqb,
    lsquo: lsquo,
    lsquor: lsquor,
    Lstrok: Lstrok,
    lstrok: lstrok,
    LT: LT,
    Lt: Lt,
    lt: lt,
    ltcc: ltcc,
    ltcir: ltcir,
    ltdot: ltdot,
    lthree: lthree,
    ltimes: ltimes,
    ltlarr: ltlarr,
    ltquest: ltquest,
    ltri: ltri,
    ltrie: ltrie,
    ltrif: ltrif,
    ltrPar: ltrPar,
    lurdshar: lurdshar,
    luruhar: luruhar,
    lvertneqq: lvertneqq,
    lvnE: lvnE,
    macr: macr,
    male: male,
    malt: malt,
    maltese: maltese,
    "Map": "⤅",
    map: map,
    mapsto: mapsto,
    mapstodown: mapstodown,
    mapstoleft: mapstoleft,
    mapstoup: mapstoup,
    marker: marker,
    mcomma: mcomma,
    Mcy: Mcy,
    mcy: mcy,
    mdash: mdash,
    mDDot: mDDot,
    measuredangle: measuredangle,
    MediumSpace: MediumSpace,
    Mellintrf: Mellintrf,
    Mfr: Mfr,
    mfr: mfr,
    mho: mho,
    micro: micro,
    mid: mid,
    midast: midast,
    midcir: midcir,
    middot: middot,
    minus: minus,
    minusb: minusb,
    minusd: minusd,
    minusdu: minusdu,
    MinusPlus: MinusPlus,
    mlcp: mlcp,
    mldr: mldr,
    mnplus: mnplus,
    models: models,
    Mopf: Mopf,
    mopf: mopf,
    mp: mp,
    Mscr: Mscr,
    mscr: mscr,
    mstpos: mstpos,
    Mu: Mu,
    mu: mu,
    multimap: multimap,
    mumap: mumap,
    nabla: nabla,
    Nacute: Nacute,
    nacute: nacute,
    nang: nang,
    nap: nap,
    napE: napE,
    napid: napid,
    napos: napos,
    napprox: napprox,
    natur: natur,
    natural: natural,
    naturals: naturals,
    nbsp: nbsp,
    nbump: nbump,
    nbumpe: nbumpe,
    ncap: ncap,
    Ncaron: Ncaron,
    ncaron: ncaron,
    Ncedil: Ncedil,
    ncedil: ncedil,
    ncong: ncong,
    ncongdot: ncongdot,
    ncup: ncup,
    Ncy: Ncy,
    ncy: ncy,
    ndash: ndash,
    ne: ne,
    nearhk: nearhk,
    neArr: neArr,
    nearr: nearr,
    nearrow: nearrow,
    nedot: nedot,
    NegativeMediumSpace: NegativeMediumSpace,
    NegativeThickSpace: NegativeThickSpace,
    NegativeThinSpace: NegativeThinSpace,
    NegativeVeryThinSpace: NegativeVeryThinSpace,
    nequiv: nequiv,
    nesear: nesear,
    nesim: nesim,
    NestedGreaterGreater: NestedGreaterGreater,
    NestedLessLess: NestedLessLess,
    NewLine: NewLine,
    nexist: nexist,
    nexists: nexists,
    Nfr: Nfr,
    nfr: nfr,
    ngE: ngE,
    nge: nge,
    ngeq: ngeq,
    ngeqq: ngeqq,
    ngeqslant: ngeqslant,
    nges: nges,
    nGg: nGg,
    ngsim: ngsim,
    nGt: nGt,
    ngt: ngt,
    ngtr: ngtr,
    nGtv: nGtv,
    nhArr: nhArr,
    nharr: nharr,
    nhpar: nhpar,
    ni: ni,
    nis: nis,
    nisd: nisd,
    niv: niv,
    NJcy: NJcy,
    njcy: njcy,
    nlArr: nlArr,
    nlarr: nlarr,
    nldr: nldr,
    nlE: nlE,
    nle: nle,
    nLeftarrow: nLeftarrow,
    nleftarrow: nleftarrow,
    nLeftrightarrow: nLeftrightarrow,
    nleftrightarrow: nleftrightarrow,
    nleq: nleq,
    nleqq: nleqq,
    nleqslant: nleqslant,
    nles: nles,
    nless: nless,
    nLl: nLl,
    nlsim: nlsim,
    nLt: nLt,
    nlt: nlt,
    nltri: nltri,
    nltrie: nltrie,
    nLtv: nLtv,
    nmid: nmid,
    NoBreak: NoBreak,
    NonBreakingSpace: NonBreakingSpace,
    Nopf: Nopf,
    nopf: nopf,
    Not: Not,
    not: not,
    NotCongruent: NotCongruent,
    NotCupCap: NotCupCap,
    NotDoubleVerticalBar: NotDoubleVerticalBar,
    NotElement: NotElement,
    NotEqual: NotEqual,
    NotEqualTilde: NotEqualTilde,
    NotExists: NotExists,
    NotGreater: NotGreater,
    NotGreaterEqual: NotGreaterEqual,
    NotGreaterFullEqual: NotGreaterFullEqual,
    NotGreaterGreater: NotGreaterGreater,
    NotGreaterLess: NotGreaterLess,
    NotGreaterSlantEqual: NotGreaterSlantEqual,
    NotGreaterTilde: NotGreaterTilde,
    NotHumpDownHump: NotHumpDownHump,
    NotHumpEqual: NotHumpEqual,
    notin: notin,
    notindot: notindot,
    notinE: notinE,
    notinva: notinva,
    notinvb: notinvb,
    notinvc: notinvc,
    NotLeftTriangle: NotLeftTriangle,
    NotLeftTriangleBar: NotLeftTriangleBar,
    NotLeftTriangleEqual: NotLeftTriangleEqual,
    NotLess: NotLess,
    NotLessEqual: NotLessEqual,
    NotLessGreater: NotLessGreater,
    NotLessLess: NotLessLess,
    NotLessSlantEqual: NotLessSlantEqual,
    NotLessTilde: NotLessTilde,
    NotNestedGreaterGreater: NotNestedGreaterGreater,
    NotNestedLessLess: NotNestedLessLess,
    notni: notni,
    notniva: notniva,
    notnivb: notnivb,
    notnivc: notnivc,
    NotPrecedes: NotPrecedes,
    NotPrecedesEqual: NotPrecedesEqual,
    NotPrecedesSlantEqual: NotPrecedesSlantEqual,
    NotReverseElement: NotReverseElement,
    NotRightTriangle: NotRightTriangle,
    NotRightTriangleBar: NotRightTriangleBar,
    NotRightTriangleEqual: NotRightTriangleEqual,
    NotSquareSubset: NotSquareSubset,
    NotSquareSubsetEqual: NotSquareSubsetEqual,
    NotSquareSuperset: NotSquareSuperset,
    NotSquareSupersetEqual: NotSquareSupersetEqual,
    NotSubset: NotSubset,
    NotSubsetEqual: NotSubsetEqual,
    NotSucceeds: NotSucceeds,
    NotSucceedsEqual: NotSucceedsEqual,
    NotSucceedsSlantEqual: NotSucceedsSlantEqual,
    NotSucceedsTilde: NotSucceedsTilde,
    NotSuperset: NotSuperset,
    NotSupersetEqual: NotSupersetEqual,
    NotTilde: NotTilde,
    NotTildeEqual: NotTildeEqual,
    NotTildeFullEqual: NotTildeFullEqual,
    NotTildeTilde: NotTildeTilde,
    NotVerticalBar: NotVerticalBar,
    npar: npar,
    nparallel: nparallel,
    nparsl: nparsl,
    npart: npart,
    npolint: npolint,
    npr: npr,
    nprcue: nprcue,
    npre: npre,
    nprec: nprec,
    npreceq: npreceq,
    nrArr: nrArr,
    nrarr: nrarr,
    nrarrc: nrarrc,
    nrarrw: nrarrw,
    nRightarrow: nRightarrow,
    nrightarrow: nrightarrow,
    nrtri: nrtri,
    nrtrie: nrtrie,
    nsc: nsc,
    nsccue: nsccue,
    nsce: nsce,
    Nscr: Nscr,
    nscr: nscr,
    nshortmid: nshortmid,
    nshortparallel: nshortparallel,
    nsim: nsim,
    nsime: nsime,
    nsimeq: nsimeq,
    nsmid: nsmid,
    nspar: nspar,
    nsqsube: nsqsube,
    nsqsupe: nsqsupe,
    nsub: nsub,
    nsubE: nsubE,
    nsube: nsube,
    nsubset: nsubset,
    nsubseteq: nsubseteq,
    nsubseteqq: nsubseteqq,
    nsucc: nsucc,
    nsucceq: nsucceq,
    nsup: nsup,
    nsupE: nsupE,
    nsupe: nsupe,
    nsupset: nsupset,
    nsupseteq: nsupseteq,
    nsupseteqq: nsupseteqq,
    ntgl: ntgl,
    Ntilde: Ntilde,
    ntilde: ntilde,
    ntlg: ntlg,
    ntriangleleft: ntriangleleft,
    ntrianglelefteq: ntrianglelefteq,
    ntriangleright: ntriangleright,
    ntrianglerighteq: ntrianglerighteq,
    Nu: Nu,
    nu: nu,
    num: num,
    numero: numero,
    numsp: numsp,
    nvap: nvap,
    nVDash: nVDash,
    nVdash: nVdash,
    nvDash: nvDash,
    nvdash: nvdash,
    nvge: nvge,
    nvgt: nvgt,
    nvHarr: nvHarr,
    nvinfin: nvinfin,
    nvlArr: nvlArr,
    nvle: nvle,
    nvlt: nvlt,
    nvltrie: nvltrie,
    nvrArr: nvrArr,
    nvrtrie: nvrtrie,
    nvsim: nvsim,
    nwarhk: nwarhk,
    nwArr: nwArr,
    nwarr: nwarr,
    nwarrow: nwarrow,
    nwnear: nwnear,
    Oacute: Oacute,
    oacute: oacute,
    oast: oast,
    ocir: ocir,
    Ocirc: Ocirc,
    ocirc: ocirc,
    Ocy: Ocy,
    ocy: ocy,
    odash: odash,
    Odblac: Odblac,
    odblac: odblac,
    odiv: odiv,
    odot: odot,
    odsold: odsold,
    OElig: OElig,
    oelig: oelig,
    ofcir: ofcir,
    Ofr: Ofr,
    ofr: ofr,
    ogon: ogon,
    Ograve: Ograve,
    ograve: ograve,
    ogt: ogt,
    ohbar: ohbar,
    ohm: ohm,
    oint: oint,
    olarr: olarr,
    olcir: olcir,
    olcross: olcross,
    oline: oline,
    olt: olt,
    Omacr: Omacr,
    omacr: omacr,
    Omega: Omega,
    omega: omega,
    Omicron: Omicron,
    omicron: omicron,
    omid: omid,
    ominus: ominus,
    Oopf: Oopf,
    oopf: oopf,
    opar: opar,
    OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
    OpenCurlyQuote: OpenCurlyQuote,
    operp: operp,
    oplus: oplus,
    Or: Or,
    or: or,
    orarr: orarr,
    ord: ord,
    order: order,
    orderof: orderof,
    ordf: ordf,
    ordm: ordm,
    origof: origof,
    oror: oror,
    orslope: orslope,
    orv: orv,
    oS: oS,
    Oscr: Oscr,
    oscr: oscr,
    Oslash: Oslash,
    oslash: oslash,
    osol: osol,
    Otilde: Otilde,
    otilde: otilde,
    Otimes: Otimes,
    otimes: otimes,
    otimesas: otimesas,
    Ouml: Ouml,
    ouml: ouml,
    ovbar: ovbar,
    OverBar: OverBar,
    OverBrace: OverBrace,
    OverBracket: OverBracket,
    OverParenthesis: OverParenthesis,
    par: par,
    para: para,
    parallel: parallel,
    parsim: parsim,
    parsl: parsl,
    part: part,
    PartialD: PartialD,
    Pcy: Pcy,
    pcy: pcy,
    percnt: percnt,
    period: period,
    permil: permil,
    perp: perp,
    pertenk: pertenk,
    Pfr: Pfr,
    pfr: pfr,
    Phi: Phi,
    phi: phi,
    phiv: phiv,
    phmmat: phmmat,
    phone: phone,
    Pi: Pi,
    pi: pi,
    pitchfork: pitchfork,
    piv: piv,
    planck: planck,
    planckh: planckh,
    plankv: plankv,
    plus: plus,
    plusacir: plusacir,
    plusb: plusb,
    pluscir: pluscir,
    plusdo: plusdo,
    plusdu: plusdu,
    pluse: pluse,
    PlusMinus: PlusMinus,
    plusmn: plusmn,
    plussim: plussim,
    plustwo: plustwo,
    pm: pm,
    Poincareplane: Poincareplane,
    pointint: pointint,
    Popf: Popf,
    popf: popf,
    pound: pound,
    Pr: Pr,
    pr: pr,
    prap: prap,
    prcue: prcue,
    prE: prE,
    pre: pre,
    prec: prec,
    precapprox: precapprox,
    preccurlyeq: preccurlyeq,
    Precedes: Precedes,
    PrecedesEqual: PrecedesEqual,
    PrecedesSlantEqual: PrecedesSlantEqual,
    PrecedesTilde: PrecedesTilde,
    preceq: preceq,
    precnapprox: precnapprox,
    precneqq: precneqq,
    precnsim: precnsim,
    precsim: precsim,
    Prime: Prime,
    prime: prime,
    primes: primes,
    prnap: prnap,
    prnE: prnE,
    prnsim: prnsim,
    prod: prod,
    Product: Product,
    profalar: profalar,
    profline: profline,
    profsurf: profsurf,
    prop: prop,
    Proportion: Proportion,
    Proportional: Proportional,
    propto: propto,
    prsim: prsim,
    prurel: prurel,
    Pscr: Pscr,
    pscr: pscr,
    Psi: Psi,
    psi: psi,
    puncsp: puncsp,
    Qfr: Qfr,
    qfr: qfr,
    qint: qint,
    Qopf: Qopf,
    qopf: qopf,
    qprime: qprime,
    Qscr: Qscr,
    qscr: qscr,
    quaternions: quaternions,
    quatint: quatint,
    quest: quest,
    questeq: questeq,
    QUOT: QUOT,
    quot: quot,
    rAarr: rAarr,
    race: race,
    Racute: Racute,
    racute: racute,
    radic: radic,
    raemptyv: raemptyv,
    Rang: Rang,
    rang: rang,
    rangd: rangd,
    range: range,
    rangle: rangle,
    raquo: raquo,
    Rarr: Rarr,
    rArr: rArr,
    rarr: rarr,
    rarrap: rarrap,
    rarrb: rarrb,
    rarrbfs: rarrbfs,
    rarrc: rarrc,
    rarrfs: rarrfs,
    rarrhk: rarrhk,
    rarrlp: rarrlp,
    rarrpl: rarrpl,
    rarrsim: rarrsim,
    Rarrtl: Rarrtl,
    rarrtl: rarrtl,
    rarrw: rarrw,
    rAtail: rAtail,
    ratail: ratail,
    ratio: ratio,
    rationals: rationals,
    RBarr: RBarr,
    rBarr: rBarr,
    rbarr: rbarr,
    rbbrk: rbbrk,
    rbrace: rbrace,
    rbrack: rbrack,
    rbrke: rbrke,
    rbrksld: rbrksld,
    rbrkslu: rbrkslu,
    Rcaron: Rcaron,
    rcaron: rcaron,
    Rcedil: Rcedil,
    rcedil: rcedil,
    rceil: rceil,
    rcub: rcub,
    Rcy: Rcy,
    rcy: rcy,
    rdca: rdca,
    rdldhar: rdldhar,
    rdquo: rdquo,
    rdquor: rdquor,
    rdsh: rdsh,
    Re: Re,
    real: real,
    realine: realine,
    realpart: realpart,
    reals: reals,
    rect: rect,
    REG: REG,
    reg: reg,
    ReverseElement: ReverseElement,
    ReverseEquilibrium: ReverseEquilibrium,
    ReverseUpEquilibrium: ReverseUpEquilibrium,
    rfisht: rfisht,
    rfloor: rfloor,
    Rfr: Rfr,
    rfr: rfr,
    rHar: rHar,
    rhard: rhard,
    rharu: rharu,
    rharul: rharul,
    Rho: Rho,
    rho: rho,
    rhov: rhov,
    RightAngleBracket: RightAngleBracket,
    RightArrow: RightArrow,
    Rightarrow: Rightarrow,
    rightarrow: rightarrow,
    RightArrowBar: RightArrowBar,
    RightArrowLeftArrow: RightArrowLeftArrow,
    rightarrowtail: rightarrowtail,
    RightCeiling: RightCeiling,
    RightDoubleBracket: RightDoubleBracket,
    RightDownTeeVector: RightDownTeeVector,
    RightDownVector: RightDownVector,
    RightDownVectorBar: RightDownVectorBar,
    RightFloor: RightFloor,
    rightharpoondown: rightharpoondown,
    rightharpoonup: rightharpoonup,
    rightleftarrows: rightleftarrows,
    rightleftharpoons: rightleftharpoons,
    rightrightarrows: rightrightarrows,
    rightsquigarrow: rightsquigarrow,
    RightTee: RightTee,
    RightTeeArrow: RightTeeArrow,
    RightTeeVector: RightTeeVector,
    rightthreetimes: rightthreetimes,
    RightTriangle: RightTriangle,
    RightTriangleBar: RightTriangleBar,
    RightTriangleEqual: RightTriangleEqual,
    RightUpDownVector: RightUpDownVector,
    RightUpTeeVector: RightUpTeeVector,
    RightUpVector: RightUpVector,
    RightUpVectorBar: RightUpVectorBar,
    RightVector: RightVector,
    RightVectorBar: RightVectorBar,
    ring: ring,
    risingdotseq: risingdotseq,
    rlarr: rlarr,
    rlhar: rlhar,
    rlm: rlm,
    rmoust: rmoust,
    rmoustache: rmoustache,
    rnmid: rnmid,
    roang: roang,
    roarr: roarr,
    robrk: robrk,
    ropar: ropar,
    Ropf: Ropf,
    ropf: ropf,
    roplus: roplus,
    rotimes: rotimes,
    RoundImplies: RoundImplies,
    rpar: rpar,
    rpargt: rpargt,
    rppolint: rppolint,
    rrarr: rrarr,
    Rrightarrow: Rrightarrow,
    rsaquo: rsaquo,
    Rscr: Rscr,
    rscr: rscr,
    Rsh: Rsh,
    rsh: rsh,
    rsqb: rsqb,
    rsquo: rsquo,
    rsquor: rsquor,
    rthree: rthree,
    rtimes: rtimes,
    rtri: rtri,
    rtrie: rtrie,
    rtrif: rtrif,
    rtriltri: rtriltri,
    RuleDelayed: RuleDelayed,
    ruluhar: ruluhar,
    rx: rx,
    Sacute: Sacute,
    sacute: sacute,
    sbquo: sbquo,
    Sc: Sc,
    sc: sc,
    scap: scap,
    Scaron: Scaron,
    scaron: scaron,
    sccue: sccue,
    scE: scE,
    sce: sce,
    Scedil: Scedil,
    scedil: scedil,
    Scirc: Scirc,
    scirc: scirc,
    scnap: scnap,
    scnE: scnE,
    scnsim: scnsim,
    scpolint: scpolint,
    scsim: scsim,
    Scy: Scy,
    scy: scy,
    sdot: sdot,
    sdotb: sdotb,
    sdote: sdote,
    searhk: searhk,
    seArr: seArr,
    searr: searr,
    searrow: searrow,
    sect: sect,
    semi: semi,
    seswar: seswar,
    setminus: setminus,
    setmn: setmn,
    sext: sext,
    Sfr: Sfr,
    sfr: sfr,
    sfrown: sfrown,
    sharp: sharp,
    SHCHcy: SHCHcy,
    shchcy: shchcy,
    SHcy: SHcy,
    shcy: shcy,
    ShortDownArrow: ShortDownArrow,
    ShortLeftArrow: ShortLeftArrow,
    shortmid: shortmid,
    shortparallel: shortparallel,
    ShortRightArrow: ShortRightArrow,
    ShortUpArrow: ShortUpArrow,
    shy: shy,
    Sigma: Sigma,
    sigma: sigma,
    sigmaf: sigmaf,
    sigmav: sigmav,
    sim: sim,
    simdot: simdot,
    sime: sime,
    simeq: simeq,
    simg: simg,
    simgE: simgE,
    siml: siml,
    simlE: simlE,
    simne: simne,
    simplus: simplus,
    simrarr: simrarr,
    slarr: slarr,
    SmallCircle: SmallCircle,
    smallsetminus: smallsetminus,
    smashp: smashp,
    smeparsl: smeparsl,
    smid: smid,
    smile: smile,
    smt: smt,
    smte: smte,
    smtes: smtes,
    SOFTcy: SOFTcy,
    softcy: softcy,
    sol: sol,
    solb: solb,
    solbar: solbar,
    Sopf: Sopf,
    sopf: sopf,
    spades: spades,
    spadesuit: spadesuit,
    spar: spar,
    sqcap: sqcap,
    sqcaps: sqcaps,
    sqcup: sqcup,
    sqcups: sqcups,
    Sqrt: Sqrt,
    sqsub: sqsub,
    sqsube: sqsube,
    sqsubset: sqsubset,
    sqsubseteq: sqsubseteq,
    sqsup: sqsup,
    sqsupe: sqsupe,
    sqsupset: sqsupset,
    sqsupseteq: sqsupseteq,
    squ: squ,
    Square: Square,
    square: square,
    SquareIntersection: SquareIntersection,
    SquareSubset: SquareSubset,
    SquareSubsetEqual: SquareSubsetEqual,
    SquareSuperset: SquareSuperset,
    SquareSupersetEqual: SquareSupersetEqual,
    SquareUnion: SquareUnion,
    squarf: squarf,
    squf: squf,
    srarr: srarr,
    Sscr: Sscr,
    sscr: sscr,
    ssetmn: ssetmn,
    ssmile: ssmile,
    sstarf: sstarf,
    Star: Star,
    star: star,
    starf: starf,
    straightepsilon: straightepsilon,
    straightphi: straightphi,
    strns: strns,
    Sub: Sub,
    sub: sub,
    subdot: subdot,
    subE: subE,
    sube: sube,
    subedot: subedot,
    submult: submult,
    subnE: subnE,
    subne: subne,
    subplus: subplus,
    subrarr: subrarr,
    Subset: Subset,
    subset: subset,
    subseteq: subseteq,
    subseteqq: subseteqq,
    SubsetEqual: SubsetEqual,
    subsetneq: subsetneq,
    subsetneqq: subsetneqq,
    subsim: subsim,
    subsub: subsub,
    subsup: subsup,
    succ: succ,
    succapprox: succapprox,
    succcurlyeq: succcurlyeq,
    Succeeds: Succeeds,
    SucceedsEqual: SucceedsEqual,
    SucceedsSlantEqual: SucceedsSlantEqual,
    SucceedsTilde: SucceedsTilde,
    succeq: succeq,
    succnapprox: succnapprox,
    succneqq: succneqq,
    succnsim: succnsim,
    succsim: succsim,
    SuchThat: SuchThat,
    Sum: Sum,
    sum: sum,
    sung: sung,
    Sup: Sup,
    sup: sup,
    sup1: sup1,
    sup2: sup2,
    sup3: sup3,
    supdot: supdot,
    supdsub: supdsub,
    supE: supE,
    supe: supe,
    supedot: supedot,
    Superset: Superset,
    SupersetEqual: SupersetEqual,
    suphsol: suphsol,
    suphsub: suphsub,
    suplarr: suplarr,
    supmult: supmult,
    supnE: supnE,
    supne: supne,
    supplus: supplus,
    Supset: Supset,
    supset: supset,
    supseteq: supseteq,
    supseteqq: supseteqq,
    supsetneq: supsetneq,
    supsetneqq: supsetneqq,
    supsim: supsim,
    supsub: supsub,
    supsup: supsup,
    swarhk: swarhk,
    swArr: swArr,
    swarr: swarr,
    swarrow: swarrow,
    swnwar: swnwar,
    szlig: szlig,
    Tab: Tab,
    target: target,
    Tau: Tau,
    tau: tau,
    tbrk: tbrk,
    Tcaron: Tcaron,
    tcaron: tcaron,
    Tcedil: Tcedil,
    tcedil: tcedil,
    Tcy: Tcy,
    tcy: tcy,
    tdot: tdot,
    telrec: telrec,
    Tfr: Tfr,
    tfr: tfr,
    there4: there4,
    Therefore: Therefore,
    therefore: therefore,
    Theta: Theta,
    theta: theta,
    thetasym: thetasym,
    thetav: thetav,
    thickapprox: thickapprox,
    thicksim: thicksim,
    ThickSpace: ThickSpace,
    thinsp: thinsp,
    ThinSpace: ThinSpace,
    thkap: thkap,
    thksim: thksim,
    THORN: THORN,
    thorn: thorn,
    Tilde: Tilde,
    tilde: tilde,
    TildeEqual: TildeEqual,
    TildeFullEqual: TildeFullEqual,
    TildeTilde: TildeTilde,
    times: times,
    timesb: timesb,
    timesbar: timesbar,
    timesd: timesd,
    tint: tint,
    toea: toea,
    top: top,
    topbot: topbot,
    topcir: topcir,
    Topf: Topf,
    topf: topf,
    topfork: topfork,
    tosa: tosa,
    tprime: tprime,
    TRADE: TRADE,
    trade: trade,
    triangle: triangle,
    triangledown: triangledown,
    triangleleft: triangleleft,
    trianglelefteq: trianglelefteq,
    triangleq: triangleq,
    triangleright: triangleright,
    trianglerighteq: trianglerighteq,
    tridot: tridot,
    trie: trie,
    triminus: triminus,
    TripleDot: TripleDot,
    triplus: triplus,
    trisb: trisb,
    tritime: tritime,
    trpezium: trpezium,
    Tscr: Tscr,
    tscr: tscr,
    TScy: TScy,
    tscy: tscy,
    TSHcy: TSHcy,
    tshcy: tshcy,
    Tstrok: Tstrok,
    tstrok: tstrok,
    twixt: twixt,
    twoheadleftarrow: twoheadleftarrow,
    twoheadrightarrow: twoheadrightarrow,
    Uacute: Uacute,
    uacute: uacute,
    Uarr: Uarr,
    uArr: uArr,
    uarr: uarr,
    Uarrocir: Uarrocir,
    Ubrcy: Ubrcy,
    ubrcy: ubrcy,
    Ubreve: Ubreve,
    ubreve: ubreve,
    Ucirc: Ucirc,
    ucirc: ucirc,
    Ucy: Ucy,
    ucy: ucy,
    udarr: udarr,
    Udblac: Udblac,
    udblac: udblac,
    udhar: udhar,
    ufisht: ufisht,
    Ufr: Ufr,
    ufr: ufr,
    Ugrave: Ugrave,
    ugrave: ugrave,
    uHar: uHar,
    uharl: uharl,
    uharr: uharr,
    uhblk: uhblk,
    ulcorn: ulcorn,
    ulcorner: ulcorner,
    ulcrop: ulcrop,
    ultri: ultri,
    Umacr: Umacr,
    umacr: umacr,
    uml: uml,
    UnderBar: UnderBar,
    UnderBrace: UnderBrace,
    UnderBracket: UnderBracket,
    UnderParenthesis: UnderParenthesis,
    Union: Union,
    UnionPlus: UnionPlus,
    Uogon: Uogon,
    uogon: uogon,
    Uopf: Uopf,
    uopf: uopf,
    UpArrow: UpArrow,
    Uparrow: Uparrow,
    uparrow: uparrow,
    UpArrowBar: UpArrowBar,
    UpArrowDownArrow: UpArrowDownArrow,
    UpDownArrow: UpDownArrow,
    Updownarrow: Updownarrow,
    updownarrow: updownarrow,
    UpEquilibrium: UpEquilibrium,
    upharpoonleft: upharpoonleft,
    upharpoonright: upharpoonright,
    uplus: uplus,
    UpperLeftArrow: UpperLeftArrow,
    UpperRightArrow: UpperRightArrow,
    Upsi: Upsi,
    upsi: upsi,
    upsih: upsih,
    Upsilon: Upsilon,
    upsilon: upsilon,
    UpTee: UpTee,
    UpTeeArrow: UpTeeArrow,
    upuparrows: upuparrows,
    urcorn: urcorn,
    urcorner: urcorner,
    urcrop: urcrop,
    Uring: Uring,
    uring: uring,
    urtri: urtri,
    Uscr: Uscr,
    uscr: uscr,
    utdot: utdot,
    Utilde: Utilde,
    utilde: utilde,
    utri: utri,
    utrif: utrif,
    uuarr: uuarr,
    Uuml: Uuml,
    uuml: uuml,
    uwangle: uwangle,
    vangrt: vangrt,
    varepsilon: varepsilon,
    varkappa: varkappa,
    varnothing: varnothing,
    varphi: varphi,
    varpi: varpi,
    varpropto: varpropto,
    vArr: vArr,
    varr: varr,
    varrho: varrho,
    varsigma: varsigma,
    varsubsetneq: varsubsetneq,
    varsubsetneqq: varsubsetneqq,
    varsupsetneq: varsupsetneq,
    varsupsetneqq: varsupsetneqq,
    vartheta: vartheta,
    vartriangleleft: vartriangleleft,
    vartriangleright: vartriangleright,
    Vbar: Vbar,
    vBar: vBar,
    vBarv: vBarv,
    Vcy: Vcy,
    vcy: vcy,
    VDash: VDash,
    Vdash: Vdash,
    vDash: vDash,
    vdash: vdash,
    Vdashl: Vdashl,
    Vee: Vee,
    vee: vee,
    veebar: veebar,
    veeeq: veeeq,
    vellip: vellip,
    Verbar: Verbar,
    verbar: verbar,
    Vert: Vert,
    vert: vert,
    VerticalBar: VerticalBar,
    VerticalLine: VerticalLine,
    VerticalSeparator: VerticalSeparator,
    VerticalTilde: VerticalTilde,
    VeryThinSpace: VeryThinSpace,
    Vfr: Vfr,
    vfr: vfr,
    vltri: vltri,
    vnsub: vnsub,
    vnsup: vnsup,
    Vopf: Vopf,
    vopf: vopf,
    vprop: vprop,
    vrtri: vrtri,
    Vscr: Vscr,
    vscr: vscr,
    vsubnE: vsubnE,
    vsubne: vsubne,
    vsupnE: vsupnE,
    vsupne: vsupne,
    Vvdash: Vvdash,
    vzigzag: vzigzag,
    Wcirc: Wcirc,
    wcirc: wcirc,
    wedbar: wedbar,
    Wedge: Wedge,
    wedge: wedge,
    wedgeq: wedgeq,
    weierp: weierp,
    Wfr: Wfr,
    wfr: wfr,
    Wopf: Wopf,
    wopf: wopf,
    wp: wp,
    wr: wr,
    wreath: wreath,
    Wscr: Wscr,
    wscr: wscr,
    xcap: xcap,
    xcirc: xcirc,
    xcup: xcup,
    xdtri: xdtri,
    Xfr: Xfr,
    xfr: xfr,
    xhArr: xhArr,
    xharr: xharr,
    Xi: Xi,
    xi: xi,
    xlArr: xlArr,
    xlarr: xlarr,
    xmap: xmap,
    xnis: xnis,
    xodot: xodot,
    Xopf: Xopf,
    xopf: xopf,
    xoplus: xoplus,
    xotime: xotime,
    xrArr: xrArr,
    xrarr: xrarr,
    Xscr: Xscr,
    xscr: xscr,
    xsqcup: xsqcup,
    xuplus: xuplus,
    xutri: xutri,
    xvee: xvee,
    xwedge: xwedge,
    Yacute: Yacute,
    yacute: yacute,
    YAcy: YAcy,
    yacy: yacy,
    Ycirc: Ycirc,
    ycirc: ycirc,
    Ycy: Ycy,
    ycy: ycy,
    yen: yen,
    Yfr: Yfr,
    yfr: yfr,
    YIcy: YIcy,
    yicy: yicy,
    Yopf: Yopf,
    yopf: yopf,
    Yscr: Yscr,
    yscr: yscr,
    YUcy: YUcy,
    yucy: yucy,
    Yuml: Yuml,
    yuml: yuml,
    Zacute: Zacute,
    zacute: zacute,
    Zcaron: Zcaron,
    zcaron: zcaron,
    Zcy: Zcy,
    zcy: zcy,
    Zdot: Zdot,
    zdot: zdot,
    zeetrf: zeetrf,
    ZeroWidthSpace: ZeroWidthSpace,
    Zeta: Zeta,
    zeta: zeta,
    Zfr: Zfr,
    zfr: zfr,
    ZHcy: ZHcy,
    zhcy: zhcy,
    zigrarr: zigrarr,
    Zopf: Zopf,
    zopf: zopf,
    Zscr: Zscr,
    zscr: zscr,
    zwj: zwj,
    zwnj: zwnj
  };
  var ound = "pound";
  var pond = "pound";
  var poubd = "pound";
  var poud = "pound";
  var poumd = "pound";
  var poun = "pound";
  var pund = "pound";
  var zvbj = "zwnj";
  var zvhj = "zwnj";
  var zvjb = "zwnj";
  var zvjh = "zwnj";
  var zvjm = "zwnj";
  var zvjn = "zwnj";
  var zvmj = "zwnj";
  var zvng = "zwnj";
  var zvnh = "zwnj";
  var zvnj = "zwnj";
  var zvnk = "zwnj";
  var zvnm = "zwnj";
  var zwbj = "zwnj";
  var zwhj = "zwnj";
  var zwjb = "zwnj";
  var zwjh = "zwnj";
  var zwjm = "zwnj";
  var zwjn = "zwnj";
  var zwmj = "zwnj";
  var zwng = "zwnj";
  var zwnh = "zwnj";
  var zwnk = "zwnj";
  var zwnm = "zwnj";
  var brokenNamedEntities = {
    ound: ound,
    pond: pond,
    poubd: poubd,
    poud: poud,
    poumd: poumd,
    poun: poun,
    pund: pund,
    zvbj: zvbj,
    zvhj: zvhj,
    zvjb: zvjb,
    zvjh: zvjh,
    zvjm: zvjm,
    zvjn: zvjn,
    zvmj: zvmj,
    zvng: zvng,
    zvnh: zvnh,
    zvnj: zvnj,
    zvnk: zvnk,
    zvnm: zvnm,
    zwbj: zwbj,
    zwhj: zwhj,
    zwjb: zwjb,
    zwjh: zwjh,
    zwjm: zwjm,
    zwjn: zwjn,
    zwmj: zwmj,
    zwng: zwng,
    zwnh: zwnh,
    zwnk: zwnk,
    zwnm: zwnm
  };
  var A = {
    a: ["Aacute"],
    b: ["Abreve"],
    c: ["Acirc", "Acy"],
    E: ["AElig"],
    f: ["Afr"],
    g: ["Agrave"],
    l: ["Alpha"],
    m: ["Amacr"],
    M: ["AMP"],
    n: ["And"],
    o: ["Aogon", "Aopf"],
    p: ["ApplyFunction"],
    r: ["Aring"],
    s: ["Ascr", "Assign"],
    t: ["Atilde"],
    u: ["Auml"]
  };
  var a = {
    a: ["aacute"],
    b: ["abreve"],
    c: ["ac", "acd", "acE", "acirc", "acute", "acy"],
    e: ["aelig"],
    f: ["af", "afr"],
    g: ["agrave"],
    l: ["alefsym", "aleph", "alpha"],
    m: ["amacr", "amalg", "amp"],
    n: ["and", "andand", "andd", "andslope", "andv", "ang", "ange", "angle", "angmsd", "angmsdaa", "angmsdab", "angmsdac", "angmsdad", "angmsdae", "angmsdaf", "angmsdag", "angmsdah", "angrt", "angrtvb", "angrtvbd", "angsph", "angst", "angzarr"],
    o: ["aogon", "aopf"],
    p: ["ap", "apacir", "apE", "ape", "apid", "apos", "approx", "approxeq"],
    r: ["aring"],
    s: ["ascr", "ast", "asymp", "asympeq"],
    t: ["atilde"],
    u: ["auml"],
    w: ["awconint", "awint"]
  };
  var b = {
    a: ["backcong", "backepsilon", "backprime", "backsim", "backsimeq", "barvee", "barwed", "barwedge"],
    b: ["bbrk", "bbrktbrk"],
    c: ["bcong", "bcy"],
    d: ["bdquo"],
    e: ["becaus", "because", "bemptyv", "bepsi", "bernou", "beta", "beth", "between"],
    f: ["bfr"],
    i: ["bigcap", "bigcirc", "bigcup", "bigodot", "bigoplus", "bigotimes", "bigsqcup", "bigstar", "bigtriangledown", "bigtriangleup", "biguplus", "bigvee", "bigwedge"],
    k: ["bkarow"],
    l: ["blacklozenge", "blacksquare", "blacktriangle", "blacktriangledown", "blacktriangleleft", "blacktriangleright", "blank", "blk12", "blk14", "blk34", "block"],
    n: ["bne", "bnequiv", "bnot"],
    N: ["bNot"],
    o: ["bopf", "bot", "bottom", "bowtie", "boxbox", "boxDL", "boxDl", "boxdL", "boxdl", "boxDR", "boxDr", "boxdR", "boxdr", "boxH", "boxh", "boxHD", "boxHd", "boxhD", "boxhd", "boxHU", "boxHu", "boxhU", "boxhu", "boxminus", "boxplus", "boxtimes", "boxUL", "boxUl", "boxuL", "boxul", "boxUR", "boxUr", "boxuR", "boxur", "boxV", "boxv", "boxVH", "boxVh", "boxvH", "boxvh", "boxVL", "boxVl", "boxvL", "boxvl", "boxVR", "boxVr", "boxvR", "boxvr"],
    p: ["bprime"],
    r: ["breve", "brvbar"],
    s: ["bscr", "bsemi", "bsim", "bsime", "bsol", "bsolb", "bsolhsub"],
    u: ["bull", "bullet", "bump", "bumpE", "bumpe", "bumpeq"]
  };
  var B = {
    a: ["Backslash", "Barv", "Barwed"],
    c: ["Bcy"],
    e: ["Because", "Bernoullis", "Beta"],
    f: ["Bfr"],
    o: ["Bopf"],
    r: ["Breve"],
    s: ["Bscr"],
    u: ["Bumpeq"]
  };
  var C = {
    a: ["Cacute", "Cap", "CapitalDifferentialD", "Cayleys"],
    c: ["Ccaron", "Ccedil", "Ccirc", "Cconint"],
    d: ["Cdot"],
    e: ["Cedilla", "CenterDot"],
    f: ["Cfr"],
    H: ["CHcy"],
    h: ["Chi"],
    i: ["CircleDot", "CircleMinus", "CirclePlus", "CircleTimes"],
    l: ["ClockwiseContourIntegral", "CloseCurlyDoubleQuote", "CloseCurlyQuote"],
    o: ["Colon", "Colone", "Congruent", "Conint", "ContourIntegral", "Copf", "Coproduct", "CounterClockwiseContourIntegral"],
    O: ["COPY"],
    r: ["Cross"],
    s: ["Cscr"],
    u: ["Cup", "CupCap"]
  };
  var c = {
    a: ["cacute", "cap", "capand", "capbrcup", "capcap", "capcup", "capdot", "caps", "caret", "caron"],
    c: ["ccaps", "ccaron", "ccedil", "ccirc", "ccups", "ccupssm"],
    d: ["cdot"],
    e: ["cedil", "cemptyv", "cent", "centerdot"],
    f: ["cfr"],
    h: ["chcy", "check", "checkmark", "chi"],
    i: ["cir", "circ", "circeq", "circlearrowleft", "circlearrowright", "circledast", "circledcirc", "circleddash", "circledR", "circledS", "cirE", "cire", "cirfnint", "cirmid", "cirscir"],
    l: ["clubs", "clubsuit"],
    o: ["colon", "colone", "coloneq", "comma", "commat", "comp", "compfn", "complement", "complexes", "cong", "congdot", "conint", "copf", "coprod", "copy", "copysr"],
    r: ["crarr", "cross"],
    s: ["cscr", "csub", "csube", "csup", "csupe"],
    t: ["ctdot"],
    u: ["cudarrl", "cudarrr", "cuepr", "cuesc", "cularr", "cularrp", "cup", "cupbrcap", "cupcap", "cupcup", "cupdot", "cupor", "cups", "curarr", "curarrm", "curlyeqprec", "curlyeqsucc", "curlyvee", "curlywedge", "curren", "curvearrowleft", "curvearrowright", "cuvee", "cuwed"],
    w: ["cwconint", "cwint"],
    y: ["cylcty"]
  };
  var D = {
    a: ["Dagger", "Darr", "Dashv"],
    c: ["Dcaron", "Dcy"],
    D: ["DD", "DDotrahd"],
    e: ["Del", "Delta"],
    f: ["Dfr"],
    i: ["DiacriticalAcute", "DiacriticalDot", "DiacriticalDoubleAcute", "DiacriticalGrave", "DiacriticalTilde", "Diamond", "DifferentialD"],
    J: ["DJcy"],
    o: ["Dopf", "Dot", "DotDot", "DotEqual", "DoubleContourIntegral", "DoubleDot", "DoubleDownArrow", "DoubleLeftArrow", "DoubleLeftRightArrow", "DoubleLeftTee", "DoubleLongLeftArrow", "DoubleLongLeftRightArrow", "DoubleLongRightArrow", "DoubleRightArrow", "DoubleRightTee", "DoubleUpArrow", "DoubleUpDownArrow", "DoubleVerticalBar", "DownArrow", "Downarrow", "DownArrowBar", "DownArrowUpArrow", "DownBreve", "DownLeftRightVector", "DownLeftTeeVector", "DownLeftVector", "DownLeftVectorBar", "DownRightTeeVector", "DownRightVector", "DownRightVectorBar", "DownTee", "DownTeeArrow"],
    s: ["Dscr", "Dstrok"],
    S: ["DScy"],
    Z: ["DZcy"]
  };
  var d = {
    a: ["dagger", "daleth", "darr", "dash", "dashv"],
    A: ["dArr"],
    b: ["dbkarow", "dblac"],
    c: ["dcaron", "dcy"],
    d: ["dd", "ddagger", "ddarr", "ddotseq"],
    e: ["deg", "delta", "demptyv"],
    f: ["dfisht", "dfr"],
    H: ["dHar"],
    h: ["dharl", "dharr"],
    i: ["diam", "diamond", "diamondsuit", "diams", "die", "digamma", "disin", "div", "divide", "divideontimes", "divonx"],
    j: ["djcy"],
    l: ["dlcorn", "dlcrop"],
    o: ["dollar", "dopf", "dot", "doteq", "doteqdot", "dotminus", "dotplus", "dotsquare", "doublebarwedge", "downarrow", "downdownarrows", "downharpoonleft", "downharpoonright"],
    r: ["drbkarow", "drcorn", "drcrop"],
    s: ["dscr", "dscy", "dsol", "dstrok"],
    t: ["dtdot", "dtri", "dtrif"],
    u: ["duarr", "duhar"],
    w: ["dwangle"],
    z: ["dzcy", "dzigrarr"]
  };
  var E = {
    a: ["Eacute"],
    c: ["Ecaron", "Ecirc", "Ecy"],
    d: ["Edot"],
    f: ["Efr"],
    g: ["Egrave"],
    l: ["Element"],
    m: ["Emacr", "EmptySmallSquare", "EmptyVerySmallSquare"],
    N: ["ENG"],
    o: ["Eogon", "Eopf"],
    p: ["Epsilon"],
    q: ["Equal", "EqualTilde", "Equilibrium"],
    s: ["Escr", "Esim"],
    t: ["Eta"],
    T: ["ETH"],
    u: ["Euml"],
    x: ["Exists", "ExponentialE"]
  };
  var e = {
    a: ["eacute", "easter"],
    c: ["ecaron", "ecir", "ecirc", "ecolon", "ecy"],
    D: ["eDDot", "eDot"],
    d: ["edot"],
    e: ["ee"],
    f: ["efDot", "efr"],
    g: ["eg", "egrave", "egs", "egsdot"],
    l: ["el", "elinters", "ell", "els", "elsdot"],
    m: ["emacr", "empty", "emptyset", "emptyv", "emsp", "emsp13", "emsp14"],
    n: ["eng", "ensp"],
    o: ["eogon", "eopf"],
    p: ["epar", "eparsl", "eplus", "epsi", "epsilon", "epsiv"],
    q: ["eqcirc", "eqcolon", "eqsim", "eqslantgtr", "eqslantless", "equals", "equest", "equiv", "equivDD", "eqvparsl"],
    r: ["erarr", "erDot"],
    s: ["escr", "esdot", "esim"],
    t: ["eta", "eth"],
    u: ["euml", "euro"],
    x: ["excl", "exist", "expectation", "exponentiale"]
  };
  var f = {
    a: ["fallingdotseq"],
    c: ["fcy"],
    e: ["female"],
    f: ["ffilig", "fflig", "ffllig", "ffr"],
    i: ["filig"],
    j: ["fjlig"],
    l: ["flat", "fllig", "fltns"],
    n: ["fnof"],
    o: ["fopf", "forall", "fork", "forkv"],
    p: ["fpartint"],
    r: ["frac12", "frac13", "frac14", "frac15", "frac16", "frac18", "frac23", "frac25", "frac34", "frac35", "frac38", "frac45", "frac56", "frac58", "frac78", "frasl", "frown"],
    s: ["fscr"]
  };
  var F = {
    c: ["Fcy"],
    f: ["Ffr"],
    i: ["FilledSmallSquare", "FilledVerySmallSquare"],
    o: ["Fopf", "ForAll", "Fouriertrf"],
    s: ["Fscr"]
  };
  var g = {
    a: ["gacute", "gamma", "gammad", "gap"],
    b: ["gbreve"],
    c: ["gcirc", "gcy"],
    d: ["gdot"],
    E: ["gE", "gEl"],
    e: ["ge", "gel", "geq", "geqq", "geqslant", "ges", "gescc", "gesdot", "gesdoto", "gesdotol", "gesl", "gesles"],
    f: ["gfr"],
    g: ["gg", "ggg"],
    i: ["gimel"],
    j: ["gjcy"],
    l: ["gl", "gla", "glE", "glj"],
    n: ["gnap", "gnapprox", "gnE", "gne", "gneq", "gneqq", "gnsim"],
    o: ["gopf"],
    r: ["grave"],
    s: ["gscr", "gsim", "gsime", "gsiml"],
    t: ["gt", "gtcc", "gtcir", "gtdot", "gtlPar", "gtquest", "gtrapprox", "gtrarr", "gtrdot", "gtreqless", "gtreqqless", "gtrless", "gtrsim"],
    v: ["gvertneqq", "gvnE"]
  };
  var G = {
    a: ["Gamma", "Gammad"],
    b: ["Gbreve"],
    c: ["Gcedil", "Gcirc", "Gcy"],
    d: ["Gdot"],
    f: ["Gfr"],
    g: ["Gg"],
    J: ["GJcy"],
    o: ["Gopf"],
    r: ["GreaterEqual", "GreaterEqualLess", "GreaterFullEqual", "GreaterGreater", "GreaterLess", "GreaterSlantEqual", "GreaterTilde"],
    s: ["Gscr"],
    T: ["GT"],
    t: ["Gt"]
  };
  var H = {
    a: ["Hacek", "Hat"],
    A: ["HARDcy"],
    c: ["Hcirc"],
    f: ["Hfr"],
    i: ["HilbertSpace"],
    o: ["Hopf", "HorizontalLine"],
    s: ["Hscr", "Hstrok"],
    u: ["HumpDownHump", "HumpEqual"]
  };
  var h = {
    a: ["hairsp", "half", "hamilt", "hardcy", "harr", "harrcir", "harrw"],
    A: ["hArr"],
    b: ["hbar"],
    c: ["hcirc"],
    e: ["hearts", "heartsuit", "hellip", "hercon"],
    f: ["hfr"],
    k: ["hksearow", "hkswarow"],
    o: ["hoarr", "homtht", "hookleftarrow", "hookrightarrow", "hopf", "horbar"],
    s: ["hscr", "hslash", "hstrok"],
    y: ["hybull", "hyphen"]
  };
  var I = {
    a: ["Iacute"],
    c: ["Icirc", "Icy"],
    d: ["Idot"],
    E: ["IEcy"],
    f: ["Ifr"],
    g: ["Igrave"],
    J: ["IJlig"],
    m: ["Im", "Imacr", "ImaginaryI", "Implies"],
    n: ["Int", "Integral", "Intersection", "InvisibleComma", "InvisibleTimes"],
    O: ["IOcy"],
    o: ["Iogon", "Iopf", "Iota"],
    s: ["Iscr"],
    t: ["Itilde"],
    u: ["Iukcy", "Iuml"]
  };
  var i = {
    a: ["iacute"],
    c: ["ic", "icirc", "icy"],
    e: ["iecy", "iexcl"],
    f: ["iff", "ifr"],
    g: ["igrave"],
    i: ["ii", "iiiint", "iiint", "iinfin", "iiota"],
    j: ["ijlig"],
    m: ["imacr", "image", "imagline", "imagpart", "imath", "imof", "imped"],
    n: ["in", "incare", "infin", "infintie", "inodot", "int", "intcal", "integers", "intercal", "intlarhk", "intprod"],
    o: ["iocy", "iogon", "iopf", "iota"],
    p: ["iprod"],
    q: ["iquest"],
    s: ["iscr", "isin", "isindot", "isinE", "isins", "isinsv", "isinv"],
    t: ["it", "itilde"],
    u: ["iukcy", "iuml"]
  };
  var J = {
    c: ["Jcirc", "Jcy"],
    f: ["Jfr"],
    o: ["Jopf"],
    s: ["Jscr", "Jsercy"],
    u: ["Jukcy"]
  };
  var j = {
    c: ["jcirc", "jcy"],
    f: ["jfr"],
    m: ["jmath"],
    o: ["jopf"],
    s: ["jscr", "jsercy"],
    u: ["jukcy"]
  };
  var K = {
    a: ["Kappa"],
    c: ["Kcedil", "Kcy"],
    f: ["Kfr"],
    H: ["KHcy"],
    J: ["KJcy"],
    o: ["Kopf"],
    s: ["Kscr"]
  };
  var k = {
    a: ["kappa", "kappav"],
    c: ["kcedil", "kcy"],
    f: ["kfr"],
    g: ["kgreen"],
    h: ["khcy"],
    j: ["kjcy"],
    o: ["kopf"],
    s: ["kscr"]
  };
  var l = {
    A: ["lAarr", "lArr", "lAtail"],
    a: ["lacute", "laemptyv", "lagran", "lambda", "lang", "langd", "langle", "lap", "laquo", "larr", "larrb", "larrbfs", "larrfs", "larrhk", "larrlp", "larrpl", "larrsim", "larrtl", "lat", "latail", "late", "lates"],
    B: ["lBarr"],
    b: ["lbarr", "lbbrk", "lbrace", "lbrack", "lbrke", "lbrksld", "lbrkslu"],
    c: ["lcaron", "lcedil", "lceil", "lcub", "lcy"],
    d: ["ldca", "ldquo", "ldquor", "ldrdhar", "ldrushar", "ldsh"],
    E: ["lE", "lEg"],
    e: ["le", "leftarrow", "leftarrowtail", "leftharpoondown", "leftharpoonup", "leftleftarrows", "leftrightarrow", "leftrightarrows", "leftrightharpoons", "leftrightsquigarrow", "leftthreetimes", "leg", "leq", "leqq", "leqslant", "les", "lescc", "lesdot", "lesdoto", "lesdotor", "lesg", "lesges", "lessapprox", "lessdot", "lesseqgtr", "lesseqqgtr", "lessgtr", "lesssim"],
    f: ["lfisht", "lfloor", "lfr"],
    g: ["lg", "lgE"],
    H: ["lHar"],
    h: ["lhard", "lharu", "lharul", "lhblk"],
    j: ["ljcy"],
    l: ["ll", "llarr", "llcorner", "llhard", "lltri"],
    m: ["lmidot", "lmoust", "lmoustache"],
    n: ["lnap", "lnapprox", "lnE", "lne", "lneq", "lneqq", "lnsim"],
    o: ["loang", "loarr", "lobrk", "longleftarrow", "longleftrightarrow", "longmapsto", "longrightarrow", "looparrowleft", "looparrowright", "lopar", "lopf", "loplus", "lotimes", "lowast", "lowbar", "loz", "lozenge", "lozf"],
    p: ["lpar", "lparlt"],
    r: ["lrarr", "lrcorner", "lrhar", "lrhard", "lrm", "lrtri"],
    s: ["lsaquo", "lscr", "lsh", "lsim", "lsime", "lsimg", "lsqb", "lsquo", "lsquor", "lstrok"],
    t: ["lt", "ltcc", "ltcir", "ltdot", "lthree", "ltimes", "ltlarr", "ltquest", "ltri", "ltrie", "ltrif", "ltrPar"],
    u: ["lurdshar", "luruhar"],
    v: ["lvertneqq", "lvnE"]
  };
  var L = {
    a: ["Lacute", "Lambda", "Lang", "Laplacetrf", "Larr"],
    c: ["Lcaron", "Lcedil", "Lcy"],
    e: ["LeftAngleBracket", "LeftArrow", "Leftarrow", "LeftArrowBar", "LeftArrowRightArrow", "LeftCeiling", "LeftDoubleBracket", "LeftDownTeeVector", "LeftDownVector", "LeftDownVectorBar", "LeftFloor", "LeftRightArrow", "Leftrightarrow", "LeftRightVector", "LeftTee", "LeftTeeArrow", "LeftTeeVector", "LeftTriangle", "LeftTriangleBar", "LeftTriangleEqual", "LeftUpDownVector", "LeftUpTeeVector", "LeftUpVector", "LeftUpVectorBar", "LeftVector", "LeftVectorBar", "LessEqualGreater", "LessFullEqual", "LessGreater", "LessLess", "LessSlantEqual", "LessTilde"],
    f: ["Lfr"],
    J: ["LJcy"],
    l: ["Ll", "Lleftarrow"],
    m: ["Lmidot"],
    o: ["LongLeftArrow", "Longleftarrow", "LongLeftRightArrow", "Longleftrightarrow", "LongRightArrow", "Longrightarrow", "Lopf", "LowerLeftArrow", "LowerRightArrow"],
    s: ["Lscr", "Lsh", "Lstrok"],
    T: ["LT"],
    t: ["Lt"]
  };
  var m = {
    a: ["macr", "male", "malt", "maltese", "map", "mapsto", "mapstodown", "mapstoleft", "mapstoup", "marker"],
    c: ["mcomma", "mcy"],
    d: ["mdash"],
    D: ["mDDot"],
    e: ["measuredangle"],
    f: ["mfr"],
    h: ["mho"],
    i: ["micro", "mid", "midast", "midcir", "middot", "minus", "minusb", "minusd", "minusdu"],
    l: ["mlcp", "mldr"],
    n: ["mnplus"],
    o: ["models", "mopf"],
    p: ["mp"],
    s: ["mscr", "mstpos"],
    u: ["mu", "multimap", "mumap"]
  };
  var M = {
    a: ["Map"],
    c: ["Mcy"],
    e: ["MediumSpace", "Mellintrf"],
    f: ["Mfr"],
    i: ["MinusPlus"],
    o: ["Mopf"],
    s: ["Mscr"],
    u: ["Mu"]
  };
  var n = {
    a: ["nabla", "nacute", "nang", "nap", "napE", "napid", "napos", "napprox", "natur", "natural", "naturals"],
    b: ["nbsp", "nbump", "nbumpe"],
    c: ["ncap", "ncaron", "ncedil", "ncong", "ncongdot", "ncup", "ncy"],
    d: ["ndash"],
    e: ["ne", "nearhk", "neArr", "nearr", "nearrow", "nedot", "nequiv", "nesear", "nesim", "nexist", "nexists"],
    f: ["nfr"],
    g: ["ngE", "nge", "ngeq", "ngeqq", "ngeqslant", "nges", "ngsim", "ngt", "ngtr"],
    G: ["nGg", "nGt", "nGtv"],
    h: ["nhArr", "nharr", "nhpar"],
    i: ["ni", "nis", "nisd", "niv"],
    j: ["njcy"],
    l: ["nlArr", "nlarr", "nldr", "nlE", "nle", "nleftarrow", "nleftrightarrow", "nleq", "nleqq", "nleqslant", "nles", "nless", "nlsim", "nlt", "nltri", "nltrie"],
    L: ["nLeftarrow", "nLeftrightarrow", "nLl", "nLt", "nLtv"],
    m: ["nmid"],
    o: ["nopf", "not", "notin", "notindot", "notinE", "notinva", "notinvb", "notinvc", "notni", "notniva", "notnivb", "notnivc"],
    p: ["npar", "nparallel", "nparsl", "npart", "npolint", "npr", "nprcue", "npre", "nprec", "npreceq"],
    r: ["nrArr", "nrarr", "nrarrc", "nrarrw", "nrightarrow", "nrtri", "nrtrie"],
    R: ["nRightarrow"],
    s: ["nsc", "nsccue", "nsce", "nscr", "nshortmid", "nshortparallel", "nsim", "nsime", "nsimeq", "nsmid", "nspar", "nsqsube", "nsqsupe", "nsub", "nsubE", "nsube", "nsubset", "nsubseteq", "nsubseteqq", "nsucc", "nsucceq", "nsup", "nsupE", "nsupe", "nsupset", "nsupseteq", "nsupseteqq"],
    t: ["ntgl", "ntilde", "ntlg", "ntriangleleft", "ntrianglelefteq", "ntriangleright", "ntrianglerighteq"],
    u: ["nu", "num", "numero", "numsp"],
    v: ["nvap", "nvDash", "nvdash", "nvge", "nvgt", "nvHarr", "nvinfin", "nvlArr", "nvle", "nvlt", "nvltrie", "nvrArr", "nvrtrie", "nvsim"],
    V: ["nVDash", "nVdash"],
    w: ["nwarhk", "nwArr", "nwarr", "nwarrow", "nwnear"]
  };
  var N = {
    a: ["Nacute"],
    c: ["Ncaron", "Ncedil", "Ncy"],
    e: ["NegativeMediumSpace", "NegativeThickSpace", "NegativeThinSpace", "NegativeVeryThinSpace", "NestedGreaterGreater", "NestedLessLess", "NewLine"],
    f: ["Nfr"],
    J: ["NJcy"],
    o: ["NoBreak", "NonBreakingSpace", "Nopf", "Not", "NotCongruent", "NotCupCap", "NotDoubleVerticalBar", "NotElement", "NotEqual", "NotEqualTilde", "NotExists", "NotGreater", "NotGreaterEqual", "NotGreaterFullEqual", "NotGreaterGreater", "NotGreaterLess", "NotGreaterSlantEqual", "NotGreaterTilde", "NotHumpDownHump", "NotHumpEqual", "NotLeftTriangle", "NotLeftTriangleBar", "NotLeftTriangleEqual", "NotLess", "NotLessEqual", "NotLessGreater", "NotLessLess", "NotLessSlantEqual", "NotLessTilde", "NotNestedGreaterGreater", "NotNestedLessLess", "NotPrecedes", "NotPrecedesEqual", "NotPrecedesSlantEqual", "NotReverseElement", "NotRightTriangle", "NotRightTriangleBar", "NotRightTriangleEqual", "NotSquareSubset", "NotSquareSubsetEqual", "NotSquareSuperset", "NotSquareSupersetEqual", "NotSubset", "NotSubsetEqual", "NotSucceeds", "NotSucceedsEqual", "NotSucceedsSlantEqual", "NotSucceedsTilde", "NotSuperset", "NotSupersetEqual", "NotTilde", "NotTildeEqual", "NotTildeFullEqual", "NotTildeTilde", "NotVerticalBar"],
    s: ["Nscr"],
    t: ["Ntilde"],
    u: ["Nu"]
  };
  var O = {
    a: ["Oacute"],
    c: ["Ocirc", "Ocy"],
    d: ["Odblac"],
    E: ["OElig"],
    f: ["Ofr"],
    g: ["Ograve"],
    m: ["Omacr", "Omega", "Omicron"],
    o: ["Oopf"],
    p: ["OpenCurlyDoubleQuote", "OpenCurlyQuote"],
    r: ["Or"],
    s: ["Oscr", "Oslash"],
    t: ["Otilde", "Otimes"],
    u: ["Ouml"],
    v: ["OverBar", "OverBrace", "OverBracket", "OverParenthesis"]
  };
  var o = {
    a: ["oacute", "oast"],
    c: ["ocir", "ocirc", "ocy"],
    d: ["odash", "odblac", "odiv", "odot", "odsold"],
    e: ["oelig"],
    f: ["ofcir", "ofr"],
    g: ["ogon", "ograve", "ogt"],
    h: ["ohbar", "ohm"],
    i: ["oint"],
    l: ["olarr", "olcir", "olcross", "oline", "olt"],
    m: ["omacr", "omega", "omicron", "omid", "ominus"],
    o: ["oopf"],
    p: ["opar", "operp", "oplus"],
    r: ["or", "orarr", "ord", "order", "orderof", "ordf", "ordm", "origof", "oror", "orslope", "orv"],
    S: ["oS"],
    s: ["oscr", "oslash", "osol"],
    t: ["otilde", "otimes", "otimesas"],
    u: ["ouml"],
    v: ["ovbar"]
  };
  var p = {
    a: ["par", "para", "parallel", "parsim", "parsl", "part"],
    c: ["pcy"],
    e: ["percnt", "period", "permil", "perp", "pertenk"],
    f: ["pfr"],
    h: ["phi", "phiv", "phmmat", "phone"],
    i: ["pi", "pitchfork", "piv"],
    l: ["planck", "planckh", "plankv", "plus", "plusacir", "plusb", "pluscir", "plusdo", "plusdu", "pluse", "plusmn", "plussim", "plustwo"],
    m: ["pm"],
    o: ["pointint", "popf", "pound"],
    r: ["pr", "prap", "prcue", "prE", "pre", "prec", "precapprox", "preccurlyeq", "preceq", "precnapprox", "precneqq", "precnsim", "precsim", "prime", "primes", "prnap", "prnE", "prnsim", "prod", "profalar", "profline", "profsurf", "prop", "propto", "prsim", "prurel"],
    s: ["pscr", "psi"],
    u: ["puncsp"]
  };
  var P = {
    a: ["PartialD"],
    c: ["Pcy"],
    f: ["Pfr"],
    h: ["Phi"],
    i: ["Pi"],
    l: ["PlusMinus"],
    o: ["Poincareplane", "Popf"],
    r: ["Pr", "Precedes", "PrecedesEqual", "PrecedesSlantEqual", "PrecedesTilde", "Prime", "Product", "Proportion", "Proportional"],
    s: ["Pscr", "Psi"]
  };
  var Q = {
    f: ["Qfr"],
    o: ["Qopf"],
    s: ["Qscr"],
    U: ["QUOT"]
  };
  var q = {
    f: ["qfr"],
    i: ["qint"],
    o: ["qopf"],
    p: ["qprime"],
    s: ["qscr"],
    u: ["quaternions", "quatint", "quest", "questeq", "quot"]
  };
  var r = {
    A: ["rAarr", "rArr", "rAtail"],
    a: ["race", "racute", "radic", "raemptyv", "rang", "rangd", "range", "rangle", "raquo", "rarr", "rarrap", "rarrb", "rarrbfs", "rarrc", "rarrfs", "rarrhk", "rarrlp", "rarrpl", "rarrsim", "rarrtl", "rarrw", "ratail", "ratio", "rationals"],
    B: ["rBarr"],
    b: ["rbarr", "rbbrk", "rbrace", "rbrack", "rbrke", "rbrksld", "rbrkslu"],
    c: ["rcaron", "rcedil", "rceil", "rcub", "rcy"],
    d: ["rdca", "rdldhar", "rdquo", "rdquor", "rdsh"],
    e: ["real", "realine", "realpart", "reals", "rect", "reg"],
    f: ["rfisht", "rfloor", "rfr"],
    H: ["rHar"],
    h: ["rhard", "rharu", "rharul", "rho", "rhov"],
    i: ["rightarrow", "rightarrowtail", "rightharpoondown", "rightharpoonup", "rightleftarrows", "rightleftharpoons", "rightrightarrows", "rightsquigarrow", "rightthreetimes", "ring", "risingdotseq"],
    l: ["rlarr", "rlhar", "rlm"],
    m: ["rmoust", "rmoustache"],
    n: ["rnmid"],
    o: ["roang", "roarr", "robrk", "ropar", "ropf", "roplus", "rotimes"],
    p: ["rpar", "rpargt", "rppolint"],
    r: ["rrarr"],
    s: ["rsaquo", "rscr", "rsh", "rsqb", "rsquo", "rsquor"],
    t: ["rthree", "rtimes", "rtri", "rtrie", "rtrif", "rtriltri"],
    u: ["ruluhar"],
    x: ["rx"]
  };
  var R = {
    a: ["Racute", "Rang", "Rarr", "Rarrtl"],
    B: ["RBarr"],
    c: ["Rcaron", "Rcedil", "Rcy"],
    e: ["Re", "ReverseElement", "ReverseEquilibrium", "ReverseUpEquilibrium"],
    E: ["REG"],
    f: ["Rfr"],
    h: ["Rho"],
    i: ["RightAngleBracket", "RightArrow", "Rightarrow", "RightArrowBar", "RightArrowLeftArrow", "RightCeiling", "RightDoubleBracket", "RightDownTeeVector", "RightDownVector", "RightDownVectorBar", "RightFloor", "RightTee", "RightTeeArrow", "RightTeeVector", "RightTriangle", "RightTriangleBar", "RightTriangleEqual", "RightUpDownVector", "RightUpTeeVector", "RightUpVector", "RightUpVectorBar", "RightVector", "RightVectorBar"],
    o: ["Ropf", "RoundImplies"],
    r: ["Rrightarrow"],
    s: ["Rscr", "Rsh"],
    u: ["RuleDelayed"]
  };
  var S = {
    a: ["Sacute"],
    c: ["Sc", "Scaron", "Scedil", "Scirc", "Scy"],
    f: ["Sfr"],
    H: ["SHCHcy", "SHcy"],
    h: ["ShortDownArrow", "ShortLeftArrow", "ShortRightArrow", "ShortUpArrow"],
    i: ["Sigma"],
    m: ["SmallCircle"],
    O: ["SOFTcy"],
    o: ["Sopf"],
    q: ["Sqrt", "Square", "SquareIntersection", "SquareSubset", "SquareSubsetEqual", "SquareSuperset", "SquareSupersetEqual", "SquareUnion"],
    s: ["Sscr"],
    t: ["Star"],
    u: ["Sub", "Subset", "SubsetEqual", "Succeeds", "SucceedsEqual", "SucceedsSlantEqual", "SucceedsTilde", "SuchThat", "Sum", "Sup", "Superset", "SupersetEqual", "Supset"]
  };
  var s = {
    a: ["sacute"],
    b: ["sbquo"],
    c: ["sc", "scap", "scaron", "sccue", "scE", "sce", "scedil", "scirc", "scnap", "scnE", "scnsim", "scpolint", "scsim", "scy"],
    d: ["sdot", "sdotb", "sdote"],
    e: ["searhk", "seArr", "searr", "searrow", "sect", "semi", "seswar", "setminus", "setmn", "sext"],
    f: ["sfr", "sfrown"],
    h: ["sharp", "shchcy", "shcy", "shortmid", "shortparallel", "shy"],
    i: ["sigma", "sigmaf", "sigmav", "sim", "simdot", "sime", "simeq", "simg", "simgE", "siml", "simlE", "simne", "simplus", "simrarr"],
    l: ["slarr"],
    m: ["smallsetminus", "smashp", "smeparsl", "smid", "smile", "smt", "smte", "smtes"],
    o: ["softcy", "sol", "solb", "solbar", "sopf"],
    p: ["spades", "spadesuit", "spar"],
    q: ["sqcap", "sqcaps", "sqcup", "sqcups", "sqsub", "sqsube", "sqsubset", "sqsubseteq", "sqsup", "sqsupe", "sqsupset", "sqsupseteq", "squ", "square", "squarf", "squf"],
    r: ["srarr"],
    s: ["sscr", "ssetmn", "ssmile", "sstarf"],
    t: ["star", "starf", "straightepsilon", "straightphi", "strns"],
    u: ["sub", "subdot", "subE", "sube", "subedot", "submult", "subnE", "subne", "subplus", "subrarr", "subset", "subseteq", "subseteqq", "subsetneq", "subsetneqq", "subsim", "subsub", "subsup", "succ", "succapprox", "succcurlyeq", "succeq", "succnapprox", "succneqq", "succnsim", "succsim", "sum", "sung", "sup", "sup1", "sup2", "sup3", "supdot", "supdsub", "supE", "supe", "supedot", "suphsol", "suphsub", "suplarr", "supmult", "supnE", "supne", "supplus", "supset", "supseteq", "supseteqq", "supsetneq", "supsetneqq", "supsim", "supsub", "supsup"],
    w: ["swarhk", "swArr", "swarr", "swarrow", "swnwar"],
    z: ["szlig"]
  };
  var T = {
    a: ["Tab", "Tau"],
    c: ["Tcaron", "Tcedil", "Tcy"],
    f: ["Tfr"],
    h: ["Therefore", "Theta", "ThickSpace", "ThinSpace"],
    H: ["THORN"],
    i: ["Tilde", "TildeEqual", "TildeFullEqual", "TildeTilde"],
    o: ["Topf"],
    R: ["TRADE"],
    r: ["TripleDot"],
    s: ["Tscr", "Tstrok"],
    S: ["TScy", "TSHcy"]
  };
  var t = {
    a: ["target", "tau"],
    b: ["tbrk"],
    c: ["tcaron", "tcedil", "tcy"],
    d: ["tdot"],
    e: ["telrec"],
    f: ["tfr"],
    h: ["there4", "therefore", "theta", "thetasym", "thetav", "thickapprox", "thicksim", "thinsp", "thkap", "thksim", "thorn"],
    i: ["tilde", "times", "timesb", "timesbar", "timesd", "tint"],
    o: ["toea", "top", "topbot", "topcir", "topf", "topfork", "tosa"],
    p: ["tprime"],
    r: ["trade", "triangle", "triangledown", "triangleleft", "trianglelefteq", "triangleq", "triangleright", "trianglerighteq", "tridot", "trie", "triminus", "triplus", "trisb", "tritime", "trpezium"],
    s: ["tscr", "tscy", "tshcy", "tstrok"],
    w: ["twixt", "twoheadleftarrow", "twoheadrightarrow"]
  };
  var U = {
    a: ["Uacute", "Uarr", "Uarrocir"],
    b: ["Ubrcy", "Ubreve"],
    c: ["Ucirc", "Ucy"],
    d: ["Udblac"],
    f: ["Ufr"],
    g: ["Ugrave"],
    m: ["Umacr"],
    n: ["UnderBar", "UnderBrace", "UnderBracket", "UnderParenthesis", "Union", "UnionPlus"],
    o: ["Uogon", "Uopf"],
    p: ["UpArrow", "Uparrow", "UpArrowBar", "UpArrowDownArrow", "UpDownArrow", "Updownarrow", "UpEquilibrium", "UpperLeftArrow", "UpperRightArrow", "Upsi", "Upsilon", "UpTee", "UpTeeArrow"],
    r: ["Uring"],
    s: ["Uscr"],
    t: ["Utilde"],
    u: ["Uuml"]
  };
  var u = {
    a: ["uacute", "uarr"],
    A: ["uArr"],
    b: ["ubrcy", "ubreve"],
    c: ["ucirc", "ucy"],
    d: ["udarr", "udblac", "udhar"],
    f: ["ufisht", "ufr"],
    g: ["ugrave"],
    H: ["uHar"],
    h: ["uharl", "uharr", "uhblk"],
    l: ["ulcorn", "ulcorner", "ulcrop", "ultri"],
    m: ["umacr", "uml"],
    o: ["uogon", "uopf"],
    p: ["uparrow", "updownarrow", "upharpoonleft", "upharpoonright", "uplus", "upsi", "upsih", "upsilon", "upuparrows"],
    r: ["urcorn", "urcorner", "urcrop", "uring", "urtri"],
    s: ["uscr"],
    t: ["utdot", "utilde", "utri", "utrif"],
    u: ["uuarr", "uuml"],
    w: ["uwangle"]
  };
  var v = {
    a: ["vangrt", "varepsilon", "varkappa", "varnothing", "varphi", "varpi", "varpropto", "varr", "varrho", "varsigma", "varsubsetneq", "varsubsetneqq", "varsupsetneq", "varsupsetneqq", "vartheta", "vartriangleleft", "vartriangleright"],
    A: ["vArr"],
    B: ["vBar", "vBarv"],
    c: ["vcy"],
    D: ["vDash"],
    d: ["vdash"],
    e: ["vee", "veebar", "veeeq", "vellip", "verbar", "vert"],
    f: ["vfr"],
    l: ["vltri"],
    n: ["vnsub", "vnsup"],
    o: ["vopf"],
    p: ["vprop"],
    r: ["vrtri"],
    s: ["vscr", "vsubnE", "vsubne", "vsupnE", "vsupne"],
    z: ["vzigzag"]
  };
  var V = {
    b: ["Vbar"],
    c: ["Vcy"],
    D: ["VDash"],
    d: ["Vdash", "Vdashl"],
    e: ["Vee", "Verbar", "Vert", "VerticalBar", "VerticalLine", "VerticalSeparator", "VerticalTilde", "VeryThinSpace"],
    f: ["Vfr"],
    o: ["Vopf"],
    s: ["Vscr"],
    v: ["Vvdash"]
  };
  var W = {
    c: ["Wcirc"],
    e: ["Wedge"],
    f: ["Wfr"],
    o: ["Wopf"],
    s: ["Wscr"]
  };
  var w = {
    c: ["wcirc"],
    e: ["wedbar", "wedge", "wedgeq", "weierp"],
    f: ["wfr"],
    o: ["wopf"],
    p: ["wp"],
    r: ["wr", "wreath"],
    s: ["wscr"]
  };
  var x$1 = {
    c: ["xcap", "xcirc", "xcup"],
    d: ["xdtri"],
    f: ["xfr"],
    h: ["xhArr", "xharr"],
    i: ["xi"],
    l: ["xlArr", "xlarr"],
    m: ["xmap"],
    n: ["xnis"],
    o: ["xodot", "xopf", "xoplus", "xotime"],
    r: ["xrArr", "xrarr"],
    s: ["xscr", "xsqcup"],
    u: ["xuplus", "xutri"],
    v: ["xvee"],
    w: ["xwedge"]
  };
  var X = {
    f: ["Xfr"],
    i: ["Xi"],
    o: ["Xopf"],
    s: ["Xscr"]
  };
  var Y = {
    a: ["Yacute"],
    A: ["YAcy"],
    c: ["Ycirc", "Ycy"],
    f: ["Yfr"],
    I: ["YIcy"],
    o: ["Yopf"],
    s: ["Yscr"],
    U: ["YUcy"],
    u: ["Yuml"]
  };
  var y = {
    a: ["yacute", "yacy"],
    c: ["ycirc", "ycy"],
    e: ["yen"],
    f: ["yfr"],
    i: ["yicy"],
    o: ["yopf"],
    s: ["yscr"],
    u: ["yucy", "yuml"]
  };
  var Z = {
    a: ["Zacute"],
    c: ["Zcaron", "Zcy"],
    d: ["Zdot"],
    e: ["ZeroWidthSpace", "Zeta"],
    f: ["Zfr"],
    H: ["ZHcy"],
    o: ["Zopf"],
    s: ["Zscr"]
  };
  var z = {
    a: ["zacute"],
    c: ["zcaron", "zcy"],
    d: ["zdot"],
    e: ["zeetrf", "zeta"],
    f: ["zfr"],
    h: ["zhcy"],
    i: ["zigrarr"],
    o: ["zopf"],
    s: ["zscr"],
    w: ["zwj", "zwnj"]
  };
  var startsWith = {
    A: A,
    a: a,
    b: b,
    B: B,
    C: C,
    c: c,
    D: D,
    d: d,
    E: E,
    e: e,
    f: f,
    F: F,
    g: g,
    G: G,
    H: H,
    h: h,
    I: I,
    i: i,
    J: J,
    j: j,
    K: K,
    k: k,
    l: l,
    L: L,
    m: m,
    M: M,
    n: n,
    N: N,
    O: O,
    o: o,
    p: p,
    P: P,
    Q: Q,
    q: q,
    r: r,
    R: R,
    S: S,
    s: s,
    T: T,
    t: t,
    U: U,
    u: u,
    v: v,
    V: V,
    W: W,
    w: w,
    x: x$1,
    X: X,
    Y: Y,
    y: y,
    Z: Z,
    z: z
  };
  var e$1 = {
    t: ["Aacute", "aacute", "acute", "Cacute", "cacute", "CloseCurlyDoubleQuote", "CloseCurlyQuote", "DiacriticalAcute", "DiacriticalDoubleAcute", "Eacute", "eacute", "gacute", "Iacute", "iacute", "Lacute", "lacute", "late", "Nacute", "nacute", "Oacute", "oacute", "OpenCurlyDoubleQuote", "OpenCurlyQuote", "Racute", "racute", "Sacute", "sacute", "sdote", "smte", "Uacute", "uacute", "Yacute", "yacute", "Zacute", "zacute"],
    v: ["Abreve", "abreve", "Agrave", "agrave", "Breve", "breve", "DiacriticalGrave", "DownBreve", "Egrave", "egrave", "Gbreve", "gbreve", "grave", "Igrave", "igrave", "Ograve", "ograve", "Ubreve", "ubreve", "Ugrave", "ugrave"],
    p: ["andslope", "ape", "bumpe", "csupe", "nbumpe", "nsqsupe", "nsupe", "orslope", "sqsupe", "supe"],
    g: ["ange", "barwedge", "bigwedge", "blacklozenge", "curlywedge", "doublebarwedge", "ge", "image", "lozenge", "nge", "nvge", "range", "Wedge", "wedge", "xwedge"],
    l: ["angle", "blacktriangle", "dwangle", "exponentiale", "female", "langle", "le", "LeftTriangle", "male", "measuredangle", "nle", "NotLeftTriangle", "NotRightTriangle", "nvle", "rangle", "RightTriangle", "SmallCircle", "smile", "ssmile", "triangle", "uwangle"],
    a: ["angmsdae"],
    d: ["Atilde", "atilde", "DiacriticalTilde", "divide", "EqualTilde", "GreaterTilde", "Itilde", "itilde", "LessTilde", "NotEqualTilde", "NotGreaterTilde", "NotLessTilde", "NotSucceedsTilde", "NotTilde", "NotTildeTilde", "Ntilde", "ntilde", "Otilde", "otilde", "PrecedesTilde", "SucceedsTilde", "Tilde", "tilde", "TildeTilde", "trade", "Utilde", "utilde", "VerticalTilde"],
    m: ["backprime", "bprime", "bsime", "gsime", "lsime", "nsime", "Prime", "prime", "qprime", "sime", "tprime", "tritime", "xotime"],
    e: ["barvee", "bigvee", "curlyvee", "cuvee", "DoubleLeftTee", "DoubleRightTee", "DownTee", "ee", "LeftTee", "lthree", "RightTee", "rthree", "UpTee", "Vee", "vee", "xvee"],
    s: ["Because", "because", "maltese", "pluse"],
    r: ["blacksquare", "cire", "dotsquare", "EmptySmallSquare", "EmptyVerySmallSquare", "FilledSmallSquare", "FilledVerySmallSquare", "incare", "npre", "pre", "Square", "square", "Therefore", "therefore"],
    n: ["bne", "Colone", "colone", "gne", "HorizontalLine", "imagline", "lne", "ne", "NewLine", "oline", "phone", "Poincareplane", "profline", "realine", "simne", "subne", "supne", "VerticalLine", "vsubne", "vsupne"],
    i: ["bowtie", "die", "infintie", "ltrie", "nltrie", "nrtrie", "nvltrie", "nvrtrie", "rtrie", "trie"],
    b: ["csube", "nsqsube", "nsube", "sqsube", "sube"],
    c: ["HilbertSpace", "lbrace", "MediumSpace", "NegativeMediumSpace", "NegativeThickSpace", "NegativeThinSpace", "NegativeVeryThinSpace", "NonBreakingSpace", "nsce", "OverBrace", "race", "rbrace", "sce", "ThickSpace", "ThinSpace", "UnderBrace", "VeryThinSpace", "ZeroWidthSpace"],
    k: ["lbrke", "rbrke"],
    h: ["lmoustache", "rmoustache"],
    u: ["nprcue", "nsccue", "prcue", "sccue"],
    R: ["Re"]
  };
  var c$1 = {
    a: ["ac", "angmsdac", "dblac", "Odblac", "odblac", "Udblac", "udblac"],
    r: ["Acirc", "acirc", "bigcirc", "Ccirc", "ccirc", "circ", "circledcirc", "Ecirc", "ecirc", "eqcirc", "Gcirc", "gcirc", "Hcirc", "hcirc", "Icirc", "icirc", "Jcirc", "jcirc", "nrarrc", "Ocirc", "ocirc", "rarrc", "Scirc", "scirc", "Ucirc", "ucirc", "Wcirc", "wcirc", "xcirc", "Ycirc", "ycirc"],
    s: ["cuesc", "nsc", "sc"],
    e: ["curlyeqprec", "nprec", "prec", "telrec"],
    c: ["curlyeqsucc", "gescc", "gtcc", "lescc", "ltcc", "nsucc", "succ"],
    i: ["ic", "radic"],
    v: ["notinvc", "notnivc"],
    S: ["Sc"]
  };
  var d$1 = {
    c: ["acd"],
    n: ["And", "and", "andand", "capand", "Diamond", "diamond", "pound"],
    d: ["andd", "dd"],
    s: ["angmsd", "minusd", "nisd", "timesd"],
    a: ["angmsdad", "Gammad", "gammad"],
    b: ["angrtvbd"],
    i: ["apid", "cirmid", "mid", "napid", "nmid", "nshortmid", "nsmid", "omid", "rnmid", "shortmid", "smid"],
    e: ["Barwed", "barwed", "cuwed", "imped", "RuleDelayed"],
    H: ["boxHd"],
    h: ["boxhd", "DDotrahd"],
    o: ["coprod", "intprod", "iprod", "period", "prod"],
    g: ["langd", "rangd"],
    l: ["lbrksld", "odsold", "rbrksld"],
    r: ["lhard", "llhard", "lrhard", "ord", "rhard"]
  };
  var E$1 = {
    c: ["acE", "scE"],
    p: ["apE", "bumpE", "napE", "nsupE", "supE"],
    r: ["cirE", "prE"],
    l: ["ExponentialE", "glE", "lE", "nlE", "simlE"],
    g: ["gE", "lgE", "ngE", "simgE"],
    n: ["gnE", "gvnE", "isinE", "lnE", "lvnE", "notinE", "prnE", "scnE", "subnE", "supnE", "vsubnE", "vsupnE"],
    b: ["nsubE", "subE"],
    D: ["TRADE"]
  };
  var y$1 = {
    c: ["Acy", "acy", "Bcy", "bcy", "CHcy", "chcy", "Dcy", "dcy", "DJcy", "djcy", "DScy", "dscy", "DZcy", "dzcy", "Ecy", "ecy", "Fcy", "fcy", "Gcy", "gcy", "GJcy", "gjcy", "HARDcy", "hardcy", "Icy", "icy", "IEcy", "iecy", "IOcy", "iocy", "Iukcy", "iukcy", "Jcy", "jcy", "Jsercy", "jsercy", "Jukcy", "jukcy", "Kcy", "kcy", "KHcy", "khcy", "KJcy", "kjcy", "Lcy", "lcy", "LJcy", "ljcy", "Mcy", "mcy", "Ncy", "ncy", "NJcy", "njcy", "Ocy", "ocy", "Pcy", "pcy", "Rcy", "rcy", "Scy", "scy", "SHCHcy", "shchcy", "SHcy", "shcy", "SOFTcy", "softcy", "Tcy", "tcy", "TScy", "tscy", "TSHcy", "tshcy", "Ubrcy", "ubrcy", "Ucy", "ucy", "Vcy", "vcy", "YAcy", "yacy", "Ycy", "ycy", "YIcy", "yicy", "YUcy", "yucy", "Zcy", "zcy", "ZHcy", "zhcy"],
    p: ["copy"],
    t: ["cylcty", "empty"],
    h: ["shy"]
  };
  var g$1 = {
    i: ["AElig", "aelig", "ffilig", "fflig", "ffllig", "filig", "fjlig", "fllig", "IJlig", "ijlig", "OElig", "oelig", "szlig"],
    l: ["amalg", "lg", "ntlg"],
    n: ["ang", "Aring", "aring", "backcong", "bcong", "cong", "eng", "Lang", "lang", "LeftCeiling", "loang", "nang", "ncong", "Rang", "rang", "RightCeiling", "ring", "roang", "sung", "Uring", "uring", "varnothing"],
    a: ["angmsdag", "vzigzag"],
    e: ["deg", "eg", "leg", "reg"],
    G: ["Gg", "nGg"],
    g: ["gg", "ggg"],
    E: ["lEg"],
    s: ["lesg"],
    m: ["lsimg", "simg"]
  };
  var f$1 = {
    a: ["af", "angmsdaf", "sigmaf"],
    p: ["Aopf", "aopf", "Bopf", "bopf", "Copf", "copf", "Dopf", "dopf", "Eopf", "eopf", "Fopf", "fopf", "Gopf", "gopf", "Hopf", "hopf", "Iopf", "iopf", "Jopf", "jopf", "Kopf", "kopf", "Lopf", "lopf", "Mopf", "mopf", "Nopf", "nopf", "Oopf", "oopf", "Popf", "popf", "Qopf", "qopf", "Ropf", "ropf", "Sopf", "sopf", "Topf", "topf", "Uopf", "uopf", "Vopf", "vopf", "Wopf", "wopf", "Xopf", "xopf", "Yopf", "yopf", "Zopf", "zopf"],
    i: ["dtrif", "ltrif", "rtrif", "utrif"],
    o: ["fnof", "imof", "orderof", "origof"],
    r: ["Fouriertrf", "Laplacetrf", "Mellintrf", "profsurf", "squarf", "sstarf", "starf", "zeetrf"],
    l: ["half"],
    f: ["iff"],
    z: ["lozf"],
    d: ["ordf"],
    u: ["squf"]
  };
  var r$1 = {
    f: ["Afr", "afr", "Bfr", "bfr", "Cfr", "cfr", "Dfr", "dfr", "Efr", "efr", "Ffr", "ffr", "Gfr", "gfr", "Hfr", "hfr", "Ifr", "ifr", "Jfr", "jfr", "Kfr", "kfr", "Lfr", "lfr", "Mfr", "mfr", "Nfr", "nfr", "Ofr", "ofr", "Pfr", "pfr", "Qfr", "qfr", "Rfr", "rfr", "Sfr", "sfr", "Tfr", "tfr", "Ufr", "ufr", "Vfr", "vfr", "Wfr", "wfr", "Xfr", "xfr", "Yfr", "yfr", "Zfr", "zfr"],
    c: ["Amacr", "amacr", "Ascr", "ascr", "Bscr", "bscr", "Cscr", "cscr", "Dscr", "dscr", "Emacr", "emacr", "Escr", "escr", "Fscr", "fscr", "Gscr", "gscr", "Hscr", "hscr", "Imacr", "imacr", "Iscr", "iscr", "Jscr", "jscr", "Kscr", "kscr", "Lscr", "lscr", "macr", "Mscr", "mscr", "Nscr", "nscr", "Omacr", "omacr", "Oscr", "oscr", "Pscr", "pscr", "Qscr", "qscr", "Rscr", "rscr", "Sscr", "sscr", "Tscr", "tscr", "Umacr", "umacr", "Uscr", "uscr", "Vscr", "vscr", "Wscr", "wscr", "Xscr", "xscr", "Yscr", "yscr", "Zscr", "zscr"],
    r: ["angzarr", "crarr", "cudarrr", "cularr", "curarr", "Darr", "dArr", "darr", "ddarr", "dharr", "duarr", "dzigrarr", "erarr", "gtrarr", "hArr", "harr", "hoarr", "lAarr", "Larr", "lArr", "larr", "lBarr", "lbarr", "llarr", "loarr", "lrarr", "ltlarr", "neArr", "nearr", "nhArr", "nharr", "nlArr", "nlarr", "nrArr", "nrarr", "nvHarr", "nvlArr", "nvrArr", "nwArr", "nwarr", "olarr", "orarr", "rAarr", "Rarr", "rArr", "rarr", "RBarr", "rBarr", "rbarr", "rlarr", "roarr", "rrarr", "seArr", "searr", "simrarr", "slarr", "srarr", "subrarr", "suplarr", "swArr", "swarr", "Uarr", "uArr", "uarr", "udarr", "uharr", "uuarr", "vArr", "varr", "xhArr", "xharr", "xlArr", "xlarr", "xrArr", "xrarr", "zigrarr"],
    i: ["apacir", "cir", "cirscir", "ecir", "gtcir", "harrcir", "ltcir", "midcir", "ocir", "ofcir", "olcir", "plusacir", "pluscir", "topcir", "Uarrocir"],
    a: ["bigstar", "brvbar", "dHar", "dollar", "DoubleVerticalBar", "DownArrowBar", "DownLeftVectorBar", "DownRightVectorBar", "duhar", "epar", "gtlPar", "hbar", "horbar", "ldrdhar", "ldrushar", "LeftArrowBar", "LeftDownVectorBar", "LeftTriangleBar", "LeftUpVectorBar", "LeftVectorBar", "lHar", "lopar", "lowbar", "lpar", "lrhar", "ltrPar", "lurdshar", "luruhar", "nesear", "nhpar", "NotDoubleVerticalBar", "NotLeftTriangleBar", "NotRightTriangleBar", "NotVerticalBar", "npar", "nspar", "nwnear", "ohbar", "opar", "ovbar", "OverBar", "par", "profalar", "rdldhar", "rHar", "RightArrowBar", "RightDownVectorBar", "RightTriangleBar", "RightUpVectorBar", "RightVectorBar", "rlhar", "ropar", "rpar", "ruluhar", "seswar", "solbar", "spar", "Star", "star", "swnwar", "timesbar", "udhar", "uHar", "UnderBar", "UpArrowBar", "Vbar", "vBar", "veebar", "Verbar", "verbar", "VerticalBar", "wedbar"],
    D: ["boxDr"],
    d: ["boxdr", "mldr", "nldr"],
    U: ["boxUr"],
    u: ["boxur", "natur"],
    V: ["boxVr"],
    v: ["boxvr"],
    s: ["copysr"],
    p: ["cuepr", "npr", "pr"],
    o: ["cupor", "DownLeftRightVector", "DownLeftTeeVector", "DownLeftVector", "DownRightTeeVector", "DownRightVector", "ldquor", "LeftDownTeeVector", "LeftDownVector", "LeftFloor", "LeftRightVector", "LeftTeeVector", "LeftUpDownVector", "LeftUpTeeVector", "LeftUpVector", "LeftVector", "lesdotor", "lfloor", "lsquor", "or", "oror", "rdquor", "rfloor", "RightDownTeeVector", "RightDownVector", "RightFloor", "RightTeeVector", "RightUpDownVector", "RightUpTeeVector", "RightUpVector", "RightVector", "rsquor", "VerticalSeparator"],
    e: ["Dagger", "dagger", "ddagger", "easter", "GreaterGreater", "LessEqualGreater", "LessGreater", "llcorner", "lrcorner", "marker", "NestedGreaterGreater", "NotGreater", "NotGreaterGreater", "NotLessGreater", "NotNestedGreaterGreater", "order", "ulcorner", "urcorner"],
    t: ["eqslantgtr", "lesseqgtr", "lesseqqgtr", "lessgtr", "ngtr"],
    O: ["Or"],
    P: ["Pr"],
    w: ["wr"]
  };
  var m$1 = {
    y: ["alefsym", "thetasym"],
    i: ["backsim", "bsim", "eqsim", "Esim", "esim", "gnsim", "gsim", "gtrsim", "larrsim", "lesssim", "lnsim", "lsim", "nesim", "ngsim", "nlsim", "nsim", "nvsim", "parsim", "plussim", "precnsim", "precsim", "prnsim", "prsim", "rarrsim", "scnsim", "scsim", "sim", "subsim", "succnsim", "succsim", "supsim", "thicksim", "thksim"],
    o: ["bottom"],
    s: ["ccupssm"],
    r: ["curarrm", "lrm"],
    a: ["diam"],
    u: ["Equilibrium", "num", "ReverseEquilibrium", "ReverseUpEquilibrium", "Sum", "sum", "trpezium", "UpEquilibrium"],
    I: ["Im"],
    h: ["ohm"],
    d: ["ordm"],
    p: ["pm"],
    l: ["rlm"]
  };
  var h$1 = {
    p: ["aleph", "angsph"],
    a: ["angmsdah"],
    s: ["Backslash", "circleddash", "dash", "hslash", "ldsh", "Lsh", "lsh", "mdash", "ndash", "nVDash", "nVdash", "nvDash", "nvdash", "odash", "Oslash", "oslash", "rdsh", "Rsh", "rsh", "VDash", "Vdash", "vDash", "vdash", "Vvdash"],
    t: ["beth", "daleth", "eth", "imath", "jmath", "wreath"],
    x: ["boxh"],
    V: ["boxVh"],
    v: ["boxvh"],
    k: ["planckh"],
    i: ["upsih"]
  };
  var a$1 = {
    h: ["Alpha", "alpha"],
    a: ["angmsdaa"],
    t: ["Beta", "beta", "Delta", "delta", "Eta", "eta", "iiota", "Iota", "iota", "Theta", "theta", "vartheta", "Zeta", "zeta"],
    l: ["Cedilla", "gla", "nabla"],
    m: ["comma", "digamma", "Gamma", "gamma", "InvisibleComma", "mcomma", "Sigma", "sigma", "varsigma"],
    p: ["Kappa", "kappa", "varkappa"],
    d: ["Lambda", "lambda"],
    c: ["ldca", "rdca"],
    v: ["notinva", "notniva"],
    g: ["Omega", "omega"],
    r: ["para"],
    e: ["toea"],
    s: ["tosa"]
  };
  var P$1 = {
    M: ["AMP"]
  };
  var p$1 = {
    m: ["amp", "asymp", "bump", "comp", "HumpDownHump", "mp", "nbump", "NotHumpDownHump"],
    a: ["ap", "bigcap", "Cap", "cap", "capcap", "cupbrcap", "CupCap", "cupcap", "gap", "gnap", "lap", "lnap", "Map", "map", "multimap", "mumap", "nap", "ncap", "NotCupCap", "nvap", "prap", "prnap", "rarrap", "scap", "scnap", "sqcap", "thkap", "xcap", "xmap"],
    u: ["bigcup", "bigsqcup", "bigtriangleup", "capbrcup", "capcup", "csup", "Cup", "cup", "cupcup", "leftharpoonup", "mapstoup", "ncup", "nsup", "rightharpoonup", "sqcup", "sqsup", "subsup", "Sup", "sup", "supsup", "vnsup", "xcup", "xsqcup"],
    r: ["cularrp", "operp", "perp", "sharp", "weierp"],
    o: ["dlcrop", "drcrop", "prop", "top", "ulcrop", "urcrop", "vprop"],
    s: ["emsp", "ensp", "hairsp", "nbsp", "numsp", "puncsp", "thinsp"],
    i: ["hellip", "vellip"],
    l: ["larrlp", "rarrlp"],
    c: ["mlcp"],
    h: ["smashp"],
    w: ["wp"]
  };
  var v$1 = {
    d: ["andv"],
    r: ["Barv", "orv", "vBarv"],
    y: ["bemptyv", "cemptyv", "demptyv", "emptyv", "laemptyv", "raemptyv"],
    i: ["bnequiv", "div", "epsiv", "equiv", "nequiv", "niv", "odiv", "phiv", "piv"],
    x: ["boxv"],
    h: ["Dashv", "dashv"],
    k: ["forkv", "plankv"],
    s: ["isinsv"],
    n: ["isinv"],
    a: ["kappav", "sigmav", "thetav"],
    t: ["nGtv", "nLtv"],
    o: ["rhov"]
  };
  var b$1 = {
    a: ["angmsdab", "Tab"],
    v: ["angrtvb", "notinvb", "notnivb"],
    l: ["bsolb", "solb"],
    u: ["bsolhsub", "csub", "lcub", "nsub", "rcub", "sqsub", "Sub", "sub", "subsub", "supdsub", "suphsub", "supsub", "vnsub"],
    r: ["larrb", "rarrb"],
    q: ["lsqb", "rsqb"],
    s: ["minusb", "plusb", "timesb", "trisb"],
    t: ["sdotb"]
  };
  var t$1 = {
    r: ["angrt", "imagpart", "npart", "part", "realpart", "Sqrt", "vangrt", "Vert", "vert"],
    s: ["angst", "ast", "circledast", "equest", "exist", "gtquest", "iquest", "lmoust", "lowast", "ltquest", "midast", "nexist", "oast", "quest", "rmoust"],
    n: ["awconint", "awint", "Cconint", "cent", "cirfnint", "complement", "Congruent", "Conint", "conint", "cwconint", "cwint", "Element", "fpartint", "geqslant", "iiiint", "iiint", "Int", "int", "leqslant", "ngeqslant", "nleqslant", "NotCongruent", "NotElement", "NotReverseElement", "npolint", "oint", "percnt", "pointint", "qint", "quatint", "ReverseElement", "rppolint", "scpolint", "tint"],
    o: ["bigodot", "bNot", "bnot", "bot", "capdot", "Cdot", "cdot", "CenterDot", "centerdot", "CircleDot", "congdot", "ctdot", "cupdot", "DiacriticalDot", "Dot", "dot", "DotDot", "doteqdot", "DoubleDot", "dtdot", "eDDot", "Edot", "eDot", "edot", "efDot", "egsdot", "elsdot", "erDot", "esdot", "Gdot", "gdot", "gesdot", "gtdot", "gtrdot", "Idot", "inodot", "isindot", "lesdot", "lessdot", "Lmidot", "lmidot", "ltdot", "mDDot", "middot", "ncongdot", "nedot", "Not", "not", "notindot", "odot", "quot", "sdot", "simdot", "subdot", "subedot", "supdot", "supedot", "tdot", "topbot", "tridot", "TripleDot", "utdot", "xodot", "Zdot", "zdot"],
    f: ["blacktriangleleft", "circlearrowleft", "curvearrowleft", "downharpoonleft", "looparrowleft", "mapstoleft", "ntriangleleft", "triangleleft", "upharpoonleft", "vartriangleleft"],
    h: ["blacktriangleright", "circlearrowright", "curvearrowright", "dfisht", "downharpoonright", "homtht", "lfisht", "looparrowright", "ntriangleright", "rfisht", "triangleright", "ufisht", "upharpoonright", "vartriangleright"],
    e: ["bullet", "caret", "emptyset", "LeftAngleBracket", "LeftDoubleBracket", "NotSquareSubset", "NotSquareSuperset", "NotSubset", "NotSuperset", "nsubset", "nsupset", "OverBracket", "RightAngleBracket", "RightDoubleBracket", "sqsubset", "sqsupset", "SquareSubset", "SquareSuperset", "Subset", "subset", "Superset", "Supset", "supset", "target", "UnderBracket"],
    i: ["clubsuit", "diamondsuit", "heartsuit", "it", "spadesuit"],
    a: ["commat", "flat", "Hat", "lat", "phmmat", "SuchThat"],
    c: ["Coproduct", "Product", "rect", "sect"],
    G: ["Gt", "nGt"],
    g: ["gt", "ngt", "nvgt", "ogt", "rpargt"],
    l: ["hamilt", "lparlt", "lt", "malt", "nlt", "nvlt", "olt", "submult", "supmult"],
    L: ["Lt", "nLt"],
    x: ["sext", "twixt"],
    m: ["smt"]
  };
  var n$1 = {
    o: ["Aogon", "aogon", "ApplyFunction", "backepsilon", "caron", "Ccaron", "ccaron", "Colon", "colon", "Dcaron", "dcaron", "Ecaron", "ecaron", "ecolon", "Eogon", "eogon", "Epsilon", "epsilon", "eqcolon", "expectation", "hercon", "Intersection", "Iogon", "iogon", "Lcaron", "lcaron", "Ncaron", "ncaron", "ogon", "Omicron", "omicron", "Proportion", "Rcaron", "rcaron", "Scaron", "scaron", "SquareIntersection", "SquareUnion", "straightepsilon", "Tcaron", "tcaron", "Union", "Uogon", "uogon", "Upsilon", "upsilon", "varepsilon", "Zcaron", "zcaron"],
    g: ["Assign"],
    e: ["between", "curren", "hyphen", "kgreen", "yen"],
    w: ["bigtriangledown", "blacktriangledown", "frown", "leftharpoondown", "mapstodown", "rightharpoondown", "sfrown", "triangledown"],
    f: ["compfn"],
    i: ["disin", "iinfin", "in", "infin", "isin", "notin", "nvinfin"],
    r: ["dlcorn", "drcorn", "thorn", "ulcorn", "urcorn"],
    a: ["lagran"],
    m: ["plusmn", "setmn", "ssetmn"]
  };
  var s$1 = {
    o: ["apos", "mstpos", "napos"],
    u: ["becaus", "bigoplus", "biguplus", "boxminus", "boxplus", "CircleMinus", "CirclePlus", "dotminus", "dotplus", "eplus", "loplus", "minus", "MinusPlus", "mnplus", "ominus", "oplus", "plus", "PlusMinus", "roplus", "setminus", "simplus", "smallsetminus", "subplus", "supplus", "triminus", "triplus", "UnionPlus", "uplus", "xoplus", "xuplus"],
    i: ["Bernoullis", "nis", "OverParenthesis", "UnderParenthesis", "xnis"],
    e: ["bigotimes", "boxtimes", "CircleTimes", "complexes", "divideontimes", "ges", "gesles", "Implies", "InvisibleTimes", "lates", "leftthreetimes", "les", "lesges", "lotimes", "ltimes", "nges", "nles", "NotPrecedes", "Otimes", "otimes", "Precedes", "primes", "rightthreetimes", "rotimes", "RoundImplies", "rtimes", "smtes", "spades", "times"],
    p: ["caps", "ccaps", "ccups", "cups", "sqcaps", "sqcups"],
    y: ["Cayleys"],
    b: ["clubs"],
    s: ["Cross", "cross", "eqslantless", "GreaterEqualLess", "GreaterLess", "gtreqless", "gtreqqless", "gtrless", "LessLess", "NestedLessLess", "nless", "NotGreaterLess", "NotLess", "NotLessLess", "NotNestedLessLess", "olcross"],
    m: ["diams"],
    w: ["downdownarrows", "leftleftarrows", "leftrightarrows", "rightleftarrows", "rightrightarrows", "upuparrows"],
    g: ["egs"],
    r: ["elinters", "integers"],
    l: ["els", "equals", "models", "naturals", "rationals", "reals"],
    t: ["Exists", "hearts", "nexists", "NotExists"],
    n: ["fltns", "isins", "leftrightharpoons", "quaternions", "rightleftharpoons", "strns"],
    f: ["larrbfs", "larrfs", "rarrbfs", "rarrfs"],
    d: ["NotSucceeds", "Succeeds"],
    a: ["otimesas"]
  };
  var x$1$1 = {
    o: ["approx", "boxbox", "gnapprox", "gtrapprox", "lessapprox", "lnapprox", "napprox", "precapprox", "precnapprox", "succapprox", "succnapprox", "thickapprox"],
    n: ["divonx"],
    r: ["rx"]
  };
  var q$1 = {
    e: ["approxeq", "asympeq", "backsimeq", "Bumpeq", "bumpeq", "circeq", "coloneq", "ddotseq", "doteq", "fallingdotseq", "geq", "gneq", "leq", "lneq", "ngeq", "nleq", "npreceq", "nsimeq", "nsubseteq", "nsucceq", "nsupseteq", "ntrianglelefteq", "ntrianglerighteq", "preccurlyeq", "preceq", "questeq", "risingdotseq", "simeq", "sqsubseteq", "sqsupseteq", "subseteq", "subsetneq", "succcurlyeq", "succeq", "supseteq", "supsetneq", "trianglelefteq", "triangleq", "trianglerighteq", "varsubsetneq", "varsupsetneq", "veeeq", "wedgeq"],
    q: ["geqq", "gneqq", "gvertneqq", "leqq", "lneqq", "lvertneqq", "ngeqq", "nleqq", "nsubseteqq", "nsupseteqq", "precneqq", "subseteqq", "subsetneqq", "succneqq", "supseteqq", "supsetneqq", "varsubsetneqq", "varsupsetneqq"]
  };
  var l$1 = {
    m: ["Auml", "auml", "Euml", "euml", "gsiml", "Iuml", "iuml", "Ouml", "ouml", "siml", "uml", "Uuml", "uuml", "Yuml", "yuml"],
    D: ["boxDl"],
    d: ["boxdl"],
    U: ["boxUl"],
    u: ["boxul", "lharul", "rharul"],
    V: ["boxVl"],
    v: ["boxvl"],
    o: ["bsol", "dsol", "gesdotol", "osol", "sol", "suphsol"],
    l: ["bull", "ell", "ForAll", "forall", "hybull", "ll"],
    i: ["Ccedil", "ccedil", "cedil", "Gcedil", "Kcedil", "kcedil", "lAtail", "latail", "Lcedil", "lcedil", "lceil", "leftarrowtail", "Ncedil", "ncedil", "permil", "rAtail", "ratail", "Rcedil", "rcedil", "rceil", "rightarrowtail", "Scedil", "scedil", "Tcedil", "tcedil"],
    a: ["ClockwiseContourIntegral", "ContourIntegral", "CounterClockwiseContourIntegral", "DotEqual", "DoubleContourIntegral", "Equal", "GreaterEqual", "GreaterFullEqual", "GreaterSlantEqual", "HumpEqual", "intcal", "Integral", "intercal", "LeftTriangleEqual", "LessFullEqual", "LessSlantEqual", "natural", "NotEqual", "NotGreaterEqual", "NotGreaterFullEqual", "NotGreaterSlantEqual", "NotHumpEqual", "NotLeftTriangleEqual", "NotLessEqual", "NotLessSlantEqual", "NotPrecedesEqual", "NotPrecedesSlantEqual", "NotRightTriangleEqual", "NotSquareSubsetEqual", "NotSquareSupersetEqual", "NotSubsetEqual", "NotSucceedsEqual", "NotSucceedsSlantEqual", "NotSupersetEqual", "NotTildeEqual", "NotTildeFullEqual", "PrecedesEqual", "PrecedesSlantEqual", "Proportional", "real", "RightTriangleEqual", "SquareSubsetEqual", "SquareSupersetEqual", "SubsetEqual", "SucceedsEqual", "SucceedsSlantEqual", "SupersetEqual", "TildeEqual", "TildeFullEqual"],
    r: ["cudarrl", "dharl", "uharl"],
    e: ["Del", "el", "gel", "gimel", "nparallel", "nshortparallel", "parallel", "prurel", "shortparallel"],
    s: ["eparsl", "eqvparsl", "frasl", "gesl", "nparsl", "parsl", "smeparsl"],
    c: ["excl", "iexcl"],
    E: ["gEl"],
    g: ["gl", "ntgl"],
    p: ["larrpl", "rarrpl"],
    t: ["larrtl", "Rarrtl", "rarrtl"],
    L: ["Ll", "nLl"],
    h: ["Vdashl"]
  };
  var k$1 = {
    r: ["bbrk", "bbrktbrk", "checkmark", "fork", "lbbrk", "lobrk", "pitchfork", "rbbrk", "robrk", "tbrk", "topfork"],
    n: ["blank", "pertenk"],
    c: ["block", "check", "lbrack", "planck", "rbrack"],
    o: ["Dstrok", "dstrok", "Hstrok", "hstrok", "Lstrok", "lstrok", "Tstrok", "tstrok"],
    e: ["Hacek"],
    h: ["intlarhk", "larrhk", "nearhk", "nwarhk", "rarrhk", "searhk", "swarhk"],
    l: ["lhblk", "uhblk"],
    a: ["NoBreak"]
  };
  var o$1 = {
    u: ["bdquo", "laquo", "ldquo", "lsaquo", "lsquo", "raquo", "rdquo", "rsaquo", "rsquo", "sbquo"],
    r: ["euro", "micro", "numero"],
    t: ["gesdoto", "lesdoto", "longmapsto", "mapsto", "propto", "varpropto"],
    h: ["mho", "Rho", "rho", "varrho"],
    d: ["plusdo"],
    w: ["plustwo"],
    i: ["ratio"]
  };
  var i$1 = {
    s: ["bepsi", "epsi", "Psi", "psi", "Upsi", "upsi"],
    m: ["bsemi", "semi"],
    h: ["Chi", "chi", "Phi", "phi", "straightphi", "varphi"],
    r: ["dtri", "lltri", "lrtri", "ltri", "nltri", "nrtri", "rtri", "rtriltri", "ultri", "urtri", "utri", "vltri", "vrtri", "xdtri", "xutri"],
    i: ["ii"],
    n: ["ni", "notni"],
    P: ["Pi"],
    p: ["pi", "varpi"],
    X: ["Xi"],
    x: ["xi"]
  };
  var u$1 = {
    o: ["bernou"],
    H: ["boxHu"],
    h: ["boxhu"],
    l: ["lbrkslu", "rbrkslu"],
    r: ["lharu", "rharu"],
    d: ["minusdu", "plusdu"],
    M: ["Mu"],
    m: ["mu"],
    N: ["Nu"],
    n: ["nu"],
    q: ["squ"],
    a: ["Tau", "tau"]
  };
  var w$1 = {
    o: ["bkarow", "dbkarow", "DoubleDownArrow", "DoubleLeftArrow", "DoubleLeftRightArrow", "DoubleLongLeftArrow", "DoubleLongLeftRightArrow", "DoubleLongRightArrow", "DoubleRightArrow", "DoubleUpArrow", "DoubleUpDownArrow", "DownArrow", "Downarrow", "downarrow", "DownArrowUpArrow", "DownTeeArrow", "drbkarow", "hksearow", "hkswarow", "hookleftarrow", "hookrightarrow", "LeftArrow", "Leftarrow", "leftarrow", "LeftArrowRightArrow", "LeftRightArrow", "Leftrightarrow", "leftrightarrow", "leftrightsquigarrow", "LeftTeeArrow", "Lleftarrow", "LongLeftArrow", "Longleftarrow", "longleftarrow", "LongLeftRightArrow", "Longleftrightarrow", "longleftrightarrow", "LongRightArrow", "Longrightarrow", "longrightarrow", "LowerLeftArrow", "LowerRightArrow", "nearrow", "nLeftarrow", "nleftarrow", "nLeftrightarrow", "nleftrightarrow", "nRightarrow", "nrightarrow", "nwarrow", "RightArrow", "Rightarrow", "rightarrow", "RightArrowLeftArrow", "rightsquigarrow", "RightTeeArrow", "Rrightarrow", "searrow", "ShortDownArrow", "ShortLeftArrow", "ShortRightArrow", "ShortUpArrow", "swarrow", "twoheadleftarrow", "twoheadrightarrow", "UpArrow", "Uparrow", "uparrow", "UpArrowDownArrow", "UpDownArrow", "Updownarrow", "updownarrow", "UpperLeftArrow", "UpperRightArrow", "UpTeeArrow"],
    r: ["harrw", "nrarrw", "rarrw"]
  };
  var L$1 = {
    D: ["boxDL"],
    d: ["boxdL"],
    U: ["boxUL"],
    u: ["boxuL"],
    V: ["boxVL"],
    v: ["boxvL"]
  };
  var R$1 = {
    D: ["boxDR"],
    d: ["boxdR", "circledR"],
    U: ["boxUR"],
    u: ["boxuR"],
    V: ["boxVR"],
    v: ["boxvR"]
  };
  var H$1 = {
    x: ["boxH"],
    V: ["boxVH"],
    v: ["boxvH"],
    T: ["ETH"]
  };
  var D$1 = {
    H: ["boxHD"],
    h: ["boxhD"],
    l: ["CapitalDifferentialD", "DifferentialD", "PartialD"],
    D: ["DD", "equivDD"]
  };
  var U$1 = {
    H: ["boxHU"],
    h: ["boxhU"]
  };
  var V$1 = {
    x: ["boxV"]
  };
  var S$1 = {
    d: ["circledS"],
    o: ["oS"]
  };
  var Y$1 = {
    P: ["COPY"]
  };
  var G$1 = {
    N: ["ENG"],
    E: ["REG"]
  };
  var j$1 = {
    l: ["glj"],
    w: ["zwj"],
    n: ["zwnj"]
  };
  var T$1 = {
    G: ["GT"],
    L: ["LT"],
    O: ["QUOT"]
  };
  var I$1 = {
    y: ["ImaginaryI"]
  };
  var z$1 = {
    o: ["loz"]
  };
  var N$1 = {
    R: ["THORN"]
  };
  var endsWith = {
    "1": {
      p: ["sup1"]
    },
    "2": {
      "1": ["blk12", "frac12"],
      p: ["sup2"]
    },
    "3": {
      "1": ["emsp13", "frac13"],
      "2": ["frac23"],
      p: ["sup3"]
    },
    "4": {
      "1": ["blk14", "emsp14", "frac14"],
      "3": ["blk34", "frac34"],
      e: ["there4"]
    },
    "5": {
      "1": ["frac15"],
      "2": ["frac25"],
      "3": ["frac35"],
      "4": ["frac45"]
    },
    "6": {
      "1": ["frac16"],
      "5": ["frac56"]
    },
    "8": {
      "1": ["frac18"],
      "3": ["frac38"],
      "5": ["frac58"],
      "7": ["frac78"]
    },
    e: e$1,
    c: c$1,
    d: d$1,
    E: E$1,
    y: y$1,
    g: g$1,
    f: f$1,
    r: r$1,
    m: m$1,
    h: h$1,
    a: a$1,
    P: P$1,
    p: p$1,
    v: v$1,
    b: b$1,
    t: t$1,
    n: n$1,
    s: s$1,
    x: x$1$1,
    q: q$1,
    l: l$1,
    k: k$1,
    o: o$1,
    i: i$1,
    u: u$1,
    w: w$1,
    L: L$1,
    R: R$1,
    H: H$1,
    D: D$1,
    U: U$1,
    V: V$1,
    S: S$1,
    Y: Y$1,
    G: G$1,
    j: j$1,
    T: T$1,
    I: I$1,
    z: z$1,
    N: N$1
  };
  var a$2 = {
    a: ["aacute"],
    b: ["abreve"],
    c: ["ac", "acd", "ace", "acirc", "acute", "acy"],
    e: ["aelig"],
    f: ["af", "afr"],
    g: ["agrave"],
    l: ["alefsym", "aleph", "alpha"],
    m: ["amacr", "amalg", "amp"],
    n: ["and", "andand", "andd", "andslope", "andv", "ang", "ange", "angle", "angmsd", "angmsdaa", "angmsdab", "angmsdac", "angmsdad", "angmsdae", "angmsdaf", "angmsdag", "angmsdah", "angrt", "angrtvb", "angrtvbd", "angsph", "angst", "angzarr"],
    o: ["aogon", "aopf"],
    p: ["ap", "apacir", "ape", "apid", "apos", "applyfunction", "approx", "approxeq"],
    r: ["aring"],
    s: ["ascr", "assign", "ast", "asymp", "asympeq"],
    t: ["atilde"],
    u: ["auml"],
    w: ["awconint", "awint"]
  };
  var b$2 = {
    a: ["backcong", "backepsilon", "backprime", "backsim", "backsimeq", "backslash", "barv", "barvee", "barwed", "barwedge"],
    b: ["bbrk", "bbrktbrk"],
    c: ["bcong", "bcy"],
    d: ["bdquo"],
    e: ["becaus", "because", "bemptyv", "bepsi", "bernou", "bernoullis", "beta", "beth", "between"],
    f: ["bfr"],
    i: ["bigcap", "bigcirc", "bigcup", "bigodot", "bigoplus", "bigotimes", "bigsqcup", "bigstar", "bigtriangledown", "bigtriangleup", "biguplus", "bigvee", "bigwedge"],
    k: ["bkarow"],
    l: ["blacklozenge", "blacksquare", "blacktriangle", "blacktriangledown", "blacktriangleleft", "blacktriangleright", "blank", "blk12", "blk14", "blk34", "block"],
    n: ["bne", "bnequiv", "bnot"],
    o: ["bopf", "bot", "bottom", "bowtie", "boxbox", "boxdl", "boxdr", "boxh", "boxhd", "boxhu", "boxminus", "boxplus", "boxtimes", "boxul", "boxur", "boxv", "boxvh", "boxvl", "boxvr"],
    p: ["bprime"],
    r: ["breve", "brvbar"],
    s: ["bscr", "bsemi", "bsim", "bsime", "bsol", "bsolb", "bsolhsub"],
    u: ["bull", "bullet", "bump", "bumpe", "bumpeq"]
  };
  var c$2 = {
    a: ["cacute", "cap", "capand", "capbrcup", "capcap", "capcup", "capdot", "capitaldifferentiald", "caps", "caret", "caron", "cayleys"],
    c: ["ccaps", "ccaron", "ccedil", "ccirc", "cconint", "ccups", "ccupssm"],
    d: ["cdot"],
    e: ["cedil", "cedilla", "cemptyv", "cent", "centerdot"],
    f: ["cfr"],
    h: ["chcy", "check", "checkmark", "chi"],
    i: ["cir", "circ", "circeq", "circlearrowleft", "circlearrowright", "circledast", "circledcirc", "circleddash", "circledot", "circledr", "circleds", "circleminus", "circleplus", "circletimes", "cire", "cirfnint", "cirmid", "cirscir"],
    l: ["clockwisecontourintegral", "closecurlydoublequote", "closecurlyquote", "clubs", "clubsuit"],
    o: ["colon", "colone", "coloneq", "comma", "commat", "comp", "compfn", "complement", "complexes", "cong", "congdot", "congruent", "conint", "contourintegral", "copf", "coprod", "coproduct", "copy", "copysr", "counterclockwisecontourintegral"],
    r: ["crarr", "cross"],
    s: ["cscr", "csub", "csube", "csup", "csupe"],
    t: ["ctdot"],
    u: ["cudarrl", "cudarrr", "cuepr", "cuesc", "cularr", "cularrp", "cup", "cupbrcap", "cupcap", "cupcup", "cupdot", "cupor", "cups", "curarr", "curarrm", "curlyeqprec", "curlyeqsucc", "curlyvee", "curlywedge", "curren", "curvearrowleft", "curvearrowright", "cuvee", "cuwed"],
    w: ["cwconint", "cwint"],
    y: ["cylcty"]
  };
  var d$2 = {
    a: ["dagger", "daleth", "darr", "dash", "dashv"],
    b: ["dbkarow", "dblac"],
    c: ["dcaron", "dcy"],
    d: ["dd", "ddagger", "ddarr", "ddotrahd", "ddotseq"],
    e: ["deg", "del", "delta", "demptyv"],
    f: ["dfisht", "dfr"],
    h: ["dhar", "dharl", "dharr"],
    i: ["diacriticalacute", "diacriticaldot", "diacriticaldoubleacute", "diacriticalgrave", "diacriticaltilde", "diam", "diamond", "diamondsuit", "diams", "die", "differentiald", "digamma", "disin", "div", "divide", "divideontimes", "divonx"],
    j: ["djcy"],
    l: ["dlcorn", "dlcrop"],
    o: ["dollar", "dopf", "dot", "dotdot", "doteq", "doteqdot", "dotequal", "dotminus", "dotplus", "dotsquare", "doublebarwedge", "doublecontourintegral", "doubledot", "doubledownarrow", "doubleleftarrow", "doubleleftrightarrow", "doublelefttee", "doublelongleftarrow", "doublelongleftrightarrow", "doublelongrightarrow", "doublerightarrow", "doublerighttee", "doubleuparrow", "doubleupdownarrow", "doubleverticalbar", "downarrow", "downarrowbar", "downarrowuparrow", "downbreve", "downdownarrows", "downharpoonleft", "downharpoonright", "downleftrightvector", "downleftteevector", "downleftvector", "downleftvectorbar", "downrightteevector", "downrightvector", "downrightvectorbar", "downtee", "downteearrow"],
    r: ["drbkarow", "drcorn", "drcrop"],
    s: ["dscr", "dscy", "dsol", "dstrok"],
    t: ["dtdot", "dtri", "dtrif"],
    u: ["duarr", "duhar"],
    w: ["dwangle"],
    z: ["dzcy", "dzigrarr"]
  };
  var e$2 = {
    a: ["eacute", "easter"],
    c: ["ecaron", "ecir", "ecirc", "ecolon", "ecy"],
    d: ["eddot", "edot"],
    e: ["ee"],
    f: ["efdot", "efr"],
    g: ["eg", "egrave", "egs", "egsdot"],
    l: ["el", "element", "elinters", "ell", "els", "elsdot"],
    m: ["emacr", "empty", "emptyset", "emptysmallsquare", "emptyv", "emptyverysmallsquare", "emsp", "emsp13", "emsp14"],
    n: ["eng", "ensp"],
    o: ["eogon", "eopf"],
    p: ["epar", "eparsl", "eplus", "epsi", "epsilon", "epsiv"],
    q: ["eqcirc", "eqcolon", "eqsim", "eqslantgtr", "eqslantless", "equal", "equals", "equaltilde", "equest", "equilibrium", "equiv", "equivdd", "eqvparsl"],
    r: ["erarr", "erdot"],
    s: ["escr", "esdot", "esim"],
    t: ["eta", "eth"],
    u: ["euml", "euro"],
    x: ["excl", "exist", "exists", "expectation", "exponentiale"]
  };
  var f$2 = {
    a: ["fallingdotseq"],
    c: ["fcy"],
    e: ["female"],
    f: ["ffilig", "fflig", "ffllig", "ffr"],
    i: ["filig", "filledsmallsquare", "filledverysmallsquare"],
    j: ["fjlig"],
    l: ["flat", "fllig", "fltns"],
    n: ["fnof"],
    o: ["fopf", "forall", "fork", "forkv", "fouriertrf"],
    p: ["fpartint"],
    r: ["frac12", "frac13", "frac14", "frac15", "frac16", "frac18", "frac23", "frac25", "frac34", "frac35", "frac38", "frac45", "frac56", "frac58", "frac78", "frasl", "frown"],
    s: ["fscr"]
  };
  var g$2 = {
    a: ["gacute", "gamma", "gammad", "gap"],
    b: ["gbreve"],
    c: ["gcedil", "gcirc", "gcy"],
    d: ["gdot"],
    e: ["ge", "gel", "geq", "geqq", "geqslant", "ges", "gescc", "gesdot", "gesdoto", "gesdotol", "gesl", "gesles"],
    f: ["gfr"],
    g: ["gg", "ggg"],
    i: ["gimel"],
    j: ["gjcy"],
    l: ["gl", "gla", "gle", "glj"],
    n: ["gnap", "gnapprox", "gne", "gneq", "gneqq", "gnsim"],
    o: ["gopf"],
    r: ["grave", "greaterequal", "greaterequalless", "greaterfullequal", "greatergreater", "greaterless", "greaterslantequal", "greatertilde"],
    s: ["gscr", "gsim", "gsime", "gsiml"],
    t: ["gt", "gtcc", "gtcir", "gtdot", "gtlpar", "gtquest", "gtrapprox", "gtrarr", "gtrdot", "gtreqless", "gtreqqless", "gtrless", "gtrsim"],
    v: ["gvertneqq", "gvne"]
  };
  var h$2 = {
    a: ["hacek", "hairsp", "half", "hamilt", "hardcy", "harr", "harrcir", "harrw", "hat"],
    b: ["hbar"],
    c: ["hcirc"],
    e: ["hearts", "heartsuit", "hellip", "hercon"],
    f: ["hfr"],
    i: ["hilbertspace"],
    k: ["hksearow", "hkswarow"],
    o: ["hoarr", "homtht", "hookleftarrow", "hookrightarrow", "hopf", "horbar", "horizontalline"],
    s: ["hscr", "hslash", "hstrok"],
    u: ["humpdownhump", "humpequal"],
    y: ["hybull", "hyphen"]
  };
  var i$2 = {
    a: ["iacute"],
    c: ["ic", "icirc", "icy"],
    d: ["idot"],
    e: ["iecy", "iexcl"],
    f: ["iff", "ifr"],
    g: ["igrave"],
    i: ["ii", "iiiint", "iiint", "iinfin", "iiota"],
    j: ["ijlig"],
    m: ["im", "imacr", "image", "imaginaryi", "imagline", "imagpart", "imath", "imof", "imped", "implies"],
    n: ["in", "incare", "infin", "infintie", "inodot", "int", "intcal", "integers", "integral", "intercal", "intersection", "intlarhk", "intprod", "invisiblecomma", "invisibletimes"],
    o: ["iocy", "iogon", "iopf", "iota"],
    p: ["iprod"],
    q: ["iquest"],
    s: ["iscr", "isin", "isindot", "isine", "isins", "isinsv", "isinv"],
    t: ["it", "itilde"],
    u: ["iukcy", "iuml"]
  };
  var j$2 = {
    c: ["jcirc", "jcy"],
    f: ["jfr"],
    m: ["jmath"],
    o: ["jopf"],
    s: ["jscr", "jsercy"],
    u: ["jukcy"]
  };
  var k$2 = {
    a: ["kappa", "kappav"],
    c: ["kcedil", "kcy"],
    f: ["kfr"],
    g: ["kgreen"],
    h: ["khcy"],
    j: ["kjcy"],
    o: ["kopf"],
    s: ["kscr"]
  };
  var l$2 = {
    a: ["laarr", "lacute", "laemptyv", "lagran", "lambda", "lang", "langd", "langle", "lap", "laplacetrf", "laquo", "larr", "larrb", "larrbfs", "larrfs", "larrhk", "larrlp", "larrpl", "larrsim", "larrtl", "lat", "latail", "late", "lates"],
    b: ["lbarr", "lbbrk", "lbrace", "lbrack", "lbrke", "lbrksld", "lbrkslu"],
    c: ["lcaron", "lcedil", "lceil", "lcub", "lcy"],
    d: ["ldca", "ldquo", "ldquor", "ldrdhar", "ldrushar", "ldsh"],
    e: ["le", "leftanglebracket", "leftarrow", "leftarrowbar", "leftarrowrightarrow", "leftarrowtail", "leftceiling", "leftdoublebracket", "leftdownteevector", "leftdownvector", "leftdownvectorbar", "leftfloor", "leftharpoondown", "leftharpoonup", "leftleftarrows", "leftrightarrow", "leftrightarrows", "leftrightharpoons", "leftrightsquigarrow", "leftrightvector", "lefttee", "leftteearrow", "leftteevector", "leftthreetimes", "lefttriangle", "lefttrianglebar", "lefttriangleequal", "leftupdownvector", "leftupteevector", "leftupvector", "leftupvectorbar", "leftvector", "leftvectorbar", "leg", "leq", "leqq", "leqslant", "les", "lescc", "lesdot", "lesdoto", "lesdotor", "lesg", "lesges", "lessapprox", "lessdot", "lesseqgtr", "lesseqqgtr", "lessequalgreater", "lessfullequal", "lessgreater", "lessgtr", "lessless", "lesssim", "lessslantequal", "lesstilde"],
    f: ["lfisht", "lfloor", "lfr"],
    g: ["lg", "lge"],
    h: ["lhar", "lhard", "lharu", "lharul", "lhblk"],
    j: ["ljcy"],
    l: ["ll", "llarr", "llcorner", "lleftarrow", "llhard", "lltri"],
    m: ["lmidot", "lmoust", "lmoustache"],
    n: ["lnap", "lnapprox", "lne", "lneq", "lneqq", "lnsim"],
    o: ["loang", "loarr", "lobrk", "longleftarrow", "longleftrightarrow", "longmapsto", "longrightarrow", "looparrowleft", "looparrowright", "lopar", "lopf", "loplus", "lotimes", "lowast", "lowbar", "lowerleftarrow", "lowerrightarrow", "loz", "lozenge", "lozf"],
    p: ["lpar", "lparlt"],
    r: ["lrarr", "lrcorner", "lrhar", "lrhard", "lrm", "lrtri"],
    s: ["lsaquo", "lscr", "lsh", "lsim", "lsime", "lsimg", "lsqb", "lsquo", "lsquor", "lstrok"],
    t: ["lt", "ltcc", "ltcir", "ltdot", "lthree", "ltimes", "ltlarr", "ltquest", "ltri", "ltrie", "ltrif", "ltrpar"],
    u: ["lurdshar", "luruhar"],
    v: ["lvertneqq", "lvne"]
  };
  var m$2 = {
    a: ["macr", "male", "malt", "maltese", "map", "mapsto", "mapstodown", "mapstoleft", "mapstoup", "marker"],
    c: ["mcomma", "mcy"],
    d: ["mdash", "mddot"],
    e: ["measuredangle", "mediumspace", "mellintrf"],
    f: ["mfr"],
    h: ["mho"],
    i: ["micro", "mid", "midast", "midcir", "middot", "minus", "minusb", "minusd", "minusdu", "minusplus"],
    l: ["mlcp", "mldr"],
    n: ["mnplus"],
    o: ["models", "mopf"],
    p: ["mp"],
    s: ["mscr", "mstpos"],
    u: ["mu", "multimap", "mumap"]
  };
  var n$2 = {
    a: ["nabla", "nacute", "nang", "nap", "nape", "napid", "napos", "napprox", "natur", "natural", "naturals"],
    b: ["nbsp", "nbump", "nbumpe"],
    c: ["ncap", "ncaron", "ncedil", "ncong", "ncongdot", "ncup", "ncy"],
    d: ["ndash"],
    e: ["ne", "nearhk", "nearr", "nearrow", "nedot", "negativemediumspace", "negativethickspace", "negativethinspace", "negativeverythinspace", "nequiv", "nesear", "nesim", "nestedgreatergreater", "nestedlessless", "newline", "nexist", "nexists"],
    f: ["nfr"],
    g: ["nge", "ngeq", "ngeqq", "ngeqslant", "nges", "ngg", "ngsim", "ngt", "ngtr", "ngtv"],
    h: ["nharr", "nhpar"],
    i: ["ni", "nis", "nisd", "niv"],
    j: ["njcy"],
    l: ["nlarr", "nldr", "nle", "nleftarrow", "nleftrightarrow", "nleq", "nleqq", "nleqslant", "nles", "nless", "nll", "nlsim", "nlt", "nltri", "nltrie", "nltv"],
    m: ["nmid"],
    o: ["nobreak", "nonbreakingspace", "nopf", "not", "notcongruent", "notcupcap", "notdoubleverticalbar", "notelement", "notequal", "notequaltilde", "notexists", "notgreater", "notgreaterequal", "notgreaterfullequal", "notgreatergreater", "notgreaterless", "notgreaterslantequal", "notgreatertilde", "nothumpdownhump", "nothumpequal", "notin", "notindot", "notine", "notinva", "notinvb", "notinvc", "notlefttriangle", "notlefttrianglebar", "notlefttriangleequal", "notless", "notlessequal", "notlessgreater", "notlessless", "notlessslantequal", "notlesstilde", "notnestedgreatergreater", "notnestedlessless", "notni", "notniva", "notnivb", "notnivc", "notprecedes", "notprecedesequal", "notprecedesslantequal", "notreverseelement", "notrighttriangle", "notrighttrianglebar", "notrighttriangleequal", "notsquaresubset", "notsquaresubsetequal", "notsquaresuperset", "notsquaresupersetequal", "notsubset", "notsubsetequal", "notsucceeds", "notsucceedsequal", "notsucceedsslantequal", "notsucceedstilde", "notsuperset", "notsupersetequal", "nottilde", "nottildeequal", "nottildefullequal", "nottildetilde", "notverticalbar"],
    p: ["npar", "nparallel", "nparsl", "npart", "npolint", "npr", "nprcue", "npre", "nprec", "npreceq"],
    r: ["nrarr", "nrarrc", "nrarrw", "nrightarrow", "nrtri", "nrtrie"],
    s: ["nsc", "nsccue", "nsce", "nscr", "nshortmid", "nshortparallel", "nsim", "nsime", "nsimeq", "nsmid", "nspar", "nsqsube", "nsqsupe", "nsub", "nsube", "nsubset", "nsubseteq", "nsubseteqq", "nsucc", "nsucceq", "nsup", "nsupe", "nsupset", "nsupseteq", "nsupseteqq"],
    t: ["ntgl", "ntilde", "ntlg", "ntriangleleft", "ntrianglelefteq", "ntriangleright", "ntrianglerighteq"],
    u: ["nu", "num", "numero", "numsp"],
    v: ["nvap", "nvdash", "nvge", "nvgt", "nvharr", "nvinfin", "nvlarr", "nvle", "nvlt", "nvltrie", "nvrarr", "nvrtrie", "nvsim"],
    w: ["nwarhk", "nwarr", "nwarrow", "nwnear"]
  };
  var o$2 = {
    a: ["oacute", "oast"],
    c: ["ocir", "ocirc", "ocy"],
    d: ["odash", "odblac", "odiv", "odot", "odsold"],
    e: ["oelig"],
    f: ["ofcir", "ofr"],
    g: ["ogon", "ograve", "ogt"],
    h: ["ohbar", "ohm"],
    i: ["oint"],
    l: ["olarr", "olcir", "olcross", "oline", "olt"],
    m: ["omacr", "omega", "omicron", "omid", "ominus"],
    o: ["oopf"],
    p: ["opar", "opencurlydoublequote", "opencurlyquote", "operp", "oplus"],
    r: ["or", "orarr", "ord", "order", "orderof", "ordf", "ordm", "origof", "oror", "orslope", "orv"],
    s: ["os", "oscr", "oslash", "osol"],
    t: ["otilde", "otimes", "otimesas"],
    u: ["ouml"],
    v: ["ovbar", "overbar", "overbrace", "overbracket", "overparenthesis"]
  };
  var p$2 = {
    a: ["par", "para", "parallel", "parsim", "parsl", "part", "partiald"],
    c: ["pcy"],
    e: ["percnt", "period", "permil", "perp", "pertenk"],
    f: ["pfr"],
    h: ["phi", "phiv", "phmmat", "phone"],
    i: ["pi", "pitchfork", "piv"],
    l: ["planck", "planckh", "plankv", "plus", "plusacir", "plusb", "pluscir", "plusdo", "plusdu", "pluse", "plusminus", "plusmn", "plussim", "plustwo"],
    m: ["pm"],
    o: ["poincareplane", "pointint", "popf", "pound"],
    r: ["pr", "prap", "prcue", "pre", "prec", "precapprox", "preccurlyeq", "precedes", "precedesequal", "precedesslantequal", "precedestilde", "preceq", "precnapprox", "precneqq", "precnsim", "precsim", "prime", "primes", "prnap", "prne", "prnsim", "prod", "product", "profalar", "profline", "profsurf", "prop", "proportion", "proportional", "propto", "prsim", "prurel"],
    s: ["pscr", "psi"],
    u: ["puncsp"]
  };
  var q$2 = {
    f: ["qfr"],
    i: ["qint"],
    o: ["qopf"],
    p: ["qprime"],
    s: ["qscr"],
    u: ["quaternions", "quatint", "quest", "questeq", "quot"]
  };
  var r$2 = {
    a: ["raarr", "race", "racute", "radic", "raemptyv", "rang", "rangd", "range", "rangle", "raquo", "rarr", "rarrap", "rarrb", "rarrbfs", "rarrc", "rarrfs", "rarrhk", "rarrlp", "rarrpl", "rarrsim", "rarrtl", "rarrw", "ratail", "ratio", "rationals"],
    b: ["rbarr", "rbbrk", "rbrace", "rbrack", "rbrke", "rbrksld", "rbrkslu"],
    c: ["rcaron", "rcedil", "rceil", "rcub", "rcy"],
    d: ["rdca", "rdldhar", "rdquo", "rdquor", "rdsh"],
    e: ["re", "real", "realine", "realpart", "reals", "rect", "reg", "reverseelement", "reverseequilibrium", "reverseupequilibrium"],
    f: ["rfisht", "rfloor", "rfr"],
    h: ["rhar", "rhard", "rharu", "rharul", "rho", "rhov"],
    i: ["rightanglebracket", "rightarrow", "rightarrowbar", "rightarrowleftarrow", "rightarrowtail", "rightceiling", "rightdoublebracket", "rightdownteevector", "rightdownvector", "rightdownvectorbar", "rightfloor", "rightharpoondown", "rightharpoonup", "rightleftarrows", "rightleftharpoons", "rightrightarrows", "rightsquigarrow", "righttee", "rightteearrow", "rightteevector", "rightthreetimes", "righttriangle", "righttrianglebar", "righttriangleequal", "rightupdownvector", "rightupteevector", "rightupvector", "rightupvectorbar", "rightvector", "rightvectorbar", "ring", "risingdotseq"],
    l: ["rlarr", "rlhar", "rlm"],
    m: ["rmoust", "rmoustache"],
    n: ["rnmid"],
    o: ["roang", "roarr", "robrk", "ropar", "ropf", "roplus", "rotimes", "roundimplies"],
    p: ["rpar", "rpargt", "rppolint"],
    r: ["rrarr", "rrightarrow"],
    s: ["rsaquo", "rscr", "rsh", "rsqb", "rsquo", "rsquor"],
    t: ["rthree", "rtimes", "rtri", "rtrie", "rtrif", "rtriltri"],
    u: ["ruledelayed", "ruluhar"],
    x: ["rx"]
  };
  var s$2 = {
    a: ["sacute"],
    b: ["sbquo"],
    c: ["sc", "scap", "scaron", "sccue", "sce", "scedil", "scirc", "scnap", "scne", "scnsim", "scpolint", "scsim", "scy"],
    d: ["sdot", "sdotb", "sdote"],
    e: ["searhk", "searr", "searrow", "sect", "semi", "seswar", "setminus", "setmn", "sext"],
    f: ["sfr", "sfrown"],
    h: ["sharp", "shchcy", "shcy", "shortdownarrow", "shortleftarrow", "shortmid", "shortparallel", "shortrightarrow", "shortuparrow", "shy"],
    i: ["sigma", "sigmaf", "sigmav", "sim", "simdot", "sime", "simeq", "simg", "simge", "siml", "simle", "simne", "simplus", "simrarr"],
    l: ["slarr"],
    m: ["smallcircle", "smallsetminus", "smashp", "smeparsl", "smid", "smile", "smt", "smte", "smtes"],
    o: ["softcy", "sol", "solb", "solbar", "sopf"],
    p: ["spades", "spadesuit", "spar"],
    q: ["sqcap", "sqcaps", "sqcup", "sqcups", "sqrt", "sqsub", "sqsube", "sqsubset", "sqsubseteq", "sqsup", "sqsupe", "sqsupset", "sqsupseteq", "squ", "square", "squareintersection", "squaresubset", "squaresubsetequal", "squaresuperset", "squaresupersetequal", "squareunion", "squarf", "squf"],
    r: ["srarr"],
    s: ["sscr", "ssetmn", "ssmile", "sstarf"],
    t: ["star", "starf", "straightepsilon", "straightphi", "strns"],
    u: ["sub", "subdot", "sube", "subedot", "submult", "subne", "subplus", "subrarr", "subset", "subseteq", "subseteqq", "subsetequal", "subsetneq", "subsetneqq", "subsim", "subsub", "subsup", "succ", "succapprox", "succcurlyeq", "succeeds", "succeedsequal", "succeedsslantequal", "succeedstilde", "succeq", "succnapprox", "succneqq", "succnsim", "succsim", "suchthat", "sum", "sung", "sup", "sup1", "sup2", "sup3", "supdot", "supdsub", "supe", "supedot", "superset", "supersetequal", "suphsol", "suphsub", "suplarr", "supmult", "supne", "supplus", "supset", "supseteq", "supseteqq", "supsetneq", "supsetneqq", "supsim", "supsub", "supsup"],
    w: ["swarhk", "swarr", "swarrow", "swnwar"],
    z: ["szlig"]
  };
  var t$2 = {
    a: ["tab", "target", "tau"],
    b: ["tbrk"],
    c: ["tcaron", "tcedil", "tcy"],
    d: ["tdot"],
    e: ["telrec"],
    f: ["tfr"],
    h: ["there4", "therefore", "theta", "thetasym", "thetav", "thickapprox", "thicksim", "thickspace", "thinsp", "thinspace", "thkap", "thksim", "thorn"],
    i: ["tilde", "tildeequal", "tildefullequal", "tildetilde", "times", "timesb", "timesbar", "timesd", "tint"],
    o: ["toea", "top", "topbot", "topcir", "topf", "topfork", "tosa"],
    p: ["tprime"],
    r: ["trade", "triangle", "triangledown", "triangleleft", "trianglelefteq", "triangleq", "triangleright", "trianglerighteq", "tridot", "trie", "triminus", "tripledot", "triplus", "trisb", "tritime", "trpezium"],
    s: ["tscr", "tscy", "tshcy", "tstrok"],
    w: ["twixt", "twoheadleftarrow", "twoheadrightarrow"]
  };
  var u$2 = {
    a: ["uacute", "uarr", "uarrocir"],
    b: ["ubrcy", "ubreve"],
    c: ["ucirc", "ucy"],
    d: ["udarr", "udblac", "udhar"],
    f: ["ufisht", "ufr"],
    g: ["ugrave"],
    h: ["uhar", "uharl", "uharr", "uhblk"],
    l: ["ulcorn", "ulcorner", "ulcrop", "ultri"],
    m: ["umacr", "uml"],
    n: ["underbar", "underbrace", "underbracket", "underparenthesis", "union", "unionplus"],
    o: ["uogon", "uopf"],
    p: ["uparrow", "uparrowbar", "uparrowdownarrow", "updownarrow", "upequilibrium", "upharpoonleft", "upharpoonright", "uplus", "upperleftarrow", "upperrightarrow", "upsi", "upsih", "upsilon", "uptee", "upteearrow", "upuparrows"],
    r: ["urcorn", "urcorner", "urcrop", "uring", "urtri"],
    s: ["uscr"],
    t: ["utdot", "utilde", "utri", "utrif"],
    u: ["uuarr", "uuml"],
    w: ["uwangle"]
  };
  var v$2 = {
    a: ["vangrt", "varepsilon", "varkappa", "varnothing", "varphi", "varpi", "varpropto", "varr", "varrho", "varsigma", "varsubsetneq", "varsubsetneqq", "varsupsetneq", "varsupsetneqq", "vartheta", "vartriangleleft", "vartriangleright"],
    b: ["vbar", "vbarv"],
    c: ["vcy"],
    d: ["vdash", "vdashl"],
    e: ["vee", "veebar", "veeeq", "vellip", "verbar", "vert", "verticalbar", "verticalline", "verticalseparator", "verticaltilde", "verythinspace"],
    f: ["vfr"],
    l: ["vltri"],
    n: ["vnsub", "vnsup"],
    o: ["vopf"],
    p: ["vprop"],
    r: ["vrtri"],
    s: ["vscr", "vsubne", "vsupne"],
    v: ["vvdash"],
    z: ["vzigzag"]
  };
  var w$2 = {
    c: ["wcirc"],
    e: ["wedbar", "wedge", "wedgeq", "weierp"],
    f: ["wfr"],
    o: ["wopf"],
    p: ["wp"],
    r: ["wr", "wreath"],
    s: ["wscr"]
  };
  var x$2 = {
    c: ["xcap", "xcirc", "xcup"],
    d: ["xdtri"],
    f: ["xfr"],
    h: ["xharr"],
    i: ["xi"],
    l: ["xlarr"],
    m: ["xmap"],
    n: ["xnis"],
    o: ["xodot", "xopf", "xoplus", "xotime"],
    r: ["xrarr"],
    s: ["xscr", "xsqcup"],
    u: ["xuplus", "xutri"],
    v: ["xvee"],
    w: ["xwedge"]
  };
  var y$2 = {
    a: ["yacute", "yacy"],
    c: ["ycirc", "ycy"],
    e: ["yen"],
    f: ["yfr"],
    i: ["yicy"],
    o: ["yopf"],
    s: ["yscr"],
    u: ["yucy", "yuml"]
  };
  var z$2 = {
    a: ["zacute"],
    c: ["zcaron", "zcy"],
    d: ["zdot"],
    e: ["zeetrf", "zerowidthspace", "zeta"],
    f: ["zfr"],
    h: ["zhcy"],
    i: ["zigrarr"],
    o: ["zopf"],
    s: ["zscr"],
    w: ["zwj", "zwnj"]
  };
  var startsWithCaseInsensitive = {
    a: a$2,
    b: b$2,
    c: c$2,
    d: d$2,
    e: e$2,
    f: f$2,
    g: g$2,
    h: h$2,
    i: i$2,
    j: j$2,
    k: k$2,
    l: l$2,
    m: m$2,
    n: n$2,
    o: o$2,
    p: p$2,
    q: q$2,
    r: r$2,
    s: s$2,
    t: t$2,
    u: u$2,
    v: v$2,
    w: w$2,
    x: x$2,
    y: y$2,
    z: z$2
  };
  var ac$1 = {
    addAmpIfSemiPresent: "edge only",
    addSemiIfAmpPresent: false
  };
  var acute$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Alpha$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var alpha$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var amp$1 = {
    addAmpIfSemiPresent: "edge only",
    addSemiIfAmpPresent: true
  };
  var And$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var and$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var ange$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var angle$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var angst$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var ap$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ape$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var approx$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Aring$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var aring$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var Ascr$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ascr$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Assign$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ast$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var atilde$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var Backslash$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var barwedge$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var becaus$1 = {
    addAmpIfSemiPresent: true,
    addSemiIfAmpPresent: "edge only"
  };
  var Because$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var because$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var bepsi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Bernoullis$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Beta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var beta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var beth$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var between$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var blank$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var block$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var bot$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var bottom$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var bowtie$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var breve$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var bull$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var bullet$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var bump$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var cacute$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Cap$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var cap$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var capand$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var caps$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var caret$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var caron$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var cedil$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Cedilla$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var cent$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var check$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var checkmark$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Chi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var chi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var cir$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var circ$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var clubs$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var clubsuit$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Colon$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var colon$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Colone$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var colone$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var comma$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var commat$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var comp$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var complement$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var complexes$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var cong$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Congruent$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var conint$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var copf$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var coprod$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var COPY$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var copy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Cross$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var cross$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Cup$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var cup$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var cups$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Dagger$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var dagger$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var daleth$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var darr$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var dash$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var DD$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var dd$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var deg$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Del$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Delta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var delta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var dharr$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var diam$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Diamond$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var diamond$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var diams$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var die$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var digamma$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var disin$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var div$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var divide$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var dollar$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var dopf$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Dot$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var dot$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var dsol$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var dtri$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var easter$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var ecir$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ecolon$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ecy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var edot$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ee$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var efr$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var eg$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var egrave$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var egs$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var el$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ell$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var els$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var empty$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var ENG$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var eng$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var epsi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Epsilon$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var epsilon$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Equal$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var equals$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var equest$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Equilibrium$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var equiv$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var escr$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var esim$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Eta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var eta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ETH$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var eth$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var euro$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var excl$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var exist$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Exists$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var expectation$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var female$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var flat$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var fork$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var frown$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Gamma$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var gamma$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var gap$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var gcy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ge$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var gel$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var geq$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ges$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var gesl$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var gg$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var gl$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var gla$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var gne$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var grave$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var GT$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var gt$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var half$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Hat$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var hearts$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var hopf$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var hyphen$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var ic$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var icy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var iff$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ii$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var image$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var imped$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var int$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var integers$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var iocy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var iogon$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var iota$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var isin$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var it$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Kappa$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var kappa$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var kopf$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Lambda$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var lambda$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var lang$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var lap$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var lat$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var late$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var lates$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var le$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var leg$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var leq$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var les$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var lg$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ll$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var lne$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var lozenge$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var lsh$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var LT$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var lt$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ltimes$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var male$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var malt$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var map$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var marker$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var mid$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var minus$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var models$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var mp$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var mu$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var nang$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nap$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var natural$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var naturals$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var ncy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ne$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nge$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ngt$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ni$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nis$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nle$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nles$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nless$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nlt$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nopf$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Not$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var not$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var nsc$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nsce$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var nu$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var num$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var ogt$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ohm$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var oline$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var olt$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Omega$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var omega$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Omicron$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var omicron$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var oopf$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var opar$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var or$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var order$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var oror$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var orv$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var osol$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var par$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var para$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var parallel$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var part$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var phi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var phone$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Pi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var pi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var pitchfork$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var plus$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var pm$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var popf$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var pound$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var pr$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var prime$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var primes$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var prod$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Product$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var prop$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Proportion$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Proportional$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var psi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var quest$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var QUOT$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var quot$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var race$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var rang$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var range$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var ratio$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Re$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var real$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var reals$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var rect$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var REG$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: true
  };
  var reg$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ring$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var rsh$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var sc$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var scap$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var sce$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var scy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var sdot$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var sect$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var semi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var sharp$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var shy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Sigma$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var sigma$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var sim$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var sol$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var spades$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var square$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Star$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var star$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Sub$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var sub$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var sube$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Sum$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var sum$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Tab$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var target$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Tau$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var tau$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var therefore$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Theta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var theta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var THORN$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var thorn$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Tilde$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var tilde$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var times$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var tint$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var top$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var tosa$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var TRADE$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var trade$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var triangle$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var trie$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ucy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var uml$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Union$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var uplus$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Upsi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var upsi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var uring$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var vee$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Vert$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var vert$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var wedge$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Wedge$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var wreath$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Xi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var xi$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Ycirc$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ycirc$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var ycy$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var yen$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var Zacute$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var zacute$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: "edge only"
  };
  var Zeta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var zeta$1 = {
    addAmpIfSemiPresent: false,
    addSemiIfAmpPresent: false
  };
  var uncertain = {
    ac: ac$1,
    acute: acute$1,
    Alpha: Alpha$1,
    alpha: alpha$1,
    amp: amp$1,
    And: And$1,
    and: and$1,
    ange: ange$1,
    angle: angle$1,
    angst: angst$1,
    ap: ap$1,
    ape: ape$1,
    approx: approx$1,
    Aring: Aring$1,
    aring: aring$1,
    Ascr: Ascr$1,
    ascr: ascr$1,
    Assign: Assign$1,
    ast: ast$1,
    atilde: atilde$1,
    Backslash: Backslash$1,
    barwedge: barwedge$1,
    becaus: becaus$1,
    Because: Because$1,
    because: because$1,
    bepsi: bepsi$1,
    Bernoullis: Bernoullis$1,
    Beta: Beta$1,
    beta: beta$1,
    beth: beth$1,
    between: between$1,
    blank: blank$1,
    block: block$1,
    bot: bot$1,
    bottom: bottom$1,
    bowtie: bowtie$1,
    breve: breve$1,
    bull: bull$1,
    bullet: bullet$1,
    bump: bump$1,
    cacute: cacute$1,
    Cap: Cap$1,
    cap: cap$1,
    capand: capand$1,
    caps: caps$1,
    caret: caret$1,
    caron: caron$1,
    cedil: cedil$1,
    Cedilla: Cedilla$1,
    cent: cent$1,
    check: check$1,
    checkmark: checkmark$1,
    Chi: Chi$1,
    chi: chi$1,
    cir: cir$1,
    circ: circ$1,
    clubs: clubs$1,
    clubsuit: clubsuit$1,
    Colon: Colon$1,
    colon: colon$1,
    Colone: Colone$1,
    colone: colone$1,
    comma: comma$1,
    commat: commat$1,
    comp: comp$1,
    complement: complement$1,
    complexes: complexes$1,
    cong: cong$1,
    Congruent: Congruent$1,
    conint: conint$1,
    copf: copf$1,
    coprod: coprod$1,
    COPY: COPY$1,
    copy: copy$1,
    Cross: Cross$1,
    cross: cross$1,
    Cup: Cup$1,
    cup: cup$1,
    cups: cups$1,
    Dagger: Dagger$1,
    dagger: dagger$1,
    daleth: daleth$1,
    darr: darr$1,
    dash: dash$1,
    DD: DD$1,
    dd: dd$1,
    deg: deg$1,
    Del: Del$1,
    Delta: Delta$1,
    delta: delta$1,
    dharr: dharr$1,
    diam: diam$1,
    Diamond: Diamond$1,
    diamond: diamond$1,
    diams: diams$1,
    die: die$1,
    digamma: digamma$1,
    disin: disin$1,
    div: div$1,
    divide: divide$1,
    dollar: dollar$1,
    dopf: dopf$1,
    Dot: Dot$1,
    dot: dot$1,
    dsol: dsol$1,
    dtri: dtri$1,
    easter: easter$1,
    ecir: ecir$1,
    ecolon: ecolon$1,
    ecy: ecy$1,
    edot: edot$1,
    ee: ee$1,
    efr: efr$1,
    eg: eg$1,
    egrave: egrave$1,
    egs: egs$1,
    el: el$1,
    ell: ell$1,
    els: els$1,
    empty: empty$1,
    ENG: ENG$1,
    eng: eng$1,
    epsi: epsi$1,
    Epsilon: Epsilon$1,
    epsilon: epsilon$1,
    Equal: Equal$1,
    equals: equals$1,
    equest: equest$1,
    Equilibrium: Equilibrium$1,
    equiv: equiv$1,
    escr: escr$1,
    esim: esim$1,
    Eta: Eta$1,
    eta: eta$1,
    ETH: ETH$1,
    eth: eth$1,
    euro: euro$1,
    excl: excl$1,
    exist: exist$1,
    Exists: Exists$1,
    expectation: expectation$1,
    female: female$1,
    flat: flat$1,
    fork: fork$1,
    frown: frown$1,
    Gamma: Gamma$1,
    gamma: gamma$1,
    gap: gap$1,
    gcy: gcy$1,
    ge: ge$1,
    gel: gel$1,
    geq: geq$1,
    ges: ges$1,
    gesl: gesl$1,
    gg: gg$1,
    gl: gl$1,
    gla: gla$1,
    gne: gne$1,
    grave: grave$1,
    GT: GT$1,
    gt: gt$1,
    half: half$1,
    Hat: Hat$1,
    hearts: hearts$1,
    hopf: hopf$1,
    hyphen: hyphen$1,
    ic: ic$1,
    icy: icy$1,
    iff: iff$1,
    ii: ii$1,
    image: image$1,
    imped: imped$1,
    "in": {
      addAmpIfSemiPresent: false,
      addSemiIfAmpPresent: false
    },
    int: int$1,
    integers: integers$1,
    iocy: iocy$1,
    iogon: iogon$1,
    iota: iota$1,
    isin: isin$1,
    it: it$1,
    Kappa: Kappa$1,
    kappa: kappa$1,
    kopf: kopf$1,
    Lambda: Lambda$1,
    lambda: lambda$1,
    lang: lang$1,
    lap: lap$1,
    lat: lat$1,
    late: late$1,
    lates: lates$1,
    le: le$1,
    leg: leg$1,
    leq: leq$1,
    les: les$1,
    lg: lg$1,
    ll: ll$1,
    lne: lne$1,
    lozenge: lozenge$1,
    lsh: lsh$1,
    LT: LT$1,
    lt: lt$1,
    ltimes: ltimes$1,
    male: male$1,
    malt: malt$1,
    map: map$1,
    marker: marker$1,
    mid: mid$1,
    minus: minus$1,
    models: models$1,
    mp: mp$1,
    mu: mu$1,
    nang: nang$1,
    nap: nap$1,
    natural: natural$1,
    naturals: naturals$1,
    ncy: ncy$1,
    ne: ne$1,
    nge: nge$1,
    ngt: ngt$1,
    ni: ni$1,
    nis: nis$1,
    nle: nle$1,
    nles: nles$1,
    nless: nless$1,
    nlt: nlt$1,
    nopf: nopf$1,
    Not: Not$1,
    not: not$1,
    nsc: nsc$1,
    nsce: nsce$1,
    nu: nu$1,
    num: num$1,
    ogt: ogt$1,
    ohm: ohm$1,
    oline: oline$1,
    olt: olt$1,
    Omega: Omega$1,
    omega: omega$1,
    Omicron: Omicron$1,
    omicron: omicron$1,
    oopf: oopf$1,
    opar: opar$1,
    or: or$1,
    order: order$1,
    oror: oror$1,
    orv: orv$1,
    osol: osol$1,
    par: par$1,
    para: para$1,
    parallel: parallel$1,
    part: part$1,
    phi: phi$1,
    phone: phone$1,
    Pi: Pi$1,
    pi: pi$1,
    pitchfork: pitchfork$1,
    plus: plus$1,
    pm: pm$1,
    popf: popf$1,
    pound: pound$1,
    pr: pr$1,
    prime: prime$1,
    primes: primes$1,
    prod: prod$1,
    Product: Product$1,
    prop: prop$1,
    Proportion: Proportion$1,
    Proportional: Proportional$1,
    psi: psi$1,
    quest: quest$1,
    QUOT: QUOT$1,
    quot: quot$1,
    race: race$1,
    rang: rang$1,
    range: range$1,
    ratio: ratio$1,
    Re: Re$1,
    real: real$1,
    reals: reals$1,
    rect: rect$1,
    REG: REG$1,
    reg: reg$1,
    ring: ring$1,
    rsh: rsh$1,
    sc: sc$1,
    scap: scap$1,
    sce: sce$1,
    scy: scy$1,
    sdot: sdot$1,
    sect: sect$1,
    semi: semi$1,
    sharp: sharp$1,
    shy: shy$1,
    Sigma: Sigma$1,
    sigma: sigma$1,
    sim: sim$1,
    sol: sol$1,
    spades: spades$1,
    square: square$1,
    Star: Star$1,
    star: star$1,
    Sub: Sub$1,
    sub: sub$1,
    sube: sube$1,
    Sum: Sum$1,
    sum: sum$1,
    Tab: Tab$1,
    target: target$1,
    Tau: Tau$1,
    tau: tau$1,
    therefore: therefore$1,
    Theta: Theta$1,
    theta: theta$1,
    THORN: THORN$1,
    thorn: thorn$1,
    Tilde: Tilde$1,
    tilde: tilde$1,
    times: times$1,
    tint: tint$1,
    top: top$1,
    tosa: tosa$1,
    TRADE: TRADE$1,
    trade: trade$1,
    triangle: triangle$1,
    trie: trie$1,
    ucy: ucy$1,
    uml: uml$1,
    Union: Union$1,
    uplus: uplus$1,
    Upsi: Upsi$1,
    upsi: upsi$1,
    uring: uring$1,
    vee: vee$1,
    Vert: Vert$1,
    vert: vert$1,
    wedge: wedge$1,
    Wedge: Wedge$1,
    wreath: wreath$1,
    Xi: Xi$1,
    xi: xi$1,
    Ycirc: Ycirc$1,
    ycirc: ycirc$1,
    ycy: ycy$1,
    yen: yen$1,
    Zacute: Zacute$1,
    zacute: zacute$1,
    Zeta: Zeta$1,
    zeta: zeta$1
  };

  function decode(ent) {
    if (typeof ent !== "string" || !ent.length || !ent.startsWith("&") || !ent.endsWith(";")) {
      throw new Error(`all-named-html-entities/decode(): [THROW_ID_01] Input must be an HTML entity with leading ampersand and trailing semicolon, but "${ent}" was given`);
    }

    const val = ent.slice(1, ent.length - 1);
    return allNamedEntities[val] ? allNamedEntities[val] : null;
  }
  const maxLength = 31;

  /**
   * string-fix-broken-named-entities
   * Finds and fixes common and not so common broken named HTML entities, returns ranges array of fixes
   * Version: 2.5.10
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-fix-broken-named-entities
   */
  const isArr = Array.isArray;

  function stringFixBrokenNamedEntities(str, originalOpts) {
    function resemblesNumericEntity(str, from, to) {
      let lettersCount = 0;
      let numbersCount = 0;
      let othersCount = 0;
      let hashesCount = 0;
      let whitespaceCount = 0;
      let numbersValue = "";
      let charTrimmed = "";

      for (let i = from; i < to; i++) {
        if (str[i].trim().length) {
          charTrimmed += str[i];
        } else {
          whitespaceCount++;
        }

        if (isLatinLetter(str[i])) {
          lettersCount++;
        } else if (isNumber(str[i])) {
          numbersCount++;
          numbersValue += String(str[i]);
        } else if (str[i] === "#") {
          hashesCount++;
        } else {
          othersCount++;
        }
      }

      let probablyNumeric = false;

      if (!lettersCount && numbersCount > othersCount) {
        probablyNumeric = "deci";
      } else if ((numbersCount || lettersCount) && (charTrimmed[0] === "#" && charTrimmed[1].toLowerCase() === "x" && (isNumber(charTrimmed[2]) || isLatinLetter(charTrimmed[2])) || charTrimmed[0].toLowerCase() === "x" && numbersCount && !othersCount)) {
        probablyNumeric = "hexi";
      }

      return {
        probablyNumeric,
        lettersCount,
        numbersCount,
        numbersValue,
        hashesCount,
        othersCount,
        charTrimmed,
        whitespaceCount
      };
    }

    function isNotaLetter(str) {
      return !(typeof str === "string" && str.length === 1 && str.toUpperCase() !== str.toLowerCase());
    }

    function isStr(something) {
      return typeof something === "string";
    }

    function isLatinLetter(something) {
      return typeof something === "string" && (something.charCodeAt(0) > 96 && something.charCodeAt(0) < 123 || something.charCodeAt(0) > 64 && something.charCodeAt(0) < 91);
    }

    function isLatinLetterOrNumberOrHash(char) {
      return isStr(char) && char.length === 1 && (char.charCodeAt(0) > 96 && char.charCodeAt(0) < 123 || char.charCodeAt(0) > 47 && char.charCodeAt(0) < 58 || char.charCodeAt(0) > 64 && char.charCodeAt(0) < 91 || char.charCodeAt(0) === 35);
    }

    function isNumber(something) {
      return isStr(something) && something.charCodeAt(0) > 47 && something.charCodeAt(0) < 58;
    }

    function onlyContainsNbsp(str, from, to) {
      for (let i = from; i < to; i++) {
        if (str[i].trim().length && !`nbsp`.includes(str[i].toLowerCase())) {
          return false;
        }
      }

      return true;
    }

    function findLongest(temp1) {
      if (isArr(temp1) && temp1.length) {
        if (temp1.length === 1) {
          return temp1[0];
        }

        return temp1.reduce((accum, tempObj) => {
          if (tempObj.tempEnt.length > accum.tempEnt.length) {
            return tempObj;
          }

          return accum;
        });
      }

      return temp1;
    }

    function removeGappedFromMixedCases(temp1) {
      let copy;

      if (isArr(temp1) && temp1.length) {
        copy = Array.from(temp1);

        if (copy.length > 1 && copy.some(entityObj => str[right(str, entityObj.tempRes.rightmostChar)] === ";") && copy.some(entityObj => str[right(str, entityObj.tempRes.rightmostChar)] !== ";")) {
          copy = copy.filter(entityObj => str[right(str, entityObj.tempRes.rightmostChar)] === ";");
        }

        if (!(copy.every(entObj => !entObj || !entObj.tempRes || !entObj.tempRes.gaps || !isArr(entObj.tempRes.gaps) || !entObj.tempRes.gaps.length) || copy.every(entObj => entObj && entObj.tempRes && entObj.tempRes.gaps && isArr(entObj.tempRes.gaps) && entObj.tempRes.gaps.length))) {
          return findLongest(copy.filter(entObj => !entObj.tempRes.gaps || !isArr(entObj.tempRes.gaps) || !entObj.tempRes.gaps.length));
        }
      }

      return findLongest(temp1);
    }

    if (typeof str !== "string") {
      throw new Error(`string-fix-broken-named-entities: [THROW_ID_01] the first input argument must be string! It was given as:\n${JSON.stringify(str, null, 4)} (${typeof str}-type)`);
    }

    const defaults = {
      decode: false,
      cb: ({
        rangeFrom,
        rangeTo,
        rangeValEncoded,
        rangeValDecoded
      }) => rangeValDecoded || rangeValEncoded ? [rangeFrom, rangeTo, opts.decode ? rangeValDecoded : rangeValEncoded] : [rangeFrom, rangeTo],
      progressFn: null,
      entityCatcherCb: null
    };
    let opts;

    if (originalOpts != null) {
      if (!lodash_isplainobject(originalOpts)) {
        throw new Error(`string-fix-broken-named-entities: [THROW_ID_02] the second input argument must be a plain object! I was given as:\n${JSON.stringify(originalOpts, null, 4)} (${typeof originalOpts}-type)`);
      } else {
        opts = Object.assign({}, defaults, originalOpts);
      }
    } else {
      opts = defaults;
    }

    if (opts.cb && typeof opts.cb !== "function") {
      throw new TypeError(`string-fix-broken-named-entities: [THROW_ID_03] opts.cb must be a function (or falsey)! Currently it's: ${typeof opts.cb}, equal to: ${JSON.stringify(opts.cb, null, 4)}`);
    }

    if (opts.entityCatcherCb && typeof opts.entityCatcherCb !== "function") {
      throw new TypeError(`string-fix-broken-named-entities: [THROW_ID_03] opts.entityCatcherCb must be a function (or falsey)! Currently it's: ${typeof opts.entityCatcherCb}, equal to: ${JSON.stringify(opts.entityCatcherCb, null, 4)}`);
    }

    if (opts.progressFn && typeof opts.progressFn !== "function") {
      throw new TypeError(`string-fix-broken-named-entities: [THROW_ID_04] opts.progressFn must be a function (or falsey)! Currently it's: ${typeof opts.progressFn}, equal to: ${JSON.stringify(opts.progressFn, null, 4)}`);
    }

    let state_AmpersandNotNeeded = false;
    const nbspDefault = {
      nameStartsAt: null,
      ampersandNecessary: null,
      patience: 1,
      matchedN: null,
      matchedB: null,
      matchedS: null,
      matchedP: null,
      matchedSemicol: null
    };
    let nbsp = lodash_clonedeep(nbspDefault);

    const nbspWipe = () => {
      nbsp = lodash_clonedeep(nbspDefault);
    };

    const rangesArr2 = [];
    let smallestCharFromTheSetAt;
    let largestCharFromTheSetAt;
    let matchedLettersCount;
    let setOfValues;
    let percentageDone;
    let lastPercentageDone;
    const len = str.length + 1;
    let counter = 0;
    let doNothingUntil = null;
    let letterSeqStartAt = null;
    let brokenNumericEntityStartAt = null;
    const falsePositivesArr = ["&nspar;", "&prnsim;", "&subplus;"];

    outerloop: for (let i = 0; i < len; i++) {
      if (opts.progressFn) {
        percentageDone = Math.floor(counter / len * 100);

        if (percentageDone !== lastPercentageDone) {
          lastPercentageDone = percentageDone;
          opts.progressFn(percentageDone);
        }
      }

      if (doNothingUntil) {
        if (doNothingUntil !== true && i >= doNothingUntil) {
          doNothingUntil = null;
        } else {
          counter++;
          continue;
        }
      }

      matchedLettersCount = (nbsp.matchedN !== null ? 1 : 0) + (nbsp.matchedB !== null ? 1 : 0) + (nbsp.matchedS !== null ? 1 : 0) + (nbsp.matchedP !== null ? 1 : 0);
      setOfValues = [nbsp.matchedN, nbsp.matchedB, nbsp.matchedS, nbsp.matchedP].filter(val => val !== null);
      smallestCharFromTheSetAt = Math.min(...setOfValues);
      largestCharFromTheSetAt = Math.max(...setOfValues);

      if (nbsp.nameStartsAt !== null && matchedLettersCount > 2 && (nbsp.matchedSemicol !== null || !nbsp.ampersandNecessary || isNotaLetter(str[nbsp.nameStartsAt - 1]) && isNotaLetter(str[i]) || (isNotaLetter(str[nbsp.nameStartsAt - 1]) || isNotaLetter(str[i])) && largestCharFromTheSetAt - smallestCharFromTheSetAt <= 4 || nbsp.matchedN !== null && nbsp.matchedB !== null && nbsp.matchedS !== null && nbsp.matchedP !== null && nbsp.matchedN + 1 === nbsp.matchedB && nbsp.matchedB + 1 === nbsp.matchedS && nbsp.matchedS + 1 === nbsp.matchedP) && (!str[i] || nbsp.matchedN !== null && nbsp.matchedB !== null && nbsp.matchedS !== null && nbsp.matchedP !== null && str[i] !== str[i - 1] || str[i].toLowerCase() !== "n" && str[i].toLowerCase() !== "b" && str[i].toLowerCase() !== "s" && str[i].toLowerCase() !== "p" || str[left(str, i)] === ";") && str[i] !== ";" && (str[i + 1] === undefined || str[right(str, i)] !== ";") && (nbsp.matchedB !== null || !(str[smallestCharFromTheSetAt].toLowerCase() === "n" && str[left(str, smallestCharFromTheSetAt)] && str[left(str, smallestCharFromTheSetAt)].toLowerCase() === "e") && !(nbsp.matchedN !== null && rightSeq(str, nbsp.matchedN, {
        i: true
      }, "s", "u", "p")) && str[right(str, nbsp.matchedN)].toLowerCase() !== "c") && (nbsp.matchedB === null || onlyContainsNbsp(str, smallestCharFromTheSetAt, largestCharFromTheSetAt + 1) || !(str[smallestCharFromTheSetAt] && str[largestCharFromTheSetAt] && str[smallestCharFromTheSetAt].toLowerCase() === "n" && str[largestCharFromTheSetAt].toLowerCase() === "b"))) {
        const chompedAmpFromLeft = chompLeft(str, nbsp.nameStartsAt, "&?", "a", "m", "p", ";?");
        const beginningOfTheRange = chompedAmpFromLeft ? chompedAmpFromLeft : nbsp.nameStartsAt;

        if (!falsePositivesArr.some(val => str.slice(beginningOfTheRange).startsWith(val)) && str.slice(beginningOfTheRange, i) !== "&nbsp;") {
          rangesArr2.push({
            ruleName: "bad-named-html-entity-malformed-nbsp",
            entityName: "nbsp",
            rangeFrom: beginningOfTheRange,
            rangeTo: i,
            rangeValEncoded: "&nbsp;",
            rangeValDecoded: "\xA0"
          });
        } else {
          if (opts.decode) {
            rangesArr2.push({
              ruleName: "encoded-html-entity-nbsp",
              entityName: "nbsp",
              rangeFrom: beginningOfTheRange,
              rangeTo: i,
              rangeValEncoded: "&nbsp;",
              rangeValDecoded: "\xA0"
            });
          } else if (opts.entityCatcherCb) {
            opts.entityCatcherCb(beginningOfTheRange, i);
          }
        }

        nbspWipe();
        counter++;

        if (str[i] === "&" && str[i + 1] !== "&") {
          nbsp.nameStartsAt = i;
          nbsp.ampersandNecessary = false;
        }

        continue outerloop;
      }

      if (str[i] && str[i - 1] === ";" && !leftSeq(str, i - 1, "a", "m", "p") && str[i] !== ";" && matchedLettersCount > 0) {
        nbspWipe();
        counter++;
        continue outerloop;
      }

      if (letterSeqStartAt !== null && (!str[i] || str[i].trim().length && !isLatinLetterOrNumberOrHash(str[i]))) {
        if (i > letterSeqStartAt + 1 && str.slice(letterSeqStartAt - 1, i + 1) !== "&nbsp;") {
          const potentialEntity = str.slice(letterSeqStartAt, i);
          const whatsOnTheLeft = left(str, letterSeqStartAt);
          const whatsEvenMoreToTheLeft = whatsOnTheLeft ? left(str, whatsOnTheLeft) : "";

          if (str[whatsOnTheLeft] === "&" && (!str[i] || str[i] !== ";")) {
            const firstChar = letterSeqStartAt;
            const secondChar = letterSeqStartAt ? right(str, letterSeqStartAt) : null;

            if (Object.prototype.hasOwnProperty.call(startsWith, str[firstChar]) && Object.prototype.hasOwnProperty.call(startsWith[str[firstChar]], str[secondChar])) {
              let tempEnt;
              let tempRes;
              let temp1 = startsWith[str[firstChar]][str[secondChar]].reduce((gatheredSoFar, oneOfKnownEntities) => {
                const tempRes = rightSeq(str, letterSeqStartAt - 1, ...oneOfKnownEntities.split(""));

                if (tempRes && oneOfKnownEntities !== "nbsp") {
                  return gatheredSoFar.concat([{
                    tempEnt: oneOfKnownEntities,
                    tempRes
                  }]);
                }

                return gatheredSoFar;
              }, []);
              temp1 = removeGappedFromMixedCases(temp1);

              if (temp1) {
                ({
                  tempEnt,
                  tempRes
                } = temp1);
              }

              if (tempEnt && (!Object.keys(uncertain).includes(tempEnt) || !str[tempRes.rightmostChar + 1] || ["&"].includes(str[tempRes.rightmostChar + 1]) || (uncertain[tempEnt].addSemiIfAmpPresent === true || uncertain[tempEnt].addSemiIfAmpPresent && (!str[tempRes.rightmostChar + 1] || !str[tempRes.rightmostChar + 1].trim().length)) && str[tempRes.leftmostChar - 1] === "&")) {
                const decodedEntity = decode(`&${tempEnt};`);
                rangesArr2.push({
                  ruleName: `bad-named-html-entity-malformed-${tempEnt}`,
                  entityName: tempEnt,
                  rangeFrom: whatsOnTheLeft,
                  rangeTo: tempRes.rightmostChar + 1,
                  rangeValEncoded: `&${tempEnt};`,
                  rangeValDecoded: decodedEntity
                });
              }
            }
          } else if (str[whatsOnTheLeft] !== "&" && str[whatsEvenMoreToTheLeft] !== "&" && str[i] === ";") {
            const lastChar = left(str, i);
            const secondToLast = lastChar ? left(str, lastChar) : null;

            if (secondToLast !== null && Object.prototype.hasOwnProperty.call(endsWith, str[lastChar]) && Object.prototype.hasOwnProperty.call(endsWith[str[lastChar]], str[secondToLast])) {
              let tempEnt;
              let tempRes;
              let temp1 = endsWith[str[lastChar]][str[secondToLast]].reduce((gatheredSoFar, oneOfKnownEntities) => {
                const tempRes = leftSeq(str, i, ...oneOfKnownEntities.split(""));

                if (tempRes && oneOfKnownEntities !== "nbsp" && !(oneOfKnownEntities === "block" && str[left(str, letterSeqStartAt)] === ":")) {
                  return gatheredSoFar.concat([{
                    tempEnt: oneOfKnownEntities,
                    tempRes
                  }]);
                }

                return gatheredSoFar;
              }, []);
              temp1 = removeGappedFromMixedCases(temp1);

              if (temp1) {
                ({
                  tempEnt,
                  tempRes
                } = temp1);
              }

              if (tempEnt && (!Object.keys(uncertain).includes(tempEnt) || uncertain[tempEnt].addAmpIfSemiPresent === true || uncertain[tempEnt].addAmpIfSemiPresent && (!tempRes.leftmostChar || isStr(str[tempRes.leftmostChar - 1]) && !str[tempRes.leftmostChar - 1].trim().length))) {
                const decodedEntity = decode(`&${tempEnt};`);
                rangesArr2.push({
                  ruleName: `bad-named-html-entity-malformed-${tempEnt}`,
                  entityName: tempEnt,
                  rangeFrom: tempRes.leftmostChar,
                  rangeTo: i + 1,
                  rangeValEncoded: `&${tempEnt};`,
                  rangeValDecoded: decodedEntity
                });
              }
            } else if (brokenNumericEntityStartAt !== null) {
              rangesArr2.push({
                ruleName: "bad-malformed-numeric-character-entity",
                entityName: null,
                rangeFrom: brokenNumericEntityStartAt,
                rangeTo: i + 1,
                rangeValEncoded: null,
                rangeValDecoded: null
              });
              brokenNumericEntityStartAt = null;
            }
          } else if (str[whatsOnTheLeft] === "&" && str[i] === ";") {
            if (str.slice(whatsOnTheLeft + 1, i).trim().length > 1) {
              const situation = resemblesNumericEntity(str, whatsOnTheLeft + 1, i);

              if (situation.probablyNumeric) {
                if (situation.probablyNumeric && situation.charTrimmed[0] === "#" && !situation.whitespaceCount && (!situation.lettersCount && situation.numbersCount > 0 && !situation.othersCount || (situation.numbersCount || situation.lettersCount) && situation.charTrimmed[1] === "x" && !situation.othersCount)) {
                  const decodedEntitysValue = String.fromCharCode(parseInt(situation.charTrimmed.slice(situation.probablyNumeric === "deci" ? 1 : 2), situation.probablyNumeric === "deci" ? 10 : 16));

                  if (situation.probablyNumeric === "deci" && parseInt(situation.numbersValue, 10) > 918015) {
                    rangesArr2.push({
                      ruleName: `bad-malformed-numeric-character-entity`,
                      entityName: null,
                      rangeFrom: whatsOnTheLeft,
                      rangeTo: i + 1,
                      rangeValEncoded: null,
                      rangeValDecoded: null
                    });
                  } else if (opts.decode) {
                    rangesArr2.push({
                      ruleName: `encoded-numeric-html-entity-reference`,
                      entityName: situation.charTrimmed,
                      rangeFrom: whatsOnTheLeft,
                      rangeTo: i + 1,
                      rangeValEncoded: `&${situation.charTrimmed};`,
                      rangeValDecoded: decodedEntitysValue
                    });
                  }
                } else {
                  rangesArr2.push({
                    ruleName: `bad-malformed-numeric-character-entity`,
                    entityName: null,
                    rangeFrom: whatsOnTheLeft,
                    rangeTo: i + 1,
                    rangeValEncoded: null,
                    rangeValDecoded: null
                  });
                }

                if (opts.entityCatcherCb) {
                  opts.entityCatcherCb(whatsOnTheLeft, i + 1);
                }
              } else {
                const firstChar = letterSeqStartAt;
                const secondChar = letterSeqStartAt ? right(str, letterSeqStartAt) : null;
                let tempEnt;

                if (Object.prototype.hasOwnProperty.call(brokenNamedEntities, situation.charTrimmed.toLowerCase())) {
                  tempEnt = situation.charTrimmed;
                  const decodedEntity = decode(`&${brokenNamedEntities[situation.charTrimmed.toLowerCase()]};`);
                  rangesArr2.push({
                    ruleName: `bad-named-html-entity-malformed-${brokenNamedEntities[situation.charTrimmed.toLowerCase()]}`,
                    entityName: brokenNamedEntities[situation.charTrimmed.toLowerCase()],
                    rangeFrom: whatsOnTheLeft,
                    rangeTo: i + 1,
                    rangeValEncoded: `&${brokenNamedEntities[situation.charTrimmed.toLowerCase()]};`,
                    rangeValDecoded: decodedEntity
                  });
                } else if (Object.prototype.hasOwnProperty.call(startsWithCaseInsensitive, str[firstChar].toLowerCase()) && Object.prototype.hasOwnProperty.call(startsWithCaseInsensitive[str[firstChar].toLowerCase()], str[secondChar].toLowerCase())) {
                  let tempRes;
                  let matchedEntity = startsWithCaseInsensitive[str[firstChar].toLowerCase()][str[secondChar].toLowerCase()].reduce((gatheredSoFar, oneOfKnownEntities) => {
                    const tempRes = rightSeq(str, letterSeqStartAt - 1, {
                      i: true
                    }, ...oneOfKnownEntities.split(""));

                    if (tempRes && oneOfKnownEntities !== "nbsp") {
                      return gatheredSoFar.concat([{
                        tempEnt: oneOfKnownEntities,
                        tempRes
                      }]);
                    }

                    return gatheredSoFar;
                  }, []);
                  matchedEntity = removeGappedFromMixedCases(matchedEntity);

                  if (matchedEntity) {
                    ({
                      tempEnt,
                      tempRes
                    } = matchedEntity);
                  }

                  let entitysValue;

                  if (tempEnt) {
                    let issue = false;
                    const firstChar = tempRes.leftmostChar;
                    const secondChar = right(str, firstChar);

                    if (Object.keys(uncertain).includes(potentialEntity) && isStr(str[firstChar - 1]) && !str[firstChar - 1].trim().length && uncertain[potentialEntity].addAmpIfSemiPresent !== true) {
                      letterSeqStartAt = null;
                      continue;
                    }

                    if (Object.prototype.hasOwnProperty.call(startsWith, str[firstChar]) && Object.prototype.hasOwnProperty.call(startsWith[str[firstChar]], str[secondChar]) && startsWith[str[firstChar]][str[secondChar]].includes(situation.charTrimmed)) {
                      entitysValue = situation.charTrimmed;

                      if (i - whatsOnTheLeft - 1 === tempEnt.length) {
                        if (opts.decode) {
                          issue = "encoded-html-entity";
                        }
                      } else {
                        issue = "bad-named-html-entity-malformed";
                      }
                    } else {
                      issue = "bad-named-html-entity-malformed";
                      const matchingEntities = Object.keys(allNamedEntities).filter(entity => situation.charTrimmed.toLowerCase().startsWith(entity.toLowerCase()));

                      if (matchingEntities.length === 1) {
                        entitysValue = matchingEntities[0];
                      } else {
                        const filterLongest = matchingEntities.reduce((accum, curr) => {
                          if (!accum.length || curr.length === accum[0].length) {
                            return accum.concat([curr]);
                          }

                          if (curr.length > accum[0].length) {
                            return [curr];
                          }

                          return accum;
                        }, []);

                        if (filterLongest.length === 1) {
                          entitysValue = filterLongest[0];
                        } else {
                          const missingLetters = filterLongest.map(entity => {
                            let count = 0;

                            for (let z = 0, len = entity.length; z < len; z++) {
                              if (entity[z] !== situation.charTrimmed[z]) {
                                count++;
                              }
                            }

                            return count;
                          });

                          if (missingLetters.filter(val => val === Math.min(...missingLetters)).length > 1) {
                            rangesArr2.push({
                              ruleName: `bad-named-html-entity-unrecognised`,
                              entityName: null,
                              rangeFrom: whatsOnTheLeft,
                              rangeTo: tempRes.rightmostChar + 1 === i ? i + 1 : tempRes.rightmostChar + 1,
                              rangeValEncoded: null,
                              rangeValDecoded: null
                            });
                            issue = false;
                          }

                          entitysValue = filterLongest[missingLetters.indexOf(Math.min(...missingLetters))];
                        }
                      }
                    }

                    let endingIdx = tempRes.rightmostChar + 1 === i ? i + 1 : tempRes.rightmostChar + 1;

                    if (issue) {
                      const decodedEntity = decode(`&${entitysValue};`);

                      if (str[endingIdx] && str[endingIdx] !== ";" && !str[endingIdx].trim().length && str[right(str, endingIdx)] === ";") {
                        endingIdx = right(str, endingIdx) + 1;
                      }

                      rangesArr2.push({
                        ruleName: `${issue}-${entitysValue}`,
                        entityName: entitysValue,
                        rangeFrom: whatsOnTheLeft,
                        rangeTo: endingIdx,
                        rangeValEncoded: `&${entitysValue};`,
                        rangeValDecoded: decodedEntity
                      });
                    }

                    if (opts.entityCatcherCb) {
                      opts.entityCatcherCb(whatsOnTheLeft, endingIdx);
                    }
                  }
                }

                if (!tempEnt) {
                  if (situation.charTrimmed.toLowerCase() !== "&nbsp;") {
                    rangesArr2.push({
                      ruleName: `bad-named-html-entity-unrecognised`,
                      entityName: null,
                      rangeFrom: whatsOnTheLeft,
                      rangeTo: i + 1,
                      rangeValEncoded: null,
                      rangeValDecoded: null
                    });
                  }
                }
              }
            }
          } else if (str[whatsEvenMoreToTheLeft] === "&" && str[i] === ";" && i - whatsEvenMoreToTheLeft < maxLength) {
            const situation = resemblesNumericEntity(str, whatsEvenMoreToTheLeft + 1, i);
            rangesArr2.push({
              ruleName: `${situation.probablyNumeric ? "bad-malformed-numeric-character-entity" : "bad-named-html-entity-unrecognised"}`,
              entityName: null,
              rangeFrom: whatsEvenMoreToTheLeft,
              rangeTo: i + 1,
              rangeValEncoded: null,
              rangeValDecoded: null
            });
          }
        }

        letterSeqStartAt = null;
      }

      if (letterSeqStartAt === null && isLatinLetterOrNumberOrHash(str[i]) && str[i + 1]) {
        letterSeqStartAt = i;
      }

      if (str[i] === "a") {
        const singleAmpOnTheRight = rightSeq(str, i, "m", "p", ";");

        if (singleAmpOnTheRight) {
          let toDeleteAllAmpEndHere = singleAmpOnTheRight.rightmostChar + 1;
          const nextAmpOnTheRight = rightSeq(str, singleAmpOnTheRight.rightmostChar, "a", "m", "p", ";");

          if (nextAmpOnTheRight) {
            toDeleteAllAmpEndHere = nextAmpOnTheRight.rightmostChar + 1;
            let temp;

            do {
              temp = rightSeq(str, toDeleteAllAmpEndHere - 1, "a", "m", "p", ";");

              if (temp) {
                toDeleteAllAmpEndHere = temp.rightmostChar + 1;
              }
            } while (temp);
          }

          const firstCharThatFollows = right(str, toDeleteAllAmpEndHere - 1);
          const secondCharThatFollows = firstCharThatFollows ? right(str, firstCharThatFollows) : null;
          let matchedTemp;

          if (secondCharThatFollows && Object.prototype.hasOwnProperty.call(startsWith, str[firstCharThatFollows]) && Object.prototype.hasOwnProperty.call(startsWith[str[firstCharThatFollows]], str[secondCharThatFollows]) && startsWith[str[firstCharThatFollows]][str[secondCharThatFollows]].some(entity => {
            const matchEntityOnTheRight = rightSeq(str, toDeleteAllAmpEndHere - 1, ...entity.slice(""));

            if (matchEntityOnTheRight) {
              matchedTemp = entity;
              return true;
            }
          })) {
            doNothingUntil = firstCharThatFollows + matchedTemp.length + 1;
            const whatsOnTheLeft = left(str, i);

            if (str[whatsOnTheLeft] === "&") {
              rangesArr2.push({
                ruleName: "bad-named-html-entity-multiple-encoding",
                entityName: matchedTemp,
                rangeFrom: whatsOnTheLeft,
                rangeTo: doNothingUntil,
                rangeValEncoded: `&${matchedTemp};`,
                rangeValDecoded: decode(`&${matchedTemp};`)
              });
            } else if (whatsOnTheLeft) {
              const rangeFrom = i;
              const spaceReplacement = "";
              if (str[i - 1] === " ") ;

              if (opts.cb) {
                rangesArr2.push({
                  ruleName: "bad-named-html-entity-multiple-encoding",
                  entityName: matchedTemp,
                  rangeFrom: rangeFrom,
                  rangeTo: doNothingUntil,
                  rangeValEncoded: `${spaceReplacement}&${matchedTemp};`,
                  rangeValDecoded: `${spaceReplacement}${decode(`&${matchedTemp};`)}`
                });
              }
            }
          }
        }
      }

      if (str[i] === "&") {
        if (nbsp.nameStartsAt && nbsp.nameStartsAt < i && (nbsp.matchedN || nbsp.matchedB || nbsp.matchedS || nbsp.matchedP)) {
          nbspWipe();
        }

        nbsp.nameStartsAt = i;
        nbsp.ampersandNecessary = false;
      }

      if (str[i] && str[i].toLowerCase() === "n") {
        if (str[i - 1] && str[i - 1].toLowerCase() === "i" && str[i + 1] && str[i + 1].toLowerCase() === "s") {
          nbspWipe();
          counter++;
          continue outerloop;
        }

        if (nbsp.matchedN === null) {
          nbsp.matchedN = i;
        }

        if (nbsp.nameStartsAt === null) {
          nbsp.nameStartsAt = i;

          if (nbsp.ampersandNecessary === null && !state_AmpersandNotNeeded) {
            nbsp.ampersandNecessary = true;
          } else if (nbsp.ampersandNecessary !== true) {
            nbsp.ampersandNecessary = false;
          }
        }
      }

      if (str[i] && str[i].toLowerCase() === "b") {
        if (nbsp.nameStartsAt !== null) {
          if (nbsp.matchedB === null) {
            nbsp.matchedB = i;
          }
        } else if (nbsp.patience) {
          nbsp.patience--;
          nbsp.nameStartsAt = i;
          nbsp.matchedB = i;

          if (nbsp.ampersandNecessary === null && !state_AmpersandNotNeeded) {
            nbsp.ampersandNecessary = true;
          } else if (nbsp.ampersandNecessary !== true) {
            nbsp.ampersandNecessary = false;
          }
        } else {
          nbspWipe();
          counter++;
          continue outerloop;
        }
      }

      if (str[i] && str[i].toLowerCase() === "s") {
        if (nbsp.nameStartsAt !== null) {
          if (nbsp.matchedS === null) {
            nbsp.matchedS = i;
          }
        } else if (nbsp.patience) {
          nbsp.patience--;
          nbsp.nameStartsAt = i;
          nbsp.matchedS = i;

          if (nbsp.ampersandNecessary === null && !state_AmpersandNotNeeded) {
            nbsp.ampersandNecessary = true;
          } else if (nbsp.ampersandNecessary !== true) {
            nbsp.ampersandNecessary = false;
          }
        } else {
          nbspWipe();
          counter++;
          continue outerloop;
        }
      }

      if (str[i] && str[i].toLowerCase() === "p") {
        if (leftSeq(str, i, "t", "h", "i", "n", "s")) {
          nbspWipe();
        } else if (nbsp.nameStartsAt !== null) {
          if (nbsp.matchedP === null) {
            nbsp.matchedP = i;
          }
        } else if (nbsp.patience) {
          nbsp.patience--;
          nbsp.nameStartsAt = i;
          nbsp.matchedP = i;

          if (nbsp.ampersandNecessary === null && !state_AmpersandNotNeeded) {
            nbsp.ampersandNecessary = true;
          } else if (nbsp.ampersandNecessary !== true) {
            nbsp.ampersandNecessary = false;
          }
        } else {
          nbspWipe();
          counter++;
          continue outerloop;
        }
      }

      if (str[i] === ";") {
        if (nbsp.nameStartsAt !== null) {
          nbsp.matchedSemicol = i;

          if (nbsp.matchedN && !nbsp.matchedB && !nbsp.matchedS && !nbsp.matchedP || !nbsp.matchedN && nbsp.matchedB && !nbsp.matchedS && !nbsp.matchedP || !nbsp.matchedN && !nbsp.matchedB && nbsp.matchedS && !nbsp.matchedP || !nbsp.matchedN && !nbsp.matchedB && !nbsp.matchedS && nbsp.matchedP) {
            nbspWipe();
          }
        }
      }

      if (str[i] === "#" && right(str, i) && str[right(str, i)].toLowerCase() === "x" && (!str[i - 1] || !left(str, i) || str[left(str, i)] !== "&")) {
        if (isNumber(str[right(str, right(str, i))])) {
          brokenNumericEntityStartAt = i;
        }
      }

      if (nbsp.nameStartsAt !== null && i > nbsp.nameStartsAt && str[i] && str[i].toLowerCase() !== "n" && str[i].toLowerCase() !== "b" && str[i].toLowerCase() !== "s" && str[i].toLowerCase() !== "p" && str[i] !== "&" && str[i] !== ";" && str[i] !== " ") {
        if (nbsp.patience) {
          nbsp.patience = nbsp.patience - 1;
        } else {
          nbspWipe();
          counter++;
          continue outerloop;
        }
      }

      counter++;
    }

    if (!rangesArr2.length) {
      return [];
    }

    const res = rangesArr2.filter((filteredRangeObj, i) => {
      return rangesArr2.every((oneOfEveryObj, y) => {
        return i === y || !(filteredRangeObj.rangeFrom >= oneOfEveryObj.rangeFrom && filteredRangeObj.rangeTo < oneOfEveryObj.rangeTo);
      });
    }).filter((filteredRangeObj, i, allRangesArr) => {
      if (filteredRangeObj.ruleName === "bad-named-html-entity-unrecognised" && allRangesArr.some((oneRangeObj, y) => {
        return i !== y && oneRangeObj.rangeFrom <= filteredRangeObj.rangeFrom && oneRangeObj.rangeTo === filteredRangeObj.rangeTo;
      })) {
        return false;
      }

      return true;
    }).map(opts.cb);
    return res;
  }

  /**
   * html-entities-not-email-friendly
   * All HTML entities which are not email template friendly
   * Version: 0.1.13
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/all-named-html-entities
   */
  var AMP$1 = "amp";
  var Abreve$1 = "#x102";
  var Acy$1 = "#x410";
  var Afr$1 = "#x1D504";
  var Amacr$1 = "#x100";
  var And$2 = "#x2A53";
  var Aogon$1 = "#x104";
  var Aopf$1 = "#x1D538";
  var ApplyFunction$1 = "#x2061";
  var Ascr$2 = "#x1D49C";
  var Assign$2 = "#x2254";
  var Backslash$2 = "#x2216";
  var Barv$1 = "#x2AE7";
  var Barwed$1 = "#x2306";
  var Bcy$1 = "#x411";
  var Because$2 = "#x2235";
  var Bernoullis$2 = "#x212C";
  var Bfr$1 = "#x1D505";
  var Bopf$1 = "#x1D539";
  var Breve$1 = "#x2D8";
  var Bscr$1 = "#x212C";
  var Bumpeq$1 = "#x224E";
  var CHcy$1 = "#x427";
  var COPY$2 = "copy";
  var Cacute$1 = "#x106";
  var Cap$2 = "#x22D2";
  var CapitalDifferentialD$1 = "#x2145";
  var Cayleys$1 = "#x212D";
  var Ccaron$1 = "#x10C";
  var Ccirc$1 = "#x108";
  var Cconint$1 = "#x2230";
  var Cdot$1 = "#x10A";
  var Cedilla$2 = "cedil";
  var CenterDot$1 = "middot";
  var Cfr$1 = "#x212D";
  var CircleDot$1 = "#x2299";
  var CircleMinus$1 = "#x2296";
  var CirclePlus$1 = "oplus";
  var CircleTimes$1 = "otimes";
  var ClockwiseContourIntegral$1 = "#x2232";
  var CloseCurlyDoubleQuote$1 = "rdquo";
  var CloseCurlyQuote$1 = "rsquo";
  var Colon$2 = "#x2237";
  var Colone$2 = "#x2A74";
  var Congruent$2 = "equiv";
  var Conint$1 = "#x222F";
  var ContourIntegral$1 = "#x222E";
  var Copf$1 = "#x2102";
  var Coproduct$1 = "#x2210";
  var CounterClockwiseContourIntegral$1 = "#x2233";
  var Cross$2 = "#x2A2F";
  var Cscr$1 = "#x1D49E";
  var Cup$2 = "#x22D3";
  var CupCap$1 = "#x224D";
  var DD$2 = "#x2145";
  var DDotrahd$1 = "#x2911";
  var DJcy$1 = "#x402";
  var DScy$1 = "#x405";
  var DZcy$1 = "#x40F";
  var Darr$1 = "#x21A1";
  var Dashv$1 = "#x2AE4";
  var Dcaron$1 = "#x10E";
  var Dcy$1 = "#x414";
  var Del$2 = "#x2207";
  var Dfr$1 = "#x1D507";
  var DiacriticalAcute$1 = "acute";
  var DiacriticalDot$1 = "#x2D9";
  var DiacriticalDoubleAcute$1 = "#x2DD";
  var DiacriticalGrave$1 = "#x60";
  var DiacriticalTilde$1 = "tilde";
  var Diamond$2 = "#x22C4";
  var DifferentialD$1 = "#x2146";
  var Dopf$1 = "#x1D53B";
  var Dot$2 = "#xA8";
  var DotDot$1 = "#x20DC";
  var DotEqual$1 = "#x2250";
  var DoubleContourIntegral$1 = "#x222F";
  var DoubleDot$1 = "#xA8";
  var DoubleDownArrow$1 = "dArr";
  var DoubleLeftArrow$1 = "lArr";
  var DoubleLeftRightArrow$1 = "#x21D4";
  var DoubleLeftTee$1 = "#x2AE4";
  var DoubleLongLeftArrow$1 = "#x27F8";
  var DoubleLongLeftRightArrow$1 = "#x27FA";
  var DoubleLongRightArrow$1 = "#x27F9";
  var DoubleRightArrow$1 = "rArr";
  var DoubleRightTee$1 = "#x22A8";
  var DoubleUpArrow$1 = "uArr";
  var DoubleUpDownArrow$1 = "#x21D5";
  var DoubleVerticalBar$1 = "#x2225";
  var DownArrow$1 = "darr";
  var DownArrowBar$1 = "#x2913";
  var DownArrowUpArrow$1 = "#x21F5";
  var DownBreve$1 = "#x311";
  var DownLeftRightVector$1 = "#x2950";
  var DownLeftTeeVector$1 = "#x295E";
  var DownLeftVector$1 = "#x21BD";
  var DownLeftVectorBar$1 = "#x2956";
  var DownRightTeeVector$1 = "#x295F";
  var DownRightVector$1 = "#x21C1";
  var DownRightVectorBar$1 = "#x2957";
  var DownTee$1 = "#x22A4";
  var DownTeeArrow$1 = "#x21A7";
  var Downarrow$1 = "dArr";
  var Dscr$1 = "#x1D49F";
  var Dstrok$1 = "#x110";
  var ENG$2 = "#x14A";
  var Ecaron$1 = "#x11A";
  var Ecy$1 = "#x42D";
  var Edot$1 = "#x116";
  var Efr$1 = "#x1D508";
  var Element$1 = "#x2208";
  var Emacr$1 = "#x112";
  var EmptySmallSquare$1 = "#x25FB";
  var EmptyVerySmallSquare$1 = "#x25AB";
  var Eogon$1 = "#x118";
  var Eopf$1 = "#x1D53C";
  var Equal$2 = "#x2A75";
  var EqualTilde$1 = "#x2242";
  var Equilibrium$2 = "#x21CC";
  var Escr$1 = "#x2130";
  var Esim$1 = "#x2A73";
  var Exists$2 = "exist";
  var ExponentialE$1 = "#x2147";
  var Fcy$1 = "#x424";
  var Ffr$1 = "#x1D509";
  var FilledSmallSquare$1 = "#x25FC";
  var FilledVerySmallSquare$1 = "#x25AA";
  var Fopf$1 = "#x1D53D";
  var ForAll$1 = "forall";
  var Fouriertrf$1 = "#x2131";
  var Fscr$1 = "#x2131";
  var GJcy$1 = "#x403";
  var GT$2 = "gt";
  var Gammad$1 = "#x3DC";
  var Gbreve$1 = "#x11E";
  var Gcedil$1 = "#x122";
  var Gcirc$1 = "#x11C";
  var Gcy$1 = "#x413";
  var Gdot$1 = "#x120";
  var Gfr$1 = "#x1D50A";
  var Gg$1 = "#x22D9";
  var Gopf$1 = "#x1D53E";
  var GreaterEqual$1 = "ge";
  var GreaterEqualLess$1 = "#x22DB";
  var GreaterFullEqual$1 = "#x2267";
  var GreaterGreater$1 = "#x2AA2";
  var GreaterLess$1 = "#x2277";
  var GreaterSlantEqual$1 = "#x2A7E";
  var GreaterTilde$1 = "#x2273";
  var Gscr$1 = "#x1D4A2";
  var Gt$1 = "#x226B";
  var HARDcy$1 = "#x42A";
  var Hacek$1 = "#x2C7";
  var Hcirc$1 = "#x124";
  var Hfr$1 = "#x210C";
  var HilbertSpace$1 = "#x210B";
  var Hopf$1 = "#x210D";
  var HorizontalLine$1 = "#x2500";
  var Hscr$1 = "#x210B";
  var Hstrok$1 = "#x126";
  var HumpDownHump$1 = "#x224E";
  var HumpEqual$1 = "#x224F";
  var IEcy$1 = "#x415";
  var IJlig$1 = "#x132";
  var IOcy$1 = "#x401";
  var Icy$1 = "#x418";
  var Idot$1 = "#x130";
  var Ifr$1 = "#x2111";
  var Im$1 = "#x2111";
  var Imacr$1 = "#x12A";
  var ImaginaryI$1 = "#x2148";
  var Implies$1 = "rArr";
  var Int$1 = "#x222C";
  var Integral$1 = "int";
  var Intersection$1 = "#x22C2";
  var InvisibleComma$1 = "#x2063";
  var InvisibleTimes$1 = "#x2062";
  var Iogon$1 = "#x12E";
  var Iopf$1 = "#x1D540";
  var Iscr$1 = "#x2110";
  var Itilde$1 = "#x128";
  var Iukcy$1 = "#x406";
  var Jcirc$1 = "#x134";
  var Jcy$1 = "#x419";
  var Jfr$1 = "#x1D50D";
  var Jopf$1 = "#x1D541";
  var Jscr$1 = "#x1D4A5";
  var Jsercy$1 = "#x408";
  var Jukcy$1 = "#x404";
  var KHcy$1 = "#x425";
  var KJcy$1 = "#x40C";
  var Kcedil$1 = "#x136";
  var Kcy$1 = "#x41A";
  var Kfr$1 = "#x1D50E";
  var Kopf$1 = "#x1D542";
  var Kscr$1 = "#x1D4A6";
  var LJcy$1 = "#x409";
  var LT$2 = "lt";
  var Lacute$1 = "#x139";
  var Lang$1 = "#x27EA";
  var Laplacetrf$1 = "#x2112";
  var Larr$1 = "#x219E";
  var Lcaron$1 = "#x13D";
  var Lcedil$1 = "#x13B";
  var Lcy$1 = "#x41B";
  var LeftAngleBracket$1 = "lang";
  var LeftArrow$1 = "larr";
  var LeftArrowBar$1 = "#x21E4";
  var LeftArrowRightArrow$1 = "#x21C6";
  var LeftCeiling$1 = "lceil";
  var LeftDoubleBracket$1 = "#x27E6";
  var LeftDownTeeVector$1 = "#x2961";
  var LeftDownVector$1 = "#x21C3";
  var LeftDownVectorBar$1 = "#x2959";
  var LeftFloor$1 = "lfloor";
  var LeftRightArrow$1 = "harr";
  var LeftRightVector$1 = "#x294E";
  var LeftTee$1 = "#x22A3";
  var LeftTeeArrow$1 = "#x21A4";
  var LeftTeeVector$1 = "#x295A";
  var LeftTriangle$1 = "#x22B2";
  var LeftTriangleBar$1 = "#x29CF";
  var LeftTriangleEqual$1 = "#x22B4";
  var LeftUpDownVector$1 = "#x2951";
  var LeftUpTeeVector$1 = "#x2960";
  var LeftUpVector$1 = "#x21BF";
  var LeftUpVectorBar$1 = "#x2958";
  var LeftVector$1 = "#x21BC";
  var LeftVectorBar$1 = "#x2952";
  var Leftarrow$1 = "lArr";
  var Leftrightarrow$1 = "#x21D4";
  var LessEqualGreater$1 = "#x22DA";
  var LessFullEqual$1 = "#x2266";
  var LessGreater$1 = "#x2276";
  var LessLess$1 = "#x2AA1";
  var LessSlantEqual$1 = "#x2A7D";
  var LessTilde$1 = "#x2272";
  var Lfr$1 = "#x1D50F";
  var Ll$1 = "#x22D8";
  var Lleftarrow$1 = "#x21DA";
  var Lmidot$1 = "#x13F";
  var LongLeftArrow$1 = "#x27F5";
  var LongLeftRightArrow$1 = "#x27F7";
  var LongRightArrow$1 = "#x27F6";
  var Longleftarrow$1 = "#x27F8";
  var Longleftrightarrow$1 = "#x27FA";
  var Longrightarrow$1 = "#x27F9";
  var Lopf$1 = "#x1D543";
  var LowerLeftArrow$1 = "#x2199";
  var LowerRightArrow$1 = "#x2198";
  var Lscr$1 = "#x2112";
  var Lsh$1 = "#x21B0";
  var Lstrok$1 = "#x141";
  var Lt$1 = "#x226A";
  var Mcy$1 = "#x41C";
  var MediumSpace$1 = "#x205F";
  var Mellintrf$1 = "#x2133";
  var Mfr$1 = "#x1D510";
  var MinusPlus$1 = "#x2213";
  var Mopf$1 = "#x1D544";
  var Mscr$1 = "#x2133";
  var NJcy$1 = "#x40A";
  var Nacute$1 = "#x143";
  var Ncaron$1 = "#x147";
  var Ncedil$1 = "#x145";
  var Ncy$1 = "#x41D";
  var NegativeMediumSpace$1 = "#x200B";
  var NegativeThickSpace$1 = "#x200B";
  var NegativeThinSpace$1 = "#x200B";
  var NegativeVeryThinSpace$1 = "#x200B";
  var NestedGreaterGreater$1 = "#x226B";
  var NestedLessLess$1 = "#x226A";
  var Nfr$1 = "#x1D511";
  var NoBreak$1 = "#x2060";
  var NonBreakingSpace$1 = "nbsp";
  var Nopf$1 = "#x2115";
  var Not$2 = "#x2AEC";
  var NotCongruent$1 = "#x2262";
  var NotCupCap$1 = "#x226D";
  var NotDoubleVerticalBar$1 = "#x2226";
  var NotElement$1 = "notin";
  var NotEqual$1 = "ne";
  var NotEqualTilde$1 = "#x2242;&#x338";
  var NotExists$1 = "#x2204";
  var NotGreater$1 = "#x226F";
  var NotGreaterEqual$1 = "#x2271";
  var NotGreaterFullEqual$1 = "#x2267;&#x338";
  var NotGreaterGreater$1 = "#x226B;&#x338";
  var NotGreaterLess$1 = "#x2279";
  var NotGreaterSlantEqual$1 = "#x2A7E;&#x338";
  var NotGreaterTilde$1 = "#x2275";
  var NotHumpDownHump$1 = "#x224E;&#x338";
  var NotHumpEqual$1 = "#x224F;&#x338";
  var NotLeftTriangle$1 = "#x22EA";
  var NotLeftTriangleBar$1 = "#x29CF;&#x338";
  var NotLeftTriangleEqual$1 = "#x22EC";
  var NotLess$1 = "#x226E";
  var NotLessEqual$1 = "#x2270";
  var NotLessGreater$1 = "#x2278";
  var NotLessLess$1 = "#x226A;&#x338";
  var NotLessSlantEqual$1 = "#x2A7D;&#x338";
  var NotLessTilde$1 = "#x2274";
  var NotNestedGreaterGreater$1 = "#x2AA2;&#x338";
  var NotNestedLessLess$1 = "#x2AA1;&#x338";
  var NotPrecedes$1 = "#x2280";
  var NotPrecedesEqual$1 = "#x2AAF;&#x338";
  var NotPrecedesSlantEqual$1 = "#x22E0";
  var NotReverseElement$1 = "#x220C";
  var NotRightTriangle$1 = "#x22EB";
  var NotRightTriangleBar$1 = "#x29D0;&#x338";
  var NotRightTriangleEqual$1 = "#x22ED";
  var NotSquareSubset$1 = "#x228F;&#x338";
  var NotSquareSubsetEqual$1 = "#x22E2";
  var NotSquareSuperset$1 = "#x2290;&#x338";
  var NotSquareSupersetEqual$1 = "#x22E3";
  var NotSubset$1 = "#x2282;&#x20D2";
  var NotSubsetEqual$1 = "#x2288";
  var NotSucceeds$1 = "#x2281";
  var NotSucceedsEqual$1 = "#x2AB0;&#x338";
  var NotSucceedsSlantEqual$1 = "#x22E1";
  var NotSucceedsTilde$1 = "#x227F;&#x338";
  var NotSuperset$1 = "#x2283;&#x20D2";
  var NotSupersetEqual$1 = "#x2289";
  var NotTilde$1 = "#x2241";
  var NotTildeEqual$1 = "#x2244";
  var NotTildeFullEqual$1 = "#x2247";
  var NotTildeTilde$1 = "#x2249";
  var NotVerticalBar$1 = "#x2224";
  var Nscr$1 = "#x1D4A9";
  var Ocy$1 = "#x41E";
  var Odblac$1 = "#x150";
  var Ofr$1 = "#x1D512";
  var Omacr$1 = "#x14C";
  var Oopf$1 = "#x1D546";
  var OpenCurlyDoubleQuote$1 = "ldquo";
  var OpenCurlyQuote$1 = "lsquo";
  var Or$1 = "#x2A54";
  var Oscr$1 = "#x1D4AA";
  var Otimes$1 = "#x2A37";
  var OverBar$1 = "oline";
  var OverBrace$1 = "#x23DE";
  var OverBracket$1 = "#x23B4";
  var OverParenthesis$1 = "#x23DC";
  var PartialD$1 = "part";
  var Pcy$1 = "#x41F";
  var Pfr$1 = "#x1D513";
  var PlusMinus$1 = "#xB1";
  var Poincareplane$1 = "#x210C";
  var Popf$1 = "#x2119";
  var Pr$1 = "#x2ABB";
  var Precedes$1 = "#x227A";
  var PrecedesEqual$1 = "#x2AAF";
  var PrecedesSlantEqual$1 = "#x227C";
  var PrecedesTilde$1 = "#x227E";
  var Product$2 = "prod";
  var Proportion$2 = "#x2237";
  var Proportional$2 = "prop";
  var Pscr$1 = "#x1D4AB";
  var QUOT$2 = "quot";
  var Qfr$1 = "#x1D514";
  var Qopf$1 = "#x211A";
  var Qscr$1 = "#x1D4AC";
  var RBarr$1 = "#x2910";
  var REG$2 = "reg";
  var Racute$1 = "#x154";
  var Rang$1 = "#x27EB";
  var Rarr$1 = "#x21A0";
  var Rarrtl$1 = "#x2916";
  var Rcaron$1 = "#x158";
  var Rcedil$1 = "#x156";
  var Rcy$1 = "#x420";
  var Re$2 = "#x211C";
  var ReverseElement$1 = "ni";
  var ReverseEquilibrium$1 = "#x21CB";
  var ReverseUpEquilibrium$1 = "#x296F";
  var Rfr$1 = "#x211C";
  var RightAngleBracket$1 = "rang";
  var RightArrow$1 = "rarr";
  var RightArrowBar$1 = "#x21E5";
  var RightArrowLeftArrow$1 = "#x21C4";
  var RightCeiling$1 = "rceil";
  var RightDoubleBracket$1 = "#x27E7";
  var RightDownTeeVector$1 = "#x295D";
  var RightDownVector$1 = "#x21C2";
  var RightDownVectorBar$1 = "#x2955";
  var RightFloor$1 = "rfloor";
  var RightTee$1 = "#x22A2";
  var RightTeeArrow$1 = "#x21A6";
  var RightTeeVector$1 = "#x295B";
  var RightTriangle$1 = "#x22B3";
  var RightTriangleBar$1 = "#x29D0";
  var RightTriangleEqual$1 = "#x22B5";
  var RightUpDownVector$1 = "#x294F";
  var RightUpTeeVector$1 = "#x295C";
  var RightUpVector$1 = "#x21BE";
  var RightUpVectorBar$1 = "#x2954";
  var RightVector$1 = "#x21C0";
  var RightVectorBar$1 = "#x2953";
  var Rightarrow$1 = "rArr";
  var Ropf$1 = "#x211D";
  var RoundImplies$1 = "#x2970";
  var Rrightarrow$1 = "#x21DB";
  var Rscr$1 = "#x211B";
  var Rsh$1 = "#x21B1";
  var RuleDelayed$1 = "#x29F4";
  var SHCHcy$1 = "#x429";
  var SHcy$1 = "#x428";
  var SOFTcy$1 = "#x42C";
  var Sacute$1 = "#x15A";
  var Sc$1 = "#x2ABC";
  var Scedil$1 = "#x15E";
  var Scirc$1 = "#x15C";
  var Scy$1 = "#x421";
  var Sfr$1 = "#x1D516";
  var ShortDownArrow$1 = "darr";
  var ShortLeftArrow$1 = "larr";
  var ShortRightArrow$1 = "rarr";
  var ShortUpArrow$1 = "uarr";
  var SmallCircle$1 = "#x2218";
  var Sopf$1 = "#x1D54A";
  var Sqrt$1 = "#x221A";
  var Square$1 = "#x25A1";
  var SquareIntersection$1 = "#x2293";
  var SquareSubset$1 = "#x228F";
  var SquareSubsetEqual$1 = "#x2291";
  var SquareSuperset$1 = "#x2290";
  var SquareSupersetEqual$1 = "#x2292";
  var SquareUnion$1 = "#x2294";
  var Sscr$1 = "#x1D4AE";
  var Star$2 = "#x22C6";
  var Sub$2 = "#x22D0";
  var Subset$1 = "#x22D0";
  var SubsetEqual$1 = "sube";
  var Succeeds$1 = "#x227B";
  var SucceedsEqual$1 = "#x2AB0";
  var SucceedsSlantEqual$1 = "#x227D";
  var SucceedsTilde$1 = "#x227F";
  var SuchThat$1 = "ni";
  var Sum$2 = "sum";
  var Sup$1 = "#x22D1";
  var Superset$1 = "sup";
  var SupersetEqual$1 = "supe";
  var Supset$1 = "#x22D1";
  var TRADE$2 = "trade";
  var TSHcy$1 = "#x40B";
  var TScy$1 = "#x426";
  var Tab$2 = "#x9";
  var Tcaron$1 = "#x164";
  var Tcedil$1 = "#x162";
  var Tcy$1 = "#x422";
  var Tfr$1 = "#x1D517";
  var Therefore$1 = "there4";
  var ThickSpace$1 = "#x205F;&#x200A";
  var ThinSpace$1 = "thinsp";
  var Tilde$2 = "sim";
  var TildeEqual$1 = "#x2243";
  var TildeFullEqual$1 = "cong";
  var TildeTilde$1 = "#x2248";
  var Topf$1 = "#x1D54B";
  var TripleDot$1 = "#x20DB";
  var Tscr$1 = "#x1D4AF";
  var Tstrok$1 = "#x166";
  var Uarr$1 = "#x219F";
  var Uarrocir$1 = "#x2949";
  var Ubrcy$1 = "#x40E";
  var Ubreve$1 = "#x16C";
  var Ucy$1 = "#x423";
  var Udblac$1 = "#x170";
  var Ufr$1 = "#x1D518";
  var Umacr$1 = "#x16A";
  var UnderBrace$1 = "#x23DF";
  var UnderBracket$1 = "#x23B5";
  var UnderParenthesis$1 = "#x23DD";
  var Union$2 = "#x22C3";
  var UnionPlus$1 = "#x228E";
  var Uogon$1 = "#x172";
  var Uopf$1 = "#x1D54C";
  var UpArrow$1 = "uarr";
  var UpArrowBar$1 = "#x2912";
  var UpArrowDownArrow$1 = "#x21C5";
  var UpDownArrow$1 = "#x2195";
  var UpEquilibrium$1 = "#x296E";
  var UpTee$1 = "#x22A5";
  var UpTeeArrow$1 = "#x21A5";
  var Uparrow$1 = "uArr";
  var Updownarrow$1 = "#x21D5";
  var UpperLeftArrow$1 = "#x2196";
  var UpperRightArrow$1 = "#x2197";
  var Upsi$2 = "#x3D2";
  var Uring$1 = "#x16E";
  var Uscr$1 = "#x1D4B0";
  var Utilde$1 = "#x168";
  var VDash$1 = "#x22AB";
  var Vbar$1 = "#x2AEB";
  var Vcy$1 = "#x412";
  var Vdash$1 = "#x22A9";
  var Vdashl$1 = "#x2AE6";
  var Vee$1 = "#x22C1";
  var Verbar$1 = "#x2016";
  var Vert$2 = "#x2016";
  var VerticalBar$1 = "#x2223";
  var VerticalSeparator$1 = "#x2758";
  var VerticalTilde$1 = "#x2240";
  var VeryThinSpace$1 = "#x200A";
  var Vfr$1 = "#x1D519";
  var Vopf$1 = "#x1D54D";
  var Vscr$1 = "#x1D4B1";
  var Vvdash$1 = "#x22AA";
  var Wcirc$1 = "#x174";
  var Wedge$2 = "#x22C0";
  var Wfr$1 = "#x1D51A";
  var Wopf$1 = "#x1D54E";
  var Wscr$1 = "#x1D4B2";
  var Xfr$1 = "#x1D51B";
  var Xopf$1 = "#x1D54F";
  var Xscr$1 = "#x1D4B3";
  var YAcy$1 = "#x42F";
  var YIcy$1 = "#x407";
  var YUcy$1 = "#x42E";
  var Ycirc$2 = "#x176";
  var Ycy$1 = "#x42B";
  var Yfr$1 = "#x1D51C";
  var Yopf$1 = "#x1D550";
  var Yscr$1 = "#x1D4B4";
  var ZHcy$1 = "#x416";
  var Zacute$2 = "#x179";
  var Zcaron$1 = "#x17D";
  var Zcy$1 = "#x417";
  var Zdot$1 = "#x17B";
  var ZeroWidthSpace$1 = "#x200B";
  var Zfr$1 = "#x2128";
  var Zopf$1 = "#x2124";
  var Zscr$1 = "#x1D4B5";
  var abreve$1 = "#x103";
  var ac$2 = "#x223E";
  var acE$1 = "#x223E;&#x333";
  var acd$1 = "#x223F";
  var acy$1 = "#x430";
  var af$1 = "#x2061";
  var afr$1 = "#x1D51E";
  var aleph$1 = "#x2135";
  var amacr$1 = "#x101";
  var amalg$1 = "#x2A3F";
  var andand$1 = "#x2A55";
  var andd$1 = "#x2A5C";
  var andslope$1 = "#x2A58";
  var andv$1 = "#x2A5A";
  var ange$2 = "#x29A4";
  var angle$2 = "ang";
  var angmsd$1 = "#x2221";
  var angmsdaa$1 = "#x29A8";
  var angmsdab$1 = "#x29A9";
  var angmsdac$1 = "#x29AA";
  var angmsdad$1 = "#x29AB";
  var angmsdae$1 = "#x29AC";
  var angmsdaf$1 = "#x29AD";
  var angmsdag$1 = "#x29AE";
  var angmsdah$1 = "#x29AF";
  var angrt$1 = "#x221F";
  var angrtvb$1 = "#x22BE";
  var angrtvbd$1 = "#x299D";
  var angsph$1 = "#x2222";
  var angst$2 = "#xC5";
  var angzarr$1 = "#x237C";
  var aogon$1 = "#x105";
  var aopf$1 = "#x1D552";
  var ap$2 = "#x2248";
  var apE$1 = "#x2A70";
  var apacir$1 = "#x2A6F";
  var ape$2 = "#x224A";
  var apid$1 = "#x224B";
  var approx$2 = "#x2248";
  var approxeq$1 = "#x224A";
  var ascr$2 = "#x1D4B6";
  var asympeq$1 = "#x224D";
  var awconint$1 = "#x2233";
  var awint$1 = "#x2A11";
  var bNot$1 = "#x2AED";
  var backcong$1 = "#x224C";
  var backepsilon$1 = "#x3F6";
  var backprime$1 = "#x2035";
  var backsim$1 = "#x223D";
  var backsimeq$1 = "#x22CD";
  var barvee$1 = "#x22BD";
  var barwed$1 = "#x2305";
  var barwedge$2 = "#x2305";
  var bbrk$1 = "#x23B5";
  var bbrktbrk$1 = "#x23B6";
  var bcong$1 = "#x224C";
  var bcy$1 = "#x431";
  var becaus$2 = "#x2235";
  var because$2 = "#x2235";
  var bemptyv$1 = "#x29B0";
  var bepsi$2 = "#x3F6";
  var bernou$1 = "#x212C";
  var beth$2 = "#x2136";
  var between$2 = "#x226C";
  var bfr$1 = "#x1D51F";
  var bigcap$1 = "#x22C2";
  var bigcirc$1 = "#x25EF";
  var bigcup$1 = "#x22C3";
  var bigodot$1 = "#x2A00";
  var bigoplus$1 = "#x2A01";
  var bigotimes$1 = "#x2A02";
  var bigsqcup$1 = "#x2A06";
  var bigstar$1 = "#x2605";
  var bigtriangledown$1 = "#x25BD";
  var bigtriangleup$1 = "#x25B3";
  var biguplus$1 = "#x2A04";
  var bigvee$1 = "#x22C1";
  var bigwedge$1 = "#x22C0";
  var bkarow$1 = "#x290D";
  var blacklozenge$1 = "#x29EB";
  var blacksquare$1 = "#x25AA";
  var blacktriangle$1 = "#x25B4";
  var blacktriangledown$1 = "#x25BE";
  var blacktriangleleft$1 = "#x25C2";
  var blacktriangleright$1 = "#x25B8";
  var blank$2 = "#x2423";
  var blk12$1 = "#x2592";
  var blk14$1 = "#x2591";
  var blk34$1 = "#x2593";
  var block$2 = "#x2588";
  var bne$1 = "&#x20E5";
  var bnequiv$1 = "#x2261;&#x20E5";
  var bnot$1 = "#x2310";
  var bopf$1 = "#x1D553";
  var bot$2 = "#x22A5";
  var bottom$2 = "#x22A5";
  var bowtie$2 = "#x22C8";
  var boxDL$1 = "#x2557";
  var boxDR$1 = "#x2554";
  var boxDl$1 = "#x2556";
  var boxDr$1 = "#x2553";
  var boxH$1 = "#x2550";
  var boxHD$1 = "#x2566";
  var boxHU$1 = "#x2569";
  var boxHd$1 = "#x2564";
  var boxHu$1 = "#x2567";
  var boxUL$1 = "#x255D";
  var boxUR$1 = "#x255A";
  var boxUl$1 = "#x255C";
  var boxUr$1 = "#x2559";
  var boxV$1 = "#x2551";
  var boxVH$1 = "#x256C";
  var boxVL$1 = "#x2563";
  var boxVR$1 = "#x2560";
  var boxVh$1 = "#x256B";
  var boxVl$1 = "#x2562";
  var boxVr$1 = "#x255F";
  var boxbox$1 = "#x29C9";
  var boxdL$1 = "#x2555";
  var boxdR$1 = "#x2552";
  var boxdl$1 = "#x2510";
  var boxdr$1 = "#x250C";
  var boxh$1 = "#x2500";
  var boxhD$1 = "#x2565";
  var boxhU$1 = "#x2568";
  var boxhd$1 = "#x252C";
  var boxhu$1 = "#x2534";
  var boxminus$1 = "#x229F";
  var boxplus$1 = "#x229E";
  var boxtimes$1 = "#x22A0";
  var boxuL$1 = "#x255B";
  var boxuR$1 = "#x2558";
  var boxul$1 = "#x2518";
  var boxur$1 = "#x2514";
  var boxv$1 = "#x2502";
  var boxvH$1 = "#x256A";
  var boxvL$1 = "#x2561";
  var boxvR$1 = "#x255E";
  var boxvh$1 = "#x253C";
  var boxvl$1 = "#x2524";
  var boxvr$1 = "#x251C";
  var bprime$1 = "#x2035";
  var breve$2 = "#x2D8";
  var bscr$1 = "#x1D4B7";
  var bsemi$1 = "#x204F";
  var bsim$1 = "#x223D";
  var bsime$1 = "#x22CD";
  var bsolb$1 = "#x29C5";
  var bsolhsub$1 = "#x27C8";
  var bullet$2 = "bull";
  var bump$2 = "#x224E";
  var bumpE$1 = "#x2AAE";
  var bumpe$1 = "#x224F";
  var bumpeq$1 = "#x224F";
  var cacute$2 = "#x107";
  var capand$2 = "#x2A44";
  var capbrcup$1 = "#x2A49";
  var capcap$1 = "#x2A4B";
  var capcup$1 = "#x2A47";
  var capdot$1 = "#x2A40";
  var caps$2 = "#x2229;&#xFE00";
  var caret$2 = "#x2041";
  var caron$2 = "#x2C7";
  var ccaps$1 = "#x2A4D";
  var ccaron$1 = "#x10D";
  var ccirc$1 = "#x109";
  var ccups$1 = "#x2A4C";
  var ccupssm$1 = "#x2A50";
  var cdot$1 = "#x10B";
  var cemptyv$1 = "#x29B2";
  var centerdot$1 = "middot";
  var cfr$1 = "#x1D520";
  var chcy$1 = "#x447";
  var check$2 = "#x2713";
  var checkmark$2 = "#x2713";
  var cir$2 = "#x25CB";
  var cirE$1 = "#x29C3";
  var circeq$1 = "#x2257";
  var circlearrowleft$1 = "#x21BA";
  var circlearrowright$1 = "#x21BB";
  var circledR$1 = "reg";
  var circledS$1 = "#x24C8";
  var circledast$1 = "#x229B";
  var circledcirc$1 = "#x229A";
  var circleddash$1 = "#x229D";
  var cire$1 = "#x2257";
  var cirfnint$1 = "#x2A10";
  var cirmid$1 = "#x2AEF";
  var cirscir$1 = "#x29C2";
  var clubsuit$2 = "clubs";
  var colone$2 = "#x2254";
  var coloneq$1 = "#x2254";
  var comp$2 = "#x2201";
  var compfn$1 = "#x2218";
  var complement$2 = "#x2201";
  var complexes$2 = "#x2102";
  var congdot$1 = "#x2A6D";
  var conint$2 = "#x222E";
  var copf$2 = "#x1D554";
  var coprod$2 = "#x2210";
  var copysr$1 = "#x2117";
  var cross$2 = "#x2717";
  var cscr$1 = "#x1D4B8";
  var csub$1 = "#x2ACF";
  var csube$1 = "#x2AD1";
  var csup$1 = "#x2AD0";
  var csupe$1 = "#x2AD2";
  var ctdot$1 = "#x22EF";
  var cudarrl$1 = "#x2938";
  var cudarrr$1 = "#x2935";
  var cuepr$1 = "#x22DE";
  var cuesc$1 = "#x22DF";
  var cularr$1 = "#x21B6";
  var cularrp$1 = "#x293D";
  var cupbrcap$1 = "#x2A48";
  var cupcap$1 = "#x2A46";
  var cupcup$1 = "#x2A4A";
  var cupdot$1 = "#x228D";
  var cupor$1 = "#x2A45";
  var cups$2 = "#x222A;&#xFE00";
  var curarr$1 = "#x21B7";
  var curarrm$1 = "#x293C";
  var curlyeqprec$1 = "#x22DE";
  var curlyeqsucc$1 = "#x22DF";
  var curlyvee$1 = "#x22CE";
  var curlywedge$1 = "#x22CF";
  var curvearrowleft$1 = "#x21B6";
  var curvearrowright$1 = "#x21B7";
  var cuvee$1 = "#x22CE";
  var cuwed$1 = "#x22CF";
  var cwconint$1 = "#x2232";
  var cwint$1 = "#x2231";
  var cylcty$1 = "#x232D";
  var dHar$1 = "#x2965";
  var daleth$2 = "#x2138";
  var dash$2 = "#x2010";
  var dashv$1 = "#x22A3";
  var dbkarow$1 = "#x290F";
  var dblac$1 = "#x2DD";
  var dcaron$1 = "#x10F";
  var dcy$1 = "#x434";
  var dd$2 = "#x2146";
  var ddagger$1 = "Dagger";
  var ddarr$1 = "#x21CA";
  var ddotseq$1 = "#x2A77";
  var demptyv$1 = "#x29B1";
  var dfisht$1 = "#x297F";
  var dfr$1 = "#x1D521";
  var dharl$1 = "#x21C3";
  var dharr$2 = "#x21C2";
  var diam$2 = "#x22C4";
  var diamond$2 = "#x22C4";
  var diamondsuit$1 = "diams";
  var die$2 = "#xA8";
  var digamma$2 = "#x3DD";
  var disin$2 = "#x22F2";
  var div$2 = "#xF7";
  var divideontimes$1 = "#x22C7";
  var divonx$1 = "#x22C7";
  var djcy$1 = "#x452";
  var dlcorn$1 = "#x231E";
  var dlcrop$1 = "#x230D";
  var dopf$2 = "#x1D555";
  var dot$2 = "#x2D9";
  var doteq$1 = "#x2250";
  var doteqdot$1 = "#x2251";
  var dotminus$1 = "#x2238";
  var dotplus$1 = "#x2214";
  var dotsquare$1 = "#x22A1";
  var doublebarwedge$1 = "#x2306";
  var downarrow$1 = "darr";
  var downdownarrows$1 = "#x21CA";
  var downharpoonleft$1 = "#x21C3";
  var downharpoonright$1 = "#x21C2";
  var drbkarow$1 = "#x2910";
  var drcorn$1 = "#x231F";
  var drcrop$1 = "#x230C";
  var dscr$1 = "#x1D4B9";
  var dscy$1 = "#x455";
  var dsol$2 = "#x29F6";
  var dstrok$1 = "#x111";
  var dtdot$1 = "#x22F1";
  var dtri$2 = "#x25BF";
  var dtrif$1 = "#x25BE";
  var duarr$1 = "#x21F5";
  var duhar$1 = "#x296F";
  var dwangle$1 = "#x29A6";
  var dzcy$1 = "#x45F";
  var dzigrarr$1 = "#x27FF";
  var eDDot$1 = "#x2A77";
  var eDot$1 = "#x2251";
  var easter$2 = "#x2A6E";
  var ecaron$1 = "#x11B";
  var ecir$2 = "#x2256";
  var ecolon$2 = "#x2255";
  var ecy$2 = "#x44D";
  var edot$2 = "#x117";
  var ee$2 = "#x2147";
  var efDot$1 = "#x2252";
  var efr$2 = "#x1D522";
  var eg$2 = "#x2A9A";
  var egs$2 = "#x2A96";
  var egsdot$1 = "#x2A98";
  var el$2 = "#x2A99";
  var elinters$1 = "#x23E7";
  var ell$2 = "#x2113";
  var els$2 = "#x2A95";
  var elsdot$1 = "#x2A97";
  var emacr$1 = "#x113";
  var emptyset$1 = "empty";
  var emptyv$1 = "empty";
  var emsp13$1 = "#x2004";
  var emsp14$1 = "#x2005";
  var eng$2 = "#x14B";
  var eogon$1 = "#x119";
  var eopf$1 = "#x1D556";
  var epar$1 = "#x22D5";
  var eparsl$1 = "#x29E3";
  var eplus$1 = "#x2A71";
  var epsi$2 = "#x3B5";
  var epsiv$1 = "#x3F5";
  var eqcirc$1 = "#x2256";
  var eqcolon$1 = "#x2255";
  var eqsim$1 = "#x2242";
  var eqslantgtr$1 = "#x2A96";
  var eqslantless$1 = "#x2A95";
  var equest$2 = "#x225F";
  var equivDD$1 = "#x2A78";
  var eqvparsl$1 = "#x29E5";
  var erDot$1 = "#x2253";
  var erarr$1 = "#x2971";
  var escr$2 = "#x212F";
  var esdot$1 = "#x2250";
  var esim$2 = "#x2242";
  var expectation$2 = "#x2130";
  var exponentiale$1 = "#x2147";
  var fallingdotseq$1 = "#x2252";
  var fcy$1 = "#x444";
  var female$2 = "#x2640";
  var ffilig$1 = "#xFB03";
  var fflig$1 = "#xFB00";
  var ffllig$1 = "#xFB04";
  var ffr$1 = "#x1D523";
  var filig$1 = "#xFB01";
  var flat$2 = "#x266D";
  var fllig$1 = "#xFB02";
  var fltns$1 = "#x25B1";
  var fopf$1 = "#x1D557";
  var fork$2 = "#x22D4";
  var forkv$1 = "#x2AD9";
  var fpartint$1 = "#x2A0D";
  var frac13$1 = "#x2153";
  var frac15$1 = "#x2155";
  var frac16$1 = "#x2159";
  var frac18$1 = "#x215B";
  var frac23$1 = "#x2154";
  var frac25$1 = "#x2156";
  var frac35$1 = "#x2157";
  var frac38$1 = "#x215C";
  var frac45$1 = "#x2158";
  var frac56$1 = "#x215A";
  var frac58$1 = "#x215D";
  var frac78$1 = "#x215E";
  var frown$2 = "#x2322";
  var fscr$1 = "#x1D4BB";
  var gE$1 = "#x2267";
  var gEl$1 = "#x2A8C";
  var gacute$1 = "#x1F5";
  var gammad$1 = "#x3DD";
  var gap$2 = "#x2A86";
  var gbreve$1 = "#x11F";
  var gcirc$1 = "#x11D";
  var gcy$2 = "#x433";
  var gdot$1 = "#x121";
  var gel$2 = "#x22DB";
  var geq$2 = "ge";
  var geqq$1 = "#x2267";
  var geqslant$1 = "#x2A7E";
  var ges$2 = "#x2A7E";
  var gescc$1 = "#x2AA9";
  var gesdot$1 = "#x2A80";
  var gesdoto$1 = "#x2A82";
  var gesdotol$1 = "#x2A84";
  var gesl$2 = "#x22DB;&#xFE00";
  var gesles$1 = "#x2A94";
  var gfr$1 = "#x1D524";
  var gg$2 = "#x226B";
  var ggg$1 = "#x22D9";
  var gimel$1 = "#x2137";
  var gjcy$1 = "#x453";
  var gl$2 = "#x2277";
  var glE$1 = "#x2A92";
  var gla$2 = "#x2AA5";
  var glj$1 = "#x2AA4";
  var gnE$1 = "#x2269";
  var gnap$1 = "#x2A8A";
  var gnapprox$1 = "#x2A8A";
  var gne$2 = "#x2A88";
  var gneq$1 = "#x2A88";
  var gneqq$1 = "#x2269";
  var gnsim$1 = "#x22E7";
  var gopf$1 = "#x1D558";
  var grave$2 = "#x60";
  var gscr$1 = "#x210A";
  var gsim$1 = "#x2273";
  var gsime$1 = "#x2A8E";
  var gsiml$1 = "#x2A90";
  var gtcc$1 = "#x2AA7";
  var gtcir$1 = "#x2A7A";
  var gtdot$1 = "#x22D7";
  var gtlPar$1 = "#x2995";
  var gtquest$1 = "#x2A7C";
  var gtrapprox$1 = "#x2A86";
  var gtrarr$1 = "#x2978";
  var gtrdot$1 = "#x22D7";
  var gtreqless$1 = "#x22DB";
  var gtreqqless$1 = "#x2A8C";
  var gtrless$1 = "#x2277";
  var gtrsim$1 = "#x2273";
  var gvertneqq$1 = "#x2269;&#xFE00";
  var gvnE$1 = "#x2269;&#xFE00";
  var hairsp$1 = "#x200A";
  var half$2 = "#xBD";
  var hamilt$1 = "#x210B";
  var hardcy$1 = "#x44A";
  var harrcir$1 = "#x2948";
  var harrw$1 = "#x21AD";
  var hbar$1 = "#x210F";
  var hcirc$1 = "#x125";
  var heartsuit$1 = "hearts";
  var hercon$1 = "#x22B9";
  var hfr$1 = "#x1D525";
  var hksearow$1 = "#x2925";
  var hkswarow$1 = "#x2926";
  var hoarr$1 = "#x21FF";
  var homtht$1 = "#x223B";
  var hookleftarrow$1 = "#x21A9";
  var hookrightarrow$1 = "#x21AA";
  var hopf$2 = "#x1D559";
  var horbar$1 = "#x2015";
  var hscr$1 = "#x1D4BD";
  var hslash$1 = "#x210F";
  var hstrok$1 = "#x127";
  var hybull$1 = "#x2043";
  var hyphen$2 = "#x2010";
  var ic$2 = "#x2063";
  var icy$2 = "#x438";
  var iecy$1 = "#x435";
  var iff$2 = "#x21D4";
  var ifr$1 = "#x1D526";
  var ii$2 = "#x2148";
  var iiiint$1 = "#x2A0C";
  var iiint$1 = "#x222D";
  var iinfin$1 = "#x29DC";
  var iiota$1 = "#x2129";
  var ijlig$1 = "#x133";
  var imacr$1 = "#x12B";
  var imagline$1 = "#x2110";
  var imagpart$1 = "#x2111";
  var imath$1 = "#x131";
  var imof$1 = "#x22B7";
  var imped$2 = "#x1B5";
  var incare$1 = "#x2105";
  var infintie$1 = "#x29DD";
  var inodot$1 = "#x131";
  var intcal$1 = "#x22BA";
  var integers$2 = "#x2124";
  var intercal$1 = "#x22BA";
  var intlarhk$1 = "#x2A17";
  var intprod$1 = "#x2A3C";
  var iocy$2 = "#x451";
  var iogon$2 = "#x12F";
  var iopf$1 = "#x1D55A";
  var iprod$1 = "#x2A3C";
  var iscr$1 = "#x1D4BE";
  var isinE$1 = "#x22F9";
  var isindot$1 = "#x22F5";
  var isins$1 = "#x22F4";
  var isinsv$1 = "#x22F3";
  var isinv$1 = "#x2208";
  var it$2 = "#x2062";
  var itilde$1 = "#x129";
  var iukcy$1 = "#x456";
  var jcirc$1 = "#x135";
  var jcy$1 = "#x439";
  var jfr$1 = "#x1D527";
  var jmath$1 = "#x237";
  var jopf$1 = "#x1D55B";
  var jscr$1 = "#x1D4BF";
  var jsercy$1 = "#x458";
  var jukcy$1 = "#x454";
  var kappav$1 = "#x3F0";
  var kcedil$1 = "#x137";
  var kcy$1 = "#x43A";
  var kfr$1 = "#x1D528";
  var kgreen$1 = "#x138";
  var khcy$1 = "#x445";
  var kjcy$1 = "#x45C";
  var kopf$2 = "#x1D55C";
  var kscr$1 = "#x1D4C0";
  var lAarr$1 = "#x21DA";
  var lAtail$1 = "#x291B";
  var lBarr$1 = "#x290E";
  var lE$1 = "#x2266";
  var lEg$1 = "#x2A8B";
  var lHar$1 = "#x2962";
  var lacute$1 = "#x13A";
  var laemptyv$1 = "#x29B4";
  var lagran$1 = "#x2112";
  var langd$1 = "#x2991";
  var langle$1 = "lang";
  var lap$2 = "#x2A85";
  var larrb$1 = "#x21E4";
  var larrbfs$1 = "#x291F";
  var larrfs$1 = "#x291D";
  var larrhk$1 = "#x21A9";
  var larrlp$1 = "#x21AB";
  var larrpl$1 = "#x2939";
  var larrsim$1 = "#x2973";
  var larrtl$1 = "#x21A2";
  var lat$2 = "#x2AAB";
  var latail$1 = "#x2919";
  var late$2 = "#x2AAD";
  var lates$2 = "#x2AAD;&#xFE00";
  var lbarr$1 = "#x290C";
  var lbbrk$1 = "#x2772";
  var lbrace$1 = "{";
  var lbrack$1 = "[";
  var lbrke$1 = "#x298B";
  var lbrksld$1 = "#x298F";
  var lbrkslu$1 = "#x298D";
  var lcaron$1 = "#x13E";
  var lcedil$1 = "#x13C";
  var lcub$1 = "{";
  var lcy$1 = "#x43B";
  var ldca$1 = "#x2936";
  var ldquor$1 = "bdquo";
  var ldrdhar$1 = "#x2967";
  var ldrushar$1 = "#x294B";
  var ldsh$1 = "#x21B2";
  var leftarrow$1 = "larr";
  var leftarrowtail$1 = "#x21A2";
  var leftharpoondown$1 = "#x21BD";
  var leftharpoonup$1 = "#x21BC";
  var leftleftarrows$1 = "#x21C7";
  var leftrightarrow$1 = "harr";
  var leftrightarrows$1 = "#x21C6";
  var leftrightharpoons$1 = "#x21CB";
  var leftrightsquigarrow$1 = "#x21AD";
  var leftthreetimes$1 = "#x22CB";
  var leg$2 = "#x22DA";
  var leq$2 = "le";
  var leqq$1 = "#x2266";
  var leqslant$1 = "#x2A7D";
  var les$2 = "#x2A7D";
  var lescc$1 = "#x2AA8";
  var lesdot$1 = "#x2A7F";
  var lesdoto$1 = "#x2A81";
  var lesdotor$1 = "#x2A83";
  var lesg$1 = "#x22DA;&#xFE00";
  var lesges$1 = "#x2A93";
  var lessapprox$1 = "#x2A85";
  var lessdot$1 = "#x22D6";
  var lesseqgtr$1 = "#x22DA";
  var lesseqqgtr$1 = "#x2A8B";
  var lessgtr$1 = "#x2276";
  var lesssim$1 = "#x2272";
  var lfisht$1 = "#x297C";
  var lfr$1 = "#x1D529";
  var lg$2 = "#x2276";
  var lgE$1 = "#x2A91";
  var lhard$1 = "#x21BD";
  var lharu$1 = "#x21BC";
  var lharul$1 = "#x296A";
  var lhblk$1 = "#x2584";
  var ljcy$1 = "#x459";
  var ll$2 = "#x226A";
  var llarr$1 = "#x21C7";
  var llcorner$1 = "#x231E";
  var llhard$1 = "#x296B";
  var lltri$1 = "#x25FA";
  var lmidot$1 = "#x140";
  var lmoust$1 = "#x23B0";
  var lmoustache$1 = "#x23B0";
  var lnE$1 = "#x2268";
  var lnap$1 = "#x2A89";
  var lnapprox$1 = "#x2A89";
  var lne$2 = "#x2A87";
  var lneq$1 = "#x2A87";
  var lneqq$1 = "#x2268";
  var lnsim$1 = "#x22E6";
  var loang$1 = "#x27EC";
  var loarr$1 = "#x21FD";
  var lobrk$1 = "#x27E6";
  var longleftarrow$1 = "#x27F5";
  var longleftrightarrow$1 = "#x27F7";
  var longmapsto$1 = "#x27FC";
  var longrightarrow$1 = "#x27F6";
  var looparrowleft$1 = "#x21AB";
  var looparrowright$1 = "#x21AC";
  var lopar$1 = "#x2985";
  var lopf$1 = "#x1D55D";
  var loplus$1 = "#x2A2D";
  var lotimes$1 = "#x2A34";
  var lozenge$2 = "loz";
  var lozf$1 = "#x29EB";
  var lparlt$1 = "#x2993";
  var lrarr$1 = "#x21C6";
  var lrcorner$1 = "#x231F";
  var lrhar$1 = "#x21CB";
  var lrhard$1 = "#x296D";
  var lrtri$1 = "#x22BF";
  var lscr$1 = "#x1D4C1";
  var lsh$2 = "#x21B0";
  var lsim$1 = "#x2272";
  var lsime$1 = "#x2A8D";
  var lsimg$1 = "#x2A8F";
  var lsquor$1 = "sbquo";
  var lstrok$1 = "#x142";
  var ltcc$1 = "#x2AA6";
  var ltcir$1 = "#x2A79";
  var ltdot$1 = "#x22D6";
  var lthree$1 = "#x22CB";
  var ltimes$2 = "#x22C9";
  var ltlarr$1 = "#x2976";
  var ltquest$1 = "#x2A7B";
  var ltrPar$1 = "#x2996";
  var ltri$1 = "#x25C3";
  var ltrie$1 = "#x22B4";
  var ltrif$1 = "#x25C2";
  var lurdshar$1 = "#x294A";
  var luruhar$1 = "#x2966";
  var lvertneqq$1 = "#x2268;&#xFE00";
  var lvnE$1 = "#x2268;&#xFE00";
  var mDDot$1 = "#x223A";
  var male$2 = "#x2642";
  var malt$2 = "#x2720";
  var maltese$1 = "#x2720";
  var map$2 = "#x21A6";
  var mapsto$1 = "#x21A6";
  var mapstodown$1 = "#x21A7";
  var mapstoleft$1 = "#x21A4";
  var mapstoup$1 = "#x21A5";
  var marker$2 = "#x25AE";
  var mcomma$1 = "#x2A29";
  var mcy$1 = "#x43C";
  var measuredangle$1 = "#x2221";
  var mfr$1 = "#x1D52A";
  var mho$1 = "#x2127";
  var mid$2 = "#x2223";
  var midcir$1 = "#x2AF0";
  var minusb$1 = "#x229F";
  var minusd$1 = "#x2238";
  var minusdu$1 = "#x2A2A";
  var mlcp$1 = "#x2ADB";
  var mldr$1 = "#x2026";
  var mnplus$1 = "#x2213";
  var models$2 = "#x22A7";
  var mopf$1 = "#x1D55E";
  var mp$2 = "#x2213";
  var mscr$1 = "#x1D4C2";
  var mstpos$1 = "#x223E";
  var multimap$1 = "#x22B8";
  var mumap$1 = "#x22B8";
  var nGg$1 = "#x22D9;&#x338";
  var nGt$1 = "#x226B;&#x20D2";
  var nGtv$1 = "#x226B;&#x338";
  var nLeftarrow$1 = "#x21CD";
  var nLeftrightarrow$1 = "#x21CE";
  var nLl$1 = "#x22D8;&#x338";
  var nLt$1 = "#x226A;&#x20D2";
  var nLtv$1 = "#x226A;&#x338";
  var nRightarrow$1 = "#x21CF";
  var nVDash$1 = "#x22AF";
  var nVdash$1 = "#x22AE";
  var nacute$1 = "#x144";
  var nang$2 = "#x2220;&#x20D2";
  var nap$2 = "#x2249";
  var napE$1 = "#x2A70;&#x338";
  var napid$1 = "#x224B;&#x338";
  var napos$1 = "#x149";
  var napprox$1 = "#x2249";
  var natur$1 = "#x266E";
  var natural$2 = "#x266E";
  var naturals$2 = "#x2115";
  var nbump$1 = "#x224E;&#x338";
  var nbumpe$1 = "#x224F;&#x338";
  var ncap$1 = "#x2A43";
  var ncaron$1 = "#x148";
  var ncedil$1 = "#x146";
  var ncong$1 = "#x2247";
  var ncongdot$1 = "#x2A6D;&#x338";
  var ncup$1 = "#x2A42";
  var ncy$2 = "#x43D";
  var neArr$1 = "#x21D7";
  var nearhk$1 = "#x2924";
  var nearr$1 = "#x2197";
  var nearrow$1 = "#x2197";
  var nedot$1 = "#x2250;&#x338";
  var nequiv$1 = "#x2262";
  var nesear$1 = "#x2928";
  var nesim$1 = "#x2242;&#x338";
  var nexist$1 = "#x2204";
  var nexists$1 = "#x2204";
  var nfr$1 = "#x1D52B";
  var ngE$1 = "#x2267;&#x338";
  var nge$2 = "#x2271";
  var ngeq$1 = "#x2271";
  var ngeqq$1 = "#x2267;&#x338";
  var ngeqslant$1 = "#x2A7E;&#x338";
  var nges$1 = "#x2A7E;&#x338";
  var ngsim$1 = "#x2275";
  var ngt$2 = "#x226F";
  var ngtr$1 = "#x226F";
  var nhArr$1 = "#x21CE";
  var nharr$1 = "#x21AE";
  var nhpar$1 = "#x2AF2";
  var nis$2 = "#x22FC";
  var nisd$1 = "#x22FA";
  var niv$1 = "ni";
  var njcy$1 = "#x45A";
  var nlArr$1 = "#x21CD";
  var nlE$1 = "#x2266;&#x338";
  var nlarr$1 = "#x219A";
  var nldr$1 = "#x2025";
  var nle$2 = "#x2270";
  var nleftarrow$1 = "#x219A";
  var nleftrightarrow$1 = "#x21AE";
  var nleq$1 = "#x2270";
  var nleqq$1 = "#x2266;&#x338";
  var nleqslant$1 = "#x2A7D;&#x338";
  var nles$2 = "#x2A7D;&#x338";
  var nless$2 = "#x226E";
  var nlsim$1 = "#x2274";
  var nlt$2 = "#x226E";
  var nltri$1 = "#x22EA";
  var nltrie$1 = "#x22EC";
  var nmid$1 = "#x2224";
  var nopf$2 = "#x1D55F";
  var notinE$1 = "#x22F9;&#x338";
  var notindot$1 = "#x22F5;&#x338";
  var notinva$1 = "notin";
  var notinvb$1 = "#x22F7";
  var notinvc$1 = "#x22F6";
  var notni$1 = "#x220C";
  var notniva$1 = "#x220C";
  var notnivb$1 = "#x22FE";
  var notnivc$1 = "#x22FD";
  var npar$1 = "#x2226";
  var nparallel$1 = "#x2226";
  var nparsl$1 = "#x2AFD;&#x20E5";
  var npart$1 = "#x2202;&#x338";
  var npolint$1 = "#x2A14";
  var npr$1 = "#x2280";
  var nprcue$1 = "#x22E0";
  var npre$1 = "#x2AAF;&#x338";
  var nprec$1 = "#x2280";
  var npreceq$1 = "#x2AAF;&#x338";
  var nrArr$1 = "#x21CF";
  var nrarr$1 = "#x219B";
  var nrarrc$1 = "#x2933;&#x338";
  var nrarrw$1 = "#x219D;&#x338";
  var nrightarrow$1 = "#x219B";
  var nrtri$1 = "#x22EB";
  var nrtrie$1 = "#x22ED";
  var nsc$2 = "#x2281";
  var nsccue$1 = "#x22E1";
  var nsce$2 = "#x2AB0;&#x338";
  var nscr$1 = "#x1D4C3";
  var nshortmid$1 = "#x2224";
  var nshortparallel$1 = "#x2226";
  var nsim$1 = "#x2241";
  var nsime$1 = "#x2244";
  var nsimeq$1 = "#x2244";
  var nsmid$1 = "#x2224";
  var nspar$1 = "#x2226";
  var nsqsube$1 = "#x22E2";
  var nsqsupe$1 = "#x22E3";
  var nsubE$1 = "#x2AC5;&#x338";
  var nsube$1 = "#x2288";
  var nsubset$1 = "#x2282;&#x20D2";
  var nsubseteq$1 = "#x2288";
  var nsubseteqq$1 = "#x2AC5;&#x338";
  var nsucc$1 = "#x2281";
  var nsucceq$1 = "#x2AB0;&#x338";
  var nsup$1 = "#x2285";
  var nsupE$1 = "#x2AC6;&#x338";
  var nsupe$1 = "#x2289";
  var nsupset$1 = "#x2283;&#x20D2";
  var nsupseteq$1 = "#x2289";
  var nsupseteqq$1 = "#x2AC6;&#x338";
  var ntgl$1 = "#x2279";
  var ntlg$1 = "#x2278";
  var ntriangleleft$1 = "#x22EA";
  var ntrianglelefteq$1 = "#x22EC";
  var ntriangleright$1 = "#x22EB";
  var ntrianglerighteq$1 = "#x22ED";
  var numero$1 = "#x2116";
  var numsp$1 = "#x2007";
  var nvDash$1 = "#x22AD";
  var nvHarr$1 = "#x2904";
  var nvap$1 = "#x224D;&#x20D2";
  var nvdash$1 = "#x22AC";
  var nvge$1 = "#x2265;&#x20D2";
  var nvgt$1 = "#x3E;&#x20D2";
  var nvinfin$1 = "#x29DE";
  var nvlArr$1 = "#x2902";
  var nvle$1 = "#x2264;&#x20D2";
  var nvlt$1 = "#x3C;&#x20D2";
  var nvltrie$1 = "#x22B4;&#x20D2";
  var nvrArr$1 = "#x2903";
  var nvrtrie$1 = "#x22B5;&#x20D2";
  var nvsim$1 = "#x223C;&#x20D2";
  var nwArr$1 = "#x21D6";
  var nwarhk$1 = "#x2923";
  var nwarr$1 = "#x2196";
  var nwarrow$1 = "#x2196";
  var nwnear$1 = "#x2927";
  var oS$1 = "#x24C8";
  var oast$1 = "#x229B";
  var ocir$1 = "#x229A";
  var ocy$1 = "#x43E";
  var odash$1 = "#x229D";
  var odblac$1 = "#x151";
  var odiv$1 = "#x2A38";
  var odot$1 = "#x2299";
  var odsold$1 = "#x29BC";
  var ofcir$1 = "#x29BF";
  var ofr$1 = "#x1D52C";
  var ogon$1 = "#x2DB";
  var ogt$2 = "#x29C1";
  var ohbar$1 = "#x29B5";
  var ohm$2 = "#x3A9";
  var oint$1 = "#x222E";
  var olarr$1 = "#x21BA";
  var olcir$1 = "#x29BE";
  var olcross$1 = "#x29BB";
  var olt$2 = "#x29C0";
  var omacr$1 = "#x14D";
  var omid$1 = "#x29B6";
  var ominus$1 = "#x2296";
  var oopf$2 = "#x1D560";
  var opar$2 = "#x29B7";
  var operp$1 = "#x29B9";
  var orarr$1 = "#x21BB";
  var ord$1 = "#x2A5D";
  var order$2 = "#x2134";
  var orderof$1 = "#x2134";
  var origof$1 = "#x22B6";
  var oror$2 = "#x2A56";
  var orslope$1 = "#x2A57";
  var orv$2 = "#x2A5B";
  var oscr$1 = "#x2134";
  var osol$2 = "#x2298";
  var otimesas$1 = "#x2A36";
  var ovbar$1 = "#x233D";
  var par$2 = "#x2225";
  var parallel$2 = "#x2225";
  var parsim$1 = "#x2AF3";
  var parsl$1 = "#x2AFD";
  var pcy$1 = "#x43F";
  var pertenk$1 = "#x2031";
  var pfr$1 = "#x1D52D";
  var phiv$1 = "#x3D5";
  var phmmat$1 = "#x2133";
  var phone$2 = "#x260E";
  var pitchfork$2 = "#x22D4";
  var planck$1 = "#x210F";
  var planckh$1 = "#x210E";
  var plankv$1 = "#x210F";
  var plusacir$1 = "#x2A23";
  var plusb$1 = "#x229E";
  var pluscir$1 = "#x2A22";
  var plusdo$1 = "#x2214";
  var plusdu$1 = "#x2A25";
  var pluse$1 = "#x2A72";
  var plussim$1 = "#x2A26";
  var plustwo$1 = "#x2A27";
  var pm$2 = "#xB1";
  var pointint$1 = "#x2A15";
  var popf$2 = "#x1D561";
  var pr$2 = "#x227A";
  var prE$1 = "#x2AB3";
  var prap$1 = "#x2AB7";
  var prcue$1 = "#x227C";
  var pre$1 = "#x2AAF";
  var prec$1 = "#x227A";
  var precapprox$1 = "#x2AB7";
  var preccurlyeq$1 = "#x227C";
  var preceq$1 = "#x2AAF";
  var precnapprox$1 = "#x2AB9";
  var precneqq$1 = "#x2AB5";
  var precnsim$1 = "#x22E8";
  var precsim$1 = "#x227E";
  var primes$2 = "#x2119";
  var prnE$1 = "#x2AB5";
  var prnap$1 = "#x2AB9";
  var prnsim$1 = "#x22E8";
  var profalar$1 = "#x232E";
  var profline$1 = "#x2312";
  var profsurf$1 = "#x2313";
  var propto$1 = "prop";
  var prsim$1 = "#x227E";
  var prurel$1 = "#x22B0";
  var pscr$1 = "#x1D4C5";
  var puncsp$1 = "#x2008";
  var qfr$1 = "#x1D52E";
  var qint$1 = "#x2A0C";
  var qopf$1 = "#x1D562";
  var qprime$1 = "#x2057";
  var qscr$1 = "#x1D4C6";
  var quaternions$1 = "#x210D";
  var quatint$1 = "#x2A16";
  var questeq$1 = "#x225F";
  var rAarr$1 = "#x21DB";
  var rAtail$1 = "#x291C";
  var rBarr$1 = "#x290F";
  var rHar$1 = "#x2964";
  var race$2 = "#x223D;&#x331";
  var racute$1 = "#x155";
  var raemptyv$1 = "#x29B3";
  var rangd$1 = "#x2992";
  var range$2 = "#x29A5";
  var rangle$1 = "rang";
  var rarrap$1 = "#x2975";
  var rarrb$1 = "#x21E5";
  var rarrbfs$1 = "#x2920";
  var rarrc$1 = "#x2933";
  var rarrfs$1 = "#x291E";
  var rarrhk$1 = "#x21AA";
  var rarrlp$1 = "#x21AC";
  var rarrpl$1 = "#x2945";
  var rarrsim$1 = "#x2974";
  var rarrtl$1 = "#x21A3";
  var rarrw$1 = "#x219D";
  var ratail$1 = "#x291A";
  var ratio$2 = "#x2236";
  var rationals$1 = "#x211A";
  var rbarr$1 = "#x290D";
  var rbbrk$1 = "#x2773";
  var rbrke$1 = "#x298C";
  var rbrksld$1 = "#x298E";
  var rbrkslu$1 = "#x2990";
  var rcaron$1 = "#x159";
  var rcedil$1 = "#x157";
  var rcy$1 = "#x440";
  var rdca$1 = "#x2937";
  var rdldhar$1 = "#x2969";
  var rdquor$1 = "rdquo";
  var rdsh$1 = "#x21B3";
  var realine$1 = "#x211B";
  var realpart$1 = "#x211C";
  var reals$2 = "#x211D";
  var rect$2 = "#x25AD";
  var rfisht$1 = "#x297D";
  var rfr$1 = "#x1D52F";
  var rhard$1 = "#x21C1";
  var rharu$1 = "#x21C0";
  var rharul$1 = "#x296C";
  var rhov$1 = "#x3F1";
  var rightarrow$1 = "rarr";
  var rightarrowtail$1 = "#x21A3";
  var rightharpoondown$1 = "#x21C1";
  var rightharpoonup$1 = "#x21C0";
  var rightleftarrows$1 = "#x21C4";
  var rightleftharpoons$1 = "#x21CC";
  var rightrightarrows$1 = "#x21C9";
  var rightsquigarrow$1 = "#x219D";
  var rightthreetimes$1 = "#x22CC";
  var ring$2 = "#x2DA";
  var risingdotseq$1 = "#x2253";
  var rlarr$1 = "#x21C4";
  var rlhar$1 = "#x21CC";
  var rmoust$1 = "#x23B1";
  var rmoustache$1 = "#x23B1";
  var rnmid$1 = "#x2AEE";
  var roang$1 = "#x27ED";
  var roarr$1 = "#x21FE";
  var robrk$1 = "#x27E7";
  var ropar$1 = "#x2986";
  var ropf$1 = "#x1D563";
  var roplus$1 = "#x2A2E";
  var rotimes$1 = "#x2A35";
  var rpargt$1 = "#x2994";
  var rppolint$1 = "#x2A12";
  var rrarr$1 = "#x21C9";
  var rscr$1 = "#x1D4C7";
  var rsh$2 = "#x21B1";
  var rsquor$1 = "rsquo";
  var rthree$1 = "#x22CC";
  var rtimes$1 = "#x22CA";
  var rtri$1 = "#x25B9";
  var rtrie$1 = "#x22B5";
  var rtrif$1 = "#x25B8";
  var rtriltri$1 = "#x29CE";
  var ruluhar$1 = "#x2968";
  var rx$1 = "#x211E";
  var sacute$1 = "#x15B";
  var sc$2 = "#x227B";
  var scE$1 = "#x2AB4";
  var scap$2 = "#x2AB8";
  var sccue$1 = "#x227D";
  var sce$2 = "#x2AB0";
  var scedil$1 = "#x15F";
  var scirc$1 = "#x15D";
  var scnE$1 = "#x2AB6";
  var scnap$1 = "#x2ABA";
  var scnsim$1 = "#x22E9";
  var scpolint$1 = "#x2A13";
  var scsim$1 = "#x227F";
  var scy$2 = "#x441";
  var sdotb$1 = "#x22A1";
  var sdote$1 = "#x2A66";
  var seArr$1 = "#x21D8";
  var searhk$1 = "#x2925";
  var searr$1 = "#x2198";
  var searrow$1 = "#x2198";
  var seswar$1 = "#x2929";
  var setminus$1 = "#x2216";
  var setmn$1 = "#x2216";
  var sext$1 = "#x2736";
  var sfr$1 = "#x1D530";
  var sfrown$1 = "#x2322";
  var sharp$2 = "#x266F";
  var shchcy$1 = "#x449";
  var shcy$1 = "#x448";
  var shortmid$1 = "#x2223";
  var shortparallel$1 = "#x2225";
  var sigmav$1 = "sigmaf";
  var simdot$1 = "#x2A6A";
  var sime$1 = "#x2243";
  var simeq$1 = "#x2243";
  var simg$1 = "#x2A9E";
  var simgE$1 = "#x2AA0";
  var siml$1 = "#x2A9D";
  var simlE$1 = "#x2A9F";
  var simne$1 = "#x2246";
  var simplus$1 = "#x2A24";
  var simrarr$1 = "#x2972";
  var slarr$1 = "larr";
  var smallsetminus$1 = "#x2216";
  var smashp$1 = "#x2A33";
  var smeparsl$1 = "#x29E4";
  var smid$1 = "#x2223";
  var smile$1 = "#x2323";
  var smt$1 = "#x2AAA";
  var smte$1 = "#x2AAC";
  var smtes$1 = "#x2AAC;&#xFE00";
  var softcy$1 = "#x44C";
  var solb$1 = "#x29C4";
  var solbar$1 = "#x233F";
  var sopf$1 = "#x1D564";
  var spadesuit$1 = "spades";
  var spar$1 = "#x2225";
  var sqcap$1 = "#x2293";
  var sqcaps$1 = "#x2293;&#xFE00";
  var sqcup$1 = "#x2294";
  var sqcups$1 = "#x2294;&#xFE00";
  var sqsub$1 = "#x228F";
  var sqsube$1 = "#x2291";
  var sqsubset$1 = "#x228F";
  var sqsubseteq$1 = "#x2291";
  var sqsup$1 = "#x2290";
  var sqsupe$1 = "#x2292";
  var sqsupset$1 = "#x2290";
  var sqsupseteq$1 = "#x2292";
  var squ$1 = "#x25A1";
  var square$2 = "#x25A1";
  var squarf$1 = "#x25AA";
  var squf$1 = "#x25AA";
  var srarr$1 = "rarr";
  var sscr$1 = "#x1D4C8";
  var ssetmn$1 = "#x2216";
  var ssmile$1 = "#x2323";
  var sstarf$1 = "#x22C6";
  var star$2 = "#x2606";
  var starf$1 = "#x2605";
  var straightepsilon$1 = "#x3F5";
  var straightphi$1 = "#x3D5";
  var strns$1 = "macr";
  var subE$1 = "#x2AC5";
  var subdot$1 = "#x2ABD";
  var subedot$1 = "#x2AC3";
  var submult$1 = "#x2AC1";
  var subnE$1 = "#x2ACB";
  var subne$1 = "#x228A";
  var subplus$1 = "#x2ABF";
  var subrarr$1 = "#x2979";
  var subset$1 = "sub";
  var subseteq$1 = "sube";
  var subseteqq$1 = "#x2AC5";
  var subsetneq$1 = "#x228A";
  var subsetneqq$1 = "#x2ACB";
  var subsim$1 = "#x2AC7";
  var subsub$1 = "#x2AD5";
  var subsup$1 = "#x2AD3";
  var succ$1 = "#x227B";
  var succapprox$1 = "#x2AB8";
  var succcurlyeq$1 = "#x227D";
  var succeq$1 = "#x2AB0";
  var succnapprox$1 = "#x2ABA";
  var succneqq$1 = "#x2AB6";
  var succnsim$1 = "#x22E9";
  var succsim$1 = "#x227F";
  var sung$1 = "#x266A";
  var supE$1 = "#x2AC6";
  var supdot$1 = "#x2ABE";
  var supdsub$1 = "#x2AD8";
  var supedot$1 = "#x2AC4";
  var suphsol$1 = "#x27C9";
  var suphsub$1 = "#x2AD7";
  var suplarr$1 = "#x297B";
  var supmult$1 = "#x2AC2";
  var supnE$1 = "#x2ACC";
  var supne$1 = "#x228B";
  var supplus$1 = "#x2AC0";
  var supset$1 = "sup";
  var supseteq$1 = "supe";
  var supseteqq$1 = "#x2AC6";
  var supsetneq$1 = "#x228B";
  var supsetneqq$1 = "#x2ACC";
  var supsim$1 = "#x2AC8";
  var supsub$1 = "#x2AD4";
  var supsup$1 = "#x2AD6";
  var swArr$1 = "#x21D9";
  var swarhk$1 = "#x2926";
  var swarr$1 = "#x2199";
  var swarrow$1 = "#x2199";
  var swnwar$1 = "#x292A";
  var target$2 = "#x2316";
  var tbrk$1 = "#x23B4";
  var tcaron$1 = "#x165";
  var tcedil$1 = "#x163";
  var tcy$1 = "#x442";
  var tdot$1 = "#x20DB";
  var telrec$1 = "#x2315";
  var tfr$1 = "#x1D531";
  var therefore$2 = "there4";
  var thetav$1 = "#x3D1";
  var thickapprox$1 = "#x2248";
  var thicksim$1 = "sim";
  var thkap$1 = "#x2248";
  var thksim$1 = "sim";
  var timesb$1 = "#x22A0";
  var timesbar$1 = "#x2A31";
  var timesd$1 = "#x2A30";
  var tint$2 = "#x222D";
  var toea$1 = "#x2928";
  var top$2 = "#x22A4";
  var topbot$1 = "#x2336";
  var topcir$1 = "#x2AF1";
  var topf$1 = "#x1D565";
  var topfork$1 = "#x2ADA";
  var tosa$2 = "#x2929";
  var tprime$1 = "#x2034";
  var triangle$2 = "#x25B5";
  var triangledown$1 = "#x25BF";
  var triangleleft$1 = "#x25C3";
  var trianglelefteq$1 = "#x22B4";
  var triangleq$1 = "#x225C";
  var triangleright$1 = "#x25B9";
  var trianglerighteq$1 = "#x22B5";
  var tridot$1 = "#x25EC";
  var trie$2 = "#x225C";
  var triminus$1 = "#x2A3A";
  var triplus$1 = "#x2A39";
  var trisb$1 = "#x29CD";
  var tritime$1 = "#x2A3B";
  var trpezium$1 = "#x23E2";
  var tscr$1 = "#x1D4C9";
  var tscy$1 = "#x446";
  var tshcy$1 = "#x45B";
  var tstrok$1 = "#x167";
  var twixt$1 = "#x226C";
  var twoheadleftarrow$1 = "#x219E";
  var twoheadrightarrow$1 = "#x21A0";
  var uHar$1 = "#x2963";
  var ubrcy$1 = "#x45E";
  var ubreve$1 = "#x16D";
  var ucy$2 = "#x443";
  var udarr$1 = "#x21C5";
  var udblac$1 = "#x171";
  var udhar$1 = "#x296E";
  var ufisht$1 = "#x297E";
  var ufr$1 = "#x1D532";
  var uharl$1 = "#x21BF";
  var uharr$1 = "#x21BE";
  var uhblk$1 = "#x2580";
  var ulcorn$1 = "#x231C";
  var ulcorner$1 = "#x231C";
  var ulcrop$1 = "#x230F";
  var ultri$1 = "#x25F8";
  var umacr$1 = "#x16B";
  var uogon$1 = "#x173";
  var uopf$1 = "#x1D566";
  var uparrow$1 = "uarr";
  var updownarrow$1 = "#x2195";
  var upharpoonleft$1 = "#x21BF";
  var upharpoonright$1 = "#x21BE";
  var uplus$2 = "#x228E";
  var upsi$2 = "#x3C5";
  var upuparrows$1 = "#x21C8";
  var urcorn$1 = "#x231D";
  var urcorner$1 = "#x231D";
  var urcrop$1 = "#x230E";
  var uring$2 = "#x16F";
  var urtri$1 = "#x25F9";
  var uscr$1 = "#x1D4CA";
  var utdot$1 = "#x22F0";
  var utilde$1 = "#x169";
  var utri$1 = "#x25B5";
  var utrif$1 = "#x25B4";
  var uuarr$1 = "#x21C8";
  var uwangle$1 = "#x29A7";
  var vArr$1 = "#x21D5";
  var vBar$1 = "#x2AE8";
  var vBarv$1 = "#x2AE9";
  var vDash$1 = "#x22A8";
  var vangrt$1 = "#x299C";
  var varepsilon$1 = "#x3F5";
  var varkappa$1 = "#x3F0";
  var varnothing$1 = "empty";
  var varphi$1 = "#x3D5";
  var varpi$1 = "piv";
  var varpropto$1 = "prop";
  var varr$1 = "#x2195";
  var varrho$1 = "#x3F1";
  var varsigma$1 = "sigmaf";
  var varsubsetneq$1 = "#x228A;&#xFE00";
  var varsubsetneqq$1 = "#x2ACB;&#xFE00";
  var varsupsetneq$1 = "#x228B;&#xFE00";
  var varsupsetneqq$1 = "#x2ACC;&#xFE00";
  var vartheta$1 = "#x3D1";
  var vartriangleleft$1 = "#x22B2";
  var vartriangleright$1 = "#x22B3";
  var vcy$1 = "#x432";
  var vdash$1 = "#x22A2";
  var vee$2 = "or";
  var veebar$1 = "#x22BB";
  var veeeq$1 = "#x225A";
  var vellip$1 = "#x22EE";
  var vfr$1 = "#x1D533";
  var vltri$1 = "#x22B2";
  var vnsub$1 = "#x2282;&#x20D2";
  var vnsup$1 = "#x2283;&#x20D2";
  var vopf$1 = "#x1D567";
  var vprop$1 = "prop";
  var vrtri$1 = "#x22B3";
  var vscr$1 = "#x1D4CB";
  var vsubnE$1 = "#x2ACB;&#xFE00";
  var vsubne$1 = "#x228A;&#xFE00";
  var vsupnE$1 = "#x2ACC;&#xFE00";
  var vsupne$1 = "#x228B;&#xFE00";
  var vzigzag$1 = "#x299A";
  var wcirc$1 = "#x175";
  var wedbar$1 = "#x2A5F";
  var wedge$2 = "and";
  var wedgeq$1 = "#x2259";
  var wfr$1 = "#x1D534";
  var wopf$1 = "#x1D568";
  var wp$1 = "#x2118";
  var wr$1 = "#x2240";
  var wreath$2 = "#x2240";
  var wscr$1 = "#x1D4CC";
  var xcap$1 = "#x22C2";
  var xcirc$1 = "#x25EF";
  var xcup$1 = "#x22C3";
  var xdtri$1 = "#x25BD";
  var xfr$1 = "#x1D535";
  var xhArr$1 = "#x27FA";
  var xharr$1 = "#x27F7";
  var xlArr$1 = "#x27F8";
  var xlarr$1 = "#x27F5";
  var xmap$1 = "#x27FC";
  var xnis$1 = "#x22FB";
  var xodot$1 = "#x2A00";
  var xopf$1 = "#x1D569";
  var xoplus$1 = "#x2A01";
  var xotime$1 = "#x2A02";
  var xrArr$1 = "#x27F9";
  var xrarr$1 = "#x27F6";
  var xscr$1 = "#x1D4CD";
  var xsqcup$1 = "#x2A06";
  var xuplus$1 = "#x2A04";
  var xutri$1 = "#x25B3";
  var xvee$1 = "#x22C1";
  var xwedge$1 = "#x22C0";
  var yacy$1 = "#x44F";
  var ycirc$2 = "#x177";
  var ycy$2 = "#x44B";
  var yfr$1 = "#x1D536";
  var yicy$1 = "#x457";
  var yopf$1 = "#x1D56A";
  var yscr$1 = "#x1D4CE";
  var yucy$1 = "#x44E";
  var zacute$2 = "#x17A";
  var zcaron$1 = "#x17E";
  var zcy$1 = "#x437";
  var zdot$1 = "#x17C";
  var zeetrf$1 = "#x2128";
  var zfr$1 = "#x1D537";
  var zhcy$1 = "#x436";
  var zigrarr$1 = "#x21DD";
  var zopf$1 = "#x1D56B";
  var zscr$1 = "#x1D4CF";
  var notEmailFriendly = {
    AMP: AMP$1,
    Abreve: Abreve$1,
    Acy: Acy$1,
    Afr: Afr$1,
    Amacr: Amacr$1,
    And: And$2,
    Aogon: Aogon$1,
    Aopf: Aopf$1,
    ApplyFunction: ApplyFunction$1,
    Ascr: Ascr$2,
    Assign: Assign$2,
    Backslash: Backslash$2,
    Barv: Barv$1,
    Barwed: Barwed$1,
    Bcy: Bcy$1,
    Because: Because$2,
    Bernoullis: Bernoullis$2,
    Bfr: Bfr$1,
    Bopf: Bopf$1,
    Breve: Breve$1,
    Bscr: Bscr$1,
    Bumpeq: Bumpeq$1,
    CHcy: CHcy$1,
    COPY: COPY$2,
    Cacute: Cacute$1,
    Cap: Cap$2,
    CapitalDifferentialD: CapitalDifferentialD$1,
    Cayleys: Cayleys$1,
    Ccaron: Ccaron$1,
    Ccirc: Ccirc$1,
    Cconint: Cconint$1,
    Cdot: Cdot$1,
    Cedilla: Cedilla$2,
    CenterDot: CenterDot$1,
    Cfr: Cfr$1,
    CircleDot: CircleDot$1,
    CircleMinus: CircleMinus$1,
    CirclePlus: CirclePlus$1,
    CircleTimes: CircleTimes$1,
    ClockwiseContourIntegral: ClockwiseContourIntegral$1,
    CloseCurlyDoubleQuote: CloseCurlyDoubleQuote$1,
    CloseCurlyQuote: CloseCurlyQuote$1,
    Colon: Colon$2,
    Colone: Colone$2,
    Congruent: Congruent$2,
    Conint: Conint$1,
    ContourIntegral: ContourIntegral$1,
    Copf: Copf$1,
    Coproduct: Coproduct$1,
    CounterClockwiseContourIntegral: CounterClockwiseContourIntegral$1,
    Cross: Cross$2,
    Cscr: Cscr$1,
    Cup: Cup$2,
    CupCap: CupCap$1,
    DD: DD$2,
    DDotrahd: DDotrahd$1,
    DJcy: DJcy$1,
    DScy: DScy$1,
    DZcy: DZcy$1,
    Darr: Darr$1,
    Dashv: Dashv$1,
    Dcaron: Dcaron$1,
    Dcy: Dcy$1,
    Del: Del$2,
    Dfr: Dfr$1,
    DiacriticalAcute: DiacriticalAcute$1,
    DiacriticalDot: DiacriticalDot$1,
    DiacriticalDoubleAcute: DiacriticalDoubleAcute$1,
    DiacriticalGrave: DiacriticalGrave$1,
    DiacriticalTilde: DiacriticalTilde$1,
    Diamond: Diamond$2,
    DifferentialD: DifferentialD$1,
    Dopf: Dopf$1,
    Dot: Dot$2,
    DotDot: DotDot$1,
    DotEqual: DotEqual$1,
    DoubleContourIntegral: DoubleContourIntegral$1,
    DoubleDot: DoubleDot$1,
    DoubleDownArrow: DoubleDownArrow$1,
    DoubleLeftArrow: DoubleLeftArrow$1,
    DoubleLeftRightArrow: DoubleLeftRightArrow$1,
    DoubleLeftTee: DoubleLeftTee$1,
    DoubleLongLeftArrow: DoubleLongLeftArrow$1,
    DoubleLongLeftRightArrow: DoubleLongLeftRightArrow$1,
    DoubleLongRightArrow: DoubleLongRightArrow$1,
    DoubleRightArrow: DoubleRightArrow$1,
    DoubleRightTee: DoubleRightTee$1,
    DoubleUpArrow: DoubleUpArrow$1,
    DoubleUpDownArrow: DoubleUpDownArrow$1,
    DoubleVerticalBar: DoubleVerticalBar$1,
    DownArrow: DownArrow$1,
    DownArrowBar: DownArrowBar$1,
    DownArrowUpArrow: DownArrowUpArrow$1,
    DownBreve: DownBreve$1,
    DownLeftRightVector: DownLeftRightVector$1,
    DownLeftTeeVector: DownLeftTeeVector$1,
    DownLeftVector: DownLeftVector$1,
    DownLeftVectorBar: DownLeftVectorBar$1,
    DownRightTeeVector: DownRightTeeVector$1,
    DownRightVector: DownRightVector$1,
    DownRightVectorBar: DownRightVectorBar$1,
    DownTee: DownTee$1,
    DownTeeArrow: DownTeeArrow$1,
    Downarrow: Downarrow$1,
    Dscr: Dscr$1,
    Dstrok: Dstrok$1,
    ENG: ENG$2,
    Ecaron: Ecaron$1,
    Ecy: Ecy$1,
    Edot: Edot$1,
    Efr: Efr$1,
    Element: Element$1,
    Emacr: Emacr$1,
    EmptySmallSquare: EmptySmallSquare$1,
    EmptyVerySmallSquare: EmptyVerySmallSquare$1,
    Eogon: Eogon$1,
    Eopf: Eopf$1,
    Equal: Equal$2,
    EqualTilde: EqualTilde$1,
    Equilibrium: Equilibrium$2,
    Escr: Escr$1,
    Esim: Esim$1,
    Exists: Exists$2,
    ExponentialE: ExponentialE$1,
    Fcy: Fcy$1,
    Ffr: Ffr$1,
    FilledSmallSquare: FilledSmallSquare$1,
    FilledVerySmallSquare: FilledVerySmallSquare$1,
    Fopf: Fopf$1,
    ForAll: ForAll$1,
    Fouriertrf: Fouriertrf$1,
    Fscr: Fscr$1,
    GJcy: GJcy$1,
    GT: GT$2,
    Gammad: Gammad$1,
    Gbreve: Gbreve$1,
    Gcedil: Gcedil$1,
    Gcirc: Gcirc$1,
    Gcy: Gcy$1,
    Gdot: Gdot$1,
    Gfr: Gfr$1,
    Gg: Gg$1,
    Gopf: Gopf$1,
    GreaterEqual: GreaterEqual$1,
    GreaterEqualLess: GreaterEqualLess$1,
    GreaterFullEqual: GreaterFullEqual$1,
    GreaterGreater: GreaterGreater$1,
    GreaterLess: GreaterLess$1,
    GreaterSlantEqual: GreaterSlantEqual$1,
    GreaterTilde: GreaterTilde$1,
    Gscr: Gscr$1,
    Gt: Gt$1,
    HARDcy: HARDcy$1,
    Hacek: Hacek$1,
    Hcirc: Hcirc$1,
    Hfr: Hfr$1,
    HilbertSpace: HilbertSpace$1,
    Hopf: Hopf$1,
    HorizontalLine: HorizontalLine$1,
    Hscr: Hscr$1,
    Hstrok: Hstrok$1,
    HumpDownHump: HumpDownHump$1,
    HumpEqual: HumpEqual$1,
    IEcy: IEcy$1,
    IJlig: IJlig$1,
    IOcy: IOcy$1,
    Icy: Icy$1,
    Idot: Idot$1,
    Ifr: Ifr$1,
    Im: Im$1,
    Imacr: Imacr$1,
    ImaginaryI: ImaginaryI$1,
    Implies: Implies$1,
    Int: Int$1,
    Integral: Integral$1,
    Intersection: Intersection$1,
    InvisibleComma: InvisibleComma$1,
    InvisibleTimes: InvisibleTimes$1,
    Iogon: Iogon$1,
    Iopf: Iopf$1,
    Iscr: Iscr$1,
    Itilde: Itilde$1,
    Iukcy: Iukcy$1,
    Jcirc: Jcirc$1,
    Jcy: Jcy$1,
    Jfr: Jfr$1,
    Jopf: Jopf$1,
    Jscr: Jscr$1,
    Jsercy: Jsercy$1,
    Jukcy: Jukcy$1,
    KHcy: KHcy$1,
    KJcy: KJcy$1,
    Kcedil: Kcedil$1,
    Kcy: Kcy$1,
    Kfr: Kfr$1,
    Kopf: Kopf$1,
    Kscr: Kscr$1,
    LJcy: LJcy$1,
    LT: LT$2,
    Lacute: Lacute$1,
    Lang: Lang$1,
    Laplacetrf: Laplacetrf$1,
    Larr: Larr$1,
    Lcaron: Lcaron$1,
    Lcedil: Lcedil$1,
    Lcy: Lcy$1,
    LeftAngleBracket: LeftAngleBracket$1,
    LeftArrow: LeftArrow$1,
    LeftArrowBar: LeftArrowBar$1,
    LeftArrowRightArrow: LeftArrowRightArrow$1,
    LeftCeiling: LeftCeiling$1,
    LeftDoubleBracket: LeftDoubleBracket$1,
    LeftDownTeeVector: LeftDownTeeVector$1,
    LeftDownVector: LeftDownVector$1,
    LeftDownVectorBar: LeftDownVectorBar$1,
    LeftFloor: LeftFloor$1,
    LeftRightArrow: LeftRightArrow$1,
    LeftRightVector: LeftRightVector$1,
    LeftTee: LeftTee$1,
    LeftTeeArrow: LeftTeeArrow$1,
    LeftTeeVector: LeftTeeVector$1,
    LeftTriangle: LeftTriangle$1,
    LeftTriangleBar: LeftTriangleBar$1,
    LeftTriangleEqual: LeftTriangleEqual$1,
    LeftUpDownVector: LeftUpDownVector$1,
    LeftUpTeeVector: LeftUpTeeVector$1,
    LeftUpVector: LeftUpVector$1,
    LeftUpVectorBar: LeftUpVectorBar$1,
    LeftVector: LeftVector$1,
    LeftVectorBar: LeftVectorBar$1,
    Leftarrow: Leftarrow$1,
    Leftrightarrow: Leftrightarrow$1,
    LessEqualGreater: LessEqualGreater$1,
    LessFullEqual: LessFullEqual$1,
    LessGreater: LessGreater$1,
    LessLess: LessLess$1,
    LessSlantEqual: LessSlantEqual$1,
    LessTilde: LessTilde$1,
    Lfr: Lfr$1,
    Ll: Ll$1,
    Lleftarrow: Lleftarrow$1,
    Lmidot: Lmidot$1,
    LongLeftArrow: LongLeftArrow$1,
    LongLeftRightArrow: LongLeftRightArrow$1,
    LongRightArrow: LongRightArrow$1,
    Longleftarrow: Longleftarrow$1,
    Longleftrightarrow: Longleftrightarrow$1,
    Longrightarrow: Longrightarrow$1,
    Lopf: Lopf$1,
    LowerLeftArrow: LowerLeftArrow$1,
    LowerRightArrow: LowerRightArrow$1,
    Lscr: Lscr$1,
    Lsh: Lsh$1,
    Lstrok: Lstrok$1,
    Lt: Lt$1,
    "Map": "#x2905",
    Mcy: Mcy$1,
    MediumSpace: MediumSpace$1,
    Mellintrf: Mellintrf$1,
    Mfr: Mfr$1,
    MinusPlus: MinusPlus$1,
    Mopf: Mopf$1,
    Mscr: Mscr$1,
    NJcy: NJcy$1,
    Nacute: Nacute$1,
    Ncaron: Ncaron$1,
    Ncedil: Ncedil$1,
    Ncy: Ncy$1,
    NegativeMediumSpace: NegativeMediumSpace$1,
    NegativeThickSpace: NegativeThickSpace$1,
    NegativeThinSpace: NegativeThinSpace$1,
    NegativeVeryThinSpace: NegativeVeryThinSpace$1,
    NestedGreaterGreater: NestedGreaterGreater$1,
    NestedLessLess: NestedLessLess$1,
    Nfr: Nfr$1,
    NoBreak: NoBreak$1,
    NonBreakingSpace: NonBreakingSpace$1,
    Nopf: Nopf$1,
    Not: Not$2,
    NotCongruent: NotCongruent$1,
    NotCupCap: NotCupCap$1,
    NotDoubleVerticalBar: NotDoubleVerticalBar$1,
    NotElement: NotElement$1,
    NotEqual: NotEqual$1,
    NotEqualTilde: NotEqualTilde$1,
    NotExists: NotExists$1,
    NotGreater: NotGreater$1,
    NotGreaterEqual: NotGreaterEqual$1,
    NotGreaterFullEqual: NotGreaterFullEqual$1,
    NotGreaterGreater: NotGreaterGreater$1,
    NotGreaterLess: NotGreaterLess$1,
    NotGreaterSlantEqual: NotGreaterSlantEqual$1,
    NotGreaterTilde: NotGreaterTilde$1,
    NotHumpDownHump: NotHumpDownHump$1,
    NotHumpEqual: NotHumpEqual$1,
    NotLeftTriangle: NotLeftTriangle$1,
    NotLeftTriangleBar: NotLeftTriangleBar$1,
    NotLeftTriangleEqual: NotLeftTriangleEqual$1,
    NotLess: NotLess$1,
    NotLessEqual: NotLessEqual$1,
    NotLessGreater: NotLessGreater$1,
    NotLessLess: NotLessLess$1,
    NotLessSlantEqual: NotLessSlantEqual$1,
    NotLessTilde: NotLessTilde$1,
    NotNestedGreaterGreater: NotNestedGreaterGreater$1,
    NotNestedLessLess: NotNestedLessLess$1,
    NotPrecedes: NotPrecedes$1,
    NotPrecedesEqual: NotPrecedesEqual$1,
    NotPrecedesSlantEqual: NotPrecedesSlantEqual$1,
    NotReverseElement: NotReverseElement$1,
    NotRightTriangle: NotRightTriangle$1,
    NotRightTriangleBar: NotRightTriangleBar$1,
    NotRightTriangleEqual: NotRightTriangleEqual$1,
    NotSquareSubset: NotSquareSubset$1,
    NotSquareSubsetEqual: NotSquareSubsetEqual$1,
    NotSquareSuperset: NotSquareSuperset$1,
    NotSquareSupersetEqual: NotSquareSupersetEqual$1,
    NotSubset: NotSubset$1,
    NotSubsetEqual: NotSubsetEqual$1,
    NotSucceeds: NotSucceeds$1,
    NotSucceedsEqual: NotSucceedsEqual$1,
    NotSucceedsSlantEqual: NotSucceedsSlantEqual$1,
    NotSucceedsTilde: NotSucceedsTilde$1,
    NotSuperset: NotSuperset$1,
    NotSupersetEqual: NotSupersetEqual$1,
    NotTilde: NotTilde$1,
    NotTildeEqual: NotTildeEqual$1,
    NotTildeFullEqual: NotTildeFullEqual$1,
    NotTildeTilde: NotTildeTilde$1,
    NotVerticalBar: NotVerticalBar$1,
    Nscr: Nscr$1,
    Ocy: Ocy$1,
    Odblac: Odblac$1,
    Ofr: Ofr$1,
    Omacr: Omacr$1,
    Oopf: Oopf$1,
    OpenCurlyDoubleQuote: OpenCurlyDoubleQuote$1,
    OpenCurlyQuote: OpenCurlyQuote$1,
    Or: Or$1,
    Oscr: Oscr$1,
    Otimes: Otimes$1,
    OverBar: OverBar$1,
    OverBrace: OverBrace$1,
    OverBracket: OverBracket$1,
    OverParenthesis: OverParenthesis$1,
    PartialD: PartialD$1,
    Pcy: Pcy$1,
    Pfr: Pfr$1,
    PlusMinus: PlusMinus$1,
    Poincareplane: Poincareplane$1,
    Popf: Popf$1,
    Pr: Pr$1,
    Precedes: Precedes$1,
    PrecedesEqual: PrecedesEqual$1,
    PrecedesSlantEqual: PrecedesSlantEqual$1,
    PrecedesTilde: PrecedesTilde$1,
    Product: Product$2,
    Proportion: Proportion$2,
    Proportional: Proportional$2,
    Pscr: Pscr$1,
    QUOT: QUOT$2,
    Qfr: Qfr$1,
    Qopf: Qopf$1,
    Qscr: Qscr$1,
    RBarr: RBarr$1,
    REG: REG$2,
    Racute: Racute$1,
    Rang: Rang$1,
    Rarr: Rarr$1,
    Rarrtl: Rarrtl$1,
    Rcaron: Rcaron$1,
    Rcedil: Rcedil$1,
    Rcy: Rcy$1,
    Re: Re$2,
    ReverseElement: ReverseElement$1,
    ReverseEquilibrium: ReverseEquilibrium$1,
    ReverseUpEquilibrium: ReverseUpEquilibrium$1,
    Rfr: Rfr$1,
    RightAngleBracket: RightAngleBracket$1,
    RightArrow: RightArrow$1,
    RightArrowBar: RightArrowBar$1,
    RightArrowLeftArrow: RightArrowLeftArrow$1,
    RightCeiling: RightCeiling$1,
    RightDoubleBracket: RightDoubleBracket$1,
    RightDownTeeVector: RightDownTeeVector$1,
    RightDownVector: RightDownVector$1,
    RightDownVectorBar: RightDownVectorBar$1,
    RightFloor: RightFloor$1,
    RightTee: RightTee$1,
    RightTeeArrow: RightTeeArrow$1,
    RightTeeVector: RightTeeVector$1,
    RightTriangle: RightTriangle$1,
    RightTriangleBar: RightTriangleBar$1,
    RightTriangleEqual: RightTriangleEqual$1,
    RightUpDownVector: RightUpDownVector$1,
    RightUpTeeVector: RightUpTeeVector$1,
    RightUpVector: RightUpVector$1,
    RightUpVectorBar: RightUpVectorBar$1,
    RightVector: RightVector$1,
    RightVectorBar: RightVectorBar$1,
    Rightarrow: Rightarrow$1,
    Ropf: Ropf$1,
    RoundImplies: RoundImplies$1,
    Rrightarrow: Rrightarrow$1,
    Rscr: Rscr$1,
    Rsh: Rsh$1,
    RuleDelayed: RuleDelayed$1,
    SHCHcy: SHCHcy$1,
    SHcy: SHcy$1,
    SOFTcy: SOFTcy$1,
    Sacute: Sacute$1,
    Sc: Sc$1,
    Scedil: Scedil$1,
    Scirc: Scirc$1,
    Scy: Scy$1,
    Sfr: Sfr$1,
    ShortDownArrow: ShortDownArrow$1,
    ShortLeftArrow: ShortLeftArrow$1,
    ShortRightArrow: ShortRightArrow$1,
    ShortUpArrow: ShortUpArrow$1,
    SmallCircle: SmallCircle$1,
    Sopf: Sopf$1,
    Sqrt: Sqrt$1,
    Square: Square$1,
    SquareIntersection: SquareIntersection$1,
    SquareSubset: SquareSubset$1,
    SquareSubsetEqual: SquareSubsetEqual$1,
    SquareSuperset: SquareSuperset$1,
    SquareSupersetEqual: SquareSupersetEqual$1,
    SquareUnion: SquareUnion$1,
    Sscr: Sscr$1,
    Star: Star$2,
    Sub: Sub$2,
    Subset: Subset$1,
    SubsetEqual: SubsetEqual$1,
    Succeeds: Succeeds$1,
    SucceedsEqual: SucceedsEqual$1,
    SucceedsSlantEqual: SucceedsSlantEqual$1,
    SucceedsTilde: SucceedsTilde$1,
    SuchThat: SuchThat$1,
    Sum: Sum$2,
    Sup: Sup$1,
    Superset: Superset$1,
    SupersetEqual: SupersetEqual$1,
    Supset: Supset$1,
    TRADE: TRADE$2,
    TSHcy: TSHcy$1,
    TScy: TScy$1,
    Tab: Tab$2,
    Tcaron: Tcaron$1,
    Tcedil: Tcedil$1,
    Tcy: Tcy$1,
    Tfr: Tfr$1,
    Therefore: Therefore$1,
    ThickSpace: ThickSpace$1,
    ThinSpace: ThinSpace$1,
    Tilde: Tilde$2,
    TildeEqual: TildeEqual$1,
    TildeFullEqual: TildeFullEqual$1,
    TildeTilde: TildeTilde$1,
    Topf: Topf$1,
    TripleDot: TripleDot$1,
    Tscr: Tscr$1,
    Tstrok: Tstrok$1,
    Uarr: Uarr$1,
    Uarrocir: Uarrocir$1,
    Ubrcy: Ubrcy$1,
    Ubreve: Ubreve$1,
    Ucy: Ucy$1,
    Udblac: Udblac$1,
    Ufr: Ufr$1,
    Umacr: Umacr$1,
    UnderBrace: UnderBrace$1,
    UnderBracket: UnderBracket$1,
    UnderParenthesis: UnderParenthesis$1,
    Union: Union$2,
    UnionPlus: UnionPlus$1,
    Uogon: Uogon$1,
    Uopf: Uopf$1,
    UpArrow: UpArrow$1,
    UpArrowBar: UpArrowBar$1,
    UpArrowDownArrow: UpArrowDownArrow$1,
    UpDownArrow: UpDownArrow$1,
    UpEquilibrium: UpEquilibrium$1,
    UpTee: UpTee$1,
    UpTeeArrow: UpTeeArrow$1,
    Uparrow: Uparrow$1,
    Updownarrow: Updownarrow$1,
    UpperLeftArrow: UpperLeftArrow$1,
    UpperRightArrow: UpperRightArrow$1,
    Upsi: Upsi$2,
    Uring: Uring$1,
    Uscr: Uscr$1,
    Utilde: Utilde$1,
    VDash: VDash$1,
    Vbar: Vbar$1,
    Vcy: Vcy$1,
    Vdash: Vdash$1,
    Vdashl: Vdashl$1,
    Vee: Vee$1,
    Verbar: Verbar$1,
    Vert: Vert$2,
    VerticalBar: VerticalBar$1,
    VerticalSeparator: VerticalSeparator$1,
    VerticalTilde: VerticalTilde$1,
    VeryThinSpace: VeryThinSpace$1,
    Vfr: Vfr$1,
    Vopf: Vopf$1,
    Vscr: Vscr$1,
    Vvdash: Vvdash$1,
    Wcirc: Wcirc$1,
    Wedge: Wedge$2,
    Wfr: Wfr$1,
    Wopf: Wopf$1,
    Wscr: Wscr$1,
    Xfr: Xfr$1,
    Xopf: Xopf$1,
    Xscr: Xscr$1,
    YAcy: YAcy$1,
    YIcy: YIcy$1,
    YUcy: YUcy$1,
    Ycirc: Ycirc$2,
    Ycy: Ycy$1,
    Yfr: Yfr$1,
    Yopf: Yopf$1,
    Yscr: Yscr$1,
    ZHcy: ZHcy$1,
    Zacute: Zacute$2,
    Zcaron: Zcaron$1,
    Zcy: Zcy$1,
    Zdot: Zdot$1,
    ZeroWidthSpace: ZeroWidthSpace$1,
    Zfr: Zfr$1,
    Zopf: Zopf$1,
    Zscr: Zscr$1,
    abreve: abreve$1,
    ac: ac$2,
    acE: acE$1,
    acd: acd$1,
    acy: acy$1,
    af: af$1,
    afr: afr$1,
    aleph: aleph$1,
    amacr: amacr$1,
    amalg: amalg$1,
    andand: andand$1,
    andd: andd$1,
    andslope: andslope$1,
    andv: andv$1,
    ange: ange$2,
    angle: angle$2,
    angmsd: angmsd$1,
    angmsdaa: angmsdaa$1,
    angmsdab: angmsdab$1,
    angmsdac: angmsdac$1,
    angmsdad: angmsdad$1,
    angmsdae: angmsdae$1,
    angmsdaf: angmsdaf$1,
    angmsdag: angmsdag$1,
    angmsdah: angmsdah$1,
    angrt: angrt$1,
    angrtvb: angrtvb$1,
    angrtvbd: angrtvbd$1,
    angsph: angsph$1,
    angst: angst$2,
    angzarr: angzarr$1,
    aogon: aogon$1,
    aopf: aopf$1,
    ap: ap$2,
    apE: apE$1,
    apacir: apacir$1,
    ape: ape$2,
    apid: apid$1,
    approx: approx$2,
    approxeq: approxeq$1,
    ascr: ascr$2,
    asympeq: asympeq$1,
    awconint: awconint$1,
    awint: awint$1,
    bNot: bNot$1,
    backcong: backcong$1,
    backepsilon: backepsilon$1,
    backprime: backprime$1,
    backsim: backsim$1,
    backsimeq: backsimeq$1,
    barvee: barvee$1,
    barwed: barwed$1,
    barwedge: barwedge$2,
    bbrk: bbrk$1,
    bbrktbrk: bbrktbrk$1,
    bcong: bcong$1,
    bcy: bcy$1,
    becaus: becaus$2,
    because: because$2,
    bemptyv: bemptyv$1,
    bepsi: bepsi$2,
    bernou: bernou$1,
    beth: beth$2,
    between: between$2,
    bfr: bfr$1,
    bigcap: bigcap$1,
    bigcirc: bigcirc$1,
    bigcup: bigcup$1,
    bigodot: bigodot$1,
    bigoplus: bigoplus$1,
    bigotimes: bigotimes$1,
    bigsqcup: bigsqcup$1,
    bigstar: bigstar$1,
    bigtriangledown: bigtriangledown$1,
    bigtriangleup: bigtriangleup$1,
    biguplus: biguplus$1,
    bigvee: bigvee$1,
    bigwedge: bigwedge$1,
    bkarow: bkarow$1,
    blacklozenge: blacklozenge$1,
    blacksquare: blacksquare$1,
    blacktriangle: blacktriangle$1,
    blacktriangledown: blacktriangledown$1,
    blacktriangleleft: blacktriangleleft$1,
    blacktriangleright: blacktriangleright$1,
    blank: blank$2,
    blk12: blk12$1,
    blk14: blk14$1,
    blk34: blk34$1,
    block: block$2,
    bne: bne$1,
    bnequiv: bnequiv$1,
    bnot: bnot$1,
    bopf: bopf$1,
    bot: bot$2,
    bottom: bottom$2,
    bowtie: bowtie$2,
    boxDL: boxDL$1,
    boxDR: boxDR$1,
    boxDl: boxDl$1,
    boxDr: boxDr$1,
    boxH: boxH$1,
    boxHD: boxHD$1,
    boxHU: boxHU$1,
    boxHd: boxHd$1,
    boxHu: boxHu$1,
    boxUL: boxUL$1,
    boxUR: boxUR$1,
    boxUl: boxUl$1,
    boxUr: boxUr$1,
    boxV: boxV$1,
    boxVH: boxVH$1,
    boxVL: boxVL$1,
    boxVR: boxVR$1,
    boxVh: boxVh$1,
    boxVl: boxVl$1,
    boxVr: boxVr$1,
    boxbox: boxbox$1,
    boxdL: boxdL$1,
    boxdR: boxdR$1,
    boxdl: boxdl$1,
    boxdr: boxdr$1,
    boxh: boxh$1,
    boxhD: boxhD$1,
    boxhU: boxhU$1,
    boxhd: boxhd$1,
    boxhu: boxhu$1,
    boxminus: boxminus$1,
    boxplus: boxplus$1,
    boxtimes: boxtimes$1,
    boxuL: boxuL$1,
    boxuR: boxuR$1,
    boxul: boxul$1,
    boxur: boxur$1,
    boxv: boxv$1,
    boxvH: boxvH$1,
    boxvL: boxvL$1,
    boxvR: boxvR$1,
    boxvh: boxvh$1,
    boxvl: boxvl$1,
    boxvr: boxvr$1,
    bprime: bprime$1,
    breve: breve$2,
    bscr: bscr$1,
    bsemi: bsemi$1,
    bsim: bsim$1,
    bsime: bsime$1,
    bsolb: bsolb$1,
    bsolhsub: bsolhsub$1,
    bullet: bullet$2,
    bump: bump$2,
    bumpE: bumpE$1,
    bumpe: bumpe$1,
    bumpeq: bumpeq$1,
    cacute: cacute$2,
    capand: capand$2,
    capbrcup: capbrcup$1,
    capcap: capcap$1,
    capcup: capcup$1,
    capdot: capdot$1,
    caps: caps$2,
    caret: caret$2,
    caron: caron$2,
    ccaps: ccaps$1,
    ccaron: ccaron$1,
    ccirc: ccirc$1,
    ccups: ccups$1,
    ccupssm: ccupssm$1,
    cdot: cdot$1,
    cemptyv: cemptyv$1,
    centerdot: centerdot$1,
    cfr: cfr$1,
    chcy: chcy$1,
    check: check$2,
    checkmark: checkmark$2,
    cir: cir$2,
    cirE: cirE$1,
    circeq: circeq$1,
    circlearrowleft: circlearrowleft$1,
    circlearrowright: circlearrowright$1,
    circledR: circledR$1,
    circledS: circledS$1,
    circledast: circledast$1,
    circledcirc: circledcirc$1,
    circleddash: circleddash$1,
    cire: cire$1,
    cirfnint: cirfnint$1,
    cirmid: cirmid$1,
    cirscir: cirscir$1,
    clubsuit: clubsuit$2,
    colone: colone$2,
    coloneq: coloneq$1,
    comp: comp$2,
    compfn: compfn$1,
    complement: complement$2,
    complexes: complexes$2,
    congdot: congdot$1,
    conint: conint$2,
    copf: copf$2,
    coprod: coprod$2,
    copysr: copysr$1,
    cross: cross$2,
    cscr: cscr$1,
    csub: csub$1,
    csube: csube$1,
    csup: csup$1,
    csupe: csupe$1,
    ctdot: ctdot$1,
    cudarrl: cudarrl$1,
    cudarrr: cudarrr$1,
    cuepr: cuepr$1,
    cuesc: cuesc$1,
    cularr: cularr$1,
    cularrp: cularrp$1,
    cupbrcap: cupbrcap$1,
    cupcap: cupcap$1,
    cupcup: cupcup$1,
    cupdot: cupdot$1,
    cupor: cupor$1,
    cups: cups$2,
    curarr: curarr$1,
    curarrm: curarrm$1,
    curlyeqprec: curlyeqprec$1,
    curlyeqsucc: curlyeqsucc$1,
    curlyvee: curlyvee$1,
    curlywedge: curlywedge$1,
    curvearrowleft: curvearrowleft$1,
    curvearrowright: curvearrowright$1,
    cuvee: cuvee$1,
    cuwed: cuwed$1,
    cwconint: cwconint$1,
    cwint: cwint$1,
    cylcty: cylcty$1,
    dHar: dHar$1,
    daleth: daleth$2,
    dash: dash$2,
    dashv: dashv$1,
    dbkarow: dbkarow$1,
    dblac: dblac$1,
    dcaron: dcaron$1,
    dcy: dcy$1,
    dd: dd$2,
    ddagger: ddagger$1,
    ddarr: ddarr$1,
    ddotseq: ddotseq$1,
    demptyv: demptyv$1,
    dfisht: dfisht$1,
    dfr: dfr$1,
    dharl: dharl$1,
    dharr: dharr$2,
    diam: diam$2,
    diamond: diamond$2,
    diamondsuit: diamondsuit$1,
    die: die$2,
    digamma: digamma$2,
    disin: disin$2,
    div: div$2,
    divideontimes: divideontimes$1,
    divonx: divonx$1,
    djcy: djcy$1,
    dlcorn: dlcorn$1,
    dlcrop: dlcrop$1,
    dopf: dopf$2,
    dot: dot$2,
    doteq: doteq$1,
    doteqdot: doteqdot$1,
    dotminus: dotminus$1,
    dotplus: dotplus$1,
    dotsquare: dotsquare$1,
    doublebarwedge: doublebarwedge$1,
    downarrow: downarrow$1,
    downdownarrows: downdownarrows$1,
    downharpoonleft: downharpoonleft$1,
    downharpoonright: downharpoonright$1,
    drbkarow: drbkarow$1,
    drcorn: drcorn$1,
    drcrop: drcrop$1,
    dscr: dscr$1,
    dscy: dscy$1,
    dsol: dsol$2,
    dstrok: dstrok$1,
    dtdot: dtdot$1,
    dtri: dtri$2,
    dtrif: dtrif$1,
    duarr: duarr$1,
    duhar: duhar$1,
    dwangle: dwangle$1,
    dzcy: dzcy$1,
    dzigrarr: dzigrarr$1,
    eDDot: eDDot$1,
    eDot: eDot$1,
    easter: easter$2,
    ecaron: ecaron$1,
    ecir: ecir$2,
    ecolon: ecolon$2,
    ecy: ecy$2,
    edot: edot$2,
    ee: ee$2,
    efDot: efDot$1,
    efr: efr$2,
    eg: eg$2,
    egs: egs$2,
    egsdot: egsdot$1,
    el: el$2,
    elinters: elinters$1,
    ell: ell$2,
    els: els$2,
    elsdot: elsdot$1,
    emacr: emacr$1,
    emptyset: emptyset$1,
    emptyv: emptyv$1,
    emsp13: emsp13$1,
    emsp14: emsp14$1,
    eng: eng$2,
    eogon: eogon$1,
    eopf: eopf$1,
    epar: epar$1,
    eparsl: eparsl$1,
    eplus: eplus$1,
    epsi: epsi$2,
    epsiv: epsiv$1,
    eqcirc: eqcirc$1,
    eqcolon: eqcolon$1,
    eqsim: eqsim$1,
    eqslantgtr: eqslantgtr$1,
    eqslantless: eqslantless$1,
    equest: equest$2,
    equivDD: equivDD$1,
    eqvparsl: eqvparsl$1,
    erDot: erDot$1,
    erarr: erarr$1,
    escr: escr$2,
    esdot: esdot$1,
    esim: esim$2,
    expectation: expectation$2,
    exponentiale: exponentiale$1,
    fallingdotseq: fallingdotseq$1,
    fcy: fcy$1,
    female: female$2,
    ffilig: ffilig$1,
    fflig: fflig$1,
    ffllig: ffllig$1,
    ffr: ffr$1,
    filig: filig$1,
    flat: flat$2,
    fllig: fllig$1,
    fltns: fltns$1,
    fopf: fopf$1,
    fork: fork$2,
    forkv: forkv$1,
    fpartint: fpartint$1,
    frac13: frac13$1,
    frac15: frac15$1,
    frac16: frac16$1,
    frac18: frac18$1,
    frac23: frac23$1,
    frac25: frac25$1,
    frac35: frac35$1,
    frac38: frac38$1,
    frac45: frac45$1,
    frac56: frac56$1,
    frac58: frac58$1,
    frac78: frac78$1,
    frown: frown$2,
    fscr: fscr$1,
    gE: gE$1,
    gEl: gEl$1,
    gacute: gacute$1,
    gammad: gammad$1,
    gap: gap$2,
    gbreve: gbreve$1,
    gcirc: gcirc$1,
    gcy: gcy$2,
    gdot: gdot$1,
    gel: gel$2,
    geq: geq$2,
    geqq: geqq$1,
    geqslant: geqslant$1,
    ges: ges$2,
    gescc: gescc$1,
    gesdot: gesdot$1,
    gesdoto: gesdoto$1,
    gesdotol: gesdotol$1,
    gesl: gesl$2,
    gesles: gesles$1,
    gfr: gfr$1,
    gg: gg$2,
    ggg: ggg$1,
    gimel: gimel$1,
    gjcy: gjcy$1,
    gl: gl$2,
    glE: glE$1,
    gla: gla$2,
    glj: glj$1,
    gnE: gnE$1,
    gnap: gnap$1,
    gnapprox: gnapprox$1,
    gne: gne$2,
    gneq: gneq$1,
    gneqq: gneqq$1,
    gnsim: gnsim$1,
    gopf: gopf$1,
    grave: grave$2,
    gscr: gscr$1,
    gsim: gsim$1,
    gsime: gsime$1,
    gsiml: gsiml$1,
    gtcc: gtcc$1,
    gtcir: gtcir$1,
    gtdot: gtdot$1,
    gtlPar: gtlPar$1,
    gtquest: gtquest$1,
    gtrapprox: gtrapprox$1,
    gtrarr: gtrarr$1,
    gtrdot: gtrdot$1,
    gtreqless: gtreqless$1,
    gtreqqless: gtreqqless$1,
    gtrless: gtrless$1,
    gtrsim: gtrsim$1,
    gvertneqq: gvertneqq$1,
    gvnE: gvnE$1,
    hairsp: hairsp$1,
    half: half$2,
    hamilt: hamilt$1,
    hardcy: hardcy$1,
    harrcir: harrcir$1,
    harrw: harrw$1,
    hbar: hbar$1,
    hcirc: hcirc$1,
    heartsuit: heartsuit$1,
    hercon: hercon$1,
    hfr: hfr$1,
    hksearow: hksearow$1,
    hkswarow: hkswarow$1,
    hoarr: hoarr$1,
    homtht: homtht$1,
    hookleftarrow: hookleftarrow$1,
    hookrightarrow: hookrightarrow$1,
    hopf: hopf$2,
    horbar: horbar$1,
    hscr: hscr$1,
    hslash: hslash$1,
    hstrok: hstrok$1,
    hybull: hybull$1,
    hyphen: hyphen$2,
    ic: ic$2,
    icy: icy$2,
    iecy: iecy$1,
    iff: iff$2,
    ifr: ifr$1,
    ii: ii$2,
    iiiint: iiiint$1,
    iiint: iiint$1,
    iinfin: iinfin$1,
    iiota: iiota$1,
    ijlig: ijlig$1,
    imacr: imacr$1,
    imagline: imagline$1,
    imagpart: imagpart$1,
    imath: imath$1,
    imof: imof$1,
    imped: imped$2,
    "in": "#x2208",
    incare: incare$1,
    infintie: infintie$1,
    inodot: inodot$1,
    intcal: intcal$1,
    integers: integers$2,
    intercal: intercal$1,
    intlarhk: intlarhk$1,
    intprod: intprod$1,
    iocy: iocy$2,
    iogon: iogon$2,
    iopf: iopf$1,
    iprod: iprod$1,
    iscr: iscr$1,
    isinE: isinE$1,
    isindot: isindot$1,
    isins: isins$1,
    isinsv: isinsv$1,
    isinv: isinv$1,
    it: it$2,
    itilde: itilde$1,
    iukcy: iukcy$1,
    jcirc: jcirc$1,
    jcy: jcy$1,
    jfr: jfr$1,
    jmath: jmath$1,
    jopf: jopf$1,
    jscr: jscr$1,
    jsercy: jsercy$1,
    jukcy: jukcy$1,
    kappav: kappav$1,
    kcedil: kcedil$1,
    kcy: kcy$1,
    kfr: kfr$1,
    kgreen: kgreen$1,
    khcy: khcy$1,
    kjcy: kjcy$1,
    kopf: kopf$2,
    kscr: kscr$1,
    lAarr: lAarr$1,
    lAtail: lAtail$1,
    lBarr: lBarr$1,
    lE: lE$1,
    lEg: lEg$1,
    lHar: lHar$1,
    lacute: lacute$1,
    laemptyv: laemptyv$1,
    lagran: lagran$1,
    langd: langd$1,
    langle: langle$1,
    lap: lap$2,
    larrb: larrb$1,
    larrbfs: larrbfs$1,
    larrfs: larrfs$1,
    larrhk: larrhk$1,
    larrlp: larrlp$1,
    larrpl: larrpl$1,
    larrsim: larrsim$1,
    larrtl: larrtl$1,
    lat: lat$2,
    latail: latail$1,
    late: late$2,
    lates: lates$2,
    lbarr: lbarr$1,
    lbbrk: lbbrk$1,
    lbrace: lbrace$1,
    lbrack: lbrack$1,
    lbrke: lbrke$1,
    lbrksld: lbrksld$1,
    lbrkslu: lbrkslu$1,
    lcaron: lcaron$1,
    lcedil: lcedil$1,
    lcub: lcub$1,
    lcy: lcy$1,
    ldca: ldca$1,
    ldquor: ldquor$1,
    ldrdhar: ldrdhar$1,
    ldrushar: ldrushar$1,
    ldsh: ldsh$1,
    leftarrow: leftarrow$1,
    leftarrowtail: leftarrowtail$1,
    leftharpoondown: leftharpoondown$1,
    leftharpoonup: leftharpoonup$1,
    leftleftarrows: leftleftarrows$1,
    leftrightarrow: leftrightarrow$1,
    leftrightarrows: leftrightarrows$1,
    leftrightharpoons: leftrightharpoons$1,
    leftrightsquigarrow: leftrightsquigarrow$1,
    leftthreetimes: leftthreetimes$1,
    leg: leg$2,
    leq: leq$2,
    leqq: leqq$1,
    leqslant: leqslant$1,
    les: les$2,
    lescc: lescc$1,
    lesdot: lesdot$1,
    lesdoto: lesdoto$1,
    lesdotor: lesdotor$1,
    lesg: lesg$1,
    lesges: lesges$1,
    lessapprox: lessapprox$1,
    lessdot: lessdot$1,
    lesseqgtr: lesseqgtr$1,
    lesseqqgtr: lesseqqgtr$1,
    lessgtr: lessgtr$1,
    lesssim: lesssim$1,
    lfisht: lfisht$1,
    lfr: lfr$1,
    lg: lg$2,
    lgE: lgE$1,
    lhard: lhard$1,
    lharu: lharu$1,
    lharul: lharul$1,
    lhblk: lhblk$1,
    ljcy: ljcy$1,
    ll: ll$2,
    llarr: llarr$1,
    llcorner: llcorner$1,
    llhard: llhard$1,
    lltri: lltri$1,
    lmidot: lmidot$1,
    lmoust: lmoust$1,
    lmoustache: lmoustache$1,
    lnE: lnE$1,
    lnap: lnap$1,
    lnapprox: lnapprox$1,
    lne: lne$2,
    lneq: lneq$1,
    lneqq: lneqq$1,
    lnsim: lnsim$1,
    loang: loang$1,
    loarr: loarr$1,
    lobrk: lobrk$1,
    longleftarrow: longleftarrow$1,
    longleftrightarrow: longleftrightarrow$1,
    longmapsto: longmapsto$1,
    longrightarrow: longrightarrow$1,
    looparrowleft: looparrowleft$1,
    looparrowright: looparrowright$1,
    lopar: lopar$1,
    lopf: lopf$1,
    loplus: loplus$1,
    lotimes: lotimes$1,
    lozenge: lozenge$2,
    lozf: lozf$1,
    lparlt: lparlt$1,
    lrarr: lrarr$1,
    lrcorner: lrcorner$1,
    lrhar: lrhar$1,
    lrhard: lrhard$1,
    lrtri: lrtri$1,
    lscr: lscr$1,
    lsh: lsh$2,
    lsim: lsim$1,
    lsime: lsime$1,
    lsimg: lsimg$1,
    lsquor: lsquor$1,
    lstrok: lstrok$1,
    ltcc: ltcc$1,
    ltcir: ltcir$1,
    ltdot: ltdot$1,
    lthree: lthree$1,
    ltimes: ltimes$2,
    ltlarr: ltlarr$1,
    ltquest: ltquest$1,
    ltrPar: ltrPar$1,
    ltri: ltri$1,
    ltrie: ltrie$1,
    ltrif: ltrif$1,
    lurdshar: lurdshar$1,
    luruhar: luruhar$1,
    lvertneqq: lvertneqq$1,
    lvnE: lvnE$1,
    mDDot: mDDot$1,
    male: male$2,
    malt: malt$2,
    maltese: maltese$1,
    map: map$2,
    mapsto: mapsto$1,
    mapstodown: mapstodown$1,
    mapstoleft: mapstoleft$1,
    mapstoup: mapstoup$1,
    marker: marker$2,
    mcomma: mcomma$1,
    mcy: mcy$1,
    measuredangle: measuredangle$1,
    mfr: mfr$1,
    mho: mho$1,
    mid: mid$2,
    midcir: midcir$1,
    minusb: minusb$1,
    minusd: minusd$1,
    minusdu: minusdu$1,
    mlcp: mlcp$1,
    mldr: mldr$1,
    mnplus: mnplus$1,
    models: models$2,
    mopf: mopf$1,
    mp: mp$2,
    mscr: mscr$1,
    mstpos: mstpos$1,
    multimap: multimap$1,
    mumap: mumap$1,
    nGg: nGg$1,
    nGt: nGt$1,
    nGtv: nGtv$1,
    nLeftarrow: nLeftarrow$1,
    nLeftrightarrow: nLeftrightarrow$1,
    nLl: nLl$1,
    nLt: nLt$1,
    nLtv: nLtv$1,
    nRightarrow: nRightarrow$1,
    nVDash: nVDash$1,
    nVdash: nVdash$1,
    nacute: nacute$1,
    nang: nang$2,
    nap: nap$2,
    napE: napE$1,
    napid: napid$1,
    napos: napos$1,
    napprox: napprox$1,
    natur: natur$1,
    natural: natural$2,
    naturals: naturals$2,
    nbump: nbump$1,
    nbumpe: nbumpe$1,
    ncap: ncap$1,
    ncaron: ncaron$1,
    ncedil: ncedil$1,
    ncong: ncong$1,
    ncongdot: ncongdot$1,
    ncup: ncup$1,
    ncy: ncy$2,
    neArr: neArr$1,
    nearhk: nearhk$1,
    nearr: nearr$1,
    nearrow: nearrow$1,
    nedot: nedot$1,
    nequiv: nequiv$1,
    nesear: nesear$1,
    nesim: nesim$1,
    nexist: nexist$1,
    nexists: nexists$1,
    nfr: nfr$1,
    ngE: ngE$1,
    nge: nge$2,
    ngeq: ngeq$1,
    ngeqq: ngeqq$1,
    ngeqslant: ngeqslant$1,
    nges: nges$1,
    ngsim: ngsim$1,
    ngt: ngt$2,
    ngtr: ngtr$1,
    nhArr: nhArr$1,
    nharr: nharr$1,
    nhpar: nhpar$1,
    nis: nis$2,
    nisd: nisd$1,
    niv: niv$1,
    njcy: njcy$1,
    nlArr: nlArr$1,
    nlE: nlE$1,
    nlarr: nlarr$1,
    nldr: nldr$1,
    nle: nle$2,
    nleftarrow: nleftarrow$1,
    nleftrightarrow: nleftrightarrow$1,
    nleq: nleq$1,
    nleqq: nleqq$1,
    nleqslant: nleqslant$1,
    nles: nles$2,
    nless: nless$2,
    nlsim: nlsim$1,
    nlt: nlt$2,
    nltri: nltri$1,
    nltrie: nltrie$1,
    nmid: nmid$1,
    nopf: nopf$2,
    notinE: notinE$1,
    notindot: notindot$1,
    notinva: notinva$1,
    notinvb: notinvb$1,
    notinvc: notinvc$1,
    notni: notni$1,
    notniva: notniva$1,
    notnivb: notnivb$1,
    notnivc: notnivc$1,
    npar: npar$1,
    nparallel: nparallel$1,
    nparsl: nparsl$1,
    npart: npart$1,
    npolint: npolint$1,
    npr: npr$1,
    nprcue: nprcue$1,
    npre: npre$1,
    nprec: nprec$1,
    npreceq: npreceq$1,
    nrArr: nrArr$1,
    nrarr: nrarr$1,
    nrarrc: nrarrc$1,
    nrarrw: nrarrw$1,
    nrightarrow: nrightarrow$1,
    nrtri: nrtri$1,
    nrtrie: nrtrie$1,
    nsc: nsc$2,
    nsccue: nsccue$1,
    nsce: nsce$2,
    nscr: nscr$1,
    nshortmid: nshortmid$1,
    nshortparallel: nshortparallel$1,
    nsim: nsim$1,
    nsime: nsime$1,
    nsimeq: nsimeq$1,
    nsmid: nsmid$1,
    nspar: nspar$1,
    nsqsube: nsqsube$1,
    nsqsupe: nsqsupe$1,
    nsubE: nsubE$1,
    nsube: nsube$1,
    nsubset: nsubset$1,
    nsubseteq: nsubseteq$1,
    nsubseteqq: nsubseteqq$1,
    nsucc: nsucc$1,
    nsucceq: nsucceq$1,
    nsup: nsup$1,
    nsupE: nsupE$1,
    nsupe: nsupe$1,
    nsupset: nsupset$1,
    nsupseteq: nsupseteq$1,
    nsupseteqq: nsupseteqq$1,
    ntgl: ntgl$1,
    ntlg: ntlg$1,
    ntriangleleft: ntriangleleft$1,
    ntrianglelefteq: ntrianglelefteq$1,
    ntriangleright: ntriangleright$1,
    ntrianglerighteq: ntrianglerighteq$1,
    numero: numero$1,
    numsp: numsp$1,
    nvDash: nvDash$1,
    nvHarr: nvHarr$1,
    nvap: nvap$1,
    nvdash: nvdash$1,
    nvge: nvge$1,
    nvgt: nvgt$1,
    nvinfin: nvinfin$1,
    nvlArr: nvlArr$1,
    nvle: nvle$1,
    nvlt: nvlt$1,
    nvltrie: nvltrie$1,
    nvrArr: nvrArr$1,
    nvrtrie: nvrtrie$1,
    nvsim: nvsim$1,
    nwArr: nwArr$1,
    nwarhk: nwarhk$1,
    nwarr: nwarr$1,
    nwarrow: nwarrow$1,
    nwnear: nwnear$1,
    oS: oS$1,
    oast: oast$1,
    ocir: ocir$1,
    ocy: ocy$1,
    odash: odash$1,
    odblac: odblac$1,
    odiv: odiv$1,
    odot: odot$1,
    odsold: odsold$1,
    ofcir: ofcir$1,
    ofr: ofr$1,
    ogon: ogon$1,
    ogt: ogt$2,
    ohbar: ohbar$1,
    ohm: ohm$2,
    oint: oint$1,
    olarr: olarr$1,
    olcir: olcir$1,
    olcross: olcross$1,
    olt: olt$2,
    omacr: omacr$1,
    omid: omid$1,
    ominus: ominus$1,
    oopf: oopf$2,
    opar: opar$2,
    operp: operp$1,
    orarr: orarr$1,
    ord: ord$1,
    order: order$2,
    orderof: orderof$1,
    origof: origof$1,
    oror: oror$2,
    orslope: orslope$1,
    orv: orv$2,
    oscr: oscr$1,
    osol: osol$2,
    otimesas: otimesas$1,
    ovbar: ovbar$1,
    par: par$2,
    parallel: parallel$2,
    parsim: parsim$1,
    parsl: parsl$1,
    pcy: pcy$1,
    pertenk: pertenk$1,
    pfr: pfr$1,
    phiv: phiv$1,
    phmmat: phmmat$1,
    phone: phone$2,
    pitchfork: pitchfork$2,
    planck: planck$1,
    planckh: planckh$1,
    plankv: plankv$1,
    plusacir: plusacir$1,
    plusb: plusb$1,
    pluscir: pluscir$1,
    plusdo: plusdo$1,
    plusdu: plusdu$1,
    pluse: pluse$1,
    plussim: plussim$1,
    plustwo: plustwo$1,
    pm: pm$2,
    pointint: pointint$1,
    popf: popf$2,
    pr: pr$2,
    prE: prE$1,
    prap: prap$1,
    prcue: prcue$1,
    pre: pre$1,
    prec: prec$1,
    precapprox: precapprox$1,
    preccurlyeq: preccurlyeq$1,
    preceq: preceq$1,
    precnapprox: precnapprox$1,
    precneqq: precneqq$1,
    precnsim: precnsim$1,
    precsim: precsim$1,
    primes: primes$2,
    prnE: prnE$1,
    prnap: prnap$1,
    prnsim: prnsim$1,
    profalar: profalar$1,
    profline: profline$1,
    profsurf: profsurf$1,
    propto: propto$1,
    prsim: prsim$1,
    prurel: prurel$1,
    pscr: pscr$1,
    puncsp: puncsp$1,
    qfr: qfr$1,
    qint: qint$1,
    qopf: qopf$1,
    qprime: qprime$1,
    qscr: qscr$1,
    quaternions: quaternions$1,
    quatint: quatint$1,
    questeq: questeq$1,
    rAarr: rAarr$1,
    rAtail: rAtail$1,
    rBarr: rBarr$1,
    rHar: rHar$1,
    race: race$2,
    racute: racute$1,
    raemptyv: raemptyv$1,
    rangd: rangd$1,
    range: range$2,
    rangle: rangle$1,
    rarrap: rarrap$1,
    rarrb: rarrb$1,
    rarrbfs: rarrbfs$1,
    rarrc: rarrc$1,
    rarrfs: rarrfs$1,
    rarrhk: rarrhk$1,
    rarrlp: rarrlp$1,
    rarrpl: rarrpl$1,
    rarrsim: rarrsim$1,
    rarrtl: rarrtl$1,
    rarrw: rarrw$1,
    ratail: ratail$1,
    ratio: ratio$2,
    rationals: rationals$1,
    rbarr: rbarr$1,
    rbbrk: rbbrk$1,
    rbrke: rbrke$1,
    rbrksld: rbrksld$1,
    rbrkslu: rbrkslu$1,
    rcaron: rcaron$1,
    rcedil: rcedil$1,
    rcy: rcy$1,
    rdca: rdca$1,
    rdldhar: rdldhar$1,
    rdquor: rdquor$1,
    rdsh: rdsh$1,
    realine: realine$1,
    realpart: realpart$1,
    reals: reals$2,
    rect: rect$2,
    rfisht: rfisht$1,
    rfr: rfr$1,
    rhard: rhard$1,
    rharu: rharu$1,
    rharul: rharul$1,
    rhov: rhov$1,
    rightarrow: rightarrow$1,
    rightarrowtail: rightarrowtail$1,
    rightharpoondown: rightharpoondown$1,
    rightharpoonup: rightharpoonup$1,
    rightleftarrows: rightleftarrows$1,
    rightleftharpoons: rightleftharpoons$1,
    rightrightarrows: rightrightarrows$1,
    rightsquigarrow: rightsquigarrow$1,
    rightthreetimes: rightthreetimes$1,
    ring: ring$2,
    risingdotseq: risingdotseq$1,
    rlarr: rlarr$1,
    rlhar: rlhar$1,
    rmoust: rmoust$1,
    rmoustache: rmoustache$1,
    rnmid: rnmid$1,
    roang: roang$1,
    roarr: roarr$1,
    robrk: robrk$1,
    ropar: ropar$1,
    ropf: ropf$1,
    roplus: roplus$1,
    rotimes: rotimes$1,
    rpargt: rpargt$1,
    rppolint: rppolint$1,
    rrarr: rrarr$1,
    rscr: rscr$1,
    rsh: rsh$2,
    rsquor: rsquor$1,
    rthree: rthree$1,
    rtimes: rtimes$1,
    rtri: rtri$1,
    rtrie: rtrie$1,
    rtrif: rtrif$1,
    rtriltri: rtriltri$1,
    ruluhar: ruluhar$1,
    rx: rx$1,
    sacute: sacute$1,
    sc: sc$2,
    scE: scE$1,
    scap: scap$2,
    sccue: sccue$1,
    sce: sce$2,
    scedil: scedil$1,
    scirc: scirc$1,
    scnE: scnE$1,
    scnap: scnap$1,
    scnsim: scnsim$1,
    scpolint: scpolint$1,
    scsim: scsim$1,
    scy: scy$2,
    sdotb: sdotb$1,
    sdote: sdote$1,
    seArr: seArr$1,
    searhk: searhk$1,
    searr: searr$1,
    searrow: searrow$1,
    seswar: seswar$1,
    setminus: setminus$1,
    setmn: setmn$1,
    sext: sext$1,
    sfr: sfr$1,
    sfrown: sfrown$1,
    sharp: sharp$2,
    shchcy: shchcy$1,
    shcy: shcy$1,
    shortmid: shortmid$1,
    shortparallel: shortparallel$1,
    sigmav: sigmav$1,
    simdot: simdot$1,
    sime: sime$1,
    simeq: simeq$1,
    simg: simg$1,
    simgE: simgE$1,
    siml: siml$1,
    simlE: simlE$1,
    simne: simne$1,
    simplus: simplus$1,
    simrarr: simrarr$1,
    slarr: slarr$1,
    smallsetminus: smallsetminus$1,
    smashp: smashp$1,
    smeparsl: smeparsl$1,
    smid: smid$1,
    smile: smile$1,
    smt: smt$1,
    smte: smte$1,
    smtes: smtes$1,
    softcy: softcy$1,
    solb: solb$1,
    solbar: solbar$1,
    sopf: sopf$1,
    spadesuit: spadesuit$1,
    spar: spar$1,
    sqcap: sqcap$1,
    sqcaps: sqcaps$1,
    sqcup: sqcup$1,
    sqcups: sqcups$1,
    sqsub: sqsub$1,
    sqsube: sqsube$1,
    sqsubset: sqsubset$1,
    sqsubseteq: sqsubseteq$1,
    sqsup: sqsup$1,
    sqsupe: sqsupe$1,
    sqsupset: sqsupset$1,
    sqsupseteq: sqsupseteq$1,
    squ: squ$1,
    square: square$2,
    squarf: squarf$1,
    squf: squf$1,
    srarr: srarr$1,
    sscr: sscr$1,
    ssetmn: ssetmn$1,
    ssmile: ssmile$1,
    sstarf: sstarf$1,
    star: star$2,
    starf: starf$1,
    straightepsilon: straightepsilon$1,
    straightphi: straightphi$1,
    strns: strns$1,
    subE: subE$1,
    subdot: subdot$1,
    subedot: subedot$1,
    submult: submult$1,
    subnE: subnE$1,
    subne: subne$1,
    subplus: subplus$1,
    subrarr: subrarr$1,
    subset: subset$1,
    subseteq: subseteq$1,
    subseteqq: subseteqq$1,
    subsetneq: subsetneq$1,
    subsetneqq: subsetneqq$1,
    subsim: subsim$1,
    subsub: subsub$1,
    subsup: subsup$1,
    succ: succ$1,
    succapprox: succapprox$1,
    succcurlyeq: succcurlyeq$1,
    succeq: succeq$1,
    succnapprox: succnapprox$1,
    succneqq: succneqq$1,
    succnsim: succnsim$1,
    succsim: succsim$1,
    sung: sung$1,
    supE: supE$1,
    supdot: supdot$1,
    supdsub: supdsub$1,
    supedot: supedot$1,
    suphsol: suphsol$1,
    suphsub: suphsub$1,
    suplarr: suplarr$1,
    supmult: supmult$1,
    supnE: supnE$1,
    supne: supne$1,
    supplus: supplus$1,
    supset: supset$1,
    supseteq: supseteq$1,
    supseteqq: supseteqq$1,
    supsetneq: supsetneq$1,
    supsetneqq: supsetneqq$1,
    supsim: supsim$1,
    supsub: supsub$1,
    supsup: supsup$1,
    swArr: swArr$1,
    swarhk: swarhk$1,
    swarr: swarr$1,
    swarrow: swarrow$1,
    swnwar: swnwar$1,
    target: target$2,
    tbrk: tbrk$1,
    tcaron: tcaron$1,
    tcedil: tcedil$1,
    tcy: tcy$1,
    tdot: tdot$1,
    telrec: telrec$1,
    tfr: tfr$1,
    therefore: therefore$2,
    thetav: thetav$1,
    thickapprox: thickapprox$1,
    thicksim: thicksim$1,
    thkap: thkap$1,
    thksim: thksim$1,
    timesb: timesb$1,
    timesbar: timesbar$1,
    timesd: timesd$1,
    tint: tint$2,
    toea: toea$1,
    top: top$2,
    topbot: topbot$1,
    topcir: topcir$1,
    topf: topf$1,
    topfork: topfork$1,
    tosa: tosa$2,
    tprime: tprime$1,
    triangle: triangle$2,
    triangledown: triangledown$1,
    triangleleft: triangleleft$1,
    trianglelefteq: trianglelefteq$1,
    triangleq: triangleq$1,
    triangleright: triangleright$1,
    trianglerighteq: trianglerighteq$1,
    tridot: tridot$1,
    trie: trie$2,
    triminus: triminus$1,
    triplus: triplus$1,
    trisb: trisb$1,
    tritime: tritime$1,
    trpezium: trpezium$1,
    tscr: tscr$1,
    tscy: tscy$1,
    tshcy: tshcy$1,
    tstrok: tstrok$1,
    twixt: twixt$1,
    twoheadleftarrow: twoheadleftarrow$1,
    twoheadrightarrow: twoheadrightarrow$1,
    uHar: uHar$1,
    ubrcy: ubrcy$1,
    ubreve: ubreve$1,
    ucy: ucy$2,
    udarr: udarr$1,
    udblac: udblac$1,
    udhar: udhar$1,
    ufisht: ufisht$1,
    ufr: ufr$1,
    uharl: uharl$1,
    uharr: uharr$1,
    uhblk: uhblk$1,
    ulcorn: ulcorn$1,
    ulcorner: ulcorner$1,
    ulcrop: ulcrop$1,
    ultri: ultri$1,
    umacr: umacr$1,
    uogon: uogon$1,
    uopf: uopf$1,
    uparrow: uparrow$1,
    updownarrow: updownarrow$1,
    upharpoonleft: upharpoonleft$1,
    upharpoonright: upharpoonright$1,
    uplus: uplus$2,
    upsi: upsi$2,
    upuparrows: upuparrows$1,
    urcorn: urcorn$1,
    urcorner: urcorner$1,
    urcrop: urcrop$1,
    uring: uring$2,
    urtri: urtri$1,
    uscr: uscr$1,
    utdot: utdot$1,
    utilde: utilde$1,
    utri: utri$1,
    utrif: utrif$1,
    uuarr: uuarr$1,
    uwangle: uwangle$1,
    vArr: vArr$1,
    vBar: vBar$1,
    vBarv: vBarv$1,
    vDash: vDash$1,
    vangrt: vangrt$1,
    varepsilon: varepsilon$1,
    varkappa: varkappa$1,
    varnothing: varnothing$1,
    varphi: varphi$1,
    varpi: varpi$1,
    varpropto: varpropto$1,
    varr: varr$1,
    varrho: varrho$1,
    varsigma: varsigma$1,
    varsubsetneq: varsubsetneq$1,
    varsubsetneqq: varsubsetneqq$1,
    varsupsetneq: varsupsetneq$1,
    varsupsetneqq: varsupsetneqq$1,
    vartheta: vartheta$1,
    vartriangleleft: vartriangleleft$1,
    vartriangleright: vartriangleright$1,
    vcy: vcy$1,
    vdash: vdash$1,
    vee: vee$2,
    veebar: veebar$1,
    veeeq: veeeq$1,
    vellip: vellip$1,
    vfr: vfr$1,
    vltri: vltri$1,
    vnsub: vnsub$1,
    vnsup: vnsup$1,
    vopf: vopf$1,
    vprop: vprop$1,
    vrtri: vrtri$1,
    vscr: vscr$1,
    vsubnE: vsubnE$1,
    vsubne: vsubne$1,
    vsupnE: vsupnE$1,
    vsupne: vsupne$1,
    vzigzag: vzigzag$1,
    wcirc: wcirc$1,
    wedbar: wedbar$1,
    wedge: wedge$2,
    wedgeq: wedgeq$1,
    wfr: wfr$1,
    wopf: wopf$1,
    wp: wp$1,
    wr: wr$1,
    wreath: wreath$2,
    wscr: wscr$1,
    xcap: xcap$1,
    xcirc: xcirc$1,
    xcup: xcup$1,
    xdtri: xdtri$1,
    xfr: xfr$1,
    xhArr: xhArr$1,
    xharr: xharr$1,
    xlArr: xlArr$1,
    xlarr: xlarr$1,
    xmap: xmap$1,
    xnis: xnis$1,
    xodot: xodot$1,
    xopf: xopf$1,
    xoplus: xoplus$1,
    xotime: xotime$1,
    xrArr: xrArr$1,
    xrarr: xrarr$1,
    xscr: xscr$1,
    xsqcup: xsqcup$1,
    xuplus: xuplus$1,
    xutri: xutri$1,
    xvee: xvee$1,
    xwedge: xwedge$1,
    yacy: yacy$1,
    ycirc: ycirc$2,
    ycy: ycy$2,
    yfr: yfr$1,
    yicy: yicy$1,
    yopf: yopf$1,
    yscr: yscr$1,
    yucy: yucy$1,
    zacute: zacute$2,
    zcaron: zcaron$1,
    zcy: zcy$1,
    zdot: zdot$1,
    zeetrf: zeetrf$1,
    zfr: zfr$1,
    zhcy: zhcy$1,
    zigrarr: zigrarr$1,
    zopf: zopf$1,
    zscr: zscr$1
  };

  /**
   * string-range-expander
   * Expands string index ranges within whitespace boundaries until letters are met
   * Version: 1.10.56
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-range-expander
   */
  const isArr$1 = Array.isArray;

  function expander(originalOpts) {
    const letterOrDigit = /^[0-9a-zA-Z]+$/;

    function isWhitespace(char) {
      if (!char || typeof char !== "string") {
        return false;
      }

      return char.trim().length === 0;
    }

    function isStr(something) {
      return typeof something === "string";
    }

    if (!lodash_isplainobject(originalOpts)) {
      let supplementalString;

      if (originalOpts === undefined) {
        supplementalString = "but it is missing completely.";
      } else if (originalOpts === null) {
        supplementalString = "but it was given as null.";
      } else {
        supplementalString = `but it was given as ${typeof originalOpts}, equal to:\n${JSON.stringify(originalOpts, null, 4)}.`;
      }

      throw new Error(`string-range-expander: [THROW_ID_01] Input must be a plain object ${supplementalString}`);
    } else if (lodash_isplainobject(originalOpts) && Object.keys(originalOpts).length === 0) {
      throw new Error(`string-range-expander: [THROW_ID_02] Input must be a plain object but it was given as a plain object without any keys and computer doesn't know what to expand.`);
    }

    if (typeof originalOpts.from !== "number") {
      throw new Error(`string-range-expander: [THROW_ID_03] The input's "from" value opts.from, is not a number! Currently it's given as ${typeof originalOpts.from}, equal to ${JSON.stringify(originalOpts.from, null, 0)}`);
    }

    if (typeof originalOpts.to !== "number") {
      throw new Error(`string-range-expander: [THROW_ID_04] The input's "to" value opts.to, is not a number! Currently it's given as ${typeof originalOpts.to}, equal to ${JSON.stringify(originalOpts.to, null, 0)}`);
    }

    if (!originalOpts.str[originalOpts.from] && originalOpts.from !== originalOpts.to) {
      throw new Error(`string-range-expander: [THROW_ID_05] The given input string opts.str ("${originalOpts.str}") must contain the character at index "from" ("${originalOpts.from}")`);
    }

    if (!originalOpts.str[originalOpts.to - 1]) {
      throw new Error(`string-range-expander: [THROW_ID_06] The given input string, opts.str ("${originalOpts.str}") must contain the character at index before "to" ("${originalOpts.to - 1}")`);
    }

    if (originalOpts.from > originalOpts.to) {
      throw new Error(`string-range-expander: [THROW_ID_07] The given "from" index, "${originalOpts.from}" is greater than "to" index, "${originalOpts.to}". That's wrong!`);
    }

    if (isStr(originalOpts.extendToOneSide) && originalOpts.extendToOneSide !== "left" && originalOpts.extendToOneSide !== "right" || !isStr(originalOpts.extendToOneSide) && originalOpts.extendToOneSide !== undefined && originalOpts.extendToOneSide !== false) {
      throw new Error(`string-range-expander: [THROW_ID_08] The opts.extendToOneSide value is not recogniseable! It's set to: "${originalOpts.extendToOneSide}" (${typeof originalOpts.extendToOneSide}). It has to be either Boolean "false" or strings "left" or "right"`);
    }

    const defaults = {
      str: "",
      from: 0,
      to: 0,
      ifLeftSideIncludesThisThenCropTightly: "",
      ifLeftSideIncludesThisCropItToo: "",
      ifRightSideIncludesThisThenCropTightly: "",
      ifRightSideIncludesThisCropItToo: "",
      extendToOneSide: false,
      wipeAllWhitespaceOnLeft: false,
      wipeAllWhitespaceOnRight: false,
      addSingleSpaceToPreventAccidentalConcatenation: false
    };
    const opts = Object.assign({}, defaults, originalOpts);

    if (isArr$1(opts.ifLeftSideIncludesThisThenCropTightly)) {
      let culpritsIndex;
      let culpritsValue;

      if (opts.ifLeftSideIncludesThisThenCropTightly.every((val, i) => {
        if (!isStr(val)) {
          culpritsIndex = i;
          culpritsValue = val;
          return false;
        }

        return true;
      })) {
        opts.ifLeftSideIncludesThisThenCropTightly = opts.ifLeftSideIncludesThisThenCropTightly.join("");
      } else {
        throw new Error(`string-range-expander: [THROW_ID_09] The opts.ifLeftSideIncludesThisThenCropTightly was set to an array:\n${JSON.stringify(opts.ifLeftSideIncludesThisThenCropTightly, null, 4)}. Now, that array contains not only string elements. For example, an element at index ${culpritsIndex} is of a type ${typeof culpritsValue} (equal to ${JSON.stringify(culpritsValue, null, 0)}).`);
      }
    }

    const str = opts.str;
    let from = opts.from;
    let to = opts.to;

    if (opts.extendToOneSide !== "right" && (isWhitespace(str[from - 1]) && (isWhitespace(str[from - 2]) || opts.ifLeftSideIncludesThisCropItToo.includes(str[from - 2])) || str[from - 1] && opts.ifLeftSideIncludesThisCropItToo.includes(str[from - 1]) || opts.wipeAllWhitespaceOnLeft && isWhitespace(str[from - 1]))) {
      for (let i = from; i--;) {
        if (!opts.ifLeftSideIncludesThisCropItToo.includes(str[i])) {
          if (str[i].trim().length) {
            if (opts.wipeAllWhitespaceOnLeft || opts.ifLeftSideIncludesThisCropItToo.includes(str[i + 1])) {
              from = i + 1;
            } else {
              from = i + 2;
            }

            break;
          } else if (i === 0) {
            if (opts.wipeAllWhitespaceOnLeft) {
              from = 0;
            } else {
              from = 1;
            }

            break;
          }
        }
      }
    }

    if (opts.extendToOneSide !== "left" && (isWhitespace(str[to]) && (opts.wipeAllWhitespaceOnRight || isWhitespace(str[to + 1])) || opts.ifRightSideIncludesThisCropItToo.includes(str[to]))) {
      for (let i = to, len = str.length; i < len; i++) {
        if (!opts.ifRightSideIncludesThisCropItToo.includes(str[i]) && (str[i] && str[i].trim().length || str[i] === undefined)) {
          if (opts.wipeAllWhitespaceOnRight || opts.ifRightSideIncludesThisCropItToo.includes(str[i - 1])) {
            to = i;
          } else {
            to = i - 1;
          }

          break;
        }
      }
    }

    if (opts.extendToOneSide !== "right" && isStr(opts.ifLeftSideIncludesThisThenCropTightly) && opts.ifLeftSideIncludesThisThenCropTightly.length && (str[from - 2] && opts.ifLeftSideIncludesThisThenCropTightly.includes(str[from - 2]) || str[from - 1] && opts.ifLeftSideIncludesThisThenCropTightly.includes(str[from - 1])) || opts.extendToOneSide !== "left" && isStr(opts.ifRightSideIncludesThisThenCropTightly) && opts.ifRightSideIncludesThisThenCropTightly.length && (str[to + 1] && opts.ifRightSideIncludesThisThenCropTightly.includes(str[to + 1]) || str[to] && opts.ifRightSideIncludesThisThenCropTightly.includes(str[to]))) {
      if (opts.extendToOneSide !== "right" && isWhitespace(str[from - 1]) && !opts.wipeAllWhitespaceOnLeft) {
        from--;
      }

      if (opts.extendToOneSide !== "left" && isWhitespace(str[to]) && !opts.wipeAllWhitespaceOnRight) {
        to++;
      }
    }

    if (opts.addSingleSpaceToPreventAccidentalConcatenation && str[from - 1] && str[from - 1].trim().length && str[to] && str[to].trim().length && (!opts.ifLeftSideIncludesThisThenCropTightly && !opts.ifRightSideIncludesThisThenCropTightly || !((!opts.ifLeftSideIncludesThisThenCropTightly || opts.ifLeftSideIncludesThisThenCropTightly.includes(str[from - 1])) && (!opts.ifRightSideIncludesThisThenCropTightly || str[to] && opts.ifRightSideIncludesThisThenCropTightly.includes(str[to])))) && (letterOrDigit.test(str[from - 1]) || letterOrDigit.test(str[to]))) {
      return [from, to, " "];
    }

    return [from, to];
  }

  /**
   * ranges-sort
   * Sort natural number index ranges [ [5, 6], [1, 3] ] => [ [1, 3], [5, 6] ]
   * Version: 3.11.0
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-sort
   */
  function rangesSort(arrOfRanges, originalOptions) {
    if (!Array.isArray(arrOfRanges)) {
      throw new TypeError(`ranges-sort: [THROW_ID_01] Input must be an array, consisting of range arrays! Currently its type is: ${typeof arrOfRanges}, equal to: ${JSON.stringify(arrOfRanges, null, 4)}`);
    }

    if (arrOfRanges.length === 0) {
      return arrOfRanges;
    }

    const defaults = {
      strictlyTwoElementsInRangeArrays: false,
      progressFn: null
    };
    const opts = Object.assign({}, defaults, originalOptions);
    let culpritsIndex;
    let culpritsLen;

    if (opts.strictlyTwoElementsInRangeArrays && !arrOfRanges.every((rangeArr, indx) => {
      if (rangeArr.length !== 2) {
        culpritsIndex = indx;
        culpritsLen = rangeArr.length;
        return false;
      }

      return true;
    })) {
      throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${culpritsIndex}th range (${JSON.stringify(arrOfRanges[culpritsIndex], null, 4)}) has not two but ${culpritsLen} elements!`);
    }

    if (!arrOfRanges.every((rangeArr, indx) => {
      if (!Number.isInteger(rangeArr[0]) || rangeArr[0] < 0 || !Number.isInteger(rangeArr[1]) || rangeArr[1] < 0) {
        culpritsIndex = indx;
        return false;
      }

      return true;
    })) {
      throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${culpritsIndex}th range (${JSON.stringify(arrOfRanges[culpritsIndex], null, 4)}) does not consist of only natural numbers!`);
    }

    const maxPossibleIterations = arrOfRanges.length * arrOfRanges.length;
    let counter = 0;
    return Array.from(arrOfRanges).sort((range1, range2) => {
      if (opts.progressFn) {
        counter++;
        opts.progressFn(Math.floor(counter * 100 / maxPossibleIterations));
      }

      if (range1[0] === range2[0]) {
        if (range1[1] < range2[1]) {
          return -1;
        }

        if (range1[1] > range2[1]) {
          return 1;
        }

        return 0;
      }

      if (range1[0] < range2[0]) {
        return -1;
      }

      return 1;
    });
  }

  /**
   * ranges-merge
   * Merge and sort arrays which mean string slice ranges
   * Version: 4.3.1
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-merge
   */

  function mergeRanges(arrOfRanges, originalOpts) {
    function isStr(something) {
      return typeof something === "string";
    }

    function isObj(something) {
      return something && typeof something === "object" && !Array.isArray(something);
    }

    if (!Array.isArray(arrOfRanges)) {
      return arrOfRanges;
    }

    const defaults = {
      mergeType: 1,
      progressFn: null,
      joinRangesThatTouchEdges: true
    };
    let opts;

    if (originalOpts) {
      if (isObj(originalOpts)) {
        opts = Object.assign({}, defaults, originalOpts);

        if (opts.progressFn && isObj(opts.progressFn) && !Object.keys(opts.progressFn).length) {
          opts.progressFn = null;
        } else if (opts.progressFn && typeof opts.progressFn !== "function") {
          throw new Error(`ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "${typeof opts.progressFn}", equal to ${JSON.stringify(opts.progressFn, null, 4)}`);
        }

        if (opts.mergeType && opts.mergeType !== 1 && opts.mergeType !== 2) {
          if (isStr(opts.mergeType) && opts.mergeType.trim() === "1") {
            opts.mergeType = 1;
          } else if (isStr(opts.mergeType) && opts.mergeType.trim() === "2") {
            opts.mergeType = 2;
          } else {
            throw new Error(`ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof opts.mergeType}", equal to ${JSON.stringify(opts.mergeType, null, 4)}`);
          }
        }

        if (typeof opts.joinRangesThatTouchEdges !== "boolean") {
          throw new Error(`ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof opts.joinRangesThatTouchEdges}", equal to ${JSON.stringify(opts.joinRangesThatTouchEdges, null, 4)}`);
        }
      } else {
        throw new Error(`emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:\n${JSON.stringify(originalOpts, null, 4)} (type ${typeof originalOpts})`);
      }
    } else {
      opts = Object.assign({}, defaults);
    }

    const filtered = arrOfRanges.map(subarr => [...subarr]).filter(rangeArr => rangeArr[2] !== undefined || rangeArr[0] !== rangeArr[1]);
    let sortedRanges;
    let lastPercentageDone;
    let percentageDone;

    if (opts.progressFn) {
      sortedRanges = rangesSort(filtered, {
        progressFn: percentage => {
          percentageDone = Math.floor(percentage / 5);

          if (percentageDone !== lastPercentageDone) {
            lastPercentageDone = percentageDone;
            opts.progressFn(percentageDone);
          }
        }
      });
    } else {
      sortedRanges = rangesSort(filtered);
    }

    const len = sortedRanges.length - 1;

    for (let i = len; i > 0; i--) {
      if (opts.progressFn) {
        percentageDone = Math.floor((1 - i / len) * 78) + 21;

        if (percentageDone !== lastPercentageDone && percentageDone > lastPercentageDone) {
          lastPercentageDone = percentageDone;
          opts.progressFn(percentageDone);
        }
      }

      if (sortedRanges[i][0] <= sortedRanges[i - 1][0] || !opts.joinRangesThatTouchEdges && sortedRanges[i][0] < sortedRanges[i - 1][1] || opts.joinRangesThatTouchEdges && sortedRanges[i][0] <= sortedRanges[i - 1][1]) {
        sortedRanges[i - 1][0] = Math.min(sortedRanges[i][0], sortedRanges[i - 1][0]);
        sortedRanges[i - 1][1] = Math.max(sortedRanges[i][1], sortedRanges[i - 1][1]);

        if (sortedRanges[i][2] !== undefined && (sortedRanges[i - 1][0] >= sortedRanges[i][0] || sortedRanges[i - 1][1] <= sortedRanges[i][1])) {
          if (sortedRanges[i - 1][2] !== null) {
            if (sortedRanges[i][2] === null && sortedRanges[i - 1][2] !== null) {
              sortedRanges[i - 1][2] = null;
            } else if (sortedRanges[i - 1][2] !== undefined) {
              if (opts.mergeType === 2 && sortedRanges[i - 1][0] === sortedRanges[i][0]) {
                sortedRanges[i - 1][2] = sortedRanges[i][2];
              } else {
                sortedRanges[i - 1][2] += sortedRanges[i][2];
              }
            } else {
              sortedRanges[i - 1][2] = sortedRanges[i][2];
            }
          }
        }

        sortedRanges.splice(i, 1);
        i = sortedRanges.length;
      }
    }

    return sortedRanges;
  }

  /**
   * ranges-apply
   * Take an array of string slice ranges, delete/replace the string according to them
   * Version: 3.1.2
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-apply
   */

  function existy(x) {
    return x != null;
  }

  function isStr$1(something) {
    return typeof something === "string";
  }

  function rangesApply(str, rangesArr, progressFn) {
    let percentageDone = 0;
    let lastPercentageDone = 0;

    if (arguments.length === 0) {
      throw new Error("ranges-apply: [THROW_ID_01] inputs missing!");
    }

    if (!isStr$1(str)) {
      throw new TypeError(`ranges-apply: [THROW_ID_02] first input argument must be a string! Currently it's: ${typeof str}, equal to: ${JSON.stringify(str, null, 4)}`);
    }

    if (rangesArr === null) {
      return str;
    } else if (!Array.isArray(rangesArr)) {
      throw new TypeError(`ranges-apply: [THROW_ID_03] second input argument must be an array (or null)! Currently it's: ${typeof rangesArr}, equal to: ${JSON.stringify(rangesArr, null, 4)}`);
    }

    if (progressFn && typeof progressFn !== "function") {
      throw new TypeError(`ranges-apply: [THROW_ID_04] the third input argument must be a function (or falsey)! Currently it's: ${typeof progressFn}, equal to: ${JSON.stringify(progressFn, null, 4)}`);
    }

    if (Array.isArray(rangesArr) && (Number.isInteger(rangesArr[0]) && rangesArr[0] >= 0 || /^\d*$/.test(rangesArr[0])) && (Number.isInteger(rangesArr[1]) && rangesArr[1] >= 0 || /^\d*$/.test(rangesArr[1]))) {
      rangesArr = [rangesArr];
    }

    const len = rangesArr.length;
    let counter = 0;
    rangesArr.forEach((el, i) => {
      if (progressFn) {
        percentageDone = Math.floor(counter / len * 10);

        if (percentageDone !== lastPercentageDone) {
          lastPercentageDone = percentageDone;
          progressFn(percentageDone);
        }
      }

      if (!Array.isArray(el)) {
        throw new TypeError(`ranges-apply: [THROW_ID_05] ranges array, second input arg., has ${i}th element not an array: ${JSON.stringify(el, null, 4)}, which is ${typeof el}`);
      }

      if (!Number.isInteger(el[0]) || el[0] < 0) {
        if (/^\d*$/.test(el[0])) {
          rangesArr[i][0] = Number.parseInt(rangesArr[i][0], 10);
        } else {
          throw new TypeError(`ranges-apply: [THROW_ID_06] ranges array, second input arg. has ${i}th element, array [${el[0]},${el[1]}]. That array has first element not an integer, but ${typeof el[0]}, equal to: ${JSON.stringify(el[0], null, 4)}. Computer doesn't like this.`);
        }
      }

      if (!Number.isInteger(el[1])) {
        if (/^\d*$/.test(el[1])) {
          rangesArr[i][1] = Number.parseInt(rangesArr[i][1], 10);
        } else {
          throw new TypeError(`ranges-apply: [THROW_ID_07] ranges array, second input arg. has ${i}th element, array [${el[0]},${el[1]}]. That array has second element not an integer, but ${typeof el[1]}, equal to: ${JSON.stringify(el[1], null, 4)}. Computer doesn't like this.`);
        }
      }

      counter++;
    });
    const workingRanges = mergeRanges(rangesArr, {
      progressFn: perc => {
        if (progressFn) {
          percentageDone = 10 + Math.floor(perc / 10);

          if (percentageDone !== lastPercentageDone) {
            lastPercentageDone = percentageDone;
            progressFn(percentageDone);
          }
        }
      }
    });
    const len2 = workingRanges.length;

    if (len2 > 0) {
      const tails = str.slice(workingRanges[len2 - 1][1]);
      str = workingRanges.reduce((acc, val, i, arr) => {
        if (progressFn) {
          percentageDone = 20 + Math.floor(i / len2 * 80);

          if (percentageDone !== lastPercentageDone) {
            lastPercentageDone = percentageDone;
            progressFn(percentageDone);
          }
        }

        const beginning = i === 0 ? 0 : arr[i - 1][1];
        const ending = arr[i][0];
        return acc + str.slice(beginning, ending) + (existy(arr[i][2]) ? arr[i][2] : "");
      }, "");
      str += tails;
    }

    return str;
  }

  /**
   * string-apostrophes
   * Comprehensive, HTML-entities-aware tool to typographically-correct the apostrophes and single/double quotes
   * Version: 1.2.14
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-apostrophes
   */

  function convertOne(str, {
    from,
    to,
    value,
    convertEntities = true,
    convertApostrophes = true,
    offsetBy
  }) {
    if (!Number.isInteger(to)) {
      if (Number.isInteger(from)) {
        to = from + 1;
      } else {
        throw new Error(`string-apostrophes: [THROW_ID_01] options objects keys' "to" and "from" values are not integers!`);
      }
    }

    const rangesArr = [];
    const leftSingleQuote = "\u2018";
    const rightSingleQuote = "\u2019";
    const leftDoubleQuote = "\u201C";
    const rightDoubleQuote = "\u201D";
    const singlePrime = "\u2032";
    const doublePrime = "\u2033";
    const punctuationChars = [".", ",", ";", "!", "?"];

    function isNumber(str) {
      return typeof str === "string" && str.charCodeAt(0) >= 48 && str.charCodeAt(0) <= 57;
    }

    function isLetter(str) {
      return typeof str === "string" && str.length === 1 && str.toUpperCase() !== str.toLowerCase();
    }

    if ([`'`, leftSingleQuote, rightSingleQuote, singlePrime].includes(value) || to === from + 1 && [`'`, leftSingleQuote, rightSingleQuote, singlePrime].includes(str[from])) {
      if (str[from - 1] && str[to] && isNumber(str[from - 1]) && !isLetter(str[to])) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&prime;" : singlePrime) && value !== (convertEntities ? "&prime;" : singlePrime)) {
          rangesArr.push([from, to, convertEntities ? "&prime;" : singlePrime]);
        } else if (!convertApostrophes && str.slice(from, to) !== `'` && value !== `'`) {
          rangesArr.push([from, to, `'`]);
        }
      } else if (str[to] && str[to + 1] && str[to] === "n" && str.slice(from, to) === str.slice(to + 1, to + 1 + (to - from))) {
        if (convertApostrophes && str.slice(from, to + 2) !== (convertEntities ? "&rsquo;n&rsquo;" : `${rightSingleQuote}n${rightSingleQuote}`) && value !== (convertEntities ? "&rsquo;n&rsquo;" : `${rightSingleQuote}n${rightSingleQuote}`)) {
          rangesArr.push([from, to + 2, convertEntities ? "&rsquo;n&rsquo;" : `${rightSingleQuote}n${rightSingleQuote}`]);

          if (typeof offsetBy === "function") {
            offsetBy(2);
          }
        } else if (!convertApostrophes && str.slice(from, to + 2) !== "'n'" && value !== "'n'") {
          rangesArr.push([from, to + 2, "'n'"]);

          if (typeof offsetBy === "function") {
            offsetBy(2);
          }
        }
      } else if (str[to] && str[to].toLowerCase() === "t" && (!str[to + 1] || str[to + 1].trim().length === 0 || str[to + 1].toLowerCase() === "i") || str[to] && str[to + 2] && str[to].toLowerCase() === "t" && str[to + 1].toLowerCase() === "w" && (str[to + 2].toLowerCase() === "a" || str[to + 2].toLowerCase() === "e" || str[to + 2].toLowerCase() === "i" || str[to + 2].toLowerCase() === "o") || str[to] && str[to + 1] && str[to].toLowerCase() === "e" && str[to + 1].toLowerCase() === "m" || str[to] && str[to + 4] && str[to].toLowerCase() === "c" && str[to + 1].toLowerCase() === "a" && str[to + 2].toLowerCase() === "u" && str[to + 3].toLowerCase() === "s" && str[to + 4].toLowerCase() === "e" || str[to] && isNumber(str[to])) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&rsquo;" : rightSingleQuote) && value !== (convertEntities ? "&rsquo;" : rightSingleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&rsquo;" : rightSingleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== "'" && value !== "'") {
          rangesArr.push([from, to, "'"]);
        }
      } else if (str[from - 1] && str[to] && punctuationChars.includes(str[from - 1])) {
        if (str[to].trim().length === 0) {
          if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&rsquo;" : rightSingleQuote) && value !== (convertEntities ? "&rsquo;" : rightSingleQuote)) {
            rangesArr.push([from, to, convertEntities ? "&rsquo;" : rightSingleQuote]);
          } else if (!convertApostrophes && str.slice(from, to) !== "'" && value !== "'") {
            rangesArr.push([from, to, "'"]);
          }
        } else if (str[to].charCodeAt(0) === 34 && str[to + 1] && str[to + 1].trim().length === 0) {
          if (convertApostrophes && str.slice(from, to + 1) !== (convertEntities ? "&rsquo;&rdquo;" : `${rightSingleQuote}${rightDoubleQuote}`) && value !== (convertEntities ? "&rsquo;&rdquo;" : `${rightSingleQuote}${rightDoubleQuote}`)) {
            rangesArr.push([from, to + 1, `${convertEntities ? "&rsquo;&rdquo;" : `${rightSingleQuote}${rightDoubleQuote}`}`]);

            if (typeof offsetBy === "function") {
              offsetBy(1);
            }
          } else if (!convertApostrophes && str.slice(from, to + 1) !== `'"` && value !== `'"`) {
            rangesArr.push([from, to + 1, `'"`]);

            if (typeof offsetBy === "function") {
              offsetBy(1);
            }
          }
        }
      } else if (from === 0 && str.slice(to).trim().length) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&lsquo;" : leftSingleQuote) && value !== (convertEntities ? "&lsquo;" : leftSingleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&lsquo;" : leftSingleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `'` && value !== `'`) {
          rangesArr.push([from, to, `'`]);
        }
      } else if (!str[to] && str.slice(0, from).trim().length) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&rsquo;" : rightSingleQuote) && value !== (convertEntities ? "&rsquo;" : rightSingleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&rsquo;" : rightSingleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `'` && value !== `'`) {
          rangesArr.push([from, to, `'`]);
        }
      } else if (str[from - 1] && str[to] && (isLetter(str[from - 1]) || isNumber(str[from - 1])) && (isLetter(str[to]) || isNumber(str[to]))) {
        if (convertApostrophes) {
          if ((str[to] && str[from - 5] && str[from - 5].toLowerCase() === "h" && str[from - 4].toLowerCase() === "a" && str[from - 3].toLowerCase() === "w" && str[from - 2].toLowerCase() === "a" && str[from - 1].toLowerCase() === "i" && str[to].toLowerCase() === "i" || str[from - 1] && str[from - 1].toLowerCase() === "o" && str[to + 2] && str[to].toLowerCase() === "a" && str[to + 1].toLowerCase() === "h" && str[to + 2].toLowerCase() === "u") && str.slice(from, to) !== (convertEntities ? "&lsquo;" : leftSingleQuote) && value !== (convertEntities ? "&lsquo;" : leftSingleQuote)) {
            rangesArr.push([from, to, convertEntities ? "&lsquo;" : leftSingleQuote]);
          } else if (str.slice(from, to) !== (convertEntities ? "&rsquo;" : rightSingleQuote) && value !== (convertEntities ? "&rsquo;" : rightSingleQuote)) {
            rangesArr.push([from, to, convertEntities ? "&rsquo;" : rightSingleQuote]);
          }
        } else if (str.slice(from, to) !== "'" && value !== "'") {
          rangesArr.push([from, to, `'`]);
        }
      } else if (str[to] && (isLetter(str[to]) || isNumber(str[to]))) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&lsquo;" : leftSingleQuote) && value !== (convertEntities ? "&lsquo;" : leftSingleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&lsquo;" : leftSingleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `'` && value !== `'`) {
          rangesArr.push([from, to, `'`]);
        }
      } else if (isLetter(str[from - 1]) || isNumber(str[from - 1])) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&rsquo;" : rightSingleQuote) && value !== (convertEntities ? "&rsquo;" : rightSingleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&rsquo;" : rightSingleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `'` && value !== `'`) {
          rangesArr.push([from, to, `'`]);
        }
      } else if (str[from - 1] && str[from - 1].trim().length === 0) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&lsquo;" : leftSingleQuote) && value !== (convertEntities ? "&lsquo;" : leftSingleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&lsquo;" : leftSingleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `'` && value !== `'`) {
          rangesArr.push([from, to, `'`]);
        }
      } else if (str[to] && str[to].trim().length === 0) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&rsquo;" : rightSingleQuote) && value !== (convertEntities ? "&rsquo;" : rightSingleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&rsquo;" : rightSingleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `'` && value !== `'`) {
          rangesArr.push([from, to, `'`]);
        }
      }
    } else if ([`"`, leftDoubleQuote, rightDoubleQuote, doublePrime].includes(value) || to === from + 1 && [`"`, leftDoubleQuote, rightDoubleQuote, doublePrime].includes(str[from])) {
      if (str[from - 1] && isNumber(str[from - 1]) && str[to] && str[to] !== "'" && str[to] !== '"' && str[to] !== rightSingleQuote && str[to] !== rightDoubleQuote && str[to] !== leftSingleQuote && str[to] !== leftDoubleQuote) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&Prime;" : doublePrime) && value !== (convertEntities ? "&Prime;" : doublePrime)) {
          rangesArr.push([from, to, convertEntities ? "&Prime;" : doublePrime]);
        } else if (!convertApostrophes && str.slice(from, to) !== `"` && value !== `"`) {
          rangesArr.push([from, to, `"`]);
        }
      } else if (str[from - 1] && str[to] && punctuationChars.includes(str[from - 1])) {
        if (str[to].trim().length === 0) {
          if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&rdquo;" : rightDoubleQuote) && value !== (convertEntities ? "&rdquo;" : rightDoubleQuote)) {
            rangesArr.push([from, to, convertEntities ? "&rdquo;" : rightDoubleQuote]);
          } else if (!convertApostrophes && str.slice(from, to) !== `"` && value !== `"`) {
            rangesArr.push([from, to, `"`]);
          }
        } else if (str[to].charCodeAt(0) === 39 && str[to + 1] && str[to + 1].trim().length === 0) {
          if (convertApostrophes && str.slice(from, to + 1) !== (convertEntities ? "&rdquo;&rsquo;" : `${rightDoubleQuote}${rightSingleQuote}`) && value !== (convertEntities ? "&rdquo;&rsquo;" : `${rightDoubleQuote}${rightSingleQuote}`)) {
            rangesArr.push([from, to + 1, convertEntities ? "&rdquo;&rsquo;" : `${rightDoubleQuote}${rightSingleQuote}`]);

            if (typeof offsetBy === "function") {
              offsetBy(1);
            }
          } else if (!convertApostrophes && str.slice(from, to + 1) !== `"'` && value !== `"'`) {
            rangesArr.push([from, to + 1, `"'`]);

            if (typeof offsetBy === "function") {
              offsetBy(1);
            }
          }
        }
      } else if (from === 0 && str[to] && str.slice(to).trim().length) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&ldquo;" : leftDoubleQuote) && value !== (convertEntities ? "&ldquo;" : leftDoubleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&ldquo;" : leftDoubleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `"` && value !== `"`) {
          rangesArr.push([from, to, `"`]);
        }
      } else if (!str[to] && str.slice(0, from).trim().length) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&rdquo;" : rightDoubleQuote) && value !== (convertEntities ? "&rdquo;" : rightDoubleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&rdquo;" : rightDoubleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `"` && value !== `"`) {
          rangesArr.push([from, to, `"`]);
        }
      } else if (str[to] && (isLetter(str[to]) || isNumber(str[to]))) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&ldquo;" : leftDoubleQuote) && value !== (convertEntities ? "&ldquo;" : leftDoubleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&ldquo;" : leftDoubleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `"` && value !== `"`) {
          rangesArr.push([from, to, `"`]);
        }
      } else if (str[from - 1] && (isLetter(str[from - 1]) || isNumber(str[from - 1]))) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&rdquo;" : rightDoubleQuote) && value !== (convertEntities ? "&rdquo;" : rightDoubleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&rdquo;" : rightDoubleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `"` && value !== `"`) {
          rangesArr.push([from, to, `"`]);
        }
      } else if (str[from - 1] && str[from - 1].trim().length === 0) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&ldquo;" : leftDoubleQuote) && value !== (convertEntities ? "&ldquo;" : leftDoubleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&ldquo;" : leftDoubleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `"` && value !== `"`) {
          rangesArr.push([from, to, `"`]);
        }
      } else if (str[to] && str[to].trim().length === 0) {
        if (convertApostrophes && str.slice(from, to) !== (convertEntities ? "&rdquo;" : rightDoubleQuote) && value !== (convertEntities ? "&rdquo;" : rightDoubleQuote)) {
          rangesArr.push([from, to, convertEntities ? "&rdquo;" : rightDoubleQuote]);
        } else if (!convertApostrophes && str.slice(from, to) !== `"` && value !== `"`) {
          rangesArr.push([from, to, `"`]);
        }
      }
    }

    return rangesArr;
  }

  var he = createCommonjsModule(function (module, exports) {

    (function (root) {
      // Detect free variables `exports`.
      var freeExports =  exports; // Detect free variable `module`.

      var freeModule =  module && module.exports == freeExports && module; // Detect free variable `global`, from Node.js or Browserified code,
      // and use it as `root`.

      var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;

      if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
        root = freeGlobal;
      }
      /*--------------------------------------------------------------------------*/
      // All astral symbols.


      var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; // All ASCII symbols (not just printable ASCII) except those listed in the
      // first column of the overrides table.
      // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides

      var regexAsciiWhitelist = /[\x01-\x7F]/g; // All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
      // code points listed in the first column of the overrides table on
      // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.

      var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
      var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
      var encodeMap = {
        '\xAD': 'shy',
        '\u200C': 'zwnj',
        '\u200D': 'zwj',
        '\u200E': 'lrm',
        '\u2063': 'ic',
        '\u2062': 'it',
        '\u2061': 'af',
        '\u200F': 'rlm',
        '\u200B': 'ZeroWidthSpace',
        '\u2060': 'NoBreak',
        '\u0311': 'DownBreve',
        '\u20DB': 'tdot',
        '\u20DC': 'DotDot',
        '\t': 'Tab',
        '\n': 'NewLine',
        '\u2008': 'puncsp',
        '\u205F': 'MediumSpace',
        '\u2009': 'thinsp',
        '\u200A': 'hairsp',
        '\u2004': 'emsp13',
        '\u2002': 'ensp',
        '\u2005': 'emsp14',
        '\u2003': 'emsp',
        '\u2007': 'numsp',
        '\xA0': 'nbsp',
        '\u205F\u200A': 'ThickSpace',
        '\u203E': 'oline',
        '_': 'lowbar',
        '\u2010': 'dash',
        '\u2013': 'ndash',
        '\u2014': 'mdash',
        '\u2015': 'horbar',
        ',': 'comma',
        ';': 'semi',
        '\u204F': 'bsemi',
        ':': 'colon',
        '\u2A74': 'Colone',
        '!': 'excl',
        '\xA1': 'iexcl',
        '?': 'quest',
        '\xBF': 'iquest',
        '.': 'period',
        '\u2025': 'nldr',
        '\u2026': 'mldr',
        '\xB7': 'middot',
        '\'': 'apos',
        '\u2018': 'lsquo',
        '\u2019': 'rsquo',
        '\u201A': 'sbquo',
        '\u2039': 'lsaquo',
        '\u203A': 'rsaquo',
        '"': 'quot',
        '\u201C': 'ldquo',
        '\u201D': 'rdquo',
        '\u201E': 'bdquo',
        '\xAB': 'laquo',
        '\xBB': 'raquo',
        '(': 'lpar',
        ')': 'rpar',
        '[': 'lsqb',
        ']': 'rsqb',
        '{': 'lcub',
        '}': 'rcub',
        '\u2308': 'lceil',
        '\u2309': 'rceil',
        '\u230A': 'lfloor',
        '\u230B': 'rfloor',
        '\u2985': 'lopar',
        '\u2986': 'ropar',
        '\u298B': 'lbrke',
        '\u298C': 'rbrke',
        '\u298D': 'lbrkslu',
        '\u298E': 'rbrksld',
        '\u298F': 'lbrksld',
        '\u2990': 'rbrkslu',
        '\u2991': 'langd',
        '\u2992': 'rangd',
        '\u2993': 'lparlt',
        '\u2994': 'rpargt',
        '\u2995': 'gtlPar',
        '\u2996': 'ltrPar',
        '\u27E6': 'lobrk',
        '\u27E7': 'robrk',
        '\u27E8': 'lang',
        '\u27E9': 'rang',
        '\u27EA': 'Lang',
        '\u27EB': 'Rang',
        '\u27EC': 'loang',
        '\u27ED': 'roang',
        '\u2772': 'lbbrk',
        '\u2773': 'rbbrk',
        '\u2016': 'Vert',
        '\xA7': 'sect',
        '\xB6': 'para',
        '@': 'commat',
        '*': 'ast',
        '/': 'sol',
        'undefined': null,
        '&': 'amp',
        '#': 'num',
        '%': 'percnt',
        '\u2030': 'permil',
        '\u2031': 'pertenk',
        '\u2020': 'dagger',
        '\u2021': 'Dagger',
        '\u2022': 'bull',
        '\u2043': 'hybull',
        '\u2032': 'prime',
        '\u2033': 'Prime',
        '\u2034': 'tprime',
        '\u2057': 'qprime',
        '\u2035': 'bprime',
        '\u2041': 'caret',
        '`': 'grave',
        '\xB4': 'acute',
        '\u02DC': 'tilde',
        '^': 'Hat',
        '\xAF': 'macr',
        '\u02D8': 'breve',
        '\u02D9': 'dot',
        '\xA8': 'die',
        '\u02DA': 'ring',
        '\u02DD': 'dblac',
        '\xB8': 'cedil',
        '\u02DB': 'ogon',
        '\u02C6': 'circ',
        '\u02C7': 'caron',
        '\xB0': 'deg',
        '\xA9': 'copy',
        '\xAE': 'reg',
        '\u2117': 'copysr',
        '\u2118': 'wp',
        '\u211E': 'rx',
        '\u2127': 'mho',
        '\u2129': 'iiota',
        '\u2190': 'larr',
        '\u219A': 'nlarr',
        '\u2192': 'rarr',
        '\u219B': 'nrarr',
        '\u2191': 'uarr',
        '\u2193': 'darr',
        '\u2194': 'harr',
        '\u21AE': 'nharr',
        '\u2195': 'varr',
        '\u2196': 'nwarr',
        '\u2197': 'nearr',
        '\u2198': 'searr',
        '\u2199': 'swarr',
        '\u219D': 'rarrw',
        '\u219D\u0338': 'nrarrw',
        '\u219E': 'Larr',
        '\u219F': 'Uarr',
        '\u21A0': 'Rarr',
        '\u21A1': 'Darr',
        '\u21A2': 'larrtl',
        '\u21A3': 'rarrtl',
        '\u21A4': 'mapstoleft',
        '\u21A5': 'mapstoup',
        '\u21A6': 'map',
        '\u21A7': 'mapstodown',
        '\u21A9': 'larrhk',
        '\u21AA': 'rarrhk',
        '\u21AB': 'larrlp',
        '\u21AC': 'rarrlp',
        '\u21AD': 'harrw',
        '\u21B0': 'lsh',
        '\u21B1': 'rsh',
        '\u21B2': 'ldsh',
        '\u21B3': 'rdsh',
        '\u21B5': 'crarr',
        '\u21B6': 'cularr',
        '\u21B7': 'curarr',
        '\u21BA': 'olarr',
        '\u21BB': 'orarr',
        '\u21BC': 'lharu',
        '\u21BD': 'lhard',
        '\u21BE': 'uharr',
        '\u21BF': 'uharl',
        '\u21C0': 'rharu',
        '\u21C1': 'rhard',
        '\u21C2': 'dharr',
        '\u21C3': 'dharl',
        '\u21C4': 'rlarr',
        '\u21C5': 'udarr',
        '\u21C6': 'lrarr',
        '\u21C7': 'llarr',
        '\u21C8': 'uuarr',
        '\u21C9': 'rrarr',
        '\u21CA': 'ddarr',
        '\u21CB': 'lrhar',
        '\u21CC': 'rlhar',
        '\u21D0': 'lArr',
        '\u21CD': 'nlArr',
        '\u21D1': 'uArr',
        '\u21D2': 'rArr',
        '\u21CF': 'nrArr',
        '\u21D3': 'dArr',
        '\u21D4': 'iff',
        '\u21CE': 'nhArr',
        '\u21D5': 'vArr',
        '\u21D6': 'nwArr',
        '\u21D7': 'neArr',
        '\u21D8': 'seArr',
        '\u21D9': 'swArr',
        '\u21DA': 'lAarr',
        '\u21DB': 'rAarr',
        '\u21DD': 'zigrarr',
        '\u21E4': 'larrb',
        '\u21E5': 'rarrb',
        '\u21F5': 'duarr',
        '\u21FD': 'loarr',
        '\u21FE': 'roarr',
        '\u21FF': 'hoarr',
        '\u2200': 'forall',
        '\u2201': 'comp',
        '\u2202': 'part',
        '\u2202\u0338': 'npart',
        '\u2203': 'exist',
        '\u2204': 'nexist',
        '\u2205': 'empty',
        '\u2207': 'Del',
        '\u2208': 'in',
        '\u2209': 'notin',
        '\u220B': 'ni',
        '\u220C': 'notni',
        '\u03F6': 'bepsi',
        '\u220F': 'prod',
        '\u2210': 'coprod',
        '\u2211': 'sum',
        '+': 'plus',
        '\xB1': 'pm',
        '\xF7': 'div',
        '\xD7': 'times',
        '<': 'lt',
        '\u226E': 'nlt',
        '<\u20D2': 'nvlt',
        '=': 'equals',
        '\u2260': 'ne',
        '=\u20E5': 'bne',
        '\u2A75': 'Equal',
        '>': 'gt',
        '\u226F': 'ngt',
        '>\u20D2': 'nvgt',
        '\xAC': 'not',
        '|': 'vert',
        '\xA6': 'brvbar',
        '\u2212': 'minus',
        '\u2213': 'mp',
        '\u2214': 'plusdo',
        '\u2044': 'frasl',
        '\u2216': 'setmn',
        '\u2217': 'lowast',
        '\u2218': 'compfn',
        '\u221A': 'Sqrt',
        '\u221D': 'prop',
        '\u221E': 'infin',
        '\u221F': 'angrt',
        '\u2220': 'ang',
        '\u2220\u20D2': 'nang',
        '\u2221': 'angmsd',
        '\u2222': 'angsph',
        '\u2223': 'mid',
        '\u2224': 'nmid',
        '\u2225': 'par',
        '\u2226': 'npar',
        '\u2227': 'and',
        '\u2228': 'or',
        '\u2229': 'cap',
        '\u2229\uFE00': 'caps',
        '\u222A': 'cup',
        '\u222A\uFE00': 'cups',
        '\u222B': 'int',
        '\u222C': 'Int',
        '\u222D': 'tint',
        '\u2A0C': 'qint',
        '\u222E': 'oint',
        '\u222F': 'Conint',
        '\u2230': 'Cconint',
        '\u2231': 'cwint',
        '\u2232': 'cwconint',
        '\u2233': 'awconint',
        '\u2234': 'there4',
        '\u2235': 'becaus',
        '\u2236': 'ratio',
        '\u2237': 'Colon',
        '\u2238': 'minusd',
        '\u223A': 'mDDot',
        '\u223B': 'homtht',
        '\u223C': 'sim',
        '\u2241': 'nsim',
        '\u223C\u20D2': 'nvsim',
        '\u223D': 'bsim',
        '\u223D\u0331': 'race',
        '\u223E': 'ac',
        '\u223E\u0333': 'acE',
        '\u223F': 'acd',
        '\u2240': 'wr',
        '\u2242': 'esim',
        '\u2242\u0338': 'nesim',
        '\u2243': 'sime',
        '\u2244': 'nsime',
        '\u2245': 'cong',
        '\u2247': 'ncong',
        '\u2246': 'simne',
        '\u2248': 'ap',
        '\u2249': 'nap',
        '\u224A': 'ape',
        '\u224B': 'apid',
        '\u224B\u0338': 'napid',
        '\u224C': 'bcong',
        '\u224D': 'CupCap',
        '\u226D': 'NotCupCap',
        '\u224D\u20D2': 'nvap',
        '\u224E': 'bump',
        '\u224E\u0338': 'nbump',
        '\u224F': 'bumpe',
        '\u224F\u0338': 'nbumpe',
        '\u2250': 'doteq',
        '\u2250\u0338': 'nedot',
        '\u2251': 'eDot',
        '\u2252': 'efDot',
        '\u2253': 'erDot',
        '\u2254': 'colone',
        '\u2255': 'ecolon',
        '\u2256': 'ecir',
        '\u2257': 'cire',
        '\u2259': 'wedgeq',
        '\u225A': 'veeeq',
        '\u225C': 'trie',
        '\u225F': 'equest',
        '\u2261': 'equiv',
        '\u2262': 'nequiv',
        '\u2261\u20E5': 'bnequiv',
        '\u2264': 'le',
        '\u2270': 'nle',
        '\u2264\u20D2': 'nvle',
        '\u2265': 'ge',
        '\u2271': 'nge',
        '\u2265\u20D2': 'nvge',
        '\u2266': 'lE',
        '\u2266\u0338': 'nlE',
        '\u2267': 'gE',
        '\u2267\u0338': 'ngE',
        '\u2268\uFE00': 'lvnE',
        '\u2268': 'lnE',
        '\u2269': 'gnE',
        '\u2269\uFE00': 'gvnE',
        '\u226A': 'll',
        '\u226A\u0338': 'nLtv',
        '\u226A\u20D2': 'nLt',
        '\u226B': 'gg',
        '\u226B\u0338': 'nGtv',
        '\u226B\u20D2': 'nGt',
        '\u226C': 'twixt',
        '\u2272': 'lsim',
        '\u2274': 'nlsim',
        '\u2273': 'gsim',
        '\u2275': 'ngsim',
        '\u2276': 'lg',
        '\u2278': 'ntlg',
        '\u2277': 'gl',
        '\u2279': 'ntgl',
        '\u227A': 'pr',
        '\u2280': 'npr',
        '\u227B': 'sc',
        '\u2281': 'nsc',
        '\u227C': 'prcue',
        '\u22E0': 'nprcue',
        '\u227D': 'sccue',
        '\u22E1': 'nsccue',
        '\u227E': 'prsim',
        '\u227F': 'scsim',
        '\u227F\u0338': 'NotSucceedsTilde',
        '\u2282': 'sub',
        '\u2284': 'nsub',
        '\u2282\u20D2': 'vnsub',
        '\u2283': 'sup',
        '\u2285': 'nsup',
        '\u2283\u20D2': 'vnsup',
        '\u2286': 'sube',
        '\u2288': 'nsube',
        '\u2287': 'supe',
        '\u2289': 'nsupe',
        '\u228A\uFE00': 'vsubne',
        '\u228A': 'subne',
        '\u228B\uFE00': 'vsupne',
        '\u228B': 'supne',
        '\u228D': 'cupdot',
        '\u228E': 'uplus',
        '\u228F': 'sqsub',
        '\u228F\u0338': 'NotSquareSubset',
        '\u2290': 'sqsup',
        '\u2290\u0338': 'NotSquareSuperset',
        '\u2291': 'sqsube',
        '\u22E2': 'nsqsube',
        '\u2292': 'sqsupe',
        '\u22E3': 'nsqsupe',
        '\u2293': 'sqcap',
        '\u2293\uFE00': 'sqcaps',
        '\u2294': 'sqcup',
        '\u2294\uFE00': 'sqcups',
        '\u2295': 'oplus',
        '\u2296': 'ominus',
        '\u2297': 'otimes',
        '\u2298': 'osol',
        '\u2299': 'odot',
        '\u229A': 'ocir',
        '\u229B': 'oast',
        '\u229D': 'odash',
        '\u229E': 'plusb',
        '\u229F': 'minusb',
        '\u22A0': 'timesb',
        '\u22A1': 'sdotb',
        '\u22A2': 'vdash',
        '\u22AC': 'nvdash',
        '\u22A3': 'dashv',
        '\u22A4': 'top',
        '\u22A5': 'bot',
        '\u22A7': 'models',
        '\u22A8': 'vDash',
        '\u22AD': 'nvDash',
        '\u22A9': 'Vdash',
        '\u22AE': 'nVdash',
        '\u22AA': 'Vvdash',
        '\u22AB': 'VDash',
        '\u22AF': 'nVDash',
        '\u22B0': 'prurel',
        '\u22B2': 'vltri',
        '\u22EA': 'nltri',
        '\u22B3': 'vrtri',
        '\u22EB': 'nrtri',
        '\u22B4': 'ltrie',
        '\u22EC': 'nltrie',
        '\u22B4\u20D2': 'nvltrie',
        '\u22B5': 'rtrie',
        '\u22ED': 'nrtrie',
        '\u22B5\u20D2': 'nvrtrie',
        '\u22B6': 'origof',
        '\u22B7': 'imof',
        '\u22B8': 'mumap',
        '\u22B9': 'hercon',
        '\u22BA': 'intcal',
        '\u22BB': 'veebar',
        '\u22BD': 'barvee',
        '\u22BE': 'angrtvb',
        '\u22BF': 'lrtri',
        '\u22C0': 'Wedge',
        '\u22C1': 'Vee',
        '\u22C2': 'xcap',
        '\u22C3': 'xcup',
        '\u22C4': 'diam',
        '\u22C5': 'sdot',
        '\u22C6': 'Star',
        '\u22C7': 'divonx',
        '\u22C8': 'bowtie',
        '\u22C9': 'ltimes',
        '\u22CA': 'rtimes',
        '\u22CB': 'lthree',
        '\u22CC': 'rthree',
        '\u22CD': 'bsime',
        '\u22CE': 'cuvee',
        '\u22CF': 'cuwed',
        '\u22D0': 'Sub',
        '\u22D1': 'Sup',
        '\u22D2': 'Cap',
        '\u22D3': 'Cup',
        '\u22D4': 'fork',
        '\u22D5': 'epar',
        '\u22D6': 'ltdot',
        '\u22D7': 'gtdot',
        '\u22D8': 'Ll',
        '\u22D8\u0338': 'nLl',
        '\u22D9': 'Gg',
        '\u22D9\u0338': 'nGg',
        '\u22DA\uFE00': 'lesg',
        '\u22DA': 'leg',
        '\u22DB': 'gel',
        '\u22DB\uFE00': 'gesl',
        '\u22DE': 'cuepr',
        '\u22DF': 'cuesc',
        '\u22E6': 'lnsim',
        '\u22E7': 'gnsim',
        '\u22E8': 'prnsim',
        '\u22E9': 'scnsim',
        '\u22EE': 'vellip',
        '\u22EF': 'ctdot',
        '\u22F0': 'utdot',
        '\u22F1': 'dtdot',
        '\u22F2': 'disin',
        '\u22F3': 'isinsv',
        '\u22F4': 'isins',
        '\u22F5': 'isindot',
        '\u22F5\u0338': 'notindot',
        '\u22F6': 'notinvc',
        '\u22F7': 'notinvb',
        '\u22F9': 'isinE',
        '\u22F9\u0338': 'notinE',
        '\u22FA': 'nisd',
        '\u22FB': 'xnis',
        '\u22FC': 'nis',
        '\u22FD': 'notnivc',
        '\u22FE': 'notnivb',
        '\u2305': 'barwed',
        '\u2306': 'Barwed',
        '\u230C': 'drcrop',
        '\u230D': 'dlcrop',
        '\u230E': 'urcrop',
        '\u230F': 'ulcrop',
        '\u2310': 'bnot',
        '\u2312': 'profline',
        '\u2313': 'profsurf',
        '\u2315': 'telrec',
        '\u2316': 'target',
        '\u231C': 'ulcorn',
        '\u231D': 'urcorn',
        '\u231E': 'dlcorn',
        '\u231F': 'drcorn',
        '\u2322': 'frown',
        '\u2323': 'smile',
        '\u232D': 'cylcty',
        '\u232E': 'profalar',
        '\u2336': 'topbot',
        '\u233D': 'ovbar',
        '\u233F': 'solbar',
        '\u237C': 'angzarr',
        '\u23B0': 'lmoust',
        '\u23B1': 'rmoust',
        '\u23B4': 'tbrk',
        '\u23B5': 'bbrk',
        '\u23B6': 'bbrktbrk',
        '\u23DC': 'OverParenthesis',
        '\u23DD': 'UnderParenthesis',
        '\u23DE': 'OverBrace',
        '\u23DF': 'UnderBrace',
        '\u23E2': 'trpezium',
        '\u23E7': 'elinters',
        '\u2423': 'blank',
        '\u2500': 'boxh',
        '\u2502': 'boxv',
        '\u250C': 'boxdr',
        '\u2510': 'boxdl',
        '\u2514': 'boxur',
        '\u2518': 'boxul',
        '\u251C': 'boxvr',
        '\u2524': 'boxvl',
        '\u252C': 'boxhd',
        '\u2534': 'boxhu',
        '\u253C': 'boxvh',
        '\u2550': 'boxH',
        '\u2551': 'boxV',
        '\u2552': 'boxdR',
        '\u2553': 'boxDr',
        '\u2554': 'boxDR',
        '\u2555': 'boxdL',
        '\u2556': 'boxDl',
        '\u2557': 'boxDL',
        '\u2558': 'boxuR',
        '\u2559': 'boxUr',
        '\u255A': 'boxUR',
        '\u255B': 'boxuL',
        '\u255C': 'boxUl',
        '\u255D': 'boxUL',
        '\u255E': 'boxvR',
        '\u255F': 'boxVr',
        '\u2560': 'boxVR',
        '\u2561': 'boxvL',
        '\u2562': 'boxVl',
        '\u2563': 'boxVL',
        '\u2564': 'boxHd',
        '\u2565': 'boxhD',
        '\u2566': 'boxHD',
        '\u2567': 'boxHu',
        '\u2568': 'boxhU',
        '\u2569': 'boxHU',
        '\u256A': 'boxvH',
        '\u256B': 'boxVh',
        '\u256C': 'boxVH',
        '\u2580': 'uhblk',
        '\u2584': 'lhblk',
        '\u2588': 'block',
        '\u2591': 'blk14',
        '\u2592': 'blk12',
        '\u2593': 'blk34',
        '\u25A1': 'squ',
        '\u25AA': 'squf',
        '\u25AB': 'EmptyVerySmallSquare',
        '\u25AD': 'rect',
        '\u25AE': 'marker',
        '\u25B1': 'fltns',
        '\u25B3': 'xutri',
        '\u25B4': 'utrif',
        '\u25B5': 'utri',
        '\u25B8': 'rtrif',
        '\u25B9': 'rtri',
        '\u25BD': 'xdtri',
        '\u25BE': 'dtrif',
        '\u25BF': 'dtri',
        '\u25C2': 'ltrif',
        '\u25C3': 'ltri',
        '\u25CA': 'loz',
        '\u25CB': 'cir',
        '\u25EC': 'tridot',
        '\u25EF': 'xcirc',
        '\u25F8': 'ultri',
        '\u25F9': 'urtri',
        '\u25FA': 'lltri',
        '\u25FB': 'EmptySmallSquare',
        '\u25FC': 'FilledSmallSquare',
        '\u2605': 'starf',
        '\u2606': 'star',
        '\u260E': 'phone',
        '\u2640': 'female',
        '\u2642': 'male',
        '\u2660': 'spades',
        '\u2663': 'clubs',
        '\u2665': 'hearts',
        '\u2666': 'diams',
        '\u266A': 'sung',
        '\u2713': 'check',
        '\u2717': 'cross',
        '\u2720': 'malt',
        '\u2736': 'sext',
        '\u2758': 'VerticalSeparator',
        '\u27C8': 'bsolhsub',
        '\u27C9': 'suphsol',
        '\u27F5': 'xlarr',
        '\u27F6': 'xrarr',
        '\u27F7': 'xharr',
        '\u27F8': 'xlArr',
        '\u27F9': 'xrArr',
        '\u27FA': 'xhArr',
        '\u27FC': 'xmap',
        '\u27FF': 'dzigrarr',
        '\u2902': 'nvlArr',
        '\u2903': 'nvrArr',
        '\u2904': 'nvHarr',
        '\u2905': 'Map',
        '\u290C': 'lbarr',
        '\u290D': 'rbarr',
        '\u290E': 'lBarr',
        '\u290F': 'rBarr',
        '\u2910': 'RBarr',
        '\u2911': 'DDotrahd',
        '\u2912': 'UpArrowBar',
        '\u2913': 'DownArrowBar',
        '\u2916': 'Rarrtl',
        '\u2919': 'latail',
        '\u291A': 'ratail',
        '\u291B': 'lAtail',
        '\u291C': 'rAtail',
        '\u291D': 'larrfs',
        '\u291E': 'rarrfs',
        '\u291F': 'larrbfs',
        '\u2920': 'rarrbfs',
        '\u2923': 'nwarhk',
        '\u2924': 'nearhk',
        '\u2925': 'searhk',
        '\u2926': 'swarhk',
        '\u2927': 'nwnear',
        '\u2928': 'toea',
        '\u2929': 'tosa',
        '\u292A': 'swnwar',
        '\u2933': 'rarrc',
        '\u2933\u0338': 'nrarrc',
        '\u2935': 'cudarrr',
        '\u2936': 'ldca',
        '\u2937': 'rdca',
        '\u2938': 'cudarrl',
        '\u2939': 'larrpl',
        '\u293C': 'curarrm',
        '\u293D': 'cularrp',
        '\u2945': 'rarrpl',
        '\u2948': 'harrcir',
        '\u2949': 'Uarrocir',
        '\u294A': 'lurdshar',
        '\u294B': 'ldrushar',
        '\u294E': 'LeftRightVector',
        '\u294F': 'RightUpDownVector',
        '\u2950': 'DownLeftRightVector',
        '\u2951': 'LeftUpDownVector',
        '\u2952': 'LeftVectorBar',
        '\u2953': 'RightVectorBar',
        '\u2954': 'RightUpVectorBar',
        '\u2955': 'RightDownVectorBar',
        '\u2956': 'DownLeftVectorBar',
        '\u2957': 'DownRightVectorBar',
        '\u2958': 'LeftUpVectorBar',
        '\u2959': 'LeftDownVectorBar',
        '\u295A': 'LeftTeeVector',
        '\u295B': 'RightTeeVector',
        '\u295C': 'RightUpTeeVector',
        '\u295D': 'RightDownTeeVector',
        '\u295E': 'DownLeftTeeVector',
        '\u295F': 'DownRightTeeVector',
        '\u2960': 'LeftUpTeeVector',
        '\u2961': 'LeftDownTeeVector',
        '\u2962': 'lHar',
        '\u2963': 'uHar',
        '\u2964': 'rHar',
        '\u2965': 'dHar',
        '\u2966': 'luruhar',
        '\u2967': 'ldrdhar',
        '\u2968': 'ruluhar',
        '\u2969': 'rdldhar',
        '\u296A': 'lharul',
        '\u296B': 'llhard',
        '\u296C': 'rharul',
        '\u296D': 'lrhard',
        '\u296E': 'udhar',
        '\u296F': 'duhar',
        '\u2970': 'RoundImplies',
        '\u2971': 'erarr',
        '\u2972': 'simrarr',
        '\u2973': 'larrsim',
        '\u2974': 'rarrsim',
        '\u2975': 'rarrap',
        '\u2976': 'ltlarr',
        '\u2978': 'gtrarr',
        '\u2979': 'subrarr',
        '\u297B': 'suplarr',
        '\u297C': 'lfisht',
        '\u297D': 'rfisht',
        '\u297E': 'ufisht',
        '\u297F': 'dfisht',
        '\u299A': 'vzigzag',
        '\u299C': 'vangrt',
        '\u299D': 'angrtvbd',
        '\u29A4': 'ange',
        '\u29A5': 'range',
        '\u29A6': 'dwangle',
        '\u29A7': 'uwangle',
        '\u29A8': 'angmsdaa',
        '\u29A9': 'angmsdab',
        '\u29AA': 'angmsdac',
        '\u29AB': 'angmsdad',
        '\u29AC': 'angmsdae',
        '\u29AD': 'angmsdaf',
        '\u29AE': 'angmsdag',
        '\u29AF': 'angmsdah',
        '\u29B0': 'bemptyv',
        '\u29B1': 'demptyv',
        '\u29B2': 'cemptyv',
        '\u29B3': 'raemptyv',
        '\u29B4': 'laemptyv',
        '\u29B5': 'ohbar',
        '\u29B6': 'omid',
        '\u29B7': 'opar',
        '\u29B9': 'operp',
        '\u29BB': 'olcross',
        '\u29BC': 'odsold',
        '\u29BE': 'olcir',
        '\u29BF': 'ofcir',
        '\u29C0': 'olt',
        '\u29C1': 'ogt',
        '\u29C2': 'cirscir',
        '\u29C3': 'cirE',
        '\u29C4': 'solb',
        '\u29C5': 'bsolb',
        '\u29C9': 'boxbox',
        '\u29CD': 'trisb',
        '\u29CE': 'rtriltri',
        '\u29CF': 'LeftTriangleBar',
        '\u29CF\u0338': 'NotLeftTriangleBar',
        '\u29D0': 'RightTriangleBar',
        '\u29D0\u0338': 'NotRightTriangleBar',
        '\u29DC': 'iinfin',
        '\u29DD': 'infintie',
        '\u29DE': 'nvinfin',
        '\u29E3': 'eparsl',
        '\u29E4': 'smeparsl',
        '\u29E5': 'eqvparsl',
        '\u29EB': 'lozf',
        '\u29F4': 'RuleDelayed',
        '\u29F6': 'dsol',
        '\u2A00': 'xodot',
        '\u2A01': 'xoplus',
        '\u2A02': 'xotime',
        '\u2A04': 'xuplus',
        '\u2A06': 'xsqcup',
        '\u2A0D': 'fpartint',
        '\u2A10': 'cirfnint',
        '\u2A11': 'awint',
        '\u2A12': 'rppolint',
        '\u2A13': 'scpolint',
        '\u2A14': 'npolint',
        '\u2A15': 'pointint',
        '\u2A16': 'quatint',
        '\u2A17': 'intlarhk',
        '\u2A22': 'pluscir',
        '\u2A23': 'plusacir',
        '\u2A24': 'simplus',
        '\u2A25': 'plusdu',
        '\u2A26': 'plussim',
        '\u2A27': 'plustwo',
        '\u2A29': 'mcomma',
        '\u2A2A': 'minusdu',
        '\u2A2D': 'loplus',
        '\u2A2E': 'roplus',
        '\u2A2F': 'Cross',
        '\u2A30': 'timesd',
        '\u2A31': 'timesbar',
        '\u2A33': 'smashp',
        '\u2A34': 'lotimes',
        '\u2A35': 'rotimes',
        '\u2A36': 'otimesas',
        '\u2A37': 'Otimes',
        '\u2A38': 'odiv',
        '\u2A39': 'triplus',
        '\u2A3A': 'triminus',
        '\u2A3B': 'tritime',
        '\u2A3C': 'iprod',
        '\u2A3F': 'amalg',
        '\u2A40': 'capdot',
        '\u2A42': 'ncup',
        '\u2A43': 'ncap',
        '\u2A44': 'capand',
        '\u2A45': 'cupor',
        '\u2A46': 'cupcap',
        '\u2A47': 'capcup',
        '\u2A48': 'cupbrcap',
        '\u2A49': 'capbrcup',
        '\u2A4A': 'cupcup',
        '\u2A4B': 'capcap',
        '\u2A4C': 'ccups',
        '\u2A4D': 'ccaps',
        '\u2A50': 'ccupssm',
        '\u2A53': 'And',
        '\u2A54': 'Or',
        '\u2A55': 'andand',
        '\u2A56': 'oror',
        '\u2A57': 'orslope',
        '\u2A58': 'andslope',
        '\u2A5A': 'andv',
        '\u2A5B': 'orv',
        '\u2A5C': 'andd',
        '\u2A5D': 'ord',
        '\u2A5F': 'wedbar',
        '\u2A66': 'sdote',
        '\u2A6A': 'simdot',
        '\u2A6D': 'congdot',
        '\u2A6D\u0338': 'ncongdot',
        '\u2A6E': 'easter',
        '\u2A6F': 'apacir',
        '\u2A70': 'apE',
        '\u2A70\u0338': 'napE',
        '\u2A71': 'eplus',
        '\u2A72': 'pluse',
        '\u2A73': 'Esim',
        '\u2A77': 'eDDot',
        '\u2A78': 'equivDD',
        '\u2A79': 'ltcir',
        '\u2A7A': 'gtcir',
        '\u2A7B': 'ltquest',
        '\u2A7C': 'gtquest',
        '\u2A7D': 'les',
        '\u2A7D\u0338': 'nles',
        '\u2A7E': 'ges',
        '\u2A7E\u0338': 'nges',
        '\u2A7F': 'lesdot',
        '\u2A80': 'gesdot',
        '\u2A81': 'lesdoto',
        '\u2A82': 'gesdoto',
        '\u2A83': 'lesdotor',
        '\u2A84': 'gesdotol',
        '\u2A85': 'lap',
        '\u2A86': 'gap',
        '\u2A87': 'lne',
        '\u2A88': 'gne',
        '\u2A89': 'lnap',
        '\u2A8A': 'gnap',
        '\u2A8B': 'lEg',
        '\u2A8C': 'gEl',
        '\u2A8D': 'lsime',
        '\u2A8E': 'gsime',
        '\u2A8F': 'lsimg',
        '\u2A90': 'gsiml',
        '\u2A91': 'lgE',
        '\u2A92': 'glE',
        '\u2A93': 'lesges',
        '\u2A94': 'gesles',
        '\u2A95': 'els',
        '\u2A96': 'egs',
        '\u2A97': 'elsdot',
        '\u2A98': 'egsdot',
        '\u2A99': 'el',
        '\u2A9A': 'eg',
        '\u2A9D': 'siml',
        '\u2A9E': 'simg',
        '\u2A9F': 'simlE',
        '\u2AA0': 'simgE',
        '\u2AA1': 'LessLess',
        '\u2AA1\u0338': 'NotNestedLessLess',
        '\u2AA2': 'GreaterGreater',
        '\u2AA2\u0338': 'NotNestedGreaterGreater',
        '\u2AA4': 'glj',
        '\u2AA5': 'gla',
        '\u2AA6': 'ltcc',
        '\u2AA7': 'gtcc',
        '\u2AA8': 'lescc',
        '\u2AA9': 'gescc',
        '\u2AAA': 'smt',
        '\u2AAB': 'lat',
        '\u2AAC': 'smte',
        '\u2AAC\uFE00': 'smtes',
        '\u2AAD': 'late',
        '\u2AAD\uFE00': 'lates',
        '\u2AAE': 'bumpE',
        '\u2AAF': 'pre',
        '\u2AAF\u0338': 'npre',
        '\u2AB0': 'sce',
        '\u2AB0\u0338': 'nsce',
        '\u2AB3': 'prE',
        '\u2AB4': 'scE',
        '\u2AB5': 'prnE',
        '\u2AB6': 'scnE',
        '\u2AB7': 'prap',
        '\u2AB8': 'scap',
        '\u2AB9': 'prnap',
        '\u2ABA': 'scnap',
        '\u2ABB': 'Pr',
        '\u2ABC': 'Sc',
        '\u2ABD': 'subdot',
        '\u2ABE': 'supdot',
        '\u2ABF': 'subplus',
        '\u2AC0': 'supplus',
        '\u2AC1': 'submult',
        '\u2AC2': 'supmult',
        '\u2AC3': 'subedot',
        '\u2AC4': 'supedot',
        '\u2AC5': 'subE',
        '\u2AC5\u0338': 'nsubE',
        '\u2AC6': 'supE',
        '\u2AC6\u0338': 'nsupE',
        '\u2AC7': 'subsim',
        '\u2AC8': 'supsim',
        '\u2ACB\uFE00': 'vsubnE',
        '\u2ACB': 'subnE',
        '\u2ACC\uFE00': 'vsupnE',
        '\u2ACC': 'supnE',
        '\u2ACF': 'csub',
        '\u2AD0': 'csup',
        '\u2AD1': 'csube',
        '\u2AD2': 'csupe',
        '\u2AD3': 'subsup',
        '\u2AD4': 'supsub',
        '\u2AD5': 'subsub',
        '\u2AD6': 'supsup',
        '\u2AD7': 'suphsub',
        '\u2AD8': 'supdsub',
        '\u2AD9': 'forkv',
        '\u2ADA': 'topfork',
        '\u2ADB': 'mlcp',
        '\u2AE4': 'Dashv',
        '\u2AE6': 'Vdashl',
        '\u2AE7': 'Barv',
        '\u2AE8': 'vBar',
        '\u2AE9': 'vBarv',
        '\u2AEB': 'Vbar',
        '\u2AEC': 'Not',
        '\u2AED': 'bNot',
        '\u2AEE': 'rnmid',
        '\u2AEF': 'cirmid',
        '\u2AF0': 'midcir',
        '\u2AF1': 'topcir',
        '\u2AF2': 'nhpar',
        '\u2AF3': 'parsim',
        '\u2AFD': 'parsl',
        '\u2AFD\u20E5': 'nparsl',
        '\u266D': 'flat',
        '\u266E': 'natur',
        '\u266F': 'sharp',
        '\xA4': 'curren',
        '\xA2': 'cent',
        '$': 'dollar',
        '\xA3': 'pound',
        '\xA5': 'yen',
        '\u20AC': 'euro',
        '\xB9': 'sup1',
        '\xBD': 'half',
        '\u2153': 'frac13',
        '\xBC': 'frac14',
        '\u2155': 'frac15',
        '\u2159': 'frac16',
        '\u215B': 'frac18',
        '\xB2': 'sup2',
        '\u2154': 'frac23',
        '\u2156': 'frac25',
        '\xB3': 'sup3',
        '\xBE': 'frac34',
        '\u2157': 'frac35',
        '\u215C': 'frac38',
        '\u2158': 'frac45',
        '\u215A': 'frac56',
        '\u215D': 'frac58',
        '\u215E': 'frac78',
        '\uD835\uDCB6': 'ascr',
        '\uD835\uDD52': 'aopf',
        '\uD835\uDD1E': 'afr',
        '\uD835\uDD38': 'Aopf',
        '\uD835\uDD04': 'Afr',
        '\uD835\uDC9C': 'Ascr',
        '\xAA': 'ordf',
        '\xE1': 'aacute',
        '\xC1': 'Aacute',
        '\xE0': 'agrave',
        '\xC0': 'Agrave',
        '\u0103': 'abreve',
        '\u0102': 'Abreve',
        '\xE2': 'acirc',
        '\xC2': 'Acirc',
        '\xE5': 'aring',
        '\xC5': 'angst',
        '\xE4': 'auml',
        '\xC4': 'Auml',
        '\xE3': 'atilde',
        '\xC3': 'Atilde',
        '\u0105': 'aogon',
        '\u0104': 'Aogon',
        '\u0101': 'amacr',
        '\u0100': 'Amacr',
        '\xE6': 'aelig',
        '\xC6': 'AElig',
        '\uD835\uDCB7': 'bscr',
        '\uD835\uDD53': 'bopf',
        '\uD835\uDD1F': 'bfr',
        '\uD835\uDD39': 'Bopf',
        '\u212C': 'Bscr',
        '\uD835\uDD05': 'Bfr',
        '\uD835\uDD20': 'cfr',
        '\uD835\uDCB8': 'cscr',
        '\uD835\uDD54': 'copf',
        '\u212D': 'Cfr',
        '\uD835\uDC9E': 'Cscr',
        '\u2102': 'Copf',
        '\u0107': 'cacute',
        '\u0106': 'Cacute',
        '\u0109': 'ccirc',
        '\u0108': 'Ccirc',
        '\u010D': 'ccaron',
        '\u010C': 'Ccaron',
        '\u010B': 'cdot',
        '\u010A': 'Cdot',
        '\xE7': 'ccedil',
        '\xC7': 'Ccedil',
        '\u2105': 'incare',
        '\uD835\uDD21': 'dfr',
        '\u2146': 'dd',
        '\uD835\uDD55': 'dopf',
        '\uD835\uDCB9': 'dscr',
        '\uD835\uDC9F': 'Dscr',
        '\uD835\uDD07': 'Dfr',
        '\u2145': 'DD',
        '\uD835\uDD3B': 'Dopf',
        '\u010F': 'dcaron',
        '\u010E': 'Dcaron',
        '\u0111': 'dstrok',
        '\u0110': 'Dstrok',
        '\xF0': 'eth',
        '\xD0': 'ETH',
        '\u2147': 'ee',
        '\u212F': 'escr',
        '\uD835\uDD22': 'efr',
        '\uD835\uDD56': 'eopf',
        '\u2130': 'Escr',
        '\uD835\uDD08': 'Efr',
        '\uD835\uDD3C': 'Eopf',
        '\xE9': 'eacute',
        '\xC9': 'Eacute',
        '\xE8': 'egrave',
        '\xC8': 'Egrave',
        '\xEA': 'ecirc',
        '\xCA': 'Ecirc',
        '\u011B': 'ecaron',
        '\u011A': 'Ecaron',
        '\xEB': 'euml',
        '\xCB': 'Euml',
        '\u0117': 'edot',
        '\u0116': 'Edot',
        '\u0119': 'eogon',
        '\u0118': 'Eogon',
        '\u0113': 'emacr',
        '\u0112': 'Emacr',
        '\uD835\uDD23': 'ffr',
        '\uD835\uDD57': 'fopf',
        '\uD835\uDCBB': 'fscr',
        '\uD835\uDD09': 'Ffr',
        '\uD835\uDD3D': 'Fopf',
        '\u2131': 'Fscr',
        '\uFB00': 'fflig',
        '\uFB03': 'ffilig',
        '\uFB04': 'ffllig',
        '\uFB01': 'filig',
        'fj': 'fjlig',
        '\uFB02': 'fllig',
        '\u0192': 'fnof',
        '\u210A': 'gscr',
        '\uD835\uDD58': 'gopf',
        '\uD835\uDD24': 'gfr',
        '\uD835\uDCA2': 'Gscr',
        '\uD835\uDD3E': 'Gopf',
        '\uD835\uDD0A': 'Gfr',
        '\u01F5': 'gacute',
        '\u011F': 'gbreve',
        '\u011E': 'Gbreve',
        '\u011D': 'gcirc',
        '\u011C': 'Gcirc',
        '\u0121': 'gdot',
        '\u0120': 'Gdot',
        '\u0122': 'Gcedil',
        '\uD835\uDD25': 'hfr',
        '\u210E': 'planckh',
        '\uD835\uDCBD': 'hscr',
        '\uD835\uDD59': 'hopf',
        '\u210B': 'Hscr',
        '\u210C': 'Hfr',
        '\u210D': 'Hopf',
        '\u0125': 'hcirc',
        '\u0124': 'Hcirc',
        '\u210F': 'hbar',
        '\u0127': 'hstrok',
        '\u0126': 'Hstrok',
        '\uD835\uDD5A': 'iopf',
        '\uD835\uDD26': 'ifr',
        '\uD835\uDCBE': 'iscr',
        '\u2148': 'ii',
        '\uD835\uDD40': 'Iopf',
        '\u2110': 'Iscr',
        '\u2111': 'Im',
        '\xED': 'iacute',
        '\xCD': 'Iacute',
        '\xEC': 'igrave',
        '\xCC': 'Igrave',
        '\xEE': 'icirc',
        '\xCE': 'Icirc',
        '\xEF': 'iuml',
        '\xCF': 'Iuml',
        '\u0129': 'itilde',
        '\u0128': 'Itilde',
        '\u0130': 'Idot',
        '\u012F': 'iogon',
        '\u012E': 'Iogon',
        '\u012B': 'imacr',
        '\u012A': 'Imacr',
        '\u0133': 'ijlig',
        '\u0132': 'IJlig',
        '\u0131': 'imath',
        '\uD835\uDCBF': 'jscr',
        '\uD835\uDD5B': 'jopf',
        '\uD835\uDD27': 'jfr',
        '\uD835\uDCA5': 'Jscr',
        '\uD835\uDD0D': 'Jfr',
        '\uD835\uDD41': 'Jopf',
        '\u0135': 'jcirc',
        '\u0134': 'Jcirc',
        '\u0237': 'jmath',
        '\uD835\uDD5C': 'kopf',
        '\uD835\uDCC0': 'kscr',
        '\uD835\uDD28': 'kfr',
        '\uD835\uDCA6': 'Kscr',
        '\uD835\uDD42': 'Kopf',
        '\uD835\uDD0E': 'Kfr',
        '\u0137': 'kcedil',
        '\u0136': 'Kcedil',
        '\uD835\uDD29': 'lfr',
        '\uD835\uDCC1': 'lscr',
        '\u2113': 'ell',
        '\uD835\uDD5D': 'lopf',
        '\u2112': 'Lscr',
        '\uD835\uDD0F': 'Lfr',
        '\uD835\uDD43': 'Lopf',
        '\u013A': 'lacute',
        '\u0139': 'Lacute',
        '\u013E': 'lcaron',
        '\u013D': 'Lcaron',
        '\u013C': 'lcedil',
        '\u013B': 'Lcedil',
        '\u0142': 'lstrok',
        '\u0141': 'Lstrok',
        '\u0140': 'lmidot',
        '\u013F': 'Lmidot',
        '\uD835\uDD2A': 'mfr',
        '\uD835\uDD5E': 'mopf',
        '\uD835\uDCC2': 'mscr',
        '\uD835\uDD10': 'Mfr',
        '\uD835\uDD44': 'Mopf',
        '\u2133': 'Mscr',
        '\uD835\uDD2B': 'nfr',
        '\uD835\uDD5F': 'nopf',
        '\uD835\uDCC3': 'nscr',
        '\u2115': 'Nopf',
        '\uD835\uDCA9': 'Nscr',
        '\uD835\uDD11': 'Nfr',
        '\u0144': 'nacute',
        '\u0143': 'Nacute',
        '\u0148': 'ncaron',
        '\u0147': 'Ncaron',
        '\xF1': 'ntilde',
        '\xD1': 'Ntilde',
        '\u0146': 'ncedil',
        '\u0145': 'Ncedil',
        '\u2116': 'numero',
        '\u014B': 'eng',
        '\u014A': 'ENG',
        '\uD835\uDD60': 'oopf',
        '\uD835\uDD2C': 'ofr',
        '\u2134': 'oscr',
        '\uD835\uDCAA': 'Oscr',
        '\uD835\uDD12': 'Ofr',
        '\uD835\uDD46': 'Oopf',
        '\xBA': 'ordm',
        '\xF3': 'oacute',
        '\xD3': 'Oacute',
        '\xF2': 'ograve',
        '\xD2': 'Ograve',
        '\xF4': 'ocirc',
        '\xD4': 'Ocirc',
        '\xF6': 'ouml',
        '\xD6': 'Ouml',
        '\u0151': 'odblac',
        '\u0150': 'Odblac',
        '\xF5': 'otilde',
        '\xD5': 'Otilde',
        '\xF8': 'oslash',
        '\xD8': 'Oslash',
        '\u014D': 'omacr',
        '\u014C': 'Omacr',
        '\u0153': 'oelig',
        '\u0152': 'OElig',
        '\uD835\uDD2D': 'pfr',
        '\uD835\uDCC5': 'pscr',
        '\uD835\uDD61': 'popf',
        '\u2119': 'Popf',
        '\uD835\uDD13': 'Pfr',
        '\uD835\uDCAB': 'Pscr',
        '\uD835\uDD62': 'qopf',
        '\uD835\uDD2E': 'qfr',
        '\uD835\uDCC6': 'qscr',
        '\uD835\uDCAC': 'Qscr',
        '\uD835\uDD14': 'Qfr',
        '\u211A': 'Qopf',
        '\u0138': 'kgreen',
        '\uD835\uDD2F': 'rfr',
        '\uD835\uDD63': 'ropf',
        '\uD835\uDCC7': 'rscr',
        '\u211B': 'Rscr',
        '\u211C': 'Re',
        '\u211D': 'Ropf',
        '\u0155': 'racute',
        '\u0154': 'Racute',
        '\u0159': 'rcaron',
        '\u0158': 'Rcaron',
        '\u0157': 'rcedil',
        '\u0156': 'Rcedil',
        '\uD835\uDD64': 'sopf',
        '\uD835\uDCC8': 'sscr',
        '\uD835\uDD30': 'sfr',
        '\uD835\uDD4A': 'Sopf',
        '\uD835\uDD16': 'Sfr',
        '\uD835\uDCAE': 'Sscr',
        '\u24C8': 'oS',
        '\u015B': 'sacute',
        '\u015A': 'Sacute',
        '\u015D': 'scirc',
        '\u015C': 'Scirc',
        '\u0161': 'scaron',
        '\u0160': 'Scaron',
        '\u015F': 'scedil',
        '\u015E': 'Scedil',
        '\xDF': 'szlig',
        '\uD835\uDD31': 'tfr',
        '\uD835\uDCC9': 'tscr',
        '\uD835\uDD65': 'topf',
        '\uD835\uDCAF': 'Tscr',
        '\uD835\uDD17': 'Tfr',
        '\uD835\uDD4B': 'Topf',
        '\u0165': 'tcaron',
        '\u0164': 'Tcaron',
        '\u0163': 'tcedil',
        '\u0162': 'Tcedil',
        '\u2122': 'trade',
        '\u0167': 'tstrok',
        '\u0166': 'Tstrok',
        '\uD835\uDCCA': 'uscr',
        '\uD835\uDD66': 'uopf',
        '\uD835\uDD32': 'ufr',
        '\uD835\uDD4C': 'Uopf',
        '\uD835\uDD18': 'Ufr',
        '\uD835\uDCB0': 'Uscr',
        '\xFA': 'uacute',
        '\xDA': 'Uacute',
        '\xF9': 'ugrave',
        '\xD9': 'Ugrave',
        '\u016D': 'ubreve',
        '\u016C': 'Ubreve',
        '\xFB': 'ucirc',
        '\xDB': 'Ucirc',
        '\u016F': 'uring',
        '\u016E': 'Uring',
        '\xFC': 'uuml',
        '\xDC': 'Uuml',
        '\u0171': 'udblac',
        '\u0170': 'Udblac',
        '\u0169': 'utilde',
        '\u0168': 'Utilde',
        '\u0173': 'uogon',
        '\u0172': 'Uogon',
        '\u016B': 'umacr',
        '\u016A': 'Umacr',
        '\uD835\uDD33': 'vfr',
        '\uD835\uDD67': 'vopf',
        '\uD835\uDCCB': 'vscr',
        '\uD835\uDD19': 'Vfr',
        '\uD835\uDD4D': 'Vopf',
        '\uD835\uDCB1': 'Vscr',
        '\uD835\uDD68': 'wopf',
        '\uD835\uDCCC': 'wscr',
        '\uD835\uDD34': 'wfr',
        '\uD835\uDCB2': 'Wscr',
        '\uD835\uDD4E': 'Wopf',
        '\uD835\uDD1A': 'Wfr',
        '\u0175': 'wcirc',
        '\u0174': 'Wcirc',
        '\uD835\uDD35': 'xfr',
        '\uD835\uDCCD': 'xscr',
        '\uD835\uDD69': 'xopf',
        '\uD835\uDD4F': 'Xopf',
        '\uD835\uDD1B': 'Xfr',
        '\uD835\uDCB3': 'Xscr',
        '\uD835\uDD36': 'yfr',
        '\uD835\uDCCE': 'yscr',
        '\uD835\uDD6A': 'yopf',
        '\uD835\uDCB4': 'Yscr',
        '\uD835\uDD1C': 'Yfr',
        '\uD835\uDD50': 'Yopf',
        '\xFD': 'yacute',
        '\xDD': 'Yacute',
        '\u0177': 'ycirc',
        '\u0176': 'Ycirc',
        '\xFF': 'yuml',
        '\u0178': 'Yuml',
        '\uD835\uDCCF': 'zscr',
        '\uD835\uDD37': 'zfr',
        '\uD835\uDD6B': 'zopf',
        '\u2128': 'Zfr',
        '\u2124': 'Zopf',
        '\uD835\uDCB5': 'Zscr',
        '\u017A': 'zacute',
        '\u0179': 'Zacute',
        '\u017E': 'zcaron',
        '\u017D': 'Zcaron',
        '\u017C': 'zdot',
        '\u017B': 'Zdot',
        '\u01B5': 'imped',
        '\xFE': 'thorn',
        '\xDE': 'THORN',
        '\u0149': 'napos',
        '\u03B1': 'alpha',
        '\u0391': 'Alpha',
        '\u03B2': 'beta',
        '\u0392': 'Beta',
        '\u03B3': 'gamma',
        '\u0393': 'Gamma',
        '\u03B4': 'delta',
        '\u0394': 'Delta',
        '\u03B5': 'epsi',
        '\u03F5': 'epsiv',
        '\u0395': 'Epsilon',
        '\u03DD': 'gammad',
        '\u03DC': 'Gammad',
        '\u03B6': 'zeta',
        '\u0396': 'Zeta',
        '\u03B7': 'eta',
        '\u0397': 'Eta',
        '\u03B8': 'theta',
        '\u03D1': 'thetav',
        '\u0398': 'Theta',
        '\u03B9': 'iota',
        '\u0399': 'Iota',
        '\u03BA': 'kappa',
        '\u03F0': 'kappav',
        '\u039A': 'Kappa',
        '\u03BB': 'lambda',
        '\u039B': 'Lambda',
        '\u03BC': 'mu',
        '\xB5': 'micro',
        '\u039C': 'Mu',
        '\u03BD': 'nu',
        '\u039D': 'Nu',
        '\u03BE': 'xi',
        '\u039E': 'Xi',
        '\u03BF': 'omicron',
        '\u039F': 'Omicron',
        '\u03C0': 'pi',
        '\u03D6': 'piv',
        '\u03A0': 'Pi',
        '\u03C1': 'rho',
        '\u03F1': 'rhov',
        '\u03A1': 'Rho',
        '\u03C3': 'sigma',
        '\u03A3': 'Sigma',
        '\u03C2': 'sigmaf',
        '\u03C4': 'tau',
        '\u03A4': 'Tau',
        '\u03C5': 'upsi',
        '\u03A5': 'Upsilon',
        '\u03D2': 'Upsi',
        '\u03C6': 'phi',
        '\u03D5': 'phiv',
        '\u03A6': 'Phi',
        '\u03C7': 'chi',
        '\u03A7': 'Chi',
        '\u03C8': 'psi',
        '\u03A8': 'Psi',
        '\u03C9': 'omega',
        '\u03A9': 'ohm',
        '\u0430': 'acy',
        '\u0410': 'Acy',
        '\u0431': 'bcy',
        '\u0411': 'Bcy',
        '\u0432': 'vcy',
        '\u0412': 'Vcy',
        '\u0433': 'gcy',
        '\u0413': 'Gcy',
        '\u0453': 'gjcy',
        '\u0403': 'GJcy',
        '\u0434': 'dcy',
        '\u0414': 'Dcy',
        '\u0452': 'djcy',
        '\u0402': 'DJcy',
        '\u0435': 'iecy',
        '\u0415': 'IEcy',
        '\u0451': 'iocy',
        '\u0401': 'IOcy',
        '\u0454': 'jukcy',
        '\u0404': 'Jukcy',
        '\u0436': 'zhcy',
        '\u0416': 'ZHcy',
        '\u0437': 'zcy',
        '\u0417': 'Zcy',
        '\u0455': 'dscy',
        '\u0405': 'DScy',
        '\u0438': 'icy',
        '\u0418': 'Icy',
        '\u0456': 'iukcy',
        '\u0406': 'Iukcy',
        '\u0457': 'yicy',
        '\u0407': 'YIcy',
        '\u0439': 'jcy',
        '\u0419': 'Jcy',
        '\u0458': 'jsercy',
        '\u0408': 'Jsercy',
        '\u043A': 'kcy',
        '\u041A': 'Kcy',
        '\u045C': 'kjcy',
        '\u040C': 'KJcy',
        '\u043B': 'lcy',
        '\u041B': 'Lcy',
        '\u0459': 'ljcy',
        '\u0409': 'LJcy',
        '\u043C': 'mcy',
        '\u041C': 'Mcy',
        '\u043D': 'ncy',
        '\u041D': 'Ncy',
        '\u045A': 'njcy',
        '\u040A': 'NJcy',
        '\u043E': 'ocy',
        '\u041E': 'Ocy',
        '\u043F': 'pcy',
        '\u041F': 'Pcy',
        '\u0440': 'rcy',
        '\u0420': 'Rcy',
        '\u0441': 'scy',
        '\u0421': 'Scy',
        '\u0442': 'tcy',
        '\u0422': 'Tcy',
        '\u045B': 'tshcy',
        '\u040B': 'TSHcy',
        '\u0443': 'ucy',
        '\u0423': 'Ucy',
        '\u045E': 'ubrcy',
        '\u040E': 'Ubrcy',
        '\u0444': 'fcy',
        '\u0424': 'Fcy',
        '\u0445': 'khcy',
        '\u0425': 'KHcy',
        '\u0446': 'tscy',
        '\u0426': 'TScy',
        '\u0447': 'chcy',
        '\u0427': 'CHcy',
        '\u045F': 'dzcy',
        '\u040F': 'DZcy',
        '\u0448': 'shcy',
        '\u0428': 'SHcy',
        '\u0449': 'shchcy',
        '\u0429': 'SHCHcy',
        '\u044A': 'hardcy',
        '\u042A': 'HARDcy',
        '\u044B': 'ycy',
        '\u042B': 'Ycy',
        '\u044C': 'softcy',
        '\u042C': 'SOFTcy',
        '\u044D': 'ecy',
        '\u042D': 'Ecy',
        '\u044E': 'yucy',
        '\u042E': 'YUcy',
        '\u044F': 'yacy',
        '\u042F': 'YAcy',
        '\u2135': 'aleph',
        '\u2136': 'beth',
        '\u2137': 'gimel',
        '\u2138': 'daleth'
      };
      var regexEscape = /["&'<>`]/g;
      var escapeMap = {
        '"': '&quot;',
        '&': '&amp;',
        '\'': '&#x27;',
        '<': '&lt;',
        // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
        // following is not strictly necessary unless it’s part of a tag or an
        // unquoted attribute value. We’re only escaping it to support those
        // situations, and for XML support.
        '>': '&gt;',
        // In Internet Explorer ≤ 8, the backtick character can be used
        // to break out of (un)quoted attribute values or HTML comments.
        // See http://html5sec.org/#102, http://html5sec.org/#108, and
        // http://html5sec.org/#133.
        '`': '&#x60;'
      };
      var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
      var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
      var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
      var decodeMap = {
        'aacute': '\xE1',
        'Aacute': '\xC1',
        'abreve': '\u0103',
        'Abreve': '\u0102',
        'ac': '\u223E',
        'acd': '\u223F',
        'acE': '\u223E\u0333',
        'acirc': '\xE2',
        'Acirc': '\xC2',
        'acute': '\xB4',
        'acy': '\u0430',
        'Acy': '\u0410',
        'aelig': '\xE6',
        'AElig': '\xC6',
        'af': '\u2061',
        'afr': '\uD835\uDD1E',
        'Afr': '\uD835\uDD04',
        'agrave': '\xE0',
        'Agrave': '\xC0',
        'alefsym': '\u2135',
        'aleph': '\u2135',
        'alpha': '\u03B1',
        'Alpha': '\u0391',
        'amacr': '\u0101',
        'Amacr': '\u0100',
        'amalg': '\u2A3F',
        'amp': '&',
        'AMP': '&',
        'and': '\u2227',
        'And': '\u2A53',
        'andand': '\u2A55',
        'andd': '\u2A5C',
        'andslope': '\u2A58',
        'andv': '\u2A5A',
        'ang': '\u2220',
        'ange': '\u29A4',
        'angle': '\u2220',
        'angmsd': '\u2221',
        'angmsdaa': '\u29A8',
        'angmsdab': '\u29A9',
        'angmsdac': '\u29AA',
        'angmsdad': '\u29AB',
        'angmsdae': '\u29AC',
        'angmsdaf': '\u29AD',
        'angmsdag': '\u29AE',
        'angmsdah': '\u29AF',
        'angrt': '\u221F',
        'angrtvb': '\u22BE',
        'angrtvbd': '\u299D',
        'angsph': '\u2222',
        'angst': '\xC5',
        'angzarr': '\u237C',
        'aogon': '\u0105',
        'Aogon': '\u0104',
        'aopf': '\uD835\uDD52',
        'Aopf': '\uD835\uDD38',
        'ap': '\u2248',
        'apacir': '\u2A6F',
        'ape': '\u224A',
        'apE': '\u2A70',
        'apid': '\u224B',
        'apos': '\'',
        'ApplyFunction': '\u2061',
        'approx': '\u2248',
        'approxeq': '\u224A',
        'aring': '\xE5',
        'Aring': '\xC5',
        'ascr': '\uD835\uDCB6',
        'Ascr': '\uD835\uDC9C',
        'Assign': '\u2254',
        'ast': '*',
        'asymp': '\u2248',
        'asympeq': '\u224D',
        'atilde': '\xE3',
        'Atilde': '\xC3',
        'auml': '\xE4',
        'Auml': '\xC4',
        'awconint': '\u2233',
        'awint': '\u2A11',
        'backcong': '\u224C',
        'backepsilon': '\u03F6',
        'backprime': '\u2035',
        'backsim': '\u223D',
        'backsimeq': '\u22CD',
        'Backslash': '\u2216',
        'Barv': '\u2AE7',
        'barvee': '\u22BD',
        'barwed': '\u2305',
        'Barwed': '\u2306',
        'barwedge': '\u2305',
        'bbrk': '\u23B5',
        'bbrktbrk': '\u23B6',
        'bcong': '\u224C',
        'bcy': '\u0431',
        'Bcy': '\u0411',
        'bdquo': '\u201E',
        'becaus': '\u2235',
        'because': '\u2235',
        'Because': '\u2235',
        'bemptyv': '\u29B0',
        'bepsi': '\u03F6',
        'bernou': '\u212C',
        'Bernoullis': '\u212C',
        'beta': '\u03B2',
        'Beta': '\u0392',
        'beth': '\u2136',
        'between': '\u226C',
        'bfr': '\uD835\uDD1F',
        'Bfr': '\uD835\uDD05',
        'bigcap': '\u22C2',
        'bigcirc': '\u25EF',
        'bigcup': '\u22C3',
        'bigodot': '\u2A00',
        'bigoplus': '\u2A01',
        'bigotimes': '\u2A02',
        'bigsqcup': '\u2A06',
        'bigstar': '\u2605',
        'bigtriangledown': '\u25BD',
        'bigtriangleup': '\u25B3',
        'biguplus': '\u2A04',
        'bigvee': '\u22C1',
        'bigwedge': '\u22C0',
        'bkarow': '\u290D',
        'blacklozenge': '\u29EB',
        'blacksquare': '\u25AA',
        'blacktriangle': '\u25B4',
        'blacktriangledown': '\u25BE',
        'blacktriangleleft': '\u25C2',
        'blacktriangleright': '\u25B8',
        'blank': '\u2423',
        'blk12': '\u2592',
        'blk14': '\u2591',
        'blk34': '\u2593',
        'block': '\u2588',
        'bne': '=\u20E5',
        'bnequiv': '\u2261\u20E5',
        'bnot': '\u2310',
        'bNot': '\u2AED',
        'bopf': '\uD835\uDD53',
        'Bopf': '\uD835\uDD39',
        'bot': '\u22A5',
        'bottom': '\u22A5',
        'bowtie': '\u22C8',
        'boxbox': '\u29C9',
        'boxdl': '\u2510',
        'boxdL': '\u2555',
        'boxDl': '\u2556',
        'boxDL': '\u2557',
        'boxdr': '\u250C',
        'boxdR': '\u2552',
        'boxDr': '\u2553',
        'boxDR': '\u2554',
        'boxh': '\u2500',
        'boxH': '\u2550',
        'boxhd': '\u252C',
        'boxhD': '\u2565',
        'boxHd': '\u2564',
        'boxHD': '\u2566',
        'boxhu': '\u2534',
        'boxhU': '\u2568',
        'boxHu': '\u2567',
        'boxHU': '\u2569',
        'boxminus': '\u229F',
        'boxplus': '\u229E',
        'boxtimes': '\u22A0',
        'boxul': '\u2518',
        'boxuL': '\u255B',
        'boxUl': '\u255C',
        'boxUL': '\u255D',
        'boxur': '\u2514',
        'boxuR': '\u2558',
        'boxUr': '\u2559',
        'boxUR': '\u255A',
        'boxv': '\u2502',
        'boxV': '\u2551',
        'boxvh': '\u253C',
        'boxvH': '\u256A',
        'boxVh': '\u256B',
        'boxVH': '\u256C',
        'boxvl': '\u2524',
        'boxvL': '\u2561',
        'boxVl': '\u2562',
        'boxVL': '\u2563',
        'boxvr': '\u251C',
        'boxvR': '\u255E',
        'boxVr': '\u255F',
        'boxVR': '\u2560',
        'bprime': '\u2035',
        'breve': '\u02D8',
        'Breve': '\u02D8',
        'brvbar': '\xA6',
        'bscr': '\uD835\uDCB7',
        'Bscr': '\u212C',
        'bsemi': '\u204F',
        'bsim': '\u223D',
        'bsime': '\u22CD',
        'bsol': '\\',
        'bsolb': '\u29C5',
        'bsolhsub': '\u27C8',
        'bull': '\u2022',
        'bullet': '\u2022',
        'bump': '\u224E',
        'bumpe': '\u224F',
        'bumpE': '\u2AAE',
        'bumpeq': '\u224F',
        'Bumpeq': '\u224E',
        'cacute': '\u0107',
        'Cacute': '\u0106',
        'cap': '\u2229',
        'Cap': '\u22D2',
        'capand': '\u2A44',
        'capbrcup': '\u2A49',
        'capcap': '\u2A4B',
        'capcup': '\u2A47',
        'capdot': '\u2A40',
        'CapitalDifferentialD': '\u2145',
        'caps': '\u2229\uFE00',
        'caret': '\u2041',
        'caron': '\u02C7',
        'Cayleys': '\u212D',
        'ccaps': '\u2A4D',
        'ccaron': '\u010D',
        'Ccaron': '\u010C',
        'ccedil': '\xE7',
        'Ccedil': '\xC7',
        'ccirc': '\u0109',
        'Ccirc': '\u0108',
        'Cconint': '\u2230',
        'ccups': '\u2A4C',
        'ccupssm': '\u2A50',
        'cdot': '\u010B',
        'Cdot': '\u010A',
        'cedil': '\xB8',
        'Cedilla': '\xB8',
        'cemptyv': '\u29B2',
        'cent': '\xA2',
        'centerdot': '\xB7',
        'CenterDot': '\xB7',
        'cfr': '\uD835\uDD20',
        'Cfr': '\u212D',
        'chcy': '\u0447',
        'CHcy': '\u0427',
        'check': '\u2713',
        'checkmark': '\u2713',
        'chi': '\u03C7',
        'Chi': '\u03A7',
        'cir': '\u25CB',
        'circ': '\u02C6',
        'circeq': '\u2257',
        'circlearrowleft': '\u21BA',
        'circlearrowright': '\u21BB',
        'circledast': '\u229B',
        'circledcirc': '\u229A',
        'circleddash': '\u229D',
        'CircleDot': '\u2299',
        'circledR': '\xAE',
        'circledS': '\u24C8',
        'CircleMinus': '\u2296',
        'CirclePlus': '\u2295',
        'CircleTimes': '\u2297',
        'cire': '\u2257',
        'cirE': '\u29C3',
        'cirfnint': '\u2A10',
        'cirmid': '\u2AEF',
        'cirscir': '\u29C2',
        'ClockwiseContourIntegral': '\u2232',
        'CloseCurlyDoubleQuote': '\u201D',
        'CloseCurlyQuote': '\u2019',
        'clubs': '\u2663',
        'clubsuit': '\u2663',
        'colon': ':',
        'Colon': '\u2237',
        'colone': '\u2254',
        'Colone': '\u2A74',
        'coloneq': '\u2254',
        'comma': ',',
        'commat': '@',
        'comp': '\u2201',
        'compfn': '\u2218',
        'complement': '\u2201',
        'complexes': '\u2102',
        'cong': '\u2245',
        'congdot': '\u2A6D',
        'Congruent': '\u2261',
        'conint': '\u222E',
        'Conint': '\u222F',
        'ContourIntegral': '\u222E',
        'copf': '\uD835\uDD54',
        'Copf': '\u2102',
        'coprod': '\u2210',
        'Coproduct': '\u2210',
        'copy': '\xA9',
        'COPY': '\xA9',
        'copysr': '\u2117',
        'CounterClockwiseContourIntegral': '\u2233',
        'crarr': '\u21B5',
        'cross': '\u2717',
        'Cross': '\u2A2F',
        'cscr': '\uD835\uDCB8',
        'Cscr': '\uD835\uDC9E',
        'csub': '\u2ACF',
        'csube': '\u2AD1',
        'csup': '\u2AD0',
        'csupe': '\u2AD2',
        'ctdot': '\u22EF',
        'cudarrl': '\u2938',
        'cudarrr': '\u2935',
        'cuepr': '\u22DE',
        'cuesc': '\u22DF',
        'cularr': '\u21B6',
        'cularrp': '\u293D',
        'cup': '\u222A',
        'Cup': '\u22D3',
        'cupbrcap': '\u2A48',
        'cupcap': '\u2A46',
        'CupCap': '\u224D',
        'cupcup': '\u2A4A',
        'cupdot': '\u228D',
        'cupor': '\u2A45',
        'cups': '\u222A\uFE00',
        'curarr': '\u21B7',
        'curarrm': '\u293C',
        'curlyeqprec': '\u22DE',
        'curlyeqsucc': '\u22DF',
        'curlyvee': '\u22CE',
        'curlywedge': '\u22CF',
        'curren': '\xA4',
        'curvearrowleft': '\u21B6',
        'curvearrowright': '\u21B7',
        'cuvee': '\u22CE',
        'cuwed': '\u22CF',
        'cwconint': '\u2232',
        'cwint': '\u2231',
        'cylcty': '\u232D',
        'dagger': '\u2020',
        'Dagger': '\u2021',
        'daleth': '\u2138',
        'darr': '\u2193',
        'dArr': '\u21D3',
        'Darr': '\u21A1',
        'dash': '\u2010',
        'dashv': '\u22A3',
        'Dashv': '\u2AE4',
        'dbkarow': '\u290F',
        'dblac': '\u02DD',
        'dcaron': '\u010F',
        'Dcaron': '\u010E',
        'dcy': '\u0434',
        'Dcy': '\u0414',
        'dd': '\u2146',
        'DD': '\u2145',
        'ddagger': '\u2021',
        'ddarr': '\u21CA',
        'DDotrahd': '\u2911',
        'ddotseq': '\u2A77',
        'deg': '\xB0',
        'Del': '\u2207',
        'delta': '\u03B4',
        'Delta': '\u0394',
        'demptyv': '\u29B1',
        'dfisht': '\u297F',
        'dfr': '\uD835\uDD21',
        'Dfr': '\uD835\uDD07',
        'dHar': '\u2965',
        'dharl': '\u21C3',
        'dharr': '\u21C2',
        'DiacriticalAcute': '\xB4',
        'DiacriticalDot': '\u02D9',
        'DiacriticalDoubleAcute': '\u02DD',
        'DiacriticalGrave': '`',
        'DiacriticalTilde': '\u02DC',
        'diam': '\u22C4',
        'diamond': '\u22C4',
        'Diamond': '\u22C4',
        'diamondsuit': '\u2666',
        'diams': '\u2666',
        'die': '\xA8',
        'DifferentialD': '\u2146',
        'digamma': '\u03DD',
        'disin': '\u22F2',
        'div': '\xF7',
        'divide': '\xF7',
        'divideontimes': '\u22C7',
        'divonx': '\u22C7',
        'djcy': '\u0452',
        'DJcy': '\u0402',
        'dlcorn': '\u231E',
        'dlcrop': '\u230D',
        'dollar': '$',
        'dopf': '\uD835\uDD55',
        'Dopf': '\uD835\uDD3B',
        'dot': '\u02D9',
        'Dot': '\xA8',
        'DotDot': '\u20DC',
        'doteq': '\u2250',
        'doteqdot': '\u2251',
        'DotEqual': '\u2250',
        'dotminus': '\u2238',
        'dotplus': '\u2214',
        'dotsquare': '\u22A1',
        'doublebarwedge': '\u2306',
        'DoubleContourIntegral': '\u222F',
        'DoubleDot': '\xA8',
        'DoubleDownArrow': '\u21D3',
        'DoubleLeftArrow': '\u21D0',
        'DoubleLeftRightArrow': '\u21D4',
        'DoubleLeftTee': '\u2AE4',
        'DoubleLongLeftArrow': '\u27F8',
        'DoubleLongLeftRightArrow': '\u27FA',
        'DoubleLongRightArrow': '\u27F9',
        'DoubleRightArrow': '\u21D2',
        'DoubleRightTee': '\u22A8',
        'DoubleUpArrow': '\u21D1',
        'DoubleUpDownArrow': '\u21D5',
        'DoubleVerticalBar': '\u2225',
        'downarrow': '\u2193',
        'Downarrow': '\u21D3',
        'DownArrow': '\u2193',
        'DownArrowBar': '\u2913',
        'DownArrowUpArrow': '\u21F5',
        'DownBreve': '\u0311',
        'downdownarrows': '\u21CA',
        'downharpoonleft': '\u21C3',
        'downharpoonright': '\u21C2',
        'DownLeftRightVector': '\u2950',
        'DownLeftTeeVector': '\u295E',
        'DownLeftVector': '\u21BD',
        'DownLeftVectorBar': '\u2956',
        'DownRightTeeVector': '\u295F',
        'DownRightVector': '\u21C1',
        'DownRightVectorBar': '\u2957',
        'DownTee': '\u22A4',
        'DownTeeArrow': '\u21A7',
        'drbkarow': '\u2910',
        'drcorn': '\u231F',
        'drcrop': '\u230C',
        'dscr': '\uD835\uDCB9',
        'Dscr': '\uD835\uDC9F',
        'dscy': '\u0455',
        'DScy': '\u0405',
        'dsol': '\u29F6',
        'dstrok': '\u0111',
        'Dstrok': '\u0110',
        'dtdot': '\u22F1',
        'dtri': '\u25BF',
        'dtrif': '\u25BE',
        'duarr': '\u21F5',
        'duhar': '\u296F',
        'dwangle': '\u29A6',
        'dzcy': '\u045F',
        'DZcy': '\u040F',
        'dzigrarr': '\u27FF',
        'eacute': '\xE9',
        'Eacute': '\xC9',
        'easter': '\u2A6E',
        'ecaron': '\u011B',
        'Ecaron': '\u011A',
        'ecir': '\u2256',
        'ecirc': '\xEA',
        'Ecirc': '\xCA',
        'ecolon': '\u2255',
        'ecy': '\u044D',
        'Ecy': '\u042D',
        'eDDot': '\u2A77',
        'edot': '\u0117',
        'eDot': '\u2251',
        'Edot': '\u0116',
        'ee': '\u2147',
        'efDot': '\u2252',
        'efr': '\uD835\uDD22',
        'Efr': '\uD835\uDD08',
        'eg': '\u2A9A',
        'egrave': '\xE8',
        'Egrave': '\xC8',
        'egs': '\u2A96',
        'egsdot': '\u2A98',
        'el': '\u2A99',
        'Element': '\u2208',
        'elinters': '\u23E7',
        'ell': '\u2113',
        'els': '\u2A95',
        'elsdot': '\u2A97',
        'emacr': '\u0113',
        'Emacr': '\u0112',
        'empty': '\u2205',
        'emptyset': '\u2205',
        'EmptySmallSquare': '\u25FB',
        'emptyv': '\u2205',
        'EmptyVerySmallSquare': '\u25AB',
        'emsp': '\u2003',
        'emsp13': '\u2004',
        'emsp14': '\u2005',
        'eng': '\u014B',
        'ENG': '\u014A',
        'ensp': '\u2002',
        'eogon': '\u0119',
        'Eogon': '\u0118',
        'eopf': '\uD835\uDD56',
        'Eopf': '\uD835\uDD3C',
        'epar': '\u22D5',
        'eparsl': '\u29E3',
        'eplus': '\u2A71',
        'epsi': '\u03B5',
        'epsilon': '\u03B5',
        'Epsilon': '\u0395',
        'epsiv': '\u03F5',
        'eqcirc': '\u2256',
        'eqcolon': '\u2255',
        'eqsim': '\u2242',
        'eqslantgtr': '\u2A96',
        'eqslantless': '\u2A95',
        'Equal': '\u2A75',
        'equals': '=',
        'EqualTilde': '\u2242',
        'equest': '\u225F',
        'Equilibrium': '\u21CC',
        'equiv': '\u2261',
        'equivDD': '\u2A78',
        'eqvparsl': '\u29E5',
        'erarr': '\u2971',
        'erDot': '\u2253',
        'escr': '\u212F',
        'Escr': '\u2130',
        'esdot': '\u2250',
        'esim': '\u2242',
        'Esim': '\u2A73',
        'eta': '\u03B7',
        'Eta': '\u0397',
        'eth': '\xF0',
        'ETH': '\xD0',
        'euml': '\xEB',
        'Euml': '\xCB',
        'euro': '\u20AC',
        'excl': '!',
        'exist': '\u2203',
        'Exists': '\u2203',
        'expectation': '\u2130',
        'exponentiale': '\u2147',
        'ExponentialE': '\u2147',
        'fallingdotseq': '\u2252',
        'fcy': '\u0444',
        'Fcy': '\u0424',
        'female': '\u2640',
        'ffilig': '\uFB03',
        'fflig': '\uFB00',
        'ffllig': '\uFB04',
        'ffr': '\uD835\uDD23',
        'Ffr': '\uD835\uDD09',
        'filig': '\uFB01',
        'FilledSmallSquare': '\u25FC',
        'FilledVerySmallSquare': '\u25AA',
        'fjlig': 'fj',
        'flat': '\u266D',
        'fllig': '\uFB02',
        'fltns': '\u25B1',
        'fnof': '\u0192',
        'fopf': '\uD835\uDD57',
        'Fopf': '\uD835\uDD3D',
        'forall': '\u2200',
        'ForAll': '\u2200',
        'fork': '\u22D4',
        'forkv': '\u2AD9',
        'Fouriertrf': '\u2131',
        'fpartint': '\u2A0D',
        'frac12': '\xBD',
        'frac13': '\u2153',
        'frac14': '\xBC',
        'frac15': '\u2155',
        'frac16': '\u2159',
        'frac18': '\u215B',
        'frac23': '\u2154',
        'frac25': '\u2156',
        'frac34': '\xBE',
        'frac35': '\u2157',
        'frac38': '\u215C',
        'frac45': '\u2158',
        'frac56': '\u215A',
        'frac58': '\u215D',
        'frac78': '\u215E',
        'frasl': '\u2044',
        'frown': '\u2322',
        'fscr': '\uD835\uDCBB',
        'Fscr': '\u2131',
        'gacute': '\u01F5',
        'gamma': '\u03B3',
        'Gamma': '\u0393',
        'gammad': '\u03DD',
        'Gammad': '\u03DC',
        'gap': '\u2A86',
        'gbreve': '\u011F',
        'Gbreve': '\u011E',
        'Gcedil': '\u0122',
        'gcirc': '\u011D',
        'Gcirc': '\u011C',
        'gcy': '\u0433',
        'Gcy': '\u0413',
        'gdot': '\u0121',
        'Gdot': '\u0120',
        'ge': '\u2265',
        'gE': '\u2267',
        'gel': '\u22DB',
        'gEl': '\u2A8C',
        'geq': '\u2265',
        'geqq': '\u2267',
        'geqslant': '\u2A7E',
        'ges': '\u2A7E',
        'gescc': '\u2AA9',
        'gesdot': '\u2A80',
        'gesdoto': '\u2A82',
        'gesdotol': '\u2A84',
        'gesl': '\u22DB\uFE00',
        'gesles': '\u2A94',
        'gfr': '\uD835\uDD24',
        'Gfr': '\uD835\uDD0A',
        'gg': '\u226B',
        'Gg': '\u22D9',
        'ggg': '\u22D9',
        'gimel': '\u2137',
        'gjcy': '\u0453',
        'GJcy': '\u0403',
        'gl': '\u2277',
        'gla': '\u2AA5',
        'glE': '\u2A92',
        'glj': '\u2AA4',
        'gnap': '\u2A8A',
        'gnapprox': '\u2A8A',
        'gne': '\u2A88',
        'gnE': '\u2269',
        'gneq': '\u2A88',
        'gneqq': '\u2269',
        'gnsim': '\u22E7',
        'gopf': '\uD835\uDD58',
        'Gopf': '\uD835\uDD3E',
        'grave': '`',
        'GreaterEqual': '\u2265',
        'GreaterEqualLess': '\u22DB',
        'GreaterFullEqual': '\u2267',
        'GreaterGreater': '\u2AA2',
        'GreaterLess': '\u2277',
        'GreaterSlantEqual': '\u2A7E',
        'GreaterTilde': '\u2273',
        'gscr': '\u210A',
        'Gscr': '\uD835\uDCA2',
        'gsim': '\u2273',
        'gsime': '\u2A8E',
        'gsiml': '\u2A90',
        'gt': '>',
        'Gt': '\u226B',
        'GT': '>',
        'gtcc': '\u2AA7',
        'gtcir': '\u2A7A',
        'gtdot': '\u22D7',
        'gtlPar': '\u2995',
        'gtquest': '\u2A7C',
        'gtrapprox': '\u2A86',
        'gtrarr': '\u2978',
        'gtrdot': '\u22D7',
        'gtreqless': '\u22DB',
        'gtreqqless': '\u2A8C',
        'gtrless': '\u2277',
        'gtrsim': '\u2273',
        'gvertneqq': '\u2269\uFE00',
        'gvnE': '\u2269\uFE00',
        'Hacek': '\u02C7',
        'hairsp': '\u200A',
        'half': '\xBD',
        'hamilt': '\u210B',
        'hardcy': '\u044A',
        'HARDcy': '\u042A',
        'harr': '\u2194',
        'hArr': '\u21D4',
        'harrcir': '\u2948',
        'harrw': '\u21AD',
        'Hat': '^',
        'hbar': '\u210F',
        'hcirc': '\u0125',
        'Hcirc': '\u0124',
        'hearts': '\u2665',
        'heartsuit': '\u2665',
        'hellip': '\u2026',
        'hercon': '\u22B9',
        'hfr': '\uD835\uDD25',
        'Hfr': '\u210C',
        'HilbertSpace': '\u210B',
        'hksearow': '\u2925',
        'hkswarow': '\u2926',
        'hoarr': '\u21FF',
        'homtht': '\u223B',
        'hookleftarrow': '\u21A9',
        'hookrightarrow': '\u21AA',
        'hopf': '\uD835\uDD59',
        'Hopf': '\u210D',
        'horbar': '\u2015',
        'HorizontalLine': '\u2500',
        'hscr': '\uD835\uDCBD',
        'Hscr': '\u210B',
        'hslash': '\u210F',
        'hstrok': '\u0127',
        'Hstrok': '\u0126',
        'HumpDownHump': '\u224E',
        'HumpEqual': '\u224F',
        'hybull': '\u2043',
        'hyphen': '\u2010',
        'iacute': '\xED',
        'Iacute': '\xCD',
        'ic': '\u2063',
        'icirc': '\xEE',
        'Icirc': '\xCE',
        'icy': '\u0438',
        'Icy': '\u0418',
        'Idot': '\u0130',
        'iecy': '\u0435',
        'IEcy': '\u0415',
        'iexcl': '\xA1',
        'iff': '\u21D4',
        'ifr': '\uD835\uDD26',
        'Ifr': '\u2111',
        'igrave': '\xEC',
        'Igrave': '\xCC',
        'ii': '\u2148',
        'iiiint': '\u2A0C',
        'iiint': '\u222D',
        'iinfin': '\u29DC',
        'iiota': '\u2129',
        'ijlig': '\u0133',
        'IJlig': '\u0132',
        'Im': '\u2111',
        'imacr': '\u012B',
        'Imacr': '\u012A',
        'image': '\u2111',
        'ImaginaryI': '\u2148',
        'imagline': '\u2110',
        'imagpart': '\u2111',
        'imath': '\u0131',
        'imof': '\u22B7',
        'imped': '\u01B5',
        'Implies': '\u21D2',
        'in': '\u2208',
        'incare': '\u2105',
        'infin': '\u221E',
        'infintie': '\u29DD',
        'inodot': '\u0131',
        'int': '\u222B',
        'Int': '\u222C',
        'intcal': '\u22BA',
        'integers': '\u2124',
        'Integral': '\u222B',
        'intercal': '\u22BA',
        'Intersection': '\u22C2',
        'intlarhk': '\u2A17',
        'intprod': '\u2A3C',
        'InvisibleComma': '\u2063',
        'InvisibleTimes': '\u2062',
        'iocy': '\u0451',
        'IOcy': '\u0401',
        'iogon': '\u012F',
        'Iogon': '\u012E',
        'iopf': '\uD835\uDD5A',
        'Iopf': '\uD835\uDD40',
        'iota': '\u03B9',
        'Iota': '\u0399',
        'iprod': '\u2A3C',
        'iquest': '\xBF',
        'iscr': '\uD835\uDCBE',
        'Iscr': '\u2110',
        'isin': '\u2208',
        'isindot': '\u22F5',
        'isinE': '\u22F9',
        'isins': '\u22F4',
        'isinsv': '\u22F3',
        'isinv': '\u2208',
        'it': '\u2062',
        'itilde': '\u0129',
        'Itilde': '\u0128',
        'iukcy': '\u0456',
        'Iukcy': '\u0406',
        'iuml': '\xEF',
        'Iuml': '\xCF',
        'jcirc': '\u0135',
        'Jcirc': '\u0134',
        'jcy': '\u0439',
        'Jcy': '\u0419',
        'jfr': '\uD835\uDD27',
        'Jfr': '\uD835\uDD0D',
        'jmath': '\u0237',
        'jopf': '\uD835\uDD5B',
        'Jopf': '\uD835\uDD41',
        'jscr': '\uD835\uDCBF',
        'Jscr': '\uD835\uDCA5',
        'jsercy': '\u0458',
        'Jsercy': '\u0408',
        'jukcy': '\u0454',
        'Jukcy': '\u0404',
        'kappa': '\u03BA',
        'Kappa': '\u039A',
        'kappav': '\u03F0',
        'kcedil': '\u0137',
        'Kcedil': '\u0136',
        'kcy': '\u043A',
        'Kcy': '\u041A',
        'kfr': '\uD835\uDD28',
        'Kfr': '\uD835\uDD0E',
        'kgreen': '\u0138',
        'khcy': '\u0445',
        'KHcy': '\u0425',
        'kjcy': '\u045C',
        'KJcy': '\u040C',
        'kopf': '\uD835\uDD5C',
        'Kopf': '\uD835\uDD42',
        'kscr': '\uD835\uDCC0',
        'Kscr': '\uD835\uDCA6',
        'lAarr': '\u21DA',
        'lacute': '\u013A',
        'Lacute': '\u0139',
        'laemptyv': '\u29B4',
        'lagran': '\u2112',
        'lambda': '\u03BB',
        'Lambda': '\u039B',
        'lang': '\u27E8',
        'Lang': '\u27EA',
        'langd': '\u2991',
        'langle': '\u27E8',
        'lap': '\u2A85',
        'Laplacetrf': '\u2112',
        'laquo': '\xAB',
        'larr': '\u2190',
        'lArr': '\u21D0',
        'Larr': '\u219E',
        'larrb': '\u21E4',
        'larrbfs': '\u291F',
        'larrfs': '\u291D',
        'larrhk': '\u21A9',
        'larrlp': '\u21AB',
        'larrpl': '\u2939',
        'larrsim': '\u2973',
        'larrtl': '\u21A2',
        'lat': '\u2AAB',
        'latail': '\u2919',
        'lAtail': '\u291B',
        'late': '\u2AAD',
        'lates': '\u2AAD\uFE00',
        'lbarr': '\u290C',
        'lBarr': '\u290E',
        'lbbrk': '\u2772',
        'lbrace': '{',
        'lbrack': '[',
        'lbrke': '\u298B',
        'lbrksld': '\u298F',
        'lbrkslu': '\u298D',
        'lcaron': '\u013E',
        'Lcaron': '\u013D',
        'lcedil': '\u013C',
        'Lcedil': '\u013B',
        'lceil': '\u2308',
        'lcub': '{',
        'lcy': '\u043B',
        'Lcy': '\u041B',
        'ldca': '\u2936',
        'ldquo': '\u201C',
        'ldquor': '\u201E',
        'ldrdhar': '\u2967',
        'ldrushar': '\u294B',
        'ldsh': '\u21B2',
        'le': '\u2264',
        'lE': '\u2266',
        'LeftAngleBracket': '\u27E8',
        'leftarrow': '\u2190',
        'Leftarrow': '\u21D0',
        'LeftArrow': '\u2190',
        'LeftArrowBar': '\u21E4',
        'LeftArrowRightArrow': '\u21C6',
        'leftarrowtail': '\u21A2',
        'LeftCeiling': '\u2308',
        'LeftDoubleBracket': '\u27E6',
        'LeftDownTeeVector': '\u2961',
        'LeftDownVector': '\u21C3',
        'LeftDownVectorBar': '\u2959',
        'LeftFloor': '\u230A',
        'leftharpoondown': '\u21BD',
        'leftharpoonup': '\u21BC',
        'leftleftarrows': '\u21C7',
        'leftrightarrow': '\u2194',
        'Leftrightarrow': '\u21D4',
        'LeftRightArrow': '\u2194',
        'leftrightarrows': '\u21C6',
        'leftrightharpoons': '\u21CB',
        'leftrightsquigarrow': '\u21AD',
        'LeftRightVector': '\u294E',
        'LeftTee': '\u22A3',
        'LeftTeeArrow': '\u21A4',
        'LeftTeeVector': '\u295A',
        'leftthreetimes': '\u22CB',
        'LeftTriangle': '\u22B2',
        'LeftTriangleBar': '\u29CF',
        'LeftTriangleEqual': '\u22B4',
        'LeftUpDownVector': '\u2951',
        'LeftUpTeeVector': '\u2960',
        'LeftUpVector': '\u21BF',
        'LeftUpVectorBar': '\u2958',
        'LeftVector': '\u21BC',
        'LeftVectorBar': '\u2952',
        'leg': '\u22DA',
        'lEg': '\u2A8B',
        'leq': '\u2264',
        'leqq': '\u2266',
        'leqslant': '\u2A7D',
        'les': '\u2A7D',
        'lescc': '\u2AA8',
        'lesdot': '\u2A7F',
        'lesdoto': '\u2A81',
        'lesdotor': '\u2A83',
        'lesg': '\u22DA\uFE00',
        'lesges': '\u2A93',
        'lessapprox': '\u2A85',
        'lessdot': '\u22D6',
        'lesseqgtr': '\u22DA',
        'lesseqqgtr': '\u2A8B',
        'LessEqualGreater': '\u22DA',
        'LessFullEqual': '\u2266',
        'LessGreater': '\u2276',
        'lessgtr': '\u2276',
        'LessLess': '\u2AA1',
        'lesssim': '\u2272',
        'LessSlantEqual': '\u2A7D',
        'LessTilde': '\u2272',
        'lfisht': '\u297C',
        'lfloor': '\u230A',
        'lfr': '\uD835\uDD29',
        'Lfr': '\uD835\uDD0F',
        'lg': '\u2276',
        'lgE': '\u2A91',
        'lHar': '\u2962',
        'lhard': '\u21BD',
        'lharu': '\u21BC',
        'lharul': '\u296A',
        'lhblk': '\u2584',
        'ljcy': '\u0459',
        'LJcy': '\u0409',
        'll': '\u226A',
        'Ll': '\u22D8',
        'llarr': '\u21C7',
        'llcorner': '\u231E',
        'Lleftarrow': '\u21DA',
        'llhard': '\u296B',
        'lltri': '\u25FA',
        'lmidot': '\u0140',
        'Lmidot': '\u013F',
        'lmoust': '\u23B0',
        'lmoustache': '\u23B0',
        'lnap': '\u2A89',
        'lnapprox': '\u2A89',
        'lne': '\u2A87',
        'lnE': '\u2268',
        'lneq': '\u2A87',
        'lneqq': '\u2268',
        'lnsim': '\u22E6',
        'loang': '\u27EC',
        'loarr': '\u21FD',
        'lobrk': '\u27E6',
        'longleftarrow': '\u27F5',
        'Longleftarrow': '\u27F8',
        'LongLeftArrow': '\u27F5',
        'longleftrightarrow': '\u27F7',
        'Longleftrightarrow': '\u27FA',
        'LongLeftRightArrow': '\u27F7',
        'longmapsto': '\u27FC',
        'longrightarrow': '\u27F6',
        'Longrightarrow': '\u27F9',
        'LongRightArrow': '\u27F6',
        'looparrowleft': '\u21AB',
        'looparrowright': '\u21AC',
        'lopar': '\u2985',
        'lopf': '\uD835\uDD5D',
        'Lopf': '\uD835\uDD43',
        'loplus': '\u2A2D',
        'lotimes': '\u2A34',
        'lowast': '\u2217',
        'lowbar': '_',
        'LowerLeftArrow': '\u2199',
        'LowerRightArrow': '\u2198',
        'loz': '\u25CA',
        'lozenge': '\u25CA',
        'lozf': '\u29EB',
        'lpar': '(',
        'lparlt': '\u2993',
        'lrarr': '\u21C6',
        'lrcorner': '\u231F',
        'lrhar': '\u21CB',
        'lrhard': '\u296D',
        'lrm': '\u200E',
        'lrtri': '\u22BF',
        'lsaquo': '\u2039',
        'lscr': '\uD835\uDCC1',
        'Lscr': '\u2112',
        'lsh': '\u21B0',
        'Lsh': '\u21B0',
        'lsim': '\u2272',
        'lsime': '\u2A8D',
        'lsimg': '\u2A8F',
        'lsqb': '[',
        'lsquo': '\u2018',
        'lsquor': '\u201A',
        'lstrok': '\u0142',
        'Lstrok': '\u0141',
        'lt': '<',
        'Lt': '\u226A',
        'LT': '<',
        'ltcc': '\u2AA6',
        'ltcir': '\u2A79',
        'ltdot': '\u22D6',
        'lthree': '\u22CB',
        'ltimes': '\u22C9',
        'ltlarr': '\u2976',
        'ltquest': '\u2A7B',
        'ltri': '\u25C3',
        'ltrie': '\u22B4',
        'ltrif': '\u25C2',
        'ltrPar': '\u2996',
        'lurdshar': '\u294A',
        'luruhar': '\u2966',
        'lvertneqq': '\u2268\uFE00',
        'lvnE': '\u2268\uFE00',
        'macr': '\xAF',
        'male': '\u2642',
        'malt': '\u2720',
        'maltese': '\u2720',
        'map': '\u21A6',
        'Map': '\u2905',
        'mapsto': '\u21A6',
        'mapstodown': '\u21A7',
        'mapstoleft': '\u21A4',
        'mapstoup': '\u21A5',
        'marker': '\u25AE',
        'mcomma': '\u2A29',
        'mcy': '\u043C',
        'Mcy': '\u041C',
        'mdash': '\u2014',
        'mDDot': '\u223A',
        'measuredangle': '\u2221',
        'MediumSpace': '\u205F',
        'Mellintrf': '\u2133',
        'mfr': '\uD835\uDD2A',
        'Mfr': '\uD835\uDD10',
        'mho': '\u2127',
        'micro': '\xB5',
        'mid': '\u2223',
        'midast': '*',
        'midcir': '\u2AF0',
        'middot': '\xB7',
        'minus': '\u2212',
        'minusb': '\u229F',
        'minusd': '\u2238',
        'minusdu': '\u2A2A',
        'MinusPlus': '\u2213',
        'mlcp': '\u2ADB',
        'mldr': '\u2026',
        'mnplus': '\u2213',
        'models': '\u22A7',
        'mopf': '\uD835\uDD5E',
        'Mopf': '\uD835\uDD44',
        'mp': '\u2213',
        'mscr': '\uD835\uDCC2',
        'Mscr': '\u2133',
        'mstpos': '\u223E',
        'mu': '\u03BC',
        'Mu': '\u039C',
        'multimap': '\u22B8',
        'mumap': '\u22B8',
        'nabla': '\u2207',
        'nacute': '\u0144',
        'Nacute': '\u0143',
        'nang': '\u2220\u20D2',
        'nap': '\u2249',
        'napE': '\u2A70\u0338',
        'napid': '\u224B\u0338',
        'napos': '\u0149',
        'napprox': '\u2249',
        'natur': '\u266E',
        'natural': '\u266E',
        'naturals': '\u2115',
        'nbsp': '\xA0',
        'nbump': '\u224E\u0338',
        'nbumpe': '\u224F\u0338',
        'ncap': '\u2A43',
        'ncaron': '\u0148',
        'Ncaron': '\u0147',
        'ncedil': '\u0146',
        'Ncedil': '\u0145',
        'ncong': '\u2247',
        'ncongdot': '\u2A6D\u0338',
        'ncup': '\u2A42',
        'ncy': '\u043D',
        'Ncy': '\u041D',
        'ndash': '\u2013',
        'ne': '\u2260',
        'nearhk': '\u2924',
        'nearr': '\u2197',
        'neArr': '\u21D7',
        'nearrow': '\u2197',
        'nedot': '\u2250\u0338',
        'NegativeMediumSpace': '\u200B',
        'NegativeThickSpace': '\u200B',
        'NegativeThinSpace': '\u200B',
        'NegativeVeryThinSpace': '\u200B',
        'nequiv': '\u2262',
        'nesear': '\u2928',
        'nesim': '\u2242\u0338',
        'NestedGreaterGreater': '\u226B',
        'NestedLessLess': '\u226A',
        'NewLine': '\n',
        'nexist': '\u2204',
        'nexists': '\u2204',
        'nfr': '\uD835\uDD2B',
        'Nfr': '\uD835\uDD11',
        'nge': '\u2271',
        'ngE': '\u2267\u0338',
        'ngeq': '\u2271',
        'ngeqq': '\u2267\u0338',
        'ngeqslant': '\u2A7E\u0338',
        'nges': '\u2A7E\u0338',
        'nGg': '\u22D9\u0338',
        'ngsim': '\u2275',
        'ngt': '\u226F',
        'nGt': '\u226B\u20D2',
        'ngtr': '\u226F',
        'nGtv': '\u226B\u0338',
        'nharr': '\u21AE',
        'nhArr': '\u21CE',
        'nhpar': '\u2AF2',
        'ni': '\u220B',
        'nis': '\u22FC',
        'nisd': '\u22FA',
        'niv': '\u220B',
        'njcy': '\u045A',
        'NJcy': '\u040A',
        'nlarr': '\u219A',
        'nlArr': '\u21CD',
        'nldr': '\u2025',
        'nle': '\u2270',
        'nlE': '\u2266\u0338',
        'nleftarrow': '\u219A',
        'nLeftarrow': '\u21CD',
        'nleftrightarrow': '\u21AE',
        'nLeftrightarrow': '\u21CE',
        'nleq': '\u2270',
        'nleqq': '\u2266\u0338',
        'nleqslant': '\u2A7D\u0338',
        'nles': '\u2A7D\u0338',
        'nless': '\u226E',
        'nLl': '\u22D8\u0338',
        'nlsim': '\u2274',
        'nlt': '\u226E',
        'nLt': '\u226A\u20D2',
        'nltri': '\u22EA',
        'nltrie': '\u22EC',
        'nLtv': '\u226A\u0338',
        'nmid': '\u2224',
        'NoBreak': '\u2060',
        'NonBreakingSpace': '\xA0',
        'nopf': '\uD835\uDD5F',
        'Nopf': '\u2115',
        'not': '\xAC',
        'Not': '\u2AEC',
        'NotCongruent': '\u2262',
        'NotCupCap': '\u226D',
        'NotDoubleVerticalBar': '\u2226',
        'NotElement': '\u2209',
        'NotEqual': '\u2260',
        'NotEqualTilde': '\u2242\u0338',
        'NotExists': '\u2204',
        'NotGreater': '\u226F',
        'NotGreaterEqual': '\u2271',
        'NotGreaterFullEqual': '\u2267\u0338',
        'NotGreaterGreater': '\u226B\u0338',
        'NotGreaterLess': '\u2279',
        'NotGreaterSlantEqual': '\u2A7E\u0338',
        'NotGreaterTilde': '\u2275',
        'NotHumpDownHump': '\u224E\u0338',
        'NotHumpEqual': '\u224F\u0338',
        'notin': '\u2209',
        'notindot': '\u22F5\u0338',
        'notinE': '\u22F9\u0338',
        'notinva': '\u2209',
        'notinvb': '\u22F7',
        'notinvc': '\u22F6',
        'NotLeftTriangle': '\u22EA',
        'NotLeftTriangleBar': '\u29CF\u0338',
        'NotLeftTriangleEqual': '\u22EC',
        'NotLess': '\u226E',
        'NotLessEqual': '\u2270',
        'NotLessGreater': '\u2278',
        'NotLessLess': '\u226A\u0338',
        'NotLessSlantEqual': '\u2A7D\u0338',
        'NotLessTilde': '\u2274',
        'NotNestedGreaterGreater': '\u2AA2\u0338',
        'NotNestedLessLess': '\u2AA1\u0338',
        'notni': '\u220C',
        'notniva': '\u220C',
        'notnivb': '\u22FE',
        'notnivc': '\u22FD',
        'NotPrecedes': '\u2280',
        'NotPrecedesEqual': '\u2AAF\u0338',
        'NotPrecedesSlantEqual': '\u22E0',
        'NotReverseElement': '\u220C',
        'NotRightTriangle': '\u22EB',
        'NotRightTriangleBar': '\u29D0\u0338',
        'NotRightTriangleEqual': '\u22ED',
        'NotSquareSubset': '\u228F\u0338',
        'NotSquareSubsetEqual': '\u22E2',
        'NotSquareSuperset': '\u2290\u0338',
        'NotSquareSupersetEqual': '\u22E3',
        'NotSubset': '\u2282\u20D2',
        'NotSubsetEqual': '\u2288',
        'NotSucceeds': '\u2281',
        'NotSucceedsEqual': '\u2AB0\u0338',
        'NotSucceedsSlantEqual': '\u22E1',
        'NotSucceedsTilde': '\u227F\u0338',
        'NotSuperset': '\u2283\u20D2',
        'NotSupersetEqual': '\u2289',
        'NotTilde': '\u2241',
        'NotTildeEqual': '\u2244',
        'NotTildeFullEqual': '\u2247',
        'NotTildeTilde': '\u2249',
        'NotVerticalBar': '\u2224',
        'npar': '\u2226',
        'nparallel': '\u2226',
        'nparsl': '\u2AFD\u20E5',
        'npart': '\u2202\u0338',
        'npolint': '\u2A14',
        'npr': '\u2280',
        'nprcue': '\u22E0',
        'npre': '\u2AAF\u0338',
        'nprec': '\u2280',
        'npreceq': '\u2AAF\u0338',
        'nrarr': '\u219B',
        'nrArr': '\u21CF',
        'nrarrc': '\u2933\u0338',
        'nrarrw': '\u219D\u0338',
        'nrightarrow': '\u219B',
        'nRightarrow': '\u21CF',
        'nrtri': '\u22EB',
        'nrtrie': '\u22ED',
        'nsc': '\u2281',
        'nsccue': '\u22E1',
        'nsce': '\u2AB0\u0338',
        'nscr': '\uD835\uDCC3',
        'Nscr': '\uD835\uDCA9',
        'nshortmid': '\u2224',
        'nshortparallel': '\u2226',
        'nsim': '\u2241',
        'nsime': '\u2244',
        'nsimeq': '\u2244',
        'nsmid': '\u2224',
        'nspar': '\u2226',
        'nsqsube': '\u22E2',
        'nsqsupe': '\u22E3',
        'nsub': '\u2284',
        'nsube': '\u2288',
        'nsubE': '\u2AC5\u0338',
        'nsubset': '\u2282\u20D2',
        'nsubseteq': '\u2288',
        'nsubseteqq': '\u2AC5\u0338',
        'nsucc': '\u2281',
        'nsucceq': '\u2AB0\u0338',
        'nsup': '\u2285',
        'nsupe': '\u2289',
        'nsupE': '\u2AC6\u0338',
        'nsupset': '\u2283\u20D2',
        'nsupseteq': '\u2289',
        'nsupseteqq': '\u2AC6\u0338',
        'ntgl': '\u2279',
        'ntilde': '\xF1',
        'Ntilde': '\xD1',
        'ntlg': '\u2278',
        'ntriangleleft': '\u22EA',
        'ntrianglelefteq': '\u22EC',
        'ntriangleright': '\u22EB',
        'ntrianglerighteq': '\u22ED',
        'nu': '\u03BD',
        'Nu': '\u039D',
        'num': '#',
        'numero': '\u2116',
        'numsp': '\u2007',
        'nvap': '\u224D\u20D2',
        'nvdash': '\u22AC',
        'nvDash': '\u22AD',
        'nVdash': '\u22AE',
        'nVDash': '\u22AF',
        'nvge': '\u2265\u20D2',
        'nvgt': '>\u20D2',
        'nvHarr': '\u2904',
        'nvinfin': '\u29DE',
        'nvlArr': '\u2902',
        'nvle': '\u2264\u20D2',
        'nvlt': '<\u20D2',
        'nvltrie': '\u22B4\u20D2',
        'nvrArr': '\u2903',
        'nvrtrie': '\u22B5\u20D2',
        'nvsim': '\u223C\u20D2',
        'nwarhk': '\u2923',
        'nwarr': '\u2196',
        'nwArr': '\u21D6',
        'nwarrow': '\u2196',
        'nwnear': '\u2927',
        'oacute': '\xF3',
        'Oacute': '\xD3',
        'oast': '\u229B',
        'ocir': '\u229A',
        'ocirc': '\xF4',
        'Ocirc': '\xD4',
        'ocy': '\u043E',
        'Ocy': '\u041E',
        'odash': '\u229D',
        'odblac': '\u0151',
        'Odblac': '\u0150',
        'odiv': '\u2A38',
        'odot': '\u2299',
        'odsold': '\u29BC',
        'oelig': '\u0153',
        'OElig': '\u0152',
        'ofcir': '\u29BF',
        'ofr': '\uD835\uDD2C',
        'Ofr': '\uD835\uDD12',
        'ogon': '\u02DB',
        'ograve': '\xF2',
        'Ograve': '\xD2',
        'ogt': '\u29C1',
        'ohbar': '\u29B5',
        'ohm': '\u03A9',
        'oint': '\u222E',
        'olarr': '\u21BA',
        'olcir': '\u29BE',
        'olcross': '\u29BB',
        'oline': '\u203E',
        'olt': '\u29C0',
        'omacr': '\u014D',
        'Omacr': '\u014C',
        'omega': '\u03C9',
        'Omega': '\u03A9',
        'omicron': '\u03BF',
        'Omicron': '\u039F',
        'omid': '\u29B6',
        'ominus': '\u2296',
        'oopf': '\uD835\uDD60',
        'Oopf': '\uD835\uDD46',
        'opar': '\u29B7',
        'OpenCurlyDoubleQuote': '\u201C',
        'OpenCurlyQuote': '\u2018',
        'operp': '\u29B9',
        'oplus': '\u2295',
        'or': '\u2228',
        'Or': '\u2A54',
        'orarr': '\u21BB',
        'ord': '\u2A5D',
        'order': '\u2134',
        'orderof': '\u2134',
        'ordf': '\xAA',
        'ordm': '\xBA',
        'origof': '\u22B6',
        'oror': '\u2A56',
        'orslope': '\u2A57',
        'orv': '\u2A5B',
        'oS': '\u24C8',
        'oscr': '\u2134',
        'Oscr': '\uD835\uDCAA',
        'oslash': '\xF8',
        'Oslash': '\xD8',
        'osol': '\u2298',
        'otilde': '\xF5',
        'Otilde': '\xD5',
        'otimes': '\u2297',
        'Otimes': '\u2A37',
        'otimesas': '\u2A36',
        'ouml': '\xF6',
        'Ouml': '\xD6',
        'ovbar': '\u233D',
        'OverBar': '\u203E',
        'OverBrace': '\u23DE',
        'OverBracket': '\u23B4',
        'OverParenthesis': '\u23DC',
        'par': '\u2225',
        'para': '\xB6',
        'parallel': '\u2225',
        'parsim': '\u2AF3',
        'parsl': '\u2AFD',
        'part': '\u2202',
        'PartialD': '\u2202',
        'pcy': '\u043F',
        'Pcy': '\u041F',
        'percnt': '%',
        'period': '.',
        'permil': '\u2030',
        'perp': '\u22A5',
        'pertenk': '\u2031',
        'pfr': '\uD835\uDD2D',
        'Pfr': '\uD835\uDD13',
        'phi': '\u03C6',
        'Phi': '\u03A6',
        'phiv': '\u03D5',
        'phmmat': '\u2133',
        'phone': '\u260E',
        'pi': '\u03C0',
        'Pi': '\u03A0',
        'pitchfork': '\u22D4',
        'piv': '\u03D6',
        'planck': '\u210F',
        'planckh': '\u210E',
        'plankv': '\u210F',
        'plus': '+',
        'plusacir': '\u2A23',
        'plusb': '\u229E',
        'pluscir': '\u2A22',
        'plusdo': '\u2214',
        'plusdu': '\u2A25',
        'pluse': '\u2A72',
        'PlusMinus': '\xB1',
        'plusmn': '\xB1',
        'plussim': '\u2A26',
        'plustwo': '\u2A27',
        'pm': '\xB1',
        'Poincareplane': '\u210C',
        'pointint': '\u2A15',
        'popf': '\uD835\uDD61',
        'Popf': '\u2119',
        'pound': '\xA3',
        'pr': '\u227A',
        'Pr': '\u2ABB',
        'prap': '\u2AB7',
        'prcue': '\u227C',
        'pre': '\u2AAF',
        'prE': '\u2AB3',
        'prec': '\u227A',
        'precapprox': '\u2AB7',
        'preccurlyeq': '\u227C',
        'Precedes': '\u227A',
        'PrecedesEqual': '\u2AAF',
        'PrecedesSlantEqual': '\u227C',
        'PrecedesTilde': '\u227E',
        'preceq': '\u2AAF',
        'precnapprox': '\u2AB9',
        'precneqq': '\u2AB5',
        'precnsim': '\u22E8',
        'precsim': '\u227E',
        'prime': '\u2032',
        'Prime': '\u2033',
        'primes': '\u2119',
        'prnap': '\u2AB9',
        'prnE': '\u2AB5',
        'prnsim': '\u22E8',
        'prod': '\u220F',
        'Product': '\u220F',
        'profalar': '\u232E',
        'profline': '\u2312',
        'profsurf': '\u2313',
        'prop': '\u221D',
        'Proportion': '\u2237',
        'Proportional': '\u221D',
        'propto': '\u221D',
        'prsim': '\u227E',
        'prurel': '\u22B0',
        'pscr': '\uD835\uDCC5',
        'Pscr': '\uD835\uDCAB',
        'psi': '\u03C8',
        'Psi': '\u03A8',
        'puncsp': '\u2008',
        'qfr': '\uD835\uDD2E',
        'Qfr': '\uD835\uDD14',
        'qint': '\u2A0C',
        'qopf': '\uD835\uDD62',
        'Qopf': '\u211A',
        'qprime': '\u2057',
        'qscr': '\uD835\uDCC6',
        'Qscr': '\uD835\uDCAC',
        'quaternions': '\u210D',
        'quatint': '\u2A16',
        'quest': '?',
        'questeq': '\u225F',
        'quot': '"',
        'QUOT': '"',
        'rAarr': '\u21DB',
        'race': '\u223D\u0331',
        'racute': '\u0155',
        'Racute': '\u0154',
        'radic': '\u221A',
        'raemptyv': '\u29B3',
        'rang': '\u27E9',
        'Rang': '\u27EB',
        'rangd': '\u2992',
        'range': '\u29A5',
        'rangle': '\u27E9',
        'raquo': '\xBB',
        'rarr': '\u2192',
        'rArr': '\u21D2',
        'Rarr': '\u21A0',
        'rarrap': '\u2975',
        'rarrb': '\u21E5',
        'rarrbfs': '\u2920',
        'rarrc': '\u2933',
        'rarrfs': '\u291E',
        'rarrhk': '\u21AA',
        'rarrlp': '\u21AC',
        'rarrpl': '\u2945',
        'rarrsim': '\u2974',
        'rarrtl': '\u21A3',
        'Rarrtl': '\u2916',
        'rarrw': '\u219D',
        'ratail': '\u291A',
        'rAtail': '\u291C',
        'ratio': '\u2236',
        'rationals': '\u211A',
        'rbarr': '\u290D',
        'rBarr': '\u290F',
        'RBarr': '\u2910',
        'rbbrk': '\u2773',
        'rbrace': '}',
        'rbrack': ']',
        'rbrke': '\u298C',
        'rbrksld': '\u298E',
        'rbrkslu': '\u2990',
        'rcaron': '\u0159',
        'Rcaron': '\u0158',
        'rcedil': '\u0157',
        'Rcedil': '\u0156',
        'rceil': '\u2309',
        'rcub': '}',
        'rcy': '\u0440',
        'Rcy': '\u0420',
        'rdca': '\u2937',
        'rdldhar': '\u2969',
        'rdquo': '\u201D',
        'rdquor': '\u201D',
        'rdsh': '\u21B3',
        'Re': '\u211C',
        'real': '\u211C',
        'realine': '\u211B',
        'realpart': '\u211C',
        'reals': '\u211D',
        'rect': '\u25AD',
        'reg': '\xAE',
        'REG': '\xAE',
        'ReverseElement': '\u220B',
        'ReverseEquilibrium': '\u21CB',
        'ReverseUpEquilibrium': '\u296F',
        'rfisht': '\u297D',
        'rfloor': '\u230B',
        'rfr': '\uD835\uDD2F',
        'Rfr': '\u211C',
        'rHar': '\u2964',
        'rhard': '\u21C1',
        'rharu': '\u21C0',
        'rharul': '\u296C',
        'rho': '\u03C1',
        'Rho': '\u03A1',
        'rhov': '\u03F1',
        'RightAngleBracket': '\u27E9',
        'rightarrow': '\u2192',
        'Rightarrow': '\u21D2',
        'RightArrow': '\u2192',
        'RightArrowBar': '\u21E5',
        'RightArrowLeftArrow': '\u21C4',
        'rightarrowtail': '\u21A3',
        'RightCeiling': '\u2309',
        'RightDoubleBracket': '\u27E7',
        'RightDownTeeVector': '\u295D',
        'RightDownVector': '\u21C2',
        'RightDownVectorBar': '\u2955',
        'RightFloor': '\u230B',
        'rightharpoondown': '\u21C1',
        'rightharpoonup': '\u21C0',
        'rightleftarrows': '\u21C4',
        'rightleftharpoons': '\u21CC',
        'rightrightarrows': '\u21C9',
        'rightsquigarrow': '\u219D',
        'RightTee': '\u22A2',
        'RightTeeArrow': '\u21A6',
        'RightTeeVector': '\u295B',
        'rightthreetimes': '\u22CC',
        'RightTriangle': '\u22B3',
        'RightTriangleBar': '\u29D0',
        'RightTriangleEqual': '\u22B5',
        'RightUpDownVector': '\u294F',
        'RightUpTeeVector': '\u295C',
        'RightUpVector': '\u21BE',
        'RightUpVectorBar': '\u2954',
        'RightVector': '\u21C0',
        'RightVectorBar': '\u2953',
        'ring': '\u02DA',
        'risingdotseq': '\u2253',
        'rlarr': '\u21C4',
        'rlhar': '\u21CC',
        'rlm': '\u200F',
        'rmoust': '\u23B1',
        'rmoustache': '\u23B1',
        'rnmid': '\u2AEE',
        'roang': '\u27ED',
        'roarr': '\u21FE',
        'robrk': '\u27E7',
        'ropar': '\u2986',
        'ropf': '\uD835\uDD63',
        'Ropf': '\u211D',
        'roplus': '\u2A2E',
        'rotimes': '\u2A35',
        'RoundImplies': '\u2970',
        'rpar': ')',
        'rpargt': '\u2994',
        'rppolint': '\u2A12',
        'rrarr': '\u21C9',
        'Rrightarrow': '\u21DB',
        'rsaquo': '\u203A',
        'rscr': '\uD835\uDCC7',
        'Rscr': '\u211B',
        'rsh': '\u21B1',
        'Rsh': '\u21B1',
        'rsqb': ']',
        'rsquo': '\u2019',
        'rsquor': '\u2019',
        'rthree': '\u22CC',
        'rtimes': '\u22CA',
        'rtri': '\u25B9',
        'rtrie': '\u22B5',
        'rtrif': '\u25B8',
        'rtriltri': '\u29CE',
        'RuleDelayed': '\u29F4',
        'ruluhar': '\u2968',
        'rx': '\u211E',
        'sacute': '\u015B',
        'Sacute': '\u015A',
        'sbquo': '\u201A',
        'sc': '\u227B',
        'Sc': '\u2ABC',
        'scap': '\u2AB8',
        'scaron': '\u0161',
        'Scaron': '\u0160',
        'sccue': '\u227D',
        'sce': '\u2AB0',
        'scE': '\u2AB4',
        'scedil': '\u015F',
        'Scedil': '\u015E',
        'scirc': '\u015D',
        'Scirc': '\u015C',
        'scnap': '\u2ABA',
        'scnE': '\u2AB6',
        'scnsim': '\u22E9',
        'scpolint': '\u2A13',
        'scsim': '\u227F',
        'scy': '\u0441',
        'Scy': '\u0421',
        'sdot': '\u22C5',
        'sdotb': '\u22A1',
        'sdote': '\u2A66',
        'searhk': '\u2925',
        'searr': '\u2198',
        'seArr': '\u21D8',
        'searrow': '\u2198',
        'sect': '\xA7',
        'semi': ';',
        'seswar': '\u2929',
        'setminus': '\u2216',
        'setmn': '\u2216',
        'sext': '\u2736',
        'sfr': '\uD835\uDD30',
        'Sfr': '\uD835\uDD16',
        'sfrown': '\u2322',
        'sharp': '\u266F',
        'shchcy': '\u0449',
        'SHCHcy': '\u0429',
        'shcy': '\u0448',
        'SHcy': '\u0428',
        'ShortDownArrow': '\u2193',
        'ShortLeftArrow': '\u2190',
        'shortmid': '\u2223',
        'shortparallel': '\u2225',
        'ShortRightArrow': '\u2192',
        'ShortUpArrow': '\u2191',
        'shy': '\xAD',
        'sigma': '\u03C3',
        'Sigma': '\u03A3',
        'sigmaf': '\u03C2',
        'sigmav': '\u03C2',
        'sim': '\u223C',
        'simdot': '\u2A6A',
        'sime': '\u2243',
        'simeq': '\u2243',
        'simg': '\u2A9E',
        'simgE': '\u2AA0',
        'siml': '\u2A9D',
        'simlE': '\u2A9F',
        'simne': '\u2246',
        'simplus': '\u2A24',
        'simrarr': '\u2972',
        'slarr': '\u2190',
        'SmallCircle': '\u2218',
        'smallsetminus': '\u2216',
        'smashp': '\u2A33',
        'smeparsl': '\u29E4',
        'smid': '\u2223',
        'smile': '\u2323',
        'smt': '\u2AAA',
        'smte': '\u2AAC',
        'smtes': '\u2AAC\uFE00',
        'softcy': '\u044C',
        'SOFTcy': '\u042C',
        'sol': '/',
        'solb': '\u29C4',
        'solbar': '\u233F',
        'sopf': '\uD835\uDD64',
        'Sopf': '\uD835\uDD4A',
        'spades': '\u2660',
        'spadesuit': '\u2660',
        'spar': '\u2225',
        'sqcap': '\u2293',
        'sqcaps': '\u2293\uFE00',
        'sqcup': '\u2294',
        'sqcups': '\u2294\uFE00',
        'Sqrt': '\u221A',
        'sqsub': '\u228F',
        'sqsube': '\u2291',
        'sqsubset': '\u228F',
        'sqsubseteq': '\u2291',
        'sqsup': '\u2290',
        'sqsupe': '\u2292',
        'sqsupset': '\u2290',
        'sqsupseteq': '\u2292',
        'squ': '\u25A1',
        'square': '\u25A1',
        'Square': '\u25A1',
        'SquareIntersection': '\u2293',
        'SquareSubset': '\u228F',
        'SquareSubsetEqual': '\u2291',
        'SquareSuperset': '\u2290',
        'SquareSupersetEqual': '\u2292',
        'SquareUnion': '\u2294',
        'squarf': '\u25AA',
        'squf': '\u25AA',
        'srarr': '\u2192',
        'sscr': '\uD835\uDCC8',
        'Sscr': '\uD835\uDCAE',
        'ssetmn': '\u2216',
        'ssmile': '\u2323',
        'sstarf': '\u22C6',
        'star': '\u2606',
        'Star': '\u22C6',
        'starf': '\u2605',
        'straightepsilon': '\u03F5',
        'straightphi': '\u03D5',
        'strns': '\xAF',
        'sub': '\u2282',
        'Sub': '\u22D0',
        'subdot': '\u2ABD',
        'sube': '\u2286',
        'subE': '\u2AC5',
        'subedot': '\u2AC3',
        'submult': '\u2AC1',
        'subne': '\u228A',
        'subnE': '\u2ACB',
        'subplus': '\u2ABF',
        'subrarr': '\u2979',
        'subset': '\u2282',
        'Subset': '\u22D0',
        'subseteq': '\u2286',
        'subseteqq': '\u2AC5',
        'SubsetEqual': '\u2286',
        'subsetneq': '\u228A',
        'subsetneqq': '\u2ACB',
        'subsim': '\u2AC7',
        'subsub': '\u2AD5',
        'subsup': '\u2AD3',
        'succ': '\u227B',
        'succapprox': '\u2AB8',
        'succcurlyeq': '\u227D',
        'Succeeds': '\u227B',
        'SucceedsEqual': '\u2AB0',
        'SucceedsSlantEqual': '\u227D',
        'SucceedsTilde': '\u227F',
        'succeq': '\u2AB0',
        'succnapprox': '\u2ABA',
        'succneqq': '\u2AB6',
        'succnsim': '\u22E9',
        'succsim': '\u227F',
        'SuchThat': '\u220B',
        'sum': '\u2211',
        'Sum': '\u2211',
        'sung': '\u266A',
        'sup': '\u2283',
        'Sup': '\u22D1',
        'sup1': '\xB9',
        'sup2': '\xB2',
        'sup3': '\xB3',
        'supdot': '\u2ABE',
        'supdsub': '\u2AD8',
        'supe': '\u2287',
        'supE': '\u2AC6',
        'supedot': '\u2AC4',
        'Superset': '\u2283',
        'SupersetEqual': '\u2287',
        'suphsol': '\u27C9',
        'suphsub': '\u2AD7',
        'suplarr': '\u297B',
        'supmult': '\u2AC2',
        'supne': '\u228B',
        'supnE': '\u2ACC',
        'supplus': '\u2AC0',
        'supset': '\u2283',
        'Supset': '\u22D1',
        'supseteq': '\u2287',
        'supseteqq': '\u2AC6',
        'supsetneq': '\u228B',
        'supsetneqq': '\u2ACC',
        'supsim': '\u2AC8',
        'supsub': '\u2AD4',
        'supsup': '\u2AD6',
        'swarhk': '\u2926',
        'swarr': '\u2199',
        'swArr': '\u21D9',
        'swarrow': '\u2199',
        'swnwar': '\u292A',
        'szlig': '\xDF',
        'Tab': '\t',
        'target': '\u2316',
        'tau': '\u03C4',
        'Tau': '\u03A4',
        'tbrk': '\u23B4',
        'tcaron': '\u0165',
        'Tcaron': '\u0164',
        'tcedil': '\u0163',
        'Tcedil': '\u0162',
        'tcy': '\u0442',
        'Tcy': '\u0422',
        'tdot': '\u20DB',
        'telrec': '\u2315',
        'tfr': '\uD835\uDD31',
        'Tfr': '\uD835\uDD17',
        'there4': '\u2234',
        'therefore': '\u2234',
        'Therefore': '\u2234',
        'theta': '\u03B8',
        'Theta': '\u0398',
        'thetasym': '\u03D1',
        'thetav': '\u03D1',
        'thickapprox': '\u2248',
        'thicksim': '\u223C',
        'ThickSpace': '\u205F\u200A',
        'thinsp': '\u2009',
        'ThinSpace': '\u2009',
        'thkap': '\u2248',
        'thksim': '\u223C',
        'thorn': '\xFE',
        'THORN': '\xDE',
        'tilde': '\u02DC',
        'Tilde': '\u223C',
        'TildeEqual': '\u2243',
        'TildeFullEqual': '\u2245',
        'TildeTilde': '\u2248',
        'times': '\xD7',
        'timesb': '\u22A0',
        'timesbar': '\u2A31',
        'timesd': '\u2A30',
        'tint': '\u222D',
        'toea': '\u2928',
        'top': '\u22A4',
        'topbot': '\u2336',
        'topcir': '\u2AF1',
        'topf': '\uD835\uDD65',
        'Topf': '\uD835\uDD4B',
        'topfork': '\u2ADA',
        'tosa': '\u2929',
        'tprime': '\u2034',
        'trade': '\u2122',
        'TRADE': '\u2122',
        'triangle': '\u25B5',
        'triangledown': '\u25BF',
        'triangleleft': '\u25C3',
        'trianglelefteq': '\u22B4',
        'triangleq': '\u225C',
        'triangleright': '\u25B9',
        'trianglerighteq': '\u22B5',
        'tridot': '\u25EC',
        'trie': '\u225C',
        'triminus': '\u2A3A',
        'TripleDot': '\u20DB',
        'triplus': '\u2A39',
        'trisb': '\u29CD',
        'tritime': '\u2A3B',
        'trpezium': '\u23E2',
        'tscr': '\uD835\uDCC9',
        'Tscr': '\uD835\uDCAF',
        'tscy': '\u0446',
        'TScy': '\u0426',
        'tshcy': '\u045B',
        'TSHcy': '\u040B',
        'tstrok': '\u0167',
        'Tstrok': '\u0166',
        'twixt': '\u226C',
        'twoheadleftarrow': '\u219E',
        'twoheadrightarrow': '\u21A0',
        'uacute': '\xFA',
        'Uacute': '\xDA',
        'uarr': '\u2191',
        'uArr': '\u21D1',
        'Uarr': '\u219F',
        'Uarrocir': '\u2949',
        'ubrcy': '\u045E',
        'Ubrcy': '\u040E',
        'ubreve': '\u016D',
        'Ubreve': '\u016C',
        'ucirc': '\xFB',
        'Ucirc': '\xDB',
        'ucy': '\u0443',
        'Ucy': '\u0423',
        'udarr': '\u21C5',
        'udblac': '\u0171',
        'Udblac': '\u0170',
        'udhar': '\u296E',
        'ufisht': '\u297E',
        'ufr': '\uD835\uDD32',
        'Ufr': '\uD835\uDD18',
        'ugrave': '\xF9',
        'Ugrave': '\xD9',
        'uHar': '\u2963',
        'uharl': '\u21BF',
        'uharr': '\u21BE',
        'uhblk': '\u2580',
        'ulcorn': '\u231C',
        'ulcorner': '\u231C',
        'ulcrop': '\u230F',
        'ultri': '\u25F8',
        'umacr': '\u016B',
        'Umacr': '\u016A',
        'uml': '\xA8',
        'UnderBar': '_',
        'UnderBrace': '\u23DF',
        'UnderBracket': '\u23B5',
        'UnderParenthesis': '\u23DD',
        'Union': '\u22C3',
        'UnionPlus': '\u228E',
        'uogon': '\u0173',
        'Uogon': '\u0172',
        'uopf': '\uD835\uDD66',
        'Uopf': '\uD835\uDD4C',
        'uparrow': '\u2191',
        'Uparrow': '\u21D1',
        'UpArrow': '\u2191',
        'UpArrowBar': '\u2912',
        'UpArrowDownArrow': '\u21C5',
        'updownarrow': '\u2195',
        'Updownarrow': '\u21D5',
        'UpDownArrow': '\u2195',
        'UpEquilibrium': '\u296E',
        'upharpoonleft': '\u21BF',
        'upharpoonright': '\u21BE',
        'uplus': '\u228E',
        'UpperLeftArrow': '\u2196',
        'UpperRightArrow': '\u2197',
        'upsi': '\u03C5',
        'Upsi': '\u03D2',
        'upsih': '\u03D2',
        'upsilon': '\u03C5',
        'Upsilon': '\u03A5',
        'UpTee': '\u22A5',
        'UpTeeArrow': '\u21A5',
        'upuparrows': '\u21C8',
        'urcorn': '\u231D',
        'urcorner': '\u231D',
        'urcrop': '\u230E',
        'uring': '\u016F',
        'Uring': '\u016E',
        'urtri': '\u25F9',
        'uscr': '\uD835\uDCCA',
        'Uscr': '\uD835\uDCB0',
        'utdot': '\u22F0',
        'utilde': '\u0169',
        'Utilde': '\u0168',
        'utri': '\u25B5',
        'utrif': '\u25B4',
        'uuarr': '\u21C8',
        'uuml': '\xFC',
        'Uuml': '\xDC',
        'uwangle': '\u29A7',
        'vangrt': '\u299C',
        'varepsilon': '\u03F5',
        'varkappa': '\u03F0',
        'varnothing': '\u2205',
        'varphi': '\u03D5',
        'varpi': '\u03D6',
        'varpropto': '\u221D',
        'varr': '\u2195',
        'vArr': '\u21D5',
        'varrho': '\u03F1',
        'varsigma': '\u03C2',
        'varsubsetneq': '\u228A\uFE00',
        'varsubsetneqq': '\u2ACB\uFE00',
        'varsupsetneq': '\u228B\uFE00',
        'varsupsetneqq': '\u2ACC\uFE00',
        'vartheta': '\u03D1',
        'vartriangleleft': '\u22B2',
        'vartriangleright': '\u22B3',
        'vBar': '\u2AE8',
        'Vbar': '\u2AEB',
        'vBarv': '\u2AE9',
        'vcy': '\u0432',
        'Vcy': '\u0412',
        'vdash': '\u22A2',
        'vDash': '\u22A8',
        'Vdash': '\u22A9',
        'VDash': '\u22AB',
        'Vdashl': '\u2AE6',
        'vee': '\u2228',
        'Vee': '\u22C1',
        'veebar': '\u22BB',
        'veeeq': '\u225A',
        'vellip': '\u22EE',
        'verbar': '|',
        'Verbar': '\u2016',
        'vert': '|',
        'Vert': '\u2016',
        'VerticalBar': '\u2223',
        'VerticalLine': '|',
        'VerticalSeparator': '\u2758',
        'VerticalTilde': '\u2240',
        'VeryThinSpace': '\u200A',
        'vfr': '\uD835\uDD33',
        'Vfr': '\uD835\uDD19',
        'vltri': '\u22B2',
        'vnsub': '\u2282\u20D2',
        'vnsup': '\u2283\u20D2',
        'vopf': '\uD835\uDD67',
        'Vopf': '\uD835\uDD4D',
        'vprop': '\u221D',
        'vrtri': '\u22B3',
        'vscr': '\uD835\uDCCB',
        'Vscr': '\uD835\uDCB1',
        'vsubne': '\u228A\uFE00',
        'vsubnE': '\u2ACB\uFE00',
        'vsupne': '\u228B\uFE00',
        'vsupnE': '\u2ACC\uFE00',
        'Vvdash': '\u22AA',
        'vzigzag': '\u299A',
        'wcirc': '\u0175',
        'Wcirc': '\u0174',
        'wedbar': '\u2A5F',
        'wedge': '\u2227',
        'Wedge': '\u22C0',
        'wedgeq': '\u2259',
        'weierp': '\u2118',
        'wfr': '\uD835\uDD34',
        'Wfr': '\uD835\uDD1A',
        'wopf': '\uD835\uDD68',
        'Wopf': '\uD835\uDD4E',
        'wp': '\u2118',
        'wr': '\u2240',
        'wreath': '\u2240',
        'wscr': '\uD835\uDCCC',
        'Wscr': '\uD835\uDCB2',
        'xcap': '\u22C2',
        'xcirc': '\u25EF',
        'xcup': '\u22C3',
        'xdtri': '\u25BD',
        'xfr': '\uD835\uDD35',
        'Xfr': '\uD835\uDD1B',
        'xharr': '\u27F7',
        'xhArr': '\u27FA',
        'xi': '\u03BE',
        'Xi': '\u039E',
        'xlarr': '\u27F5',
        'xlArr': '\u27F8',
        'xmap': '\u27FC',
        'xnis': '\u22FB',
        'xodot': '\u2A00',
        'xopf': '\uD835\uDD69',
        'Xopf': '\uD835\uDD4F',
        'xoplus': '\u2A01',
        'xotime': '\u2A02',
        'xrarr': '\u27F6',
        'xrArr': '\u27F9',
        'xscr': '\uD835\uDCCD',
        'Xscr': '\uD835\uDCB3',
        'xsqcup': '\u2A06',
        'xuplus': '\u2A04',
        'xutri': '\u25B3',
        'xvee': '\u22C1',
        'xwedge': '\u22C0',
        'yacute': '\xFD',
        'Yacute': '\xDD',
        'yacy': '\u044F',
        'YAcy': '\u042F',
        'ycirc': '\u0177',
        'Ycirc': '\u0176',
        'ycy': '\u044B',
        'Ycy': '\u042B',
        'yen': '\xA5',
        'yfr': '\uD835\uDD36',
        'Yfr': '\uD835\uDD1C',
        'yicy': '\u0457',
        'YIcy': '\u0407',
        'yopf': '\uD835\uDD6A',
        'Yopf': '\uD835\uDD50',
        'yscr': '\uD835\uDCCE',
        'Yscr': '\uD835\uDCB4',
        'yucy': '\u044E',
        'YUcy': '\u042E',
        'yuml': '\xFF',
        'Yuml': '\u0178',
        'zacute': '\u017A',
        'Zacute': '\u0179',
        'zcaron': '\u017E',
        'Zcaron': '\u017D',
        'zcy': '\u0437',
        'Zcy': '\u0417',
        'zdot': '\u017C',
        'Zdot': '\u017B',
        'zeetrf': '\u2128',
        'ZeroWidthSpace': '\u200B',
        'zeta': '\u03B6',
        'Zeta': '\u0396',
        'zfr': '\uD835\uDD37',
        'Zfr': '\u2128',
        'zhcy': '\u0436',
        'ZHcy': '\u0416',
        'zigrarr': '\u21DD',
        'zopf': '\uD835\uDD6B',
        'Zopf': '\u2124',
        'zscr': '\uD835\uDCCF',
        'Zscr': '\uD835\uDCB5',
        'zwj': '\u200D',
        'zwnj': '\u200C'
      };
      var decodeMapLegacy = {
        'aacute': '\xE1',
        'Aacute': '\xC1',
        'acirc': '\xE2',
        'Acirc': '\xC2',
        'acute': '\xB4',
        'aelig': '\xE6',
        'AElig': '\xC6',
        'agrave': '\xE0',
        'Agrave': '\xC0',
        'amp': '&',
        'AMP': '&',
        'aring': '\xE5',
        'Aring': '\xC5',
        'atilde': '\xE3',
        'Atilde': '\xC3',
        'auml': '\xE4',
        'Auml': '\xC4',
        'brvbar': '\xA6',
        'ccedil': '\xE7',
        'Ccedil': '\xC7',
        'cedil': '\xB8',
        'cent': '\xA2',
        'copy': '\xA9',
        'COPY': '\xA9',
        'curren': '\xA4',
        'deg': '\xB0',
        'divide': '\xF7',
        'eacute': '\xE9',
        'Eacute': '\xC9',
        'ecirc': '\xEA',
        'Ecirc': '\xCA',
        'egrave': '\xE8',
        'Egrave': '\xC8',
        'eth': '\xF0',
        'ETH': '\xD0',
        'euml': '\xEB',
        'Euml': '\xCB',
        'frac12': '\xBD',
        'frac14': '\xBC',
        'frac34': '\xBE',
        'gt': '>',
        'GT': '>',
        'iacute': '\xED',
        'Iacute': '\xCD',
        'icirc': '\xEE',
        'Icirc': '\xCE',
        'iexcl': '\xA1',
        'igrave': '\xEC',
        'Igrave': '\xCC',
        'iquest': '\xBF',
        'iuml': '\xEF',
        'Iuml': '\xCF',
        'laquo': '\xAB',
        'lt': '<',
        'LT': '<',
        'macr': '\xAF',
        'micro': '\xB5',
        'middot': '\xB7',
        'nbsp': '\xA0',
        'not': '\xAC',
        'ntilde': '\xF1',
        'Ntilde': '\xD1',
        'oacute': '\xF3',
        'Oacute': '\xD3',
        'ocirc': '\xF4',
        'Ocirc': '\xD4',
        'ograve': '\xF2',
        'Ograve': '\xD2',
        'ordf': '\xAA',
        'ordm': '\xBA',
        'oslash': '\xF8',
        'Oslash': '\xD8',
        'otilde': '\xF5',
        'Otilde': '\xD5',
        'ouml': '\xF6',
        'Ouml': '\xD6',
        'para': '\xB6',
        'plusmn': '\xB1',
        'pound': '\xA3',
        'quot': '"',
        'QUOT': '"',
        'raquo': '\xBB',
        'reg': '\xAE',
        'REG': '\xAE',
        'sect': '\xA7',
        'shy': '\xAD',
        'sup1': '\xB9',
        'sup2': '\xB2',
        'sup3': '\xB3',
        'szlig': '\xDF',
        'thorn': '\xFE',
        'THORN': '\xDE',
        'times': '\xD7',
        'uacute': '\xFA',
        'Uacute': '\xDA',
        'ucirc': '\xFB',
        'Ucirc': '\xDB',
        'ugrave': '\xF9',
        'Ugrave': '\xD9',
        'uml': '\xA8',
        'uuml': '\xFC',
        'Uuml': '\xDC',
        'yacute': '\xFD',
        'Yacute': '\xDD',
        'yen': '\xA5',
        'yuml': '\xFF'
      };
      var decodeMapNumeric = {
        '0': '\uFFFD',
        '128': '\u20AC',
        '130': '\u201A',
        '131': '\u0192',
        '132': '\u201E',
        '133': '\u2026',
        '134': '\u2020',
        '135': '\u2021',
        '136': '\u02C6',
        '137': '\u2030',
        '138': '\u0160',
        '139': '\u2039',
        '140': '\u0152',
        '142': '\u017D',
        '145': '\u2018',
        '146': '\u2019',
        '147': '\u201C',
        '148': '\u201D',
        '149': '\u2022',
        '150': '\u2013',
        '151': '\u2014',
        '152': '\u02DC',
        '153': '\u2122',
        '154': '\u0161',
        '155': '\u203A',
        '156': '\u0153',
        '158': '\u017E',
        '159': '\u0178'
      };
      var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65000, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
      /*--------------------------------------------------------------------------*/

      var stringFromCharCode = String.fromCharCode;
      var object = {};
      var hasOwnProperty = object.hasOwnProperty;

      var has = function (object, propertyName) {
        return hasOwnProperty.call(object, propertyName);
      };

      var contains = function (array, value) {
        var index = -1;
        var length = array.length;

        while (++index < length) {
          if (array[index] == value) {
            return true;
          }
        }

        return false;
      };

      var merge = function (options, defaults) {
        if (!options) {
          return defaults;
        }

        var result = {};
        var key;

        for (key in defaults) {
          // A `hasOwnProperty` check is not needed here, since only recognized
          // option names are used anyway. Any others are ignored.
          result[key] = has(options, key) ? options[key] : defaults[key];
        }

        return result;
      }; // Modified version of `ucs2encode`; see https://mths.be/punycode.


      var codePointToSymbol = function (codePoint, strict) {
        var output = '';

        if (codePoint >= 0xD800 && codePoint <= 0xDFFF || codePoint > 0x10FFFF) {
          // See issue #4:
          // “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
          // greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
          // REPLACEMENT CHARACTER.”
          if (strict) {
            parseError('character reference outside the permissible Unicode range');
          }

          return '\uFFFD';
        }

        if (has(decodeMapNumeric, codePoint)) {
          if (strict) {
            parseError('disallowed character reference');
          }

          return decodeMapNumeric[codePoint];
        }

        if (strict && contains(invalidReferenceCodePoints, codePoint)) {
          parseError('disallowed character reference');
        }

        if (codePoint > 0xFFFF) {
          codePoint -= 0x10000;
          output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
          codePoint = 0xDC00 | codePoint & 0x3FF;
        }

        output += stringFromCharCode(codePoint);
        return output;
      };

      var hexEscape = function (codePoint) {
        return '&#x' + codePoint.toString(16).toUpperCase() + ';';
      };

      var decEscape = function (codePoint) {
        return '&#' + codePoint + ';';
      };

      var parseError = function (message) {
        throw Error('Parse error: ' + message);
      };
      /*--------------------------------------------------------------------------*/


      var encode = function (string, options) {
        options = merge(options, encode.options);
        var strict = options.strict;

        if (strict && regexInvalidRawCodePoint.test(string)) {
          parseError('forbidden code point');
        }

        var encodeEverything = options.encodeEverything;
        var useNamedReferences = options.useNamedReferences;
        var allowUnsafeSymbols = options.allowUnsafeSymbols;
        var escapeCodePoint = options.decimal ? decEscape : hexEscape;

        var escapeBmpSymbol = function (symbol) {
          return escapeCodePoint(symbol.charCodeAt(0));
        };

        if (encodeEverything) {
          // Encode ASCII symbols.
          string = string.replace(regexAsciiWhitelist, function (symbol) {
            // Use named references if requested & possible.
            if (useNamedReferences && has(encodeMap, symbol)) {
              return '&' + encodeMap[symbol] + ';';
            }

            return escapeBmpSymbol(symbol);
          }); // Shorten a few escapes that represent two symbols, of which at least one
          // is within the ASCII range.

          if (useNamedReferences) {
            string = string.replace(/&gt;\u20D2/g, '&nvgt;').replace(/&lt;\u20D2/g, '&nvlt;').replace(/&#x66;&#x6A;/g, '&fjlig;');
          } // Encode non-ASCII symbols.


          if (useNamedReferences) {
            // Encode non-ASCII symbols that can be replaced with a named reference.
            string = string.replace(regexEncodeNonAscii, function (string) {
              // Note: there is no need to check `has(encodeMap, string)` here.
              return '&' + encodeMap[string] + ';';
            });
          } // Note: any remaining non-ASCII symbols are handled outside of the `if`.

        } else if (useNamedReferences) {
          // Apply named character references.
          // Encode `<>"'&` using named character references.
          if (!allowUnsafeSymbols) {
            string = string.replace(regexEscape, function (string) {
              return '&' + encodeMap[string] + ';'; // no need to check `has()` here
            });
          } // Shorten escapes that represent two symbols, of which at least one is
          // `<>"'&`.


          string = string.replace(/&gt;\u20D2/g, '&nvgt;').replace(/&lt;\u20D2/g, '&nvlt;'); // Encode non-ASCII symbols that can be replaced with a named reference.

          string = string.replace(regexEncodeNonAscii, function (string) {
            // Note: there is no need to check `has(encodeMap, string)` here.
            return '&' + encodeMap[string] + ';';
          });
        } else if (!allowUnsafeSymbols) {
          // Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
          // using named character references.
          string = string.replace(regexEscape, escapeBmpSymbol);
        }

        return string // Encode astral symbols.
        .replace(regexAstralSymbols, function ($0) {
          // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          var high = $0.charCodeAt(0);
          var low = $0.charCodeAt(1);
          var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
          return escapeCodePoint(codePoint);
        }) // Encode any remaining BMP symbols that are not printable ASCII symbols
        // using a hexadecimal escape.
        .replace(regexBmpWhitelist, escapeBmpSymbol);
      }; // Expose default options (so they can be overridden globally).


      encode.options = {
        'allowUnsafeSymbols': false,
        'encodeEverything': false,
        'strict': false,
        'useNamedReferences': false,
        'decimal': false
      };

      var decode = function (html, options) {
        options = merge(options, decode.options);
        var strict = options.strict;

        if (strict && regexInvalidEntity.test(html)) {
          parseError('malformed character reference');
        }

        return html.replace(regexDecode, function ($0, $1, $2, $3, $4, $5, $6, $7, $8) {
          var codePoint;
          var semicolon;
          var decDigits;
          var hexDigits;
          var reference;
          var next;

          if ($1) {
            reference = $1; // Note: there is no need to check `has(decodeMap, reference)`.

            return decodeMap[reference];
          }

          if ($2) {
            // Decode named character references without trailing `;`, e.g. `&amp`.
            // This is only a parse error if it gets converted to `&`, or if it is
            // followed by `=` in an attribute context.
            reference = $2;
            next = $3;

            if (next && options.isAttributeValue) {
              if (strict && next == '=') {
                parseError('`&` did not start a character reference');
              }

              return $0;
            } else {
              if (strict) {
                parseError('named character reference was not terminated by a semicolon');
              } // Note: there is no need to check `has(decodeMapLegacy, reference)`.


              return decodeMapLegacy[reference] + (next || '');
            }
          }

          if ($4) {
            // Decode decimal escapes, e.g. `&#119558;`.
            decDigits = $4;
            semicolon = $5;

            if (strict && !semicolon) {
              parseError('character reference was not terminated by a semicolon');
            }

            codePoint = parseInt(decDigits, 10);
            return codePointToSymbol(codePoint, strict);
          }

          if ($6) {
            // Decode hexadecimal escapes, e.g. `&#x1D306;`.
            hexDigits = $6;
            semicolon = $7;

            if (strict && !semicolon) {
              parseError('character reference was not terminated by a semicolon');
            }

            codePoint = parseInt(hexDigits, 16);
            return codePointToSymbol(codePoint, strict);
          } // If we’re still here, `if ($7)` is implied; it’s an ambiguous
          // ampersand for sure. https://mths.be/notes/ambiguous-ampersands


          if (strict) {
            parseError('named character reference was not terminated by a semicolon');
          }

          return $0;
        });
      }; // Expose default options (so they can be overridden globally).


      decode.options = {
        'isAttributeValue': false,
        'strict': false
      };

      var escape = function (string) {
        return string.replace(regexEscape, function ($0) {
          // Note: there is no need to check `has(escapeMap, $0)` here.
          return escapeMap[$0];
        });
      };
      /*--------------------------------------------------------------------------*/


      var he = {
        'version': '1.2.0',
        'encode': encode,
        'decode': decode,
        'escape': escape,
        'unescape': decode
      }; // Some AMD build optimizers, like r.js, check for specific condition patterns
      // like the following:

      if (freeExports && !freeExports.nodeType) {
        if (freeModule) {
          // in Node.js, io.js, or RingoJS v0.8.0+
          freeModule.exports = he;
        } else {
          // in Narwhal or RingoJS v0.7.0-
          for (var key in he) {
            has(he, key) && (freeExports[key] = he[key]);
          }
        }
      } else {
        // in Rhino or a web browser
        root.he = he;
      }
    })(commonjsGlobal);
  });

  /* eslint no-unused-vars:0 */

  var defaultOpts = {
    fixBrokenEntities: true,
    removeWidows: true,
    convertEntities: true,
    convertDashes: true,
    convertApostrophes: true,
    replaceLineBreaks: true,
    removeLineBreaks: false,
    useXHTML: true,
    dontEncodeNonLatin: true,
    addMissingSpaces: true,
    convertDotsToEllipsis: true,
    stripHtml: true,
    eol: "lf",
    stripHtmlButIgnoreTags: ["b", "strong", "i", "em", "br", "sup"],
    stripHtmlAddNewLine: ["li", "/ul"],
    cb: null
  };
  var leftSingleQuote = "\u2018";
  var rightSingleQuote = "\u2019";
  var leftDoubleQuote = "\u201C";
  var rightDoubleQuote = "\u201D";
  var punctuationChars = [".", ",", ";", "!", "?"];
  var rawNDash = "\u2013";
  var rawMDash = "\u2014";
  var rawNbsp = "\xA0";
  var rawEllipsis = "\u2026";
  var widowRegexTest = /. ./g;
  var latinAndNonNonLatinRanges = [[0, 880], [887, 890], [894, 900], [906, 908], [908, 910], [929, 931], [1319, 1329], [1366, 1369], [1375, 1377], [1415, 1417], [1418, 1423], [1423, 1425], [1479, 1488], [1514, 1520], [1524, 1536], [1540, 1542], [1563, 1566], [1805, 1807], [1866, 1869], [1969, 1984], [2042, 2048], [2093, 2096], [2110, 2112], [2139, 2142], [2142, 2208], [2208, 2210], [2220, 2276], [2302, 2304], [2423, 2425], [2431, 2433], [2435, 2437], [2444, 2447], [2448, 2451], [2472, 2474], [2480, 2482], [2482, 2486], [2489, 2492], [2500, 2503], [2504, 2507], [2510, 2519], [2519, 2524], [2525, 2527], [2531, 2534], [2555, 2561], [2563, 2565], [2570, 2575], [2576, 2579], [2600, 2602], [2608, 2610], [2611, 2613], [2614, 2616], [2617, 2620], [2620, 2622], [2626, 2631], [2632, 2635], [2637, 2641], [2641, 2649], [2652, 2654], [2654, 2662], [2677, 2689], [2691, 2693], [2701, 2703], [2705, 2707], [2728, 2730], [2736, 2738], [2739, 2741], [2745, 2748], [2757, 2759], [2761, 2763], [2765, 2768], [2768, 2784], [2787, 2790], [2801, 2817], [2819, 2821], [2828, 2831], [2832, 2835], [2856, 2858], [2864, 2866], [2867, 2869], [2873, 2876], [2884, 2887], [2888, 2891], [2893, 2902], [2903, 2908], [2909, 2911], [2915, 2918], [2935, 2946], [2947, 2949], [2954, 2958], [2960, 2962], [2965, 2969], [2970, 2972], [2972, 2974], [2975, 2979], [2980, 2984], [2986, 2990], [3001, 3006], [3010, 3014], [3016, 3018], [3021, 3024], [3024, 3031], [3031, 3046], [3066, 3073], [3075, 3077], [3084, 3086], [3088, 3090], [3112, 3114], [3123, 3125], [3129, 3133], [3140, 3142], [3144, 3146], [3149, 3157], [3158, 3160], [3161, 3168], [3171, 3174], [3183, 3192], [3199, 3202], [3203, 3205], [3212, 3214], [3216, 3218], [3240, 3242], [3251, 3253], [3257, 3260], [3268, 3270], [3272, 3274], [3277, 3285], [3286, 3294], [3294, 3296], [3299, 3302], [3311, 3313], [3314, 3330], [3331, 3333], [3340, 3342], [3344, 3346], [3386, 3389], [3396, 3398], [3400, 3402], [3406, 3415], [3415, 3424], [3427, 3430], [3445, 3449], [3455, 3458], [3459, 3461], [3478, 3482], [3505, 3507], [3515, 3517], [3517, 3520], [3526, 3530], [3530, 3535], [3540, 3542], [3542, 3544], [3551, 3570], [3572, 3585], [3642, 3647], [3675, 3713], [3714, 3716], [3716, 3719], [3720, 3722], [3722, 3725], [3725, 3732], [3735, 3737], [3743, 3745], [3747, 3749], [3749, 3751], [3751, 3754], [3755, 3757], [3769, 3771], [3773, 3776], [3780, 3782], [3782, 3784], [3789, 3792], [3801, 3804], [3807, 3840], [3911, 3913], [3948, 3953], [3991, 3993], [4028, 4030], [4044, 4046], [4058, 4096], [4293, 4295], [4295, 4301], [4301, 4304], [4680, 4682], [4685, 4688], [4694, 4696], [4696, 4698], [4701, 4704], [4744, 4746], [4749, 4752], [4784, 4786], [4789, 4792], [4798, 4800], [4800, 4802], [4805, 4808], [4822, 4824], [4880, 4882], [4885, 4888], [4954, 4957], [4988, 4992], [5017, 5024], [5108, 5120], [5788, 5792], [5872, 5888], [5900, 5902], [5908, 5920], [5942, 5952], [5971, 5984], [5996, 5998], [6000, 6002], [6003, 6016], [6109, 6112], [6121, 6128], [6137, 6144], [6158, 6160], [6169, 6176], [6263, 6272], [6314, 7936], [7957, 7960], [7965, 7968], [8005, 8008], [8013, 8016], [8023, 8025], [8025, 8027], [8027, 8029], [8029, 8031], [8061, 8064], [8116, 8118], [8132, 8134], [8147, 8150], [8155, 8157], [8175, 8178], [8180, 8182], [8190, 11904], [11929, 11931], [12019, 12032], [12245, 12288], [12351, 12353], [12438, 12441], [12543, 12549], [12589, 12593], [12686, 12688], [12730, 12736], [12771, 12784], [12830, 12832], [13054, 13056], [13312, 19893], [19893, 19904], [40869, 40908], [40908, 40960], [42124, 42128], [42182, 42192], [42539, 42560], [42647, 42655], [42743, 42752], [42894, 42896], [42899, 42912], [42922, 43000], [43051, 43056], [43065, 43072], [43127, 43136], [43204, 43214], [43225, 43232], [43259, 43264], [43347, 43359], [43388, 43392], [43469, 43471], [43481, 43486], [43487, 43520], [43574, 43584], [43597, 43600], [43609, 43612], [43643, 43648], [43714, 43739], [43766, 43777], [43782, 43785], [43790, 43793], [43798, 43808], [43814, 43816], [43822, 43968], [44013, 44016], [44025, 44032], [55203, 55216], [55238, 55243], [55291, 63744], [64109, 64112], [64217, 64256], [64262, 64275], [64279, 64285], [64310, 64312], [64316, 64318], [64318, 64320], [64321, 64323], [64324, 64326], [64449, 64467], [64831, 64848], [64911, 64914], [64967, 65008], [65021, 65136], [65140, 65142], [65276, 66560], [66717, 66720], [66729, 67584], [67589, 67592], [67592, 67594], [67637, 67639], [67640, 67644], [67644, 67647], [67669, 67671], [67679, 67840], [67867, 67871], [67897, 67903], [67903, 67968], [68023, 68030], [68031, 68096], [68099, 68101], [68102, 68108], [68115, 68117], [68119, 68121], [68147, 68152], [68154, 68159], [68167, 68176], [68184, 68192], [68223, 68352], [68405, 68409], [68437, 68440], [68466, 68472], [68479, 68608], [68680, 69216], [69246, 69632], [69709, 69714], [69743, 69760], [69825, 69840], [69864, 69872], [69881, 69888], [69940, 69942], [69955, 70016], [70088, 70096], [70105, 71296], [71351, 71360], [71369, 73728], [74606, 74752], [74850, 74864], [74867, 77824], [78894, 92160], [92728, 93952], [94020, 94032], [94078, 94095], [94111, 110592], [110593, 131072], [131072, 173782], [173782, 173824], [173824, 177972], [177972, 177984], [177984, 178205], [178205, 194560]]; // https://html.spec.whatwg.org/multipage/syntax.html#elements-2

  var voidTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]; // -----------------------------------------------------------------------------

  /**
   * doConvertEntities - converts entities, optionally, skipping all non-latin characters.
   *
   * CHECKS AND CONSUMES o.dontEncodeNonLatin !
   * @param  {string} inputString incoming string
   * @return {string}             result
   */

  function doConvertEntities(inputString, dontEncodeNonLatin) {
    if (dontEncodeNonLatin) {
      // console.log(
      //   `427 doConvertEntities() - inside if (dontEncodeNonLatin) clauses`
      // );
      // split, check, encode conditionally
      return Array.from(inputString).map(function (_char) {
        // Separately check lower character indexes because statistically they are
        // most likely to be encountered. That's letters, quotes brackets and so on.
        // console.log(
        //   `435 doConvertEntities() - char = "${char}"; ${`\u001b[${33}m${`char.charCodeAt(0)`}\u001b[${39}m`} = ${JSON.stringify(
        //     char.charCodeAt(0),
        //     null,
        //     4
        //   )}`
        // );
        if (_char.charCodeAt(0) < 880 || latinAndNonNonLatinRanges.some(function (rangeArr) {
          return _char.charCodeAt(0) > rangeArr[0] && _char.charCodeAt(0) < rangeArr[1];
        })) {
          // console.log(
          //   `450 doConvertEntities() - encoding to "${he.encode(char, {
          //     useNamedReferences: true,
          //   })}"`
          // );
          return he.encode(_char, {
            useNamedReferences: true
          });
        }

        return _char;
      }).join("");
    } // console.log(`462 doConvertEntities() - outside if (dontEncodeNonLatin)`);
    // else, if dontEncodeNonLatin if off, just encode everything:


    return he.encode(inputString, {
      useNamedReferences: true
    });
  } // -----------------------------------------------------------------------------


  function isNumber(something) {
    return typeof something === "string" && something.charCodeAt(0) >= 48 && something.charCodeAt(0) <= 57 || Number.isInteger(something);
  }

  function isLetter(str) {
    return typeof str === "string" && str.length === 1 && str.toUpperCase() !== str.toLowerCase();
  }

  function isQuote(str) {
    return str === '"' || str === "'" || str === leftSingleQuote || str === rightSingleQuote || str === leftDoubleQuote || str === rightDoubleQuote;
  }

  function isLowercaseLetter(str) {
    if (!isLetter(str)) {
      return false;
    }

    return str === str.toLowerCase() && str !== str.toUpperCase();
  }

  function isUppercaseLetter(str) {
    if (!isLetter(str)) {
      return false;
    }

    return str === str.toUpperCase() && str !== str.toLowerCase();
  }

  // It is used by processOutside() which skips already processed ranges and
  // iterates over the remaining indexes. Also, it is used to validate the
  // encode entities - those are decoded and ran through this function as well.
  // That's why we need this fancy "y" - "up to" index and we can't make it
  // using simple "i + 1" - the "character" might be actually an encoded
  // chunk of characters. We separate the location of character(s)
  // (which could be expressed as string.slice(i, y)) and the value it
  // represents ("charcode").

  function processCharacter(str, opts, rangesArr, i, y, offsetBy, brClosingBracketIndexesArr, state, applicableOpts, endOfLine) {
    var len = str.length;

    if (/[\uD800-\uDFFF]/g.test(str[i]) && !(str.charCodeAt(i + 1) >= 0xdc00 && str.charCodeAt(i + 1) <= 0xdfff || str.charCodeAt(i - 1) >= 0xd800 && str.charCodeAt(i - 1) <= 0xdbff)) {
      // if it's a surrogate and another surrogate doesn't come in front or
      // follow, it's considered to be stray and liable for removal
      rangesArr.push(i, i + 1);
    } else if (y - i > 1) {
      applicableOpts.convertEntities = true;
      applicableOpts.dontEncodeNonLatin = applicableOpts.dontEncodeNonLatin || doConvertEntities(str.slice(i, y), true) !== doConvertEntities(str.slice(i, y), false); // if it's astral character which comprises of more than one character,
      // tackle it separately from "normal" charactrs of length === 1

      if (opts.convertEntities) {
        rangesArr.push(i, y, doConvertEntities(str.slice(i, y), opts.dontEncodeNonLatin));
      }
    } else {
      //
      //
      //
      //
      //
      //
      //
      // so it's single character.
      var charcode = str[i].charCodeAt(0); // Filter ASCII
      // the cutoff point is 127 not 128 because large chunk of invisibles, C1
      // group starts at DEL, decimal point 128.

      if (charcode < 127) {
        // within ASCII - no need to encode, just clean
        if (charcode < 32) {
          if (charcode < 9) {
            if (charcode === 3) {
              // that's \u0003, END OF TEXT - replace with line break
              rangesArr.push(i, y, opts.removeLineBreaks ? " " : opts.replaceLineBreaks ? "<br".concat(opts.useXHTML ? "/" : "", ">\n") : "\n");
              applicableOpts.removeLineBreaks = true;

              if (!opts.removeLineBreaks) {
                applicableOpts.replaceLineBreaks = true;

                if (opts.replaceLineBreaks) {
                  applicableOpts.useXHTML = true;
                }
              }
            } else {
              // charcodes: [0;2], [4;8] - remove these control chars
              rangesArr.push(i, y);
            } // continue to the next character (otherwise it would get encoded):
            // continue;

          } else if (charcode === 9) {
            // Replace all tabs, '\u0009', with spaces:
            rangesArr.push(i, y, " "); // continue to the next character (otherwise it would get encoded):
            // continue;
          } else if (charcode === 10) {
            // 10 - "\u000A" - line feed, LF or \n
            if (!applicableOpts.removeLineBreaks) {
              applicableOpts.removeLineBreaks = true;
            }

            if (!opts.removeLineBreaks && (!brClosingBracketIndexesArr || Array.isArray(brClosingBracketIndexesArr) && !brClosingBracketIndexesArr.some(function (idx) {
              return left(str, i) === idx;
            }))) {
              if (opts.replaceLineBreaks) {
                applicableOpts.useXHTML = true;
                applicableOpts.replaceLineBreaks = true;
              } else if (!opts.replaceLineBreaks) {
                // opts.replaceLineBreaks === false
                applicableOpts.replaceLineBreaks = true;
              }
            }

            if (!opts.removeLineBreaks) {
              applicableOpts.eol = true;
            } // won't run on CRLF, only on LF - the CR will be processed separately


            if (opts.removeLineBreaks) {
              // only remove replace with space if it's standalone, Mac-style
              // EOL ending, not Windows CRLF, because CR would have already
              // been replaced and replacing here would result in two spaces added
              var whatToInsert = " ";

              if (punctuationChars.includes(str[right(str, i)])) {
                whatToInsert = "";
              }

              rangesArr.push(i, y, whatToInsert);
            } else if (opts.replaceLineBreaks && (!brClosingBracketIndexesArr || Array.isArray(brClosingBracketIndexesArr) && !brClosingBracketIndexesArr.some(function (idx) {
              return left(str, i) === idx;
            }))) {
              // above, we check, is there a closing bracket of <br>.
              // All this contraption is necessary because br's can have HTML
              // attributes - you can't just match <br> or <br/> or <br />,
              // there can be ESP tags in non-HTML
              var startingIdx = i;

              if (str[i - 1] === " ") {
                startingIdx = leftStopAtNewLines(str, i) + 1;
              }

              rangesArr.push(startingIdx, i + (endOfLine === "\r" ? 1 : 0), "<br".concat(opts.useXHTML ? "/" : "", ">").concat(endOfLine === "\r\n" ? "\r" : "").concat(endOfLine === "\r" ? "\r" : ""));
            } else {
              //
              //
              // delete any whitespace to the left
              if (str[leftStopAtNewLines(str, i)].trim().length) {
                // delete trailing whitespace at the end of each line
                var tempIdx = leftStopAtNewLines(str, i);

                if (tempIdx < i - 1) {
                  rangesArr.push(tempIdx + 1, i, "".concat(endOfLine === "\r\n" ? "\r" : ""));
                }
              }

              if (endOfLine === "\r\n" && str[i - 1] !== "\r") {
                rangesArr.push(i, i, "\r");
              } else if (endOfLine === "\r") {
                rangesArr.push(i, i + 1);
              } // either way, delete any whitespace to the right


              if (str[rightStopAtNewLines(str, i)].trim().length) {
                var _tempIdx = rightStopAtNewLines(str, i);

                if (_tempIdx > i + 1) {
                  rangesArr.push(i + 1, _tempIdx);
                }
              }
            } //
            // URL detection:
            //
            // TODO - check state.onUrlCurrently


            state.onUrlCurrently = false;
          } else if (charcode === 11 || charcode === 12) {
            // 11 - "\u000B" - tab
            // 12 - "\u000C" - form feed
            applicableOpts.removeLineBreaks = true;
            rangesArr.push(i, y, opts.removeLineBreaks ? " " : "\n"); // continue;
          } else if (charcode === 13) {
            // 13 - "\u000D" - carriage return
            if (!applicableOpts.removeLineBreaks) {
              applicableOpts.removeLineBreaks = true;
            }

            if (!opts.removeLineBreaks && (!brClosingBracketIndexesArr || Array.isArray(brClosingBracketIndexesArr) && !brClosingBracketIndexesArr.some(function (idx) {
              return left(str, i) === idx;
            }))) {
              if (opts.replaceLineBreaks && !opts.removeLineBreaks) {
                applicableOpts.useXHTML = true;
                applicableOpts.replaceLineBreaks = true;
              } else if (!opts.replaceLineBreaks) {
                // opts.replaceLineBreaks === false
                applicableOpts.replaceLineBreaks = true;
              }
            }

            if (!opts.removeLineBreaks) {
              applicableOpts.eol = true;
            }

            if (opts.removeLineBreaks) {
              var _whatToInsert = " ";

              if (punctuationChars.includes(str[right(str, i)]) || ["\n", "\r"].includes(str[i + 1])) {
                _whatToInsert = "";
              }

              rangesArr.push(i, y, _whatToInsert);
            } else if (opts.replaceLineBreaks && (!brClosingBracketIndexesArr || Array.isArray(brClosingBracketIndexesArr) && !brClosingBracketIndexesArr.some(function (idx) {
              return left(str, i) === idx;
            }))) {
              var _startingIdx = i;

              if (str[i - 1] === " ") {
                _startingIdx = leftStopAtNewLines(str, i) + 1;
              }

              var endingIdx = i;
              var _whatToInsert2 = "";

              if (str[i + 1] !== "\n") {
                if (endOfLine === "\n") {
                  _whatToInsert2 = "\n";
                } else if (endOfLine === "\r\n") {
                  // add missing LF after current CR
                  rangesArr.push(i + 1, i + 1, "\n");
                }
              }

              if (endOfLine === "\n") {
                // extend this range to also delete this CR
                endingIdx = i + 1;
              } else if (endOfLine === "\r" && str[i + 1] === "\n") {
                // delete that LF from wrong CRLF set which is present
                rangesArr.push(i + 1, i + 2);
              }

              rangesArr.push(_startingIdx, endingIdx, "<br".concat(opts.useXHTML ? "/" : "", ">").concat(_whatToInsert2)); // skip the \n that follows

              if (str[i + 1] === "\n") {
                offsetBy(1);
              }
            } else {
              if (endOfLine === "\n") {
                rangesArr.push(i, i + 1, str[i + 1] === "\n" ? "" : "\n");
              } else if (endOfLine === "\r" && str[i + 1] === "\n") {
                // delete the LF that follows
                rangesArr.push(i + 1, i + 2);
              } else if (endOfLine === "\r\n" && str[i + 1] !== "\n") {
                // add LF afterwards
                rangesArr.push(i, i + 1, "\n");
              } // delete whitespace at the beginning and at the end of each line


              if (str[leftStopAtNewLines(str, i)].trim().length) {
                // delete trailing whitespace at the end of each line
                var _endingIdx = i;

                if (endOfLine === "\n") {
                  // extend this range to also delete this CR
                  _endingIdx = i + 1;
                }

                var _tempIdx2 = leftStopAtNewLines(str, i);

                if (_tempIdx2 < i - 1) {
                  rangesArr.push(_tempIdx2 + 1, _endingIdx, "".concat(str[i + 1] === "\n" ? "" : "\n"));
                }
              } // delete whitespace in front of each line


              if (str[rightStopAtNewLines(str, i)].trim().length && str[i + 1] !== "\n") {
                var _tempIdx3 = rightStopAtNewLines(str, i);

                if (_tempIdx3 > i + 1) {
                  rangesArr.push(i + 1, _tempIdx3);
                }
              }
            }
          } else if (charcode > 13) {
            // charcodes: [14;31] - remove these control chars
            rangesArr.push(i, y); // continue;
          }
        } else {
          // 32 <= charcode < 127
          // NO ENCODING HERE, JUST FIXES
          if (charcode === 32) ; else if (charcode === 34) {
            // IF DOUBLE QUOTE
            applicableOpts.convertEntities = true;

            if (isNumber(left(str, i)) || isNumber(right(str, i))) {
              applicableOpts.convertApostrophes = true;
            }

            var tempRes = convertOne(str, {
              from: i,
              convertEntities: opts.convertEntities,
              convertApostrophes: opts.convertApostrophes,
              offsetBy: offsetBy
            });

            if (tempRes && tempRes.length) {
              rangesArr.push(tempRes);
            } else if (opts.convertEntities) {
              rangesArr.push(i, i + 1, "&quot;");
            }
          } else if (charcode === 38) {
            // IF AMPERSAND, the &
            if (isLetter(str[i + 1])) {
              // it can be a named entity
              var temp = Object.keys(allNamedEntities).find(function (entName) {
                return str.startsWith(entName, i + 1) && str[i + entName.length + 1] === ";";
              });
              applicableOpts.convertEntities = true;

              if (temp) {
                if (temp === "apos") {
                  applicableOpts.convertApostrophes = true;
                  var decodedTempRes = convertOne(str, {
                    from: i,
                    to: i + temp.length + 2,
                    value: "'",
                    convertEntities: opts.convertEntities,
                    convertApostrophes: opts.convertApostrophes,
                    offsetBy: offsetBy
                  });

                  if (Array.isArray(decodedTempRes) && decodedTempRes.length) {
                    rangesArr.push(decodedTempRes);
                    offsetBy(temp.length + 2);
                  } else {
                    rangesArr.push([i, i + temp.length + 2, "'"]);
                    offsetBy(temp.length + 2);
                  }
                } else if (opts.convertEntities && Object.keys(notEmailFriendly).includes(str.slice(i + 1, i + temp.length + 1))) {
                  rangesArr.push(i, i + temp.length + 2, "&".concat(notEmailFriendly[str.slice(i + 1, i + temp.length + 1)], ";"));
                  offsetBy(temp.length + 1);
                } else if (!opts.convertEntities) {
                  rangesArr.push(i, i + temp.length + 2, he.decode("".concat(str.slice(i, i + temp.length + 2))));
                  offsetBy(temp.length + 1);
                } else {
                  // if opts.convertEntities
                  // just skip
                  offsetBy(temp.length + 1);
                }
              } else if (opts.convertEntities) {
                // no named entities matched, so encode the ampersand
                rangesArr.push(i, i + 1, "&amp;");
              }
            } else if (str[right(str, i)] === "#") {
              // it can be a numeric, a decimal or a hex entity
              for (var z = right(str, i); z < len; z++) {
                if (str[z].trim().length && !isNumber(str[z]) && str[z] !== "#") {
                  if (str[z] === ";") {
                    // it's numeric entity
                    var _tempRes = he.encode(he.decode(str.slice(i, z + 1)), {
                      useNamedReferences: true
                    });

                    if (_tempRes) {
                      rangesArr.push(i, z + 1, _tempRes);
                    }

                    offsetBy(z + 1 - i);
                  }
                }
              }
            } else {
              applicableOpts.convertEntities = true;

              if (opts.convertEntities) {
                // encode it
                rangesArr.push(i, i + 1, "&amp;");
              }
            }
          } else if (charcode === 39) {
            // IF SINGLE QUOTE OR APOSTROPHE, the '
            // first, calculate theoretical maximum setting and set applicable rules
            // based on it
            var _temp = convertOne(str, {
              from: i,
              convertEntities: true,
              convertApostrophes: true
            });

            if (_temp.length) {
              applicableOpts.convertApostrophes = true;

              if (opts.convertApostrophes) {
                applicableOpts.convertEntities = true;
              }

              rangesArr.push(convertOne(str, {
                from: i,
                convertEntities: opts.convertEntities,
                convertApostrophes: opts.convertApostrophes,
                offsetBy: offsetBy
              }));
            }
          } else if (charcode === 44 || charcode === 59) {
            // IF COMMA (,) OR SEMICOLON (;)
            // 1. check for whitespace leading to colon or semicolon
            if (str[i - 1] && !str[i - 1].trim().length) {
              var whatsOnTheLeft = left(str, i);

              if (whatsOnTheLeft < i - 1) {
                rangesArr.push(whatsOnTheLeft + 1, i);
              }
            } // 2. comma-specific


            if (charcode === 44 && str[y] !== undefined && !state.onUrlCurrently && !isNumber(str[y]) && str[y].trim().length && str[y] !== " " && str[y] !== "\n" && str[y] !== '"' && str[y] !== "'" && str[y] !== leftSingleQuote && str[y] !== leftDoubleQuote && str[y] !== rightSingleQuote && str[y] !== rightDoubleQuote) {
              // comma, not on URL, not followed by number = add space afterwards
              applicableOpts.addMissingSpaces = true;

              if (opts.addMissingSpaces) {
                rangesArr.push(y, y, " ");
              }
            } // 3. semicolon-specific


            if (charcode === 59 && str[y] !== undefined && !state.onUrlCurrently && str[y].trim().length && str[y] !== "&" && str[y] !== '"' && str[y] !== "'" && str[y] !== leftSingleQuote && str[y] !== leftDoubleQuote && str[y] !== rightSingleQuote && str[y] !== rightDoubleQuote) {
              applicableOpts.addMissingSpaces = true;

              if (opts.addMissingSpaces) {
                rangesArr.push(y, y, " ");
              }
            }
          } else if (charcode === 45) {
            // IF MINUS SIGN / HYPHEN
            // don't mess up if minus is between two numbers
            if (str[i - 1] === " " && str[y] === " " && isNumber(str[left(str, i)]) && isNumber(str[right(str, y)])) ; else {
              // add space after minus/dash character if there's nbsp or space in front of it,
              // but the next character is not currency or digit.
              // That's to prevent the space addition in front of legit minuses.
              if ((str[i - 1] === rawNbsp || str[i - 1] === " ") && str[y] !== "$" && str[y] !== "£" && str[y] !== "€" && str[y] !== "₽" && str[y] !== "0" && str[y] !== "1" && str[y] !== "2" && str[y] !== "3" && str[y] !== "4" && str[y] !== "5" && str[y] !== "6" && str[y] !== "7" && str[y] !== "8" && str[y] !== "9" && str[y] !== "-" && str[y] !== ">" && str[y] !== " ") {
                applicableOpts.addMissingSpaces = true;

                if (opts.addMissingSpaces) {
                  // add space after it:
                  rangesArr.push(y, y, " ");
                }
              } else if (str[i - 1] && str[y] && (isNumber(str[i - 1]) && isNumber(str[y]) || str[i - 1].toLowerCase() === "a" && str[y].toLowerCase() === "z")) {
                applicableOpts.convertDashes = true;

                if (opts.convertDashes) {
                  applicableOpts.convertEntities = true;
                  rangesArr.push(i, y, opts.convertEntities ? "&ndash;" : "\u2013");
                }
              } else if (str[i - 1] && str[y] && (str[i - 1].trim().length === 0 && str[y].trim().length === 0 || isLowercaseLetter(str[i - 1]) && str[y] === "'")) {
                applicableOpts.convertDashes = true;

                if (opts.convertDashes) {
                  applicableOpts.convertEntities = true;
                  rangesArr.push(i, y, opts.convertEntities ? "&mdash;" : rawMDash);
                }
              } else if (str[i - 1] && str[y] && isLetter(str[i - 1]) && isQuote(str[y])) {
                applicableOpts.convertDashes = true;

                if (opts.convertDashes) {
                  applicableOpts.convertEntities = true; // direct speech breaks off

                  rangesArr.push(i, y, opts.convertEntities ? "&mdash;" : rawMDash);
                }
              }
            } // tackle widow word setting - space in front when opts.removeWidows is on


            if (str[i - 2] && str[i - 2].trim().length && !str[i - 1].trim().length && !["\n", "\r"].includes(str[i - 1])) {
              // 1. mark option as applicable
              applicableOpts.removeWidows = true; // 2. if option is on, apply it

              if (opts.removeWidows) {
                applicableOpts.convertEntities = true;
                rangesArr.push(i - 1, i, opts.convertEntities ? "&nbsp;" : rawNbsp);
              }
            }
          } else if (charcode === 46) {
            // IF DOT CHARACTER
            //
            // 1. convert first of three and only three dots to ellipsis, encode
            // if needed
            // TODO - improve matching to account for possible spaces between dots
            if (str[i - 1] !== "." && str[y] === "." && str[y + 1] === "." && str[y + 2] !== ".") {
              applicableOpts.convertDotsToEllipsis = true;

              if (opts.convertDotsToEllipsis) {
                applicableOpts.convertEntities = true;
                rangesArr.push(i, y + 2, opts.convertEntities ? "&hellip;" : "".concat(rawEllipsis));
              }
            } // 2. add missing space after full stop or comma except on extensions and URL's


            var first = str[y] ? str[y].toLowerCase() : "";
            var second = str[y + 1] ? str[y + 1].toLowerCase() : "";
            var third = str[y + 2] ? str[y + 2].toLowerCase() : "";
            var fourth = str[y + 3] ? str[y + 3].toLowerCase() : "";
            var nextThreeChars = first + second + third;

            if (first + second !== "js" && nextThreeChars !== "jpg" && nextThreeChars !== "png" && nextThreeChars !== "gif" && nextThreeChars !== "svg" && nextThreeChars !== "htm" && nextThreeChars !== "pdf" && nextThreeChars !== "psd" && nextThreeChars !== "tar" && nextThreeChars !== "zip" && nextThreeChars !== "rar" && nextThreeChars !== "otf" && nextThreeChars !== "ttf" && nextThreeChars !== "eot" && nextThreeChars !== "php" && nextThreeChars !== "rss" && nextThreeChars !== "asp" && nextThreeChars !== "ppt" && nextThreeChars !== "doc" && nextThreeChars !== "txt" && nextThreeChars !== "rtf" && nextThreeChars !== "git" && nextThreeChars + fourth !== "jpeg" && nextThreeChars + fourth !== "html" && nextThreeChars + fourth !== "woff" && !(!isLetter(str[i - 2]) && str[i - 1] === "p" && str[y] === "s" && str[y + 1] === "t" && !isLetter(str[y + 2]))) {
              // two tasks: deleting any spaces before and adding spaces after
              //
              // 2-1. ADDING A MISSING SPACE AFTER IT:
              if (str[y] !== undefined && ( // - When it's not within a URL, the requirement for next letter to be uppercase letter.
              //   This prevents both numbers with decimal digits and short url's like "detergent.io"
              // - When it's within URL, it's stricter:
              //   next letter has to be an uppercase letter, followed by lowercase letter.
              !state.onUrlCurrently && isUppercaseLetter(str[y]) || state.onUrlCurrently && isLetter(str[y]) && isUppercaseLetter(str[y]) && isLetter(str[y + 1]) && isLowercaseLetter(str[y + 1])) && str[y] !== " " && str[y] !== "." && str[y] !== "\n") {
                applicableOpts.addMissingSpaces = true;

                if (opts.addMissingSpaces) {
                  rangesArr.push(y, y, " ");
                }
              } // 2-2. REMOVING SPACES BEFORE IT:


              if (str[i - 1] !== undefined && str[i - 1].trim() === "" && str[y] !== "." && (str[i - 2] === undefined || str[i - 2] !== ".") // that's for cases: "aaa. . " < observe second dot.
              ) {
                  // march backwards
                  for (y = i - 1; y--;) {
                    if (str[y].trim() !== "") {
                      rangesArr.push(y + 1, i);
                      break;
                    }
                  }
                }
            }
          } else if (charcode === 47) ; else if (charcode === 58) {
            // IF COLON (:)
            //
            // URL detection
            //
            if (str[y - 1] && str[right(str, y - 1)] === "/" && str[right(str, right(str, y - 1))] === "/") {
              state.onUrlCurrently = true;
            }
          } else if (charcode === 60) {
            // IF LESS THAN SIGN, <
            applicableOpts.convertEntities = true;

            if (opts.convertEntities) {
              rangesArr.push(i, i + 1, "&lt;");
            }
          } else if (charcode === 62) {
            // IF GREATER THAN SIGN, >
            applicableOpts.convertEntities = true;

            if (opts.convertEntities) {
              rangesArr.push(i, i + 1, "&gt;");
            }
          } else if (charcode === 119) {
            // IF LETTER w
            //
            // URL detection
            //
            if (str[y + 1] && str[y].toLowerCase() === "w" && str[y + 1].toLowerCase() === "w") {
              state.onUrlCurrently = true;
            }
          } else if (charcode === 123) {
            // opening curly bracket {
            // check for following {{ and {%, if following skip until closing found
            var stopUntil;

            if (str[y] === "{") {
              stopUntil = "}}";
            } else if (str[y] === "%") {
              stopUntil = "%}";
            } // PS. whitespace limiting with dashes like {%- zz -%} don't matter
            // because dashes sit inside and will be caught by standard {%..%}


            if (stopUntil) {
              for (var _z = i; _z < len; _z++) {
                if (str[_z] === stopUntil[0] && str[_z + 1] === stopUntil[1]) {
                  offsetBy(_z + 1 - i);
                  break;
                }
              } // if end is reached and closing counterpart is not found,
              // nothing happens.

            }
          }
        }
      } else {
        // >= 127
        // outside ASCII, need to encode (unless requested not to)
        // plan - filter all characters for deletion and leave reset (ELSE) to
        // be encoded
        if (charcode > 126 && charcode < 160) {
          // C1 group
          if (charcode !== 133) {
            // over thirty characters, so they are statistically more likely to happen:
            rangesArr.push(i, y);
          } else {
            // only codepoint 133 - Next Line (NEL), statistically less probable
            // so it comes second:
            applicableOpts.removeLineBreaks = true;
            rangesArr.push(i, y, opts.removeLineBreaks ? "" : "\n");
          }
        } else if (charcode === 173) {
          // IF SOFT HYPHEN, '\u00AD'
          rangesArr.push(i, y);
        } else if (charcode === 8232 || charcode === 8233) {
          // '\u2028', '\u2029'
          applicableOpts.removeLineBreaks = true;
          rangesArr.push(i, y, opts.removeLineBreaks ? "" : "\n");
        } else if ([5760, 8191, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288].includes(charcode)) {
          // replace with spaces from
          // https://www.fileformat.info/info/unicode/category/Zs/list.htm
          // - ogham space marks (#5760), '\u1680'
          // - en quad (#8192), '\u2000'
          // - em quad (#8193), '\u2001'
          // - en space (#8194), '\u2002'
          // - em space (#8195), '\u2003'
          // - three-per-em-space (#8196), '\u2004'
          // - four-per-em-space (#8197), '\u2005'
          // - six-per-em-space (#8198), '\u2006'
          // - figure space (#8199), '\u2007'
          // - punctuation space (#8200), '\u2008'
          // - thin space (#8201), '\u2009'
          // - hair space (#8202), '\u200A'
          // - narrow no break space (#8239), '\u202F'
          // - medium mathematical space (#8287), '\u205F'
          // - ideographic space (#12288), '\u3000'
          if (!str[y]) {
            rangesArr.push(i, y);
          } else {
            // rangesArr.push(i, y, " ");
            var expandedRange = expander({
              str: str,
              from: i,
              to: y,
              wipeAllWhitespaceOnLeft: true,
              wipeAllWhitespaceOnRight: true,
              addSingleSpaceToPreventAccidentalConcatenation: true
            });
            rangesArr.push.apply(rangesArr, _toConsumableArray(expandedRange));
          }
        } else if (charcode === 8206) {
          // remove all left-to-right mark chars, '\u200E'
          rangesArr.push(i, y);
        } else if (charcode === 8207) {
          // remove all right-to-right mark chars, '\u200F'
          rangesArr.push(i, y);
        } else if (charcode === 8211 || charcode === 65533 && isNumber(str[i - 1]) && isNumber(str[y])) {
          // IF N-DASH, '\u2013'
          applicableOpts.convertDashes = true;

          if (!opts.convertDashes) {
            rangesArr.push(i, y, "-");
          } else {
            applicableOpts.convertEntities = true;

            if (opts.convertEntities) {
              // if it's space-ndash-space, put m-dash instead
              if (str[i - 1] && !str[i - 1].trim().length && str[i + 1] && !str[i + 1].trim().length && !(isNumber(str[i - 2]) && isNumber(str[i + 2]))) {
                rangesArr.push(i, y, "&mdash;");
              } else {
                // ELSE - n-dash stays
                rangesArr.push(i, y, "&ndash;");
              }
            } else if (charcode === 65533) {
              if (str[i - 1] && !str[i - 1].trim().length && str[i + 1] && !str[i + 1].trim().length) {
                rangesArr.push(i, y, rawMDash);
              } else {
                rangesArr.push(i, y, rawNDash);
              }
            }
          } // if there's space in front but no space after:
          // ---------------------------------------------


          if (str[i - 1] && str[i - 1].trim().length === 0 && str[y].trim().length !== 0) {
            if (str[i - 2] && isNumber(str[i - 2]) && isNumber(str[y])) {
              rangesArr.push(i - 1, i);
            } else {
              applicableOpts.addMissingSpaces = true;
              applicableOpts.convertEntities = true; // 1.
              // add space after

              if (opts.addMissingSpaces) {
                var whatToAdd = " "; // imagine case "10am&nbsp;&ndash;11am" - we're adding space
                // before "11am", but there needs to be non-breaking space because
                // widow removal is on

                if (!widowRegexTest.test(str.slice(y))) {
                  applicableOpts.removeWidows = true;

                  if (opts.removeWidows) {
                    whatToAdd = opts.convertEntities ? "&nbsp;" : rawNbsp;
                  }
                }

                rangesArr.push(y, y, whatToAdd);
              } // 2.
              // replace space in front with non-breaking space if widow removal is on


              if (str.slice(i - 1, i) !== rawNbsp) {
                applicableOpts.removeWidows = true;

                if (opts.removeWidows) {
                  rangesArr.push(i - 1, i, opts.convertEntities ? "&nbsp;" : rawNbsp);
                }
              }
            }
          } else if (str[i - 2] && str[i - 1] && str[y] && str[y + 1] && isNumber(str[i - 2]) && isNumber(str[y + 1]) && str[i - 1].trim().length === 0 && str[y].trim().length === 0) {
            // delete spaces around n-dash if those are number strings
            rangesArr.push(i - 1, i);
            rangesArr.push(y, y + 1);
          } // Also, if it is mistakenly put instead of an m-dash, we need to tackle
          // the widow word, space in front of it within this clause.


          if (str[i - 2] && str[i + 1] && !str[i - 1].trim().length && str[i - 2].trim().length && !str[i + 1].trim().length && !(isNumber(str[i - 2]) && isNumber(str[i + 2]))) {
            // 1. report as applicable
            applicableOpts.removeWidows = true;

            if (opts.removeWidows) {
              // 2. replace the space
              rangesArr.push(i - 1, i, opts.convertEntities ? "&nbsp;" : rawNbsp);
            }
          }
        } else if (charcode === 8212 || charcode === 65533 && str[i - 1] === " " && str[y] === " ") {
          // IF RAW M-DASH, '\u2014'
          applicableOpts.convertDashes = true; // replace spaces in front with nbsp if widow removal is on

          if (str[i - 1] === " " && left(str, i) !== null) {
            applicableOpts.removeWidows = true;

            if (opts.removeWidows) {
              applicableOpts.convertEntities = true;
              rangesArr.push(left(str, i) + 1, i, opts.convertEntities ? "&nbsp;" : rawNbsp);
            }
          } // tackle conversion into hyphen and surrounding spaces


          if (!opts.convertDashes) {
            rangesArr.push(i, y, "-");
          } else {
            applicableOpts.convertEntities = true; // 1. if there's space in front but no space after M-dash, add one after

            if (str[i - 1] && str[i - 1].trim().length === 0 && str[y].trim().length !== 0) {
              applicableOpts.addMissingSpaces = true;

              if (opts.addMissingSpaces) {
                rangesArr.push(y, y, " ");
              }
            } // 2. encode if applicable


            if (opts.convertEntities) {
              rangesArr.push(i, y, "&mdash;");
            } else if (charcode === 65533) {
              rangesArr.push(i, y, rawMDash);
            }
          }
        } else if (charcode === 8216) {
          // IF UNENCODED LEFT SINGLE QUOTE
          var _tempRes2 = convertOne(str, {
            from: i,
            to: y,
            convertEntities: true,
            convertApostrophes: true
          });

          if (_tempRes2 && _tempRes2.length) {
            applicableOpts.convertApostrophes = true;

            var _tempRes3 = convertOne(str, {
              from: i,
              to: y,
              convertEntities: true,
              convertApostrophes: true
            });

            if (_tempRes3) {
              if (opts.convertApostrophes) {
                applicableOpts.convertEntities = true;
              }

              rangesArr.push(convertOne(str, {
                from: i,
                to: y,
                convertEntities: opts.convertEntities,
                convertApostrophes: opts.convertApostrophes,
                offsetBy: offsetBy
              }));
            }
          }
        } else if (charcode === 8217) {
          // IF UNENCODED RIGHT SINGLE QUOTE
          applicableOpts.convertApostrophes = true;

          if (!opts.convertApostrophes) {
            rangesArr.push(i, y, "'");
          } else {
            applicableOpts.convertEntities = true;

            if (opts.convertEntities) {
              rangesArr.push(i, y, "&rsquo;");
            }
          }
        } else if (charcode === 8220) {
          // IF UNENCODED LEFT DOUBLE QUOTE
          applicableOpts.convertApostrophes = true;

          if (!opts.convertApostrophes) {
            applicableOpts.convertEntities = true;
            rangesArr.push(i, y, opts.convertEntities ? "&quot;" : "\"");
          } else if (opts.convertEntities) {
            applicableOpts.convertEntities = true;
            rangesArr.push(i, y, "&ldquo;");
          }
        } else if (charcode === 8221) {
          // IF UNENCODED RIGHT DOUBLE QUOTE
          applicableOpts.convertApostrophes = true;

          if (!opts.convertApostrophes) {
            applicableOpts.convertEntities = true;
            rangesArr.push(i, y, opts.convertEntities ? "&quot;" : "\"");
          } else if (opts.convertEntities) {
            applicableOpts.convertEntities = true;
            rangesArr.push(i, y, "&rdquo;");
          }
        } else if (charcode === 8230) {
          // IF UNENCODED HORIZONTAL ELLIPSIS CHARACTER &hellip;
          applicableOpts.convertDotsToEllipsis = true;

          if (!opts.convertDotsToEllipsis) {
            rangesArr.push(i, y, "...");
          } else {
            applicableOpts.convertEntities = true;

            if (opts.convertEntities) {
              rangesArr.push(i, y, "&hellip;");
            }
          }
        } else if (charcode === 65279) {
          // IF BOM, '\uFEFF'
          rangesArr.push(i, y);
        } else {
          //
          //
          // ENCODE (on by default, but can be turned off)
          //
          //
          if (!applicableOpts.dontEncodeNonLatin && doConvertEntities(str[i], true) !== doConvertEntities(str[i], false)) {
            applicableOpts.dontEncodeNonLatin = true;
          } // try to convert the current character into HTML entities.


          var convertedCharVal = doConvertEntities(str[i], opts.dontEncodeNonLatin);

          if (Object.keys(notEmailFriendly).includes(convertedCharVal.slice(1, convertedCharVal.length - 1))) {
            convertedCharVal = "&".concat(notEmailFriendly[convertedCharVal.slice(1, convertedCharVal.length - 1)], ";");
          } // 2. If the result is different from the original character, this means
          // that this character needs to be encoded. We will submit this character's
          // range up for replacement.


          if (str[i] !== convertedCharVal) {
            applicableOpts.convertEntities = true; // here

            if (opts.convertEntities) {
              if (convertedCharVal === "&mldr;") {
                rangesArr.push(i, y, "&hellip;");
              } else if (convertedCharVal !== "&apos;") {
                rangesArr.push(i, y, convertedCharVal);
              }

              applicableOpts.convertEntities = true;
            }
          }
        }
      }

      if (state.onUrlCurrently && !str[i].trim().length) {
        state.onUrlCurrently = false;
      } //
      //
      //
      //
      //
      //
      //

    }
  }

  /**
   * arrayiffy-if-string
   * Put non-empty strings into arrays, turn empty-ones into empty arrays. Bypass everything else.
   * Version: 3.11.27
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/arrayiffy-if-string
   */
  function arrayiffyString(something) {
    if (typeof something === "string") {
      if (something.length > 0) {
        return [something];
      }

      return [];
    }

    return something;
  }

  /**
   * string-match-left-right
   * Do substrings match what's on the left or right of a given index?
   * Version: 4.0.1
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-match-left-right
   */

  function isObj(something) {
    return something && typeof something === "object" && !Array.isArray(something);
  }

  function isStr$2(something) {
    return typeof something === "string";
  }

  function march(str, fromIndexInclusive, whatToMatchVal, opts, special, getNextIdx) {
    const whatToMatchValVal = typeof whatToMatchVal === "function" ? whatToMatchVal() : whatToMatchVal;

    if (fromIndexInclusive < 0 && special && whatToMatchValVal === "EOL") {
      return whatToMatchValVal;
    }

    if (fromIndexInclusive >= str.length && !special) {
      return false;
    }

    let charsToCheckCount = special ? 1 : whatToMatchVal.length;
    let lastWasMismatched = false;
    let atLeastSomethingWasMatched = false;
    let patience = opts.maxMismatches;
    let i = fromIndexInclusive;
    let somethingFound = false;
    let firstCharacterMatched = false;
    let lastCharacterMatched = false;

    while (str[i]) {
      const nextIdx = getNextIdx(i);

      if (opts.trimBeforeMatching && str[i].trim() === "") {
        if (!str[nextIdx] && special && whatToMatchVal === "EOL") {
          return true;
        }

        i = getNextIdx(i);
        continue;
      }

      if (!opts.i && opts.trimCharsBeforeMatching.includes(str[i]) || opts.i && opts.trimCharsBeforeMatching.map(val => val.toLowerCase()).includes(str[i].toLowerCase())) {
        if (special && whatToMatchVal === "EOL" && !str[nextIdx]) {
          return true;
        }

        i = getNextIdx(i);
        continue;
      }

      const charToCompareAgainst = nextIdx > i ? whatToMatchVal[whatToMatchVal.length - charsToCheckCount] : whatToMatchVal[charsToCheckCount - 1];

      if (!opts.i && str[i] === charToCompareAgainst || opts.i && str[i].toLowerCase() === charToCompareAgainst.toLowerCase()) {
        if (!somethingFound) {
          somethingFound = true;
        }

        if (!atLeastSomethingWasMatched) {
          atLeastSomethingWasMatched = true;
        }

        if (charsToCheckCount === whatToMatchVal.length) {
          firstCharacterMatched = true;
        } else if (charsToCheckCount === 1) {
          lastCharacterMatched = true;
        }

        charsToCheckCount -= 1;

        if (charsToCheckCount < 1) {
          return i;
        }
      } else {
        if (opts.maxMismatches && patience && i) {
          patience--;

          for (let y = 0; y <= patience; y++) {
            const nextCharToCompareAgainst = nextIdx > i ? whatToMatchVal[whatToMatchVal.length - charsToCheckCount + 1 + y] : whatToMatchVal[charsToCheckCount - 2 - y];
            const nextCharInSource = str[getNextIdx(i)];

            if (nextCharToCompareAgainst && (!opts.i && str[i] === nextCharToCompareAgainst || opts.i && str[i].toLowerCase() === nextCharToCompareAgainst.toLowerCase()) && (!opts.firstMustMatch || charsToCheckCount !== whatToMatchVal.length)) {
              charsToCheckCount -= 2;
              somethingFound = true;
              break;
            } else if (nextCharInSource && nextCharToCompareAgainst && (!opts.i && nextCharInSource === nextCharToCompareAgainst || opts.i && nextCharInSource.toLowerCase() === nextCharToCompareAgainst.toLowerCase()) && (!opts.firstMustMatch || charsToCheckCount !== whatToMatchVal.length)) {
              charsToCheckCount -= 1;
              somethingFound = true;
              break;
            } else if (nextCharToCompareAgainst === undefined && patience >= 0 && somethingFound && (!opts.firstMustMatch || firstCharacterMatched) && (!opts.lastMustMatch || lastCharacterMatched)) {
              return i;
            }
          }

          if (!somethingFound) {
            lastWasMismatched = i;
          }
        } else if (i === 0 && charsToCheckCount === 1 && !opts.lastMustMatch && atLeastSomethingWasMatched) {
          return 0;
        } else {
          return false;
        }
      }

      if (lastWasMismatched !== false && lastWasMismatched !== i) {
        lastWasMismatched = false;
      }

      if (charsToCheckCount < 1) {
        return i;
      }

      i = getNextIdx(i);
    }

    if (charsToCheckCount > 0) {
      if (special && whatToMatchValVal === "EOL") {
        return true;
      } else if (opts.maxMismatches >= charsToCheckCount && atLeastSomethingWasMatched) {
        return lastWasMismatched || 0;
      }

      return false;
    }
  }

  function main(mode, str, position, originalWhatToMatch, originalOpts) {
    const defaults = {
      i: false,
      trimBeforeMatching: false,
      trimCharsBeforeMatching: [],
      maxMismatches: 0,
      firstMustMatch: false,
      lastMustMatch: false
    };

    if (isObj(originalOpts) && Object.prototype.hasOwnProperty.call(originalOpts, "trimBeforeMatching") && typeof originalOpts.trimBeforeMatching !== "boolean") {
      throw new Error(`string-match-left-right/${mode}(): [THROW_ID_09] opts.trimBeforeMatching should be boolean!${Array.isArray(originalOpts.trimBeforeMatching) ? ` Did you mean to use opts.trimCharsBeforeMatching?` : ""}`);
    }

    const opts = Object.assign({}, defaults, originalOpts);
    opts.trimCharsBeforeMatching = arrayiffyString(opts.trimCharsBeforeMatching);
    opts.trimCharsBeforeMatching = opts.trimCharsBeforeMatching.map(el => isStr$2(el) ? el : String(el));

    if (!isStr$2(str)) {
      return false;
    } else if (!str.length) {
      return false;
    }

    if (!Number.isInteger(position) || position < 0) {
      throw new Error(`string-match-left-right/${mode}(): [THROW_ID_03] the second argument should be a natural number. Currently it's of a type: ${typeof position}, equal to:\n${JSON.stringify(position, null, 4)}`);
    }

    let whatToMatch;
    let special;

    if (isStr$2(originalWhatToMatch)) {
      whatToMatch = [originalWhatToMatch];
    } else if (Array.isArray(originalWhatToMatch)) {
      whatToMatch = originalWhatToMatch;
    } else if (!originalWhatToMatch) {
      whatToMatch = originalWhatToMatch;
    } else if (typeof originalWhatToMatch === "function") {
      whatToMatch = [];
      whatToMatch.push(originalWhatToMatch);
    } else {
      throw new Error(`string-match-left-right/${mode}(): [THROW_ID_05] the third argument, whatToMatch, is neither string nor array of strings! It's ${typeof originalWhatToMatch}, equal to:\n${JSON.stringify(originalWhatToMatch, null, 4)}`);
    }

    if (originalOpts && !isObj(originalOpts)) {
      throw new Error(`string-match-left-right/${mode}(): [THROW_ID_06] the fourth argument, options object, should be a plain object. Currently it's of a type "${typeof originalOpts}", and equal to:\n${JSON.stringify(originalOpts, null, 4)}`);
    }

    let culpritsIndex;
    let culpritsVal;

    if (opts.trimCharsBeforeMatching.some((el, i) => {
      if (el.length > 1) {
        culpritsIndex = i;
        culpritsVal = el;
        return true;
      }

      return false;
    })) {
      throw new Error(`string-match-left-right/${mode}(): [THROW_ID_07] the fourth argument, options object contains trimCharsBeforeMatching. It was meant to list the single characters but one of the entries at index ${culpritsIndex} is longer than 1 character, ${culpritsVal.length} (equals to ${culpritsVal}). Please split it into separate characters and put into array as separate elements.`);
    }

    if (!whatToMatch || !Array.isArray(whatToMatch) || Array.isArray(whatToMatch) && !whatToMatch.length || Array.isArray(whatToMatch) && whatToMatch.length === 1 && isStr$2(whatToMatch[0]) && !whatToMatch[0].trim().length) {
      if (typeof opts.cb === "function") {
        let firstCharOutsideIndex;
        let startingPosition = position;

        if (mode === "matchLeftIncl" || mode === "matchRight") {
          startingPosition += 1;
        }

        if (mode[5] === "L") {
          for (let y = startingPosition; y--;) {
            const currentChar = str[y];

            if ((!opts.trimBeforeMatching || opts.trimBeforeMatching && currentChar !== undefined && currentChar.trim().length) && (!opts.trimCharsBeforeMatching.length || currentChar !== undefined && !opts.trimCharsBeforeMatching.includes(currentChar))) {
              firstCharOutsideIndex = y;
              break;
            }
          }
        } else if (mode.startsWith("matchRight")) {
          for (let y = startingPosition; y < str.length; y++) {
            const currentChar = str[y];

            if ((!opts.trimBeforeMatching || opts.trimBeforeMatching && currentChar.trim().length) && (!opts.trimCharsBeforeMatching.length || !opts.trimCharsBeforeMatching.includes(currentChar))) {
              firstCharOutsideIndex = y;
              break;
            }
          }
        }

        if (firstCharOutsideIndex === undefined) {
          return false;
        }

        const wholeCharacterOutside = str[firstCharOutsideIndex];
        const indexOfTheCharacterAfter = firstCharOutsideIndex + 1;
        let theRemainderOfTheString = "";

        if (indexOfTheCharacterAfter && indexOfTheCharacterAfter > 0) {
          theRemainderOfTheString = str.slice(0, indexOfTheCharacterAfter);
        }

        if (mode[5] === "L") {
          return opts.cb(wholeCharacterOutside, theRemainderOfTheString, firstCharOutsideIndex);
        }

        if (firstCharOutsideIndex && firstCharOutsideIndex > 0) {
          theRemainderOfTheString = str.slice(firstCharOutsideIndex);
        }

        return opts.cb(wholeCharacterOutside, theRemainderOfTheString, firstCharOutsideIndex);
      }

      let extraNote = "";

      if (!originalOpts) {
        extraNote = " More so, the whole options object, the fourth input argument, is missing!";
      }

      throw new Error(`string-match-left-right/${mode}(): [THROW_ID_08] the third argument, "whatToMatch", was given as an empty string. This means, you intend to match purely by a callback. The callback was not set though, the opts key "cb" is not set!${extraNote}`);
    }

    for (let i = 0, len = whatToMatch.length; i < len; i++) {
      special = typeof whatToMatch[i] === "function";
      const whatToMatchVal = whatToMatch[i];
      let fullCharacterInFront;
      let indexOfTheCharacterInFront;
      let restOfStringInFront = "";
      let startingPosition = position;

      if (mode === "matchRight") {
        startingPosition++;
      } else if (mode === "matchLeft") {
        startingPosition--;
      }

      const found = march(str, startingPosition, whatToMatchVal, opts, special, i => mode[5] === "L" ? i - 1 : i + 1);

      if (found && special && typeof whatToMatchVal === "function" && whatToMatchVal() === "EOL") {
        return whatToMatchVal() && (opts.cb ? opts.cb(fullCharacterInFront, restOfStringInFront, indexOfTheCharacterInFront) : true) ? whatToMatchVal() : false;
      }

      if (Number.isInteger(found)) {
        indexOfTheCharacterInFront = mode.startsWith("matchLeft") ? found - 1 : found + 1;

        if (mode[5] === "L") {
          restOfStringInFront = str.slice(0, found);
        } else {
          restOfStringInFront = str.slice(indexOfTheCharacterInFront);
        }
      }

      if (indexOfTheCharacterInFront < 0) {
        indexOfTheCharacterInFront = undefined;
      }

      if (str[indexOfTheCharacterInFront]) {
        fullCharacterInFront = str[indexOfTheCharacterInFront];
      }

      if (Number.isInteger(found) && (opts.cb ? opts.cb(fullCharacterInFront, restOfStringInFront, indexOfTheCharacterInFront) : true)) {
        return whatToMatchVal;
      }
    }

    return false;
  }

  function matchLeftIncl(str, position, whatToMatch, opts) {
    return main("matchLeftIncl", str, position, whatToMatch, opts);
  }

  function matchRightIncl(str, position, whatToMatch, opts) {
    return main("matchRightIncl", str, position, whatToMatch, opts);
  }

  /**
   * string-collapse-leading-whitespace
   * Collapse the leading and trailing whitespace of a string
   * Version: 2.0.13
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-collapse-leading-whitespace
   */
  const rawNbsp$1 = "\u00A0";

  function push(arr, leftSide = true, charToPush) {
    if (!charToPush.trim().length && (!arr.length || charToPush === "\n" || charToPush === rawNbsp$1 || (leftSide ? arr[arr.length - 1] : arr[0]) !== " ") && (!arr.length || (leftSide ? arr[arr.length - 1] : arr[0]) !== "\n" || charToPush === "\n" || charToPush === rawNbsp$1)) {
      if (leftSide) {
        if ((charToPush === "\n" || charToPush === rawNbsp$1) && arr.length && arr[arr.length - 1] === " ") {
          while (arr.length && arr[arr.length - 1] === " ") {
            arr.pop();
          }
        }

        arr.push(charToPush === rawNbsp$1 || charToPush === "\n" ? charToPush : " ");
      } else {
        if ((charToPush === "\n" || charToPush === rawNbsp$1) && arr.length && arr[0] === " ") {
          while (arr.length && arr[0] === " ") {
            arr.shift();
          }
        }

        arr.unshift(charToPush === rawNbsp$1 || charToPush === "\n" ? charToPush : " ");
      }
    }
  }

  function collapseLeadingWhitespace(str, originalLimitLinebreaksCount) {
    if (typeof str === "string" && str.length) {
      let windowsEol = false;

      if (str.includes("\r\n")) {
        windowsEol = true;
      }

      let limitLinebreaksCount;

      if (!originalLimitLinebreaksCount || typeof originalLimitLinebreaksCount !== "number") {
        limitLinebreaksCount = 1;
      } else {
        limitLinebreaksCount = originalLimitLinebreaksCount;
      }

      let limit;

      if (str.trim() === "") {
        const resArr = [];
        limit = limitLinebreaksCount;
        Array.from(str).forEach(char => {
          if (char !== "\n" || limit) {
            if (char === "\n") {
              limit--;
            }

            push(resArr, true, char);
          }
        });

        while (resArr.length > 1 && resArr[resArr.length - 1] === " ") {
          resArr.pop();
        }

        return resArr.join("");
      }

      const startCharacter = [];
      limit = limitLinebreaksCount;

      if (str[0].trim() === "") {
        for (let i = 0, len = str.length; i < len; i++) {
          if (str[i].trim().length !== 0) {
            break;
          } else {
            if (str[i] !== "\n" || limit) {
              if (str[i] === "\n") {
                limit--;
              }

              push(startCharacter, true, str[i]);
            }
          }
        }
      }

      const endCharacter = [];
      limit = limitLinebreaksCount;

      if (str.slice(-1).trim() === "") {
        for (let i = str.length; i--;) {
          if (str[i].trim().length !== 0) {
            break;
          } else {
            if (str[i] !== "\n" || limit) {
              if (str[i] === "\n") {
                limit--;
              }

              push(endCharacter, false, str[i]);
            }
          }
        }
      }

      if (!windowsEol) {
        return startCharacter.join("") + str.trim() + endCharacter.join("");
      }

      return `${startCharacter.join("")}${str.trim()}${endCharacter.join("")}`.replace(/\n/g, "\r\n");
    }

    return str;
  }

  /**
   * ranges-push
   * Manage the array of ranges referencing the index ranges within the string
   * Version: 3.7.2
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-push
   */

  function existy$1(x) {
    return x != null;
  }

  function isNum$1(something) {
    return Number.isInteger(something) && something >= 0;
  }

  function isStr$3(something) {
    return typeof something === "string";
  }

  function prepNumStr(str) {
    return /^\d*$/.test(str) ? parseInt(str, 10) : str;
  }

  class Ranges {
    constructor(originalOpts) {
      const defaults = {
        limitToBeAddedWhitespace: false,
        limitLinebreaksCount: 1,
        mergeType: 1
      };
      const opts = Object.assign({}, defaults, originalOpts);

      if (opts.mergeType && opts.mergeType !== 1 && opts.mergeType !== 2) {
        if (isStr$3(opts.mergeType) && opts.mergeType.trim() === "1") {
          opts.mergeType = 1;
        } else if (isStr$3(opts.mergeType) && opts.mergeType.trim() === "2") {
          opts.mergeType = 2;
        } else {
          throw new Error(`ranges-push: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof opts.mergeType}", equal to ${JSON.stringify(opts.mergeType, null, 4)}`);
        }
      }

      this.opts = opts;
    }

    add(originalFrom, originalTo, addVal, ...etc) {
      if (etc.length > 0) {
        throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_03] Please don't overload the add() method. From the 4th input argument onwards we see these redundant arguments: ${JSON.stringify(etc, null, 4)}`);
      }

      if (!existy$1(originalFrom) && !existy$1(originalTo)) {
        return;
      } else if (existy$1(originalFrom) && !existy$1(originalTo)) {
        if (Array.isArray(originalFrom)) {
          if (originalFrom.length) {
            if (originalFrom.some(el => Array.isArray(el))) {
              originalFrom.forEach(thing => {
                if (Array.isArray(thing)) {
                  this.add(...thing);
                }
              });
              return;
            } else if (originalFrom.length > 1 && isNum$1(prepNumStr(originalFrom[0])) && isNum$1(prepNumStr(originalFrom[1]))) {
              this.add(...originalFrom);
            }
          }

          return;
        }

        throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_12] the first input argument, "from" is set (${JSON.stringify(originalFrom, null, 0)}) but second-one, "to" is not (${JSON.stringify(originalTo, null, 0)})`);
      } else if (!existy$1(originalFrom) && existy$1(originalTo)) {
        throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_13] the second input argument, "to" is set (${JSON.stringify(originalTo, null, 0)}) but first-one, "from" is not (${JSON.stringify(originalFrom, null, 0)})`);
      }

      const from = /^\d*$/.test(originalFrom) ? parseInt(originalFrom, 10) : originalFrom;
      const to = /^\d*$/.test(originalTo) ? parseInt(originalTo, 10) : originalTo;

      if (isNum$1(addVal)) {
        addVal = String(addVal);
      }

      if (isNum$1(from) && isNum$1(to)) {
        if (existy$1(addVal) && !isStr$3(addVal) && !isNum$1(addVal)) {
          throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_08] The third argument, the value to add, was given not as string but ${typeof addVal}, equal to:\n${JSON.stringify(addVal, null, 4)}`);
        }

        if (existy$1(this.slices) && Array.isArray(this.last()) && from === this.last()[1]) {
          this.last()[1] = to;
          if (this.last()[2] === null || addVal === null) ;

          if (this.last()[2] !== null && existy$1(addVal)) {
            let calculatedVal = existy$1(this.last()[2]) && this.last()[2].length > 0 && (!this.opts || !this.opts.mergeType || this.opts.mergeType === 1) ? this.last()[2] + addVal : addVal;

            if (this.opts.limitToBeAddedWhitespace) {
              calculatedVal = collapseLeadingWhitespace(calculatedVal, this.opts.limitLinebreaksCount);
            }

            if (!(isStr$3(calculatedVal) && !calculatedVal.length)) {
              this.last()[2] = calculatedVal;
            }
          }
        } else {
          if (!this.slices) {
            this.slices = [];
          }

          const whatToPush = addVal !== undefined && !(isStr$3(addVal) && !addVal.length) ? [from, to, this.opts.limitToBeAddedWhitespace ? collapseLeadingWhitespace(addVal, this.opts.limitLinebreaksCount) : addVal] : [from, to];
          this.slices.push(whatToPush);
        }
      } else {
        if (!(isNum$1(from) && from >= 0)) {
          throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_09] "from" value, the first input argument, must be a natural number or zero! Currently it's of a type "${typeof from}" equal to: ${JSON.stringify(from, null, 4)}`);
        } else {
          throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_10] "to" value, the second input argument, must be a natural number or zero! Currently it's of a type "${typeof to}" equal to: ${JSON.stringify(to, null, 4)}`);
        }
      }
    }

    push(originalFrom, originalTo, addVal, ...etc) {
      this.add(originalFrom, originalTo, addVal, ...etc);
    }

    current() {
      if (this.slices != null) {
        this.slices = mergeRanges(this.slices, {
          mergeType: this.opts.mergeType
        });

        if (this.opts.limitToBeAddedWhitespace) {
          return this.slices.map(val => {
            if (existy$1(val[2])) {
              return [val[0], val[1], collapseLeadingWhitespace(val[2], this.opts.limitLinebreaksCount)];
            }

            return val;
          });
        }

        return this.slices;
      }

      return null;
    }

    wipe() {
      this.slices = undefined;
    }

    replace(givenRanges) {
      if (Array.isArray(givenRanges) && givenRanges.length) {
        if (!(Array.isArray(givenRanges[0]) && isNum$1(givenRanges[0][0]))) {
          throw new Error(`ranges-push/Ranges/replace(): [THROW_ID_11] Single range was given but we expected array of arrays! The first element, ${JSON.stringify(givenRanges[0], null, 4)} should be an array and its first element should be an integer, a string index.`);
        } else {
          this.slices = Array.from(givenRanges);
        }
      } else {
        this.slices = undefined;
      }
    }

    last() {
      if (this.slices !== undefined && Array.isArray(this.slices)) {
        return this.slices[this.slices.length - 1];
      }

      return null;
    }

  }

  /**
   * string-remove-widows
   * Helps to prevent widow words in a text
   * Version: 1.5.15
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-remove-widows
   */
  const rawnbsp = "\u00A0";
  const encodedNbspHtml = "&nbsp;";
  const encodedNbspCss = "\\00A0";
  const encodedNbspJs = "\\u00A0";
  const rawNdash = "\u2013";
  const encodedNdashHtml = "&ndash;";
  const encodedNdashCss = "\\2013";
  const encodedNdashJs = "\\u2013";
  const rawMdash = "\u2014";
  const encodedMdashHtml = "&mdash;";
  const encodedMdashCss = "\\2014";
  const encodedMdashJs = "\\u2014";
  const headsAndTailsJinja = [{
    heads: "{{",
    tails: "}}"
  }, {
    heads: ["{% if", "{%- if"],
    tails: ["{% endif", "{%- endif"]
  }, {
    heads: ["{% for", "{%- for"],
    tails: ["{% endfor", "{%- endfor"]
  }, {
    heads: ["{%", "{%-"],
    tails: ["%}", "-%}"]
  }, {
    heads: "{#",
    tails: "#}"
  }];
  const headsAndTailsHugo = [{
    heads: "{{",
    tails: "}}"
  }];
  const headsAndTailsHexo = [{
    heads: ["<%", "<%=", "<%-"],
    tails: ["%>", "=%>", "-%>"]
  }];
  const knownHTMLTags = ["abbr", "address", "area", "article", "aside", "audio", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "doctype", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "param", "picture", "pre", "progress", "rb", "rp", "rt", "rtc", "ruby", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "ul", "var", "video", "wbr", "xml"];
  const defaultOpts$1 = {
    removeWidowPreventionMeasures: false,
    convertEntities: true,
    targetLanguage: "html",
    UKPostcodes: false,
    hyphens: true,
    minWordCount: 4,
    minCharCount: 5,
    ignore: [],
    reportProgressFunc: null,
    reportProgressFuncFrom: 0,
    reportProgressFuncTo: 100,
    tagRanges: []
  };

  function removeWidows(str, originalOpts) {
    function push(finalStart, finalEnd) {
      let finalWhatToInsert = rawnbsp;

      if (opts.removeWidowPreventionMeasures) {
        finalWhatToInsert = " ";
      } else if (opts.convertEntities) {
        finalWhatToInsert = encodedNbspHtml;

        if (isStr(opts.targetLanguage)) {
          if (opts.targetLanguage.trim().toLowerCase() === "css") {
            finalWhatToInsert = encodedNbspCss;
          } else if (opts.targetLanguage.trim().toLowerCase() === "js") {
            finalWhatToInsert = encodedNbspJs;
          }
        }
      }

      if (str.slice(finalStart, finalEnd) !== finalWhatToInsert) {
        rangesArr.push(finalStart, finalEnd, finalWhatToInsert);
      }
    }

    function isStr(something) {
      return typeof something === "string";
    }

    const start = Date.now();

    if (!isStr(str)) {
      if (str === undefined) {
        throw new Error("string-remove-widows: [THROW_ID_01] the first input argument is completely missing! It should be given as string.");
      } else {
        throw new Error(`string-remove-widows: [THROW_ID_02] the first input argument must be string! It was given as "${typeof str}", equal to:\n${JSON.stringify(str, null, 4)}`);
      }
    }

    if (originalOpts && !lodash_isplainobject(originalOpts)) {
      throw new Error(`string-remove-widows: [THROW_ID_03] the second input argument, options object, should be a plain object but it was given as type ${typeof originalOpts}, equal to ${JSON.stringify(originalOpts, null, 4)}`);
    }

    const isArr = Array.isArray;
    const len = str.length;
    const rangesArr = new Ranges({
      mergeType: 2
    });
    const punctuationCharsToConsiderWidowIssue = ["."];
    const postcodeRegexFront = /[A-Z]{1,2}[0-9][0-9A-Z]?$/;
    const postcodeRegexEnd = /^[0-9][A-Z]{2}/;
    const leavePercForLastStage = 0.06;
    let currentPercentageDone;
    let lastPercentage = 0;
    let wordCount;
    let charCount;
    let secondToLastWhitespaceStartedAt;
    let secondToLastWhitespaceEndedAt;
    let lastWhitespaceStartedAt;
    let lastWhitespaceEndedAt;
    let lastEncodedNbspStartedAt;
    let lastEncodedNbspEndedAt;
    let doNothingUntil;
    let bumpWordCountAt;
    const opts = Object.assign({}, defaultOpts$1, originalOpts);
    const whatWasDone = {
      removeWidows: false,
      convertEntities: false
    };

    if (opts.dashes) {
      opts.hyphens = true;
      delete opts.dashes;
    }

    if (!opts.ignore || !isArr(opts.ignore) && !isStr(opts.ignore)) {
      opts.ignore = [];
    } else {
      opts.ignore = arrayiffyString(opts.ignore);

      if (opts.ignore.includes("all")) {
        opts.ignore = opts.ignore.concat(headsAndTailsJinja.concat(headsAndTailsHexo));
      } else if (opts.ignore.some(val => isStr(val))) {
        let temp = [];
        opts.ignore = opts.ignore.filter(val => {
          if (isStr(val) && val.length) {
            if (["nunjucks", "jinja", "liquid"].includes(val.trim().toLowerCase())) {
              temp = temp.concat(headsAndTailsJinja);
            } else if (["hugo"].includes(val.trim().toLowerCase())) {
              temp = temp.concat(headsAndTailsHugo);
            } else if (["hexo"].includes(val.trim().toLowerCase())) {
              temp = temp.concat(headsAndTailsHexo);
            }

            return false;
          } else if (typeof val === "object") {
            return true;
          }
        });

        if (temp.length) {
          opts.ignore = opts.ignore.concat(temp);
        }
      }
    }

    let ceil;

    if (opts.reportProgressFunc) {
      ceil = Math.floor(opts.reportProgressFuncTo - (opts.reportProgressFuncTo - opts.reportProgressFuncFrom) * leavePercForLastStage - opts.reportProgressFuncFrom);
    }

    function resetAll() {
      wordCount = 0;
      charCount = 0;
      secondToLastWhitespaceStartedAt = undefined;
      secondToLastWhitespaceEndedAt = undefined;
      lastWhitespaceStartedAt = undefined;
      lastWhitespaceEndedAt = undefined;
      lastEncodedNbspStartedAt = undefined;
      lastEncodedNbspEndedAt = undefined;
    }

    resetAll();

    for (let i = 0; i <= len; i++) {
      if (!doNothingUntil && isArr(opts.ignore) && opts.ignore.length) {
        opts.ignore.some((valObj, y) => {
          if (isArr(valObj.heads) && valObj.heads.some(oneOfHeads => str.startsWith(oneOfHeads, i)) || isStr(valObj.heads) && str.startsWith(valObj.heads, i)) {
            wordCount++;
            doNothingUntil = opts.ignore[y].tails;
            return true;
          }
        });
      }

      if (!doNothingUntil && bumpWordCountAt && bumpWordCountAt === i) {
        wordCount++;
        bumpWordCountAt = undefined;
      }

      if (typeof opts.reportProgressFunc === "function") {
        currentPercentageDone = opts.reportProgressFuncFrom + Math.floor(i / len * ceil);

        if (currentPercentageDone !== lastPercentage) {
          lastPercentage = currentPercentageDone;
          opts.reportProgressFunc(currentPercentageDone);
        }
      }

      if (!doNothingUntil && i && str[i] && str[i].trim().length && (!str[i - 1] || str[i - 1] && !str[i - 1].trim().length)) {
        lastWhitespaceEndedAt = i;
      }

      if (!doNothingUntil && str[i] && str[i].trim().length) {
        charCount++;
      }

      if (!doNothingUntil && opts.hyphens && (str[i] === "-" || str[i] === rawMdash || str[i] === rawNdash || str.slice(i).startsWith(encodedNdashHtml) || str.slice(i).startsWith(encodedNdashCss) || str.slice(i).startsWith(encodedNdashJs) || str.slice(i).startsWith(encodedMdashHtml) || str.slice(i).startsWith(encodedMdashCss) || str.slice(i).startsWith(encodedMdashJs)) && str[i + 1] && (!str[i + 1].trim().length || str[i] === "&")) {
        if (str[i - 1] && !str[i - 1].trim().length && str[left(str, i)]) {
          push(left(str, i) + 1, i);
          whatWasDone.removeWidows = true;
        }
      }

      if (!doNothingUntil && (str[i] === "&" && str[i + 1] === "n" && str[i + 2] === "b" && str[i + 3] === "s" && str[i + 4] === "p" && str[i + 5] === ";" || str[i] === "&" && str[i + 1] === "#" && str[i + 2] === "1" && str[i + 3] === "6" && str[i + 4] === "0" && str[i + 5] === ";")) {
        lastEncodedNbspStartedAt = i;
        lastEncodedNbspEndedAt = i + 6;

        if (str[i + 6] && str[i + 6].trim().length) {
          bumpWordCountAt = i + 6;
        }

        if (!opts.convertEntities) {
          rangesArr.push(i, i + 6, rawnbsp);
          whatWasDone.convertEntities = true;
        } else if (opts.targetLanguage === "css" || opts.targetLanguage === "js") {
          rangesArr.push(i, i + 6, opts.targetLanguage === "css" ? encodedNbspCss : encodedNbspJs);
          whatWasDone.convertEntities = true;
        }
      }

      if (!doNothingUntil && str[i] === "\\" && str[i + 1] === "0" && str[i + 2] === "0" && str[i + 3] && str[i + 3].toUpperCase() === "A" && str[i + 4] === "0") {
        lastEncodedNbspStartedAt = i;
        lastEncodedNbspEndedAt = i + 5;

        if (str[i + 5] && str[i + 5].trim().length) {
          bumpWordCountAt = i + 5;
        }

        if (!opts.convertEntities) {
          rangesArr.push(i, i + 5, rawnbsp);
          whatWasDone.convertEntities = true;
        } else if (opts.targetLanguage === "html" || opts.targetLanguage === "js") {
          rangesArr.push(i, i + 5, opts.targetLanguage === "html" ? encodedNbspHtml : encodedNbspJs);
          whatWasDone.convertEntities = true;
        }
      }

      if (!doNothingUntil && str[i] === "\\" && str[i + 1] && str[i + 1].toLowerCase() === "u" && str[i + 2] === "0" && str[i + 3] === "0" && str[i + 4] && str[i + 4].toUpperCase() === "A" && str[i + 5] === "0") {
        lastEncodedNbspStartedAt = i;
        lastEncodedNbspEndedAt = i + 6;

        if (str[i + 6] && str[i + 6].trim().length) {
          bumpWordCountAt = i + 6;
        }

        if (!opts.convertEntities) {
          rangesArr.push(i, i + 6, rawnbsp);
        } else if (opts.targetLanguage === "html" || opts.targetLanguage === "css") {
          rangesArr.push(i, i + 6, opts.targetLanguage === "html" ? encodedNbspHtml : encodedNbspCss);
        }
      }

      if (!doNothingUntil && str[i] === rawnbsp) {
        lastEncodedNbspStartedAt = i;
        lastEncodedNbspEndedAt = i + 1;

        if (str[i + 2] && str[i + 2].trim().length) {
          bumpWordCountAt = i + 2;
        }

        if (opts.convertEntities) {
          rangesArr.push(i, i + 1, opts.targetLanguage === "css" ? encodedNbspCss : opts.targetLanguage === "js" ? encodedNbspJs : encodedNbspHtml);
        }
      }

      if (!doNothingUntil && str[i] && str[i].trim().length && (!str[i - 1] || !str[i - 1].trim().length)) {
        wordCount++;
      }

      if (!doNothingUntil && (!str[i] || `\r\n`.includes(str[i]) || (str[i] === "\n" || str[i] === "\r" || str[i] === "\r" && str[i + 1] === "\n") && str[i - 1] && punctuationCharsToConsiderWidowIssue.includes(str[left(str, i)]))) {
        if ((!opts.minWordCount || wordCount >= opts.minWordCount) && (!opts.minCharCount || charCount >= opts.minCharCount)) {
          let finalStart;
          let finalEnd;

          if (lastWhitespaceStartedAt !== undefined && lastWhitespaceEndedAt !== undefined && lastEncodedNbspStartedAt !== undefined && lastEncodedNbspEndedAt !== undefined) {
            if (lastWhitespaceStartedAt > lastEncodedNbspStartedAt) {
              finalStart = lastWhitespaceStartedAt;
              finalEnd = lastWhitespaceEndedAt;
            } else {
              finalStart = lastEncodedNbspStartedAt;
              finalEnd = lastEncodedNbspEndedAt;
            }
          } else if (lastWhitespaceStartedAt !== undefined && lastWhitespaceEndedAt !== undefined) {
            finalStart = lastWhitespaceStartedAt;
            finalEnd = lastWhitespaceEndedAt;
          } else if (lastEncodedNbspStartedAt !== undefined && lastEncodedNbspEndedAt !== undefined) {
            finalStart = lastEncodedNbspStartedAt;
            finalEnd = lastEncodedNbspEndedAt;
          }

          if (!(finalStart && finalEnd) && secondToLastWhitespaceStartedAt && secondToLastWhitespaceEndedAt) {
            finalStart = secondToLastWhitespaceStartedAt;
            finalEnd = secondToLastWhitespaceEndedAt;
          }

          if (finalStart && finalEnd) {
            push(finalStart, finalEnd);
            whatWasDone.removeWidows = true;
          }
        }

        resetAll();
      }

      if (opts.UKPostcodes && str[i] && !str[i].trim().length && str[i - 1] && str[i - 1].trim().length && postcodeRegexFront.test(str.slice(0, i)) && str[right(str, i)] && postcodeRegexEnd.test(str.slice(right(str, i)))) {
        push(i, right(str, i));
        whatWasDone.removeWidows = true;
      }

      if (!doNothingUntil && str[i] && !str[i].trim().length && str[i - 1] && str[i - 1].trim().length && (lastWhitespaceStartedAt === undefined || str[lastWhitespaceStartedAt - 1] && str[lastWhitespaceStartedAt - 1].trim().length) && !"/>".includes(str[right(str, i)]) && !str.slice(0, left(str, i) + 1).endsWith("br") && !str.slice(0, left(str, i) + 1).endsWith("hr") && !(str[left(str, i)] === "<" && knownHTMLTags.some(tag => str.startsWith(tag, right(str, i))))) {
        secondToLastWhitespaceStartedAt = lastWhitespaceStartedAt;
        secondToLastWhitespaceEndedAt = lastWhitespaceEndedAt;
        lastWhitespaceStartedAt = i;
        lastWhitespaceEndedAt = undefined;

        if (lastEncodedNbspStartedAt !== undefined || lastEncodedNbspEndedAt !== undefined) {
          lastEncodedNbspStartedAt = undefined;
          lastEncodedNbspEndedAt = undefined;
        }
      }

      let tempTailFinding;

      if (doNothingUntil) {
        if (isStr(doNothingUntil) && (!doNothingUntil.length || str.startsWith(doNothingUntil, i))) {
          doNothingUntil = undefined;
        } else if (isArr(doNothingUntil) && (!doNothingUntil.length || doNothingUntil.some(val => {
          if (str.startsWith(val, i)) {
            tempTailFinding = val;
            return true;
          }
        }))) {
          doNothingUntil = undefined;
          i += tempTailFinding.length;

          if (isArr(opts.ignore) && opts.ignore.length && str[i + 1]) {
            opts.ignore.some(oneOfHeadsTailsObjs => {
              return matchRightIncl(str, i, oneOfHeadsTailsObjs.tails, {
                trimBeforeMatching: true,
                cb: (char, theRemainderOfTheString, index) => {
                  if (index) {
                    i = index - 1;

                    if (str[i + 1] && str[i + 1].trim().length) {
                      wordCount++;
                    }
                  }

                  return true;
                }
              });
            });
          }
        }
      }

      if (str[i] && `\r\n`.includes(str[i])) {
        wordCount = 0;
        charCount = 0;
      }

      if (isArr(opts.tagRanges) && opts.tagRanges.length && opts.tagRanges.some(rangeArr => {
        if (i >= rangeArr[0] && i <= rangeArr[1] && rangeArr[1] - 1 > i) {
          i = rangeArr[1] - 1;
          return true;
        }
      })) ;
    }

    return {
      res: rangesApply(str, rangesArr.current(), opts.reportProgressFunc ? incomingPerc => {
        currentPercentageDone = Math.floor((opts.reportProgressFuncTo - opts.reportProgressFuncFrom) * (1 - leavePercForLastStage) + incomingPerc / 100 * (opts.reportProgressFuncTo - opts.reportProgressFuncFrom) * leavePercForLastStage);

        if (currentPercentageDone !== lastPercentage) {
          lastPercentage = currentPercentageDone;
          opts.reportProgressFunc(currentPercentageDone);
        }
      } : null),
      ranges: rangesArr.current(),
      log: {
        timeTakenInMiliseconds: Date.now() - start
      },
      whatWasDone
    };
  }

  /**
   * ranges-crop
   * Crop array of ranges when they go beyond the reference string's length
   * Version: 2.0.48
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-crop
   */
  const isArr$2 = Array.isArray;

  function isStr$4(something) {
    return typeof something === "string";
  }

  function existy$2(x) {
    return x != null;
  }

  function rangesCrop(arrOfRanges, strLen) {
    if (!isArr$2(arrOfRanges)) {
      throw new TypeError(`ranges-crop: [THROW_ID_01] The first input's argument must be an array, consisting of range arrays! Currently its type is: ${typeof arrOfRanges}, equal to: ${JSON.stringify(arrOfRanges, null, 4)}`);
    }

    if (!Number.isInteger(strLen)) {
      throw new TypeError(`ranges-crop: [THROW_ID_02] The second input's argument must be a natural number or zero (coming from String.length)! Currently its type is: ${typeof strLen}, equal to: ${JSON.stringify(strLen, null, 4)}`);
    }

    if (arrOfRanges.length === 0) {
      return arrOfRanges;
    }

    let culpritsIndex;

    if (!arrOfRanges.every((rangeArr, indx) => {
      if (!Number.isInteger(rangeArr[0]) || !Number.isInteger(rangeArr[1])) {
        culpritsIndex = indx;
        return false;
      }

      return true;
    })) {
      if (Array.isArray(arrOfRanges) && typeof arrOfRanges[0] === "number" && typeof arrOfRanges[1] === "number") {
        throw new TypeError(`ranges-crop: [THROW_ID_03] The first argument should be AN ARRAY OF RANGES, not a single range! Currently arrOfRanges = ${JSON.stringify(arrOfRanges, null, 0)}!`);
      }

      throw new TypeError(`ranges-crop: [THROW_ID_04] The first argument should be AN ARRAY OF ARRAYS! Each sub-array means string slice indexes. In our case, here ${culpritsIndex + 1}th range (${JSON.stringify(arrOfRanges[culpritsIndex], null, 0)}) does not consist of only natural numbers!`);
    }

    if (!arrOfRanges.every((rangeArr, indx) => {
      if (existy$2(rangeArr[2]) && !isStr$4(rangeArr[2])) {
        culpritsIndex = indx;
        return false;
      }

      return true;
    })) {
      throw new TypeError(`ranges-crop: [THROW_ID_05] The third argument, if present at all, should be of a string-type or null. Currently the ${culpritsIndex}th range ${JSON.stringify(arrOfRanges[culpritsIndex], null, 0)} has a argument in the range of a type ${typeof arrOfRanges[culpritsIndex][2]}`);
    }

    const res = mergeRanges(arrOfRanges).filter(singleRangeArr => singleRangeArr[0] <= strLen && (singleRangeArr[2] !== undefined || singleRangeArr[0] < strLen)).map(singleRangeArr => {
      if (singleRangeArr[1] > strLen) {
        if (singleRangeArr[2] !== undefined) {
          return [singleRangeArr[0], strLen, singleRangeArr[2]];
        }

        return [singleRangeArr[0], strLen];
      }

      return singleRangeArr;
    });
    return res;
  }

  /**
   * ranges-invert
   * Invert string index ranges [ [1, 3] ] => [ [0, 1], [3, ...] ]
   * Version: 2.1.35
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-invert
   */
  const isArr$3 = Array.isArray;

  function rangesInvert(arrOfRanges, strLen, originalOptions) {
    if (!isArr$3(arrOfRanges) && arrOfRanges !== null) {
      throw new TypeError(`ranges-invert: [THROW_ID_01] Input's first argument must be an array, consisting of range arrays! Currently its type is: ${typeof arrOfRanges}, equal to: ${JSON.stringify(arrOfRanges, null, 4)}`);
    }

    if (!Number.isInteger(strLen) || strLen < 0) {
      throw new TypeError(`ranges-invert: [THROW_ID_02] Input's second argument must be a natural number or zero (coming from String.length)! Currently its type is: ${typeof strLen}, equal to: ${JSON.stringify(strLen, null, 4)}`);
    }

    if (arrOfRanges === null) {
      if (strLen === 0) {
        return [];
      }

      return [[0, strLen]];
    } else if (arrOfRanges.length === 0) {
      return [];
    }

    const defaults = {
      strictlyTwoElementsInRangeArrays: false,
      skipChecks: false
    };
    const opts = Object.assign({}, defaults, originalOptions);
    let culpritsIndex;
    let culpritsLen;

    if (!opts.skipChecks && opts.strictlyTwoElementsInRangeArrays && !arrOfRanges.every((rangeArr, indx) => {
      if (rangeArr.length !== 2) {
        culpritsIndex = indx;
        culpritsLen = rangeArr.length;
        return false;
      }

      return true;
    })) {
      throw new TypeError(`ranges-invert: [THROW_ID_04] Because opts.strictlyTwoElementsInRangeArrays was enabled, all ranges must be strictly two-element-long. However, the ${culpritsIndex}th range (${JSON.stringify(arrOfRanges[culpritsIndex], null, 0)}) has not two but ${culpritsLen} elements!`);
    }

    if (!opts.skipChecks && !arrOfRanges.every((rangeArr, indx) => {
      if (!Number.isInteger(rangeArr[0]) || rangeArr[0] < 0 || !Number.isInteger(rangeArr[1]) || rangeArr[1] < 0) {
        culpritsIndex = indx;
        return false;
      }

      return true;
    })) {
      if (Array.isArray(arrOfRanges) && typeof arrOfRanges[0] === "number" && typeof arrOfRanges[1] === "number") {
        throw new TypeError(`ranges-invert: [THROW_ID_07] The first argument should be AN ARRAY OF RANGES, not a single range! Currently arrOfRanges = ${JSON.stringify(arrOfRanges, null, 0)}!`);
      }

      throw new TypeError(`ranges-invert: [THROW_ID_05] The first argument should be AN ARRAY OF ARRAYS! Each sub-array means string slice indexes. In our case, here ${culpritsIndex + 1}th range (${JSON.stringify(arrOfRanges[culpritsIndex], null, 0)}) does not consist of only natural numbers!`);
    }

    let prep;

    if (!opts.skipChecks) {
      prep = mergeRanges(arrOfRanges.filter(rangeArr => rangeArr[0] !== rangeArr[1]));
    } else {
      prep = arrOfRanges.filter(rangeArr => rangeArr[0] !== rangeArr[1]);
    }

    if (prep.length === 0) {
      if (strLen === 0) {
        return [];
      }

      return [[0, strLen]];
    }

    const res = prep.reduce((accum, currArr, i, arr) => {
      const res = [];

      if (i === 0 && arr[0][0] !== 0) {
        res.push([0, arr[0][0]]);
      }

      const endingIndex = i < arr.length - 1 ? arr[i + 1][0] : strLen;

      if (currArr[1] !== endingIndex) {
        if (opts.skipChecks && currArr[1] > endingIndex) {
          throw new TypeError(`ranges-invert: [THROW_ID_08] The checking (opts.skipChecks) is off and input ranges were not sorted! We nearly wrote range [${currArr[1]}, ${endingIndex}] which is backwards. For investigation, whole ranges array is:\n${JSON.stringify(arr, null, 0)}`);
        }

        res.push([currArr[1], endingIndex]);
      }

      return accum.concat(res);
    }, []);
    return rangesCrop(res, strLen);
  }

  const HIGH_SURROGATE_START = 0xd800;
  const HIGH_SURROGATE_END = 0xdbff;
  const LOW_SURROGATE_START = 0xdc00;
  const REGIONAL_INDICATOR_START = 0x1f1e6;
  const REGIONAL_INDICATOR_END = 0x1f1ff;
  const FITZPATRICK_MODIFIER_START = 0x1f3fb;
  const FITZPATRICK_MODIFIER_END = 0x1f3ff;
  const VARIATION_MODIFIER_START = 0xfe00;
  const VARIATION_MODIFIER_END = 0xfe0f;
  const DIACRITICAL_MARKS_START = 0x20d0;
  const DIACRITICAL_MARKS_END = 0x20ff;
  const ZWJ = 0x200d;
  const GRAPHEMS = [0x0308, // ( ◌̈ ) COMBINING DIAERESIS
  0x0937, // ( ष ) DEVANAGARI LETTER SSA
  0x0937, // ( ष ) DEVANAGARI LETTER SSA
  0x093F, // ( ि ) DEVANAGARI VOWEL SIGN I
  0x093F, // ( ि ) DEVANAGARI VOWEL SIGN I
  0x0BA8, // ( ந ) TAMIL LETTER NA
  0x0BBF, // ( ி ) TAMIL VOWEL SIGN I
  0x0BCD, // ( ◌்) TAMIL SIGN VIRAMA
  0x0E31, // ( ◌ั ) THAI CHARACTER MAI HAN-AKAT
  0x0E33, // ( ำ ) THAI CHARACTER SARA AM
  0x0E40, // ( เ ) THAI CHARACTER SARA E
  0x0E49, // ( เ ) THAI CHARACTER MAI THO
  0x1100, // ( ᄀ ) HANGUL CHOSEONG KIYEOK
  0x1161, // ( ᅡ ) HANGUL JUNGSEONG A
  0x11A8 // ( ᆨ ) HANGUL JONGSEONG KIYEOK
  ];

  function runes(string) {
    if (typeof string !== 'string') {
      throw new Error('string cannot be undefined or null');
    }

    const result = [];
    let i = 0;
    let increment = 0;

    while (i < string.length) {
      increment += nextUnits(i + increment, string);

      if (isGraphem(string[i + increment])) {
        increment++;
      }

      if (isVariationSelector(string[i + increment])) {
        increment++;
      }

      if (isDiacriticalMark(string[i + increment])) {
        increment++;
      }

      if (isZeroWidthJoiner(string[i + increment])) {
        increment++;
        continue;
      }

      result.push(string.substring(i, i + increment));
      i += increment;
      increment = 0;
    }

    return result;
  } // Decide how many code units make up the current character.
  // BMP characters: 1 code unit
  // Non-BMP characters (represented by surrogate pairs): 2 code units
  // Emoji with skin-tone modifiers: 4 code units (2 code points)
  // Country flags: 4 code units (2 code points)
  // Variations: 2 code units


  function nextUnits(i, string) {
    const current = string[i]; // If we don't have a value that is part of a surrogate pair, or we're at
    // the end, only take the value at i

    if (!isFirstOfSurrogatePair(current) || i === string.length - 1) {
      return 1;
    }

    const currentPair = current + string[i + 1];
    let nextPair = string.substring(i + 2, i + 5); // Country flags are comprised of two regional indicator symbols,
    // each represented by a surrogate pair.
    // See http://emojipedia.org/flags/
    // If both pairs are regional indicator symbols, take 4

    if (isRegionalIndicator(currentPair) && isRegionalIndicator(nextPair)) {
      return 4;
    } // If the next pair make a Fitzpatrick skin tone
    // modifier, take 4
    // See http://emojipedia.org/modifiers/
    // Technically, only some code points are meant to be
    // combined with the skin tone modifiers. This function
    // does not check the current pair to see if it is
    // one of them.


    if (isFitzpatrickModifier(nextPair)) {
      return 4;
    }

    return 2;
  }

  function isFirstOfSurrogatePair(string) {
    return string && betweenInclusive(string[0].charCodeAt(0), HIGH_SURROGATE_START, HIGH_SURROGATE_END);
  }

  function isRegionalIndicator(string) {
    return betweenInclusive(codePointFromSurrogatePair(string), REGIONAL_INDICATOR_START, REGIONAL_INDICATOR_END);
  }

  function isFitzpatrickModifier(string) {
    return betweenInclusive(codePointFromSurrogatePair(string), FITZPATRICK_MODIFIER_START, FITZPATRICK_MODIFIER_END);
  }

  function isVariationSelector(string) {
    return typeof string === 'string' && betweenInclusive(string.charCodeAt(0), VARIATION_MODIFIER_START, VARIATION_MODIFIER_END);
  }

  function isDiacriticalMark(string) {
    return typeof string === 'string' && betweenInclusive(string.charCodeAt(0), DIACRITICAL_MARKS_START, DIACRITICAL_MARKS_END);
  }

  function isGraphem(string) {
    return typeof string === 'string' && GRAPHEMS.indexOf(string.charCodeAt(0)) !== -1;
  }

  function isZeroWidthJoiner(string) {
    return typeof string === 'string' && string.charCodeAt(0) === ZWJ;
  }

  function codePointFromSurrogatePair(pair) {
    const highOffset = pair.charCodeAt(0) - HIGH_SURROGATE_START;
    const lowOffset = pair.charCodeAt(1) - LOW_SURROGATE_START;
    return (highOffset << 10) + lowOffset + 0x10000;
  }

  function betweenInclusive(value, lower, upper) {
    return value >= lower && value <= upper;
  }

  function substring(string, start, width) {
    const chars = runes(string);

    if (start === undefined) {
      return string;
    }

    if (start >= chars.length) {
      return '';
    }

    const rest = chars.length - start;
    const stringWidth = width === undefined ? rest : width;
    let endIndex = start + stringWidth;

    if (endIndex > start + rest) {
      endIndex = undefined;
    }

    return chars.slice(start, endIndex).join('');
  }

  var runes_1 = runes;
  var substr = substring;
  runes_1.substr = substr;

  /**
   * ranges-process-outside
   * Iterate through string and optionally a given ranges as if they were one
   * Version: 2.2.20
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/ranges-process-outside
   */
  const isArr$4 = Array.isArray;

  function processOutside(str, originalRanges, cb, skipChecks = false) {
    function isFunction(functionToCheck) {
      return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
    }

    if (typeof str !== "string") {
      if (str === undefined) {
        throw new Error(`ranges-process-outside: [THROW_ID_01] the first input argument must be string! It's missing currently (undefined)!`);
      } else {
        throw new Error(`ranges-process-outside: [THROW_ID_02] the first input argument must be string! It was given as:\n${JSON.stringify(str, null, 4)} (type ${typeof str})`);
      }
    }

    if (originalRanges && !isArr$4(originalRanges)) {
      throw new Error(`ranges-process-outside: [THROW_ID_03] the second input argument must be array of ranges or null! It was given as:\n${JSON.stringify(originalRanges, null, 4)} (type ${typeof originalRanges})`);
    }

    if (!isFunction(cb)) {
      throw new Error(`ranges-process-outside: [THROW_ID_04] the third input argument must be a function! It was given as:\n${JSON.stringify(cb, null, 4)} (type ${typeof cb})`);
    }

    function iterator(str, arrOfArrays) {
      arrOfArrays.forEach(([fromIdx, toIdx]) => {
        for (let i = fromIdx; i < toIdx; i++) {
          const charLength = runes_1(str.slice(i))[0].length;
          cb(i, i + charLength, offsetValue => {
            if (offsetValue != null) {
              i += offsetValue;
            }
          });

          if (charLength && charLength > 1) {
            i += charLength - 1;
          }
        }
      });
    }

    if (originalRanges && originalRanges.length) {
      const temp = rangesCrop(rangesInvert(skipChecks ? originalRanges : originalRanges, str.length, {
        skipChecks: !!skipChecks
      }), str.length);
      iterator(str, temp);
    } else {
      iterator(str, [[0, str.length]]);
    }
  }

  /**
   * string-collapse-white-space
   * Efficient collapsing of white space with optional outer- and/or line-trimming and HTML tag recognition
   * Version: 5.2.14
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-collapse-white-space
   */

  function collapse(str, originalOpts) {
    function isStr(something) {
      return typeof something === "string";
    }

    function charCodeBetweenInclusive(character, from, end) {
      return character.charCodeAt(0) >= from && character.charCodeAt(0) <= end;
    }

    function isSpaceOrLeftBracket(character) {
      return isStr(character) && (character === "<" || character.trim() === "");
    }

    if (typeof str !== "string") {
      throw new Error(`string-collapse-white-space/collapse(): [THROW_ID_01] The input is not string but ${typeof str}, equal to: ${JSON.stringify(str, null, 4)}`);
    }

    if (originalOpts !== undefined && originalOpts !== null && !lodash_isplainobject(originalOpts)) {
      throw new Error(`string-collapse-white-space/collapse(): [THROW_ID_02] The opts is not a plain object but ${typeof originalOpts}, equal to:\n${JSON.stringify(originalOpts, null, 4)}`);
    }

    if (str.length === 0) {
      return "";
    }

    const isNum = Number.isInteger;
    const finalIndexesToDelete = [];
    const defaults = {
      trimStart: true,
      trimEnd: true,
      trimLines: false,
      trimnbsp: false,
      recogniseHTML: true,
      removeEmptyLines: false,
      returnRangesOnly: false,
      limitConsecutiveEmptyLinesTo: 0
    };
    const opts = Object.assign({}, defaults, originalOpts);
    let preliminaryIndexesToDelete;

    if (opts.recogniseHTML) {
      preliminaryIndexesToDelete = [];
    }

    let spacesEndAt = null;
    let whiteSpaceEndsAt = null;
    let lineWhiteSpaceEndsAt = null;
    let endingOfTheLine = false;
    let stateWithinTag = false;
    let whiteSpaceWithinTagEndsAt = null;
    let tagMatched = false;
    let tagCanEndHere = false;
    let count;
    let bail = false;

    const resetCounts = () => ({
      equalDoubleQuoteCombo: 0,
      equalOnly: 0,
      doubleQuoteOnly: 0,
      spacesBetweenLetterChunks: 0,
      linebreaks: 0
    });

    let bracketJustFound = false;

    if (opts.recogniseHTML) {
      count = resetCounts();
    }

    let lastLineBreaksLastCharIndex;
    let consecutiveLineBreakCount = 0;

    for (let i = str.length; i--;) {
      if (str[i] === "\n" || str[i] === "\r" && str[i + 1] !== "\n") {
        consecutiveLineBreakCount++;
      } else if (str[i].trim().length) {
        consecutiveLineBreakCount = 0;
      }

      if (str[i] === " ") {
        if (spacesEndAt === null) {
          spacesEndAt = i;
        }
      } else if (spacesEndAt !== null) {
        if (i + 1 !== spacesEndAt) {
          finalIndexesToDelete.push([i + 1, spacesEndAt]);
        }

        spacesEndAt = null;
      }

      if (str[i].trim() === "" && (!opts.trimnbsp && str[i] !== "\xa0" || opts.trimnbsp)) {
        if (whiteSpaceEndsAt === null) {
          whiteSpaceEndsAt = i;
        }

        if (str[i] !== "\n" && str[i] !== "\r" && lineWhiteSpaceEndsAt === null) {
          lineWhiteSpaceEndsAt = i + 1;
        }

        if (str[i] === "\n" || str[i] === "\r") {
          if (lineWhiteSpaceEndsAt !== null) {
            if (opts.trimLines) {
              finalIndexesToDelete.push([i + 1, lineWhiteSpaceEndsAt]);
            }

            lineWhiteSpaceEndsAt = null;
          }

          if (str[i - 1] !== "\n" && str[i - 1] !== "\r") {
            lineWhiteSpaceEndsAt = i;
            endingOfTheLine = true;
          }
        }

        if (str[i] === "\n" || str[i] === "\r" && str[i + 1] !== "\n") {
          const sliceFrom = i + 1;
          let sliceTo;

          if (isNum(lastLineBreaksLastCharIndex)) {
            sliceTo = lastLineBreaksLastCharIndex + 1;

            if (opts.removeEmptyLines && lastLineBreaksLastCharIndex !== undefined && str.slice(sliceFrom, sliceTo).trim() === "") {
              if (consecutiveLineBreakCount > opts.limitConsecutiveEmptyLinesTo + 1) {
                finalIndexesToDelete.push([i + 1, lastLineBreaksLastCharIndex + 1]);
              }
            }
          }

          lastLineBreaksLastCharIndex = i;
        }
      } else {
        if (whiteSpaceEndsAt !== null) {
          if (i + 1 !== whiteSpaceEndsAt + 1 && whiteSpaceEndsAt === str.length - 1 && opts.trimEnd) {
            finalIndexesToDelete.push([i + 1, whiteSpaceEndsAt + 1]);
          }

          whiteSpaceEndsAt = null;
        }

        if (lineWhiteSpaceEndsAt !== null) {
          if (endingOfTheLine && opts.trimLines) {
            endingOfTheLine = false;

            if (lineWhiteSpaceEndsAt !== i + 1) {
              finalIndexesToDelete.push([i + 1, lineWhiteSpaceEndsAt]);
            }
          }

          lineWhiteSpaceEndsAt = null;
        }
      }

      if (i === 0) {
        if (whiteSpaceEndsAt !== null && opts.trimStart) {
          finalIndexesToDelete.push([0, whiteSpaceEndsAt + 1]);
        } else if (spacesEndAt !== null) {
          finalIndexesToDelete.push([i + 1, spacesEndAt + 1]);
        }
      }

      if (opts.recogniseHTML) {
        if (str[i].trim() === "") {
          if (stateWithinTag && !tagCanEndHere) {
            tagCanEndHere = true;
          }

          if (tagMatched && !whiteSpaceWithinTagEndsAt) {
            whiteSpaceWithinTagEndsAt = i + 1;
          }

          if (tagMatched && str[i - 1] !== undefined && str[i - 1].trim() !== "" && str[i - 1] !== "<" && str[i - 1] !== "/") {
            tagMatched = false;
            stateWithinTag = false;
            preliminaryIndexesToDelete = [];
          }

          if (!bail && !bracketJustFound && str[i].trim() === "" && str[i - 1] !== "<" && (str[i + 1] === undefined || str[i + 1].trim() !== "" && str[i + 1].trim() !== "/")) {
            if (str[i - 1] === undefined || str[i - 1].trim() !== "" && str[i - 1] !== "<" && str[i - 1] !== "/") {
              count.spacesBetweenLetterChunks += 1;
            } else {
              for (let y = i - 1; y--;) {
                if (str[y].trim() !== "") {
                  if (str[y] === "<") {
                    bail = true;
                  } else if (str[y] !== "/") {
                    count.spacesBetweenLetterChunks += i - y;
                  }

                  break;
                }
              }
            }
          }
        } else {
          if (str[i] === "=") {
            count.equalOnly += 1;

            if (str[i + 1] === '"') {
              count.equalDoubleQuoteCombo += 1;
            }
          } else if (str[i] === '"') {
            count.doubleQuoteOnly += 1;
          }

          if (bracketJustFound) {
            bracketJustFound = false;
          }

          if (whiteSpaceWithinTagEndsAt !== null) {
            preliminaryIndexesToDelete.push([i + 1, whiteSpaceWithinTagEndsAt]);
            whiteSpaceWithinTagEndsAt = null;
          }

          if (str[i] === ">") {
            count = resetCounts();
            bracketJustFound = true;

            if (stateWithinTag) {
              preliminaryIndexesToDelete = [];
            } else {
              stateWithinTag = true;

              if (str[i - 1] !== undefined && str[i - 1].trim() === "" && !whiteSpaceWithinTagEndsAt) {
                whiteSpaceWithinTagEndsAt = i;
              }
            }

            if (!tagCanEndHere) {
              tagCanEndHere = true;
            }
          } else if (str[i] === "<") {
            stateWithinTag = false;

            if (bail) {
              bail = false;
            }

            if (count.spacesBetweenLetterChunks > 0 && count.equalDoubleQuoteCombo === 0) {
              tagMatched = false;
              preliminaryIndexesToDelete = [];
            }

            if (tagMatched) {
              if (preliminaryIndexesToDelete.length) {
                preliminaryIndexesToDelete.forEach(([rangeStart, rangeEnd]) => finalIndexesToDelete.push([rangeStart, rangeEnd]));
              }

              tagMatched = false;
            }

            count = resetCounts();
          } else if (stateWithinTag && str[i] === "/") {
            whiteSpaceWithinTagEndsAt = i;
          } else if (stateWithinTag && !tagMatched) {
            if (tagCanEndHere && charCodeBetweenInclusive(str[i], 97, 122)) {
              tagCanEndHere = false;

              if (charCodeBetweenInclusive(str[i], 97, 110)) {
                if (str[i] === "a" && (str[i - 1] === "e" && matchLeftIncl(str, i, ["area", "textarea"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i - 1] === "t" && matchLeftIncl(str, i, ["data", "meta"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === "b" && (matchLeftIncl(str, i, ["rb", "sub"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === "c" && matchLeftIncl(str, i, "rtc", {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i] === "d" && (str[i - 1] === "a" && matchLeftIncl(str, i, ["head", "thead"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || matchLeftIncl(str, i, ["kbd", "dd", "embed", "legend", "td"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                })) || str[i] === "e" && (matchLeftIncl(str, i, "source", {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i - 1] === "d" && matchLeftIncl(str, i, ["aside", "code"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i - 1] === "l" && matchLeftIncl(str, i, ["table", "article", "title", "style"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i - 1] === "m" && matchLeftIncl(str, i, ["iframe", "time"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i - 1] === "r" && matchLeftIncl(str, i, ["pre", "figure", "picture"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i - 1] === "t" && matchLeftIncl(str, i, ["template", "cite", "blockquote"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || matchLeftIncl(str, i, "base", {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === "g" && matchLeftIncl(str, i, ["img", "strong", "dialog", "svg"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i] === "h" && matchLeftIncl(str, i, ["th", "math"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i] === "i" && (matchLeftIncl(str, i, ["bdi", "li"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === "k" && matchLeftIncl(str, i, ["track", "link", "mark"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i] === "l" && matchLeftIncl(str, i, ["html", "ol", "ul", "dl", "label", "del", "small", "col"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i] === "m" && matchLeftIncl(str, i, ["param", "em", "menuitem", "form"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i] === "n" && (str[i - 1] === "o" && matchLeftIncl(str, i, ["section", "caption", "figcaption", "option", "button"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || matchLeftIncl(str, i, ["span", "keygen", "dfn", "main"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }))) {
                  tagMatched = true;
                }
              } else {
                if (str[i] === "o" && matchLeftIncl(str, i, ["bdo", "video", "audio"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i] === "p" && (isSpaceOrLeftBracket(str[i - 1]) || str[i - 1] === "u" && matchLeftIncl(str, i, ["hgroup", "colgroup", "optgroup", "sup"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || matchLeftIncl(str, i, ["map", "samp", "rp"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                })) || str[i] === "q" && isSpaceOrLeftBracket(str[i - 1]) || str[i] === "r" && (str[i - 1] === "e" && matchLeftIncl(str, i, ["header", "meter", "footer"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || matchLeftIncl(str, i, ["var", "br", "abbr", "wbr", "hr", "tr"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                })) || str[i] === "s" && (str[i - 1] === "s" && matchLeftIncl(str, i, ["address", "progress"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || matchLeftIncl(str, i, ["canvas", "details", "ins"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === "t" && (str[i - 1] === "c" && matchLeftIncl(str, i, ["object", "select"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i - 1] === "o" && matchLeftIncl(str, i, ["slot", "tfoot"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i - 1] === "p" && matchLeftIncl(str, i, ["script", "noscript"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i - 1] === "u" && matchLeftIncl(str, i, ["input", "output"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || matchLeftIncl(str, i, ["fieldset", "rt", "datalist", "dt"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                })) || str[i] === "u" && (isSpaceOrLeftBracket(str[i - 1]) || matchLeftIncl(str, i, "menu", {
                  cb: isSpaceOrLeftBracket,
                  i: true
                })) || str[i] === "v" && matchLeftIncl(str, i, ["nav", "div"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                }) || str[i] === "y" && matchLeftIncl(str, i, ["ruby", "body", "tbody", "summary"], {
                  cb: isSpaceOrLeftBracket,
                  i: true
                })) {
                  tagMatched = true;
                }
              }
            } else if (tagCanEndHere && charCodeBetweenInclusive(str[i], 49, 54)) {
              tagCanEndHere = false;

              if (str[i - 1] === "h" && (str[i - 2] === "<" || str[i - 2].trim() === "")) {
                tagMatched = true;
              }
            } else if (str[i] === "=" || str[i] === '"') {
              tagCanEndHere = false;
            }
          }
        }
      }
    }

    if (opts.returnRangesOnly) {
      return mergeRanges(finalIndexesToDelete);
    }

    return finalIndexesToDelete.length ? rangesApply(str, finalIndexesToDelete) : str;
  }

  /**
   * string-trim-spaces-only
   * Like String.trim() but you can choose granularly what to trim
   * Version: 2.8.11
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-trim-spaces-only
   */
  function trimSpaces(s, originalOpts) {
    if (typeof s !== "string") {
      throw new Error(`string-trim-spaces-only: [THROW_ID_01] input must be string! It was given as ${typeof s}, equal to:\n${JSON.stringify(s, null, 4)}`);
    }

    const defaults = {
      classicTrim: false,
      cr: false,
      lf: false,
      tab: false,
      space: true,
      nbsp: false
    };
    const opts = Object.assign({}, defaults, originalOpts);

    function check(char) {
      return opts.classicTrim && char.trim().length === 0 || !opts.classicTrim && (opts.space && char === " " || opts.cr && char === "\r" || opts.lf && char === "\n" || opts.tab && char === "\t" || opts.nbsp && char === "\u00a0");
    }

    let newStart;
    let newEnd;

    if (s.length > 0) {
      if (check(s[0])) {
        for (let i = 0, len = s.length; i < len; i++) {
          if (!check(s[i])) {
            newStart = i;
            break;
          }

          if (i === s.length - 1) {
            return {
              res: "",
              ranges: [[0, s.length]]
            };
          }
        }
      }

      if (check(s[s.length - 1])) {
        for (let i = s.length; i--;) {
          if (!check(s[i])) {
            newEnd = i + 1;
            break;
          }
        }
      }

      if (newStart) {
        if (newEnd) {
          return {
            res: s.slice(newStart, newEnd),
            ranges: [[0, newStart], [newEnd, s.length]]
          };
        }

        return {
          res: s.slice(newStart),
          ranges: [[0, newStart]]
        };
      }

      if (newEnd) {
        return {
          res: s.slice(0, newEnd),
          ranges: [[newEnd, s.length]]
        };
      }

      return {
        res: s,
        ranges: []
      };
    }

    return {
      res: "",
      ranges: []
    };
  }

  var version = "5.8.11";

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as references for various `Number` constants. */

  var INFINITY = 1 / 0;
  /** `Object#toString` result references. */

  var symbolTag = '[object Symbol]';
  /** Used to match leading and trailing whitespace. */

  var reTrim = /^\s+|\s+$/g;
  /** Used to compose unicode character classes. */

  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
      rsComboSymbolsRange = '\\u20d0-\\u20f0',
      rsVarRange = '\\ufe0e\\ufe0f';
  /** Used to compose unicode capture groups. */

  var rsAstral = '[' + rsAstralRange + ']',
      rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsZWJ = '\\u200d';
  /** Used to compose unicode regexes. */

  var reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');
  /** Detect free variable `global` from Node.js. */

  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  /** Detect free variable `self`. */

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = freeGlobal || freeSelf || Function('return this')();
  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */

  function asciiToArray(string) {
    return string.split('');
  }
  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */


  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }

    return -1;
  }
  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */


  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return baseFindIndex(array, baseIsNaN, fromIndex);
    }

    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }

    return -1;
  }
  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */


  function baseIsNaN(value) {
    return value !== value;
  }
  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */


  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

    return index;
  }
  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */


  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

    return index;
  }
  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */


  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */


  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */


  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  /** Used for built-in method references. */


  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var objectToString$1 = objectProto$1.toString;
  /** Built-in value references. */

  var Symbol$1 = root.Symbol;
  /** Used to convert symbols to primitives and strings. */

  var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;
  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */

  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }

    end = end > length ? length : end;

    if (end < 0) {
      end += length;
    }

    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);

    while (++index < length) {
      result[index] = array[index + start];
    }

    return result;
  }
  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */


  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }

    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }
  /**
   * Casts `array` to a slice if it's needed.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {number} start The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the cast slice.
   */


  function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return !start && end >= length ? array : baseSlice(array, start, end);
  }
  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */


  function isObjectLike$1(value) {
    return !!value && typeof value == 'object';
  }
  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */


  function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike$1(value) && objectToString$1.call(value) == symbolTag;
  }
  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */


  function toString(value) {
    return value == null ? '' : baseToString(value);
  }
  /**
   * Removes leading and trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trim('  abc  ');
   * // => 'abc'
   *
   * _.trim('-_-abc-_-', '_-');
   * // => 'abc'
   *
   * _.map(['  foo  ', '  bar  '], _.trim);
   * // => ['foo', 'bar']
   */


  function trim(string, chars, guard) {
    string = toString(string);

    if (string && (guard || chars === undefined)) {
      return string.replace(reTrim, '');
    }

    if (!string || !(chars = baseToString(chars))) {
      return string;
    }

    var strSymbols = stringToArray(string),
        chrSymbols = stringToArray(chars),
        start = charsStartIndex(strSymbols, chrSymbols),
        end = charsEndIndex(strSymbols, chrSymbols) + 1;
    return castSlice(strSymbols, start, end).join('');
  }

  var lodash_trim = trim;

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the size to enable large array optimizations. */

  var LARGE_ARRAY_SIZE = 200;
  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  /** Used as references for various `Number` constants. */

  var MAX_SAFE_INTEGER = 9007199254740991;
  /** `Object#toString` result references. */

  var funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]';
  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */

  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  /** Used to detect host constructors (Safari). */

  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  /** Detect free variable `global` from Node.js. */

  var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  /** Detect free variable `self`. */

  var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();
  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */

  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);

      case 1:
        return func.call(thisArg, args[0]);

      case 2:
        return func.call(thisArg, args[0], args[1]);

      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }

    return func.apply(thisArg, args);
  }
  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */


  function arrayIncludes(array, value) {
    var length = array ? array.length : 0;
    return !!length && baseIndexOf$1(array, value, 0) > -1;
  }
  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */


  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }

    return false;
  }
  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */


  function arrayMap(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }

    return result;
  }
  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */


  function baseFindIndex$1(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }

    return -1;
  }
  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */


  function baseIndexOf$1(array, value, fromIndex) {
    if (value !== value) {
      return baseFindIndex$1(array, baseIsNaN$1, fromIndex);
    }

    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }

    return -1;
  }
  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */


  function baseIsNaN$1(value) {
    return value !== value;
  }
  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */


  function baseUnary(func) {
    return function (value) {
      return func(value);
    };
  }
  /**
   * Checks if a cache value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */


  function cacheHas(cache, key) {
    return cache.has(key);
  }
  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */


  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }
  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */


  function isHostObject$1(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;

    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }

    return result;
  }
  /** Used for built-in method references. */


  var arrayProto = Array.prototype,
      funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;
  /** Used to detect overreaching core-js shims. */

  var coreJsData = root$1['__core-js_shared__'];
  /** Used to detect methods masquerading as native. */

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  /** Used to resolve the decompiled source of functions. */


  var funcToString$1 = funcProto$1.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var objectToString$2 = objectProto$2.toString;
  /** Used to detect if a method is native. */

  var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /** Built-in value references. */

  var splice = arrayProto.splice;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax = Math.max;
  /* Built-in method references that are verified to be native. */

  var Map = getNative(root$1, 'Map'),
      nativeCreate = getNative(Object, 'create');
  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Hash(entries) {
    var index = -1,
        length = entries ? entries.length : 0;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */


  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }
  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */


  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }
  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */


  function hashGet(key) {
    var data = this.__data__;

    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
  }
  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */


  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty$1.call(data, key);
  }
  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */


  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
  } // Add methods to `Hash`.


  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function ListCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */


  function listCacheClear() {
    this.__data__ = [];
  }
  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */


  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    return true;
  }
  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */


  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }
  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */


  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */


  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  } // Add methods to `ListCache`.


  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function MapCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */


  function mapCacheClear() {
    this.__data__ = {
      'hash': new Hash(),
      'map': new (Map || ListCache)(),
      'string': new Hash()
    };
  }
  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */


  function mapCacheDelete(key) {
    return getMapData(this, key)['delete'](key);
  }
  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */


  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */


  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */


  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  } // Add methods to `MapCache`.


  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */

  function SetCache(values) {
    var index = -1,
        length = values ? values.length : 0;
    this.__data__ = new MapCache();

    while (++index < length) {
      this.add(values[index]);
    }
  }
  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */


  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);

    return this;
  }
  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */


  function setCacheHas(value) {
    return this.__data__.has(value);
  } // Add methods to `SetCache`.


  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }
  /**
   * The base implementation of methods like `_.difference` without support
   * for excluding multiple arrays or iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Array} values The values to exclude.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   */


  function baseDifference(array, values, iteratee, comparator) {
    var index = -1,
        includes = arrayIncludes,
        isCommon = true,
        length = array.length,
        result = [],
        valuesLength = values.length;

    if (!length) {
      return result;
    }

    if (iteratee) {
      values = arrayMap(values, baseUnary(iteratee));
    }

    if (comparator) {
      includes = arrayIncludesWith;
      isCommon = false;
    } else if (values.length >= LARGE_ARRAY_SIZE) {
      includes = cacheHas;
      isCommon = false;
      values = new SetCache(values);
    }

    outer: while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;

      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;

        while (valuesIndex--) {
          if (values[valuesIndex] === computed) {
            continue outer;
          }
        }

        result.push(value);
      } else if (!includes(values, computed, comparator)) {
        result.push(value);
      }
    }

    return result;
  }
  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */


  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }

    var pattern = isFunction(value) || isHostObject$1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */


  function baseRest(func, start) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }

      index = -1;
      var otherArgs = Array(start + 1);

      while (++index < start) {
        otherArgs[index] = args[index];
      }

      otherArgs[start] = array;
      return apply(func, this, otherArgs);
    };
  }
  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */


  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }
  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */


  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }
  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */


  function isKeyable(value) {
    var type = typeof value;
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }
  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */


  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to process.
   * @returns {string} Returns the source code.
   */


  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }
  /**
   * Creates an array excluding all given values using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * **Note:** Unlike `_.pull`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...*} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @see _.difference, _.xor
   * @example
   *
   * _.without([2, 1, 2, 3], 1, 2);
   * // => [3]
   */


  var without = baseRest(function (array, values) {
    return isArrayLikeObject(array) ? baseDifference(array, values) : [];
  });
  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */

  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */


  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */


  function isArrayLikeObject(value) {
    return isObjectLike$2(value) && isArrayLike(value);
  }
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */


  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString$2.call(value) : '';
    return tag == funcTag || tag == genTag;
  }
  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */


  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */


  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }
  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */


  function isObjectLike$2(value) {
    return !!value && typeof value == 'object';
  }

  var lodash_without = without;

  /*! https://mths.be/punycode v1.4.1 by @mathias */

  /** Highest positive signed 32-bit float value */
  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */

  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80

  var delimiter = '-'; // '\x2D'

  /** Regular expressions */

  var regexPunycode = /^xn--/;
  var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars

  var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

  /** Error messages */

  var errors = {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  };
  /** Convenience shortcuts */

  var baseMinusTMin = base - tMin;
  var floor = Math.floor;
  var stringFromCharCode = String.fromCharCode;
  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */

  function error(type) {
    throw new RangeError(errors[type]);
  }
  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */


  function map$3(array, fn) {
    var length = array.length;
    var result = [];

    while (length--) {
      result[length] = fn(array[length]);
    }

    return result;
  }
  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */


  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';

    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    } // Avoid `split(regex)` for IE8 compatibility. See #17.


    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map$3(labels, fn).join('.');
    return result + encoded;
  }
  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */


  function ucs2decode(string) {
    var output = [],
        counter = 0,
        length = string.length,
        value,
        extra;

    while (counter < length) {
      value = string.charCodeAt(counter++);

      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  }
  /**
   * Creates a string based on an array of numeric code points.
   * @see `punycode.ucs2.decode`
   * @memberOf punycode.ucs2
   * @name encode
   * @param {Array} codePoints The array of numeric code points.
   * @returns {String} The new Unicode string (UCS-2).
   */


  function ucs2encode(array) {
    return map$3(array, function (value) {
      var output = '';

      if (value > 0xFFFF) {
        value -= 0x10000;
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }

      output += stringFromCharCode(value);
      return output;
    }).join('');
  }
  /**
   * Converts a basic code point into a digit/integer.
   * @see `digitToBasic()`
   * @private
   * @param {Number} codePoint The basic numeric code point value.
   * @returns {Number} The numeric value of a basic code point (for use in
   * representing integers) in the range `0` to `base - 1`, or `base` if
   * the code point does not represent a value.
   */


  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22;
    }

    if (codePoint - 65 < 26) {
      return codePoint - 65;
    }

    if (codePoint - 97 < 26) {
      return codePoint - 97;
    }

    return base;
  }
  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */


  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }
  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */


  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);

    for (;
    /* no initialization */
    delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }

    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }
  /**
   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
   * symbols.
   * @memberOf punycode
   * @param {String} input The Punycode string of ASCII-only symbols.
   * @returns {String} The resulting string of Unicode symbols.
   */


  function decode$1(input) {
    // Don't use UCS-2
    var output = [],
        inputLength = input.length,
        out,
        i = 0,
        n = initialN,
        bias = initialBias,
        basic,
        j,
        index,
        oldi,
        w,
        k,
        digit,
        t,

    /** Cached calculation results */
    baseMinusT; // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.

    basic = input.lastIndexOf(delimiter);

    if (basic < 0) {
      basic = 0;
    }

    for (j = 0; j < basic; ++j) {
      // if it's not a basic code point
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic');
      }

      output.push(input.charCodeAt(j));
    } // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.


    for (index = basic > 0 ? basic + 1 : 0; index < inputLength;)
    /* no final expression */
    {
      // `index` is the index of the next character to be consumed.
      // Decode a generalized variable-length integer into `delta`,
      // which gets added to `i`. The overflow checking is easier
      // if we increase `i` as we go, then subtract off its starting
      // value at the end to obtain `delta`.
      for (oldi = i, w = 1, k = base;;
      /* no condition */
      k += base) {
        if (index >= inputLength) {
          error('invalid-input');
        }

        digit = basicToDigit(input.charCodeAt(index++));

        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow');
        }

        i += digit * w;
        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

        if (digit < t) {
          break;
        }

        baseMinusT = base - t;

        if (w > floor(maxInt / baseMinusT)) {
          error('overflow');
        }

        w *= baseMinusT;
      }

      out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0); // `i` was supposed to wrap around from `out` to `0`,
      // incrementing `n` each time, so we'll fix that now:

      if (floor(i / out) > maxInt - n) {
        error('overflow');
      }

      n += floor(i / out);
      i %= out; // Insert `n` at position `i` of the output

      output.splice(i++, 0, n);
    }

    return ucs2encode(output);
  }
  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */

  function encode(input) {
    var n,
        delta,
        handledCPCount,
        basicLength,
        bias,
        j,
        m,
        q,
        k,
        t,
        currentValue,
        output = [],

    /** `inputLength` will hold the number of code points in `input`. */
    inputLength,

    /** Cached calculation results */
    handledCPCountPlusOne,
        baseMinusT,
        qMinusT; // Convert the input in UCS-2 to Unicode

    input = ucs2decode(input); // Cache the length

    inputLength = input.length; // Initialize the state

    n = initialN;
    delta = 0;
    bias = initialBias; // Handle the basic code points

    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];

      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    handledCPCount = basicLength = output.length; // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.
    // Finish the basic string - if it is not empty - with a delimiter

    if (basicLength) {
      output.push(delimiter);
    } // Main encoding loop:


    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow


      handledCPCountPlusOne = handledCPCount + 1;

      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base;;
          /* no condition */
          k += base) {
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

            if (q < t) {
              break;
            }

            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }

    return output.join('');
  }
  /**
   * Converts a Punycode string representing a domain name or an email address
   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
   * it doesn't matter if you call it on a string that has already been
   * converted to Unicode.
   * @memberOf punycode
   * @param {String} input The Punycoded domain name or email address to
   * convert to Unicode.
   * @returns {String} The Unicode representation of the given Punycode
   * string.
   */

  function toUnicode(input) {
    return mapDomain(input, function (string) {
      return regexPunycode.test(string) ? decode$1(string.slice(4).toLowerCase()) : string;
    });
  }
  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */

  function toASCII(input) {
    return mapDomain(input, function (string) {
      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
  }
  var version$1 = '1.4.1';
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */

  var ucs2 = {
    decode: ucs2decode,
    encode: ucs2encode
  };
  var punycode = {
    version: version$1,
    ucs2: ucs2,
    toASCII: toASCII,
    toUnicode: toUnicode,
    encode: encode,
    decode: decode$1
  };

  var punycode$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    decode: decode$1,
    encode: encode,
    toUnicode: toUnicode,
    toASCII: toASCII,
    version: version$1,
    ucs2: ucs2,
    'default': punycode
  });

  var reversed = {
  	"9": "Tab;",
  	"10": "NewLine;",
  	"33": "excl;",
  	"34": "quot;",
  	"35": "num;",
  	"36": "dollar;",
  	"37": "percnt;",
  	"38": "amp;",
  	"39": "apos;",
  	"40": "lpar;",
  	"41": "rpar;",
  	"42": "midast;",
  	"43": "plus;",
  	"44": "comma;",
  	"46": "period;",
  	"47": "sol;",
  	"58": "colon;",
  	"59": "semi;",
  	"60": "lt;",
  	"61": "equals;",
  	"62": "gt;",
  	"63": "quest;",
  	"64": "commat;",
  	"91": "lsqb;",
  	"92": "bsol;",
  	"93": "rsqb;",
  	"94": "Hat;",
  	"95": "UnderBar;",
  	"96": "grave;",
  	"123": "lcub;",
  	"124": "VerticalLine;",
  	"125": "rcub;",
  	"160": "NonBreakingSpace;",
  	"161": "iexcl;",
  	"162": "cent;",
  	"163": "pound;",
  	"164": "curren;",
  	"165": "yen;",
  	"166": "brvbar;",
  	"167": "sect;",
  	"168": "uml;",
  	"169": "copy;",
  	"170": "ordf;",
  	"171": "laquo;",
  	"172": "not;",
  	"173": "shy;",
  	"174": "reg;",
  	"175": "strns;",
  	"176": "deg;",
  	"177": "pm;",
  	"178": "sup2;",
  	"179": "sup3;",
  	"180": "DiacriticalAcute;",
  	"181": "micro;",
  	"182": "para;",
  	"183": "middot;",
  	"184": "Cedilla;",
  	"185": "sup1;",
  	"186": "ordm;",
  	"187": "raquo;",
  	"188": "frac14;",
  	"189": "half;",
  	"190": "frac34;",
  	"191": "iquest;",
  	"192": "Agrave;",
  	"193": "Aacute;",
  	"194": "Acirc;",
  	"195": "Atilde;",
  	"196": "Auml;",
  	"197": "Aring;",
  	"198": "AElig;",
  	"199": "Ccedil;",
  	"200": "Egrave;",
  	"201": "Eacute;",
  	"202": "Ecirc;",
  	"203": "Euml;",
  	"204": "Igrave;",
  	"205": "Iacute;",
  	"206": "Icirc;",
  	"207": "Iuml;",
  	"208": "ETH;",
  	"209": "Ntilde;",
  	"210": "Ograve;",
  	"211": "Oacute;",
  	"212": "Ocirc;",
  	"213": "Otilde;",
  	"214": "Ouml;",
  	"215": "times;",
  	"216": "Oslash;",
  	"217": "Ugrave;",
  	"218": "Uacute;",
  	"219": "Ucirc;",
  	"220": "Uuml;",
  	"221": "Yacute;",
  	"222": "THORN;",
  	"223": "szlig;",
  	"224": "agrave;",
  	"225": "aacute;",
  	"226": "acirc;",
  	"227": "atilde;",
  	"228": "auml;",
  	"229": "aring;",
  	"230": "aelig;",
  	"231": "ccedil;",
  	"232": "egrave;",
  	"233": "eacute;",
  	"234": "ecirc;",
  	"235": "euml;",
  	"236": "igrave;",
  	"237": "iacute;",
  	"238": "icirc;",
  	"239": "iuml;",
  	"240": "eth;",
  	"241": "ntilde;",
  	"242": "ograve;",
  	"243": "oacute;",
  	"244": "ocirc;",
  	"245": "otilde;",
  	"246": "ouml;",
  	"247": "divide;",
  	"248": "oslash;",
  	"249": "ugrave;",
  	"250": "uacute;",
  	"251": "ucirc;",
  	"252": "uuml;",
  	"253": "yacute;",
  	"254": "thorn;",
  	"255": "yuml;",
  	"256": "Amacr;",
  	"257": "amacr;",
  	"258": "Abreve;",
  	"259": "abreve;",
  	"260": "Aogon;",
  	"261": "aogon;",
  	"262": "Cacute;",
  	"263": "cacute;",
  	"264": "Ccirc;",
  	"265": "ccirc;",
  	"266": "Cdot;",
  	"267": "cdot;",
  	"268": "Ccaron;",
  	"269": "ccaron;",
  	"270": "Dcaron;",
  	"271": "dcaron;",
  	"272": "Dstrok;",
  	"273": "dstrok;",
  	"274": "Emacr;",
  	"275": "emacr;",
  	"278": "Edot;",
  	"279": "edot;",
  	"280": "Eogon;",
  	"281": "eogon;",
  	"282": "Ecaron;",
  	"283": "ecaron;",
  	"284": "Gcirc;",
  	"285": "gcirc;",
  	"286": "Gbreve;",
  	"287": "gbreve;",
  	"288": "Gdot;",
  	"289": "gdot;",
  	"290": "Gcedil;",
  	"292": "Hcirc;",
  	"293": "hcirc;",
  	"294": "Hstrok;",
  	"295": "hstrok;",
  	"296": "Itilde;",
  	"297": "itilde;",
  	"298": "Imacr;",
  	"299": "imacr;",
  	"302": "Iogon;",
  	"303": "iogon;",
  	"304": "Idot;",
  	"305": "inodot;",
  	"306": "IJlig;",
  	"307": "ijlig;",
  	"308": "Jcirc;",
  	"309": "jcirc;",
  	"310": "Kcedil;",
  	"311": "kcedil;",
  	"312": "kgreen;",
  	"313": "Lacute;",
  	"314": "lacute;",
  	"315": "Lcedil;",
  	"316": "lcedil;",
  	"317": "Lcaron;",
  	"318": "lcaron;",
  	"319": "Lmidot;",
  	"320": "lmidot;",
  	"321": "Lstrok;",
  	"322": "lstrok;",
  	"323": "Nacute;",
  	"324": "nacute;",
  	"325": "Ncedil;",
  	"326": "ncedil;",
  	"327": "Ncaron;",
  	"328": "ncaron;",
  	"329": "napos;",
  	"330": "ENG;",
  	"331": "eng;",
  	"332": "Omacr;",
  	"333": "omacr;",
  	"336": "Odblac;",
  	"337": "odblac;",
  	"338": "OElig;",
  	"339": "oelig;",
  	"340": "Racute;",
  	"341": "racute;",
  	"342": "Rcedil;",
  	"343": "rcedil;",
  	"344": "Rcaron;",
  	"345": "rcaron;",
  	"346": "Sacute;",
  	"347": "sacute;",
  	"348": "Scirc;",
  	"349": "scirc;",
  	"350": "Scedil;",
  	"351": "scedil;",
  	"352": "Scaron;",
  	"353": "scaron;",
  	"354": "Tcedil;",
  	"355": "tcedil;",
  	"356": "Tcaron;",
  	"357": "tcaron;",
  	"358": "Tstrok;",
  	"359": "tstrok;",
  	"360": "Utilde;",
  	"361": "utilde;",
  	"362": "Umacr;",
  	"363": "umacr;",
  	"364": "Ubreve;",
  	"365": "ubreve;",
  	"366": "Uring;",
  	"367": "uring;",
  	"368": "Udblac;",
  	"369": "udblac;",
  	"370": "Uogon;",
  	"371": "uogon;",
  	"372": "Wcirc;",
  	"373": "wcirc;",
  	"374": "Ycirc;",
  	"375": "ycirc;",
  	"376": "Yuml;",
  	"377": "Zacute;",
  	"378": "zacute;",
  	"379": "Zdot;",
  	"380": "zdot;",
  	"381": "Zcaron;",
  	"382": "zcaron;",
  	"402": "fnof;",
  	"437": "imped;",
  	"501": "gacute;",
  	"567": "jmath;",
  	"710": "circ;",
  	"711": "Hacek;",
  	"728": "breve;",
  	"729": "dot;",
  	"730": "ring;",
  	"731": "ogon;",
  	"732": "tilde;",
  	"733": "DiacriticalDoubleAcute;",
  	"785": "DownBreve;",
  	"913": "Alpha;",
  	"914": "Beta;",
  	"915": "Gamma;",
  	"916": "Delta;",
  	"917": "Epsilon;",
  	"918": "Zeta;",
  	"919": "Eta;",
  	"920": "Theta;",
  	"921": "Iota;",
  	"922": "Kappa;",
  	"923": "Lambda;",
  	"924": "Mu;",
  	"925": "Nu;",
  	"926": "Xi;",
  	"927": "Omicron;",
  	"928": "Pi;",
  	"929": "Rho;",
  	"931": "Sigma;",
  	"932": "Tau;",
  	"933": "Upsilon;",
  	"934": "Phi;",
  	"935": "Chi;",
  	"936": "Psi;",
  	"937": "Omega;",
  	"945": "alpha;",
  	"946": "beta;",
  	"947": "gamma;",
  	"948": "delta;",
  	"949": "epsilon;",
  	"950": "zeta;",
  	"951": "eta;",
  	"952": "theta;",
  	"953": "iota;",
  	"954": "kappa;",
  	"955": "lambda;",
  	"956": "mu;",
  	"957": "nu;",
  	"958": "xi;",
  	"959": "omicron;",
  	"960": "pi;",
  	"961": "rho;",
  	"962": "varsigma;",
  	"963": "sigma;",
  	"964": "tau;",
  	"965": "upsilon;",
  	"966": "phi;",
  	"967": "chi;",
  	"968": "psi;",
  	"969": "omega;",
  	"977": "vartheta;",
  	"978": "upsih;",
  	"981": "varphi;",
  	"982": "varpi;",
  	"988": "Gammad;",
  	"989": "gammad;",
  	"1008": "varkappa;",
  	"1009": "varrho;",
  	"1013": "varepsilon;",
  	"1014": "bepsi;",
  	"1025": "IOcy;",
  	"1026": "DJcy;",
  	"1027": "GJcy;",
  	"1028": "Jukcy;",
  	"1029": "DScy;",
  	"1030": "Iukcy;",
  	"1031": "YIcy;",
  	"1032": "Jsercy;",
  	"1033": "LJcy;",
  	"1034": "NJcy;",
  	"1035": "TSHcy;",
  	"1036": "KJcy;",
  	"1038": "Ubrcy;",
  	"1039": "DZcy;",
  	"1040": "Acy;",
  	"1041": "Bcy;",
  	"1042": "Vcy;",
  	"1043": "Gcy;",
  	"1044": "Dcy;",
  	"1045": "IEcy;",
  	"1046": "ZHcy;",
  	"1047": "Zcy;",
  	"1048": "Icy;",
  	"1049": "Jcy;",
  	"1050": "Kcy;",
  	"1051": "Lcy;",
  	"1052": "Mcy;",
  	"1053": "Ncy;",
  	"1054": "Ocy;",
  	"1055": "Pcy;",
  	"1056": "Rcy;",
  	"1057": "Scy;",
  	"1058": "Tcy;",
  	"1059": "Ucy;",
  	"1060": "Fcy;",
  	"1061": "KHcy;",
  	"1062": "TScy;",
  	"1063": "CHcy;",
  	"1064": "SHcy;",
  	"1065": "SHCHcy;",
  	"1066": "HARDcy;",
  	"1067": "Ycy;",
  	"1068": "SOFTcy;",
  	"1069": "Ecy;",
  	"1070": "YUcy;",
  	"1071": "YAcy;",
  	"1072": "acy;",
  	"1073": "bcy;",
  	"1074": "vcy;",
  	"1075": "gcy;",
  	"1076": "dcy;",
  	"1077": "iecy;",
  	"1078": "zhcy;",
  	"1079": "zcy;",
  	"1080": "icy;",
  	"1081": "jcy;",
  	"1082": "kcy;",
  	"1083": "lcy;",
  	"1084": "mcy;",
  	"1085": "ncy;",
  	"1086": "ocy;",
  	"1087": "pcy;",
  	"1088": "rcy;",
  	"1089": "scy;",
  	"1090": "tcy;",
  	"1091": "ucy;",
  	"1092": "fcy;",
  	"1093": "khcy;",
  	"1094": "tscy;",
  	"1095": "chcy;",
  	"1096": "shcy;",
  	"1097": "shchcy;",
  	"1098": "hardcy;",
  	"1099": "ycy;",
  	"1100": "softcy;",
  	"1101": "ecy;",
  	"1102": "yucy;",
  	"1103": "yacy;",
  	"1105": "iocy;",
  	"1106": "djcy;",
  	"1107": "gjcy;",
  	"1108": "jukcy;",
  	"1109": "dscy;",
  	"1110": "iukcy;",
  	"1111": "yicy;",
  	"1112": "jsercy;",
  	"1113": "ljcy;",
  	"1114": "njcy;",
  	"1115": "tshcy;",
  	"1116": "kjcy;",
  	"1118": "ubrcy;",
  	"1119": "dzcy;",
  	"8194": "ensp;",
  	"8195": "emsp;",
  	"8196": "emsp13;",
  	"8197": "emsp14;",
  	"8199": "numsp;",
  	"8200": "puncsp;",
  	"8201": "ThinSpace;",
  	"8202": "VeryThinSpace;",
  	"8203": "ZeroWidthSpace;",
  	"8204": "zwnj;",
  	"8205": "zwj;",
  	"8206": "lrm;",
  	"8207": "rlm;",
  	"8208": "hyphen;",
  	"8211": "ndash;",
  	"8212": "mdash;",
  	"8213": "horbar;",
  	"8214": "Vert;",
  	"8216": "OpenCurlyQuote;",
  	"8217": "rsquor;",
  	"8218": "sbquo;",
  	"8220": "OpenCurlyDoubleQuote;",
  	"8221": "rdquor;",
  	"8222": "ldquor;",
  	"8224": "dagger;",
  	"8225": "ddagger;",
  	"8226": "bullet;",
  	"8229": "nldr;",
  	"8230": "mldr;",
  	"8240": "permil;",
  	"8241": "pertenk;",
  	"8242": "prime;",
  	"8243": "Prime;",
  	"8244": "tprime;",
  	"8245": "bprime;",
  	"8249": "lsaquo;",
  	"8250": "rsaquo;",
  	"8254": "OverBar;",
  	"8257": "caret;",
  	"8259": "hybull;",
  	"8260": "frasl;",
  	"8271": "bsemi;",
  	"8279": "qprime;",
  	"8287": "MediumSpace;",
  	"8288": "NoBreak;",
  	"8289": "ApplyFunction;",
  	"8290": "it;",
  	"8291": "InvisibleComma;",
  	"8364": "euro;",
  	"8411": "TripleDot;",
  	"8412": "DotDot;",
  	"8450": "Copf;",
  	"8453": "incare;",
  	"8458": "gscr;",
  	"8459": "Hscr;",
  	"8460": "Poincareplane;",
  	"8461": "quaternions;",
  	"8462": "planckh;",
  	"8463": "plankv;",
  	"8464": "Iscr;",
  	"8465": "imagpart;",
  	"8466": "Lscr;",
  	"8467": "ell;",
  	"8469": "Nopf;",
  	"8470": "numero;",
  	"8471": "copysr;",
  	"8472": "wp;",
  	"8473": "primes;",
  	"8474": "rationals;",
  	"8475": "Rscr;",
  	"8476": "Rfr;",
  	"8477": "Ropf;",
  	"8478": "rx;",
  	"8482": "trade;",
  	"8484": "Zopf;",
  	"8487": "mho;",
  	"8488": "Zfr;",
  	"8489": "iiota;",
  	"8492": "Bscr;",
  	"8493": "Cfr;",
  	"8495": "escr;",
  	"8496": "expectation;",
  	"8497": "Fscr;",
  	"8499": "phmmat;",
  	"8500": "oscr;",
  	"8501": "aleph;",
  	"8502": "beth;",
  	"8503": "gimel;",
  	"8504": "daleth;",
  	"8517": "DD;",
  	"8518": "DifferentialD;",
  	"8519": "exponentiale;",
  	"8520": "ImaginaryI;",
  	"8531": "frac13;",
  	"8532": "frac23;",
  	"8533": "frac15;",
  	"8534": "frac25;",
  	"8535": "frac35;",
  	"8536": "frac45;",
  	"8537": "frac16;",
  	"8538": "frac56;",
  	"8539": "frac18;",
  	"8540": "frac38;",
  	"8541": "frac58;",
  	"8542": "frac78;",
  	"8592": "slarr;",
  	"8593": "uparrow;",
  	"8594": "srarr;",
  	"8595": "ShortDownArrow;",
  	"8596": "leftrightarrow;",
  	"8597": "varr;",
  	"8598": "UpperLeftArrow;",
  	"8599": "UpperRightArrow;",
  	"8600": "searrow;",
  	"8601": "swarrow;",
  	"8602": "nleftarrow;",
  	"8603": "nrightarrow;",
  	"8605": "rightsquigarrow;",
  	"8606": "twoheadleftarrow;",
  	"8607": "Uarr;",
  	"8608": "twoheadrightarrow;",
  	"8609": "Darr;",
  	"8610": "leftarrowtail;",
  	"8611": "rightarrowtail;",
  	"8612": "mapstoleft;",
  	"8613": "UpTeeArrow;",
  	"8614": "RightTeeArrow;",
  	"8615": "mapstodown;",
  	"8617": "larrhk;",
  	"8618": "rarrhk;",
  	"8619": "looparrowleft;",
  	"8620": "rarrlp;",
  	"8621": "leftrightsquigarrow;",
  	"8622": "nleftrightarrow;",
  	"8624": "lsh;",
  	"8625": "rsh;",
  	"8626": "ldsh;",
  	"8627": "rdsh;",
  	"8629": "crarr;",
  	"8630": "curvearrowleft;",
  	"8631": "curvearrowright;",
  	"8634": "olarr;",
  	"8635": "orarr;",
  	"8636": "lharu;",
  	"8637": "lhard;",
  	"8638": "upharpoonright;",
  	"8639": "upharpoonleft;",
  	"8640": "RightVector;",
  	"8641": "rightharpoondown;",
  	"8642": "RightDownVector;",
  	"8643": "LeftDownVector;",
  	"8644": "rlarr;",
  	"8645": "UpArrowDownArrow;",
  	"8646": "lrarr;",
  	"8647": "llarr;",
  	"8648": "uuarr;",
  	"8649": "rrarr;",
  	"8650": "downdownarrows;",
  	"8651": "ReverseEquilibrium;",
  	"8652": "rlhar;",
  	"8653": "nLeftarrow;",
  	"8654": "nLeftrightarrow;",
  	"8655": "nRightarrow;",
  	"8656": "Leftarrow;",
  	"8657": "Uparrow;",
  	"8658": "Rightarrow;",
  	"8659": "Downarrow;",
  	"8660": "Leftrightarrow;",
  	"8661": "vArr;",
  	"8662": "nwArr;",
  	"8663": "neArr;",
  	"8664": "seArr;",
  	"8665": "swArr;",
  	"8666": "Lleftarrow;",
  	"8667": "Rrightarrow;",
  	"8669": "zigrarr;",
  	"8676": "LeftArrowBar;",
  	"8677": "RightArrowBar;",
  	"8693": "duarr;",
  	"8701": "loarr;",
  	"8702": "roarr;",
  	"8703": "hoarr;",
  	"8704": "forall;",
  	"8705": "complement;",
  	"8706": "PartialD;",
  	"8707": "Exists;",
  	"8708": "NotExists;",
  	"8709": "varnothing;",
  	"8711": "nabla;",
  	"8712": "isinv;",
  	"8713": "notinva;",
  	"8715": "SuchThat;",
  	"8716": "NotReverseElement;",
  	"8719": "Product;",
  	"8720": "Coproduct;",
  	"8721": "sum;",
  	"8722": "minus;",
  	"8723": "mp;",
  	"8724": "plusdo;",
  	"8726": "ssetmn;",
  	"8727": "lowast;",
  	"8728": "SmallCircle;",
  	"8730": "Sqrt;",
  	"8733": "vprop;",
  	"8734": "infin;",
  	"8735": "angrt;",
  	"8736": "angle;",
  	"8737": "measuredangle;",
  	"8738": "angsph;",
  	"8739": "VerticalBar;",
  	"8740": "nsmid;",
  	"8741": "spar;",
  	"8742": "nspar;",
  	"8743": "wedge;",
  	"8744": "vee;",
  	"8745": "cap;",
  	"8746": "cup;",
  	"8747": "Integral;",
  	"8748": "Int;",
  	"8749": "tint;",
  	"8750": "oint;",
  	"8751": "DoubleContourIntegral;",
  	"8752": "Cconint;",
  	"8753": "cwint;",
  	"8754": "cwconint;",
  	"8755": "CounterClockwiseContourIntegral;",
  	"8756": "therefore;",
  	"8757": "because;",
  	"8758": "ratio;",
  	"8759": "Proportion;",
  	"8760": "minusd;",
  	"8762": "mDDot;",
  	"8763": "homtht;",
  	"8764": "Tilde;",
  	"8765": "bsim;",
  	"8766": "mstpos;",
  	"8767": "acd;",
  	"8768": "wreath;",
  	"8769": "nsim;",
  	"8770": "esim;",
  	"8771": "TildeEqual;",
  	"8772": "nsimeq;",
  	"8773": "TildeFullEqual;",
  	"8774": "simne;",
  	"8775": "NotTildeFullEqual;",
  	"8776": "TildeTilde;",
  	"8777": "NotTildeTilde;",
  	"8778": "approxeq;",
  	"8779": "apid;",
  	"8780": "bcong;",
  	"8781": "CupCap;",
  	"8782": "HumpDownHump;",
  	"8783": "HumpEqual;",
  	"8784": "esdot;",
  	"8785": "eDot;",
  	"8786": "fallingdotseq;",
  	"8787": "risingdotseq;",
  	"8788": "coloneq;",
  	"8789": "eqcolon;",
  	"8790": "eqcirc;",
  	"8791": "cire;",
  	"8793": "wedgeq;",
  	"8794": "veeeq;",
  	"8796": "trie;",
  	"8799": "questeq;",
  	"8800": "NotEqual;",
  	"8801": "equiv;",
  	"8802": "NotCongruent;",
  	"8804": "leq;",
  	"8805": "GreaterEqual;",
  	"8806": "LessFullEqual;",
  	"8807": "GreaterFullEqual;",
  	"8808": "lneqq;",
  	"8809": "gneqq;",
  	"8810": "NestedLessLess;",
  	"8811": "NestedGreaterGreater;",
  	"8812": "twixt;",
  	"8813": "NotCupCap;",
  	"8814": "NotLess;",
  	"8815": "NotGreater;",
  	"8816": "NotLessEqual;",
  	"8817": "NotGreaterEqual;",
  	"8818": "lsim;",
  	"8819": "gtrsim;",
  	"8820": "NotLessTilde;",
  	"8821": "NotGreaterTilde;",
  	"8822": "lg;",
  	"8823": "gtrless;",
  	"8824": "ntlg;",
  	"8825": "ntgl;",
  	"8826": "Precedes;",
  	"8827": "Succeeds;",
  	"8828": "PrecedesSlantEqual;",
  	"8829": "SucceedsSlantEqual;",
  	"8830": "prsim;",
  	"8831": "succsim;",
  	"8832": "nprec;",
  	"8833": "nsucc;",
  	"8834": "subset;",
  	"8835": "supset;",
  	"8836": "nsub;",
  	"8837": "nsup;",
  	"8838": "SubsetEqual;",
  	"8839": "supseteq;",
  	"8840": "nsubseteq;",
  	"8841": "nsupseteq;",
  	"8842": "subsetneq;",
  	"8843": "supsetneq;",
  	"8845": "cupdot;",
  	"8846": "uplus;",
  	"8847": "SquareSubset;",
  	"8848": "SquareSuperset;",
  	"8849": "SquareSubsetEqual;",
  	"8850": "SquareSupersetEqual;",
  	"8851": "SquareIntersection;",
  	"8852": "SquareUnion;",
  	"8853": "oplus;",
  	"8854": "ominus;",
  	"8855": "otimes;",
  	"8856": "osol;",
  	"8857": "odot;",
  	"8858": "ocir;",
  	"8859": "oast;",
  	"8861": "odash;",
  	"8862": "plusb;",
  	"8863": "minusb;",
  	"8864": "timesb;",
  	"8865": "sdotb;",
  	"8866": "vdash;",
  	"8867": "LeftTee;",
  	"8868": "top;",
  	"8869": "UpTee;",
  	"8871": "models;",
  	"8872": "vDash;",
  	"8873": "Vdash;",
  	"8874": "Vvdash;",
  	"8875": "VDash;",
  	"8876": "nvdash;",
  	"8877": "nvDash;",
  	"8878": "nVdash;",
  	"8879": "nVDash;",
  	"8880": "prurel;",
  	"8882": "vltri;",
  	"8883": "vrtri;",
  	"8884": "trianglelefteq;",
  	"8885": "trianglerighteq;",
  	"8886": "origof;",
  	"8887": "imof;",
  	"8888": "mumap;",
  	"8889": "hercon;",
  	"8890": "intercal;",
  	"8891": "veebar;",
  	"8893": "barvee;",
  	"8894": "angrtvb;",
  	"8895": "lrtri;",
  	"8896": "xwedge;",
  	"8897": "xvee;",
  	"8898": "xcap;",
  	"8899": "xcup;",
  	"8900": "diamond;",
  	"8901": "sdot;",
  	"8902": "Star;",
  	"8903": "divonx;",
  	"8904": "bowtie;",
  	"8905": "ltimes;",
  	"8906": "rtimes;",
  	"8907": "lthree;",
  	"8908": "rthree;",
  	"8909": "bsime;",
  	"8910": "cuvee;",
  	"8911": "cuwed;",
  	"8912": "Subset;",
  	"8913": "Supset;",
  	"8914": "Cap;",
  	"8915": "Cup;",
  	"8916": "pitchfork;",
  	"8917": "epar;",
  	"8918": "ltdot;",
  	"8919": "gtrdot;",
  	"8920": "Ll;",
  	"8921": "ggg;",
  	"8922": "LessEqualGreater;",
  	"8923": "gtreqless;",
  	"8926": "curlyeqprec;",
  	"8927": "curlyeqsucc;",
  	"8928": "nprcue;",
  	"8929": "nsccue;",
  	"8930": "nsqsube;",
  	"8931": "nsqsupe;",
  	"8934": "lnsim;",
  	"8935": "gnsim;",
  	"8936": "prnsim;",
  	"8937": "succnsim;",
  	"8938": "ntriangleleft;",
  	"8939": "ntriangleright;",
  	"8940": "ntrianglelefteq;",
  	"8941": "ntrianglerighteq;",
  	"8942": "vellip;",
  	"8943": "ctdot;",
  	"8944": "utdot;",
  	"8945": "dtdot;",
  	"8946": "disin;",
  	"8947": "isinsv;",
  	"8948": "isins;",
  	"8949": "isindot;",
  	"8950": "notinvc;",
  	"8951": "notinvb;",
  	"8953": "isinE;",
  	"8954": "nisd;",
  	"8955": "xnis;",
  	"8956": "nis;",
  	"8957": "notnivc;",
  	"8958": "notnivb;",
  	"8965": "barwedge;",
  	"8966": "doublebarwedge;",
  	"8968": "LeftCeiling;",
  	"8969": "RightCeiling;",
  	"8970": "lfloor;",
  	"8971": "RightFloor;",
  	"8972": "drcrop;",
  	"8973": "dlcrop;",
  	"8974": "urcrop;",
  	"8975": "ulcrop;",
  	"8976": "bnot;",
  	"8978": "profline;",
  	"8979": "profsurf;",
  	"8981": "telrec;",
  	"8982": "target;",
  	"8988": "ulcorner;",
  	"8989": "urcorner;",
  	"8990": "llcorner;",
  	"8991": "lrcorner;",
  	"8994": "sfrown;",
  	"8995": "ssmile;",
  	"9005": "cylcty;",
  	"9006": "profalar;",
  	"9014": "topbot;",
  	"9021": "ovbar;",
  	"9023": "solbar;",
  	"9084": "angzarr;",
  	"9136": "lmoustache;",
  	"9137": "rmoustache;",
  	"9140": "tbrk;",
  	"9141": "UnderBracket;",
  	"9142": "bbrktbrk;",
  	"9180": "OverParenthesis;",
  	"9181": "UnderParenthesis;",
  	"9182": "OverBrace;",
  	"9183": "UnderBrace;",
  	"9186": "trpezium;",
  	"9191": "elinters;",
  	"9251": "blank;",
  	"9416": "oS;",
  	"9472": "HorizontalLine;",
  	"9474": "boxv;",
  	"9484": "boxdr;",
  	"9488": "boxdl;",
  	"9492": "boxur;",
  	"9496": "boxul;",
  	"9500": "boxvr;",
  	"9508": "boxvl;",
  	"9516": "boxhd;",
  	"9524": "boxhu;",
  	"9532": "boxvh;",
  	"9552": "boxH;",
  	"9553": "boxV;",
  	"9554": "boxdR;",
  	"9555": "boxDr;",
  	"9556": "boxDR;",
  	"9557": "boxdL;",
  	"9558": "boxDl;",
  	"9559": "boxDL;",
  	"9560": "boxuR;",
  	"9561": "boxUr;",
  	"9562": "boxUR;",
  	"9563": "boxuL;",
  	"9564": "boxUl;",
  	"9565": "boxUL;",
  	"9566": "boxvR;",
  	"9567": "boxVr;",
  	"9568": "boxVR;",
  	"9569": "boxvL;",
  	"9570": "boxVl;",
  	"9571": "boxVL;",
  	"9572": "boxHd;",
  	"9573": "boxhD;",
  	"9574": "boxHD;",
  	"9575": "boxHu;",
  	"9576": "boxhU;",
  	"9577": "boxHU;",
  	"9578": "boxvH;",
  	"9579": "boxVh;",
  	"9580": "boxVH;",
  	"9600": "uhblk;",
  	"9604": "lhblk;",
  	"9608": "block;",
  	"9617": "blk14;",
  	"9618": "blk12;",
  	"9619": "blk34;",
  	"9633": "square;",
  	"9642": "squf;",
  	"9643": "EmptyVerySmallSquare;",
  	"9645": "rect;",
  	"9646": "marker;",
  	"9649": "fltns;",
  	"9651": "xutri;",
  	"9652": "utrif;",
  	"9653": "utri;",
  	"9656": "rtrif;",
  	"9657": "triangleright;",
  	"9661": "xdtri;",
  	"9662": "dtrif;",
  	"9663": "triangledown;",
  	"9666": "ltrif;",
  	"9667": "triangleleft;",
  	"9674": "lozenge;",
  	"9675": "cir;",
  	"9708": "tridot;",
  	"9711": "xcirc;",
  	"9720": "ultri;",
  	"9721": "urtri;",
  	"9722": "lltri;",
  	"9723": "EmptySmallSquare;",
  	"9724": "FilledSmallSquare;",
  	"9733": "starf;",
  	"9734": "star;",
  	"9742": "phone;",
  	"9792": "female;",
  	"9794": "male;",
  	"9824": "spadesuit;",
  	"9827": "clubsuit;",
  	"9829": "heartsuit;",
  	"9830": "diams;",
  	"9834": "sung;",
  	"9837": "flat;",
  	"9838": "natural;",
  	"9839": "sharp;",
  	"10003": "checkmark;",
  	"10007": "cross;",
  	"10016": "maltese;",
  	"10038": "sext;",
  	"10072": "VerticalSeparator;",
  	"10098": "lbbrk;",
  	"10099": "rbbrk;",
  	"10184": "bsolhsub;",
  	"10185": "suphsol;",
  	"10214": "lobrk;",
  	"10215": "robrk;",
  	"10216": "LeftAngleBracket;",
  	"10217": "RightAngleBracket;",
  	"10218": "Lang;",
  	"10219": "Rang;",
  	"10220": "loang;",
  	"10221": "roang;",
  	"10229": "xlarr;",
  	"10230": "xrarr;",
  	"10231": "xharr;",
  	"10232": "xlArr;",
  	"10233": "xrArr;",
  	"10234": "xhArr;",
  	"10236": "xmap;",
  	"10239": "dzigrarr;",
  	"10498": "nvlArr;",
  	"10499": "nvrArr;",
  	"10500": "nvHarr;",
  	"10501": "Map;",
  	"10508": "lbarr;",
  	"10509": "rbarr;",
  	"10510": "lBarr;",
  	"10511": "rBarr;",
  	"10512": "RBarr;",
  	"10513": "DDotrahd;",
  	"10514": "UpArrowBar;",
  	"10515": "DownArrowBar;",
  	"10518": "Rarrtl;",
  	"10521": "latail;",
  	"10522": "ratail;",
  	"10523": "lAtail;",
  	"10524": "rAtail;",
  	"10525": "larrfs;",
  	"10526": "rarrfs;",
  	"10527": "larrbfs;",
  	"10528": "rarrbfs;",
  	"10531": "nwarhk;",
  	"10532": "nearhk;",
  	"10533": "searhk;",
  	"10534": "swarhk;",
  	"10535": "nwnear;",
  	"10536": "toea;",
  	"10537": "tosa;",
  	"10538": "swnwar;",
  	"10547": "rarrc;",
  	"10549": "cudarrr;",
  	"10550": "ldca;",
  	"10551": "rdca;",
  	"10552": "cudarrl;",
  	"10553": "larrpl;",
  	"10556": "curarrm;",
  	"10557": "cularrp;",
  	"10565": "rarrpl;",
  	"10568": "harrcir;",
  	"10569": "Uarrocir;",
  	"10570": "lurdshar;",
  	"10571": "ldrushar;",
  	"10574": "LeftRightVector;",
  	"10575": "RightUpDownVector;",
  	"10576": "DownLeftRightVector;",
  	"10577": "LeftUpDownVector;",
  	"10578": "LeftVectorBar;",
  	"10579": "RightVectorBar;",
  	"10580": "RightUpVectorBar;",
  	"10581": "RightDownVectorBar;",
  	"10582": "DownLeftVectorBar;",
  	"10583": "DownRightVectorBar;",
  	"10584": "LeftUpVectorBar;",
  	"10585": "LeftDownVectorBar;",
  	"10586": "LeftTeeVector;",
  	"10587": "RightTeeVector;",
  	"10588": "RightUpTeeVector;",
  	"10589": "RightDownTeeVector;",
  	"10590": "DownLeftTeeVector;",
  	"10591": "DownRightTeeVector;",
  	"10592": "LeftUpTeeVector;",
  	"10593": "LeftDownTeeVector;",
  	"10594": "lHar;",
  	"10595": "uHar;",
  	"10596": "rHar;",
  	"10597": "dHar;",
  	"10598": "luruhar;",
  	"10599": "ldrdhar;",
  	"10600": "ruluhar;",
  	"10601": "rdldhar;",
  	"10602": "lharul;",
  	"10603": "llhard;",
  	"10604": "rharul;",
  	"10605": "lrhard;",
  	"10606": "UpEquilibrium;",
  	"10607": "ReverseUpEquilibrium;",
  	"10608": "RoundImplies;",
  	"10609": "erarr;",
  	"10610": "simrarr;",
  	"10611": "larrsim;",
  	"10612": "rarrsim;",
  	"10613": "rarrap;",
  	"10614": "ltlarr;",
  	"10616": "gtrarr;",
  	"10617": "subrarr;",
  	"10619": "suplarr;",
  	"10620": "lfisht;",
  	"10621": "rfisht;",
  	"10622": "ufisht;",
  	"10623": "dfisht;",
  	"10629": "lopar;",
  	"10630": "ropar;",
  	"10635": "lbrke;",
  	"10636": "rbrke;",
  	"10637": "lbrkslu;",
  	"10638": "rbrksld;",
  	"10639": "lbrksld;",
  	"10640": "rbrkslu;",
  	"10641": "langd;",
  	"10642": "rangd;",
  	"10643": "lparlt;",
  	"10644": "rpargt;",
  	"10645": "gtlPar;",
  	"10646": "ltrPar;",
  	"10650": "vzigzag;",
  	"10652": "vangrt;",
  	"10653": "angrtvbd;",
  	"10660": "ange;",
  	"10661": "range;",
  	"10662": "dwangle;",
  	"10663": "uwangle;",
  	"10664": "angmsdaa;",
  	"10665": "angmsdab;",
  	"10666": "angmsdac;",
  	"10667": "angmsdad;",
  	"10668": "angmsdae;",
  	"10669": "angmsdaf;",
  	"10670": "angmsdag;",
  	"10671": "angmsdah;",
  	"10672": "bemptyv;",
  	"10673": "demptyv;",
  	"10674": "cemptyv;",
  	"10675": "raemptyv;",
  	"10676": "laemptyv;",
  	"10677": "ohbar;",
  	"10678": "omid;",
  	"10679": "opar;",
  	"10681": "operp;",
  	"10683": "olcross;",
  	"10684": "odsold;",
  	"10686": "olcir;",
  	"10687": "ofcir;",
  	"10688": "olt;",
  	"10689": "ogt;",
  	"10690": "cirscir;",
  	"10691": "cirE;",
  	"10692": "solb;",
  	"10693": "bsolb;",
  	"10697": "boxbox;",
  	"10701": "trisb;",
  	"10702": "rtriltri;",
  	"10703": "LeftTriangleBar;",
  	"10704": "RightTriangleBar;",
  	"10716": "iinfin;",
  	"10717": "infintie;",
  	"10718": "nvinfin;",
  	"10723": "eparsl;",
  	"10724": "smeparsl;",
  	"10725": "eqvparsl;",
  	"10731": "lozf;",
  	"10740": "RuleDelayed;",
  	"10742": "dsol;",
  	"10752": "xodot;",
  	"10753": "xoplus;",
  	"10754": "xotime;",
  	"10756": "xuplus;",
  	"10758": "xsqcup;",
  	"10764": "qint;",
  	"10765": "fpartint;",
  	"10768": "cirfnint;",
  	"10769": "awint;",
  	"10770": "rppolint;",
  	"10771": "scpolint;",
  	"10772": "npolint;",
  	"10773": "pointint;",
  	"10774": "quatint;",
  	"10775": "intlarhk;",
  	"10786": "pluscir;",
  	"10787": "plusacir;",
  	"10788": "simplus;",
  	"10789": "plusdu;",
  	"10790": "plussim;",
  	"10791": "plustwo;",
  	"10793": "mcomma;",
  	"10794": "minusdu;",
  	"10797": "loplus;",
  	"10798": "roplus;",
  	"10799": "Cross;",
  	"10800": "timesd;",
  	"10801": "timesbar;",
  	"10803": "smashp;",
  	"10804": "lotimes;",
  	"10805": "rotimes;",
  	"10806": "otimesas;",
  	"10807": "Otimes;",
  	"10808": "odiv;",
  	"10809": "triplus;",
  	"10810": "triminus;",
  	"10811": "tritime;",
  	"10812": "iprod;",
  	"10815": "amalg;",
  	"10816": "capdot;",
  	"10818": "ncup;",
  	"10819": "ncap;",
  	"10820": "capand;",
  	"10821": "cupor;",
  	"10822": "cupcap;",
  	"10823": "capcup;",
  	"10824": "cupbrcap;",
  	"10825": "capbrcup;",
  	"10826": "cupcup;",
  	"10827": "capcap;",
  	"10828": "ccups;",
  	"10829": "ccaps;",
  	"10832": "ccupssm;",
  	"10835": "And;",
  	"10836": "Or;",
  	"10837": "andand;",
  	"10838": "oror;",
  	"10839": "orslope;",
  	"10840": "andslope;",
  	"10842": "andv;",
  	"10843": "orv;",
  	"10844": "andd;",
  	"10845": "ord;",
  	"10847": "wedbar;",
  	"10854": "sdote;",
  	"10858": "simdot;",
  	"10861": "congdot;",
  	"10862": "easter;",
  	"10863": "apacir;",
  	"10864": "apE;",
  	"10865": "eplus;",
  	"10866": "pluse;",
  	"10867": "Esim;",
  	"10868": "Colone;",
  	"10869": "Equal;",
  	"10871": "eDDot;",
  	"10872": "equivDD;",
  	"10873": "ltcir;",
  	"10874": "gtcir;",
  	"10875": "ltquest;",
  	"10876": "gtquest;",
  	"10877": "LessSlantEqual;",
  	"10878": "GreaterSlantEqual;",
  	"10879": "lesdot;",
  	"10880": "gesdot;",
  	"10881": "lesdoto;",
  	"10882": "gesdoto;",
  	"10883": "lesdotor;",
  	"10884": "gesdotol;",
  	"10885": "lessapprox;",
  	"10886": "gtrapprox;",
  	"10887": "lneq;",
  	"10888": "gneq;",
  	"10889": "lnapprox;",
  	"10890": "gnapprox;",
  	"10891": "lesseqqgtr;",
  	"10892": "gtreqqless;",
  	"10893": "lsime;",
  	"10894": "gsime;",
  	"10895": "lsimg;",
  	"10896": "gsiml;",
  	"10897": "lgE;",
  	"10898": "glE;",
  	"10899": "lesges;",
  	"10900": "gesles;",
  	"10901": "eqslantless;",
  	"10902": "eqslantgtr;",
  	"10903": "elsdot;",
  	"10904": "egsdot;",
  	"10905": "el;",
  	"10906": "eg;",
  	"10909": "siml;",
  	"10910": "simg;",
  	"10911": "simlE;",
  	"10912": "simgE;",
  	"10913": "LessLess;",
  	"10914": "GreaterGreater;",
  	"10916": "glj;",
  	"10917": "gla;",
  	"10918": "ltcc;",
  	"10919": "gtcc;",
  	"10920": "lescc;",
  	"10921": "gescc;",
  	"10922": "smt;",
  	"10923": "lat;",
  	"10924": "smte;",
  	"10925": "late;",
  	"10926": "bumpE;",
  	"10927": "preceq;",
  	"10928": "succeq;",
  	"10931": "prE;",
  	"10932": "scE;",
  	"10933": "prnE;",
  	"10934": "succneqq;",
  	"10935": "precapprox;",
  	"10936": "succapprox;",
  	"10937": "prnap;",
  	"10938": "succnapprox;",
  	"10939": "Pr;",
  	"10940": "Sc;",
  	"10941": "subdot;",
  	"10942": "supdot;",
  	"10943": "subplus;",
  	"10944": "supplus;",
  	"10945": "submult;",
  	"10946": "supmult;",
  	"10947": "subedot;",
  	"10948": "supedot;",
  	"10949": "subseteqq;",
  	"10950": "supseteqq;",
  	"10951": "subsim;",
  	"10952": "supsim;",
  	"10955": "subsetneqq;",
  	"10956": "supsetneqq;",
  	"10959": "csub;",
  	"10960": "csup;",
  	"10961": "csube;",
  	"10962": "csupe;",
  	"10963": "subsup;",
  	"10964": "supsub;",
  	"10965": "subsub;",
  	"10966": "supsup;",
  	"10967": "suphsub;",
  	"10968": "supdsub;",
  	"10969": "forkv;",
  	"10970": "topfork;",
  	"10971": "mlcp;",
  	"10980": "DoubleLeftTee;",
  	"10982": "Vdashl;",
  	"10983": "Barv;",
  	"10984": "vBar;",
  	"10985": "vBarv;",
  	"10987": "Vbar;",
  	"10988": "Not;",
  	"10989": "bNot;",
  	"10990": "rnmid;",
  	"10991": "cirmid;",
  	"10992": "midcir;",
  	"10993": "topcir;",
  	"10994": "nhpar;",
  	"10995": "parsim;",
  	"11005": "parsl;",
  	"64256": "fflig;",
  	"64257": "filig;",
  	"64258": "fllig;",
  	"64259": "ffilig;",
  	"64260": "ffllig;"
  };

  var reversed$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': reversed
  });

  var punycode$2 = getCjsExportFromNamespace(punycode$1);

  var revEntities = getCjsExportFromNamespace(reversed$1);

  var encode_1 = encode$1;

  function encode$1(str, opts) {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a String');
    }

    if (!opts) opts = {};
    var numeric = true;
    if (opts.named) numeric = false;
    if (opts.numeric !== undefined) numeric = opts.numeric;
    var special = opts.special || {
      '"': true,
      "'": true,
      '<': true,
      '>': true,
      '&': true
    };
    var codePoints = punycode$2.ucs2.decode(str);
    var chars = [];

    for (var i = 0; i < codePoints.length; i++) {
      var cc = codePoints[i];
      var c = punycode$2.ucs2.encode([cc]);
      var e = revEntities[cc];

      if (e && (cc >= 127 || special[c]) && !numeric) {
        chars.push('&' + (/;$/.test(e) ? e : e + ';'));
      } else if (cc < 32 || cc >= 127 || special[c]) {
        chars.push('&#' + cc + ';');
      } else {
        chars.push(c);
      }
    }

    return chars.join('');
  }

  var Aacute$1 = "Á";
  var aacute$1 = "á";
  var Acirc$1 = "Â";
  var acirc$1 = "â";
  var acute$2 = "´";
  var AElig$1 = "Æ";
  var aelig$1 = "æ";
  var Agrave$1 = "À";
  var agrave$1 = "à";
  var AMP$2 = "&";
  var amp$2 = "&";
  var Aring$2 = "Å";
  var aring$2 = "å";
  var Atilde$1 = "Ã";
  var atilde$2 = "ã";
  var Auml$1 = "Ä";
  var auml$1 = "ä";
  var brvbar$1 = "¦";
  var Ccedil$1 = "Ç";
  var ccedil$1 = "ç";
  var cedil$2 = "¸";
  var cent$2 = "¢";
  var COPY$3 = "©";
  var copy$2 = "©";
  var curren$1 = "¤";
  var deg$2 = "°";
  var divide$2 = "÷";
  var Eacute$1 = "É";
  var eacute$1 = "é";
  var Ecirc$1 = "Ê";
  var ecirc$1 = "ê";
  var Egrave$1 = "È";
  var egrave$2 = "è";
  var ETH$2 = "Ð";
  var eth$2 = "ð";
  var Euml$1 = "Ë";
  var euml$1 = "ë";
  var frac12$1 = "½";
  var frac14$1 = "¼";
  var frac34$1 = "¾";
  var GT$3 = ">";
  var gt$2 = ">";
  var Iacute$1 = "Í";
  var iacute$1 = "í";
  var Icirc$1 = "Î";
  var icirc$1 = "î";
  var iexcl$1 = "¡";
  var Igrave$1 = "Ì";
  var igrave$1 = "ì";
  var iquest$1 = "¿";
  var Iuml$1 = "Ï";
  var iuml$1 = "ï";
  var laquo$1 = "«";
  var LT$3 = "<";
  var lt$2 = "<";
  var macr$1 = "¯";
  var micro$1 = "µ";
  var middot$1 = "·";
  var nbsp$1 = " ";
  var not$2 = "¬";
  var Ntilde$1 = "Ñ";
  var ntilde$1 = "ñ";
  var Oacute$1 = "Ó";
  var oacute$1 = "ó";
  var Ocirc$1 = "Ô";
  var ocirc$1 = "ô";
  var Ograve$1 = "Ò";
  var ograve$1 = "ò";
  var ordf$1 = "ª";
  var ordm$1 = "º";
  var Oslash$1 = "Ø";
  var oslash$1 = "ø";
  var Otilde$1 = "Õ";
  var otilde$1 = "õ";
  var Ouml$1 = "Ö";
  var ouml$1 = "ö";
  var para$2 = "¶";
  var plusmn$1 = "±";
  var pound$2 = "£";
  var QUOT$3 = "\"";
  var quot$2 = "\"";
  var raquo$1 = "»";
  var REG$3 = "®";
  var reg$2 = "®";
  var sect$2 = "§";
  var shy$2 = "­";
  var sup1$1 = "¹";
  var sup2$1 = "²";
  var sup3$1 = "³";
  var szlig$1 = "ß";
  var THORN$2 = "Þ";
  var thorn$2 = "þ";
  var times$2 = "×";
  var Uacute$1 = "Ú";
  var uacute$1 = "ú";
  var Ucirc$1 = "Û";
  var ucirc$1 = "û";
  var Ugrave$1 = "Ù";
  var ugrave$1 = "ù";
  var uml$2 = "¨";
  var Uuml$1 = "Ü";
  var uuml$1 = "ü";
  var Yacute$1 = "Ý";
  var yacute$1 = "ý";
  var yen$2 = "¥";
  var yuml$1 = "ÿ";
  var entities = {
  	"Aacute;": "Á",
  	Aacute: Aacute$1,
  	"aacute;": "á",
  	aacute: aacute$1,
  	"Abreve;": "Ă",
  	"abreve;": "ă",
  	"ac;": "∾",
  	"acd;": "∿",
  	"acE;": "∾̳",
  	"Acirc;": "Â",
  	Acirc: Acirc$1,
  	"acirc;": "â",
  	acirc: acirc$1,
  	"acute;": "´",
  	acute: acute$2,
  	"Acy;": "А",
  	"acy;": "а",
  	"AElig;": "Æ",
  	AElig: AElig$1,
  	"aelig;": "æ",
  	aelig: aelig$1,
  	"af;": "⁡",
  	"Afr;": "𝔄",
  	"afr;": "𝔞",
  	"Agrave;": "À",
  	Agrave: Agrave$1,
  	"agrave;": "à",
  	agrave: agrave$1,
  	"alefsym;": "ℵ",
  	"aleph;": "ℵ",
  	"Alpha;": "Α",
  	"alpha;": "α",
  	"Amacr;": "Ā",
  	"amacr;": "ā",
  	"amalg;": "⨿",
  	"AMP;": "&",
  	AMP: AMP$2,
  	"amp;": "&",
  	amp: amp$2,
  	"And;": "⩓",
  	"and;": "∧",
  	"andand;": "⩕",
  	"andd;": "⩜",
  	"andslope;": "⩘",
  	"andv;": "⩚",
  	"ang;": "∠",
  	"ange;": "⦤",
  	"angle;": "∠",
  	"angmsd;": "∡",
  	"angmsdaa;": "⦨",
  	"angmsdab;": "⦩",
  	"angmsdac;": "⦪",
  	"angmsdad;": "⦫",
  	"angmsdae;": "⦬",
  	"angmsdaf;": "⦭",
  	"angmsdag;": "⦮",
  	"angmsdah;": "⦯",
  	"angrt;": "∟",
  	"angrtvb;": "⊾",
  	"angrtvbd;": "⦝",
  	"angsph;": "∢",
  	"angst;": "Å",
  	"angzarr;": "⍼",
  	"Aogon;": "Ą",
  	"aogon;": "ą",
  	"Aopf;": "𝔸",
  	"aopf;": "𝕒",
  	"ap;": "≈",
  	"apacir;": "⩯",
  	"apE;": "⩰",
  	"ape;": "≊",
  	"apid;": "≋",
  	"apos;": "'",
  	"ApplyFunction;": "⁡",
  	"approx;": "≈",
  	"approxeq;": "≊",
  	"Aring;": "Å",
  	Aring: Aring$2,
  	"aring;": "å",
  	aring: aring$2,
  	"Ascr;": "𝒜",
  	"ascr;": "𝒶",
  	"Assign;": "≔",
  	"ast;": "*",
  	"asymp;": "≈",
  	"asympeq;": "≍",
  	"Atilde;": "Ã",
  	Atilde: Atilde$1,
  	"atilde;": "ã",
  	atilde: atilde$2,
  	"Auml;": "Ä",
  	Auml: Auml$1,
  	"auml;": "ä",
  	auml: auml$1,
  	"awconint;": "∳",
  	"awint;": "⨑",
  	"backcong;": "≌",
  	"backepsilon;": "϶",
  	"backprime;": "‵",
  	"backsim;": "∽",
  	"backsimeq;": "⋍",
  	"Backslash;": "∖",
  	"Barv;": "⫧",
  	"barvee;": "⊽",
  	"Barwed;": "⌆",
  	"barwed;": "⌅",
  	"barwedge;": "⌅",
  	"bbrk;": "⎵",
  	"bbrktbrk;": "⎶",
  	"bcong;": "≌",
  	"Bcy;": "Б",
  	"bcy;": "б",
  	"bdquo;": "„",
  	"becaus;": "∵",
  	"Because;": "∵",
  	"because;": "∵",
  	"bemptyv;": "⦰",
  	"bepsi;": "϶",
  	"bernou;": "ℬ",
  	"Bernoullis;": "ℬ",
  	"Beta;": "Β",
  	"beta;": "β",
  	"beth;": "ℶ",
  	"between;": "≬",
  	"Bfr;": "𝔅",
  	"bfr;": "𝔟",
  	"bigcap;": "⋂",
  	"bigcirc;": "◯",
  	"bigcup;": "⋃",
  	"bigodot;": "⨀",
  	"bigoplus;": "⨁",
  	"bigotimes;": "⨂",
  	"bigsqcup;": "⨆",
  	"bigstar;": "★",
  	"bigtriangledown;": "▽",
  	"bigtriangleup;": "△",
  	"biguplus;": "⨄",
  	"bigvee;": "⋁",
  	"bigwedge;": "⋀",
  	"bkarow;": "⤍",
  	"blacklozenge;": "⧫",
  	"blacksquare;": "▪",
  	"blacktriangle;": "▴",
  	"blacktriangledown;": "▾",
  	"blacktriangleleft;": "◂",
  	"blacktriangleright;": "▸",
  	"blank;": "␣",
  	"blk12;": "▒",
  	"blk14;": "░",
  	"blk34;": "▓",
  	"block;": "█",
  	"bne;": "=⃥",
  	"bnequiv;": "≡⃥",
  	"bNot;": "⫭",
  	"bnot;": "⌐",
  	"Bopf;": "𝔹",
  	"bopf;": "𝕓",
  	"bot;": "⊥",
  	"bottom;": "⊥",
  	"bowtie;": "⋈",
  	"boxbox;": "⧉",
  	"boxDL;": "╗",
  	"boxDl;": "╖",
  	"boxdL;": "╕",
  	"boxdl;": "┐",
  	"boxDR;": "╔",
  	"boxDr;": "╓",
  	"boxdR;": "╒",
  	"boxdr;": "┌",
  	"boxH;": "═",
  	"boxh;": "─",
  	"boxHD;": "╦",
  	"boxHd;": "╤",
  	"boxhD;": "╥",
  	"boxhd;": "┬",
  	"boxHU;": "╩",
  	"boxHu;": "╧",
  	"boxhU;": "╨",
  	"boxhu;": "┴",
  	"boxminus;": "⊟",
  	"boxplus;": "⊞",
  	"boxtimes;": "⊠",
  	"boxUL;": "╝",
  	"boxUl;": "╜",
  	"boxuL;": "╛",
  	"boxul;": "┘",
  	"boxUR;": "╚",
  	"boxUr;": "╙",
  	"boxuR;": "╘",
  	"boxur;": "└",
  	"boxV;": "║",
  	"boxv;": "│",
  	"boxVH;": "╬",
  	"boxVh;": "╫",
  	"boxvH;": "╪",
  	"boxvh;": "┼",
  	"boxVL;": "╣",
  	"boxVl;": "╢",
  	"boxvL;": "╡",
  	"boxvl;": "┤",
  	"boxVR;": "╠",
  	"boxVr;": "╟",
  	"boxvR;": "╞",
  	"boxvr;": "├",
  	"bprime;": "‵",
  	"Breve;": "˘",
  	"breve;": "˘",
  	"brvbar;": "¦",
  	brvbar: brvbar$1,
  	"Bscr;": "ℬ",
  	"bscr;": "𝒷",
  	"bsemi;": "⁏",
  	"bsim;": "∽",
  	"bsime;": "⋍",
  	"bsol;": "\\",
  	"bsolb;": "⧅",
  	"bsolhsub;": "⟈",
  	"bull;": "•",
  	"bullet;": "•",
  	"bump;": "≎",
  	"bumpE;": "⪮",
  	"bumpe;": "≏",
  	"Bumpeq;": "≎",
  	"bumpeq;": "≏",
  	"Cacute;": "Ć",
  	"cacute;": "ć",
  	"Cap;": "⋒",
  	"cap;": "∩",
  	"capand;": "⩄",
  	"capbrcup;": "⩉",
  	"capcap;": "⩋",
  	"capcup;": "⩇",
  	"capdot;": "⩀",
  	"CapitalDifferentialD;": "ⅅ",
  	"caps;": "∩︀",
  	"caret;": "⁁",
  	"caron;": "ˇ",
  	"Cayleys;": "ℭ",
  	"ccaps;": "⩍",
  	"Ccaron;": "Č",
  	"ccaron;": "č",
  	"Ccedil;": "Ç",
  	Ccedil: Ccedil$1,
  	"ccedil;": "ç",
  	ccedil: ccedil$1,
  	"Ccirc;": "Ĉ",
  	"ccirc;": "ĉ",
  	"Cconint;": "∰",
  	"ccups;": "⩌",
  	"ccupssm;": "⩐",
  	"Cdot;": "Ċ",
  	"cdot;": "ċ",
  	"cedil;": "¸",
  	cedil: cedil$2,
  	"Cedilla;": "¸",
  	"cemptyv;": "⦲",
  	"cent;": "¢",
  	cent: cent$2,
  	"CenterDot;": "·",
  	"centerdot;": "·",
  	"Cfr;": "ℭ",
  	"cfr;": "𝔠",
  	"CHcy;": "Ч",
  	"chcy;": "ч",
  	"check;": "✓",
  	"checkmark;": "✓",
  	"Chi;": "Χ",
  	"chi;": "χ",
  	"cir;": "○",
  	"circ;": "ˆ",
  	"circeq;": "≗",
  	"circlearrowleft;": "↺",
  	"circlearrowright;": "↻",
  	"circledast;": "⊛",
  	"circledcirc;": "⊚",
  	"circleddash;": "⊝",
  	"CircleDot;": "⊙",
  	"circledR;": "®",
  	"circledS;": "Ⓢ",
  	"CircleMinus;": "⊖",
  	"CirclePlus;": "⊕",
  	"CircleTimes;": "⊗",
  	"cirE;": "⧃",
  	"cire;": "≗",
  	"cirfnint;": "⨐",
  	"cirmid;": "⫯",
  	"cirscir;": "⧂",
  	"ClockwiseContourIntegral;": "∲",
  	"CloseCurlyDoubleQuote;": "”",
  	"CloseCurlyQuote;": "’",
  	"clubs;": "♣",
  	"clubsuit;": "♣",
  	"Colon;": "∷",
  	"colon;": ":",
  	"Colone;": "⩴",
  	"colone;": "≔",
  	"coloneq;": "≔",
  	"comma;": ",",
  	"commat;": "@",
  	"comp;": "∁",
  	"compfn;": "∘",
  	"complement;": "∁",
  	"complexes;": "ℂ",
  	"cong;": "≅",
  	"congdot;": "⩭",
  	"Congruent;": "≡",
  	"Conint;": "∯",
  	"conint;": "∮",
  	"ContourIntegral;": "∮",
  	"Copf;": "ℂ",
  	"copf;": "𝕔",
  	"coprod;": "∐",
  	"Coproduct;": "∐",
  	"COPY;": "©",
  	COPY: COPY$3,
  	"copy;": "©",
  	copy: copy$2,
  	"copysr;": "℗",
  	"CounterClockwiseContourIntegral;": "∳",
  	"crarr;": "↵",
  	"Cross;": "⨯",
  	"cross;": "✗",
  	"Cscr;": "𝒞",
  	"cscr;": "𝒸",
  	"csub;": "⫏",
  	"csube;": "⫑",
  	"csup;": "⫐",
  	"csupe;": "⫒",
  	"ctdot;": "⋯",
  	"cudarrl;": "⤸",
  	"cudarrr;": "⤵",
  	"cuepr;": "⋞",
  	"cuesc;": "⋟",
  	"cularr;": "↶",
  	"cularrp;": "⤽",
  	"Cup;": "⋓",
  	"cup;": "∪",
  	"cupbrcap;": "⩈",
  	"CupCap;": "≍",
  	"cupcap;": "⩆",
  	"cupcup;": "⩊",
  	"cupdot;": "⊍",
  	"cupor;": "⩅",
  	"cups;": "∪︀",
  	"curarr;": "↷",
  	"curarrm;": "⤼",
  	"curlyeqprec;": "⋞",
  	"curlyeqsucc;": "⋟",
  	"curlyvee;": "⋎",
  	"curlywedge;": "⋏",
  	"curren;": "¤",
  	curren: curren$1,
  	"curvearrowleft;": "↶",
  	"curvearrowright;": "↷",
  	"cuvee;": "⋎",
  	"cuwed;": "⋏",
  	"cwconint;": "∲",
  	"cwint;": "∱",
  	"cylcty;": "⌭",
  	"Dagger;": "‡",
  	"dagger;": "†",
  	"daleth;": "ℸ",
  	"Darr;": "↡",
  	"dArr;": "⇓",
  	"darr;": "↓",
  	"dash;": "‐",
  	"Dashv;": "⫤",
  	"dashv;": "⊣",
  	"dbkarow;": "⤏",
  	"dblac;": "˝",
  	"Dcaron;": "Ď",
  	"dcaron;": "ď",
  	"Dcy;": "Д",
  	"dcy;": "д",
  	"DD;": "ⅅ",
  	"dd;": "ⅆ",
  	"ddagger;": "‡",
  	"ddarr;": "⇊",
  	"DDotrahd;": "⤑",
  	"ddotseq;": "⩷",
  	"deg;": "°",
  	deg: deg$2,
  	"Del;": "∇",
  	"Delta;": "Δ",
  	"delta;": "δ",
  	"demptyv;": "⦱",
  	"dfisht;": "⥿",
  	"Dfr;": "𝔇",
  	"dfr;": "𝔡",
  	"dHar;": "⥥",
  	"dharl;": "⇃",
  	"dharr;": "⇂",
  	"DiacriticalAcute;": "´",
  	"DiacriticalDot;": "˙",
  	"DiacriticalDoubleAcute;": "˝",
  	"DiacriticalGrave;": "`",
  	"DiacriticalTilde;": "˜",
  	"diam;": "⋄",
  	"Diamond;": "⋄",
  	"diamond;": "⋄",
  	"diamondsuit;": "♦",
  	"diams;": "♦",
  	"die;": "¨",
  	"DifferentialD;": "ⅆ",
  	"digamma;": "ϝ",
  	"disin;": "⋲",
  	"div;": "÷",
  	"divide;": "÷",
  	divide: divide$2,
  	"divideontimes;": "⋇",
  	"divonx;": "⋇",
  	"DJcy;": "Ђ",
  	"djcy;": "ђ",
  	"dlcorn;": "⌞",
  	"dlcrop;": "⌍",
  	"dollar;": "$",
  	"Dopf;": "𝔻",
  	"dopf;": "𝕕",
  	"Dot;": "¨",
  	"dot;": "˙",
  	"DotDot;": "⃜",
  	"doteq;": "≐",
  	"doteqdot;": "≑",
  	"DotEqual;": "≐",
  	"dotminus;": "∸",
  	"dotplus;": "∔",
  	"dotsquare;": "⊡",
  	"doublebarwedge;": "⌆",
  	"DoubleContourIntegral;": "∯",
  	"DoubleDot;": "¨",
  	"DoubleDownArrow;": "⇓",
  	"DoubleLeftArrow;": "⇐",
  	"DoubleLeftRightArrow;": "⇔",
  	"DoubleLeftTee;": "⫤",
  	"DoubleLongLeftArrow;": "⟸",
  	"DoubleLongLeftRightArrow;": "⟺",
  	"DoubleLongRightArrow;": "⟹",
  	"DoubleRightArrow;": "⇒",
  	"DoubleRightTee;": "⊨",
  	"DoubleUpArrow;": "⇑",
  	"DoubleUpDownArrow;": "⇕",
  	"DoubleVerticalBar;": "∥",
  	"DownArrow;": "↓",
  	"Downarrow;": "⇓",
  	"downarrow;": "↓",
  	"DownArrowBar;": "⤓",
  	"DownArrowUpArrow;": "⇵",
  	"DownBreve;": "̑",
  	"downdownarrows;": "⇊",
  	"downharpoonleft;": "⇃",
  	"downharpoonright;": "⇂",
  	"DownLeftRightVector;": "⥐",
  	"DownLeftTeeVector;": "⥞",
  	"DownLeftVector;": "↽",
  	"DownLeftVectorBar;": "⥖",
  	"DownRightTeeVector;": "⥟",
  	"DownRightVector;": "⇁",
  	"DownRightVectorBar;": "⥗",
  	"DownTee;": "⊤",
  	"DownTeeArrow;": "↧",
  	"drbkarow;": "⤐",
  	"drcorn;": "⌟",
  	"drcrop;": "⌌",
  	"Dscr;": "𝒟",
  	"dscr;": "𝒹",
  	"DScy;": "Ѕ",
  	"dscy;": "ѕ",
  	"dsol;": "⧶",
  	"Dstrok;": "Đ",
  	"dstrok;": "đ",
  	"dtdot;": "⋱",
  	"dtri;": "▿",
  	"dtrif;": "▾",
  	"duarr;": "⇵",
  	"duhar;": "⥯",
  	"dwangle;": "⦦",
  	"DZcy;": "Џ",
  	"dzcy;": "џ",
  	"dzigrarr;": "⟿",
  	"Eacute;": "É",
  	Eacute: Eacute$1,
  	"eacute;": "é",
  	eacute: eacute$1,
  	"easter;": "⩮",
  	"Ecaron;": "Ě",
  	"ecaron;": "ě",
  	"ecir;": "≖",
  	"Ecirc;": "Ê",
  	Ecirc: Ecirc$1,
  	"ecirc;": "ê",
  	ecirc: ecirc$1,
  	"ecolon;": "≕",
  	"Ecy;": "Э",
  	"ecy;": "э",
  	"eDDot;": "⩷",
  	"Edot;": "Ė",
  	"eDot;": "≑",
  	"edot;": "ė",
  	"ee;": "ⅇ",
  	"efDot;": "≒",
  	"Efr;": "𝔈",
  	"efr;": "𝔢",
  	"eg;": "⪚",
  	"Egrave;": "È",
  	Egrave: Egrave$1,
  	"egrave;": "è",
  	egrave: egrave$2,
  	"egs;": "⪖",
  	"egsdot;": "⪘",
  	"el;": "⪙",
  	"Element;": "∈",
  	"elinters;": "⏧",
  	"ell;": "ℓ",
  	"els;": "⪕",
  	"elsdot;": "⪗",
  	"Emacr;": "Ē",
  	"emacr;": "ē",
  	"empty;": "∅",
  	"emptyset;": "∅",
  	"EmptySmallSquare;": "◻",
  	"emptyv;": "∅",
  	"EmptyVerySmallSquare;": "▫",
  	"emsp;": " ",
  	"emsp13;": " ",
  	"emsp14;": " ",
  	"ENG;": "Ŋ",
  	"eng;": "ŋ",
  	"ensp;": " ",
  	"Eogon;": "Ę",
  	"eogon;": "ę",
  	"Eopf;": "𝔼",
  	"eopf;": "𝕖",
  	"epar;": "⋕",
  	"eparsl;": "⧣",
  	"eplus;": "⩱",
  	"epsi;": "ε",
  	"Epsilon;": "Ε",
  	"epsilon;": "ε",
  	"epsiv;": "ϵ",
  	"eqcirc;": "≖",
  	"eqcolon;": "≕",
  	"eqsim;": "≂",
  	"eqslantgtr;": "⪖",
  	"eqslantless;": "⪕",
  	"Equal;": "⩵",
  	"equals;": "=",
  	"EqualTilde;": "≂",
  	"equest;": "≟",
  	"Equilibrium;": "⇌",
  	"equiv;": "≡",
  	"equivDD;": "⩸",
  	"eqvparsl;": "⧥",
  	"erarr;": "⥱",
  	"erDot;": "≓",
  	"Escr;": "ℰ",
  	"escr;": "ℯ",
  	"esdot;": "≐",
  	"Esim;": "⩳",
  	"esim;": "≂",
  	"Eta;": "Η",
  	"eta;": "η",
  	"ETH;": "Ð",
  	ETH: ETH$2,
  	"eth;": "ð",
  	eth: eth$2,
  	"Euml;": "Ë",
  	Euml: Euml$1,
  	"euml;": "ë",
  	euml: euml$1,
  	"euro;": "€",
  	"excl;": "!",
  	"exist;": "∃",
  	"Exists;": "∃",
  	"expectation;": "ℰ",
  	"ExponentialE;": "ⅇ",
  	"exponentiale;": "ⅇ",
  	"fallingdotseq;": "≒",
  	"Fcy;": "Ф",
  	"fcy;": "ф",
  	"female;": "♀",
  	"ffilig;": "ﬃ",
  	"fflig;": "ﬀ",
  	"ffllig;": "ﬄ",
  	"Ffr;": "𝔉",
  	"ffr;": "𝔣",
  	"filig;": "ﬁ",
  	"FilledSmallSquare;": "◼",
  	"FilledVerySmallSquare;": "▪",
  	"fjlig;": "fj",
  	"flat;": "♭",
  	"fllig;": "ﬂ",
  	"fltns;": "▱",
  	"fnof;": "ƒ",
  	"Fopf;": "𝔽",
  	"fopf;": "𝕗",
  	"ForAll;": "∀",
  	"forall;": "∀",
  	"fork;": "⋔",
  	"forkv;": "⫙",
  	"Fouriertrf;": "ℱ",
  	"fpartint;": "⨍",
  	"frac12;": "½",
  	frac12: frac12$1,
  	"frac13;": "⅓",
  	"frac14;": "¼",
  	frac14: frac14$1,
  	"frac15;": "⅕",
  	"frac16;": "⅙",
  	"frac18;": "⅛",
  	"frac23;": "⅔",
  	"frac25;": "⅖",
  	"frac34;": "¾",
  	frac34: frac34$1,
  	"frac35;": "⅗",
  	"frac38;": "⅜",
  	"frac45;": "⅘",
  	"frac56;": "⅚",
  	"frac58;": "⅝",
  	"frac78;": "⅞",
  	"frasl;": "⁄",
  	"frown;": "⌢",
  	"Fscr;": "ℱ",
  	"fscr;": "𝒻",
  	"gacute;": "ǵ",
  	"Gamma;": "Γ",
  	"gamma;": "γ",
  	"Gammad;": "Ϝ",
  	"gammad;": "ϝ",
  	"gap;": "⪆",
  	"Gbreve;": "Ğ",
  	"gbreve;": "ğ",
  	"Gcedil;": "Ģ",
  	"Gcirc;": "Ĝ",
  	"gcirc;": "ĝ",
  	"Gcy;": "Г",
  	"gcy;": "г",
  	"Gdot;": "Ġ",
  	"gdot;": "ġ",
  	"gE;": "≧",
  	"ge;": "≥",
  	"gEl;": "⪌",
  	"gel;": "⋛",
  	"geq;": "≥",
  	"geqq;": "≧",
  	"geqslant;": "⩾",
  	"ges;": "⩾",
  	"gescc;": "⪩",
  	"gesdot;": "⪀",
  	"gesdoto;": "⪂",
  	"gesdotol;": "⪄",
  	"gesl;": "⋛︀",
  	"gesles;": "⪔",
  	"Gfr;": "𝔊",
  	"gfr;": "𝔤",
  	"Gg;": "⋙",
  	"gg;": "≫",
  	"ggg;": "⋙",
  	"gimel;": "ℷ",
  	"GJcy;": "Ѓ",
  	"gjcy;": "ѓ",
  	"gl;": "≷",
  	"gla;": "⪥",
  	"glE;": "⪒",
  	"glj;": "⪤",
  	"gnap;": "⪊",
  	"gnapprox;": "⪊",
  	"gnE;": "≩",
  	"gne;": "⪈",
  	"gneq;": "⪈",
  	"gneqq;": "≩",
  	"gnsim;": "⋧",
  	"Gopf;": "𝔾",
  	"gopf;": "𝕘",
  	"grave;": "`",
  	"GreaterEqual;": "≥",
  	"GreaterEqualLess;": "⋛",
  	"GreaterFullEqual;": "≧",
  	"GreaterGreater;": "⪢",
  	"GreaterLess;": "≷",
  	"GreaterSlantEqual;": "⩾",
  	"GreaterTilde;": "≳",
  	"Gscr;": "𝒢",
  	"gscr;": "ℊ",
  	"gsim;": "≳",
  	"gsime;": "⪎",
  	"gsiml;": "⪐",
  	"GT;": ">",
  	GT: GT$3,
  	"Gt;": "≫",
  	"gt;": ">",
  	gt: gt$2,
  	"gtcc;": "⪧",
  	"gtcir;": "⩺",
  	"gtdot;": "⋗",
  	"gtlPar;": "⦕",
  	"gtquest;": "⩼",
  	"gtrapprox;": "⪆",
  	"gtrarr;": "⥸",
  	"gtrdot;": "⋗",
  	"gtreqless;": "⋛",
  	"gtreqqless;": "⪌",
  	"gtrless;": "≷",
  	"gtrsim;": "≳",
  	"gvertneqq;": "≩︀",
  	"gvnE;": "≩︀",
  	"Hacek;": "ˇ",
  	"hairsp;": " ",
  	"half;": "½",
  	"hamilt;": "ℋ",
  	"HARDcy;": "Ъ",
  	"hardcy;": "ъ",
  	"hArr;": "⇔",
  	"harr;": "↔",
  	"harrcir;": "⥈",
  	"harrw;": "↭",
  	"Hat;": "^",
  	"hbar;": "ℏ",
  	"Hcirc;": "Ĥ",
  	"hcirc;": "ĥ",
  	"hearts;": "♥",
  	"heartsuit;": "♥",
  	"hellip;": "…",
  	"hercon;": "⊹",
  	"Hfr;": "ℌ",
  	"hfr;": "𝔥",
  	"HilbertSpace;": "ℋ",
  	"hksearow;": "⤥",
  	"hkswarow;": "⤦",
  	"hoarr;": "⇿",
  	"homtht;": "∻",
  	"hookleftarrow;": "↩",
  	"hookrightarrow;": "↪",
  	"Hopf;": "ℍ",
  	"hopf;": "𝕙",
  	"horbar;": "―",
  	"HorizontalLine;": "─",
  	"Hscr;": "ℋ",
  	"hscr;": "𝒽",
  	"hslash;": "ℏ",
  	"Hstrok;": "Ħ",
  	"hstrok;": "ħ",
  	"HumpDownHump;": "≎",
  	"HumpEqual;": "≏",
  	"hybull;": "⁃",
  	"hyphen;": "‐",
  	"Iacute;": "Í",
  	Iacute: Iacute$1,
  	"iacute;": "í",
  	iacute: iacute$1,
  	"ic;": "⁣",
  	"Icirc;": "Î",
  	Icirc: Icirc$1,
  	"icirc;": "î",
  	icirc: icirc$1,
  	"Icy;": "И",
  	"icy;": "и",
  	"Idot;": "İ",
  	"IEcy;": "Е",
  	"iecy;": "е",
  	"iexcl;": "¡",
  	iexcl: iexcl$1,
  	"iff;": "⇔",
  	"Ifr;": "ℑ",
  	"ifr;": "𝔦",
  	"Igrave;": "Ì",
  	Igrave: Igrave$1,
  	"igrave;": "ì",
  	igrave: igrave$1,
  	"ii;": "ⅈ",
  	"iiiint;": "⨌",
  	"iiint;": "∭",
  	"iinfin;": "⧜",
  	"iiota;": "℩",
  	"IJlig;": "Ĳ",
  	"ijlig;": "ĳ",
  	"Im;": "ℑ",
  	"Imacr;": "Ī",
  	"imacr;": "ī",
  	"image;": "ℑ",
  	"ImaginaryI;": "ⅈ",
  	"imagline;": "ℐ",
  	"imagpart;": "ℑ",
  	"imath;": "ı",
  	"imof;": "⊷",
  	"imped;": "Ƶ",
  	"Implies;": "⇒",
  	"in;": "∈",
  	"incare;": "℅",
  	"infin;": "∞",
  	"infintie;": "⧝",
  	"inodot;": "ı",
  	"Int;": "∬",
  	"int;": "∫",
  	"intcal;": "⊺",
  	"integers;": "ℤ",
  	"Integral;": "∫",
  	"intercal;": "⊺",
  	"Intersection;": "⋂",
  	"intlarhk;": "⨗",
  	"intprod;": "⨼",
  	"InvisibleComma;": "⁣",
  	"InvisibleTimes;": "⁢",
  	"IOcy;": "Ё",
  	"iocy;": "ё",
  	"Iogon;": "Į",
  	"iogon;": "į",
  	"Iopf;": "𝕀",
  	"iopf;": "𝕚",
  	"Iota;": "Ι",
  	"iota;": "ι",
  	"iprod;": "⨼",
  	"iquest;": "¿",
  	iquest: iquest$1,
  	"Iscr;": "ℐ",
  	"iscr;": "𝒾",
  	"isin;": "∈",
  	"isindot;": "⋵",
  	"isinE;": "⋹",
  	"isins;": "⋴",
  	"isinsv;": "⋳",
  	"isinv;": "∈",
  	"it;": "⁢",
  	"Itilde;": "Ĩ",
  	"itilde;": "ĩ",
  	"Iukcy;": "І",
  	"iukcy;": "і",
  	"Iuml;": "Ï",
  	Iuml: Iuml$1,
  	"iuml;": "ï",
  	iuml: iuml$1,
  	"Jcirc;": "Ĵ",
  	"jcirc;": "ĵ",
  	"Jcy;": "Й",
  	"jcy;": "й",
  	"Jfr;": "𝔍",
  	"jfr;": "𝔧",
  	"jmath;": "ȷ",
  	"Jopf;": "𝕁",
  	"jopf;": "𝕛",
  	"Jscr;": "𝒥",
  	"jscr;": "𝒿",
  	"Jsercy;": "Ј",
  	"jsercy;": "ј",
  	"Jukcy;": "Є",
  	"jukcy;": "є",
  	"Kappa;": "Κ",
  	"kappa;": "κ",
  	"kappav;": "ϰ",
  	"Kcedil;": "Ķ",
  	"kcedil;": "ķ",
  	"Kcy;": "К",
  	"kcy;": "к",
  	"Kfr;": "𝔎",
  	"kfr;": "𝔨",
  	"kgreen;": "ĸ",
  	"KHcy;": "Х",
  	"khcy;": "х",
  	"KJcy;": "Ќ",
  	"kjcy;": "ќ",
  	"Kopf;": "𝕂",
  	"kopf;": "𝕜",
  	"Kscr;": "𝒦",
  	"kscr;": "𝓀",
  	"lAarr;": "⇚",
  	"Lacute;": "Ĺ",
  	"lacute;": "ĺ",
  	"laemptyv;": "⦴",
  	"lagran;": "ℒ",
  	"Lambda;": "Λ",
  	"lambda;": "λ",
  	"Lang;": "⟪",
  	"lang;": "⟨",
  	"langd;": "⦑",
  	"langle;": "⟨",
  	"lap;": "⪅",
  	"Laplacetrf;": "ℒ",
  	"laquo;": "«",
  	laquo: laquo$1,
  	"Larr;": "↞",
  	"lArr;": "⇐",
  	"larr;": "←",
  	"larrb;": "⇤",
  	"larrbfs;": "⤟",
  	"larrfs;": "⤝",
  	"larrhk;": "↩",
  	"larrlp;": "↫",
  	"larrpl;": "⤹",
  	"larrsim;": "⥳",
  	"larrtl;": "↢",
  	"lat;": "⪫",
  	"lAtail;": "⤛",
  	"latail;": "⤙",
  	"late;": "⪭",
  	"lates;": "⪭︀",
  	"lBarr;": "⤎",
  	"lbarr;": "⤌",
  	"lbbrk;": "❲",
  	"lbrace;": "{",
  	"lbrack;": "[",
  	"lbrke;": "⦋",
  	"lbrksld;": "⦏",
  	"lbrkslu;": "⦍",
  	"Lcaron;": "Ľ",
  	"lcaron;": "ľ",
  	"Lcedil;": "Ļ",
  	"lcedil;": "ļ",
  	"lceil;": "⌈",
  	"lcub;": "{",
  	"Lcy;": "Л",
  	"lcy;": "л",
  	"ldca;": "⤶",
  	"ldquo;": "“",
  	"ldquor;": "„",
  	"ldrdhar;": "⥧",
  	"ldrushar;": "⥋",
  	"ldsh;": "↲",
  	"lE;": "≦",
  	"le;": "≤",
  	"LeftAngleBracket;": "⟨",
  	"LeftArrow;": "←",
  	"Leftarrow;": "⇐",
  	"leftarrow;": "←",
  	"LeftArrowBar;": "⇤",
  	"LeftArrowRightArrow;": "⇆",
  	"leftarrowtail;": "↢",
  	"LeftCeiling;": "⌈",
  	"LeftDoubleBracket;": "⟦",
  	"LeftDownTeeVector;": "⥡",
  	"LeftDownVector;": "⇃",
  	"LeftDownVectorBar;": "⥙",
  	"LeftFloor;": "⌊",
  	"leftharpoondown;": "↽",
  	"leftharpoonup;": "↼",
  	"leftleftarrows;": "⇇",
  	"LeftRightArrow;": "↔",
  	"Leftrightarrow;": "⇔",
  	"leftrightarrow;": "↔",
  	"leftrightarrows;": "⇆",
  	"leftrightharpoons;": "⇋",
  	"leftrightsquigarrow;": "↭",
  	"LeftRightVector;": "⥎",
  	"LeftTee;": "⊣",
  	"LeftTeeArrow;": "↤",
  	"LeftTeeVector;": "⥚",
  	"leftthreetimes;": "⋋",
  	"LeftTriangle;": "⊲",
  	"LeftTriangleBar;": "⧏",
  	"LeftTriangleEqual;": "⊴",
  	"LeftUpDownVector;": "⥑",
  	"LeftUpTeeVector;": "⥠",
  	"LeftUpVector;": "↿",
  	"LeftUpVectorBar;": "⥘",
  	"LeftVector;": "↼",
  	"LeftVectorBar;": "⥒",
  	"lEg;": "⪋",
  	"leg;": "⋚",
  	"leq;": "≤",
  	"leqq;": "≦",
  	"leqslant;": "⩽",
  	"les;": "⩽",
  	"lescc;": "⪨",
  	"lesdot;": "⩿",
  	"lesdoto;": "⪁",
  	"lesdotor;": "⪃",
  	"lesg;": "⋚︀",
  	"lesges;": "⪓",
  	"lessapprox;": "⪅",
  	"lessdot;": "⋖",
  	"lesseqgtr;": "⋚",
  	"lesseqqgtr;": "⪋",
  	"LessEqualGreater;": "⋚",
  	"LessFullEqual;": "≦",
  	"LessGreater;": "≶",
  	"lessgtr;": "≶",
  	"LessLess;": "⪡",
  	"lesssim;": "≲",
  	"LessSlantEqual;": "⩽",
  	"LessTilde;": "≲",
  	"lfisht;": "⥼",
  	"lfloor;": "⌊",
  	"Lfr;": "𝔏",
  	"lfr;": "𝔩",
  	"lg;": "≶",
  	"lgE;": "⪑",
  	"lHar;": "⥢",
  	"lhard;": "↽",
  	"lharu;": "↼",
  	"lharul;": "⥪",
  	"lhblk;": "▄",
  	"LJcy;": "Љ",
  	"ljcy;": "љ",
  	"Ll;": "⋘",
  	"ll;": "≪",
  	"llarr;": "⇇",
  	"llcorner;": "⌞",
  	"Lleftarrow;": "⇚",
  	"llhard;": "⥫",
  	"lltri;": "◺",
  	"Lmidot;": "Ŀ",
  	"lmidot;": "ŀ",
  	"lmoust;": "⎰",
  	"lmoustache;": "⎰",
  	"lnap;": "⪉",
  	"lnapprox;": "⪉",
  	"lnE;": "≨",
  	"lne;": "⪇",
  	"lneq;": "⪇",
  	"lneqq;": "≨",
  	"lnsim;": "⋦",
  	"loang;": "⟬",
  	"loarr;": "⇽",
  	"lobrk;": "⟦",
  	"LongLeftArrow;": "⟵",
  	"Longleftarrow;": "⟸",
  	"longleftarrow;": "⟵",
  	"LongLeftRightArrow;": "⟷",
  	"Longleftrightarrow;": "⟺",
  	"longleftrightarrow;": "⟷",
  	"longmapsto;": "⟼",
  	"LongRightArrow;": "⟶",
  	"Longrightarrow;": "⟹",
  	"longrightarrow;": "⟶",
  	"looparrowleft;": "↫",
  	"looparrowright;": "↬",
  	"lopar;": "⦅",
  	"Lopf;": "𝕃",
  	"lopf;": "𝕝",
  	"loplus;": "⨭",
  	"lotimes;": "⨴",
  	"lowast;": "∗",
  	"lowbar;": "_",
  	"LowerLeftArrow;": "↙",
  	"LowerRightArrow;": "↘",
  	"loz;": "◊",
  	"lozenge;": "◊",
  	"lozf;": "⧫",
  	"lpar;": "(",
  	"lparlt;": "⦓",
  	"lrarr;": "⇆",
  	"lrcorner;": "⌟",
  	"lrhar;": "⇋",
  	"lrhard;": "⥭",
  	"lrm;": "‎",
  	"lrtri;": "⊿",
  	"lsaquo;": "‹",
  	"Lscr;": "ℒ",
  	"lscr;": "𝓁",
  	"Lsh;": "↰",
  	"lsh;": "↰",
  	"lsim;": "≲",
  	"lsime;": "⪍",
  	"lsimg;": "⪏",
  	"lsqb;": "[",
  	"lsquo;": "‘",
  	"lsquor;": "‚",
  	"Lstrok;": "Ł",
  	"lstrok;": "ł",
  	"LT;": "<",
  	LT: LT$3,
  	"Lt;": "≪",
  	"lt;": "<",
  	lt: lt$2,
  	"ltcc;": "⪦",
  	"ltcir;": "⩹",
  	"ltdot;": "⋖",
  	"lthree;": "⋋",
  	"ltimes;": "⋉",
  	"ltlarr;": "⥶",
  	"ltquest;": "⩻",
  	"ltri;": "◃",
  	"ltrie;": "⊴",
  	"ltrif;": "◂",
  	"ltrPar;": "⦖",
  	"lurdshar;": "⥊",
  	"luruhar;": "⥦",
  	"lvertneqq;": "≨︀",
  	"lvnE;": "≨︀",
  	"macr;": "¯",
  	macr: macr$1,
  	"male;": "♂",
  	"malt;": "✠",
  	"maltese;": "✠",
  	"Map;": "⤅",
  	"map;": "↦",
  	"mapsto;": "↦",
  	"mapstodown;": "↧",
  	"mapstoleft;": "↤",
  	"mapstoup;": "↥",
  	"marker;": "▮",
  	"mcomma;": "⨩",
  	"Mcy;": "М",
  	"mcy;": "м",
  	"mdash;": "—",
  	"mDDot;": "∺",
  	"measuredangle;": "∡",
  	"MediumSpace;": " ",
  	"Mellintrf;": "ℳ",
  	"Mfr;": "𝔐",
  	"mfr;": "𝔪",
  	"mho;": "℧",
  	"micro;": "µ",
  	micro: micro$1,
  	"mid;": "∣",
  	"midast;": "*",
  	"midcir;": "⫰",
  	"middot;": "·",
  	middot: middot$1,
  	"minus;": "−",
  	"minusb;": "⊟",
  	"minusd;": "∸",
  	"minusdu;": "⨪",
  	"MinusPlus;": "∓",
  	"mlcp;": "⫛",
  	"mldr;": "…",
  	"mnplus;": "∓",
  	"models;": "⊧",
  	"Mopf;": "𝕄",
  	"mopf;": "𝕞",
  	"mp;": "∓",
  	"Mscr;": "ℳ",
  	"mscr;": "𝓂",
  	"mstpos;": "∾",
  	"Mu;": "Μ",
  	"mu;": "μ",
  	"multimap;": "⊸",
  	"mumap;": "⊸",
  	"nabla;": "∇",
  	"Nacute;": "Ń",
  	"nacute;": "ń",
  	"nang;": "∠⃒",
  	"nap;": "≉",
  	"napE;": "⩰̸",
  	"napid;": "≋̸",
  	"napos;": "ŉ",
  	"napprox;": "≉",
  	"natur;": "♮",
  	"natural;": "♮",
  	"naturals;": "ℕ",
  	"nbsp;": " ",
  	nbsp: nbsp$1,
  	"nbump;": "≎̸",
  	"nbumpe;": "≏̸",
  	"ncap;": "⩃",
  	"Ncaron;": "Ň",
  	"ncaron;": "ň",
  	"Ncedil;": "Ņ",
  	"ncedil;": "ņ",
  	"ncong;": "≇",
  	"ncongdot;": "⩭̸",
  	"ncup;": "⩂",
  	"Ncy;": "Н",
  	"ncy;": "н",
  	"ndash;": "–",
  	"ne;": "≠",
  	"nearhk;": "⤤",
  	"neArr;": "⇗",
  	"nearr;": "↗",
  	"nearrow;": "↗",
  	"nedot;": "≐̸",
  	"NegativeMediumSpace;": "​",
  	"NegativeThickSpace;": "​",
  	"NegativeThinSpace;": "​",
  	"NegativeVeryThinSpace;": "​",
  	"nequiv;": "≢",
  	"nesear;": "⤨",
  	"nesim;": "≂̸",
  	"NestedGreaterGreater;": "≫",
  	"NestedLessLess;": "≪",
  	"NewLine;": "\n",
  	"nexist;": "∄",
  	"nexists;": "∄",
  	"Nfr;": "𝔑",
  	"nfr;": "𝔫",
  	"ngE;": "≧̸",
  	"nge;": "≱",
  	"ngeq;": "≱",
  	"ngeqq;": "≧̸",
  	"ngeqslant;": "⩾̸",
  	"nges;": "⩾̸",
  	"nGg;": "⋙̸",
  	"ngsim;": "≵",
  	"nGt;": "≫⃒",
  	"ngt;": "≯",
  	"ngtr;": "≯",
  	"nGtv;": "≫̸",
  	"nhArr;": "⇎",
  	"nharr;": "↮",
  	"nhpar;": "⫲",
  	"ni;": "∋",
  	"nis;": "⋼",
  	"nisd;": "⋺",
  	"niv;": "∋",
  	"NJcy;": "Њ",
  	"njcy;": "њ",
  	"nlArr;": "⇍",
  	"nlarr;": "↚",
  	"nldr;": "‥",
  	"nlE;": "≦̸",
  	"nle;": "≰",
  	"nLeftarrow;": "⇍",
  	"nleftarrow;": "↚",
  	"nLeftrightarrow;": "⇎",
  	"nleftrightarrow;": "↮",
  	"nleq;": "≰",
  	"nleqq;": "≦̸",
  	"nleqslant;": "⩽̸",
  	"nles;": "⩽̸",
  	"nless;": "≮",
  	"nLl;": "⋘̸",
  	"nlsim;": "≴",
  	"nLt;": "≪⃒",
  	"nlt;": "≮",
  	"nltri;": "⋪",
  	"nltrie;": "⋬",
  	"nLtv;": "≪̸",
  	"nmid;": "∤",
  	"NoBreak;": "⁠",
  	"NonBreakingSpace;": " ",
  	"Nopf;": "ℕ",
  	"nopf;": "𝕟",
  	"Not;": "⫬",
  	"not;": "¬",
  	not: not$2,
  	"NotCongruent;": "≢",
  	"NotCupCap;": "≭",
  	"NotDoubleVerticalBar;": "∦",
  	"NotElement;": "∉",
  	"NotEqual;": "≠",
  	"NotEqualTilde;": "≂̸",
  	"NotExists;": "∄",
  	"NotGreater;": "≯",
  	"NotGreaterEqual;": "≱",
  	"NotGreaterFullEqual;": "≧̸",
  	"NotGreaterGreater;": "≫̸",
  	"NotGreaterLess;": "≹",
  	"NotGreaterSlantEqual;": "⩾̸",
  	"NotGreaterTilde;": "≵",
  	"NotHumpDownHump;": "≎̸",
  	"NotHumpEqual;": "≏̸",
  	"notin;": "∉",
  	"notindot;": "⋵̸",
  	"notinE;": "⋹̸",
  	"notinva;": "∉",
  	"notinvb;": "⋷",
  	"notinvc;": "⋶",
  	"NotLeftTriangle;": "⋪",
  	"NotLeftTriangleBar;": "⧏̸",
  	"NotLeftTriangleEqual;": "⋬",
  	"NotLess;": "≮",
  	"NotLessEqual;": "≰",
  	"NotLessGreater;": "≸",
  	"NotLessLess;": "≪̸",
  	"NotLessSlantEqual;": "⩽̸",
  	"NotLessTilde;": "≴",
  	"NotNestedGreaterGreater;": "⪢̸",
  	"NotNestedLessLess;": "⪡̸",
  	"notni;": "∌",
  	"notniva;": "∌",
  	"notnivb;": "⋾",
  	"notnivc;": "⋽",
  	"NotPrecedes;": "⊀",
  	"NotPrecedesEqual;": "⪯̸",
  	"NotPrecedesSlantEqual;": "⋠",
  	"NotReverseElement;": "∌",
  	"NotRightTriangle;": "⋫",
  	"NotRightTriangleBar;": "⧐̸",
  	"NotRightTriangleEqual;": "⋭",
  	"NotSquareSubset;": "⊏̸",
  	"NotSquareSubsetEqual;": "⋢",
  	"NotSquareSuperset;": "⊐̸",
  	"NotSquareSupersetEqual;": "⋣",
  	"NotSubset;": "⊂⃒",
  	"NotSubsetEqual;": "⊈",
  	"NotSucceeds;": "⊁",
  	"NotSucceedsEqual;": "⪰̸",
  	"NotSucceedsSlantEqual;": "⋡",
  	"NotSucceedsTilde;": "≿̸",
  	"NotSuperset;": "⊃⃒",
  	"NotSupersetEqual;": "⊉",
  	"NotTilde;": "≁",
  	"NotTildeEqual;": "≄",
  	"NotTildeFullEqual;": "≇",
  	"NotTildeTilde;": "≉",
  	"NotVerticalBar;": "∤",
  	"npar;": "∦",
  	"nparallel;": "∦",
  	"nparsl;": "⫽⃥",
  	"npart;": "∂̸",
  	"npolint;": "⨔",
  	"npr;": "⊀",
  	"nprcue;": "⋠",
  	"npre;": "⪯̸",
  	"nprec;": "⊀",
  	"npreceq;": "⪯̸",
  	"nrArr;": "⇏",
  	"nrarr;": "↛",
  	"nrarrc;": "⤳̸",
  	"nrarrw;": "↝̸",
  	"nRightarrow;": "⇏",
  	"nrightarrow;": "↛",
  	"nrtri;": "⋫",
  	"nrtrie;": "⋭",
  	"nsc;": "⊁",
  	"nsccue;": "⋡",
  	"nsce;": "⪰̸",
  	"Nscr;": "𝒩",
  	"nscr;": "𝓃",
  	"nshortmid;": "∤",
  	"nshortparallel;": "∦",
  	"nsim;": "≁",
  	"nsime;": "≄",
  	"nsimeq;": "≄",
  	"nsmid;": "∤",
  	"nspar;": "∦",
  	"nsqsube;": "⋢",
  	"nsqsupe;": "⋣",
  	"nsub;": "⊄",
  	"nsubE;": "⫅̸",
  	"nsube;": "⊈",
  	"nsubset;": "⊂⃒",
  	"nsubseteq;": "⊈",
  	"nsubseteqq;": "⫅̸",
  	"nsucc;": "⊁",
  	"nsucceq;": "⪰̸",
  	"nsup;": "⊅",
  	"nsupE;": "⫆̸",
  	"nsupe;": "⊉",
  	"nsupset;": "⊃⃒",
  	"nsupseteq;": "⊉",
  	"nsupseteqq;": "⫆̸",
  	"ntgl;": "≹",
  	"Ntilde;": "Ñ",
  	Ntilde: Ntilde$1,
  	"ntilde;": "ñ",
  	ntilde: ntilde$1,
  	"ntlg;": "≸",
  	"ntriangleleft;": "⋪",
  	"ntrianglelefteq;": "⋬",
  	"ntriangleright;": "⋫",
  	"ntrianglerighteq;": "⋭",
  	"Nu;": "Ν",
  	"nu;": "ν",
  	"num;": "#",
  	"numero;": "№",
  	"numsp;": " ",
  	"nvap;": "≍⃒",
  	"nVDash;": "⊯",
  	"nVdash;": "⊮",
  	"nvDash;": "⊭",
  	"nvdash;": "⊬",
  	"nvge;": "≥⃒",
  	"nvgt;": ">⃒",
  	"nvHarr;": "⤄",
  	"nvinfin;": "⧞",
  	"nvlArr;": "⤂",
  	"nvle;": "≤⃒",
  	"nvlt;": "<⃒",
  	"nvltrie;": "⊴⃒",
  	"nvrArr;": "⤃",
  	"nvrtrie;": "⊵⃒",
  	"nvsim;": "∼⃒",
  	"nwarhk;": "⤣",
  	"nwArr;": "⇖",
  	"nwarr;": "↖",
  	"nwarrow;": "↖",
  	"nwnear;": "⤧",
  	"Oacute;": "Ó",
  	Oacute: Oacute$1,
  	"oacute;": "ó",
  	oacute: oacute$1,
  	"oast;": "⊛",
  	"ocir;": "⊚",
  	"Ocirc;": "Ô",
  	Ocirc: Ocirc$1,
  	"ocirc;": "ô",
  	ocirc: ocirc$1,
  	"Ocy;": "О",
  	"ocy;": "о",
  	"odash;": "⊝",
  	"Odblac;": "Ő",
  	"odblac;": "ő",
  	"odiv;": "⨸",
  	"odot;": "⊙",
  	"odsold;": "⦼",
  	"OElig;": "Œ",
  	"oelig;": "œ",
  	"ofcir;": "⦿",
  	"Ofr;": "𝔒",
  	"ofr;": "𝔬",
  	"ogon;": "˛",
  	"Ograve;": "Ò",
  	Ograve: Ograve$1,
  	"ograve;": "ò",
  	ograve: ograve$1,
  	"ogt;": "⧁",
  	"ohbar;": "⦵",
  	"ohm;": "Ω",
  	"oint;": "∮",
  	"olarr;": "↺",
  	"olcir;": "⦾",
  	"olcross;": "⦻",
  	"oline;": "‾",
  	"olt;": "⧀",
  	"Omacr;": "Ō",
  	"omacr;": "ō",
  	"Omega;": "Ω",
  	"omega;": "ω",
  	"Omicron;": "Ο",
  	"omicron;": "ο",
  	"omid;": "⦶",
  	"ominus;": "⊖",
  	"Oopf;": "𝕆",
  	"oopf;": "𝕠",
  	"opar;": "⦷",
  	"OpenCurlyDoubleQuote;": "“",
  	"OpenCurlyQuote;": "‘",
  	"operp;": "⦹",
  	"oplus;": "⊕",
  	"Or;": "⩔",
  	"or;": "∨",
  	"orarr;": "↻",
  	"ord;": "⩝",
  	"order;": "ℴ",
  	"orderof;": "ℴ",
  	"ordf;": "ª",
  	ordf: ordf$1,
  	"ordm;": "º",
  	ordm: ordm$1,
  	"origof;": "⊶",
  	"oror;": "⩖",
  	"orslope;": "⩗",
  	"orv;": "⩛",
  	"oS;": "Ⓢ",
  	"Oscr;": "𝒪",
  	"oscr;": "ℴ",
  	"Oslash;": "Ø",
  	Oslash: Oslash$1,
  	"oslash;": "ø",
  	oslash: oslash$1,
  	"osol;": "⊘",
  	"Otilde;": "Õ",
  	Otilde: Otilde$1,
  	"otilde;": "õ",
  	otilde: otilde$1,
  	"Otimes;": "⨷",
  	"otimes;": "⊗",
  	"otimesas;": "⨶",
  	"Ouml;": "Ö",
  	Ouml: Ouml$1,
  	"ouml;": "ö",
  	ouml: ouml$1,
  	"ovbar;": "⌽",
  	"OverBar;": "‾",
  	"OverBrace;": "⏞",
  	"OverBracket;": "⎴",
  	"OverParenthesis;": "⏜",
  	"par;": "∥",
  	"para;": "¶",
  	para: para$2,
  	"parallel;": "∥",
  	"parsim;": "⫳",
  	"parsl;": "⫽",
  	"part;": "∂",
  	"PartialD;": "∂",
  	"Pcy;": "П",
  	"pcy;": "п",
  	"percnt;": "%",
  	"period;": ".",
  	"permil;": "‰",
  	"perp;": "⊥",
  	"pertenk;": "‱",
  	"Pfr;": "𝔓",
  	"pfr;": "𝔭",
  	"Phi;": "Φ",
  	"phi;": "φ",
  	"phiv;": "ϕ",
  	"phmmat;": "ℳ",
  	"phone;": "☎",
  	"Pi;": "Π",
  	"pi;": "π",
  	"pitchfork;": "⋔",
  	"piv;": "ϖ",
  	"planck;": "ℏ",
  	"planckh;": "ℎ",
  	"plankv;": "ℏ",
  	"plus;": "+",
  	"plusacir;": "⨣",
  	"plusb;": "⊞",
  	"pluscir;": "⨢",
  	"plusdo;": "∔",
  	"plusdu;": "⨥",
  	"pluse;": "⩲",
  	"PlusMinus;": "±",
  	"plusmn;": "±",
  	plusmn: plusmn$1,
  	"plussim;": "⨦",
  	"plustwo;": "⨧",
  	"pm;": "±",
  	"Poincareplane;": "ℌ",
  	"pointint;": "⨕",
  	"Popf;": "ℙ",
  	"popf;": "𝕡",
  	"pound;": "£",
  	pound: pound$2,
  	"Pr;": "⪻",
  	"pr;": "≺",
  	"prap;": "⪷",
  	"prcue;": "≼",
  	"prE;": "⪳",
  	"pre;": "⪯",
  	"prec;": "≺",
  	"precapprox;": "⪷",
  	"preccurlyeq;": "≼",
  	"Precedes;": "≺",
  	"PrecedesEqual;": "⪯",
  	"PrecedesSlantEqual;": "≼",
  	"PrecedesTilde;": "≾",
  	"preceq;": "⪯",
  	"precnapprox;": "⪹",
  	"precneqq;": "⪵",
  	"precnsim;": "⋨",
  	"precsim;": "≾",
  	"Prime;": "″",
  	"prime;": "′",
  	"primes;": "ℙ",
  	"prnap;": "⪹",
  	"prnE;": "⪵",
  	"prnsim;": "⋨",
  	"prod;": "∏",
  	"Product;": "∏",
  	"profalar;": "⌮",
  	"profline;": "⌒",
  	"profsurf;": "⌓",
  	"prop;": "∝",
  	"Proportion;": "∷",
  	"Proportional;": "∝",
  	"propto;": "∝",
  	"prsim;": "≾",
  	"prurel;": "⊰",
  	"Pscr;": "𝒫",
  	"pscr;": "𝓅",
  	"Psi;": "Ψ",
  	"psi;": "ψ",
  	"puncsp;": " ",
  	"Qfr;": "𝔔",
  	"qfr;": "𝔮",
  	"qint;": "⨌",
  	"Qopf;": "ℚ",
  	"qopf;": "𝕢",
  	"qprime;": "⁗",
  	"Qscr;": "𝒬",
  	"qscr;": "𝓆",
  	"quaternions;": "ℍ",
  	"quatint;": "⨖",
  	"quest;": "?",
  	"questeq;": "≟",
  	"QUOT;": "\"",
  	QUOT: QUOT$3,
  	"quot;": "\"",
  	quot: quot$2,
  	"rAarr;": "⇛",
  	"race;": "∽̱",
  	"Racute;": "Ŕ",
  	"racute;": "ŕ",
  	"radic;": "√",
  	"raemptyv;": "⦳",
  	"Rang;": "⟫",
  	"rang;": "⟩",
  	"rangd;": "⦒",
  	"range;": "⦥",
  	"rangle;": "⟩",
  	"raquo;": "»",
  	raquo: raquo$1,
  	"Rarr;": "↠",
  	"rArr;": "⇒",
  	"rarr;": "→",
  	"rarrap;": "⥵",
  	"rarrb;": "⇥",
  	"rarrbfs;": "⤠",
  	"rarrc;": "⤳",
  	"rarrfs;": "⤞",
  	"rarrhk;": "↪",
  	"rarrlp;": "↬",
  	"rarrpl;": "⥅",
  	"rarrsim;": "⥴",
  	"Rarrtl;": "⤖",
  	"rarrtl;": "↣",
  	"rarrw;": "↝",
  	"rAtail;": "⤜",
  	"ratail;": "⤚",
  	"ratio;": "∶",
  	"rationals;": "ℚ",
  	"RBarr;": "⤐",
  	"rBarr;": "⤏",
  	"rbarr;": "⤍",
  	"rbbrk;": "❳",
  	"rbrace;": "}",
  	"rbrack;": "]",
  	"rbrke;": "⦌",
  	"rbrksld;": "⦎",
  	"rbrkslu;": "⦐",
  	"Rcaron;": "Ř",
  	"rcaron;": "ř",
  	"Rcedil;": "Ŗ",
  	"rcedil;": "ŗ",
  	"rceil;": "⌉",
  	"rcub;": "}",
  	"Rcy;": "Р",
  	"rcy;": "р",
  	"rdca;": "⤷",
  	"rdldhar;": "⥩",
  	"rdquo;": "”",
  	"rdquor;": "”",
  	"rdsh;": "↳",
  	"Re;": "ℜ",
  	"real;": "ℜ",
  	"realine;": "ℛ",
  	"realpart;": "ℜ",
  	"reals;": "ℝ",
  	"rect;": "▭",
  	"REG;": "®",
  	REG: REG$3,
  	"reg;": "®",
  	reg: reg$2,
  	"ReverseElement;": "∋",
  	"ReverseEquilibrium;": "⇋",
  	"ReverseUpEquilibrium;": "⥯",
  	"rfisht;": "⥽",
  	"rfloor;": "⌋",
  	"Rfr;": "ℜ",
  	"rfr;": "𝔯",
  	"rHar;": "⥤",
  	"rhard;": "⇁",
  	"rharu;": "⇀",
  	"rharul;": "⥬",
  	"Rho;": "Ρ",
  	"rho;": "ρ",
  	"rhov;": "ϱ",
  	"RightAngleBracket;": "⟩",
  	"RightArrow;": "→",
  	"Rightarrow;": "⇒",
  	"rightarrow;": "→",
  	"RightArrowBar;": "⇥",
  	"RightArrowLeftArrow;": "⇄",
  	"rightarrowtail;": "↣",
  	"RightCeiling;": "⌉",
  	"RightDoubleBracket;": "⟧",
  	"RightDownTeeVector;": "⥝",
  	"RightDownVector;": "⇂",
  	"RightDownVectorBar;": "⥕",
  	"RightFloor;": "⌋",
  	"rightharpoondown;": "⇁",
  	"rightharpoonup;": "⇀",
  	"rightleftarrows;": "⇄",
  	"rightleftharpoons;": "⇌",
  	"rightrightarrows;": "⇉",
  	"rightsquigarrow;": "↝",
  	"RightTee;": "⊢",
  	"RightTeeArrow;": "↦",
  	"RightTeeVector;": "⥛",
  	"rightthreetimes;": "⋌",
  	"RightTriangle;": "⊳",
  	"RightTriangleBar;": "⧐",
  	"RightTriangleEqual;": "⊵",
  	"RightUpDownVector;": "⥏",
  	"RightUpTeeVector;": "⥜",
  	"RightUpVector;": "↾",
  	"RightUpVectorBar;": "⥔",
  	"RightVector;": "⇀",
  	"RightVectorBar;": "⥓",
  	"ring;": "˚",
  	"risingdotseq;": "≓",
  	"rlarr;": "⇄",
  	"rlhar;": "⇌",
  	"rlm;": "‏",
  	"rmoust;": "⎱",
  	"rmoustache;": "⎱",
  	"rnmid;": "⫮",
  	"roang;": "⟭",
  	"roarr;": "⇾",
  	"robrk;": "⟧",
  	"ropar;": "⦆",
  	"Ropf;": "ℝ",
  	"ropf;": "𝕣",
  	"roplus;": "⨮",
  	"rotimes;": "⨵",
  	"RoundImplies;": "⥰",
  	"rpar;": ")",
  	"rpargt;": "⦔",
  	"rppolint;": "⨒",
  	"rrarr;": "⇉",
  	"Rrightarrow;": "⇛",
  	"rsaquo;": "›",
  	"Rscr;": "ℛ",
  	"rscr;": "𝓇",
  	"Rsh;": "↱",
  	"rsh;": "↱",
  	"rsqb;": "]",
  	"rsquo;": "’",
  	"rsquor;": "’",
  	"rthree;": "⋌",
  	"rtimes;": "⋊",
  	"rtri;": "▹",
  	"rtrie;": "⊵",
  	"rtrif;": "▸",
  	"rtriltri;": "⧎",
  	"RuleDelayed;": "⧴",
  	"ruluhar;": "⥨",
  	"rx;": "℞",
  	"Sacute;": "Ś",
  	"sacute;": "ś",
  	"sbquo;": "‚",
  	"Sc;": "⪼",
  	"sc;": "≻",
  	"scap;": "⪸",
  	"Scaron;": "Š",
  	"scaron;": "š",
  	"sccue;": "≽",
  	"scE;": "⪴",
  	"sce;": "⪰",
  	"Scedil;": "Ş",
  	"scedil;": "ş",
  	"Scirc;": "Ŝ",
  	"scirc;": "ŝ",
  	"scnap;": "⪺",
  	"scnE;": "⪶",
  	"scnsim;": "⋩",
  	"scpolint;": "⨓",
  	"scsim;": "≿",
  	"Scy;": "С",
  	"scy;": "с",
  	"sdot;": "⋅",
  	"sdotb;": "⊡",
  	"sdote;": "⩦",
  	"searhk;": "⤥",
  	"seArr;": "⇘",
  	"searr;": "↘",
  	"searrow;": "↘",
  	"sect;": "§",
  	sect: sect$2,
  	"semi;": ";",
  	"seswar;": "⤩",
  	"setminus;": "∖",
  	"setmn;": "∖",
  	"sext;": "✶",
  	"Sfr;": "𝔖",
  	"sfr;": "𝔰",
  	"sfrown;": "⌢",
  	"sharp;": "♯",
  	"SHCHcy;": "Щ",
  	"shchcy;": "щ",
  	"SHcy;": "Ш",
  	"shcy;": "ш",
  	"ShortDownArrow;": "↓",
  	"ShortLeftArrow;": "←",
  	"shortmid;": "∣",
  	"shortparallel;": "∥",
  	"ShortRightArrow;": "→",
  	"ShortUpArrow;": "↑",
  	"shy;": "­",
  	shy: shy$2,
  	"Sigma;": "Σ",
  	"sigma;": "σ",
  	"sigmaf;": "ς",
  	"sigmav;": "ς",
  	"sim;": "∼",
  	"simdot;": "⩪",
  	"sime;": "≃",
  	"simeq;": "≃",
  	"simg;": "⪞",
  	"simgE;": "⪠",
  	"siml;": "⪝",
  	"simlE;": "⪟",
  	"simne;": "≆",
  	"simplus;": "⨤",
  	"simrarr;": "⥲",
  	"slarr;": "←",
  	"SmallCircle;": "∘",
  	"smallsetminus;": "∖",
  	"smashp;": "⨳",
  	"smeparsl;": "⧤",
  	"smid;": "∣",
  	"smile;": "⌣",
  	"smt;": "⪪",
  	"smte;": "⪬",
  	"smtes;": "⪬︀",
  	"SOFTcy;": "Ь",
  	"softcy;": "ь",
  	"sol;": "/",
  	"solb;": "⧄",
  	"solbar;": "⌿",
  	"Sopf;": "𝕊",
  	"sopf;": "𝕤",
  	"spades;": "♠",
  	"spadesuit;": "♠",
  	"spar;": "∥",
  	"sqcap;": "⊓",
  	"sqcaps;": "⊓︀",
  	"sqcup;": "⊔",
  	"sqcups;": "⊔︀",
  	"Sqrt;": "√",
  	"sqsub;": "⊏",
  	"sqsube;": "⊑",
  	"sqsubset;": "⊏",
  	"sqsubseteq;": "⊑",
  	"sqsup;": "⊐",
  	"sqsupe;": "⊒",
  	"sqsupset;": "⊐",
  	"sqsupseteq;": "⊒",
  	"squ;": "□",
  	"Square;": "□",
  	"square;": "□",
  	"SquareIntersection;": "⊓",
  	"SquareSubset;": "⊏",
  	"SquareSubsetEqual;": "⊑",
  	"SquareSuperset;": "⊐",
  	"SquareSupersetEqual;": "⊒",
  	"SquareUnion;": "⊔",
  	"squarf;": "▪",
  	"squf;": "▪",
  	"srarr;": "→",
  	"Sscr;": "𝒮",
  	"sscr;": "𝓈",
  	"ssetmn;": "∖",
  	"ssmile;": "⌣",
  	"sstarf;": "⋆",
  	"Star;": "⋆",
  	"star;": "☆",
  	"starf;": "★",
  	"straightepsilon;": "ϵ",
  	"straightphi;": "ϕ",
  	"strns;": "¯",
  	"Sub;": "⋐",
  	"sub;": "⊂",
  	"subdot;": "⪽",
  	"subE;": "⫅",
  	"sube;": "⊆",
  	"subedot;": "⫃",
  	"submult;": "⫁",
  	"subnE;": "⫋",
  	"subne;": "⊊",
  	"subplus;": "⪿",
  	"subrarr;": "⥹",
  	"Subset;": "⋐",
  	"subset;": "⊂",
  	"subseteq;": "⊆",
  	"subseteqq;": "⫅",
  	"SubsetEqual;": "⊆",
  	"subsetneq;": "⊊",
  	"subsetneqq;": "⫋",
  	"subsim;": "⫇",
  	"subsub;": "⫕",
  	"subsup;": "⫓",
  	"succ;": "≻",
  	"succapprox;": "⪸",
  	"succcurlyeq;": "≽",
  	"Succeeds;": "≻",
  	"SucceedsEqual;": "⪰",
  	"SucceedsSlantEqual;": "≽",
  	"SucceedsTilde;": "≿",
  	"succeq;": "⪰",
  	"succnapprox;": "⪺",
  	"succneqq;": "⪶",
  	"succnsim;": "⋩",
  	"succsim;": "≿",
  	"SuchThat;": "∋",
  	"Sum;": "∑",
  	"sum;": "∑",
  	"sung;": "♪",
  	"Sup;": "⋑",
  	"sup;": "⊃",
  	"sup1;": "¹",
  	sup1: sup1$1,
  	"sup2;": "²",
  	sup2: sup2$1,
  	"sup3;": "³",
  	sup3: sup3$1,
  	"supdot;": "⪾",
  	"supdsub;": "⫘",
  	"supE;": "⫆",
  	"supe;": "⊇",
  	"supedot;": "⫄",
  	"Superset;": "⊃",
  	"SupersetEqual;": "⊇",
  	"suphsol;": "⟉",
  	"suphsub;": "⫗",
  	"suplarr;": "⥻",
  	"supmult;": "⫂",
  	"supnE;": "⫌",
  	"supne;": "⊋",
  	"supplus;": "⫀",
  	"Supset;": "⋑",
  	"supset;": "⊃",
  	"supseteq;": "⊇",
  	"supseteqq;": "⫆",
  	"supsetneq;": "⊋",
  	"supsetneqq;": "⫌",
  	"supsim;": "⫈",
  	"supsub;": "⫔",
  	"supsup;": "⫖",
  	"swarhk;": "⤦",
  	"swArr;": "⇙",
  	"swarr;": "↙",
  	"swarrow;": "↙",
  	"swnwar;": "⤪",
  	"szlig;": "ß",
  	szlig: szlig$1,
  	"Tab;": "\t",
  	"target;": "⌖",
  	"Tau;": "Τ",
  	"tau;": "τ",
  	"tbrk;": "⎴",
  	"Tcaron;": "Ť",
  	"tcaron;": "ť",
  	"Tcedil;": "Ţ",
  	"tcedil;": "ţ",
  	"Tcy;": "Т",
  	"tcy;": "т",
  	"tdot;": "⃛",
  	"telrec;": "⌕",
  	"Tfr;": "𝔗",
  	"tfr;": "𝔱",
  	"there4;": "∴",
  	"Therefore;": "∴",
  	"therefore;": "∴",
  	"Theta;": "Θ",
  	"theta;": "θ",
  	"thetasym;": "ϑ",
  	"thetav;": "ϑ",
  	"thickapprox;": "≈",
  	"thicksim;": "∼",
  	"ThickSpace;": "  ",
  	"thinsp;": " ",
  	"ThinSpace;": " ",
  	"thkap;": "≈",
  	"thksim;": "∼",
  	"THORN;": "Þ",
  	THORN: THORN$2,
  	"thorn;": "þ",
  	thorn: thorn$2,
  	"Tilde;": "∼",
  	"tilde;": "˜",
  	"TildeEqual;": "≃",
  	"TildeFullEqual;": "≅",
  	"TildeTilde;": "≈",
  	"times;": "×",
  	times: times$2,
  	"timesb;": "⊠",
  	"timesbar;": "⨱",
  	"timesd;": "⨰",
  	"tint;": "∭",
  	"toea;": "⤨",
  	"top;": "⊤",
  	"topbot;": "⌶",
  	"topcir;": "⫱",
  	"Topf;": "𝕋",
  	"topf;": "𝕥",
  	"topfork;": "⫚",
  	"tosa;": "⤩",
  	"tprime;": "‴",
  	"TRADE;": "™",
  	"trade;": "™",
  	"triangle;": "▵",
  	"triangledown;": "▿",
  	"triangleleft;": "◃",
  	"trianglelefteq;": "⊴",
  	"triangleq;": "≜",
  	"triangleright;": "▹",
  	"trianglerighteq;": "⊵",
  	"tridot;": "◬",
  	"trie;": "≜",
  	"triminus;": "⨺",
  	"TripleDot;": "⃛",
  	"triplus;": "⨹",
  	"trisb;": "⧍",
  	"tritime;": "⨻",
  	"trpezium;": "⏢",
  	"Tscr;": "𝒯",
  	"tscr;": "𝓉",
  	"TScy;": "Ц",
  	"tscy;": "ц",
  	"TSHcy;": "Ћ",
  	"tshcy;": "ћ",
  	"Tstrok;": "Ŧ",
  	"tstrok;": "ŧ",
  	"twixt;": "≬",
  	"twoheadleftarrow;": "↞",
  	"twoheadrightarrow;": "↠",
  	"Uacute;": "Ú",
  	Uacute: Uacute$1,
  	"uacute;": "ú",
  	uacute: uacute$1,
  	"Uarr;": "↟",
  	"uArr;": "⇑",
  	"uarr;": "↑",
  	"Uarrocir;": "⥉",
  	"Ubrcy;": "Ў",
  	"ubrcy;": "ў",
  	"Ubreve;": "Ŭ",
  	"ubreve;": "ŭ",
  	"Ucirc;": "Û",
  	Ucirc: Ucirc$1,
  	"ucirc;": "û",
  	ucirc: ucirc$1,
  	"Ucy;": "У",
  	"ucy;": "у",
  	"udarr;": "⇅",
  	"Udblac;": "Ű",
  	"udblac;": "ű",
  	"udhar;": "⥮",
  	"ufisht;": "⥾",
  	"Ufr;": "𝔘",
  	"ufr;": "𝔲",
  	"Ugrave;": "Ù",
  	Ugrave: Ugrave$1,
  	"ugrave;": "ù",
  	ugrave: ugrave$1,
  	"uHar;": "⥣",
  	"uharl;": "↿",
  	"uharr;": "↾",
  	"uhblk;": "▀",
  	"ulcorn;": "⌜",
  	"ulcorner;": "⌜",
  	"ulcrop;": "⌏",
  	"ultri;": "◸",
  	"Umacr;": "Ū",
  	"umacr;": "ū",
  	"uml;": "¨",
  	uml: uml$2,
  	"UnderBar;": "_",
  	"UnderBrace;": "⏟",
  	"UnderBracket;": "⎵",
  	"UnderParenthesis;": "⏝",
  	"Union;": "⋃",
  	"UnionPlus;": "⊎",
  	"Uogon;": "Ų",
  	"uogon;": "ų",
  	"Uopf;": "𝕌",
  	"uopf;": "𝕦",
  	"UpArrow;": "↑",
  	"Uparrow;": "⇑",
  	"uparrow;": "↑",
  	"UpArrowBar;": "⤒",
  	"UpArrowDownArrow;": "⇅",
  	"UpDownArrow;": "↕",
  	"Updownarrow;": "⇕",
  	"updownarrow;": "↕",
  	"UpEquilibrium;": "⥮",
  	"upharpoonleft;": "↿",
  	"upharpoonright;": "↾",
  	"uplus;": "⊎",
  	"UpperLeftArrow;": "↖",
  	"UpperRightArrow;": "↗",
  	"Upsi;": "ϒ",
  	"upsi;": "υ",
  	"upsih;": "ϒ",
  	"Upsilon;": "Υ",
  	"upsilon;": "υ",
  	"UpTee;": "⊥",
  	"UpTeeArrow;": "↥",
  	"upuparrows;": "⇈",
  	"urcorn;": "⌝",
  	"urcorner;": "⌝",
  	"urcrop;": "⌎",
  	"Uring;": "Ů",
  	"uring;": "ů",
  	"urtri;": "◹",
  	"Uscr;": "𝒰",
  	"uscr;": "𝓊",
  	"utdot;": "⋰",
  	"Utilde;": "Ũ",
  	"utilde;": "ũ",
  	"utri;": "▵",
  	"utrif;": "▴",
  	"uuarr;": "⇈",
  	"Uuml;": "Ü",
  	Uuml: Uuml$1,
  	"uuml;": "ü",
  	uuml: uuml$1,
  	"uwangle;": "⦧",
  	"vangrt;": "⦜",
  	"varepsilon;": "ϵ",
  	"varkappa;": "ϰ",
  	"varnothing;": "∅",
  	"varphi;": "ϕ",
  	"varpi;": "ϖ",
  	"varpropto;": "∝",
  	"vArr;": "⇕",
  	"varr;": "↕",
  	"varrho;": "ϱ",
  	"varsigma;": "ς",
  	"varsubsetneq;": "⊊︀",
  	"varsubsetneqq;": "⫋︀",
  	"varsupsetneq;": "⊋︀",
  	"varsupsetneqq;": "⫌︀",
  	"vartheta;": "ϑ",
  	"vartriangleleft;": "⊲",
  	"vartriangleright;": "⊳",
  	"Vbar;": "⫫",
  	"vBar;": "⫨",
  	"vBarv;": "⫩",
  	"Vcy;": "В",
  	"vcy;": "в",
  	"VDash;": "⊫",
  	"Vdash;": "⊩",
  	"vDash;": "⊨",
  	"vdash;": "⊢",
  	"Vdashl;": "⫦",
  	"Vee;": "⋁",
  	"vee;": "∨",
  	"veebar;": "⊻",
  	"veeeq;": "≚",
  	"vellip;": "⋮",
  	"Verbar;": "‖",
  	"verbar;": "|",
  	"Vert;": "‖",
  	"vert;": "|",
  	"VerticalBar;": "∣",
  	"VerticalLine;": "|",
  	"VerticalSeparator;": "❘",
  	"VerticalTilde;": "≀",
  	"VeryThinSpace;": " ",
  	"Vfr;": "𝔙",
  	"vfr;": "𝔳",
  	"vltri;": "⊲",
  	"vnsub;": "⊂⃒",
  	"vnsup;": "⊃⃒",
  	"Vopf;": "𝕍",
  	"vopf;": "𝕧",
  	"vprop;": "∝",
  	"vrtri;": "⊳",
  	"Vscr;": "𝒱",
  	"vscr;": "𝓋",
  	"vsubnE;": "⫋︀",
  	"vsubne;": "⊊︀",
  	"vsupnE;": "⫌︀",
  	"vsupne;": "⊋︀",
  	"Vvdash;": "⊪",
  	"vzigzag;": "⦚",
  	"Wcirc;": "Ŵ",
  	"wcirc;": "ŵ",
  	"wedbar;": "⩟",
  	"Wedge;": "⋀",
  	"wedge;": "∧",
  	"wedgeq;": "≙",
  	"weierp;": "℘",
  	"Wfr;": "𝔚",
  	"wfr;": "𝔴",
  	"Wopf;": "𝕎",
  	"wopf;": "𝕨",
  	"wp;": "℘",
  	"wr;": "≀",
  	"wreath;": "≀",
  	"Wscr;": "𝒲",
  	"wscr;": "𝓌",
  	"xcap;": "⋂",
  	"xcirc;": "◯",
  	"xcup;": "⋃",
  	"xdtri;": "▽",
  	"Xfr;": "𝔛",
  	"xfr;": "𝔵",
  	"xhArr;": "⟺",
  	"xharr;": "⟷",
  	"Xi;": "Ξ",
  	"xi;": "ξ",
  	"xlArr;": "⟸",
  	"xlarr;": "⟵",
  	"xmap;": "⟼",
  	"xnis;": "⋻",
  	"xodot;": "⨀",
  	"Xopf;": "𝕏",
  	"xopf;": "𝕩",
  	"xoplus;": "⨁",
  	"xotime;": "⨂",
  	"xrArr;": "⟹",
  	"xrarr;": "⟶",
  	"Xscr;": "𝒳",
  	"xscr;": "𝓍",
  	"xsqcup;": "⨆",
  	"xuplus;": "⨄",
  	"xutri;": "△",
  	"xvee;": "⋁",
  	"xwedge;": "⋀",
  	"Yacute;": "Ý",
  	Yacute: Yacute$1,
  	"yacute;": "ý",
  	yacute: yacute$1,
  	"YAcy;": "Я",
  	"yacy;": "я",
  	"Ycirc;": "Ŷ",
  	"ycirc;": "ŷ",
  	"Ycy;": "Ы",
  	"ycy;": "ы",
  	"yen;": "¥",
  	yen: yen$2,
  	"Yfr;": "𝔜",
  	"yfr;": "𝔶",
  	"YIcy;": "Ї",
  	"yicy;": "ї",
  	"Yopf;": "𝕐",
  	"yopf;": "𝕪",
  	"Yscr;": "𝒴",
  	"yscr;": "𝓎",
  	"YUcy;": "Ю",
  	"yucy;": "ю",
  	"Yuml;": "Ÿ",
  	"yuml;": "ÿ",
  	yuml: yuml$1,
  	"Zacute;": "Ź",
  	"zacute;": "ź",
  	"Zcaron;": "Ž",
  	"zcaron;": "ž",
  	"Zcy;": "З",
  	"zcy;": "з",
  	"Zdot;": "Ż",
  	"zdot;": "ż",
  	"zeetrf;": "ℨ",
  	"ZeroWidthSpace;": "​",
  	"Zeta;": "Ζ",
  	"zeta;": "ζ",
  	"Zfr;": "ℨ",
  	"zfr;": "𝔷",
  	"ZHcy;": "Ж",
  	"zhcy;": "ж",
  	"zigrarr;": "⇝",
  	"Zopf;": "ℤ",
  	"zopf;": "𝕫",
  	"Zscr;": "𝒵",
  	"zscr;": "𝓏",
  	"zwj;": "‍",
  	"zwnj;": "‌"
  };

  var entities$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Aacute: Aacute$1,
    aacute: aacute$1,
    Acirc: Acirc$1,
    acirc: acirc$1,
    acute: acute$2,
    AElig: AElig$1,
    aelig: aelig$1,
    Agrave: Agrave$1,
    agrave: agrave$1,
    AMP: AMP$2,
    amp: amp$2,
    Aring: Aring$2,
    aring: aring$2,
    Atilde: Atilde$1,
    atilde: atilde$2,
    Auml: Auml$1,
    auml: auml$1,
    brvbar: brvbar$1,
    Ccedil: Ccedil$1,
    ccedil: ccedil$1,
    cedil: cedil$2,
    cent: cent$2,
    COPY: COPY$3,
    copy: copy$2,
    curren: curren$1,
    deg: deg$2,
    divide: divide$2,
    Eacute: Eacute$1,
    eacute: eacute$1,
    Ecirc: Ecirc$1,
    ecirc: ecirc$1,
    Egrave: Egrave$1,
    egrave: egrave$2,
    ETH: ETH$2,
    eth: eth$2,
    Euml: Euml$1,
    euml: euml$1,
    frac12: frac12$1,
    frac14: frac14$1,
    frac34: frac34$1,
    GT: GT$3,
    gt: gt$2,
    Iacute: Iacute$1,
    iacute: iacute$1,
    Icirc: Icirc$1,
    icirc: icirc$1,
    iexcl: iexcl$1,
    Igrave: Igrave$1,
    igrave: igrave$1,
    iquest: iquest$1,
    Iuml: Iuml$1,
    iuml: iuml$1,
    laquo: laquo$1,
    LT: LT$3,
    lt: lt$2,
    macr: macr$1,
    micro: micro$1,
    middot: middot$1,
    nbsp: nbsp$1,
    not: not$2,
    Ntilde: Ntilde$1,
    ntilde: ntilde$1,
    Oacute: Oacute$1,
    oacute: oacute$1,
    Ocirc: Ocirc$1,
    ocirc: ocirc$1,
    Ograve: Ograve$1,
    ograve: ograve$1,
    ordf: ordf$1,
    ordm: ordm$1,
    Oslash: Oslash$1,
    oslash: oslash$1,
    Otilde: Otilde$1,
    otilde: otilde$1,
    Ouml: Ouml$1,
    ouml: ouml$1,
    para: para$2,
    plusmn: plusmn$1,
    pound: pound$2,
    QUOT: QUOT$3,
    quot: quot$2,
    raquo: raquo$1,
    REG: REG$3,
    reg: reg$2,
    sect: sect$2,
    shy: shy$2,
    sup1: sup1$1,
    sup2: sup2$1,
    sup3: sup3$1,
    szlig: szlig$1,
    THORN: THORN$2,
    thorn: thorn$2,
    times: times$2,
    Uacute: Uacute$1,
    uacute: uacute$1,
    Ucirc: Ucirc$1,
    ucirc: ucirc$1,
    Ugrave: Ugrave$1,
    ugrave: ugrave$1,
    uml: uml$2,
    Uuml: Uuml$1,
    uuml: uuml$1,
    Yacute: Yacute$1,
    yacute: yacute$1,
    yen: yen$2,
    yuml: yuml$1,
    'default': entities
  });

  var entities$2 = getCjsExportFromNamespace(entities$1);

  var decode_1 = decode$2;

  function decode$2(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a String');
    }

    return str.replace(/&(#?[^;\W]+;?)/g, function (_, match) {
      var m;

      if (m = /^#(\d+);?$/.exec(match)) {
        return punycode$2.ucs2.encode([parseInt(m[1], 10)]);
      } else if (m = /^#[Xx]([A-Fa-f0-9]+);?/.exec(match)) {
        return punycode$2.ucs2.encode([parseInt(m[1], 16)]);
      } else {
        // named entity
        var hasSemi = /;$/.test(match);
        var withoutSemi = hasSemi ? match.replace(/;$/, '') : match;
        var target = entities$2[withoutSemi] || hasSemi && entities$2[match];

        if (typeof target === 'number') {
          return punycode$2.ucs2.encode([target]);
        } else if (typeof target === 'string') {
          return target;
        } else {
          return '&' + match;
        }
      }
    });
  }

  var encode$2 = encode_1;
  var decode$3 = decode_1;
  var ent = {
    encode: encode$2,
    decode: decode$3
  };

  /**
   * string-strip-html
   * Strips HTML tags from strings. Detects legit unencoded brackets.
   * Version: 4.3.18
   * Author: Roy Revelt, Codsen Ltd
   * License: MIT
   * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-strip-html
   */

  function stripHtml(str, originalOpts) {
    const isArr = Array.isArray;
    const definitelyTagNames = ["!doctype", "abbr", "address", "area", "article", "aside", "audio", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "doctype", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "param", "picture", "pre", "progress", "rb", "rp", "rt", "rtc", "ruby", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "ul", "var", "video", "wbr", "xml"];
    const singleLetterTags = ["a", "b", "i", "p", "q", "s", "u"];
    const punctuation = [".", ",", "?", ";", ")", "\u2026", '"', "\u00BB"];
    const stripTogetherWithTheirContentsDefaults = ["script", "style", "xml"];
    let tag = {
      attributes: []
    };
    let chunkOfWhitespaceStartsAt = null;
    let chunkOfSpacesStartsAt = null;
    const rangedOpeningTags = [];
    let attrObj = {};
    let hrefDump = {};
    let stringToInsertAfter = "";
    let hrefInsertionActive;
    let spacesChunkWhichFollowsTheClosingBracketEndsAt = null;

    function existy(x) {
      return x != null;
    }

    function isValidAttributeCharacter(char) {
      if (char.charCodeAt(0) >= 0 && char.charCodeAt(0) <= 31) {
        return false;
      } else if (char.charCodeAt(0) >= 127 && char.charCodeAt(0) <= 159) {
        return false;
      } else if (char.charCodeAt(0) === 32) {
        return false;
      } else if (char.charCodeAt(0) === 34) {
        return false;
      } else if (char.charCodeAt(0) === 39) {
        return false;
      } else if (char.charCodeAt(0) === 62) {
        return false;
      } else if (char.charCodeAt(0) === 47) {
        return false;
      } else if (char.charCodeAt(0) === 61) {
        return false;
      } else if (char.charCodeAt(0) >= 64976 && char.charCodeAt(0) <= 65007 || char.charCodeAt(0) === 65534 || char.charCodeAt(0) === 65535 || char.charCodeAt(0) === 55359 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55359 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55423 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55423 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55487 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55487 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55551 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55551 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55615 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55615 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55679 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55679 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55743 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55743 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55807 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55807 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55871 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55871 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55935 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55935 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 55999 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 55999 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 56063 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 56063 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 56127 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 56127 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 56191 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 56191 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 56255 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 56255 && char.charCodeAt(1) === 57343 || char.charCodeAt(0) === 56319 && char.charCodeAt(1) === 57342 || char.charCodeAt(0) === 56319 && char.charCodeAt(1) === 57343) {
        return false;
      }

      return true;
    }

    function treatRangedTags(i) {
      if (opts.stripTogetherWithTheirContents.includes(tag.name)) {
        if (isArr(rangedOpeningTags) && rangedOpeningTags.some(obj => obj.name === tag.name && obj.lastClosingBracketAt < i)) {
          for (let y = rangedOpeningTags.length; y--;) {
            if (rangedOpeningTags[y].name === tag.name) {
              if (punctuation.includes(str[i])) {
                opts.cb({
                  tag,
                  deleteFrom: rangedOpeningTags[y].lastOpeningBracketAt,
                  deleteTo: i,
                  insert: null,
                  rangesArr: rangesToDelete,
                  proposedReturn: [rangedOpeningTags[y].lastOpeningBracketAt, i, null]
                });
              } else {
                opts.cb({
                  tag,
                  deleteFrom: rangedOpeningTags[y].lastOpeningBracketAt,
                  deleteTo: i,
                  insert: "",
                  rangesArr: rangesToDelete,
                  proposedReturn: [rangedOpeningTags[y].lastOpeningBracketAt, i, ""]
                });
              }

              rangedOpeningTags.splice(y, 1);
              break;
            }
          }
        } else {
          rangedOpeningTags.push(tag);
        }
      }
    }

    function calculateWhitespaceToInsert(str, currCharIdx, fromIdx, toIdx, lastOpeningBracketAt, lastClosingBracketAt) {
      let strToEvaluateForLineBreaks = "";

      if (fromIdx < lastOpeningBracketAt) {
        strToEvaluateForLineBreaks += str.slice(fromIdx, lastOpeningBracketAt);
      }

      if (toIdx > lastClosingBracketAt + 1) {
        const temp = str.slice(lastClosingBracketAt + 1, toIdx);

        if (temp.includes("\n") && str[toIdx] === "<") {
          strToEvaluateForLineBreaks += " ";
        } else {
          strToEvaluateForLineBreaks += temp;
        }
      }

      if (!punctuation.includes(str[currCharIdx]) && str[currCharIdx] !== "!") {
        const foundLineBreaks = strToEvaluateForLineBreaks.match(/\n/g);

        if (isArr(foundLineBreaks) && foundLineBreaks.length) {
          if (foundLineBreaks.length === 1) {
            return "\n";
          } else if (foundLineBreaks.length === 2) {
            return "\n\n";
          }

          return "\n\n\n";
        }

        return " ";
      }

      return "";
    }

    function calculateHrefToBeInserted() {
      if (opts.dumpLinkHrefsNearby.enabled && Object.keys(hrefDump).length && hrefDump.tagName === tag.name && tag.lastOpeningBracketAt && (hrefDump.openingTagEnds && tag.lastOpeningBracketAt > hrefDump.openingTagEnds || !hrefDump.openingTagEnds)) {
        hrefInsertionActive = true;
      }

      if (hrefInsertionActive) {
        const lineBreaks = opts.dumpLinkHrefsNearby.putOnNewLine ? "\n\n" : "";
        stringToInsertAfter = `${lineBreaks}${hrefDump.hrefValue}${lineBreaks}`;
      }
    }

    function characterSuitableForNames(char) {
      return /[-_A-Za-z0-9]/.test(char);
    }

    if (typeof str !== "string") {
      throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_01] Input must be string! Currently it's: ${(typeof str).toLowerCase()}, equal to:\n${JSON.stringify(str, null, 4)}`);
    }

    if (originalOpts !== undefined && originalOpts !== null && !lodash_isplainobject(originalOpts)) {
      throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_02] Optional Options Object must be a plain object! Currently it's: ${(typeof originalOpts).toLowerCase()}, equal to:\n${JSON.stringify(originalOpts, null, 4)}`);
    }

    function prepHopefullyAnArray(something, name) {
      if (!something) {
        return [];
      } else if (isArr(something)) {
        return something.filter(val => isStr(val) && val.trim().length > 0);
      } else if (isStr(something)) {
        if (something.length) {
          return [something];
        }

        return [];
      } else if (!isArr(something)) {
        throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_03] ${name} must be array containing zero or more strings or something falsey. Currently it's equal to: ${something}, that a type of ${typeof something}.`);
      }
    }

    function isStr(something) {
      return typeof something === "string";
    }

    function resetHrefMarkers() {
      if (hrefInsertionActive) {
        hrefDump = {};
        hrefInsertionActive = false;
      }
    }

    const defaults = {
      ignoreTags: [],
      onlyStripTags: [],
      stripTogetherWithTheirContents: stripTogetherWithTheirContentsDefaults,
      skipHtmlDecoding: false,
      returnRangesOnly: false,
      trimOnlySpaces: false,
      dumpLinkHrefsNearby: {
        enabled: false,
        putOnNewLine: false,
        wrapHeads: "",
        wrapTails: ""
      },
      cb: null
    };
    const opts = Object.assign({}, defaults, originalOpts);
    opts.ignoreTags = prepHopefullyAnArray(opts.ignoreTags, "opts.ignoreTags");
    opts.onlyStripTags = prepHopefullyAnArray(opts.onlyStripTags, "opts.onlyStripTags");
    const onlyStripTagsMode = !!opts.onlyStripTags.length;

    if (opts.onlyStripTags.length && opts.ignoreTags.length) {
      opts.onlyStripTags = lodash_without(opts.onlyStripTags, ...opts.ignoreTags);
    }

    if (!lodash_isplainobject(opts.dumpLinkHrefsNearby)) {
      opts.dumpLinkHrefsNearby = Object.assign({}, defaults.dumpLinkHrefsNearby);
    }

    if (typeof opts.ignoreTags === "string") {
      if (opts.ignoreTags.length === 0) {
        opts.ignoreTags = [];
      } else {
        opts.ignoreTags = [opts.ignoreTags];
      }
    }

    opts.dumpLinkHrefsNearby = defaults.dumpLinkHrefsNearby;

    if (lodash_isplainobject(originalOpts) && Object.prototype.hasOwnProperty.call(originalOpts, "dumpLinkHrefsNearby") && existy(originalOpts.dumpLinkHrefsNearby)) {
      if (lodash_isplainobject(originalOpts.dumpLinkHrefsNearby)) {
        opts.dumpLinkHrefsNearby = Object.assign({}, defaults.dumpLinkHrefsNearby, originalOpts.dumpLinkHrefsNearby);
      } else if (originalOpts.dumpLinkHrefsNearby) {
        throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_04] Optional Options Object's key dumpLinkHrefsNearby was set to ${typeof originalOpts.dumpLinkHrefsNearby}, equal to ${JSON.stringify(originalOpts.dumpLinkHrefsNearby, null, 4)}. The only allowed value is a plain object. See the API reference.`);
      }
    }

    if (!opts.stripTogetherWithTheirContents) {
      opts.stripTogetherWithTheirContents = [];
    } else if (typeof opts.stripTogetherWithTheirContents === "string" && opts.stripTogetherWithTheirContents.length > 0) {
      opts.stripTogetherWithTheirContents = [opts.stripTogetherWithTheirContents];
    }

    if (!opts.dumpLinkHrefsNearby || lodash_isplainobject(opts.dumpLinkHrefsNearby) && !Object.keys(opts.dumpLinkHrefsNearby).length) {
      opts.dumpLinkHrefsNearby = Object.assign({}, defaults.dumpLinkHrefsNearby);
    }

    if (!isArr(opts.stripTogetherWithTheirContents)) {
      opts.stripTogetherWithTheirContents = [];
    }

    const somethingCaught = {};

    if (opts.stripTogetherWithTheirContents && isArr(opts.stripTogetherWithTheirContents) && opts.stripTogetherWithTheirContents.length > 0 && !opts.stripTogetherWithTheirContents.every((el, i) => {
      if (!(typeof el === "string")) {
        somethingCaught.el = el;
        somethingCaught.i = i;
        return false;
      }

      return true;
    })) {
      throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_06] Optional Options Object's key stripTogetherWithTheirContents was set to contain not just string elements! For example, element at index ${somethingCaught.i} has a value ${somethingCaught.el} which is not string but ${(typeof somethingCaught.el).toLowerCase()}.`);
    }

    if (!opts.cb) {
      opts.cb = ({
        rangesArr,
        proposedReturn
      }) => {
        rangesArr.push(...proposedReturn);
      };
    }

    const rangesToDelete = new Ranges({
      limitToBeAddedWhitespace: true,
      limitLinebreaksCount: 2
    });

    if (str === "" || str.trim() === "") {
      return str;
    }

    if (!opts.skipHtmlDecoding) {
      while (str !== ent.decode(str)) {
        str = ent.decode(str);
      }
    }

    if (!opts.trimOnlySpaces) {
      str = str.trim();
    }

    for (let i = 0, len = str.length; i < len; i++) {
      if (Object.keys(tag).length > 1 && tag.lastClosingBracketAt && tag.lastClosingBracketAt < i && str[i] !== " " && spacesChunkWhichFollowsTheClosingBracketEndsAt === null) {
        spacesChunkWhichFollowsTheClosingBracketEndsAt = i;
      }

      if (str[i] === ">") {
        if ((!tag || Object.keys(tag).length < 2) && i > 1) {
          for (let y = i; y--;) {
            if (str[y - 1] === undefined || str[y] === ">") {
              const startingPoint = str[y - 1] === undefined ? y : y + 1;
              const culprit = str.slice(startingPoint, i + 1);

              if (str !== `<${lodash_trim(culprit.trim(), "/>")}>` && definitelyTagNames.some(val => lodash_trim(culprit.trim().split(" ").filter(val => val.trim().length !== 0).filter((val, i) => i === 0), "/>").toLowerCase() === val) && stripHtml(`<${culprit.trim()}>`, opts) === "") {
                const whiteSpaceCompensation = calculateWhitespaceToInsert(str, i, startingPoint, i + 1, startingPoint, i + 1);
                let deleteUpTo = i + 1;

                if (str[deleteUpTo] !== undefined && str[deleteUpTo].trim().length === 0) {
                  for (let z = deleteUpTo; z < len; z++) {
                    if (str[z].trim().length !== 0) {
                      deleteUpTo = z;
                      break;
                    }

                    if (str[z + 1] === undefined) {
                      deleteUpTo = z + 1;
                      break;
                    }
                  }
                }

                opts.cb({
                  tag,
                  deleteFrom: startingPoint,
                  deleteTo: deleteUpTo,
                  insert: whiteSpaceCompensation,
                  rangesArr: rangesToDelete,
                  proposedReturn: [startingPoint, deleteUpTo, whiteSpaceCompensation]
                });
              }

              break;
            }
          }
        }
      }

      if (str[i] === "/" && !(tag.quotes && tag.quotes.value) && tag.lastOpeningBracketAt !== undefined && tag.lastClosingBracketAt === undefined) {
        tag.slashPresent = i;
      }

      if (tag.nameStarts && tag.nameStarts < i && !tag.quotes && punctuation.includes(str[i]) && !attrObj.equalsAt && tag.attributes && tag.attributes.length === 0 && !tag.lastClosingBracketAt) {
        tag = {};
        tag.attributes = [];
        attrObj = {};
      }

      if (str[i] === '"' || str[i] === "'") {
        if (tag.nameStarts && tag.quotes && tag.quotes.value && tag.quotes.value === str[i]) {
          attrObj.valueEnds = i;
          attrObj.value = str.slice(attrObj.valueStarts, i);
          tag.attributes.push(attrObj);
          attrObj = {};
          tag.quotes = undefined;
          let hrefVal;

          if (opts.dumpLinkHrefsNearby.enabled && tag.attributes.some(obj => {
            if (obj.name && obj.name.toLowerCase() === "href") {
              hrefVal = `${opts.dumpLinkHrefsNearby.wrapHeads || ""}${obj.value}${opts.dumpLinkHrefsNearby.wrapTails || ""}`;
              return true;
            }
          })) {
            hrefDump = {
              tagName: tag.name,
              hrefValue: hrefVal
            };
          }
        } else if (!tag.quotes && tag.nameStarts) {
          tag.quotes = {};
          tag.quotes.value = str[i];
          tag.quotes.start = i;

          if (attrObj.nameStarts && attrObj.nameEnds && attrObj.nameEnds < i && attrObj.nameStarts < i && !attrObj.valueStarts) {
            attrObj.name = str.slice(attrObj.nameStarts, attrObj.nameEnds);
          }
        }
      }

      if (tag.nameStarts !== undefined && tag.nameEnds === undefined && (str[i].trim().length === 0 || !characterSuitableForNames(str[i]))) {
        tag.nameEnds = i;
        tag.name = str.slice(tag.nameStarts, tag.nameEnds + (str[i] !== ">" && str[i] !== "/" && str[i + 1] === undefined ? 1 : 0));

        if (str[tag.nameStarts - 1] !== "!" && tag.name.replace(/-/g, "").length === 0) {
          tag = {};
          continue;
        }

        if (str[i] === "<") {
          calculateHrefToBeInserted();
          const whiteSpaceCompensation = calculateWhitespaceToInsert(str, i, tag.leftOuterWhitespace, i, tag.lastOpeningBracketAt, i);
          opts.cb({
            tag,
            deleteFrom: tag.leftOuterWhitespace,
            deleteTo: i,
            insert: `${whiteSpaceCompensation}${stringToInsertAfter}${whiteSpaceCompensation}`,
            rangesArr: rangesToDelete,
            proposedReturn: [tag.leftOuterWhitespace, i, `${whiteSpaceCompensation}${stringToInsertAfter}${whiteSpaceCompensation}`]
          });
          resetHrefMarkers();
          treatRangedTags(i);
        }
      }

      if (tag.quotes && tag.quotes.start && tag.quotes.start < i && !tag.quotes.end && attrObj.nameEnds && attrObj.equalsAt && !attrObj.valueStarts) {
        if (attrObj.valueEnds) ;else {
          attrObj.valueStarts = i;
        }
      }

      if (!tag.quotes && attrObj.nameEnds && str[i] === "=" && !attrObj.valueStarts) {
        if (!attrObj.equalsAt) {
          attrObj.equalsAt = i;
        }
      }

      if (!tag.quotes && attrObj.nameStarts && attrObj.nameEnds && !attrObj.valueStarts && str[i].trim().length !== 0 && str[i] !== "=") {
        tag.attributes.push(attrObj);
        attrObj = {};
      }

      if (!tag.quotes && attrObj.nameStarts && !attrObj.nameEnds) {
        if (str[i].trim().length === 0) {
          attrObj.nameEnds = i;
          attrObj.name = str.slice(attrObj.nameStarts, attrObj.nameEnds);
        } else if (str[i] === "=") {
          if (!attrObj.equalsAt) {
            attrObj.nameEnds = i;
            attrObj.equalsAt = i;
            attrObj.name = str.slice(attrObj.nameStarts, attrObj.nameEnds);
          }
        } else if (str[i] === "/" || str[i] === ">") {
          attrObj.nameEnds = i;
          attrObj.name = str.slice(attrObj.nameStarts, attrObj.nameEnds);
          tag.attributes.push(attrObj);
          attrObj = {};
        } else if (str[i] === "<" || !isValidAttributeCharacter(str[i])) {
          attrObj.nameEnds = i;
          attrObj.name = str.slice(attrObj.nameStarts, attrObj.nameEnds);
          tag.attributes.push(attrObj);
          attrObj = {};
        }
      }

      if (!tag.quotes && tag.nameEnds < i && str[i] !== ">" && str[i] !== "/" && str[i] !== "!" && str[i - 1].trim().length === 0 && str[i].trim().length !== 0 && !attrObj.nameStarts && !tag.lastClosingBracketAt) {
        if (isValidAttributeCharacter(`${str[i]}${str[i + 1]}`) && str[i] !== "<") {
          attrObj.nameStarts = i;
        } else if (tag.onlyPlausible && str[i] !== "<") {
          tag = {};
        }
      }

      if (tag.lastOpeningBracketAt !== null && tag.lastOpeningBracketAt < i && str[i] === "/" && tag.onlyPlausible) {
        tag.onlyPlausible = false;
      }

      if (tag.lastOpeningBracketAt !== null && tag.lastOpeningBracketAt < i && str[i] !== "/") {
        if (tag.onlyPlausible === undefined) {
          if ((str[i].trim().length === 0 || str[i] === "<") && !tag.slashPresent) {
            tag.onlyPlausible = true;
          } else {
            tag.onlyPlausible = false;
          }
        }

        if (str[i].trim().length !== 0 && tag.nameStarts === undefined && str[i] !== "<" && str[i] !== "/" && str[i] !== ">" && str[i] !== "!") {
          tag.nameStarts = i;
          tag.nameContainsLetters = false;
        }
      }

      if (tag.nameStarts && !tag.quotes && str[i].toLowerCase() !== str[i].toUpperCase()) {
        tag.nameContainsLetters = true;
      }

      if (str[i] === ">") {
        if (tag.lastOpeningBracketAt !== undefined) {
          tag.lastClosingBracketAt = i;
          spacesChunkWhichFollowsTheClosingBracketEndsAt = null;

          if (Object.keys(attrObj).length) {
            tag.attributes.push(attrObj);
            attrObj = {};
          }

          if (opts.dumpLinkHrefsNearby.enabled && hrefDump.tagName && !hrefDump.openingTagEnds) {
            hrefDump.openingTagEnds = i;
          }
        }
      }

      if (tag.lastOpeningBracketAt !== undefined) {
        if (tag.lastClosingBracketAt === undefined) {
          if (tag.lastOpeningBracketAt < i && str[i] !== "<" && (str[i + 1] === undefined || str[i + 1] === "<") && tag.nameContainsLetters) {
            tag.name = str.slice(tag.nameStarts, tag.nameEnds ? tag.nameEnds : i + 1).toLowerCase();

            if (opts.ignoreTags.includes(tag.name) || tag.onlyPlausible && !definitelyTagNames.includes(tag.name)) {
              tag = {};
              attrObj = {};
              continue;
            }

            if (definitelyTagNames.concat(singleLetterTags).includes(tag.name) && (tag.onlyPlausible === false || tag.onlyPlausible === true && tag.attributes.length) || str[i + 1] === undefined) {
              calculateHrefToBeInserted();
              const whiteSpaceCompensation = calculateWhitespaceToInsert(str, i, tag.leftOuterWhitespace, i + 1, tag.lastOpeningBracketAt, tag.lastClosingBracketAt);
              opts.cb({
                tag,
                deleteFrom: tag.leftOuterWhitespace,
                deleteTo: i + 1,
                insert: `${whiteSpaceCompensation}${stringToInsertAfter}${whiteSpaceCompensation}`,
                rangesArr: rangesToDelete,
                proposedReturn: [tag.leftOuterWhitespace, i + 1, `${whiteSpaceCompensation}${stringToInsertAfter}${whiteSpaceCompensation}`]
              });
              resetHrefMarkers();
              treatRangedTags(i);
            }
          }
        } else if (i > tag.lastClosingBracketAt && str[i].trim().length !== 0 || str[i + 1] === undefined) {
          let endingRangeIndex = tag.lastClosingBracketAt === i ? i + 1 : i;

          if (opts.trimOnlySpaces && endingRangeIndex === len - 1 && spacesChunkWhichFollowsTheClosingBracketEndsAt !== null && spacesChunkWhichFollowsTheClosingBracketEndsAt < i) {
            endingRangeIndex = spacesChunkWhichFollowsTheClosingBracketEndsAt;
          }

          if (!onlyStripTagsMode && opts.ignoreTags.includes(tag.name) || onlyStripTagsMode && !opts.onlyStripTags.includes(tag.name)) {
            opts.cb({
              tag,
              deleteFrom: null,
              deleteTo: null,
              insert: null,
              rangesArr: rangesToDelete,
              proposedReturn: []
            });
            tag = {};
            attrObj = {};
          } else if (!tag.onlyPlausible || tag.attributes.length === 0 && tag.name && definitelyTagNames.concat(singleLetterTags).includes(tag.name.toLowerCase()) || tag.attributes && tag.attributes.some(attrObj => attrObj.equalsAt)) {
            const whiteSpaceCompensation = calculateWhitespaceToInsert(str, i, tag.leftOuterWhitespace, endingRangeIndex, tag.lastOpeningBracketAt, tag.lastClosingBracketAt);
            stringToInsertAfter = "";
            hrefInsertionActive = false;
            calculateHrefToBeInserted();
            let insert;

            if (isStr(stringToInsertAfter) && stringToInsertAfter.length) {
              insert = `${whiteSpaceCompensation}${stringToInsertAfter}${whiteSpaceCompensation === "\n\n" ? "\n" : whiteSpaceCompensation}`;
            } else {
              insert = whiteSpaceCompensation;
            }

            if (tag.leftOuterWhitespace === 0 || !right(str, endingRangeIndex - 1)) {
              insert = "";
            }

            if (insert && insert.length > 1 && !insert.trim().length && !insert.includes("\n") && !insert.includes("\r")) {
              insert = " ";
            }

            opts.cb({
              tag,
              deleteFrom: tag.leftOuterWhitespace,
              deleteTo: endingRangeIndex,
              insert,
              rangesArr: rangesToDelete,
              proposedReturn: [tag.leftOuterWhitespace, endingRangeIndex, insert]
            });
            resetHrefMarkers();
            treatRangedTags(i);
          } else {
            tag = {};
          }

          if (str[i] !== ">") {
            tag = {};
          }
        }
      }

      if (str[i] === "<" && str[i - 1] !== "<") {
        if (str[right(str, i)] === ">") {
          continue;
        } else {
          if (tag.nameEnds && tag.nameEnds < i && !tag.lastClosingBracketAt) {
            if (tag.onlyPlausible === true && tag.attributes && tag.attributes.length || tag.onlyPlausible === false) {
              const whiteSpaceCompensation = calculateWhitespaceToInsert(str, i, tag.leftOuterWhitespace, i, tag.lastOpeningBracketAt, i);
              opts.cb({
                tag,
                deleteFrom: tag.leftOuterWhitespace,
                deleteTo: i,
                insert: whiteSpaceCompensation,
                rangesArr: rangesToDelete,
                proposedReturn: [tag.leftOuterWhitespace, i, whiteSpaceCompensation]
              });
              treatRangedTags(i);
              tag = {};
              attrObj = {};
            } else if (tag.onlyPlausible && !definitelyTagNames.concat(singleLetterTags).includes(tag.name) && !(tag.attributes && tag.attributes.length)) {
              tag = {};
              attrObj = {};
            }
          }

          if (tag.lastOpeningBracketAt !== undefined && tag.onlyPlausible && tag.name && !tag.quotes) {
            tag.lastOpeningBracketAt = undefined;
            tag.onlyPlausible = false;
          }

          if ((tag.lastOpeningBracketAt === undefined || !tag.onlyPlausible) && !tag.quotes) {
            tag.lastOpeningBracketAt = i;
            tag.slashPresent = false;
            tag.attributes = [];

            if (chunkOfWhitespaceStartsAt === null) {
              tag.leftOuterWhitespace = i;
            } else if (opts.trimOnlySpaces && chunkOfWhitespaceStartsAt === 0) {
              tag.leftOuterWhitespace = chunkOfSpacesStartsAt || i;
            } else {
              tag.leftOuterWhitespace = chunkOfWhitespaceStartsAt;
            }

            if (`${str[i + 1]}${str[i + 2]}${str[i + 3]}` === "!--" || `${str[i + 1]}${str[i + 2]}${str[i + 3]}${str[i + 4]}${str[i + 5]}${str[i + 6]}${str[i + 7]}${str[i + 8]}` === "![CDATA[") {
              let cdata = true;

              if (str[i + 2] === "-") {
                cdata = false;
              }

              let closingFoundAt = undefined;

              for (let y = i; y < len; y++) {
                if (!closingFoundAt && cdata && `${str[y - 2]}${str[y - 1]}${str[y]}` === "]]>" || !cdata && `${str[y - 2]}${str[y - 1]}${str[y]}` === "-->") {
                  closingFoundAt = y;
                }

                if (closingFoundAt && (closingFoundAt < y && str[y].trim().length !== 0 || str[y + 1] === undefined)) {
                  let rangeEnd = y;

                  if (str[y + 1] === undefined && str[y].trim().length === 0 || str[y] === ">") {
                    rangeEnd += 1;
                  }

                  const whiteSpaceCompensation = calculateWhitespaceToInsert(str, y, tag.leftOuterWhitespace, rangeEnd, tag.lastOpeningBracketAt, closingFoundAt);
                  opts.cb({
                    tag,
                    deleteFrom: tag.leftOuterWhitespace,
                    deleteTo: rangeEnd,
                    insert: whiteSpaceCompensation,
                    rangesArr: rangesToDelete,
                    proposedReturn: [tag.leftOuterWhitespace, rangeEnd, whiteSpaceCompensation]
                  });
                  i = y - 1;

                  if (str[y] === ">") {
                    i = y;
                  }

                  tag = {};
                  attrObj = {};
                  break;
                }
              }
            }
          }
        }
      }

      if (str[i].trim() === "") {
        if (chunkOfWhitespaceStartsAt === null) {
          chunkOfWhitespaceStartsAt = i;

          if (tag.lastOpeningBracketAt !== undefined && tag.lastOpeningBracketAt < i && tag.nameStarts && tag.nameStarts < tag.lastOpeningBracketAt && i === tag.lastOpeningBracketAt + 1 && !rangedOpeningTags.some(rangedTagObj => rangedTagObj.name === tag.name)) {
            tag.onlyPlausible = true;
            tag.name = undefined;
            tag.nameStarts = undefined;
          }
        }
      } else if (chunkOfWhitespaceStartsAt !== null) {
        if (!tag.quotes && attrObj.equalsAt > chunkOfWhitespaceStartsAt - 1 && attrObj.nameEnds && attrObj.equalsAt > attrObj.nameEnds && str[i] !== '"' && str[i] !== "'") {
          if (lodash_isplainobject(attrObj)) {
            tag.attributes.push(attrObj);
          }

          attrObj = {};
          tag.equalsSpottedAt = undefined;
        }

        chunkOfWhitespaceStartsAt = null;
      }

      if (str[i] === " ") {
        if (chunkOfSpacesStartsAt === null) {
          chunkOfSpacesStartsAt = i;
        }
      } else if (chunkOfSpacesStartsAt !== null) {
        chunkOfSpacesStartsAt = null;
      }
    }

    if (rangesToDelete.current()) {
      if (opts.returnRangesOnly) {
        return rangesToDelete.current();
      }

      const untrimmedRes = rangesApply(str, rangesToDelete.current());

      if (opts.trimOnlySpaces) {
        return lodash_trim(untrimmedRes, " ");
      }

      return untrimmedRes.trim();
    } else if (opts.returnRangesOnly) {
      return [];
    }

    if (opts.trimOnlySpaces) {
      return lodash_trim(str, " ");
    }

    return str.trim();
  }

  var ansiRegex = ({
    onlyFirst = false
  } = {}) => {
    const pattern = ['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
    return new RegExp(pattern, onlyFirst ? undefined : 'g');
  };

  function det(str, inputOpts) {
    //
    // input validation
    // ---------------------------------------------------------------------------
    if (typeof str !== "string") {
      throw new Error("detergent(): [THROW_ID_01] the first input argument must be of a string type, not ".concat(_typeof(str)));
    }

    if (inputOpts && !lodash_isplainobject(inputOpts)) {
      throw new Error("detergent(): [THROW_ID_02] Options object must be a plain object, not ".concat(_typeof(inputOpts)));
    }

    if (lodash_isplainobject(inputOpts) && !!inputOpts.cb && typeof inputOpts.cb !== "function") {
      throw new Error("detergent(): [THROW_ID_03] Options callback, opts.cb must be a function, not ".concat(_typeof(inputOpts.cb), " (value was given as:\n").concat(JSON.stringify(inputOpts.cb, null, 0), ")"));
    }

    var opts = Object.assign({}, defaultOpts, inputOpts);

    if (!["lf", "crlf", "cr"].includes(opts.eol)) {
      opts.eol = "lf";
    } // prepare applicable rules object. It is a clone of the default opts object
    // (which comes from util.js), where for starters all values are turned off,
    // then upon traversal, each applicable rule sets the key to true, it does not
    // matter, rule is enabled in opts or not. We just mark that particular
    // options setting could be applicable.


    var applicableOpts = {};
    Object.keys(defaultOpts).sort().filter(function (val) {
      return !["stripHtmlAddNewLine", "stripHtmlButIgnoreTags", "cb"].includes(val);
    }).forEach(function (singleOption) {
      applicableOpts[singleOption] = false;
    }); // the tags whitelist is not boolean, it falls outside reporting cases

    delete applicableOpts.stripHtmlButIgnoreTags; //
    // vars and internal functions
    // --------------------------------------------------------------------------

    var endOfLine = "\n";

    if (opts.eol === "crlf") {
      endOfLine = "\r\n";
    } else if (opts.eol === "cr") {
      endOfLine = "\r";
    }

    var brClosingBracketIndexesArr = []; // We need to track what actions need to be done. Each action (a range) is
    // an array of two elements: from index and to index. It means what to delete.
    // There can be third element, a string, which means what to insert instead.

    var finalIndexesToDelete = new Ranges({
      limitToBeAddedWhitespace: false
    }); // the main container to gather the ranges. Ranges is a JS class.
    // When we process the input, we gather the information about it and sometimes
    // it's very efficient to stop processing chunks once they're cleared.
    // For example, any index ranges taken by HTML entities can be ignored after
    // those index range are identified. It's even a hassle otherwise: entities
    // contain ampersands and if we didn't ignore entity ranges, we'd have to
    // take measures to ignore ampersand encoding.

    var skipArr = new Ranges();

    function applyAndWipe() {
      str = rangesApply(str, finalIndexesToDelete.current());
      finalIndexesToDelete.wipe(); // skipArr.wipe();
    }

    function isNum(something) {
      return Number.isInteger(something);
    }

    var state = {
      onUrlCurrently: false
    }; //                                          ____
    //                         massive hammer  |    |
    //                       O=================|    |
    //                         upon all bugs   |____|
    //                                        .=O=.
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //                       T H E    P I P E L I N E
    //
    // ---------------------------------------------------------------------------
    // NEXT STEP.

    str = trimSpaces(str.replace(ansiRegex(), "").replace(/\u200A/g, " "), {
      cr: true,
      lf: true,
      tab: true,
      space: true,
      nbsp: false
    }).res; // ---------------------------------------------------------------------------
    // NEXT STEP.

    var temp = str;
    var lastVal;

    do {
      lastVal = temp;
      temp = he.decode(temp);
    } while (temp !== str && lastVal !== temp);

    if (str !== temp) {
      str = temp;
    }

    str = collapse(str, {
      trimLines: true,
      recogniseHTML: false,
      removeEmptyLines: true,
      limitConsecutiveEmptyLinesTo: 1
    }); // ---------------------------------------------------------------------------
    // NEXT STEP.
    // preliminary loop through to remove/replace characters which later might
    // be needed to be considered when replacing others in the main loop;
    // that's mostly some nasties converted into spaces - those spaces will
    // be needed to already by there in the main loop

    for (var i = 0, len = str.length; i < len; i++) {
      if (str[i].charCodeAt(0) === 65533) {
        // REPLACEMENT CHARACTER, \uFFFD, or "�"
        // Delete/fix all cases of Replacement character, \uFFFD, or "�":
        // It usually comes from Windows.
        if (str[i - 1] && str[i + 1] && (str[i - 1].toLowerCase() === "n" && str[i + 1].toLowerCase() === "t" || isLetter(str[i - 1]) && str[i + 1].toLowerCase() === "s") || str[i + 2] && ((str[i + 1].toLowerCase() === "r" || str[i + 1].toLowerCase() === "v") && str[i + 2].toLowerCase() === "e" || str[i + 1].toLowerCase() === "l" && str[i + 2].toLowerCase() === "l") && (str[i - 3] && str[i - 3].toLowerCase() === "y" && str[i - 2].toLowerCase() === "o" && str[i - 1].toLowerCase() === "u" || str[i - 2] && str[i - 2].toLowerCase() === "w" && str[i - 1].toLowerCase() === "e" || str[i - 4] && str[i - 4].toLowerCase() === "t" && str[i - 3].toLowerCase() === "h" && str[i - 2].toLowerCase() === "e" && str[i - 1].toLowerCase() === "y") || (str[i - 1] && str[i - 1].toLowerCase() === "i" || str[i - 2] && str[i - 2].toLowerCase() === "h" && str[i - 1].toLowerCase() === "e" || str[i - 3] && str[i - 3].toLowerCase() === "s" && str[i - 2].toLowerCase() === "h" && str[i - 1].toLowerCase() === "e") && str[i + 2] && str[i + 1].toLowerCase() === "l" && str[i + 2].toLowerCase() === "l" || str[i - 5] && str[i + 2] && str[i - 5].toLowerCase() === "m" && str[i - 4].toLowerCase() === "i" && str[i - 3].toLowerCase() === "g" && str[i - 2].toLowerCase() === "h" && str[i - 1].toLowerCase() === "t" && str[i + 1] === "v" && str[i + 2] === "e" || str[i - 1] && str[i - 1].toLowerCase() === "s" && (!str[i + 1] || !isLetter(str[i + 1]) && !isNumber(str[i + 1]))) {
          // 1. case of n�t, for example, couldn�t (n + � + t),
          // or case of <letter>�s, for example your�s (letter + � + s).
          // 2. case of we�re, you�re, they�re
          // 3. case of we�ve, you�ve, they�ve
          // 4. case of I�ll, you�ll, he'�ll, she�ll, we�ll, they�ll, it�ll
          var replacement = opts.convertApostrophes ? rightSingleQuote : "'";
          finalIndexesToDelete.push(i, i + 1, "".concat(replacement));
          applicableOpts.convertApostrophes = true;
        } else if (str[i - 2] && isLowercaseLetter(str[i - 2]) && !str[i - 1].trim().length && str[i + 2] && isLowercaseLetter(str[i + 2]) && !str[i + 1].trim().length) {
          // we don't encode here, no matter if opts.convertEntities is on:
          finalIndexesToDelete.push(i, i + 1, rawMDash); // it's because it's a preliminary replacement, we'll encode in the main loop
        } else {
          finalIndexesToDelete.push(i, i + 1);
        }
      }
    } // ---------------------------------------------------------------------------
    // NEXT STEP.


    applyAndWipe(); // ---------------------------------------------------------------------------
    // NEXT STEP.
    // fix broken named HTML entities, if any:

    var entityFixes = stringFixBrokenNamedEntities(str, {
      decode: false
    });

    if (entityFixes && entityFixes.length) {
      // 1. report option as applicable:
      applicableOpts.fixBrokenEntities = true; // 2. if option is enabled, apply it:

      if (opts.fixBrokenEntities) {
        str = rangesApply(str, entityFixes);
      }
    } // ---------------------------------------------------------------------------
    // NEXT STEP.
    // callback, opts.cb processing outside the tags


    if (opts.cb) {
      // if there are potential HTML tags, we'll need to extract them and process
      // outside them
      if (str.includes("<") || str.includes(">")) {
        var outsideTagRanges = rangesInvert(stripHtml(str, {
          cb: function cb(_ref) {
            var tag = _ref.tag,
                rangesArr = _ref.rangesArr;
            return rangesArr.push(tag.lastOpeningBracketAt, tag.lastClosingBracketAt + 1);
          },
          skipHtmlDecoding: true,
          returnRangesOnly: true
        }), str.length).reduce(function (accumRanges, currRange) {
          // if there's difference after callback's result, push it as range
          if (str.slice(currRange[0], currRange[1]) !== opts.cb(str.slice(currRange[0], currRange[1]))) {
            return accumRanges.concat([[currRange[0], currRange[1], opts.cb(str.slice(currRange[0], currRange[1]))]]);
          }

          return accumRanges;
        }, []);
        str = rangesApply(str, outsideTagRanges);
      } else {
        // if there are no tags, whole string can be processed:
        str = opts.cb(str);
      }
    } // ---------------------------------------------------------------------------
    // NEXT STEP.
    // tend the HTML tags
    // but maybe our input string doesn't even have any HTML tags?


    if (str.includes("<") || str.includes(">")) {
      // submit all HTML tags to be skipped from now on:
      // we're using callback interface to ignore strictly from bracket to bracket
      // (including brackets), without range extension which normally would get
      // added in callback's "deleteFrom" / "deleteTo" equivalent.
      // Normally, we wipe whole tag and its surrounding whitespace, then replace
      // it with space if needed, otherwise just delete that range.
      // This extended range is a liability in light of widow word removal processes
      // down the line - those won't "see" some of the spaces around tags!
      var cb = function cb(_ref2) {
        var tag = _ref2.tag,
            deleteFrom = _ref2.deleteFrom,
            deleteTo = _ref2.deleteTo,
            proposedReturn = _ref2.proposedReturn;

        // if it's a tag
        if (isNum(tag.lastOpeningBracketAt) && isNum(tag.lastClosingBracketAt) && tag.lastOpeningBracketAt < tag.lastClosingBracketAt || tag.slashPresent) {
          applicableOpts.stripHtml = true; // 1. add range from bracket to bracket to ignores list:

          skipArr.push(tag.lastOpeningBracketAt, tag.lastClosingBracketAt ? tag.lastClosingBracketAt + 1 : str.length); // 2. strip tag if opts.stripHtml is enabled

          if (opts.stripHtml && !opts.stripHtmlButIgnoreTags.includes(tag.name.toLowerCase())) {
            // 1. strip tag
            // take care of tags listed under opts.stripHtmlAddNewLine
            if (opts.stripHtmlAddNewLine.length && opts.stripHtmlAddNewLine.some(function (tagName) {
              return tagName.startsWith("/") && tag.slashPresent && tag.name.toLowerCase() === tagName.slice(1) || !tagName.startsWith("/") && !tag.slashPresent && tag.name.toLowerCase() === tagName;
            })) {
              applicableOpts.removeLineBreaks = true;

              if (!opts.removeLineBreaks) {
                applicableOpts.replaceLineBreaks = true;

                if (opts.replaceLineBreaks) {
                  applicableOpts.useXHTML = true;
                } // insert <br>


                finalIndexesToDelete.push(deleteFrom, deleteTo, "".concat(opts.replaceLineBreaks ? "<br".concat(opts.useXHTML ? "/" : "", ">") : "", "\n"));
              } else {
                finalIndexesToDelete.push(proposedReturn);
              }
            } else {
              finalIndexesToDelete.push(proposedReturn);
              skipArr.push(proposedReturn);
            }
          } else {
            // 3. add closing slash on void tags if XHTML mode is on
            if (voidTags.includes(tag.name.toLowerCase())) {
              //
              // IF A VOID TAG
              //
              applicableOpts.useXHTML = true;

              if (str[left(str, tag.lastClosingBracketAt)] !== "/" && tag.lastClosingBracketAt) {
                if (opts.useXHTML) {
                  finalIndexesToDelete.push(tag.lastClosingBracketAt, tag.lastClosingBracketAt, "/");
                }
              } // 4. remove slashes in front of a void tag


              if (tag.slashPresent && isNum(tag.lastOpeningBracketAt) && tag.nameStarts && tag.lastOpeningBracketAt < tag.nameStarts - 1 && str.slice(tag.lastOpeningBracketAt + 1, tag.nameStarts).split("").every(function (_char) {
                return !_char.trim().length || _char === "/";
              })) {
                finalIndexesToDelete.push(tag.lastOpeningBracketAt + 1, tag.nameStarts);
              } // 5. remove closing slash from void tags is XHTML mode is off
              // or excessive, multiple closing slashes


              if (tag.slashPresent && str[left(str, tag.lastClosingBracketAt)] === "/") {
                if (str[left(str, left(str, tag.lastClosingBracketAt))] === "/") {
                  applicableOpts.useXHTML = true;

                  if (!opts.useXHTML || str.slice(chompLeft(str, tag.lastClosingBracketAt, {
                    mode: 2
                  }, "/"), tag.lastClosingBracketAt) !== "/") {
                    // multiple closing slashes
                    finalIndexesToDelete.push( // chomp mode 2: hungrily chomp all whitespace except newlines
                    // for example:
                    // chompLeft("a  b c b c  x y", 12, { mode: 2 }, "b", "c")
                    // => 1
                    chompLeft(str, tag.lastClosingBracketAt, {
                      mode: 2
                    }, "/"), tag.lastClosingBracketAt, opts.useXHTML ? "/" : undefined);
                  }
                } else if (!opts.useXHTML || str.slice(tag.slashPresent, tag.lastClosingBracketAt) !== "/") {
                  finalIndexesToDelete.push(tag.slashPresent, tag.lastClosingBracketAt);
                }
              }
            } else {
              //
              // IF NOT A VOID TAG
              //
              // 6. if it's not a void tag and there's slash on a wrong side, correct it
              if (tag.slashPresent && str[left(str, tag.lastClosingBracketAt)] === "/") {
                // 6-1. remove the wrong slash
                finalIndexesToDelete.push(chompLeft(str, tag.lastClosingBracketAt, {
                  mode: 2
                }, "/"), tag.lastClosingBracketAt); // 6-2. add where it needs to be

                finalIndexesToDelete.push(tag.lastOpeningBracketAt + 1, tag.lastOpeningBracketAt + 1, "/");
              }
            } // 7. tackle wrong letter case


            if (tag.name.toLowerCase() !== tag.name) {
              finalIndexesToDelete.push(tag.nameStarts, tag.nameEnds, tag.name.toLowerCase());
            } // 8. remove whitespace after tag name like <tr >


            if ("/>".includes(str[right(str, tag.nameEnds - 1)]) && right(str, tag.nameEnds - 1) > tag.nameEnds) {
              finalIndexesToDelete.push(tag.nameEnds, right(str, tag.nameEnds - 1));
            } // 9. remove whitespace in front of tag name, considering closing slashes


            if (isNum(tag.lastOpeningBracketAt) && isNum(tag.nameStarts) && tag.lastOpeningBracketAt + 1 < tag.nameStarts) {
              // cases like < tr>
              if (!str.slice(tag.lastOpeningBracketAt + 1, tag.nameStarts).trim().length) {
                // all this whitespace goes
                finalIndexesToDelete.push(tag.lastOpeningBracketAt + 1, tag.nameStarts);
              } else if (!voidTags.includes(tag.name.toLowerCase()) && str.slice(tag.lastOpeningBracketAt + 1, tag.nameStarts).split("").every(function (_char2) {
                return !_char2.trim().length || _char2 === "/";
              })) {
                // if there is mix of whitespace and closing slashes, all this
                // goes and replaced with single slash.
                // Imagine: < ///    ///    table>
                finalIndexesToDelete.push(tag.lastOpeningBracketAt + 1, tag.nameStarts, "/");
              }
            }
          } // 10. if it's a BR, take a note of its closing bracket's location:


          if (tag.name.toLowerCase() === "br" && tag.lastClosingBracketAt) {
            brClosingBracketIndexesArr.push(tag.lastClosingBracketAt);
          } // 11. remove whitespace in front of UL/LI tags


          if (["ul", "li"].includes(tag.name.toLowerCase()) && !opts.removeLineBreaks && str[tag.lastOpeningBracketAt - 1] && !str[tag.lastOpeningBracketAt - 1].trim().length) {
            // if there's whitespace in front,
            finalIndexesToDelete.push(leftStopAtNewLines(str, tag.lastOpeningBracketAt) + 1, tag.lastOpeningBracketAt);
          } // 12. remove whitespace before closing bracket


          if (str[tag.lastClosingBracketAt - 1] && !str[tag.lastClosingBracketAt - 1].trim().length) {
            finalIndexesToDelete.push(left(str, tag.lastClosingBracketAt) + 1, tag.lastClosingBracketAt);
          }
        } // LOGGING:

      }; // since we rely on callback interface, we don't need to assign the function
      // to a result, we perform all the processing within the callback "cb":


      stripHtml(str, {
        cb: cb,
        trimOnlySpaces: true,
        ignoreTags: stripHtml ? opts.stripHtmlButIgnoreTags : [],
        skipHtmlDecoding: true,
        returnRangesOnly: true
      });
    } // ---------------------------------------------------------------------------
    // NEXT STEP.


    processOutside(str, skipArr.current(), function (idxFrom, idxTo, offsetBy) {
      return processCharacter(str, opts, finalIndexesToDelete, idxFrom, idxTo, offsetBy, brClosingBracketIndexesArr, state, applicableOpts, endOfLine, opts.cb);
    }, true); // ---------------------------------------------------------------------------
    // NEXT STEP.

    applyAndWipe(); // patch up spaces in front of <br/>

    str = str.replace(/ (<br[/]?>)/g, "$1");
    str = str.replace(/(\r\n|\r|\n){3,}/g, "".concat(endOfLine).concat(endOfLine)); // ---------------------------------------------------------------------------
    // NEXT STEP.
    // remove widow words

    var widowFixes = removeWidows(str, {
      ignore: "all",
      convertEntities: opts.convertEntities,
      // full-on setup
      targetLanguage: "html",
      UKPostcodes: true,
      // full-on setup
      hyphens: opts.convertDashes,
      // full-on setup
      tagRanges: skipArr.current()
    });

    if (widowFixes && widowFixes.ranges && widowFixes.ranges.length) {
      // 1. report option as potentially applicable:
      if (!applicableOpts.removeWidows && widowFixes.whatWasDone.removeWidows) {
        applicableOpts.removeWidows = true;

        if (opts.removeWidows) {
          applicableOpts.convertEntities = true;
        }
      } // 2.


      if (!applicableOpts.convertEntities && widowFixes.whatWasDone.convertEntities) {
        applicableOpts.convertEntities = true;
      } // 3. if option is enabled, apply it:


      if (opts.removeWidows) {
        str = widowFixes.res;
      }
    } // ---------------------------------------------------------------------------
    // NEXT STEP.
    // replace line breaks


    if (str !== str.replace(/\r\n|\r|\n/gm, " ")) {
      // 1. report opts.removeLineBreaks might be applicable
      applicableOpts.removeLineBreaks = true; // 2. apply if option is on

      if (opts.removeLineBreaks) {
        str = str.replace(/\r\n|\r|\n/gm, " ");
      }
    } // ---------------------------------------------------------------------------
    // NEXT STEP.


    str = collapse(str, {
      trimLines: true,
      recogniseHTML: false
    }); // ---------------------------------------------------------------------------
    // NEXT STEP.

    return {
      res: rangesApply(str, finalIndexesToDelete.current()),
      applicableOpts: applicableOpts
    };
  }
   // -----------------------------------------------------------------------------

  exports.det = det;
  exports.opts = defaultOpts;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
