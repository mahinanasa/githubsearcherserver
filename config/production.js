'use strict';

module.exports = {
  env: 'production',
  port: process.env.PORT || 5000,
  redis_host: 'ec2-52-54-229-237.compute-1.amazonaws.com',
  redis_port: 32139,
  redis_auth: "pe4fe8521c400ebbed14d404746ffe552d5e9fd5a4ae33382f76de8c9d53eac35",
  axios_baseUrl : 'https://api.github.com'
};
