import React, { FC } from 'react';
import cn from 'classnames';
import style from './style.module.less';

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
    const clsString = cn(style['globalFooter'], className);
    return (
        <footer className={clsString}>
            {links && (
                <div className={style['links']}>
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
            {copyright && <div className={style['copyright']}>{copyright}</div>}
        </footer>
    );
};
