import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const data = useStaticQuery(
    graphql`
      query QueryRecentPosts {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              published: { eq: true }
            }
          }
          limit: 4
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
  )
  if (
    data &&
    data.allMarkdownRemark &&
    data.allMarkdownRemark.edges &&
    data.allMarkdownRemark.edges.length > 0
  ) {
    return data.allMarkdownRemark.edges.map(({ node }) => ({
      image:
        !!node.frontmatter.featuredImage && !!node.frontmatter.featuredImage.src
          ? node.frontmatter.featuredImage.src
          : null,
      slug: node.fields.slug,
      pageTitle: node.frontmatter.pageTitle,
      date: node.frontmatter.date,
    }))
  } else {
    return []
  }
}
