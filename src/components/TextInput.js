import React, { Component } from 'react'
import TextDisplay from './TextDisplay'
//import AJAXHelper from 'some-ajax-helper-library';

class TextInput extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			inputText: 'initial text'
		}
	}

    // <OPTIONAL> REACT COMPONENT -STATE- LIFECYLE EVENTS (Delete any methods not required)
    componentWillMount() {
    }

    componentDidMount() {
        this.setState({
            inputText:"Shamu greeted Ramu in the bar on Friday"
        })
    }

	deleteLetter() {
		//take current this.state.inputText
		//delete letter
		//update state

		this.setState({
			inputText:this.state.inputText.substring(0,this.state.inputText.length - 1)
		})

	}

	handleChange(event) {
		this.setState({
			inputText: event.target.value
		})
	}



	render () {
		return(
			<div>
				<input
				type="text"
				placeholder="This is going to be test"
				value={ this.state.inputText }
				onChange={ this.handleChange.bind(this) }
				/>
				<TextDisplay text={this.state.inputText} deleteletter={this.deleteLetter.bind(this)}/>
			</div>
		)
	}

    // This method is always called, on the client, when the component has been
    // rendered onto the DOM.
    //componentDidMount() {
    //    AJAXHelper.get('http://example.com/ourdata').then(data => {
    //        this.setState('someData', data);
    //    });
    //}
}

export default TextInput
