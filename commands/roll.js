module.exports = {
    roll: () => {
        const roll = Math.floor(Math.random() * 100) + 1;
        const hundo = " POGGERS!";
        const one = " LUUUUUUUUUUUUUUUUUUUUUUUUL!";
        let result = `You rolled a ${roll}!`;

        if (roll === 100) {
            result += hundo;
        }
        if (roll === 1) {
            result += one;
        }
        return result;
    }
}