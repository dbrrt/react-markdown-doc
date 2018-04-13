import React, { PureComponent, Fragment } from 'react'
import { Layout as LayoutAnt, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = LayoutAnt;

import { Link } from 'react-router-dom'

class Layout extends PureComponent {
  render = () => {
    return (
      <Fragment>
        <LayoutAnt>
          <Header className='header'>
            <div className='logo' />
            <Menu
              theme='dark'
              mode='horizontal'
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              {/* <Menu.Item key='1'>Home</Menu.Item> */}
              {/* <Menu.Item key='2'>nav 2</Menu.Item>
              <Menu.Item key='3'>nav 3</Menu.Item> */}
            </Menu>
          </Header>
          <LayoutAnt>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode='inline'
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key='sub1' title={<span><Icon type='user' />subnav 1</span>}>
                  <Menu.Item key='1'>
                    <Link to='/a'>Option 1</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    <Link to='/'>Option 2</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <LayoutAnt style={{ padding: '0' }}>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                {this.props.children}
              </Content>
            </LayoutAnt>
          </LayoutAnt>
        </LayoutAnt>
      </Fragment>
    )
  }
}

export { Layout }
