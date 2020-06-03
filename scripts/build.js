const path = require('path')
const spawn = require('child_process').spawn
const utils = require('./utils')
const webpack = require('webpack')

utils.logClear()

const tweego = path.resolve(utils.twineFolder, 'tweego')

// Extract extra arguments.
const [, , ...flags] = process.argv

const args = [
  '--output=./gh-pages/index.html',
  './src',
  '--head=./main.ejs',
  ...flags
]

// Run tweego with arguments.
utils.logAction('Running tweego!')
const tweegoProcess = spawn(tweego, args)

// Log messages from the tweego process.
tweegoProcess.stderr.on('data', data => {
  const messages = data.toString().split('\n')

  for (const message of messages) {
    if (message.match(/^warning:\s+.*/)) {
      utils.logWarning(message)
      return
    }

    if (message.match(/^error:\s+.*/)) {
      utils.logError(message)
      return
    }

    utils.logAction(message)
  }
})

const config = require('./webpack.config')

const watch = args.includes('--watch')
config.mode = watch ? 'development' : 'production'

const compiler = webpack(config)

utils.logAction('Running webpack!')
if (watch) {
  compiler.watch({}, (error, stats) => {
    if (error) {
      utils.logError(error)
      return
    }
    utils.logAction(`Built in ${stats.endTime - stats.startTime}ms.`)
  })
} else {
  compiler.run((error) => {
    if (error) {
      utils.logError(error)
    }
  })
}
