export class PermissionGroup {
    name = null;
    child = [];
    constructor(name, child = []) {
        this.name = name;
    }
}