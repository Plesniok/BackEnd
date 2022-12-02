'use strict'
const rootDir = require('path').resolve('./');
require('dotenv').config({ path: rootDir + '/config/.env' })
const crypto = require("crypto")
const myError = require('../scripts/myError')
const algorithm = "aes-256-cbc"
console.log() 
const encrypt = (message) => {
    try{
        const cipher = crypto.createCipheriv(algorithm, process.env.SECURITY_KEY,  process.env.IV)
        let encryptedMessage = cipher.update(message, "utf-8", "base64")
        encryptedMessage += cipher.final("base64")
        //console.log("Encrypted message: " + encryptedMessage)
        return encryptedMessage.toString()
    } catch (err) {
        console.log(err)
        throw new myError(400, '04006', 'Problems with payload encryption', 'Problems with payload encryption', err.stack)
    }
    
}

const decrypt = (message) => {
    try{
        const decipher = crypto.createDecipheriv(algorithm, process.env.SECURITY_KEY,  process.env.IV)
        let decryptedMessage = decipher.update(message, "base64", "utf-8")
        decryptedMessage += decipher.final("utf-8")
        console.log("Decrypted message: " + decryptedMessage);
        return decryptedMessage.toString()
    } catch (err) {
        throw new myError(400, '04005', 'Problems with payload decryption', 'Problems with payload decryption', err.stack);
    }
}

console.log(decrypt('cLiueg4CV3yhrfnt8Wi3Yg=='))
module.exports = {encrypt, decrypt};

