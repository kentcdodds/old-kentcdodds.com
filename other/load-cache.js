const {execSync} = require('child_process')
const path = require('path')

const {ensureDir} = require(`fs-extra`)

async function go() {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }

  const netlifyCacheDir = path.resolve(
    process.env.NETLIFY_BUILD_BASE,
    `cache/gatsby/public/static`,
  )

  console.log('Loading public/static from netlify cache')

  const publicStatic = path.resolve(
    process.env.NETLIFY_BUILD_BASE,
    `repo/public`,
  )

  await ensureDir(netlifyCacheDir)
  await ensureDir(publicStatic)

  execSync(`cp -r "${netlifyCacheDir}" "${publicStatic}"`, {stdio: 'inherit'})
  const result = execSync(`find "${publicStatic}" -type f | wc -l`)
  console.log(`cache loaded. Total files: ${String(result).trim()}`)
}

go()

/* eslint no-console:0 */
