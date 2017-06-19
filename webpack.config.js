switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./webapp/config/webpack.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./webapp/config/webpack.test');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./webapp/config/webpack.dev');
}