import axios from "axios";
import { cookies } from "next/headers";

axios.defaults.withCredentials = true;

const instance = axios.create({
	baseURL: process.env.AXIOS_BASE_PATH_LOCAL,
	withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
	const cookieStore = await cookies();
	const token = cookieStore.get('access_token');
	config.headers.set("Authorization", `Bearer ${token}`);
	return config;
});

export default instance;
