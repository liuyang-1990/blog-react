import React, { FC, useEffect, useState, useCallback } from 'react';
import { Modal, Tabs, Form, Row, Col, Input, Button, Progress } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import "./style.less";
import { Register } from './RegisterForm';

type Props = {
    visible: boolean;
    onCancel: (e) => void;
}
const { TabPane } = Tabs;
const Signup: FC<Props> = ({ visible, onCancel }) => {
    const [submitting, setSubmitting] = useState(false);
    const onFinish = values => {
        console.log(values);
        setSubmitting(true);
    }

    const other =
        <>
            <div className="other">
                其他登录方式
                <GithubOutlined className="icon" />
            </div>
        </>;

    return (
        <Modal
            footer={null}
            visible={visible}
            onCancel={onCancel}
            forceRender
            destroyOnClose
        >
            <Tabs defaultActiveKey="1">
                <TabPane tab="登录" key="1">
                    <Form layout="vertical" name="signin">
                        <Row gutter={16} className='form-row'>
                            <Col xs={24}>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入用户名!"
                                        }
                                    ]}>
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="用户名" />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入密码!"
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        size="large"
                                        placeholder="密码" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} className='button-row'>
                            <Col xs={24}>
                                <Button
                                    className='button-login'
                                    loading={submitting}
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    block
                                >
                                    登录
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    {other}
                </TabPane>
                <TabPane tab="注册" key="2">
                    <Register />
                    {other}
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export { Signup }