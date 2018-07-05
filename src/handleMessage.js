// imports
var dad = require('./dadjokes');
var game = require('./tictactoe');

var laughCount = 0, gameMode = false;

function handleMessage(user, userID, channelID, message, evt, bot)
{
    if (message.substring(0, 4).toLowerCase() == "haha") {
        ++laughCount;
        if (laughCount >= 3 || message.startsWith("hahahahahahahahahaha")) {
            bot.sendMessage({
                to: channelID,
                message: `Stop laughing! I am a bot!`
            })
        }
    }
    if (channelID == '459133528614109185') {
        if (laughCount != 0) laughCount = 0;
        let m = message.substring(0, 3).toLowerCase();
        if (m == "I'm" || m == "Im " || m == "im ") {
            let cmd = message.substring(3);
            bot.sendMessage({
                to: channelID,
                message: `Hi ${cmd}, I'm Dad!`
            });
        }
        else if (message.substring(0, 1) == ';') {
            let cmd = message.substring(1);
            console.log(cmd);
            if (gameMode) {
                switch (cmd) {
                    case "print":
                        game.printBoard(bot, channelID);
                        break;
                    case "game":
                        game.resetBoard();
                        game.printBoard(bot, channelID);
                        break;
                    case "quit":
                        game.resetBoard();
                        gameMode = false;
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
                        if (game.findWinner('X', game.board)) {
                            bot.sendMessage({ to: channelID, message: `You Win!` });
                            game.resetBoard();
                            gameMode = false;
                        }
                        if (game.findWinner('O', game.board)) {

                            bot.sendMessage({ to: channelID, message: `I win!` });
                            game.resetBoard();
                            gameMode = false;
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
                    case 'game':
                        gameMode = true;
                        game.printBoard(bot, channelID);
                        break;
                }
            }
        }
    }
}

module.exports = {
    handleMessage
}