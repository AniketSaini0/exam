const { constants } = require('../utils/constants');
const { ApiError } = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      new ApiError(statusCode, err.message, err.stack);
      res.json({
        statusCode: statusCode,
        Title: 'Validation Failed',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        statusCode: statusCode,
        Title: 'Unauthorized',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        statusCode: statusCode,
        Title: 'Forbidden',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        statusCode: statusCode,
        Title: 'Not found',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      // const errorObj = new ApiError(statusCode, err.message, err.stack);
      // res.json(errorObj);
      res.json({
        statusCode: statusCode,
        Title: 'Server Error...',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log('No error , All goood !!');
      break;
  }
};

module.exports = errorHandler;
