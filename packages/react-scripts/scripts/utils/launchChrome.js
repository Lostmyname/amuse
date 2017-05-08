'use strict';

var { ChromeLauncher } = require('lighthouse/lighthouse-cli/chrome-launcher');

module.exports = function launchChrome() {
  var launcher = new ChromeLauncher({
    port: 9222,
    autoSelectChrome: true,
    additionalFlags: ['--window-size=412,732', '--disable-gpu', '--headless']
  });

  return launcher.run().then(() => launcher).catch(err => {
    return launcher.kill().then(() => {
      throw err;
    }, console.error);
  });
};
