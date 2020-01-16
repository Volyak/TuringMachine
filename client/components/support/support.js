import React, {Component} from 'react'
import description from './description'
import example from "./example";
import instruction from "./instruction";

class Support extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>
                    <h2>Машина Тьюринга</h2>
                    <h3>Описание</h3>
                    <p>{description.TM.part_1}</p>
                    <p>{description.TM.part_2}</p>
                    <p>{description.TM.part_3}</p>
                    <h3>Инструкция</h3>
                    <p>{instruction.TM.part_1}</p>
                    <p>{instruction.TM.part_2}</p>
                    <h3>Примеры команд</h3>
                    <p>{example.TM.part_1}</p>
                    <p>{example.TM.part_2}</p>
                    <p>{example.TM.part_3}</p>
                    <p>{example.TM.part_4}</p>
                </div>
                <div>
                    <h2>Машина Поста</h2>
                    <h3>Описание</h3>
                    <p>{description.PM.part_1}</p>
                    <p>{description.PM.part_2}</p>
                    <p>{description.PM.part_3}</p>
                    <p>{description.PM.part_4}</p>
                    <h3>Инструкция</h3>
                    <p>{instruction.PM.part_1}</p>
                    <p>{instruction.PM.part_2}</p>
                    <p>{instruction.PM.part_3}</p>
                    <h3>Примеры команд</h3>
                    <p>{example.PM}</p>
                </div>
                <div>
                    <h2>Нормальные алгоритмы Маркова</h2>
                    <h3>Описание</h3>
                    <p>{description.NAM}</p>
                    <h3>Инструкция</h3>
                    <p>{instruction.NAM}</p>
                    <h3>Примеры команд</h3>
                    <p>{example.NAM}</p>
                </div>
            </div>
        )
    }
}

export default Support