/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-03-05 18:14:36
 * @LastEditTime: 2024-03-06 11:45:12
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \static-service\routes\index.js
 * 
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(res)
  // res.render('index', { title: 'Express' });
  res.render('../public/index/', {
  });
});
// router.get('/assets', function(req, res, next) {
//   console.log(res)
//   console.log(assets)
//   // res.render('index', { title: 'Express' });
//   res.render('../public/index/assets', {
//   });
// });

module.exports = router;
