var commander = require('commander')
var repoTools = new commander.Command('repo-tools')
var pkg = require('../../package.json')
var api = require('../api')

function handleError (err) {
  if (err && err.message) {
    console.log(err.message)
  } else if (err) {
    console.log(err)
  } else {
    console.log('unknown error')
  }
  process.exit(-1)
}

repoTools
  .version(pkg.version)
  .usage('<cmd> [options]')

repoTools
  .command('authors')
  .description('Write an AUTHORS file.')
  .option('-o, --output [path]', 'Path to output file')
  .option('-i, --ignore-existing', 'Ignore any existing AUTHORS file.')
  .option('-p, --project [project]', 'Name of project')
  .option('-j, --package [package]', 'Path to package.json file')
  .action(function (cmd) {
    try {
      api.authors.execute({
        output: cmd.output,
        project: cmd.project,
        ignoreExisting: !!cmd.ignoreExisting
      })
    } catch (err) {
      handleError(err)
    }
  })

repoTools
  .command('updates')
  .description('Check for packages that need an update.')
  .option('-j, --package [package]', 'Path to package.json file')
  .action(function (cmd) {
    try {
      api.updates.execute({
        package: cmd.package
      }).catch(function (err) {
        handleError(err)
      })
    } catch (err) {
      handleError(err)
    }
  })

repoTools
  .command('changelog')
  .description('Check that CHANGELOG has an entry for current version.')
  .option('-j, --package [package]', 'Path to package.json file')
  .option('-c, --changelog [changelog]', 'Path to CHANGELOG.md file')
  .action(function (cmd) {
    try {
      api.changelog.execute({
        package: cmd.package,
        changelog: cmd.changelog
      })
    } catch (err) {
      handleError(err)
    }
  })

repoTools
  .command('lint [files...]')
  .description('Lint specified files.')
  .action(function (files, cmd) {
    try {
      api.lint.execute({
        files: files
      }).catch(function (err) {
        handleError(err)
      })
    } catch (err) {
      handleError(err)
    }
  })

module.exports = repoTools
