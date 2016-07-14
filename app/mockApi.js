const uuid = require('node-uuid');

const randomMovie = () => {
	return {
		id: uuid.v1(),
		name: `The painted veil ${Math.floor(Math.random()*100)}`,
		viewCount: Math.floor(Math.random()*200000),
		trending: 5555,
		imageUrl: "",
		url: "",
		liked: false
	};
};

function getMovieList(tab, count) {
	switch(tab) {
		case 'all':
			let movieList = [];
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

export const fetchMovie = (tab, count, order) => {
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
		}, 1500);
	})
};

export const toogleLikeApi = (movie) => {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			movie.liked = !movie.liked;
			let init = { "status" : 200 , "statusText" : "movie favourite success" };
			let response = new Response(JSON.stringify(movie), init);
			resolve(response);
		}, 1000)
	})
};
