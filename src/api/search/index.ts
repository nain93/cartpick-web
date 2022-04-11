import { baseURL } from "api";
import axios from "axios";

export async function getSearchMarketList(keyword: string, token: string) {
	const res = await axios.get(baseURL + "search/", {
		params: {
			keyword
		},
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	});
	if (res) {
		return res.data
	}
}

export async function getSearchMarketData(market_id: number, keyword: string, token: string) {
	const res = await axios.get(baseURL + "search/", {
		params: {
			keyword,
			market_id
		},
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	});
	if (res) {
		return res.data
	}
}