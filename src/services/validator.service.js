const dayjs = require("dayjs");

/**
 * @class Validator
 * @description Validate data before adding to database.
 */
class Validator {
    /**
     * Validate data before adding to database.
     * @param {object} sentData 
     * @returns {Promise}
     */
    validation = (sentData) => {
        return new Promise((resolve, reject) => {
            let errors = [];
            
            if (!sentData.secret) {
                errors.push("secret is required.");
            }

            if (!sentData.expireAfter) {
                errors.push("expireAfter is required.");
            }

            if (!sentData.expireAfterViews) {
                errors.push("expireAfterViews is required.");
            }

            if(isNaN(sentData.expireAfter)) {
                errors.push("expireAfter must be an integer.");
            }

            if (sentData.expireAfterViews < 1 || isNaN(sentData.expireAfterViews)) {
                errors.push("expireAfterViews must be an integer and greater than 0.");
            }

            if(errors.length > 0) {
                reject(errors);
            }

            resolve(true);
        })
    }
}

module.exports = new Validator;