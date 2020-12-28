import LoginApi from '../api/login';
import {
    PermissionGroup
} from '../model/Permission';

var _pending;

class AclManager {
    check() {
        return new Promise((resolve, reject) => {
            if (this.permission) {
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
            this.permission = new PermissionGroup(res.list);
            console.log('权限初始化完成', this.permission);
        })
        return _pending;
    }

    destory() {
        this.permission = null;
    }
}

export default new AclManager();