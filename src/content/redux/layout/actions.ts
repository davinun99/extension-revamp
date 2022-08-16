import { SHOW_SCREEN, HIDE_SCREEN, TOGGLE_SCREEN } from "./constants";

export const showScreen = () => ({
	type: SHOW_SCREEN,
})
export const hideScreen = () => ({
	type: HIDE_SCREEN,
});
export const toggleScreen = () => ({
	type: TOGGLE_SCREEN,
});