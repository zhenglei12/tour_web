import http from '../libs/http';

export default {
    roleUserList: (alias) => http.post('api/pub/role/user_list', {
        alias
    }),
}