import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
	StyleSheet,
	Text,
	Navigator,
	View,
	Dimensions,
	DrawerLayoutAndroid,
	NetInfo
} from 'react-native';

import TabView from './tab-view'
import Toolbar from './toolbar'
import LoginForm from './login-form'

import { updateNetworkStatus } from '../../actions/app-actions'

const DRAWER_WIDTH_LEFT = 56;

class MainApp extends Component {
	constructor(props) {
		super(props);
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
		});

		// since we need to add event handlers here for NetInfo, does not delegate this into an action
		NetInfo.addEventListener('change', this._handleConnectionInfoChange);
		NetInfo.fetch().done((connection) => {
			console.log('on mounting check', connection);
		});
	}

	componentWillUnmount() {
		// NetInfo.removeEventListener('change', this._handleConnectionInfoChange);
	}

	_renderDrawerContent() {
		return (
			<LoginForm drawer={this.state.drawerInstance}/>
		)
	}

	_renderApp() {
		let { network: { connectionType }} = this.props;
		return (
			<View style={styles.container}>
				<Toolbar
					drawer={this.state.drawerInstance}
				/>
				{
					(connectionType === 'NONE') ?
						<View><Text>PLease check your network connection</Text></View> : <TabView />
				}
			</View>
		)
	}

	_handleConnectionInfoChange(connectionInfo) {
		console.log('in handle change');
		let { dispatch } = this.props;
		console.log(connectionInfo);
		if (connectionInfo === 'NONE') {
			dispatch(updateNetworkStatus(connectionInfo));
		}
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

function mapStateToProps(state) {
	return state.deviceStatus;
}

export default connect(mapStateToProps)(MainApp);
