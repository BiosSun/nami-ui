const path = require('path')
const globby = require('globby')
const del = require('del')
const shell = require('shelljs')

async function run() {
    shell.exec('lerna clean -y')
    const packages = await globby('./packages/*', { onlyFiles: false })
    for (const p of packages) {
        console.log(`delete ${p}...`)
        await del([path.join(p, 'node_modules'), path.join(p, 'yarn.lock')])
    }
    console.log('delete root...')
    await del(['./node_modules', 'yarn.lock'])
    console.log('please run: yarn && lerna bootstrap')
}

run()
