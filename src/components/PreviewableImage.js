import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const PreviewImage = ({ src, isPreview, alt, caption }) => {
  const hasImg =
    src && (src.childImageSharp || (typeof src === 'string' && src.length > 1))
  return (
    <Fragment>
      {hasImg && !isPreview && (
        <Img
          className="gatsby-resp-image-image"
          fluid={src.childImageSharp.fluid}
          alt={alt}
        />
      )}
      {hasImg && !!isPreview && (
        <img className="gatsby-resp-image-image" src={src} alt={alt} />
      )}
      {hasImg && !!caption && <figcaption>{caption}</figcaption>}
    </Fragment>
  )
}

PreviewImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object.isRequired]),
  isPreview: PropTypes.bool,
  alt: PropTypes.string,
  caption: PropTypes.string,
}

export default PreviewImage
