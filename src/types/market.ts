export interface MarketInfoprops {
	isClick: boolean,
	image: string,
	color: string,
	name: string
}

export interface MarketProductType {
	id: number,
	name: string,
	reviews: Array<{
		id: number,
		author: string,
		content: string,
		images: Array<{
			id: number,
			priority: number,
			image: string
		}>,
		isPositive: boolean
	}>,
	reviewCount: number,
	created: string
}

export interface MarketErrorType {
	text: string,
	type: "job" | "household" | "market"
}