var path = require('path')
var utils = require('../utils')

/**
 * @name changelog.normalizeOpts
 * @method
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.package] Path to package.json file.
 * @param {string} [opts.changelog] Path to CHANGELOG.md file.
 */
function normalizeOpts (opts) {
  opts || (opts = {})
  opts.pkgPath = opts.package || path.join(process.cwd(), './package.json')
  opts.changelogPath = opts.changelog || path.join(process.cwd(), './CHANGELOG.md')
  return opts
}

/**
 * @name changelog.execute
 * @method
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.ignoreExisting] Ignore any existing AUTHORS file.
 * @param {string} [opts.output] Path to output file.
 * @param {string} [opts.project] Name of project.
 */
function execute (opts) {
  opts = normalizeOpts(opts)

  var pkg = utils.getFile(opts.pkgPath)
  var changelog = utils.getFile(opts.changelogPath)

  if (!pkg) {
    throw new Error(opts.pkgPath, 'file not found or unreadable!')
  }

  pkg = JSON.parse(pkg)

  if (!changelog) {
    throw new Error(opts.changelogPath, 'file not found or unreadable!')
  }

  if (changelog.indexOf(pkg.version) === -1) {
    throw new Error('CHANGELOG missing entry for ' + pkg.version)
  }
}

exports.normalizeOpts = normalizeOpts
exports.execute = execute
