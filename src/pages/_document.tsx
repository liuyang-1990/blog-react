import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';


export default class AppDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="keywords" content="刘洋的个人网站，刘洋的博客，web开发，nodejs全栈，前端工程师，后端开发，docker容器，生活日常"/>
                    <meta name="description" content="刘洋的个人网站，专注于web开发，尤其是前端开发。喜欢做技术，也喜欢分享技术。本站主要是分享web相关文章内容，以及个人工作相关日志！"/>
                    <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script dangerouslySetInnerHTML={{
                        __html:`                      
                        var _mtac = {"performanceMonitor":1,"senseQuery":1};
                        (function() {
                            var mta = document.createElement("script");
                            mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
                            mta.setAttribute("name", "MTAH5");
                            mta.setAttribute("sid", "500694602");
                            mta.setAttribute("cid", "500694603");
                            var s = document.getElementsByTagName("script")[0];
                            s.parentNode.insertBefore(mta, s);
                        })();
                       `
                    }} />
                </body>
            </Html>
        )
    }

}