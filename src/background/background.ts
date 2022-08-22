import { CLEAR_AUTH_MESSAGE } from './../helpers/constants';
import { LOGIN_MESSAGE, GET_AUTH_MESSAGE, URL_CHANGE_MESSAGE, LAST_PROFILES_VISITED_MESSAGE } from "../helpers/constants"
import { login, getAuthData, sendMessageToExistingTabs, getLastVisitedCandidates, clearAuthCache } from './helpers';

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
		sendMessageToExistingTabs(message);
	}else if(request.message === GET_AUTH_MESSAGE) { //Front is trying to get auth data
		const authData: AuthData|null = await getAuthData();
		if (authData) {
			payload = authData;
		} else {
			//Handle token expiration
			// error = { message: 'Error getting your user information, please try logging in again.' };
		}
		const message: BackgroundMessage = { message: GET_AUTH_MESSAGE, payload, error };
		sendMessageToExistingTabs(message);
	}else if(request.message === LAST_PROFILES_VISITED_MESSAGE) { //Front is trying to get last visited profiles
		const lastVisitedProfiles:chrome.history.HistoryItem[] = await getLastVisitedCandidates();
		const message:BackgroundMessage = { message: LAST_PROFILES_VISITED_MESSAGE, payload: lastVisitedProfiles, error: null };
		chrome.tabs.sendMessage(sender.tab.id, message);
	}else if(request.message === CLEAR_AUTH_MESSAGE){ //Front is trying to logout
		clearAuthCache(() => {});
		await chrome.storage.sync.clear();
		sendMessageToExistingTabs({message: CLEAR_AUTH_MESSAGE, payload: null, error: null});
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