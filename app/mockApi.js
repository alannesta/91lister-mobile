const movieList = [
	{
		"name": "The painted veil",
		"viewCount": 181543,
		"trending": 5555,
		"imageUrl": "",
		"url": ""
	},
	{
		"name": "The painted veil",
		"viewCount": 181543,
		"trending": 5555,
		"favourite": true,
		"imageUrl": "",
		"url": ""
	},
	{
		"name": "The painted veil",
		"viewCount": 181543,
		"trending": 5555,
		"imageUrl": "",
		"url": ""
	},
	{
		"name": "The painted veil",
		"viewCount": 181543,
		"trending": 5555,
		"imageUrl": "",
		"url": ""
	}
];

function getMovieList(tab) {
	switch(tab) {
		case 'all':
			return movieList;
		case 'favourite':
			return movieList.slice(0,3);
		case 'trending':
			return [movieList[1]];
		default:
			return movieList;
	}
}

export const fetchMovie = (tab) => {
	console.log('fetching movies for tab: ', tab);
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			let init = { "status" : 200 , "statusText" : "movie list fetch success" };
			let response = new Response(JSON.stringify(getMovieList(tab)),init);
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
