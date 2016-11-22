import {join, basename} from 'path'
import spawn from 'cross-spawn'
import moment from 'moment'
import glob from 'glob'

export {getPosts, getLastUpdated, getLinks}

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
  const args = `log -1 --pretty=format:"%ad" --date=short --`
  const {stdout} = spawn.sync('git', [...args.split(' '), path])
  const output = String(stdout)
  const date = new Date(output)
  return moment(date).format('YYYY-MM-DD')
}

function getLinks() {
  return [
    {url: '/', text: 'Home'},
    {url: '/post', text: 'Blog'},
    {url: '/talks', text: 'Talks'},
    {url: '/workshops', text: 'Workshops'},
    {url: '/appearances', text: 'Appearances'},
    {url: '/links', text: 'Links'},
    {url: 'https://kcd.im/ama', text: 'AMA'},
  ]
}
