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
	NetInfo,
	InteractionManager
} from 'react-native';

import TabView from './tab-view'
import Toolbar from './toolbar'
import LoginForm from '../presentationals/login-form'
import SearchWidget from '../presentationals/search-widget'

import { updateNetworkStatus } from '../../actions/app-actions'
import {fetchMovieList} from '../../actions/movie-list-actions'
import { authenticate } from '../../actions/user-actions';

const DRAWER_WIDTH_LEFT = 56;

class MainApp extends Component {
	// flow type declaration
	_renderRow:Function;
	_handleConnectionInfoChange: Function;
	_searchMovies: Function;
	_login: Function;
	_renderDrawerContent: Function;
	state:{drawerInstance: ?Object};
	connectionHistory: Array<*>
	drawer: Object


	constructor(props) {
		super(props);
		this.state = {
			drawerInstance: null
		};
		this.connectionHistory = [];
		this._searchMovies = this._searchMovies.bind(this);
		this._renderDrawerContent = this._renderDrawerContent.bind(this);
		this._handleConnectionInfoChange = this._handleConnectionInfoChange.bind(this);
		this._login = this._login.bind(this);
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
		let {user: {status: {loggedIn, username}}, movieList: {query}} = this.props;

		if (loggedIn) {
			return (
				<View style={styles.drawerViewContainer}>
					<SearchWidget
						onSearch={this._searchMovies}
						query={query}
						/>
					<Text style={{marginTop: 50}}>Welcome and enjoy {username} !</Text>
				</View>
			)
		} else {
			return (
				<View style={styles.drawerViewContainer}>
					<LoginForm onLogin={this._login}/>
				</View>
			)
		}

	}

	_renderApp() {
		let { deviceStatus: { connectionType }} = this.props;
		return (
			<View style={styles.appContainer}>
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

	_searchMovies(userQuery) {
		let {dispatch, movieList: {movieQuery}} = this.props;
		return dispatch(fetchMovieList(movieQuery)).then(() => {
			this.drawer.closeDrawer();
			// update the query in redux store
			dispatch({
				type: "UPDATE_QUERY",
				query: userQuery
			});
		})
	}

	_login(username, password) {
		let {dispatch, movieList: {movieQuery}} = this.props;
		InteractionManager.runAfterInteractions(() => {
			dispatch(authenticate(username, password)).then(() => {
				this.drawer.closeDrawer();
				dispatch(fetchMovieList(movieQuery));
			}).catch((err) => {
				// NO-OP?
			});
		});
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
	appContainer: {
		flex: 1,
    // height: Dimensions.get('window').height - 20
	},
	toolbar: {
		backgroundColor: '#E9EAED',
		height: 56,
	},
	drawerViewContainer: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center'
	},
});

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(MainApp);
