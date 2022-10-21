const openapiRoutes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var options = {
    explorer: true
  };

openapiRoutes.use('/', swaggerUi.serve);
openapiRoutes.get('/', swaggerUi.setup(swaggerDocument, options));

module.exports = openapiRoutes;