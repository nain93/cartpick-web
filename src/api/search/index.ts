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

export async function getSearchMarketData(market_id: number | null, keyword: string, token: string) {
	const res = await axios.get(baseURL + "search/product/", {
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
		// console.log(res.data, 'res.data');
		return res.data
	}
}