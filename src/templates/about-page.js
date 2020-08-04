import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {
  Layout,
  PreviewableImage,
  ExtraContent,
  HTMLContent,
} from '../components'
import { featuredImagePropTypes } from '../proptypes'
import { seoProps } from '../utils'

export const AboutPageTemplate = ({
  header,
  subheader,
  longBiography_MD,
  featuredImage: { src, m, d, alt, caption },
  extraContent,
  isPreview,
  inlineImages,
}) => (
  <div
    className={`post-content page-template ${
      !!src || (!!m && !!d) ? 'has-image' : 'no-image'
    }`}
    style={{ padding: 0 }}
  >
    <header className="page-head">
      <h1 className="page-head-title">{header}</h1>
      {!!subheader && <p className="page-head-description">{subheader}</p>}
    </header>
    <section className="post-content-body">
      <figure className="gatsby-resp-image-card-full">
        <PreviewableImage
          isPreview={isPreview}
          src={isPreview ? src : { m, d }}
          alt={alt}
          caption={caption}
        />
      </figure>
      <HTMLContent
        className="gatsby-resp-image-card"
        content={longBiography_MD}
        inlineImages={inlineImages}
      />
      {!!extraContent && (
        <ExtraContent
          content={extraContent}
          page={'index-page'}
          inlineImages={inlineImages}
        />
      )}
    </section>
  </div>
)

const AboutPage = ({ data }) => {
  const {
    header,
    subheader,
    longBiography_MD,
    featuredImage,
  } = data.markdownRemark.frontmatter
  const { inlineImages } = data.markdownRemark.fields
  const pageProps = {
    header,
    subheader,
    longBiography_MD,
    featuredImage,
    extraContent: data.markdownRemark.html,
    inlineImages,
  }

  return (
    <Layout seoProps={seoProps(data)}>
      <AboutPageTemplate {...pageProps} />
    </Layout>
  )
}

AboutPageTemplate.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  longBiography_MD: PropTypes.string,
  featuredImage: featuredImagePropTypes,
  extraContent: PropTypes.string,
  isPreview: PropTypes.bool,
  inlineImages: PropTypes.array,
}

export default AboutPage

export const pageQuery = graphql`
  query AboutPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      fields {
        slug
        gitAuthorTime
        gitCreatedTime
        inlineImages {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 80, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid_withWebp
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      }
      html
      frontmatter {
        templateKey
        pageTitle
        metaDescription
        schemaType
        header
        subheader
        longBiography_MD
        featuredImage {
          src {
            childImageSharp {
              fluid {
                originalName
              }
              original {
                height
                width
              }
            }
          }
          d: src {
            childImageSharp {
              fluid(
                maxWidth: 1200
                maxHeight: 450
                quality: 80
                cropFocus: CENTER
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          m: src {
            childImageSharp {
              fluid(
                maxWidth: 900
                maxHeight: 506
                quality: 80
                cropFocus: CENTER
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
          caption
        }
      }
    }
  }
`
