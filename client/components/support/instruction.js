const turingMachine = "";
const postMachine = `Машина Поста состоит из каретки (считывающей и записывающей головки) и бесконечной ленты, разбитой на ячейки. Каждая ячейка ленты может быть либо пустой, или содержать метку («V»).
    Программа состоит из пронумерованных строк. В каждой строке записывается одна из следующих команд:
        > N    переместить каретку вправо на 1 ячейку и перейти к строке с номером N;
        < N    переместить каретку влево на 1 ячейку и перейти к строке с номером N
        X N    стереть метку в текущей ячейке и перейти к строке с номером N
        V N    поставить метку в текущую ячейку «V» и перейти к строке с номером N
        ? N, M   если текущая ячейка не содержит метку «V», то перейти к строке с номером N, иначе перейти к строке M
        !   остановить программу`;
export default {turingMachine, postMachine};