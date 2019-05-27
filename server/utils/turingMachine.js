export default function playTest(solution, test) {
    const {input, output} = test;

    let programmOutput = "" + input;
    let index = 0;
    let state = 0;
    let step = 0;

    while (step < 1000) {
        const currentSymbol = input[index];
        let programm = solution[state][currentSymbol];

        if (programm.writeSymbol)
            programmOutput = replaceAt(programmOutput,index,programm.writeSymbol);

        if (programm.move === "S") {
            step++;
            break;
        }
        else {
            programm.move === "R" ? index++ : index--;
        }

        state = programm.nextState-1;
        step++;
    }
    return output === programmOutput;
}

function replaceAt(string,index,symbol) {
    return string.substring(0, index) + symbol + string.substring(index + 1);
}