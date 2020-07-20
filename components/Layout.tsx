import { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router'

import {
  DesktopOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons'

import './Layout.less';

const { SubMenu, Item } = Menu;
const { Sider, Content } = Layout;

interface Props {
  router: any
}

function itemRender(route: any, params: any, routes: any, paths: string[]) {
  return route.path === 'index' ? (
    <Link href={'/'}><a>{route.breadcrumbName}</a></Link>
  ) : (
      <span>{route.breadcrumbName}</span>
    );
}

function routesMaker(pathsplit: string[]) {
  let routes = [
    {
      path: 'index',
      breadcrumbName: 'home',
    }
  ];
  for (let v of pathsplit) {
    const pathInfo = {
      path: v,
      breadcrumbName: v,
    }
    if (v !== "") routes.push(pathInfo)
  }
  return routes
}

class AppLayout extends Component<Props> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const pathname = this.props.router.pathname;
    const pathsplit: string[] = pathname.split('/');
    const routes = routesMaker(pathsplit);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Link href="/menu1">
            <a><div className="App-logo" /></a>
          </Link>
          <Menu
            theme="dark"
            defaultSelectedKeys={['/menu1']}
            selectedKeys={[pathsplit.pop()]}
            mode="inline">
            <Item key="menu1" icon={<DesktopOutlined />}>
              <Link href="/menu1"><a>Menu 1</a></Link>
            </Item>
            <Item key="menu2" icon={<DashboardOutlined />}>
              <Link href="/menu2"><a>Menu 2</a></Link>
            </Item>
            <SubMenu key="menu3" icon={<SettingOutlined />} title="Menu 3" >
              <Item key="submenu1">
                <Link href="/menu3/submenu1"><a>Submenu 1</a></Link>
              </Item>
              <Item key="submenu2">
                <Link href="/menu3/submenu2"><a>Submenu 2</a></Link>
              </Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>
            <Breadcrumb style={{ margin: '16px 0' }} itemRender={itemRender} routes={routes} />
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(AppLayout)
