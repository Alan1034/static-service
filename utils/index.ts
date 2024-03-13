/**
 * @description: 文件/目录路经检查
 * @param {*} dir
 * @return {*}
 */
exports.fileCheck = (dir) => {
  try {
    // console.log("dir", dir)
    const fs = require('fs')
    // if (!fs.existsSync(dir)) {
    //   return new Error(`找不到此路径${dir}`)
    // }
    const stats = fs.statSync(dir)

    // console.log("stats", stats)

    // console.log(stats)
    // console.log("读取文件信息成功！")

    // // //检测文件类型
    // console.log("是否为文件（isFile）" + stats.isFile())
    // console.log("是否为目录（isDirectory）" + stats.isDirectory())
    return {
      stats,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory()
    }
  } catch (error) {
    return error
  }

}