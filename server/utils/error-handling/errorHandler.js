const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const chalk = require('chalk');

  console.error(chalk.red.bold('\n🛑 Error occurred:'));
  console.error(chalk.yellow(`📍 ${req.method} ${req.originalUrl}`));
  console.error(chalk.magenta(`📦 Status: ${statusCode}`));
  console.error(chalk.cyan(`📝 Message: ${err.message}`));
  if (process.env.NODE_ENV !== 'production') {
    console.error(chalk.gray('📂 Stack:\n'), err.stack);
  }

  // 📤 Send response
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Something went wrong',
      status: statusCode,
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    },
  });
};

module.exports = errorHandler;
