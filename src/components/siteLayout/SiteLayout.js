import { Layout } from 'antd'
const { Footer, Content } = Layout

import SiteHeader from './SiteHeader'

export default function SiteLayout({ children }) {
  return (
    <Layout>
      <SiteHeader />

      <Content style={{ padding: '0 50px', marginTop: '50px' }}>
        <div style={{ backgroundColor: '#FFF', padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>

      <Footer>
        <div style={{ minHeight: 100, textAlign: 'center' }}>Site footer</div>
      </Footer>
    </Layout>
  )
}
