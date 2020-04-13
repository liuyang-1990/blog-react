import React, { useContext, useState } from 'react';
import { Row, Col, Popover, Dropdown, Button, Avatar, Menu } from 'antd';
import { UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons';
import { SearchBox, Navigation } from './components';
import { Signup } from "../SignupForm";
import { SiteContext, LoginContext } from '../../context';
import cn from 'classnames';
import GitHubButton from 'react-github-button';
import Link from 'next/link';
import { logout } from '../../utils';
import './style.less';



export const LayoutHeader = () => {

    const [searching, setSearching] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { isMobile, width, responsive } = useContext(SiteContext);
    const { isLogin, setIsLogin, userName } = useContext(LoginContext);
    function onTriggerSearching(searching: boolean) {
        setSearching(searching);
    };

    function handleShowMenu() {
        setMenuVisible(true);
    }

    function handleHideMenu() {
        setMenuVisible(false);
    }
    function onMenuVisibleChange(visible: boolean) {
        setMenuVisible(visible);
    }

    const handleClick = () => {
        handleHideMenu();
        setModalVisible(true);
    }

    const navigationNode = (
        <Navigation
            key="nav"
            responsive={responsive}
            isMobile={isMobile}
            handleSignUpClick={handleClick}
        />
    );

    const handleCancel = () => {
        setModalVisible(false);
    }

    const handleLogout = () => {
        logout();
        setIsLogin(false);
    }
    const menuHeaderDropdown = (
        <Menu>
            <Menu.Item key="logout" onClick={handleLogout}>
                <LogoutOutlined />
                退出登录
            </Menu.Item>
        </Menu>
    );
    let menu: (React.ReactElement | null)[] = [
        navigationNode,
        <GitHubButton
            key="github"
            id="github-btn"
            className={cn({
                'responsive-mode': responsive,
                [`responsive-${responsive}`]: responsive,
            })}
            type="stargazers"
            namespace="liuyang-1990"
            repo="blog-react"
        />,
        isLogin ?
            <Dropdown
                overlay={menuHeaderDropdown}
                placement={'bottomRight'}
                overlayStyle={{ top: 68, minWidth: 160 }}
                overlayClassName="avatar-container" >
                <Avatar key={userName} alt="avatar">
                    {userName.charAt(0)}
                </Avatar>
            </Dropdown>
            :
            <Button size="small" key="signup" className="header-button header-signup-button" onClick={handleClick}>
                登录
            </Button>

    ];

    if (responsive == "crowded") {
        menu = searching ? [] : [navigationNode];
    } else if (responsive == "narrow") {
        menu = searching ? [] : menu;
    }
    const colProps =
        [
            {
                xxl: 4,
                xl: 5,
                lg: 6,
                md: 6,
                sm: 24,
                xs: 24,
            },
            {
                xxl: 20,
                xl: 19,
                lg: 18,
                md: 18,
                sm: 0,
                xs: 0,
            },
        ];
    return (
        <>
            <header id="header" className="header">
                <div className="navbar">
                    <div className="contanier">
                        {isMobile && (
                            <Popover
                                overlayClassName="popover-menu"
                                placement="bottomRight"
                                content={menu}
                                trigger="click"
                                visible={menuVisible}
                                onVisibleChange={onMenuVisibleChange}
                                arrowPointAtCenter
                            >
                                <UnorderedListOutlined className="nav-phone-icon" onClick={handleShowMenu} />
                            </Popover>
                        )}
                        <Row style={{ flexFlow: 'nowrap' }}>
                            <Col {...colProps[0]}>
                                <h1>
                                    <Link href="/" prefetch={false}>
                                        <a id="logo" title="liuyang's blog">
                                            <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                                        liuyang's blog
                                    </a>
                                    </Link>
                                </h1>
                            </Col>
                            <Col  {...colProps[1]} className="menu-row">
                                <SearchBox key="search" responsive={responsive} onTriggerFocus={onTriggerSearching} />
                                {!isMobile && menu}
                            </Col>
                        </Row>
                    </div>
                </div>
            </header>
            <Signup visible={modalVisible} onCancel={handleCancel} />
        </>

    )

};