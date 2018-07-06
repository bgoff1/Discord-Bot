// #region headers
var logger = require('./logger');
/**
 * @typedef {Object} Message
 * @prop {*} attachments
 * @prop {boolean} tts
 * @prop {*} embeds
 * @prop {string} timestamp
 * @prop {boolean} mention_everyone
 * @prop {string} id
 * @prop {boolean} pinned
 * @prop {string} edited_timestamp
 * @prop {Object} author
 * @prop {*} mentions
 * @prop {number} type
 */
// #endregion

/**
 * Function that gets one message from the channelID
 * @param {Discord.Client} bot
 * @param {string} channelID
 * @returns {Promise<Message>} returns message or false
 */
async function getMessage(bot, channelID) 
{
    return new Promise((resolve, reject) => {
        bot.getMessage({ 'channelID': channelID }, (error, response) => 
        {
            if (response) {
                resolve(response);
            }
            else {
                logger.error(`error - ${error}`);
                reject(error);
            }
        })
    });
}

/**
 * Function that gets messages from the channelID
 * @param {Discord.Client} bot - the discord bot
 * @param {string} channelID
 * @returns {Promise<Message[]>} returns messages or false
 */
async function getMessages(bot, channelID)
{
    return new Promise((resolve, reject) => 
    {
        bot.getMessages({'channelID': channelID}, (error, response) => 
        {
            if (response) {
                resolve(response);
            }
            else {
                logger.error(`error - ${error}`);
                reject(error);
            }
        })
    });
}

/**
 * Function that deletes a message
 * @param {Discord.Client} bot
 * @param {string} channelID 
 * @param {string} messageID - id of message to delete
 * @returns {boolean} returns success or fail
 */
async function deleteMessage(bot, channelID, messageID)
{
    bot.deleteMessage({ 'channelID': channelID, 'messageID': messageID },
        (error, response) => {
            if (error) {
                logger.error(`status code - ${error.statusCode}`);
                logger.error(`status message - ${error.statusMessage}`);
                return false;
            } else if (response) {
                logger.info(response);
                return true;
            }
        });
}

/**
 * Function that deletes multiple messages
 * @param {Discord.Client} bot
 * @param {string} channelID
 * @param {string[]} messageIDs - array of message ids to delete
 * @returns {boolean} returns success or failure
 */
async function deleteMessages(bot, channelID, messageIDs)
{
    bot.deleteMessages({ 'channelID': channelID, 'messageIDs': messageIDs},
        (error, response) => {
            if (error) {
                logger.error(`status code - ${error.statusCode}`);
                logger.error(`status message - ${error.statusMessage}`);
                return false;
            }
            else if (response) {
                logger.info(response);
                return true;
            }
        });
}
module.exports = {
    getMessage,
    getMessages,
    deleteMessage,
    deleteMessages,
}