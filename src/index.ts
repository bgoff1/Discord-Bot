import { bot } from './bot-setup';
import { jokes } from './jokes';

bot.on('message', (user, userID, channelID, message, event) => {
    let m = message.length >= 3 ? message.substring(0, 3).toLocaleLowerCase() : '';
    if (m == 'i\'m' || m == 'im ') {
        let rest = message.substring(3);
        bot.sendMessage({
            to: channelID,
            message: `Hi ${rest}, I'm Dad!`
        });
    }

    if (message.indexOf(`<@${bot.id}>`) >= 0) {
        const command = message.substring(bot.id.length + '<@> '.length);
        switch (command) {
            case 'ping':
                bot.sendMessage({
                    to: channelID, message: 'Pong!'
                });
                break;
            case 'joke':
                const joke = jokes[Math.floor(Math.random() * jokes.length)];
                bot.sendMessage({
                    to: channelID,
                    message: joke
                })
                break;
            default:
                break;
        }
    }
});
