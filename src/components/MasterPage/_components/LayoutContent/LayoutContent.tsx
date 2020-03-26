import React, { useState, useContext } from 'react';
import { Row, Col, Tooltip, Avatar } from 'antd';
import cn from 'classnames';
import { DarkIcon, DefaultIcon } from '../../../../components';
import { ThemeContext } from '../../../../context';
import './style.less';


export const LayoutContent = (props) => {
    const { theme, setSiteTheme } = useContext(ThemeContext);

    function changeTheme() {
        const nextTheme = theme !== 'dark' ? 'dark' : 'default';
        setSiteTheme(nextTheme);
    }

    return (
        <div className="main-wrapper">
            <Row>
                <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
                    <section className="main-container main-container-component">
                        {props.children}
                    </section>
                    <div className="fixed-widgets" onClick={changeTheme}>
                        <Tooltip
                            getPopupContainer={node => node.parentNode as HTMLElement}
                            title="切换暗黑模式"
                            overlayClassName="fixed-widgets-tooltip"
                        >
                            <Avatar
                                className={cn(
                                    'fixed-widgets-avatar',
                                    `fixed-widgets-avatar-${theme}`,
                                )}
                                size={44}
                                icon={theme === 'dark' ? <DarkIcon /> : <DefaultIcon />}
                            />
                        </Tooltip>
                    </div>
                </Col>
                <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className="main-menu">

                </Col>
            </Row>
        </div>
        // <Layout.Content className={cn(style['basicLayout-content'], 'basicLayout-has-header')}>
        //     <div className='basicLayout-children-content-wrap'>
        //         <div className={cn(style['grid-content'], style['wide'])}>
        //             <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        //                 <Col md={props.disableSidebar ? 24 : 20} sm={24}>
        //                     {props.children}
        //                 </Col>
        //                 {
        //                     !props.disableSidebar &&
        //                     <Col md={4} sm={24}>
        //                         <Card bordered={false} />
        //                     </Col>
        //                 }
        //             </Row>
        //         </div>
        //     </div>
        // </Layout.Content>
    )
};
