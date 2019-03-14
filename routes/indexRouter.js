'use strict';

let express = require('express');
let router = express.Router();
let shortLinkController = require('../controllers/shortLinkController');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.get('/', shortLinkController.root);
router.post('/insert', shortLinkController.insert);
router.get('/selectLink', shortLinkController.selectLink);

module.exports = router;
