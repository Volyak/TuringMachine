import tm from './turingMachine'
import pm from './postMachine'
import mm from './markovMachine'

export default function runTests(machineType, parcel, tests) {
    let machine;
    switch (machineType) {
        case "Turing":
            machine = tm;
            break;
        case "Post":
            machine = pm;
            break;
        case "Markov":
            machine = mm;
            break;
        default:
            return 0;
    }
    for (let i =0, l = tests.length; i < l; i++){
        try {
            if (!machine(parcel.table, tests[i])) {
                return i + 1;
            }
        }
        catch (e){
            return i + 1;
        }
    }
    return 0;
}