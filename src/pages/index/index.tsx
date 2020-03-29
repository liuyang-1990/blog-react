import React, { FC } from 'react';
import { Card, List } from 'antd';
import Link from "next/link";
import { MessageOutlined, LikeOutlined, StarOutlined, ClockCircleOutlined } from '@ant-design/icons';
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
        <Card bordered={false}>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            <IconText icon={ClockCircleOutlined} text="2020-03-14 21:18" key="list-vertical-clock" />
                        ]}
                        extra={
                            <img
                                width={200}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            title={
                                <Link prefetch={false} href="/article/[id]" as={`/article/${item.id}`}>
                                    <a>{item.title}</a>
                                </Link>
                            }
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </Card>
    )
};

// Article.getInitialProps = async ({ req }) => {
//     // const res = await httpClient.get('https://api.github.com/repos/zeit/next.js', { baseURL: "" });
//     // const json = res.data;
//     // return { stars: json.stargazers_count }
//     return {

//     }
// }
export default Article;