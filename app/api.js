/*
* @flow weak
*/
import type {TMovie} from './types/flowtypes'

// const BASE_URL = 'http://192.168.0.104:4302'; // device
const BASE_URL = 'http://10.0.3.2:4302';  // simulator

const DEFAULT_STARTDATE = ''

export const fetchMovie = (count = 10, since = 0, order = 'trend'): Promise<Array<TMovie>> => {

  let timestamp = since/1000;
  let url = `${BASE_URL}/movies?count=${count}&since=${timestamp}&order=${order}`;

  return fetch(url).then(function(res) {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Fail to fetch movies');
    }
  }).then(function(movieData){
    return movieData;
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
  let url = `${BASE_URL}/movie/${movie.id}`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  }).then(function(res) {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Fail to toggle like');
    }
  }).then(function(movie) {
    return movie;
  }).catch(function(err) {
    console.log(err);
  });

	// return new Promise(function(resolve, reject) {
	// 	setTimeout(function() {
	// 		movie.liked = !movie.liked;
	// 		let init = { "status" : 200 , "statusText" : "movie favourite success" };
	// 		let response = new Response(JSON.stringify(movie), init);
	// 		resolve(response);
	// 	}, 200)
	// })
};
