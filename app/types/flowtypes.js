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
	total: number,
	order: string
}

export type TMovieListState = {
		movieData: TMovieState,
		tab: string,
		isRefreshing: boolean,
		mSince: Date
};
