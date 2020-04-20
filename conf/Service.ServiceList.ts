import { Service } from "./Service.ResfulAPI";

export default {
    [Service.BlogService]: {
        options: {
            header: {
                "accept": "application/json",
                "content-type": "application/json; charset=utf-8"
            }
        },
        address: { "address": "http://localhost:5000/" }
    }
}