/*
  @flow weak
*/
import {authenticateUser} from '../api'
import AppStorage from '../utils/app-storage'
import {
  ToastAndroid
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
            ToastAndroid.show('Login Success', ToastAndroid.SHORT);
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
      dispatch({
        type: 'USER_AUTHENTICATION_FAILED'
      })
    })
  }
}

export const initAppStorage = () => {
  return (dispatch) => {
    return AppStorage.init().then((authToken) => {
      dispatch({
        type: 'AUTHTOKEN_RETRIEVED',
        authToken: authToken
      })
    }).catch((err) => {
      console.log(err);
    })
  };
}
