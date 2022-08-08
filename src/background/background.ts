import { LOGIN_MESSAGE, GET_AUTH_MESSAGE, BACKEND_URL, GOOGLE_CLIENT_ID, URL_CHANGE_MESSAGE } from "../helpers/constants"

/**
 * It opens a new tab with a Google login page, and when the user logs in, it gets the user's data and
 * closes the tab
 * @returns AuthData.
 * @returns null.
 */
const login = (): Promise<AuthData| null> => new Promise((resolve, reject) => {
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
const getAuthData = async ():Promise<AuthData|null> => {
	const authData = await chrome.storage.sync.get(['auth']);
	if (authData?.auth) {
		return authData.auth;
	} else {
		return null;
	}
};
const sendLoginInfoToExistingTabs = async(message: BackgroundMessage) => {
	const tabs = await chrome.tabs.query({url: 'https://www.linkedin.com/*'});
	tabs.forEach(tab => tab.id && chrome.tabs.sendMessage(tab.id, message));
}
chrome.runtime.onMessage.addListener(async (request: BackgroundMessageJustType, sender, sendResponse ) => {
	if (!sender.tab?.id){ //If there's not tabId, we don't need to process this msg
		return;
	}
	let payload: AuthData|null = null;
	let error: ErrorData|null = null;
	if (request.message === LOGIN_MESSAGE) { //Front is trying to init login
		const userAuth: AuthData|null = await login();
		if (userAuth) {
			payload = userAuth;
			chrome.storage.sync.set({ auth: userAuth });
		} else {
			error = { message: 'Error completing login process, please try again later.' };
		}
		const message: BackgroundMessage = { message: LOGIN_MESSAGE, payload, error };
		sendLoginInfoToExistingTabs(message);
	}else if(request.message === GET_AUTH_MESSAGE) { //Front is trying to get auth data
		const authData: AuthData|null = await getAuthData();
		if (authData) {
			payload = authData;
		} else {
			//Handle token expiration
			error = { message: 'Error getting your user information, please try logging in again.' };
		}
		const message: BackgroundMessage = { message: GET_AUTH_MESSAGE, payload, error };
		sendLoginInfoToExistingTabs(message);
	}
});

/* Listening for a change in the url of the tab, and when it happens, it sends a message to the
	frontend with the new url. 
*/
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.url) {
		const message: BackgroundMessage = {
			message: URL_CHANGE_MESSAGE,
			payload: {
				url: changeInfo.url,
			},
			error: null,
		};
		chrome.tabs.sendMessage(tabId, message);
	}
});