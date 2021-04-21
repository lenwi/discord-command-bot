module.exports = {
    helpCommand: () => {
        let help = '';
        const commands = "**!commands**";
        const addcommand = "**!addcommand** <name> <what>\n" + "        eg. *!addcommand days It has been {count} days.*";
        const deletecommand = "**!deletecommand** <name>\n" + "        eg. *!deletecommand days*";
        const resetcommand = "**!resetcommand** <name>";
        const roll = "**!roll**\n" + "        eg. *get a random number between 1 and 100*";
        help = commands + "\n" + addcommand + "\n" + deletecommand + "\n" + resetcommand + "\n" + roll;
        return "\n" + help;
    }
}