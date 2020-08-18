'use strict';

let env = process.env.NODE_ENV || 'development'
let config = require(`./${env}`)
cd
module.exports = config