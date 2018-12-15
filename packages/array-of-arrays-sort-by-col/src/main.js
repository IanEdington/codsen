/* eslint no-console:0 */

import clone from "lodash.clonedeep";
import isNaturalNumber from "is-natural-number";
import isNaturalNumberString from "is-natural-number-string";

const isArr = Array.isArray;

// FUNCTIONS - INTERNAL
// -----------------------------------------------------------------------------

function existy(x) {
  return x != null;
}

function logArray(arr, highlightIdx, colour) {
  const rez = arr
    .map((el, i) => {
      let res = String(el);
      while (res.length < 8) {
        res = ` ${res}`;
      }
      if (i === highlightIdx) {
        res = ` \u001b[${colour ? colour : 36}m${res}\u001b[${39}m`;
      }
      return res;
    })
    .join("");
  return rez;
}

function logArrayOfArrays(arr, highlightIdx) {
  console.log(
    `\n\n\n\n*** logArrayOfArrays:\n${"=".repeat(
      arr[0].length * 8 + (arr[0].length - 1)
    )}${arr.reduce((accum, currVal) => {
      return `${accum}\n${logArray(currVal, highlightIdx)}`;
    }, "")}\n${"=".repeat(arr[0].length * 8 + (arr[0].length - 1))}\n\n\n`
  );
}

// EXTERNAL API
// -----------------------------------------------------------------------------

