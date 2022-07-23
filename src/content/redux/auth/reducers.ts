import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "./constants";

const INIT_STATE = {
	user: null,
    nimblUser: null,
    loading: false,
	errorMessage: '',
};
// type ACTIONTYPE =
// 	| { type: "increment"; payload: number }
// 	| { type: "decrement"; payload: string };
const AuthReducer = (state = INIT_STATE, action: any) => {
	switch(action.type) {
		case LOGIN:
			return {
				...state,
				loading: true,
				nimblUser: null,
				user: null,
				errorMessage: '',
			};
		case LOGIN_ERROR:
			return {
				...state,
				errorMessage: action.payload,
				nimblUser: null,
				user: null,
				loading: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				nimblUser: action.payload,
				user: null,
				loading: false,
			};
		default:
			return state;
	}
}
export default AuthReducer;
