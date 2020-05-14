import React from 'react'
import { toHTML, findImgPath } from '../utils'
import { IndexPageTemplate } from '../../templates/index-page'
import { AboutPageTemplate } from '../../templates/about-page'
import { BlogArchiveTemplate } from '../../templates/blog-archive'
import { ContactPageTemplate } from '../../templates/contact-page'

const PagePreview = ({ entry, getAsset, widgetFor }) => {
  const templateKey = entry.getIn(['data', 'templateKey'])
  const header = entry.getIn(['data', 'header']) || '(Article Header)'
  const subheader = entry.getIn(['data', 'subheader']) || ''
  const featuredImage = {
    src: findImgPath(getAsset(entry.getIn(['data', 'featuredImage', 'src']))),
    alt: entry.getIn(['data', 'featuredImage', 'alt']) || '',
    caption: entry.getIn(['data', 'featuredImage', 'caption']) || '',
  }
  const longBiography_MD = toHTML(entry.getIn(['data', 'longBiography_MD']))
  const missionStatement = entry.getIn(['data', 'missionStatement']) || ''
  const shortBiography = entry.getIn(['data', 'shortBiography']) || ''
  const formText = {
    name: entry.getIn(['data', 'formText', 'name']) || '',
    email: entry.getIn(['data', 'formText', 'email']) || '',
    message: entry.getIn(['data', 'formText', 'message']) || '',
    submit: entry.getIn(['data', 'formText', 'submit']) || '',
  }
  const extraContent = toHTML(entry.getIn(['data', 'body']))

  return (
    <div className="londn">
      {templateKey === 'index-page' && (
        <IndexPageTemplate
          header={header}
          subheader={subheader}
          missionStatement={missionStatement}
          shortBiography={shortBiography}
          featuredImage={featuredImage}
          extraContent={extraContent}
          isPreview={true}
          recentPosts={[]}
        />
      )}
      {templateKey === 'about-page' && (
        <AboutPageTemplate
          header={header}
          subheader={subheader}
          longBiography_MD={longBiography_MD}
          featuredImage={featuredImage}
          extraContent={extraContent}
          isPreview={true}
        />
      )}
      {templateKey === 'blog-archive' && (
        <BlogArchiveTemplate
          header={header}
          subheader={subheader}
          featuredImage={featuredImage}
          isPreview={true}
        />
      )}
      {templateKey === 'contact-page' && (
        <ContactPageTemplate
          header={header}
          subheader={subheader}
          featuredImage={featuredImage}
          formText={formText}
          isPreview={true}
        />
      )}
    </div>
  )
}

export default PagePreview
