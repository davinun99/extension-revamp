
// This file is in charge of the scrapping
// The scrapping proccess is completed after checking if the profile is a connected user

//We initially check for this tag: 
/*
	<span class="visually-hidden" aria-label="1st degree connection">
		1st degree connection
	</span>
*/

// For first degree connection we get
// Name
//


import FullNameParser from 'parse-full-name';

const PHOTO_CLASS = "pv-top-card-profile-picture__image pv-top-card-profile-picture__image--show ember-view";
const FULL_NAME_CLASS = "text-heading-xlarge inline t-24 v-align-middle break-words";
const LOCATION_CLASS = "text-body-small inline t-black--light break-words";
const JOB_TITLE_CLASS = "text-body-medium break-words";

export const getCurrentEmployerLogo = () => {
	const employerNode:HTMLElement | null = document.querySelector('[aria-label="Current company"]');
	try {
		if (!employerNode) return '';
		const LogoNode:HTMLImageElement = <HTMLImageElement>employerNode.parentElement?.parentElement?.firstElementChild;
		return LogoNode.src;	
	} catch (error) {
		return '';
	}
};
export const getCurrentEmployer = () => {
	const employerNode:HTMLElement | null = document.querySelector('[aria-label="Current company"]');
	const employer = employerNode && employerNode.innerText;
	return employer ? employer : '';
};
export const getUniversityLogo = () => {
	const universityNode = document.querySelector('[aria-label="Education"]');
	try {
		if (!universityNode) return '';
		const LogoNode:HTMLImageElement = <HTMLImageElement>universityNode.parentElement?.parentElement?.firstElementChild;
		return LogoNode?.src || '';	
	} catch (error) {
		return '';
	}
};
export const getUniversity = () => {
	const universityNode: HTMLElement | null = document.querySelector('[aria-label="Education"]');
	const university = universityNode && universityNode.innerText;
	return university ? university : '';
};

export const markContactInfoBtn = () => {
	//RECHECK
	for (let i in document.getElementsByTagName("a")) {
		let el = document.getElementsByTagName("a")[i];
		if (el.innerHTML) {
			if (el.innerHTML.includes("Contact info")) {
				// el. data-toggle="tooltip" data-placement="top" title="Tooltip on top">
				el.dataset["toggle"] = "tooltip";
				el.dataset["placement"] = "top";
				el.title = "Click this button so we can scrape the contact info";
			}
		}
	}
};

export const contactInfoisVisible = (): boolean => {
	return document.getElementsByTagName("section")[2]?.getElementsByClassName("pv-contact-info__header").length ? 
		true:
		false;
};

export const getContactInfo = () => {
	const fullNameElements = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(FULL_NAME_CLASS);
	let candidate_full_name = (fullNameElements && fullNameElements.length > 0) ? fullNameElements[0]?.innerText : '';
	let candidate_first_name;
	let candidate_last_name;
	try {
		const fullNameElements = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(FULL_NAME_CLASS);
		candidate_full_name = (fullNameElements && fullNameElements.length > 0) ? fullNameElements[0]?.innerText : '';
		const element = <HTMLElement>document.getElementsByTagName("section")[2]?.getElementsByClassName("pv-contact-info__header")[0];
		candidate_first_name = element
			.innerText.replace("’s Profile", "")
			.replace("’S Profile", "")
			.replace("’ Profile", "");
		candidate_last_name = candidate_full_name.replace(`${candidate_first_name} `, "");
	} catch (error) {
		candidate_first_name = '';
		candidate_last_name = '';
	}
	let candidate_email = "";
	let candidate_phone = "";
	// Search if exists candidate_email and candidate_phone
	for (let i in document.getElementsByTagName("section")) {
		let el = document.getElementsByTagName("section")[i];
		try {
			const elementChildren = <HTMLElement>el.children[1];
			const valueNode = <HTMLElement>el.children[2];
			if (elementChildren.innerText === "Email") {
				candidate_email = valueNode.innerText;
			}
			if (elementChildren.innerText === "Phone") {
				candidate_phone = valueNode?.innerText.replace(" (Mobile)", "");
			}
		} catch (e) {}
	}

	// { candidate_first_name, candidate_last_name, candidate_email, candidate_phone, response }
	// Close the popup
};

