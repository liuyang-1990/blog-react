import React from 'react';
import {
    Document,
    Head,
    Main,
} from '@react-ssr/express';


export default class extends Document {
    render() {
        return (
            <html lang="zh-Hans">
                <Head>
                    <title></title>
                    <meta charSet="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta http-equiv="content-type" content="text/html; charset=UTF-8"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
                    <meta http-equiv="Window-target" content="_top" />
                    <meta name="renderer" content="webkit" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                </body>
            </html>
        );
    }
}