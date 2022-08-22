const dayjs = require("dayjs");

class Logger {
    info(msg) {
        console.log(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] \x1b[36m[INFO]\x1b[0m ${msg}`);
    }
    error(msg) {
        console.log(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] \x1b[31m[ERROR]\x1b[0m ${msg}`);
    }
}

module.exports = new Logger();