export const getScrapedPhoto = () => {
	let photo: HTMLImageElement;
	let src: string= '';
	try {
		photo = <HTMLImageElement>(document.getElementsByClassName(PHOTO_CLASS) || [null])[0];
		if(!photo){
			photo = <HTMLImageElement>document.querySelector(`img[alt="${getFullCandidateName()}"]`)
		}
		if (photo){
			src = photo.src;
		}
		if (!src || src.startsWith("data")) return '';	
	} catch (error) {}
	return src;
}
export const getPhoto = () => {
	let photo: HTMLImageElement;
	let src: string= '';
	try{
		photo = <HTMLImageElement>(document.getElementsByClassName(PHOTO_CLASS) || [null])[0];
		if(!photo){
			photo = <HTMLImageElement>document.querySelector(`img[alt="${getFullCandidateName()}"]`)
		}
		if (photo) src = photo.src;
		if (!photo || !src) {
			console.log("The photo could not be loaded, contact your provider");
			return '';
		}
		if (!src || src.startsWith("data")) return '';
	}catch(error){}
	return src;
};
export const getFullCandidateName = () => {
	let fullName: string = '';
	try {
		let fullNameNode = <HTMLElement>(document.getElementsByClassName(FULL_NAME_CLASS) || [null])[0];	
		if (fullNameNode) {
			fullName = fullNameNode.innerText;
		}
		if (!fullNameNode || !fullName) {
			return '';
		}
	} catch (error) {}
	return fullName;
};
export const getNames = (fullName: string) => {
	let first = '';
	let last = '';
	try {
		const parsed = FullNameParser.parseFullName(fullName);
		first = parsed.first || "";
		last = parsed.last || "";
	} catch (error) {}
	return { first, last };
}
export const getLocation = () => {
	let locationNode:HTMLElement;
	let location = '';
	try{
		locationNode = <HTMLElement>(document.getElementsByClassName(LOCATION_CLASS) || [null])[0];
		if (locationNode) {
			location = locationNode.innerText;
		}
		if (!locationNode || !locationNode) {
			console.log("The location could not be loaded, contact your provider");
			return '';
		}
	}catch(e){}
	return location;
};
export const getJobTitle = () => {
	let jobTitleNode: HTMLElement;
	let jobTitle = '';
	try {
		jobTitleNode = <HTMLElement>(document.getElementsByClassName(JOB_TITLE_CLASS) || [null])[0];
		if (jobTitleNode) {
			jobTitle = jobTitleNode.innerText;
		}
		if (!jobTitleNode || !jobTitle) {
			console.log("The job title could not be loaded, contact your provider");
			return '';
		}
		if (jobTitle.length >= 100) {
			console.log("The job title is too long, we will keep only the first 100 characters");
			jobTitle = jobTitle.substring(0, 100);
		}	
	} catch (error) {}
	return jobTitle;
};


export const getCandidateFromScrape = (managing_recruiter_id: number): SimpleCandidate => {
	const candidate_full_name = getFullCandidateName();
	const fullName = getNames(candidate_full_name);
	return {
		contract: true,
        permanent: true,
        candidate_source_id: 1,
        willing_to_relocate: 2,
        work_onsite: true,
        work_remotely: true,
        photo: getPhoto(),
        candidate_full_name,
		candidate_first_name: fullName.first,
		candidate_last_name: fullName.last,
        current_employer: getCurrentEmployer(),
        current_employer_logo: getCurrentEmployerLogo(),
        university_logo: getUniversityLogo(),
        university: getUniversity(),
        linked_in: document.location.href,
        managing_recruiter_id,
        source_recruiter_id: managing_recruiter_id,
        job_title: getJobTitle(),
        location: getLocation(),
	};
};