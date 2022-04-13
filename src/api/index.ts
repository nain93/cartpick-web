import axios, { AxiosRequestConfig } from "axios"


// * 빌드시 env url 주석해제
export const baseURL = process.env.REACT_APP_BASE_URL

// export const baseURL = "http://13.125.255.25:8000/"
// export const baseURL = "https://oudu3g942i.execute-api.ap-northeast-2.amazonaws.com/production/"
// export const baseURL = "http://192.168.123.109:8000/"
// export const baseURL = "http://3.38.190.59:8000/"
// export const baseURL = "http://192.168.123.110:8000/"
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
