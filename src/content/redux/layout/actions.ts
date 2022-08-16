import { SHOW_SCREEN, HIDE_SCREEN } from "./constants";

export const showScreen = () => ({
	type: SHOW_SCREEN,
})
export const hideScreen = () => ({
	type: HIDE_SCREEN,
});