import axiosClient from "../../../helpers/Axios";
import { LINKEDIN_CANDIDATE_URL } from "../../../helpers/constants";
import { GET_RECRUITER_ERROR, GET_RECRUITER_SUCCESS, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, SET_LAST_VISITED_PROFILES, STORAGE_AUTH_ITEM_NAME } from "./constants";

interface authState {
	authData: null | AuthData,
    isLoading: boolean,
	errorMessage: string,
	isAuthenticated: boolean,
	lastVisitedProfiles: chrome.history.HistoryItem[],
	recruiter: any,
}
const INIT_STATE: authState = {
    authData: null,
    isLoading: false,
	errorMessage: '',
	isAuthenticated: false,
	lastVisitedProfiles: [],
	recruiter: null,
};
// type ACTIONTYPE =
// 	| { type: "increment"; payload: number }
// 	| { type: "decrement"; payload: string };
const AuthReducer = (state = INIT_STATE, action: any): authState => {
	switch(action.type) {
		case LOGIN:
			return {
				...state,
				isLoading: true,
				authData: null,
				errorMessage: '',
				isAuthenticated: false,
			};
		case LOGIN_ERROR:
			return {
				...state,
				errorMessage: action.payload,
				authData: null,
				isLoading: false,
				isAuthenticated: false,
				lastVisitedProfiles: [],
			};
		case LOGIN_SUCCESS:
			const payload:AuthData = action.payload;
			const token = payload?.tokens.access_token;
			if (token) {
				axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			}
			localStorage.setItem(STORAGE_AUTH_ITEM_NAME, JSON.stringify(payload));
			return {
				...state,
				authData: action.payload,
				isLoading: true,
				isAuthenticated: false,
			};
		case GET_RECRUITER_SUCCESS:
			console.log('recruiter', action.payload);
			return {
				...state,
				recruiter: action.payload,
				isLoading: false,
				isAuthenticated: true,
				errorMessage: '',
			};
		case GET_RECRUITER_ERROR:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				recruiter: null,
				errorMessage: action.payload,
			};
		case SET_LAST_VISITED_PROFILES:
			let historyItems:chrome.history.HistoryItem[] = action.payload;
			const filteredItems:Array<chrome.history.HistoryItem> = [];
			const positionOfFirstSlash = LINKEDIN_CANDIDATE_URL.length + 1;
			historyItems.forEach(historyItem => {
				LINKEDIN_CANDIDATE_URL
				const link = historyItem.url?.substring(
					0,
					historyItem.url.indexOf('/', positionOfFirstSlash)
				);
				if (!filteredItems.find(item => item.url === link)) {
					filteredItems.push({
						...historyItem,
						url: link,
					});
				}
			});
			return {
				...state,
				lastVisitedProfiles: filteredItems,
			};
		case LOGOUT:
			localStorage.setItem(STORAGE_AUTH_ITEM_NAME, '');
			return {
				...INIT_STATE,
			};
		default:
			return state;
	}
}
export default AuthReducer;
