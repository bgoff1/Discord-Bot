
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var dad = require('./dadjokes');
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
var laughCount = 0;
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 4) == "haha") {
        ++laughCount;
        if (laughCount >= 3 || message.startsWith("hahahahahahahahahaha")) {
            bot.sendMessage({
                to: channelID,
                message: `Stop laughing! I am a bot!`
            })
        }
    }
    if (channelID == '459025629048864768')
    {
        if (laughCount != 0) laughCount = 0;
        if (message.substring(0, 3) == "I'm" || message.substring(0, 3) == "Im " || message.substring(0, 3) == "im ")
        {
            let cmd = message.substring(3);
            bot.sendMessage({
                to: channelID,
                message: `Hi ${cmd}, I'm Dad!`
            });
        }
        else if (message.substring(0,1) == ';') 
        {
            let cmd = message.substring(1);
            switch (cmd) {
                case 'ping':
                    bot.sendMessage({
                        to: channelID,
                        message: 'Pong!'
                    })
                    break;
                case 'joke':
                    let joke = dad.dadjokes[Math.floor(Math.random() * dad.dadjokes.length)];
                    bot.sendMessage({
                        to: channelID,
                        message: `${joke}`
                    })
                    break;
                case 'meme':
                    let name = dad.names[Math.floor(Math.random() * dad.names.length)];
                    bot.sendMessage({
                        to: channelID,
                        message: `You got it ${name}! :ok_hand:`
                    });
            }
        }
    }
});