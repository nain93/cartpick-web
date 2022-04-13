import { errorHandler } from "api";

export async function getMarketList() {
	return errorHandler({
		method: "get",
		url: "market/",
		config: {
			headers: {
				"Content-Type": "application/json"
			}
		}
	})
}

export async function getMarketProduct(id: number, date: string, token?: string) {
	if (token) {
		return errorHandler({
			method: "get",
			url: "market/product/",
			config: {
				params: {
					date,
					market_id: id
				},
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json"
				}
			}
		})
	}
	else {
		return errorHandler({
			method: "get",
			url: "market/product/",
			config: {
				params: {
					date,
					market_id: id
				},
				headers: {
					"Content-Type": "application/json"
				}
			}
		})
	}
}