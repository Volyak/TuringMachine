import tm from './turingMachine'

export default function runTests(solution, tests) {
    for (let i =0, l = tests.length; i < l; i++){
        try {
            if (!tm(solution, tests[i])) {
                return i + 1;
            }
        }
        catch (e){
            return i + 1;
        }
    }
    return 0;
}