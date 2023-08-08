import { Breadcrumb, Layout, Menu } from 'antd';
import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { NextRouter, withRouter } from 'next/router';
import React, { useState } from 'react';

import {
  DashboardOutlined,
  DesktopOutlined,
  SettingOutlined
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
      {route.breadcrumbName}
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
  const [isCollapsed, setIsCollapsed] = useState(true);

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
          <div className="App-logo" />
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
              Menu 1
            </Link>
          </Item>
          <Item key="menu2" icon={<DashboardOutlined />}>
            <Link href="/menu2">
              Menu 2
            </Link>
          </Item>
          <SubMenu key="menu3" icon={<SettingOutlined />} title="Menu 3">
            <Item key="submenu1">
              <Link href="/menu3/submenu1">
                Submenu 1
              </Link>
            </Item>
            <Item key="submenu2">
              <Link href="/menu3/submenu2">
                Submenu 2
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
