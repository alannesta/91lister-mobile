import AppStorage from '../utils/app-storage'

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

export const updateNetworkStatus = (connectionType) => {
  return {
    type: 'CONNECTION_STATUS_CHANGED',
    connectionType: connectionType
  }
}
