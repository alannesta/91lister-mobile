/*
 * @flow weak
 */
import type {TMovie, TMovieQueryParams} from './types/flowtypes'
import AppStorage from './utils/app-storage'

// const BASE_URL = 'http://192.168.0.107:4302'; // device
// const BASE_URL = 'http://10.0.3.2:4302'; // simulator
const BASE_URL = 'http://ec2-52-90-5-61.compute-1.amazonaws.com/movie-api';	// prod

export const fetchMovie = (options): Promise < Array < TMovie >> => {
	let count = options.count ? (options.count < 10 ? 10: options.count): 10;
	let timestamp = options.since? options.since/1000: 0;	// convert millisec to seconds for mysql to consume
	let query = options.query? options.query: "";
	let order = options.order? options.order: "trend";
	let url = `${BASE_URL}/movies?count=${count}&since=${timestamp}&order=${order}&query=${query}`;
	return fetch(url, {
    headers: _getDefaultHeaders()
  }).then(_handleResponse)
	.then(function(movieData) {
		return movieData;
	}).catch(function(err) {
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
    throw new Error('Authentication failed due tointernal error');
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
		console.log(err);
		throw err;
	});
}

function _handleResponse(response) {
	if (response.status === 200) {
		return response.json();	// in fact calling JSON.parse, could also be called on none empty strings
	} else if (response.status === 401) {
		let error = new Error('session expired');
		error.code = 'SESSION_EXPIRED';
		throw error;
	} else {
		let error = new Error('session expired');
		error.code = 'REQUEST_FAILED';
		throw error;
	}
}

function _getDefaultHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'auth': AppStorage.getItem('authToken')
  }
}
