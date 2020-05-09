import React from 'react'
import styled from '@emotion/styled'
import {bpMaxXS, bpMaxSM} from '../../lib/breakpoints'
import ApplePodcasts from '../../images/podcast/apple.svg'
import GooglePodcasts from '../../images/podcast/google.svg'
import Spotify from '../../images/podcast/spotify.svg'
import Rss from '../../images/podcast/rss.svg'
import Link from '../link'

const ProviderLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 15px',
  fontSize: 15,
  borderRadius: 5,
  backgroundColor: 'white',
  color: 'rgba(0,0,0,0.8) !important',
  border: '1px solid rgba(0,0,0,0.05)',
  img: {
    margin: '0 10px 0 0',
  },
  ':not(:last-of-type)': {
    marginRight: 10,
    [bpMaxSM]: {
      margin: '0 3px 5px',
    },
  },

  ':hover': {
    boxShadow: '0 5px 30px -5px rgba(0,0,0,0.075)',
  },
  [bpMaxSM]: {
    margin: '0 3px 5px',
    fontSize: 12,
    padding: '5px 7px',

    img: {
      maxWidth: 20,
    },
  },
  [bpMaxXS]: {
    flexBasis: 'calc(50% - 7px)',
  },
})

function DistributionPlatforms() {
  return (
    <React.Fragment>
      <ProviderLink to="https://podcasts.apple.com/us/podcast/chats-with-kent-c-dodds/id1475543959">
        <img src={ApplePodcasts} alt="Listen on Apple Podcasts" /> Apple
      </ProviderLink>
      <ProviderLink to="https://podcasts.google.com/?feed=aHR0cHM6Ly9mZWVkcy5zaW1wbGVjYXN0LmNvbS9YX3dTX1dZaA">
        <img src={GooglePodcasts} alt="Listen on Google Podcasts" /> Google
      </ProviderLink>
      <ProviderLink to="https://open.spotify.com/show/7GkO2poedjbltWT5lduL5w">
        <img src={Spotify} alt="Listen on Spotify" /> Spotify
      </ProviderLink>
      <ProviderLink to="https://feeds.simplecast.com/X_wS_WYh">
        <img src={Rss} alt="Subscribe via RSS" /> RSS
      </ProviderLink>
    </React.Fragment>
  )
}

export default DistributionPlatforms
