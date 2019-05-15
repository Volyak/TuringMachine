export default function playTest(solution, test) {
    const {input, output} = test;

    let programmOutput = "" + input;
    let index = 0;
    let state = 0;
    let step = 0;

    while (step < 1000) {
        const currentSymbol = input[index];
        let programm = solution[state][currentSymbol];

        //тут ошибка
        if (programm.writeSymbol)
            programmOutput = replaceAt(programmOutput,index,programm.writeSymbol);

        //Ошибка если нет состояния

        if (programm.move === "S") {
            step++;
            break;
        }
        else {
            programm.move === "R" ? index++ : index--;
        }

        //Ошибка если состояние больше чем в таблице
        state = programm.nextState-1;
        step++;
    }
    return output === programmOutput;
}

function replaceAt(string,index,symbol) {
    return string.substring(0, index) + symbol + string.substring(index + 1);
}