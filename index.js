
const express = require('express');
const routerApi = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// habilitamos las routes que se definieron en ./routes/index.js
routerApi(app);



app.listen(PORT, () => {
   console.log('Server runing on Port ' + PORT);
})

