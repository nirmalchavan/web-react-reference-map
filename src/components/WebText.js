/**
 * Created by ED0051 on 4/15/2016.
 */
import React, { Component } from 'react'
import { Button as MAPButton }  from '@esi/ui-components'
import { Modal as MAPModal } from 'react-bootstrap';
import { Notification } from '@esi/ui-components';

class WebText extends Component {

   constructor(props ) {
        super(props)
        this.state = {
            textContent: this.props.texte
        }
    }

    handleChange(event) {
        this.setState({
            textContent: "Ramu Meets Shamu"
        })
    }

    render() {
        return (
            <div>
                <div> Good Morning </div>
                <div>
                < input type="text"
                        placeholder="This going to be web service response text/json"
                        value="Lab main Laab"
                        onchange={ this.handleChange.bind(this) }/>
                <MAPButton onClick={this.handleChange.bind(this)} >Close</MAPButton>
                </div>
                <div>
                    <MAPModal show>
                        <MAPModal.Header>
                            <MAPModal.Title><span className="fa fa-shopping-cart" ></span> - <strong>Manufacturers Assistance Program </strong> </MAPModal.Title>
                        </MAPModal.Header>
                        <MAPModal.Body>
                            <div>This is modal body</div>
                        </MAPModal.Body>
                        <MAPModal.Footer>
                            <MAPButton onClick={this.handleChange.bind(this)} >Close</MAPButton>
                        </MAPModal.Footer>
                    </MAPModal>
                </div>

            </div>
            )
    }
}
export default WebText
