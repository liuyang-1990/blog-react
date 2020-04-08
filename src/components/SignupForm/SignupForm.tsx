import React, { FC, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Modal, Button, Col, Form, Input, Row } from 'antd';
import cx from 'classnames';
import "./style.less";

type Props = {
    visible: boolean;
    onCancel: (e) => void;
}

const Signup: FC<Props> = ({ visible, onCancel }) => {
    const [count, setCount] = useState(120);
    const [timing, setTiming] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const onGetCaptcha = useCallback(async (captcha: string) => {
        if (captcha != "1234") {
            return;
        }
        // const result = await getFakeCaptcha(mobile);
        // if (result === false) {
        //     return;
        // }
        // //message.success('获取验证码成功！验证码为：1234');
        setTiming(true);
    }, []);

    const onFinish = values => {
        console.log(values);
        setSubmitting(true);
    }

    useEffect(() => {
        let interval: number = 0;
        if (timing) {
            interval = window.setInterval(() => {
                setCount((preSecond) => {
                    if (preSecond <= 1) {
                        setTiming(false);
                        clearInterval(interval);
                        // 重置秒数
                        return 120;
                    }
                    return preSecond - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timing]);

    return (
        <Modal
            footer={null}
            visible={visible}
            onCancel={onCancel}
            forceRender
            title={"注册"}
            destroyOnClose
            afterClose={() => setTiming(false)}
        >
            <Form layout="vertical" name="register" onFinish={onFinish}>
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
                            <Input size="large" placeholder="用户名" />
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
                            <Input.Password size="large" placeholder="至少6位密码，区分大小写" />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item
                            name="confirm"
                            rules={[
                                {
                                    required: true,
                                    message: "请确认密码!"
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("两次输入的密码不匹配!");
                                    },
                                }),
                            ]}
                            dependencies={['password']}
                        >
                            <Input.Password size="large" placeholder="确认密码" />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入邮箱地址!"
                                },
                                {
                                    type: 'email',
                                    message: "邮箱地址格式错误!"
                                }
                            ]}
                        >
                            <Input size="large" placeholder="邮箱" />
                        </Form.Item>
                    </Col>
                    <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) => (
                            <>
                                <Col xs={16}>
                                    <Form.Item
                                        name="captcha"
                                        rules={[
                                            {
                                                required: true,
                                                message: "请输入验证码!"
                                            }
                                        ]}>
                                        <Input size="large" placeholder="验证码" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Button
                                        size="large"
                                        disabled={timing}
                                        className="get-captcha"
                                        onClick={() => {
                                            const value = getFieldValue('captcha');
                                            onGetCaptcha(value);
                                        }}
                                    >
                                        {timing ? `${count} 秒` : '获取验证码'}
                                    </Button>
                                </Col>
                            </>
                        )}
                    </Form.Item>
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
                            注册
                      </Button>
                    </Col>
                </Row>
            </Form>
            {/* <div className='toolsbar'>
                <Row className='register-row'>
                    <Link href="/login" prefetch={false}>
                        <a>Already have an account? Log In</a>
                    </Link>
                </Row>
            </div> */}
        </Modal>
    )
}

export { Signup }