const path = require('path')
const globby = require('globby')
const del = require('del')
const shell = require('shelljs')

async function run() {
    shell.exec('lerna clean -y')
    const packages = await globby('./packages/*', { onlyFiles: false })
    for (package of packages) {
        console.log(`delete ${package}...`)
        await del([path.join(package, 'node_modules'), path.join(package, 'yarn.lock')])
    }
    console.log('delete root...')
    await del(['./node_modules', 'yarn.lock'])
    console.log('please run: yarn && lerna bootstrap');
}

run()
