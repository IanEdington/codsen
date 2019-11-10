// avanotonly

import test from "ava";
import ct from "../dist/codsen-tokenizer.esm";
import deepContains from "ast-deep-contains";

// 01. healthy html, no tricks
// -----------------------------------------------------------------------------

test("01.01 - text-tag-text", t => {
  const gathered = [];
  ct("  <a>z", obj => {
    gathered.push(obj);
  });

  deepContains(
    gathered,
    [
      {
        type: "text",
        start: 0,
        end: 2
      },
      {
        type: "html",
        start: 2,
        end: 5
      },
      {
        type: "text",
        start: 5,
        end: 6
      }
    ],
    t.is,
    t.fail
  );
});

test("01.02 - text only", t => {
  const gathered = [];
  ct("  ", obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "text",
        start: 0,
        end: 2
      }
    ],
    t.is,
    t.fail
  );
});

test("01.03 - opening tag only", t => {
  const gathered = [];
  ct("<a>", obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "html",
        tagNameStartAt: 1,
        tagNameEndAt: 2,
        tagName: "a",
        closing: false,
        selfClosing: false,
        start: 0,
        end: 3
      }
    ],
    t.is,
    t.fail
  );
});

test("01.04 - closing tag only", t => {
  const gathered = [];
  ct("</a>", obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "html",
        tagNameStartAt: 2,
        tagNameEndAt: 3,
        tagName: "a",
        closing: true,
        selfClosing: false,
        start: 0,
        end: 4
      }
    ],
    t.is,
    t.fail
  );
});

test("01.05 - self-closing tag only", t => {
  const gathered = [];
  ct("<br/>", obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "html",
        tagNameStartAt: 1,
        tagNameEndAt: 3,
        tagName: "br",
        closing: false,
        selfClosing: true,
        start: 0,
        end: 5
      }
    ],
    t.is,
    t.fail
  );
});

test("01.06 - multiple tags", t => {
  const gathered = [];
  ct("<a><b><c>", obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "html",
        start: 0,
        end: 3
      },
      {
        type: "html",
        start: 3,
        end: 6
      },
      {
        type: "html",
        start: 6,
        end: 9
      }
    ],
    t.is,
    t.fail
  );
});

test("01.07 - closing bracket in the attribute's value", t => {
  const gathered = [];
  ct(`<a alt=">">`, obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "html",
        start: 0,
        end: 11
      }
    ],
    t.is,
    t.fail
  );
});

test("01.08 - closing bracket layers of nested quotes", t => {
  const gathered = [];
  ct(`<a alt='"'">"'"'>`, obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "html",
        start: 0,
        end: 17
      }
    ],
    t.is,
    t.fail
  );
});

test("01.09 - bracket as text", t => {
  const gathered = [];
  ct("a < b", obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "text",
        start: 0,
        end: 5
      }
    ],
    t.is,
    t.fail
  );
});

test("01.10 - tag followed by brackets", t => {
  const gathered = [];
  ct(`<a>"something"<span>'here'</span></a>`, obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "html",
        tagName: "a",
        closing: false,
        selfClosing: false,
        start: 0,
        end: 3
      },
      {
        type: "text",
        start: 3,
        end: 14
      },
      {
        type: "html",
        tagName: "span",
        closing: false,
        selfClosing: false,
        start: 14,
        end: 20
      },
      {
        type: "text",
        start: 20,
        end: 26
      },
      {
        type: "html",
        tagName: "span",
        closing: true,
        selfClosing: false,
        start: 26,
        end: 33
      },
      {
        type: "html",
        tagName: "a",
        closing: true,
        selfClosing: false,
        start: 33,
        end: 37
      }
    ],
    t.is,
    t.fail
  );
});

test("01.11 - html comment", t => {
  const gathered = [];
  ct("<table><!--[if (gte mso 9)|(IE)]>\n<table", obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "html",
        start: 0,
        end: 7
      },
      {
        type: "html",
        start: 7,
        end: 33,
        kind: "comment"
      },
      {
        type: "text",
        start: 33,
        end: 34
      },
      {
        type: "html",
        start: 34,
        end: 40
      }
    ],
    t.is,
    t.fail
  );
});

test("01.12 - html5 doctype", t => {
  const gathered = [];
  ct("a<!DOCTYPE html>b", obj => {
    gathered.push(obj);
  });
  deepContains(
    gathered,
    [
      {
        type: "text",
        start: 0,
        end: 1
      },
      {
        type: "html",
        start: 1,
        end: 16,
        kind: "doctype"
      },
      {
        type: "text",
        start: 16,
        end: 17
      }
    ],
    t.is,
    t.fail
  );
});

test("01.13 - xhtml doctype", t => {
  const gathered = [];
  ct(
    `z<!DOCTYPE html PUBLIC
  "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="ar" dir="ltr" xmlns="http://www.w3.org/1999/xhtml">z`,
    obj => {
      gathered.push(obj);
    }
  );
  deepContains(
    gathered,
    [
      {
        type: "text",
        start: 0,
        end: 1
      },
      {
        type: "html",
        start: 1,
        end: 126,
        kind: "doctype"
      },
      {
        type: "text",
        start: 126,
        end: 127
      },
      {
        type: "html",
        start: 127,
        end: 190
      },
      {
        type: "text",
        start: 190,
        end: 191
      }
    ],
    t.is,
    t.fail
  );
});

test("01.14 - xhtml DTD doctype", t => {
  const gathered = [];
  ct(
    `z<?xml version="1.0" encoding="UTF-8"?>
 <!DOCTYPE html
     PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">z`,
    obj => {
      gathered.push(obj);
    }
  );
  deepContains(
    gathered,
    [
      {
        type: "text",
        start: 0,
        end: 1
      },
      {
        type: "html",
        start: 1,
        end: 39,
        kind: "xml"
      },
      {
        type: "text",
        start: 39,
        end: 41
      },
      {
        type: "html",
        start: 41,
        end: 160,
        kind: "doctype"
      },
      {
        type: "text",
        start: 160,
        end: 162
      },
      {
        type: "html",
        start: 162,
        end: 229
      },
      {
        type: "text",
        start: 229,
        end: 230
      }
    ],
    t.is,
    t.fail
  );
});
