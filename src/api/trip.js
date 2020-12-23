import http from "../libs/http";

export default {
    list: (data) => http.post('api/trip/list', data),
    create: (data) => http.post('api/trip/add', data),
    update: (data) => http.post('api/trip/update', data),
}