const path = require('path')
const del = require('del')
const { eachPackages } = require('./utils')

eachPackages((package) => {
    // 删除 dist 目录
    del([path.join(package.path, 'dist')])
})
