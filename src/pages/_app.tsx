import App from 'next/app';
import React from 'react';
import { Spin } from 'antd';
import { MasterPage } from '../components';
import { LoadingOutlined } from '@ant-design/icons';
import { SiteContextProvider } from '../context/SiteContext';
import '../styles/global.less';
import '../styles/responsive.less';
import '../styles/reset.less';


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
      <SiteContextProvider>
        <MasterPage {...pageProps}>
          <Component {...pageProps} />
        </MasterPage>
      </SiteContextProvider>
    )
  }
}
export default CustomApp