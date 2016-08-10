import React, {Component} from 'react';
import { redux } from 'redux'
import { authenticate } from '../../actions/user-actions';
import { fetchMovieList } from '../../actions/movie-list-actions'

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
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
            value={this.state.password}
            onChangeText={(password) => {this.setState({password: password})}}
          />
          <TouchableOpacity
						style={styles.loginButton}
            accessibilityTraits="button"
            onPress={() => {this.props.onLogin(this.state.username, this.state.password)}}
            activeOpacity={0.5}
            >
            <Text>LOGIN</Text>
          </TouchableOpacity>
        </View>
      );
  }
}

const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  inputField: {
    marginTop: 10,
    width: 200,
		height: 30,
		backgroundColor: '#ededed'
  },
  loginForm: {
		height: WINDOW_HEIGHT-60,
		// flex: 1,
		marginTop: 60,
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

export default LoginForm;
