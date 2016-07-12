import React, {Component} from 'react';


export default class Movie extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {movie, addToFav} = this.props;
		let LikeButton;

		if (movie.favourite) {
			LikeButton = <button onClick={addToFav.bind(this, movie)}>Like</button>;
		} else {
			LikeButton = <button>Unlike</button>;
		}
		return (
			<li>
				<span>{movie.name}</span>
				<span>
					{LikeButton}
				</span>
			</li>
		);
	}
}
