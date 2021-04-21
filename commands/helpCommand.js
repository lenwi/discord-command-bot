module.exports = {
    helpCommand: () => {
        let help = '';
        const commands = "!commands";
        const addcommand = "!addcommand [name] [what]\n" + "    eg. !addcommand days It has been {count} days.";
        const deletecommand = "!deletecommand [name] [<password>]\n" + "    eg. !deletecommand days <password>";
        const resetcommand = "!resetcommand [name]";
        help = commands + "\n" + addcommand + "\n" + deletecommand + "\n" + resetcommand;
        return "\n" + help;
    }
}