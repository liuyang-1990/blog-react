import React, { FC } from 'react';
import cn from 'classnames';
import { Layout } from 'antd';
const { Footer } = Layout;
import './style.less';

type FooterProps = {
    links?: Array<{
        key?: string;
        title: React.ReactNode;
        href: string;
        blankTarget?: boolean;
    }>;
    copyright?: React.ReactNode;
    className?: string;
}

export const LayoutFooter: FC<FooterProps> = ({ className, links, copyright }) => {
    if (
        (links == null || (Array.isArray(links) && links.length === 0)) &&
        (copyright == null || copyright === false)
    ) {
        return null;
    }
    const clsString = cn('global-footer', className);
    return (
        <Footer className={clsString}>
            {links && (
                <div className={'global-footer-links'}>
                    {links.map(link => (
                        <a
                            key={link.key}
                            title={link.key}
                            target={link.blankTarget ? '_blank' : '_self'}
                            href={link.href}
                        >
                            {link.title}
                        </a>
                    ))}
                </div>
            )}
            {copyright && <div className={'global-footer-copyright'}>{copyright}</div>}
        </Footer>
    );
};
