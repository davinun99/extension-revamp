import { AnyAction } from "redux";
import { HIDE_SCREEN, SHOW_SCREEN } from "./constants";

const INIT_STATE = {
	showScreen: true,
};
// type ACTIONTYPE =
// 	| { type: "increment"; payload: number }
// 	| { type: "decrement"; payload: string };
const LayoutReducer = (state = INIT_STATE, action: AnyAction) => {
	switch(action.type) {
		case HIDE_SCREEN:
			return {
				...state,
				showScreen: false,
			};
		case SHOW_SCREEN:
			return {
				...state,
				showScreen: true,
			};
		default: 
			return state;
	}
}
export default LayoutReducer;
