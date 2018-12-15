import test from "ava";
import {
  find,
  get,
  set,
  drop,
  info,
  del,
  arrayFirstOnly
} from "../dist/ast-monkey.esm";

let actual;
let intended;
let key;
let val;
let index;

let input = {
  a: { b: [{ c: { d: "e" } }] },
  c: { d: "e" }
};

// -----------------------------------------------------------------------------
// all throws
// -----------------------------------------------------------------------------

test("01.01 - find - throws when there's no input", t => {
  t.throws(() => {
    find();
  });
  t.throws(() => {
    find(null, {});
  });
});

test("01.02 - get -  throws when there's no input", t => {
  t.throws(() => {
    get();
  });
  t.throws(() => {
    get(null, {});
  });
});

test("01.03 - set -  throws when there's no input", t => {
  t.throws(() => {
    set();
  });
  t.throws(() => {
    set(null, {});
  });
});

test("01.04 - drop - throws when there's no input", t => {
  t.throws(() => {
    drop();
  });
  t.throws(() => {
    drop(null, {});
  });
});

test("01.05 - info - throws when there's no input", t => {
  t.throws(() => {
    info();
  });
  t.throws(() => {
    info(null, {});
  });
});

test("01.06 - get/set - throws when opts.index is missing", t => {
  t.throws(() => {
    get(input);
  });
  t.throws(() => {
    get(input, { a: "a" });
  });
  t.throws(() => {
    set(input);
  });
  t.throws(() => {
    set(input, { a: "a" });
  });
});

test("01.07 - get/set/drop - throws when opts.index is not a natural number (both string or number)", t => {
  t.throws(() => {
    get(input, { index: "1.5" });
  });
  t.throws(() => {
    get(input, { index: 1.5 });
  });
  t.throws(() => {
    set(input, { index: "1.5", val: "zzz" });
  });
  t.throws(() => {
    set(input, { index: 1.5, val: "zzz" });
  });
  t.throws(() => {
    drop(input, { index: "1.5" });
  });
  t.throws(() => {
    drop(input, { index: 1.5 });
  });
});

test("01.08 - set - throws when opts.key and opts.val are missing", t => {
  t.throws(() => {
    set(input, { index: "3" });
  });
});

test("01.09 - find - throws when opts.key and opts.val are missing", t => {
  t.throws(() => {
    find(input, { index: "3" });
  });
  t.throws(() => {
    find(input, { index: 3 });
  });
});

test("01.10 - del - throws when opts.key and opts.val are missing", t => {
  t.throws(() => {
    del(input, { index: "3" });
  });
  t.throws(() => {
    del(input, { index: 3 });
  });
});

test("01.10 - drop - throws when there's no index", t => {
  t.throws(() => {
    drop(["a"], "a");
  });
  t.throws(() => {
    drop({ a: "a" }, { b: "b" });
  });
});

// -----------------------------------------------------------------------------
// find
// -----------------------------------------------------------------------------

test("02.01.pt1 - finds by key in a simple object #1", t => {
  input = {
    a: {
      b: "c"
    }
  };
  intended = [
    {
      index: 1,
      key: "a",
      val: {
        b: "c"
      },
      path: [1]
    }
  ];
  t.deepEqual(find(input, { key: "a", val: undefined }), intended, "02.01.01");

  // absence of the second arg:
  t.deepEqual(find(input, { key: "a" }), intended, "02.01.02");

  // null would mean actual null being there (which is not), so it's not going to find any:
  t.deepEqual(
    find(input, { key: "a", val: null }),
    null, // <---- !!!! null means no findings !!!!
    "02.01.03"
  );
});

