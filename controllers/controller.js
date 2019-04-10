const uuidv4 = require('uuid/v4');
const dns = require('dns');
const Url = require('../models/url');

exports.getShortUrl = (req, res, next) => {
  const shortUrl = req.params.shortUrl;
  Url.find({short_url: shortUrl})
    .then(result => {
      if(result.length < 1) {
        res.json({
          message: 'Link doesn\'t exist',
          error: 'Invalid Link'
        })
      } else {
        const url = result[0].original_url;
        res.redirect(url);
      }
    }).catch(err => console.log(err))
}

exports.createUrl = (req, res, next) => {
  const url = req.body.url;
  dns.lookup(url.replace(/^(?:http(s)?:\/\/)/gi, ''), (err, address, family) => {
    if(err) {
      res.status(403).json({
        message: 'Invalid Url',
        error: 'Url doesn\'t exist'
      })
    } else {
      const shortUrl = uuidv4().substring(0, 5);
      const newUrl = new Url({
        original_url: url,
        short_url: shortUrl
      })
      newUrl.save()
        .then(result => {
          res.status(201).json({
            message: 'Url created successfully',
            url: shortUrl
          })
        })
        .catch(err => console.log(err));
    }
  })
}