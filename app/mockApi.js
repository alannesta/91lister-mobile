
const randomMovie = () => {
	return {
		"name": `The painted veil ${Math.floor(Math.random()*100)}`,
		"viewCount": 181543,
		"trending": 5555,
		"imageUrl": "",
		"url": ""
	};
};

function getMovieList(tab, count) {
	switch(tab) {
		case 'all':
			let movieList = [];
			let mCount = count || 10;
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

export const favour = (movie) => {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			let init = { "status" : 200 , "statusText" : "movie favourite success" };
			let response = new Response(JSON.stringify({movie: movie.name}), init);
			resolve(response);
		}, 1000)
	})
};
