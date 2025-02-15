const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger.js');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// logger
const morganFormat = ':method :url :status :response-time ms';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        if (logObject.status < 400) {
          logger.info(JSON.stringify(logObject));
        } else {
          logger.error(JSON.stringify(logObject));
        }
      },
    },
  }),
);

// CORS middleware
// app.options('*', cors()); // Handle preflight requests globally
app.use(
  cors({
    // process.env.CORS_ORIGIN
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// common middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Health check
app.use('/api/v1/healthcheck', require('./routes/healthcheck.routes.js'));

// Routes
app.use('/api/v1/users', require('./routes/user.routes.js'));

//This is a custom middlewere to send the response in Json format from server side
// app.use(errorHandler);

module.exports = app;
