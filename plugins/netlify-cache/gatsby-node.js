const path = require('path')
const rimraf = require('rimraf')
const pLimit = require('p-limit')
const {isBefore} = require('date-fns')
const fs = require('fs')
const {ncp} = require('ncp')

const limit = pLimit(7)

const {ensureDir, readdir} = require(`fs-extra`)

async function calculateDirs(
  store,
  {extraDirsToCache = [], cachePublic = false},
) {
  const program = store.getState().program
  const rootDirectory = program.directory

  const dirsToCache = [
    cachePublic && path.resolve(rootDirectory, `public`),
    ...extraDirsToCache.map(dirToCache =>
      path.resolve(rootDirectory, dirToCache),
    ),
  ].filter(Boolean)

  const checkDir = async function checkDir(dir) {
    await ensureDir(dir)
  }

  for (const dir of dirsToCache) {
    checkDir(dir)
  }

  const netlifyCacheDir = path.resolve(
    process.env.NETLIFY_BUILD_BASE,
    `cache`,
    `gatsby`,
  )

  await ensureDir(netlifyCacheDir)

  return {
    rootDirectory,
    dirsToCache,
    netlifyCacheDir,
  }
}

function generateCacheDirectoryNames(rootDirectory, netlifyCacheDir, dirPath) {
  const relativePath = path.relative(rootDirectory, dirPath)
  const dirName = relativePath.replace('/', '--')
  const cachePath = path.resolve(netlifyCacheDir, dirName)
  const humanName = relativePath
  return {cachePath, humanName}
}

exports.onPreInit = async function onPreInit(
  {store},
  {extraDirsToCache, cachePublic},
) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    console.log(
      'netlify-cache: No NETLIFY_BUILD_BASE. Bailing out of onPreInit',
    )
    return
  }

  const {dirsToCache, netlifyCacheDir, rootDirectory} = await calculateDirs(
    store,
    {
      extraDirsToCache,
      cachePublic,
    },
  )

  if (!dirsToCache.length) {
    console.log('netlify-cache: No directories to cache')
    return
  }

  await Promise.all(
    dirsToCache.map(dirPath =>
      limit(async () => {
        const {cachePath, humanName} = generateCacheDirectoryNames(
          rootDirectory,
          netlifyCacheDir,
          dirPath,
        )
        await ensureDir(cachePath)
        const cacheFiles = await readdir(cachePath)
        const fortnightAway = new Date(Date.now() - 12096e5).getTime()
        const shouldClear = cacheFiles.some(file => {
          try {
            const stats = fs.statSync(`${cachePath}/${file}`)
            const birthTime = new Date(stats.birthtime).getTime()
            return isBefore(birthTime, fortnightAway)
          } catch (e) {
            console.error(e)
            return true
          }
        })

        if (shouldClear) {
          console.log(`netlify-cache: clearing stale cache for ${humanName}`)
          rimraf.sync(cachePath)
        } else {
          const dirFiles = await readdir(dirPath)

          console.log(
            `netlify-cache: Restoring ${cacheFiles.length} cached files for from ${cachePath} to ${dirPath} which has ${dirFiles.length} already existing files.`,
          )

          ncp(cachePath, dirPath, function onFinish() {
            console.log(
              `netlify-cache: successfully restored cache for ${humanName}`,
            )
          })
        }
      }),
    ),
  )
}

exports.onPostBuild = async function onPostBuild(
  {store},
  {extraDirsToCache, cachePublic},
) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    console.log(
      'netlify-cache: No NETLIFY_BUILD_BASE. Bailing out of onPreInit',
    )
    return
  }

  const {dirsToCache, netlifyCacheDir, rootDirectory} = await calculateDirs(
    store,
    {
      extraDirsToCache,
      cachePublic,
    },
  )

  if (!dirsToCache.length) {
    console.log('netlify-cache: No directories to cache')
    return
  }

  console.log(`netlify-cache caching: ${dirsToCache.join()}`)

  await Promise.all(
    dirsToCache.map(dirPath =>
      limit(() => {
        return new Promise((resolve, reject) => {
          const {cachePath, humanName} = generateCacheDirectoryNames(
            rootDirectory,
            netlifyCacheDir,
            dirPath,
          )

          console.log(`netlify-cache: Caching ${humanName}...`)
          console.log(dirPath, cachePath)
          ncp(dirPath, cachePath, function onError(err) {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              resolve()
            }
          })
        })
      }),
    ),
  )

  console.log(`netlify-cache: Netlify cache refilled`)
}

/* eslint no-console:0 */
