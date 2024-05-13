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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const busboy = require("busboy");
const multiparty = require("multiparty");
const fileCheck = require("../utils/index").fileCheck;
const saveLog = require("../log/index").saveLog;
const utf8 = require("utf8");
/* GET home page. */
/**
 * @description: 生成文件路径
 * @param {*} filePath
 * @param {*} name
 * @return {*}
 */
const getdir = (filePath = "", name = "") => {
    // console.log("filePath", filePath)
    // console.log("path.delimiter", path.sep);
    filePath = filePath.replace(/\//gm, "\\");
    const filePaths = filePath.split(path.sep);
    // console.log("filePaths", filePaths);
    // console.log("name", name);
    const fileDirList = new Set(["./", "public", "assets", ...filePaths, name]);
    // console.log("fileDirList", fileDirList);
    return path.join(...[...fileDirList]);
};
router.get("/assetsDir", function (req, res, next) {
    // console.log("查看/assets目录")
    // console.log("查看/assets目录", req.query)
    const { filePath = "", name = "" } = req.query;
    const dir = getdir(filePath, name);
    const statsInfo = fileCheck(dir);
    if (!statsInfo.stats) {
        next(new Error(statsInfo));
        return;
    }
    // Set去重
    const fileObjs = fs.readdirSync(dir, { withFileTypes: true });
    // console.log(fileObjs)
    fileObjs.forEach((file) => {
        // console.log(file);
        // 格式化路径，适配当前系统
        const thisPath = path.normalize(file.path);
        file.isLeaf = !(path.extname(file.name) === "");
        file.path = thisPath;
        // console.log(`public${path.sep}assets`)
        file.basePath = thisPath.replace(`public${path.sep}assets`, "");
    });
    // console.log(fileObjs)
    res.send(JSON.stringify({
        data: {
            fileObjs,
        },
    }));
});
router.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === "POST") {
            const { filePath = "" } = req.query;
            const bb = busboy({ headers: req.headers });
            req.pipe(bb);
            bb.on("file", (name, file, info) => {
                const { mimeType } = info;
                // console.log(name, 1)
                // console.log(utf8.encode(info.filename), 2)
                // console.log(filePath, 3)
                // console.log(file, 4)
                // console.log(info, 5)
                console.log(mimeType, "mimeType");
                const saveDir = getdir(filePath);
                const statsInfo = fileCheck(saveDir);
                if (!statsInfo.stats) {
                    // 路径文件夹不存在
                    next(new Error(statsInfo));
                    return;
                }
                // console.log("检查是否存在")
                const saveTo = getdir(filePath, utf8.decode(info.filename));
                const saveToInfo = fileCheck(saveTo);
                if (saveToInfo.stats) {
                    next(new Error("当前文件已存在"));
                    return;
                }
                // console.log("我存", saveTo)
                file.pipe(fs.createWriteStream(saveTo));
                saveLog(`文件${saveTo}写入`);
            });
            bb.on("close", () => {
                // res.writeHead(200, { 'Connection': 'close' });
                //
                res.json({
                    message: "文件上传成功",
                });
            });
            return;
        }
        res.writeHead(404);
        res.end();
    });
});
router.post("/uploadAssets", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === "POST") {
            const form = new multiparty.Form();
            form.parse(req, function (err, fields, files) {
                // console.log(files);
                // console.log(util.inspect({ fields: fields, files: files }));
                // resolve(fields)
                const { filePath } = fields;
                const saveTo = getdir(filePath[0], files[0].filename);
                files[0].pipe(fs.createWriteStream(saveTo));
            });
            return;
        }
        res.writeHead(404);
        res.end();
    });
});
router.delete("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("准备删除文件！")
        const { filePath = "", name = "" } = req.query;
        const dir = getdir(filePath, name);
        const statsInfo = fileCheck(dir);
        if (!statsInfo.stats) {
            next(new Error(statsInfo));
            return;
        }
        fs.unlink(dir, (err) => {
            if (err) {
                next(new Error(err));
                return;
            }
            saveLog(`文件${dir}删除`);
            res.json({
                message: "文件删除成功",
            });
        });
    });
});
module.exports = router;
//# sourceMappingURL=assets.js.map