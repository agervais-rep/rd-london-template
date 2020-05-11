import React from 'react'
import PropTypes from 'prop-types'

const ExtraContent = ({ content, page }) => (
  <section className={`extra-content extra-content-${page}`}>
    <hr />
    <div
      className="extra-content-holder"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </section>
)

ExtraContent.propTypes = {
  content: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
}

export default ExtraContent
