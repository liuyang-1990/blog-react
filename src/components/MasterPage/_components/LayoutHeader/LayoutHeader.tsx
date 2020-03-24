import React, { useContext, useState, useEffect } from 'react';
import cn from 'classnames';
import { Row, Col, Popover, Button } from 'antd';
import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { SearchBox, Navigation } from './components';
import { SiteContext } from '../../SiteContext';
import { RESPONSIVE_XS, RESPONSIVE_SM } from '../../../../utils';
import './style.less';

export const LayoutHeader = () => {

    const [searching, setSearching] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1400);
    const { isMobile } = useContext(SiteContext);

    function onTriggerSearching(searching: boolean) {
        setSearching(searching);
    };

    function onWindowResize() {
        setWindowWidth(window.innerWidth);
    }

    function handleShowMenu() {
        setMenuVisible(true);
    }

    function handleHideMenu() {
        setMenuVisible(false);
    }
    function onMenuVisibleChange(visible: boolean) {
        setMenuVisible(visible);
    }
    useEffect(() => {
        window.addEventListener("resize", onWindowResize);
        //  onWindowResize();
        return () => {
            window.removeEventListener("resize", onWindowResize);
        }
    });
    const headerClassName = cn({
        clearfix: true,
        //'home-header': isHome,
    });
    let responsive: null | 'narrow' | 'crowded' = null;
    if (windowWidth < RESPONSIVE_XS) {
        responsive = 'crowded';
    } else if (windowWidth < RESPONSIVE_SM) {
        responsive = 'narrow';
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
                    content={<Navigation />}
                    trigger="click"
                    visible={menuVisible}
                    arrowPointAtCenter
                >
                    <UnorderedListOutlined className="nav-phone-icon" onClick={() => onMenuVisibleChange} />
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
                    <SearchBox key="search" responsive={responsive} onTriggerFocus={() => onTriggerSearching} />
                    {!isMobile && <Navigation />}
                    <Button type='primary' size="small" className="header-button header-lang-button">
                        <UserOutlined />
                        登录
                    </Button>
                </Col>
            </Row>
        </header >

    )

};