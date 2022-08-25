import { GET_CANDIDATE_SCRAPED, SAVE_CANDIDATE, SAVE_CANDIDATE_ERROR, SAVE_CANDIDATE_SUCCESS } from "./constants";

const INIT_STATE = {
	scrapedCandidateInfo: null,
	backendCandidateInfo: null,
	errorMessage: '',
	isLoading: true,
};
// type ACTIONTYPE =
// 	| { type: "increment"; payload: number }
// 	| { type: "decrement"; payload: string };
const CandidateReducer = (state = INIT_STATE, action: any) => {
	switch(action.type) {
		case GET_CANDIDATE_SCRAPED:
			return {
				...state,
				scrapedCandidateInfo: action.payload,
			};
		case SAVE_CANDIDATE:
			return {
				...state,
				errorMessage: '',
				isLoading: true,
			};
		case SAVE_CANDIDATE_SUCCESS:
			return {
				...state,
				backendCandidateInfo: action.payload,
				errorMessage: '',
				isLoading: false,
			};
		case SAVE_CANDIDATE_ERROR:
			return {
				...state,
				backendCandidateInfo: null,
				errorMessage: action.payload,
				isLoading: false,
			};
		default:
			return state;
	}
}
export default CandidateReducer;
