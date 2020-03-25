import React, { FC } from 'react';
import { Menu } from 'antd';
import {
    HomeOutlined,
    EditOutlined,
    FolderOutlined,
    UserOutlined,
    GithubOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import './Navigation.less';


type Props = {
    isMobile: boolean;
    responsive: null | 'narrow' | 'crowded';
}

let Navigation: FC<Props> = ({ isMobile, responsive }) => {
    const menuMode = isMobile ? 'inline' : 'horizontal';
    let additional: React.ReactNode = null;
    const additionalItems = [
        <Menu.Item key="github">
            <GithubOutlined />
            <a href="https://github.com/liuyang-1990/blog-react" target="_blank" rel="noopener noreferrer">
                Github
            </a>
        </Menu.Item>,
        <Menu.Item key="account" >
            <UserOutlined />
            登录
        </Menu.Item>
    ];
    if (isMobile) {
        additional = additionalItems;
    } else if (responsive === 'crowded') {
        additional = (
            <Menu.SubMenu key="additional" title={<UnorderedListOutlined />}>
                {additionalItems}
            </Menu.SubMenu>
        );
    }
    return (
        <Menu
            className='menu-site'
            mode={menuMode}
            defaultSelectedKeys={["home"]}
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
            {additional}
        </Menu>
    )

}

export { Navigation }