import React, { useContext, useState } from 'react';
import { Row, Col, Popover, Button } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { SearchBox, Navigation } from './components';
import { Signup } from "../SignupForm";
import { SiteContext } from '../../context';
import cn from 'classnames';
import GitHubButton from 'react-github-button';
import Link from 'next/link';
import './style.less';


export const LayoutHeader = () => {

    const [searching, setSearching] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [signupVisible, setSignupVisible] = useState(false);
    const { isMobile, width, responsive } = useContext(SiteContext);

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
        setSignupVisible(true);
    }

    const navigationNode = (
        <Navigation
            key="nav"
            responsive={responsive}
            isMobile={isMobile}
            handleSignUpClick={handleClick}
        />
    );

    const handleHideSignUp = () => {
        setSignupVisible(false);
    }

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
        <Button size="small" key="signin" className="header-button header-signin-button">
            登录
        </Button>,
        <Button size="small" key="signup" className="header-button header-signup-button" onClick={handleClick}>
            注册
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
            <Signup visible={signupVisible} onCancel={handleHideSignUp} />
        </>

    )

};