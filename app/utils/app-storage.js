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

  cacheFileUrl(movieId: number, fileUrl: string) {
    var timestamp = new Date().getTime();
    return AsyncStorage.setItem(movieId.toString(), JSON.stringify({fileUrl: fileUrl, timestamp: timestamp}))
  }

  getFileUrl(movieId: number) {
    var timestamp = new Date().getTime();
    return AsyncStorage.getItem(movieId.toString()).then((cached) => {
      // cache for 1 hour
      if (cached === null) {
        return '';
      } else {
        cached = JSON.parse(cached);
        if (timestamp - cached.timestamp > 60*60*1000) {
          return AsyncStorage.removeItem(movieId.toString()).then(() => {
            console.log('cache expired, removing from AppStorage');
            return Promise.reject('Cache expired');
          });
        } else {
          console.log('cache hit! retrieving fileUrl from cache');
          return cached.fileUrl;
        }
      }

    }).catch((err) => {
      throw err;
    })
  }

}
export default new AppStorage();
