var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', (req, res, next) => {
  res.send("Just created new record");
})

module.exports = router;
