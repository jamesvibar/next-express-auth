import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'

import SiteLayout from '../src/components/siteLayout'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>next-express-auth</title>
        </Head>

        <SiteLayout {...this.props}>
          <Component {...pageProps} />
        </SiteLayout>
      </Container>
    )
  }
}
