import React, { Fragment, useState, useContext } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import Nav from './Nav'
import { Link } from 'gatsby'
import { isMobile } from 'react-device-detect'
import { useSiteData, useStructuredData, useSiteMeta } from '../hooks'
import { featuredImagePropTypes } from '../proptypes'
import ThemeSwitcher from './ThemeSwitcher'
import { ThemeOptionsContext } from '../context/ThemeOptions'

import '../style/all.sass'

const Layout = ({
  pageTitle,
  metaDescription,
  slug,
  templateKey,
  featuredImage,
  gitAuthorTime,
  gitCreatedTime,
  schemaType,
  children,
}) => {
  const isSSR = typeof window === 'undefined'
  const [toggleNav, setToggleNav] = useState(false)
  const {
    name,
    siteName,
    jobTitle,
    siteUrl,
    socialLinks: { twitter, facebook, linkedin, pinterest, instagram },
    favicon,
    fallbackImage,
    themeOptions: { showThemeSwitcher },
  } = useSiteData()

  // const [colorScheme, setColorScheme] = useState(ThemeOptionsScheme)
  const image =
    featuredImage && featuredImage.src ? featuredImage.src : fallbackImage

  const buildImage = img => {
    const url = siteUrl + img.childImageSharp.fluid.src
    const sizesParts = img.childImageSharp.fluid.sizes.split(', ')
    const width = parseInt(sizesParts[sizesParts.length - 1].split('px')[0])
    const height = parseInt(width * img.childImageSharp.fluid.aspectRatio)
    return { url, width, height }
  }

  const schemaData = {
    templateKey,
    headline: pageTitle,
    description: metaDescription,
    url: siteUrl + slug,
    image: buildImage(image),
    fallbackImage: buildImage(fallbackImage),
    pageType:
      templateKey && templateKey.indexOf('blog-post') !== -1
        ? 'article'
        : 'webpage',
    datePublished: gitCreatedTime,
    dateModified: gitAuthorTime,
    name,
    jobTitle,
    siteName,
    schemaType,
    sameAs: [twitter, facebook, linkedin, pinterest, instagram].filter(
      item => !!item && !!item.url && item.url.length
    ),
  }

  const twitterHandle =
    twitter && twitter.url ? '@' + twitter.url.split('twitter.com/')[1] : null

  const ldjson = useStructuredData(schemaData)

  const {
    colorScheme,
    setColorScheme,
    fontScheme,
    setFontScheme,
    previewOpen,
    setPreviewOpen,
  } = useContext(ThemeOptionsContext)

  const { fontOptions } = useSiteMeta()

  const buildFonts = fontname => {
    const fontData = fontOptions.filter(item => item.value === fontname)
    return fontData && fontData.length
      ? fontData[0].styles
      : fontOptions[0].styles
  }

  const htmlClasses = [
    colorScheme,
    fontScheme,
    !isSSR && isMobile ? 'no-mouse' : '',
  ]
    .filter(item => item)
    .join(' ')

  return (
    <Fragment>
      <Helmet bodyAttributes={{ class: 'frontend' }}>
        <html lang="en" className={htmlClasses} />
        <title>{pageTitle}</title>
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?${buildFonts(
            fontScheme
          )}&display=swap`}
          key="fonts"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="description" content={metaDescription} />
        {!!favicon && !!favicon.childImageSharp && (
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={favicon.childImageSharp.fixed.src}
          />
        )}
        <meta property="og:type" content={schemaData.pageType} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={schemaData.url} />
        <meta property="og:image" content={schemaData.image.url} />
        {schemaData.pageType === 'article' && (
          <meta property="article:author" content={schemaData.name} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        {!!twitterHandle && (
          <meta name="twitter:site" content={twitterHandle} />
        )}
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={schemaData.image.url} />
        <script type="application/ld+json">{ldjson}</script>
      </Helmet>
      <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
        <header className="site-head">
          <div className="site-head-container">
            <Nav
              toggleNav={toggleNav}
              setToggleNav={setToggleNav}
              siteName={siteName}
            />
            {!!showThemeSwitcher && (
              <ThemeSwitcher
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
                fontScheme={fontScheme}
                setFontScheme={setFontScheme}
                previewOpen={previewOpen}
                setPreviewOpen={setPreviewOpen}
              />
            )}
          </div>
        </header>

        <main id="site-main" className="site-main">
          <div id="swup" className="transition-fade">
            {children}
          </div>
        </main>

        <footer className="site-foot">
          &copy; {new Date().getFullYear()} <Link to={`/`}>{name}</Link>, all
          rights reserved.
        </footer>
      </div>
    </Fragment>
  )
}

Layout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  schemaType: PropTypes.string.isRequired,
  featuredImage: featuredImagePropTypes,
  gitAuthorTime: PropTypes.string.isRequired,
  gitCreatedTime: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
