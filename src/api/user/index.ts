import { baseURL } from "api";
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

export async function editUserProfile(token: string, { nickname, job, household, market, id }: SignUpType) {
	const res = await axios.patch(baseURL + `user/${id}/`, {
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

export async function userLogout() {
	const res = await axios.get(baseURL + "auth/logout/", {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	})
	if (res) {
		return res.data
	}
}

export async function deleteUser(token: string, id: number) {
	const res = await axios.delete(baseURL + `user/${id}/`, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		withCredentials: true
	})
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


