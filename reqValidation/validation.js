const Joi = require('joi')
const myError = require('../scripts/myError')
const {encrypt, decrypt} = require('../safety/crypto')

// w patterm zawsze(/^\D*$/) do string bo not digit
function validPost(listOfVars, nameOfEndpoint, schemasBodie){
  try{  
    const validExample = {
        schema: {
            querystring: Joi.object().keys({
            }).required(),
            body: Joi.object().keys({
            }).required()
          },
          attachValidation: true,
          validatorCompiler: ({schema}) => {
            return (data) => {
              try{
                data = decrypt(data.payload)
                data = JSON.parse(data);
                console.log(schema.validate(data))
                return schema.validate(data)
              } // schema.validate(decrypt(data))
              catch(err){
                console.log(err)
              }
            }
          }
    }
    if (listOfVars.includes('email')){
      validExample.schema.body = validExample.schema.body.keys({
        'email': Joi.string().email().error(new myError(406, '01003', 'invalid email', 'empty')).required()
      })
    }
    if (listOfVars.includes('password')){
      validExample.schema.body = validExample.schema.body.keys({
        'password': Joi.string().alphanum().pattern(/[a-zA-Z0-9 ][^0-9]/).error(new myError(406, '01004', 'invalid password', 'empty')).required()
      })
    }
    if (listOfVars.includes('userName')){
      validExample.schema.body = validExample.schema.body.keys({
        'userName': Joi.string().alphanum().pattern(/[a-zA-Z0-9 ][^0-9]/).error(new myError(406, '01005', 'invalid user name', 'empty')).required()
      })
    }
    return validExample
  }
  catch(err){
    console.log(err)
  }
}

function validGet(listOfVars, nameOfEndpoint, schemasBodie){
  try{  
    const validExample = {
        schema: {
            querystring: Joi.object().keys({
            }).required(),
          },
          attachValidation: true,
          validatorCompiler: ({schema}) => {
            return (data) => {
              try{
                console.log(data, 'data')
                data = JSON.parse(decrypt(data.payload));
                return schema.validate(data)
              } // schema.validate(decrypt(data))
              catch(err){
                console.log(err)
              }
            }
          }
    }
    if (listOfVars.includes('email')){
      validExample.schema.querystring = validExample.schema.querystring.keys({
        'email': Joi.string().email().error(new myError(406, '01003', 'invalid email format', 'empty')).required()
      })
    }
    if (listOfVars.includes('userId')){
      validExample.schema.querystring = validExample.schema.querystring.keys({
        'userId': Joi.number().integer().error(new myError(406, '01003', 'invalid user id', 'empty')).required()
      })
    }
    if (listOfVars.includes('password')){
      validExample.schema.querystring = validExample.schema.querystring.keys({
        'password': Joi.string().alphanum().pattern(/[a-zA-Z0-9 ][^0-9]/).error(new myError(406, '01004', 'invalid password format', 'empty')).required()
      })
    }
    if (listOfVars.includes('conversationId')){
      validExample.schema.querystring = validExample.schema.querystring.keys({
        'conversationId': Joi.string().alphanum().pattern(/[0-9]/).error(new myError(406, '01005', 'Invalid conversation id', 'empty')).required()
      })
    }
    return validExample
  }
  catch(err){
    console.log(err)
  }
}


const schemasBodies = {}
//schemasBodies['getExample'] = validF(["testNumber"])
schemasBodies['addUser'] = validPost(["email", "password", 'userName'])
schemasBodies['getUser'] = validGet(["email", "password"])
schemasBodies['getConversation'] = validGet(["userId"])
schemasBodies['getMessages'] = validGet(["conversationId"])

module.exports = {schemasBodies}