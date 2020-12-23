import LoginApi from '../api/login';

var _aclMap;
var _pending;

class AclManager {
    check() {
        return new Promise((resolve, reject) => {
            if (_aclMap) {
                resolve();
            } else if (_pending) {
                _pending.then(() => resolve())
            } else {
                return reject();
            }
        })
    }

    restorePermission() {
        _pending = LoginApi.acl().then(res => {
            if (res.list) {
                _aclMap = new Map();
                res.list.forEach(_ => {
                    _aclMap.set(_.name, _);
                })
            }
            console.log('权限初始化完成', _aclMap);
        })
        return _pending;
    }

    destory() {
        _aclMap = null;
    }
}

export default new AclManager();