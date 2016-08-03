import React, {Component} from 'react';
import { redux } from 'redux'
import { connect } from 'react-redux';
import { authenticate } from '../../actions/user-actions';
import { fetchMovieList } from '../../actions/movie-list-actions'

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
  TextInput,
	InteractionManager,
  Dimensions
} from 'react-native';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this._login = this._login.bind(this);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    let {user: {status: {loggedIn, username}}} = this.props;
    if (loggedIn) {
      return (
        <View style={styles.welcomeScreen}>
          <Text>Welcome and enjoy {username}!</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.loginForm}>
          <TextInput
            style={styles.inputField}
            placeholder="username"
            value={this.state.username}
            onChangeText={(username) => {this.setState({username: username})}}
          />
          <TextInput
            style={styles.inputField}
            placeholder="password"
            secureTextEntry={true}
            returnKeyType="go"
            value={this.state.password}
            onChangeText={(password) => {this.setState({password: password})}}
          />
          <TouchableOpacity
						style={styles.loginButton}
            accessibilityTraits="button"
            onPress={this._login}
            activeOpacity={0.5}
            >
            <Text>LOGIN</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _login() {
    let {dispatch, drawer, movieList: {mSince, order}} = this.props;
		InteractionManager.runAfterInteractions(() => {
			dispatch(authenticate(this.state.username, this.state.password)).then(() => {
				// TODO: close drawer and refetch list
				drawer.closeDrawer();
				dispatch(fetchMovieList(10, mSince, order));
			}).catch((err) => {
				// NO-OP
			});
		});
  }
}

const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  inputField: {
    marginTop: 10,
    width: 200
  },
  loginForm: {
		height: WINDOW_HEIGHT-10,
    padding:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeScreen: {
    height: WINDOW_HEIGHT-10,
    justifyContent: 'center',
    alignItems: 'center'
  },
	loginButton: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
		borderWidth: 1.5,
		borderColor: 'grey',
		borderRadius: 4,
		paddingRight: 5,
		paddingLeft: 5,
		height: 35
	}
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LoginForm);
