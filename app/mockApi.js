/*
* @flow weak
*/
import type {TMovie} from './types/flowtypes'
const uuid = require('node-uuid');

const randomMovie = ():TMovie => {
	return {
		id: uuid.v1(),
		name: `The painted veil ${Math.floor(Math.random()*100)}`,
		viewCount: Math.floor(Math.random()*200000),
		trending: 5452,
		imageUrl: "",
		url: "",
		liked: false
	};
};

function getMovieList(tab, count): Array<TMovie> {
	let movieList: Array<TMovie> = [];
	switch(tab) {
		case 'all':
			let mCount = count || 20;
			for (let i=0; i<mCount;i++) {
				movieList.push(randomMovie());
			}
			return movieList;
		case 'favourite':
			return movieList.slice(0,3);
		case 'trending':
			return [movieList[1]];
		default:
			return movieList;
	}
}

export const fetchMovie = (tab: string, count:?number, order:?any): Promise<*> => {
	//console.log('fetching movies for with params: ', arguments);
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			let init = { "status" : 200 , "statusText" : "movie list fetch success" };
			let payload = {
				movies: getMovieList(tab, count),
				total: 100
			};
			let response = new Response(JSON.stringify(payload),init);
			resolve(response);
		}, 500);
	})
};

export const toogleLikeApi = (movie: TMovie): Promise<*> => {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			movie.liked = !movie.liked;
			let init = { "status" : 200 , "statusText" : "movie favourite success" };
			let response = new Response(JSON.stringify(movie), init);
			resolve(response);
		}, 200)
	})
};
