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
export const store = configureStore({ reducer: {
	auth: AuthReducer,
	candidate: CandidateReducer,
	nav: NavReducer,
} });
export type RootState = ReturnType<typeof store.getState>