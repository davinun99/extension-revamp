import { AnyAction } from "redux";
import { LOGIN_PAGE } from "./constants";

const INIT_STATE = {
	currentPage: LOGIN_PAGE,
};
// type ACTIONTYPE =
// 	| { type: "increment"; payload: number }
// 	| { type: "decrement"; payload: string };
const NavReducer = (state = INIT_STATE, action: AnyAction) => {
	switch(action.type) {
		default:
			return state;
	}
}
export default NavReducer;
