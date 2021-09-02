const boom = require('@hapi/boom');
const { config } = require('../../config');


function withErrorStack(error, stack) {
  if (config.dev) {
    // return { error, stack }; sin boom
    return { ...error, stack };

  }

  return error;
}

function logErrors(err, req, res, next) {
  console.log("este es el "+err);
  next(err);
}

function wrapErrors(err,req,res,next){
  if(!err.isBoom){ //si el error no es Boom
    next(boom.badImplementation(err)); //manera generica de marcar el error
  }

  next(err); //llamamos al siguiente middleware
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  const {output:{statusCode,payload}}= err;  //viene con esa estructura del boom


  // res.status(err.status || 500);
  res.status(statusCode);

  // res.json(withErrorStack(err.message, err.stack));
  res.json(withErrorStack(payload, err.stack));

}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
};