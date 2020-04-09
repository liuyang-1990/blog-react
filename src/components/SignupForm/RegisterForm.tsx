import React, { FC, useEffect, useState } from 'react';
import { Form, Row, Col, Input, Button, Popover, Progress } from 'antd';

type Props = {
    onFinish: (values) => void;
    submitting: boolean;
}

const Register: FC<Props> = ({ onFinish, submitting }) => {
    const [count, setcount] = useState(0);
    const [visible, setvisible] = useState(false);
    const [popover, setpopover] = useState(false);
    const [form] = Form.useForm();

    let interval: number | undefined;

    const onGetCaptcha = () => {
        let counts = 59;
        setcount(counts);
        interval = window.setInterval(() => {
            counts -= 1;
            setcount(counts);
            if (counts === 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    useEffect(
        () => () => {
            clearInterval(interval);
        },
        [],
    );
    const passwordStatusMap = {
        ok: (
            <div className="success">
                强度：强
            </div>
        ),
        pass: (
            <div className="warning">
                强度：中
            </div>
        ),
        poor: (
            <div className="error">
                强度：太短
            </div>
        ),
    };

    const passwordProgressMap: {
        ok: 'success';
        pass: 'normal';
        poor: 'exception';
    } = {
        ok: 'success',
        pass: 'normal',
        poor: 'exception',
    };
    const getPasswordStatus = () => {
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    };

    const checkPassword = (_: any, value: string) => {
        if (!value) {
            setvisible(!!value);
            return Promise.reject("请输入密码!");
        }
        if (!visible) {
            setvisible(!!value);
        }
        setpopover(!popover);
        if (value.length < 6) {
            return Promise.reject('');
        }
        return Promise.resolve();
    }

    const checkConfirm = (_: any, value: string) => {
        if (!value || form.getFieldValue('password') === value) {
            return Promise.resolve();
        }
        return Promise.reject("两次输入的密码不匹配!");
    }

    const renderPasswordProgress = () => {
        const value = form.getFieldValue('password');
        const passwordStatus = getPasswordStatus();
        return value && value.length ? (
            <div className={`progress-${passwordStatus}`}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className="progress"
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    };

    return (

        <Form layout="vertical" form={form} name="register" onFinish={onFinish}>
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
            <Popover
                getPopupContainer={(node) => {
                    if (node && node.parentNode) {
                        return node.parentNode as HTMLElement;
                    }
                    return node;
                }}
                content={
                    visible && (
                        <div style={{ padding: '4px 0' }}>
                            {passwordStatusMap[getPasswordStatus()]}
                            {renderPasswordProgress()}
                        </div>
                    )
                }
                overlayStyle={{ width: 240 }}
                placement="right"
                visible={visible}
            ></Popover>
            <Form.Item
                name="password"
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
                dependencies={['password']}
            >
                <Input.Password size="large" placeholder="确认密码" />
            </Form.Item>
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
                className='button-login'
                loading={submitting}
                size="large"
                type="primary"
                htmlType="submit"
                block
            >
                注册
            </Button>
        </Form>
    )
}

export { Register }