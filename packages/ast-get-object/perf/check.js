#!/usr/bin/env node

// deps
const path = require("path");
const callerDir = path.resolve(".");
const runPerf = require(path.resolve("../../scripts/run-perf.js"));

// setup
const f = require("../");
const testme = () =>
  f(
    [
      {
        tag: "meta",
        content: "UTF-8",
        something: "else"
      },
      {
        tag: "title",
        attrs: "Text of the title"
      }
    ],
    {
      tag: "meta"
    }
  );

// action
runPerf(testme, callerDir);
