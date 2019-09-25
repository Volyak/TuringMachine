import React, {Component} from 'react'
import PostTable from "../tables/postTable";

import './css/task.css';

class PostTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            initTableState: props.init
        }
    }

    componentDidMount() {
        const {task} = this.props;
        this.setState({
            id: task._id,
            name: task.name,
            description: task.description
        })
    }

    render() {
        const {id, name, description, initTableState} = this.state;
        return (
            <div className={'task'}>
                <h3> {name} </h3>
                <div> {description} </div>
                { id &&
                    <PostTable taskId={id} init={initTableState}/>
                }
            </div>
        )
    }
}

export default PostTask;