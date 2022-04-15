import { baseURL } from "api";
import axios from "axios";

export async function getMarketList() {
	const res = await axios.get(baseURL + "market/", {
		headers: {
			"Content-Type": "application/json"
		},
	});
	if (res) {
		return res.data
	}
}

export async function getMarketProduct(id: number | null, date: string, token?: string) {
	console.log(id, 'id');
	if (token) {
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
	else {
		const res = await axios.get(baseURL + "market/product/", {
			params: {
				date,
				market_id: id
			},
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (res) {
			return res.data
		}

	}
}