const Joi = require('joi')
const myError = require('../scripts/myError')
const {encrypt, decrypt} = require('../safety/crypto')

const test = Joi.string().pattern(/^\D*$/).error(new myError(406, '00001', 'invalid test number', 'empty')).required()
// w patterm zawsze(/^\D*$/) do string bo not digit
function validF(listOfVars, nameOfEndpoint, schemasBodie){
  try{  
    const validExample = {
        schema: {
            querystring: Joi.object().keys({
            }).required()
          },
          attachValidation: true,
          validatorCompiler: ({schema}) => {
            return (data) => {
              try{
                data = JSON.parse(decrypt(data.payload));
                return schema.validate(data)
              } // schema.validate(decrypt(data))
              catch(err){
                console.log(err)
              }
            }
          }
    }
    if (listOfVars.includes('testString')){
      validExample.schema.querystring = validExample.schema.querystring.keys({
        'testString': Joi.string().alphanum().pattern(/[a-zA-Z0-9 ][^0-9]/).error(new myError(406, '00001', 'invalid test String', 'empty')).required()
      })
    }
    if (listOfVars.includes('testNumber')){
      validExample.schema.querystring = validExample.schema.querystring.keys({
        'testNumber': Joi.number().integer().error(new myError(406, '00002', 'invalid test number', 'empty')).required()
      })
    }
    return validExample
  }
  catch(err){
    console.log(err)
  }
}
const schemasBodie = {}
schemasBodie['getExample'] = validF(["testNumber"])

module.exports = {schemasBodie}