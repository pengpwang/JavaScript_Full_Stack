import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {

  render() {
    return (
      <div>
        <Menu mode="vertical">
          <SubMenu title={
            <span>
              <Icon type="mail" />
              <span>Navigation One</span>
            </span>
          }>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default NavLeft;