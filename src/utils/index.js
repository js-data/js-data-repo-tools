var fs = require('fs')
var fsOpts = { encoding: 'utf8' }

/**
 * @name utils.getFile
 * @method
 * @param {string} filePath Path to file.
 */
exports.getFile = function getFile (filePath) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, fsOpts)
  }
}

/**
 * @name utils.writeFile
 * @method
 * @param {string} filePath Path to file.
 */
exports.writeFile = function writeFile (filePath, content) {
  return fs.writeFileSync(filePath, content, fsOpts)
}
