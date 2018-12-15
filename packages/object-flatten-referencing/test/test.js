/* eslint no-template-curly-in-string: 0 */

import test from 'ava'
import ofr from '../dist/object-flatten-referencing.cjs'
import {
  checkTypes,
  flattenObject,
  flattenArr,
  arrayiffyString,
  reclaimIntegerString,
} from '../dist/util.cjs'

// -----------------------------------------------------------------------------
// 01. various throws
// -----------------------------------------------------------------------------

test('01.01 - throws when inputs are missing/wrong', (t) => {
  t.throws(() => {
    ofr()
  })
  t.throws(() => {
    ofr({ a: 'a' })
  })
  t.throws(() => {
    ofr({ a: 'a' }, { a: 'a' }, 1)
  })
})

test('01.02 - throws when opts object has wrong opts.wrapHeadsWith', (t) => {
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { wrapHeadsWith: 1 })
  })
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { wrapHeadsWith: false })
  })
})

test('01.03 - throws when opts object has wrong opts.wrapTailsWith', (t) => {
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { wrapTailsWith: 1 })
  })
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { wrapTailsWith: false })
  })
})

test('01.04 - throws when opts object has wrong opts.dontWrapKeys', (t) => {
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { dontWrapKeys: 1 })
  })
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { dontWrapKeys: false })
  })
})

test('01.05 - throws when opts object has wrong opts.xhtml', (t) => {
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { xhtml: 1 })
  })
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { xhtml: 'false' })
  })
})

test('01.06 - throws when opts object has wrong opts.preventDoubleWrapping', (t) => {
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { preventDoubleWrapping: 1 })
  })
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { preventDoubleWrapping: 'false' })
  })
})

test('01.07 - throws when opts object has wrong opts.objectKeyAndValueJoinChar', (t) => {
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { objectKeyAndValueJoinChar: 1 })
  })
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { objectKeyAndValueJoinChar: false })
  })
})

test('01.08 - opts.enforceStrictKeyset', (t) => {
  t.throws(() => {
    ofr({ a: 'a' }, { b: 'b' }, { zzzz: 1 })
  })
  t.notThrows(() => {
    ofr({ a: 'a' }, { b: 'b' }, { zzzz: 1, enforceStrictKeyset: false })
  })
})

// -----------------------------------------------------------------------------
// 02. B.A.U.
// -----------------------------------------------------------------------------

test('02.01 - defaults - objects, one level', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
    ),
    {
      key1: '%%_val11.val12_%%',
      key2: '%%_val21.val22_%%',
    },
    '02.01.01 - defaults wrapping strings',
  )
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '',
        wrapTailsWith: '',
      },
    ),
    {
      key1: 'val11.val12',
      key2: 'val21.val22',
    },
    '02.01.02 - heads/tails override, wrapping with empty strings',
  )
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '{',
        wrapTailsWith: '',
      },
    ),
    {
      key1: '{val11.val12',
      key2: '{val21.val22',
    },
    '02.01.03 - wrapping only with heads; tails empty',
  )
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '',
        wrapTailsWith: '}',
      },
    ),
    {
      key1: 'val11.val12}',
      key2: 'val21.val22}',
    },
    '02.01.04 - wrapping only with heads; tails empty',
  )
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        dontWrapKeys: 'key*',
      },
    ),
    {
      key1: 'val11.val12',
      key2: 'val21.val22',
    },
    '02.01.05 - does not wrap because starts with "key", string opt',
  )
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        dontWrapKeys: ['key*'],
      },
    ),
    {
      key1: 'val11.val12',
      key2: 'val21.val22',
    },
    '02.01.06 - does not wrap because starts with "key", array opt',
  )
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        dontWrapKeys: ['*1', '*2', '*3'],
      },
    ),
    {
      key1: 'val11.val12',
      key2: 'val21.val22',
    },
    '02.01.07 - does not wrap because ends with 1 or 2',
  )
  t.deepEqual(
    ofr(
      {
        thekey1: 'val11.val12',
        akey2: 'val21.val22',
      },
      {
        thekey1: 'Contact us',
        akey2: 'Tel. 0123456789',
      },
      {
        dontWrapKeys: ['a*', '*1', '*3'],
      },
    ),
    {
      thekey1: 'val11.val12',
      akey2: 'val21.val22',
    },
    '02.01.08 - mix of various wildcards, sources are strings',
  )
  t.deepEqual(
    ofr(
      {
        thekey1: { val11: 'val12' },
        akey2: { val21: 'val22' },
      },
      {
        thekey1: 'Contact us',
        akey2: 'Tel. 0123456789',
      },
      {
        dontWrapKeys: ['a*', '*1', '*3'],
      },
    ),
    {
      thekey1: 'val11.val12',
      akey2: 'val21.val22',
    },
    '02.01.09 - mix of various wildcards, sources are plain objects',
  )
  t.deepEqual(
    ofr(
      {
        KEY1: 'val11.val12',
        KEY2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        dontWrapKeys: 'key*',
      },
    ),
    {
      KEY1: 'val11.val12',
      KEY2: 'val21.val22',
    },
    '02.01.10 - wildcards are case sensitive since v4.3.0',
  )
})

