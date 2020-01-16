export default function playTest(solution, test) {

    const {input, output} = test;
    const {patterns, replacements} = solution;
    const maxSteps = 1000;

    let programOutput = "" + input;
    let step = 0;
    let error = false;
    let stop = false;

    while (step < maxSteps) {
        let resultOfFind = findPatternAndStart(programOutput, patterns);
        if (!resultOfFind) {
            error = true;
        } else {
            let resultOfReplacement = makeReplacement(programOutput, resultOfFind, replacements);
            programOutput = resultOfReplacement.output;
            stop = resultOfReplacement.stop;
        }
        step++;
        stop = error ? true : stop;
        if (stop)
            break;
    }
    return output === programOutput;
}

function findPatternAndStart(input, patterns) {
    let index = -1;
    let result;
    for (let i = 0, l = patterns.length; i < l; i++) {
        index = input.indexOf(patterns[i]);
        if (index !== -1) {
            result = {patternIndex: i, startIndex: index};
            break;
        }
    }
    return result;
}

function makeReplacement(input, resultOfFind, replacements) {
    const {patternIndex, startIndex} = resultOfFind;
    const replacement = replacements[patternIndex];
    const stop = replacement.indexOf(".") !== -1;
    let output = input.substring(0, startIndex) + replacement;

    if (stop)
        output = output.substring(0, output.length - 1);

    if (startIndex + 1 !== input.length) {
        output += input.substring(startIndex + 1);
    }
    return {stop, output};
}