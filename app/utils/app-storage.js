/*
  @flow weak
*/
import {AsyncStorage} from 'react-native'

class AppStorage {
  constructor() {
    console.log('App Storage Init');
    this.autToken = '';

    // cache jwt auth token upon init
    AsyncStorage.getItem('authToken').then((token) => {
      this.authToken = token;
    });
  }

  getItem(key: string) {
    if (this[key]) {
      return this[key];
    }else {
      return AsyncStorage.getItem(key);
    }
  }

  setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value).then(() => {
      this[key] = value;  // cache the value
    });
  }

}
export default new AppStorage();
