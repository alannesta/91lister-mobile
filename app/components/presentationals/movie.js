import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';

export default class Movie extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {movie, toggleLike} = this.props;
		let LikeButton;

		if (movie.liked) {
			LikeButton = <Text>Like</Text>;
		} else {
			LikeButton = <Text>Unlike</Text>;
		}
		let thumbnail = movie.thumbnail? movie.thumbnail : 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150';
		return (
			<View style={styles.movieItem}>
				<Image style={styles.thumbnail}
					source={{uri: thumbnail}}
				/>
				<View style={styles.infoContainer}>
					<Text style={styles.movieName}>{movie.title}</Text>
					<Text style={styles.viewCount}>{movie.trend}</Text>
				</View>
				<TouchableOpacity
					accessibilityTraits="button"
					onPress={toggleLike.bind(this, movie)}
					activeOpacity={0.5}
					style={styles.likeButton}>
					{LikeButton}
				</TouchableOpacity>
			</View>

		);
	}
}
// using React.proptypes instead of flow for simplicity (this is a runtime check)
Movie.propTypes = {
	movie: React.PropTypes.object,
	toggleLike: React.PropTypes.func
}


const styles = StyleSheet.create({
	movieItem: {
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5
	},
	thumbnail: {
		height: 50,
		width: 50
	},
	infoContainer: {},
	movieName: {
		fontSize: 16
	},
	viewCount: {
		fontSize: 12,
		color: '#d2d2d2'
	},
	likeButton: {
		width: 80,
		borderWidth: 1,
		borderColor: '#d2d2d2',
		height: 20
	}
});
