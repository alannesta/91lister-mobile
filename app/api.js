/*
 * @flow weak
 */
import type {TMovie, TMovieQueryState} from './types/flowtypes'
import AppStorage from './utils/app-storage'

export const BASE_URL = 'http://localhost:4302'; // device
// export const BASE_URL = 'http://10.0.3.2:4302'; // simulator
// exprot const BASE_URL = 'http://ec2-52-90-5-61.compute-1.amazonaws.com/movie-api';	// prod

export const fetchMovie = (options): Promise < Array < TMovie >> => {
	let count = options && options.count ? (options.count < 10 ? 10: options.count): 10;
	let timestamp = options && options.mSince ? options.mSince/1000: 0;	// convert millisec to seconds for mysql to consume
	let query = options && options.query ? options.query: "";
	let order = options && options.order? options.order: "trend";
	let liked = options && options.liked? options.liked: false;

	let url = `${BASE_URL}/movies?count=${count}&since=${timestamp}&order=${order}&query=${encodeURIComponent(query)}&liked=${liked.toString()}`;

	// console.log('query url: ' + url);
	return fetch(url, {
    headers: _getDefaultHeaders()
  }).then(_handleResponse)
	.then(function(movieData) {
		return movieData;
	}).catch(function(err) {
		// TypeError: Network request failed would be caught here, will be handled in actions
		console.log(err);
    throw(err);
	});
};

export const toogleLikeApi = (movie: TMovie): Promise < * > => {
	let url = `${BASE_URL}/movie/${movie.id}`
	return fetch(url, {
		method: 'POST',
		headers: _getDefaultHeaders(),
		body: JSON.stringify(movie)
	}).then(_handleResponse).then(function(movie) {
		return movie;
	}).catch(function(err) {
		console.log(err);
    throw(err);
	});
};

export const authenticateUser = (username: string, password: string): Promise < * > => {
	let url = `${BASE_URL}/login`;
  let payload = {
    username: username,
    password: password
  };
	return fetch(url, {
		method: 'POST',
    headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	}).then(function(res) {
    if (res.status === 200) {
      return res.json();
    }
    if (res.status === 401) {
      // invalid credentials
      throw new Error('Authentication failed due to invalid credentials');
    }
    throw new Error('Authentication failed due to internal error');
  }).then(function(response) {
    return response;
  }).catch(function(err){
    throw(err);	// throw error to actions, handle error there
  });
}

export const getMovieFileUrl = (movie: TMovie): Promise<*> => {
	let url = `${BASE_URL}/movie/fileUrl?pageUrl=${movie.url}`;
	return fetch(url).then(_handleResponse).then(function(data) {
		return data.fileUrl;
	}).catch((err) => {
		throw err;
	});
}

// TODO: using server side error message if available
function _handleResponse(response) {
	if (response.status === 200) {
		return response.json();	// need to make sure all server side response in proper json string format
	} else if (response.status === 401) {
		let error = new Error('session expired');
		error.code = 'SESSION_EXPIRED';
		throw error;
	} else if (response.status >= 500) {
		// using server side error message if available
		let error;
		return response.text().then(function(errorMsg) {
			if (errorMsg) {
				error = new Error(errorMsg);
			} else {
				error = new Error('Internal Server Error')
			}
			error.code = 'REQUEST_FAILED';
			throw error;
		})
	}
	return response.json();
}

function _getDefaultHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'auth': AppStorage.getItem('authToken')
  }
}
