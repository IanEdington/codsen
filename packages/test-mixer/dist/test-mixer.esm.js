/**
 * test-mixer
 * Test helper to generate function opts object variations
 * Version: 2.0.6
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/test-mixer/
 */

import { combinations } from 'object-boolean-combinations';
import clone from 'lodash.clonedeep';

var version$1 = "2.0.6";

const version = version$1;

function mixer(ref = {}, defaultsObj = {}) {
  if (ref && typeof ref !== "object") {
    throw new Error(`test-mixer: [THROW_ID_01] the first input arg is missing!`);
  }

  if (defaultsObj && typeof defaultsObj !== "object") {
    throw new Error(`test-mixer: [THROW_ID_02] the second input arg is missing!`);
  }

  let caught;

  if (typeof ref === "object" && typeof defaultsObj === "object" && Object.keys(ref).some(refKey => {
    if (!Object.keys(defaultsObj).includes(refKey)) {
      caught = refKey;
      return true;
    }
  })) {
    throw new Error(`test-mixer: [THROW_ID_03] the second input arg object should be defaults; it should be a superset of 1st input arg object. However, 1st input arg object contains key "${caught}" which 2nd input arg object doesn't have.`);
  } // quick end


  if (!Object.keys(defaultsObj).length) {
    return [];
  }

  const refClone = clone(ref);
  const defaultsObjClone = clone(defaultsObj);
  const optsWithBoolValues = {}; // 1. find out, what boolean-value keys are there in defaultsObj that
  // are missing in ref. If there are n keys, we'll generate 2^n objects.

  Object.keys(defaultsObj).forEach(key => {
    // if key's value is bool AND it's not present in ref,
    // add it to "optsWithBoolValues"
    if (typeof defaultsObjClone[key] === "boolean" && !Object.keys(ref).includes(key)) {
      optsWithBoolValues[key] = defaultsObjClone[key];
    }
  }); // calculate combinations using combinations() - object-boolean-combinations
  // then restore the non-bool keys

  const res = combinations(optsWithBoolValues).map(obj => ({ ...defaultsObj,
    ...refClone,
    ...obj
  }));
  return res;
}

export { mixer, version };
