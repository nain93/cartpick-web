import { errorHandler } from "api";
import { SignUpType } from "types/user";

export async function getUserProfile(token: string) {
	return errorHandler({
		method: "get", url: "user/", config: {
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		}
	})
}

export async function editUserProfile(token: string, { nickname, job, household, market }: SignUpType) {
	return errorHandler({
		method: "patch", url: "user/", config: {
			data: {
				nickname,
				job,
				household,
				market
			},
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		}
	})
}

export async function getUserCount() {
	return errorHandler({
		method: "get", url: "auth/count/", config: {
			headers: {
				"Content-Type": "application/json"
			}
		}
	})
}


