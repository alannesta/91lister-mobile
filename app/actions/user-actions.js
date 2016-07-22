/*
  @flow weak
*/
import {authenticateUser} from '../api'
import AppStorage from '../utils/app-storage'

export const authenticate = (username: string, password: string) => {
  return (dispatch) => {
    authenticateUser(username, password).then(function(result) {
      if (result.auth) {
        // persist jwt auth token
        AppStorage.setItem('authToken', result.auth).then(() => {
            dispatch({
              type: 'USER_AUTHENTICATION_SUCCESS',
              username: username
            })
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
