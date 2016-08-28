import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
  InteractionManager,
	Modal,
	ActivityIndicator,
	Linking,
	Platform,
	Dimensions
} from 'react-native';

class MovieDetailModal extends Component {
  constructor(props) {
    super(props);
		this._openLink = this._openLink.bind(this);
  }

  componentDidMount() {
    console.log('detail modal component mount');
  }

  render() {
    // using workaround to render the ActivityIndicator due to issue: https://github.com/facebook/react-native/issues/9023
    return (
      <Modal
       animationType={'fade'}
       transparent={true}
       visible={this.props.modalVisible}
       onRequestClose={() => {}}
       >
       <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
					<View style= {styles.closeButtonContainer}>
					{	/* Disable the close button when resolving file url */
						this.props.loadingIndicator ?
							null
							:
							<TouchableOpacity
								style={styles.closeButton}
								onPress={this.props.closeModal}>
								<Text style={{fontSize: 22}}>x</Text>
							</TouchableOpacity>
					}
					</View>
					<View style={styles.modalContentContainer}>
						<Text>{this.props.movie.title}</Text>
						{
							this.props.loadingIndicator ?
								<ActivityIndicator style={styles.loadingSpinner} size="small"/>
								:
								<TouchableOpacity
									onPress={this._openLink}>
									<Text style={styles.movieFileLink}>{this.props.fileUrl}</Text>
								</TouchableOpacity>
						}
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.actionButton}
								onPress={() => {this.props.enjoyMovie(this.props.movie)}}>
								<Text>Enjoy</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.actionButton}
								onPress={() => {this.props.shareMovie(this.props.movie)}}>
								<Text>Share</Text>
							</TouchableOpacity>
						</View>
					</View>
        </View>
       </View>
     </Modal>
   )
  }

	_openLink() {
		Linking.canOpenURL(this.props.fileUrl).then(supported => {
      if (supported) {
        Linking.openURL(this.props.fileUrl);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.fileUrl);
      }
    });
	}
}

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalContainer: {
		height: 250,
		width: 300,
		borderRadius: 10,
		backgroundColor: '#fff',
		padding: 5,
		alignItems: 'center'
	},
	closeButtonContainer: {
		width: 280,		// modal window width
		flexDirection: 'row',
		justifyContent: 'flex-end',
		height: 25,
		alignItems: 'flex-start'
	},
	modalContentContainer: {
		height: 215,
		justifyContent: 'space-around'
	},
	loadingSpinner: {
    marginTop: 10,
		height: 30
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	actionButton: {
		width: 70,
		padding: 5,
		borderRadius: 3,
		marginTop: 20
	},
	// larger click area
	closeButton: {
		height: 30
	}
});

export default MovieDetailModal;
