const { user, host } = require("./deploy.local")
// console.log(user)
// console.log(host)
module.exports = {
  apps: [{
    name: "static-service",
    script: "./bin/www"
  }],
  // 敏感信息后续需要匹配到不上传GITHUB
  deploy: {
    production: {
      "user": user || "用户名",
      "host": host || ["服务器IP"],
      "ref": "origin/main",
      "repo": "git@github.com:Alan1034/static-service.git",
      "path": "/website",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js "
    }
  }
}
