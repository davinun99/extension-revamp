import { LINKEDIN_MAIN_URL } from './constants';

export const isCandidateUrl = (url: string) :boolean => {
	return decodeURI(url).startsWith(`${LINKEDIN_MAIN_URL}/in/`);
};