import axios from "axios"

export const baseURL = "http://3.38.190.59:8000/"

const token = ""

const api = axios.create({
	baseURL,
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}
})
