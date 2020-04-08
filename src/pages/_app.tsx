import App from 'next/app';
import React from 'react';
import { MasterPage, ProgressLoading } from '../components';
import { SiteContextProvider, ThemeProvider } from '../context';
import '../styles/global.less';

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
        <ThemeProvider>
          <ProgressLoading />
          <MasterPage {...pageProps}>
            <Component {...pageProps} />
          </MasterPage>
        </ThemeProvider>
      </SiteContextProvider>
    )
  }
}
export default CustomApp