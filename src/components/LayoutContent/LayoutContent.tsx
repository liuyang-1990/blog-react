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
    const colProps =
        props.disableSidebar ?
            [{ flex: 'auto' }, { flex: 'none' }] :
            [
                {
                    xxl: 17,
                    xl: 17,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                },
                {
                    xxl: 7,
                    xl: 7,
                    lg: 0,
                    md: 0,
                    sm: 0,
                    xs: 0,
                },
            ];
    return (
        <section className="contanier">
            <div className="content-wrap">
                <Row>
                    <Col {...colProps[0]}>
                        <div className="content">
                            {props.children}
                        </div>
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
                    {
                        props.disableSidebar ?
                            null :
                            <Col {...colProps[1]} className="main-menu">
                                <SiderBar {...props} />
                            </Col>
                    }
                </Row>
            </div>
        </section>
    )
};
