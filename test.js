
var assert = require('assert')
var remotes = require('normalize-proxy/lib/remotes')

var shorthand = require('./')(remotes)

var npm = remotes.npm
var gh = remotes.github

// shorthand -> longhand
;[
  // npm shorthands
  ['emitter@1', '/npm/-/emitter/1/index.js'],
  ['emitter@1/', '/npm/-/emitter/1/index.js'],
  ['emitter@1/something.js', '/npm/-/emitter/1/something.js'],

  // npm org shorthands
  ['@jong/emitter', '/npm/jong/emitter/*/index.js'],
  ['@jong/emitter/', '/npm/jong/emitter/*/index.js'],
  ['@jong/emitter/something.js', '/npm/jong/emitter/*/something.js'],
  ['npm:@jong/emitter/something.js', '/npm/jong/emitter/*/something.js'],
  ['@jong/emitter@*', '/npm/jong/emitter/*/index.js'],
  ['npm:@jong/emitter', '/npm/jong/emitter/*/index.js'],
  ['@jong/emitter@2.0.0', '/npm/jong/emitter/2.0.0/index.js'],
  ['@jong/emitter@2.0.0/something.js', '/npm/jong/emitter/2.0.0/something.js'],
  ['npm:@jong/emitter@2.0.0/something.js', '/npm/jong/emitter/2.0.0/something.js'],
  ['@jong/emitter/something.js', '/npm/jong/emitter/*/something.js'],
  ['npm:@jong/emitter/something.js', '/npm/jong/emitter/*/something.js'],

  // github shorthands
  ['jong/emitter@1', '/github/jong/emitter/1/index.js'],
  ['jong/emitter.js@1', '/github/jong/emitter.js/1/index.js'],
  ['jong/emitter-asdf@1', '/github/jong/emitter-asdf/1/index.js'],
  ['jong/emitter@1/', '/github/jong/emitter/1/index.js'],
  ['jong/emitter@1/something.js', '/github/jong/emitter/1/something.js'],

  // namespaced remote shorthands
  ['gh:jong/emitter', '/github/jong/emitter/*/index.js'],
  ['gh:jong/emitter/', '/github/jong/emitter/*/index.js'],
  ['gh:jong/emitter/something.js', '/github/jong/emitter/*/something.js'],
  ['gh:jong/emitter@1', '/github/jong/emitter/1/index.js'],
  ['github:jong/emitter@1', '/github/jong/emitter/1/index.js'],

  // unnamespaced remote shorthands
  ['npm:emitter', '/npm/-/emitter/*/index.js'],
  ['npm:emitter@1', '/npm/-/emitter/1/index.js'],
  ['npm:emitter@1/', '/npm/-/emitter/1/index.js'],
  ['npm:emitter@1/something.js', '/npm/-/emitter/1/something.js'],

  // filename simplifications
  ['gh:jong/emitter/lib/', '/github/jong/emitter/*/lib/index.js'],
  ['gh:jong/emitter/lib/file', '/github/jong/emitter/*/lib/file.js'],
].forEach(function (pair) {
  assert.equal(
    shorthand(pair[0]),
    'https://nlz.io' + pair[1],
    pair[0] + ' !== ' + pair[1] + ', got ' + shorthand(pair[0]))
})

// fragments -> shorthand
;[
  // npm
  [[npm, '-', 'emitter', '*'], 'emitter@*'],
  [[npm, '-', 'emitter', '*', 'index.js'], 'emitter@*'],
  [[npm, '-', 'emitter', '1'], 'emitter@1'],
  [[npm, '-', 'emitter', '1', 'index.js'], 'emitter@1'],

  // github
  [[gh, 'component', 'emitter', '*'], 'component/emitter@*'],
  [[gh, 'component', 'emitter', '1'], 'component/emitter@1'],

  // filename simplification
  [[gh, 'component', 'emitter', '1', 'file.js'], 'component/emitter@1/file'],
  [[gh, 'component', 'emitter', '1', 'lib/index.js'], 'component/emitter@1/lib/'],
].forEach(function (pair) {
  assert.equal(
    shorthand.js.apply(null, pair[0]),
    pair[1]
  )
})

// other extensions
assert.equal(
  shorthand('component/emitter@1', 'css'),
  'https://nlz.io/github/component/emitter/1/index.css')
assert.equal(
  shorthand('component/emitter@1/', 'css'),
  'https://nlz.io/github/component/emitter/1/index.css')
assert.equal(
  shorthand('component/emitter@1/index', 'css'),
  'https://nlz.io/github/component/emitter/1/index.css')

console.log('All tests pass!')
