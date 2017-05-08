'use strict';

const chrome = require('chrome-remote-interface');
const launchChrome = require('./launchChrome');

module.exports = async function makePdf(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const launcher = await launchChrome();
      const protocol = await chrome();
      const { Page } = protocol;
      await Page.enable();
      Page.navigate({ url });
      await Page.loadEventFired();
      const result = await Page.printToPDF();
      const pdf = Buffer.from(result.data, 'base64');
      protocol.close();
      launcher.kill();
      resolve(pdf);
    } catch (err) {
      reject(err);
    }
  });
};
