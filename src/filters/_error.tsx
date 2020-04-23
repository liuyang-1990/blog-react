import React, { FC } from "react";
import { Result, Button } from 'antd';

const Error: FC<any> = (props) => {
    const { statusCode = 404 } = props;
    const button =
        (<a href="/">
            <Button type="primary">返回首页</Button>
        </a>)
    return (
        <>
            {
                statusCode ?
                    <Result
                        status="404"
                        title="404"
                        subTitle="抱歉,找不到这个页面了......"
                        extra={button}
                    /> :
                    <Result
                        status="500"
                        title="500"
                        subTitle="服务器发生了错误......"
                        extra={button}
                    />
            }
        </>
    )
}


export { Error }