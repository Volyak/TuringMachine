const TM = {
    part_1:"1) R1 - отсутствие символа из алфавита А говорит, что в обозреваемой ячейке не заменяется символ. Головка сдвигается на одну ячейку вправо вдоль ленты. Машина переходит в состояние q1.",
    part_2:"2) 1L2 - в обозреваемой ячейке символ заменяется на 1. Головка сдвигается влево на одну ячейке. Машина переходит в состояние q2",
    part_3:"3) S2 - отсутствие символа из алфавита А говорит, что в обозреваемой ячейке не заменяется символ. Машина завершает свою работу в состоянии q2.",
    part_4:"Пример неправильных команд: '1 2', '1R', '2R1' где 2 не входит в алфавит А, 'пустая команда'"
};
const PM = {
    part_1:"",
};
export default {TM, PM};