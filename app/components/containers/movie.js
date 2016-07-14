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
		return (
			<View style={styles.movieItem}>
				<View style={styles.infoContainer}>
					<Text style={styles.movieName}>{movie.name}</Text>
					<Text style={styles.viewCount}>{movie.viewCount}</Text>
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

const styles = StyleSheet.create({
	movieItem: {
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5
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
