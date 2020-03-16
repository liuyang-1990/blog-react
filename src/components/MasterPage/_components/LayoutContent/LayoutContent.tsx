import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import cn from 'classnames';
import style from './style.module.less';

export const LayoutContent = (props) => (
    <Layout.Content className={cn(style['basicLayout-content'], 'basicLayout-has-header')}>
        <div className='basicLayout-children-content-wrap'>
            <div className={cn(style['grid-content'], style['wide'])}>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={props.disableSidebar ? 24 : 20} sm={24}>
                        {props.children}
                    </Col>
                    {
                        !props.disableSidebar &&
                        <Col md={4} sm={24}>
                            <Card bordered={false} />
                        </Col>
                    }
                </Row>
            </div>
        </div>
    </Layout.Content>
);
