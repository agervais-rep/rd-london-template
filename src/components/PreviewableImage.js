import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const PreviewImage = ({ src, isPreview, alt, caption }) => {
  const hasImg =
    src &&
    (src.d ||
      src.m ||
      src.childImageSharp ||
      (typeof src === 'string' && src.length > 1))
  const sources =
    !!isPreview || !hasImg
      ? null
      : !!src.childImageSharp
      ? src.childImageSharp.fluid
      : !!src.m && !!src.d
      ? [
          src.m.childImageSharp.fluid,
          {
            ...src.d.childImageSharp.fluid,
            media: `(min-width: 768px)`,
          },
        ]
      : null
  return (
    <Fragment>
      {hasImg && !isPreview && (
        <Img className="gatsby-resp-image-image" fluid={sources} alt={alt} />
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
