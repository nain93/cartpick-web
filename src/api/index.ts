import axios, { AxiosResponse } from "axios"

export const baseURL = "https://"

const token = ""

const api = axios.create({
	baseURL: "https://",
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}
})
