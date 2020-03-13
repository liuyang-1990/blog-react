import App from 'next/app';
import React from 'react';
import { Spin } from 'antd';
import { fetchInitialStoreState, Store } from '../../store';
import { Provider } from 'mobx-react';
import { ProgressLoading, MasterPage } from '../components';
import { LoadingOutlined } from '@ant-design/icons';
import '../styles/global.less';


Spin.setDefaultIndicator(<LoadingOutlined spin style={{ fontSize: '180%', marginTop: 30 }} />);

class MyMobxApp extends App {
  state = {
    store: new Store(),
  }

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext)
    const initialStoreState = await fetchInitialStoreState()

    return {
      ...appProps,
      initialStoreState,
    }
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props, state) {
    state.store.hydrate(props.initialStoreState)
    return state
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={this.state.store}>
        <ProgressLoading showAfterMs={100} />
        <MasterPage>
          <Component {...pageProps} />
        </MasterPage>
      </Provider>
    )
  }
}
export default MyMobxApp