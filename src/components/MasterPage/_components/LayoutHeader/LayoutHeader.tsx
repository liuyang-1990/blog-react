import React from 'react';
import cn from 'classnames';
import { Layout, Menu, Avatar } from 'antd';
import style from './style.module.less';
const { Header } = Layout;

export const LayoutHeader = () => {
    return (
        <Header className={'top-menu'} style={{ padding: 0, width: '100%', zIndex: 9 }}>
            <div className={cn(style['top-nav-header'], style['light'])}>
                <div className={cn(style['top-nav-header-main'], style['wide'])}>
                    <div className={'top-nav-header-left'}>
                        <div className={style['top-nav-header-logo']} key="logo" id='logo'>
                            <a href='/'>
                                <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt='logo' title="liuyang's Blog" />
                                <h1>liuyang's Blog</h1>
                            </a>
                        </div>
                    </div>
                    <div className={style['top-nav-header-menu']} style={{ flex: 1, overflow: 'hidden' }}>
                        <Menu theme="light" mode="horizontal" className={'top-nav-menu'}>
                            <Menu.Item key="mail">
                                Navigation One
                                </Menu.Item>
                            <Menu.Item key="app">
                                Navigation Two
                             </Menu.Item>
                            <Menu.Item key="alipay">
                                Navigation
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div style={{ minWidth: '286px' }}>
                        <div style={{ paddingRight: '8px' }}>
                            <div className={style['header-index-right']}>
                                <span className={cn(style['header-index-action'], 'header-index-account')}>
                                    <Avatar
                                        size="small"
                                        className={style['header-index-avtar']}
                                        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
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