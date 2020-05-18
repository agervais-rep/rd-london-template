import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout, PreviewableImage, ExtraContent, PostFeed } from '../components'
import { featuredImagePropTypes } from '../proptypes'
import { useRecentPosts } from '../hooks'

export const IndexPageTemplate = ({
  header,
  subheader,
  missionStatement,
  shortBiography,
  featuredImage: { src, alt, caption },
  extraContent,
  isPreview,
  recentPosts,
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
          <Link className="button" to="/about">
            Learn More
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
          <h3>Recent Blog Posts</h3>
          <PostFeed isPreview={isPreview} posts={recentPosts} />
        </Fragment>
      )}
      {!!extraContent && (
        <ExtraContent content={extraContent} page={'index-page'} />
      )}
    </section>
  </div>
)

const IndexPage = ({ data }) => {
  const {
    templateKey,
    pageTitle,
    metaDescription,
    schemaType,
    header,
    subheader,
    missionStatement,
    shortBiography,
    featuredImage,
    showRecentPosts,
  } = data.markdownRemark.frontmatter
  const { slug, gitAuthorTime, gitCreatedTime } = data.markdownRemark.fields
  const recentPosts = useRecentPosts()

  const pageProps = {
    header,
    subheader,
    missionStatement,
    shortBiography,
    featuredImage,
    extraContent: data.markdownRemark.html,
    recentPosts: showRecentPosts ? recentPosts : [],
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
  isPreview: PropTypes.bool,
  recentPosts: PropTypes.array,
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
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
        shortBiography
        missionStatement
        showRecentPosts
        featuredImage {
          src {
            childImageSharp {
              fluid(
                maxWidth: 420
                maxHeight: 360
                quality: 100
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
