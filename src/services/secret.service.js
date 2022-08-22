const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const crypto = require("crypto");
const validator = require("./validator.service");
const { encrypt, decrypt } = require("./encrypt.service");

/**
 * @class SecretService
 * @description Service for managing secrets
 */
class Secret {
    /**
     * Get secret from database if it is not expired yet.
     * @param string hash 
     * @returns Promise
     */
    getFromDb = (hash) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve("database.json"), (err, data) => {
                if(err) {
                    reject({status: 500, message: err});
                }

                data = JSON.parse(data.toString());
                let secretObject = data.find(item => item.hash === hash);

                if (secretObject) {
                    if (secretObject.currentViews <= secretObject.expiresAfterViews && (dayjs(secretObject.expiresAt) > dayjs())) {
                        this.increaseViewCount(hash);
                        let toSend = {
                            hash: secretObject.hash,
                            secretText: decrypt(secretObject.secretText),
                            createdAt: secretObject.createdAt,
                            expiresAt: secretObject.expiresAt,
                            remainingViews: secretObject.expiresAfterViews - secretObject.currentViews,
                        }

                        resolve(toSend);
                    }

                    reject({status: 410, message: "Secret expired." });

                } else {
                    reject({status: 404, message: "Secret not found." });
                }
            })
        })
    }

    /**
     * Add secret to database after validation.
     * @param object sentData 
     * @returns Promise
     */
    addToDb = (sentData) => {
        return new Promise(async (resolve, reject) => {
            try {
                await validator.validation(sentData);
                fs.readFile(path.resolve("database.json"), (err, data) => {
                    if(err) {
                        reject({status: 500, message: err});
                    }
    
                    data = JSON.parse(data.toString());
                    let createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    
                    let expiresAt = sentData.expireAfter == 0 ? 
                                    dayjs(createdAt).add(100, "year").format("YYYY-MM-DD HH:mm:ss") : 
                                    dayjs(createdAt).add(sentData.expireAfter, "minute").format("YYYY-MM-DD HH:mm:ss");
                    let hash = crypto.randomBytes(10).toString('hex');
                    let toAdd = {
                        hash: hash,
                        createdAt: createdAt,
                        expiresAt: expiresAt,
                        secretText: encrypt(sentData.secret),
                        expiresAfterViews: +sentData.expireAfterViews,
                        currentViews: 0
                    }
                    data.push(toAdd);
                    fs.writeFile(path.resolve("database.json"), JSON.stringify(data), (err) => {
                        reject({ status: 500, message: err });
                    })
                    resolve({ message: "Secret added.", hash: hash });
                })    
            } catch (e) {
                reject({status: 405, message: e});
            }
        })
    }

    /**
     * Increase view count for a given secret.
     * @param string hash 
     * @returns Promise
     */
    increaseViewCount = (hash) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve("database.json"), (err, data) => {
                data = JSON.parse(data.toString());
                for (let i in data) {
                    if (data[i].hash === hash) {
                        data[i].currentViews++;
                    }
                }

                fs.writeFile(path.resolve("database.json"), JSON.stringify(data), (err) => {
                    reject(err);
                })

                resolve({ message: "Secret modified." });
            })
        })
    }
}

module.exports = new Secret;