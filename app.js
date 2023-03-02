require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');

const { handleError } = require('./middlewares/errors');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(requestLogger);

app.use(cors);

app.use(routes);

app.use(errors());
app.use(handleError);
app.use(errorLogger);

app.listen(PORT);

module.exports = { app };
