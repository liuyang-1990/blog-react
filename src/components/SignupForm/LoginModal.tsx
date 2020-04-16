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


    const other =
        <>
            <div className="other">
                其他登录方式
                <GithubOutlined className="icon" />
                <QqOutlined className="icon" />
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