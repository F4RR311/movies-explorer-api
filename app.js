require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require("./middlewares/cors");
const celebrate = require('celebrate');
const limiter= require('./middlewares/ratelimiter')

const { errorLogger, requestLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errorHandler');

const { mongodbServer, port, } = require('./utils/config');

const { PORT = port, MONGOD_SERVER = mongodbServer } = process.env;

const app = express();

mongoose.connect(MONGOD_SERVER,{ useNewUrlParser: true });


app.use(cors)
app.use(requestLogger);
app.use(limiter);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());


app.use(routes);

app.use(errorLogger);
app.use(celebrate.errors());
app.use(errorsHandler);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
