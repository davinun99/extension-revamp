import axiosClient from "./Axios";

export const getCandidate = async (url:string): Promise<null|any> => {
	try {
		const { data } = await axiosClient.get(`/api/candidate/byLinkedIn?linkedInUrl=${decodeURI(url)}`);
		if (data.length) {
			return data[0];
		}
	} catch (error) { }
	return null;
};