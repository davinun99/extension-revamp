// type userOnState = {};
// type userOnState = {};
type BackgroundMessage = {
	message: string,
	payload: Object,
}
type AuthData = {
	nimbl_user: {
		user_id: number,
		first_name: string,
		last_name: string,
		email: string,
		user_type_id: number
	},
	google_user: {
		"sub": string,
		"name": string,
		"given_name": string,
		"family_name": string,
		"picture": string,
		"email": string,
		"email_verified": boolean,
		"locale": string,
		"hd": string
	},
	tokens: {
		access_token: string,
		expires_at: EpochTimeStamp,
		scope: string,
		token_type: string,
		id_token: string
	}
};