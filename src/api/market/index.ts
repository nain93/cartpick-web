import { baseURL } from "api";
import axios from "axios";

export async function getMarketList(token: string) {
	try {
		const res = await axios.get(baseURL + "market/", {
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		});
		if (res) {
			return res.data
		}
	}
	catch (e) {
		console.error(e)
	}
}

export async function getMarketProduct(token: string, id: number, date: string) {
	const res = await axios.get(baseURL + "market/product/", {
		params: {
			date,
			market_id: id
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