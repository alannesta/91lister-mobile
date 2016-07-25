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

class SplashScreen extends Component {

  componentDidMount() {
    let {navigator, dispatch} = this.props;
    dispatch(initAppStorage()).then(() => {
      setTimeout(function() {
        InteractionManager.runAfterInteractions(function() {
          // navigator.replace({name: 'MainApp', index: 1});
          navigator.push({name: 'MainApp', index: 1});
        });
      }, 1500);
    }).catch((err) => {
      console.log(err);
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

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(SplashScreen);
