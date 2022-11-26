const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static("."))
app.use(express.json())
app.listen(3080, () => console.log('Start server'))

const rootRouter = require('./routers')
app.use('/api', rootRouter)