import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	Navigator,
	View,
	Dimensions,
	DrawerLayoutAndroid
} from 'react-native';

import TabView from './tab-view'
import Toolbar from './toolbar'
import LoginForm from './login-form'

const DRAWER_WIDTH_LEFT = 56;

class Root extends Component {
	constructor(props) {
		super(props);
		this._renderApp = this._renderApp.bind(this);
		this.state = {
			drawerInstance: null
		};
	}

	render() {
		return (
			<DrawerLayoutAndroid
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
				keyboardDismissMode="on-drag"
				ref={(drawer) => { this.drawer = drawer; }}        //! for using this.drawer.open()
				renderNavigationView={this._renderDrawerContent.bind(this)}
        statusBarBackgroundColor="#589c90"
				>
				{this._renderApp()}
			</DrawerLayoutAndroid>
		);
	}

	componentDidMount() {
		// drawer reference will only be available when component finishes mounting
		// the Root component will be fire componentDidMount after all child has mounted
		// setState here so its child component Toolbar could get an updated reference of the Drawer Instance
		this.setState({
			drawerInstance: this.drawer
		})
	}

	_renderDrawerContent() {
		return (
			<LoginForm drawer={this.state.drawerInstance}/>
		)
	}

	_renderApp() {
		let tab = TabView;
		return (
			<View style={styles.container}>
				<Toolbar
					drawer={this.state.drawerInstance}
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    // height: Dimensions.get('window').height - 20
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
