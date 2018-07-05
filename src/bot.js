
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
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function(user, userID, channelID, message, evt)
{
    messageModule.handleMessage(user, userID, channelID, message, evt, bot);
});