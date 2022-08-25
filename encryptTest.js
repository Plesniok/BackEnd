const {encrypt, decrypt} = require('./safety/crypto')
require('dotenv').config()

console.log(t)
console.log(JSON.stringify(t))
console.log(process.env.SECURITY_KEY)
console.log(encrypt(JSON.stringify(t)))
console.log(decrypt('0b6a06bff230fc89587194df58e6d20ea7085e6d10b3603b514086d584791da7cfc2d74872cc2e633e2c4750530b7530f91bba84b72a1445352075ebdb5eab6a6425648a8bc4eadfb41162f6600aa32f'))
