#!/usr/bin/env node

// deps
const path = require("path");
const callerDir = path.resolve(".");
const runPerf = require(path.resolve("../../scripts/run-perf.js"));

// setup
const f = require("../");
const testme = () => f(/def/g, "abcdefghij_abcdefghij", "");

// action
runPerf(testme, callerDir);
