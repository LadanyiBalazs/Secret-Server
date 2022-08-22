const rsa = require('node-rsa');

const key = new rsa({b: 512});
console.log("Place this string as it is in your .env file with the index PRIVATE_KEY:\n");
console.log(key.exportKey('pkcs8').replace(/\n/g, '\\n')+"\n");
console.log("\x1b[31m!!! DO NOT SHARE WITH ANYONE !!!\x1b[0m\n");