import React, { useState } from 'react';
import Link from 'next/link';
import { MessageOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { httpClient } from '../../utils';
import { InfiniteScroll } from '../../components';
import LazyLoad from 'react-lazyload';
import "./index.less";
const https = require('https');

const IconText = ({ icon, text }) => (
    <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
    </span>
);

const Article = props => {
    const { articles: defaultArticles = [], total } = props;
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState<any>(defaultArticles);

    // useEffect(() => {
    //     scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    // }, []);
    // useEffect(() => {
    //     let observer = new IntersectionObserver(
    //         function (entries) {
    //             entries.forEach((item) => {
    //                 // 当前元素可见
    //                 let container = item.target as HTMLImageElement;
    //                 if (item.isIntersecting) {
    //                     container.src = container.dataset.src  // 替换src
    //                     observer.unobserve(item.target)  // 停止观察当前元素 避免不可见时候再次调用callback函数
    //                 }
    //             })
    //         }
    //     );

    //     query('[data-src]').forEach(function (item) {
    //         observer.observe(item);
    //     });

    //     return () => observer.disconnect();
    // });


    const loadMore = (e?) => {
        e?.preventDefault();
        setLoading(true);
        httpClient.get('https://randomuser.me/api/?results=10', {
            baseURL: "",
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }).then(res => {
            let data = articles.concat(res.data.results);
            let current = Math.ceil(data.length / 10);
            setArticles(data);
            setHasMore(data.length < total);
            setPage(current);
            setLoading(false);
        });
    }

    return (
        <InfiniteScroll
            loadMore={loadMore}
            pageIndex={page}
            hasMore={hasMore}
            loading={loading}
        >
            {
                articles &&
                articles.map((item, index) => (
                    <article key={item.login.uuid} className={`excerpt excerpt-${index + 1}`}>
                        <Link href="/article/:id" as={`/article/${index}`} prefetch={false}>
                            <a className="focus" title="C# 字符串长度区分中英文截取">
                                <LazyLoad offset={100} once>
                                    <img className="thumb" src="http://www.muzhuangnet.com/upload/201610/20/201610201731443264.jpg" alt="字符串长度区分中英文截取" style={{ display: "inlie" }} />
                                </LazyLoad>
                            </a>
                        </Link>
                        <header>
                            <Link href="http://www.muzhuangnet.com/list/dotnet/" prefetch={false}>
                                <a className="cat" title=".NET" >.NET<i></i></a>
                            </Link>
                            <h2>
                                <Link href="/article/:id" as={`/article/${index}`} prefetch={false}>
                                    <a title="C# 字符串长度区分中英文截取">C# 字符串长度区分中英文截取</a>
                                </Link>
                            </h2>
                        </header>
                        <p className="meta">
                            <time className="time">
                                <IconText icon={ClockCircleOutlined} text="2020-03-14 21:18" key="list-vertical-clock" />
                            </time>
                            <span className="views">
                                <IconText icon={EyeOutlined} text="156" key="list-vertical-views" />
                            </span>
                            <Link href="/article/:id#comment" as={`/article/${index}#comment`} prefetch={false}>
                                <a className="comment" title="评论">
                                    <IconText icon={MessageOutlined} text="2" key="list-vertical-comment" />
                                </a>
                            </Link>
                        </p>
                        <p className="note">
                            #region   字符串长度区分中英文截取/// &lt;summary&gt;   /// 截取文本，区分中英文字符，中文算两个长度，英文算一个长度/// &lt;/summary&gt;/// &lt;param name="str"&gt;待截取的字符串&lt;/param&gt;/// &lt;param name="length"&gt;需计算长度的字…
                        </p>
                    </article>
                ))
            }
        </InfiniteScroll>
    )
};

Article.getInitialProps = async ({ req }) => {
    const res = await httpClient.get('https://randomuser.me/api/?results=10', {
        baseURL: "",
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    return {
        articles: res.data.results,
        total: 40
    }
}
export default Article;