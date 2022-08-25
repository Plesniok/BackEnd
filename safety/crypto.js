'use strict'
require('dotenv').config({ path:'C:/Users/damia/Desktop/backend2/.env' })
const crypto = require("crypto")
const myError = require('../scripts/myError')
const algorithm = "aes-256-cbc"
const encrypt = (message) => {
    try{
        const cipher = crypto.createCipheriv(algorithm, process.env.SECURITY_KEY,  process.env.IV)
        let encryptedMessage = cipher.update(message, "utf-8", "hex")
        encryptedMessage += cipher.final("hex")
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
        let decryptedMessage = decipher.update(message, "hex", "utf-8")
        console.log(decryptedMessage)
        decryptedMessage += decipher.final("utf-8")
        //console.log("Decrypted message: " + decryptedMessage);
        return decryptedMessage.toString()
    } catch (err) {
        throw new myError(400, '04005', 'Problems with payload decryption', 'Problems with payload decryption', err.stack);
    }
}
console.log(decrypt('0b6a06bff230fc89587194df58e6d20ea7085e6d10b3603b514086d584791da7cfc2d74872cc2e633e2c4750530b7530f91bba84b72a1445352075ebdb5eab6a51dc79a115492528127ef3a118d0e915'))
module.exports = {encrypt, decrypt};