test('02.02 - opts.preventDoubleWrapping', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: '%%_val11.val12_%%',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
    ),
    {
      key1: '%%_val11.val12_%%',
      key2: '%%_val21.val22_%%',
    },
    '02.02.01 - preventDoubleWrapping reading default heads/tails',
  )
  t.deepEqual(
    ofr(
      {
        key1: '%%_val11.val12_%%',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        preventDoubleWrapping: false,
      },
    ),
    {
      key1: '%%_%%_val11.val12_%%_%%',
      key2: '%%_val21.val22_%%',
    },
    '02.02.02 - preventDoubleWrapping off',
  )
  t.deepEqual(
    ofr(
      {
        key1: '{val11.val12}',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '{',
        wrapTailsWith: '}',
      },
    ),
    {
      key1: '{val11.val12}',
      key2: '{val21.val22}',
    },
    '02.02.03 - preventDoubleWrapping reading default heads/tails',
  )
  t.deepEqual(
    ofr(
      {
        key1: 'aaa %%val11.val12%% bbb',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '%%',
        wrapTailsWith: '%%',
      },
    ),
    {
      key1: 'aaa %%val11.val12%% bbb',
      key2: '%%val21.val22%%',
    },
    '02.02.04 - preventDoubleWrapping reading default heads/tails',
  )
})

test('02.03 - flattens an array value but doesn\'t touch other one', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
    ),
    {
      key1: '%%_key2.val1_%%<br />%%_key2.val2_%%<br />%%_key2.val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '02.03.01',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            '%%_val4_%%',
            '%%_val5_%%',
            '%%_val6_%%',
          ],
        },
      },
      {
        xhtml: false,
      },
    ),
    {
      key1: '%%_key2.val1_%%<br>%%_key2.val2_%%<br>%%_key2.val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '02.03.02',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
      },
    ),
    {
      key1: '%%_key2.val1_%%<br />%%_key2.val2_%%<br />%%_key2.val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '02.03.03',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        xhtml: false,
      },
    ),
    {
      key1: '%%_key2.val1_%%<br>%%_key2.val2_%%<br>%%_key2.val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '02.03.04',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        mergeArraysWithLineBreaks: false,
      },
    ),
    {
      key1: '%%_key2.val1_%%%%_key2.val2_%%%%_key2.val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '02.03.05 - does not put <br /> at all when flattening arrays',
  )
})

test('02.04 - wildcards in opts.dontWrapKeys', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        dontWrapKeys: '*1',
      },
    ),
    {
      key1: 'key2.val1<br />key2.val2<br />key2.val3',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '02.04.01 - does not wrap the key1 contents',
  )
  t.deepEqual(
    ofr(
      {
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        dontWrapKeys: '*1',
      },
    ),
    {
      key1: 'key2.val1<br />key2.val2<br />key2.val3',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '02.04.02 - opposite key order',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        xhtml: false,
        dontWrapKeys: '*3',
      },
    ),
    {
      key1: '%%_key2.val1_%%<br>%%_key2.val2_%%<br>%%_key2.val3_%%',
      key3: {
        key4: [
          'val4',
          'val5',
          'val6',
        ],
      },
    },
    '02.04.03 - does not touch key3 children',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: 'key3*',
      },
    ),
    {
      key1: '%%_key2.val1_%%<br />%%_key2.val2_%%<br />%%_key2.val3_%%',
      key3: {
        key4: [
          'val4',
          'val5',
          'val6',
        ],
      },
    },
    '02.04.04 - does not wrap the key3 children',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        xhtml: false,
        dontWrapKeys: 'key4*',
      },
    ),
    {
      key1: '%%_key2.val1_%%<br>%%_key2.val2_%%<br>%%_key2.val3_%%',
      key3: {
        key4: [
          'val4',
          'val5',
          'val6',
        ],
      },
    },
    '02.04.05 - nothing, because key4 is not top-level',
  )
})

test('02.05 - array of input vs string of reference', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: ['val1', 'val2', 'val3'],
        key3: {
          key4: [
            'val4',
            'val5',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'aaa',
            'zzz',
          ],
        },
      },
    ),
    {
      key1: '%%_val1_%%<br />%%_val2_%%<br />%%_val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
        ],
      },
    },
    '02.05',
  )
})

