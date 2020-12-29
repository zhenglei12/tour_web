import http from "../libs/http";

export default {
    list: (data) => http.post('api/resources/list', data),
    detail: (id) => http.get('api/resources/detail', {
        id
    }),
    create: (data) => http.post('api/resources/add', data),
    update: (data) => http.post('api/resources/update', data),
    remove: (id) => http.post('api/resources/delete', {
        id
    }),
    history: (data) => http.post('api/resources/distribute/list', data),
    import: (data) => http.post('api/resources/import', data),
    allot: (data) => http.post('api/resources/distribute', data),
}