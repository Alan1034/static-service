const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("进来登录")
  res.render(path.resolve(__dirname, "../views/login"));
});


module.exports = router;
