import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PreviewableImage, PostFeed } from '../components'
import { featuredImagePropTypes, postsPropTypes } from '../proptypes'

export const BlogArchiveTemplate = ({
  header,
  subheader,
  posts,
  featuredImage: { src, alt, caption },
  isPreview,
}) => (
  <Fragment>
    <div
      className={`post-content page-template ${
        !!src ? 'with-image' : 'no-image'
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
            src={src}
            alt={alt}
            caption={caption}
          />
        </figure>
      </section>
    </div>
    <PostFeed isPreview={isPreview} posts={posts} />
  </Fragment>
)

const BlogArchive = ({ data }) => {
  const {
    templateKey,
    pageTitle,
    metaDescription,
    schemaType,
    header,
    subheader,
    featuredImage,
  } = data.markdownRemark.frontmatter
  const { slug, gitAuthorTime, gitCreatedTime } = data.markdownRemark.fields
  const posts = data.allMarkdownRemark.edges.map(({ node }) => ({
    image:
      !!node.frontmatter.featuredImage && !!node.frontmatter.featuredImage.src
        ? node.frontmatter.featuredImage.src
        : null,
    slug: node.fields.slug,
    pageTitle: node.frontmatter.pageTitle,
    date: node.frontmatter.date,
  }))

  // console.log(posts)

  const pageProps = {
    header,
    subheader,
    featuredImage,
    posts,
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
      <BlogArchiveTemplate {...pageProps} />
    </Layout>
  )
}

BlogArchiveTemplate.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.shape(postsPropTypes)).isRequired,
  featuredImage: featuredImagePropTypes,
  isPreview: PropTypes.bool,
}

export default BlogArchive

export const pageQuery = graphql`
  query BlogArchiveTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "blog-archive" } }) {
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
        header
        subheader
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          published: { eq: true }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            pageTitle
            featuredImage {
              src {
                childImageSharp {
                  fluid(maxWidth: 1360) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              alt
            }
          }
        }
      }
    }
  }
`
