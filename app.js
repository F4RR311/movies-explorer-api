require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require("./middlewares/cors");
const celebrate = require('celebrate');

const { errorLogger, expressLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler');

const { mongodbServer, port, } = require('./utils/config');

const { PORT = port, MONGOD_SERVER = mongodbServer } = process.env;

const app = express();

mongoose.connect(MONGOD_SERVER);
app.listen(PORT);

app.use(cors)
app.use(expressLogger);


app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());


app.use(routes);

app.use(errorLogger);
app.use(celebrate.errors());
app.use(errorsHandler);
