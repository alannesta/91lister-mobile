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
			return dispatch(fetchMovieList(movieQuery)).then(function() {
				return dispatch({
					type: 'UPDATE_MOIVE_QUERY',
					movieQuery: movieQuery
				});
			}).catch((err) => {
				// NOOP
				console.log('err occured in update fetchMovieList: ', err)
			})
		} else {
			return dispatch({
				type: 'UPDATE_MOIVE_QUERY',
				movieQuery: movieQuery
			});
		}
	}
}

// function _getQuertAction(query, updatedField) {
// 	if (updatedField === 'mSince') {
// 		return {
// 			type: "MOVIE_TIMESINCE_CHANGED",
// 			date: query.mSince
// 		}
// 	} else if (updatedField === 'count'){
// 		return {
// 			type: "UPDATE_MOVIE_COUNT",
// 			date: query.count
// 		}
// 	} else if (updatedField === 'liked') {
// 		return {
// 			type: "CHANGE_LIKED_FILTER",
// 			liked: query.liked
// 		};
// 	}
// }
