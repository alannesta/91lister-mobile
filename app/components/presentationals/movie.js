import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions
} from 'react-native';

export default class Movie extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		let {movie, toggleLike} = this.props;
		let LikeButton;

		if (movie.liked) {
			LikeButton = <Image style={styles.likeButton} source={require('../../images/star_full.png')} />;

		} else {
			LikeButton = <Image style={styles.likeButton} source={require('../../images/star_empty.png')} />;
			// LikeButton = <Image style={styles.likeButton}>Unlike</Image>;

		}
		let thumbnail = movie.thumbnail? movie.thumbnail : 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150';
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				>
				<View style={styles.movieItem}>
					<Image style={styles.thumbnail}
						source={{uri: thumbnail}}
					/>
					<View style={styles.infoContainer}>
						<Text style={styles.movieName}>{movie.title}</Text>
						<View style={styles.statisticsContainer}>
							<Text style={styles.numbers}>{movie.view_count}</Text>
							<Text style={styles.numbers}>{movie.trend}</Text>
						</View>
					</View>
					<View style={styles.likeButtonContainer}>
						<TouchableOpacity
							accessibilityTraits="button"
							onPress={toggleLike.bind(this, movie)}
							activeOpacity={0.5}
							>
							{LikeButton}
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}
// using React.proptypes instead of flow for simplicity (this is a runtime check)
Movie.propTypes = {
	movie: React.PropTypes.object,
	toggleLike: React.PropTypes.func
}

// const deviceWidth = console.log('width:'+Dimensions.get('window').width+',height:'+Dimensions.get('window').height);

const styles = StyleSheet.create({
	movieItem: {
		height: 80,
		flexDirection: 'row',
		// justifyContent: 'space-between',
		padding: 5
	},
	thumbnail: {
		flex: 2
	},
	infoContainer: {
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 5
	},
	statisticsContainer: {
		flexDirection: 'row',
		marginTop: 5,
		justifyContent: 'center'
	},
	movieName: {
		marginTop: 10,
		fontSize: 14
	},
	numbers: {
		fontSize: 12,
		color: '#d2d2d2',
		padding: 10
	},

	likeButtonContainer: {
		// flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flex:1,
		borderColor: '#d2d2d2'
	},
	likeButton: {
		width: 25,
		height: 25
	}
});
