
let assert = require('assert');

module.exports = function makeSelectron (ctx) {
  return (css, value) => {
    // existence check
    if (typeof value === 'undefined' || value === true) {
      assert(ctx.querySelector(css), `'${css}' exists`);
    }
    // non-existence check
    else if (value === false) {
      assert(!ctx.querySelector(css), `'${css}' does not exist`);
    }
    else if (typeof value === 'number') {
      assert.equal(ctx.querySelectorAll(css).length, value, `'${css}' has ${value} instances`);
    }
    else if (typeof value === 'string') {
      let res = ctx.querySelector(css);
      assert(res, `${css} exists for text matching`);
      assert.equal(res.textContent, value, `'${css}' equals ${value} in text`);
    }
    else if (typeof value === 'object') {
      let res = ctx.querySelectorAll(css);
      assert(res.length, `${css} exists for attribute matching`);
      Array.from(res).forEach(el => {
        Object.keys(value).forEach(k => {
          assert.equal(
            el.getAttribute(k),
            value[k],
            `${css} has attribute ${k} with value ${value[k]}`
          );
        });
      });
    }
    else assert(false, `Unknown value type for '${value}'`);
  };
};
