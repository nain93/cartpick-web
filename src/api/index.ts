import axios from "axios"

// export const baseURL = "http://192.168.123.109:8000/"
export const baseURL = "http://13.125.255.25:8000/"
// export const baseURL = "http://3.38.190.59:8000/"
// export const baseURL = "http://192.168.123.110:8000/"

export async function getUserCount() {
	const res = await axios.get(baseURL + "auth/count/", {
		headers: {
			"Content-Type": "application/json"
		}
	});
	if (res) {
		return res.data
	}
}
