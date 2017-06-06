
# selectron-test

This modules exposes simple assertions against HTML structures based on CSS selectors. It is
primarily useful if you wish to run numerous tests against an HTML document.

## Example

```js
let makeSelectron = require('selectron-test')
  , doc = getHTMLDocumentSomehow()
  , selectron = makeSelectron(doc)
;

// there is at least one element with a data-selectron attribute
selectron('[data-selectron]');

// there are exactly two p elements that are direct children of a header element
selectron('header > p', 2);

// the first p of the first header has text content exactly matching this sentence
selectron('header > p:first-of-type', 'I really think they are');

// there is no element with any of these classes
selectron('.comment-start, .comment-end, .insertion, .deletion', false);

// the last section in the article has an id attribute with value "conclusion"
selectron('article > section:last-of-type', { id: 'conclusion' });
```

## API

The module exports a single `makeSelectron(doc)` function. It takes an HTML document or HTML element
node that will serve as the context for the testing. This returns a `selectron(css, value)` function
that can then be used to run as many tests as desired agains that specific context.

There are five ways of running a test against the context using the generated function:

* With no `value`: this just tests that the `css` selector matches something.
* With `value` being exactly `false`: tests non-existence of `css`.
* With a numeric `value`: will look for all nodes that match the selector and pass if the total
  number is the provided one.
* With a string `value`: will find the ***first*** element that matches the `css`, take its text
  content, and if that exactly matches the given string it passes.
* With `value` being an object: tests that there is a match and that it has attributes matching the
  key/value pairs in the object.