test('02.06 - action within an array\'s contents', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: [
          {
            a: 'a',
            b: [
              {
                x: 'xx',
                z: 'zz',
              },
            ],
            c: {
              d: ['e', 'f', 'g', 'h'],
            },
          },
        ],
      },
      {
        key1: [
          {
            a: 'a',
            b: [
              {
                x: 'xx',
                z: 'zz',
              },
            ],
            c: 'cc',
          },
        ],
      },
    ),
    {
      key1: [
        {
          a: '%%_a_%%',
          b: [
            {
              x: '%%_xx_%%',
              z: '%%_zz_%%',
            },
          ],
          c: '%%_d.e_%%<br />%%_d.f_%%<br />%%_d.g_%%<br />%%_d.h_%%',
        },
      ],
    },
    '02.06.01',
  )
})

test('02.07 - doesn\'t wrap empty string values', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: ['val1', 'val2', 'val3'],
        key3: {
          key4: [
            'val4',
            '',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'aaa',
            'zzz',
          ],
        },
      },
    ),
    {
      key1: '%%_val1_%%<br />%%_val2_%%<br />%%_val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '',
        ],
      },
    },
    '02.07',
  )
})

test('02.08 - reference array as value is shorter than input\'s', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: ['val1', 'val2', 'val3'],
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'aaa',
          ],
        },
      },
    ),
    {
      key1: '%%_val1_%%<br />%%_val2_%%<br />%%_val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '02.08',
  )
})

test('02.09 - one ignore works on multiple keys', (t) => {
  t.deepEqual(
    ofr(
      {
        key_aaaa: 'something',
        key_bbbb: 'anything',
        wrapme: 'oh yes',
      },
      {
        key_aaaa: 'Title',
        key_bbbb: 'Subtitle',
      },
      {
        dontWrapKeys: ['key*'],
        wrapHeadsWith: '${',
        wrapTailsWith: '}',
      },
    ),
    {
      key_aaaa: 'something',
      key_bbbb: 'anything',
      wrapme: 'oh yes',
    },
    '02.09.01 - defaults on opts.whatToDoWhenReferenceIsMissing',
  )
  t.deepEqual(
    ofr(
      {
        key_aaaa: 'something',
        key_bbbb: 'anything',
        wrapme: 'oh yes',
      },
      {
        key_aaaa: 'Title',
        key_bbbb: 'Subtitle',
      },
      {
        dontWrapKeys: ['key*'],
        wrapHeadsWith: '${',
        wrapTailsWith: '}',
        whatToDoWhenReferenceIsMissing: 0,
      },
    ),
    {
      key_aaaa: 'something',
      key_bbbb: 'anything',
      wrapme: 'oh yes',
    },
    '02.09.02 - hardcoded defaults on opts.whatToDoWhenReferenceIsMissing',
  )
  t.deepEqual(
    ofr(
      {
        key_aaaa: 'something',
        key_bbbb: 'anything',
        wrapme: 'oh yes',
      },
      {
        key_aaaa: 'Title',
        key_bbbb: 'Subtitle',
      },
      {
        dontWrapKeys: ['key*'],
        wrapHeadsWith: '${',
        wrapTailsWith: '}',
        whatToDoWhenReferenceIsMissing: 2,
      },
    ),
    {
      key_aaaa: 'something',
      key_bbbb: 'anything',
      wrapme: '${oh yes}',
    },
    '02.09.03 - defaults on opts.whatToDoWhenReferenceIsMissing',
  )
  t.deepEqual(
    ofr(
      {
        key_aaaa: 'something',
        key_bbbb: 'anything',
        wrapme: 'oh yes',
      },
      {
        key_aaaa: 'Title',
        key_bbbb: 'Subtitle',
        wrapme: 'z',
      },
      {
        dontWrapKeys: ['key*'],
        wrapHeadsWith: '${',
        wrapTailsWith: '}',
      },
    ),
    {
      key_aaaa: 'something',
      key_bbbb: 'anything',
      wrapme: '${oh yes}',
    },
    '02.09.04 - normal case, where reference is provided for key "wrapme"',
  )
  t.deepEqual(
    ofr(
      {
        key_aaaa: { a: 'a' },
        key_bbbb: { b: 'b' },
        wrapme: { c: 'c' },
      },
      {
        key_aaaa: 'a',
        key_bbbb: 'b',
        wrapme: 'c',
      },
      {
        dontWrapKeys: ['key*'],
        wrapHeadsWith: '${',
        wrapTailsWith: '}',
      },
    ),
    {
      key_aaaa: 'a.a',
      key_bbbb: 'b.b',
      wrapme: '${c.c}',
    },
    '02.09.05 - same as #04 but with objects',
  )
})