test("02.01.pt2 - finds by key in a simple object, with glob", t => {
  input = {
    a1: {
      b1: "c1"
    },
    a2: {
      b2: "c2"
    },
    z1: {
      x1: "y1"
    }
  };
  intended = [
    {
      index: 1,
      key: "a1",
      val: {
        b1: "c1"
      },
      path: [1]
    },
    {
      index: 3,
      key: "a2",
      val: {
        b2: "c2"
      },
      path: [3]
    }
  ];
  t.deepEqual(find(input, { key: "a*", val: undefined }), intended, "02.01.04");

  // absence of the second arg:
  t.deepEqual(find(input, { key: "a*" }), intended, "02.01.05");

  // null would mean actual null being there (which is not), so it's not going to find any:
  t.deepEqual(
    find(input, { key: "a*", val: null }),
    null, // <---- !!!! null means no findings !!!!
    "02.01.06"
  );
});

test("02.02.pt1 - finds by key in a simple object #2", t => {
  input = {
    a: {
      b: "c"
    }
  };
  intended = [
    {
      index: 2,
      key: "b",
      val: "c",
      path: [1, 2]
    }
  ];
  // second arg hardcoded null - won't find any because input has no null's:
  t.deepEqual(find(input, { key: "b", val: null }), null, "02.02.01");

  // absence of the second arg:
  t.deepEqual(find(input, { key: "b" }), intended, "02.02.02");

  // second arg hardcoded undefined:
  t.deepEqual(find(input, { key: "b", val: undefined }), intended, "02.02.03");
});

test("02.02.pt2 - finds by key in a simple object, with glob", t => {
  input = {
    a: {
      b1: "c1",
      b2: "c2",
      z: "y"
    }
  };
  intended = [
    {
      index: 2,
      key: "b1",
      val: "c1",
      path: [1, 2]
    },
    {
      index: 3,
      key: "b2",
      val: "c2",
      path: [1, 3]
    }
  ];
  // second arg hardcoded null - won't find any because input has no null's:
  t.deepEqual(find(input, { key: "b*", val: null }), null, "02.02.04");

  // absence of the second arg:
  t.deepEqual(find(input, { key: "b*" }), intended, "02.02.05");

  // second arg hardcoded undefined:
  t.deepEqual(find(input, { key: "b*", val: undefined }), intended, "02.02.06");
});

test("02.03.pt1 - does not find by key in a simple object", t => {
  input = {
    a: {
      b: "c"
    }
  };
  key = "z";
  val = null;
  actual = find(input, { key });
  intended = null;

  t.deepEqual(actual, intended, "02.03.01");
});

test("02.03.pt2 - does not find by key in a simple object, with glob", t => {
  input = {
    a: {
      b: "c"
    }
  };
  key = "z*";
  val = null;
  actual = find(input, { key });
  intended = null;

  t.deepEqual(actual, intended, "02.03.02");
});

test("02.04.pt1 - finds by key in simple arrays #1", t => {
  input = ["a", [["b"], "c"]];
  key = "a";
  actual = find(input, { key });
  intended = [
    {
      index: 1,
      key: "a",
      val: undefined,
      path: [1]
    }
  ];
  t.deepEqual(actual, intended, "02.04.01");
});

test("02.04.pt2 - finds by key in simple arrays, with glob", t => {
  input = ["a", "azzz", [["b"], "c"]];
  key = "a*";
  actual = find(input, { key });
  intended = [
    {
      index: 1,
      key: "a",
      val: undefined,
      path: [1]
    },
    {
      index: 2,
      key: "azzz",
      val: undefined,
      path: [2]
    }
  ];
  t.deepEqual(actual, intended, "02.04.02");
});

test("02.05.pt1 - finds by key in simple arrays #2", t => {
  input = ["a", [["b"], "c"]];
  key = "b";
  actual = find(input, { key });
  intended = [
    {
      index: 4,
      key: "b",
      val: undefined,
      path: [2, 3, 4]
    }
  ];
  t.deepEqual(actual, intended, "02.05.01");
});

test("02.05.pt2 - finds by key in simple arrays, with globs", t => {
  input = ["a", [["zzz", "b", "bbb"], "c"]];
  key = "b*";
  actual = find(input, { key });
  intended = [
    {
      index: 5,
      key: "b",
      val: undefined,
      path: [2, 3, 5]
    },
    {
      index: 6,
      key: "bbb",
      val: undefined,
      path: [2, 3, 6]
    }
  ];
  t.deepEqual(actual, intended, "02.05.02");
});

