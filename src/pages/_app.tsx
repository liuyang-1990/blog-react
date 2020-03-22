import App from 'next/app';
import React from 'react';
import { Spin } from 'antd';
import { ProgressLoading, MasterPage } from '../components';
import { LoadingOutlined } from '@ant-design/icons';
import '../styles/global.less';

Spin.setDefaultIndicator(<LoadingOutlined spin style={{ fontSize: '180%', marginTop: 30 }} />);

class CustomApp extends App {

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <ProgressLoading showAfterMs={100} />
        <MasterPage {...pageProps}>
          <Component {...pageProps} />
        </MasterPage>
      </>
    )
  }
}
export default CustomApp