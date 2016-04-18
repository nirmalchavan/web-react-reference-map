import React, { Component } from 'react'

class Checkbox extends Component {
		
	render () {
		return (
			<div>
				<div>I'm in checkbox </div>
				<checkbox onSelect={ this.handleClick.bind(this) } >delete one letter</button>
			</div>
		)  
	}
}

export default Checkbox