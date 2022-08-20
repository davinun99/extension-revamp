import axiosClient from "./Axios";

export const getCandidate = async (url:string): Promise<null|any> => {
	console.log(axiosClient.defaults.headers.common);
	try {
		const { data } = await axiosClient.get(`/api/candidate/byLinkedIn?linkedInUrl=${decodeURI(url)}`);
		console.log(data);
		if (data.length) {
			return data[0];
		}
	} catch (error) { }
	return null;
};