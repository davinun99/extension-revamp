import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

import { BACKEND_URL } from './constants';

const axiosClient = axios.create({
    baseURL: BACKEND_URL,
});
const refreshTokenIntenceptor = async (error: AxiosError) => {
	if (error.response?.status === 401) {
		await Swal.fire({ title: "Error", text: "Your session has ended. Please log in again", icon: "error" });
		// Here maybe logout the user?
	}
	return Promise.reject(error);
};
axiosClient.interceptors.response.use(
	(response) => response,
	refreshTokenIntenceptor
);
export default axiosClient;