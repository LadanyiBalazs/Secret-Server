const express = require("express");
const { setHeaders } = require("../middlewares/headerCheck.middleware");
const router = express.Router();
const secret = require("../../services/secret.service");
const { convert } = require("../../services/convertContentType.service");
const loggerService = require("../../services/logger.service");

router.get("/:hash", setHeaders, async (req, res) => {
    const hash = req.params.hash;

    try {
        const secretEntry = await secret.getFromDb(hash);
        res.send(convert(secretEntry, req));
        loggerService.info(`Secret with hash ${hash} was successfully retrieved.`);
    } catch(e) {
        res.status(e.status).send(convert({message: e.message}, req));
        loggerService.error(`An error occured retrieving secret with hash ${hash}. Error: ${e.message}`);
    } 
})

router.post("/", setHeaders, async (req, res) => {
    try {
        const response = await secret.addToDb(req.body);
        res.send(convert(response, req));
        loggerService.info(`Secret with hash ${response.hash} was successfully created.`);
    } catch(e) {
        res.status(e.status).send(convert({message: e.message}, req));
        loggerService.error(`Secret could not be created. Error: ${JSON.stringify(e.message)}`);
    }
})

module.exports = router;