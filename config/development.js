'use strict';

module.exports = {
  env: 'development',
  port: process.env.PORT || 5000,
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_auth:'',
  axios_baseUrl : 'https://api.github.com'
};
