/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-03-11 10:57:42
 * @LastEditTime: 2024-05-14 11:24:08
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \static-service\log\index.ts
 *
 */
/**
 * @description:
 * @return {*}
 */
exports.saveLog = (logText) => {
    try {
        const genLogData = (method) => `${method}: new log-${new Date().getTime()}\n`;
        // 创建一个可以写入的流，写入到文件log.txt中
        const fs = require('fs');
        const log = fs.createWriteStream(__dirname + '/log.txt', { flags: 'a' });
        // 使用utf8编码写入数据
        log.write(genLogData(`${logText}`), 'UTF8');
        // // 处理流事件-->data,end,and error;
        // log.on('finish', () => {
        //     console.log('写入完成。')
        // })
        log.end();
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=index.js.map