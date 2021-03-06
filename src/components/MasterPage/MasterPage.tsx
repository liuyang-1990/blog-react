import React, { FC } from 'react';
import { BackTop } from 'antd';
import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons';
import { LayoutContent } from '../LayoutContent/LayoutContent';
import { LayoutHeader } from '../LayoutHeader/LayoutHeader';
import { LayoutFooter } from '../LayoutFooter/LayoutFooter';
import './style.less';

const links = [
    {

        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
    },
    {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/liuyang-1990/blog-react',
        blankTarget: true,
    },
    {
        key: 'ICP',
        title: '豫ICP备18041733号-1',
        href: 'https://www.beian.miit.gov.cn',
        blankTarget: true,
    }
];

const copyright = (
    <>
        Copyright <CopyrightOutlined /> 2020 created by liuyang | Powered by .Net Core 3.1 on Linux
    </>
);

type Props = {
    disableSidebar?: boolean;
    disableHeader?: boolean;
    disableFooter?: boolean;
}

export const MasterPage: FC<Props> = (props) => {

    return (
        <div className="page-wrapper">
            {!props.disableHeader && <LayoutHeader />}
            <LayoutContent {...props}>{props.children}</LayoutContent>
            {!props.disableFooter && <LayoutFooter links={links} copyright={copyright} />}
            <BackTop visibilityHeight={100} />
        </div>
    );
}