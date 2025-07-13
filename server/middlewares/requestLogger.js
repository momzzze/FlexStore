const chalk = require('chalk');

const requestLogger = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(
    chalk.greenBright(`\n📥 [${now}] ${req.method} ${req.originalUrl}`)
  );

  if (Object.keys(req.body).length > 0) {
    console.log(chalk.blueBright(`📦 Body:`), req.body);
  }

  next();
};

module.exports = requestLogger;
