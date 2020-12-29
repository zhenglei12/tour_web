import http from "../libs/http";

export default {
    list: (data) => http.post('api/order/list', data),
    statistic: () => http.post('api/order/statistics'),
    create: (data) => http.post('api/order/add', data),
    update: (data) => http.post('api/order/update', data),
    // remove: (id) => http.post('api/order/delete', {
    //     id
    // }),
    detail: (id) => http.get('api/order/detail', {
        id
    }),
    export: (id) => http.post('api/order/exports', {
        id
    }, {
        format: false,
        responseType: 'blob',
    }),
    reject: (id) => http.post('api/order/audit', {
        id,
        status: -2,
    }),
    pass: (id) => http.post('api/order/audit', {
        id,
        status: 1,
    }),
}