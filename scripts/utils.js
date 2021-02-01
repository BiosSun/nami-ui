const fs = require('fs-extra')
const path = require('path')
const shell = require('shelljs')
const globby = require('globby')
const chalk = require('chalk')

/**
 * 返回一个执行函数，当该函数被调用时，将遍历所有包，并为每个包执行回调函数
 */
function eachPackages(options) {
    async function each() {
        const packagePaths = await globby('./packages/*', { onlyFiles: false, absolute: true })
        const packages = packagePaths.map((packagePath) => ({
            path: packagePath,
            info: fs.readJsonSync(path.join(packagePath, 'package.json')),
        }))

        if (options.before && (await options.before(packages)) === false) {
            return
        }

        for (package of packages) {
            // 目前为止，私有包仅有 website 一个，其构建单独处理，因此这里过滤掉即可
            if (package.info.private) {
                continue
            }

            console.log(chalk.blue(package.path))
            await options.each(package)
        }

        options.after && (await options.after(packages))
    }

    Object.assign(each, options)

    return each
}

/**
 * 在每个包中执行一下 gulp 构建
 */
const buildPackages = eachPackages({
    each(package) {
        const gulpfilePath = path.join(__dirname, 'gulpfile.js')
        const command = `npx gulp --gulpfile '${gulpfilePath}' --cwd '${package.path}'`
        console.log(chalk.gray(command))
        shell.exec(command)
    },
})

/**
 * 将所有包发布到本地的 yalc 中
 */
const yalcPackages = eachPackages({
    before() {
        if (!shell.which('yalc')) {
            console.log(chalk.red('请安装 yalc'))
        }
    },
    async each(package) {
        await buildPackages.each(package)

        const command = `yalc publish`
        console.log(chalk.gray(command))

        const prevDir = shell.pwd()
        shell.cd(package.path)
        shell.exec(command)
        shell.cd(prevDir)
    },
    after(packages) {
        const names = packages.map(({ info }) => info.name).join(' ')
        console.log(chalk.green(`\n\nyalc add ${names}\n\n`))
    },
})

module.exports = {
    eachPackages,
    buildPackages,
    yalcPackages,
}
