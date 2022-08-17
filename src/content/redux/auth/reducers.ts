import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, SET_LAST_VISITED_PROFILES } from "./constants";

const INIT_STATE = {
    authData: null,
    isLoading: false,
	errorMessage: '',
	isAuthenticated: false,
	lastVisitedProfiles: [],
};
// type ACTIONTYPE =
// 	| { type: "increment"; payload: number }
// 	| { type: "decrement"; payload: string };
const AuthReducer = (state = INIT_STATE, action: any) => {
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
			return {
				...state,
				authData: action.payload,
				isLoading: false,
				isAuthenticated: true,
			};
		case SET_LAST_VISITED_PROFILES:
			return {
				...state,
				lastVisitedProfiles: action.payload,
			};
		default:
			return state;
	}
}
export default AuthReducer;
