import { BACKEND_URL, GOOGLE_CLIENT_ID } from "../helpers/constants"
/**
 * It opens a new tab with a Google login page, and when the user logs in, it gets the user's data and
 * closes the tab
 * @returns AuthData.
 * @returns null.
*/
export const login = (): Promise<AuthData| null> => new Promise((resolve, reject) => {
	let responseURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}&scope=openid%20email%20profile&response_type=code&redirect_uri=${encodeURIComponent(`${BACKEND_URL}/auth/google/callback/v2`)}&resource=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fauth`;
	chrome.identity.launchWebAuthFlow( {url: responseURL, interactive: true}, (redirectUrl: string | undefined) => {
		if (chrome.runtime.lastError) {
			//Error in auth flow', chrome.runtime.lastError
			resolve(null);
			return;
		} else if (redirectUrl){
			let userObjStr:string = redirectUrl.substring( redirectUrl.indexOf(`?result=`) + 8 );
			try {
				const userObj:AuthData = JSON.parse(decodeURIComponent(userObjStr));
				resolve(userObj);
			} catch (error) {
				// Error parsing response to get user, error
				resolve(null);
				return;
			}
		} else {
			// Error en auth, redirectUrl is null
			resolve(null);
			return;
		}
	});
});

/**
 * It gets the auth data from the sync storage and returns a promise that resolves to either an AuthData object or null
 * @returns AuthData.
 * @returns null.
*/
export const getAuthData = async ():Promise<AuthData|null> => {
	const authData = await chrome.storage.sync.get(['auth']);
	if (authData?.auth) {
		return authData.auth;
	} else {
		return null;
	}
};

/**
 * It sends a message to all open LinkedIn tabs
 * @param {BackgroundMessage} message - BackgroundMessage - The message to send to the content script.
*/
export const sendMessageToExistingTabs = async(message: BackgroundMessage) => {
	const tabs = await chrome.tabs.query({url: 'https://www.linkedin.com/*'});
	tabs.forEach(tab => {
		try{
			tab.id && chrome.tabs.sendMessage(tab.id, message);
		}catch(e){ }
	});
}

/**
 * It returns the last 10 LinkedIn profiles you've visited
 * @returns An array of objects.
*/
export const getLastVisitedCandidates = async () => {
	const result = await chrome.history.search({
		maxResults: 10,
		text: 'https://www.linkedin.com/in/'
	});
	return result;
}

export const clearAuthCache = (callback:() => void) => {
	chrome.identity.clearAllCachedAuthTokens(callback);
};