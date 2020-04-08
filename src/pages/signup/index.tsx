import React from 'react';
import { NextPageContext } from 'next';
import { Card } from 'antd';
import { Signup } from '../../components'
import "./style.less";
const nextPage = ({ router }) => {
    return (
        <Card bordered={false}>
            <div className='signup-wrapper'>
                <div className='full-container'>
                    <div className='signup-box'>
                        <h2 className='title'>Sign Up</h2>
                        <div className='signup-form'>
                           
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

nextPage.getInitialProps = async (ctx: NextPageContext) => {
    return { query: ctx.query };
};

export default nextPage;
