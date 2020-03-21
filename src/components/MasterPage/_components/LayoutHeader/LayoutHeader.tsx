import React from 'react';
import cn from 'classnames';
import { Layout, Row, Menu, Button, Col } from 'antd';
import Link from 'next/link';
import {
    HomeOutlined,
    EditOutlined,
    FolderOutlined,
    UserOutlined
} from '@ant-design/icons';
import './style.less';
const { Header } = Layout;

export const LayoutHeader = () => {
    return (
        <Header className='top-menu'>
            <Row>
                <Col xs={24} sm={4} md={4} lg={5} xl={5} xxl={4}>
                    <div className='top-nav-header-logo header-left' key='logo' id='logo'>
                        <Link href="/">
                            <>
                                <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt='logo' title="liuyang's Blog" />
                                <h1>liuyang's Blog</h1>
                            </>
                        </Link>
                    </div>
                </Col>
                <Col xs={0} sm={20} md={20} lg={19} xl={19} xxl={20}>
                    <div className='header-right'>
                        <Menu theme="light" mode="horizontal" className='top-nav-menu'>
                            <Menu.Item key="mail">
                                <HomeOutlined />
                                首页
                            </Menu.Item>
                            <Menu.Item key="app">
                                <EditOutlined />
                                归档
                              </Menu.Item>
                            <Menu.Item key="alipay">
                                <FolderOutlined />
                                分类
                             </Menu.Item>
                            <Menu.Item key="about">
                                <UserOutlined />
                                关于
                             </Menu.Item>
                        </Menu>
                        <div className='header-account'>
                            <Button type="primary" ghost>登录</Button>
                        </div>
                    </div>
                </Col>
            </Row>

        </Header>
        // <Header className={'top-menu'} style={{ padding: 0, width: '100%', zIndex: 9 }}>
        //     <div className={cn(style['top-nav-header'], style['light'])}>
        //         <div className={cn(style['top-nav-header-main'], style['wide'])}>
        //             <div className={'top-nav-header-left'}>
        //                 <div className={style['top-nav-header-logo']} key="logo" id='logo'>
        //                     <a href='/'>
        //                         <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt='logo' title="liuyang's Blog" />
        //                         <h1>liuyang's Blog</h1>
        //                     </a>
        //                 </div>
        //             </div>
        //             <div className={style['top-nav-header-menu']} style={{ flex: 1, overflow: 'hidden' }}>
        //                 <Menu theme="light" mode="horizontal" className={'top-nav-menu'}>
        //                     <Menu.Item key="mail">
        //                         Navigation One
        //                         </Menu.Item>
        //                     <Menu.Item key="app">
        //                         Navigation Two
        //                      </Menu.Item>
        //                     <Menu.Item key="alipay">
        //                         Navigation
        //                     </Menu.Item>
        //                 </Menu>
        //             </div>
        //             <div style={{ minWidth: '286px' }}>
        //                 <div style={{ paddingRight: '8px' }}>
        //                     <div className={style['header-index-right']}>
        //                         <span className={cn(style['header-index-action'], 'header-index-account')}>
        //                             <Link href="/login" prefetch={false} passHref>
        //                                 <Avatar
        //                                     size="small"
        //                                     className={style['header-index-avtar']}
        //                                     src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        //                                     alt="avatar" />
        //                             </Link>
        //                             <span className={style['index-name']}>admin</span>
        //                         </span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Header>

    )

};