import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	InteractionManager,
	AlertIOS
} from 'react-native';

import { connect } from 'react-redux'
import { initAppStorage,  updateNetworkStatus } from '../../actions/app-actions'
import { loginStatusCheck } from '../../actions/user-actions'
import { NetworkManager } from '../../utils/network-manager'

class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this._navigateToPage = this._navigateToPage.bind(this);
		this._handleConnectionInfoChange = this._handleConnectionInfoChange.bind(this);
  }

  componentDidMount() {
		let {navigator, dispatch} = this.props;
		console.log(NetworkManager);
		NetworkManager.init(this._handleConnectionInfoChange).then(() => {
			dispatch(initAppStorage()).then(() => {
				dispatch(loginStatusCheck()).then(() => {
					this._navigateToPage({name: 'MovieList', index: 1});
				}).catch((err) => {
					// user unauthorized
					this._navigateToPage({name: 'UserProfile', index: 2});
				});
	    }).catch((err) => {
				// should never be catching an error here, already handled at action level
	      console.log(err);
				this._navigateToPage({name: 'UserProfile', index: 2});
	    });
		}).catch(() => {
			// no network connection
			this._navigateToPage({name: 'NoConnection', index: 4})
		});
  }

  render() {
    return (
      <View style={{height: 650, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to listermobile</Text>
      </View>
    )
  }

	_navigateToPage(pageRoute) {
		let {navigator, dispatch} = this.props;
		setTimeout(() => {
			InteractionManager.runAfterInteractions(() => {
				navigator.replace(pageRoute);
			});
		}, 800);
	}

	_handleConnectionInfoChange(connectionHistory, connectionInfo) {
		console.log('handle connection change: ', connectionInfo);
		let { dispatch } = this.props;
		if (connectionInfo !== 'none' && connectionHistory[0] === 'none') {
			dispatch(updateNetworkStatus(connectionInfo));
			this._navigateToPage({name: 'MovieList', index: 1});	// TODO: have to check if already on this page
		}
		if (connectionInfo === 'none') {
			dispatch(updateNetworkStatus(connectionInfo));
			AlertIOS.alert('No network connection');
		}
		if (connectionInfo === 'cell') {
			dispatch(updateNetworkStatus(connectionInfo));
			AlertIOS.alert('Start using mobile data');
		}
		connectionHistory.unshift(connectionInfo);
	}

}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(SplashScreen);
