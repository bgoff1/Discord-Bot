const dadjokes = require('../resources/dad');
function tellJoke(bot, channelID)
{
    let joke = dadjokes[Math.floor(Math.random() * dadjokes.length)];
    if (bot && channelID)
    {
        bot.sendMessage({
            to: channelID,
            message: `${joke}`
        })
    }
}
module.exports = { tellJoke };