import { Layout, Menu } from 'antd'
import Link from 'next/link'

const { Header } = Layout

export default function() {
  return (
    <Header>
      <Link href="/">
        <a>
          <h1 style={{ float: 'left', margin: '0 2rem 0', color: '#FFF' }}>
            next-express-auth
          </h1>
        </a>
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px', float: 'right' }}
      >
        <Menu.Item key="1">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/register">
            <a>Register</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}
