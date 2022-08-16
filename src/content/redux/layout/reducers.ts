import { AnyAction } from "redux";
import { HIDE_SCREEN, SHOW_SCREEN, TOGGLE_SCREEN } from "./constants";

const INIT_STATE = {
	screenIsVisible: true,
};
// type ACTIONTYPE =
// 	| { type: "increment"; payload: number }
// 	| { type: "decrement"; payload: string };
const handleShow = (show: boolean) => {
	if (!show) {
		document.getElementById("rcr-anchor")?.style.setProperty("transform", "translateX(400px)");
		document.getElementById("extensionBackArrow")?.style.setProperty("transform", "rotate(0deg)");
	} else {
		document.getElementById("rcr-anchor")?.style.setProperty("transform", "translateX(0px)");
		document.getElementById("extensionBackArrow")?.style.setProperty("transform", "rotate(180deg)");
	}
};
const LayoutReducer = (state = INIT_STATE, action: AnyAction) => {
	switch(action.type) {
		case HIDE_SCREEN:
			handleShow(false);
			return {
				...state,
				screenIsVisible: false,
			};
		case SHOW_SCREEN:
			handleShow(true);
			return {
				...state,
				screenIsVisible: true,
			};
		case TOGGLE_SCREEN: 
			handleShow(!state.screenIsVisible);
			return {
				...state,
				screenIsVisible: !state.screenIsVisible,
			};
		default: 
			return state;
	}
}
export default LayoutReducer;
