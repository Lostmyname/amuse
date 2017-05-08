'use strict';

const fs = require('fs');
const path = require('path');
const url = require('url');
const mkdirp = require('mkdirp');
const makePdf = require('./makePdf');

module.exports = app => {
  app.use('*', function(req, res, next) {
    if (req.query.pdf) {
      const pageUrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
      });

      makePdf(pageUrl).then(pdf => {
        const filepath = `tmp/page${req.query.page || 0}.pdf`;
        mkdirp.sync('tmp');
        fs.writeFileSync(filepath, pdf);
        res.sendFile(path.resolve(filepath));
      });
      return;
    }
    next();
  });
};
