require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const { helpCommand } = require('./commands/helpCommand');
const { secretCommand } = require('./commands/secretCommand');
const { roll } = require('./commands/roll');
const { addCommand } = require('./commands/addCommand');
const { listCommands } = require('./commands/listCommands');
const { deleteCommand } = require('./commands/deleteCommand');

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
    const command = message.substr(0, message.indexOf(' '));

    if (message.trim() === "!help") {
        msg.channel.send(helpCommand()).then(
            () => console.log("!help success.")
        ).catch(console.error);
    } else if (message === "!commands") {
        const commandsResp = await listCommands();
        msg.channel.send(commandsResp).then(
            () => console.log("!commands success.")
        ).catch(console.error);
    } else if (command === "!addcommand") {
        if (args.length < 3) {
            msg.reply("Invalid arguments, check !help.")
            return;
        }
        const commandInfo = message.substr(message.indexOf(' ') + 1);
        const addCommandResp = await addCommand(commandInfo);
        msg.reply(addCommandResp).then(
            () => console.log(msg.author.tag + " added?: " + commandInfo)
        ).catch(console.error);
    } else if (command === "!deletecommand") {
        if (args.length !== 2) {
            msg.reply("Invalid arguments, check !help.")
            return;
        }
        const commandInfo = message.substr(message.indexOf(' ') + 1);
        const deleteCommandResp = await deleteCommand(commandInfo);
        msg.reply(deleteCommandResp).then(
            () => console.log(msg.author.tag + " deleted?: " + commandInfo)
        ).catch(console.error);
    } else if (command === "!resetcommand") {
        msg.reply("YOU THOUGHT LOL!");
    } else if (command === "!reset") {
        if (args[1] !== password) {
            msg.reply("Wrong password.");
        } else {
            const user = client.users.cache.find(user => user.username == "lenwi");
            if (user) {
                user.send("Check db table.").then(
                    () => console.log("FLAG: dump db")
                ).catch(console.error);
            } else {
                msg.channel.send("No user found.");
                console.log("No user found.")
            }
        }
    } else if (message.trim() === "!secret") {
        msg.channel.send(secretCommand()).then(
            () => console.log("!secret success.")
        ).catch(console.error);
    } else if (message.trim() === "!roll") {
        msg.reply(roll()).then(
            () => console.log("roll success.")
        ).catch(console.error);;
    } else if (message.trim().includes("joe")) {
        msg.channel.send("mama").then(
            () => console.log("joe success.")
        ).catch(console.error);
    } else if (message.startsWith("!")) { //todo
        // check table, if not exists -> error
        msg.reply("Command not found, check !help.");
    }
});