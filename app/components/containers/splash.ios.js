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
    this._navigateToPage = this._navigateToPage.bind(this);
  }

  componentDidMount() {

    let {navigator, dispatch} = this.props;
    dispatch(initAppStorage()).then(() => {
			dispatch(loginStatusCheck()).then(() => {
				this._navigateToPage({name: 'MovieList', index: 1});
			}).catch((err) => {
				this._navigateToPage({name: 'UserProfile', index: 2});
			});
    }).catch((err) => {
			// should never be catching an error here, already handled at action level
      console.log(err);
			this._navigateToPage({name: 'UserProfile', index: 2});
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

}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(SplashScreen);
