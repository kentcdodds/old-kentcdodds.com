const {execSync} = require('child_process')
const path = require('path')

const {ensureDir} = require(`fs-extra`)

async function go() {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }

  const netlifyCacheDir = path.resolve(
    process.env.NETLIFY_BUILD_BASE,
    `cache/gatsby/public`,
  )

  console.log('Saving public/static into netlify cache')

  const publicStatic = path.resolve(
    process.env.NETLIFY_BUILD_BASE,
    `repo/public/static`,
  )

  await ensureDir(netlifyCacheDir)
  await ensureDir(publicStatic)

  execSync(`cp -r "${publicStatic}" "${netlifyCacheDir}"`, {stdio: 'inherit'})
  const result = execSync(`find "${netlifyCacheDir}" -type f | wc -l`)
  console.log(`cache created. Total files cached: ${String(result).trim()}`)
}

go()

/* eslint no-console:0 */
