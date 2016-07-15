import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	Navigator,
	View,
	Dimensions,
	DrawerLayoutAndroid,
	ToolbarAndroid,
	DatePickerAndroid
} from 'react-native';

import MovieList from './containers/movie-list'
import TabView from './containers/tab-view'

const DRAWER_WIDTH_LEFT = 56;

class Root extends Component {
	constructor(props) {
		super(props);
	}

	render() {
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
		let tab = TabView;
		return (
			<View style={styles.container}>
				<ToolbarAndroid
					navIcon={require('../images/ic_menu_black_24dp.png')}
					onIconClicked={() => this.drawer.openDrawer()}
					actions={[{title: 'Date', icon: require('../images/ic_settings_black_48dp.png'), show: 'always'}]}
					onActionSelected={this._onActionSelected.bind(this)}
					style={styles.toolbar}
					title={'91 lister'}
				/>
				<Navigator
					initialRoute={{ name: 'home', component: tab }}
					configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromLeft}
					renderScene={(route, navigator) => {
					   	let Component = route.component;
					   	return <Component {...route.params} navigator={navigator} />
							}}
				/>
			</View>
		)
	}

	_onActionSelected(index) {
		console.log('action index: ', index);
		this.showPicker()
	}

	// async showPicker() {
  //   try {
  //     const {action, year, month, day} = await DatePickerAndroid.open();
  //     if (action === DatePickerAndroid.dismissedAction) {
	// 			// canceled;
  //     } else {
  //       var date = new Date(year, month, day);
	// 			console.log('date selected: ', date);
  //     }
  //   } catch ({code, message}) {
  //     console.warn(message);
  //   }
  // }
	showPicker() {
    DatePickerAndroid.open().then(({action, year, month, day}) => {
			if (action === DatePickerAndroid.dismissedAction) {
				// canceled;
      } else {
        var date = new Date(year, month, day);
				console.log('date selected: ', date);
      }
		})
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
