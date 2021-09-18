// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'

import isRtl from '../utils/isRtl'

class MyDocument extends Document {
  render() {
    return (
      <Html dir={isRtl(this.props.locale) ? 'rtl' : 'ltr'}>
        <Head />
        <body className="bg-body font-body text-sm min-h-screen flex flex-col">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
