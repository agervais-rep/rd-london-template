import remark from 'remark'
import remarkHTML from 'remark-html'

export const toHTML = value =>
  !!value
    ? remark()
        .use(remarkHTML)
        .processSync(value)
        .toString()
    : ''

export const findImgPath = data => {
  if (!data.path) {
    return
  }
  return data.path.split('static')[1]
}

export function processListItems(raw) {
  const content = raw ? raw.toJS() : []
  if (content.length) {
    content.forEach((item, i) => {
      const keys = Object.keys(item)
      keys.forEach(key => {
        if (key.indexOf('_MD') !== -1) {
          item[key] = toHTML(item[key])
        }
      })
    })
  }
  return content
}

export const siteMetadata = {
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
}
