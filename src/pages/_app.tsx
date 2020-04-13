import App from 'next/app';
import React, { useState } from 'react';
import { MasterPage, ProgressLoading } from '../components';
import { SiteContextProvider, ThemeProvider, LoginContext } from '../context';
import nextCookie from 'next-cookies';
import '../styles/global.less';


const CustomApp = ({ Component, pageProps, ...rest }) => {
  const { token, userName } = rest;
  const [isLogin, setIsLogin] = useState(!!token);

  return (
    <LoginContext.Provider value={{ isLogin: isLogin, userName: userName, setIsLogin: setIsLogin }}>
      <SiteContextProvider>
        <ThemeProvider>
          <ProgressLoading />
          <MasterPage {...pageProps}>
            <Component {...pageProps} />
          </MasterPage>
        </ThemeProvider>
      </SiteContextProvider>
    </LoginContext.Provider>

  )
}

CustomApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const appProps = await App.getInitialProps(appContext);
  let { token } = nextCookie(ctx);
  let userName = '';
  if (token) {
    token = decodeURIComponent(token);
    const tokenArr = token.split(";");
    if (tokenArr.length > 1 && tokenArr[1].split(":").length > 1) {
      userName = tokenArr[1].split(":")[1];
    }
  }

  return {
    ...appProps,
    token: token,
    userName: userName
  }
}

export default CustomApp