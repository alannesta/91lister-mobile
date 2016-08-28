/*
* @flow weak
*/
import React, {Component} from 'react';
import { bindActionCreators, redux } from 'redux'
import { connect } from 'react-redux';
import Movie from '../presentationals/movie';
import {changeDate} from '../../actions/toolbar-actions';
import {authenticate} from '../../actions/user-actions';

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
  ToolbarAndroid,
  DatePickerAndroid,
	InteractionManager
} from 'react-native';

class Toolbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ToolbarAndroid
        navIcon={require('../../images/ic_menu_black_24dp.png')}
        onIconClicked={() => this.props.drawer.openDrawer()}
        actions={[
					{title: 'Date', icon: require('../../images/ic_settings_black_48dp.png'), show: 'always'}
				]}
        onActionSelected={this._onActionSelected.bind(this)}
        style={styles.toolbar}
        title={'91 lister'}
      />
    )
  }

	componentDidMount() {
	}

  _onActionSelected(index) {
    if (index === 0) {
      this._showPicker()
    }
	}

  async _showPicker() {
    let {dispatch, startDate, order, query, movieData: {movies}} = this.props;
		let today = new Date();
    try {
			// if initial date is untouched, open datepicker with starting date set as today
			let initialDate = startDate === 0? today : new Date(startDate);
      const {action, year, month, day} = await DatePickerAndroid.open({date: initialDate});
      if (action === DatePickerAndroid.dismissedAction) {
				// action canceled;
      } else {
				let date = new Date(year, month, day).getTime();
				// if (today.getDay() === day && today.getMonth() === month && today.getFullYear() === year) {
				// 	date = 0;
				// }

				let currentMovieState = {
					count: movies.length,
					order: order,
					query: query
				}
				InteractionManager.runAfterInteractions(() => {
					dispatch(changeDate(date, currentMovieState));
				});
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
  return state.movieList;
}

export default connect(mapStateToProps)(Toolbar);
