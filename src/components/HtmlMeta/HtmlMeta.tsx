import React, { FC } from 'react';
import Head from 'next/head';

type Props = {
    title?: string;
    description?: string;
    keywords?: string;
}

export const HtmlMeta: FC<Props> = ({ title, description, keywords }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Head>
    )
} 