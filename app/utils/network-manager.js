import {
	NetInfo
} from 'react-native';

export const NetworkManager = {
  connectionHistory: ['WIFI'],
  // init the network manager with a handler function
  init: function(networkChangeHandler) {
    if (typeof networkChangeHandler === 'function') {
			NetInfo.addEventListener('change', networkChangeHandler.bind(null, this.connectionHistory));
			return Promise.resolve();
			// RN 0.28-0.30 bug: https://github.com/facebook/react-native/issues/8615
  		// return NetInfo.fetch().then((connection) => {
			// 	console.log('network manager init: ', connection);
			// 	this.connectionHistory.unshift(connection);
			// 	NetInfo.addEventListener('change', networkChangeHandler.bind(null, this.connectionHistory));
			// 	// toLowerCase for ios('none')/android('NONE') compatibility
  		// 	if (connection.toLowerCase() === 'none') {
      //     networkChangeHandler(connection);
			// 		// stop all successive app activities;
			// 		return Promise.reject();
  		// 	}
			// 	return Promise.resolve(connection);
  		// });
    } else {
			console.log('No network change handler set');
			return Promise.resolve();
		}
  }
}
