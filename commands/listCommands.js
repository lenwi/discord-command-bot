require('dotenv').config();
const aws = require('aws-sdk');
aws.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dClient = new aws.DynamoDB.DocumentClient();

module.exports = {
    listCommands: async () => {
        let commands = '';
        const params = {
            TableName: 'discord-command-bot',
            ProjectionExpression: 'id'
        }
        
        try {
            const data = await dClient.scan(params).promise();
            console.log("Scan succeeded.")
            data.Items.forEach((command) => {
                commands += "!" + command.id + "\n";
            });
            commands += "--End of List--";
            return commands ? commands : "No commands found!";
        } catch (err) {
            console.log(err)
            return "Cannot display commands!";
        }
    }
}