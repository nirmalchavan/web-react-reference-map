/**
 * Created by ED0051 on 4/15/2016.
 */
import React, { Component } from 'react'


class WebText extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textContent: 'initial text'
        }
    }

    handleChange(event) {
        this.setState({
            textContent:""
        })
    }

    render() {
        return (
            <div>
                <div> Good Morning </div>
                /*<input type="text"
                       placeholder="This going to be web service response text/json"
                       value={ this.state.textContent }
                       onchange={ this.handleChange.bind(this) }/>*/
            </div>
            )

    }
}
export default WebText
