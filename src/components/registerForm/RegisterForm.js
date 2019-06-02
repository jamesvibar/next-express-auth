import React from 'react'
import { Form, Icon, Input, Button, Alert } from 'antd'
import axios from 'axios'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

function RegisterForm({ form }) {
  const [status, setStatus] = React.useState(null)

  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched,
  } = form

  React.useEffect(() => {
    form.validateFields()
  }, [])

  const usernameError = isFieldTouched('username') && getFieldError('username')
  const emailError = isFieldTouched('email') && getFieldError('email')
  const passwordError = isFieldTouched('password') && getFieldError('password')

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const { username, email, password } = values

        const newUser = {
          username,
          email,
          password,
        }

        try {
          const result = await axios.post('/api/v1/auth/signup', newUser)
          setStatus({
            name: 'Success :D',
            message: `Created a new account with email ${email}`,
            type: 'success',
          })
          console.log('Creating user account', result)
        } catch (e) {
          setStatus({
            name: 'Error :C',
            message: 'Username or email already exists.',
            type: 'error',
          })
        }
      }
    })
  }

  const onClose = e => {
    setStatus(null)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      {status && (
        <Form.Item>
          <Alert
            message={status.name}
            description={status.message}
            type={status.type}
            closable
            onClose={onClose}
          />
        </Form.Item>
      )}
      <Form.Item
        validateStatus={usernameError ? 'error' : ''}
        help={usernameError || ''}
      >
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.4)' }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
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
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrappedRegisterForm = Form.create({ name: 'register_form' })(RegisterForm)

export default WrappedRegisterForm
