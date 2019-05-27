import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import axios from 'axios'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

function LoginForm({ form }) {
  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched,
  } = form

  React.useEffect(() => {
    form.validateFields()
  }, [])

  const emailError = isFieldTouched('email') && getFieldError('email')
  const passwordError = isFieldTouched('password') && getFieldError('password')

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const { email, password } = values

        const formValues = {
          email,
          password,
        }

        console.log(values)

        const result = await axios.post('/api/v1/auth/signin', formValues)

        console.log('Logging in!', result)
      }
    })
  }
  return (
    <Form
      onSubmit={handleSubmit}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <Form.Item
        validateStatus={emailError ? 'error' : ''}
        help={emailError || ''}
      >
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input your email!' }],
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,0.4)' }} />}
            placeholder="Email Address"
          />
        )}
      </Form.Item>
      <Form.Item
        validateStatus={passwordError ? 'error' : ''}
        help={passwordError || ''}
      >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.4)' }} />}
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
          style={{ width: '100%' }}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrappedLoginForm = Form.create({ name: 'register_form' })(LoginForm)

export default WrappedLoginForm
