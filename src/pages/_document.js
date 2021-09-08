// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-body font-body text-sm min-h-screen flex flex-col px-4">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
