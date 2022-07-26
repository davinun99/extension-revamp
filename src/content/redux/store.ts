// @flow
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth/reducers';
// import { applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import sagas from './sagas';

// const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware];

//REDUCERS: 
import CandidateReducer from './candidate/reducers';
import NavReducer from './nav/reducers';
export function createAppStore() {
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));
	const store = configureStore({ reducer: {
		auth: AuthReducer,
		candidate: CandidateReducer,
		nav: NavReducer,
	} });
    // sagaMiddleware.run(sagas);
    return store;
}
// export type RootState = ReturnType<typeof store.getState>