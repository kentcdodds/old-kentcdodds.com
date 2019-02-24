import {graphql} from 'gatsby'

export const bannerImage = graphql`
  fragment bannerImage640 on File {
    childImageSharp {
      fluid(maxWidth: 640, traceSVG: {color: "#573ede"}) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
  fragment bannerImage720 on File {
    childImageSharp {
      fluid(maxWidth: 720, traceSVG: {color: "#573ede"}, quality: 75) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`
