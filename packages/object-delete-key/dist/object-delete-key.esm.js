import { find, get, drop, del } from 'ast-monkey';
import isEmpty from 'ast-is-empty';
import clone from 'lodash.clonedeep';
import checkTypes from 'check-types-mini';
import validateTheOnly from 'util-array-object-or-both';

// ---------------------------------------------------------------------
// MAIN:

function deleteKey(originalInput, originalOpts) {
  function existy(x) {
    return x != null;
  }
  if (!existy(originalInput)) {
    throw new Error('object-delete-key/deleteKey(): [THROW_ID_01] Please provide the first argument, something to work upon.');
  }
  if (arguments.length > 2) {
    throw new Error('object-delete-key/deleteKey(): [THROW_ID_02] Third argument detected! Computer does not like this...');
  }
  var defaults = {
    key: null,
    val: undefined,
    cleanup: true,
    only: 'any'
  };
  var opts = Object.assign({}, defaults, originalOpts);
  checkTypes(opts, defaults, {
    msg: 'object-delete-key/deleteKey(): [THROW_ID_00*]',
    ignoreKeys: 'val',
    schema: {
      key: ['null', 'string'],
      val: 'whatever'
    }
  });
  opts.only = validateTheOnly(opts.only, {
    msg: 'object-delete-key/deleteKey(): [THROW_ID_03]',
    optsVarName: 'opts.only'
  });
  // after this, opts.only is equal to either: 1) object, 2) array OR 3) any

  if (!existy(opts.key) && !existy(opts.val)) {
    throw new Error('object-delete-key/deleteKey(): [THROW_ID_04] Please provide at least a key or a value.');
  }
  var input = clone(originalInput);

  if (opts.cleanup) {
    var findings = find(input, { key: opts.key, val: opts.val, only: opts.only });
    var currentIndex = void 0;
    var nodeToDelete = void 0;
    while (findings) {
      nodeToDelete = findings[0].index;
      for (var i = 1, len = findings[0].path.length; i < len; i++) {
        currentIndex = findings[0].path[len - 1 - i];
        if (isEmpty(del(get(input, { index: currentIndex }), { key: opts.key, val: opts.val, only: opts.only }))) {
          nodeToDelete = currentIndex;
        }
      }
      input = drop(input, { index: nodeToDelete });
      findings = find(input, { key: opts.key, val: opts.val, only: opts.only });
    }
    return input;
  }
  return del(input, { key: opts.key, val: opts.val, only: opts.only });
}

export default deleteKey;
