# 运行部署指南

## 开始运行：

`npm install`

`npm start` 

## 热刷新模式两个终端分别运行

`start-hot`
`dev-ts`

## nodemon 配置

restartable-设置重启模式 
ignore-设置忽略文件 
verbose-设置日志输出模式，true 详细模式 
execMap-设置运行服务的后缀名与对应的命令 
{ 
“js”: “node –harmony”
} 
表示使用 nodemon 代替 node 
watch-监听哪些文件的变化，当变化的时候自动重启 
ext-监控指定的后缀文件名

## 前端页面的内容需要cd到front文件夹内运行终端

npm run serve

### 前端打包：

本地：`npm run build`

线上：`npm run build-online`

## 生成exe文件

cnpm install -g pkg

pkg . --out-path "./build"

打包存放到build文件夹内

## 部署时可忽略的文件夹及内容，应用依赖

front 

node_modules可以在服务器的nodejs环境下使用`npm install`安装

推荐使用nodejs版本：\>=20.11.1

## 部署在Linux服务器上

推荐使用PM2进行部署

`npm install pm2@latest -g`

### 直接部署：

`pm2 start ecosystem.config.js`

### 远程部署：

在配置远程服务器之前，请确认：

- 远程服务器安装了 `PM2`

- 远程服务器已授予 `GIT` 克隆目标存储库的权限

然后在本地运行：

`pm2 deploy production setup`

初次部署和更新：

`pm2 deploy production`

提示：远程部署和pm2 save后的同名应用似乎有冲突，需要先运行`pm2 unstartup`

### 服务器开机启动：

启动：`pm2 startup`

保存：`pm2 save`

禁用：`pm2 unstartup`

### ngxin推荐配置：

```
upstream static-service_backend {
    server 127.0.0.1:3001;
}
server {
    location ^~/static-service/ {        
        proxy_pass http://static-service_backend/;
    }
}
```

打开：http://The.Server.IP/static-service/

界面预览：

![image-20240313160639026](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202403131606378.png)