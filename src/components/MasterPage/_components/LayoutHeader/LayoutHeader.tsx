import React from 'react';
import cn from 'classnames';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import style from './style.module.less';

const { Header } = Layout;

export const LayoutHeader = () => {
    return (
        <Header className={cn(style['top-menu'])} style={{ padding: 0, width: '100%', zIndex: 9 }}>
            <div className={style['top-nav-header']}>
                <div className={cn(style['top-nav-header-main'], style['wide'])}>
                    <div className={style['top-nav-header-left']}>
                        <div className={style['top-nav-header-logo']} key="logo" id='logo'>
                            <a href='/'>
                                <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt='logo' title="liuyang's Blog" />
                                <h1>liuyang's Blog</h1>
                            </a>
                        </div>
                    </div>
                    <div className={style['top-nav-header-menu']} style={{ flex: 1, overflow: 'hidden' }}>
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item key="mail">
                                Navigation One
                                </Menu.Item>
                            <Menu.Item key="app">
                                Navigation Two
                             </Menu.Item>
                            <Menu.Item key="alipay">
                                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                    Navigation Four - Link
                                </a>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div style={{ minWidth: '286px' }}>
                        <div style={{ paddingRight: '8px' }}>
                            <div className={style['index-right']}>
                                <span className={cn(style['index-action'], style['index-account'])}>
                                    <Avatar
                                        size="small"
                                        className={style['index-avtar']}
                                        icon={<UserOutlined />}
                                        alt="avatar" />
                                    <span className={style['index-name']}>admin</span>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Header>

    )

};