// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'

import isRtl from '../utils/isRtl'
import { GA_TRACKING_ID } from '../utils/gtag'

class HtmlDocument extends Document {
  render() {
    return (
      <Html dir={isRtl(this.props.locale) ? 'rtl' : 'ltr'} className="min-h-full flex flex-col">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                                });
                            `
            }}
          />
        </Head>
        <body className="bg-body font-dana text-base flex-1 flex flex-col">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default HtmlDocument
