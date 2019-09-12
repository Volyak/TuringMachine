export default (table) => {
    let alphabet = table.rows;
    let result = [];

    for (let i = 1, l = table.cols.length; i <= l; i++) {
        result[i-1]={};

        for (let j = 0, k = alphabet.length; j < k; j++) {
            let value = table['Q' + i][alphabet[j]];
            const digits = /\d/;

            if (!digits.test(value[1])) {
                result[i-1][alphabet[j]] = {
                    writeSymbol: value[0],
                    move: value[1],
                    nextState: parseInt(value.substring(2))
               }
            }
            else {
                result[i-1][alphabet[j]] = {
                    move: value[0],
                    nextState: parseInt(value.substring(1))
                }
            }
        }
    }
    return result;
}