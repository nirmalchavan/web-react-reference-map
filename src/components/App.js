import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../redux/actions'
//import { Button } from 'react-bootstrap'

class App extends Component {
	render () {
		return (
		<div>
			<h1>TO DO LIST </h1>
			<TodoInput addTodo={this.props.actions.addTodo} />
            <TodoList actions={this.props.actions} todos={this.props.todos}/>
		</div>
		)
	}
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
