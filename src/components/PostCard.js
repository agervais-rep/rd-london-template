import React from 'react'
import { Link } from 'gatsby'
import { postsPropTypes } from '../proptypes'

const PostCard = ({ count, image, slug, pageTitle, date }) => (
  <article
    className={`post post-card ${count % 3 === 0 && `post-card-large`} ${
      image ? `with-image` : `no-image`
    }`}
    style={
      image && {
        backgroundImage: `url(${image.childImageSharp.fluid.src})`,
      }
    }
  >
    <Link to={slug} className="post-card-link">
      <div className="post-card-content">
        <div className="post-card-text">
          <h2 className="post-card-title">{pageTitle}</h2>
          <span className="post-card-date">{date}</span>
        </div>
      </div>
    </Link>
  </article>
)

PostCard.propTypes = { ...postsPropTypes }

export default PostCard
