const secretRoutes = require("./http-endpoints/secret.routes");
const swaggerRoutes = require("./http-endpoints/swagger.routes");
const express = require("express");
const router = express.Router();

router.use('/v1/secret', secretRoutes)
router.use('/v1', swaggerRoutes)

module.exports = router;