import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { LOGIN_MESSAGE } from "../../../helpers/constants";
import { GET_RECRUITER, GET_RECRUITER_ERROR, GET_RECRUITER_SUCCESS, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, SET_LAST_VISITED_PROFILES } from "./constants";
import * as BackEnd from '../../../helpers/https';

/**
 * https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
 * export type ThunkAction< 
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
 */
type LoginThunkResult<R> = ThunkAction<R, undefined, undefined, Action>;

export const loginAction = (): LoginThunkResult<void> => {
	return (dispatch: ThunkDispatch<undefined, undefined, Action> ) => {
		dispatch(login());
		chrome.runtime.sendMessage({message: LOGIN_MESSAGE});
	};
};
export const getRecruiterAction = (userId: number): LoginThunkResult<void> => {
	return async (dispatch: ThunkDispatch<undefined, undefined, Action> ) => {
		dispatch(getRecruiter());
		const recruiter:Recruiter|null = await BackEnd.getRecruiter(userId);
		if(recruiter){
			dispatch(getRecruiterSuccess(recruiter));
		}else {
			dispatch(getRecruiterError('There was an error getting the recruiter'));
		}
	};
};

export const login = () => ({
	type: LOGIN,
});
export const logout = () => ({
	type: LOGOUT
});
export const loginError = (errorMessage: string) => ({
	type: LOGIN_ERROR,
	payload: errorMessage,
});
export const loginSuccess = (user: AuthData) => ({
	type: LOGIN_SUCCESS,
	payload: user,
});
export const setLastVisitedProfiles = (lastVisitedProfiles: chrome.history.HistoryItem[]) => ({
	type: SET_LAST_VISITED_PROFILES,
	payload: lastVisitedProfiles,
});
export const getRecruiter = () => ({
	type: GET_RECRUITER,
});
export const getRecruiterSuccess = (recruiter: Recruiter) => ({
	type: GET_RECRUITER_SUCCESS,
	payload: recruiter,
});
export const getRecruiterError = (errorMessage: string) => ({
	type: GET_RECRUITER_ERROR,
	payload: errorMessage,
});