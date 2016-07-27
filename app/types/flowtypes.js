/*
* @flow
*/
export type TMovie = {
	id: string,
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

export type TMovieListState = {
		movieData: TMovieState,
		tab: string,
		mSince: Date,
		order: string
};
