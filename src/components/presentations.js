import React from 'react'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import {isEmpty} from 'lodash'
import {bpMaxSM} from '../lib/breakpoints'
import Markdown from 'react-markdown'

function Presentations({presentations}) {
  return presentations.map(
    ({title, description, deliveries, resources, tags}) => (
      <div
        key={title}
        css={css`
          background: white;
          border-radius: 5px;
          padding: 40px;
          ${bpMaxSM} {
            padding: 20px;
          }
          margin-bottom: 20px;
          ul {
            list-style: none;
            margin: 0;
          }
          h4 {
            text-transform: uppercase;
            opacity: 0.6;
            font-size: 13px;
            letter-spacing: 1px;
            line-height: 34px;
            margin: 10px 0;
          }
          h2 {
            margin: 0;
            ${bpMaxSM} {
              margin-bottom: 10px;
            }
            max-width: 80%;
            ${bpMaxSM} {
              max-width: 100%;
            }
          }
          hr {
            margin: 20px 0;
            opacity: 0.5;
          }
          li > time {
            float: right;
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 10px;
          }
          li {
            display: flex;
            align-items: center;
            margin: 0;
            justify-content: space-between;
          }

          .tag {
            padding: 8px 10px;
            background: white;
            border: 1px solid #f1f1f1;
            border-radius: 3px;
            font-size: 16px;
            margin-right: 5px;
            ${bpMaxSM} {
              padding: 6px 8px;
              font-size: 14px;
            }
          }
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            ${bpMaxSM} {
              flex-direction: column;
              align-items: flex-start;
            }
          `}
        >
          <h2>{title}</h2>
          <div>
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div
          css={css`
            margin-top: 20px;
            font-size: 16px;
          `}
        >
          <Markdown source={description} />
        </div>
        <hr />
        {!isEmpty(deliveries) && <h4>Presentations</h4>}
        <ul>
          {deliveries.map((delivery, index) => (
            <li key={index}>
              <Markdown source={delivery.event} />
              <time>{delivery.date}</time>
            </li>
          ))}
        </ul>
        {!isEmpty(resources) && <h4>Resources</h4>}
        <ul>
          {resources.map((resource, i) => (
            <li key={i}>
              <Markdown source={resource} />
            </li>
          ))}
        </ul>
      </div>
    ),
  )
}

export default Presentations
