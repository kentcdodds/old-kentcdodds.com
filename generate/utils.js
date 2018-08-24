import spawn from 'cross-spawn'
import moment from 'moment'

export {getLastUpdated, getLinks}

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
    {url: '/talks', text: 'Talks'},
    {url: '/workshops', text: 'Workshops'},
    {url: '/appearances', text: 'Appearances'},
    {url: '/links', text: 'Links'},
    {url: 'https://kcd.im/ama', text: 'AMA'},
  ]
}
