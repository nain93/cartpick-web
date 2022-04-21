import axios, { AxiosRequestConfig } from "axios"

export const baseURL = process.env.REACT_APP_BASE_URL

export const getNewToken = async () => {
	const res = await axios.get(baseURL + "auth/refresh/", {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	})
	if (res) {
		return res.data
	}
}

export const getEventPopup = async () => {
	const res = await axios.get(baseURL + "notice/popup/", {
		headers: {
			"Content-Type": "application/json"
		}
	});
	if (res) {
		return res.data
	}
}

interface errorHandlerType {
	method: "get" | "post" | "delete" | "patch",
	url: string,
	config: AxiosRequestConfig
}

export const errorHandler = async ({ method, url, config }: errorHandlerType) => {
	try {
		const res = await axios({
			baseURL,
			method,
			url,
			...config
		})
		if (res) {
			return res.data
		}
	}
	catch (e) {
		if (axios.isAxiosError(e) && e.response) {
			console.log(e.response.data);
		}
	}
}