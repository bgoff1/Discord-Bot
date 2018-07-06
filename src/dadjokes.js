// #region headers
const dadjokes = require('../resources/dad');
/**
 * @typedef {Object} params
 * @prop {string} user
 * @prop {string} userID
 * @prop {string} channelID
 * @prop {string} message
 * @prop {WebSocketEvent} event
 */
// #endregion
/**
 * Sends a joke to the channel specified in the $params object
 * Gets a random joke from the json in the resources folder
 * @param {Discord.Client} bot 
 * @param {params} $params 
 * @returns {void}
 */
function tellJoke(bot, $params)
{
    let joke = dadjokes[Math.floor(Math.random() * dadjokes.length)];
    if (bot && $params.channelID)
    {
        bot.sendMessage({
            to: $params.channelID,
            message: `${joke}`
        })
    }
}
module.exports = { tellJoke };