import { AnyAction } from "redux";
import { HIDE_SCREEN, SHOW_SCREEN, TOGGLE_SCREEN } from "./constants";

const INIT_STATE = {
	screenIsVisible: true,
};
// type ACTIONTYPE =
// 	| { type: "increment"; payload: number }
// 	| { type: "decrement"; payload: string };
const LayoutReducer = (state = INIT_STATE, action: AnyAction) => {
	switch(action.type) {
		case HIDE_SCREEN:
			return {
				...state,
				screenIsVisible: false,
			};
		case SHOW_SCREEN:
			return {
				...state,
				screenIsVisible: true,
			};
		case TOGGLE_SCREEN:
			return {
				...state,
				screenIsVisible: !state.screenIsVisible,
			};
		default: 
			return state;
	}
}
export default LayoutReducer;
