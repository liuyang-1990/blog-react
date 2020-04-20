export enum Service {

    BlogService

}


export default {
    login: {
        Method: "POST",
        Path: "account/login",
        Service: Service.BlogService
    },
    register: {
        Method: "POST",
        Path: "account/register",
        Service: Service.BlogService
    },
    captcha:{
        Method: "GET",
        Path: "account/captcha",
        Service: Service.BlogService
    },
    oauth:{
        Method: "GET",
        Path: "account/oauth",
        Service: Service.BlogService
    }
}