require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const { helpCommand } = require('./commands/helpCommand');
const { secretCommand } = require('./commands/secretCommand');
const { roll } = require('./commands/roll');
const { addCommand } = require('./commands/addCommand');
const { listCommands } = require('./commands/listCommands');

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

    console.log("Message: ", message)

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
            () => console.log(msg.author.tag + " added: " + commandInfo)
        ).catch(console.error);
    } else if (command === "!deletecommand") { //todo
        // msg.reply("successfully deleted [command]");
        // console.log("[user] deleted [command]")
    } else if (command === "!resetcommand") {
        msg.reply("YOU THOUGHT LOL!");
    } else if (command === "!reset") { //todo
        if (command !== password) {
            msg.reply("Wrong password.");
        } else {
            console.log("dumped db")
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