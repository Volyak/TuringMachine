export default function playTest(solution, test) {
    console.log(solution);
    const {input, output} = test;

    let programOutput = "" + input;
    let index = 0;
    let state = 0;
    let step = 0;

    while (step < 1000) {
        const currentSymbol = input[index];
        let program = solution[state][currentSymbol];

        //тут ошибка
        if (program.writeSymbol)
            programOutput = replaceAt(programOutput,index,program.writeSymbol);

        //Ошибка если нет состояния

        if (program.move === "S") {
            step++;
            break;
        }
        else {
            program.move === "R" ? index++ : index--;
        }

        //Ошибка если состояние больше чем в таблице
        state = program.nextState-1;
        step++;
    }
    return output === programOutput;
}

function replaceAt(string,index,symbol) {
    return string.substring(0, index) + symbol + string.substring(index + 1);
}