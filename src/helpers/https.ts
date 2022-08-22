import Swal from 'sweetalert2';
import { AxiosError } from "axios";
import axiosClient from "./Axios";
const handleBackendRequestError = (error: unknown) => {
	if (error instanceof AxiosError){
		Swal.fire({
			title: 'Error on axios request',
			text: `Error: ${error} \n
			code: ${error.code}\n
			message: ${error.message}\n
			Response: ${error.response}\n
			Response data: ${error.response?.data}\n
			`,
			icon:'error',
		});
	}else {
		Swal.fire({
			title: 'JS Error on axios request',
			text: `Error: ${error} \n`,
			icon:'error',
		});
	}
}
export const getCandidate = async (url:string): Promise<null|BackendCandidate> => {
	try {
		const { data } = await axiosClient.get(`/api/candidate/byLinkedIn?linkedInUrl=${decodeURI(url)}`);
		if (data.length) {
			return data[0];
		}
	} catch (error) {
		handleBackendRequestError(error);
	}
	return null;
};