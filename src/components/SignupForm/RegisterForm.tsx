import React, { FC, useEffect, useState } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import { httpClient } from '../../utils';

const Register: FC = () => {
    const [count, setCount] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    let interval: number | undefined;

    const onGetCaptcha = () => {
        let counts = 59;
        setCount(counts);
        interval = window.setInterval(() => {
            counts -= 1;
            setCount(counts);
            if (counts === 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    const onFinish = async (values: { [key: string]: string }) => {
        setSubmitting(true);
        try {
            const res = await httpClient.post('/v1/account/register', values);
            console.log(res)
            setSubmitting(false);
        } catch (err) {
            setSubmitting(false);
        }
    }

    useEffect(
        () => () => {
            clearInterval(interval);
        },
        [],
    );
    const checkPassword = (_: any, value: string) => {
        if (!value) {
            return Promise.reject("请输入密码!");
        }
        if (value.length < 6) {
            return Promise.reject('');
        }
        return Promise.resolve();
    }

    const checkConfirm = (_: any, value: string) => {
        if (!value || form.getFieldValue('Password') === value) {
            return Promise.resolve();
        }
        return Promise.reject("两次输入的密码不匹配!");
    }
    return (
        <Form layout="vertical" form={form} name="register" onFinish={onFinish}>
            <Form.Item
                name="UserName"
                rules={[
                    {
                        required: true,
                        message: "请输入用户名!"
                    }
                ]}>
                <Input size="large" placeholder="用户名" />
            </Form.Item>
            <Form.Item
                name="Password"
                rules={[
                    {
                        validator: checkPassword,
                    }
                ]}
            >
                <Input.Password size="large" placeholder="至少6位密码，区分大小写" />
            </Form.Item>
            <Form.Item
                name="confirm"
                rules={[
                    {
                        required: true,
                        message: "请确认密码!"
                    },
                    {
                        validator: checkConfirm
                    }
                ]}
                dependencies={['Password']}
            >
                <Input.Password size="large" placeholder="确认密码" />
            </Form.Item>
            <Form.Item
                name="Email"
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
            <Row gutter={8}>
                <Col span={16}>
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
                        disabled={!!count}
                        className="get-captcha"
                        onClick={() => { onGetCaptcha(); }}
                    >
                        {count ? `${count} s` : '获取验证码'}
                    </Button>
                </Col>
            </Row>
            <Button
                type="primary"
                size="large"
                loading={submitting}
                className='button-login'
                htmlType="submit"
                block
            >
                注册
            </Button>
        </Form>
    )
}

export { Register }