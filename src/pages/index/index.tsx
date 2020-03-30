import React, { FC, useState, useCallback, useEffect } from 'react';
import { Spin, Divider } from 'antd';
import Link from "next/link";
import InfiniteScroll from 'react-infinite-scroller';
import { MessageOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { httpClient } from '../../utils';
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

    const handleInfiniteOnLoad = () => {
        let current = Math.ceil(articles.length / 10);
        console.log(page);
        if (current > 3) {
            return;
        }
        setLoading(true);
        httpClient.get('https://randomuser.me/api/?results=10', {
            baseURL: "",
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }).then(res => {
            setLoading(false);
            setPage(current);
            let data = articles.concat(res.data.results);
            setArticles(data);
        });
    }

    const onLoadMore = (e) => {
        let current = Math.ceil(articles.length / 10);
        e.preventDefault();
        setLoading(true);
        httpClient.get('https://randomuser.me/api/?results=20', {
            baseURL: "",
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }).then(res => {
            setPage(current);
            setLoading(false);
            let data = articles.concat(res.data.results);
            setHasMore(data.length <= total);
            setArticles(data);
        });
    }
    return (
        <React.Fragment>
            <InfiniteScroll
                initialLoad={true}
                pageStart={1}
                loadMore={handleInfiniteOnLoad}
                hasMore={page <= 3}
                useWindow={true}
            >
                {
                    articles &&
                    articles.map(item => (
                        <article key={item.login.uuid} className="excerpt">
                            <a className="focus" href="http://www.muzhuangnet.com/show/1258.html" title="C# 字符串长度区分中英文截取">
                                <img className="thumb" src="http://www.muzhuangnet.com/upload/201610/20/201610201731443264.jpg" alt="字符串长度区分中英文截取" style={{ display: "inlie" }} />
                            </a>
                            <header>
                                <a className="cat" href="http://www.muzhuangnet.com/list/dotnet/" title=".NET" >.NET<i></i></a>
                                <h2>
                                    <a href="http://www.muzhuangnet.com/show/1257.html" title="C# 字符串长度区分中英文截取">C# 字符串长度区分中英文截取</a>
                                </h2>
                            </header>
                            <p className="meta">
                                <time className="time">
                                    <IconText icon={ClockCircleOutlined} text="2020-03-14 21:18" key="list-vertical-clock" />
                                </time>
                                <span className="views">
                                    <IconText icon={EyeOutlined} text="156" key="list-vertical-views" />
                                </span>
                                <a className="comment" href="http://www.muzhuangnet.com/show/1257.html#comment" title="评论">
                                    <IconText icon={MessageOutlined} text="2" key="list-vertical-comment" />
                                </a>
                            </p>
                            <p className="note">
                                #region   字符串长度区分中英文截取/// &lt;summary&gt;   /// 截取文本，区分中英文字符，中文算两个长度，英文算一个长度/// &lt;/summary&gt;/// &lt;param name="str"&gt;待截取的字符串&lt;/param&gt;/// &lt;param name="length"&gt;需计算长度的字…
                            </p>
                        </article>
                    ))
                }
            </InfiniteScroll>
            {loading && hasMore && (
                <div className="loading-container">
                    <Spin />
                </div>
            )}
            {
                page >= 3 && !loading && hasMore &&
                <div className="ias_trigger">
                    <a href="#" onClick={onLoadMore}>查看更多</a>
                </div>
            }
            {
                !hasMore &&
                <Divider>我也是有底线的</Divider>
            }
        </React.Fragment>
    )
};

Article.getInitialProps = async ({ req }) => {
    const res = await httpClient.get('https://randomuser.me/api/?results=10', {
        baseURL: "",
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    return {
        articles: res.data.results,
        total: 100
    }
}
export default Article;