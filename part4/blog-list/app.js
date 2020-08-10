const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const blogRouter = require("./controllers/blogController")

logger.info(`connecting to ${config.MONGODB_URI}`)
mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('connected to mongoDB'))
    .catch((error) => logger.error('error connecting to mongoDB', error.message))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
// routes here
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app