test("02.06.pt1 - finds by key in simple arrays #3", t => {
  input = ["a", [["b"], "c"]];
  key = "c";
  actual = find(input, { key, val: undefined });
  intended = [
    {
      index: 5,
      key: "c",
      val: undefined,
      path: [2, 5]
    }
  ];
  t.deepEqual(actual, intended, "02.06.01");
});

test("02.06.pt2 - finds by key in simple arrays, with glob", t => {
  input = ["apples", [["hackles"], "crackles"]];
  key = "*ackles";
  actual = find(input, { key, val: undefined });
  intended = [
    {
      index: 4,
      key: "hackles",
      val: undefined,
      path: [2, 3, 4]
    },
    {
      index: 5,
      key: "crackles",
      val: undefined,
      path: [2, 5]
    }
  ];
  t.deepEqual(actual, intended, "02.06.02");
});

test("02.07.pt1 - does not find by key in simple arrays", t => {
  input = ["a", [["b"], "c"]];
  key = "d";
  actual = find(input, { key });
  intended = null;
  t.deepEqual(actual, intended, "02.07.01");
});

test("02.07.pt2 - does not find by key in simple arrays, with globs", t => {
  input = ["a", [["b"], "c"]];
  key = "lexicographer*";
  actual = find(input, { key });
  intended = null;
  t.deepEqual(actual, intended, "02.07.02");
});

test("02.08 - finds by key in simple arrays #3", t => {
  input = ["a", [["b"], "c"]];
  key = "c";
  actual = find(input, { key });
  intended = [
    {
      index: 5,
      key: "c",
      val: undefined,
      path: [2, 5]
    }
  ];
  t.deepEqual(actual, intended, "02.08");
});

test("02.09 - finds by value in a simple object - string", t => {
  input = {
    a: {
      b: "c"
    }
  };
  key = null;
  val = "c";
  actual = find(input, { key, val });
  intended = [
    {
      index: 2,
      key: "b",
      val: "c",
      path: [1, 2]
    }
  ];
  t.deepEqual(actual, intended, "02.09");
});

test("02.10.pt1 - finds by value in a simple object - object", t => {
  input = {
    a: {
      b: "c"
    }
  };
  key = null;
  val = { b: "c" };
  actual = find(input, { key, val });
  intended = [
    {
      index: 1,
      key: "a",
      val: { b: "c" },
      path: [1]
    }
  ];
  t.deepEqual(actual, intended, "02.10.01");
});

test("02.10.pt2 - finds by value in a simple object - object, with globs", t => {
  input = {
    a: {
      b: "c1"
    },
    k: {
      b: "c2"
    },
    z: {
      x: "y"
    }
  };
  key = null;
  val = { b: "c*" };
  actual = find(input, { key, val });
  intended = [
    {
      index: 1,
      key: "a",
      val: { b: "c1" },
      path: [1]
    },
    {
      index: 3,
      key: "k",
      val: { b: "c2" },
      path: [3]
    }
  ];
  t.deepEqual(actual, intended, "02.10.02");
});

test("02.11 - finds by value in a simple object - array", t => {
  input = {
    a: {
      b: ["c"]
    }
  };
  key = null;
  val = ["c"];
  actual = find(input, { key, val });
  intended = [
    {
      index: 2,
      key: "b",
      val: ["c"],
      path: [1, 2]
    }
  ];
  t.deepEqual(actual, intended, "02.11");
});

test("02.12 - finds by value in a simple object - empty array", t => {
  input = {
    a: {
      b: [],
      c: []
    }
  };
  key = null;
  val = [];
  actual = find(input, { key, val });
  intended = [
    {
      index: 2,
      key: "b",
      val: [],
      path: [1, 2]
    },
    {
      index: 3,
      key: "c",
      val: [],
      path: [1, 3]
    }
  ];
  t.deepEqual(actual, intended, "02.12");
});

