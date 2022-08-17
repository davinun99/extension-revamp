import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { LAST_PROFILES_VISITED_MESSAGE } from "../../../helpers/constants";
import { HOME_PAGE, LOGIN_PAGE, CANDIDATE_PAGE } from "./constants";

export const goToLogin = () => ({
	type: LOGIN_PAGE,
})
export const goToHomeSimple = () => ({
	type: HOME_PAGE,
});
type NavigationThunkResult<R> = ThunkAction<R, undefined, undefined, Action>;
export const goToHome = (): NavigationThunkResult<void> => {
	return (dispatch: ThunkDispatch<undefined, undefined, Action>) => {
		//PREPARING ALL DATA BEFORE NAVIGATION:
		chrome.runtime.sendMessage({message: LAST_PROFILES_VISITED_MESSAGE});
		dispatch(goToHomeSimple());
	};
};
export const goToViewCandidate = () => ({
	type: CANDIDATE_PAGE,
});