import { getCandidateScrapedAction } from './../candidate/actions';
import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { LAST_PROFILES_VISITED_MESSAGE } from "../../../helpers/constants";
import { getCandidateFromBackAction } from "../candidate/actions";
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
export const goToCandidateScreen = (url: string, managingRecruiterId:number): NavigationThunkResult<void> => {
	return (dispatch: ThunkDispatch<undefined, undefined, Action>) => {
		//PREPARING ALL DATA BEFORE NAVIGATION:
		dispatch(getCandidateFromBackAction(url));
		dispatch(getCandidateScrapedAction(managingRecruiterId));
		dispatch(goToViewCandidate());
	};
};
export const goToViewCandidate = () => ({
	type: CANDIDATE_PAGE,
});