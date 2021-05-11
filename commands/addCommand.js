require('dotenv').config();
const aws = require('aws-sdk');
aws.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dClient = new aws.DynamoDB.DocumentClient();

module.exports = {
    addCommand: async (commandInfo) => {
        const commandName = commandInfo.substr(0, commandInfo.indexOf(' '));
        const commandData = commandInfo.substr(commandInfo.indexOf(' ') + 1);
        let acc = commandData.trim().includes("{count}") ? 0 : null;
        const params = {
            TableName: 'discord-command-bot',
            Item: {
                id: commandName,
                commandData: commandData,
                counter: acc
            }
        };

        async function isDuplicate(){
            try {
                let duplicate = false;
                const listData = await dClient.scan(params).promise();
                listData.Items.forEach((command) => {
                    if (command.id === commandName) {
                        console.log("Duplicate command.")
                        duplicate = true;
                    }
                });
                return duplicate;
            } catch (err) {
                console.log("Cannot Scan due to -> " + err)
                return "Cannot add command"; 
            }
        };

        try {
            let reply = "Command already exists! Check !commands.";
            const duplicate = await isDuplicate();
            if (!duplicate) {
                const data = await dClient.put(params).promise();
                console.log("Data: ", data)
                console.log("Successfully added " + params.Item.id + " to db!")
                reply = "Successfully added !" + commandName;
            }
            return reply;
        } catch (err) {
            console.log("Error: did not save due to -> " + err)
            return "Cannot add command";
        }
    }
}