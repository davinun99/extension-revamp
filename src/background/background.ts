import { LOGIN_MESSAGE, BACKEND_URL, GOOGLE_CLIENT_ID } from "../helpers/constants"

const login = (): Promise<any> => new Promise((resolve, reject) => {
	let responseURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}&scope=openid%20email%20profile&response_type=code&redirect_uri=${encodeURIComponent(`${BACKEND_URL}/auth/google/callback/v2`)}&resource=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fauth`;
	chrome.identity.launchWebAuthFlow( {url: responseURL, interactive: true}, (redirectUrl: string | undefined) => {
		if (chrome.runtime.lastError) {
			//Error in auth flow', chrome.runtime.lastError
			resolve(null);
			return;
		} else if (redirectUrl){
			let userObj = redirectUrl.substring( redirectUrl.indexOf(`?result=`) + 8 );
			try {
				userObj = JSON.parse(decodeURIComponent(userObj));
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
chrome.runtime.onMessage.addListener(async (request: BackgroundMessage, sender, sendResponse ) => {
	if (request.message === LOGIN_MESSAGE) { //Front is trying to init login
		const userAuth:Object = await login();
		const message = { message: LOGIN_MESSAGE, payload: userAuth };
		if(sender.tab?.id ){
			chrome.tabs.sendMessage(sender.tab.id, message);
		}
		if(userAuth){
			chrome.storage.local.set({auth: userAuth});
		}
	}
})