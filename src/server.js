const express = require('express');
const path = require('path');
var config = require('../config/auth');

const app = express();

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(config._port, () => {
    console.info(`Running on port ${config._port}...`);
});

app.use('/api/discord', require('./api/discord'));

app.use((err, req, res, next) => {
    switch (err.message)
    {
        case 'NoCodeProvided':
            return res.status(400).send({
                status: 'ERROR',
                error: err.message
            });
        default:
            return res.status(500).send({
                status: 'ERROR',
                error: err.message
            });
    }
});