
const express = require('express');
const api = require('./server/backend.js');
const bodyParser = require('body-parser');

const PORT = 3001;

const app = express();

app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use('/api', api);

// Launch backend on port
app.listen(PORT, () => {
    console.log('SERVER> App Started> Listening on port: ', PORT);
})


