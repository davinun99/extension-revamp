import { HOME_PAGE, LOGIN_PAGE, CANDIDATE_PAGE } from "./constants";

export const goToLogin = () => ({
	type: LOGIN_PAGE,
})
export const goToHome = () => ({
	type: HOME_PAGE,
});
export const goToViewCandidate = () => ({
	type: CANDIDATE_PAGE,
});