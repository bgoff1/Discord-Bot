import * as Discord from "discord.io";
import { autorun, token } from "./auth";
import { logger } from "./logger";

export const bot = new Discord.Client({
    token, autorun
});

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(`${bot.username} ~~ (${bot.id})`);
});

bot.on('disconnect', (errMsg, code) => {
    logger.error(`Bot disconnected`);
    logger.error(`message: ${errMsg} - error code: ${code}`);
    bot.connect();
});
