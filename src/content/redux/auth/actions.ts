import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "./constants";

export const login = () => ({
	type: LOGIN,
});
export const loginError = (errorMessage: string) => ({
	type: LOGIN_ERROR,
	payload: errorMessage,
});
export const loginSuccess = (user: any) => ({
	type: LOGIN_SUCCESS,
	payload: user,
});