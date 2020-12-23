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
        if (!file) {
            throw new Error('没有要导出的文件');
        }
        var reader = new FileReader();
        reader.readAsDataURL(file); // 转换为base64，可以直接放入a标签href
        reader.onload = function (e) {
            var a = document.createElement('a'); // 转换完成，创建一个a标签用于下载
            a.download = `${fileName}.${fileType}`;
            a.href = (e.target).result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
    }
}

export default new UtilsManager();