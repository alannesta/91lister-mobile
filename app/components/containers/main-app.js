/*
 @flow weak
*/
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
import SearchWidget from '../presentationals/search-widget'

import { updateNetworkStatus } from '../../actions/app-actions'
import {fetchMovieList} from '../../actions/movie-list-actions'

const DRAWER_WIDTH_LEFT = 56;

class MainApp extends Component {
	// flow type declaration
	_renderRow:Function;
	state:{drawerInstance: ?Object};
	connectionHistory: Array<String>
	drawer: ?Object


	constructor(props) {
		super(props);
		this.state = {
			drawerInstance: null
		};
		this.connectionHistory = [];
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

		let {dispatch} = this.props;
		// since we need to add event handlers here for NetInfo, does not delegate this into an action
		// should be better moved to splash screen for checking network
		NetInfo.addEventListener('change', this._handleConnectionInfoChange.bind(this));
		NetInfo.fetch().done((connection) => {
			this.connectionHistory.unshift(connection);
			console.log('main app componentDidMount checkpoint: ', connection);
			// default connection state is 'WIFI', just to save one more dispatch -> render roundtrip
			if (connection === 'NONE') {
				dispatch(updateNetworkStatus(connection));
			}
		});
	}

	_renderDrawerContent() {
		return (
			<View>
				<SearchWidget
					drawer={this.state.drawerInstance}
					onSearch={this._searchMovies}
					/>
				<LoginForm drawer={this.state.drawerInstance}/>
			</View>
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

	_searchMovies() {
		let {dispatch, movieList: {query, since, order}} = this.props;
		return dispatch(fetchMovieList(10, since, order, query))
	}

	_handleConnectionInfoChange(connectionInfo) {
		console.log('handle connection change: ', connectionInfo);
		let { dispatch } = this.props;
		// regain network access, re-render view to mount the <TabView>
		if (connectionInfo !== 'NONE' && this.connectionHistory[0] === 'NONE') {
			dispatch(updateNetworkStatus(connectionInfo));
		}
		if (connectionInfo === 'NONE') {
			dispatch(updateNetworkStatus(connectionInfo));
		}
		this.connectionHistory.unshift(connectionInfo);
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
	return {
		deviceStatus: state.deviceStatus,
		movieList: state.movieList
	};
}

export default connect(mapStateToProps)(MainApp);
