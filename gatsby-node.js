const _ = require('lodash')
const path = require('path')
const moment = require('moment-timezone')
const { execSync } = require('child_process')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const { transformFrontmatterMD } = require('./utils')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: {
          frontmatter: {
            templateKey: { nin: ["site-data", "menu-data"] }
            published: { eq: true }
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    // Create pages
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        // tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images
  transformFrontmatterMD(node) // convert markdown frontmatter to HTML
  if (node.internal.type === `MarkdownRemark`) {
    const gitAuthorTime = execSync(
      // last commit to repo time
      `git log -1 --pretty=format:%aI "${node.fileAbsolutePath}"`
    ).toString()
    const gitCreatedTime = execSync(
      // first commit to repo time
      `git log --pretty=format:%at --follow -- "${node.fileAbsolutePath}" | tail -n 1`
    ).toString()
    createNodeField({
      node,
      name: 'gitAuthorTime',
      value: moment(gitAuthorTime)
        .tz('America/Los_Angeles')
        .format(),
    })
    createNodeField({
      node,
      name: 'gitCreatedTime',
      value: moment
        .unix(gitCreatedTime)
        .tz('America/Los_Angeles')
        .format(),
    })
    // generate slug
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
