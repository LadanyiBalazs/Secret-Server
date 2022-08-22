require("dotenv").config();
const env = process.env;
const rsa = require('node-rsa');

/**
 * @class EncryptService
 * @description Encrypts and decrypts data using RSA encryption
 */
class Encrypt {
    /**
     * Encrypts data using RSA encryption
     * @param string secretMessage 
     * @returns string
     */
    encrypt = (secretMessage) => {
        let key = new rsa(env.PRIVATE_KEY.replaceAll("\\n", "\n"), "pkcs8");
        const encrypted = key.encrypt(secretMessage, 'base64');

        return encrypted;
    }

    /**
     * Decrypts data using RSA encryption
     * @param string encrypted 
     * @returns string
     */
    decrypt = (encrypted) => {
        let key = new rsa(env.PRIVATE_KEY.replaceAll("\\n", "\n"), "pkcs8");
        const decrypted = key.decrypt(encrypted, 'utf-8');

        return decrypted;
    }
}

module.exports = new Encrypt;