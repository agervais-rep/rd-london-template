const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Gatsby London',
    colorOptions: [
      {
        value: 'londn',
        label: 'London',
      },
      {
        value: 'sand',
        label: 'Sand',
      },
      {
        value: 'coral',
        label: 'Coral',
      },
      {
        value: 'sun',
        label: 'Sun',
      },
    ],
    fontOptions: [
      {
        label: 'Muli',
        value: 'muli',
        styles: 'family=Muli:ital,wght@0,400;0,700;1,400;1,700',
      },
      {
        label: 'Lora & Merriweather',
        value: 'lora',
        styles:
          'family=Lora:wght@400;700&family=Merriweather:ital,wght@0,400;0,700;1,400;1,700',
      },
      {
        label: 'Proza Libre & Open Sans',
        value: 'proza',
        styles:
          'family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Proza+Libre:wght@400;700',
      },
      {
        label: 'Rubik & Karla',
        value: 'rubik',
        styles:
          'family=Karla:ital,wght@0,400;0,700;1,400;1,700&family=Rubik:wght@400;700',
      },
      {
        label: 'Poppins & PT Serif',
        value: 'popp',
        styles:
          'family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@400;700',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            markdownRemark(frontmatter: { templateKey: { eq: "site-data" } }) {
              frontmatter {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: ({ markdownRemark, allSitePage }) => {
          return markdownRemark.frontmatter.siteUrl
        },
        serialize: ({ markdownRemark, allSitePage }) =>
          allSitePage.nodes.map(node => {
            return {
              url: `${markdownRemark.frontmatter.siteUrl}${node.path}`,
              changefreq: `daily`,
              priority: 0.7,
            }
          }),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-embed-video',
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1360,
              withWebp: true,
              showCaptions: ['title'],
              quality: 75,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: false, // Activates purging in npm run develop
        purgeOnly: ['/style/all.sass'], // applies purging only on the bulma css file
        // content: [path.join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx,md,mdx}')]
        whitelistPatterns: [/^table$/, /^t(body|h|d|r)$/, /^blockquote$/],
        // whitelistPatternsChildren: [],
      },
    }, // must be after other CSS plugins
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms`,
        manualInit: true,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