test("02.13 - finds by value in a simple object - empty object", t => {
  input = {
    a: {
      b: {},
      c: {}
    }
  };
  key = null;
  val = {};
  actual = find(input, { key, val });
  intended = [
    {
      index: 2,
      key: "b",
      val: {},
      path: [1, 2]
    },
    {
      index: 3,
      key: "c",
      val: {},
      path: [1, 3]
    }
  ];
  t.deepEqual(actual, intended, "02.13");
});

test("02.14 - finds multiple nested keys by key and value in mixed #1", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    c: { d: "e" }
  };
  key = "c";
  val = { d: "e" };
  actual = find(input, { key, val });
  intended = [
    {
      index: 4,
      key: "c",
      val: {
        d: "e"
      },
      path: [1, 2, 3, 4]
    },
    {
      index: 6,
      key: "c",
      val: {
        d: "e"
      },
      path: [6]
    }
  ];
  t.deepEqual(actual, intended, "02.14");
});

test("02.15 - finds multiple nested keys by key and value in mixed #2", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    c: { d: ["d"] }
  };
  // ---------------------------
  t.deepEqual(
    find(input, { key: "d", val: null }),
    null,
    "02.15.01 - Null is a valid value! It's not found in the input!"
  );
  // ---------------------------
  t.deepEqual(
    find(input, { key: "d", val: undefined }),
    [
      {
        index: 5,
        key: "d",
        val: "e",
        path: [1, 2, 3, 4, 5]
      },
      {
        index: 7,
        key: "d",
        val: ["d"],
        path: [6, 7]
      },
      {
        index: 8,
        key: "d",
        val: undefined,
        path: [6, 7, 8]
      }
    ],
    "02.15.02 - hardcoded undefined as a value"
  );
  // ---------------------------
  t.deepEqual(
    find(input, { key: "d" }),
    [
      {
        index: 5,
        key: "d",
        val: "e",
        path: [1, 2, 3, 4, 5]
      },
      {
        index: 7,
        key: "d",
        val: ["d"],
        path: [6, 7]
      },
      {
        index: 8,
        key: "d",
        val: undefined,
        path: [6, 7, 8]
      }
    ],
    "02.15.03 - default behaviour, val is not hardcoded - should be the same as null"
  );
  // ---------------------------
  // arrays only:
  t.deepEqual(
    find(input, { key: "d", only: "arrays" }),
    [
      {
        index: 8,
        key: "d",
        val: undefined,
        path: [6, 7, 8]
      }
    ],
    "02.15.04 - finds only array instances and omits object-ones"
  );
  // ---------------------------
  // objects only:
  t.deepEqual(
    find(input, { key: "d", only: "objects" }),
    [
      {
        index: 5,
        key: "d",
        val: "e",
        path: [1, 2, 3, 4, 5]
      },
      {
        index: 7,
        key: "d",
        val: ["d"],
        path: [6, 7]
      }
    ],
    "02.15.05 - finds only array instances and omits object-ones"
  );
  // ---------------------------
  // any:
  t.deepEqual(
    find(input, { key: "d", only: "whatever" }),
    [
      {
        index: 5,
        key: "d",
        val: "e",
        path: [1, 2, 3, 4, 5]
      },
      {
        index: 7,
        key: "d",
        val: ["d"],
        path: [6, 7]
      },
      {
        index: 8,
        key: "d",
        val: undefined,
        path: [6, 7, 8]
      }
    ],
    "02.15.06 - finds only array instances and omits object-ones"
  );
});

