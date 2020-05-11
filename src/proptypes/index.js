import PropTypes from 'prop-types'

export const featuredImagePropTypes = PropTypes.shape({
  src: PropTypes.object,
  alt: PropTypes.string,
  caption: PropTypes.string,
})

export const postsPropTypes = {
  count: PropTypes.number,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  slug: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
  date: PropTypes.string,
}
