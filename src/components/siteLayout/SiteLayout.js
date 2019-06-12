import { Layout } from 'antd'
const { Footer, Content } = Layout

import SiteHeader from './SiteHeader'

export default function SiteLayout(props) {
  return (
    <Layout>
      <SiteHeader {...props} />

      <Content style={{ padding: '0 50px', marginTop: '50px' }}>
        <div style={{ backgroundColor: '#FFF', padding: 24, minHeight: 280 }}>
          {props.children}
        </div>
      </Content>

      <Footer>
        <div style={{ minHeight: 100, textAlign: 'center' }}>Site footer</div>
      </Footer>
    </Layout>
  )
}
