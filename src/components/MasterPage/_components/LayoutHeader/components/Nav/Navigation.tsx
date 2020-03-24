import React, { FC, useContext } from 'react';
import { Menu } from 'antd';
import {
    HomeOutlined,
    EditOutlined,
    FolderOutlined,
    UserOutlined
} from '@ant-design/icons';
import { SiteContext } from '../../../../SiteContext';
import './Navigation.less';


let Navigation: FC = props => {
    const { isMobile } = useContext(SiteContext);
    const menuMode = isMobile ? 'inline' : 'horizontal';
    return (
        <Menu
            className='menu-site'
            mode={menuMode}
            //selectedKeys={[activeMenuItem]}
            id="nav"
        >
            <Menu.Item key="home">
                <HomeOutlined />
                首页
            </Menu.Item>
            <Menu.Item key="edit">
                <EditOutlined />
                归档
            </Menu.Item>
            <Menu.Item key="folder">
                <FolderOutlined />
                分类
            </Menu.Item>
            <Menu.Item key="about">
                <UserOutlined />
                关于
            </Menu.Item>
        </Menu>
    )

}

export { Navigation }