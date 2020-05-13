import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PreviewableImage } from '../components'
import { useSiteData } from '../hooks'
import { featuredImagePropTypes } from '../proptypes'

export const BlogPostTemplate = ({
  pageTitle,
  name,
  date,
  dateModified,
  content,
  featuredImage: { src, alt, caption },
  isPreview,
}) => {
  const hasImg =
    src && (src.childImageSharp || (typeof src === 'string' && src.length > 1))

  return (
    <article
      className={`post-content post-template ${
        hasImg ? 'with-image' : 'no-image'
      }`}
      style={{ padding: 0 }}
    >
      <header className="page-head">
        <h1 className="page-head-title">{pageTitle}</h1>
        {!isPreview && (
          <div className="post-meta">
            <span className="blog-post-author">by {name}</span>
            <br />
            <span className="post-meta-date">Published: {date}</span>
            {!!dateModified && dateModified !== date && (
              <span className="post-meta-date modified">
                <br />
                Last updated: {dateModified}
              </span>
            )}
          </div>
        )}
      </header>
      <section className="post-content-body">
        {!!hasImg && (
          <figure
            className="gatsby-resp-image-card-full"
            style={{ marginBottom: '2em' }}
          >
            <PreviewableImage
              isPreview={isPreview}
              src={src}
              alt={alt}
              caption={caption}
            />
          </figure>
        )}
        <div
          className="post-content-body-text"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>
    </article>
  )
}

const BlogPost = ({ data }) => {
  const { name } = useSiteData()
  const {
    templateKey,
    pageTitle,
    metaDescription,
    schemaType,
    featuredImage,
    date,
  } = data.markdownRemark.frontmatter
  const { slug, gitAuthorTime, gitCreatedTime } = data.markdownRemark.fields

  const pageProps = {
    pageTitle,
    name,
    date: date || gitCreatedTime,
    dateModified:
      gitAuthorTime !== 'Invalid date'
        ? moment(gitAuthorTime).format('MMM D, YYYY')
        : null,
    featuredImage,
    content: data.markdownRemark.html,
  }

  const layoutProps = {
    pageTitle,
    metaDescription,
    slug,
    templateKey,
    schemaType,
    featuredImage,
    gitAuthorTime,
    gitCreatedTime: date,
  }

  return (
    <Layout {...layoutProps}>
      <BlogPostTemplate {...pageProps} />
    </Layout>
  )
}

BlogPostTemplate.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateModified: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  featuredImage: featuredImagePropTypes,
  isPreview: PropTypes.bool,
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
        gitAuthorTime
        gitCreatedTime
      }
      frontmatter {
        templateKey
        pageTitle
        metaDescription
        schemaType
        date(formatString: "MMM D, YYYY")
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
