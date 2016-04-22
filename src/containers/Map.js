import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCreditCards } from '../actions/mapAction';



class Map extends Component {

    // TODO: APPLY METHOD BINDINGS WITHIN THE CONSTRUCTOR METHOD
    constructor(props) {
        super(props);
    };

    //React events
    componentDidMount() {
        this.props.dispatch(fetchCreditCards());
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
    dispatch: PropTypes.func.isRequired
};


export default connect(mapStateToProps)(Map);
