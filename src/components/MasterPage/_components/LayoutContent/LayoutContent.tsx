import React from 'react';
import { Layout } from 'antd';
import cn from 'classnames';
import style from './style.module.less';

export const LayoutContent = (props) => (
    <Layout.Content className={cn(style['basicLayout-content'], 'basicLayout-has-header')}>
        <div className='basicLayout-children-content-wrap'>
            <div className={cn(style['grid-content'], style['wide'])}>
                {props.children}
            </div>
        </div>
    </Layout.Content>
);
