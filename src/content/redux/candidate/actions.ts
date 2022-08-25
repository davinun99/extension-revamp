import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { getCandidateFromScrape } from '../../../helpers/scrape';
import { GET_CANDIDATE_FROM_BACK, GET_CANDIDATE_SCRAPED, GET_CANDIDATE_FROM_BACK_SUCCESS, GET_CANDIDATE_FROM_BACK_ERROR, SAVE_CANDIDATE, GET_CANDIDATE_NOTES, GET_CANDIDATE_NOTES_SUCCESS, GET_CANDIDATE_NOTES_ERROR } from "./constants";
import * as BackEnd from '../../../helpers/https';

type CandidateThunkResult<R> = ThunkAction<R, undefined, undefined, Action>;

export const getCandidateScraped = (scraped: any) => ({
	type: GET_CANDIDATE_SCRAPED,
	payload: scraped,
});

export const getCandidateFromBack = () => ({
	type: GET_CANDIDATE_FROM_BACK,
});

export const getCandidateFromBackAction = (url: string): CandidateThunkResult<void> => {
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
export const getCandidateNotesAction = (candidateId:number): CandidateThunkResult<void> => {
	return async (dispatch: ThunkDispatch<void, any, Action> ) => {
		dispatch(getCandidateNotes());
		const notes:BackendCandidateNote[]|null = await BackEnd.getCandidateNotes(candidateId);
		if(notes){
			dispatch(getCandidateNotesSuccess(notes));
		}else {
			dispatch(getCandidateNotesError('There was an error getting candidate notes'));
		}	
	};
};
export const saveCandidateToBackAction = (candidate:SimpleCandidate): CandidateThunkResult<void> => {
	return async (dispatch: ThunkDispatch<void, any, Action> ) => {
		dispatch(getCandidateFromBack());
		const newCandidate:SimpleCandidate|null = await BackEnd.saveCandidate(candidate);
		if(newCandidate){
			dispatch(saveCandidateSuccess(newCandidate));
		}else {
			dispatch(saveCandidateError('There was an error getting the candidate'));
		}	
	};
};
export const getCandidateScrapedAction = (managingRecruiterId: number): CandidateThunkResult<void> => {
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
export const getCandidateNotes = () => ({
	type: GET_CANDIDATE_NOTES,
});
export const getCandidateNotesSuccess = (notes: any[]) => ({
	type: GET_CANDIDATE_NOTES_SUCCESS,
	payload: notes,
});
export const getCandidateNotesError = (errorMessage:string) => ({
	type: GET_CANDIDATE_NOTES_ERROR,
	payload: errorMessage,
});
export const saveCandidate = () => ({
	type: SAVE_CANDIDATE,
});
export const saveCandidateSuccess = (candidate:SimpleCandidate) => ({
	type: SAVE_CANDIDATE,
	payload: candidate,
});
export const saveCandidateError = (errorMessage:string) => ({
	type: SAVE_CANDIDATE,
	payload: errorMessage,
});