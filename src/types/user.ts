export interface UserDataType {
	id: number,
	job: string,
	household: string,
	nickname: string,
	profileImage: string,
	market: string
}

export interface SignUpType {
	job: string,
	household: string,
	market: Array<string>
}