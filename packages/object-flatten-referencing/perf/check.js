#!/usr/bin/env node

// deps
const path = require("path");
const callerDir = path.resolve(".");
const runPerf = require(path.resolve("../../scripts/run-perf.js"));

// setup
const f = require("../");
const testme = () =>
  f(
    {
      key1: {
        key2: ["val1", "val2", "val3"]
      },
      key3: {
        key4: ["val4", "val5", "val6"]
      }
    },
    {
      key1: "Contact us",
      key3: {
        key4: ["val4", "val5", "val6"]
      }
    },
    {
      wrapHeadsWith: "%%_",
      wrapTailsWith: "_%%",
      xhtml: false
    }
  );

// action
runPerf(testme, callerDir);
