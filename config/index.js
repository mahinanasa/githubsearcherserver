'use strict';

let env = process.env.NODE_ENV || 'development'
let config = require(`./${env}.js`)
module.exports = config