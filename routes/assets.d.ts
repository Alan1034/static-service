/**
 * @format
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-03-05 18:56:07
 * @LastEditTime: 2024-05-13 19:09:11
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \static-service\routes\assets.ts
 */
declare const express: any;
declare const router: any;
declare const fs: any;
declare const path: any;
declare const busboy: any;
declare const multiparty: any;
declare const fileCheck: any;
declare const saveLog: any;
declare const utf8: any;
/**
 * @description: 生成文件路径
 * @param {*} filePath
 * @param {*} name
 * @return {*}
 */
declare const getdir: (filePath?: string, name?: string) => any;
