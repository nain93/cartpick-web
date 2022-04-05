import { baseURL } from "api";
import axios from "axios";

export async function getUserProfile(token: string) {
	const res = await axios.get(baseURL + "user/", {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	});
	if (res) {
		return res.data
	}
}