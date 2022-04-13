import history from "api/history"
import axios, { AxiosRequestConfig } from "axios"


// * 빌드시 env url 주석해제
// export const baseURL = process.env.REACT_APP_BASE_URL

export const baseURL = "http://13.125.255.25:8000/"
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
			if (e.response.data.detail === "Authentication credentials were not provided."
				|| e.response.data.messages[0].message === "Token is invalid or expired" ||
				e.response.data.code === "token_not_valid"
			) {
				// ! token 만료, 없을시 로그인 화면으로 이동인데 
				// ! 여기에서 토큰을 제거 할 수가없어서 주석 처리
				// history.replace("/login")
			}
		}
	}
}
