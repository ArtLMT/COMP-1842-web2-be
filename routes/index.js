import express from 'express';

const router = express.Router();

/* GET home page. */
// nghĩa là khi người dùng vào "/", server sẽ gửi lại
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Sử dụng Default Export để export đối tượng router
export default router;