test('02.10 - deeper level - array VS. string', (t) => {
  t.deepEqual(
    ofr(
      {
        a_key: [
          {
            k_key: 'k_val',
            l_key: 'l_val',
            m_key: [
              'xxxx',
              ['1111', '2222', '3333'],
              'yyyy',
              'zzzz',
            ],
          },
        ],
        b_key: 'b_val',
      },
      {
        a_key: [
          {
            k_key: 'k_val',
            l_key: 'l_val',
            m_key: [
              'xxxx',
              'wwww',
              'yyyy',
              'zzzz',
            ],
          },
        ],
        b_key: 'b_val',
      },
    ),
    {
      a_key: [
        {
          k_key: '%%_k_val_%%',
          l_key: '%%_l_val_%%',
          m_key: [
            '%%_xxxx_%%',
            '%%_1111_%% %%_2222_%% %%_3333_%%',
            '%%_yyyy_%%',
            '%%_zzzz_%%',
          ],
        },
      ],
      b_key: '%%_b_val_%%',
    },
    '02.10',
  )
})

test('02.11 - deeper level - array within array VS. string', (t) => {
  t.deepEqual(
    ofr(
      {
        a_key: [
          'xxxx',
          ['1111', '2222', '3333'],
          'yyyy',
          'zzzz',
        ],
        b_key: 'b_val',
      },
      {
        a_key: 'a_val',
        b_key: 'b_val',
      },
    ),
    {
      a_key: '%%_xxxx_%%<br />%%_1111_%% %%_2222_%% %%_3333_%%<br />%%_yyyy_%%<br />%%_zzzz_%%',
      b_key: '%%_b_val_%%',
    },
    '02.11',
  )
})

test('02.12 - deeper level - array within array VS. string #2', (t) => {
  t.deepEqual(
    ofr(
      {
        a: [
          {
            k_key: 'k_val',
            l_key: [
              ['xxxx', 'yyyy', 'zzzz'],
              '222',
              '333',
              '444',
              '555',
            ],
            m_key: 'm_val',
          },
        ],
      },
      {
        a: [
          {
            k_key: 'k_val',
            l_key: 'l_val',
            m_key: 'm_val',
          },
        ],
      },
    ),
    {
      a: [
        {
          k_key: '%%_k_val_%%',
          l_key: '%%_xxxx_%% %%_yyyy_%% %%_zzzz_%%<br />%%_222_%%<br />%%_333_%%<br />%%_444_%%<br />%%_555_%%',
          m_key: '%%_m_val_%%',
        },
      ],
    },
    '02.12.01 - innermost array is first element',
  )
  t.deepEqual(
    ofr(
      {
        a: [
          {
            k_key: 'k_val',
            l_key: [
              '111',
              ['xxxx', 'yyyy', 'zzzz'],
              '222',
              '333',
              '444',
            ],
            m_key: 'm_val',
          },
        ],
      },
      {
        a: [
          {
            k_key: 'k_val',
            l_key: 'l_val',
            m_key: 'm_val',
          },
        ],
      },
    ),
    {
      a: [
        {
          k_key: '%%_k_val_%%',
          l_key: '%%_111_%%<br />%%_xxxx_%% %%_yyyy_%% %%_zzzz_%%<br />%%_222_%%<br />%%_333_%%<br />%%_444_%%',
          m_key: '%%_m_val_%%',
        },
      ],
    },
    '02.12.02 - innermost array is second element',
  )
})

test('02.13 - one ignore works on multiple keys', (t) => {
  t.deepEqual(
    ofr(
      {
        modules: [
          {
            part1: [
              {
                ccc: [
                  {
                    kkk: [
                      'm',
                      'n',
                      'o',
                      'p',
                    ],
                  },
                ],
                ddd: 'ddd_val1',
              },
            ],
            part2: [
              {
                ccc: [
                  {
                    kkk: [
                      'r',
                      's',
                      't',
                      'u',
                    ],
                  },
                ],
                ddd: 'ddd_val2',
              },
            ],
          },
        ],
      },
      {
        modules: [
          {
            part1: [
              {
                ccc: [
                  {
                    kkk: 'kkk_ref1',
                  },
                ],
                ddd: 'ddd_ref1',
              },
            ],
            part2: [
              {
                ccc: [
                  {
                    kkk: 'kkk_ref2',
                  },
                ],
                ddd: 'ddd_ref2',
              },
            ],
          },
        ],
      },
      {
        dontWrapPaths: ['modules[0].part2[0].ccc[0].kkk'],
        wrapHeadsWith: '{{ ',
        wrapTailsWith: ' }}',
        xhtml: true,
      },
    ),
    {
      modules: [
        {
          part1: [
            {
              ccc: [
                {
                  kkk: '{{ m }}<br />{{ n }}<br />{{ o }}<br />{{ p }}',
                },
              ],
              ddd: '{{ ddd_val1 }}',
            },
          ],
          part2: [
            {
              ccc: [
                {
                  kkk: 'r<br />s<br />t<br />u',
                },
              ],
              ddd: '{{ ddd_val2 }}',
            },
          ],
        },
      ],
    },
    '02.13.01',
  )
})