function sortBySubarray(arr, axis = 0) {
  console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

  if (!isArr(arr)) {
    throw new Error(
      `array-of-arrays-sort-by-col: [THROW_ID_01]: The first input argument was given not as array but as ${typeof arr}, equal to:\n${JSON.stringify(
        arr,
        null,
        0
      )}`
    );
  }
  if (!isNaturalNumber(axis, { includeZero: true })) {
    if (isNaturalNumberString(axis, { includeZero: true })) {
      axis = parseInt(axis, 10);
    } else {
      throw new Error(
        `array-of-arrays-sort-by-col: [THROW_ID_02]: The second input argument, index of the column to sort by (axis), is not integer (incl. zero)! It's currently given as:\n${JSON.stringify(
          axis,
          null,
          0
        )}`
      );
    }
  }
  const maxLength = Math.max(...arr.map(arr => arr.length));
  if (maxLength === 0) {
    return arr;
  }

  if (axis >= maxLength) {
    throw new Error(
      `array-of-arrays-sort-by-col: [THROW_ID_03]: The second input argument, index of the column to sort by (axis), is marking the column which does not exist on any of the input arrays. Axis was given as ${axis} while highest index goes as far as ${maxLength}.`
    );
  }

  const resToBeReturned = clone(arr).sort((arr1, arr2) => {
    console.log(`===========================================`);
    console.log(logArray(arr1, axis));
    console.log(`${logArray(arr2, axis)}\n`);

    // 1. check the axis column first:
    if (arr1[axis] !== arr2[axis]) {
      console.log(
        `\u001b[${33}m${`${arr1[axis]} vs. ${arr2[axis]}`}\u001b[${39}m`
      );
      if (
        (!existy(arr1[axis]) && existy(arr2[axis])) ||
        (existy(arr1[axis]) && existy(arr2[axis]) && arr1[axis] > arr2[axis])
      ) {
        console.log(
          `096 return 1 - \u001b[${32}m${`${
            arr2[axis]
          } goes first, SWAP`}\u001b[${39}m`
        );
        return 1;
      }
      if (
        (existy(arr1[axis]) && !existy(arr2[axis])) ||
        (existy(arr1[axis]) && existy(arr2[axis]) && arr1[axis] < arr2[axis])
      ) {
        console.log(
          `107 return -1 - \u001b[${32}m${`${
            arr1[axis]
          } goes first, ALL STAYS AS IS`}\u001b[${39}m`
        );
        return -1;
      }
    }
    // 2. if we reached this point, we need to ripple outwards from the axis
    // column, comparing first what's outside on the left-side, then right, then
    // left outside of it, then right outside of it, then left outside of it...

    const maxRangeToIterate = Math.max(arr1.length, arr2.length);
    const maxRipplesLength = Math.max(axis, maxRangeToIterate - axis - 1);

    // console.log(
    //   `\u001b[${35}m${`maxRipplesLength: ${maxRipplesLength}`}\u001b[${39}m`
    // );

    // iterate through the ripple's length:
    for (let i = 1; i <= maxRipplesLength; i++) {
      console.log(
        `${`\u001b[${36}m${` \u00B0\u00BA\u00A4\u00F8,\u00B8\u00B8,\u00F8\u00A4\u00BA\u00B0\u00B0\u00BA\u00A4\u00F8,\u00B8,\u00F8\u00A4\u00B0\u00BA\u00A4\u00F8,\u00B8\u00B8,\u00F8\u00A4\u00BA\u00B0\u00B0\u00BA\u00A4\u00F8,\u00B8`}\u001b[${39}m`}\n`
      );
      if (axis - i >= 0) {
        // logging:
        console.log(logArray(arr1, axis - i, 35));
        console.log(logArray(arr2, axis - i, 35));
        console.log();

        // comparison:
        if (existy(arr1[axis - i])) {
          if (existy(arr2[axis - i])) {
            if (arr1[axis - i] < arr2[axis - i]) {
              console.log(
                `141 return -1 - \u001b[${32}m${`${
                  arr1[axis - 1]
                } goes first, ALL STAYS AS IS`}\u001b[${39}m`
              );
              return -1;
            }
            if (arr1[axis - i] > arr2[axis - i]) {
              console.log(
                `149 return 1 - \u001b[${32}m${`${
                  arr2[axis - 1]
                } goes first, SWAP`}\u001b[${39}m`
              );
              return 1;
            }
          } else {
            console.log(
              `157 return -1 - \u001b[${32}m${`${
                arr1[axis - 1]
              } goes first, ALL STAYS AS IS`}\u001b[${39}m`
            );
            return -1;
          }
        } else {
          // arr1 value is null or undefined
          // it's enough for arr2 not to be null or undefined and it goes on top:
          if (existy(arr2[axis - i])) {
            console.log(
              `168 return 1 - \u001b[${32}m${`${
                arr2[axis - 1]
              } goes first, SWAP`}\u001b[${39}m`
            );
            return 1;
          }
        }
      }
      if (axis + i < maxRangeToIterate) {
        // logging:
        console.log(logArray(arr1, axis + i, 35));
        console.log(logArray(arr2, axis + i, 35));

        // comparison:
        if (existy(arr1[axis + i])) {
          if (existy(arr2[axis + i])) {
            if (arr1[axis + i] < arr2[axis + i]) {
              console.log(
                `186 return -1 - \u001b[${32}m${`${
                  arr1[axis + 1]
                } goes first, ALL STAYS AS IS`}\u001b[${39}m`
              );
              return -1;
            }
            if (arr1[axis + i] > arr2[axis + i]) {
              console.log(
                `194 return 1 - \u001b[${32}m${`${
                  arr2[axis + 1]
                } goes first, SWAP`}\u001b[${39}m`
              );
              return 1;
            }
          } else {
            console.log(
              `202 return -1 - \u001b[${32}m${`${
                arr1[axis + 1]
              } goes first, ALL STAYS AS IS`}\u001b[${39}m`
            );
            return -1;
          }
        } else {
          // arr1 value is null or undefined
          // it's enough for arr2 not to be null or undefined and it goes on top:
          if (existy(arr2[axis + i])) {
            console.log(
              `213 return 1 - \u001b[${32}m${`${
                arr2[axis + 1]
              } goes first, SWAP`}\u001b[${39}m`
            );
            return 1;
          }
        }
      }
    }

    // 3. if by now any of returns hasn't happened yet, these two rows are equal
    console.log(`224 return 0 - \u001b[${32}m${`EQUAL`}\u001b[${39}m`);
    return 0;
  });

  console.log("\n\n\nRETURNING:");
  logArrayOfArrays(resToBeReturned, axis);

  return resToBeReturned;
}

export default sortBySubarray;
