
var assert = require('assert')

var shorthand = require('./')(require('normalize-proxy/lib/remotes'))

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

console.log('All tests pass!')
