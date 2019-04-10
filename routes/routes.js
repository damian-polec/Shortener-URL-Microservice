const express = require('express');
const controller = require('../controllers/controller');
const router = require = express.Router();

router.get('/api/shorturl/:shortUrl', controller.getShortUrl);
router.post('/api/shorturl/new', controller.createUrl);

module.exports = router;