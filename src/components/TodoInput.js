import React, { Component } from 'react'
import {Input, Button, Panel} from 'react-bootstrap'
//import {Input, Button} from '@esi/ui-components'

class TodoInput extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            inputText: ''
        }
    }

    handleChange(event) {
        this.setState({
            inputText: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('Submit button clicked')
        this.props.addTodo(this.state.inputText)
    }

    render () {
        return(
            <div>
                <form onClick={this.handleSubmit.bind(this)}>
                    <Input
                        type="text"
                        placeholder="Type in your todo"
                        value={ this.state.inputText }
                        onChange={ this.handleChange.bind(this) }
                    />
                    <Input type="submit" text="Submit"/>
                </form>
            </div>
        )
    }
}

export default TodoInput
