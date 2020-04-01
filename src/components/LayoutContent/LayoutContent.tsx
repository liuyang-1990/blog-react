import React, { useContext, useEffect } from 'react';
import { Row, Col, Tooltip, Avatar } from 'antd';
import cn from 'classnames';
import { DarkIcon, DefaultIcon } from '../ThemeIcon';
import { ThemeContext } from '../../context';
import { SiderBar } from '../Sidebar/SiderBar';
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
                <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
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
                <Col xxl={6} xl={6} lg={6} md={0} sm={0} xs={0} className="main-menu">
                    <SiderBar {...props} />
                </Col>
            </Row>
        </div>
    )
};
