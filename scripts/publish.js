const path = require('path')
const globby = require('globby')
const shell = require('shelljs')
const chalk = require('chalk')

;(async () => {
    const packagePaths = await globby('./packages/*', { onlyFiles: false, absolute: true })

    for (packagePath of packagePaths) {
        const gulpfilePath = path.join(__dirname, 'gulpfile.js')
        const command = `npx gulp --gulpfile '${gulpfilePath}' --cwd '${packagePath}'`
        console.log(chalk.blue(packagePath))
        console.log(chalk.gray(command))
        shell.exec(command)
    }
})()
