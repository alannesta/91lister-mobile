import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import MovieList from './movie-list'

export default class TabView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollableTabView>
        <MovieList tabLabel="All" />
        <MovieList tabLabel="Hot" />
        <MovieList tabLabel="Discover" />
      </ScrollableTabView>
    );
  }
}
