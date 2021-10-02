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
        let params = {
            TableName: 'discord-command-bot',
            Key:{
                "id": commandId
            },
        };

        async function increaseCounter(){
            params = {
                TableName: 'discord-command-bot',
                Key:{
                    "id": commandId,
                },
                UpdateExpression: "set #c = #c + :val",
                ExpressionAttributeNames: {
                    '#c': "counter"
                },
                ExpressionAttributeValues: {
                    ":val": 1
                }
            };
            try {
                await dClient.update(params).promise();
            } catch (err) {
                console.log("Cannot update due to -> " + err)
            }
        };

        try {
            let res = await dClient.get(params).promise();
            let reply = "Command not found, check !help.";
            if (Object.keys(res).length !== 0) {
                reply = res.Item.commandData;
                if (reply.includes("{count}")) {
                    let acc = res.Item.counter;
                    reply = reply.replace("{count}", ++acc);
                    await increaseCounter();
                }
            }
            return reply;
        } catch (err) {
            console.log("Error: did not get due to -> " + err)
            return "Cannot get command";
        }
    }
}