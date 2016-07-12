import React, {Component} from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import Root from './components/root'

import appReducer from './reducers/app-reducer';
import reducer from './reducers/movie-list-reducer';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

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


