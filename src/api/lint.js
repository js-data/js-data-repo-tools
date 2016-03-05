var standard = require('standard')
var Promise = require('bluebird')

/**
 * @name updates.normalizeOpts
 * @method
 * @param {Object} [opts] Configuration options.
 */
function normalizeOpts (opts) {
  opts || (opts = {})
  opts.files || (opts.files = [])
  if (!opts.files.length) {
    opts.files.push('src/index.js')
  }
  return opts
}

/**
 * @name changelog.execute
 * @method
 */
function execute (opts) {
  opts = normalizeOpts(opts)
  return new Promise(function (resolve, reject) {
    standard.lintFiles(opts.files, function (err, results) {
      if (err) {
        return reject(err)
      }
      if (results && results.errorCount) {
        var errMessage = 'standard: Use JavaScript Standard Style (http://standardjs.com)\n'
        results.results.forEach(function (result) {
          result.messages.forEach(function (message) {
            errMessage += '  '
            errMessage += result.filePath
            errMessage += ':'
            errMessage += message.line
            errMessage += ':'
            errMessage += message.column
            errMessage += ' '
            errMessage += message.message
            errMessage += '\n'
          })
        })
        return reject(errMessage)
      }
      resolve()
    })
  })
}

exports.normalizeOpts = normalizeOpts
exports.execute = execute
