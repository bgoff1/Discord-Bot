// #region headers
"use strict";
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
const WAIT_TIME = 250;
// #endregion

/**
 * Function that gets one message from the channelID
 * @param {Discord.Client} bot
 * @param {string} channelID
 * @returns {Promise<Message>} returns message or false
 */
function getMessage(bot, channelID) 
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
function getMessages(bot, channelID)
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
 * @returns {Promise<boolean>} returns success or fail
 */
function deleteMessage(bot, channelID, messageID)
{
    return new Promise((resolve, reject) => {
        bot.deleteMessage({ 'channelID': channelID, 'messageID': messageID },
        (error, response) => {
            if (error) {
                for (var prop in error.response)
                {
                    logger.warn(`${prop} in ${error.response} ${error.response[prop]}`);
                }
                logger.error(`status code - ${error.statusCode}`);
                logger.error(`status message - ${error.statusMessage}`);
                reject(false);
            } else{
                resolve(true);
            }
        });
    });
}

// Generally deleting messages 1 at a time works better,
    // not sure why; API is simply easier to deal with
/**
 * Function that deletes multiple messages
 * @param {Discord.Client} bot
 * @param {string} channelID
 * @param {string[]} messageIDs - array of message ids to delete
 * @returns {Promise<*>} returns success or failure
 */
function deleteMessages(bot, channelID, messageIDs)
{
    return new Promise((resolve, reject) => {
        bot.deleteMessages({ 'channelID': channelID, 'messageIDs': messageIDs},
        (error, response) => {
            if (error) {
                logger.error(`status code - ${error.statusCode}`);
                logger.error(`status message - ${error.statusMessage}`);
                reject(error.statusCode);
            }
            else {
                if (!response)
                    resolve(true);
                else
                    resolve(response);
            }
        });
    });
}

/**
 * Waits an amount of time
 * @param {number} ms - amount of time to wait, in milliseconds
 * @returns {Promise}
 */
function wait(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Deletes all messages in the channel using the above methods
 * @param {Discord.Client} bot
 * @param {string} channelID
 * @returns {void}
 */
async function deleteAllMessages(bot, channelID)
{
    logger.warn('Deleting messages...');
    let messages = [];
    messages = await getMessages(bot, channelID);
    if (messages)
    {
        for (let message of messages) {
            await deleteMessage(bot, channelID, message.id);
            await wait(WAIT_TIME);
        }
        messages = [];
    }
} 

module.exports = {
    deleteAllMessages
}