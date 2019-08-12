import fs from "fs-extra";
import test from "ava";
import path from "path";
import execa from "execa";
import tempy from "tempy";

const aPackageJson = `{
  "name": "a",
  "main": "dist/a.cjs.js",
  "module": "dist/a.esm.js",
  "browser": "dist/a.umd.js"
}`;

const bPackageJson = `{
  "name": "b",
  "main": "dist/b.cjs.js",
  "module": "dist/b.esm.js",
  "browser": "dist/b.umd.js"
}`;

const cPackageJson = `{
  "name": "c",
  "bin": {
    "launchc": "cli.js",
    "claunch": "cli.js"
  }
}`;

//                                  *
//                                  *
//                                  *
//                                  *
//                                  *
//
//                                01.01
//
//                                  *
//                                  *
//                                  *
//                                  *
//                                  *

test(`01.01 - ${`\u001b[${35}m${`errors`}\u001b[${39}m`} - requested package does not exist (ERROR_01)`, async t => {
  // Re-route the test files into `temp/` folder instead for easier access when
  // troubleshooting. Just comment out one of two:
  // const tempFolder = "temp";
  const tempFolder = tempy.directory();
  fs.ensureDirSync(path.resolve(tempFolder));
  fs.ensureDirSync(path.resolve(tempFolder, "a", "node_modules"));
  fs.ensureDirSync(path.resolve(tempFolder, "b", "node_modules"));

  //

  const cleanupMsg = await fs
    .writeFile(path.join(tempFolder, "a", "package.json"), aPackageJson)
    .then(() =>
      fs.writeFile(path.join(tempFolder, "b", "package.json"), bPackageJson)
    )
    .then(() =>
      execa(
        `cd ${path.resolve(path.join(tempFolder, "a"))} && ${path.join(
          __dirname,
          "../",
          "cli.js"
        )} oodles`, // requesting to link monorepo package "oodles"
        {
          shell: true
        }
      )
    )
    .then(execasMsg => {
      t.regex(execasMsg.stdout, /ERROR_01/, "01.01.01");
      t.regex(execasMsg.stdout, /not found!/, "01.01.02");
      // return fs.readFile(path.join(tempFolder, "changelog.md"), "utf8");
    })
    .then(() =>
      execa.command(`rm -rf ${tempFolder}`, {
        shell: true
      })
    );

  t.deepEqual(cleanupMsg.exitCode, 0, "01.01.03");
});

//                                  *
//                                  *
//                                  *
//                                  *
//                                  *
//
//                                01.02
//
//                                  *
//                                  *
//                                  *
//                                  *
//                                  *

test(`01.02 - ${`\u001b[${35}m${`errors`}\u001b[${39}m`} - couldn't read b's package.json (ERROR_02)`, async t => {
  // Re-route the test files into `temp/` folder instead for easier access when
  // troubleshooting. Just comment out one of two:
  // const tempFolder = "temp";
  const tempFolder = tempy.directory();
  fs.ensureDirSync(path.resolve(tempFolder));
  fs.ensureDirSync(path.resolve(tempFolder, "a", "node_modules"));
  fs.ensureDirSync(path.resolve(tempFolder, "b", "node_modules"));

  //

  const cleanupMsg = await fs
    .writeFile(path.join(tempFolder, "a", "package.json"), aPackageJson)
    .then(() =>
      execa(
        `cd ${path.resolve(path.join(tempFolder, "a"))} && ${path.join(
          __dirname,
          "../",
          "cli.js"
        )} b`,
        {
          shell: true
        }
      )
    )
    .then(execasMsg => {
      t.regex(execasMsg.stdout, /ERROR_02/, "01.02.01");
      t.regex(execasMsg.stdout, /package.json/, "01.02.02");
      t.regex(execasMsg.stdout, /doesn't exist/, "01.02.03");
      // return fs.readFile(path.join(tempFolder, "changelog.md"), "utf8");
    })
    .then(() =>
      execa.command(`rm -rf ${tempFolder}`, {
        shell: true
      })
    );

  t.deepEqual(cleanupMsg.exitCode, 0, "01.02.04");
});

//                                  *
//                                  *
//                                  *
//                                  *
//                                  *
//
//                                01.03
//
//                                  *
//                                  *
//                                  *
//                                  *
//                                  *

test(`01.03 - ${`\u001b[${35}m${`errors`}\u001b[${39}m`} - normal dep, symlink already exists (ERROR_03)`, async t => {
  // Re-route the test files into `temp/` folder instead for easier access when
  // troubleshooting. Just comment out one of two:
  // const tempFolder = "temp";
  const tempFolder = tempy.directory();
  fs.ensureDirSync(path.resolve(tempFolder));
  fs.ensureDirSync(path.resolve(tempFolder, "a", "node_modules"));
  fs.ensureDirSync(path.resolve(tempFolder, "b", "node_modules"));

  //

  const cleanupMsg = await fs
    .writeFile(path.join(tempFolder, "a", "package.json"), aPackageJson)
    .then(() =>
      fs.writeFile(path.join(tempFolder, "b", "package.json"), bPackageJson)
    )
    .then(() =>
      execa(
        `ln -s ${path.resolve(path.join(tempFolder, "b"))} ${path.resolve(
          path.join(tempFolder, "a", "node_modules", "b")
        )}`,
        {
          shell: true
        }
      )
    )
    .then(() =>
      execa(
        `cd ${path.resolve(path.join(tempFolder, "a"))} && ${path.join(
          __dirname,
          "../",
          "cli.js"
        )} b`, // requesting to link monorepo package "b"
        {
          shell: true
        }
      )
    )
    .then(execasMsg => {
      t.regex(execasMsg.stdout, /ERROR_03/, "01.03.01");
      t.regex(execasMsg.stdout, /symlink already exists/, "01.03.02");
      // return fs.readFile(path.join(tempFolder, "changelog.md"), "utf8");
    })
    .then(() =>
      execa.command(`rm -rf ${tempFolder}`, {
        shell: true
      })
    );

  t.deepEqual(cleanupMsg.exitCode, 0, "01.03.03");
});

//                                  *
//                                  *
//                                  *
//                                  *
//                                  *
//
//                                01.04
//
//                                  *
//                                  *
//                                  *
//                                  *
//                                  *

test(`01.04 - ${`\u001b[${35}m${`errors`}\u001b[${39}m`} - error while trying to parse package.json (ERROR_04)`, async t => {
  // Re-route the test files into `temp/` folder instead for easier access when
  // troubleshooting. Just comment out one of two:
  // const tempFolder = "temp";
  const tempFolder = tempy.directory();
  fs.ensureDirSync(path.resolve(tempFolder));
  fs.ensureDirSync(path.resolve(tempFolder, "a", "node_modules"));
  fs.ensureDirSync(path.resolve(tempFolder, "b", "node_modules"));

  //

  const cleanupMsg = await fs
    .writeFile(path.join(tempFolder, "a", "package.json"), aPackageJson)
    .then(() =>
      fs.writeFile(path.join(tempFolder, "b", "package.json"), "{{{{{")
    )
    .then(() =>
      execa(
        `cd ${path.resolve(path.join(tempFolder, "a"))} && ${path.join(
          __dirname,
          "../",
          "cli.js"
        )} b`,
        {
          shell: true
        }
      )
    )
    .then(execasMsg => {
      t.regex(execasMsg.stdout, /ERROR_04/, "01.04.01");
      t.regex(execasMsg.stdout, /package.json/, "01.04.02");
      t.regex(
        execasMsg.stdout,
        /Something went wrong trying to read/,
        "01.04.03"
      );
      // return fs.readFile(path.join(tempFolder, "changelog.md"), "utf8");
    })
    .then(() =>
      execa.command(`rm -rf ${tempFolder}`, {
        shell: true
      })
    );

  t.deepEqual(cleanupMsg.exitCode, 0, "01.04.04");
});

//                                  *
//                                  *
//                                  *
//                                  *
//                                  *
//
//                                01.05
//
//                                  *
//                                  *
//                                  *
//                                  *
//                                  *

test(`01.05 - ${`\u001b[${35}m${`errors`}\u001b[${39}m`} - dep is a CLI, one of symlinks already exists (ERROR_06)`, async t => {
  // Re-route the test files into `temp/` folder instead for easier access when
  // troubleshooting. Just comment out one of two:
  // const tempFolder = "temp";
  const tempFolder = tempy.directory();
  fs.ensureDirSync(path.resolve(tempFolder));
  fs.ensureDirSync(path.resolve(tempFolder, "a", "node_modules/.bin/"));
  fs.ensureDirSync(path.resolve(tempFolder, "c", "node_modules"));

  //

  const cleanupMsg = await fs
    .writeFile(path.join(tempFolder, "a", "package.json"), aPackageJson)
    .then(() =>
      fs.writeFile(path.join(tempFolder, "c", "package.json"), cPackageJson)
    )
    .then(() =>
      fs.writeFile(path.join(tempFolder, "c", "cli.js"), "this is c's cli.js")
    )
    .then(() =>
      execa(
        `ln -s ${path.resolve(
          path.join(tempFolder, "c", "cli.js")
        )} ${path.resolve(
          path.join(tempFolder, "a", "node_modules", ".bin", "launchc")
        )}`,
        {
          shell: true
        }
      )
    )
    .then(() =>
      execa(
        `cd ${path.resolve(path.join(tempFolder, "a"))} && ${path.join(
          __dirname,
          "../"
        )}/cli.js c`, // requesting to link monorepo package "b"
        {
          shell: true
        }
      )
    )
    .then(execasMsg => {
      t.regex(execasMsg.stdout, /ERROR_06/, "01.05.01");
      t.regex(execasMsg.stdout, /launchc already exists/, "01.05.02");
      t.regex(execasMsg.stdout, /Success!/, "01.05.03");
      t.regex(execasMsg.stdout, /was linked/, "01.05.04");
      // return fs.readFile(path.join(tempFolder, "changelog.md"), "utf8");
    })
    .then(() =>
      execa.command(`rm -rf ${tempFolder}`, {
        shell: true
      })
    );

  t.deepEqual(cleanupMsg.exitCode, 0, "01.05.04");
});

//                                  *
//                                  *
//                                  *
//                                  *
//                                  *
//
//                                01.06
//
//                                  *
//                                  *
//                                  *
//                                  *
//                                  *

test(`01.06 - ${`\u001b[${35}m${`errors`}\u001b[${39}m`} - package.json had no main/module/browser/bin fields (ERROR_08)`, async t => {
  // Re-route the test files into `temp/` folder instead for easier access when
  // troubleshooting. Just comment out one of two:
  // const tempFolder = "temp";
  const tempFolder = tempy.directory();
  fs.ensureDirSync(path.resolve(tempFolder));
  fs.ensureDirSync(path.resolve(tempFolder, "a", "node_modules/.bin/"));
  fs.ensureDirSync(path.resolve(tempFolder, "b", "node_modules"));

  //

  const cleanupMsg = await fs
    .writeFile(path.join(tempFolder, "a", "package.json"), aPackageJson)
    .then(() =>
      fs.writeFile(
        path.join(tempFolder, "b", "package.json"),
        '{"tralla": true}'
      )
    )
    .then(() =>
      execa(
        `cd ${path.resolve(path.join(tempFolder, "a"))} && ${path.join(
          __dirname,
          "../",
          "cli.js"
        )} b`,
        {
          shell: true
        }
      )
    )
    .then(execasMsg => {
      t.regex(execasMsg.stdout, /ERROR_08/, "01.06.01");
      t.regex(execasMsg.stdout, /package.json/, "01.06.02");
      t.regex(execasMsg.stdout, /didn't have any of the keys/, "01.06.03");
      // return fs.readFile(path.join(tempFolder, "changelog.md"), "utf8");
    })
    .then(() =>
      execa.command(`rm -rf ${tempFolder}`, {
        shell: true
      })
    );

  t.deepEqual(cleanupMsg.exitCode, 0, "01.06.04");
});

//                                  *
//                                  *
//                                  *
//                                  *
//                                  *
//
//                                02.01
//
//                                  *
//                                  *
//                                  *
//                                  *
//                                  *

test(`02.01 - ${`\u001b[${33}m${`main functionality`}\u001b[${39}m`} - links normal deps`, async t => {
  // Re-route the test files into `temp/` folder instead for easier access when
  // troubleshooting. Just comment out one of two:
  // const tempFolder = "temp";
  const tempFolder = tempy.directory();
  fs.ensureDirSync(path.resolve(tempFolder));
  fs.ensureDirSync(path.resolve(tempFolder, "a", "node_modules"));
  fs.ensureDirSync(path.resolve(tempFolder, "b", "node_modules"));

  //

  const cleanupMsg = await fs
    .writeFile(path.join(tempFolder, "a", "package.json"), aPackageJson)
    .then(() =>
      fs.writeFile(path.join(tempFolder, "b", "package.json"), bPackageJson)
    )
    .then(() =>
      execa(
        `cd ${path.resolve(path.join(tempFolder, "a"))} && ${path.join(
          __dirname,
          "../",
          "cli.js"
        )} b`,
        {
          shell: true
        }
      )
    )
    .then(execasMsg => {
      t.regex(execasMsg.stdout, /Success/, "02.01.01");
      t.regex(execasMsg.stdout, /b/, "02.01.02");
      t.regex(execasMsg.stdout, /linked!/, "02.01.03");
    })
    .then(() =>
      execa.command(`rm -rf ${tempFolder}`, {
        shell: true
      })
    );

  t.deepEqual(cleanupMsg.exitCode, 0, "02.01.04");
});

test(`02.02 - ${`\u001b[${33}m${`main functionality`}\u001b[${39}m`} - links CLI deps`, async t => {
  // Re-route the test files into `temp/` folder instead for easier access when
  // troubleshooting. Just comment out one of two:
  const tempFolder = "temp";
  // const tempFolder = tempy.directory();
  fs.ensureDirSync(path.resolve(tempFolder));
  fs.ensureDirSync(path.resolve(tempFolder, "a", "node_modules/.bin/"));
  fs.ensureDirSync(path.resolve(tempFolder, "c", "node_modules"));

  //

  const cleanupMsg = await fs
    .writeFile(path.join(tempFolder, "a", "package.json"), aPackageJson)
    .then(() =>
      fs.writeFile(path.join(tempFolder, "c", "cli.js"), "this is c's cli.js")
    )
    .then(() =>
      fs.writeFile(path.join(tempFolder, "c", "package.json"), cPackageJson)
    )
    .then(() =>
      execa(
        `cd ${path.resolve(path.join(tempFolder, "a"))} && ${path.join(
          __dirname,
          "../",
          "cli.js"
        )} c`,
        {
          shell: true
        }
      )
    )
    .then(execasMsg => {
      t.regex(execasMsg.stdout, /Success/, "02.02.01");
      t.regex(execasMsg.stdout, /claunch/, "02.02.02");
      t.regex(execasMsg.stdout, /launchc/, "02.02.03");
      t.regex(execasMsg.stdout, /linked!/, "02.02.04");
    })
    .then(() =>
      execa.command(`rm -rf ${tempFolder}`, {
        shell: true
      })
    );

  t.deepEqual(cleanupMsg.exitCode, 0, "02.02.05");
});
