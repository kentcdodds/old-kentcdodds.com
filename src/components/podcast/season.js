/** @jsx jsx */
import {jsx} from '@emotion/core'
import Img from 'gatsby-image'
import Link from 'components/link'
import first from 'lodash/first'
import get from 'lodash/get'
import {bpMaxXS} from '../../lib/breakpoints'
import theme from '../../../config/theme'
import {fonts} from 'lib/typography'
import SoundWave from '../../images/sound-wave.svg'

function PodcastSeason({data, isNew, ...restProps}) {
  const firstEpisode = first(data.nodes)

  return (
    <div
      {...restProps}
      css={{
        background: 'white',
        borderRadius: 5,
        border: '1px solid #f1f1f1',
      }}
    >
      <div css={{width: '100%'}}>
        <Link
          to={`/${get(firstEpisode, 'fields.slug', '/')}`}
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundImage: `url(${SoundWave})`,
            backgroundPosition: '100% 100%',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            color: theme.colors.body_color,
            padding: '1.5rem',

            ':hover': {
              '.play-button': {
                transform: 'scale(1.15)',
                transition: '150ms ease-in-out',
                background: 'transparent',
                border: '2px solid #5e31dc',
                fill: '#5e31dc',
                polygon: {
                  fill: '#5e31dc',
                },
              },
            },

            [bpMaxXS]: {
              padding: '.5rem',
            },
          }}
        >
          <div
            css={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <div
              className="play-button"
              css={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundImage:
                  'linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                transition: '100ms ease-in-out',

                [bpMaxXS]: {
                  width: 56,
                  height: 56,
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="20"
                viewBox="0 0 24 20"
              >
                <polygon
                  fill="white"
                  fillRule="evenodd"
                  points="7 0 24 10 7 20"
                />
              </svg>
            </div>

            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              {isNew && (
                <div
                  css={{
                    padding: '3px 6px',
                    backgroundColor: '#FFE8F2',
                    color: '#FF4094',
                    borderRadius: 3,
                    fontSize: 13,
                  }}
                >
                  NEW!
                </div>
              )}
              <h2 css={{margin: 0}}>
                Season {firstEpisode.frontmatter.season}
              </h2>
            </div>
          </div>
          <small css={{opacity: 0.7, fontSize: 13}}>
            {data.totalCount} Episodes
          </small>
        </Link>
      </div>
      <div css={{position: 'relative', maxHeight: 280}}>
        <ul
          css={{
            maxHeight: 280,
            overflowY: 'auto',
            listStyleType: 'none',
            background: '#fafafa',
            margin: 0,
          }}
        >
          {data.nodes.map(p => {
            const {title, number, simpleCastId} = p.frontmatter
            return (
              <li key={simpleCastId} css={{margin: 0}}>
                <Link
                  to={`/${p.fields.slug}`}
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    color: theme.colors.body_color,
                    padding: 10,
                    background: 'transparent',
                    ':hover': {
                      background: 'white',
                      boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <small css={{opacity: 0.6, fontSize: 12, flexBasis: '3%'}}>
                    {number}.
                  </small>
                  <div
                    css={{
                      '.gatsby-image-wrapper': {maxWidth: 40, maxHeight: 40},
                      width: 40,
                      height: 40,
                      img: {margin: 0},
                      marginRight: 18,
                    }}
                  >
                    <Img
                      css={{
                        margin: '0 0.75rem 0 0.45rem',

                        borderRadius: '50%',
                      }}
                      fixed={p.frontmatter.guestPhoto.childImageSharp.fixed}
                      alt={title}
                    />
                  </div>
                  <span
                    css={{
                      flexBasis: '100%',
                      fontSize: 16,
                      fontFamily: fonts.semibold,
                    }}
                  >
                    {title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
        <div
          css={{
            bottom: 0,
            width: '100%',
            height: 20,
            position: 'absolute',
            zIndex: 5,
            backgroundImage:
              'linear-gradient(180deg, rgba(98%,98%,98%,0.00) 0%, rgb(98%, 98%, 98%) 100%)',
            borderBottom: '1px solid #f1f1f1',
          }}
        />
      </div>
    </div>
  )
}

export default PodcastSeason
