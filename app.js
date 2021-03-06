let createError = require('http-errors');
let express = require('express');
let app = express();
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require("dotenv").config();
let indexRouter = require('./routes/index');
let githubSearch = require('./routes/githubSearch');
let cors = require("cors");
const redis = require('redis')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
let env = process.env.NODE_ENV || 'development'
let config = require(`./config/${env}.js`)

swaggerDocument = require('./swagger.json');
//setup port constants

//Redis Connection
const redis_client = redis.createClient(config.redis_port , config.redis_host,);

if (config.env == 'production') {
  redis_client.auth(config.redis_auth);
}
redis_client.on("ready", function () {
  
  console.log("Redis is ready on "+ config.env);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Swagger definition
const swaggerDefinition = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'GitGub Searcher',
      version: '1.0.0',
    },
    "host": "localhost:5000",
    basePath: '',
    schemes: [`http`],
    consumes: ['application/json'],
    produces: ['application/json'],

  },
  apis: [
    './routes/githubSearch.js'
  ]
};
;

// initialize swagger-jsdocW
const swaggerSpec = swaggerJSDoc(swaggerDefinition);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//app.use('/api/api-docs', express.static('api-docs'));

app.use('/', indexRouter);
app.use('/api', githubSearch);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name == "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

module.exports = app;
