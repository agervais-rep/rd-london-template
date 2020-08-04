import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PreviewableImage } from '../components'
import { featuredImagePropTypes } from '../proptypes'
import { seoProps } from '../utils'

export const ContactPageTemplate = ({
  header,
  subheader,
  featuredImage: { src, alt, caption },
  formText,
  isPreview,
}) => {
  function encode(data) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
      )
      .join('&')
  }

  const botfield = uuidv4()
  const [values, setValues] = useState({
    [botfield]: '',
    name: '',
    email: '',
    message: '',
    checkbox: true,
  })
  const [sendStatus, updateSendStatus] = useState('initial')
  const responseMessages = {
    initial: null,
    working: null,
    success: 'Thank you! Your message has been sent.',
    error: 'Whoops, something went wrong… Please try again.',
  }
  const btnClasses = [
    'button',
    'large',
    sendStatus === 'working' ? 'disabled' : '',
  ]
    .filter((item) => item)
    .join(' ')
  const btnText = sendStatus === 'success' ? 'Success!' : formText.submit

  const handleChange = (e) => {
    const vals = _.cloneDeep(values)
    const { name, type, value } = e.target
    vals[name] = type === 'checkbox' ? !vals[name] : value
    setValues(vals)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isPreview) {
      return null
    }
    updateSendStatus('working')
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...values,
      }),
    })
      .then((result) => {
        const success = result && result.status && result.status === 200
        updateSendStatus(success ? 'success' : 'error')
      })
      .catch((error) => {
        updateSendStatus(error)
      })
  }

  return (
    <div className="post-content page-template no-image" style={{ padding: 0 }}>
      <header className="page-head">
        <h1 className="page-head-title">{header}</h1>
        {!!subheader && <p className="page-head-description">{subheader}</p>}
      </header>
      <section className="post-content-body">
        <figure className="gatsby-resp-image-card gatsby-resp-image-card-no-margin gatsby-resp-image-image-card gatsby-resp-image-full">
          <PreviewableImage
            isPreview={isPreview}
            src={src}
            alt={alt}
            caption={caption}
          />
        </figure>
        <div className="contact-form-holder">
          <form
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot={botfield}
            onSubmit={handleSubmit}
            className={`contact-form ${sendStatus}`}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <input
                name={botfield}
                onChange={handleChange}
                tabIndex="-1"
                aria-label={botfield}
              />
            </div>
            <input
              className="input"
              type={'text'}
              name={'name'}
              placeholder={formText.name}
              onChange={handleChange}
              id={'name'}
              value={values.name}
              required={true}
              aria-label={formText.name}
            />
            <input
              className="input"
              type={'email'}
              name={'email'}
              placeholder={formText.email}
              onChange={handleChange}
              id={'email'}
              value={values.email}
              required={true}
              aria-label={formText.email}
            />
            <textarea
              className="textarea"
              name={'message'}
              placeholder={formText.message}
              onChange={handleChange}
              id={'message'}
              value={values.message}
              required={true}
              rows={4}
              aria-label={formText.message}
            />
            <button className={btnClasses} type="submit">
              {btnText}
            </button>
          </form>
          <div className={`response-msg ${sendStatus}`}>
            {responseMessages[sendStatus]}
          </div>
        </div>
      </section>
    </div>
  )
}

const ContactPage = ({ data }) => {
  const {
    header,
    subheader,
    featuredImage,
    formText,
  } = data.markdownRemark.frontmatter
  const pageProps = {
    header,
    subheader,
    featuredImage,
    formText,
  }

  return (
    <Layout seoProps={seoProps(data)}>
      <ContactPageTemplate {...pageProps} />
    </Layout>
  )
}

ContactPageTemplate.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  featuredImage: featuredImagePropTypes,
  formText: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    submit: PropTypes.string.isRequired,
  }).isRequired,
  isPreview: PropTypes.bool,
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "contact-page" } }) {
      fields {
        slug
        gitAuthorTime
        gitCreatedTime
      }
      frontmatter {
        templateKey
        pageTitle
        metaDescription
        schemaType
        header
        subheader
        featuredImage {
          src {
            childImageSharp {
              fluid(maxWidth: 1200, quality: 80, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid_withWebp
                originalName
              }
              original {
                height
                width
              }
            }
          }
          alt
        }
        formText {
          name
          email
          message
          submit
        }
      }
    }
  }
`
