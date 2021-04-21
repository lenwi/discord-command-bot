const { helpCommand } = require('./helpCommand');

module.exports = {
    secretCommand: () => {
        let secret = '';
        const reset = "!reset [<password>] -> resets program/drops db";
        secret = helpCommand() + "\n" + reset;
        return secret;
    }
}