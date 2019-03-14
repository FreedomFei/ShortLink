'use strict';

let express = require('express');
let router = express.Router();
let shortLinkController = require('../controllers/shortLinkController');

router.get('/:keyword', shortLinkController.keyword);

module.exports = router;