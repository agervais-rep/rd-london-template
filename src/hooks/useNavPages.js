import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const query = useStaticQuery(
    graphql`
      query NavPagesQuery {
        markdownRemark(frontmatter: { templateKey: { eq: "menu-data" } }) {
          frontmatter {
            menuItems {
              slug
              label
            }
          }
        }
      }
    `
  )
  return query.markdownRemark.frontmatter.menuItems
}