test("02.16 - like 02.15, but with sneaky objects where values are null, tricking the algorithm", t => {
  input = {
    a: { b: [{ c: { d: null } }] },
    c: { d: ["d"] }
  };
  // ---------------------------
  t.deepEqual(
    find(input, { key: "d", val: undefined }),
    [
      {
        index: 5,
        key: "d",
        val: null,
        path: [1, 2, 3, 4, 5]
      },
      {
        index: 7,
        key: "d",
        val: ["d"],
        path: [6, 7]
      },
      {
        index: 8,
        key: "d",
        val: undefined,
        path: [6, 7, 8]
      }
    ],
    "02.16.01 - default behaviour, val is hardcoded `undefined`"
  );
  // ---------------------------
  t.deepEqual(
    find(input, { key: "d" }),
    [
      {
        index: 5,
        key: "d",
        val: null,
        path: [1, 2, 3, 4, 5]
      },
      {
        index: 7,
        key: "d",
        val: ["d"],
        path: [6, 7]
      },
      {
        index: 8,
        key: "d",
        val: undefined,
        path: [6, 7, 8]
      }
    ],
    "02.16.02 - default behaviour, val is not hardcoded - should be the same as null"
  );
  // ---------------------------
  // arrays only:
  t.deepEqual(
    find(input, { key: "d", only: "arrays" }),
    [
      {
        index: 8,
        key: "d",
        val: undefined,
        path: [6, 7, 8]
      }
    ],
    "02.16.03 - finds only array instances and omits object-ones"
  );
  // ---------------------------
  // objects only:
  t.deepEqual(
    find(input, { key: "d", only: "objects" }),
    [
      {
        index: 5,
        key: "d",
        val: null,
        path: [1, 2, 3, 4, 5]
      },
      {
        index: 7,
        key: "d",
        val: ["d"],
        path: [6, 7]
      }
    ],
    "02.16.04 - finds only array instances and omits object-ones"
  );
  // ---------------------------
  // any:
  t.deepEqual(
    find(input, { key: "d", only: "whatever" }),
    [
      {
        index: 5,
        key: "d",
        val: null,
        path: [1, 2, 3, 4, 5]
      },
      {
        index: 7,
        key: "d",
        val: ["d"],
        path: [6, 7]
      },
      {
        index: 8,
        key: "d",
        val: undefined,
        path: [6, 7, 8]
      }
    ],
    "02.16.05 - finds only array instances and omits object-ones"
  );
});

// -----------------------------------------------------------------------------
// get
// -----------------------------------------------------------------------------

test("03.01 - gets from a simple object #1", t => {
  input = {
    a: {
      b: "c"
    }
  };
  index = 1;
  actual = get(input, { index });
  intended = {
    a: { b: "c" }
  };
  t.deepEqual(actual, intended, "03.01");
});

test("03.02 - gets from a simple object #2", t => {
  input = {
    a: {
      b: "c"
    }
  };
  index = 2;
  actual = get(input, { index });
  intended = {
    b: "c"
  };
  t.deepEqual(actual, intended, "03.02");
});

test("03.03 - gets from a simple object #3", t => {
  input = {
    a: {
      b: ["c"]
    }
  };
  index = 3;
  actual = get(input, { index });
  intended = "c";
  t.deepEqual(actual, intended, "03.03");
});

test("03.04 - does not get", t => {
  input = {
    a: {
      b: ["c"]
    }
  };
  index = 4;
  actual = get(input, { index });
  intended = null;
  t.deepEqual(actual, intended, "03.04");
});

test("03.05 - gets from a simple array", t => {
  input = ["a", [["b"], "c"]];
  index = 4;
  actual = get(input, { index });
  intended = "b";
  t.deepEqual(actual, intended, "03.05");
});

test("03.06 - gets from mixed nested things, index string", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = "7";
  actual = get(input, { index });
  intended = {
    g: ["h"]
  };

  t.deepEqual(actual, intended, "03.06");
});

test("03.07 - gets from a simple object, index is string", t => {
  input = {
    a: {
      b: "c"
    }
  };
  index = "2";
  actual = get(input, { index });
  intended = {
    b: "c"
  };
  t.deepEqual(actual, intended, "03.07");
});

test("03.08 - index is real number as string - throws", t => {
  t.throws(() => {
    get(
      {
        a: {
          b: "c"
        }
      },
      {
        index: "2.1"
      }
    );
  });
});

// -----------------------------------------------------------------------------
// set
// -----------------------------------------------------------------------------

test("04.01 - sets in mixed nested things #1", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = "7";
  val = "zzz";
  actual = set(input, { index, val });
  intended = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: "zzz" }
  };

  t.deepEqual(actual, intended, "04.01");
});