test('02.14 - opts.mergeWithoutTrailingBrIfLineContainsBr', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: [
          '{% if val1 %}{{ val1 }}<br />{% endif %}',
          '{% if val2 %}{{ val2 }}<br />{% endif %}',
          '{% if val3 %}{{ val3 }}{% endif %}',
        ],
      },
      {
        key1: 'Contact us',
      },
      {
        wrapGlobalFlipSwitch: false,
      },
    ),
    {
      key1: '{% if val1 %}{{ val1 }}<br />{% endif %}{% if val2 %}{{ val2 }}<br />{% endif %}{% if val3 %}{{ val3 }}{% endif %}',
    },
    '02.14.01 - default - BRs are detected and no additional BRs are added',
  )
  t.deepEqual(
    ofr(
      {
        key1: [
          '{% if val1 %}{{ val1 }}<br />{% endif %}',
          '{% if val2 %}{{ val2 }}<br />{% endif %}',
          '{% if val3 %}{{ val3 }}{% endif %}',
        ],
      },
      {
        key1: 'Contact us',
      },
      {
        wrapGlobalFlipSwitch: false,
        mergeWithoutTrailingBrIfLineContainsBr: true,
      },
    ),
    {
      key1: '{% if val1 %}{{ val1 }}<br />{% endif %}{% if val2 %}{{ val2 }}<br />{% endif %}{% if val3 %}{{ val3 }}{% endif %}',
    },
    '02.14.02 - hardcoded default - same as #01',
  )
  t.deepEqual(
    ofr(
      {
        key1: [
          '{% if val1 %}{{ val1 }}<br />{% endif %}',
          '{% if val2 %}{{ val2 }}<br />{% endif %}',
          '{% if val3 %}{{ val3 }}{% endif %}',
        ],
      },
      {
        key1: 'Contact us',
      },
      {
        wrapGlobalFlipSwitch: false,
        mergeWithoutTrailingBrIfLineContainsBr: false,
      },
    ),
    {
      key1: '{% if val1 %}{{ val1 }}<br />{% endif %}<br />{% if val2 %}{{ val2 }}<br />{% endif %}<br />{% if val3 %}{{ val3 }}{% endif %}',
    },
    '02.14.03 - off - will add excessive BRs',
  )

  // NOW COMBOS:

  t.deepEqual(
    ofr(
      {
        key1: [
          '{% if val1 %}{{ val1 }}<br />{% endif %}',
          '{% if val2 %}{{ val2 }}<br />{% endif %}',
          '{% if val3 %}{{ val3 }}{% endif %}',
        ],
      },
      {
        key1: 'Contact us',
      },
      {
        wrapGlobalFlipSwitch: false,
        xhtml: false,
        mergeWithoutTrailingBrIfLineContainsBr: false,
      },
    ),
    {
      key1: '{% if val1 %}{{ val1 }}<br />{% endif %}<br>{% if val2 %}{{ val2 }}<br />{% endif %}<br>{% if val3 %}{{ val3 }}{% endif %}',
    },
    '02.14.04 - xhtml = false',
  )
})

// -----------------------------------------------------------------------------
// 03. opts.ignore
// -----------------------------------------------------------------------------

test('03.01 - opts.ignore & wrapping function', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
    ),
    {
      key1: '%%_val11.val12_%%',
      key2: '%%_val21.val22_%%',
    },
    '03.01.01 - default behaviour',
  )
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        ignore: 'key1',
      },
    ),
    {
      key1: 'val11.val12',
      key2: '%%_val21.val22_%%',
    },
    '03.01.02 - does not wrap ignored string',
  )
  t.deepEqual(
    ofr(
      {
        key1: 'val11.val12',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        ignore: ['z', 'key1'],
      },
    ),
    {
      key1: 'val11.val12',
      key2: '%%_val21.val22_%%',
    },
    '03.01.03 - does not wrap ignored array',
  )
})

