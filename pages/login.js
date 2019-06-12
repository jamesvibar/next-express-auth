import React from 'react'
import SiteLayout from '../src/components/siteLayout'
import LoginForm from '../src/components/loginForm'

import { Typography } from 'antd'
const { Title } = Typography

export default function Login() {
  return (
    <React.Fragment>
      <Title style={{ textAlign: 'center' }}>Login account</Title>
      <LoginForm />
    </React.Fragment>
  )
}
