#!/usr/bin/env node

// deps
const path = require("path");
const callerDir = path.resolve(".");
const runPerf = require(path.resolve("../../scripts/run-perf.js"));

// setup
const f = require("../");
const testme = () =>
  f(
    '<jshkjdfghg>jdslfjlf dghjlgjh <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">\n<sdfhksh>\n<ljkgldkjfgl>sfjldg<qkwejklqwe>'
  );

// action
runPerf(testme, callerDir);
