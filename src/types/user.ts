export interface UserDataType {
	id: number,
	job: string,
	household: string,
	nickname: string,
	profileImage: string,
	market: string,
	otherMarket?: Array<string>
}

export interface SignUpType {
	nickname?: string,
	job: string,
	household: string,
	market: Array<string>,
	otherMarket?: Array<string>
}