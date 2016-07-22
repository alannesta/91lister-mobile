/*
 * @flow weak
 */
import type {
	TMovie
} from './types/flowtypes'

// const BASE_URL = 'http://192.168.0.104:4302'; // device
const BASE_URL = 'http://10.0.3.2:4302'; // simulator
const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'auth': _setAuthHeader()
};

export const fetchMovie = (count = 10, since = 0, order = 'trend'): Promise < Array < TMovie >> => {

	let timestamp = since / 1000;
	let url = `${BASE_URL}/movies?count=${count}&since=${timestamp}&order=${order}`;

  // TODO: configure JWT header
	return fetch(url, {
    headers: DEFAULT_HEADERS
  }).then(function(res) {
		if (res.status === 200) {
			return res.json();
		} else {
			throw new Error('Fail to fetch movies');
		}
	}).then(function(movieData) {
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
		headers: DEFAULT_HEADERS,
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

  }).then(function(response) {
    // TODO: save jwt credentials
  }).catch(function(err){
    console.log(err);
    throw(err);
  });
}

function _setAuthHeader() {
  
}
