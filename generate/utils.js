import {statSync} from 'fs'
import {join, basename} from 'path'
import moment from 'moment'
import glob from 'glob'

export {getPosts} // eslint-disable-line

function getPosts() {
  const postDirs = glob.sync(join(__dirname, '../src/pages/blog/posts/*/'))
  return postDirs.map(dir => {
    const postModule = require(dir) // eslint-disable-line global-require
    const postSlug = basename(dir)
    const {mtime: modifiedDate} = statSync(`${dir}index.js`)
    return {
      ...postModule,
      date: moment(modifiedDate).format('YYYY-MM-DD'),
      url: `/post/${postSlug}`,
    }
  })
}
