import http from "../libs/http";

export default {
    select: (data) => http.post('api/public/agent/list', data),
    list: (data) => http.post('api/agent/list', data),
    update: (data) => http.post('api/agent/update', data),
    create: (data) => http.post('api/agent/add', data),
    detail: (id) => http.get('api/agent/detail', {
        id
    }),
    remove: (id) => http.post('api/agent/delete', {
        id
    }),
    order: (data) => http.post('api/order/list', data),
}