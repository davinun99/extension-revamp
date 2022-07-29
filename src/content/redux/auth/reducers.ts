import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "./constants";

const INIT_STATE = {
	user: null,
    authData: null,
    isLoading: false,
	errorMessage: '',
	isAuthenticated: false,
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
				user: null,
				errorMessage: '',
				isAuthenticated: false,
			};
		case LOGIN_ERROR:
			return {
				...state,
				errorMessage: action.payload,
				authData: null,
				user: null,
				isLoading: false,
				isAuthenticated: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				authData: action.payload,
				user: null,
				isLoading: false,
				isAuthenticated: true,
			};
		default:
			return state;
	}
}
export default AuthReducer;