test('03.02 - flattens an array value but doesn\'t touch other one', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
    ),
    {
      key1: '%%_key2.val1_%%<br />%%_key2.val2_%%<br />%%_key2.val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '03.02.01',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
      },
    ),
    {
      key1: '%%_key2.val1_%%<br />%%_key2.val2_%%<br />%%_key2.val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '03.02.02',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        ignore: 'key1',
      },
    ),
    {
      key1: {
        key2: [
          'val1',
          'val2',
          'val3',
        ],
      },
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '03.02.03 - ignore affects key1, default wrapping',
  )
  t.deepEqual(
    ofr(
      {
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        ignore: 'key1',
      },
    ),
    {
      key1: {
        key2: [
          'val1',
          'val2',
          'val3',
        ],
      },
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '03.02.04 - ignore affects key1, custom wrapping',
  )
  t.deepEqual(
    ofr(
      {
        key0: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key1: {
          key2: [
            'val1',
            'val2',
            'val3',
          ],
        },
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        key1: 'Contact us',
        key0: 'Text',
        key3: {
          key4: [
            'val4',
            'val5',
            'val6',
          ],
        },
      },
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        ignore: 'key0',
      },
    ),
    {
      key0: {
        key2: [
          'val1',
          'val2',
          'val3',
        ],
      },
      key1: '%%_key2.val1_%%<br />%%_key2.val2_%%<br />%%_key2.val3_%%',
      key3: {
        key4: [
          '%%_val4_%%',
          '%%_val5_%%',
          '%%_val6_%%',
        ],
      },
    },
    '03.02.05 - some ignored, some flattened',
  )
})

// -----------------------------------------------------------------------------
// 04. opts.whatToDoWhenReferenceIsMissing
// -----------------------------------------------------------------------------

test('04.01 - opts.whatToDoWhenReferenceIsMissing', (t) => {
  t.deepEqual(
    ofr(
      {
        a: {
          c: 'd',
        },
        b: {
          e: 'f',
        },
      },
      {
        a: 'a',
      },
    ),
    {
      a: '%%_c.d_%%',
      b: {
        e: 'f',
      },
    },
    '04.01.01 - no opts - opt. 0 - skips',
  )
  t.deepEqual(
    ofr(
      {
        a: {
          c: 'd',
        },
        b: {
          e: 'f',
        },
      },
      {
        a: 'a',
      },
    ),
    {
      a: '%%_c.d_%%',
      b: {
        e: 'f',
      },
    },
    '04.01.02 - opts - opt. 0 hardcoded - skips (same as #01)',
  )
  t.throws(() => {
    ofr(
      {
        a: {
          c: 'd',
        },
        b: {
          e: 'f',
        },
      },
      {
        a: 'a',
      },
      {
        whatToDoWhenReferenceIsMissing: 1,
      },
    )
  })
  t.deepEqual(
    ofr(
      {
        a: {
          c: 'd',
        },
        b: {
          e: 'f',
        },
      },
      {
        a: 'a',
      },
      {
        whatToDoWhenReferenceIsMissing: 2,
      },
    ),
    {
      a: '%%_c.d_%%',
      b: '%%_e.f_%%',
    },
    '04.01.04 - opts - opt. 2 - flattens to string anyway + wraps if permitted',
  )
})

// -----------------------------------------------------------------------------
// 05. Other cases
// -----------------------------------------------------------------------------

test('05.01 - double-wrapping prevention when markers have white space', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: '%%_val11.val12_%%',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
    ),
    {
      key1: '%%_val11.val12_%%',
      key2: '%%_val21.val22_%%',
    },
    '05.01.01 - base',
  )
  t.deepEqual(
    ofr(
      {
        key1: '%%_val11.val12_%%', // << notice missing white space around markers
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '%%_ ', // << notice the white space around markers
        wrapTailsWith: ' _%%',
      },
    ),
    {
      key1: '%%_val11.val12_%%',
      key2: '%%_ val21.val22 _%%',
    },
    '05.01.02 - whitespace on default heads and tails, checking double wrapping prevention',
  )
  t.deepEqual(
    ofr(
      {
        key1: '{val11.val12}', // << notice missing white space around markers
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '{ ', // << notice the white space around markers
        wrapTailsWith: ' }',
      },
    ),
    {
      key1: '{val11.val12}', // << not { {val11.val12} }
      key2: '{ val21.val22 }',
    },
    '05.01.03 - whitespace on custom heads and tails, checking double wrapping prevention',
  )
})

