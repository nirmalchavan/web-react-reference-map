import React, { Component, PropTypes } from 'react';

class Map extends Component {

    // TODO: APPLY METHOD BINDINGS WITHIN THE CONSTRUCTOR METHOD
    constructor(props) {
        super(props);
    };

    // <OPTIONAL> STATIC METHODS HERE (Delete if not required)
    // statics: {
    //   customMethod: function(foo) {
    //     return foo === 'bar';
    //   }
    // },

    // <OPTIONAL> REACT COMPONENT -STATE- LIFECYLE EVENTS (Delete any methods not required)
    componentWillMount() {

    }

    componentDidMount() {

    }

    // <OPTIONAL> REACT COMPONENT -PROP- LIFECYLCE EVENTS (Delete any methods not required)
    componentWillReceiveProps(nextProps) {
      this.setState({
        // set something
      });
    }

    shouldComponentUpdate(nextProps, nextState){
      // return a boolean value
      return true;
    }

    componentWillUpdate(nextProps, nextState){
      // perform any preparations for an upcoming update
    }

    componentDidUpdate: function(prevProps, prevState){

    }

    componentWillUnmount() {

    }

    // <OPTIONAL> TODO: PLACE YOUR 'ON' EVENTS HERE


    // <OPTIONAL> INITIALIZATION METHODS (Delete any methods not required)
    getInitialState(){
      return { /* something here */};
    }

    getDefaultProps(){
      return { /* something here */};
    }


    // VARIABLE USED FOR DEDUBBING
    string displayName = Map;

    // MANDATORY REACT EVENT, TODO: PLACE COMPONENT DEFINITION HERE
    render() {

        return (
                  <div>
                  </div>
                )
    }

}

Map.propTypes = {

};

export default Map ;
