import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "./constants";

const INIT_STATE = {
	user: null,
    nimblUser: null,
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
				nimblUser: null,
				user: null,
				errorMessage: '',
				isAuthenticated: false,
			};
		case LOGIN_ERROR:
			return {
				...state,
				errorMessage: action.payload,
				nimblUser: null,
				user: null,
				isLoading: false,
				isAuthenticated: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				nimblUser: action.payload,
				user: null,
				isLoading: false,
				isAuthenticated: true,
			};
		default:
			return state;
	}
}
export default AuthReducer;
