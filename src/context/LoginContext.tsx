import React, { createContext } from 'react';

const LoginContext = createContext<{
    isLogin: boolean;
    userName: string;
    setIsLogin: Function;
}>({
    isLogin: false,
    userName: '',
    setIsLogin: Function,
});

export { LoginContext };