
var debug = require('debug')('normalize-shorthands')
var is = require('path-is')

module.exports = function (remotes) {
  return function shorthand(uri) {
    if (is.url(uri)) return null
    if (is.data(uri)) return null
    if (is.absolute(uri)) return null
    if (/^\.+\//.test(uri)) return null

    var m
    var remote
    var user
    var project
    var version
    var file

    if (m = /^(?:npm\:)?([\w-.]+)(?:@([^\/]+))/.exec(uri)) {
      debug('got npm shorthand for: %s', uri)
      // (npm:)project@version
      // npm: here is optional
      remote = remotes.npm
      project = m[1]
      version = m[2]
      uri = uri.replace(m[0], '')
    } else if (m = /^(?:npm\:)?(?:@([\w-]+))\/([\w-.]+)(?:@([^\/]+))?/.exec(uri)) {
      debug('got npm org shorthand for: %s', uri)
      // (npm:)@org/project@version
      // npm: here is optional
      remote = remotes.npm
      user = m[1]
      project = m[2]
      version = m[3]
      uri = uri.replace(m[0], '')
    } else if (m = /^([\w-]+)\/([\w-.]+)@([^/]+)/.exec(uri)) {
      debug('got github shorthand for: %s', uri)
      // user/project@version, defaulting to github
      // the @ is required here to make things unambiguous
      remote = remotes.github
      user = m[1]
      project = m[2]
      version = m[3]
      uri = uri.replace(m[0], '')
    } else if (m = /^(\w+)\:/.exec(uri)) {
      debug('defaulting to regular resolution for: %s', uri)
      // from now on, <shorthand>: is required
      remote = getByShorthand(m[1])
      if (!remote) {
        debug('could not resolve remote for: %s', uri)
        return null
      }

      // remove remote shorthand
      uri = uri.replace(m[0], '')

      if (remote.namespace !== false) {
        if (m = /^([\w-]+)\/([\w-.]+)(?:@([^\/]+))?/.exec(uri)) {
          user = m[1]
          project = m[2]
          version = m[3]
          uri = uri.replace(m[0], '')
        } else {
          debug('could not resolve %s:user/project@version for: %s', remote.name, uri)
          return null
        }
      } else {
        if (m = /^([\w-.]+)(?:@([^\/]+))?/.exec(uri)) {
          project = m[1]
          version = m[2]
          uri = uri.replace(m[0], '')
        } else {
          debug('could not resolve %s:project@version for: %s', remote.name, uri)
          return null
        }
      }
    } else {
      debug('could not resolve shorthand: %s', uri)
      return null
    }

    // by this time, everything but the filename should be stripped
    if (file = uri.replace(/^\//, '')) {
      // index.js support
      if (file.slice(-1) === '/') file += 'index.js'
      // must always be a .js file!
      if (!/\.js$/.test(file)) file += '.js'
    }

    return 'https://' + remotes.hostname
      + '/' + remote.name
      + '/' + (user || '-')
      + '/' + project
      + '/' + (version || '*')
      + '/' + (file || 'index.js')
  }

  function getByShorthand(str) {
    var names = remotes.names
    for (var i = 0; i < names.length; i++) {
      var remote = remotes[names[i]]
      if (~remote.aliases.indexOf(str)) return remote
    }
  }
}
