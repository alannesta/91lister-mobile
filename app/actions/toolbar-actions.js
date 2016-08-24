/*
 * @flow weak
 */
import {
	fetchMovieList
} from './movie-list-actions'

// TODO: ANDROID: refactor to updateMovieQuery
// export const changeDate = (date: number, {
// 	count,
// 	order,
// 	query
// }) => {
// 	return (dispatch) => {
// 		dispatch(fetchMovieList({
// 			count: count,
// 			since: date,
// 			order: order,
// 			query: query
// 		})).then(function() {
// 			dispatch({
// 				type: "MOVIE_TIMESINCE_CHANGED",
// 				date: date
// 			});
// 			return true;
// 		}).catch((err) => {
// 			// NOOP
// 		})
// 	}
// }

export const updateMovieQuery = (movieQuery, refetchFlag: boolean) => {
	return dispatch => {
		// will refetch the movie list, then dispatch query update actions
		if (refetchFlag) {
			dispatch({
				type: 'UPDATE_MOVIE_QUERY',
				movieQuery: movieQuery
			});
			return dispatch(fetchMovieList(movieQuery));
		} else {
			return dispatch({
				type: 'UPDATE_MOVIE_QUERY',
				movieQuery: movieQuery
			});
		}
	}
}
