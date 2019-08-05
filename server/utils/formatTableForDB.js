import taskTypes from "../const/taskTypes";

export default (solution, task) => {
    switch (task.taskType) {
        case taskTypes.Turing.value :
            return turingTable(solution, task.alphabet);
        default:
            return solution;
    }
}

function turingTable(solution, alphabet) {
    let result = [];

    for (let i = 0, l = solution.length; i < l; i++) {
        result[i] = [];
        for (let j = 0, k = alphabet.length; j < k; j++) {
            result[i][j] = solution[i][alphabet[j]];
        }
    }

    return result;
}

function postTable(solution) {
    const {commands, goTo} = solution;
    return {commands, goTo};
}