export default function playTest(solution, test) {
    console.log(solution);
    const {input, output} = test;

    let programOutput = "" + input;
    let index = 0;
    let state = 0;
    let step = 0;

    while (step < 1000) {
        const currentSymbol = programOutput[index];
        let program = solution[state][currentSymbol];

        if (program.writeSymbol)
            programOutput = replaceAt(programOutput, index, program.writeSymbol);

        if (program.move === "S") {
            programOutput = deleteEmptySpaces(programOutput);
            break;
        } else if (program.move === "R") {
            if (index + 1 === programOutput.length) {
                index = index + 2;
                programOutput = addEmptySpaces(programOutput);
            } else
                index++;
        } else if (index - 1 < 0)
            programOutput = addEmptySpaces(programOutput);
        else
            index--;

        state = program.nextState - 1;
        step++;
    }
    return output === programOutput;
}

function addEmptySpaces(programOutput) {
    return "_" + programOutput + "_";
}

function deleteEmptySpaces(programOutput) {
    let cutIndex = 0;
    for (let i = 0; i < programOutput.length; i++) {
        if (programOutput[i] !== "_")
            break;
        cutIndex++;
    }
    programOutput = programOutput.substring(cutIndex);
    cutIndex = programOutput.length - 1;
    for (let i = programOutput.length; i > 0; i--) {
        if (programOutput[i] !== "_")
            break;
        cutIndex--;
    }
    return programOutput.substring(0, cutIndex);
}

function replaceAt(string, index, symbol) {
    return string.substring(0, index) + symbol + string.substring(index + 1);
}