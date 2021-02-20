const path = require('path')
const fs = require('fs-extra')
const del = require('del')
const { eachPackages, buildPackages } = require('./utils')

eachPackages((package) => {
    // 还原 package.json 中的 main 及 module 配置
    const filePath = path.join(package.path, 'package.json')

    const publishingInfo = { ...package.info }
    publishingInfo.main = 'lib/index.ts'
    publishingInfo.module = 'lib/index.ts'

    fs.writeJSONSync(filePath, publishingInfo, { spaces: 4 })

    // 删除 publish 目录
    del([path.join(package.path, 'publish')])
})
