const fs = require('fs-extra')
const path = require('path')
const shell = require('shelljs')
const globby = require('globby')
const chalk = require('chalk')
const toposort = require('toposort')

function sortPackages(packages /* path: string, info: PackageJSON */) {
    const names = packages.map((p) => p.info.name)
    const graph = packages
        .map((p) =>
            Object.keys(p.info.dependencies)
                .filter((dep) => names.includes(dep))
                .map((dep) => [p.info.name, dep]),
        )
        .flat()

    const sortedNames = toposort.array(names, graph).reverse()

    packages.sort((p1, p2) => sortedNames.indexOf(p1.info.name) - sortedNames.indexOf(p2.info.name))
}

/**
 * 返回一个执行函数，当该函数被调用时，将遍历所有包，并为每个包执行回调函数
 */
function createPackagesIterator(options) {
    function each() {
        const packagePaths = globby.sync('./packages/*', { onlyFiles: false, absolute: true })
        const packages = packagePaths
            .filter((packagePath) => fs.pathExistsSync(packagePath))
            .map((packagePath) => ({
                path: packagePath,
                info: fs.readJsonSync(path.join(packagePath, 'package.json')),
            }))

        sortPackages(packages)

        if (options.before && options.before(packages) === false) {
            return
        }

        for (const package of packages) {
            // 目前为止，私有包仅有 website 一个，其构建单独处理，因此这里过滤掉即可
            if (package.info.private) {
                continue
            }

            options.each(package)
        }

        options.after && options.after(packages)
    }

    Object.assign(each, options)

    return each
}

/**
 * 遍历每个包（非私有的）
 */
const eachPackages = (options) =>
    createPackagesIterator(typeof options === 'function' ? { each: options } : options)()

/**
 * 在每个包中执行一下 gulp 构建
 */
const buildPackages = createPackagesIterator({
    each(package) {
        const gulpfilePath = path.join(__dirname, 'gulpfile.js')
        const command = `npx gulp --gulpfile '${gulpfilePath}' --cwd '${package.path}'`

        console.log(chalk.blue(package.path))
        console.log(chalk.gray(command))

        shell.exec(command)
    },
})

/**
 * 将所有包发布到本地的 yalc 中
 */
const yalcPackages = createPackagesIterator({
    before() {
        if (!shell.which('yalc')) {
            console.log(chalk.red('请安装 yalc'))
        }
    },
    each(package) {
        buildPackages.each(package)

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
