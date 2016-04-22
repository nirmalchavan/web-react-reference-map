// Imports Here
import { fetchAll } from '../services/creditCardService';

// USE FOR REFERENCE: https://github.com/acdlite/flux-standard-action

// EXAMPLE ACTION DEFINTION
//export const EXAMPLE_ACTION_NAME = 'exampleNameSpace/EXAMPLE_ACTION_NAME';
exprot const FETCH_CREDIT_CARDS = 'creditCard/FETCH_CREDIT_CARDS';

export function fetchCreditCards() {
    return {
        type: FETCH_CREDIT_CARDS,

        // <OPTIONAL> payload (Delete if not required)
        payload: {
            promise: fetchAll()
        },

        // <OPTIONAL> error (Delete if not required)
		    //error: false, // value returned must be boolean

    		// <OPTIONAL> meta (Delete if not required)
    		//meta: {

            //}
        };
}
