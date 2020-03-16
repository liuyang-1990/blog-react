import axios from "axios";


export const httpClient = axios.create({
    baseURL: process.env.BASE_ADDRESS,
    timeout: parseInt(process.env.TIME_OUT, 10) || 0,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    //maxContentLength: 2000
});

// 添加请求拦截器
httpClient.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    var token = "";
    if (token) {
        config.headers["Authorization"] = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
});

// 添加响应拦截器
httpClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});