test('05.02 - double-wrapping prevention from setting opts.preventWrappingIfContains', (t) => {
  t.deepEqual(
    ofr(
      {
        key1: '{% if some_module.some_special_value %}some text{% endif %}',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '{{ ',
        wrapTailsWith: ' }}',
      },
    ),
    {
      key1: '{{ {% if some_module.some_special_value %}some text{% endif %} }}',
      key2: '{{ val21.val22 }}',
    },
    '05.02.01 - default - double wrapping on key1 because {%...%} is not recognised',
  )
  t.deepEqual(
    ofr(
      {
        key1: '{% if some_module.some_special_value %}some text{% endif %}',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '{{ ',
        wrapTailsWith: ' }}',
        preventWrappingIfContains: '{%',
      },
    ),
    {
      key1: '{% if some_module.some_special_value %}some text{% endif %}',
      key2: '{{ val21.val22 }}',
    },
    '05.02.02 - opts.preventWrappingIfContains, value as string',
  )
  t.deepEqual(
    ofr(
      {
        key1: '{% if some_module.some_special_value %}some text{% endif %}',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '{{ ',
        wrapTailsWith: ' }}',
        preventWrappingIfContains: ['zzz', '{%'],
      },
    ),
    {
      key1: '{% if some_module.some_special_value %}some text{% endif %}',
      key2: '{{ val21.val22 }}',
    },
    '05.02.03 - opts.preventWrappingIfContains, value as array',
  )
  t.deepEqual(
    ofr(
      {
        key1: '{% if some_module.some_special_value %}some text{% endif %}',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '{{ ',
        wrapTailsWith: ' }}',
        preventWrappingIfContains: ['yyy', 'zzz'],
      },
    ),
    {
      key1: '{{ {% if some_module.some_special_value %}some text{% endif %} }}',
      key2: '{{ val21.val22 }}',
    },
    '05.02.04 - opts.preventWrappingIfContains contents don\'t match and thus string get double-wrapped',
  )
  t.deepEqual(
    ofr(
      {
        key1: '{% if some_module.some_special_value %}some text{% endif %}',
        key2: 'val21.val22',
      },
      {
        key1: 'Contact us',
        key2: 'Tel. 0123456789',
      },
      {
        wrapHeadsWith: '{{ ',
        wrapTailsWith: ' }}',
        preventWrappingIfContains: ['yyy', 'zzz'],
        wrapGlobalFlipSwitch: false,
      },
    ),
    {
      key1: '{% if some_module.some_special_value %}some text{% endif %}',
      key2: 'val21.val22',
    },
    '05.02.05 - opts.preventWrappingIfContains and opts.wrapGlobalFlipSwitch kill switch on',
  )
})

// -----------------------------------------------------------------------------
// 95. util.reclaimIntegerString
// -----------------------------------------------------------------------------

test('95.01 - util.reclaimIntegerString - does what it says on strings', (t) => {
  t.deepEqual(
    reclaimIntegerString('1'),
    1,
    '95.01.03',
  )
})

test('95.02 - util.reclaimIntegerString - doesn\'t parse non-integer strings', (t) => {
  t.deepEqual(
    reclaimIntegerString('1.1'),
    '1.1',
    '95.02',
  )
})

test('95.03 - util.reclaimIntegerString - doesn\'t parse non-number strings either', (t) => {
  t.deepEqual(
    reclaimIntegerString('zz'),
    'zz',
    '95.03',
  )
})

test('95.04 - util.reclaimIntegerString - doesn\'t parse booleans', (t) => {
  t.deepEqual(
    reclaimIntegerString(true),
    true,
    '95.04',
  )
})

// -----------------------------------------------------------------------------
// 96. util.arrayiffyString
// -----------------------------------------------------------------------------

test('96.01 - util.arrayiffyString - turns string into an array', (t) => {
  t.deepEqual(
    arrayiffyString('zzz'),
    ['zzz'],
    '96.01',
  )
})

test('96.02 - util.arrayiffyString - turns empty string into an empty array', (t) => {
  t.deepEqual(
    arrayiffyString(''),
    [],
    '96.02',
  )
})

test('96.03 - util.arrayiffyString - doesn\'t touch any other input types', (t) => {
  t.deepEqual(
    arrayiffyString(['a']),
    ['a'],
    '96.03.01',
  )
  t.deepEqual(
    arrayiffyString([]),
    [],
    '96.03.02',
  )
  t.deepEqual(
    arrayiffyString(1),
    1,
    '96.03.03',
  )
  t.deepEqual(
    arrayiffyString(null),
    null,
    '96.03.04',
  )
})

// -----------------------------------------------------------------------------
// 97. util.checkTypes
// -----------------------------------------------------------------------------

test('97.01 - util.checkTypes > missing both inputs - throws', (t) => {
  t.throws(() => {
    checkTypes()
  })
})

