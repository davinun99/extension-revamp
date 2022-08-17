import { LINKEDIN_CANDIDATE_URL } from './constants';

/**
 * It returns true if the url starts with https://www.linkedin.com/in/, ergo if it is a candidate
 * @param {string} url - The URL of the LinkedIn profile.
 * @returns A boolean
 */
export const isCandidateUrl = (url: string) :boolean => {
	return decodeURI(url).startsWith(LINKEDIN_CANDIDATE_URL);
};
/**
 * It changes the CSS transform property of the extension's anchor element and the back arrow icon to
 * either expand or collapse the extension
 * @param {boolean} extensionIsExpanded - boolean - This is a boolean that is passed in from the parent
 * component. It is used to determine whether the extension is expanded or not.
 */
export const handleExtensionExpansion = (extensionIsExpanded: boolean) => {
	if (!extensionIsExpanded) {
		document.getElementById("rcr-anchor")?.style.setProperty("transform", "translateX(400px)");
		document.getElementById("extensionBackArrow")?.style.setProperty("transform", "rotate(0deg)");
	} else {
		document.getElementById("rcr-anchor")?.style.setProperty("transform", "translateX(0px)");
		document.getElementById("extensionBackArrow")?.style.setProperty("transform", "rotate(180deg)");
	}
};