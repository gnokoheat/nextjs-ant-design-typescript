import React, { useState, FunctionComponent } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import {
  DesktopOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { SubMenu, Item } = Menu;
const { Sider, Content } = Layout;

interface Router extends NextRouter {
  path: string;
  breadcrumbName: string;
}

interface Props extends WithRouterProps {
  router: Router;
}

function itemRender(route: Router) {
  return route.path === 'index' ? (
    <Link href={'/'}>
      <a>{route.breadcrumbName}</a>
    </Link>
  ) : (
    <span>{route.breadcrumbName}</span>
  );
}

function routesMaker(pathsplit: string[]) {
  let routes = [
    {
      path: 'index',
      breadcrumbName: 'home',
    },
  ];
  for (let v of pathsplit) {
    const pathInfo = {
      path: v,
      breadcrumbName: v,
    };
    if (v !== '') routes.push(pathInfo);
  }
  return routes;
}

const AppLayout = (props: React.PropsWithChildren<Props>) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onChangeIsCollapsed = (isCollapsed: boolean) => {
    setIsCollapsed(isCollapsed);
  };

  const pathname = props.router.pathname;
  const pathsplit: string[] = pathname.split('/');
  const routes = routesMaker(pathsplit);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={onChangeIsCollapsed}
      >
        <Link href="/menu1">
          <a>
            <div className="App-logo" />
          </a>
        </Link>
        <Menu
          theme="dark"
          defaultSelectedKeys={['/menu1']}
          selectedKeys={[pathsplit.pop()]}
          defaultOpenKeys={[pathsplit[1]]}
          mode="inline"
        >
          <Item key="menu1" icon={<DesktopOutlined />}>
            <Link href="/menu1">
              <a>Menu 1</a>
            </Link>
          </Item>
          <Item key="menu2" icon={<DashboardOutlined />}>
            <Link href="/menu2">
              <a>Menu 2</a>
            </Link>
          </Item>
          <SubMenu key="menu3" icon={<SettingOutlined />} title="Menu 3">
            <Item key="submenu1">
              <Link href="/menu3/submenu1">
                <a>Submenu 1</a>
              </Link>
            </Item>
            <Item key="submenu2">
              <Link href="/menu3/submenu2">
                <a>Submenu 2</a>
              </Link>
            </Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 16px 16px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          itemRender={itemRender}
          routes={routes}
        />
        <Content
          className="site-layout-background"
          style={{
            padding: 16,
            minHeight: 280,
            backgroundColor: '#ffffff',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(AppLayout);
