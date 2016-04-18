import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class Map extends Component {

    // TODO: APPLY METHOD BINDINGS WITHIN THE CONSTRUCTOR METHOD
    constructor(props) {
        super(props);
    };

    //React events
    componentDidMount() {

    }

    render() {

        return (
                  <div>
                  </div>
        )
    }

}

function mapStateToProps(state){
    	//TODO: map the props for this conatiner from the state param
    	return {/*myProp: state.reducer.myProp*/};
}

Map.propTypes = {

};


export default connect(mapStateToProps)(Map);
