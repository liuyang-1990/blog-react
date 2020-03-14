
import React, { FC } from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/router';

const Test: FC = props => {
    const router = useRouter();
    return (
        <Card>
            <h1>{router.query.id}</h1>
            <p>This is the blog post content.</p>
        </Card>
    );
};

export default Test;