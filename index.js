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
        msg.channel.send(helpCommand()).then(
            () => console.log('!help success')
        ).catch(console.error);
    } else if (message === "!commands") {
        msg.reply("d");
    } else if (args[0] === "!addcommand") {
        msg.reply("successfully added [command]");
        console.log("[user] added [command]")
    } else if (args[0] === "!deletecommand") {
        msg.reply("successfully deleted [command]");
        console.log("[user] deleted [command]")
    } else if (args[0] === "!resetcommand") {
        msg.reply("YOU THOUGHT LOL!");
    } else if (args[0] === "!reset") {
        if (args[1] !== password) {
            msg.reply("Wrong password.");
        } else {
            console.log("dumped db")
        }
    } else if (message.trim() === "!secret") {
        msg.channel.send(secretCommand()).then(
            () => console.log('!secret success')
        ).catch(console.error);
    } else if (message.trim() === "!roll") {
        msg.reply(roll());
    } else if (message.trim().includes("joe")) {
        msg.channel.send("mama").then(
            () => console.log('joe success')
        ).catch(console.error);
    } else if (message.startsWith("!")) {
        msg.reply("Command not found, check !help.");
    }
});