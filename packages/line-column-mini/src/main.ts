import { version as v } from "../package.json";
const version: string = v;

// find where is a given element located
function binarySearch(el: number, arr: number[]): number {
  let m = 0;
  let n = arr.length - 2;
  while (m < n) {
    const k = m + ((n - m) >> 1);
    if (el < arr[k]) {
      n = k - 1;
    } else if (el >= arr[k + 1]) {
      m = k + 1;
    } else {
      m = k;
      break;
    }
  }
  return m;
}

// split by line break characters, CR, LF or CRLF
// compile an array of indexes, where each line starts
function getLineStartIndexes(str: string): number[] {
  return str.split(/\n|\r(?!\n)/g).reduce(
    (acc, curr) => {
      acc.push(acc[acc.length - 1] + curr.length + 1);
      return acc;
    },
    [0]
  );
}

/**
 * Convert string index to line-column position
 */
function lineCol(
  input: string | number[],
  idx: number,
  skipChecks = false
): {
  line: number;
  col: number;
} | null {
  console.log(`045`);
  if (
    !skipChecks &&
    ((!Array.isArray(input) && typeof input !== "string") ||
      ((typeof input === "string" || Array.isArray(input)) && !input.length))
  ) {
    console.log(`051 early return ${`\u001b[${31}m${`null`}\u001b[${39}m`}`);
    return null;
  }
  if (
    !skipChecks &&
    (typeof idx !== "number" ||
      (typeof input === "string" && idx >= input.length) ||
      (Array.isArray(input) && idx + 1 >= input[input.length - 1]))
  ) {
    console.log(`060 early return ${`\u001b[${31}m${`null`}\u001b[${39}m`}`);
    return null;
  }

  // it depends, pre-cached input was given or a string
  if (typeof input === "string") {
    // not cached - calculate the line start indexes
    const startIndexesOfEachLine = getLineStartIndexes(input);
    console.log(
      `069 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`startIndexesOfEachLine`}\u001b[${39}m`} = ${JSON.stringify(
        startIndexesOfEachLine,
        null,
        4
      )}`
    );
    const line = binarySearch(idx, startIndexesOfEachLine);
    console.log(
      `077 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`line`}\u001b[${39}m`} = ${JSON.stringify(
        line,
        null,
        4
      )}`
    );
    return {
      col: idx - startIndexesOfEachLine[line] + 1,
      line: line + 1,
    };
  }

  // ELSE - cached line start indexes - we don't even need the string source!
  const line = binarySearch(idx, input);
  console.log(
    `092 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`line`}\u001b[${39}m`} = ${JSON.stringify(
      line,
      null,
      4
    )}`
  );
  return {
    col: idx - input[line] + 1,
    line: line + 1,
  };
}

export { lineCol, getLineStartIndexes, version };
