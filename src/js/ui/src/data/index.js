if (process.env.NODE_ENV !== 'development') {
  module.exports = require('./core/store.prod');
}
else {
  module.exports = require('./core/store.dev');
}
