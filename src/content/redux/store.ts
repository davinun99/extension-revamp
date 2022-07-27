// @flow
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth/reducers';
import thunk from "redux-thunk";

//REDUCERS: 
import CandidateReducer from './candidate/reducers';
import NavReducer from './nav/reducers';

export const store = configureStore({ reducer: {
	auth: AuthReducer,
	candidate: CandidateReducer,
	nav: NavReducer,
}, middleware: [thunk] });

export type RootState = ReturnType<typeof store.getState>