import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Layout, BackTop } from 'antd';
import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons';
import { LayoutContent } from './_components/LayoutContent/LayoutContent';
import { LayoutHeader } from './_components/LayoutHeader/LayoutHeader';
import { LayoutFooter } from './_components/LayoutFooter/LayoutFooter';
import { ProgressLoading } from '../ProgressLoading';
import { SiteContext } from './SiteContext';
import { RESPONSIVE_MOBILE } from '../../utils';
import style from './style.module.less';


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
        href: 'https://www.beian.miit.gov.cn"',
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
  
    const [isMobile, setIsMobile] = useState(false);

    function updateMobileMode() {
        const newIsMobile = window.innerWidth < RESPONSIVE_MOBILE;
        setIsMobile(isMobile !== newIsMobile);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMobileMode);
        updateMobileMode();
        return () => {
            window.removeEventListener('resize', updateMobileMode);
        }
    }, []);
    console.log(isMobile);
    return (
        <SiteContext.Provider value={{ isMobile }}>
            <div className={cn(style['basicLayout'], 'basicLayout-topmenu')}>
                <ProgressLoading showAfterMs={120} />
                <Layout hasSider >   {/*style={{ minHeight: '100%' }}*/}
                    <Layout style={{ position: 'relative' }}>
                        {!props.disableHeader && <LayoutHeader />}
                        <LayoutContent {...props}>{props.children}</LayoutContent>
                        {!props.disableHeader && <LayoutFooter links={links} copyright={copyright} />}
                        <BackTop visibilityHeight={100} />
                    </Layout>
                </Layout>
            </div>
        </SiteContext.Provider>

    );
}