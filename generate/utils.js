import {join, basename} from 'path'
import walk from 'fs-walker'
import moment from 'moment'
import glob from 'glob'

export {getPosts, getLastUpdated, getLastUpdatedFromFileStats}

function getPosts() {
  const postDirs = glob.sync(join(__dirname, '../src/pages/blog/posts/*/'))
  return postDirs.map(dir => {
    const postModule = require(dir) // eslint-disable-line global-require
    const postSlug = basename(dir)
    const date = getLastUpdated(dir)
    return {
      ...postModule,
      date,
      url: `/post/${postSlug}`,
    }
  })
}

function getLastUpdated(path) {
  const filesStats = walk.files.sync(path)
  return getLastUpdatedFromFileStats(filesStats)
}

function getLastUpdatedFromFileStats(filesStats) {
  const modifiedDate = filesStats.reduce((recent, fileStats) => {
    if (moment(fileStats.mtime).isAfter(recent)) {
      return fileStats.mtime
    }
    return recent
  }, 0)
  if (modifiedDate === 0) {
    throw new Error(`Could not calculate the most recent modified date`)
  }
  return moment(modifiedDate).format('YYYY-MM-DD')
}
