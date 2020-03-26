import React, { useContext, useState } from 'react';
import { Row, Col, Popover, Button } from 'antd';
import { UnorderedListOutlined, LoginOutlined } from '@ant-design/icons';
import { SearchBox, Navigation } from './components';
import { SiteContext } from '../../../../context/SiteContext';
import cn from 'classnames';
import GitHubButton from 'react-github-button';
import './style.less';

export const LayoutHeader = () => {

    const [searching, setSearching] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
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
    const headerClassName = cn({
        clearfix: true,
        //'home-header': isHome,
    });

    const navigationNode = (
        <Navigation
            key="nav"
            responsive={responsive}
            isMobile={isMobile}
        />
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
            namespace="ant-design"
            repo="ant-design"
        />,
        <Button size="small" key="account" className="header-button header-account-button">
           <LoginOutlined />
            登录
        </Button>
    ];

    if (responsive == "crowded") {
        menu = searching ? [] : [navigationNode];
    } else if (responsive == "narrow") {
        menu = searching ? [] : menu;
    }
    const colProps =
        // isHome? [{ flex: 'none' }, { flex: 'auto' }]  :
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
        <header id="header" className={headerClassName}>
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
                        <a href={"/"} id="logo">
                            <img alt="logo" title="liuyang's blog" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            liuyang's blog
                        </a>
                    </h1>
                </Col>
                <Col {...colProps[1]} className="menu-row">
                    <SearchBox key="search" responsive={responsive} onTriggerFocus={onTriggerSearching} />
                    {!isMobile && menu}
                </Col>
            </Row>
        </header >

    )

};