import http from '../libs/http';
import cache from '../libs/cache';

console.log(http, cache);

export default {
    login: (data) => http.post('api/auth/login', data),
    logout: () => http.post('api/auth/logout'),
    detail: () => http.get('api/user/detail'),
    acl: () => http.get('api/user/permission'),
}