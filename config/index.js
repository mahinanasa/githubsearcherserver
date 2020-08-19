'use strict';

let env = process.env.NODE_ENV || 'development'
console.log("ssssss",env)
let config = require(`./${env}.js`)
module.exports = config