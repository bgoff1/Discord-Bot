const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const config = require('../config/auth');

const router = express.Router();

const redirect = encodeURIComponent(`http://localhost:${config._port}/api/discord/callback`);

router.get('/login', (req, res) => {
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.CLIENT_ID}` + 
    `&scope=identify` + `&response_type=code` + `&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
    if (!req.query.code) throw new Error('NoCodeProvided');
    const code = req.query.code;
    const creds = btoa(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?` +
                    `grant_type=authorization_code&` + `code=${code}&` +
                    `redirecturi=${redirect}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${creds}`,
            },
        });
        const json = await response.json();
        res.redirect(`/?token=${json.access_token}`);    
}));

module.exports = router;