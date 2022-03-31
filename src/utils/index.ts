export function dateSimpleFormat() {
	const formatDate = new Date();
	let month: string | number = formatDate.getMonth() + 1;
	let day: string | number = formatDate.getDate();

	return month + "월 " + day + "일";
}

export function datebarFormat() {
	const formatDate = new Date();
	let month: string | number = formatDate.getMonth() + 1;
	let day: string | number = formatDate.getDate();

	const list = []
	while (day > 0) {
		list.push(formatDate.getFullYear() + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day))
		day = day - 1
	}

	return list;
}

export function dateFormat() {
	const formatDate = new Date();
	let month: string | number = formatDate.getMonth() + 1;
	let day: string | number = formatDate.getDate();
	let hour: string | number = formatDate.getHours();
	let minute: string | number = formatDate.getMinutes();
	let second: string | number = formatDate.getSeconds();

	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;
	// hour = hour >= 10 ? hour : '0' + hour;
	minute = minute >= 10 ? minute : '0' + minute;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	second = second >= 10 ? second : '0' + second;
	const amPm = hour > 12 ? "오후" : "오전";

	return formatDate.getFullYear() + '.' + month + '.' + day + ' ' + amPm + ' ' + hour + ':' + minute;
}