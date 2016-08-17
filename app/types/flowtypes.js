/*
* @flow
*/
export type TMovie = {
	id: number,
	title: string,
	url: string,
	viewCount: number,
	trend: number,
	liked: boolean,
	thumbnail: string,
	favourite: number
}

export type TMovieState ={
	movies: Array<TMovie>,
	total: number
}

export type TMovieQueryParams = {
	count?: number,
	order?: string,
	query?: string,
	since?: number
}
