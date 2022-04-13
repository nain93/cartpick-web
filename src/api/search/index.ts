import { errorHandler } from "api";


export async function getSearchMarketList(keyword: string, token: string) {
	return errorHandler({
		method: "get",
		url: "search/",
		config: {
			params: {
				keyword
			},
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		}
	})
}

export async function getSearchMarketData(market_id: number, keyword: string, token: string) {
	return errorHandler({
		method: "get",
		url: "search/",
		config: {
			params: {
				keyword,
				market_id
			},
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		}
	})
}