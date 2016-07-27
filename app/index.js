import React, {Component} from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';

import Root from './components/root'
import appReducer from './reducers/app-reducer';
import reducer from './reducers/movie-list-reducer';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);

let store = createStoreWithMiddleware(appReducer);
//let store = createStoreWithMiddleware(reducer);

class ReduxApp extends Component {
	render() {
		return (
			<Provider store={store}>
				<Root/>
			</Provider>
		);
	}
}

export default ReduxApp;
