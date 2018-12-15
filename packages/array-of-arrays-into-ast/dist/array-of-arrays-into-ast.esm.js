import checkTypes from 'check-types-mini';
import mergeAdvanced from 'object-merge-advanced';

/* eslint no-console:0 */

const isArr = Array.isArray;

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

function generateAst(input, opts) {
  if (!isArr(input)) {
    throw new Error(
      `array-of-arrays-into-ast: [THROW_ID_01] input must be array. Currently it's of a type ${typeof input} equal to:\n${JSON.stringify(
        input,
        null,
        4
      )}`
    );
  } else if (input.length === 0) {
    return {};
  }

  const defaults = {
    dedupe: true
  };
  opts = Object.assign({}, defaults, opts);

  checkTypes(opts, defaults, {
    msg: "array-of-arrays-into-ast: [THROW_ID_02*]",
    optsVarName: "opts"
  });

  let res = {};

  input.forEach(arr => {

    let temp = null;
    for (let i = arr.length; i--; ) {
      temp = { [arr[i]]: [temp] }; // uses ES6 computed property names
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
    }
    res = mergeAdvanced(res, temp, { concatInsteadOfMerging: !opts.dedupe });
  });
  return sortObject(res);
}

export default generateAst;
