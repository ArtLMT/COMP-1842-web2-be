var express = require('express');
var router = express.Router();

/* GET home page. */
// nghĩa là khi người dùng vào "/", server sẽ gửi lại
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
