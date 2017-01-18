var utils = require('../utils')
var path = require('path')

/**
 * @name version.normalizeOpts
 * @method
 * @param {Object} [opts] Configuration options.
 */
function normalizeOpts (opts) {
  opts || (opts = {})
  opts.files || (opts.files = [])
  opts.pkgPath = opts.package || path.join(process.cwd(), './package.json')
  return opts
}

function makeVersion (pkg) {
  var parts = pkg.version.split('-')
  var numbers = parts[0].split('.')

  var obj = '{\n'

  if (pkg.version.indexOf('alpha') !== -1) {
    obj += '  alpha: ' + parts[1].replace('alpha.', '') + (parts.length > 2 ? '-' + parts[2] : '') + ',\n'
  }

  if (pkg.version.indexOf('beta') !== -1) {
    obj += '  beta: ' + parts[1].replace('beta.', '') + (parts.length > 2 ? '-' + parts[2] : '') + ',\n'
  }

  obj += '  full: \'' + pkg.version + '\',\n'
  obj += '  major: ' + parseInt(numbers[0], 10) + ',\n'
  obj += '  minor: ' + parseInt(numbers[1], 10) + ',\n'
  obj += '  patch: ' + parseInt(numbers[2], 10) + '\n'
  obj += '}'

  return obj
}

/**
 * @name version.execute
 * @method
 */
function execute (opts) {
  opts = normalizeOpts(opts)

  var pkg = JSON.parse(utils.getFile(opts.pkgPath))
  var versionObj = makeVersion(pkg)

  opts.files.forEach(function (filePath) {
    var file = utils.getFile(filePath)
    if (file) {
      file = file.replace('\'<%= version %>\'', versionObj)
      utils.writeFile(filePath, file)
    }
  })
}

exports.normalizeOpts = normalizeOpts
exports.execute = execute
