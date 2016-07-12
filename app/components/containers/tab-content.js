import React, {Component} from 'react';
import Movie from './movie';

export default class TabContent extends Component {

	render() {
		let {content, addToFav} = this.props;
		let mlist = [];
		content.forEach(function(movie) {
			mlist.push(
				<Movie
					movie={movie}
					addToFav={addToFav}
				/>
			);
		});

		return (
			<section>
				{mlist}
			</section>
		)
	}
}
