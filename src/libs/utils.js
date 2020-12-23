class UtilsManager {
    constructor() {

    }

    mapToArray(map) {
        return Object.keys(map).map(_ => {
            return {
                label: map[_],
                value: _
            }
        })
    }

    export (file, fileName = '导出文件', fileType = 'xls') {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject('没有要导出的文件');
            }
            try {
                var reader = new FileReader();
                reader.readAsDataURL(file); // 转换为base64，可以直接放入a标签href
                reader.onload = function (e) {
                    var a = document.createElement('a'); // 转换完成，创建一个a标签用于下载
                    a.download = `${fileName}.${fileType}`;
                    a.href = (e.target).result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    resolve();
                };
            } catch (e) {
                reject(e);
            }
        })
    }
}

export default new UtilsManager();