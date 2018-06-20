
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var dad = require('./dadjokes');
var game = require('./tictactoe');
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
var laughCount = 0, gameMode = 'off';
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 4).toLowerCase() == "haha") {
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
        let m = message.substring(0, 3).toLowerCase();
        if (m == "I'm" || m == "Im " || m == "im ")
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
            console.log(cmd);
            if (gameMode == 'on') {
                switch (cmd) {
                    case "print":
                        game.printBoard(bot, channelID);
                        break;
                    case "game":
                        game.resetBoard();
                        break;
                    default:
                        if (parseInt(cmd, 10) !== 'NaN') {
                            game.makeMoveUser(bot, cmd, channelID);
                        }
                        else {
                            bot.sendMessage({
                                to: channelID,
                                message: `Invalid Move! Try another one!`
                            });
                        }
                        game.printBoard(bot, channelID);
                        if ('X' == game.findWinner(bot, channelID, 'X'))
                        {
                            bot.sendMessage({to: channelID, message: `You Win!`});
                            game.resetBoard();
                            gameMode = 'off';
                        }
                        if ('O' == game.findWinner(bot, channelID, 'O')) {
                            
                            bot.sendMessage({to: channelID, message: `I win!`});
                            game.resetBoard();
                            gameMode = 'off';
                            dad.tellJoke(bot, channelID);
                        }
                        break;
                }
            } 
            else {
                switch (cmd) {
                    case 'ping':
                        bot.sendMessage({
                            to: channelID,
                            message: 'Pong!'
                        })
                        break;
                    case 'joke':
                        dad.tellJoke(bot, channelID);
                        break;
                    case 'meme':
                        let name = dad.names[Math.floor(Math.random() * dad.names.length)];
                        bot.sendMessage({
                            to: channelID,
                            message: `You got it ${name}! :ok_hand:`
                        });
                        break;
                    case 'game':
                        gameMode = 'on';
                        game.printBoard(bot, channelID);
                        break;
                }
            }
        }
    }
});