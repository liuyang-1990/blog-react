import React, { FC } from 'react';
import { Modal, Tabs } from 'antd';
import { GithubOutlined, QqOutlined } from '@ant-design/icons';
import { Register } from './RegisterForm';
import { Login } from './LoginForm';
import "./style.less";

type Props = {
    visible: boolean;
    onCancel: () => void;
}
const { TabPane } = Tabs;
const LoginModal: FC<Props> = ({ visible, onCancel }) => {

    const client_id = '2c77be8f313152952c68';
    const authorize_uri = 'https://github.com/login/oauth/authorize';
    const redirect_uri = 'http://localhost:3000/oauth/redirect';

    const handleOAuth = () => {
        const nexturl = window.location.href;
        window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${encodeURIComponent(nexturl)}`;
    }
    const handleQQOAuth = () => {
        window.location.href = `https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101722607&redirect_uri=${encodeURIComponent('https://www.nayoung515.top/login')}`;
    }
    const other =
        <>
            <div className="other">
                其他登录方式
                <GithubOutlined className="icon" onClick={handleOAuth} />
                <QqOutlined className="icon" onClick={handleQQOAuth} />
            </div>
        </>


    return (
        <Modal
            footer={null}
            visible={visible}
            onCancel={onCancel}
            forceRender
            destroyOnClose
        >
            <Tabs defaultActiveKey="login">
                <TabPane tab="登录" key="login">
                    <Login onCancel={onCancel} />
                    {other}
                </TabPane>
                <TabPane tab="注册" key="register">
                    <Register onCancel={onCancel} />
                    {other}
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export { LoginModal }