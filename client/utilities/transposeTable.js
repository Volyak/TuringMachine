export default (table) => {

    let result = [];

    for (let i = 0, l = table[0].length; i < l; i++) {
        result[i] = [];

        for (let j = 0, k = table.length; j < k; j++) {
            result[i][j] = table[j][i];
        }
    }

    return result;
}
