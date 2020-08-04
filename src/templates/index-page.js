import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout, PreviewableImage, ExtraContent, PostFeed } from '../components'
import { featuredImagePropTypes } from '../proptypes'
import { useRecentPosts } from '../hooks'
import { seoProps, addTrailingSlash } from '../utils'

export const IndexPageTemplate = ({
  header,
  subheader,
  missionStatement,
  shortBiography,
  featuredImage: { src, alt, caption },
  extraContent,
  isPreview,
  recentPosts,
  learnMoreButton: { link: learnLink, label: learnLabel },
  inlineImages,
}) => (
  <div
    className="post-content page-template no-image"
    style={{
      padding: 0,
      maxWidth: '1000px',
    }}
  >
    <header className="page-head">
      <h1 className="page-head-title">{header}</h1>
      {!!subheader && <p className="page-head-description">{subheader}</p>}
      <p className="page-head-mission-statement">{missionStatement}</p>
    </header>
    <section className="post-content-body">
      <div className="row" style={{ alignItems: 'center' }}>
        <div className="col-6">
          <p>{shortBiography}</p>
          <Link className="button" to={addTrailingSlash(learnLink)}>
            {learnLabel}
          </Link>
        </div>
        <div className="col-6">
          <figure className="gatsby-resp-image-card-no-margin">
            <PreviewableImage
              isPreview={isPreview}
              src={src}
              alt={alt}
              caption={caption}
            />
          </figure>
        </div>
      </div>
      {!!recentPosts && !!recentPosts.length && (
        <Fragment>
          <hr />
          <h2>Recent Blog Posts</h2>
          <PostFeed isPreview={isPreview} posts={recentPosts} />
        </Fragment>
      )}
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

const IndexPage = ({ data }) => {
  const {
    frontmatter: {
      header,
      subheader,
      missionStatement,
      shortBiography,
      featuredImage,
      showRecentPosts,
      learnMoreButton,
    },
    fields: { inlineImages },
  } = data.markdownRemark
  const recentPosts = useRecentPosts()
  const pageProps = {
    header,
    subheader,
    missionStatement,
    shortBiography,
    featuredImage,
    extraContent: data.markdownRemark.html,
    recentPosts: showRecentPosts ? recentPosts : [],
    inlineImages,
    learnMoreButton:
      learnMoreButton && learnMoreButton.link && learnMoreButton.label
        ? learnMoreButton
        : { link: '/about/', label: 'Read More' },
  }

  return (
    <Layout seoProps={seoProps(data)}>
      <IndexPageTemplate {...pageProps} />
    </Layout>
  )
}

IndexPageTemplate.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  missionStatement: PropTypes.string,
  shortBiography: PropTypes.string,
  featuredImage: featuredImagePropTypes,
  extraContent: PropTypes.string,
  learnMoreButton: PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  isPreview: PropTypes.bool,
  recentPosts: PropTypes.array,
  inlineImages: PropTypes.array,
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
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
        shortBiography
        missionStatement
        showRecentPosts
        learnMoreButton {
          link
          label
        }
        featuredImage {
          src {
            childImageSharp {
              fluid(
                maxWidth: 420
                maxHeight: 360
                quality: 80
                cropFocus: CENTER
              ) {
                ...GatsbyImageSharpFluid_withWebp
                originalName
              }
              original {
                height
                width
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
