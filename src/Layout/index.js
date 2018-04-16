import React, { PureComponent, Fragment } from 'react'
import { Layout as LayoutAnt, Menu, Breadcrumb, Icon } from 'antd'
const { SubMenu } = Menu
const { Header, Content, Sider } = LayoutAnt
import { Link } from 'react-router-dom'

import { navLeft, navRight, sidebar } from '~/config'

class Layout extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true
    }
  }

  render = () => {
    return (
      <Fragment>
        <LayoutAnt>
          <Header className='header' style={{ padding: '0' }}>
            <div className='logo' />
            <Menu
              theme='light'
              mode='horizontal'
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px', height: 'inherit', borderBottom: 'solid 1px #E8E8E8' }}
            >
              <Link to={navLeft.path}>
                <div style={{ float: 'left', marginLeft: '15px' }}>
                  {navLeft.imgSrc && navLeft.imgSrc.length > 0  ?
                    <img src={navLeft.imgSrc} style={{ height: '20px' }} />
                  : navLeft.label}
                </div>
              </Link>

              {navRight.slice(0).reverse().map(((el, i) => (
                <Menu.Item key={i} style={{ float: 'right' }}>
                  <Link to={el.path}>{el.label}</Link>
                </Menu.Item>
              )))}

            </Menu>
          </Header>
          <LayoutAnt>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={(collapsed) => this.setState({ collapsed })}
              style={{ marginTop: '2px' }}
            >
              <Menu theme='dark'  mode='inline' style={{ minHeight: '100vh' }}>
                {/* <Menu.Item key='option_test' style={{ marginTop: '0' }}>
                  <Icon type='desktop' />
                  <span>Option 2</span>
                </Menu.Item>

                <Menu.Item key='9'>
                  <Icon type='file' />
                  <span>File</span>
                </Menu.Item> */}
                {sidebar.map((el, i) => (
                  <Menu.Item key={i}>
                    <Link to={el.path}>
                      <Icon type={el.icon} />
                      <span>{el.label}</span>
                    </Link>
                  </Menu.Item>
                ))}
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
