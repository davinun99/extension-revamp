import { LOGIN_PAGE } from "./constants";

const INIT_STATE = {
	currentPage: LOGIN_PAGE,
};
// type ACTIONTYPE =
// 	| { type: "increment"; payload: number }
// 	| { type: "decrement"; payload: string };
const NavReducer = (state = INIT_STATE, action: any) => {
	switch(action.type) {
		default:
			return state;
	}
}
export default NavReducer;
