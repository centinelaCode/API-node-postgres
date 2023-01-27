
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
   res.send('My server on express')
})

app.listen(port, () => {
   console.log('Server run on port ' + port);
})

