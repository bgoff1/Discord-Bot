// #region headers
var dad = require('./dadjokes');
var game = require('./tictactoe');
var logger = require('./logger');
var crud = require('./crudrequests');
var config = require('../config/auth.json');
var request = require('request');
/**
 * @typedef {Object} params
 * @prop {string} user
 * @prop {string} userID
 * @prop {string} channelID
 * @prop {string} message
 * @prop {WebSocketEvent} event
 */

// #endregion
var laughCount = 0, gameMode = false;
/**
 * Handles each message through the Discord channel
 * @param {Discord.Client} bot - Discord.Client bot
 * @param {params} $params - object containing 
 */
async function handleMessage(bot, $params)
{
    let message = $params.message;
    if (message.substring(0, 4).toLowerCase() == "haha") {
        ++laughCount;
        if (laughCount >= 3 || message.startsWith("hahahahahahahahahaha")) {
            bot.sendMessage({
                to: $params.channelID,
                message: `Stop laughing! I am a bot!`
            })
        }
    } 
    let m = message.substring(0, 3).toLowerCase();
    if (m == "I'm" || m == "im ") {
        let cmd = message.substring(3);
        bot.sendMessage({
            to: $params.channelID,
            message: `Hi ${cmd}, I'm Dad!`
        });
    }
    if (laughCount != 0) laughCount = 0;
    else if (message.substring(0, 1) == ';' || message.includes(`<@${bot.id}>`)) {
        let cmd;
        // trims off either the ; or the mention of the bot
        message.substring(0,1) == ';' ? cmd = message.substring(1) : cmd = message.substring(bot.id.length + 4);
        console.log(cmd);
        if (gameMode) {
            switch (cmd) {
                case "print":
                    game.printBoard(bot, $params);
                    break;
                case "game":
                    game.resetBoard();
                    game.printBoard(bot, $params);
                    break;
                case "quit":
                    game.resetBoard();
                    gameMode = false;
                    break;
                default:
                    if (parseInt(cmd, 10) !== 'NaN') {
                        game.makeMoveUser(bot, cmd, $params);
                    }
                    else {
                        bot.sendMessage({
                            to: $params.channelID,
                            message: `Invalid Move! Try another one!`
                        });
                    }
                    game.printBoard(bot, $params.channelID);
                    if (game.findWinner('X', game.board)) {
                        bot.sendMessage({ to: $params.channelID, message: `You Win!` });
                        game.resetBoard();
                        gameMode = false;
                    }
                    if (game.findWinner('O', game.board)) {

                        bot.sendMessage({ to: $params.channelID, message: `I win!` });
                        game.resetBoard();
                        gameMode = false;
                        dad.tellJoke(bot, $params.channelID);
                    }
                    break;
            }
        }
        else {
            switch (cmd) {
                case 'ping':
                    bot.sendMessage({
                        to: $params.channelID,
                        message: 'Pong!'
                    })
                    break;
                case 'joke':
                    dad.tellJoke(bot, $params);
                    break;
                case 'game':
                    gameMode = true;
                    game.printBoard(bot, $params);
                    break;
                case 'delete messages':
                    crud.deleteAllMessages(bot, $params.channelID);
                    break;
                default: break;
            }
        }
        logger.info(`Command complete!`);
    }
}

module.exports = {
    handleMessage
}