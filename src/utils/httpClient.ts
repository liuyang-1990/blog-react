import axios from "axios";
import { message } from "antd";

export const httpClient = axios.create({
    baseURL: process.env.BASE_ADDRESS,
    timeout: parseInt(process.env.TIME_OUT) || 0,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    maxContentLength: 20971520
});

// Add a request interceptor
httpClient.interceptors.request.use(config => {
    // Do something before request is sent
    const token = "";
    if (token) {
        config.headers["Authorization"] = token;
    }
    return config;
}, error => {
    // Do something with request error
    message.error('bad request');
    console.log(error);
    return Promise.reject(error);
});

// Add a response interceptor
httpClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        // The request was made and the server responded with a status code
        //that falls out of the range of 2xx
        const { data, status } = error.response;
        switch (status) {
            case 400:
                message.error(data.Msg || 'Request failed!');
                break;
            case 401:
                message.error('unauthorized or token has expired!');
                break;
        }
    } else if (error.message) {
        // Something happened in setting up the request that triggered an Error
        message.error(error.message);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        message.error('bad request')
        console.log(error.request);
    }
    return Promise.reject(error);
});
