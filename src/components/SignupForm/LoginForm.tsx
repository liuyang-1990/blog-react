import React, { FC, useState, useContext } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { httpClient, login } from '../../utils';
import { LoginContext } from '../../context';

type Props = {
    onCancel?: () => void;
}

const Login: FC<Props> = ({ onCancel }) => {
    const [submitting, setSubmitting] = useState(false);
    const [autoLogin, setAutoLogin] = useState(true);
    const { setIsLogin, setUserName } = useContext(LoginContext);

    const onFinish = async (values: { [key: string]: string }) => {
        setSubmitting(true);
        try {
            const res = await httpClient.post('v1/account/login', values);
            const { data } = res;
            const { AccessToken, Expires, UserName } = data;
            login({ token: `AccessToken:${AccessToken};UserName:${UserName}`, expires: Expires });
            setUserName(values.UserName);
            setIsLogin(true);
            setSubmitting(false);
            onCancel && onCancel();
        } catch (err) {
            setSubmitting(false);
        }
    }

    return (
        <Form layout="vertical" name="login" onFinish={onFinish}>
            <Form.Item
                name="UserName"
                rules={[
                    {
                        required: true,
                        message: "请输入用户名!"
                    }
                ]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="用户名" />
            </Form.Item>
            <Form.Item
                name="Password"
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
            <div>
                <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>自动登录</Checkbox>
                <a style={{ float: 'right' }}>忘记密码</a>
            </div>
            <Button
                type="primary"
                size="large"
                loading={submitting}
                htmlType="submit"
                style={{ marginTop: '24px' }}
                block
            >
                登录
                </Button>

        </Form>
    )
}

export { Login }