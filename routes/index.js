var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/public/html/index.html', {root: __dirname.replace(/routes$/, '') })
});

router.get('/searchImage', function (req, res, next) {
  try {
    const searchImageHandler = require('../src/handlers/searchImage');
    searchImageHandler(req.query).then(result => {
      if(result.datarows.length === 0) {
        res.status(204).send(result);
      } else {
        res.status(200).send(result);
      }
      res.end();
    }).catch(err => {
      res.status(500).send(err);
      res.end();
    });
  } catch(err) {
    res.status(500).send(err);
    res.end();
  }
});

module.exports = router;
