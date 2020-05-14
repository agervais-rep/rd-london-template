import React from 'react'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { v4 as uuidv4 } from 'uuid'

const PostFeed = ({ isPreview, posts }) => (
  <div className="post-feed">
    {!isPreview &&
      !!posts &&
      !!posts.length &&
      posts.map(({ image, slug, pageTitle, date }, index) => {
        return (
          <PostCard
            key={uuidv4()}
            count={index}
            image={image}
            slug={slug}
            pageTitle={pageTitle}
            date={date}
          />
        )
      })}
    {!isPreview && (!posts || !posts.length) && (
      <PostCard
        count={0}
        pageTitle="No posts yet. Please check back again soon!"
      />
    )}
    {!!isPreview && (
      <PostCard
        count={0}
        pageTitle="Your posts will appear here in reverse chronological order"
      />
    )}
  </div>
)

PostFeed.propTypes = {
  isPreview: PropTypes.bool,
  posts: PropTypes.array,
}

export default PostFeed
