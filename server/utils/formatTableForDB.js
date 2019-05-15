export default (table, alphabet) => {
    let result = [];

    for(let i = 0, l = table.length; i < l; i++){
        result[i] = [];
        for(let j = 0, k = alphabet.length; j < k; j++) {
            result[i][j] = table[i][alphabet[j]];
        }
    }

    return result;
}