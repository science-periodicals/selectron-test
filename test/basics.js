
/* eslint import/no-extraneous-dependencies: 0 */
let assert = require('assert')
  , makeSelectron = require('..')
  , dom = require('get-dom')
  , doc
  , selectron
;

before('preparing document', () => {
  doc = dom.document();
  doc.body.innerHTML = `
    <article>
      <h1 data-selectron>Title</h1>
      <p>
        §1
      </p>
      <p id="target" class="bar">
        §2
      </p>
      <section>
        <h2>This  matches</h2>
      </section>
      <section>
        <h2>This does not match</h2>
      </section>
    </article>
  `;
  selectron = makeSelectron(doc);
});
describe('Selectron', () => {
  it('tests existence', () => {
    selectron('[data-selectron]');
    assert.throws(
      () => selectron('[data-not-exists]'),
      'no existence'
    );
  });
  it('tests non-existence', () => {
    selectron('.comment-start, .comment-end, .insertion, .deletion', false);
    assert.throws(
      () => selectron('article', false),
      'yes existence'
    );
  });
  it('tests counts', () => {
    selectron('p', 2);
    assert.throws(
      () => selectron('article', 3),
      'bad count'
    );
  });
  it('tests text content', () => {
    selectron('section > h2', 'This  matches');
    assert.throws(
      () => selectron('section > h2', 'This does not match'),
      'bad text matching'
    );
  });
  it('tests attributes', () => {
    selectron('#target', { class: 'bar' });
    assert.throws(
      () => selectron('#target', { class: 'foo' }),
      'bad attributes'
    );
  });
});
