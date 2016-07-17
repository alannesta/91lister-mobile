/*
* @flow weak
*/
import {fetchMovieList} from './movie-list-actions'

//count: number, order: string
export const changeDate = (date: Date, {count, order}) => {
  return (dispatch) => {
    dispatch(fetchMovieList(count, date, order)).then(function() {
      dispatch({
        type: "MOVIE_TIMESINCE_CHANGED",
        date: date
      });
      return true;
    })
  }
}
