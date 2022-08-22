const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerDocument = require(path.resolve('swagger.json'));

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));

module.exports = router;