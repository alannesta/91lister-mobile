import React, {Component} from 'react';
import {
	StyleSheet,
  View,
	Text,
	NavigatorIOS,
  StatusBar
} from 'react-native';

import Splash from './containers/splash'
import MovieList from './containers/movie-list'

class Root extends Component {

	constructor(props) {
		super(props);

		this._navigateToHomepage = this._navigateToHomepage.bind(this);
		this.routeConfig = {
			homePage: {
				component: MovieList,
				title: 'Movie List'
			},
			splashPage: {
				component: Splash,
				passProps: {nextRoute: this._navigateToHomepage},
				title: 'Spalsh Screen',
				rightButtonTitle: 'Go'
				// onRightButtonPress: () => this._handleNavigationRequest()
			}
		}
	}

	render() {
		return (
		    // <Text>IOS init</Text>
        <View>
          <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
          />
          <NavigatorIOS
						ref={(navigator) => {this.navigator = navigator}}
            initialRoute={this.routeConfig.splashPage}
          />
        </View>
		)
	}

  _navigateToHomepage() {
		this.navigator.push(this.routeConfig.homePage);
	}
}

const styles = StyleSheet.create({

});

export default Root;
