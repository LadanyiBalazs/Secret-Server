require("dotenv").config();
const env = process.env;
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const loggerService = require("./services/logger.service");
const http = require("http").Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

http.listen(env.PORT, () => {
    loggerService.info(`Server is listening on *:${env.PORT}`);
}).on("error", function(err){
    loggerService.error(err);
})