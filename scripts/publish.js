const fs = require('fs-extra')
const path = require('path')
const { eachPackages, buildPackages } = require('./utils')

let restorePackages = []

eachPackages((package) => {
    const filePath = path.join(package.path, 'package.json')

    const publishingInfo = { ...package.info }
    publishingInfo.main = 'publish/index.js'
    publishingInfo.module = 'publish/index.js'

    fs.writeJSONSync(filePath, publishingInfo, { spaces: 4 })

    restorePackages.push(() => {
        fs.writeJSONSync(filePath, package.info, { spaces: 4 })
    })
})

buildPackages()

restorePackages.forEach((restore) => restore())
restorePackages = []

process.on('exit', () => {
    restorePackages.forEach((restore) => restore())
})
