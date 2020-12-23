import LoginApi from '../api/login';
import AuthHandler from './auth.handler';
import Acl from './acl';
import router from '../router';

var _user;
var _pending;

class AuthManager {
    constructor() {
        if (AuthHandler.hasToken()) {
            Acl.restorePermission();
            this.restoreUser();
        }
    }

    login(data) {
        return LoginApi.login(data).then(res => {
            console.log('登录', res);
            AuthHandler.saveToken(res.token);
            return Promise.all([
                Acl.restorePermission(),
                this.restoreUser()
            ]);
        })
    }

    logout() {
        return LoginApi.logout().then(() => {
            _user = null;
            AuthHandler.clearToken();
            Acl.destory();
            router.push('/login');
        });
    }

    check() {
        return new Promise((resolve, reject) => {
            if (_user) {
                resolve();
            } else if (_pending) {
                _pending.then(() => resolve())
            } else {
                return reject();
            }
        })
    }

    restoreUser() {
        _pending = LoginApi.detail().then(res => {
            console.log('用户信息', res);
            _user = res;
        }).catch(() => {
            AuthHandler.clearToken();
            _user = null;
        }).finally(() => {
            _pending = null;
        });
        return _pending;
    }

    user() {
        return _user;
    }
}

export default new AuthManager();