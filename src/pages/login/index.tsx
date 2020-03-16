import React from 'react';
import cn from 'classnames';
import { HtmlMeta } from '../../components';
import { Card } from 'antd';
import style from './style.module.less';

const nextPage = () => {
    return (
        <Card bordered={false}>
            {/* <HtmlMeta title="Login" /> */}
            <div className={style['login-wrapper']}>
                <div className={cn('g-full-container', style['full-container'])}>
                    <div className={cn('g-container-card', style['login-box'])}>
                        <h2 className={style['title']}>Login</h2>
                        <div className={style['login-form']}>
                             
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default nextPage;
