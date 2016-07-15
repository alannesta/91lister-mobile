import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	Navigator,
	View,
	Dimensions,
	DrawerLayoutAndroid,
	ToolbarAndroid
} from 'react-native';

import MovieList from './containers/movie-list';

const DRAWER_WIDTH_LEFT = 56;

class Root extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let movieList = MovieList;
		return (
			<DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}		//! for using this.drawer.open()
        renderNavigationView={this._renderDrawerContent}
        statusBarBackgroundColor="#589c90">
        {this._renderApp()}
      </DrawerLayoutAndroid>
		);
	}

	_renderDrawerContent() {
		return (
			<View>
				<Text>Drawer Content</Text>
			</View>
		)
	}

	_renderApp() {
		console.log('called');
		return (
			<View style={styles.container}>
				<ToolbarAndroid
					// logo={require('image!../images/launcher_icon')}
					// navIcon={require('image!../images/ic_menu_black_24dp')}
					onIconClicked={() => this.drawer.openDrawer()}
					style={styles.toolbar}
					title={'91 lister'}
				/>
				<Text>it works!</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#E9EAED',
    height: 56,
  },
  drawerContentWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Root;
