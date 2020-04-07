
import React, { FC } from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/router';

const Test: FC = props => {
    const router = useRouter();
    return (
        <Card>
            <h1>{router.query.id}</h1>
            <header className="article-header">
                <h1 className="article-title">
                    使用Flutter一年后，这是我得到的经验
                </h1>
                <div className="article-meta">

                </div>
            </header>
            <article className="article-content">
                
            </article>
        </Card>
    );
};

export default Test;