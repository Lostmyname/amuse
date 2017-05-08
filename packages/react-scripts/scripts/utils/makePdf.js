'use strict';

const chrome = require('chrome-remote-interface');
const launchChrome = require('./launchChrome');

module.exports = function makePdf(url) {
  return launchChrome().then(launcher => {
    return chrome().then(protocol => {
      const { Page } = protocol;
      return Page.enable().then(() => {
        Page.navigate({ url });
        return Page.loadEventFired().then(() => {
          return Page.printToPDF().then(result => {
            const pdf = Buffer.from(result.data, 'base64');
            protocol.close();
            launcher.kill();
            return pdf;
          });
        });
      });
    });
  });
};
