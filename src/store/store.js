import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
	thunk
];

function configureStore(initialState = {}) {
	return createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(...middlewares))
	);
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
