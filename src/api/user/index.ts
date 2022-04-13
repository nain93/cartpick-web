import { baseURL, errorHandler } from "api";
import axios from "axios";
import { SignUpType } from "types/user";

export async function getUserProfile(token: string) {
	const res = await axios.get(baseURL + "user/", {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	})
	if (res) {
		return res.data
	}
}

export async function editUserProfile(token: string, { nickname, job, household, market }: SignUpType) {
	const res = await axios.patch(baseURL + "user/", {
		nickname,
		job,
		household,
		market
	}, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	});
	if (res) {
		return res.data
	}
}

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


