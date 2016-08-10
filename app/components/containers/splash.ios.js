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
		console.log('splash mount');
    // let {navigator, dispatch} = this.props;
    // dispatch(initAppStorage()).then(() => {
		// 	dispatch(loginStatusCheck()).then(() => {
		// 		this._navigateToHomepage();
		// 	})
    // }).catch((err) => {
		// 	// should never be catching an error here, already handled at action level
    //   console.log(err);
		// 	this._navigateToHomepage();
    // });
		this._navigateToHomepage();
  }

  render() {
    return (
      <View style={{height: 650, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to listermobile</Text>
				<Text>Welcome to listermobile</Text>
				<Text>Welcome to listermobile</Text>
				<Text>Welcome to listermobile</Text>
				<Text>Welcome to listermobile</Text>
      </View>
    )
  }

	_navigateToHomepage() {
		let {navigator, dispatch} = this.props;
		setTimeout(() => {
			InteractionManager.runAfterInteractions(() => {
				navigator.replace({name: 'MovieList', index: 1});
			});
		}, 1500);
	}

}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(SplashScreen);
