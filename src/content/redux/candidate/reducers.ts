import { GET_CANDIDATE_SCRAPED } from "./constants";

const INIT_STATE = {
	scrapedCandidateInfo: null,
	backenCandidateInfo: null,
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
		default:
			return state;
	}
}
export default CandidateReducer;
