export default function playTest(solution, test) {
    const {input, output} = test;
    const {commands, lines} = solution;

    let programOutput = "" + input;
    let index = 0;
    let currentLine = 0;
    let step = 0;
    let error = false;
    let stop = false;
    while (step < 1000) {
        const command = commands[currentLine];

        switch (command) {
            case "V":
                if (programOutput[index] === "V")
                    error = true;
                else
                    addMark(programOutput, index);
                break;
            case "X":
                if (programOutput[index] === " ")
                    error = true;
                else
                    deleteMark(programOutput, index);
                break;
            case ">":
                index++;
                break;
            case "<":
                index--;
                break;
            case "?":
                currentLine = programOutput[index] === " " ? getFirstNextLine(lines[currentLine]) :
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
    return output === programOutput;
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