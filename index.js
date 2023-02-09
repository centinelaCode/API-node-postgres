require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const {
   logErrors,errorHandler,
   boomErrorHandler,
   // sequelizeErrorHandler,
   ormErrorHandler,
} = require('./middleweres/error.handler')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// configuración de cors
const whitelist = ['http://localhost:8080', 'https://myapp.com'];
const optionsCors = {
   origin: (origin, callback) => {
      // si el origen esta en la whitelist lo dejo pasar
      if(whitelist.includes(origin) || !origin) {
         callback(null, true)
      } else {
         callback(new Error('No Permitido'));
      }
   }
}
app.use(cors(optionsCors));

// habilitamos las routes que se definieron en ./routes/index.js
routerApi(app);

// middleware error
app.use(logErrors);
// app.use(sequelizeErrorHandler);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(PORT, () => {
   console.log('Server running on Port ' + PORT);
})

