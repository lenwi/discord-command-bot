require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const { helpCommand } = require('./commands/helpCommand');
const { secretCommand } = require('./commands/secretCommand');
const { roll } = require('./commands/roll');

const password = process.env.SECRET_PASSWORD;

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
    console.log(`Bot User: ${client.user.tag} has logged in.`);
});

client.on('message', async msg => {
    if (msg.author.bot) {
        return;
    }

    const message = msg.content.toLowerCase();
    const args = message.split(' ');
    console.log("Message: ", message)
    console.log("Arguments: ", args)

    if (message.trim() === "!help") {
        msg.reply(helpCommand());
    } else if (message.startsWith("!commands")) {
        msg.reply("d");
    } else if (message.startsWith("!addcommand")) {
        msg.reply("successfully added [command]");
        console.log("[user] added [command]")
    } else if (message.startsWith("!deletecommand")) {
        msg.reply("successfully deleted [command]");
        console.log("[user] deleted [command]")
    } else if (message.startsWith("!resetcommand")) {
        msg.reply("YOU THOUGHT LOL!");
    } else if (message.startsWith("!reset")) {
        msg.reply("d");
    } else if (message.trim() === "!secret") {
        msg.reply(secretCommand());
    } else if (message.trim() === "!roll") {
        msg.reply(roll());
    } else if (message.startsWith("!")) {
        msg.reply("Command not found, check !help.");
    }
});