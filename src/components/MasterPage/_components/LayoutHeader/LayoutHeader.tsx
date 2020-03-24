import React, { useContext } from 'react';
import cn from 'classnames';
import { Row, Col, Popover, Button } from 'antd';
import Link from 'next/link';
import { SearchBox, Navigation } from './components';
import { SiteContext } from '../../SiteContext';
import './style.less';

export const LayoutHeader = () => {

    const { isMobile } = useContext(SiteContext);
    const headerClassName = cn({
        clearfix: true,
        //'home-header': isHome,
    });
    let responsive: null | 'narrow' | 'crowded' = null;
    // if (windowWidth < RESPONSIVE_XS) {
    //   responsive = 'crowded';
    // } else if (windowWidth < RESPONSIVE_SM) {
    //   responsive = 'narrow';
    // }
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
        <header id="header">
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
                    <SearchBox responsive={responsive} />
                    {!isMobile && <Navigation />}
                </Col>
            </Row>
        </header>

    )

};