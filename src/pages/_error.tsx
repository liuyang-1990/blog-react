import React from "react";
import { Result, Button } from 'antd';
import Link from "next/link";


export default class Error extends React.Component<any, any> {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return {
            statusCode,
            disableSidebar: true
        }
    }

    render() {

        const button =
            <Link href="/" prefetch={false}>
                <Button type="primary">返回首页</Button>
            </Link>
        return (
            <>
                {
                    this.props.statusCode ?
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
}