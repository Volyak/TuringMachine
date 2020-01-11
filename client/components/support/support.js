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
                <h2>Машина Тьюринга</h2>
                <h3>Описание</h3>
                <p>{description.turingMachine}</p>
                <h3>Инструкция</h3>
                <p>{instruction.turingMachine}</p>
                <h3>Пример задачи</h3>
                <p>{example.turingMachine}</p>
                <h2>Машина Поста</h2>
                <h3>Описание</h3>
                <p>{description.postMachine}</p>
                <h3>Инструкция</h3>
                <p>{instruction.postMachine}</p>
                <h3>Пример задачи</h3>
                <p>{example.postMachine}</p>
            </div>
        )
    }
}

export default Support