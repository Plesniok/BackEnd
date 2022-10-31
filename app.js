// index.js
// Import the fastify framework
const app = require('fastify')()
//const app = fastify()
const exampleApi = require('./api/example')
const userApi = require('./api/users')
const conversationsApi = require('./api/conversations')
const messagesApi = require('./api/messages')
require('dotenv').config()
const Joi = require('joi')
const {schemasBodies} = require('./reqValidation/validation')
const myError = require('./scripts/myError')
const logger = require('./scripts/log')

app.register(require('@fastify/middie'))
//app.use(logTracker())
//endpoints
//app.get('/',schemasBodies.getExample,exampleApi.helloWorld)
app.register(require('@fastify/formbody'))
app.post('/user',schemasBodies.addUser,userApi.addUser)
app.get('/user',schemasBodies.getUser,userApi.getUser)
app.get('/conversations',schemasBodies.getConversation,conversationsApi.getConversation)
app.get('/messages',schemasBodies.getMessages,messagesApi.getMessages)



  
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