// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'

import isRtl from '../utils/isRtl'

class HtmlDocument extends Document {
  render() {
    return (
      <Html dir={isRtl(this.props.locale) ? 'rtl' : 'ltr'} className="min-h-full flex flex-col">
        <Head />
        <body className="bg-body font-peyda text-base flex-1 flex flex-col">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default HtmlDocument
