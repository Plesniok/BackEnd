const {encrypt, decrypt} = require('./safety/crypto')
var jsonTest = require('./payloadExample.json')
const fetch = require('node-fetch');

jsonTest = encrypt(JSON.stringify(jsonTest))
console.log(jsonTest)
var res = fetch('http://127.0.0.1:3003?' + new URLSearchParams({
   payload: jsonTest
}))
.then(res => res.json())
.then(payload => decrypt(payload.payload))
.then(encrypted => {
   console.log('<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>')
   console.log(encrypted)
   console.log('<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>')
})