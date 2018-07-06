
var Discord = require('discord.io');
var auth = require('../config/auth.json');
var messages = require('./handleMessage');
var logger = require('./logger');

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth._token,
    autorun: auth._autorun
});

// When the bot connects to the Discord websocket
bot.on('ready', (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(`${bot.username} - (${bot.id})`);
});

// When the bot reads a message in the discord channel
bot.on('message', (user, userID, channelID, message, evt) => {
    const $params = {
        "user": user,
        "userID": userID,
        "channelID": channelID,
        "message": message,
        "event": evt
    }
    messages.handleMessage(bot, $params);
});

// When the bot disconnects from the server, or fails to connect
bot.on('disconnect', (errMsg, code) => {
    logger.error(`Bot disconnected`);
    logger.error(`message: ${message} - error code: ${code}`);
    bot.connect();
});

// When any user's presence changes
bot.on('presence', (user, userID, status, game, event) => {
    logger.info(`user ${user} playing ${game[name]}`);
    logger.info(`status ${status}`);
});
