import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { getCandidateFromScrape } from '../../../helpers/scrape';
import { GET_CANDIDATE_FROM_BACK, GET_CANDIDATE_SCRAPED, GET_CANDIDATE_FROM_BACK_SUCCESS, GET_CANDIDATE_FROM_BACK_ERROR, GET_CANDIDATE_MESSAGES, GET_CANDIDATE_MESSAGES_SUCCESS } from "./constants";
import * as BackEnd from '../../../helpers/https';

type GetCandidateThunkResult<R> = ThunkAction<R, undefined, undefined, Action>;

export const getCandidateScraped = (scraped: any) => ({
	type: GET_CANDIDATE_SCRAPED,
	payload: scraped,
});

export const getCandidateFromBack = () => ({
	type: GET_CANDIDATE_FROM_BACK,
});
export const getCandidateFromBackAction = (url: string): GetCandidateThunkResult<void> => {
	return async (dispatch: ThunkDispatch<void, any, Action> ) => {
		dispatch(getCandidateFromBack());
		const candidate:BackendCandidate|null = await BackEnd.getCandidate(url);
		if(candidate){
			dispatch(getCandidateFromBackSuccess(candidate));
		}else {
			dispatch(getCandidateFromBackError('There was an error getting the candidate'));
		}	
	};
};
export const getCandidateScrapedAction = (managingRecruiterId: number): GetCandidateThunkResult<void> => {
	return async (dispatch: ThunkDispatch<void, any, Action> ) => {
		dispatch(getCandidateScraped(getCandidateFromScrape(managingRecruiterId)));
	};
};
export const getCandidateFromBackSuccess = (candidate: any) =>({
	type: GET_CANDIDATE_FROM_BACK_SUCCESS,
	payload: candidate,
});
export const getCandidateFromBackError = (errorMessage: string) => ({
	type: GET_CANDIDATE_FROM_BACK_ERROR,
	payload: errorMessage,
});
export const getCandidateMessages = () => ({
	type: GET_CANDIDATE_MESSAGES,
});
export const getCandidateMessagesSuccess = (messages: any) => ({
	type: GET_CANDIDATE_MESSAGES_SUCCESS,
	payload: messages,
});
export const getCandidateMessagesError = (errorMessage:string) => ({
	type: GET_CANDIDATE_MESSAGES_SUCCESS,
	payload: errorMessage,
});