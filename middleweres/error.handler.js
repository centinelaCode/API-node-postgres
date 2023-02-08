
function logErrors (err, req, res, next) {
   console.error(err)
   next(err);
}

function errorHandler (err, req, res, next) {
   res.status(500).json({
      message: err.message,
      stack: err.stack
   })
}

function boomErrorHandler (err, req, res, next) {
   if (err.isBoom){
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
   }
   next(err);
}

function sequelizeErrorHandler (err, req, res, next) {
   if(err.parent) {
      res.status(500).json({
         name: err.name,
         message: err.errors[0].message,
         detail: err.parent.detail
      });
   }
   next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler }
