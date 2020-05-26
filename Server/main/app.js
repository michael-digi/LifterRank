const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const helmet = require('helmet')
const logger = require('morgan');
const indexRouter = require('./routes')
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(helmet())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(cookieParser())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/', indexRouter)

module.exports = app;