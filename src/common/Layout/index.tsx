import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import Logo from '../Icons/Logo';
import User from '../Icons/User';
import './style.scss';

export default function Layout({ children, className }: { children: JSX.Element|JSX.Element[], className?: string }) {
  const [collapsed, setCollapsed] = useState(false);

  const userDropdownMenu = (
    <Menu>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="layout-base">
      <div className="topbar-wrapper">
        <button onClick={() => setCollapsed(!collapsed)}>
          <Logo />
        </button>
        <div className="topbar-wrapper__right">
          <Dropdown overlay={userDropdownMenu} trigger={['click']} placement="bottomLeft">
            <button>
              <User />
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="middle-wrapper">
        <div className="sidebar-wrapper">
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="vertical"
            theme="dark"
            inlineCollapsed={collapsed}
          >
            <Menu.Item key="accounting-manual">
              <Link to="/normas">Normas</Link>
            </Menu.Item>
            <Menu.Item key="settings">Configurações</Menu.Item>
          </Menu>
        </div>
        <div className={`content-wrapper ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
