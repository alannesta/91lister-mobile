/*
* @flow
*/
export type TMovie = {
	id: string,
	name: string,
	url: string,
	viewCount: number,
	trending: number,
	liked: boolean
}

export type TMovieState ={
	movies: Array<TMovie>,
	total: number,
	since: ?Date
}
