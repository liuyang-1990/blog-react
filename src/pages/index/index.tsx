import React, { useState, FC } from 'react';
import Link from 'next/link';
import { MessageOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { InfiniteScroll } from '../../components';
import LazyLoad from 'react-lazyload';
import { HttpFactory } from "../../../tools";
import dayjs from 'dayjs';
import "./index.less";

const IconText = ({ icon, text }) => (
    <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
    </span>
);
const httpFactory = new HttpFactory();

const Article: FC<any> = props => {
    const { articles: defaultArticles = [], total } = props;
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(defaultArticles.length > total);
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState<any>(defaultArticles);

    const loadMore = (e?) => {
        e?.preventDefault();
        setLoading(true);
        httpFactory.create("getArticle").send().then(res => {
            let data = articles.concat(res.data.Rows);
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
                articles && articles.length > 0 &&
                articles.map((item, index) => (
                    <article key={item.Id} className={`excerpt excerpt-${index + 1}`}>
                        {
                            item.ImageUrl && <Link href="/article/:id" as={`/article/${item.Id}`} prefetch={false}>
                                <a className="focus" title={`${item.Title}`}>
                                    <LazyLoad offset={100} once>
                                        <img className="thumb" src={`${item.ImageUrl}`} alt={`${item.Title}`} style={{ display: "inlie" }} />
                                    </LazyLoad>
                                </a>
                            </Link>
                        }
                        <header>
                            <Link href="http://www.muzhuangnet.com/list/dotnet/" prefetch={false}>
                                <a className="cat" title=".NET" >.NET<i></i></a>
                            </Link>
                            <h2>
                                <Link href="/article/:id" as={`/article/${item.Id}`} prefetch={false}>
                                    <a title={`${item.Title}`}>{item.Title}</a>
                                </Link>
                            </h2>
                        </header>
                        <p className="meta">
                            <time className="time">
                                <IconText icon={ClockCircleOutlined} text={`${dayjs(item.CreateTime).format("YYYY:MM:DD HH:mm:ss")}`} key="list-vertical-clock" />
                            </time>
                            <span className="views">
                                <IconText icon={EyeOutlined} text={`${item.Views}`} key="list-vertical-views" />
                            </span>
                            <Link href="/article/:id#comment" as={`/article/${item.Id}#comment`} prefetch={false}>
                                <a className="comment" title="评论">
                                    <IconText icon={MessageOutlined} text={`${item.Comments}`} key="list-vertical-comment" />
                                </a>
                            </Link>
                        </p>
                        <p className="note">
                            {item.Abstract}
                        </p>
                    </article>
                ))
            }
        </InfiniteScroll>
    )
};

// This also gets called at build time
export async function getStaticProps(context) {
    const { data } = await httpFactory.create("getArticle").send();
    return {
        props: {
            articles: data.Rows,
            total: data.TotalRows
        }

    }
}

export default Article;