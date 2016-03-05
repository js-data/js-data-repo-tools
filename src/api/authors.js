var fs = require('fs')
var path = require('path')
var execSync = require('child_process').execSync
var tty = process.platform === 'win32' ? 'CON' : '/dev/tty'
var _ = require('lodash')
var fsOpts = { encoding: 'utf8' }

var DEFAULTS = {
  ignoreExisting: false,
  output: './AUTHORS',
  project: ''
}

/**
 * @name authors.normalizeOpts
 * @method
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.output=./AUTHORS] Path to output file.
 */
function normalizeOpts (opts) {
  opts || (opts = {})
  _.defaults(opts, DEFAULTS)
  opts.outputPath = path.resolve(opts.output)
  if (!opts.project) {
    var pkgPath = opts.package || path.join(process.cwd(), './package.json')
    if (fs.existsSync(pkgPath)) {
      var pkg = JSON.parse(fs.readFileSync(pkgPath, fsOpts))
      opts.project = pkg.name
    } else {
      throw new Error('Unknown project name: Could not find package.json and "project" was not provided!')
    }
  }
  return opts
}

/**
 * @name authors.caseInsensitiveSort
 * @method
 * @param {string[]} array Array to sort.
 * @return {string[]} Sorted array.
 */
function caseInsensitiveSort (array) {
  var mapped = array.map(function (el, i) {
    return {
      index: i,
      value: el.toLowerCase()
    }
  })

  mapped.sort(function (a, b) {
    return +(a.value > b.value) || +(a.value === b.value) - 1
  })

  return mapped.map(function (el) {
    return array[el.index]
  })
}

/**
 * @name authors.getExistingFile
 * @method
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.outputPath] Absolute path to output file.
 * @return {string} Existing AUTHORS file, if any.
 */
function getExistingFile (opts) {
  opts = normalizeOpts(opts)

  if (fs.existsSync(opts.outputPath)) {
    return fs.readFileSync(opts.outputPath, fsOpts)
  }
}

/**
 * @name authors.parseExistingFile
 * @method
 * @param {string} existingFile Existing AUTHORS file.
 * @return {Object} Parsed data.
 */
function parseExistingFile (existingFile) {
  if (!existingFile) {
    throw new Error('no existingFile provided!')
  }
  var header, names
  var index = existingFile.lastIndexOf('#')

  if (index !== -1) {
    index = existingFile.indexOf('\n', index)
    index++
    header = existingFile.substring(0, index)
    var namesText = existingFile.substring(index)
    names = namesText.split('\n').filter(function (line) {
      return line
    })
  }

  return {
    header: header || '',
    names: names || []
  }
}

/**
 * @name authors.getHeader
 * @method
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.project] Name of project.
 * @return {string} Header for new AUTHORS file.
 */
function getHeader (opts) {
  opts = normalizeOpts(opts)
  // TODO: Make template path configurable
  var headerTemplate = fs.readFileSync(path.join(__dirname, '../../templates/AUTHORS'), fsOpts)
  return headerTemplate.replace('{{project-name}}', opts.project)
}

/**
 * @name authors.getAuthorNames
 * @method
 */
function getAuthorNames () {
  var stdout = execSync('git shortlog -s -e < ' + tty).toString()
  var lines = stdout.split('\n')
  var countsAndNames = lines.map(function (line) {
    return line.split('\t')
  })
  return countsAndNames.map(function (pair) {
    return pair[1]
  }).filter(function (line) {
    return line
  })
}

/**
 * @name authors.writeOutFile
 * @method
 * @param {string} outFile File content to be written.
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.outputPath] Absolute path to output file.
 */
function writeOutFile (outFile, opts) {
  opts = normalizeOpts(opts)
  fs.writeFileSync(opts.outputPath, outFile, fsOpts)
}

/**
 * @name authors.execute
 * @method
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.ignoreExisting] Ignore any existing AUTHORS file.
 * @param {string} [opts.output] Path to output file.
 * @param {string} [opts.project] Name of project.
 */
function execute (opts) {
  opts = normalizeOpts(opts)

  var existingFile, header
  var existingNames = []

  existingFile = getExistingFile(opts)

  if (existingFile && !opts.ignoreExisting) {
    var existingData = parseExistingFile(existingFile)
    header = existingData.header
    existingNames = existingData.names
  }

  if (!header) {
    header = getHeader(opts)
  }
  if (header[header.length - 1] !== '\n') {
    header += '\n'
  }

  var names = getAuthorNames()
  var allNames = _.union(names, existingNames)
  allNames = caseInsensitiveSort(allNames)

  var outFile = header + allNames.join('\n')
  if (outFile[outFile.length - 1] !== '\n') {
    outFile += '\n'
  }

  writeOutFile(outFile, opts)
}

exports.normalizeOpts = normalizeOpts
exports.caseInsensitiveSort = caseInsensitiveSort
exports.getExistingFile = getExistingFile
exports.parseExistingFile = parseExistingFile
exports.getHeader = getHeader
exports.getAuthorNames = getAuthorNames
exports.writeOutFile = writeOutFile
exports.execute = execute
