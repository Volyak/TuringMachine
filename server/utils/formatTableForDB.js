import taskTypes from "../const/taskTypes";

export default (parcel, task) => {
    switch (task.taskType) {
        case taskTypes.Turing.value :
            return turingTable(parcel, task.alphabet);
        default:
            return parcel.table;
    }
}

function turingTable(parcel, taskAlphabet) {
    let result = [];
    const alphabet = taskAlphabet + parcel.userAlphabet;
    console.log(taskAlphabet);
    for (let i = 0, l = parcel.table.length; i < l; i++) {
        result[i] = [];
        for (let j = 0, k = alphabet.length; j < k; j++) {
            result[i][j] = parcel.table[i][alphabet[j]];
        }
    }

    return result;
}

function postTable(parcel) {
    const {commands, goTo} = parcel.table;
    return {commands, goTo};
}