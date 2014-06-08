
# Shorthands

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
