require('dotenv').config();
const aws = require('aws-sdk');
aws.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dClient = new aws.DynamoDB.DocumentClient();

module.exports = {
    getCommand: async (commandId) => {
        commandId = commandId.substring(1);
        const params = {
            TableName: 'discord-command-bot',
            Key:{
                "id": commandId
            },
        };

        try {
            let res = await dClient.get(params).promise();
            let reply = "Command not found, check !help.";
            if (Object.keys(res).length !== 0) {
                reply = res.Item.commandData;
            }
            return reply;
        } catch (err) {
            console.log("Error: did not get due to -> " + err)
            return "Cannot get command";
        }
    }
}