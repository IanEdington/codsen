'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sortRanges = _interopDefault(require('ranges-sort'));

/* eslint prefer-destructuring:0 */

// merges the overlapping ranges
// case #1. exact extension:
// [ [1, 5], [5, 10] ] => [ [1, 10] ]
// case #2. overlap:
// [ [1, 4], [3, 5] ] => [ [1, 5] ]
function mergeRanges(arrOfRanges) {
  if (!Array.isArray(arrOfRanges)) {
    return arrOfRanges;
  }
  var sortedRanges = sortRanges(arrOfRanges);
  for (var i = sortedRanges.length - 1; i >= 0; i--) {
    if (i > 0 && (sortedRanges[i][0] <= sortedRanges[i - 1][0] || sortedRanges[i][0] <= sortedRanges[i - 1][1])) {
      sortedRanges[i - 1][0] = Math.min(sortedRanges[i][0], sortedRanges[i - 1][0]);
      sortedRanges[i - 1][1] = Math.max(sortedRanges[i][1], sortedRanges[i - 1][1]);

      if (sortedRanges[i][2] !== undefined) {
        if (sortedRanges[i - 1][2] !== undefined) {
          sortedRanges[i - 1][2] += sortedRanges[i][2];
        } else {
          // instead of:
          sortedRanges[i - 1][2] = sortedRanges[i][2];
        }
      }
      sortedRanges.splice(i, 1);
      // reset the traversal, start from the end again
      i = sortedRanges.length;
    }
  }
  return sortedRanges;
}

module.exports = mergeRanges;
