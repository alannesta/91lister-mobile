import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	InteractionManager
} from 'react-native';

import AppStorage from '../../utils/app-storage';


class SplashScreen extends Component {

  componentDidMount() {
    let {navigator} = this.props;
    AppStorage.init().then(function(authToken) {
			// if (authToken) {
			// 	dispatch({
			// 		type: 'USER_AUTHENTICATION_SUCCESS',
			// 		username: 'alannesta'
			// 	});
			// }
      setTimeout(function() {
        InteractionManager.runAfterInteractions(function() {
          navigator.replace({name: 'MainApp', index: 1});
        });
      }, 1500);
    });
  }

  render() {
    return (
      <View>
        <Text>Welcome to listermobile</Text>
      </View>
    )
  }
}

export default SplashScreen;
