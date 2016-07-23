/*
  @flow weak
*/
import {AsyncStorage} from 'react-native'

class AppStorage {
  init() {
    return AsyncStorage.getItem('authToken').then((token) => {
      this.authToken = token;
      return token;
    }).catch((err) => {
      console.log('AppStorage init failed');
    });
  }

  getItem(key: string) {
    if (this[key]) {
      return this[key];
    }else {
      return AsyncStorage.getItem(key).then(function(value) {
        this[key] = value;
        return value;
      });
    }
  }

  setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value).then(() => {
      this[key] = value;  // cache the value
    });
  }

}
export default new AppStorage();