test('97.02 - util.checkTypes > key of wrong type', (t) => {
  t.throws(() => {
    checkTypes({ a: 'a' }, { a: false }, 'Error!', 'a')
  })
})

test('97.03 - util.checkTypes > key of wrong type', (t) => {
  t.throws(() => {
    checkTypes({ a: 'a', b: false }, { a: 'a', b: 'something' }, 'Error!', 'b')
  })
})

// -----------------------------------------------------------------------------
// 98. util.flattenObject
// -----------------------------------------------------------------------------

test('98.01 - util.flattenObject > empty input', (t) => {
  t.deepEqual(
    flattenObject(),
    [],
    '98.01.01',
  )
  t.deepEqual(
    flattenObject({}),
    [],
    '98.01.02',
  )
})

test('98.02 - util.flattenObject > simple object', (t) => {
  t.deepEqual(
    flattenObject(
      {
        a: 'b',
        c: 'd',
      },
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: '',
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
      },
    ),
    ['a.b', 'c.d'],
    '98.02',
  )
})

test('98.03 - util.flattenObject > nested objects', (t) => {
  t.deepEqual(
    flattenObject(
      {
        a: { b: 'c', d: 'e' },
        f: { g: 'h', e: 'j' },
      },
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
      },
    ),
    ['a.b.c', 'a.d.e', 'f.g.h', 'f.e.j'],
    '98.03',
  )
})

// -----------------------------------------------------------------------------
// 99. util.flattenArr
// -----------------------------------------------------------------------------

test('99.01 - util.flattenArr > empty input', (t) => {
  t.deepEqual(
    flattenArr(),
    '',
    '99.01',
  )
})

test('99.02 - util.flattenArr > simple array', (t) => {
  t.deepEqual(
    flattenArr(
      ['a', 'b', 'c'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
      },
      true,
    ),
    '%%_a_%% %%_b_%% %%_c_%%',
    '99.02.01',
  )
  t.deepEqual(
    flattenArr(
      ['a', 'b', 'c'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
      },
      false,
    ),
    'a b c',
    '99.02.02',
  )
})

test('99.03 - util.flattenArr + joinArraysUsingBrs', (t) => {
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: true,
      },
      true,
      false, // joinArraysUsingBrs
    ),
    '%%_a_%% %%_b,c,d_%% %%_e_%%',
    '99.03.01',
  )
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: true,
      },
      false,
      false, // joinArraysUsingBrs
    ),
    'a b,c,d e',
    '99.03.02',
  )
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: false,
      },
      true,
      false, // joinArraysUsingBrs
    ),
    '%%_a_%% %%_b,c,d_%% %%_e_%%',
    '99.03.03',
  )
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: false,
      },
      false,
      false, // joinArraysUsingBrs
    ),
    'a b,c,d e',
    '99.03.04',
  )

  // joinArraysUsingBrs = true
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: true,
      },
      true,
      true, // joinArraysUsingBrs
    ),
    '%%_a_%%<br />%%_b_%% %%_c_%% %%_d_%%<br />%%_e_%%',
    '99.03.05',
  )
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: true,
      },
      false,
      true, // joinArraysUsingBrs
    ),
    'a<br />b c d<br />e',
    '99.03.06',
  )
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: false,
      },
      true,
      true, // joinArraysUsingBrs
    ),
    '%%_a_%%%%_b_%% %%_c_%% %%_d_%%%%_e_%%',
    '99.03.07',
  )
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: true,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: false,
      },
      false,
      true, // joinArraysUsingBrs
    ),
    'ab c de',
    '99.03.08',
  )

  // HTML - no slashes
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: false,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: true,
      },
      true,
      true, // joinArraysUsingBrs
    ),
    '%%_a_%%<br>%%_b_%% %%_c_%% %%_d_%%<br>%%_e_%%',
    '99.03.09',
  )
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: false,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: true,
      },
      false,
      true, // joinArraysUsingBrs
    ),
    'a<br>b c d<br>e',
    '99.03.10',
  )
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: false,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: true,
      },
      true,
      false, // joinArraysUsingBrs
    ),
    '%%_a_%% %%_b,c,d_%% %%_e_%%',
    '99.03.11',
  )
  t.deepEqual(
    flattenArr(
      ['a', ['b', 'c', 'd'], 'e'],
      {
        wrapHeadsWith: '%%_',
        wrapTailsWith: '_%%',
        dontWrapKeys: [],
        xhtml: false,
        preventDoubleWrapping: true,
        objectKeyAndValueJoinChar: '.',
        mergeArraysWithLineBreaks: true,
      },
      false,
      false, // joinArraysUsingBrs
    ),
    'a b,c,d e',
    '99.03.12',
  )
})
