import axios from "axios"

export const baseURL = "http://13.125.245.232:8000/"

const token = ""

const api = axios.create({
	baseURL,
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}
})
