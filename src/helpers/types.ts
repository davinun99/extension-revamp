// type userOnState = {};
type BackgroundMessageJustType = {
	message: string,
};
type BackgroundMessage = {
	message: string,
	error: ErrorData | null,
	payload: AuthData | URLChangeData | null,
};
type AuthData = {
	nimbl_user: {
		user_id: number,
		first_name: string,
		last_name: string,
		email: string,
		user_type_id: number
	},
	google_user: {
		sub: string,
		name: string,
		given_name: string,
		family_name: string,
		picture: string,
		email: string,
		email_verified: boolean,
		locale: string,
		hd: string
	},
	tokens: {
		access_token: string,
		expires_at: EpochTimeStamp,
		scope: string,
		token_type: string,
		id_token: string
	}
};
type ErrorData = {
	message: string,
};
type URLChangeData = {
	url: string,
};
type SimpleCandidate = {
	contract: true,
	permanent: true,
	candidate_source_id: 1,
	willing_to_relocate: 2,
	work_onsite: true,
	work_remotely: true,
	photo:string,
	candidate_full_name: string,
	candidate_first_name: string,
	candidate_last_name: string,
	current_employer: string,
	current_employer_logo: string,
	university_logo: string,
	university: string,
	linked_in: string,
	managing_recruiter_id: number,
	source_recruiter_id: number,
	job_title: string,
	location: string,
}
// interface BackgroundAuthMessage extends BackgroundMessage {
// 	payload: AuthData,
// }
// interface 
type UserHistoryItem = {
    id: "10740",
    lastVisitTime: 1660746425563.3572,
    title: "LinkedIn",
    typedCount: 0,
    url: "https://www.linkedin.com/in/mat%C3%ADas-l%C3%B3pez-san-mart%C3%ADn-b33a63200/",
    visitCount: 7
}