import React, { Component } from 'react'
import { Button } from 'react-bootstrap'


class TodoItem extends Component {

    handleComplete() {
        this.props.actions.completeTodo(this.props.todo.id)
    }

    handleDelete() {
        this.props.actions.deleteTodo(this.props.todo.id)
    }

    render () {
        return (
            <li>
                <div>{this.props.todo.text}</div>
                <Button onClick={this.handleComplete.bind(this)}>Mark as completed</Button>
                <Button onClick={this.handleDelete.bind(this)}>Delete todo</Button>
            </li>
        )
    }
}

export default TodoItem
