'use strict'
const clone = require('lodash.clonedeep')
const matcher = require('matcher')
const isArr = Array.isArray

function includesWithGlob (originalInput, stringToFind, opts) {
  //
  // internal f()'s
  function existy (x) { return x != null }
  function isStr (something) { return typeof something === 'string' }

  var defaults = {
    arrayVsArrayAllMustBeFound: 'any' // two options: 'any' or 'all'
  }

  opts = Object.assign(defaults, opts)

  // insurance
  if (arguments.length === 0) {
    throw new Error('array-includes-with-glob/includesWithGlob(): [THROW_ID_01] all inputs missing!')
  }
  if (arguments.length === 1) {
    throw new Error('array-includes-with-glob/includesWithGlob(): [THROW_ID_02] second argument missing!')
  }
  if (!isArr(originalInput)) {
    if (isStr(originalInput)) {
      originalInput = [originalInput]
    } else {
      throw new Error('array-includes-with-glob/includesWithGlob(): [THROW_ID_03] first argument must be an array! It was given as ' + typeof originalInput)
    }
  }
  if (!isStr(stringToFind) && !isArr(stringToFind)) {
    throw new Error('array-includes-with-glob/includesWithGlob(): [THROW_ID_04] second argument must be a string or array of strings! It was given as ' + typeof stringToFind)
  }
  if ((opts.arrayVsArrayAllMustBeFound !== 'any') && (opts.arrayVsArrayAllMustBeFound !== 'all')) {
    throw new Error('array-includes-with-glob/includesWithGlob(): [THROW_ID_05] opts.arrayVsArrayAllMustBeFound was customised to an unrecognised value, ' + opts.arrayVsArrayAllMustBeFound + '. It must be equal to either "any" or "all".')
  }

  // maybe we can end prematurely:
  if (originalInput.length === 0) {
    return false // because nothing can be found in it
  }

  // prevent any mutation + filter out undefined and null elements:
  var input = clone(originalInput).filter(elem => existy(elem))

  // if array contained only null/undefined values, do a Dutch leave:
  if (input.length === 0) {
    return false
  }

  if (isStr(stringToFind)) {
    return input.some(val => matcher.isMatch(val, stringToFind))
  } else {
    // array then.
    if (opts.arrayVsArrayAllMustBeFound === 'any') {
      return stringToFind.some(stringToFindVal => input.some(val => matcher.isMatch(val, stringToFindVal)))
    } else {
      return stringToFind.every(stringToFindVal => input.some(val => matcher.isMatch(val, stringToFindVal)))
    }
  }
}

module.exports = includesWithGlob