test("04.02 - sets in mixed nested things #2", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = "8";
  val = "zzz";
  actual = set(input, { index, val });
  intended = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["zzz"] }
  };

  t.deepEqual(actual, intended, "04.02");
});

test("04.03 - does not set", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = "99";
  val = "zzz";
  actual = set(input, { index, val });
  intended = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };

  t.deepEqual(actual, intended, "04.03");
});

test("04.04 - sets when only key given instead, index as string", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = "8";
  key = "zzz";
  actual = set(input, { index, key });
  intended = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["zzz"] }
  };

  t.deepEqual(actual, intended, "04.04");
});

test("04.05 - sets when only key given, numeric index", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = 8;
  key = "zzz";
  actual = set(input, { index, key });
  intended = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["zzz"] }
  };

  t.deepEqual(actual, intended, "04.05");
});

test("04.06 - throws when inputs are wrong", t => {
  t.throws(() => {
    set(
      { a: "a" },
      {
        val: "a",
        index: "a"
      }
    );
  });
  t.throws(() => {
    set(
      { a: "a" },
      {
        val: "a"
      }
    );
  });
  t.throws(() => {
    set(
      { a: "a", b: ["c"] },
      {
        index: "1"
      }
    );
  });
  t.throws(() => {
    set(
      { a: "a", b: ["c"] },
      {
        val: "a",
        index: 1.5
      }
    );
  });
});

// -----------------------------------------------------------------------------
// drop
// -----------------------------------------------------------------------------

test("05.01 - drops in mixed things #1 - index string", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = "8";
  actual = drop(input, { index });
  intended = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: [] }
  };

  t.deepEqual(actual, intended, "05.01");
});

test("05.02 - drops in mixed things #2 - index number", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = 7;
  actual = drop(input, { index });
  intended = {
    a: { b: [{ c: { d: "e" } }] },
    f: {}
  };

  t.deepEqual(actual, intended, "05.02");
});

test("05.03 - does not drop - zero", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = "0";
  actual = drop(input, { index });
  intended = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };

  t.deepEqual(actual, intended, "05.03");
});

test("05.04 - does not drop - 99", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = "99";
  actual = drop(input, { index });
  intended = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };

  t.deepEqual(actual, intended, "05.04");
});

test("05.05 - drops in mixed things #3 - index is not a natural number", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    f: { g: ["h"] }
  };
  index = "6.1";
  t.throws(() => {
    drop(input, { index });
  });
});

// -----------------------------------------------------------------------------
// info
// -----------------------------------------------------------------------------

test("06.01 - info", t => {
  input = {
    a: "a"
  };
  actual = info(input);
  intended = { a: "a" };

  t.deepEqual(actual, intended, "06.01");
});

// -----------------------------------------------------------------------------
// del
// -----------------------------------------------------------------------------

test("07.01 - deletes by key, multiple findings", t => {
  input = {
    a: { b: [{ c: { d: "e" } }] },
    c: { d: ["h"] }
  };
  t.deepEqual(
    del(input, { key: "c" }),
    {
      a: { b: [{}] }
    },
    "07.01.01"
  );
  t.deepEqual(
    del(input, { key: "c", only: "array" }),
    {
      a: { b: [{ c: { d: "e" } }] },
      c: { d: ["h"] }
    },
    "07.01.02 - only array"
  );
  t.deepEqual(
    del(input, { key: "c", only: "o" }),
    {
      a: { b: [{}] }
    },
    "07.01.03"
  );
  t.deepEqual(
    del(input, { key: "c", only: "whatever" }),
    {
      a: { b: [{}] }
    },
    "07.01.04"
  );
});

test("07.02 - deletes by key, multiple findings at the same branch", t => {
  input = {
    a: { b: [{ c: { c: "e" } }] },
    c: { d: ["h"] }
  };
  t.deepEqual(
    del(input, { key: "c" }),
    {
      a: { b: [{}] }
    },
    "07.02"
  );
});

