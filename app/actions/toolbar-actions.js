/*
 * @flow weak
 */
import {
	fetchMovieList
} from './movie-list-actions'

//count: number, order: string
export const changeDate = (date: number, {
	count,
	order,
	query
}) => {
	return (dispatch) => {
		dispatch(fetchMovieList({
			count: count,
			since: date,
			order: order,
			query: query
		})).then(function() {
			dispatch({
				type: "MOVIE_TIMESINCE_CHANGED",
				date: date
			});
			return true;
		}).catch((err) => {
			// NOOP
		})
	}
}

export const changeLikedFilter = (liked: boolean) => {
	return {
		type: "CHANGE_LIKED_FILTER",
		liked: liked
	}
}

export const updateMovieQuery = (key: string, value) => {
	return dispatch => {
		switch (key) {
			case "mSince":
				return dispatch(fetchMovieList({
						mSince: value
					})).then(() => {
						return dispatch({
							type: "MOVIE_TIMESINCE_CHANGED",
							date: value
						});
					}).catch((err) => {
						// NOOP
					});

			case "liked":
				return dispatch({
					type: "CHANGE_LIKED_FILTER",
					liked: value
				});

			default:
				break;
		}
	}
}
