//imports here

const initialState = {

};

export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case /* Add Case Here */:
            return Object.assign({}, state, {

                data: action.payload
            });

        default:
            return state;
    }
}
