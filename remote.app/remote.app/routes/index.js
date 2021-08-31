var express = require('express');
var router = express.Router();
var reStream = require('../cam/rtsp');;
var asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  res.render('index', {
    message: ''
  });
  //reStream.reStream(); do dokończenia.
}));

module.exports = router;