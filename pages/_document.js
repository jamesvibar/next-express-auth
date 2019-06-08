import Document, { Head, Main, NextScript } from 'next/document'

import { getSessionFromServer, getUserScript } from '../lib/auth'

export default class MyDocument extends Document {
  static getInitialProps = ctx => {
    const user = getSessionFromServer(ctx.req)

    // console.log(user)

    let pageContext
    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext
        return <Component {...props} />
      }
      return WrappedComponent
    })

    return {
      ...user,
      ...page,
      pageContext,
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
