import React, { FC } from 'react';
import cx from 'classnames';
import { Layout, BackTop } from 'antd';
import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons';
import { LayoutContent } from './_components/LayoutContent/LayoutContent';
import { LayoutHeader } from './_components/LayoutHeader/LayoutHeader';
import { LayoutFooter } from './_components/LayoutFooter/LayoutFooter';

const links = [
    {

        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
    },
    {
        key: 'github',
        title: "github",
        href: 'https://github.com/liuyang-1990/blog-admin',
        blankTarget: true,
    },
    {
        key: 'ICP',
        title: '豫ICP备18041733号-1',
        href: 'https://www.beian.miit.gov.cn"',
        blankTarget: true,
    }
];

const copyright = (
    <>
        Copyright  2019 created by liuyang | Powered by .Net Core 2.2 on Linux
    </>
);
export const MasterPage: FC = (props) => {
    return (
        <div>
            <Layout>
                <LayoutHeader />
                <LayoutContent>{props.children}</LayoutContent>
                <LayoutFooter links={links} copyright={copyright} />
                <BackTop visibilityHeight={100} />
            </Layout>
        </div>
    )
}