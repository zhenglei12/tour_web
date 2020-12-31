import http from "../libs/http";

export default {
    list: (data) => http.post('api/trip/list', data),
    create: (data) => http.post('api/trip/add', data),
    update: (data) => http.post('api/trip/update', data),
    remove: (id) => http.post('api/trip/delete', {
        id,
    }),
    select: (data) => http.post('api/public/trip/list', data),
}