module.exports = {
    roll: () => {
        const roll = Math.floor(Math.random() * 100) + 1;
        const hundo = " POGGERS!";
        const zero = " LUUUUUUUUUUUUUUUUUUUUUUUUL!";
        let result = `You rolled a ${roll}!`;

        if (roll === 100) {
            result += hundo;
        }
        if (roll === 0) {
            result += zero;
        }
        return result;
    }
}