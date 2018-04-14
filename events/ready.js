const chalk = require('chalk');
module.exports = client => { // eslint-disable-line no-unused-vars
  console.log(chalk.bgGreen.black('I\'m Online'));
  client.user.setActivity("wb!help | Alicia#4172", {type: "STREAMING"});
};
