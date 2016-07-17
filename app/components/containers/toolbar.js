/*
* @flow weak
*/
import React, {Component} from 'react';
import { bindActionCreators, redux } from 'redux'
import { connect } from 'react-redux';
import Movie from '../presentationals/movie';
import {changeDate} from '../../actions/toolbar-actions';

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
  ToolbarAndroid,
  DatePickerAndroid
} from 'react-native';

class Toolbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ToolbarAndroid
        navIcon={require('../../images/ic_menu_black_24dp.png')}
        onIconClicked={() => this.drawer.openDrawer()}
        actions={[{title: 'Date', icon: require('../../images/ic_settings_black_48dp.png'), show: 'always'}]}
        onActionSelected={this._onActionSelected.bind(this)}
        style={styles.toolbar}
        title={'91 lister'}
      />
    )
  }

  _onActionSelected(index) {
    if (index === 0) {
      this._showPicker()
    }
	}

  async _showPicker() {
    let {mSince, dispatch, movieData: {movies, order}} = this.props;
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({date: mSince});
      if (action === DatePickerAndroid.dismissedAction) {
				// action canceled;
      } else {
        let date = new Date(year, month, day);
				let currentMovieState = {
					count: movies.length,
					order: order
				}
        dispatch(changeDate(date, currentMovieState));
      }
    } catch (err)  {
      console.warn(err);
    }
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#E9EAED',
    height: 56,
  }
});

function mapStateToProps(state) {
  return state.movieListPage;
}

export default connect(mapStateToProps)(Toolbar);
