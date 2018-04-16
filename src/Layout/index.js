// @flow
import React, { PureComponent, Fragment } from 'react'
import { Layout as LayoutAnt, Menu, Breadcrumb, Icon } from 'antd'
const { Header, Content, Sider } = LayoutAnt
import { Link } from 'react-router-dom'
// UI configuration
import { navLeft, navRight, sidebar } from '~/config'

type Props = { children: any };
type State = { collapsed: boolean };

class Layout extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { collapsed: true }
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
