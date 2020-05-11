import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PreviewableImage, ExtraContent } from '../components'
import { featuredImagePropTypes } from '../proptypes'

export const AboutPageTemplate = ({
  header,
  subheader,
  longBiography_MD,
  featuredImage: { src, alt, caption },
  extraContent,
  isPreview,
}) => (
  <div className="post-content page-template no-image" style={{ padding: 0 }}>
    <header className="page-head">
      <h1 className="page-head-title">{header}</h1>
      {!!subheader && <p className="page-head-description">{subheader}</p>}
    </header>
    <section className="post-content-body">
      <figure className="gatsby-resp-image-card-full">
        <PreviewableImage
          isPreview={isPreview}
          src={src}
          alt={alt}
          caption={caption}
        />
      </figure>
      <div
        className="gatsby-resp-image-card"
        dangerouslySetInnerHTML={{ __html: longBiography_MD }}
      />
      {!!extraContent && (
        <ExtraContent content={extraContent} page={'index-page'} />
      )}
    </section>
  </div>
)

const AboutPage = ({ data }) => {
  const {
    templateKey,
    pageTitle,
    metaDescription,
    schemaType,
    header,
    subheader,
    longBiography_MD,
    featuredImage,
  } = data.markdownRemark.frontmatter
  const { slug, gitAuthorTime, gitCreatedTime } = data.markdownRemark.fields

  const pageProps = {
    header,
    subheader,
    longBiography_MD,
    featuredImage,
    extraContent: data.markdownRemark.html,
  }

  const layoutProps = {
    pageTitle,
    metaDescription,
    slug,
    templateKey,
    schemaType,
    featuredImage,
    gitAuthorTime,
    gitCreatedTime,
  }

  return (
    <Layout {...layoutProps}>
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
}

export default AboutPage

export const pageQuery = graphql`
  query AboutPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      fields {
        slug
        gitAuthorTime
        gitCreatedTime
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
              fluid(maxWidth: 1200, quality: 100) {
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
