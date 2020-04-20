import React, { FC } from 'react';
import { Modal, Tabs } from 'antd';
import { GithubOutlined, QqOutlined } from '@ant-design/icons';
import { Register } from './RegisterForm';
import { Login } from './LoginForm';
import { randomString } from '../../utils';
import "./style.less";


type Props = {
    visible: boolean;
    onCancel: () => void;
}


const { TabPane } = Tabs;
const LoginModal: FC<Props> = ({ visible, onCancel }) => {



    const handleOAuth = () => {
        const authorize_uri = 'https://github.com/login/oauth/authorize';
        const client_id = '2c77be8f313152952c68';
        const redirect_uri = 'http://localhost:3000/oauth/github';
        const random = randomString(12);
        window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${random}`;
    }
    const other =
        <>
            <div className="other">
                其他登录方式
                <GithubOutlined className="icon" onClick={handleOAuth} />
                {/* <QqOutlined className="icon" onClick={handleQQOAuth} /> */}
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