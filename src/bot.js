
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('../config/auth.json');
var messageModule = require('./handleMessage');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

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
    messageModule.handleMessage(bot, $params);
});

// When the bot disconnects from the server, or fails to connect
bot.on('disconnect', (errMsg, code) => {
    logger.error(`Bot disconnected`);
    logger.error(`message: ${message} - error code: ${code}`);
    bot.connect();
});

bot.on('presence', (user, userID, status, game, event) => {
    logger.info(`user ${user} playing ${game[name]}`);
    logger.info(`status ${status}`);
})