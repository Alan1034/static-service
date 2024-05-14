/**
 * @format
 * @description: 文件/目录路经检查
 * @param {*} dir
 * @return {*}
 */

exports.fileCheck = (dir) => {
  try {
    // console.log("dir", dir)
    const fs = require("fs");
    // if (!fs.existsSync(dir)) {
    //   return new Error(`找不到此路径${dir}`)
    // }
    const stats = fs.statSync(dir);

    // console.log("stats", stats)

    // console.log(stats)
    // console.log("读取文件信息成功！")

    // // //检测文件类型
    // console.log("是否为文件（isFile）" + stats.isFile())
    // console.log("是否为目录（isDirectory）" + stats.isDirectory())
    return {
      stats,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
    };
  } catch (error) {
    return error;
  }
};
/**
 * @description: 校验文件类型
 * @param {*} mimeType
 * @param {*} filename
 * @return {*}
 */
exports.typeCheck = (mimeType, filename) => {
  // console.log(mimeType, "mimeType");
  // console.log(filename, "filename");
  let allow = false;
  let message = "文件类型校验不通过";

  const baseAllow = () => {
    allow = true;
    message = "文件类型校验通过" + filename;
  };
  const suffix = filename.split(".")[1];
  switch (true) {
    case ["ttf"].includes(suffix):
      if (mimeType === "application/octet-stream") {
        baseAllow();
      }
      break;
    case /^image\/{1}/.test(mimeType):
      // image格式清单：
      // https://www.iana.org/assignments/media-types/media-types.xhtml#image
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
      baseAllow();
      break;
    default:
      break;
  }
  return {
    allow,
    message,
  };
};
