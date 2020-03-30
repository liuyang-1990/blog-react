import React, { FC } from 'react';
import { Card, List } from 'antd';
import Link from "next/link";
import { MessageOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import "./index.less";


const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        id: i,
        title: `ant design part ${i}`,
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ icon, text }) => (
    <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
    </span>
);

const Article = props => {
    return (
        <React.Fragment>
            <article className="excerpt">
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
            <div className="ias_trigger">
                <a href="#" onClick={e => e.preventDefault()}>查看更多</a>
            </div>
        </React.Fragment>


    )
};

// Article.getInitialProps = async ({ req }) => {
//     // const res = await httpClient.get('https://api.github.com/repos/zeit/next.js', { baseURL: "" });
//     // const json = res.data;
//     // return { stars: json.stargazers_count }
// }
export default Article;