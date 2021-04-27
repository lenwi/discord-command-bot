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

        try {
            const data = await dClient.put(params).promise();
            console.log("Successfully added " + params + " to db!")
            return "Successfully added !" + commandName;
        } catch (err) {
            console.log("Error: did not save due to -> " + err)
            return "Cannot add command";
        }
    }
}