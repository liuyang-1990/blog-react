import axios from "axios";
import { HttpRequest } from "./httpRequest";
import ServiceAPI from "../../conf/Service.ResfulAPI";
import ServiceList from "../../conf/Service.ServiceList";
export class HttpFactory {
    private httpRequest: HttpRequest;
    //private serviceAPI: any;
    constructor() {
        this.httpRequest = new HttpRequest();
        //const dev = process.env.NODE_ENV !== 'production';
        // path.resolve(__dirname, "../../conf", !dev ? "/prod" : "");
        //process.env
    }

    create(apiName: string) {
        if (!apiName) {
            throw new Error("name不能为空");
        }
        const req = ServiceAPI[apiName];
        if (!req) {
            throw new Error("配置不存在");
        }
        this.httpRequest.method = req.Method;
        const serviceName = req.Service;
        if (ServiceList[serviceName]?.options?.header) {
            this.setHeader(ServiceList[serviceName]?.options?.header);
        }
        const baseUrl: string = ServiceList[serviceName].address.address;
        const apiPath: string = ServiceAPI[apiName].Path;
        const url = `${baseUrl.replace(/^([/])+|([/])+$/g, '')}/${apiPath.replace(/^([/])+|([/])+$/g, '')}`;
        this.httpRequest.url = url;
        return this;
    }
    setHeader(headers) {
        const original = this.httpRequest.headers;
        const header = { ...original, ...headers };
        this.httpRequest.headers = header;
        return this;
    }
    send(params?: any) {
        if (["POST", "PUT"].indexOf(this.httpRequest.method) > -1) {
            this.httpRequest.data = params || {};
        } else {
            this.httpRequest.params = params || {};
        }
        console.log(this.httpRequest);
        return axios(this.httpRequest);
    }

}