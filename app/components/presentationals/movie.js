import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	Platform
} from 'react-native';

export default class Movie extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {movie, toggleLike} = this.props;
		let LikeButton, thumbnailImg;

		if (movie.liked) {
			LikeButton = <Image style={styles.likeButton} source={require('../../images/star_full.png')} />;

		} else {
			LikeButton = <Image style={styles.likeButton} source={require('../../images/star_empty.png')} />;
		}
		let thumbnailUrl = movie.thumbnail;
		if (thumbnailUrl) {
			thumbnailImg = <Image style={styles.thumbnail} source={{uri: thumbnailUrl}}/>
		} else {
			thumbnailImg = <Image style={styles.thumbnail} source={require('../../images/thumbnail.png')} />
		}

		return (
			<TouchableOpacity
				style={{'overflow': 'hidden'}}	// scroll view optimizations?
				onPress={this.props.onPress}
				>
				<View style={styles.movieItem}>
					{thumbnailImg}
					<View style={styles.infoContainer}>
						<Text style={styles.movieName}>{movie.title}</Text>
						<View style={styles.statisticsContainer}>
							<Image style={styles.numberIcon} source={require('../../images/view_count.png')} />
							<Text style={styles.numbers}>{movie.view_count}</Text>
							<Image style={styles.numberIcon} source={require('../../images/trending_arrow.png')} />
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
		height: Platform.OS === 'ios' ? 100: 80,
		flexDirection: 'row',
		// justifyContent: 'space-between',
		padding: 5,
		overflow: 'hidden'
	},
	thumbnail: {
		flex: 2,
		resizeMode: 'contain',
		width: null,	// should be a react-native bug: https://github.com/facebook/react-native/issues/950
		height: null
	},
	infoContainer: {
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 5
	},
	statisticsContainer: {
		flexDirection: 'row',
		marginTop: 12,
		justifyContent: 'center'
	},
	numberIcon: {
		width: 18,
		height: 18
	},
	movieName: {
		marginTop: 10,
		fontSize: 14
	},
	numbers: {
		fontSize: 12,
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
