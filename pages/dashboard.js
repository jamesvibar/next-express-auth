import React from 'react'
import SiteLayout from '../src/components/siteLayout'

import { Typography } from 'antd'
const { Title } = Typography

export default function Index() {
  return (
    <SiteLayout>
      <Title>Dashboard, hello USER</Title>
    </SiteLayout>
  )
}
