// Imports Here
import /* */

// USE FOR REFERENCE: https://github.com/acdlite/flux-standard-action

// EXAMPLE ACTION DEFINTION
export const EXAMPLE_ACTION_NAME = 'exampleNameSpace/EXAMPLE_ACTION_NAME';

export function exampleActionName( value ) {
    return {
        type: EXAMPLE_ACTION_NAME,

        // <OPTIONAL> payload (Delete if not required)
        payload: {

        },

        // <OPTIONAL> error (Delete if not required)
		    error: false, // value returned must be boolean

    		// <OPTIONAL> meta (Delete if not required)
    		meta: {

            }
        }
}
