import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

import { BACKEND_URL, CLEAR_AUTH_MESSAGE } from './constants';

const axiosClient = axios.create({
    baseURL: BACKEND_URL,
});
const refreshTokenIntenceptor = async (error: AxiosError) => {
	if (error.response?.status === 401) {
		await Swal.fire({ title: "Error", text: "Your session has ended. Please log in again", icon: "error" });
		chrome.runtime.sendMessage({message: CLEAR_AUTH_MESSAGE});
	}
	return Promise.reject(error);
};
axiosClient.interceptors.response.use(
	(response) => response,
	refreshTokenIntenceptor
);
export default axiosClient;