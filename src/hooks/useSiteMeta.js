import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const query = useStaticQuery(
    graphql`
      query QuerySiteMetadata {
        site {
          siteMetadata {
            title
            colorOptions {
              value
              label
            }
            fontOptions {
              label
              value
              styles
            }
          }
        }
      }
    `
  )
  return query.site.siteMetadata
}
