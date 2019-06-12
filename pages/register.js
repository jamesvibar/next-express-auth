import React from 'react'
import SiteLayout from '../src/components/siteLayout'
import RegisterForm from '../src/components/registerForm'

import { Typography } from 'antd'

const { Title } = Typography

export default function Register() {
  return (
    <React.Fragment>
      <Title style={{ textAlign: 'center' }}>Create new account</Title>
      <RegisterForm />
    </React.Fragment>
  )
}
