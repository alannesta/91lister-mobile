import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import Root from './root'

import appReducer from './reducers/app-reducer';
import reducer from './reducers/movie-list-reducer';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

let store = createStoreWithMiddleware(appReducer);
//let store = createStoreWithMiddleware(reducer);

render(
	<Provider store={store}>
		<Root/>
	</Provider>,
	document.getElementById('root')
);
