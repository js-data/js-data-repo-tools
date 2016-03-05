var path = require('path')
var ncu = require('npm-check-updates')

/**
 * @name updates.normalizeOpts
 * @method
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.package] Path to package.json file.
 */
function normalizeOpts (opts) {
  opts || (opts = {})
  opts.pkgPath = opts.package || path.join(process.cwd(), './package.json')
  return opts
}

/**
 * @name updates.execute
 * @method
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.package] Path to package.json file.
 */
function execute (opts) {
  opts = normalizeOpts(opts)
  return ncu.run({
    packageFile: opts.pkgPath,
    errorLevel: 2
  }).then(function (upgraded) {
    if (Object.keys(upgraded).length !== 0) {
      throw new Error('Dependencies that need upgrading: ' + JSON.stringify(upgraded, null, 2))
    }
  })
}

exports.normalizeOpts = normalizeOpts
exports.execute = execute
