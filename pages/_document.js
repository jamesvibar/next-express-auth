import Document, { Head, Main, NextScript } from 'next/document'

import { getSessionFromServer, getUserScript } from '../lib/auth'

export default class MyDocument extends Document {
  static getInitialProps = ctx => {
    // Get logged in user from server if there's any
    const user = getSessionFromServer(ctx.req)

    // Return found user as prop
    return {
      ...user,
    }
  }

  render() {
    const { user = {} } = this.props
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </html>
    )
  }
}
