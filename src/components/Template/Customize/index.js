import React from 'react'

// ** Template
import Handler from './Handler'

export const textCustomize = (customize) => ({
  ...customize,
  rounded: customize.rounded === 'full' ? 'xl' : customize.rounded,
  ...(customize.type === 'gradient'
    ? { type: 'custom', color: `${customize.color.split('-')[0]}-50`, border: customize.color, second: 'gray-900' }
    : {})
})

export const igCustomize = (customize) => ({
  ...customize,
  type: 'custom',
  color: `${customize.color.split('-')[0]}-50`,
  second: customize.color,
  rounded: 'lg',
  border: null
})

function Customize({ type, page, values, setFieldValue }) {
  const defaultProps = React.useMemo(() => {
    switch (type) {
      case 'links':
        return [{ ...page.style?.customize, animate: null }]

      case 'text':
        return [textCustomize(page.style?.customize)]

      case 'faq':
        return [page.style?.customize, textCustomize(page.style?.customize)]

      case 'igFeedsLink':
        return [page.style?.customize, igCustomize(page.style?.customize)]

      case 'igFeedsDownload':
        return [page.style?.customize, igCustomize(page.style?.customize)]

      default:
        return [page.style?.customize]
    }
  }, [page.style?.customize, type])

  switch (type) {
    case 'text':
      return (
        <Handler
          toggle
          values={values}
          defaultProps={defaultProps}
          setFieldValue={setFieldValue}
          customizeProps={[{ type: { exclude: ['gradient'] }, rounded: { exclude: ['full'] } }]}
        />
      )

    case 'faq':
      return (
        <Handler
          toggle
          values={values}
          defaultProps={defaultProps}
          setFieldValue={setFieldValue}
          customizeProps={[
            { label: 'استایل پرسش' },
            {
              label: 'استایل پاسخ',
              preView: true,
              type: { available: true, exclude: ['gradient'] },
              rounded: { available: true, exclude: ['full'] },
              color: { available: true },
              second: { available: true },
              animate: { available: false },
              border: { available: true },
              borderStyle: { available: true }
            }
          ]}
        />
      )

    case 'igFeedsLink':
      return (
        <Handler
          toggle
          values={values}
          defaultProps={defaultProps}
          setFieldValue={setFieldValue}
          customizeProps={[
            { label: 'استایل لینک ها' },
            {
              label: 'استایل پست ها',
              color: { available: true, label: 'پس زمینه پست ها' },
              second: { available: true, label: 'رنگ حاشیه لینک ها' }
            }
          ]}
        />
      )

    case 'igFeedsDownload':
      return (
        <Handler
          toggle
          values={values}
          defaultProps={defaultProps}
          setFieldValue={setFieldValue}
          customizeProps={[
            { label: 'استایل لینک ها' },
            {
              label: 'استایل پست ها',
              color: { available: true, label: 'پس زمینه پست ها' }
            }
          ]}
        />
      )

    default:
      return (
        <Handler
          toggle
          values={values}
          defaultProps={defaultProps}
          setFieldValue={setFieldValue}
          arrangement={['links', 'contacts', 'services'].includes(type)}
        />
      )
  }
}

export default React.memo(Customize)
