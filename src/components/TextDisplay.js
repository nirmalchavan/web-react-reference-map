import React, { Component } from 'react'
import WebText from './WebText'

class TextDisplay extends Component {

	handleClick() {
		//console.log(this);
		this.props.deleteletter();
	}

	render () {
		return (
			<div>
				<div>I'm displaying Text: {this.props.text}</div>
				<button onClick={ this.handleClick.bind(this) } >delete one letter</button>
                <WebText />
			</div>
		)
	}
}

export default TextDisplay
