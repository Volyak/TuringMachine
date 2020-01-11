export default function playTest(solution, test) {
    const {input, output} = test;
    const {commands, goTo} = solution;

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
                    programOutput = addMark(programOutput, index);
                currentLine = getNextLine(currentLine, goTo);
                break;
            case "X":
                if (programOutput[index] === " ")
                    error = true;
                else
                    programOutput = deleteMark(programOutput, index);
                currentLine = getNextLine(currentLine, goTo);
                break;
            case ">":
                if(index + 1 === programOutput.length){
                    index = index + 2;
                    programOutput = addEmptySpaces(programOutput);}
                else
                    index++;
                currentLine = getNextLine(currentLine, goTo);
                console.log(index);
                break;
            case "<":
                if(index - 1 < 0)
                    programOutput = addEmptySpaces(programOutput);
                else
                    index --;
                currentLine = getNextLine(currentLine, goTo);
                console.log(index);
                break;
            case "?":
                currentLine = programOutput[index] === " " ? getFirstNextLine(goTo[currentLine]) :
                    getSecondNextLine(goTo[currentLine]);
                break;
            case "!":
                stop = true;
                break;
            default:
                error = true;
                break;
        }

        step++;
        stop = error ? true : stop;
        if (stop)
            break;
    }
    programOutput = deleteEmptySpaces(programOutput);
    return output === programOutput;
}

function getNextLine(currentLine, goTo) {

    let next = parseInt(goTo[currentLine]);
    if (isNaN(next))
        return currentLine + 1;

    return next - 1;
}
function addEmptySpaces(programOutput) {
    return " "+programOutput + " ";
}

function addMark(input, index) {
    return input.substring(0, index) + "V" + input.substring(index + 1);
}

function deleteMark(input, index) {
    return input.substring(0, index) + " " + input.substring(index + 1);
}

function getFirstNextLine(nextLines) {
    const index = nextLines.indexOf(",");
    return parseInt(nextLines.substring(0, index)) - 1;
}

function getSecondNextLine(nextLines) {
    const index = nextLines.indexOf(",");
    return parseInt(nextLines.substring(index + 1)) - 1;
}

function deleteEmptySpaces(programOutput) {
    let indexOfMark = programOutput.indexOf("V");
    programOutput = programOutput.substring(indexOfMark);
    indexOfMark = programOutput.lastIndexOf("V");
    return programOutput.substring(0, indexOfMark + 1);
}