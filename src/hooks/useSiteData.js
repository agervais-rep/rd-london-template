import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const query = useStaticQuery(
    graphql`
      query SiteDataQuery {
        markdownRemark(frontmatter: { templateKey: { eq: "site-data" } }) {
          frontmatter {
            name
            jobTitle
            siteName
            siteUrl
            socialLinks {
              twitter {
                url
                show
              }
              facebook {
                url
                show
              }
              linkedin {
                url
                show
              }
              pinterest {
                url
                show
              }
              instagram {
                url
                show
              }
            }
            themeOptions {
              colorScheme
              fontScheme
              showThemeSwitcher
            }
            favicon {
              childImageSharp {
                fixed(width: 32, height: 32, quality: 100, toFormat: PNG) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            fallbackImage {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `
  )
  return query.markdownRemark.frontmatter
}
