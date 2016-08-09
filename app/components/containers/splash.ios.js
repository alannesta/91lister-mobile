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

  constructor(props) {
    super(props);
    this._navigateToHomepage = this._navigateToHomepage.bind(this);
  }

  componentDidMount() {
    let {navigator, dispatch} = this.props;
    dispatch(initAppStorage()).then(() => {
			dispatch(loginStatusCheck()).then(() => {
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
		let {navigator, nextRoute, dispatch} = this.props;
		setTimeout(() => {
			InteractionManager.runAfterInteractions(() => {
				// navigator.replace({name: 'MainApp', index: 1});
        nextRoute();
			});
		}, 500);
	}

}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(SplashScreen);
