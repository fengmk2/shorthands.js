
# Shorthands

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Shorthands for Normalize URLs.
Instead of writing insanely long URLs everywhere,
write shorthands and add some logic to resolve the URLs.

For more information, see http://normalize.github.io/docs.html#shorthands

## API

```js
var shorthand = require('normalize-shorthands')(remotes)
```

`remotes` is either `require('normalize-proxy/lib/remotes')` or `GET https://nlz.io/proxy.json`.

### var URL = shorthand(string)

Pass a string to `shorthand` and it will return an absolute URL against
the `remotes` if it could resolve the shorthand or `null` otherwise.

[npm-image]: https://img.shields.io/npm/v/normalize-shorthands.svg?style=flat-square
[npm-url]: https://npmjs.org/package/normalize-shorthands
[github-tag]: http://img.shields.io/github/tag/normalize/shorthands.js.svg?style=flat-square
[github-url]: https://github.com/normalize/shorthands.js/tags
[travis-image]: https://img.shields.io/travis/normalize/shorthands.js.svg?style=flat-square
[travis-url]: https://travis-ci.org/normalize/shorthands.js
[coveralls-image]: https://img.shields.io/coveralls/normalize/shorthands.js.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/normalize/shorthands.js?branch=master
[david-image]: http://img.shields.io/david/normalize/shorthands.js.svg?style=flat-square
[david-url]: https://david-dm.org/normalize/shorthands.js
[license-image]: http://img.shields.io/npm/l/normalize-shorthands.svg?style=flat-square
[license-url]: LICENSE.md
[downloads-image]: http://img.shields.io/npm/dm/normalize-shorthands.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/normalize-shorthands
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat-square
[gittip-url]: https://www.gittip.com/jonathanong/
