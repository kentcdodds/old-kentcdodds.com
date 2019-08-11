import React from 'react'
import tyler from '../images/tyler.png'

function BlogFooter() {
  return (
    <div style={{display: 'flex'}}>
      <div
        style={{
          paddingRight: 20,
        }}
      >
        <img
          src={tyler}
          alt="Tyler Haas"
          style={{
            maxWidth: 80,
            borderRadius: '50%',
          }}
        />
      </div>
      <p>
        <strong>Tyler Haas</strong>
        {`
          is a full stack software engineer and primarily focusing on the front end. He has worked with companies of all sizes to help them deliver robust applications. He lives with his wife and three kids in Utah.
        `}
      </p>
    </div>
  )
}

export default BlogFooter
