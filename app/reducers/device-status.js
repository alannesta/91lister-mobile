/*
 * @flow weak
 */
import {
	combineReducers
} from 'redux';

const networkStatusReducer = (state = {connectionType: 'WIFI'}, action) => {
	switch (action.type) {
		case 'CONNECTION_STATUS_CHANGED':
      return {
        connectionType: action.connectionType
      }
		// TODO: future use
		case 'CONNECTION_REESTABLISHED':
			return {
				connectionType: action.connectionType
			}
		default:
			return state;
	}
}

const deviceStatusReducer = combineReducers({
	network: networkStatusReducer
});

export default deviceStatusReducer;
