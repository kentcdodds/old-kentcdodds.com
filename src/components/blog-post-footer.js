import React from 'react'
import Markdown from 'react-markdown'
import kent from '../images/kent.png'

function BlogFooter() {
  return (
    <>
      <div style={{display: 'flex'}}>
        <div
          style={{
            paddingRight: 20,
          }}
        >
          <img
            src={kent}
            alt="Kent C. Dodds"
            style={{
              maxWidth: 80,
              borderRadius: '50%',
            }}
          />
        </div>
        <p>
          <strong>Kent C. Dodds</strong>
          {` is a JavaScript software engineer and teacher. He's taught hundreds
          of thousands of people how to make the world a better place with
          quality software development tools and practices. He lives with his
          wife and four kids in Utah.`}
        </p>
      </div>
      <Markdown>
        {`
Learn more with Kent C. Dodds:

- [TestingJavaScript.com](https://testingjavascript.com): Jump on this self-paced workshop and learn the smart, efficient way to test any JavaScript application. 🏆
      `.trim()}
      </Markdown>
    </>
  )
}

export default BlogFooter
