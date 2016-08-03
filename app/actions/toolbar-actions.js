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
			console.log('change date catch');
		})
	}
}
