import React, { createContext } from 'react';

const LoginContext = createContext<{
    isLogin: boolean;
    userName: string;
    setIsLogin: Function;
    setUserName: Function;
}>({
    isLogin: false,
    userName: '',
    setIsLogin: Function,
    setUserName: Function
});

export { LoginContext };