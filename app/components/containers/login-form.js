import React, {Component} from 'react';
import { redux } from 'redux'
import { connect } from 'react-redux';
import {authenticate} from '../../actions/user-actions';

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
  TextInput,
	InteractionManager
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
    return (
      <View>
        <TextInput
          placeholder="username"
          value={this.state.username}
          onChangeText={(username) => {this.setState({username: username})}}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          returnKeyType="go"
          value={this.state.password}
          onChangeText={(password) => {this.setState({password: password})}}
        />
        <TouchableOpacity
          accessibilityTraits="button"
          onPress={this._login}
          activeOpacity={0.5}
          >
          <Text>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _login() {
    let {dispatch} = this.props;
		InteractionManager.runAfterInteractions(() => {
			dispatch(authenticate(this.state.username, this.state.password));
		});
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(LoginForm);
