export default function playTest(solution, test) {
    const {input, output} = test;
    const {commands, lines} = solution;

    let programmOutput = "" + input;
    let index = 0;
    let currentLine = 0;
    let step = 0;
    let error = false;
    let stop = false;
    while (step < 1000) {
        const command = commands[currentLine];

        switch (command) {
            case "V":
                if (programmOutput[index] === "V")
                    error = true;
                else
                    addMark(programmOutput, index);
                break;
            case "X":
                if (programmOutput[index] === " ")
                    error = true;
                else
                    deleteMark(programmOutput, index);
                break;
            case ">":
                index++;
                break;
            case "<":
                index--;
                break;
            case "?":
                currentLine = programmOutput[index] === " " ? getFirstNextLine(lines[currentLine]) :
                    getSecondNextLine(lines[currentLine]);
                currentLine--;
                break;
            case "!":
                stop = true;
                break;
            default:
                error = true;
                break;
        }

        stop = error ? true : stop;
        if(stop)
            break;
    }
    return output === programmOutput;
}

function addMark(input, index) {
    return input.substring(0, index) + "V" + input.substring(index + 1);
}

function deleteMark(input, index) {
    return input.substring(0, index) + " " + input.substring(index + 1);
}

function getFirstNextLine(nextLines) {
    const index = nextLines.indexOf(",");
    return parseInt(nextLines.substring(0, index));
}

function getSecondNextLine(nextLines) {
    const index = nextLines.indexOf(",");
    return parseInt(nextLines.substring(index + 1));
}