import React, { FC } from 'react';
import { Menu } from 'antd';
import {
    HomeOutlined,
    EditOutlined,
    FolderOutlined,
    UserOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import './Navigation.less';



type Props = {
    isMobile: boolean;
    responsive: null | 'narrow' | 'crowded';
    handleSignUpClick?: () => void;
}

let Navigation: FC<Props> = ({ isMobile, responsive, handleSignUpClick }) => {
    const menuMode = isMobile ? 'inline' : 'horizontal';
    let additional: React.ReactNode = null;
    const additionalItems = [
        <Menu.Item key="github">
            <Link href="https://github.com/liuyang-1990/blog-react" prefetch={false}>
                <a target="_blank" rel="noopener noreferrer">
                    Github
                </a>
            </Link>
        </Menu.Item>,
        <Menu.Item key="signin" >
            登录
        </Menu.Item>,
        <Menu.Item key="signup" onClick={handleSignUpClick} >
            注册
        </Menu.Item>,
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