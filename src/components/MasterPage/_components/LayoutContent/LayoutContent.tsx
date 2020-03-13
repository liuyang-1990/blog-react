import React from 'react';
import { Layout } from 'antd';

import style from './style.module.less';

export const LayoutContent = (props) => (
    <Layout.Content className={style['full-layout-content']}>{props.children}</Layout.Content>
);