test("07.03 - can't find any to delete by key", t => {
  input = {
    a: { b: [{ c: { c: "e" } }] },
    c: { d: ["h"] }
  };
  t.deepEqual(
    del(input, { key: "zzz" }),
    {
      a: { b: [{ c: { c: "e" } }] },
      c: { d: ["h"] }
    },
    "07.03"
  );
});

test("07.04 - deletes by value only from mixed", t => {
  input = {
    a: { b: [{ ktjyklrjtyjlkl: { c: "e" } }] },
    dflshgdlfgh: { c: "e" }
  };
  t.deepEqual(
    del(input, { val: { c: "e" } }),
    {
      a: { b: [{}] }
    },
    "07.04"
  );
});

test("07.05 - deletes by value only from arrays", t => {
  input = ["a", "b", "c", ["a", ["b"], "c"]];
  t.deepEqual(del(input, { key: "b" }), ["a", "c", ["a", [], "c"]], "07.05");
});

test("07.06 - deletes by key and value from mixed", t => {
  input = {
    a: { b: [{ c: { d: { e: "f" } } }] },
    f: { d: { zzz: "f" } }
  };
  t.deepEqual(
    del(input, { key: "d", val: { e: "f" } }),
    {
      a: { b: [{ c: {} }] },
      f: { d: { zzz: "f" } }
    },
    "07.06"
  );
});

test("07.07 - does not delete by key and value from arrays", t => {
  input = ["a", "b", "c", ["a", ["b"], "c"]];
  t.deepEqual(
    del(input, { key: "b", val: "zzz" }),
    ["a", "b", "c", ["a", ["b"], "c"]],
    "07.07"
  );
});

test("07.08 - deletes by key and value from mixed", t => {
  input = {
    a: {
      b: "",
      c: "d",
      e: "f"
    }
  };
  t.deepEqual(
    del(input, { key: "b", val: "" }),
    {
      a: {
        c: "d",
        e: "f"
      }
    },
    "07.08"
  );
});

test("07.09 - sneaky-one: object keys have values as null", t => {
  input = {
    a: { b: [{ c: null }] },
    c: null
  };
  t.deepEqual(
    del(input, { key: "c" }),
    {
      a: { b: [{}] }
    },
    "07.09.01"
  );
  t.deepEqual(
    del(input, { key: "c", only: "array" }),
    input,
    "07.09.02 - only array"
  );
  t.deepEqual(
    del(input, { key: "c", only: "object" }),
    {
      a: { b: [{}] }
    },
    "07.09.03"
  );
});

// -----------------------------------------------------------------------------
// arrayFirstOnly
// -----------------------------------------------------------------------------

test("08.01 - arrayFirstOnly - nested arrays", t => {
  input = {
    a: { b: ["c", "d", "e"] },
    f: ["g", "h"]
  };

  actual = arrayFirstOnly(input);
  intended = {
    a: { b: ["c"] },
    f: ["g"]
  };

  t.deepEqual(actual, intended, "08.01");
});

test("08.02 - arrayFirstOnly - arrays within arrays only, no obj", t => {
  input = [["a", "b", "c"], ["d", ["e"]]];
  actual = arrayFirstOnly(input);
  intended = [["a"]];

  t.deepEqual(actual, intended, "08.02");
});

test("08.03 - arrayFirstOnly - nested arrays #2", t => {
  input = [
    {
      a: "a"
    },
    {
      b: "b"
    }
  ];
  actual = arrayFirstOnly(input);
  intended = [
    {
      a: "a"
    }
  ];

  t.deepEqual(actual, intended, "08.03");
});

test("08.04 - arrayFirstOnly leaves objects alone", t => {
  input = {
    a: "a",
    b: {
      c: "c"
    }
  };
  actual = arrayFirstOnly(input);
  intended = {
    a: "a",
    b: {
      c: "c"
    }
  };

  t.deepEqual(actual, intended, "08.04");
});

test("08.05 - arrayFirstOnly leaves strings alone", t => {
  input = "zzz";
  actual = arrayFirstOnly(input);
  intended = "zzz";

  t.deepEqual(actual, intended, "08.05");
});
