// index.js
// Import the fastify framework
const fastify = require('fastify')
const app = fastify()
const exampleApi = require('./api/example')
require('dotenv').config()
const Joi = require('joi')
const {schemasBodie} = require('./reqValidation/exampleValidation')
const myError = require('./scripts/myError')
//endpoints
app.get('/',schemasBodie.getExample,exampleApi.helloWorld)
app.post('/test', {
    schema: {
      body: Joi.object().keys({
        hello: Joi.string().error(new myError(406, '00002', 'Invalid example id', 'empty')).required()
      }).required()
    },
    attachValidation: true,
    validatorCompiler: ({schema}) => {
      return data => {
        console.log(data)
        return schema.validate(data.payload)
      }
    }
  }, (request) => {
    console.log(request.validationError)
    return "done"
  })
  
  app.inject({
    method: 'POST',
    url: '/the/url',
    payload: {}
  })

//server listen
app.listen(parseInt(process.env.HTTP_PORT), function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
})