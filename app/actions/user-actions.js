/*
  @flow weak
*/
import { authenticateUser, fetchMovie } from '../api'
import AppStorage from '../utils/app-storage'
import {
  ToastAndroid,
  AlertIOS,
  Platform
} from 'react-native'

export const authenticate = (username: string, password: string) => {
  return (dispatch) => {
    return authenticateUser(username, password).then(function(result) {
      if (result.auth) {
        // persist jwt auth token
        return AppStorage.setItem('authToken', result.auth).then(() => {
            dispatch({
              type: 'USER_AUTHENTICATION_SUCCESS',
              username: username
            });
            if (Platform.OS === 'ios') {

            } else {
              ToastAndroid.show('Login Success', ToastAndroid.SHORT);
            }
            return true;
        }).catch((err) => {
          console.log(err);
          throw(err);
        });
      } else {
        dispatch({
          type: 'USER_AUTHENTICATION_FAILED'
        });
      }
    }).catch((err) => {
      console.log('authenticate user action err: ', err);
      if (Platform.OS === 'ios') {
        AlertIOS.alert('Login Failed');
      } else {
        ToastAndroid.show('Login failed', ToastAndroid.SHORT);
      }
      dispatch({
        type: 'USER_AUTHENTICATION_FAILED'
      });
      throw err;
    })
  }
}

// too lazy to develop an api end point for this check since no user registration is allowed for now
export const loginStatusCheck = () => {
	return dispatch => {
		return fetchMovie({}).then(() => {
			dispatch({
				type: 'USER_AUTHENTICATION_SUCCESS',
				username: 'alannesta'		// TODO: need a dedicated api which returns the username lol
			});
		}).catch((err) => {
			dispatch({
				type: 'USER_AUTHENTICATION_FAILED'
			});
      throw err;
		})
	}
};
