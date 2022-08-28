import { GET_CANDIDATE_FROM_BACK, GET_CANDIDATE_FROM_BACK_ERROR, GET_CANDIDATE_FROM_BACK_SUCCESS, GET_CANDIDATE_NOTES, GET_CANDIDATE_NOTES_ERROR, GET_CANDIDATE_NOTES_SUCCESS, GET_CANDIDATE_SCRAPED, SAVE_CANDIDATE, SAVE_CANDIDATE_ERROR, SAVE_CANDIDATE_NOTE, SAVE_CANDIDATE_NOTE_ERROR, SAVE_CANDIDATE_NOTE_SUCCESS, SAVE_CANDIDATE_SUCCESS } from "./constants";

const INIT_STATE = {
	scrapedCandidateInfo: null,
	backendCandidateInfo: null,
	errorMessage: '',
	isLoading: true,
	candidateNotes: [],
	notesAreLoading: false,
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
		case GET_CANDIDATE_FROM_BACK:
			return {
				...state,
				isLoading: true,
				backendCandidateInfo: null,
				errorMessage: '',
			};
		case GET_CANDIDATE_FROM_BACK_SUCCESS:
			return {
				...state,
				isLoading: false,
				errorMessage: '',
				backendCandidateInfo: action.payload,
			};
		case GET_CANDIDATE_FROM_BACK_ERROR: 
			return {
				...state,
				isLoading: false,
				errorMessage: action.payload,
				backendCandidateInfo: null,
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
		case GET_CANDIDATE_NOTES:
			return {
				...state,
				notesAreLoading: true,
				errorMessage: '',
			};
		case GET_CANDIDATE_NOTES_SUCCESS:
			return {
				...state,
				notesAreLoading: false,
				errorMessage: '',
				candidateNotes: action.payload,
			};
		case GET_CANDIDATE_NOTES_ERROR:
			return {
				...state,
				notesAreLoading: false,
				errorMessage: action.payload,
				candidateNotes: [],
			};
		case SAVE_CANDIDATE_NOTE:
			return {
				...state,
				notesAreLoading: true,
				errorMessage: '',
			};
		case SAVE_CANDIDATE_NOTE_SUCCESS:
			const notes:BackendCandidateNote[] = state.candidateNotes;
			const newNote:CandidateNoteWithId = action.payload;
			notes.push({
				...newNote,
				recruiter: [], //Fill recruiter info
				candidate: [], //Fill candidate info
				job: [], //Fill job info
				note_type: [], //Fill note info
			});
			return {
				...state,
				notesAreLoading: false,
				candidateNotes: notes,
			};
		case SAVE_CANDIDATE_NOTE_ERROR:
			return {
				...state,
				notesAreLoading: false,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
}
export default CandidateReducer;
