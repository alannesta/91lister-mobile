/*
  @flow weak
*/
export const isToday = (date: Date) => {
	const today = new Date();
	if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) {
		return true;
	}
	return false;
};

/**
 * returns the unix time stamp in ms of the start of today
 */
export const startOfTodayTimestamp = (): number => {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	return today.getTime();
};
