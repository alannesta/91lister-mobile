import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	InteractionManager
} from 'react-native';

import { connect } from 'react-redux'
import { initAppStorage } from '../../actions/app-actions'
import { loginStatusCheck } from '../../actions/user-actions'

class SplashScreen extends Component {

  componentDidMount() {
    let {navigator, dispatch} = this.props;
    dispatch(initAppStorage()).then(() => {
			dispatch(loginStatusCheck()).then(() => {
				this._navigateToHomepage();
			}).catch((err) => {
				console.log(err);
				this._navigateToHomepage();
			})
    }).catch((err) => {
			// should never be catching an error here, already handled at action level
      console.log(err);
			this._navigateToHomepage();
    });
  }

  render() {
    return (
      <View>
        <Text>Welcome to listermobile</Text>
      </View>
    )
  }

	_navigateToHomepage() {
		let {navigator, dispatch} = this.props;
		setTimeout(function() {
			InteractionManager.runAfterInteractions(function() {
				// navigator.replace({name: 'MainApp', index: 1});
				navigator.push({name: 'MainApp', index: 1});
			});
		}, 500);
	}

}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(SplashScreen);
