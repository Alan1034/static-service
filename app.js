/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-03-05 18:14:36
 * @LastEditTime: 2024-07-02 18:51:22
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \static-service\app.js
 * 
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
var ejs = require('ejs');
var assets = require('./routes/assets');
var indexRouter = require('./routes/index');
// var personnelRouter = require('./routes/personnel');

var app = express();

// view engine setup
// app.set('views', path.join("./", 'views'));
// app.set('view engine', 'jade');
//模板类型指定为html
app.engine('html', ejs.__express)
//启动视图引擎
app.set('view engine', 'html')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//静态地图资源
app.use(express.static(path.join('./', 'public'), {
  setHeaders: (res, path, stat) => {
    res.set({
      // 'Content-Type': "image/png;charset=UTF8",
      'Access-Control-Allow-Origin': '*',
    })
  }
}));

app.use('/', indexRouter);
app.use('/assets', assets);
// 动态代理请求到相应的Nuxt应用
app.use('/auth', (req, res, next) => {
  // const appName = req.params.appName;
  const { serviceRegistry } = require('./serviceRegistry');
  const appName = "auth";
  const targetPort = serviceRegistry[appName];
  if (targetPort) {
    const { host, port } = targetPort
    const proxy = createProxyMiddleware({
      target: `http://${host}:${port}`,
      pathRewrite: { [`^/${appName}`]: '' },
      changeOrigin: true,
    });
    return proxy(req, res, next);
  } else {
    res.status(404).send('Service not found');
  }
});
// app.use('/personnel', personnelRouter);

app.all('*', function (req, res, next) {
  // 统一设置请求头
  res.header('Access-Control-Allow-Origin', '*');
  next() // pass control to the next handler
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development


  // render the error page
  const status = err.status || 500

  // res.status(status) 
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.render('error'); 
  // 网页用的，加了这个接口不能返回JSON
  // 统一捕获报错返回，不用trycatch
  // Express 不处理 异步 错误，因此您需要通过调用 next();return 来报告错误。
  // console.log(res) 不知道为什么这里不加延迟message会发不出去，和res的内部变化有关
  setTimeout(() => {
    res.status(status).json({
      message: `${err.message}`
    })
  }, 100);
});

module.exports = app;
