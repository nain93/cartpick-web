export function dateSimpleFormat() {
	const formatDate = new Date();
	let month: string | number = formatDate.getMonth() + 1;
	let hour: number = formatDate.getHours()
	let day: string | number = hour < 18 ? formatDate.getDate() - 2 : formatDate.getDate() - 1;

	return month + "월 " + day + "일";
}

export function datebarFormat() {
	const formatDate = new Date();
	let month: string | number = formatDate.getMonth() + 1;
	let hour: number = formatDate.getHours()
	let day: string | number = hour < 18 ? formatDate.getDate() - 2 : formatDate.getDate() - 1;

	const list = []
	while (day > 0) {
		list.push(formatDate.getFullYear() + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day))
		day = day - 1
	}

	return list;
}

export function dateFormatForSendBack() {
	const formatDate = new Date();
	let month: string | number = formatDate.getMonth() + 1;
	let hour: number = formatDate.getHours()
	let day: string | number = hour < 18 ? formatDate.getDate() - 2 : formatDate.getDate() - 1;
	let second: string | number = formatDate.getSeconds();

	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;
	// hour = hour >= 10 ? hour : '0' + hour;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	second = second >= 10 ? second : '0' + second;

	return formatDate.getFullYear() + String(month) + String(day);
}