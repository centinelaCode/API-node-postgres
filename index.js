
const express = require('express');
const routerApi = require('./routes');
const { logErrors,errorHandler } = require('./middleweres/error.handler')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// habilitamos las routes que se definieron en ./routes/index.js
routerApi(app);

// middleware error
app.use(logErrors);
app.use(errorHandler);


app.listen(PORT, () => {
   console.log('Server runing on Port ' + PORT);
})

