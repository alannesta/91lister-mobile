/*
* @flow weak
*/
import type {TMovie} from './types/flowtypes'

const BASE_URL = 'http://localhost:4302';
const DEFAULT_STARTDATE = ''

export const fetchMovie = (count = 10, since = 0, order = 'trend'): Promise<Array<TMovie>> => {

  let timestamp = 0;
  // convert Date to unix timestamp for mysql date comparing
  if (since instanceof Date) {
    timestamp = since.getTime()/1000
  }
  let url = `${BASE_URL}/movies?count=${count}&since=${timestamp}&order=${order}`;

  return fetch(url).then(function(res) {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Fail to fetch movies');
    }
  }).then(function(movies){
    console.log(movies);
    return movies;
  }).catch(function(err) {
    console.log(err);
  });
	//console.log('fetching movies for with params: ', arguments);
	// return new Promise(function(resolve, reject) {
	// 	setTimeout(function() {
	// 		let init = { "status" : 200 , "statusText" : "movie list fetch success" };
	// 		let payload = {
	// 			movies: getMovieList(count),
	// 			total: 100
	// 		};
	// 		let response = new Response(JSON.stringify(payload),init);
	// 		resolve(response);
	// 	}, 500);
	// })
};

export const toogleLikeApi = (movie: TMovie): Promise<*> => {

	// return new Promise(function(resolve, reject) {
	// 	setTimeout(function() {
	// 		movie.liked = !movie.liked;
	// 		let init = { "status" : 200 , "statusText" : "movie favourite success" };
	// 		let response = new Response(JSON.stringify(movie), init);
	// 		resolve(response);
	// 	}, 200)
	// })
};
