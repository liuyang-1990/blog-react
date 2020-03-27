import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button, Col, Form, Input, Row } from 'antd';
import cx from 'classnames';
import "./style.less";

const Signup: FC = () => {

    return (
        <div className='wrapper'>
            <Form layout="vertical">
                <Row gutter={16} className='form-row'>
                    <Col xs={24}>
                        <Form.Item name="name" rules={[{ required: true }]} validateTrigger={['onBlur']} label="Name">
                            <Input size="large" placeholder="Name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item
                            name="email"
                            rules={[{ required: true }, { type: 'email' }]}
                            validateTrigger={['onBlur']}
                            label="Email"
                        >
                            <Input size="large" placeholder="Email" />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name="password"  rules={[{ required: true }]} validateTrigger={['onBlur']} label="Password">
                            <Input.Password size="large" placeholder="Password" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} className='button-row'>
                    <Col xs={24}>
                        <Button
                            className='button-login'
                            //loading={submitSignupMutation.loading}
                            size="large"
                            type="primary"
                            htmlType="submit"
                            block
                        //onClick={onSubmit}
                        >
                            Sign Up
                </Button>
                    </Col>
                </Row>
            </Form>
            <div className='toolsbar'>
                <Row className='register-row'>
                    <Link href="/login" prefetch={false}>
                        <a>Already have an account? Log In</a>
                    </Link>
                </Row>
            </div>
        </div>
    )
}

export { Signup }