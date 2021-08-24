require('dotenv').config();
const aws = require('aws-sdk');
aws.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dClient = new aws.DynamoDB.DocumentClient();

module.exports = {
    deleteCommand: async (commandId) => {
        const params = {
            TableName: 'discord-command-bot',
            Key:{
                "id": commandId
            },
        };

        try {
            await dClient.delete(params).promise();
            console.log("Successfully deleted " + commandId + " from db!")
            let reply = "Successfully deleted !" + commandId;
            return reply;
        } catch (err) {
            console.log("Error: did not delete due to -> " + err)
            return "Cannot delete command";
        }
    }
}