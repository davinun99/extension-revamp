// type userOnState = {};
type BackgroundMessageJustType = {
	message: string,
};
type BackgroundMessage = {
	message: string,
	error: ErrorData | null,
	payload: AuthData | URLChangeData | chrome.history.HistoryItem[] | null,
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
type Recruiter = {
	city: "Barcelona",
	kpi_level: 1,
	profile_photo: "https://nimbl-dev.s3.eu-west-2.amazonaws.com/recruiters/john.jpg",
	recruiter_email: "john@nimbl.ai",
	recruiter_first_name: "John",
	recruiter_id: 8,
	recruiter_last_name: "Villarde",
	recruiter_type_id: 2,
	user_id: 9
}
type CandidateDocument = {
	candidate_document_id: 16,
	candidate_document_type_id: 7,
	candidate_id: 5446,
	created_date: null,
	document_address: "Placeholder",
	filename: null | string,
	s3_bucket: "nimbl-dev",
	s3_document_key: null
}
type BackendCandidate = {
	candidate_email: "nundavid99@gmail.com",
    candidate_first_name: "David",
    candidate_full_name: "David Nuñez B",
    candidate_id: 5446,
    candidate_last_name: "Nuñez B",
    candidate_phone: "0981350027",
    candidate_rating_id: null | number,
    candidate_source_id: 1,
    candidate_status_id: 1,
    city_id: null | number,
    compliance_status: null,
    contract: true,
    country_id: null | number,
    created_date: "2021-04-19T16:08:59.254Z",
    current_employer: "",
    current_employer_logo: "",
    degree_title: null,
    experience_start_date: null,
    github: null,
    ideal_salary_end: null,
    ideal_salary_start: null,
    job_title: "Fullstack Engineer",
    linked_in: "https://www.linkedin.com/in/david-nunhez/",
    location: "Paraguay ",
    managing_recruiter_id: 8,
    notice_period: null,
    permanent: true,
    photo: "https://d2ikcu9c8ruej.cloudfront.net/5446/photo/profile_1642256734124.jpg",
    source_recruiter_id: 8,
    twitter: null,
    university: "",
    university_logo: "",
    user_id: 14,
    willing_to_relocate: 2,
    work_onsite: true,
    work_remotely: true,
    candidate_source: [
        {
            "candidate_source_id": 1,
            "candidate_source_name": "LinkedIn Extension"
        }
    ],
    source_recruiter: Recruiter[],
    managing_recruiter: Recruiter[],
    candidate_job_application: [],
    sub_categories: [
        {
            "category_id": 5,
            "sub_category_id": 18,
            "sub_category_name": "Salesforce Developer",
            "category": [
                {
                    "category_id": 5,
                    "category_name": "Salesforce"
                }
            ]
        }
    ],
    candidate_document: CandidateDocument[]
}
type BackendCandidateNote = {
	candidate_id: number,
	candidate_note_id: number,
	job_id: null | number,
	note_date: "2022-03-14T02:00:44.881Z",
	note_description: string,
	note_type_id: number,
	recruiter_id: number,
	recruiter: Array<Recruiter>,
	candidate: Array<SimpleCandidate>,
	job: Array<any>,
	note_type: [
		{
			note_type: "LinkedIn Message",
			note_type_id: 1
		}
	]
}
type SimpleCandidateNote = {
	candidate_id: number,
	note_type_id: number,
	job_id: null | number,
	note_date: Date,
	note_description: string,
	recruiter_id: number,
}