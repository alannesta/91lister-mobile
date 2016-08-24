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

export const updateMovieQuery = (query, updatedField: string,refetchFlag: boolean) => {
	return dispatch => {
		// will refetch the movie list, then dispatch query update actions
		if (refetchFlag) {
			dispatch(fetchMovieList(query)).then(function() {
				dispatch(_getQuertAction(query, updatedField));
			}).catch((err) => {
				// NOOP
				console.log('err occured in update fetchMovieList: ', err)
			})
		} else {
			dispatch(_getQuertAction(query, updatedField));
		}
	}
}

function _getQuertAction(query, updatedField) {
	if (updatedField === 'mSince') {
		return {
			type: "MOVIE_TIMESINCE_CHANGED",
			date: query.mSince
		}
	} else if (updatedField === 'count'){
		return {
			type: "UPDATE_MOVIE_COUNT",
			date: query.count
		}
	} else if (updatedField === 'liked') {
		return {
			type: "CHANGE_LIKED_FILTER",
			liked: query.liked
		};
	}
}
